// / <reference types="Cypress" />

context('ToDoApp', () => {
  beforeEach(() => {
    cy.visit('localhost:8080');
  });

  describe('Tasks', () => {

    it('create and complete a task', () => {

      cy.get('.new-task').should('have.attr', 'placeholder', 'Add New Task')
        .type('shakespeare my butt');

      cy.get('.create').click();

      cy.get('[id=4]').click();

      cy.get('.row:last-of-type .delete').click();
    });
  });
});
