import { on, off } from 'delegated-events';

export const EVENT_METADATA = '__event__metadata__';
export const ARIA_EXPANDED = "aria-expanded";
export const ARIA_CONTROLS = "aria-controls";
export const HIDDEN = "hidden";

class Config {
    constructor(public event: string, public selector: string, public f: (event) => {}) {
    }
}

export const Listener = (config) => (target: Object, _propertyKey: string, descriptor: PropertyDescriptor) =>  {
    const event = config.event;
    const selector = config.selector;

    const constructor = target.constructor;
    // Use of Object.defineProperty is important since it creates non-enumerable property which
    // prevents the property is copied during subclassing.
    const meta = constructor.hasOwnProperty(EVENT_METADATA) ?
        (constructor as any)[EVENT_METADATA] :
        Object.defineProperty(constructor, EVENT_METADATA, {value: []})[EVENT_METADATA];
    meta.push(new Config(event, selector, descriptor.value));
};

export abstract class Behavior {

    abstract init(root: ParentNode): void;

    public enable(_root?: ParentNode) {
        console.log('enabled');
        console.log(this.constructor[EVENT_METADATA]);
        let root = _root ? _root : window.document;
        this.init(root);
        this.constructor[EVENT_METADATA].forEach((config: Config) => {
            // multiple events can be specified, separated by spaces
            config.event.split(" ").forEach((event: string) => {
                on(event, config.selector, (args) => { config.f.call(this, args)});
            });
        });
    }

    public disable() {
        console.log('disabled');
        console.log(this.constructor[EVENT_METADATA]);
        this.constructor[EVENT_METADATA].forEach((config: Config) => {
            // multiple events can be specified, separated by spaces
            config.event.split(" ").forEach((event: string) => {
                off(event, config.selector, config.f);
            });
        });
    }

    public toggleControl(target: HTMLElement, expanded?: boolean) {

        let safeExpanded = expanded;

        if (typeof safeExpanded !== "boolean") {
            // invert the existing button value
            safeExpanded = target.getAttribute(ARIA_EXPANDED) === "false";
        }

        target.setAttribute(ARIA_EXPANDED, safeExpanded.toString());

        const controlledElementId = target.getAttribute(ARIA_CONTROLS);
        const controlledElement = document.getElementById(controlledElementId);
        if (!controlledElement) {
            throw new Error(`aria-controls is not properly configured: ${controlledElementId}`);
        }

        if (safeExpanded) {
            controlledElement.removeAttribute(HIDDEN);
        } else {
            console.log('setting control' + controlledElementId + ' to hidden');
            controlledElement.setAttribute(HIDDEN, "");
        }

        return safeExpanded;
    }

    isElement(value) {
        return value && typeof value === "object" && value.nodeType === 1;
    }

    public select(selector: string, context: ParentNode) {

        if (typeof selector !== "string") {
            return [];
        }

        if (!context || !this.isElement(context)) {
            context = window.document; // eslint-disable-line no-param-reassign
        }

        const selection = context.querySelectorAll(selector);
        console.log('select ' + selector);
        console.log(selection);
        return Array.prototype.slice.call(selection);
    }

    public selectClosestTo(targetSelector: string, closestToSelector: string, context: Element) {
        const elements = this.select(targetSelector, context);
        return elements.filter((element) => element.closest(closestToSelector) === context);
    }
}
