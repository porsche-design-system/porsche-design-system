describe('Router', () => {
  it('Should redirect to home of web design system', () => {
    cy.visit('/');
    cy.url().should('eq', Cypress.config().baseUrl + '/#/');
  });

  it('Should route to home', () => {
    cy.visit('/#/web');
    cy.url().should('eq', Cypress.config().baseUrl + '/#/');

    cy.visit('/#/web/some-invalid-url');
    cy.url().should('eq', Cypress.config().baseUrl + '/#/');

    cy.visit('/#/web/some/completely/invalid/url');
    cy.url().should('eq', Cypress.config().baseUrl + '/#/');
  });

  it('Should route to 404', () => {
    cy.visit('/#/404');
    cy.url().should('eq', Cypress.config().baseUrl + '/#/404');

    cy.visit('/#/some-invalid-url');
    cy.url().should('eq', Cypress.config().baseUrl + '/#/404');

    cy.visit('/#/some/completely/invalid/url');
    cy.url().should('eq', Cypress.config().baseUrl + '/#/404');

    cy.visit('/#/some-invalid-category/about');
    cy.url().should('eq', Cypress.config().baseUrl + '/#/404');

    cy.visit('/#/getting-started/some-invalid-page');
    cy.url().should('eq', Cypress.config().baseUrl + '/#/404');

    cy.visit('/#/components/some-invalid-category/some-invalid-story');
    cy.url().should('eq', Cypress.config().baseUrl + '/#/404');

    cy.visit('/#/components/some-invalid-category/typography');
    cy.url().should('eq', Cypress.config().baseUrl + '/#/404');

    cy.visit('/#/components/basic/some-invalid-story');
    cy.url().should('eq', Cypress.config().baseUrl + '/#/404');

    cy.visit('/#/patterns/forms/invalid-pattern');
    cy.url().should('eq', Cypress.config().baseUrl + '/#/404');
  });

  it('Should route to custom view', () => {
    cy.visit('/#/license');
    cy.url().should('eq', Cypress.config().baseUrl + '/#/license');
  });

  it('Should route to page', () => {
    cy.visit('/#/about/introduction');
    cy.url().should('eq', Cypress.config().baseUrl + '/#/about/introduction');

    cy.visit('/#/patterns/forms#guidelines');
    cy.url().should('eq', Cypress.config().baseUrl + '/#/patterns/forms#guidelines');

    cy.visit('/#/patterns/forms#ressources');
    cy.url().should('eq', Cypress.config().baseUrl + '/#/patterns/forms#ressources');
  });

  it('Should route to page and fallback to available first tab', () => {
    cy.visit('/#/patterns/forms#some-invalid-tab');
    cy.url().should('eq', Cypress.config().baseUrl + '/#/patterns/forms#guidelines');

    cy.visit('/#/patterns/forms');
    cy.url().should('eq', Cypress.config().baseUrl + '/#/patterns/forms#guidelines');
  });

  it('Should route to story', () => {
    cy.visit('/#/components/basic/typography');
    cy.url().should('eq', Cypress.config().baseUrl + '/#/components/basic/typography#design');

    cy.visit('/#/components/basic/typography#design');
    cy.url().should('eq', Cypress.config().baseUrl + '/#/components/basic/typography#design');

    cy.visit('/#/components/basic/typography#code-headline');
    cy.url().should('eq', Cypress.config().baseUrl + '/#/components/basic/typography#code-headline');

    cy.visit('/#/components/basic/typography#props');
    cy.url().should('eq', Cypress.config().baseUrl + '/#/components/basic/typography#props');
  });

  it('Should route to story and fallback to available first tab', () => {
    cy.visit('/#/components/basic/typography#some-invalid-tab');
    cy.url().should('eq', Cypress.config().baseUrl + '/#/components/basic/typography#design');

    cy.visit('/#/components/layout/flex');
    cy.url().should('eq', Cypress.config().baseUrl + '/#/components/layout/flex#code');

    cy.visit('/#/components/layout/flex#some-invalid-tab');
    cy.url().should('eq', Cypress.config().baseUrl + '/#/components/layout/flex#code');
  });

  it('Should route to pattern view', () => {
    cy.visit('/#/patterns/forms/example-login');
    cy.url().should('eq', Cypress.config().baseUrl + '/#/patterns/forms/example-login');
  });
});
