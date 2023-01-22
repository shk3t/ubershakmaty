describe("Main Page test", () => {
  const user = (Math.random() + 1).toString(36).substring(8)
  const password = (Math.random() + 1).toString(36).substring(2)

  it("registration + stat", () => {
    cy.visit("http://localhost:3000/auth")
    cy.waitForGoogleApi().then(() => {
      cy.get("#registerButton").click()

      cy.get('input[placeholder="Nickname"]').type(user)
      cy.get('input[placeholder="Email"]').type("test." + user + "@gmail.com")
      cy.get('input[placeholder="Password"]').type(password)
      cy.get('input[placeholder="Password confirmation"]').type(password)
      cy.get("#register").click()

      cy.url().should("include", "/main")
      cy.get("li").contains("Статистика").click()
      cy.url().should("include", "/statistic")
      cy.get("#statisticTable")
        .get("tr:nth-child(2) td:nth-child(2)")
        .then(function (d) {
          const r = d.text()
          expect(r).to.contains("")
        })
    })
  })
})
