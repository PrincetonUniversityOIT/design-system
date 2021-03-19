import {ARIA_SELECTED, Behavior} from '../../base/delegreater';
import { prefix as PREFIX } from '../../config';
import {Listener} from "../../base/decorator-functions";

const TABLIST_SELECTOR = `.${PREFIX}-tablist`;
const TABLIST_BUTTON_SELECTOR = `.${PREFIX}-tablist > button`;

export class TabsBehavior extends Behavior {

    constructor() {
        super();
    }

    init(root: ParentNode) {
        this.select(TABLIST_SELECTOR, root).forEach((tablist: HTMLElement) => {
           tablist.setAttribute("role", "tablist");
        });
        this.select(TABLIST_BUTTON_SELECTOR, root).forEach((button: HTMLButtonElement) => {
            button.setAttribute("role", "tab");
            const selected = button.getAttribute(ARIA_SELECTED) === "true";
            this.toggleTab(button, selected);
        });
    }

    toggleTab(button: HTMLButtonElement, selected: boolean) {
        let controlSelection = this.toggleControl(button, selected, ARIA_SELECTED);
        // enable the ability to get focus for the selected button and disable focus ability for all other buttons
        button.tabIndex = controlSelection ? 0 : -1;
    }

    getTablistButtons = (tablistEl: Element): HTMLButtonElement[] => {
        return this.selectClosestTo(TABLIST_BUTTON_SELECTOR, TABLIST_SELECTOR, tablistEl);
    };

    getFirstEnabledButton(buttons: HTMLButtonElement[]) {
        if (buttons && buttons.length > 0) {
            return buttons.find(button => !button.disabled);
        } else {
            return undefined;
        }
    }

    getLastEnabledButton(buttons: HTMLButtonElement[]) {
        if (buttons && buttons.length > 0) {
            return buttons.reverse().find(button => !button.disabled);
        } else {
            return undefined;
        }
    }

    getNextEnabledButton(buttons: HTMLButtonElement[], refButton: HTMLButtonElement) {
        let found = false;
        for (let button of buttons) {
            if (found) {
                if (!button.disabled) {
                    return button;
                }
            }
            if (button === refButton) {
                found = true;
            }
        }
        return this.getFirstEnabledButton(buttons);
    }

    getPreviousEnabledButton(buttons: HTMLButtonElement[], refButton: HTMLButtonElement) {
        let found = false;
        for (let button of buttons.slice().reverse()) {
            if (found) {
                if (!button.disabled) {
                    return button;
                }
            }
            if (button === refButton) {
                found = true;
            }
        }
        return this.getLastEnabledButton(buttons);
    }

    shouldSelectOnFocus(tablistEl: Element) {
        return tablistEl && tablistEl.classList.contains("jazz-auto-activate");
    }

    selectButton(button: HTMLButtonElement) {
        const tablistEl = button.closest(TABLIST_SELECTOR);

        this.getTablistButtons(tablistEl).forEach((other) => {
            if (other !== button) {
                this.toggleTab(other, false);
            }
        });

        this.toggleTab(button, null);
    }

    @Listener({
        event: 'click',
        selector: TABLIST_BUTTON_SELECTOR
    })
    onClick(event: Event) {
        const button = <HTMLButtonElement> event.target;
        this.selectButton(button);
        event.stopImmediatePropagation();
    }

    @Listener({
        event: 'keyup',
        selector: TABLIST_BUTTON_SELECTOR
    })
    onKeyup(event: Event) {

        const eventButton = <HTMLButtonElement> event.target;
        const keyEvent: KeyboardEvent = <KeyboardEvent> event;
        const tablistEl = eventButton.closest(TABLIST_SELECTOR);

        let focusButton = undefined;

        if (keyEvent.key === 'ArrowRight') {
            focusButton = this.getNextEnabledButton(this.getTablistButtons(tablistEl), eventButton);
        } else if (keyEvent.key === 'ArrowLeft') {
            focusButton = this.getPreviousEnabledButton(this.getTablistButtons(tablistEl), eventButton);
        } else if (keyEvent.key === 'Home') {
            focusButton = this.getFirstEnabledButton(this.getTablistButtons(tablistEl));
        } else if (keyEvent.key === 'End') {
            focusButton = this.getLastEnabledButton(this.getTablistButtons(tablistEl));
        }

        if (focusButton) {
            focusButton.focus();
            if (this.shouldSelectOnFocus(tablistEl)) {
                this.selectButton(focusButton);
            }
            event.stopImmediatePropagation();
        }
    }
}
