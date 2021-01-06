import {Listener, ARIA_EXPANDED, Behavior} from '../base/delegreater';
import { prefix as PREFIX } from '../config';

const ACCORDION_SELECTOR = `.${PREFIX}-accordion`;
const ACCORDION_BUTTON_SELECTOR = `.${PREFIX}-accordion__button`;
const MULTISELECTABLE = "aria-multiselectable";

export class Accordion extends Behavior {

    init(root: ParentNode) {
        console.log('init was called');
        this.select(ACCORDION_BUTTON_SELECTOR, root).forEach((button) => {
            console.log('toggling button');
            const expanded = button.getAttribute(ARIA_EXPANDED) === "true";
            this.toggleControl(button, expanded);
        });
    }

    getAccordionButtons = (accordion: Element) => {
        return this.selectClosestTo(ACCORDION_BUTTON_SELECTOR, ACCORDION_SELECTOR, accordion);
    };

    @Listener({
        event: 'click',
        selector: ACCORDION_BUTTON_SELECTOR
    })
    onClick(event: Event) {
        console.log('clicked it!');
        console.log(event);
        const button = <HTMLElement> event.target;
        const accordionEl = button.closest(ACCORDION_SELECTOR);
        const multiselectable = accordionEl.getAttribute(MULTISELECTABLE) === "true";

        const expanded = this.toggleControl(button, null);

        if (expanded && !multiselectable) {
            this.getAccordionButtons(accordionEl).forEach((other) => {
                if (other !== button) {
                    this.toggleControl(other, false);
                }
            });
        }
        event.stopImmediatePropagation();
    }
}
