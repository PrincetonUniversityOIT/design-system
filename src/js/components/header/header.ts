import {ARIA_EXPANDED, Behavior} from '../../base/delegreater';
import { prefix as PREFIX } from '../../config';
import {Listener} from "../../base/decorator-functions";

const ICON_SELECTOR = `.${PREFIX}-icon`;

const HEADER_SELECTOR = `.${PREFIX}-header`;
const HEADER_MENU_SELECTOR = `.${PREFIX}-header__menu-toggle`;
const HEADER_NAV_SELECTOR = `.${PREFIX}-header__nav-container`;
const HEADER_MAIN_MENU_SELECTOR = `.${PREFIX}-header__main-menu-navbar`;

const MENU_SELECTOR =  `.${PREFIX}-menubar`;
const HEADER_SUB_MENU_SELECTOR = `.${PREFIX}-header__submenu-toggle`;

const SEARCH_SELECTOR = `.${PREFIX}-header__search-bar-toggle`;
const SEARCH_PANEL = `.${PREFIX}-header__search-bar-panel`;

export class HeaderBehavior extends Behavior {

    constructor() {
        super();
    }

    init(root: ParentNode) {
        this.select(HEADER_MENU_SELECTOR, root).forEach((header) => {
            this.showMenu(false, header);
        });

        this.select(SEARCH_SELECTOR, root).forEach((search) => {
            this.showSearch(false, search);
        });

        window.addEventListener("resize", this.displayWindowSize);
    }

    @Listener({
        event: 'click',
        selector: HEADER_MENU_SELECTOR
    })

    @Listener({
        event: 'click',
        selector: SEARCH_SELECTOR
    })

    @Listener({
        event: 'click',
        selector: HEADER_SUB_MENU_SELECTOR
    })

    onAction(event: Event) {
        // console.log('event', event);
        const button = <HTMLElement>event.target;

        // This will handle when the click event happens for the icons within the button element
        const targetButton = button.closest('button');

        // Depending on which button was clicked an action is performed
        if (targetButton.matches(HEADER_MENU_SELECTOR)) {
            this.toggleMenu(targetButton);
            event.stopImmediatePropagation();
        } else if (targetButton.matches(SEARCH_SELECTOR)) {
            this.toggleSearch(targetButton);
            event.stopImmediatePropagation();
        } else if (targetButton.matches(HEADER_SUB_MENU_SELECTOR)) {
            this.toggleSubMenu(targetButton);
            event.stopImmediatePropagation();
        }
    }

    toggleMenu(button) {
        const expandedAttr = button.getAttribute(ARIA_EXPANDED);
        const expand = !(expandedAttr && expandedAttr == "true");
        if (expand) {
            // if the menu is expanded hide the search panel
            this.showSearch(false, button);
        }
        this.showMenu(expand, button);
    }

    showMenu(expand, button) {
        // This makes sure regardless of which button is picked that the menu elements are expanded/hidden
        const menuEl = button.closest(HEADER_MAIN_MENU_SELECTOR);
        const buttonToReset = this.getButtonForSelector(HEADER_MENU_SELECTOR, button, menuEl);
        const menuToggleIcon = buttonToReset.querySelector(ICON_SELECTOR);
        const navbar = menuEl.querySelector("ul");
        const navContainer = menuEl.querySelector(HEADER_NAV_SELECTOR);

        if (expand) {
            navContainer.classList.add("emc-header__nav-container--expanded");
            navbar.classList.add("emc-menubar--shown");
            buttonToReset.setAttribute(ARIA_EXPANDED, "true");
            menuToggleIcon.classList.remove("emc-icon-menu");
            menuToggleIcon.classList.add("emc-icon-close");
        } else {
            navContainer.classList.remove("emc-header__nav-container--expanded");
            navbar.classList.remove("emc-menubar--shown");
            buttonToReset.setAttribute(ARIA_EXPANDED, "false");
            menuToggleIcon.classList.remove("emc-icon-close");
            menuToggleIcon.classList.add("emc-icon-menu");
        }
    }

    toggleSubMenu(button) {
        const expandedAttr = button.getAttribute(ARIA_EXPANDED);
        const expand = !(expandedAttr && expandedAttr == "true");
        if (expand) {
            // if the menu is expanded hide the search panel
            this.showSearch(false, button);
        }
        this.showSubMenu(expand, button);
    }

    showSubMenu(expand, button) {
        const mq = window.matchMedia("(min-width: 900px)");
        if (mq.matches) {
            this.showSubMenuFull(expand, button);
        } else {
            this.showSubMenuCondensed(expand, button);
        }
    }

    showSubMenuFull(expand, button) {
        // This makes sure regardless of which button is picked that the menu elements are expanded/hidden
        const navbar = button.closest("li");
        const buttonToReset = this.getButtonForSelector(HEADER_SUB_MENU_SELECTOR, button, navbar);
        const navContainer = navbar.querySelector("ul");
        if (expand) {
            this.closeSubMenus(button, true);

            navContainer.classList.add("emc-menubar--stuck");
            navContainer.classList.remove("emc-menubar--hide");
            navbar.classList.add("emc-menubar--stuck");
            buttonToReset.setAttribute(ARIA_EXPANDED, "true");
        } else {
            this.resetSubMenus(button);

            navContainer.classList.remove("emc-menubar--stuck");
            navContainer.classList.add("emc-menubar--hide");
            navbar.classList.remove("emc-menubar--stuck");
            buttonToReset.setAttribute(ARIA_EXPANDED, "false");
        }
    }

