# AImee website

Public-facing site with a primary AImee landing page, an unlinked milestone page, and a workshop information page. This is a separate project from the private `MaxAndRami` workspace. Do not copy workshop files, prospect notes, raw research, participant data, or other private material into this repository.

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`. Run `npm run lint`, `npm run typecheck`, and `npm run build` before sharing a preview.

## Content and launch review

Page copy is in `app/page.tsx`; title and description are in `app/layout.tsx`. The November redesign includes founder bios, portraits, a teaching photo, and the December research workshops. Max and Rami should review the wording and image use together before wider promotion. Review [CONTENT_REVIEW.md](CONTENT_REVIEW.md) before publishing. The approved contact address is `aimee_workflows@proton.me`. A booking URL is omitted until confirmed.

`app/layout.tsx` currently sets `robots` to `noindex, nofollow` for review. Switch it to indexing only after the final public copy and contact review. There is no booking link yet; the approved contact route is email.

The unlinked `/milestones` page is a public founder snapshot. Its three proposed goals are summarized in `app/milestones/data.ts`, without private source files. A slider lets visitors explore them; the dated progress line is derived only from `reachedOn` values. The first goal currently shows “reported Oct 20” and no confirmed completion date. Update the private goal or decision record first, then edit the public dates and copy here. This route has `noindex`, but anyone with the URL can view it.

The `/workshop` route is the stable destination for the flyer or QR code. It uses neutral Max + Rami wording while the business name is unsettled. Its dates, times, topics, audience, and Einstein campus location come from the supplied version 13 flyer. The room and registration link remain pending. When the organizer approves a registration link, set `NEXT_PUBLIC_WORKSHOP_REGISTRATION_URL` in Netlify and trigger a new build. Preserve this route after printing a QR code.

## Visual identity

The working color schema is in [`brand/palette.json`](brand/palette.json), with usage notes in [`brand/README.md`](brand/README.md). The website reads its core CSS variables from that palette. Use the same values as a starting point for AImee document and presentation templates; the wordmark and favicon are still provisional.

## Netlify

The project uses Next.js App Router, TypeScript, and Tailwind. Netlify detects Next.js and uses its maintained adapter; no adapter version is pinned in this project. Connect only this repository to Netlify. Review the temporary `*.netlify.app` URL with the founders before using it in outreach. A custom domain can be added later.
