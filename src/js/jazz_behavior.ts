import {AccordionBehavior} from './components/accordion/accordion';
import {ModalDialogBehavior} from "./components/modal-dialog/modal-dialog";
import {HeaderBehavior} from "./components/header/header";
import {MenuToggleBehavior} from "./components/menu-toggle/menu-toggle";
import {PagerBehavior} from "./components/pager/pager";
import {TabsBehavior} from "./components/tabs/tabs";

export class BehaviorOptions {
    public disablePager?: boolean
}

export class PrincetonDesignSystem {

    // options allow consumers to disable behavior for components if they want to handle the behavior on their own
    public enableDesignSystem(options?: BehaviorOptions) {
        this.enable(options);
        this.disable(options);
    }

    public enable(options?: BehaviorOptions) {
        new AccordionBehavior().enable();
        new ModalDialogBehavior().enable();
        new HeaderBehavior().enable();
        new MenuToggleBehavior().enable();

        // if pager is not disabled
        if (!options || (options && !options.disablePager)) {
            new PagerBehavior().enable();
        }

        new TabsBehavior().enable();
    }

    public disable(options?: BehaviorOptions) {
        new AccordionBehavior().disable();
        new ModalDialogBehavior().disable();
        new HeaderBehavior().disable();
        new MenuToggleBehavior().disable();

        // if pager is not disabled
        if (!options || (options && !options.disablePager)) {
            new PagerBehavior().disable();
        }

        new TabsBehavior().disable();
    }
}
