/// <reference types="Cypress" />

describe('Guessing', () => {
  it('shows the pokemon hidden if the game is on guessing state', () => {
    cy.visit('/');

    cy.get('[data-test-id="image"]').should('have.css', 'filter').and('equals', 'brightness(0)')
  })

  it('shows the red border on input if guessing is wrong', () => {
    cy.visit('/');

    cy.get('[data-test-id="input"]').type('algo-mal{enter}').should('have.class', 'is-error')
  })

  it.only('shows the pokemon image if the game is on success state', () => {
    cy.visit('/');

    cy.get('[data-test-id="input"]').type('venusaur{enter}')
    cy.get('[data-test-id="success"]')
  })
})
