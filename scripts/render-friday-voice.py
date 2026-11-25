"""Render the film captions as a single timed MP3 using the Kokoro v1.0 model."""
import argparse
import json
import subprocess
import tempfile
from pathlib import Path

import numpy as np
import soundfile as sf
from kokoro_onnx import Kokoro

root = Path(__file__).resolve().parents[1]
parser = argparse.ArgumentParser()
parser.add_argument("model", type=Path)
parser.add_argument("voices", type=Path)
args = parser.parse_args()
script = json.loads((root / "components/friday-script.json").read_text())
cues = list(script["cues"].values())
engine = Kokoro(str(args.model), str(args.voices))
rate = 24000
track = np.zeros(script["durationMs"] * rate // 1000, dtype=np.float32)

for i, cue in enumerate(cues):
    start = cue["startMs"] * rate // 1000
    end = cues[i + 1]["startMs"] * rate // 1000 if i + 1 < len(cues) else len(track)
    words = cue["text"].replace("42", "forty-two")
    speech, sample_rate = engine.create(words, voice="af_heart", speed=1.08, lang="en-us")
    assert sample_rate == rate
    if start + len(speech) > end:
        raise ValueError(f"Speech exceeds its cue at {cue['startMs']} ms: {len(speech) / rate:.2f} seconds")
    track[start:start + len(speech)] = speech
    print(f"{cue['startMs']:5d} ms + {len(speech) / rate:.2f} s: {words}")

output = root / "public/audio/friday-report-voiceover.mp3"
with tempfile.TemporaryDirectory(dir=output.parent) as temp:
    source = Path(temp) / "narration.wav"
    sf.write(source, track, rate)
    encoded = Path(temp) / output.name
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", str(source), "-b:a", "64k", str(encoded)], check=True)
    encoded.replace(output)
