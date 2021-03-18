import '@testing-library/jest-dom';

// @ts-ignore
export function simulateKeyupEvent(element: HTMLElement, value: string) {
    const event: KeyboardEvent = new KeyboardEvent('keyup', {
        bubbles: true,
        cancelable: true,
        key: value
    });
    // Object.defineProperty(event, 'target', { value: { value } });
    element.dispatchEvent(event);
};
