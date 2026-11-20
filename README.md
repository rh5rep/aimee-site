# Max + Rami website

Public-facing site for Max and Rami’s AI training, workflow design, and implementation. The site has separate pages for services, approach, founders, contact, and the Einstein workshops. The unlinked milestone page remains a public founder corner. This is a separate project from the private `MaxAndRami` workspace. Do not copy workshop files, prospect notes, raw research, participant data, or other private material into this repository.

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`. Run `npm run lint`, `npm run typecheck`, and `npm run build` before sharing a preview.

## Content and launch review

Public page copy lives in `app/`; the shared navigation, footer, and current contact address live in `components/site-shell.tsx`. The November redesign includes founder bios, portraits, a teaching photo, and the December research workshops. Max and Rami should review the wording and image use together before wider promotion. Review [CONTENT_REVIEW.md](CONTENT_REVIEW.md) before publishing. The current contact address is `aimee_workflows@proton.me`; a professional address can replace it later without changing the page structure.

`app/layout.tsx` currently sets `robots` to `noindex, nofollow` for review. Switch it to indexing only after the final public copy and contact review. There is no booking link yet; the approved contact route is email.

The unlinked `/milestones` page is a public founder snapshot. Its three proposed goals are summarized in `app/milestones/data.ts`, without private source files. A slider lets visitors explore them; the dated progress line is derived only from `reachedOn` values. The first goal currently shows “reported Oct 20” and no confirmed completion date. Update the private goal or decision record first, then edit the public dates and copy here. This route has `noindex`, but anyone with the URL can view it.

The `/workshop` route is the stable destination for the flyer or QR code. It uses neutral Max + Rami wording while the business name is unsettled. Its dates, times, and topics follow the current workshop flyer. Confirm the rooms with the organizer before adding them. Registration remains pending until the organizer provides a link. When the organizer approves a registration link, set `NEXT_PUBLIC_WORKSHOP_REGISTRATION_URL` in Netlify and trigger a new build. Preserve this route after printing a QR code.

## Visual identity

The preview reads its color roles from [`brand/website-palette.json`](brand/website-palette.json). The original [AImee palette](brand/palette.json) remains the reference for existing slide and document samples. The site uses the plain text name Max + Rami while logo work is in review. The homepage pairs the existing photograph of Max presenting at Einstein with Rami’s public portfolio portrait from the portfolio source asset `rami-profile-2026.jpg`, resized for the web.

## Netlify

The project uses Next.js App Router, TypeScript, and Tailwind. Netlify detects Next.js and uses its maintained adapter; no adapter version is pinned in this project. Connect only this repository to Netlify. Review the temporary `*.netlify.app` URL with the founders before using it in outreach. A custom domain can be added later.
