describe('Home', () => {
  it('Should show page title', () => {
    cy.visit('/');

    cy.get('#app header img.marque')
      .click()
      .parents('a')
      .should('have.class', 'router-link-active');

    cy.document({log: false})
      .shadowGet('p-headline')
      .shadowFirst()
      .should('be.visible')
      .and('contain', 'Porsche UI Kit');
  });
});
