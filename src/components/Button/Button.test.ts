import { expect } from 'chai';
import sinon from 'sinon';
import { Button } from './Button.ts';

describe('Button component test', () => {
  it('Should be button', () => {
    const button = new Button({ label: '123' });

    const element = button.element as HTMLElement;

    expect(element.tagName).to.equal('BUTTON');
  });

  it('Should be clickable', () => {
    const callback = sinon.stub();
    const button = new Button({ label: '123', events: { click: callback }});

    const element = button.element as HTMLButtonElement;

    element.click();

    expect(callback.calledOnce).to.eq(true);
  });

  it('Should have right label', () => {
    const button = new Button({ label: '123'});

    const element = button.element as HTMLButtonElement;

    expect(element.innerHTML).to.equal('123');
  });

  it('Should have right type', () => {
    const button = new Button({ label: '123', type: 'submit' });

    const element = button.element as HTMLButtonElement;

    expect(element.type).to.equal('submit');
  });
});
