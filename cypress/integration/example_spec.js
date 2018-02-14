describe("Trek Reviews Online", function() {
    it("should assert that title is correct", function functionName() {
        cy.visit("https://trekreviews1701.firebaseapp.com/")
        cy.title().should("include", "Trek Reviews Online")
        cy.get("#movies").should("include", "Star Trek Nemesis")
    })
})
