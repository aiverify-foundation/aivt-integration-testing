import { test, expect } from '../../fixtures/base-test'

const url = process.env.URL
const port_number = process.env.PORT_NUMBER
const root_path = process.env.ROOT_PATH

test.describe('Setup', () => {

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
        let folderPathStringArray = [root_path + '/veritas_data/cs_model']
        await modelPage.uploadModelFolderButton.click()
        await modelPage.uploadFolder(folderPathStringArray, "folderInput")
        await modelPage.uploadFileBackButton.click()

        /* Upload AI Model Pipeline */
        console.log('[INFO] Upload AI Model Pipelines')
        folderPathStringArray = [root_path + '/pipeline/bc_image_face', root_path + '/pipeline/bc_tabular_credit', root_path + '/pipeline/mc_image_fashion',
        root_path + '/pipeline/mc_tabular_toxic', root_path + '/pipeline/regression_tabular_donation', root_path + '/pipeline/sample_fashion_mnist_pytorch',
        root_path + '/pipeline/sample_fashion_mnist_sklearn'
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
        filePathStringArray = [root_path + '/data/pickle_pandas_fashion_mnist_annotated_labels_10.sav', root_path + '/data/sample_bc_credit_data.sav', root_path + '/data/sample_bc_credit_data.sav',
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
            algorithm: "aiverify_accumulated_local_effect",
            model: "sample_bc_credit_sklearn_linear.LogisticRegression.sav",
            dataset: "sample_bc_credit_data.sav",
            groundTruthDataset: "sample_bc_credit_data.sav",
            groundTruthColumn: "default",
            algorithmDropDownListOption: "aiverify.stock.accumulated_local_effect",
            testrunValidationSuccessText: "accumulated local effectSUCCESS"
        }
        await testResultPage.runAlgorithms(aleParameters)

    })

    test('FMTC Test', async ({ testResultPage, page }) => {

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

    })

    test('FMTR Test', async ({ testResultPage, page }) => {

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
                ['SEX','1'],
                ['MARRIAGE','1']
            ],
            modelType: "CLASSIFICATION",
            positiveLabel: "1",
            performanceMetric: "accuracy",
            transparencyRow: ['20','40'],
            transparencyMaxSample: "1000",
            algorithmDropDownListOption: "aiverify.stock.veritas",
            testrunValidationSuccessText: "veritasSUCCESS"
        }
        await testResultPage.runAlgorithms(veritasParameters)
        
    })

})

test.describe('Report Template Workflows', () => {

    test.beforeEach(async ({ homePage }) => {
        /* AI Verify Homepage */
        console.log('[INFO] Navigate to AI Verify Home Page')
        await homePage.goto(url + ":" + port_number)
        await expect.soft(homePage.aivlogo).toBeVisible({ timeout: 60000 })
        await homePage.manageButton.click()
    })

    test('AI Verify Process Checklist Report Template', async ({ homePage }) => {

        /* Upload Source Text */
        console.log('[INFO] AI Verify Home Page')

    })
})