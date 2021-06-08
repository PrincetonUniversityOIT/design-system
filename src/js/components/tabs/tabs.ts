import {ARIA_SELECTED, Behavior} from '../../base/delegreater';
import { prefix as PREFIX } from '../../config';
import {Listener} from "../../base/decorator-functions";

const TABLIST_SELECTOR = `.${PREFIX}-tablist`;
const TABLIST_BUTTON_SELECTOR = `.${PREFIX}-tablist > button`;
const TABLIST_ANCHOR_SELECTOR = `.${PREFIX}-tablist > a`;

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
        this.select(TABLIST_SELECTOR, root).forEach((tablist: HTMLButtonElement|HTMLAnchorElement) => {
           tablist.setAttribute("role", "tablist");
        });
        
        // Select <a> elements
        this.select(TABLIST_ANCHOR_SELECTOR, root).forEach((anchor: HTMLAnchorElement) => {
            anchor.setAttribute("role", "tab");
            const selected = anchor.getAttribute(ARIA_SELECTED) === "true";
            this.setTabSelection(anchor, selected);
        });
        
        // Select <button> elements
        this.select(TABLIST_BUTTON_SELECTOR, root).forEach((button: HTMLButtonElement) => {
            button.setAttribute("role", "tab");
            const selected = button.getAttribute(ARIA_SELECTED) === "true";
            this.setTabSelection(button, selected);
        });
    }

    tabsAreButtons(tabs: HTMLButtonElement[] | HTMLAnchorElement[]): Boolean {
        for (let i = 0; i < tabs.length; i++) {
            if (tabs[i].tagName === "BUTTON") return true;
        }
        return false;
        // tabs.forEach((tab: HTMLButtonElement | HTMLAnchorElement) => {
        //     console.log(tab);
        //     if (tab.tagName === "BUTTON") return true;
        // });
        // return false;
    }

    /**
     * Sets the tab as selected or not selected based on the provided boolean.
     *
     * @param tabElement // Can be either <a> or <button>
     * @param selected
     */
    setTabSelection(tabElement: HTMLButtonElement | HTMLAnchorElement, selected: boolean) {
        this.toggleControl(tabElement, selected, ARIA_SELECTED);
        // enable the ability to get focus for the selected tab element and disable focus ability for all other tab elements
        tabElement.tabIndex = selected ? 0 : -1;
    }

    /**
     * Find the tabs (anchors) associated with the provided Tab list.
     *
     * @param tablist
     */
    getTabs = (tablist: any | HTMLButtonElement[] | HTMLAnchorElement[]): HTMLButtonElement[] | HTMLAnchorElement[] => {
        if (this.tabsAreButtons(tablist)) {
            return this.selectClosestTo(TABLIST_BUTTON_SELECTOR, TABLIST_SELECTOR, tablist);
        }
        return this.selectClosestTo(TABLIST_ANCHOR_SELECTOR, TABLIST_SELECTOR, tablist);
    };

    /**
     * Find the Tab list associated with the specified tab.
     *
     * @param tab
     */
    getTabListForTab(tab: any | HTMLButtonElement | HTMLAnchorElement) {
        return tab.closest(TABLIST_SELECTOR);
    }

    /**
     * Find the first enabled tab in the list of provided tabs
     *
     * @param tabs
     */
    getFirstEnabledTab(tabs: HTMLButtonElement[] | HTMLAnchorElement[]): HTMLButtonElement | HTMLAnchorElement | void {
        if (this.tabsAreButtons(tabs)) {
            return (tabs && tabs.length > 0) ? (tabs as any[]).find(tab => !tab.disabled) : undefined;
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
                if (this.tabsAreButtons(tabs) && !(tab as HTMLButtonElement).disabled) return tab;
                else if (!this.tabsAreButtons(tabs)) return tab;
            }
            if (tab === refTab) found = true;
        }
        return this.getFirstEnabledTab(tabs);
    }

    /**
     * Find the previous enabled tab (anchor) in the list of tabs (anchors) provided.
     *
     * The search will begin at the position in the list where the provided tab (anchor) is located and the search
     * will wrap around to the end of the provided list of tabs (anchors) if no enabled tab (anchor) is found
     * in the list before the location of the provided tab (anchor).
     *
     * @param tabs
     * @param refTab
     */
    getPreviousEnabledTab(tabs: HTMLButtonElement[] | HTMLAnchorElement[], refTab: HTMLButtonElement | HTMLAnchorElement) {
        let found = false;
        for (let tab of tabs.slice().reverse()) {
            if (found) {
                if (this.tabsAreButtons(tabs) && !(tab as HTMLButtonElement).disabled) return tab;
                else if (!this.tabsAreButtons(tabs)) return tab;
            }
            if (tab === refTab) found = true;
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
     * De-select all tabs (anchors) in tablist, except the tab (anchor) provided.
     *
     * @param tablist
     * @param exceptTab
     */
    deselectAllOtherAnchorsInTablist(tablist: HTMLButtonElement[] | HTMLAnchorElement[], exceptTab: HTMLAnchorElement | HTMLButtonElement) {
        this.getTabs(tablist).forEach((tab) => {
            if (tab !== exceptTab) this.deselectTab(tab);
        });
    }

    /**
     * Handle tab (anchor) selection events.
     *
     * The tab associated with the selected (clicked) anchor will be selected.
     *
     * @param event
     */
    @Listener({
        event: 'click',
        selector: TABLIST_BUTTON_SELECTOR
    })
    onClickButton(event: Event) {
        const tab = <HTMLButtonElement> event.target;
        this.selectTab(tab);
        event.stopImmediatePropagation();
    }

    /**
     * Handle tab (anchor) selection events.
     *
     * The tab associated with the selected (clicked) anchor will be selected.
     *
     * @param event
     */
    @Listener({
        event: 'click',
        selector: TABLIST_ANCHOR_SELECTOR
    })
    onClickAnchor(event: Event) {
        const tab = <HTMLAnchorElement> event.target;
        this.selectTab(tab);
        event.stopImmediatePropagation();
    }

    /**
     * Handle tab (anchor) keyboard events.
     *
     * @param event
     */
    @Listener({
        event: 'keyup',
        selector: TABLIST_BUTTON_SELECTOR
    })
    onKeyupButton(event: Event) {

        const eventTab = <HTMLButtonElement> event.target;
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
            if (this.shouldSelectOnFocus(tablist)) this.selectTab(focusTab);
            event.stopImmediatePropagation();
        }
    }

    /**
     * Handle tab (anchor) keyboard events.
     *
     * @param event
     */
    @Listener({
        event: 'keyup',
        selector: TABLIST_ANCHOR_SELECTOR
    })
    onKeyupAnchor(event: Event) {

        const eventTab = <HTMLAnchorElement> event.target;
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
            if (this.shouldSelectOnFocus(tablist)) this.selectTab(focusTab);
            event.stopImmediatePropagation();
        }
    }
}
