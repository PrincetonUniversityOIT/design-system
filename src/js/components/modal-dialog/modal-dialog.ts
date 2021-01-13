import {Behavior} from '../../base/delegreater';
import { prefix as PREFIX } from '../../config';
import {Listener} from "../../base/decorator-functions";

const MODAL_SELECTOR = `.${PREFIX}-modal`;
const MODAL_WRAPPER_SELECTOR = `.${PREFIX}-modal-wrapper`;
const MODAL_BUTTON_SELECTOR = `.${PREFIX}-modal__button`;

const INPUT_SELECTORS_EXCL_CLOSE = 'a[href]:not([disabled]), button:not([disabled]):not(.emc-modal-button__close), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled])';
const INPUT_SELECTORS = 'a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled])';

export class ModalDialogBehavior extends Behavior {

    constructor() {
        super();
    }

    init(root: ParentNode) {
        this.select(MODAL_WRAPPER_SELECTOR, root).forEach((wrapper) => {
            wrapper.classList.remove('emc-modal__wrapper--visible')
        });
    }

    @Listener({
        event: 'keydown',
        selector: MODAL_SELECTOR
    })

    @Listener({
        event: 'click',
        selector: MODAL_BUTTON_SELECTOR
    })

    onAction(event: Event) {
        const button = <HTMLElement>event.target;
        const modalEl = button.closest(MODAL_SELECTOR);

        this.select(MODAL_WRAPPER_SELECTOR, modalEl).forEach((wrapper) => {
            if (!this.handleKeyEvents(event, wrapper)) {
                return;
            }

            if (button.matches(MODAL_BUTTON_SELECTOR)) {
                wrapper.classList.toggle('emc-modal__wrapper--visible');
                if (wrapper.classList.contains('emc-modal__wrapper--visible')) {
                    this.focusOnFirstInput(wrapper);
                }
            }
        });
        event.stopImmediatePropagation();
    }

    handleKeyEvents(event: Event, element) {
        if (event instanceof KeyboardEvent) {
            const keyEvent: KeyboardEvent = <KeyboardEvent> event;
            const isTabPressed = (keyEvent.key === 'Tab');
            const isEscPressed = (keyEvent.key === 'Escape');
            const isEnterPressed = (keyEvent.key === 'Enter');

            // Handle tab navigation to keep it within the window
            if (isTabPressed) {
                this.keepFocusWithin(keyEvent, element);
                return false;
            }

            // Only allow Enter and Escape Key Press
            if (!isEnterPressed && !isEscPressed) {
                return false;
            }
        }
        return true;
    }

    focusOnFirstInput(element) {
        const focusableEls = this.select(INPUT_SELECTORS_EXCL_CLOSE, element);
        if (focusableEls.length > 0) {
            focusableEls[0].focus();
        }
    }

    keepFocusWithin(keyEvent, modalEl) {
        const focusableEls = this.select(INPUT_SELECTORS, modalEl);
        const firstFocusableEl = focusableEls[0];
        const lastFocusableEl = focusableEls[focusableEls.length - 1];

        if (keyEvent.shiftKey ) /* shift + tab */ {
            if (document.activeElement === firstFocusableEl) {
                lastFocusableEl.focus();
                keyEvent.preventDefault();
            }
        } else /* tab */ {
            if (document.activeElement === lastFocusableEl) {
                firstFocusableEl.focus();
                keyEvent.preventDefault();
            }
        }
    }
}
