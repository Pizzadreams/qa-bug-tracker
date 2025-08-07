
In the process of applying my front-end testing skills

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

Installed Picker dependency to for ability to select an option from a list of choices:
   ```bash
   npm install @react-native-picker/picker

   ```

Installed SQLite for app integrated CRUD functionality:
   ```bash
   npx expo install expo-sqlite
   ```


You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Learn more

Some resources for learning Expo:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or check out advanced topics at [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/)
- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for testing Expo's app development

## Expo's community

There's a helpful community out there.

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