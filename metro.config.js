const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Add `.wasm` extension to assetExts, so Expo bundles the .wasm file properly
config.resolver.assetExts.push('wasm');

module.exports = config;
