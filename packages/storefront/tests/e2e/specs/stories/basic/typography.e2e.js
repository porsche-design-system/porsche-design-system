describe('Typography', () => {
  it('Should navigate through main navigation', () => {
    cy.visit('/');

    cy.get('#app .sidebar nav p-link-pure')
      .contains('Typography')
      .click()
      .should('have.attr', 'active', 'true');

    cy.get('#app main h1')
      .should('be.visible')
      .and('contain', 'Typography');
  });

  describe('Tabs', () => {
    beforeEach(() => {
      cy.visit('/#/components/basic/typography');
    });

    it('Should show tab navigation with first tab activated', () => {
      cy.get('#app main .tabs a').should(($a) => {
        expect($a, '4 items').to.have.length(4);
        expect($a.eq(0), 'first item')
          .to.contain('Design')
          .to.have.class('router-link-active');
        expect($a.eq(1), 'second item')
          .to.contain('Code Headline')
          .not.to.have.class('router-link-active');
        expect($a.eq(2), 'second item')
          .to.contain('Code Text')
          .not.to.have.class('router-link-active');
        expect($a.eq(3), 'third item')
          .to.contain('Props')
          .not.to.have.class('router-link-active');
      });
    });

    it('Should show design documentation', () => {
      cy.get('#app main .tabs a')
        .contains('Design')
        .click()
        .should('have.class', 'router-link-active');

      cy.get('#app main h1').should('contain', 'Typography');
    });

    it('Should show headline code documentation', () => {
      cy.get('#app main .tabs a')
        .contains('Code Headline')
        .click()
        .should('have.class', 'router-link-active');

      cy.get('#app main h1').should('contain', 'Headline');
    });

    it('Should show text code documentation', () => {
      cy.get('#app main .tabs a')
        .contains('Code Text')
        .click()
        .should('have.class', 'router-link-active');

      cy.get('#app main h1').should('contain', 'Text');
    });

    it('Should show props documentation', () => {
      cy.get('#app main .tabs a')
        .contains('Props')
        .click()
        .should('have.class', 'router-link-active');

      cy.get('#app main h1:eq(0)').should('contain', 'Headline');

      cy.get('#app main h1:eq(1)').should('contain', 'Text');
    });
  });
});
