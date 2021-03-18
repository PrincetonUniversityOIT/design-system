import {AccordionBehavior} from './components/accordion/accordion';
import {ModalDialogBehavior} from "./components/modal-dialog/modal-dialog";
import {HeaderBehavior} from "./components/header/header";
import {MenuToggleBehavior} from "./components/menu-toggle/menu-toggle";
import {PagerBehavior} from "./components/pager/pager";
import {TabsBehavior} from "./components/tabs/tabs";

export class PrincetonDesignSystem {
    public enableDesignSystem() {
        this.enable();
        this.disable();
    }

    public enable() {
        new AccordionBehavior().enable();
        new ModalDialogBehavior().enable();
        new HeaderBehavior().enable();
        new MenuToggleBehavior().enable();
        new PagerBehavior().enable();
        new TabsBehavior().enable();
    }

    public disable() {
        new AccordionBehavior().disable();
        new ModalDialogBehavior().disable();
        new HeaderBehavior().disable();
        new MenuToggleBehavior().disable();
        new PagerBehavior().disable();
        new TabsBehavior().disable();
    }
}
