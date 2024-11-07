const { defineConfig } = require('cypress')

module.exports = defineConfig({
    viewportWidth: 1400,
    viewportHeight: 1200,
    e2e: {
        baseUrl: "https://www.check24.de/internet",
        fixturesFolder: "cypress/fixtures",
        screenshotsFolder: "artifacts/screenshots",
        videosFolder: "artifacts/videos",
        downloadsFolder: "artifacts/downloads"
    },
})