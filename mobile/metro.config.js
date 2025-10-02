const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, '..');

/** @type {import('metro-config').ConfigT} */
const config = getDefaultConfig(projectRoot);

// Watch the repository root so Metro can resolve modules outside mobile/
config.watchFolders = [workspaceRoot];

// Ensure Metro resolves packages from the mobile node_modules first,
// but can also look in the workspace root for shared deps.
config.resolver = {
  ...config.resolver,
  nodeModulesPaths: [
    path.resolve(projectRoot, 'node_modules'),
    path.resolve(workspaceRoot, 'node_modules'),
  ],
  extraNodeModules: {
    shared: path.resolve(workspaceRoot, 'shared'),
  },
};

module.exports = config;
