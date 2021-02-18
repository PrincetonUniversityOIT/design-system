import { Behavior} from '../../base/delegreater';
import { prefix as PREFIX } from '../../config';
import {Listener} from "../../base/decorator-functions";

const PAGER_SELECTOR = `.${PREFIX}-pager`;

export class PagerBehavior extends Behavior {

    constructor() {
        super();
    }

    init(root: ParentNode) {
        this.select(PAGER_SELECTOR, root).forEach((pager) => {
            this.createPager(pager);
        });
    }

    createPager(pager) {
        const pagerEl = <HTMLElement> pager;
        if (pagerEl.dataset.totalPages && pagerEl.dataset.currentPage) {
            // add Previous Page
            this.addPage(pagerEl, "Previous", this.disablePrevious(pagerEl));

            const pages = this.iterablePages(pagerEl);
            pages.forEach((page) => {
                if (page >= 0) {
                    const pageNum = page + 1;
                    this.addPage(pagerEl, pageNum.toString(), false);
                } else {
                    this.addPage(pagerEl, "...", true);
                }
            })

            // add Last Page
            this.addPage(pagerEl, "Next", this.disableNext(pagerEl));
        }
    }

    disablePrevious(pagerEl) {
        return Number(pagerEl.dataset.currentPage) === 0;
    }

    disableNext(pagerEl) {
        return Number(pagerEl.dataset.currentPage) === Number(pagerEl.dataset.totalPages);
    }

    addPage(pagerEl, displayPageStr, disable: boolean ) {
        const li = document.createElement('li');
        if (!disable) {
            li.appendChild(this.createLink(displayPageStr, pagerEl));
        } else {
            li.appendChild(this.createSpan(displayPageStr));
        }
        pagerEl.appendChild(li);
    }

    createLink(displayPageStr, pagerEl) {
        const link = document.createElement('a');
        link.appendChild(document.createTextNode(displayPageStr));
        link.setAttribute("href", "javascript:setPage(" + displayPageStr + ");");
        link.setAttribute("aria-label", this.setAriaLabel(displayPageStr));
        link.setAttribute("data-page", displayPageStr);
        if (displayPageStr == Number(pagerEl.dataset.currentPage) ) {
            link.setAttribute("aria-current", "page")
        }
        return link;
    }

    createSpan(displayPageStr) {
        const span = document.createElement('span');
        span.appendChild(document.createTextNode(displayPageStr));
        span.setAttribute("aria-disabled", "true");
        span.setAttribute("data-page", displayPageStr);
        return span;
    }

    setAriaLabel(displayPageStr) {
        if (displayPageStr === 'Previous' || displayPageStr === 'Next') {
            return displayPageStr;
        } else {
            return "Go to Page " + displayPageStr;
        }
    }

    iterablePages(pager) {
        const totalPages:number = Number(pager.dataset.totalPages);
        const currentPage:number = Number(pager.dataset.currentPage);

        let pages:number[] = [];
        let maxPages:number = 9;
        const delta:number = 4;

        let truncate = true;
        let pageNum:number = 0

        if (totalPages < maxPages) {
            maxPages = totalPages;
            truncate = false;
            pageNum = 0;
        } else {
            if (currentPage - delta < 0) {
                pageNum = 0;
            } else if ( (currentPage + delta) > (totalPages - 1)) {
                pageNum = totalPages - maxPages;
            } else {
                pageNum = currentPage - delta;
            }
        }

        for (var pageIdx = 0; pageIdx < maxPages; pageIdx++) {
            if (truncate) {
                if (pageIdx == 0) {
                    // always show the first page number
                    pages.push(0);
                } else if (pageIdx == 1 && pageNum != 1) {
                    // show '...' if second page is not a 2
                    pages.push(-1);
                } else if (pageIdx == maxPages - 1) {
                    // always show the last page number
                    pages.push(totalPages - 1);
                } else if (pageIdx == maxPages - 2 && pageNum != totalPages - 2) {
                    // show '...' if there is a gap between next to last page and last page
                    pages.push(-1);
                } else {
                    pages.push(pageNum);
                }
            } else {
                pages.push(pageNum);
            }
            pageNum++;
        }

        return pages;
    }

    @Listener({
        event: 'click',
        selector: PAGER_SELECTOR
    })
    onClick(event: Event) {
        // console.log('event', event)

        // Click is on the anchor tag
        const itemLink = <HTMLElement> event.target;

        // Get the parent list item
        const item = itemLink.closest("li");

        // Get the page string
        const displayPageStr = itemLink.dataset.page;
        if (displayPageStr != '...') {
            const pager = item.closest(PAGER_SELECTOR);
            this.navigate(pager, displayPageStr, itemLink);
        }

        event.stopImmediatePropagation();
    }

    navigate(pager, displayPageStr, itemLink) {
        let currentPage = Number(pager.dataset.currentPage);
        let totalPages = Number(pager.dataset.totalPages);

        switch (displayPageStr) {
            case 'Next':
                currentPage = this.setNextPageValue(currentPage, totalPages);
                break;
            case 'Previous':
                currentPage = this.setPreviousPageValue(currentPage);
                break;
            default:
                currentPage = itemLink.dataset.page;
                break
        }
        pager.setAttribute("data-current-page", currentPage);
        this.refreshPager(pager);
    }

    setNextPageValue(currentPage, totalPages) {
        currentPage = currentPage + 1;
        if (currentPage > totalPages) {
            currentPage = totalPages;
        }
        return currentPage;
    }

    setPreviousPageValue(currentPage) {
        currentPage = currentPage - 1;
        if (currentPage < 1) {
            currentPage = 1;
        }
        return currentPage;
    }

    refreshPager(pager) {
        const lis = pager.querySelectorAll('li');
        lis.forEach((li) => {
            li.parentNode.removeChild(li);
        });
        this.createPager(pager);
    }
}
