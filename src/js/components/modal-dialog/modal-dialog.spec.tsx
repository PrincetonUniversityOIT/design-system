import {ModalDialogBehavior} from "./modal-dialog";

it('We should be able to call new() on ModalDialogBehavior', () => {
    // Ensure constructor created the object:
    const modal = new ModalDialogBehavior();
    expect(modal).toBeTruthy();
});

it('We can check if the wrapper has the style to display the content', () => {
    document.body.innerHTML = `
     <div class="jazz-modal" role="region">
        <button class="jazz-btn jazz-modal__button" id="btnClick">Test Small Dialog!</button>
        <div role="presentation" class="jazz-modal-wrapper" id="wrapper">
          <div role="dialog" aria-label="Test Small Dialog" aria-modal="true" class="jazz-modal-window jazz-modal--sm">
          <div class="jazz-modal-title">
                       Test Modal                    
                      <button class="jazz-modal__button jazz-modal-button__close jazz-modal-button--transparent"
                          aria-label="Close modal dialog"></button>
            </div>
            <div class="jazz-modal-content" aria-labelledBy="jazz-modal-title">This is a test modal</div>
            <div class="jazz-modal-button-container">
              <button class="jazz-btn jazz-modal__button">Cancel</button>
              <button class="jazz-btn jazz-modal__button">OK</button>
            </div>
          </div>
        </div>
    </div>
  `;

    const modal = new ModalDialogBehavior();
    modal.enable();

    const wrapper = document.getElementById('wrapper');
    expect(wrapper.classList).not.toContain("jazz-modal__wrapper--visible");

    const button = document.getElementById('btnClick');
    button.click();

    expect(wrapper.classList).toContain("jazz-modal__wrapper--visible");
});

it('We can check if the wrapper still has the style to display the content after close', () => {
    document.body.innerHTML = `
     <div class="jazz-modal" role="region">
        <button class="jazz-btn jazz-modal__button" id="btnClick">Test Small Dialog!</button>
        <div role="presentation" class="jazz-modal-wrapper" id="wrapper">
          <div role="dialog" aria-label="Test Small Dialog" aria-modal="true" class="jazz-modal-window jazz-modal--sm">
          <div class="jazz-modal-title">
                       Test Modal                    
                      <button class="jazz-modal__button jazz-modal-button__close jazz-modal-button--transparent"
                          aria-label="Close modal dialog"></button>
            </div>
            <div class="jazz-modal-content" aria-labelledBy="jazz-modal-title">This is a test modal</div>
            <div class="jazz-modal-button-container">
              <button class="jazz-btn jazz-modal__button">Cancel</button>
              <button class="jazz-btn jazz-modal__button" id="btnOk">OK</button>
            </div>
          </div>
        </div>
    </div>
  `;

    const modal = new ModalDialogBehavior();
    modal.enable();

    const wrapper = document.getElementById('wrapper');
    expect(wrapper.classList).not.toContain("jazz-modal__wrapper--visible");

    const button = document.getElementById('btnClick');
    button.click();

    expect(wrapper.classList).toContain("jazz-modal__wrapper--visible");

    const buttonOk = document.getElementById('btnClick');
    buttonOk.click();

    expect(wrapper.classList).not.toContain("jazz-modal__wrapper--visible");
});

it('We can check if window closes on escape', () => {
  document.body.innerHTML = `
     <div class="jazz-modal" role="region">
        <button class="jazz-btn jazz-modal__button" id="btnClick">Test Small Dialog!</button>
        <div role="presentation" class="jazz-modal-wrapper" id="wrapper">
          <div role="dialog" aria-label="Test Small Dialog" aria-modal="true" class="jazz-modal-window jazz-modal--sm">
          <div class="jazz-modal-title">
                       Test Modal                    
                      <button class="jazz-modal__button jazz-modal-button__close jazz-modal-button--transparent"
                          aria-label="Close modal dialog"></button>
            </div>
            <div class="jazz-modal-content" aria-labelledBy="jazz-modal-title">This is a test modal</div>
            <div class="jazz-modal-button-container">
              <button class="jazz-btn jazz-modal__button">Cancel</button>
              <button class="jazz-btn jazz-modal__button" id="btnOk">OK</button>
            </div>
          </div>
        </div>
    </div>
  `;

  const modal = new ModalDialogBehavior();
  modal.enable();

  const wrapper = document.getElementById('wrapper');
  expect(wrapper.classList).not.toContain("jazz-modal__wrapper--visible");

  const button = document.getElementById('btnClick');
  button.click();

  expect(wrapper.classList).toContain("jazz-modal__wrapper--visible");

  const btnOk = document.getElementById('btnOk');
  btnOk.dispatchEvent(new window.KeyboardEvent('keydown',{'key':'Escape', bubbles: true}));

  expect(wrapper.classList).not.toContain("jazz-modal__wrapper--visible");
});

it('We can check if tab closes the window', () => {
  document.body.innerHTML = `
     <div class="jazz-modal" role="region" id="modalWindow">
        <button class="jazz-btn jazz-modal__button" id="btnClick">Test Small Dialog!</button>
        <div role="presentation" class="jazz-modal-wrapper" id="wrapper">
          <div role="dialog" aria-label="Test Small Dialog" aria-modal="true" class="jazz-modal-window jazz-modal--sm">
          <div class="jazz-modal-title">
                       Test Modal                    
                      <button class="jazz-modal__button jazz-modal-button__close jazz-modal-button--transparent"
                          aria-label="Close modal dialog"></button>
            </div>
            <div class="jazz-modal-content" aria-labelledBy="jazz-modal-title">This is a test modal</div>
            <div class="jazz-modal-button-container">
              <button class="jazz-btn jazz-modal__button">Cancel</button>
              <button class="jazz-btn jazz-modal__button" id="btnOk">OK</button>
            </div>
          </div>
        </div>
    </div>
  `;

  const modal = new ModalDialogBehavior();
  modal.enable();

  const wrapper = document.getElementById('wrapper');
  expect(wrapper.classList).not.toContain("jazz-modal__wrapper--visible");

  const button = document.getElementById('btnClick');
  button.click();

  expect(wrapper.classList).toContain("jazz-modal__wrapper--visible");

  const btnOk = document.getElementById('btnOk');
  btnOk.dispatchEvent(new window.KeyboardEvent('keydown',{'key':'Tab', bubbles: true}));

  expect(wrapper.classList).toContain("jazz-modal__wrapper--visible");
});
