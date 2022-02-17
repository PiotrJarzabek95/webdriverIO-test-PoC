import 'tsconfig-paths/register';
import { exec } from 'child_process';
import 'dotenv/config.js';
import { browsersCapabilities, selectedServices } from '../browserCapabilities/browserCapabilities';


const { BOTS_URI } = process.env;

// cSpell:words configurator bugreport webdriverio applitools browserstack sumologic chromedriver specfile specfiles waitfor
// Information on configuration file can be found in webdriver.io documentation here: https://webdriver.io/docs/configurationfile.html

const wdioBaseconfig: WebdriverIO.Config = {
  runner: 'local',
  maxInstances: 3,
  specFileRetries: 1,
  capabilities: browsersCapabilities(),
  logLevel: 'warn',
  bail: 0,
  waitforTimeout: 30000,
  connectionRetryTimeout: 90000,
  connectionRetryCount: 3,
  services: selectedServices(),
  framework: 'mocha',
  reporters: ['spec'],
  mochaOpts: {
    ui: 'bdd',
    timeout: 60000,
    retries: 2,
    require: ['tsconfig-paths/register']
  },
  onPrepare: () => {
    if (process.argv.indexOf('--edge') !== -1) {
      exec('start msedgedriver.exe --port=4444');
    }
  },
  onComplete: (exitCode, config, capabilities, results) => {
    if (process.argv.indexOf('--edge') !== -1) {
      exec('TASKKILL /IM msedgedriver.exe');
    }
  }
};

export default wdioBaseconfig;
