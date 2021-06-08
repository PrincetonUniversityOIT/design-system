import {ARIA_SELECTED, Behavior} from '../../base/delegreater';
import { prefix as PREFIX } from '../../config';
import {Listener} from "../../base/decorator-functions";

const TABLIST_SELECTOR = `.${PREFIX}-tablist`;
const TABLIST_ANCHOR_SELECTOR = `.${PREFIX}-tablist > a`;

export class TabsBehavior extends Behavior {

    constructor() {
        super();
    }

    /**
     * During initialization of tablist behavior, the following logic is performed:
     *
     * 1) Each tablist element is given the role of "tablist".
     * 2) Each tablist anchor element is given the role of "tab".
     * 3) Content associated with each tab is shown/hidden based on the "aria-selected" attribute.
     *
     * @param root
     */
    init(root: ParentNode) {
        this.select(TABLIST_SELECTOR, root).forEach((tablist: HTMLElement) => {
           tablist.setAttribute("role", "tablist");
        });
        this.select(TABLIST_ANCHOR_SELECTOR, root).forEach((anchor: HTMLAnchorElement) => {
            anchor.setAttribute("role", "tab");
            const selected = anchor.getAttribute(ARIA_SELECTED) === "true";
            this.setTabSelection(anchor, selected);
        });
    }

    /**
     * Sets the tab as selected or not selected based on the provided boolean.
     *
     * @param anchor
     * @param selected
     */
    setTabSelection(anchor: HTMLAnchorElement, selected: boolean) {
        this.toggleControl(anchor, selected, ARIA_SELECTED);
        // enable the ability to get focus for the selected anchor and disable focus ability for all other anchors
        anchor.tabIndex = selected ? 0 : -1;
    }

    /**
     * Find the tabs (anchors) associated with the provided Tab list.
     *
     * @param tablist
     */
    getTabs = (tablist: Element): HTMLAnchorElement[] => {
        return this.selectClosestTo(TABLIST_ANCHOR_SELECTOR, TABLIST_SELECTOR, tablist);
    };

    /**
     * Find the Tab list associated with the specified tab (anchor).
     *
     * @param tab
     */
    getTabListForTab(tab: HTMLAnchorElement) {
        return tab.closest(TABLIST_SELECTOR);
    }

    /**
     * Find the first enabled tab (anchor) in the list of provided tabs (anchors)
     *
     * @param tabs
     */
    getFirstEnabledTab(tabs: HTMLAnchorElement[]) {
        return (tabs && tabs.length > 0) ? tabs[0] : undefined;
    }

    /**
     * Find the last enabled tab (anchor) in the list of provided tabs (anchors).
     *
     * @param tabs
     */
    getLastEnabledTab(tabs: HTMLAnchorElement[]) {
        return (tabs && tabs.length > 0) ? tabs.reverse()[0] : undefined;
    }

    /**
     * Find the next enabled tab (anchor) in the list of tabs (anchors) provided.
     *
     * The search will begin at the position in the list where the provided tab (anchor) is located and the search
     * will wrap around to the beginning of the provided list of tabs (anchors) if no enabled tab (anchor) is found
     * in the list after the location of the provided tab (anchor).
     *
     * @param tabs
     * @param refTab
     */
    getNextEnabledTab(tabs: HTMLAnchorElement[], refTab: HTMLAnchorElement) {
        let found = false;
        for (let tab of tabs) {
            if (found) return tab;
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
     * @param refAnchor
     */
    getPreviousEnabledTab(tabs: HTMLAnchorElement[], refTab: HTMLAnchorElement) {
        let found = false;
        for (let tab of tabs.slice().reverse()) {
            if (found) return tab;
            if (tab === refTab) found = true;
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
     * @param anchor
     */
    deselectTab(tab: HTMLAnchorElement) {
        this.setTabSelection(tab, false);
    }

    /**
     * Select the tab (anchor) provided, show content associated with that tab, and de-select all other tabs.
     *
     * @param anchor
     */
    selectTab(tab: HTMLAnchorElement) {

        this.deselectAllOtherAnchorsInTablist(this.getTabListForTab(tab), tab);

        // The selected tab is always set to be selected (selected=true).  Selecting an active tab will not de-select it.

        this.setTabSelection(tab, true);
    }

    /**
     * De-select all tabs (anchors) in tablist, except the tab (anchor) provided.
     *
     * @param tablist
     * @param exceptAnchor
     */
    deselectAllOtherAnchorsInTablist(tablist: Element, exceptAnchor: HTMLAnchorElement) {
        this.getTabs(tablist).forEach((tab) => {
            if (tab !== exceptAnchor) this.deselectTab(tab);
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
        selector: TABLIST_ANCHOR_SELECTOR
    })
    onClick(event: Event) {
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
        selector: TABLIST_ANCHOR_SELECTOR
    })
    onKeyup(event: Event) {

        const eventTab = <HTMLAnchorElement> event.target;
        const keyEvent: KeyboardEvent = <KeyboardEvent> event;
        const tablist = this.getTabListForTab(eventTab);

        let focusTab = undefined;

        // identify the tab that should receive focus based on the key that was pressed

        switch (keyEvent.key) {
            case 'Enter':
                console.log('enter');
                this.onClick(focusTab);
                break;
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
