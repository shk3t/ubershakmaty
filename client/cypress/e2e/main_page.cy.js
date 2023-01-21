import "cypress-react-selector"


describe("Main Page test", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/main")
  })
  it("new game panel", () => {
    cy.url().should("include", "/main")
    cy.get("#newGame ul li").first().should("have.text", "Новая игра")
    cy.get("#newGame ul li").last().should("have.text", "Время")
  })

  it("friends", () => {
    cy.get("#friendsButton").click()
    cy.on("window:alert", (str) => {
      expect(str).to.equal(`It seems like you have no friends..`)
    })
  })

  it("rating", () => {
    cy.get("#rateButton").click()
    cy.url().should("include", "/table")
  })
})
