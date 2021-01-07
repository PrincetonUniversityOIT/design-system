import { AccordionBehavior } from './components/accordion';
import {ModalDialogBehavior} from "./components/modal-dialog";

export class PrincetonDesignSystem {
    public enableDesignSystem() {
        this.enable();
        this.disable();
    }

    public enable() {
        new AccordionBehavior().enable();
        new ModalDialogBehavior().enable();
    }

    public disable() {
        new AccordionBehavior().disable();
        new ModalDialogBehavior().disable();
    }
}
