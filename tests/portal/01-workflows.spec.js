import { test, expect } from '../../fixtures/base-test'

const url = process.env.URL
const port_number = process.env.PORT_NUMBER
const root_path = process.env.ROOT_PATH

test.describe('Workflow Test Case Setup', () => {

    test.beforeEach(async ({ homePage, managePage, modelPage, datasetPage }) => {

        console.log('[INFO] Prepare Model & Dataset')

        /* AI Verify Homepage */
        console.log('[INFO] Navigate to AI Verify Home Page')
        await homePage.goto(url + ":" + port_number)
        await expect.soft(homePage.aivlogo).toBeVisible({ timeout: 60000 })
        await homePage.manageButton.click()

        /* Manage Page */
        console.log('[INFO] Manage Page')
        await managePage.modelButton.click()

        /* Upload AI Model File */
        console.log('[INFO] Upload AI Models File')
        let filePathStringArray = [root_path + '/model/sample_bc_credit_sklearn_linear.LogisticRegression.sav']
        await modelPage.uploadModelButton.click()
        await modelPage.uploadAIModelButton.click()
        await modelPage.nextButton.click()
        await modelPage.dragAndDropFile(filePathStringArray)

        /* Upload AI Model Folder */
        console.log('[INFO] Upload AI Model Folder')
        await modelPage.uploadFileBackButton.click()

        /* Upload AI Model Pipeline */
        console.log('[INFO] Upload AI Model Pipelines')
        let folderPathStringArray = [root_path + '/pipeline/bc_image_face', root_path + '/pipeline/bc_tabular_credit', root_path + '/pipeline/mc_image_fashion',
        root_path + '/pipeline/mc_tabular_toxic', root_path + '/pipeline/regression_tabular_donation', root_path + '/pipeline/sample_fashion_mnist_pytorch',
        root_path + '/pipeline/sample_fashion_mnist_sklearn', root_path + '/veritas_data/cs_model'
        ]
        await modelPage.uploadAIModelPipelineButton.click()
        await modelPage.nextButton.click()
        await modelPage.uploadFolder(folderPathStringArray, "pipelineInput")
        await modelPage.aivlogo.click()

        /* Homepage */
        console.log('[INFO] AI Verify Home Page')
        await homePage.manageButton.click()

        /* Manage Page */
        console.log('[INFO] Manage Page')
        await managePage.datasetButton.click()

        /* Upload Dataset File */
        console.log('[INFO] Upload Dataset Files')
        filePathStringArray = [root_path + '/data/pickle_pandas_fashion_mnist_annotated_labels_10.sav', root_path + '/data/sample_bc_credit_data.sav',
        root_path + '/data/sample_bc_pipeline_credit_data.sav', root_path + '/data/sample_bc_pipeline_credit_ytest_data.sav', root_path + '/data/sample_reg_pipeline_data.sav',
        root_path + '/data/sample_reg_pipeline_ytest_data.sav', root_path + '/veritas_data/cs_X_test.pkl', root_path + '/veritas_data/cs_y_test.pkl'
        ]
        await datasetPage.uploadDatasetButton.click()
        await datasetPage.uploadFile(filePathStringArray)
        await datasetPage.uploadDatasetFolderButton.click()

        /* Upload Dataset Folder */
        console.log('[INFO] Upload Dataset Folder')
        folderPathStringArray = [root_path + '/data/raw_fashion_image_10', root_path + '/data/small_test']
        await datasetPage.uploadFolder(folderPathStringArray)
        await datasetPage.aivlogo.click()

    })

    test('Setup Run', async () => {

        /* Setup Complete */
        console.log('[INFO] Setup Complete')
    })
})

