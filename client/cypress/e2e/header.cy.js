describe("Header test", () => {
  const user = (Math.random() + 1).toString(36).substring(8)
  const password = (Math.random() + 1).toString(36).substring(2)

  beforeEach(() => {
    cy.visit("http://localhost:3000/main")
  })

  it("header without register", () => {
    cy.url().should("include", "/main")
    cy.get("#header li:nth-child(1)").should("have.text", "Главная")
    cy.get("#header li:nth-child(2)").should("have.text", "Рейтинг")
    cy.get("#header li:nth-child(3)").should("have.text", "Войти")
    cy.get("#header li").should("not.contain.text", "Игра")
    cy.get("#header li").should("not.contain.text", "Статистика")
  })

  it("header after registration", () => {
    cy.visit("http://localhost:3000/auth")
    cy.waitForGoogleApi().then(() => {
      cy.get("#registerButton").click()

      cy.get('input[placeholder="Nickname"]').type(user)
      cy.get('input[placeholder="Email"]').type("test." + user + "@gmail.com")
      cy.get('input[placeholder="Password"]').type(password)
      cy.get('input[placeholder="Password confirmation"]').type(password)
      cy.get("#register").click()
    })
    cy.get("#header li:nth-child(1)").should("have.text", "Главная")
    cy.get("#header li:nth-child(2)").should("have.text", "Рейтинг")
    cy.get("#header li:nth-child(3)").should("have.text", "Статистика")
    cy.get("#header li:nth-child(4)").should("have.text", "Настройки")
    cy.get("#header li:nth-child(5)").should("have.text", "Выйти")
  })
})
