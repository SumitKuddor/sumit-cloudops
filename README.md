# Sumit Kuddor // CloudOps Center

Static React + TypeScript + Vite + Tailwind + Framer Motion + Lucide site. The terminal is a front-end simulation: no backend, no data collection, nothing executes on a server.

## Develop / build
    npm install
    npm run dev          # http://localhost:5173
    npm run typecheck
    npm run build        # static output in dist/
    npm run preview

## Update content
Everything factual lives in `src/data/` (`profile.ts`, `experience.ts`, `projects.ts`, `journey.ts`, `aws.ts`). Add certificate links in `certs[].url`. Replace `public/resume.pdf` to update the resume.

## Docker
    docker compose up --build        # http://localhost:8080

## Deploy (build first with `npm run build`; upload `dist/`)
- **S3 + CloudFront**: `aws s3 sync dist s3://YOUR_BUCKET --delete`, CloudFront with Origin Access Control, default root object `index.html`, then `aws cloudfront create-invalidation --distribution-id ID --paths "/*"`.
- **Amplify**: connect repo; build `npm run build`, output dir `dist`.
- **Netlify / Cloudflare Pages / Vercel**: build `npm run build`, output `dist`.
- **GitHub Pages**: `base` is `./`, so the build works under `/repo-name/`. Upload the contents of `dist/` to the repo root (or serve via a Pages workflow) and select the branch in Settings → Pages.
- **Nginx / VPS / EC2**: copy `dist/*` to `/usr/share/nginx/html` and use `nginx.conf`.

## Visit counter, ratings and feedback (optional backend)
The site works without it. To enable the visit counter and the Feedback view:
    cd backend && sam build && sam deploy --guided     # needs AWS CLI + SAM CLI
Copy the `ApiUrl` output. For local dev create `.env` with `VITE_API_URL=<ApiUrl>`. For GitHub Pages add a repo variable `VITE_API_URL` (Settings → Secrets and variables → Actions → Variables) and in `.github/workflows/deploy.yml` change the build step to:
          - run: npm run build
            env:
              VITE_API_URL: ${{ vars.VITE_API_URL }}
Only anonymous visit counts, star ratings and typed feedback are stored (DynamoDB). No IPs or identities. Read submissions in the DynamoDB console (items starting `FB#`). For names/countries of visitors you cannot get them automatically; use Cloudflare Web Analytics or LinkedIn's "who viewed your profile".
