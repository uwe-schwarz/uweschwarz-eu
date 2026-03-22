# Vendored Umami Tracker

`umami.js.txt` and `umami.sha256` are vendored third-party artifacts from the upstream Umami tracker. Do not edit either file by hand. Refresh them only with the repository updater so the script contents and recorded checksum stay in sync.

## Refresh

Run:

```bash
bun run update:umami
```

The updater downloads `https://cloud.umami.is/script.js`, computes its SHA-256 hash, and rewrites both vendored files when upstream changed.

## Verify After An Update

1. Confirm the checksum changed as expected:

   ```bash
   git diff -- src/app/api/umami/script/umami.sha256
   ```

2. Confirm the self-hosted route still serves the vendored script:

   ```bash
   bun run dev
   curl -I http://localhost:3000/api/umami/script
   ```

   The response should stay `200` and include `Content-Type: application/javascript` plus `X-Umami-Upstream-Sha256`.

3. Confirm analytics still posts to the expected Umami endpoint:
   - The site loads the tracker from `/api/umami/script`.
   - The script tag in `src/app/layout.tsx` still sets `data-host-url` to `https://api-gateway.umami.dev`.
   - The browser network panel still shows analytics requests to `https://api-gateway.umami.dev/api/send`.

4. Do a manual smoke-check on the site:
   - Open a local or preview build.
   - Load a few pages and trigger a client-side navigation.
   - Confirm the tracker script loads and no CSP or console errors appear.

## If Upstream Changes The Script Shape

The updater assumes Umami still ships a single script at `https://cloud.umami.is/script.js` that can be vendored and served unchanged from `src/app/api/umami/script/route.ts`. If upstream changes that assumption, do not just overwrite the vendored files.

Review and update the surrounding integration first:

- `scripts/update-umami-tracker.ts` if fetch or hashing logic must change.
- `src/app/api/umami/script/route.ts` if the served asset or headers need to change.
- `src/app/layout.tsx` if the script tag attributes or loading mode change.
- `src/lib/security/csp.ts` if Umami starts requiring different script or connect hosts.

After that, rerun `bun run update:umami` and repeat the verification steps above.
