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

Cypress.Commands.add('loginFromDb', (user) => {
  cy.session(
    user,
    () => {
      cy.visit('/auth')
      cy.get('input[placeholder="Email"]').type(user.email)
      cy.get('input[placeholder="Password"]').type(user.password)
      cy.get("#loginButton").click()
  
    },
    {
      validate: () => {
        cy.getCookie('auth_key').should('exist')
      },
    }
  )
})
