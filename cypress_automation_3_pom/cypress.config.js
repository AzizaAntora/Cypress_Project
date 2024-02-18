const { defineConfig } = require("cypress");

module.exports = defineConfig({
  experimentalStudio: true,
  watchForFileChanges: false,
  "chromeWebSecurity": false,
  reporter: 'cypress-mochawesome-reporter',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      require('cypress-mochawesome-reporter/plugin')(on);
    },
  },
});
