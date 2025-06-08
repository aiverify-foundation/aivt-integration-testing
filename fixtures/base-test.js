const base = require('@playwright/test');
import { HomePage } from './home-page';
import { CreateProjectPage } from './create-project-page';
import { ManagePage } from './manage-page';
import { SelectDataPage } from './select-data-page';
import { CanvasPage } from './canvas-page';
import { ModelPage } from './model-page';
import { DatasetPage } from './dataset-page';
import { ReportTemplatePage } from './report-template-page';
import { UserInputPage } from './user-input-page';
import { TestResultPage } from './test-result-page';

// Extend base test by providing "homePage","createProjectPage","managePage","selectDataPage","canvasPage","modelPage","datasetPage","reportTemplatePage","userInputPage","testResultPage" functions and elements to test
// This new "test" can be used in multiple test files, and each of them will get the fixtures.
exports.test = base.test.extend({
    homePage: async ({ page }, use) => {
      await use(new HomePage(page));
    },
    createProjectPage: async ({ page }, use) => {
      await use(new CreateProjectPage(page));
    },
    managePage: async ({ page }, use) => {
      await use(new ManagePage(page));
    },
    canvasPage: async ({ page }, use) => {
      await use (new CanvasPage(page));
    },
    selectDataPage: async ({ page }, use) => {
      await use(new SelectDataPage(page));
    },
    modelPage: async ({ page }, use) => {
      await use(new ModelPage(page));
    },
    datasetPage: async ({ page }, use) => {
      await use(new DatasetPage(page));
    },
    reportTemplatePage: async ({ page }, use) => {
      await use(new ReportTemplatePage(page));
    },
    userInputPage: async ({ page }, use) => {
      await use(new UserInputPage(page));
    },
    testResultPage: async ({ page }, use) => {
      await use(new TestResultPage(page));
    }
  });
  
exports.expect = base.expect;