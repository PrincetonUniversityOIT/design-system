import {AccordionBehavior} from "./accordion";

it('We should be able to call new() on AccordionBehavior', () => {
    // Ensure constructor created the object:
    const accordion = new AccordionBehavior();
    expect(accordion).toBeTruthy();
});

it('We can check that content is hidden and shown correctly', () => {
    document.body.innerHTML = `
      <div class="jazz-accordion" role="region">
          <h2>
            <button id="acrd-btn-1" class="jazz-accordion__button" aria-controls="content1">Sed porttitor lectus nibh?</button>
          </h2>
          <div class="jazz-accordion__content" id="content1">
              Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem. Praesent sapien massa, convallis a 
              pellentesque nec, egestas non nisi.
          </div>
          <h2>
            <button id="acrd-btn-2" class="jazz-accordion__button" aria-expanded="true" aria-controls="content2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ultricies ligula sed magna dictum porta?</button>
          </h2>
          <div aria-hidden="false" class="jazz-accordion__content expanded" id="content2">
              Quisque velit nisi, pretium ut lacinia in, elementum id enim. Curabitur arcu erat, accumsan id imperdiet 
              et, porttitor at sem. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. 
              Cras ultricies ligula sed magna dictum porta.
          </div>
          <h2>
            <button class="jazz-accordion__button" aria-controls="content3">Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus. Curabitur aliquet quam id dui posuere blandit.</button>
          </h2>
          <div class="jazz-accordion__content" id="content3">
              Nulla porttitor accumsan tincidunt. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices 
              posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula. 
              Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem.
          </div>
          <h2>
            <button class="jazz-accordion__button" aria-controls="content4">Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus. Curabitur aliquet quam id dui posuere blandit.</button>
          </h2>
          <div class="jazz-accordion__content" id="content4">
              Nulla porttitor accumsan tincidunt. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices 
              posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula. 
              Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem.
          </div>
      </div>
  `;

    const accordion = new AccordionBehavior();
    accordion.enable();

    const content = document.getElementById('content1');
    // check if content is hidden
    expect(content.classList.contains('expanded')).toBe(false);

    const button = document.getElementById('acrd-btn-1');
    // check if aria-expanded attribute is false
    expect(button.getAttribute('aria-expanded')).toBe("false");
    button.click();

    // after button click check of content is shown
    expect(content.hidden).toBe(false);

    // after button click check if aria-expanded attribute for button is set to true
    expect(button.getAttribute('aria-expanded')).toBe("true");
});

it('We can check that content is hidden and shown correctly for multi selectable accordions', () => {
    document.body.innerHTML = `
      <div id="accordion1" class="jazz-accordion" role="region" aria-multiselectable="true">
          <h2>
            <button id="acrd-btn-1" class="jazz-accordion__button" aria-controls="content1">Sed porttitor lectus nibh?</button>
          </h2>
          <div class="jazz-accordion__content" id="content1">
              Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem. Praesent sapien massa, convallis a 
              pellentesque nec, egestas non nisi.
          </div>
          <h2>
            <button id="acrd-btn-2" class="jazz-accordion__button" aria-controls="content2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ultricies ligula sed magna dictum porta?</button>
          </h2>
          <div aria-hidden="false" class="jazz-accordion__content" id="content2">
              Quisque velit nisi, pretium ut lacinia in, elementum id enim. Curabitur arcu erat, accumsan id imperdiet 
              et, porttitor at sem. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. 
              Cras ultricies ligula sed magna dictum porta.
          </div>
          <h2>
            <button class="jazz-accordion__button" aria-controls="content3">Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus. Curabitur aliquet quam id dui posuere blandit.</button>
          </h2>
          <div class="jazz-accordion__content" id="content3">
              Nulla porttitor accumsan tincidunt. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices 
              posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula. 
              Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem.
          </div>
          <h2>
            <button class="jazz-accordion__button" aria-controls="content4">Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus. Curabitur aliquet quam id dui posuere blandit.</button>
          </h2>
          <div class="jazz-accordion__content" id="content4">
              Nulla porttitor accumsan tincidunt. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices 
              posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula. 
              Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem.
          </div>
      </div>
  `;

    const accordion = new AccordionBehavior();
    accordion.enable();

    const accordion1 = document.getElementById('accordion1');
    // check if we allow multiple open accordions
    expect(accordion1.getAttribute('aria-multiselectable')).toBe("true");

    /* Content 1 */
    const content = document.getElementById('content1');
    // check if content is hidden
    expect(content.classList.contains('expanded')).toBe(false);

    const button = document.getElementById('acrd-btn-1');
    // check if aria-expanded attribute is false
    expect(button.getAttribute('aria-expanded')).toBe("false");
    button.click();

    /* Content 2 */
    const content2 = document.getElementById('content2');
    // check if content is hidden
    expect(content2.classList.contains('expanded')).toBe(false);

    const button2 = document.getElementById('acrd-btn-2');
    // check if aria-expanded attribute is false
    expect(button2.getAttribute('aria-expanded')).toBe("false");
    button2.click();

    // after button click check of content is shown
    expect(content.hidden).toBe(false);
    expect(content2.hidden).toBe(false);

    // after button click check if aria-expanded attribute for button is set to true
    expect(button.getAttribute('aria-expanded')).toBe("true");
    expect(button2.getAttribute('aria-expanded')).toBe("true");
});

