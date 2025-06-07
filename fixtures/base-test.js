const base = require('@playwright/test');
import { HomePage } from './home-page'
import { ManagePage } from './manage-page';
import { ModelPage } from './model-page';
import { DatasetPage } from './dataset-page';
import { TestResultPage } from './test-result-page';

// Extend base test by providing "homePage","managePage","modelPage" functions and elements to test
// This new "test" can be used in multiple test files, and each of them will get the fixtures.
exports.test = base.test.extend({
    homePage: async ({ page }, use) => {
      await use(new HomePage(page));
    },
    managePage: async ({ page }, use) => {
      await use(new ManagePage(page));
    },
    modelPage: async ({ page }, use) => {
      await use(new ModelPage(page));
    },
    datasetPage: async ({ page }, use) => {
      await use(new DatasetPage(page));
    },
    testResultPage: async ({ page }, use) => {
      await use(new TestResultPage(page));
    }
  });
  
exports.expect = base.expect;