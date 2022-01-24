import {ACCORDION_CONTENT_EXPANDED_CLASSNAME, ACCORDION_MULTISELECTABLE_CLASSNAME, AccordionBehavior} from "./accordion";

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
          <div class="jazz-accordion__content jazz-accordion__content--expanded" id="content2">
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
          <h2>
            <button class="jazz-accordion__button" aria-controls="content5">Ultricies mi quis hendrerit dolor magna eget est.</button>
          </h2>
          <div class="jazz-accordion__content" id="content5">
             Non enim praesent elementum facilisis leo. Non blandit massa enim nec dui nunc mattis enim ut. Lorem sed
             risus ultricies tristique <a href="#">nulla aliquet</a> enim tortor at. Sodales ut eu sem integer vitae justo eget. Donec
             pretium vulputate sapien nec sagittis. Sit amet dictum sit amet justo. Faucibus in ornare quam viverra orci
             sagittis eu.
          </div>
      </div>
  `;

    const accordion = new AccordionBehavior();
    accordion.enable();

    const content = document.getElementById('content1');
    // check if content is hidden
    expect(content.classList.contains(ACCORDION_CONTENT_EXPANDED_CLASSNAME)).toBe(false);

    const button = document.getElementById('acrd-btn-1');
    // check if aria-expanded attribute is false
    expect(button.getAttribute('aria-expanded')).toBe("false");
    button.click();

    // after button click check if content is shown
    expect(content.classList.contains(ACCORDION_CONTENT_EXPANDED_CLASSNAME)).toBe(true);

    // after button click check if aria-expanded attribute for button is set to true
    expect(button.getAttribute('aria-expanded')).toBe("true");
});

it('We can check that content is hidden and shown correctly for multi selectable accordions', () => {
    document.body.innerHTML = `
      <div id="accordion1" class="jazz-accordion jazz-accordion-multiselectable" role="region">
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
          <div class="jazz-accordion__content" id="content2">
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
          <h2>
            <button class="jazz-accordion__button" aria-controls="content5">Ultricies mi quis hendrerit dolor magna eget est.</button>
          </h2>
          <div class="jazz-accordion__content" id="content5">
             Non enim praesent elementum facilisis leo. Non blandit massa enim nec dui nunc mattis enim ut. Lorem sed
             risus ultricies tristique <a href="#">nulla aliquet</a> enim tortor at. Sodales ut eu sem integer vitae justo eget. Donec
             pretium vulputate sapien nec sagittis. Sit amet dictum sit amet justo. Faucibus in ornare quam viverra orci
             sagittis eu.
          </div>
      </div>
  `;

    const accordion = new AccordionBehavior();
    accordion.enable();

    const accordion1 = document.getElementById('accordion1');
    // check if we allow multiple open accordions
    expect(accordion1.classList.contains(ACCORDION_MULTISELECTABLE_CLASSNAME)).toBe(true);

  /* Content 1 */
    const content = document.getElementById('content1');
    // check if content is hidden
    expect(content.classList.contains(ACCORDION_CONTENT_EXPANDED_CLASSNAME)).toBe(false);

    const button = document.getElementById('acrd-btn-1');
    // check if aria-expanded attribute is false
    expect(button.getAttribute('aria-expanded')).toBe("false");
    button.click();

    /* Content 2 */
    const content2 = document.getElementById('content2');
    // check if content is hidden
    expect(content2.classList.contains(ACCORDION_CONTENT_EXPANDED_CLASSNAME)).toBe(false);

    const button2 = document.getElementById('acrd-btn-2');
    // check if aria-expanded attribute is false
    expect(button2.getAttribute('aria-expanded')).toBe("false");
    button2.click();

    // after button click check if content is shown
    expect(content.classList.contains(ACCORDION_CONTENT_EXPANDED_CLASSNAME)).toBe(true);
    expect(content2.classList.contains(ACCORDION_CONTENT_EXPANDED_CLASSNAME)).toBe(true);

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
          <div class="jazz-accordion__content" id="content2">
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
          <h2>
            <button class="jazz-accordion__button" aria-controls="content5">Ultricies mi quis hendrerit dolor magna eget est.</button>
          </h2>
          <div class="jazz-accordion__content" id="content5">
             Non enim praesent elementum facilisis leo. Non blandit massa enim nec dui nunc mattis enim ut. Lorem sed
             risus ultricies tristique <a href="#">nulla aliquet</a> enim tortor at. Sodales ut eu sem integer vitae justo eget. Donec
             pretium vulputate sapien nec sagittis. Sit amet dictum sit amet justo. Faucibus in ornare quam viverra orci
             sagittis eu.
          </div>
      </div>
  `;

  const accordion = new AccordionBehavior();
  accordion.enable();

  const accordion1 = document.getElementById('accordion1');
  // check if we allow multiple open accordions
  expect(accordion1.classList.contains(ACCORDION_MULTISELECTABLE_CLASSNAME)).toBe(false);

  /* Content 1 */
  const content = document.getElementById('content1');
  // check if content is hidden
  expect(content.classList.contains(ACCORDION_CONTENT_EXPANDED_CLASSNAME)).toBe(false);

  const button = document.getElementById('acrd-btn-1');
  // check if aria-expanded attribute is false
  expect(button.getAttribute('aria-expanded')).toBe("false");
  button.click();

  /* Content 2 */
  const content2 = document.getElementById('content2');
  // check if content is hidden
  expect(content2.classList.contains(ACCORDION_CONTENT_EXPANDED_CLASSNAME)).toBe(false);

  const button2 = document.getElementById('acrd-btn-2');
  // check if aria-expanded attribute is false-
  expect(button2.getAttribute('aria-expanded')).toBe("false");
  button2.click();

  // after button click check of content is shown only for the 2nd accordion section
  expect(content.classList.contains(ACCORDION_CONTENT_EXPANDED_CLASSNAME)).toBe(false);
  expect(content2.classList.contains(ACCORDION_CONTENT_EXPANDED_CLASSNAME)).toBe(true);

  // after button click check if aria-expanded attribute for button is set to true only for the 2nd button
  expect(button.getAttribute('aria-expanded')).toBe("false");
  expect(button2.getAttribute('aria-expanded')).toBe("true");
});

