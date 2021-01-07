import { Accordion } from './components/accordion';
import {ModalDialog} from "./components/modal-dialog";

export class DesignSystem {
    public enableDesignSystem() {
        this.enable();
        this.disable();
    }

    public enable() {
        new Accordion().enable();
        new ModalDialog().enable();
    }

    public disable() {
        new Accordion().disable();
        new ModalDialog().disable();
    }
}