it('We can check that content is hidden and shown correctly for non-multi selectable accordions', () => {
  document.body.innerHTML = `
      <div id="accordion1" class="jazz-accordion" role="region">
          <h2>
            <button id="acrd-btn-1" class="jazz-accordion__button" aria-controls="content1">Sed porttitor lectus nibh?</button>
          </h2>
          <div class="jazz-accordion__content" id="content1">
              Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem. Praesent sapien massa, convallis a 
              pellentesque nec, egestas non nisi.
          </div>
          <h2>
            <button id="acrd-btn-2" class="jazz-accordion__button" aria-controls="content2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ultricies ligula sed magna dictum porta?</button>
          </h2>
          <div aria-hidden="false" class="jazz-accordion__content" id="content2">
              Quisque velit nisi, pretium ut lacinia in, elementum id enim. Curabitur arcu erat, accumsan id imperdiet 
              et, porttitor at sem. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. 
              Cras ultricies ligula sed magna dictum porta.
          </div>
          <h2>
            <button class="jazz-accordion__button" aria-controls="content3">Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus. Curabitur aliquet quam id dui posuere blandit.</button>
          </h2>
          <div class="jazz-accordion__content" id="content3">
              Nulla porttitor accumsan tincidunt. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices 
              posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula. 
              Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem.
          </div>
          <h2>
            <button class="jazz-accordion__button" aria-controls="content4">Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus. Curabitur aliquet quam id dui posuere blandit.</button>
          </h2>
          <div class="jazz-accordion__content" id="content4">
              Nulla porttitor accumsan tincidunt. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices 
              posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula. 
              Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem.
          </div>
      </div>
  `;

  const accordion = new AccordionBehavior();
  accordion.enable();

  const accordion1 = document.getElementById('accordion1');
  // check if we allow multiple open accordions
  expect(accordion1.getAttribute('aria-multiselectable')).toBe(null);

  /* Content 1 */
  const content = document.getElementById('content1');
  // check if content is hidden
  expect(content.classList.contains('expanded')).toBe(false);

  const button = document.getElementById('acrd-btn-1');
  // check if aria-expanded attribute is false
  expect(button.getAttribute('aria-expanded')).toBe("false");
  button.click();

  /* Content 2 */
  const content2 = document.getElementById('content2');
  // check if content is hidden
  expect(content2.classList.contains('expanded')).toBe(false);

  const button2 = document.getElementById('acrd-btn-2');
  // check if aria-expanded attribute is false-
  expect(button2.getAttribute('aria-expanded')).toBe("false");
  button2.click();

  // after button click check of content is shown only for the 2nd accordion section
  expect(content.classList.contains('expanded')).toBe(false);
  expect(content2.classList.contains('expanded')).toBe(true);

  // after button click check if aria-expanded attribute for button is set to true only for the 2nd button
  expect(button.getAttribute('aria-expanded')).toBe("false");
  expect(button2.getAttribute('aria-expanded')).toBe("true");
});

