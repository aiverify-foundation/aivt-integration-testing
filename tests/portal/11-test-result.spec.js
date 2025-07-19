import { test, expect } from '../../fixtures/base-test'
import fs from 'fs'
import { setTimeout } from 'timers/promises'

const url = process.env.URL
const port_number = process.env.PORT_NUMBER
const root_path = process.env.ROOT_PATH

test.describe('View All Test Results', () => {

    test.beforeEach(async ({ homePage, managePage }) => {

        /* AI Verify Homepage */
        console.log('[INFO] Navigate to AI Verify Home Page')
        await homePage.goto(url + ":" + port_number)
        await expect.soft(homePage.aivlogo).toBeVisible({ timeout: 60000 })
        await homePage.manageButton.click()

        /* Manage Page */
        console.log('[INFO] Manage Page')
        await managePage.testResultButton.click()

    })

    test('Search Test Results By Search Term', async ({ testResultPage }) => {

        let isTrue = false

        console.log('[INFO] Test Results Page')
        await testResultPage.searchBar.fill('veritas')

        /* Assert Search Test Results By Search Term */
        const resultsTitle = await testResultPage.testResultRow.nth(0).textContent()

        if (resultsTitle.includes('veritas'))
            isTrue = true

        await expect.soft(isTrue).toBeTruthy()
    })

    test('Filter By Model Type', async ({ testResultPage, page }) => {

        let isTrue = false

        console.log('[INFO] Test Results Page')
        await testResultPage.modelTypeFilterDropDownList.click()
        await page.getByRole('listitem').filter({ hasText: /^Regression$/ }).click()
        const resultsTitle = await testResultPage.testResultRow.nth(0).textContent()

        if (resultsTitle.includes('regression'))
            isTrue = true

        /* Assert Filter By Model Type */
        await expect.soft(isTrue).toBeTruthy()

    })

    test('Filter By Algorithm', async ({ testResultPage, page }) => {

        let isTrue = false

        console.log('[INFO] Test Results Page')
        await testResultPage.modelTypeFilterDropDownList.click()
        await page.getByRole('listitem').filter({ hasText: /^Partial Dependence Plot$/ }).click()
        const resultsTitle = await testResultPage.testResultRow.nth(0).textContent()

        if (resultsTitle.includes('partial'))
            isTrue = true

        /* Assert Filter By Model Type */
        await expect.soft(isTrue).toBeTruthy()

    })

    test('Test Result Details', async ({ testResultPage, page }) => {

        console.log('[INFO] Test Results Page')
        await testResultPage.modelTypeFilterDropDownList.click()
        await page.getByRole('listitem').filter({ hasText: /^Partial Dependence Plot$/ }).click()

        /* Assert Test Result Details */
        await expect.soft(page.getByText('Model File: sample_bc_credit_sklearn_linear.LogisticRegression.sav')).toBeVisible()
        await expect.soft(page.getByText('Model Type: classification')).toBeVisible()
        await expect.soft(page.getByText('Model Test Dataset: sample_bc_credit_data.sav')).toBeVisible()

    })

    test('More Test Result Details', async ({ testResultPage, page }) => {

        console.log('[INFO] Test Results Page')
        await testResultPage.modelTypeFilterDropDownList.click()
        await page.getByRole('listitem').filter({ hasText: /^Partial Dependence Plot$/ }).click()
        await page.getByRole('heading', { name: 'Result for aiverify_partial_dependence_plot' }).click()

        /* Assert More Test Result Details */
        await expect.soft(page.getByLabel('Right pane content').getByRole('heading', { name: 'Result for aiverify_partial_dependence_plot' })).toBeVisible()
        await expect.soft(page.getByLabel('Right pane content').getByText('Model File: sample_bc_credit_sklearn_linear.LogisticRegression.sav')).toBeVisible()
        await expect.soft(page.getByLabel('Right pane content').getByText('Test Dataset: sample_bc_credit_data.sav')).toBeVisible()
        await expect.soft(page.getByLabel('Right pane content').getByText('Ground Truth Dataset: sample_bc_credit_data.sav')).toBeVisible()
        await expect.soft(page.getByLabel('Right pane content').getByText('GID: aiverify.stock.partial_dependence_plot')).toBeVisible()
    })

    test('Download Algorithm Arguments', async ({ testResultPage, page }) => {

        console.log('[INFO] Test Results Page')
        await testResultPage.modelTypeFilterDropDownList.click()
        await page.getByRole('listitem').filter({ hasText: 'Digital Corruptions' }).click()
        await page.getByRole('heading', { name: 'Result for aiverify_digital_corruptions' }).nth(0).click()

        /* Assert Download Algorithm Arguments */
        const downloadPromise = page.waitForEvent('download')
        await page.getByRole('button', { name: 'DOWNLOAD' }).click()
        const download = await downloadPromise
        await download.saveAs(root_path + "/test_results/" + download.suggestedFilename());
        await setTimeout(1000)

    })

    test('Download Test Outputs', async ({ testResultPage, page }) => {

        console.log('[INFO] Test Results Page')
        await testResultPage.modelTypeFilterDropDownList.click()
        await page.getByRole('listitem').filter({ hasText: 'Digital Corruptions' }).click()
        await page.getByRole('heading', { name: 'Result for aiverify_digital_corruptions' }).nth(0).click()

        /* Assert Download Test Outputs */
        const downloadPromise = page.waitForEvent('download')
        await page.getByRole('button', { name: 'Output & Artifacts' }).click()
        await page.getByRole('button', { name: 'DOWNLOAD' }).nth(0).click()
        const download = await downloadPromise

        await download.saveAs(root_path + "/test_results/" + download.suggestedFilename());
        await setTimeout(1000)

    })

    test('Download Test Artifacts', async ({ testResultPage, page }) => {

        console.log('[INFO] Test Results Page')
        await testResultPage.modelTypeFilterDropDownList.click()
        await page.getByRole('listitem').filter({ hasText: 'Digital Corruptions' }).click()
        await page.getByRole('heading', { name: 'Result for aiverify_digital_corruptions' }).nth(0).click()

        /* Assert Download Test Outputs */
        const downloadPromise = page.waitForEvent('download')
        await page.getByRole('button', { name: 'Output & Artifacts' }).click()
        await page.getByRole('button', { name: 'DOWNLOAD' }).nth(1).click()
        const download = await downloadPromise

        await download.saveAs(root_path + "/test_results/" + download.suggestedFilename());
        await setTimeout(1000)

    })

    test('Delete Test Results', async ({ testResultPage, page }) => {

        console.log('[INFO] Test Results Page')
        await testResultPage.modelTypeFilterDropDownList.click()
        await page.getByRole('listitem').filter({ hasText: 'Digital Corruptions' }).click()
        await page.getByRole('heading', { name: 'Result for aiverify_digital_corruptions' }).nth(1).click()

        console.log('[INFO] Delete Test Results')
        await testResultPage.deleteTestResult.click()
        await testResultPage.deleteTestResultDialogBoxButton.click()
        await expect.soft(page.getByText('Result deleted successfully!')).toBeVisible()
        await testResultPage.closeDeleteTestResultDialogBoxButton.click()
        await expect.soft(page.getByRole('heading', { name: 'Result for aiverify_digital_corruptions' }).nth(1)).not.toBeVisible()
    })

    test('Run New Test Button', async ({ testResultPage, page }) => {

        console.log('[INFO] Test Results Page')
        await testResultPage.runNewTestButton.click()

        /* Assert Run New Test Button */
        console.log('[INFO] Run New Test Page')
        await expect.soft(page).toHaveURL(new RegExp(url + ":" + port_number + "/results/run"))
    })

    test('Upload Test Results Button', async ({ testResultPage, page }) => {

        console.log('[INFO] Test Results Page')
        await testResultPage.uploadTestResultsButton.click()

        /* Assert Run New Test Button */
        console.log('Upload Test Results Page')
        await expect.soft(page).toHaveURL(new RegExp(url + ":" + port_number + "/results/upload/zipfile"))

    })

})

