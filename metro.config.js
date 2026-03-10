const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Add pdf to asset extensions
config.resolver.assetExts.push('pdf');

module.exports = config;