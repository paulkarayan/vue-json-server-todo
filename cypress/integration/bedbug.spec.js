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

    it('bad test - doesnt check for non 200 status', () => {
      cy.server();
      cy.request({
        method: 'GET',
        url: '*/tasks',
        status: 412,
      })
      cy.get('.new-task').should('have.attr', 'placeholder', 'Add New Task')
        .type('shakespeare my butt');
    });

    it('better test - checks for 200 status', () => {
      cy.server();
      cy.route({
        method: 'GET',
        url: '*/tasks',
        status: 412,
      })
        .should((response) => {
          expect(response.status).to.eq(200);
        });
      cy.get('.new-task').should('have.attr', 'placeholder', 'Add New Task')
        .type('shakespeare my butt');
    });
  });
});


//   it('doesnt fail when error is injected because of poor test design', () => {
//     // now let's bedbug this mother
//     cy.server()

//     cy.route({
//       method: 'GET', // Route all GET requests
//       url: 'comments/*', // that have a URL that matches '/users/*'
//       status: 412,
//     }).as('getBadComment')

//     cy.get('.network-btn').click()

//     cy.wait('@getBadComment').its('status').should('eq', 200)
//     // cy.get('.network-comment').should('contain', 'dolor')
//   })

//   it('should fail when error is injected', () => {
//     // now let's bedbug this mother
//     cy.server()

//     cy.route({
//       method: 'GET', // Route all GET requests
//       url: 'comments/*', // that have a URL that matches '/users/*'
//       status: 200,
//       response: {
//         body: "this is a nasty rude message that should never have been posted here",
//       },
//     }).as('getBadComment')

//     cy.get('.network-btn').click()

//     cy.wait('@getBadComment').its('status').should('eq', 200)
//     cy.get('.network-comment').should('contain', 'dolor')
//   })
