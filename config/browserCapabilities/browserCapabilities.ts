import { Capabilities } from "@wdio/types";

const browserArgs = [
  '--headless',
  '--disable-gpu',
  '--disable-setuid-sandbox',
  '--no-sandbox',
  '--window-size=1920,1080',
  '--disable-dev-shm-usage',
];

const browsersCapabilities = (): Capabilities.Capabilities[] => {
  if (process.argv.indexOf('--firefox') !== -1) {
    return [
      {
        browserName: 'firefox',
        'moz:firefoxOptions': { args: browserArgs }
      }
    ];
  } else if (process.argv.indexOf('--edge') !== -1) {
    return [
      {
        browserName: 'MicrosoftEdge',
        'ms:edgeOptions': { args: browserArgs }
      }
    ];
  } else {
    return [
      {
        browserName: 'chrome',
        'goog:chromeOptions': { args: browserArgs }
      }
    ];
  }
};

const selectedServices = (): string[] => {
  if (process.argv.indexOf('--firefox') !== -1) {
    return ['geckodriver'];
  } else {
    return ['chromedriver'];
  }
};

export { browsersCapabilities, selectedServices };
