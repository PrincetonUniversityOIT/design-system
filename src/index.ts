import { DesignSystem } from './js/design-system';

export * from './components';

function enableDesignSystem() {
    const ds = new DesignSystem();
    ds.disable();
    ds.enable();
}

(<any> window).enableDesignSystem = enableDesignSystem;
