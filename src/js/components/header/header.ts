import {ARIA_EXPANDED, Behavior} from '../../base/delegreater';
import { prefix as PREFIX } from '../../config';
import {Listener} from "../../base/decorator-functions";

// Main Menu Selectors
const HEADER_SELECTOR = `.${PREFIX}-header`;


// Search Selectors
const SEARCH_SELECTOR = `.${PREFIX}-header__search-bar-toggle`;
const SEARCH_PANEL = `.${PREFIX}-header__search-bar-panel`;

// Styles to show menu in high resolution view
const SEARCH_SHOWN_STYLE = `${PREFIX}-header__search-bar-panel--shown`;

// Icons
const ICON_SELECTOR = `.${PREFIX}-icon`;
const ICON_CLOSE = `${PREFIX}-icon-close`;
const ICON_SEARCH = `${PREFIX}-icon-search`;

export class HeaderBehavior extends Behavior {

    constructor() {
        super();
    }

    init(root: ParentNode) {

        this.select(SEARCH_SELECTOR, root).forEach((search) => {
            this.showSearch(false, search);
        });

        window.addEventListener("resize", this.displayWindowSize);
    }

    @Listener({
        event: 'click',
        selector: SEARCH_SELECTOR
    })


    onAction(event: Event) {
        // console.log('event', event);
        const button = <HTMLElement>event.target;

        // This will handle when the click event happens for the icons within the button element
        const targetButton = button.closest('button');

        // Depending on which button was clicked an action is performed
        if (targetButton.matches(SEARCH_SELECTOR)) {
            this.toggleSearch(targetButton);
            event.stopImmediatePropagation();
        }
    }

    toggleSearch(button) {
        const expandedAttr = button.getAttribute(ARIA_EXPANDED);
        const expand = !(expandedAttr && expandedAttr == "true");
        this.showSearch(expand, button);
    }

    showSearch(expand, button) {
        // This makes sure regardless of which button is picked that the search elements are expanded/hidden
        const headerEl = button.closest(HEADER_SELECTOR);
        const buttonToReset = this.getButtonForSelector(SEARCH_SELECTOR, button, headerEl);
        const searchToggleIcon = buttonToReset.querySelector(ICON_SELECTOR);
        const searchbar = headerEl.querySelector(SEARCH_PANEL);

        if (expand) {
            searchbar.classList.add(SEARCH_SHOWN_STYLE);
            buttonToReset.setAttribute(ARIA_EXPANDED, "true");
            searchToggleIcon.classList.remove(ICON_SEARCH);
            searchToggleIcon.classList.add(ICON_CLOSE);
            const input = searchbar.querySelector("input[type='search']");
            input.focus();
        } else {
            searchbar.classList.remove(SEARCH_SHOWN_STYLE);
            buttonToReset.setAttribute(ARIA_EXPANDED, "false");
            searchToggleIcon.classList.remove(ICON_CLOSE);
            searchToggleIcon.classList.add(ICON_SEARCH);
        }
    }

    // This retrieves the appropriate button depending on the selector passed in
    getButtonForSelector(btnSelector, button, mainEl) {
        if (!button.matches(btnSelector)) {
            button = mainEl.querySelector(btnSelector);
        }
        return button;
    }

    displayWindowSize() {
        // Search Reset
        document.querySelectorAll(SEARCH_PANEL).forEach((searchbar) => {
            searchbar.classList.remove(SEARCH_SHOWN_STYLE);
        });

        document.querySelectorAll(SEARCH_SELECTOR).forEach((button) => {
            button.setAttribute(ARIA_EXPANDED, "false");
            const searchToggleIcon = button.querySelector(ICON_SELECTOR);
            searchToggleIcon.classList.remove(ICON_CLOSE);
            searchToggleIcon.classList.add(ICON_SEARCH);
        });
    }
}
