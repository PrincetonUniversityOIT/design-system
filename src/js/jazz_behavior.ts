import {AccordionBehavior} from './components/accordion/accordion';
import {ModalDialogBehavior} from "./components/modal-dialog/modal-dialog";
import {HeaderBehavior} from "./components/header/header";
import {UtilityHeaderBehavior} from "./components/header/utility-header";
import {MenuToggleBehavior} from "./components/menu-toggle/menu-toggle";
import {PagerBehavior} from "./components/pager/pager";
import {TabsBehavior} from "./components/tabs/tabs";

export class PrincetonDesignSystem {

    public scrolling = false;
    public scrollInterval;

    // options allow consumers to disable behavior for components if they want to handle the behavior on their own
    public enableDesignSystem() {
        this.disable();
        this.enable();
    }

    public enable() {
        this.startTrackingScroll();
        new AccordionBehavior().enable();
        new ModalDialogBehavior().enable();
        new HeaderBehavior().enable();
        new MenuToggleBehavior().enable();
        new PagerBehavior().enable();
        new TabsBehavior().enable();
        new UtilityHeaderBehavior().enable();
    }

    public disable() {
        new AccordionBehavior().disable();
        new ModalDialogBehavior().disable();
        new HeaderBehavior().disable();
        new MenuToggleBehavior().disable();
        new PagerBehavior().disable();
        new TabsBehavior().disable();
        new UtilityHeaderBehavior().disable();
        this.stopTrackingScroll();
    }

    public startTrackingScroll() {
        window.addEventListener('scroll', () => {
            this.scrolling = true;
        });

        this.scrollInterval = setInterval(this.updateScrollCoords, 250 );
    }

    public updateScrollCoords = () => {
        if (this.scrolling) {
            this.scrolling = false;
            this.scrollEvent();
        }
    }

    public scrollEvent() {
        var htmlEl = document.getElementsByTagName("html").item(0);
        var scrollX = window.scrollX;
        var scrollY = window.scrollY;
        if (scrollX === 0) {
            htmlEl.removeAttribute("data-jazz-scrollX");
        } else {
            htmlEl.setAttribute("data-jazz-scrollX", window.scrollX.toString());
        }
        if (scrollY === 0) {
            htmlEl.removeAttribute("data-jazz-scrollY");
        } else {
            htmlEl.setAttribute("data-jazz-scrollY", window.scrollY.toString());
        }
    }

    public stopTrackingScroll() {
        clearInterval(this.scrollInterval);
        window.removeEventListener("scroll", this.scrollEvent);
        this.scrolling = false;
    }
}
