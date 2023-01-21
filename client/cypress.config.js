const {defineConfig} = require("cypress")

require("dotenv").config()

module.exports = defineConfig({
  video: false,
  screenshotOnRunFailure: false,

  env: {
    "cypress-react-selector": {
      root: "#__cy_root",
    },
  },

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },

  component: {
    devServer: {
      framework: "create-react-app",
      bundler: "webpack",
    },
  },
})
