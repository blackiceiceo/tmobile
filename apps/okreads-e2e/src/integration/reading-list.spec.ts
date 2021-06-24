import { expectation } from "cypress/types/sinon";

describe('When: I use the reading list feature', () => {
  beforeEach(() => {
    cy.startAt('/');
  });

  it('Then: I should see my reading list', () => {
    cy.get('[data-testing="toggle-reading-list"]').click();

    cy.get('[data-testing="reading-list-container"]').should(
      'contain.text',
      'My Reading List'
    );
  });

  it('Then: I should be able to add a book to the reading-list and undo it', () => {
    cy.get('input[type="search"]').type('javascript');

    cy.get('form').submit();



    cy.get('[data-testing="book-item"]').then(books => {
      const result = Array.from(books);
      result[0].click();
    });

    cy.get('.mat-simple-snackbar').get('button').click();



    cy.get('[data-testing="toggle-reading-list"]').click();

    cy.get('.reading-list-item').should('have.length', 0);

    
  });

  it('Then: I should be able to add a book into the reading-list, remove it and undo that remove', () =>{
    cy.get('input[type="search"]').type('javascript');

    cy.get('form').submit();

    cy.get('[data-testing="book-item"]').then(books => {
      const results = Array.from(books);
      results[0].click();
    });

    cy.get('[data-testing="toggle-reading-list"]').click();

    cy.get('.reading-list-item').then(books => {
      const booksInReadingList = Array.from(books);
      booksInReadingList[0].click();
    })

    cy.get('.mat-simple-snackbar').get('button').click();

    cy.get('.reading-list-item').should('have.length', 1);

  });

});
