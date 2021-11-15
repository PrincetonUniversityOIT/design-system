import { MINIMAL_VIEWPORTS} from '@storybook/addon-viewport';
import './storybook.css';

const customViewports = {
  PhoneOnly: {
    name: 'Phone Only',
    styles: {
      width: '599px',
      height: '375px',
    },
  },
  TabletPortrait: {
    name: 'Tablet Portrait',
    styles: {
      width: '600px',
      height: '375px',
    },
  },
  TabletLandscape: {
    name: 'Tablet Landscape',
    styles: {
      width: '900px',
      height: '600px',
    },
  },
  Desktop: {
    name: 'Desktop',
    styles: {
      width: '1200px',
      height: '720px',
    },
  },
  BigDesktop: {
    name: 'Big Desktop',
    styles: {
      width: '1800px',
      height: '977px',
    },
  },
  iPhoneNew: {
    name: 'iPhone X/11',
    styles: {
      width: '375px',
      height: '812px',
    },
  },
  iPhonePlus: {
    name: 'iPhone X/11 Plus',
    styles: {
      width: '414px',
      height: '896px',
    },
  },
  iPhoneOld: {
    name: 'iPhone 8/7/6',
    styles: {
      width: '375px',
      height: '667px',
    },
  },
  iPhone5: {
    name: 'iPhone 5',
    styles: {
      width: '320px',
      height: '568px',
    },
  },
  iPad: {
    name: 'iPad',
    styles: {
      width: '768px',
      height: '1024px',
    },
  },
  iPadPro: {
    name: 'iPad Pro',
    styles: {
      width: '1024px',
      height: '1366px',
    },
  },
  nexusPixel: {
    name: 'Nexus/Pixel',
    styles: {
      width: '411px',
      height: '731px',
    },
  },
  note5_G5_OnePlus3: {
    name: 'Samsung Galaxy Note 5/LG G5/One Plus 3',
    styles: {
      width: '480px',
      height: '853px',
    },
  },
  samsungGalaxy: {
    name: 'Samsung Galaxy',
    styles: {
      width: '360px',
      height: '740px',
    },
  },
  macBook13: {
    name: 'MacBook 13-inch',
    styles: {
      width: '1280px',
      height: '800px',
    },
  },
  macBook15: {
    name: 'MacBook 15-inch',
    styles: {
      width: '1440px',
      height: '900px',
    },
  },
  macAir11: {
    name: 'MacBook Air 11-inch',
    styles: {
      width: '1366px',
      height: '768px',
    },
  },
  laptop_very_small: {
    name: 'Laptop - Very Small',
    styles: {
      width: '800px',
      height: '600px',
    },
  },
  laptop_small: {
    name: 'Laptop - Small',
    styles: {
      width: '1024px',
      height: '768px',
    },
  },
  laptop_medium: {
    name: 'Laptop - Medium',
    styles: {
      width: '1280px',
      height: '720px',
    },
  },
  laptop_big: {
    name: 'Laptop - Big',
    styles: {
      width: '1360px',
      height: '768px',
    },
  },
  huge_monitor: {
    name: 'Huge Monitor',
    styles: {
      width: '1920px',
      height: '977px',
    },
  },
};

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  viewport: {
    viewports: {
      ...MINIMAL_VIEWPORTS,
      ...customViewports,
    },
  },
  layout: 'fullscreen'
}
