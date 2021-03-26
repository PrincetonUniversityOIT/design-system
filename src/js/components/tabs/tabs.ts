import {ARIA_SELECTED, Behavior} from '../../base/delegreater';
import { prefix as PREFIX } from '../../config';
import {Listener} from "../../base/decorator-functions";

const TABLIST_SELECTOR = `.${PREFIX}-tablist`;
const TABLIST_BUTTON_SELECTOR = `.${PREFIX}-tablist > button`;

export class TabsBehavior extends Behavior {

    constructor() {
        super();
    }

    /**
     * During initialization of tablist behavior, the following logic is performed:
     *
     * 1) Each tablist element is given the role of "tablist".
     * 2) Each tablist button element is given the role of "tab".
     * 3) Content associated with each tab is shown/hidden based on the "aria-selected" attribute.
     *
     * @param root
     */
    init(root: ParentNode) {
        this.select(TABLIST_SELECTOR, root).forEach((tablist: HTMLElement) => {
           tablist.setAttribute("role", "tablist");
        });
        this.select(TABLIST_BUTTON_SELECTOR, root).forEach((button: HTMLButtonElement) => {
            button.setAttribute("role", "tab");
            const selected = button.getAttribute(ARIA_SELECTED) === "true";
            this.setTabSelection(button, selected);
        });
    }

    /**
     * Sets the tab as selected or not selected based on the provided boolean.
     *
     * @param button
     * @param selected
     */
    setTabSelection(button: HTMLButtonElement, selected: boolean) {
        this.toggleControl(button, selected, ARIA_SELECTED);
        // enable the ability to get focus for the selected button and disable focus ability for all other buttons
        button.tabIndex = selected ? 0 : -1;
    }

    /**
     * Find the tabs (buttons) associated with the provided Tab list.
     *
     * @param tablist
     */
    getTabs = (tablist: Element): HTMLButtonElement[] => {
        return this.selectClosestTo(TABLIST_BUTTON_SELECTOR, TABLIST_SELECTOR, tablist);
    };

    /**
     * Find the Tab list associated with the specified tab (button).
     *
     * @param tab
     */
    getTabListForTab(tab: HTMLButtonElement) {
        return tab.closest(TABLIST_SELECTOR);
    }

    /**
     * Find the first enabled tab (button) in the list of provided tabs (buttons)
     *
     * @param tabs
     */
    getFirstEnabledTab(tabs: HTMLButtonElement[]) {
        if (tabs && tabs.length > 0) {
            return tabs.find(tab => !tab.disabled);
        } else {
            return undefined;
        }
    }

    /**
     * Find the last enabled tab (button) in the list of provided tabs (buttons).
     *
     * @param tabs
     */
    getLastEnabledTab(tabs: HTMLButtonElement[]) {
        if (tabs && tabs.length > 0) {
            return tabs.reverse().find(tab => !tab.disabled);
        } else {
            return undefined;
        }
    }

    /**
     * Find the next enabled tab (button) in the list of tabs (buttons) provided.
     *
     * The search will begin at the position in the list where the provided tab (button) is located and the search
     * will wrap around to the beginning of the provided list of tabs (buttons) if no enabled tab (button) is found
     * in the list after the location of the provided tab (button).
     *
     * @param tabs
     * @param refTab
     */
    getNextEnabledTab(tabs: HTMLButtonElement[], refTab: HTMLButtonElement) {
        let found = false;
        for (let tab of tabs) {
            if (found) {
                if (!tab.disabled) {
                    return tab;
                }
            }
            if (tab === refTab) {
                found = true;
            }
        }
        return this.getFirstEnabledTab(tabs);
    }

    /**
     * Find the previous enabled tab (button) in the list of tabs (buttons) provided.
     *
     * The search will begin at the position in the list where the provided tab (button) is located and the search
     * will wrap around to the end of the provided list of tabs (buttons) if no enabled tab (button) is found
     * in the list before the location of the provided tab (button).
     *
     * @param tabs
     * @param refButton
     */
    getPreviousEnabledTab(tabs: HTMLButtonElement[], refTab: HTMLButtonElement) {
        let found = false;
        for (let tab of tabs.slice().reverse()) {
            if (found) {
                if (!tab.disabled) {
                    return tab;
                }
            }
            if (tab === refTab) {
                found = true;
            }
        }
        return this.getLastEnabledTab(tabs);
    }

    /**
     * Determines if the Tab list is configured to automatically select the tab when the tab receives focus.
     *
     * @param tablist
     */
    shouldSelectOnFocus(tablist: Element) {
        return tablist && tablist.classList.contains("jazz-auto-activate");
    }

    /**
     * De-select the specified tab and hide any associated content.
     *
     * @param button
     */
    deselectTab(tab: HTMLButtonElement) {
        this.setTabSelection(tab, false);
    }

    /**
     * Select the tab (button) provided, show content associated with that tab, and de-select all other tabs.
     *
     * @param button
     */
    selectTab(tab: HTMLButtonElement) {

        this.deselectAllOtherButtonsInTablist(this.getTabListForTab(tab), tab);

        // The selected tab is always set to be selected (selected=true).  Selecting an active tab will not de-select it.

        this.setTabSelection(tab, true);
    }

    /**
     * De-select all tabs (buttons) in tablist, except the tab (button) provided.
     *
     * @param tablist
     * @param exceptButton
     */
    deselectAllOtherButtonsInTablist(tablist: Element, exceptButton: HTMLButtonElement) {
        this.getTabs(tablist).forEach((tab) => {
            if (tab !== exceptButton) {
                this.deselectTab(tab);
            }
        });
    }

    /**
     * Handle tab (button) selection events.
     *
     * The tab associated with the selected (clicked) button will be selected.
     *
     * @param event
     */
    @Listener({
        event: 'click',
        selector: TABLIST_BUTTON_SELECTOR
    })
    onClick(event: Event) {
        const tab = <HTMLButtonElement> event.target;
        this.selectTab(tab);
        event.stopImmediatePropagation();
    }

    /**
     * Handle tab (button) keyboard events.
     *
     * @param event
     */
    @Listener({
        event: 'keyup',
        selector: TABLIST_BUTTON_SELECTOR
    })
    onKeyup(event: Event) {

        const eventTab = <HTMLButtonElement> event.target;
        const keyEvent: KeyboardEvent = <KeyboardEvent> event;
        const tablist = this.getTabListForTab(eventTab);

        let focusTab = undefined;

        // identify the tab that should receive focus based on the key that was pressed

        if (keyEvent.key === 'ArrowRight') {
            focusTab = this.getNextEnabledTab(this.getTabs(tablist), eventTab);
        } else if (keyEvent.key === 'ArrowLeft') {
            focusTab = this.getPreviousEnabledTab(this.getTabs(tablist), eventTab);
        } else if (keyEvent.key === 'Home') {
            focusTab = this.getFirstEnabledTab(this.getTabs(tablist));
        } else if (keyEvent.key === 'End') {
            focusTab = this.getLastEnabledTab(this.getTabs(tablist));
        }

        if (focusTab) {

            // set focus to the tab

            focusTab.focus();

            // if the tablist is configured to automatically select the tab upon focus, then select the tab

            if (this.shouldSelectOnFocus(tablist)) {
                this.selectTab(focusTab);
            }
            event.stopImmediatePropagation();
        }
    }
}
