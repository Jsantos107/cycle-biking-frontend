describe("Page loading", ()=> {
    it("loads the page", ()=>{
        cy.visit("http://localhost:3001")
    })
    it("shows checklist", ()=>{
        cy.get("#main-page").should("be.hidden")
    })
})