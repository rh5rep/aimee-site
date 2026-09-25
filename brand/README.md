# AImee working visual identity

This folder is the shared source for AImee colors across the website, editable documents, presentations, images, and future logo work. Rami liked the first website palette on September 24, 2026. The values are a **working system**, not a final logo or full brand approval from both founders.

## Source of truth

Use [`palette.json`](palette.json) for color values. It is machine-readable and uses sRGB hex values that can be pasted into PowerPoint, Word, Figma, or image tools. The website reads its core CSS variables from this file during rendering. Keep new primary colors here rather than inventing a different palette in each artifact.

| Role | Token | Hex | Use |
| --- | --- | --- | --- |
| Primary text and dark background | `ink` | `#272650` | Headings, body text, dark contact panel |
| Main page background | `paper` | `#F8F7F2` | Warm, quiet canvas |
| Light surface | `white` | `#FFFEFA` | Cards and reverse text |
| Secondary text | `inkSoft` | `#55546C` | Explanatory copy on light surfaces |
| Divider | `line` | `#DCD9E0` | Rules and quiet borders |
| Soft purple surface | `lavender` | `#E5DDF7` | Highlights and callouts |
| Purple accent | `lilac` | `#C6B6F4` | Decorative emphasis, not small text |
| Strong purple accent | `violet` | `#9677DA` | Marks, highlights, links when contrast is checked |
| Warm yellow accent | `yellow` | `#EDDA88` | Small emphasis areas |
| Warm orange accent | `peach` | `#ECAA84` | Secondary visual accent |

## Working rules

- Use `ink` on `paper` or `white` for normal text. Keep lilac, yellow, and peach mostly as accents or surfaces.
- Use the colors sparingly: one dominant light surface, one dark anchor, and one or two accents per artifact.
- Check text contrast on every new background. A color approved as a decorative accent is not automatically suitable for small text.
- Use geometric marks or simple vector icons where needed. Avoid Unicode symbols that devices may render as colorful emoji.
- The current site favicon and wordmark are provisional. Revisit them with Max and Rami before treating them as a final logo.
- Record palette changes here with a brief reason and update the version in `palette.json`. Recheck website, document, and slide examples after changing a core token.

## Next useful brand work

Create one sample document page and one sample slide using this palette; review them beside the website on phone and desktop. That will test whether the colors work across media before defining typography, logo geometry, or broader brand rules.
