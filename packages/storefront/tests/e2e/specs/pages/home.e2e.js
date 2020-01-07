describe('Home', () => {
  it('Should show page title', () => {
    cy.visit('/#/web');

    cy.get('#app header p-marque')
      .click()
      .parents('a')
      .should('have.class', 'router-link-active');

    cy.document({log: false})
      .shadowGet('p-headline')
      .shadowFirst()
      .should('be.visible')
      .and('contain', 'Design System');
  });
});
