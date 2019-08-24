// / <reference types="Cypress" />

const autoRecord = require('cypress-autorecord'); // Require the autorecord function


// need to avoid ES6 arrow funcs... b/c??
describe('Tasks', function() {
  autoRecord();

  it('create and complete a task', function() {
    cy.visit('localhost:8080');

    cy.get('.new-task').should('have.attr', 'placeholder', 'Add New Task')
      .type('shakespeare my butt');

    cy.get('.create').click();

    cy.get('[id=4]').click();

    cy.get('.row:last-of-type .delete').click();
  });
});