it('We can check that content is hidden and the hidden a tag is not focusable or clickable non-multi selectable accordions', () => {
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
          <div class="jazz-accordion__content" id="content2">
              Quisque velit nisi, pretium ut lacinia in, elementum id enim. Curabitur arcu erat, accumsan id imperdiet 
              et, porttitor at sem. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. 
              Cras ultricies ligula sed magna dictum porta.
          </div>
          <h2>
            <button id="acrd-btn-3" class="jazz-accordion__button" aria-controls="content3">Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus. Curabitur aliquet quam id dui posuere blandit.</button>
          </h2>
          <div class="jazz-accordion__content" id="content3">
              Nulla porttitor accumsan tincidunt. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices 
              posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula. 
              Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem.
          </div>
          <h2>
            <button id="acrd-btn-4" class="jazz-accordion__button" aria-controls="content4">Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus. Curabitur aliquet quam id dui posuere blandit.</button>
          </h2>
          <div class="jazz-accordion__content" id="content4">
              Nulla porttitor accumsan tincidunt. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices 
              posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula. 
              Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem.
          </div>
          <h2>
            <button id="acrd-btn-5" class="jazz-accordion__button" aria-controls="content5">Ultricies mi quis hendrerit dolor magna eget est.</button>
          </h2>
          <div class="jazz-accordion__content" id="content5">
             Non enim praesent elementum facilisis leo. Non blandit massa enim nec dui nunc mattis enim ut. Lorem sed
             risus ultricies tristique <a id="content5-link" href="#">nulla aliquet</a> enim tortor at. Sodales ut eu sem integer vitae justo eget. Donec
             pretium vulputate sapien nec sagittis. Sit amet dictum sit amet justo. Faucibus in ornare quam viverra orci
             sagittis eu.
          </div>
      </div>
  `;

  const accordion = new AccordionBehavior();
  accordion.enable();

  const accordion1 = document.getElementById('accordion1');
  // check if we allow multiple open accordions
  expect(accordion1.classList.contains(ACCORDION_MULTISELECTABLE_CLASSNAME)).toBe(false);

  /* Content 1 */
  const content = document.getElementById('content1');
  // check if content is hidden
  expect(content.classList.contains(ACCORDION_CONTENT_EXPANDED_CLASSNAME)).toBe(false);

  const button = document.getElementById('acrd-btn-1');
  // check if aria-expanded attribute is false
  expect(button.getAttribute('aria-expanded')).toBe("false");
  button.click();

  /* Content 2 */
  const content2 = document.getElementById('content2');
  // check if content is hidden
  expect(content2.classList.contains(ACCORDION_CONTENT_EXPANDED_CLASSNAME)).toBe(false);

  const button2 = document.getElementById('acrd-btn-2');
  // check if aria-expanded attribute is false-
  expect(button2.getAttribute('aria-expanded')).toBe("false");
  button2.click();

  // after button click check of content is shown only for the 2nd accordion section
  expect(content.classList.contains(ACCORDION_CONTENT_EXPANDED_CLASSNAME)).toBe(false);
  expect(content2.classList.contains(ACCORDION_CONTENT_EXPANDED_CLASSNAME)).toBe(true);

  // after button click check if aria-expanded attribute for button is set to true only for the 2nd button
  expect(button.getAttribute('aria-expanded')).toBe("false");
  expect(button2.getAttribute('aria-expanded')).toBe("true");

  const keyboardEvent = new window.KeyboardEvent('keydown',{'key':'Tab', bubbles: true});

  button2.dispatchEvent(keyboardEvent);

  const button3      = document.getElementById('acrd-btn-3');
  const button4      = document.getElementById('acrd-btn-4');
  const button5      = document.getElementById('acrd-btn-5');
  const content5Link = document.getElementById('content5-link');

  button3.dispatchEvent(keyboardEvent);
  button4.dispatchEvent(keyboardEvent);
  button5.dispatchEvent(keyboardEvent);

  expect(document.activeElement === content5Link).toBe(false);
});

it('We can check that content is hidden and the hidden a tag is not focusable or clickable multi selectable accordions', () => {
  document.body.innerHTML = `
      <div id="accordion1" class="jazz-accordion jazz-accordion-multiselectable" role="region">
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
          <div class="jazz-accordion__content" id="content2">
              Quisque velit nisi, pretium ut lacinia in, elementum id enim. Curabitur arcu erat, accumsan id imperdiet 
              et, porttitor at sem. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. 
              Cras ultricies ligula sed magna dictum porta.
          </div>
          <h2>
            <button id="acrd-btn-3" class="jazz-accordion__button" aria-controls="content3">Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus. Curabitur aliquet quam id dui posuere blandit.</button>
          </h2>
          <div class="jazz-accordion__content" id="content3">
              Nulla porttitor accumsan tincidunt. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices 
              posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula. 
              Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem.
          </div>
          <h2>
            <button id="acrd-btn-4" class="jazz-accordion__button" aria-controls="content4">Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus. Curabitur aliquet quam id dui posuere blandit.</button>
          </h2>
          <div class="jazz-accordion__content" id="content4">
              Nulla porttitor accumsan tincidunt. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices 
              posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula. 
              Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem.
          </div>
          <h2>
            <button id="acrd-btn-5" class="jazz-accordion__button" aria-controls="content5">Ultricies mi quis hendrerit dolor magna eget est.</button>
          </h2>
          <div class="jazz-accordion__content" id="content5">
             Non enim praesent elementum facilisis leo. Non blandit massa enim nec dui nunc mattis enim ut. Lorem sed
             risus ultricies tristique <a id="content5-link" href="#">nulla aliquet</a> enim tortor at. Sodales ut eu sem integer vitae justo eget. Donec
             pretium vulputate sapien nec sagittis. Sit amet dictum sit amet justo. Faucibus in ornare quam viverra orci
             sagittis eu.
          </div>
      </div>
  `;

  const accordion = new AccordionBehavior();
  accordion.enable();

  const accordion1 = document.getElementById('accordion1');
  // check if we allow multiple open accordions
  expect(accordion1.classList.contains(ACCORDION_MULTISELECTABLE_CLASSNAME)).toBe(true);

  /* Content 1 */
  const content = document.getElementById('content1');
  // check if content is hidden
  expect(content.classList.contains(ACCORDION_CONTENT_EXPANDED_CLASSNAME)).toBe(false);

  const button = document.getElementById('acrd-btn-1');
  // check if aria-expanded attribute is false
  expect(button.getAttribute('aria-expanded')).toBe("false");
  button.click();

  /* Content 2 */
  const content2 = document.getElementById('content2');
  // check if content is hidden
  expect(content2.classList.contains(ACCORDION_CONTENT_EXPANDED_CLASSNAME)).toBe(false);

  const button2 = document.getElementById('acrd-btn-2');
  // check if aria-expanded attribute is false-
  expect(button2.getAttribute('aria-expanded')).toBe("false");
  button2.click();

  // after button click check of content is shown for both content
  expect(content.classList.contains(ACCORDION_CONTENT_EXPANDED_CLASSNAME)).toBe(true);
  expect(content2.classList.contains(ACCORDION_CONTENT_EXPANDED_CLASSNAME)).toBe(true);

  // after button click check if aria-expanded attribute for button is set to true for both buttons
  expect(button.getAttribute('aria-expanded')).toBe("true");
  expect(button2.getAttribute('aria-expanded')).toBe("true");

  const keyboardEvent = new window.KeyboardEvent('keydown',{'key':'Tab', bubbles: true});

  button2.dispatchEvent(keyboardEvent);

  const button3      = document.getElementById('acrd-btn-3');
  const button4      = document.getElementById('acrd-btn-4');
  const button5      = document.getElementById('acrd-btn-5');
  const content5Link = document.getElementById('content5-link');

  button3.dispatchEvent(keyboardEvent);
  button4.dispatchEvent(keyboardEvent);
  button5.dispatchEvent(keyboardEvent);

  expect(document.activeElement === content5Link).toBe(false);
});
