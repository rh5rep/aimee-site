# AImee website

Public-facing, one-page AImee site. This is a separate project from the private `MaxAndRami` workspace. Do not copy workshop files, prospect notes, raw research, participant data, or other private material into this repository.

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`. Run `npm run lint`, `npm run typecheck`, and `npm run build` before sharing a preview.

## Content and launch review

Page copy is in `app/page.tsx`; title and description are in `app/layout.tsx`. This is a local boilerplate until Max and Rami review the copy together. Review [CONTENT_REVIEW.md](CONTENT_REVIEW.md) before publishing. The approved contact address is `aimee_workflows@proton.me`. Founder roles and a booking URL are omitted until confirmed.

`app/layout.tsx` currently sets `robots` to `noindex, nofollow` for review. Switch it to indexing only after the final public copy and contact review. Add an approved booking URL by setting `NEXT_PUBLIC_AIMEE_BOOKING_URL` in the deployment environment. Founder role labels, if approved, use `NEXT_PUBLIC_AIMEE_MAX_ROLE` and `NEXT_PUBLIC_AIMEE_RAMI_ROLE`.

## Visual identity

The working color schema is in [`brand/palette.json`](brand/palette.json), with usage notes in [`brand/README.md`](brand/README.md). The website reads its core CSS variables from that palette. Use the same values as a starting point for AImee document and presentation templates; the wordmark and favicon are still provisional.

## Netlify

The project uses Next.js App Router, TypeScript, and Tailwind. Netlify detects Next.js and uses its maintained adapter; no adapter version is pinned in this project. Connect only this repository to Netlify. Review the temporary `*.netlify.app` URL with the founders before using it in outreach. A custom domain can be added later.
