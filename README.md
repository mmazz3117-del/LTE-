# Signal — Field Log · GitHub Pages edition

A phone-friendly, local-first signal notebook. This package includes the current signal/Speedtest screenshot workflow, self-hosted OCR, Home Screen icons and a standalone web-app manifest. **No build tools are required.**

## First: protect your existing readings

1. In your current private Signal app, tap **Export JSON** and save the file privately in Files.
2. Keep that backup out of this repository. **Never upload location backups, screenshots or personal readings to GitHub.**
3. The new GitHub URL starts with an empty notebook. Once opened, use **Import backup** to load your JSON locally. Check the reading count and a few entries before deleting anything.
4. If the Home Screen app starts empty, import the same backup there too. Browser and Home Screen storage behavior can vary. Duplicate record IDs are skipped.

The current private app remains unchanged. Its data does not automatically move to a new URL.

## Option A — use the existing private app on your Home Screen

GitHub is not required. Open your existing Signal link directly in **Safari** (not just an in-app preview), sign in if needed, then use **Share → Add to Home Screen → Add**. If offered, leave **Open as Web App** on. Export JSON first and check your readings after opening the new icon.

## Option B — publish this copy with GitHub Pages

**Privacy decision:** the simple free setup below uses a **public repository and public website**, unlike the existing owner-private Site. The code and app URL are visible to others. A private repository alone does not make an ordinary Pages website private. The app has no ChatGPT login gate in this edition. Readings stay in each visitor's browser and are not automatically uploaded, but backups placed in the repository would become public.

On a computer, where uploading folders is easiest:

1. Create a new GitHub repository, for example `signal-field-log`. Choose **Public** only if you accept the privacy tradeoff above. Do not add personal data.
2. Unzip this download. Upload **the contents inside the `Signal-GitHub-Pages` folder** to the repository root using **Add file → Upload files**. Keep `vendor/` and `icons/` as folders. Upload extracted files, **not the ZIP itself**. You should see `index.html` at the repository root—not inside `dist/` or an extra wrapper folder.
3. Commit the uploaded files to `main`. Include the empty `.nojekyll` file. If your file picker hides it, use **Add file → Create new file**, name it `.nojekyll`, and commit it (a blank line is fine).
4. Open **Settings → Pages**. Under **Build and deployment**, choose **Deploy from a branch**, branch **main**, folder **/(root)**, then **Save**.
5. Wait for the Pages deployment to succeed. Open the exact HTTPS URL shown in Settings → Pages. If it fails, check the repository's **Actions** tab; do not assume publication succeeded.
6. On iPhone, open that URL in Safari. Import your JSON backup locally, verify the notebook, then use **Share → Add to Home Screen**. If offered, keep **Open as Web App** on, and tap **Add**.

No repository was created or published for you. These steps are yours to perform if you choose GitHub hosting.

## Use it

Capture location while safely stopped → add signal screenshot → review/Add signal to draft → add completed Speedtest screenshot → choose connection and tick final-results confirmation → Add Speedtest to draft → Save combined reading. Either screenshot can come first. Use **Start new reading** for the next stop, or **Edit** for an existing entry.

## What “app” means here

- This is a Home Screen **web app**, not an App Store/native iPhone application.
- No service worker or offline app-shell cache is included. **Do not rely on offline use.** Opening the app, loading OCR files initially, or street tiles may require a connection.
- GPS requires HTTPS and explicit browser permission. No background GPS, automatic radio access or automatic speed tests.
- Screenshot recognition happens on the device. The image and raw OCR text are not uploaded or saved; reviewed values enter the local draft. OCR can be wrong—always compare the numbers.
- Street tiles are optional and disclose your IP and viewed map area to OpenStreetMap after consent. GitHub hosting also receives ordinary requests and logs visitor IPs.
- Records use localStorage. Clearing browser data, changing browser, switching devices or changing the URL can lose/separate them. Export JSON regularly. There is no cloud sync.
- GitHub project-path storage keys keep separate project copies organized, but paths are not a security boundary for scripts sharing one origin. Do not host untrusted code on the same GitHub Pages origin.

## Package / checks

`index.html` is at the root. Asset URLs, manifest `id/start_url/scope`, icons and OCR paths are relative, so project URLs such as `/signal-field-log/` work. `.nojekyll` bypasses Jekyll processing. Vendor licenses/provenance are included. No ChatGPT Site identity, repository credentials, screenshots, readings or backups are included.

Prepared from deployed source commit `a1a43ca367b9f4dfa3dc0ee944e2b5288f2f9eb0`, with portable manifest/icons and path-scoped browser-storage key added. Syntax, icon sizes and relative asset paths checked. GitHub deployment and physical iPhone installation were **not** performed or verified.

## Official references

- [Apple: Turn a website into an app](https://support.apple.com/en-gb/guide/iphone/iphea86e5236/ios)
- [GitHub: Configure the publishing source](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)
- [GitHub: Add files to a repository](https://docs.github.com/en/repositories/working-with-files/managing-files/adding-a-file-to-a-repository)
- [GitHub: What is GitHub Pages?](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages)