test.describe('Run New Tests', () => {

    test.beforeEach(async ({ homePage, managePage, testResultPage }) => {

        /* AI Verify Homepage */
        console.log('[INFO] Navigate to AI Verify Home Page')
        await homePage.goto(url + ":" + port_number)
        await expect.soft(homePage.aivlogo).toBeVisible({ timeout: 60000 })
        await homePage.manageButton.click()

        /* Manage Page */
        console.log('[INFO] Manage Page')
        await managePage.testResultButton.click()

        /* Run New Test Page */
        console.log('[INFO] Run New Test Page')
        await testResultPage.runNewTestButton.click()

    })

    test('Complete All Required Fields', async ({ testResultPage, page }) => {

        /* Input Partial Dependence Plot Parameters */
        console.log('[INFO] Input Partial Dependence Plot Test Parameters')
        const pdpParameters = {
            algorithm: "aiverify_partial_dependence_plot",
            model: "sample_bc_credit_sklearn_linear.LogisticRegression.sav",
            dataset: "sample_bc_credit_data.sav",
            groundTruthDataset: "sample_bc_credit_data.sav",
            groundTruthColumn: "default",
            algorithmDropDownListOption: "aiverify.stock.partial_dependence_plot",
            testrunValidationSuccessText: "partial dependence plotSUCCESS"
        }

        await testResultPage.runAlgorithms(pdpParameters)
        await page.getByLabel('Algorithm:').selectOption(pdpParameters.algorithmDropDownListOption)
        await expect.soft(page.getByText(pdpParameters.testrunValidationSuccessText).nth(0)).toBeVisible({ timeout: 600000 })

        /* Delete Test Results */
        console.log('[INFO] Delete Test Results')
        await testResultPage.deleteTestRunButton.click()
        await testResultPage.confirmDeleteTestRunButton.click()
        await testResultPage.confirmDeleteTestRunOkayButton.click()
    })

    test('Incompleted Fields', async ({ testResultPage }) => {

        console.log('[INFO] Input Partial Dependence Plot Test Parameters')
        const pdpParameters = {
            algorithm: "aiverify_partial_dependence_plot",
            model: "sample_bc_credit_sklearn_linear.LogisticRegression.sav",
            dataset: "sample_bc_credit_data.sav",
        }

        await testResultPage.algorithmDropDownList.click()
        await testResultPage.page.getByRole('option', { name: pdpParameters.algorithm, exact: true }).click()
        await testResultPage.modelDropDownList.click()
        await testResultPage.page.getByRole('option', { name: pdpParameters.model, exact: true }).click()
        await testResultPage.datasetDropDownList.click()
        await testResultPage.page.getByRole('option', { name: pdpParameters.dataset, exact: true }).click()
        await testResultPage.groundTruthDatasetDropDownList.click()

        /* Assert Incompleted Fields */
        await expect.soft(testResultPage.runTestButton).not.toBeEnabled()
    })

    test('Cancel Button', async ({ testResultPage, page }) => {

        await testResultPage.cancelButton.click()

        /* Assert Cancel Button */
        console.log('[INFO] Test Results Page')
        await expect.soft(page).toHaveURL(url + ":" + port_number + "/results")

    })

    test('Back To Results Button', async ({ testResultPage, page }) => {

        await testResultPage.backToResultsButton.click()

        /* Assert Back To Results Button */
        console.log('[INFO] Test Results Page')
        await expect.soft(page).toHaveURL(url + ":" + port_number + "/results")

    })

    test('View Running Test Button', async ({ testResultPage, page }) => {

        await testResultPage.viewRunningTestButton.click()

        /* Assert View Running Test Button' */
        console.log('[INFO] View Running Test Page')
        await expect.soft(page).toHaveURL(url + ":" + port_number + "/results/run/view_tests")

    })

})

