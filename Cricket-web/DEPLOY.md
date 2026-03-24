# How to Host Your Website

Your application is built and ready for deployment! The production files are located in the `dist` folder.

Here are the two easiest ways to host it for free:

## Option 1: Netlify (Recommended - Easiest)
**Best for:** Getting a live link in 30 seconds without installing anything.

1.  Open [Netlify Drop](https://app.netlify.com/drop) in your browser.
2.  Open your project folder on your computer: `D:\kscrt-cricket application`.
3.  Locate the `dist` folder.
4.  **Drag and drop the entire `dist` folder** into the box on the Netlify Drop page.
5.  Wait a few seconds, and Netlify will give you a live URL (e.g., `https://kscrt-cricket.netlify.app`).

**Note:** If you update your code, you will need to run `npm run build` again and re-upload the new `dist` folder.

---

## Option 2: Vercel (Professional)
**Best for:** Continuous deployment (if you use GitHub).

1.  Go to [Vercel.com](https://vercel.com) and sign up/login.
2.  Click **"Add New..."** -> **"Project"**.
3.  Import your GitHub repository (if you pushed your code to GitHub).
    -   *Framework Preset:* Vite
    -   *Root Directory:* `./`
    -   *Build Command:* `npm run build`
    -   *Output Directory:* `dist`
4.  Click **Deploy**.

---

## Option 3: GitHub Pages (Free)
If you have this project on GitHub:

1.  Open `package.json` in your code editor.
2.  Add `"homepage": "https://<your-username>.github.io/<repo-name>"` at the top level.
3.  Install the gh-pages package:
    ```bash
    npm install gh-pages --save-dev
    ```
4.  Add these scripts to `package.json`:
    ```bash
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
    ```
5.  Run:
    ```bash
    npm run deploy
    ```

## Build Android APK (Windows)
If you restored Android platform support with Capacitor and have the Android project under the `android/` folder, follow these steps to open the project in Android Studio and generate a signed APK:

1.  Ensure you have Node.js, npm, Java JDK, and Android Studio installed, and the `ANDROID_HOME` / SDK tools are set up.
2.  From your project root (where `package.json` lives) run:
    ```powershell
    npm install
    npm run build
    npm run android
    ```
    - `npm run android` will run `npx cap open android` which opens the native Android project in Android Studio.
3.  In Android Studio: File > Sync Project with Gradle Files (if prompted).
4.  To produce a signed APK or AAB: Build > Generate Signed Bundle / APK...
    - Follow the wizard to create or select a signing key (keystore), choose release, and finish.
5.  The final artifact (APK/AAB) will be inside the Android project's `app/build/outputs/` folder.

Notes:
- If `npx cap open android` fails, make sure `@capacitor/cli` and `@capacitor/android` are installed and that the `android/` folder exists and contains a Gradle project.
- If you prefer command-line signing and building, you can run Gradle commands from the `android/` folder, but Android Studio is the recommended flow for first-time builds.

---

## Important Verification
Before deploying, double-check that your Google Maps links and other data are correct by running:
```bash
npm run preview
```
This runs the built version of your app locally for a final check.
