import {ARIA_SELECTED, Behavior} from '../../base/delegreater';
import { prefix as PREFIX } from '../../config';
import {Listener} from "../../base/decorator-functions";

const TABLIST_SELECTOR = `.${PREFIX}-tablist`;
const TABLIST_BUTTON_ANCHOR_SELECTOR = `.${PREFIX}-tablist > button, .${PREFIX}-tablist > a`;
const TABLIST_SPAN_SELECTOR = `.${PREFIX}-tablist > span`;


export class TabsBehavior extends Behavior {

    constructor() {
        super();
    }

    /**
     * During initialization of tablist behavior, the following logic is performed:
     *
     * 1) Each tablist element is given the role of "tablist".
     * 2) Each tablist element is given the role of "tab".
     * 3) Content associated with each tab is shown/hidden based on the "aria-selected" attribute.
     *
     * @param root
     */
    init(root: ParentNode) {
        this.select(TABLIST_SELECTOR, root).forEach((tablist: HTMLButtonElement | HTMLAnchorElement) => {
           tablist.setAttribute("role", "tablist");
        });
        
        this.select(TABLIST_BUTTON_ANCHOR_SELECTOR, root).forEach((element: HTMLButtonElement | HTMLAnchorElement) => {
            element.setAttribute("role", "tab");
            const selected = element.getAttribute(ARIA_SELECTED) === "true";
            this.setTabSelection(element, selected);
        });

        this.select(TABLIST_SPAN_SELECTOR, root).forEach((span: HTMLSpanElement) => {
            span.setAttribute("role", "tab");
        })
    }

    tabsAreButtons(tabs: Element | HTMLButtonElement[] | HTMLAnchorElement[]): Boolean {
        return tabs && (tabs[0] instanceof HTMLButtonElement);
    }

    /**
     * Sets the tab as selected or not selected based on the provided boolean.
     *
     * @param tab // Can be either <a> or <button>
     * @param selected
     */
    setTabSelection(tab: HTMLButtonElement | HTMLAnchorElement, selected: boolean) {
        this.toggleControl(tab, selected, ARIA_SELECTED);
        // enable the ability to get focus for the selected tab element and disable focus ability for all other tab elements
        tab.tabIndex = selected ? 0 : -1;
    }

    /**
     * Find the tabs associated with the provided Tab list.
     *
     * @param tablist
     */
    getTabs = (tablist: Element) => {
        return this.selectClosestTo(TABLIST_BUTTON_ANCHOR_SELECTOR, TABLIST_SELECTOR, tablist);
    }

    /**
     * Find the Tab list associated with the specified tab.
     *
     * @param tab
     */
    getTabListForTab(tab: HTMLButtonElement | HTMLAnchorElement) {
        return tab.closest(TABLIST_SELECTOR);
    }

    /**
     * Find the first enabled tab in the list of provided tabs
     *
     * @param tabs
     */
    getFirstEnabledTab(tabs: HTMLButtonElement[] | HTMLAnchorElement[]) {
        if (this.tabsAreButtons(tabs)) {
            return (tabs && tabs.length > 0) ? (tabs as HTMLButtonElement[]).find(tab => !tab.disabled) : undefined;
        }
        return (tabs && tabs.length > 0) ? tabs[0] : undefined;
    }

    /**
     * Find the last enabled tab in the list of provided tabs.
     *
     * @param tabs
     */
    getLastEnabledTab(tabs: HTMLButtonElement[] | HTMLAnchorElement[]) {
        if (this.tabsAreButtons(tabs)) {
            return (tabs && tabs.length > 0) ? (tabs as HTMLButtonElement[]).reverse().find(tab => !tab.disabled) : undefined;
        }
        return (tabs && tabs.length > 0) ? tabs.reverse()[0] : undefined;
    }