test.describe('View Running Tests', () => {

    test.beforeEach(async ({ homePage, managePage, testResultPage }) => {

        /* AI Verify Homepage */
        console.log('[INFO] Navigate to AI Verify Home Page')
        await homePage.goto(url + ":" + port_number)
        await expect.soft(homePage.aivlogo).toBeVisible({ timeout: 60000 })
        await homePage.manageButton.click()

        /* Manage Page */
        console.log('[INFO] Manage Page')
        await managePage.testResultButton.click()

        /* Run New Test Page */
        console.log('[INFO] Run New Test Page')
        await testResultPage.runNewTestButton.click()

    })

    test('Refreshing Running Test List - 1m', async ({ testResultPage, page }) => {

        /* Input Partial Dependence Plot Parameters */
        console.log('[INFO] Input Partial Dependence Plot Test Parameters')
        const pdpParameters = {
            algorithm: "aiverify_partial_dependence_plot",
            model: "sample_bc_credit_sklearn_linear.LogisticRegression.sav",
            dataset: "sample_bc_credit_data.sav",
            groundTruthDataset: "sample_bc_credit_data.sav",
            groundTruthColumn: "default",
            algorithmDropDownListOption: "aiverify.stock.partial_dependence_plot",
            testrunValidationSuccessText: "partial dependence plotSUCCESS"
        }

        await testResultPage.runAlgorithms(pdpParameters)
        await page.getByLabel('Algorithm:').selectOption(pdpParameters.algorithmDropDownListOption)
        await testResultPage.autoRefreshTimingDropDownList.selectOption('60')
        await expect.soft(page.getByText(pdpParameters.testrunValidationSuccessText).nth(0)).toBeVisible({ timeout: 600000 })

        /* Delete Test Results */
        console.log('[INFO] Delete Test Results')
        await testResultPage.deleteTestRunButton.click()
        await testResultPage.confirmDeleteTestRunButton.click()
        await testResultPage.confirmDeleteTestRunOkayButton.click()

    })

    test('Refresh Button', async ({ testResultPage, page }) => {

        /* Input Partial Dependence Plot Parameters */
        console.log('[INFO] Input Partial Dependence Plot Test Parameters')
        const pdpParameters = {
            algorithm: "aiverify_partial_dependence_plot",
            model: "sample_bc_credit_sklearn_linear.LogisticRegression.sav",
            dataset: "sample_bc_credit_data.sav",
            groundTruthDataset: "sample_bc_credit_data.sav",
            groundTruthColumn: "default",
            algorithmDropDownListOption: "aiverify.stock.partial_dependence_plot",
            testrunValidationSuccessText: "partial dependence plotSUCCESS"
        }

        await testResultPage.runAlgorithms(pdpParameters)
        await setTimeout(1000)
        await testResultPage.refreshButton.click()
        await page.getByLabel('Algorithm:').selectOption(pdpParameters.algorithmDropDownListOption)
        await expect.soft(page.getByText(pdpParameters.testrunValidationSuccessText).nth(0)).toBeVisible({ timeout: 600000 })

        /* Delete Test Results */
        console.log('[INFO] Delete Test Results')
        await testResultPage.deleteTestRunButton.click()
        await testResultPage.confirmDeleteTestRunButton.click()
        await testResultPage.confirmDeleteTestRunOkayButton.click()

    })

    test('Filter By Algorithms', async ({ testResultPage, page }) => {

        /* Input Partial Dependence Plot Parameters */
        console.log('[INFO] Input Partial Dependence Plot Test Parameters')
        const pdpParameters = {
            algorithm: "aiverify_partial_dependence_plot",
            model: "sample_bc_credit_sklearn_linear.LogisticRegression.sav",
            dataset: "sample_bc_credit_data.sav",
            groundTruthDataset: "sample_bc_credit_data.sav",
            groundTruthColumn: "default",
            algorithmDropDownListOption: "aiverify.stock.partial_dependence_plot",
            testrunValidationSuccessText: "partial dependence plotSUCCESS"
        }

        await testResultPage.runAlgorithms(pdpParameters)
        await page.getByLabel('Algorithm:').selectOption(pdpParameters.algorithmDropDownListOption)
        await expect.soft(page.getByText(pdpParameters.testrunValidationSuccessText).nth(0)).toBeVisible({ timeout: 600000 })

        /* Delete Test Results */
        console.log('[INFO] Delete Test Results')
        await testResultPage.deleteTestRunButton.click()
        await testResultPage.confirmDeleteTestRunButton.click()
        await testResultPage.confirmDeleteTestRunOkayButton.click()

    })

    test('Filter By Pending Status', async ({ testResultPage, page }) => {

        /* Input Partial Dependence Plot Parameters */
        console.log('[INFO] Input Partial Dependence Plot Test Parameters')
        const pdpParameters = {
            algorithm: "aiverify_partial_dependence_plot",
            model: "sample_bc_credit_sklearn_linear.LogisticRegression.sav",
            dataset: "sample_bc_credit_data.sav",
            groundTruthDataset: "sample_bc_credit_data.sav",
            groundTruthColumn: "default",
            algorithmDropDownListOption: "aiverify.stock.partial_dependence_plot",
            testrunValidationPendingText: "partial dependence plotPENDING",
            testrunValidationSuccessText: "partial dependence plotSUCCESS"
        }

        await testResultPage.runAlgorithms(pdpParameters)
        await page.getByLabel('Algorithm:').selectOption(pdpParameters.algorithmDropDownListOption)
        await testResultPage.pendingFilterButton.click()
        await expect.soft(page.getByText(pdpParameters.testrunValidationPendingText).nth(0)).toBeVisible()
        await testResultPage.successFilterButton.click()
        await expect.soft(page.getByText(pdpParameters.testrunValidationSuccessText).nth(0)).toBeVisible({ timeout: 600000 })

        /* Delete Test Results */
        console.log('[INFO] Delete Test Results')
        await testResultPage.deleteTestRunButton.click()
        await testResultPage.confirmDeleteTestRunButton.click()
        await testResultPage.confirmDeleteTestRunOkayButton.click()

    })

    test('Filter By Running Status', async ({ testResultPage, page }) => {

        /* Input Robustness ToolBox Image Parameters */
        console.log('[INFO] Input Robustness ToolBox Image Test Parameters')
        const robustnessImageParameters = {
            algorithm: "aiverify_robustness_toolbox",
            model: "mc_image_fashion",
            dataset: "raw_fashion_image_10",
            groundTruthDataset: "pickle_pandas_fashion_mnist_annotated_labels_10.sav",
            groundTruthColumn: "label",
            annotatedGroundTruthPath: "pickle_pandas_fashion_mnist_annotated_labels_10.sav",
            nameOfImageColumn: "file_name",
            algorithmDropDownListOption: "aiverify.stock.robustness_toolbox",
            testrunValidationRunningText: "robustness toolboxRUNNING",
            testrunValidationSuccessText: "robustness toolboxSUCCESS"
        }
        await testResultPage.runAlgorithms(robustnessImageParameters)
        await page.getByLabel('Algorithm:').selectOption(robustnessImageParameters.algorithmDropDownListOption)
        await testResultPage.runningFilterButton.click()
        await testResultPage.refreshButton.click()
        await expect.soft(page.getByText(robustnessImageParameters.testrunValidationRunningText).nth(0)).toBeVisible({ timeout: 600000 })
        await testResultPage.successFilterButton.click()
        await expect.soft(page.getByText(robustnessImageParameters.testrunValidationSuccessText).nth(0)).toBeVisible({ timeout: 600000 })

        /* Delete Test Results */
        console.log('[INFO] Delete Test Results')
        await testResultPage.deleteTestRunButton.first().click()
        await testResultPage.confirmDeleteTestRunButton.click()
        await testResultPage.confirmDeleteTestRunOkayButton.click()

    })

    test('Filter By Success Status', async ({ testResultPage, page }) => {

        /* Input Partial Dependence Plot Parameters */
        console.log('[INFO] Input Partial Dependence Plot Test Parameters')
        const pdpParameters = {
            algorithm: "aiverify_partial_dependence_plot",
            model: "sample_bc_credit_sklearn_linear.LogisticRegression.sav",
            dataset: "sample_bc_credit_data.sav",
            groundTruthDataset: "sample_bc_credit_data.sav",
            groundTruthColumn: "default",
            algorithmDropDownListOption: "aiverify.stock.partial_dependence_plot",
            testrunValidationSuccessText: "partial dependence plotSUCCESS"
        }

        await testResultPage.runAlgorithms(pdpParameters)
        await page.getByLabel('Algorithm:').selectOption(pdpParameters.algorithmDropDownListOption)
        await testResultPage.successFilterButton.click()
        await expect.soft(page.getByText(pdpParameters.testrunValidationSuccessText).nth(0)).toBeVisible({ timeout: 600000 })

        /* Delete Test Results */
        console.log('[INFO] Delete Test Results')
        await testResultPage.deleteTestRunButton.click()
        await testResultPage.confirmDeleteTestRunButton.click()
        await testResultPage.confirmDeleteTestRunOkayButton.click()

    })

    test('Filter By Error Status', async ({ testResultPage, page }) => {

        /* Input Partial Dependence Plot Parameters */
        console.log('[INFO] Input Partial Dependence Plot Test Parameters')
        const pdpParameters = {
            algorithm: "aiverify_partial_dependence_plot",
            model: "sample_bc_credit_sklearn_linear.LogisticRegression.sav",
            dataset: "sample_bc_pipeline_credit_data.sav",
            groundTruthDataset: "sample_bc_pipeline_credit_ytest_data.sav",
            groundTruthColumn: "default",
            algorithmDropDownListOption: "aiverify.stock.partial_dependence_plot",
            testrunValidationErrorText: "partial dependence plotERROR"
        }

        await testResultPage.runAlgorithms(pdpParameters)
        await page.getByLabel('Algorithm:').selectOption(pdpParameters.algorithmDropDownListOption)
        await testResultPage.errorFilterButton.click()
        await expect.soft(page.getByText(pdpParameters.testrunValidationErrorText).nth(0)).toBeVisible({ timeout: 600000 })

        /* Delete Test Results */
        console.log('[INFO] Delete Test Results')
        await testResultPage.deleteTestRunButton.click()
        await testResultPage.confirmDeleteTestRunButton.click()
        await testResultPage.confirmDeleteTestRunOkayButton.click()

    })

    test('Filter By Cancelled Status', async ({ testResultPage, page }) => {

        /* Input Robustness ToolBox Image Parameters */
        console.log('[INFO] Input Robustness ToolBox Image Test Parameters')
        const robustnessImageParameters = {
            algorithm: "aiverify_robustness_toolbox",
            model: "mc_image_fashion",
            dataset: "raw_fashion_image_10",
            groundTruthDataset: "pickle_pandas_fashion_mnist_annotated_labels_10.sav",
            groundTruthColumn: "label",
            annotatedGroundTruthPath: "pickle_pandas_fashion_mnist_annotated_labels_10.sav",
            nameOfImageColumn: "file_name",
            algorithmDropDownListOption: "aiverify.stock.robustness_toolbox",
            testrunValidationCancelledText: "robustness toolboxCANCELLED",
            testrunValidationSuccessText: "robustness toolboxSUCCESS"
        }
        await testResultPage.runAlgorithms(robustnessImageParameters)
        await page.getByLabel('Algorithm:').selectOption(robustnessImageParameters.algorithmDropDownListOption)
        await testResultPage.cancelTestRunButton.first().click()
        await testResultPage.cancelTestDialogBoxButton.click()
        await testResultPage.okTestDialogButton.click()
        await testResultPage.cancelledFilterButton.click()
        await expect.soft(page.getByText(robustnessImageParameters.testrunValidationCancelledText).nth(0)).toBeVisible({ timeout: 600000 })

        /* Delete Test Results */
        console.log('[INFO] Delete Test Results')
        await testResultPage.deleteTestRunButton.click()
        await testResultPage.confirmDeleteTestRunButton.click()
        await testResultPage.confirmDeleteTestRunOkayButton.click()

    })

    test('Cancel Button', async ({ testResultPage, page }) => {

        /* Input Robustness ToolBox Image Parameters */
        console.log('[INFO] Input Robustness ToolBox Image Test Parameters')
        const robustnessImageParameters = {
            algorithm: "aiverify_robustness_toolbox",
            model: "mc_image_fashion",
            dataset: "raw_fashion_image_10",
            groundTruthDataset: "pickle_pandas_fashion_mnist_annotated_labels_10.sav",
            groundTruthColumn: "label",
            annotatedGroundTruthPath: "pickle_pandas_fashion_mnist_annotated_labels_10.sav",
            nameOfImageColumn: "file_name",
            algorithmDropDownListOption: "aiverify.stock.robustness_toolbox",
            testrunValidationCancelledText: "robustness toolboxCANCELLED",
            testrunValidationSuccessText: "robustness toolboxSUCCESS"
        }
        await testResultPage.runAlgorithms(robustnessImageParameters)
        await page.getByLabel('Algorithm:').selectOption(robustnessImageParameters.algorithmDropDownListOption)
        await testResultPage.cancelTestRunButton.first().click()
        await testResultPage.cancelTestDialogBoxButton.click()
        await testResultPage.okTestDialogButton.click()
        await testResultPage.cancelledFilterButton.click()
        await expect.soft(page.getByText(robustnessImageParameters.testrunValidationCancelledText).nth(0)).toBeVisible({ timeout: 600000 })

        /* Delete Test Results */
        console.log('[INFO] Delete Test Results')
        await testResultPage.deleteTestRunButton.click()
        await testResultPage.confirmDeleteTestRunButton.click()
        await testResultPage.confirmDeleteTestRunOkayButton.click()

    })

    test('Delete Button', async ({ testResultPage, page }) => {

        /* Input Robustness ToolBox Image Parameters */
        console.log('[INFO] Input Robustness ToolBox Image Test Parameters')
        const robustnessImageParameters = {
            algorithm: "aiverify_robustness_toolbox",
            model: "mc_image_fashion",
            dataset: "raw_fashion_image_10",
            groundTruthDataset: "pickle_pandas_fashion_mnist_annotated_labels_10.sav",
            groundTruthColumn: "label",
            annotatedGroundTruthPath: "pickle_pandas_fashion_mnist_annotated_labels_10.sav",
            nameOfImageColumn: "file_name",
            algorithmDropDownListOption: "aiverify.stock.robustness_toolbox",
            testrunValidationCancelledText: "robustness toolboxCANCELLED",
            testrunValidationSuccessText: "robustness toolboxSUCCESS"
        }
        await testResultPage.runAlgorithms(robustnessImageParameters)
        await page.getByLabel('Algorithm:').selectOption(robustnessImageParameters.algorithmDropDownListOption)
        await testResultPage.cancelTestRunButton.first().click()
        await testResultPage.cancelTestDialogBoxButton.click()
        await testResultPage.okTestDialogButton.click()
        await testResultPage.cancelledFilterButton.click()
        await expect.soft(page.getByText(robustnessImageParameters.testrunValidationCancelledText).nth(0)).toBeVisible({ timeout: 600000 })

        /* Delete Test Results */
        console.log('[INFO] Delete Test Results')
        await testResultPage.deleteTestRunButton.first().click()
        await testResultPage.confirmDeleteTestRunButton.click()
        await testResultPage.confirmDeleteTestRunOkayButton.click()

    })

    test('Next Button', async ({ testResultPage, page }) => {

        console.log('[INFO] View Running Test Page')
        await testResultPage.viewRunningTestButton.click()
        await expect.soft(testResultPage.previousButton).not.toBeEnabled()
        await testResultPage.nextButton.click()

        /* Assert Next Button */
        await expect.soft(testResultPage.previousButton).toBeEnabled()
        await expect.soft(page.getByText('Page 2')).toBeVisible()

    })

    test('Previous Button', async ({ testResultPage, page }) => {

        console.log('[INFO] View Running Test Page')
        await testResultPage.viewRunningTestButton.click()
        await testResultPage.nextButton.click()
        await expect.soft(testResultPage.previousButton).toBeEnabled()
        await testResultPage.previousButton.click()

        /* Assert Previous Button */
        await expect.soft(testResultPage.previousButton).not.toBeEnabled()
        await expect.soft(page.getByText('Page 1')).toBeVisible()

    })

    test('Run New Test Button', async ({ testResultPage, page }) => {

        console.log('[INFO] View Running Test Page')
        await testResultPage.viewRunningTestButton.click()
        await testResultPage.runNewTestButton.click()

        /* Assert Run New Test Button */
        await expect.soft(page).toHaveURL(new RegExp(url + ":" + port_number + "/results/run"))

    })

    test('View Test Results Button', async ({ testResultPage, page }) => {

        console.log('[INFO] View Running Test Page')
        await testResultPage.viewRunningTestButton.click()
        await testResultPage.viewTestResultsButton.click()

        /* Assert Run New Test Button */
        await expect.soft(page).toHaveURL(new RegExp(url + ":" + port_number + "/results"))

    })

})

