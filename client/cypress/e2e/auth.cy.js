describe("Auth", () => {
  const user = (Math.random() + 1).toString(36).substring(8)
  const password = (Math.random() + 1).toString(36).substring(2)
  const passwordShort = (Math.random() + 1).toString(36).substring(6)

  it("login before registration", () => {
    cy.visit("http://localhost:3000/auth")
    cy.get('input[placeholder="Email"]').type("test" + user + "@gmail.com")
    cy.get('input[placeholder="Password"]').type(password)
    cy.get("button.AuthPage_button__RFObg").click()

    cy.on("window:alert", (str) => {
        expect(str).contain(
          `Incorrect authentication credentials.`
        )
      })
  })

  it("registration", () => {
    cy.visit("http://localhost:3000/auth")
    cy.waitForGoogleApi().then(() => {
      cy.get("#registerButton").click()

      cy.get('input[placeholder="Nickname"]').type(user)
      cy.get('input[placeholder="Email"]').type("test" + user + "@gmail.com")
      cy.get('input[placeholder="Password"]').type(password)
      cy.get('input[placeholder="Password confirmation"]').type(password)
      cy.get("#register").click()

      cy.url().should("include", "/main")
    })
  })

  it("registration with short password", () => {
    cy.visit("http://localhost:3000/auth")
    cy.waitForGoogleApi().then(() => {
      cy.get("#registerButton").click()

      cy.get('input[placeholder="Nickname"]').type(user)
      cy.get('input[placeholder="Email"]').type("test" + user + "@gmail.com")
      cy.get('input[placeholder="Password"]').type(passwordShort)
      cy.get('input[placeholder="Password confirmation"]').type(passwordShort)
      cy.get("#register").click()

      cy.on("window:alert", (str) => {
        expect(str).contain(
          `This password is too short. It must contain at least 8 characters.`
        )
      })
    })
  })

  it("registration with wrong password confirmation", () => {
    cy.visit("http://localhost:3000/auth")
    cy.waitForGoogleApi().then(() => {
      cy.get("#registerButton").click()

      cy.get('input[placeholder="Nickname"]').type(user)
      cy.get('input[placeholder="Email"]').type("test" + user + "@gmail.com")
      cy.get('input[placeholder="Password"]').type(password)
      cy.get('input[placeholder="Password confirmation"]').type(password + "wr")
      cy.get("#register").click()

      cy.on("window:alert", (str) => {
        expect(str).contain(`Passwords do not match`)
      })
    })
  })

  it("login after registration", () => {
    cy.visit("http://localhost:3000/auth")
    cy.get('input[placeholder="Email"]').type("test" + user + "@gmail.com")
    cy.get('input[placeholder="Password"]').type(password)
    cy.get("#loginButton").click()

    cy.url().should("include", "/main")
  })
})
