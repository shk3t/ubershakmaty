Cypress.Commands.add("waitForGoogleApi", () => {
  let mapWaitCount = 0
  const mapWaitMax = 5

  cyMapLoad()

  function cyMapLoad() {
    mapWaitCount++

    cy.window().then((win) => {
      if (typeof win.google != "undefined") {
        return true
      } else if (mapWaitCount <= mapWaitMax) {
        cy.wait(2000)
        cyMapLoad()
      } else if (mapWaitCount > mapWaitMax) {
        return false
      }
    })
  }
})
