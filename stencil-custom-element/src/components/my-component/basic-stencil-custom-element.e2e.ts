import { newE2EPage } from '@stencil/core/testing';

describe('basic-stencil-custom-element', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<basic-stencil-custom-element></basic-stencil-custom-element>');
    const element = await page.find('basic-stencil-custom-element');
    expect(element).toHaveClass('hydrated');
  });

  it('renders changes to the name data', async () => {
    const page = await newE2EPage();

    await page.setContent('<basic-stencil-custom-element></basic-stencil-custom-element>');
    const component = await page.find('basic-stencil-custom-element');
    const element = await page.find('basic-stencil-custom-element >>> div');
    expect(element.textContent).toEqual(`Hello, World! I'm `);

    component.setProperty('first', 'James');
    await page.waitForChanges();
    expect(element.textContent).toEqual(`Hello, World! I'm James`);

    component.setProperty('last', 'Quincy');
    await page.waitForChanges();
    expect(element.textContent).toEqual(`Hello, World! I'm James Quincy`);

    component.setProperty('middle', 'Earl');
    await page.waitForChanges();
    expect(element.textContent).toEqual(`Hello, World! I'm James Earl Quincy`);
  });
});
