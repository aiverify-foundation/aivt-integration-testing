import { test, expect } from '../../fixtures/base-test'
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

    test('Search Test Results Bar', async ({ testResultPage }) => {

        let isTrue = false

        console.log('[INFO] Test Results Page')
        await testResultPage.searchBar.fill('veritas')

        /* Assert Search Test Results Bar */
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
        await expect.soft(page.getByText(robustnessImageParameters.testrunValidationRunningText).nth(0)).toBeVisible()
        await testResultPage.successFilterButton.click()
        await expect.soft(page.getByText(robustnessImageParameters.testrunValidationSuccessText).nth(0)).toBeVisible({ timeout: 600000 })

        /* Delete Test Results */
        console.log('[INFO] Delete Test Results')
        await testResultPage.deleteTestRunButton.click()
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

    test('Filter By Cancel Status', async ({ testResultPage, page }) => {

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
        await testResultPage.cancelTestRunButton.click()
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
        await testResultPage.cancelTestRunButton.click()
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
        await testResultPage.cancelTestRunButton.click()
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