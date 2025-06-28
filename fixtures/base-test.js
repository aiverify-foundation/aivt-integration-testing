const base = require('@playwright/test');
import { CanvasPage } from './canvas-page';
import { CreateProjectPage } from './create-project-page';
import { DatasetPage } from './dataset-page';
import { HomePage } from './home-page';
import { ManagePage } from './manage-page';
import { ModelPage } from './model-page';
import { PluginPage } from './plugin-page';
import { ReportTemplatePage } from './report-template-page';
import { SelectDataPage } from './select-data-page';
import { TestResultPage } from './test-result-page';
import { UserInputPage } from './user-input-page';

// Extend base test by providing "canvasPage","createProjectPage","datasetPage","homePage","managePage","modelPage","pluginPage","reportTemplatePage","selectDataPage","testResultPage","userInputPage" functions and elements to test
// This new "test" can be used in multiple test files, and each of them will get the fixtures.
exports.test = base.test.extend({
    canvasPage: async ({ page }, use) => {
      await use(new CanvasPage(page));
    },
    createProjectPage: async ({ page }, use) => {
      await use(new CreateProjectPage(page));
    },
    datasetPage: async ({ page }, use) => {
      await use(new DatasetPage(page));
    },
    homePage: async ({ page }, use) => {
      await use (new HomePage(page));
    },
    managePage: async ({ page }, use) => {
      await use(new ManagePage(page));
    },
    modelPage: async ({ page }, use) => {
      await use(new ModelPage(page));
    },
    pluginPage: async ({ page }, use) => {
      await use(new PluginPage(page));
    },
    reportTemplatePage: async ({ page }, use) => {
      await use(new ReportTemplatePage(page));
    },
    selectDataPage: async ({ page }, use) => {
      await use(new SelectDataPage(page));
    },
    testResultPage: async ({ page }, use) => {
      await use(new TestResultPage(page));
    },
    userInputPage: async ({ page }, use) => {
      await use(new UserInputPage(page));
    }
  });
  
exports.expect = base.expect;