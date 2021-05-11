import {ARIA_EXPANDED, Behavior} from '../../base/delegreater';
import { prefix as PREFIX } from '../../config';
import {Listener} from "../../base/decorator-functions";

// Toggle Button Selector
const NAV_TOGGLE_SELECTOR = `.${PREFIX}-utility-header__nav-toggle`;

export class UtilityHeaderBehavior extends Behavior {

    constructor() {
        super();
    }

    currentRoot;

    init(root: ParentNode) {

        this.currentRoot = root;
    }

    @Listener({
        event: 'click',
        selector: NAV_TOGGLE_SELECTOR
    })
    onAction(event: Event) {

        const button = <HTMLElement>event.target;

        // This will handle when the click event happens for the icons within the button element
        const targetButton = button.closest('button');
        const expanded = targetButton.hasAttribute(ARIA_EXPANDED) && targetButton.getAttribute(ARIA_EXPANDED) === 'true';
        const sectionEl = targetButton.closest('.jazz-utility-header__nav');
        const iconEl = targetButton.querySelector('.jazz-icon');
        const spanEl = targetButton.querySelector('span');
        if (sectionEl) {
            if (expanded) {
                targetButton.setAttribute(ARIA_EXPANDED, 'false');
                sectionEl.classList.remove('jazz-expanded');
                iconEl.classList.remove('jazz-icon-close');
                iconEl.classList.add('jazz-icon-menu');
                spanEl.innerText = 'Open Navigation Menu';
            } else {
                targetButton.setAttribute(ARIA_EXPANDED, 'true');
                sectionEl.classList.add('jazz-expanded');
                iconEl.classList.remove('jazz-icon-menu');
                iconEl.classList.add('jazz-icon-close');
                spanEl.innerText = 'Close Navigation Menu';
            }
        }
        event.stopImmediatePropagation();
    }

    // This retrieves the appropriate button depending on the selector passed in
    getButtonForSelector(btnSelector, button, mainEl) {
        if (!button.matches(btnSelector)) {
            button = mainEl.querySelector(btnSelector);
        }
        return button;
    }
}
