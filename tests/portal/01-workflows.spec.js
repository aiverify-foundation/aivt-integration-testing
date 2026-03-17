import { test, expect } from '../../fixtures/base-test'

const url = process.env.URL
const port_number = process.env.PORT_NUMBER
const root_path = process.env.ROOT_PATH

function generateProjectInfo(reportTemplateName) {
    const uniqueId = String(Date.now()); // get current timestamp as unique id
    const baseName = reportTemplateName + ' ' + uniqueId;
    return {
        projectName: '[Project] ' + baseName,
        projectDescription: '[Description] ' + baseName,
        reportTitle: '[Report] ' + baseName,
        companyName: '[Company]' + baseName
    }
}

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

    test('ALE Test', async ({ testResultPage, page }) => {

        /* Input ALE Test Parameters */
        console.log('[INFO] Input ALE Test Parameters')
        const aleParameters = {
            algorithm: "Accumulated Local Effect",
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

    test('FMTC Test', async ({ testResultPage, page }) => {

        /* Input FMTC Test Parameters */
        console.log('[INFO] Input FMTC Test Parameters')
        const fmtcParameters = {
            algorithm: "Fairness Metrics Toolbox for Classification",
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

    })

    test('FMTR Test', async ({ testResultPage, page }) => {

        /* Input FMTR Test Parameters */
        console.log('[INFO] Input FMTR Test Parameters')
        const fmtrParameters = {
            algorithm: "Fairness Metrics Toolbox for Regression",
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

    })

    test('Blur Corruption Test (SK Learn)', async ({ testResultPage }) => {

        /* Input Blur Corruption Test Parameters */
        console.log('[INFO] Input Blur Corruption Test Parameters')
        const blurCorruptionParameters = {
            algorithm: "Blur Corruptions",
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
            algorithm: "Blur Corruptions",
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
            algorithm: "General Corruptions",
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
            algorithm: "General Corruptions",
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
            algorithm: "Environment Corruptions",
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
            algorithm: "Environment Corruptions",
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
            algorithm: "Digital Corruptions",
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
            algorithm: "Digital Corruptions",
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

    test('Partial Dependence Plot Test', async ({ testResultPage, page }) => {

        /* Input Partial Dependence Plot Parameters */
        console.log('[INFO] Input Partial Dependence Plot Test Parameters')
        const pdpParameters = {
            algorithm: "Partial Dependence Plot",
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

    })

    test('Robustness ToolBox Tabular Test', async ({ testResultPage, page }) => {

        /* Input Robustness ToolBox Tabular Parameters */
        console.log('[INFO] Input Robustness ToolBox Tabular Test Parameters')
        const robustnessTabularParameters = {
            algorithm: "Robustness Toolbox",
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

    })

    test('Robustness ToolBox Image Test', async ({ testResultPage, page }) => {

        /* Input Robustness ToolBox Image Parameters */
        console.log('[INFO] Input Robustness ToolBox Image Test Parameters')
        const robustnessImageParameters = {
            algorithm: "Robustness Toolbox",
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
        
    })

    test('SHAP ToolBox Test', async ({ testResultPage, page }) => {

        /* Input SHAP ToolBox Test Parameters */
        console.log('[INFO] Input Shap ToolBox Test Parameters')
        const shapParameters = {
            algorithm: "SHAP Toolbox for Explainability",
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

    })

    test('Veritas Tool Test', async ({ testResultPage, page }) => {

        /* Input Veritas Test Parameters */
        console.log('[INFO] Input Veritas Tool Test Parameters')
        const veritasParameters = {
            algorithm: "Veritas fairness & transparency assessment",
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
        await userInputPage.completeProcessChecklist(processCheckListParameters, "aiverify", "AI Verify Process Checklists")

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
        await userInputPage.completeProcessChecklist(processChecklistParameters, 'veritas', "Veritas Process Checklists")

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

        const reportTemplateName = 'AI Verify Summary Report for Classification Model'

        /* Create Project Page */
        console.log('[INFO] Create Project Page')
        const projectInfo = generateProjectInfo(reportTemplateName);

        const arrayofOptionLabels = [
            'Result for aiverify_shap_toolbox', 
            'Result for aiverify_robustness_toolbox', 
            'Result for fairness_metrics_toolbox', 
            'AI Verify Process Checklists', 
            'Fairness Tree'
        ] //shap, robustness, fmtc, aivpc, fairness tree

        await createProjectPage.createProject(projectInfo)

        /* Select Report Template */
        await reportTemplatePage.selectReportTemplate(reportTemplateName)

        /* Select Data */
        await selectDataPage.selectDataComboBox(arrayofOptionLabels)

        /* Canvas Page */
        console.log('[INFO] Canvas Page')
        await canvasPage.specificPageButton.click()
        await canvasPage.specificPageTextBox.fill('67')
        await canvasPage.specificPageTextBox.press('Enter')

        /* Navigate To Home Page */
        await homePage.goto(url + ":" + port_number)

        /* Validate Project Creation */
        await homePage.validateProjectCreation(projectInfo.projectName)
    })

    test('AI Verify Technical Tests Report for Classification Model', async ({ homePage, createProjectPage, reportTemplatePage, selectDataPage, canvasPage }) => {

        const reportTemplateName = 'AI Verify Technical Tests Report for Classification Model';

        /* Create Project Page */
        console.log('[INFO] Create Project Page')
        const projectInfo = generateProjectInfo(reportTemplateName);

        const arrayofOptionLabels = [
            'Result for fairness_metrics_toolbox', 
            'Result for aiverify_robustness_toolbox', 
            'Result for aiverify_shap_toolbox', 
            'Fairness Tree'
        ] //fmtc, robustness, shap, fairness tree

        await createProjectPage.createProject(projectInfo)

        /* Select Report Template */
        await reportTemplatePage.selectReportTemplate(reportTemplateName)

        /* Select Data */
        await selectDataPage.selectDataComboBox(arrayofOptionLabels)

        /* Canvas Page */
        console.log('[INFO] Canvas Page')
        await canvasPage.zoomInButton.click()
        await canvasPage.zoomOutButton.click()

        /* Navigate To Home Page */
        console.log('[INFO] Navigate To Home Page')
        await homePage.goto(url + ":" + port_number)

        /* Validate Project Creation */
        await homePage.validateProjectCreation(projectInfo.projectName)
    })

    test('AI Verify Technical Tests Report for Regression Model', async ({ homePage, createProjectPage, reportTemplatePage, selectDataPage, canvasPage }) => {

        const reportTemplateName = 'AI Verify Technical Tests Report for Regression Model';

        /* Create Project Page */
        console.log('[INFO] Create Project Page')
        const projectInfo = generateProjectInfo(reportTemplateName);

        const arrayofOptionLabels = [
            'Result for fairness_metrics_toolbox', 
            'Result for aiverify_robustness_toolbox', 
            'Result for aiverify_shap_toolbox'
        ] //fmtr, robustness, shap

        await createProjectPage.createProject(projectInfo)

        /* Select Report Template */
        await reportTemplatePage.selectReportTemplate(reportTemplateName)

        /* Select Data */
        await selectDataPage.selectDataComboBox(arrayofOptionLabels)

        /* Canvas Page */
        console.log('[INFO] Canvas Page')
        await canvasPage.zoomInButton.click()
        await canvasPage.zoomOutButton.click()

        /* Navigate To Home Page */
        console.log('[INFO] Navigate To Home Page')
        await homePage.goto(url + ":" + port_number)

        /* Validate Project Creation */
        await homePage.validateProjectCreation(projectInfo.projectName)
    })

    test('AI Verify Report for Process Checklists', async ({ homePage, createProjectPage, reportTemplatePage, selectDataPage, canvasPage }) => {

        const reportTemplateName = 'AI Verify Report for Process Checklists';

        /* Create Project Page */
        console.log('[INFO] Create Project Page')
        const projectInfo = generateProjectInfo(reportTemplateName);

        const arrayofOptionLabels = ['AI Verify Process Checklists'] //aivpc

        await createProjectPage.createProject(projectInfo)

        /* Select Report Template */
        await reportTemplatePage.selectReportTemplate(reportTemplateName)

        /* Select Data */
        // hotfix: Wait for 1 second to ensure the "next" button is visible (only in playwright test)
        await selectDataPage.page.waitForTimeout(1000);      
        await selectDataPage.selectDataComboBox(arrayofOptionLabels)

        /* Canvas Page */
        console.log('[INFO] Canvas Page')
        await canvasPage.zoomInButton.click()
        await canvasPage.zoomOutButton.click()

        /* Navigate To Home Page */
        console.log('[INFO] Navigate To Home Page')
        await homePage.goto(url + ":" + port_number)

        /* Validate Project Creation */
        await homePage.validateProjectCreation(projectInfo.projectName)
    })

    test('AI Verify Summary Report for Regression Model', async ({ homePage, createProjectPage, reportTemplatePage, selectDataPage, canvasPage }) => {

        const reportTemplateName = 'AI Verify Summary Report for Regression Model';

        /* Create Project Page */
        console.log('[INFO] Create Project Page')
        const projectInfo = generateProjectInfo(reportTemplateName);

        const arrayofOptionLabels = [
            'Result for aiverify_shap_toolbox', 
            'Result for aiverify_robustness_toolbox', 
            'Result for fairness_metrics_toolbox', 
            'AI Verify Process Checklists', 
        ] //shap, robustness, fmtc, aivpc

        await createProjectPage.createProject(projectInfo)

        /* Select Report Template */
        await reportTemplatePage.selectReportTemplate(reportTemplateName)

        /* Select Data */
        await selectDataPage.selectDataComboBox(arrayofOptionLabels)

        /* Canvas Page */
        console.log('[INFO] Canvas Page')
        await canvasPage.zoomInButton.click()
        await canvasPage.zoomOutButton.click()

        /* Navigate To Home Page */
        console.log('[INFO] Navigate To Home Page')
        await homePage.goto(url + ":" + port_number)

        /* Validate Project Creation */
        await homePage.validateProjectCreation(projectInfo.projectName)
    })

    test('Veritas Predictive Underwriting Report', async ({ homePage, createProjectPage, reportTemplatePage, selectDataPage, canvasPage }) => {

        const reportTemplateName = 'Veritas Predictive Underwriting Report'

        /* Create Project Page */
        console.log('[INFO] Create Project Page')
        const projectInfo = generateProjectInfo(reportTemplateName);

        const arrayofOptionLabels = [
            'Result for veritastool',
            'Veritas Process Checklists'
        ] //veritas, vpc

        await createProjectPage.createProject(projectInfo)

        /* Select Report Template */
        console.log('[INFO] Select Report Template')
        await reportTemplatePage.selectReportTemplate(reportTemplateName)

        /* Select Data */
        await selectDataPage.selectDataComboBox(arrayofOptionLabels)

        /* Canvas Page */
        await canvasPage.zoomInButton.click()
        await canvasPage.zoomOutButton.click()

        /* Navigate To Home Page */
        console.log('[INFO] Navigate To Home Page')
        await homePage.goto(url + ":" + port_number)

        /* Validate Project Creation */
        await homePage.validateProjectCreation(projectInfo.projectName)
    })

    test('Veritas Base Regression Report', async ({ homePage, createProjectPage, reportTemplatePage, selectDataPage, canvasPage }) => {
        
        const reportTemplateName = 'Veritas Base Regression Report'

        /* Create Project Page */
        console.log('[INFO] Create Project Page')
        const projectInfo = generateProjectInfo(reportTemplateName);

        const arrayofOptionLabels = [
            'Result for veritastool',
            'Veritas Process Checklists'
        ] //veritas, vpc

        await createProjectPage.createProject(projectInfo)

        /* Select Report Template */
        await reportTemplatePage.selectReportTemplate(reportTemplateName)

        /* Select Data */
        await selectDataPage.selectDataComboBox(arrayofOptionLabels)

        /* Canvas Page */
        console.log('[INFO] Canvas Page')
        await canvasPage.zoomInButton.click()
        await canvasPage.zoomOutButton.click()

        /* Navigate To Home Page */
        console.log('[INFO] Navigate To Home Page')
        await homePage.goto(url + ":" + port_number)

        /* Validate Project Creation */
        await homePage.validateProjectCreation(projectInfo.projectName)
    })

    test('Veritas Credit Scoring Report', async ({ homePage, createProjectPage, reportTemplatePage, selectDataPage, canvasPage }) => {

        const reportTemplateName = 'Veritas Credit Scoring Report'

        /* Create Project Page */
        console.log('[INFO] Create Project Page')
        const projectInfo = generateProjectInfo(reportTemplateName);

        const arrayofOptionLabels = [
            'Result for veritastool',
            'Veritas Process Checklists'
        ] //veritas, vpc

        await createProjectPage.createProject(projectInfo)

        /* Select Report Template */
        await reportTemplatePage.selectReportTemplate(reportTemplateName)

        /* Select Data */
        await selectDataPage.selectDataComboBox(arrayofOptionLabels)

        /* Canvas Page */
        console.log('[INFO] Canvas Page')
        await canvasPage.zoomInButton.click()
        await canvasPage.zoomOutButton.click()

        /* Navigate To Home Page */
        console.log('[INFO] Navigate To Home Page')
        await homePage.goto(url + ":" + port_number)

        /* Validate Project Creation */
        await homePage.validateProjectCreation(projectInfo.projectName)
    })

    test('Veritas Customer Marketing Report', async ({ homePage, createProjectPage, reportTemplatePage, selectDataPage, canvasPage }) => {

        const reportTemplateName = 'Veritas Customer Marketing Report'

        /* Create Project Page */
        console.log('[INFO] Create Project Page')
        const projectInfo = generateProjectInfo(reportTemplateName);

        const arrayofOptionLabels = [
            'Result for veritastool',
            'Veritas Process Checklists'
        ] //veritas, vpc

        await createProjectPage.createProject(projectInfo)

        /* Select Report Template */
        await reportTemplatePage.selectReportTemplate(reportTemplateName)

        /* Select Data */
        await selectDataPage.selectDataComboBox(arrayofOptionLabels)

        /* Canvas Page */
        console.log('[INFO] Canvas Page')
        await canvasPage.zoomInButton.click()
        await canvasPage.zoomOutButton.click()

        /* Navigate To Home Page */
        console.log('[INFO] Navigate To Home Page')
        await homePage.goto(url + ":" + port_number)

        /* Validate Project Creation */
        await homePage.validateProjectCreation(projectInfo.projectName)
    })

    test('Veritas Base Classification Report', async ({ homePage, createProjectPage, reportTemplatePage, selectDataPage, canvasPage }) => {

        const reportTemplateName = 'Veritas Base Classification Report'

        /* Create Project Page */
        console.log('[INFO] Create Project Page')
        const projectInfo = generateProjectInfo(reportTemplateName);

        const arrayofOptionLabels = [
            'Result for veritastool',
            'Veritas Process Checklists'
        ] //veritas, vpc

        await createProjectPage.createProject(projectInfo)

        /* Select Report Template */
        await reportTemplatePage.selectReportTemplate(reportTemplateName)

        /* Select Data */
        // hotfix: Wait for 1 second to ensure the "next" button is visible (only in playwright test)
        await selectDataPage.page.waitForTimeout(1000);      
        await selectDataPage.selectDataComboBox(arrayofOptionLabels)

        /* Canvas Page */
        console.log('[INFO] Canvas Page')
        await canvasPage.zoomInButton.click()
        await canvasPage.zoomOutButton.click()

        /* Navigate To Home Page */
        console.log('[INFO] Navigate To Home Page')
        await homePage.goto(url + ":" + port_number)

        /* Validate Project Creation */
        await homePage.validateProjectCreation(projectInfo.projectName)
    })
})