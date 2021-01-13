import {Config, EVENT_METADATA} from "./delegreater";

export const Listener = (config) => (target: Object, _propertyKey: string, descriptor: PropertyDescriptor) =>  {
    const event = config.event;
    const selector = config.selector;

    const constructor = target.constructor;
    // Use of Object.defineProperty is important since it creates non-enumerable property which
    // prevents the property is copied during subclassing.
    const meta = constructor.hasOwnProperty(EVENT_METADATA) ?
        (constructor as any)[EVENT_METADATA] :
        Object.defineProperty(constructor, EVENT_METADATA, {value: []})[EVENT_METADATA];
    const descriptorValue = descriptor ? descriptor.value : "";
    meta.push(new Config(event, selector, descriptorValue));
};