test.describe('Upload Test Results', () => {

    test.beforeEach(async ({ homePage, managePage, testResultPage }) => {

        /* AI Verify Homepage */
        console.log('[INFO] Navigate to AI Verify Home Page')
        await homePage.goto(url + ":" + port_number)
        await expect.soft(homePage.aivlogo).toBeVisible({ timeout: 60000 })
        await homePage.manageButton.click()

        /* Manage Page */
        console.log('[INFO] Manage Page')
        await managePage.testResultButton.click()

        /* Upload Test Result Page */
        console.log('[INFO] Upload Test Result Page')
        await testResultPage.uploadTestResultsButton.click()

    })

    test('Upload Test Results Zip File - Drag And Drop', async ({ testResultPage, page }) => {

        let filePathStringArray = [ root_path + "/test_results/output-image-standalone.zip" ]

        console.log('[INFO] Upload Test Results Zip File')
        await testResultPage.dragAndDropFile(filePathStringArray)

        /* Assert Upload Test Results Zip File - Drag And Drop */
        await expect.soft(page.getByText('output-image-standalone.zip')).toBeVisible()
        await testResultPage.uploadButton.click()
        await expect.soft(page.getByText('Uploaded')).toBeVisible({ timeout: 4000 })
        await expect.soft(testResultPage.uploadMoreButton).toBeVisible({ timeout: 4000 })
        
    })

    test('Upload Test Results Zip File - Click To Browse', async ({ testResultPage, page }) => {

        let filePathStringArray = [ root_path + "/test_results/output-image-standalone.zip" ]

        console.log('[INFO] Upload Test Results Zip File')
        await testResultPage.uploadFile(filePathStringArray)

        /* Assert Upload Test Results Zip File - Click To Browse */
        await expect.soft(page.getByText('output-image-standalone.zip')).toBeVisible()
        await testResultPage.uploadButton.click()
        await expect.soft(page.getByText('Uploaded')).toBeVisible({ timeout: 4000 })
        await expect.soft(testResultPage.uploadMoreButton).toBeVisible({ timeout: 4000 })
        
    })

    test('Upload Invalid Test Results Zip File', async ({ testResultPage, page }) => {

        let filePathStringArray = [ root_path + "/test_results/output.zip"]

        console.log('[INFO] Upload Invalid Test Results Zip File')
        await testResultPage.uploadFile(filePathStringArray)

        /* Assert Upload Invalid Test Results Zip File */
        await testResultPage.uploadButton.click()
        await expect.soft(page.getByText('Error', { exact: true })).toBeVisible({ timeout: 2000 })
        await expect.soft(testResultPage.viewErrorsButton).toBeVisible({ timeout: 2000 })

    })

    test('Upload Non Zip File', async ({ testResultPage, page }) => {

        let filePathStringArray = [ root_path + "/test_results/Result for aiverify_digital_corruptions_algorithmArgs.json" ]

        console.log('[INFO] Upload Non Zip File')
        await testResultPage.uploadFile(filePathStringArray)

        /* Assert Upload Non Zip File */
        await testResultPage.uploadButton.click()
        await expect.soft(page.getByText('Error', { exact: true })).toBeVisible({ timeout: 2000 })
        await expect.soft(testResultPage.viewErrorsButton).toBeVisible({ timeout: 2000 })
        await testResultPage.viewErrorsButton.click()
        await expect.soft(page.getByText('Only zip files are allowed')).toBeVisible({ timeout: 2000 })

    })

    test('Upload More Than One Test Results Zip File', async ({ testResultPage, page }) => {

        let filePathStringArray = [ 
            root_path + "/test_results/output-image-standalone.zip",
            root_path + "/test_results/output-robustness.zip"
        ]

        console.log('[INFO] Upload Test Results Zip File')
        await testResultPage.uploadFile(filePathStringArray)

        /* Assert Upload More Than One Test Results Zip File' */
        await expect.soft(page.getByText('output-image-standalone.zip')).toBeVisible()
        await expect.soft(page.getByText('output-robustness.zip')).toBeVisible()
        await testResultPage.uploadButton.click()
        await expect.soft(page.getByText('Uploaded').first()).toBeVisible({ timeout: 4000 })
        await expect.soft(page.getByText('Uploaded').nth(1)).toBeVisible({ timeout: 4000 })
        await expect.soft(testResultPage.uploadMoreButton).toBeVisible({ timeout: 4000 })

    })

    test('View Errors Button', async ({ testResultPage, page }) => {

        let filePathStringArray = [ root_path + "/test_results/output.zip"]

        console.log('[INFO] Upload Invalid Test Results Zip File')
        await testResultPage.uploadFile(filePathStringArray)
        await testResultPage.uploadButton.click()

        /* Assert View Errors Button */
        await testResultPage.viewErrorsButton.click()
        await expect.soft(page.getByText('Internal Server Error')).toBeVisible()

    })

    test('Upload More Button', async ({ testResultPage, page }) => {

        let filePathStringArray = [ root_path + "/test_results/output-image-standalone.zip" ]

        console.log('[INFO] Upload Test Results Zip File')
        await testResultPage.uploadFile(filePathStringArray)
        await expect.soft(page.getByText('output-image-standalone.zip')).toBeVisible()
        await testResultPage.uploadButton.click()
        await expect.soft(page.getByText('Uploaded')).toBeVisible({ timeout: 3000 })
        await expect.soft(testResultPage.uploadMoreButton).toBeVisible({ timeout: 2000 })
        await testResultPage.uploadMoreButton.click()

        /* Assert Upload More Button */
        await expect.soft(page.getByText('output-image-standalone.zip')).not.toBeVisible()
        await testResultPage.uploadFile(filePathStringArray)
        await testResultPage.uploadButton.click()
        await expect.soft(page.getByText('Uploaded')).toBeVisible({ timeout: 3000 })

    })

    test('Remove File To Be Uploaded', async ({ testResultPage, page }) => {

        let filePathStringArray = [ root_path + "/test_results/output-image-standalone.zip" ]

        console.log('[INFO] Upload Test Results Zip File')
        await testResultPage.uploadFile(filePathStringArray)
        await testResultPage.removeUploadFileButton.click()

        /* Assert Remove File To Be Uploaded */
        await expect.soft(page.getByText('output-image-standalone.zip')).not.toBeVisible()
        
    })

    test('Results Editor Button', async ({ testResultPage, page }) => {

        console.log('[INFO] Results Editor Page')
        await testResultPage.resultsEditorButton.click()

        /* Assert Results Editor Button */
        await expect.soft(page).toHaveURL(new RegExp(url + ":" + port_number + "/results/upload/manual"))

    })

})

