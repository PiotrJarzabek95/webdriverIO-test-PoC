import devConfig = require('config');

import wdioBaseConfig from './wdio.base.conf';
import { APPS, URL, SPECS, SUITES } from '../constants/common';

const { WDIO_APPLICATION } = process.env;
const appDetails = devConfig[APPS][WDIO_APPLICATION];

export const config = {
  ...wdioBaseConfig,
  baseUrl: appDetails[URL],
  specs: appDetails[SPECS],
  suites: devConfig[SUITES]
};
