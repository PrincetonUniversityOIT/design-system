import {ModalDialogBehavior} from "./modal-dialog";

it('We should be able to call new() on ModalDialogBehavior', () => {
    // Ensure constructor created the object:
    const modal = new ModalDialogBehavior();
    expect(modal).toBeTruthy();
});

it('We can check if the wrapper has the style to display the content', () => {
    document.body.innerHTML = `
     <div class="pjz-modal" role="region">
        <button class="pjz-btn pjz-modal__button" id="btnClick">Test Small Dialog!</button>
        <div role="presentation" class="pjz-modal-wrapper" id="wrapper">
          <div role="dialog" aria-label="Test Small Dialog" aria-modal="true" class="pjz-modal-window pjz-modal--sm">
          <div class="pjz-modal-title">
                       Test Modal                    
                      <button class="pjz-modal__button pjz-modal-button__close pjz-modal-button--transparent"
                          aria-label="Close modal dialog"></button>
            </div>
            <div class="pjz-modal-content" aria-labelledBy="pjz-modal-title">This is a test modal</div>
            <div class="pjz-modal-button-container">
              <button class="pjz-btn pjz-modal__button">Cancel</button>
              <button class="pjz-btn pjz-modal__button">OK</button>
            </div>
          </div>
        </div>
    </div>
  `;

    const modal = new ModalDialogBehavior();
    modal.enable();

    const wrapper = document.getElementById('wrapper');
    expect(wrapper.classList).not.toContain("pjz-modal__wrapper--visible");

    const button = document.getElementById('btnClick');
    button.click();

    expect(wrapper.classList).toContain("pjz-modal__wrapper--visible");
});

it('We can check if the wrapper still has the style to display the content after close', () => {
    document.body.innerHTML = `
     <div class="pjz-modal" role="region">
        <button class="pjz-btn pjz-modal__button" id="btnClick">Test Small Dialog!</button>
        <div role="presentation" class="pjz-modal-wrapper" id="wrapper">
          <div role="dialog" aria-label="Test Small Dialog" aria-modal="true" class="pjz-modal-window pjz-modal--sm">
          <div class="pjz-modal-title">
                       Test Modal                    
                      <button class="pjz-modal__button pjz-modal-button__close pjz-modal-button--transparent"
                          aria-label="Close modal dialog"></button>
            </div>
            <div class="pjz-modal-content" aria-labelledBy="pjz-modal-title">This is a test modal</div>
            <div class="pjz-modal-button-container">
              <button class="pjz-btn pjz-modal__button">Cancel</button>
              <button class="pjz-btn pjz-modal__button" id="btnOk">OK</button>
            </div>
          </div>
        </div>
    </div>
  `;

    const modal = new ModalDialogBehavior();
    modal.enable();

    const wrapper = document.getElementById('wrapper');
    expect(wrapper.classList).not.toContain("pjz-modal__wrapper--visible");

    const button = document.getElementById('btnClick');
    button.click();

    expect(wrapper.classList).toContain("pjz-modal__wrapper--visible");

    const buttonOk = document.getElementById('btnClick');
    buttonOk.click();

    expect(wrapper.classList).not.toContain("pjz-modal__wrapper--visible");
});

it('We can check if window closes on escape', () => {
  document.body.innerHTML = `
     <div class="pjz-modal" role="region">
        <button class="pjz-btn pjz-modal__button" id="btnClick">Test Small Dialog!</button>
        <div role="presentation" class="pjz-modal-wrapper" id="wrapper">
          <div role="dialog" aria-label="Test Small Dialog" aria-modal="true" class="pjz-modal-window pjz-modal--sm">
          <div class="pjz-modal-title">
                       Test Modal                    
                      <button class="pjz-modal__button pjz-modal-button__close pjz-modal-button--transparent"
                          aria-label="Close modal dialog"></button>
            </div>
            <div class="pjz-modal-content" aria-labelledBy="pjz-modal-title">This is a test modal</div>
            <div class="pjz-modal-button-container">
              <button class="pjz-btn pjz-modal__button">Cancel</button>
              <button class="pjz-btn pjz-modal__button" id="btnOk">OK</button>
            </div>
          </div>
        </div>
    </div>
  `;

  const modal = new ModalDialogBehavior();
  modal.enable();

  const wrapper = document.getElementById('wrapper');
  expect(wrapper.classList).not.toContain("pjz-modal__wrapper--visible");

  const button = document.getElementById('btnClick');
  button.click();

  expect(wrapper.classList).toContain("pjz-modal__wrapper--visible");

  const btnOk = document.getElementById('btnOk');
  btnOk.dispatchEvent(new window.KeyboardEvent('keydown',{'key':'Escape', bubbles: true}));

  expect(wrapper.classList).not.toContain("pjz-modal__wrapper--visible");
});

it('We can check if tab closes the window', () => {
  document.body.innerHTML = `
     <div class="pjz-modal" role="region" id="modalWindow">
        <button class="pjz-btn pjz-modal__button" id="btnClick">Test Small Dialog!</button>
        <div role="presentation" class="pjz-modal-wrapper" id="wrapper">
          <div role="dialog" aria-label="Test Small Dialog" aria-modal="true" class="pjz-modal-window pjz-modal--sm">
          <div class="pjz-modal-title">
                       Test Modal                    
                      <button class="pjz-modal__button pjz-modal-button__close pjz-modal-button--transparent"
                          aria-label="Close modal dialog"></button>
            </div>
            <div class="pjz-modal-content" aria-labelledBy="pjz-modal-title">This is a test modal</div>
            <div class="pjz-modal-button-container">
              <button class="pjz-btn pjz-modal__button">Cancel</button>
              <button class="pjz-btn pjz-modal__button" id="btnOk">OK</button>
            </div>
          </div>
        </div>
    </div>
  `;

  const modal = new ModalDialogBehavior();
  modal.enable();

  const wrapper = document.getElementById('wrapper');
  expect(wrapper.classList).not.toContain("pjz-modal__wrapper--visible");

  const button = document.getElementById('btnClick');
  button.click();

  expect(wrapper.classList).toContain("pjz-modal__wrapper--visible");

  const btnOk = document.getElementById('btnOk');
  btnOk.dispatchEvent(new window.KeyboardEvent('keydown',{'key':'Tab', bubbles: true}));

  expect(wrapper.classList).toContain("pjz-modal__wrapper--visible");
});
