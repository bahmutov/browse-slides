/// <reference types="cypress" />

import { recurse } from 'cypress-recurse'

function goVertical() {
  return recurse(
    () => cy.get('.navigate-down'),
    ($button) => !$button.hasClass('enabled'),
    {
      log: false,
      timeout: 200000,
      delay: 1000,
      post() {
        cy.get('.navigate-down').click()
      },
    },
  )
}

it('goes through all slides', () => {
  cy.visit('/')
  recurse(
    () => goVertical().then(() => cy.get('.navigate-right')),
    ($button) => !$button.hasClass('enabled'),
    {
      log: false,
      timeout: 200000,
      delay: 1000,
      post() {
        cy.get('.navigate-right').click()
      },
    },
  )
})