    closeSubMenus(button, disableNav) {
        const mainEl = button.closest(HEADER_MAIN_MENU_SELECTOR);
        this.select("li", mainEl).forEach((navbar) => {
            this.select("ul", navbar).forEach((list) => {
                list.classList.remove("emc-menubar--stuck");
                if (disableNav) {
                    list.classList.add("emc-menubar--hide");
                }
            });
        });

        this.select(HEADER_SUB_MENU_SELECTOR, mainEl).forEach((button) => {
            button.setAttribute(ARIA_EXPANDED, "false");
        });
    }

    resetSubMenus(button) {
        const mainEl = button.closest(HEADER_MAIN_MENU_SELECTOR);
        this.select("li", mainEl).forEach((navbar) => {
            this.select("ul", navbar).forEach((list) => {
                list.classList.remove("emc-menubar--stuck");
                list.classList.remove("emc-menubar--hide");
            });
        });
    }

    showSubMenuCondensed(expand, button) {
        // This makes sure regardless of which button is picked that the menu elements are expanded/hidden
        const navbar = button.closest("li");
        const buttonToReset = this.getButtonForSelector(HEADER_SUB_MENU_SELECTOR, button, navbar);
        const navContainer = navbar.querySelector("ul");

        if (expand) {
            navContainer.classList.add("emc-header__subnav-container--expanded");
            navbar.classList.add("emc-menubar_submenu--shown");
            buttonToReset.setAttribute(ARIA_EXPANDED, "true");
        } else {
            navContainer.classList.remove("emc-header__subnav-container--expanded");
            navbar.classList.remove("emc-menubar_submenu--shown");
            buttonToReset.setAttribute(ARIA_EXPANDED, "false");
        }
    }

    toggleSearch(button) {
        const expandedAttr = button.getAttribute(ARIA_EXPANDED);
        const expand = !(expandedAttr && expandedAttr == "true");
        if (expand) {
            this.closeSubMenus(button, false);
        }
        this.showSearch(expand, button);
    }

    showSearch(expand, button) {
        // This makes sure regardless of which button is picked that the search elements are expanded/hidden
        const headerEl = button.closest(HEADER_SELECTOR);
        const buttonToReset = this.getButtonForSelector(SEARCH_SELECTOR, button, headerEl);
        const searchToggleIcon = buttonToReset.querySelector(ICON_SELECTOR);
        const searchbar = headerEl.querySelector(SEARCH_PANEL);

        if (expand) {
            searchbar.classList.add("emc-header__search-bar-panel--shown");
            buttonToReset.setAttribute(ARIA_EXPANDED, "true");
            searchToggleIcon.classList.remove("emc-icon-search");
            searchToggleIcon.classList.add("emc-icon-close");
            const input = searchbar.querySelector("input[type='search']");
            input.focus();
        } else {
            searchbar.classList.remove("emc-header__search-bar-panel--shown");
            buttonToReset.setAttribute(ARIA_EXPANDED, "false");
            searchToggleIcon.classList.remove("emc-icon-close");
            searchToggleIcon.classList.add("emc-icon-search");
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
        // Main Menu Reset
        document.querySelectorAll(HEADER_NAV_SELECTOR).forEach((header) => {
            header.classList.remove("emc-header__nav-container--expanded");
            header.querySelectorAll("ul").forEach((navbar) => {
                navbar.classList.remove("emc-menubar--shown");
            });
        });

        document.querySelectorAll(HEADER_MENU_SELECTOR).forEach((button) => {
            button.setAttribute(ARIA_EXPANDED, "false");
            const menuToggleIcon = button.querySelector(ICON_SELECTOR);
            menuToggleIcon.classList.remove("emc-icon-close");
            menuToggleIcon.classList.add("emc-icon-menu");
        });

        // Sub Menus Reset
        document.querySelectorAll(MENU_SELECTOR).forEach((menu) => {
            menu.querySelectorAll("ul").forEach((navbar) => {
                navbar.classList.remove("emc-header__subnav-container--expanded");
                navbar.classList.remove("emc-menubar_submenu--shown");
            });
        });

        document.querySelectorAll(HEADER_SUB_MENU_SELECTOR).forEach((button) => {
            button.setAttribute(ARIA_EXPANDED, "false");
        });


        // Search Reset
        document.querySelectorAll(SEARCH_PANEL).forEach((searchbar) => {
            searchbar.classList.remove("emc-header__search-bar-panel--shown");
        });

        document.querySelectorAll(SEARCH_SELECTOR).forEach((button) => {
            button.setAttribute(ARIA_EXPANDED, "false");
            const searchToggleIcon = button.querySelector(ICON_SELECTOR);
            searchToggleIcon.classList.remove("emc-icon-close");
            searchToggleIcon.classList.add("emc-icon-search");
        });
    }
}