test.describe('Algorithm Workflows', () => {

    test.beforeEach(async ({ homePage, managePage, testResultPage }) => {

        /* AI Verify Homepage */
        console.log('[INFO] Navigate to AI Verify Home Page')
        await homePage.goto(url + ":" + port_number)
        await expect.soft(homePage.aivlogo).toBeVisible({ timeout: 60000 })
        await homePage.manageButton.click()

        /* Manage Page */
        console.log('[INFO] Manage Page')
        await managePage.testResultButton.click()

        /* Test Result Page */
        console.log('[INFO] Test Result Home Page')
        await testResultPage.runNewTestButton.click()

    })

    test('ALE Test', async ({ testResultPage }) => {

        /* Input ALE Test Parameters */
        console.log('[INFO] Input ALE Test Parameters')
        const aleParameters = {
            algorithm: "aiverify_accumulated_local_effect",
            model: "sample_bc_credit_sklearn_linear.LogisticRegression.sav",
            dataset: "sample_bc_credit_data.sav",
            groundTruthDataset: "sample_bc_credit_data.sav",
            groundTruthColumn: "default",
            algorithmDropDownListOption: "aiverify.stock.accumulated_local_effect",
            testrunValidationSuccessText: "accumulated local effectSUCCESS"
        }
        await testResultPage.runAlgorithms(aleParameters)
        await page.getByLabel('Algorithm:').selectOption(aleParameters.algorithmDropDownListOption)
        await expect.soft(page.getByText(aleParameters.testrunValidationSuccessText).nth(0)).toBeVisible({ timeout: 600000 })

        /* Delete Test Results */
        console.log('[INFO] Delete Test Results')
        await testResultPage.deleteTestRunButton.click()
        await testResultPage.confirmDeleteTestRunButton.click()
        await testResultPage.confirmDeleteTestRunOkayButton.click()

    })

    test('FMTC Test', async ({ testResultPage }) => {

        /* Input FMTC Test Parameters */
        console.log('[INFO] Input FMTC Test Parameters')
        const fmtcParameters = {
            algorithm: "fairness_metrics_toolbox_for_classification",
            model: "sample_bc_credit_sklearn_linear.LogisticRegression.sav",
            dataset: "sample_bc_credit_data.sav",
            groundTruthDataset: "sample_bc_credit_data.sav",
            groundTruthColumn: "default",
            sensitiveFeature: "gender",
            annotatedLabelsPath: "sample_bc_credit_data.sav",
            nameOfImageColumn: "NA",
            algorithmDropDownListOption: "aiverify.stock.fairness_metrics_toolbox_for_classification",
            testrunValidationSuccessText: "fairness metrics toolbox for classificationSUCCESS"
        }
        await testResultPage.runAlgorithms(fmtcParameters)
        await page.getByLabel('Algorithm:').selectOption(fmtcParameters.algorithmDropDownListOption)
        await expect.soft(page.getByText(fmtcParameters.testrunValidationSuccessText).nth(0)).toBeVisible({ timeout: 600000 })

        /* Delete Test Results */
        console.log('[INFO] Delete Test Results')
        await testResultPage.deleteTestRunButton.click()
        await testResultPage.confirmDeleteTestRunButton.click()
        await testResultPage.confirmDeleteTestRunOkayButton.click()

    })

    test('FMTR Test', async ({ testResultPage }) => {

        /* Input FMTR Test Parameters */
        console.log('[INFO] Input FMTR Test Parameters')
        const fmtrParameters = {
            algorithm: "fairness_metrics_toolbox_for_regression",
            model: "regression_tabular_donation",
            dataset: "sample_reg_pipeline_data.sav",
            groundTruthDataset: "sample_reg_pipeline_ytest_data.sav",
            groundTruthColumn: "donation",
            sensitiveFeature: "gender",
            algorithmDropDownListOption: "aiverify.stock.fairness_metrics_toolbox_for_regression",
            testrunValidationSuccessText: "fairness metrics toolbox for regressionSUCCESS"
        }
        await testResultPage.runAlgorithms(fmtrParameters)
        await page.getByLabel('Algorithm:').selectOption(fmtrParameters.algorithmDropDownListOption)
        await expect.soft(page.getByText(fmtrParameters.testrunValidationSuccessText).nth(0)).toBeVisible({ timeout: 600000 })

        /* Delete Test Results */
        console.log('[INFO] Delete Test Results')
        await testResultPage.deleteTestRunButton.click()
        await testResultPage.confirmDeleteTestRunButton.click()
        await testResultPage.confirmDeleteTestRunOkayButton.click()

    })

    test('Blur Corruption Test (SK Learn)', async ({ testResultPage }) => {

        /* Input Blur Corruption Test Parameters */
        console.log('[INFO] Input Blur Corruption Test Parameters')
        const blurCorruptionParameters = {
            algorithm: "aiverify_blur_corruptions",
            model: "sample_fashion_mnist_sklearn",
            dataset: "raw_fashion_image_10",
            groundTruthDataset: "pickle_pandas_fashion_mnist_annotated_labels_10.sav",
            groundTruthColumn: "label",
            nameOfImageColumn: "file_name",
            nameOfCorruption: "all",
            blurSigma: "1.0",
        }
        await testResultPage.imageCorruption(blurCorruptionParameters)

    })

    test('Blur Corruption Test (PyTorch)', async ({ testResultPage }) => {

        /* Input Blur Corruption Test Parameters */
        console.log('[INFO] Input Blur Corruption Test Parameters')
        const blurCorruptionParameters = {
            algorithm: "aiverify_blur_corruptions",
            model: "sample_fashion_mnist_pytorch",
            dataset: "raw_fashion_image_10",
            groundTruthDataset: "pickle_pandas_fashion_mnist_annotated_labels_10.sav",
            groundTruthColumn: "label",
            nameOfImageColumn: "file_name",
            nameOfCorruption: "all",
            blurSigma: "1.0",
        }
        await testResultPage.imageCorruption(blurCorruptionParameters)

    })

    test('General Corruption Test (SK Learn)', async ({ testResultPage }) => {

        /* Input General Corruption Test Parameters */
        console.log('[INFO] Input General Corruption Test Parameters')
        const generalCorruptionParameters = {
            algorithm: "aiverify_general_corruptions",
            model: "sample_fashion_mnist_sklearn",
            dataset: "raw_fashion_image_10",
            groundTruthDataset: "pickle_pandas_fashion_mnist_annotated_labels_10.sav",
            groundTruthColumn: "label",
            nameOfImageColumn: "file_name",
            nameOfCorruption: "all",
            noiseSigma: "1.0",
        }
        await testResultPage.imageCorruption(generalCorruptionParameters)

    })

    test('General Corruption Test (PyTorch)', async ({ testResultPage }) => {

        /* Input General Corruption Test Parameters */
        console.log('[INFO] Input General Corruption Test Parameters')
        const generalCorruptionParameters = {
            algorithm: "aiverify_general_corruptions",
            model: "sample_fashion_mnist_pytorch",
            dataset: "raw_fashion_image_10",
            groundTruthDataset: "pickle_pandas_fashion_mnist_annotated_labels_10.sav",
            groundTruthColumn: "label",
            nameOfImageColumn: "file_name",
            nameOfCorruption: "all",
            noiseSigma: "1.0",
        }
        await testResultPage.imageCorruption(generalCorruptionParameters)

    })

    test('Environment Corruption Test (SK Learn)', async ({ testResultPage }) => {

        /* Input General Corruption Test Parameters */
        console.log('[INFO] Input Environment Corruption Test Parameters')
        const environmentCorruptionParameters = {
            algorithm: "aiverify_environment_corruptions",
            model: "sample_fashion_mnist_sklearn",
            dataset: "raw_fashion_image_10",
            groundTruthDataset: "pickle_pandas_fashion_mnist_annotated_labels_10.sav",
            groundTruthColumn: "label",
            nameOfImageColumn: "file_name",
            nameOfCorruption: "all",
            snowIntensity: "1.0",
        }
        await testResultPage.imageCorruption(environmentCorruptionParameters)

    })

    test('Environment Corruption Test (PyTorch)', async ({ testResultPage }) => {

        /* Input General Corruption Test Parameters */
        console.log('[INFO] Input Environment Corruption Test Parameters')
        const environmentCorruptionParameters = {
            algorithm: "aiverify_environment_corruptions",
            model: "sample_fashion_mnist_pytorch",
            dataset: "raw_fashion_image_10",
            groundTruthDataset: "pickle_pandas_fashion_mnist_annotated_labels_10.sav",
            groundTruthColumn: "label",
            nameOfImageColumn: "file_name",
            nameOfCorruption: "all",
            snowIntensity: "1.0",
        }
        await testResultPage.imageCorruption(environmentCorruptionParameters)

    })

    test('Digital Corruption Test (SK Learn)', async ({ testResultPage }) => {

        /* Input Digital Corruption Test Parameters */
        console.log('[INFO] Input Digital Corruption Test Parameters')
        const digitalCorruptionParameters = {
            algorithm: "aiverify_digital_corruptions",
            model: "sample_fashion_mnist_sklearn",
            dataset: "raw_fashion_image_10",
            groundTruthDataset: "pickle_pandas_fashion_mnist_annotated_labels_10.sav",
            groundTruthColumn: "label",
            nameOfImageColumn: "file_name",
            nameOfCorruption: "all",
            brightnessDownFactor: "1.0",
        }
        await testResultPage.imageCorruption(digitalCorruptionParameters)

    })

    test('Digital Corruption Test (PyTorch)', async ({ testResultPage }) => {

        /* Input Digital Corruption Test Parameters */
        console.log('[INFO] Input Digital Corruption Test Parameters')
        const digitalCorruptionParameters = {
            algorithm: "aiverify_digital_corruptions",
            model: "sample_fashion_mnist_pytorch",
            dataset: "raw_fashion_image_10",
            groundTruthDataset: "pickle_pandas_fashion_mnist_annotated_labels_10.sav",
            groundTruthColumn: "label",
            nameOfImageColumn: "file_name",
            nameOfCorruption: "all",
            brightnessDownFactor: "1.0",
        }
        await testResultPage.imageCorruption(digitalCorruptionParameters)

    })

    test('Partial Dependence Plot Test', async ({ testResultPage }) => {

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

    test('Robustness ToolBox Tabular Test', async ({ testResultPage }) => {

        /* Input Robustness ToolBox Tabular Parameters */
        console.log('[INFO] Input Robustness ToolBox Tabular Test Parameters')
        const robustnessTabularParameters = {
            algorithm: "aiverify_robustness_toolbox",
            model: "bc_tabular_credit",
            dataset: "sample_bc_pipeline_credit_data.sav",
            groundTruthDataset: "sample_bc_pipeline_credit_ytest_data.sav",
            groundTruthColumn: "default",
            annotatedGroundTruthPath: "sample_bc_pipeline_credit_data.sav",
            nameOfImageColumn: "NA",
            algorithmDropDownListOption: "aiverify.stock.robustness_toolbox",
            testrunValidationSuccessText: "robustness toolboxSUCCESS"
        }
        await testResultPage.runAlgorithms(robustnessTabularParameters)
        await page.getByLabel('Algorithm:').selectOption(robustnessTabularParameters.algorithmDropDownListOption)
        await expect.soft(page.getByText(robustnessTabularParameters.testrunValidationSuccessText).nth(0)).toBeVisible({ timeout: 600000 })

        /* Delete Test Results */
        console.log('[INFO] Delete Test Results')
        await testResultPage.deleteTestRunButton.click()
        await testResultPage.confirmDeleteTestRunButton.click()
        await testResultPage.confirmDeleteTestRunOkayButton.click()

    })

    test('Robustness ToolBox Image Test', async ({ testResultPage }) => {

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
            testrunValidationSuccessText: "robustness toolboxSUCCESS"
        }
        await testResultPage.runAlgorithms(robustnessImageParameters)
        await page.getByLabel('Algorithm:').selectOption(robustnessImageParameters.algorithmDropDownListOption)
        await expect.soft(page.getByText(robustnessImageParameters.testrunValidationSuccessText).nth(0)).toBeVisible({ timeout: 600000 })

        /* Delete Test Results */
        console.log('[INFO] Delete Test Results')
        await testResultPage.deleteTestRunButton.click()
        await testResultPage.confirmDeleteTestRunButton.click()
        await testResultPage.confirmDeleteTestRunOkayButton.click()
        

    })

    test('SHAP ToolBox Test', async ({ testResultPage }) => {

        /* Input SHAP ToolBox Test Parameters */
        console.log('[INFO] Input Shap ToolBox Test Parameters')
        const shapParameters = {
            algorithm: "aiverify_shap_toolbox",
            model: "sample_bc_credit_sklearn_linear.LogisticRegression.sav",
            dataset: "sample_bc_credit_data.sav",
            groundTruthDataset: "sample_bc_credit_data.sav",
            groundTruthColumn: "default",
            backgroundPath: "sample_bc_credit_data.sav",
            backgroundSample: "25",
            dataSample: "25",
            algorithmDropDownListOption: "aiverify.stock.shap_toolbox",
            testrunValidationSuccessText: "shap toolboxSUCCESS"
        }
        await testResultPage.runAlgorithms(shapParameters)
        await page.getByLabel('Algorithm:').selectOption(shapParameters.algorithmDropDownListOption)
        await expect.soft(page.getByText(shapParameters.testrunValidationSuccessText).nth(0)).toBeVisible({ timeout: 600000 })

        /* Delete Test Results */
        console.log('[INFO] Delete Test Results')
        await testResultPage.deleteTestRunButton.click()
        await testResultPage.confirmDeleteTestRunButton.click()
        await testResultPage.confirmDeleteTestRunOkayButton.click()

    })

    test('Veritas Tool Test', async ({ testResultPage }) => {

        /* Input Veritas Test Parameters */
        console.log('[INFO] Input Veritas Tool Test Parameters')
        const veritasParameters = {
            algorithm: "veritastool",
            model: "cs_model",
            dataset: "cs_X_test.pkl",
            groundTruthDataset: "cs_y_test.pkl",
            groundTruthColumn: "y_test",
            privilegedGroup: [
                ['SEX', '1'],
                ['MARRIAGE', '1']
            ],
            modelType: "CLASSIFICATION",
            positiveLabel: "1",
            performanceMetric: "accuracy",
            transparencyRow: ['20', '40'],
            transparencyMaxSample: "1000",
            algorithmDropDownListOption: "aiverify.stock.veritas",
            testrunValidationSuccessText: "veritasSUCCESS"
        }
        await testResultPage.runAlgorithms(veritasParameters)
        await page.getByLabel('Algorithm:').selectOption(veritasParameters.algorithmDropDownListOption)
        await expect.soft(page.getByText(veritasParameters.testrunValidationSuccessText).nth(0)).toBeVisible({ timeout: 600000 })

        /* Delete Test Results */
        console.log('[INFO] Delete Test Results')
        await testResultPage.deleteTestRunButton.click()
        await testResultPage.confirmDeleteTestRunButton.click()
        await testResultPage.confirmDeleteTestRunOkayButton.click()

    })

})

test.describe('User Input Workflows', () => {

    test.beforeEach(async ({ homePage, managePage }) => {

        /* AI Verify Homepage */
        console.log('[INFO] Navigate to AI Verify Home Page')
        await homePage.goto(url + ":" + port_number)
        await expect.soft(homePage.aivlogo).toBeVisible({ timeout: 60000 })
        await homePage.manageButton.click()

        /* Manage Page */
        console.log('[INFO] Manage Page')
        await managePage.userInputButton.click()

    })

    test('AI Verify Process Checklist', async ({ userInputPage }) => {

        /* User Input Page */
        console.log('[INFO] User Input Page')
        await userInputPage.AIVerifyProcessChecklistButton.click()

        /* AI Verify Process Checklist */
        console.log('[INFO] AI Verify Process Checklist')
        const processCheckListParameters = [
            { name: "Transparency Process Checklist", yesNoNAOptions: "Yes", numberOfRows: 10 },
            { name: "Explainability Process Checklist", yesNoNAOptions: "No", numberOfRows: 1 },
            { name: "Reproducibility Process Checklist", yesNoNAOptions: "Not Applicable", numberOfRows: 15 },
            { name: "Safety Process Checklist", yesNoNAOptions: "Yes", numberOfRows: 9 },
            { name: "Security Process Checklist", yesNoNAOptions: "No", numberOfRows: 14 },
            { name: "Robustness Process Checklist", yesNoNAOptions: "Not Applicable", numberOfRows: 7 },
            { name: "Fairness Process Checklist", yesNoNAOptions: "Yes", numberOfRows: 10 },
            { name: "Data Governance Process Checklist", yesNoNAOptions: "No", numberOfRows: 4 },
            { name: "Accountability Process Checklist", yesNoNAOptions: "Not Applicable", numberOfRows: 11 },
            { name: "Human Agency & Oversight Process Checklist", yesNoNAOptions: "Yes", numberOfRows: 8 },
            { name: "Inclusive Growth, Societal & Environmental Well-being Process Checklist", yesNoNAOptions: "No", numberOfRows: 1 },
            { name: "Organisational Considerations Process Checklist", yesNoNAOptions: "Not Applicable", numberOfRows: 7 }
        ]
        await userInputPage.addNewChecklist.click()
        await userInputPage.createNewChecklist.click()
        await userInputPage.completeProcessChecklist(processCheckListParameters, "aiverify", 1)

    })

    test('Veritas Process Checklist', async ({ userInputPage }) => {

        /* User Input Page */
        console.log('[INFO] User Input Page')
        await userInputPage.VeritasProcessChecklistButton.click()

        /* Veritas Process Checklist */
        console.log('[INFO] Veritas Process Checklist')
        const processChecklistParameters = [
            { name: "Generic Process Checklist", yesNoNAOptions: "Yes", numberOfRows: 16 },
            { name: "Fairness Process Checklist", yesNoNAOptions: "No", numberOfRows: 15 },
            { name: "Ethics and Accountability Process Checklist", yesNoNAOptions: "Not Applicable", numberOfRows: 10 },
            { name: "Transparency Process Checklist", yesNoNAOptions: "Yes", numberOfRows: 21 }
        ]
        await userInputPage.addNewChecklist.click()
        await userInputPage.completeProcessChecklist(processChecklistParameters, 'veritas', 2)

    })

    test('Fairness Tree', async ({ userInputPage, page }) => {

        /* User Input Page */
        console.log('[INFO] User Input Page')
        await userInputPage.FairnessTreeButton.click()
        await userInputPage.completeFairnessTree('Fairness Tree')
        await expect.soft(page.getByText('Tree updated successfully')).toBeVisible()

    })

})

test.describe('Report Template Workflows', () => {
    test.beforeEach(async ({ homePage }) => {

        /* AI Verify Homepage */
        console.log('[INFO] Navigate to AI Verify Home Page')
        await homePage.goto(url + ":" + port_number)
        await expect.soft(homePage.aivlogo).toBeVisible({ timeout: 60000 })
        await homePage.createProjectButton.click()

    })

    test('AI Verify Summary Report for Classification Model', async ({ homePage, createProjectPage, reportTemplatePage, selectDataPage, canvasPage }) => {

        /* Create Project Page */
        console.log('[INFO] Create Project Page')
        const projectInfo = {
            projectName: 'AI Verify Summary Report for Classification Model',
            projectDescription: 'AI Verify Summary Report for Classification Model',
            reportTitle: 'AI Verify Summary Report for Classification Model',
            companyName: 'AI Verify Summary Report for Classification Model'
        }
        const arrayofIDs = ['15', '13', '2', '1', '17'] //shap, robustness, fmtc, aivpc, fairness tree

        await createProjectPage.createProject(projectInfo)

        /* Select Report Template */
        await reportTemplatePage.selectReportTemplate(projectInfo.reportTitle)

        /* Select Data */
        await selectDataPage.selectData(arrayofIDs)

        /* Canvas Page */
        console.log('[INFO] Canvas Page')
        await canvasPage.specificPageButton.click()
        await canvasPage.specificPageTextBox.fill('67')
        await canvasPage.specificPageTextBox.press('Enter')

        /* Navigate To Home Page */
        await homePage.goto(url + ":" + port_number)

        /* Validate Project Creation */
        await homePage.validateProjectCreation(projectInfo.reportTitle)
    })

    test('AI Verify Technical Tests Report for Classification Model', async ({ homePage, createProjectPage, reportTemplatePage, selectDataPage, canvasPage }) => {

        /* Create Project Page */
        console.log('[INFO] Create Project Page')
        const projectInfo = {
            projectName: 'AI Verify Technical Tests Report for Classification Model',
            projectDescription: 'AI Verify Technical Tests Report for Classification Model',
            reportTitle: 'AI Verify Technical Tests Report for Classification Model',
            companyName: 'AI Verify Technical Tests Report for Classification Model'
        }
        const arrayofIDs = ['2', '13', '15', '17'] //fmtc, robustness, shap, fairness tree

        await createProjectPage.createProject(projectInfo)

        /* Select Report Template */
        await reportTemplatePage.selectReportTemplate(projectInfo.reportTitle)

        /* Select Data */
        await selectDataPage.selectDataComboBox(arrayofIDs)

        /* Canvas Page */
        console.log('[INFO] Canvas Page')
        await canvasPage.zoomInButton.click()
        await canvasPage.zoomOutButton.click()

        /* Navigate To Home Page */
        console.log('[INFO] Navigate To Home Page')
        await homePage.goto(url + ":" + port_number)

        /* Validate Project Creation */
        await homePage.validateProjectCreation(projectInfo.reportTitle)
    })

    test('AI Verify Technical Tests Report for Regression Model', async ({ homePage, createProjectPage, reportTemplatePage, selectDataPage, canvasPage }) => {

        /* Create Project Page */
        console.log('[INFO] Create Project Page')
        const projectInfo = {
            projectName: 'AI Verify Technical Tests Report for Regression Model',
            projectDescription: 'AI Verify Technical Tests Report for Regression Model',
            reportTitle: 'AI Verify Technical Tests Report for Regression Model',
            companyName: 'AI Verify Technical Tests Report for Regression Model'
        }
        const arrayofIDs = ['3', '13', '15'] //fmtr, robustness, shap

        await createProjectPage.createProject(projectInfo)

        /* Select Report Template */
        await reportTemplatePage.selectReportTemplate(projectInfo.reportTitle)

        /* Select Data */
        await selectDataPage.selectDataComboBox(arrayofIDs)

        /* Canvas Page */
        console.log('[INFO] Canvas Page')
        await canvasPage.zoomInButton.click()
        await canvasPage.zoomOutButton.click()

        /* Navigate To Home Page */
        console.log('[INFO] Navigate To Home Page')
        await homePage.goto(url + ":" + port_number)

        /* Validate Project Creation */
        await homePage.validateProjectCreation(projectInfo.reportTitle)
    })

    test('AI Verify Report for Process Checklists', async ({ homePage, createProjectPage, reportTemplatePage, selectDataPage, canvasPage }) => {

        /* Create Project Page */
        console.log('[INFO] Create Project Page')
        const projectInfo = {
            projectName: 'AI Verify Report for Process Checklists',
            projectDescription: 'AI Verify Report for Process Checklists',
            reportTitle: 'AI Verify Report for Process Checklists',
            companyName: 'AI Verify Report for Process Checklistsl'
        }
        const arrayofIDs = ['1'] //aivpc

        await createProjectPage.createProject(projectInfo)

        /* Select Report Template */
        await reportTemplatePage.selectReportTemplate(projectInfo.reportTitle)

        /* Select Data */
        await selectDataPage.selectDataComboBox(arrayofIDs)

        /* Canvas Page */
        console.log('[INFO] Canvas Page')
        await canvasPage.zoomInButton.click()
        await canvasPage.zoomOutButton.click()

        /* Navigate To Home Page */
        console.log('[INFO] Navigate To Home Page')
        await homePage.goto(url + ":" + port_number)

        /* Validate Project Creation */
        await homePage.validateProjectCreation(projectInfo.reportTitle)
    })

    test('AI Verify Summary Report for Regression Model', async ({ homePage, createProjectPage, reportTemplatePage, selectDataPage, canvasPage }) => {

        /* Create Project Page */
        console.log('[INFO] Create Project Page')
        const projectInfo = {
            projectName: 'AI Verify Summary Report for Regression Model',
            projectDescription: 'AI Verify Summary Report for Regression Model',
            reportTitle: 'AI Verify Summary Report for Regression Model',
            companyName: 'AI Verify Summary Report for Regression Model'
        }
        const arrayofIDs = ['15', '13', '3', '1'] //shap, robustness, fmtr, aivpc

        await createProjectPage.createProject(projectInfo)

        /* Select Report Template */
        await reportTemplatePage.selectReportTemplate(projectInfo.reportTitle)

        /* Select Data */
        await selectDataPage.selectDataComboBox(arrayofIDs)

        /* Canvas Page */
        console.log('[INFO] Canvas Page')
        await canvasPage.zoomInButton.click()
        await canvasPage.zoomOutButton.click()

        /* Navigate To Home Page */
        console.log('[INFO] Navigate To Home Page')
        await homePage.goto(url + ":" + port_number)

        /* Validate Project Creation */
        await homePage.validateProjectCreation(projectInfo.reportTitle)
    })

    test('Veritas Predictive Underwriting Report', async ({ homePage, createProjectPage, reportTemplatePage, selectDataPage, canvasPage }) => {

        /* Create Project Page */
        console.log('[INFO] Create Project Page')
        const projectInfo = {
            projectName: 'Veritas Predictive Underwriting Report',
            projectDescription: 'Veritas Predictive Underwriting Report',
            reportTitle: 'Veritas Predictive Underwriting Report',
            companyName: 'Veritas Predictive Underwriting Report'
        }
        const arrayofIDs = ['16','2'] //veritas, vpc

        await createProjectPage.createProject(projectInfo)

        /* Select Report Template */
        console.log('[INFO] Select Report Template')
        await reportTemplatePage.selectReportTemplate(projectInfo.reportTitle)

        /* Select Data */
        await selectDataPage.selectDataComboBox(arrayofIDs)

        /* Canvas Page */
        await canvasPage.zoomInButton.click()
        await canvasPage.zoomOutButton.click()

        /* Navigate To Home Page */
        console.log('[INFO] Navigate To Home Page')
        await homePage.goto(url + ":" + port_number)

        /* Validate Project Creation */
        await homePage.validateProjectCreation(projectInfo.reportTitle)
    })

    test('Veritas Base Regression Report', async ({ homePage, createProjectPage, reportTemplatePage, selectDataPage, canvasPage }) => {

        /* Create Project Page */
        console.log('[INFO] Create Project Page')
        const projectInfo = {
            projectName: 'Veritas Base Regression Report',
            projectDescription: 'Veritas Base Regression Report',
            reportTitle: 'Veritas Base Regression Report',
            companyName: 'Veritas Base Regression Report'
        }
        const arrayofIDs = ['16','2'] //veritas, vpc

        await createProjectPage.createProject(projectInfo)

        /* Select Report Template */
        await reportTemplatePage.selectReportTemplate(projectInfo.reportTitle)

        /* Select Data */
        await selectDataPage.selectDataComboBox(arrayofIDs)

        /* Canvas Page */
        console.log('[INFO] Canvas Page')
        await canvasPage.zoomInButton.click()
        await canvasPage.zoomOutButton.click()

        /* Navigate To Home Page */
        console.log('[INFO] Navigate To Home Page')
        await homePage.goto(url + ":" + port_number)

        /* Validate Project Creation */
        await homePage.validateProjectCreation(projectInfo.reportTitle)
    })

    test('Veritas Credit Scoring Report', async ({ homePage, createProjectPage, reportTemplatePage, selectDataPage, canvasPage }) => {

        /* Create Project Page */
        console.log('[INFO] Create Project Page')
        const projectInfo = {
            projectName: 'Veritas Credit Scoring Report',
            projectDescription: 'Veritas Credit Scoring Report',
            reportTitle: 'Veritas Credit Scoring Report',
            companyName: 'Veritas Credit Scoring Report'
        }
        const arrayofIDs = ['16','2'] //veritas, vpc

        await createProjectPage.createProject(projectInfo)

        /* Select Report Template */
        await reportTemplatePage.selectReportTemplate(projectInfo.reportTitle)

        /* Select Data */
        await selectDataPage.selectDataComboBox(arrayofIDs)

        /* Canvas Page */
        console.log('[INFO] Canvas Page')
        await canvasPage.zoomInButton.click()
        await canvasPage.zoomOutButton.click()

        /* Navigate To Home Page */
        console.log('[INFO] Navigate To Home Page')
        await homePage.goto(url + ":" + port_number)

        /* Validate Project Creation */
        await homePage.validateProjectCreation(projectInfo.reportTitle)
    })

    test('Veritas Customer Marketing Report', async ({ homePage, createProjectPage, reportTemplatePage, selectDataPage, canvasPage }) => {

        /* Create Project Page */
        console.log('[INFO] Create Project Page')
        const projectInfo = {
            projectName: 'Veritas Customer Marketing Report',
            projectDescription: 'Veritas Customer Marketing Report',
            reportTitle: 'Veritas Customer Marketing Report',
            companyName: 'Veritas Customer Marketing Report'
        }
        const arrayofIDs = ['16','2'] //veritas, vpc

        await createProjectPage.createProject(projectInfo)

        /* Select Report Template */
        await reportTemplatePage.selectReportTemplate(projectInfo.reportTitle)

        /* Select Data */
        await selectDataPage.selectDataComboBox(arrayofIDs)

        /* Canvas Page */
        console.log('[INFO] Canvas Page')
        await canvasPage.zoomInButton.click()
        await canvasPage.zoomOutButton.click()

        /* Navigate To Home Page */
        console.log('[INFO] Navigate To Home Page')
        await homePage.goto(url + ":" + port_number)

        /* Validate Project Creation */
        await homePage.validateProjectCreation(projectInfo.reportTitle)
    })

    test('Veritas Base Classification Report', async ({ homePage, createProjectPage, reportTemplatePage, selectDataPage, canvasPage }) => {

        /* Create Project Page */
        console.log('[INFO] Create Project Page')
        const projectInfo = {
            projectName: 'Veritas Base Classification Report',
            projectDescription: 'Veritas Base Classification Report',
            reportTitle: 'Veritas Base Classification Report',
            companyName: 'Veritas Base Classification Report'
        }
        const arrayofIDs = ['16','2'] //veritas, vpc

        await createProjectPage.createProject(projectInfo)

        /* Select Report Template */
        await reportTemplatePage.selectReportTemplate(projectInfo.reportTitle)

        /* Select Data */
        await selectDataPage.selectDataComboBox(arrayofIDs)

        /* Canvas Page */
        console.log('[INFO] Canvas Page')
        await canvasPage.zoomInButton.click()
        await canvasPage.zoomOutButton.click()

        /* Navigate To Home Page */
        console.log('[INFO] Navigate To Home Page')
        await homePage.goto(url + ":" + port_number)

        /* Validate Project Creation */
        await homePage.validateProjectCreation(projectInfo.reportTitle)
    })
})