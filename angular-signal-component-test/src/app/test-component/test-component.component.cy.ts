import { signal } from '@angular/core';
import { TestComponentComponent } from './test-component.component';
import { createOutputSpy } from 'cypress/angular';

it('mount component with component properties', () => {
  cy.mount(TestComponentComponent, {
    componentProperties: {
      title: 'Test Component',
      count: signal(0),
      countChange: createOutputSpy('countChange'),
    },
  });
  cy.get('button').eq(0).click();
  cy.get('@countChange').should('have.been.called');
});

it('mount component template with component properties', () => {
  cy.mount(
    `<app-test-component [title]="title" [count]="count" (countChange)="countChange.emit($event)"></app-test-component>`,
    {
      imports: [TestComponentComponent],
      componentProperties: {
        title: 'Test Component Template',
        count: signal(0),
        countChange: createOutputSpy('countChange'),
      },
    }
  );

  cy.get('button').eq(0).click();
  cy.get('@countChange').should('have.been.called');
});
