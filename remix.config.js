/**
 * Remix Configuration for BetaLawvriksh-Frontend
 *
 * This configuration is essential for Docker deployment and build processes.
 * While using Remix with Vite, certain build configurations still need to be
 * specified here for proper deployment and asset serving.
 *
 * See: https://remix.run/docs/en/main/file-conventions/remix-config
 */

/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  // App directory (relative to this config file)
  appDirectory: "app",

  // Output directory for server build (matches package.json start script)
  serverBuildDirectory: "build/server",

  // Output directory for client build (for static assets)
  assetsBuildDirectory: "build/client",

  // Public path for static assets (important for Docker deployment)
  publicPath: "/build/",

  // Ignore test and storybook files
  ignoredRouteFiles: [
    "**/.*",
    "**/*.test.{js,jsx,ts,tsx}",
    "**/*.stories.{js,jsx,ts,tsx}",
    "**/*.spec.{js,jsx,ts,tsx}",
    "**/*.css"
  ],

  // Enable future flags (synchronized with vite.config.ts)
  future: {
    v3_fetcherPersist: true,
    v3_relativeSplatPath: true,
    v3_throwAbortReason: true,
    v3_singleFetch: true,
    v3_lazyRouteDiscovery: true,
  },

  // Server dependencies to bundle (useful for ESM-only packages in Docker)
  serverDependenciesToBundle: [
    // Add any ESM-only packages that need to be bundled for the server
  ],
};
