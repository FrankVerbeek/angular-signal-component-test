import { signal } from '@angular/core';
import { TestComponentComponent } from './test-component.component';
import { createOutputSpy } from 'cypress/angular-signals';

it('mount component with component properties', () => {
  cy.mount(TestComponentComponent, {
    componentProperties: {
      title: 'Test Component',
      count: signal(0),
      // we need to @ts-expect-error here since count is not a decorated Output()
      // so the property doesn't exist on the component. However, since count is a model signal, it 
      // produces an output, so this code will work in spying on the signal output
      // @ts-expect-error
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
