# Deploying AI Ad Engine

Domain: `aiadengine.co.za`, registered at HostAfrica, managed at `panel.hostafrica.com`.

**What the HostAfrica account actually holds (checked 2026-08-21):** the domain (active, renews 7 Aug 2027) and one Email service. There is no web hosting package and no VPS on the account, so there is nothing at HostAfrica that can run this site today. HostAfrica stays the registrar, DNS host and mailbox provider; the app goes on Vercel. That is Option A below. Options B and C only apply if a hosting package or server is bought later.

## Live right now

**https://aiadengine.co.za** — live since 2026-08-21, SSL valid, DNS pointing at Vercel from HostAfrica.

- Vercel project `ai-ad-engine`, team `atalic2993-personal-project`, **connected to GitHub** (`atalic2993/AIAdEngine`), Root Directory `web`. A push to `main` deploys.
- PayFast is in **live** mode (merchant 11073115). A signed handoff was accepted by PayFast, so the keys and passphrase are correct.
- Pixels are still off, no tracking IDs supplied yet.
- `www` serves the site as well as the apex; canonical tags point at the apex.

Manual redeploy: `vercel deploy --prod --yes` **from the repo root** (`AIAdEngine/`), not from `web/`, because Vercel's Root Directory is `web`.

## The one thing that decides everything

This site is **not** a folder of HTML files. Two parts have to run on a server:

1. **The PayFast handoff** (`/api/payfast/create`). PayFast requires a signature built with your secret passphrase. That has to happen on the server. If it happened in the browser, anyone could edit the price and pay R1 instead of R599.
2. **The PayFast notification handler** (`/api/payfast/itn`). PayFast calls this address server-to-server to confirm a payment. It must be a live HTTPS address that answers.

So the host needs to run **Node.js 20 or newer**. A plain "upload your files to public_html" plan cannot run this site.

Everything else (all the pages, legal pages, images) is static and would work anywhere.

---

## Option A — Vercel for the app, HostAfrica for the domain (the plan)

Vercel is built by the Next.js team, free at this size, and needs no server maintenance. HostAfrica stays the registrar and DNS host, which is where `panel.hostafrica.com` comes in.

1. Push `AIAdEngine/web` to a Git repository (GitHub), or run `npx vercel` from that folder.
2. In Vercel: import the project. Framework preset is detected as Next.js, Root Directory is `web` if you push the whole `AIAdEngine` folder.
3. Add the environment variables (see the list below) under Settings → Environment Variables → Production.
4. In Vercel: Settings → Domains → add `aiadengine.co.za` and `www.aiadengine.co.za`. Vercel shows the exact DNS records to create.
5. In `panel.hostafrica.com` → DNS management for `aiadengine.co.za`, add exactly what Vercel showed. It is normally:
   - `A` record, host `@`, pointing at the IP Vercel gives you
   - `CNAME` record, host `www`, pointing at `cname.vercel-dns.com`
   - Copy the values from Vercel rather than from here, they change.
6. Wait for DNS (usually minutes, up to a few hours). Vercel issues the SSL certificate automatically.

**Do not touch the email records.** There is a live Email service on this domain. When editing DNS, change or add only the `A` record for `@` and the `CNAME` for `www`. Leave every `MX` record and any `TXT` record (SPF, DKIM, DMARC) exactly as they are. Deleting those stops mail to @aiadengine.co.za immediately.

**Cost:** R0 on Vercel's free tier for this traffic level. HostAfrica keeps the domain fee.

---

## Option B — HostAfrica hosting with Node.js support

HostAfrica web hosting now runs **DirectAdmin** (they moved off cPanel). Node.js is only possible if your plan has the Node.js app feature (CloudLinux Node.js Selector) or if you are on a VPS / cloud server with SSH.

**First check:** log into `panel.hostafrica.com` and look for "Node.js" / "Setup Node.js App" / "Application Manager". If it is not there, ask HostAfrica support: *"Does my plan support running a Node.js 20+ application, and do I get SSH access?"* If the answer is no, use Option A, or upgrade to a VPS (Option C).

If Node.js is available:

1. Locally: `cd web && npm run build && npm run package`
   This creates `web/deploy/` containing the server, its dependencies, `public/`, and an `app.js` entry point.
2. Upload the **contents** of `web/deploy/` to the app folder DirectAdmin created (for example `~/nodeapp/`), not to `public_html`.
3. In the panel's Node.js app screen set:
   - Application root: the folder you uploaded to
   - Application URL: `aiadengine.co.za`
   - Application startup file: `app.js`
   - Node version: 20 or newer
4. Add the environment variables (below) in the same screen.
5. Start the app, then open the domain. The panel puts a proxy in front of it, so port numbers are handled for you.

Redeploying after a change: build and package locally again, upload, restart the app.

---

## Option C — HostAfrica VPS or cloud server

Full control, about R150–R400/month depending on size. Needs Ubuntu, Node 20+, PM2 and Nginx.

```bash
# on the server, once
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt install -y nodejs nginx
sudo npm install -g pm2

# upload the contents of web/deploy/ to /var/www/aiadengine
cd /var/www/aiadengine
pm2 start server.js --name aiadengine --update-env
pm2 save && pm2 startup
```

Nginx site config (`/etc/nginx/sites-available/aiadengine`):

```nginx
server {
  server_name aiadengine.co.za www.aiadengine.co.za;
  location / {
    proxy_pass http://127.0.0.1:3000;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
  }
}
```

Then `sudo ln -s` it into `sites-enabled`, `sudo nginx -t && sudo systemctl reload nginx`, and issue SSL with `sudo certbot --nginx -d aiadengine.co.za -d www.aiadengine.co.za`.

DNS in `panel.hostafrica.com`: `A` record `@` and `A` record `www`, both pointing at the server IP.

---

## Environment variables (all options)

```
NEXT_PUBLIC_SITE_URL=https://aiadengine.co.za
NEXT_PUBLIC_CONTACT_EMAIL=support@aiadengine.co.za

PAYFAST_SANDBOX=false
PAYFAST_MERCHANT_ID=<from PayFast>
PAYFAST_MERCHANT_KEY=<from PayFast>
PAYFAST_PASSPHRASE=<the passphrase you set in PayFast settings>

NEXT_PUBLIC_META_PIXEL_ID=
NEXT_PUBLIC_GA4_ID=
NEXT_PUBLIC_TIKTOK_PIXEL_ID=
META_CAPI_ACCESS_TOKEN=
```

`NEXT_PUBLIC_SITE_URL` is important: it builds the return, cancel and notify addresses sent to PayFast. If it is wrong, customers land in the wrong place after paying and PayFast cannot notify us.

---

## After the first deploy, in order

1. Open the site on the real domain. Check the padlock (SSL) is there.
2. In PayFast, set the notify URL allowance if required, and confirm recurring subscriptions are enabled on the account.
3. Do one **live** test purchase on Scale (R599) with your own card, then cancel and refund it in PayFast. Watch that:
   - you land on `/welcome` with the plan and reference shown
   - the server log shows `[payfast:itn]` with `signatureOk: true` and `payment_status: COMPLETE`
4. Only then add the Meta, Google and TikTok IDs and start advertising.
5. Replace the code-drawn interface illustrations with real AI Ad Launcher screenshots before spending on ads.

## Rollback

Keep the previous `deploy/` folder. If a release misbehaves, upload the old folder and restart. On Vercel, use Deployments → the previous build → Promote to Production.
