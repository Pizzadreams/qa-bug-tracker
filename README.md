

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

Some resources for learning Expo:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go check out advanced topics at [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/)

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.





## 🛠️ Troubleshooting: Node.js & npm Reinstallation

During setup, I encountered issues with npm, such as warnings about deprecated global configs (`msvs_version`, `python`) and a critical error:

> `MODULE_NOT_FOUND: Cannot find module '@tufjs/models'`

This pointed to a corrupted or incomplete Node.js/npm installation, blocking further progress on the project.

### Resolution Steps

1. **Uninstalled Node.js:**
   - Used “Add or Remove Programs” (Windows) to uninstall Node.js (removes npm too).

2. **Removed Residual Files:**
   - Deleted folders:  
     - `%AppData%\npm`
     - `%AppData%\npm-cache`
   - Checked for and removed leftover global `node_modules` directories.

4. **Reinstalled Node.js (LTS):**
   - Downloaded and installed the latest LTS version from [nodejs.org](https://nodejs.org).

5. **Verified Success:**
   - Ran:
     ```
     node -v
     npm -v
     ```
   - Confirmed version info printed with no errors.

6. **(Optional) Cleaned npm Cache:**
   - Ran:
     ```
     npm cache clean --force
     ```
   - Ensured a clean slate for npm if additional issues occurred.

---
I just wanted to document this troubleshooting process for anyone who may come across these concerns. After all, identifying, isolating, and resolving environment issues will ensure reliable software delivery!