    /**
     * Find the next enabled tab in the list of tabs provided.
     *
     * The search will begin at the position in the list where the provided tab is located and the search
     * will wrap around to the beginning of the provided list of tabs if no enabled tab is found
     * in the list after the location of the provided tab.
     *
     * @param tabs
     * @param refTab
     */
    getNextEnabledTab(tabs: HTMLButtonElement[] | HTMLAnchorElement[], refTab: HTMLButtonElement | HTMLAnchorElement) {
        let found = false;
        for (let tab of tabs) {
            if (found) {
                if (!this.tabsAreButtons(tabs) || (this.tabsAreButtons(tabs) && !(tab as HTMLButtonElement).disabled)) {
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
     * Find the previous enabled tab in the list of tabs provided.
     *
     * The search will begin at the position in the list where the provided tab is located and the search
     * will wrap around to the end of the provided list of tabs if no enabled tab is found
     * in the list before the location of the provided tab.
     *
     * @param tabs
     * @param refTab
     */
    getPreviousEnabledTab(tabs: HTMLButtonElement[] | HTMLAnchorElement[], refTab: HTMLButtonElement | HTMLAnchorElement) {
        let found = false;
        for (let tab of tabs.slice().reverse()) {
            if (found) {
                // return if tabs are anchor tags or if the tabs are buttons and not disabled
                if (!this.tabsAreButtons(tabs) || (this.tabsAreButtons(tabs) && !(tab as HTMLButtonElement).disabled)) {
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
     * Determines if the tablist is configured to automatically select the tab when the tab receives focus.
     *
     * @param tablist
     */
    shouldSelectOnFocus(tablist: Element) {
        return tablist && tablist.classList.contains("jazz-auto-activate");
    }

    /**
     * De-select the specified tab and hide any associated content.
     *
     * @param tab
     */
    deselectTab(tab: HTMLButtonElement | HTMLAnchorElement) {
        this.setTabSelection(tab, false);
    }

    /**
     * Select the tab provided, show content associated with that tab, and de-select all other tabs.
     *
     * @param tab
     */
    selectTab(tab: HTMLButtonElement | HTMLAnchorElement) {
        this.deselectAllOtherAnchorsInTablist(this.getTabListForTab(tab), tab);

        // The selected tab is always set to be selected (selected=true).  Selecting an active tab will not de-select it.
        this.setTabSelection(tab, true);
    }

    /**
     * De-select all tabs in tablist, except the tab provided.
     *
     * @param tablist
     * @param exceptTab
     */
    deselectAllOtherAnchorsInTablist(tablist: Element, exceptTab: HTMLAnchorElement | HTMLButtonElement) {
        this.getTabs(tablist).forEach((tab) => {
            if (tab !== exceptTab) {
                this.deselectTab(tab);
            } 
        });
    }

    /**
     * Handle tab selection events.
     *
     * The tab associated with the selected (clicked) anchor will be selected.
     *
     * @param event
     */
    @Listener({
        event: 'click',
        selector: TABLIST_BUTTON_ANCHOR_SELECTOR
    })
    onClick(event: Event) {
        const tab = <HTMLButtonElement | HTMLAnchorElement> event.target;
        this.selectTab(tab);
        event.stopImmediatePropagation();
    }

    /**
     * Handle tab keyboard events.
     *
     * @param event
     */
    @Listener({
        event: 'keyup',
        selector: TABLIST_BUTTON_ANCHOR_SELECTOR
    })
    onKeyup(event: Event) {

        const eventTab = <HTMLButtonElement | HTMLAnchorElement> event.target;
        const keyEvent: KeyboardEvent = <KeyboardEvent> event;
        const tablist = this.getTabListForTab(eventTab);

        let focusTab = undefined;

        // identify the tab that should receive focus based on the key that was pressed
        switch (keyEvent.key) {
            case 'ArrowRight':
                focusTab = this.getNextEnabledTab(this.getTabs(tablist), eventTab);
                break;
            case 'ArrowLeft':
                focusTab = this.getPreviousEnabledTab(this.getTabs(tablist), eventTab);
                break;
            case 'Home':
                focusTab = this.getFirstEnabledTab(this.getTabs(tablist));
                break;
            case 'End':
                focusTab = this.getLastEnabledTab(this.getTabs(tablist));
                break;
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
