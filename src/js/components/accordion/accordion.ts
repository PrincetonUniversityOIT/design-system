import {ARIA_CONTROLS, ARIA_EXPANDED, Behavior} from '../../base/delegreater';
import { prefix as PREFIX } from '../../config';
import {Listener} from "../../base/decorator-functions";

const ACCORDION_SELECTOR = `.${PREFIX}-accordion`;
const ACCORDION_BUTTON_SELECTOR = `.${PREFIX}-accordion__button`;
const MULTISELECTABLE = "aria-multiselectable";
export const ACCORDION_CONTENT_EXPANDED_CLASSNAME = "jazz-accordion__content--expanded";

export class AccordionBehavior extends Behavior {

    constructor() {
        super();
    }

    init(root: ParentNode) {
        this.select(ACCORDION_BUTTON_SELECTOR, root).forEach((button) => {
            const expanded = button.getAttribute(ARIA_EXPANDED) === "true";
            this.toggleControl(button, expanded);
        });
    }

    // Behavior method override to remove logic for attribute check
    toggleControl(target: HTMLElement, expanded?: boolean): boolean {
        let safeAttribute: string = ARIA_EXPANDED;

        let safeExpanded = expanded;

        if (typeof safeExpanded !== "boolean") {
            // invert the existing button value
            safeExpanded = target.getAttribute(safeAttribute) === "false";
        }

        target.setAttribute(safeAttribute, safeExpanded.toString());

        const controlledElementId = target.getAttribute(ARIA_CONTROLS);
        if (controlledElementId) {
            const controlledElement = document.getElementById(controlledElementId);
            if (!controlledElement) {
                throw new Error(`aria-controls is not properly configured: ${controlledElementId}`);
            }
        }

        return safeExpanded;
    }

    getButtonMatchingContent = (button: HTMLElement, accordion: Element) => {
        const matchVal = button.getAttribute("aria-controls");
        return accordion.querySelector(`#${matchVal}`);
    }

    getAccordionButtons = (accordion: Element) => {
        return this.selectClosestTo(ACCORDION_BUTTON_SELECTOR, ACCORDION_SELECTOR, accordion);
    };

    closeExpandedContents = (accordion: Element, button: Element) => {
        return this.getAccordionButtons(accordion).forEach((other) => {
            if (other !== button ) {
                this.toggleControl(other, false);
                this.getButtonMatchingContent(other, accordion).classList.remove(ACCORDION_CONTENT_EXPANDED_CLASSNAME);
            }
        });
    }

    @Listener({
        event: 'click',
        selector: ACCORDION_BUTTON_SELECTOR
    })
    onClick(event: Event) {
        const button = <HTMLElement> event.target;
        const accordionEl = button.closest(ACCORDION_SELECTOR);
        const multiselectable = accordionEl.getAttribute(MULTISELECTABLE) === "true";

        const expanded = this.toggleControl(button, null);
        const content = this.getButtonMatchingContent(button, accordionEl);

        if (expanded) {
            if (!multiselectable) {
                this.closeExpandedContents(accordionEl, button);
            }
            content.classList.add(ACCORDION_CONTENT_EXPANDED_CLASSNAME);
        } else {
            content.classList.remove(ACCORDION_CONTENT_EXPANDED_CLASSNAME);
        }

        event.stopImmediatePropagation();
    }
}
