import {ARIA_EXPANDED, Behavior} from '../../base/delegreater';
import { prefix as PREFIX } from '../../config';
import {Listener} from "../../base/decorator-functions";

// Main Menu Selectors
const HEADER_SELECTOR = `.${PREFIX}-header`;
const HEADER_MENU_SELECTOR = `.${PREFIX}-header__menu-toggle`;
const HEADER_NAV_SELECTOR = `.${PREFIX}-header__nav-container`;
const HEADER_MAIN_MENU_SELECTOR = `.${PREFIX}-header__main-menu-navbar`;

// Submenu Selectors
const MENU_SELECTOR =  `.${PREFIX}-menubar`;
const HEADER_SUB_MENU_SELECTOR = `.${PREFIX}-header__submenu-toggle`;

// Search Selectors
const SEARCH_SELECTOR = `.${PREFIX}-header__search-bar-toggle`;
const SEARCH_PANEL = `.${PREFIX}-header__search-bar-panel`;

// Used to conditionally hide and show menu to handle hovers + click open
const MENU_STICKY_STYLE = `${PREFIX}-menubar--stuck`;
const MENU_HIDE_STYLE = `${PREFIX}-menubar--hide`;

// Styles to show menu in low resolution view
const MENU_NAV_EXPANDED_STYLE = `${PREFIX}-header__nav-container--expanded`;
const MENU_SUB_NAV_EXPANDED_STYLE = `${PREFIX}-header__subnav-container--expanded`;

// Styles to show menu in high resolution view
const MENUBAR_SHOWN_STYLE = `${PREFIX}-menubar--shown`;
const MENUBAR_SUB_SHOWN_STYLE = `${PREFIX}-menubar_submenu--shown`;
const SEARCH_SHOWN_STYLE = `${PREFIX}-header__search-bar-panel--shown`;

// Id used to identify recently closed sub nav
const MENU_RECENTLY_OPENED_ID = `${PREFIX}-menu:recentlyOpened`;

// Icons
const ICON_SELECTOR = `.${PREFIX}-icon`;
const ICON_CLOSE = `${PREFIX}-icon-close`;
const ICON_SEARCH = `${PREFIX}-icon-search`;
const ICON_MENU = `${PREFIX}-icon-menu`;

export class HeaderBehavior extends Behavior {

    constructor() {
        super();
    }

    init(root: ParentNode) {
        this.select(HEADER_MENU_SELECTOR, root).forEach((header) => {
            this.showMenu(false, header);
        });

        this.select(HEADER_SUB_MENU_SELECTOR, root).forEach((submenu) => {
            submenu.addEventListener('mouseleave', () => {
                const navContainer = document.getElementById(MENU_RECENTLY_OPENED_ID);
                if (navContainer) {
                    navContainer.classList.remove(MENU_HIDE_STYLE);
                    navContainer.id = "";
                }
            });
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
            navContainer.classList.add(MENU_NAV_EXPANDED_STYLE);
            navbar.classList.add(MENUBAR_SHOWN_STYLE);
            buttonToReset.setAttribute(ARIA_EXPANDED, "true");
            menuToggleIcon.classList.remove("emc-icon-menu");
            menuToggleIcon.classList.add(ICON_CLOSE);
        } else {
            navContainer.classList.remove(MENU_NAV_EXPANDED_STYLE);
            navbar.classList.remove(MENUBAR_SHOWN_STYLE);
            buttonToReset.setAttribute(ARIA_EXPANDED, "false");
            menuToggleIcon.classList.remove(ICON_CLOSE);
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

            navContainer.classList.add(MENU_STICKY_STYLE);
            navContainer.classList.remove(MENU_HIDE_STYLE);
            navbar.classList.add(MENU_STICKY_STYLE);
            buttonToReset.setAttribute(ARIA_EXPANDED, "true");
        } else {
            this.resetSubMenus(button);

            navContainer.classList.remove(MENU_STICKY_STYLE);
            navContainer.classList.add(MENU_HIDE_STYLE);
            navContainer.id = MENU_RECENTLY_OPENED_ID;
            navbar.classList.remove(MENU_STICKY_STYLE);
            buttonToReset.setAttribute(ARIA_EXPANDED, "false");
        }
    }

    closeSubMenus(button, disableNav) {
        const mainEl = button.closest(HEADER_MAIN_MENU_SELECTOR);
        this.select("li", mainEl).forEach((navbar) => {
            this.select("ul", navbar).forEach((list) => {
                list.classList.remove(MENU_STICKY_STYLE);
                if (disableNav) {
                    list.classList.add(MENU_HIDE_STYLE);
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
                list.classList.remove(MENU_STICKY_STYLE);
                list.classList.remove(MENU_HIDE_STYLE);
            });
        });
    }

    showSubMenuCondensed(expand, button) {
        // This makes sure regardless of which button is picked that the menu elements are expanded/hidden
        const navbar = button.closest("li");
        const buttonToReset = this.getButtonForSelector(HEADER_SUB_MENU_SELECTOR, button, navbar);
        const navContainer = navbar.querySelector("ul");

        if (expand) {
            navContainer.classList.add(MENU_SUB_NAV_EXPANDED_STYLE);
            navbar.classList.add(MENUBAR_SUB_SHOWN_STYLE);
            buttonToReset.setAttribute(ARIA_EXPANDED, "true");
        } else {
            navContainer.classList.remove(MENU_SUB_NAV_EXPANDED_STYLE);
            navbar.classList.remove(MENUBAR_SUB_SHOWN_STYLE);
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
        // Main Menu Reset
        document.querySelectorAll(HEADER_NAV_SELECTOR).forEach((header) => {
            header.classList.remove(MENU_NAV_EXPANDED_STYLE);
            header.querySelectorAll("ul").forEach((navbar) => {
                navbar.classList.remove(MENU_NAV_EXPANDED_STYLE);
                navbar.classList.remove(MENUBAR_SHOWN_STYLE);
                navbar.classList.remove(MENU_STICKY_STYLE);
                navbar.querySelectorAll("li").forEach((submenu) => {
                    submenu.classList.remove(MENU_STICKY_STYLE);
                    submenu.classList.remove(MENU_HIDE_STYLE);
                });
            });
        });

        document.querySelectorAll(HEADER_MENU_SELECTOR).forEach((button) => {
            button.setAttribute(ARIA_EXPANDED, "false");
            const menuToggleIcon = button.querySelector(ICON_SELECTOR);
            menuToggleIcon.classList.remove(ICON_CLOSE);
            menuToggleIcon.classList.add(ICON_MENU);
        });

        // Sub Menus Reset
        document.querySelectorAll(MENU_SELECTOR).forEach((menu) => {
            menu.querySelectorAll("ul").forEach((navbar) => {
                navbar.classList.remove(MENU_SUB_NAV_EXPANDED_STYLE);
                navbar.classList.remove(MENUBAR_SUB_SHOWN_STYLE);
            });
        });

        document.querySelectorAll(HEADER_SUB_MENU_SELECTOR).forEach((button) => {
            button.setAttribute(ARIA_EXPANDED, "false");
        });


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