test.describe('Upload Test Results Editor', () => {

    test.beforeEach(async ({ homePage, managePage, testResultPage }) => {

        /* AI Verify Homepage */
        console.log('[INFO] Navigate to AI Verify Home Page')
        await homePage.goto(url + ":" + port_number)
        await expect.soft(homePage.aivlogo).toBeVisible({ timeout: 60000 })
        await homePage.manageButton.click()

        /* Manage Page */
        console.log('[INFO] Manage Page')
        await managePage.testResultButton.click()

        /* Upload Test Result Page */
        console.log('[INFO] Upload Test Result Page')
        await testResultPage.uploadTestResultsButton.click()

        /* Upload Test Results Editor */
        console.log('[INFO] Upload Test Results Editor')
        await testResultPage.resultsEditorButton.click()

    })

    test('Add Test Results With Valid JSON Schema Into Editor No Artifacts', async ({ testResultPage, page }) => {

        let jsonFile = fs.readFileSync(root_path + "/test_results/output/results.json")
        let parseJSONData = JSON.parse(jsonFile)

        await testResultPage.resultEditor.fill(JSON.stringify(parseJSONData))
        await testResultPage.uploadButton.click()

        /* Assert Add Test Results With Valid JSON Schema Into Editor No Artifacts */
        await expect.soft(page.getByText('Your test result has been uploaded successfully.')).toBeVisible()

    })

    test('Add Test Results With Valid JSON Schema Into Editor With Valid Artifacts - Drag And Drop', async ({ testResultPage, page }) => {

        let filePathStringArray = [
            root_path + "/test_results/output/images/veritas_classDistributionPieChart.png",
        ]

        let jsonFile = fs.readFileSync(root_path + "/test_results/output/results.json")
        let parseJSONData = JSON.parse(jsonFile)

        await testResultPage.resultEditor.fill(JSON.stringify(parseJSONData))
        await testResultPage.dragAndDropFileTestArtifacts(filePathStringArray)

        await testResultPage.uploadButton.click()

        /* Assert Add Test Results With Valid JSON Schema Into Editor Valid Artifacts - Click To Browse */
        await expect.soft(page.getByText('Your test result has been uploaded successfully.')).toBeVisible()

    })

    test('Add Test Results With Valid JSON Schema Into Editor With Valid Artifacts - Click To Browse', async ({ testResultPage, page }) => {

        let filePathStringArray = [
            root_path + "/test_results/output/images/veritas_classDistributionPieChart.png",
            root_path + "/test_results/output/images/veritas_featureDistributionPieChartMap_isfemale.png",
            root_path + "/test_results/output/images/veritas_featureDistributionPieChartMap_isforeign.png",
            root_path + "/test_results/output/images/veritas_weightedConfusionHeatMapChart.png"
        ]

        let jsonFile = fs.readFileSync(root_path + "/test_results/output/results.json")
        let parseJSONData = JSON.parse(jsonFile)

        await testResultPage.resultEditor.fill(JSON.stringify(parseJSONData))
        await testResultPage.uploadFile(filePathStringArray)

        await testResultPage.uploadButton.click()

        /* Assert Add Test Results With Valid JSON Schema Into Editor Valid Artifacts - Click To Browse */
        await expect.soft(page.getByText('Your test result has been uploaded successfully.')).toBeVisible()

    })

    test('Add Test Results With Invalid JSON Schema Into Editor With Valid Artifacts', async ({ testResultPage, page }) => {

        let filePathStringArray = [
            root_path + "/test_results/output/images/veritas_classDistributionPieChart.png",
            root_path + "/test_results/output/images/veritas_featureDistributionPieChartMap_isfemale.png",
            root_path + "/test_results/output/images/veritas_featureDistributionPieChartMap_isforeign.png",
            root_path + "/test_results/output/images/veritas_weightedConfusionHeatMapChart.png"
        ]

        await testResultPage.resultEditor.fill('{[]}')
        await testResultPage.uploadFile(filePathStringArray)

        /* Add Test Results With Invalid JSON Schema Into Editor With Valid Artifacts */
        await expect.soft(testResultPage.errorLineButton).toBeVisible()
        await testResultPage.errorLineButton.click()
        await expect.soft(page.getByText('Parse error on line 1')).toBeVisible()
        await expect.soft(testResultPage.uploadButton).not.toBeEnabled()

    })

    test.skip('Add Test Results With Invalid JSON Schema Into Editor With Invalid Artifacts', async ({ testResultPage }) => {

        let filePathStringArray = [
            root_path + "/test_results/output/images/veritas_classDistributionPieChart.png",
            root_path + "/test_results/output/images/veritas_featureDistributionPieChartMap_isfemale.png",
            root_path + "/test_results/output/images/veritas_featureDistributionPieChartMap_isforeign.png",
            root_path + "/test_results/output/images/veritas_weightedConfusionHeatMapChart.png"
        ]

        let jsonFile = fs.readFileSync(root_path + "/test_results/output/results.json")
        let parseJSONData = JSON.parse(jsonFile)

        await testResultPage.resultEditor.fill(JSON.stringify(parseJSONData))
        await testResultPage.uploadFile(filePathStringArray)

        await testResultPage.uploadButton.click()

        /* Add Test Results With Invalid JSON Schema Into Editor With Valid Artifacts */
        await expect.soft(testResultPage.uploadButton).not.toBeEnabled()

    })

    test('Add Test Results With Valid JSON Schema Into Editor With More Than One Artifact', async ({ testResultPage, page }) => {

        let filePathStringArray = [
            root_path + "/test_results/output/images/veritas_classDistributionPieChart.png",
            root_path + "/test_results/output/images/veritas_featureDistributionPieChartMap_isfemale.png",
            root_path + "/test_results/output/images/veritas_featureDistributionPieChartMap_isforeign.png",
            root_path + "/test_results/output/images/veritas_weightedConfusionHeatMapChart.png"
        ]

        let jsonFile = fs.readFileSync(root_path + "/test_results/output/results.json")
        let parseJSONData = JSON.parse(jsonFile)

        await testResultPage.resultEditor.fill(JSON.stringify(parseJSONData))
        await testResultPage.uploadFile(filePathStringArray)

        await testResultPage.uploadButton.click()

        /* Assert Add Test Results With Valid JSON Schema Into Editor With More Than One Artifact */
        await expect.soft(page.getByText('Your test result has been uploaded successfully.')).toBeVisible()

    })

    test('Remove Test Artifact To Be Uploaded', async ({ testResultPage, page }) => {

        let filePathStringArray = [ root_path + "/test_results/output/images/veritas_classDistributionPieChart.png" ]

        await testResultPage.uploadFile(filePathStringArray)
        await testResultPage.removeUploadFileButton.click()

        /* Assert Remove Test Artifact To Be Uploaded */
        await expect.soft(page.getByText('veritas_classDistributionPieChart.png')).not.toBeVisible()

    })

    test('Upload Button Enabled', async ({ testResultPage }) => {

        let filePathStringArray = [
            root_path + "/test_results/output/images/veritas_classDistributionPieChart.png",
            root_path + "/test_results/output/images/veritas_featureDistributionPieChartMap_isfemale.png",
            root_path + "/test_results/output/images/veritas_featureDistributionPieChartMap_isforeign.png",
            root_path + "/test_results/output/images/veritas_weightedConfusionHeatMapChart.png"
        ]

        let jsonFile = fs.readFileSync(root_path + "/test_results/output/results.json")
        let parseJSONData = JSON.parse(jsonFile)

        await testResultPage.resultEditor.fill(JSON.stringify(parseJSONData))
        await testResultPage.uploadFile(filePathStringArray)

        /* Assert Upload Button Enabled */
        await expect.soft(testResultPage.uploadButton).toBeEnabled()

    })

    test('Upload Button Disabled', async ({ testResultPage }) => {

        /* Assert Upload Button Disabled */
        await expect.soft(testResultPage.uploadButton).not.toBeEnabled()

    })

    test('Upload Zip File Button', async ({ testResultPage, page }) => {

        console.log('[INFO] Upload Zip File')
        await testResultPage.uploadZipFileButton.click()

        /* Assert Upload Zip File Button */
        await expect.soft(page).toHaveURL(new RegExp(url + ":" + port_number + "/results/upload/zipfile"))
    })
})