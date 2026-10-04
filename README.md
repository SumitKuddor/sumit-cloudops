# Sumit Kuddor: Cloud Ops Terminal

A fully static site (one `index.html` + `resume.pdf`). No framework, no build step, no backend, no external requests (system fonts only). The terminal is a front-end simulation: it never runs real commands.

## Run locally
    python3 -m http.server 8080      # or: npx serve .
    open http://localhost:8080

## Docker
    docker compose up --build        # http://localhost:8080

## Deploy
- **S3 + CloudFront**: `aws s3 sync . s3://YOUR_BUCKET --exclude "*" --include "index.html" --include "resume.pdf"`; put CloudFront in front with default root object `index.html` (use Origin Access Control, keep the bucket private).
- **Amplify / Netlify / Vercel / Cloudflare Pages**: upload or connect the repo; no build command, publish directory `.`.
- **GitHub Pages**: push these files to a repo, enable Pages from the branch root.
- **Nginx/VPS**: copy `index.html` and `resume.pdf` to your web root and use `nginx.conf` as the server block.

## Update content
All resume-derived content is in the `D` object at the top of the `<script>` in `index.html`.
Add your certificate validation URLs to `D.certs[].url` (they are empty because the PDF text didn't expose them).
