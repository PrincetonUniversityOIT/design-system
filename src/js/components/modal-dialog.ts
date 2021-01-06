import {Listener, Behavior} from '../base/delegreater';
import { prefix as PREFIX } from '../config';

const MODAL_SELECTOR = `.${PREFIX}-modal`;
const MODAL_WRAPPER_SELECTOR = `.${PREFIX}-modal-wrapper`;
const MODAL_BUTTON_SELECTOR = `.${PREFIX}-modal__button`;

export class ModalDialog extends Behavior {

    init(root: ParentNode) {
        this.select(MODAL_WRAPPER_SELECTOR, root).forEach((wrapper) => {
            wrapper.classList.remove('emc-modal__wrapper--visible')
        });
    }

    @Listener({
        event: 'click',
        selector: MODAL_BUTTON_SELECTOR
    })


    onClick(event: Event) {
        const button = <HTMLElement> event.target;
        const modalEl = button.closest(MODAL_SELECTOR);
        this.select(MODAL_WRAPPER_SELECTOR, modalEl).forEach((wrapper) => {
            if (button.matches(MODAL_BUTTON_SELECTOR)) {
                wrapper.classList.toggle('emc-modal__wrapper--visible')
            }
        });
        event.stopImmediatePropagation();
    }
}
