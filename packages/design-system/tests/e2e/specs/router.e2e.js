describe('Router', () => {
  describe('Home', () => {
    it('Should redirect to home of web design system', () => {
      cy.visit('/');
      cy.url().should('eq', Cypress.config().baseUrl + '/#/web');

      cy.visit('/#/some-invalid-url');
      cy.url().should('eq', Cypress.config().baseUrl + '/#/web');

      cy.visit('/#/some/completely/invalid/url');
      cy.url().should('eq', Cypress.config().baseUrl + '/#/web');
    });
  });

  describe('App', () => {
    it('Should route to home', () => {
      cy.visit('/#/app');
      cy.url().should('eq', Cypress.config().baseUrl + '/#/app');
    });

    it('Should route to 404', () => {
      cy.visit('/#/app/404');
      cy.url().should('eq', Cypress.config().baseUrl + '/#/app/404');
    });

    it('Should route to custom view', () => {
      cy.visit('/#/app/license');
      cy.url().should('eq', Cypress.config().baseUrl + '/#/app/license');
    });

    it('Should route to page', () => {
      cy.visit('/#/app/getting-started/about');
      cy.url().should('eq', Cypress.config().baseUrl + '/#/app/getting-started/about');
    });

    it('Should route to story', () => {
      cy.visit('/#/app/components/basic/color');
      cy.url().should('eq', Cypress.config().baseUrl + '/#/app/components/basic/color');
    });

    it('Should redirect to 404', () => {
      cy.visit('/#/app/some-invalid-custom-view');
      cy.url().should('eq', Cypress.config().baseUrl + '/#/app/404');

      cy.visit('/#/app/some-invalid-category/some-invalid-page');
      cy.url().should('eq', Cypress.config().baseUrl + '/#/app/404');

      cy.visit('/#/app/some-invalid-category/about');
      cy.url().should('eq', Cypress.config().baseUrl + '/#/app/404');

      cy.visit('/#/app/getting-started/some-invalid-page');
      cy.url().should('eq', Cypress.config().baseUrl + '/#/app/404');

      cy.visit('/#/app/components/some-invalid-category/some-invalid-story');
      cy.url().should('eq', Cypress.config().baseUrl + '/#/app/404');

      cy.visit('/#/app/components/some-invalid-category/typography');
      cy.url().should('eq', Cypress.config().baseUrl + '/#/app/404');

      cy.visit('/#/app/components/basic/some-invalid-story');
      cy.url().should('eq', Cypress.config().baseUrl + '/#/app/404');

      cy.visit('/#/app/some/completely/invalid/url');
      cy.url().should('eq', Cypress.config().baseUrl + '/#/app/404');
    });
  });

  describe('Web', () => {
    it('Should route to home', () => {
      cy.visit('/#/web');
      cy.url().should('eq', Cypress.config().baseUrl + '/#/web');
    });

    it('Should route to 404', () => {
      cy.visit('/#/web/404');
      cy.url().should('eq', Cypress.config().baseUrl + '/#/web/404');
    });

    it('Should route to custom view', () => {
      cy.visit('/#/web/license');
      cy.url().should('eq', Cypress.config().baseUrl + '/#/web/license');
    });

    it('Should route to page', () => {
      cy.visit('/#/web/getting-started/about');
      cy.url().should('eq', Cypress.config().baseUrl + '/#/web/getting-started/about');
    });

    it('Should route to story', () => {
      cy.visit('/#/web/components/basic/typography#design');
      cy.url().should('eq', Cypress.config().baseUrl + '/#/web/components/basic/typography#design');

      cy.visit('/#/web/components/basic/typography#code-headline');
      cy.url().should('eq', Cypress.config().baseUrl + '/#/web/components/basic/typography#code-headline');

      cy.visit('/#/web/components/basic/typography#props');
      cy.url().should('eq', Cypress.config().baseUrl + '/#/web/components/basic/typography#props');
    });

    it('Should route to story and fallback to available first tab', () => {
      cy.visit('/#/web/components/basic/typography');
      cy.url().should('eq', Cypress.config().baseUrl + '/#/web/components/basic/typography#design');

      cy.visit('/#/web/components/basic/typography#some-invalid-tab');
      cy.url().should('eq', Cypress.config().baseUrl + '/#/web/components/basic/typography#design');

      cy.visit('/#/web/components/layout/flex');
      cy.url().should('eq', Cypress.config().baseUrl + '/#/web/components/layout/flex#code');

      cy.visit('/#/web/components/layout/flex#some-invalid-tab');
      cy.url().should('eq', Cypress.config().baseUrl + '/#/web/components/layout/flex#code');
    });

    it('Should redirect to 404', () => {
      cy.visit('/#/web/some-invalid-custom-view');
      cy.url().should('eq', Cypress.config().baseUrl + '/#/web/404');

      cy.visit('/#/web/some-invalid-category/some-invalid-page');
      cy.url().should('eq', Cypress.config().baseUrl + '/#/web/404');

      cy.visit('/#/web/some-invalid-category/about');
      cy.url().should('eq', Cypress.config().baseUrl + '/#/web/404');

      cy.visit('/#/web/getting-started/some-invalid-page');
      cy.url().should('eq', Cypress.config().baseUrl + '/#/web/404');

      cy.visit('/#/web/components/some-invalid-category/some-invalid-story');
      cy.url().should('eq', Cypress.config().baseUrl + '/#/web/404');

      cy.visit('/#/web/components/some-invalid-category/typography');
      cy.url().should('eq', Cypress.config().baseUrl + '/#/web/404');

      cy.visit('/#/web/components/basic/some-invalid-story');
      cy.url().should('eq', Cypress.config().baseUrl + '/#/web/404');

      cy.visit('/#/web/some/completely/invalid/url');
      cy.url().should('eq', Cypress.config().baseUrl + '/#/web/404');
    });
  });
});
