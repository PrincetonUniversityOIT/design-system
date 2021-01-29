import { AccordionBehavior } from './components/accordion/accordion';
import { ModalDialogBehavior } from "./components/modal-dialog/modal-dialog";
import {HeaderBehavior} from "./components/header/header";
import {MenuToggleBehavior} from "./components/menu-toggle/menu-toggle";

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
    }

    public disable() {
        new AccordionBehavior().disable();
        new ModalDialogBehavior().disable();
        new HeaderBehavior().disable();
        new MenuToggleBehavior().disable();
    }
}
