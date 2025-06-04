import { test, expect } from '../../fixtures/base-test'

const url = process.env.URL
const port_number = process.env.PORT_NUMBER
const root_path = process.env.ROOT_PATH

test.beforeEach(async ({ homePage, managePage, modelPage, datasetPage, page }) => {

    console.log('[INFO] Prepare Model & Dataset')

    /* AI Verify Homepage */
    console.log('[INFO] Navigate to AI Verify Home Page')
    await homePage.goto(url+ ":" + port_number)
    await expect.soft(homePage.aivlogo).toBeVisible({ timeout: 60000 })
    await homePage.manageButton.click()

    /* Manage Page */
    console.log('[INFO] Manage Page')
    await managePage.modelButton.click()

    /* Upload AI Model File */
    console.log('[INFO] Upload AI Models File')
    // const fileStringArray = [root_path + '/model/sample_bc_credit_sklearn_linear.LogisticRegression.sav', root_path + '/model/sample_mc_toxic_sklearn_linear.LogisticRegression.sav']
    let filePathStringArray = [root_path + '/model/sample_bc_credit_sklearn_linear.LogisticRegression.sav']
    await modelPage.uploadModelButton.click()
    await modelPage.uploadAIModelButton.click()
    await modelPage.nextButton.click()
    await modelPage.dragAndDropFile(filePathStringArray)

    /* Upload AI Model Folder */
    console.log('[INFO] Upload AI Model Folder')
    let folderPathStringArray = [root_path + '/veritas_data/cs_model']
    await modelPage.uploadModelFolderButton.click()
    await modelPage.uploadFolder(folderPathStringArray)
    await modelPage.uploadFileBackButton.click()

    /* Upload AI Model Pipeline */
    console.log('[INFO] Upload AI Model Pipelines')
    folderPathStringArray = [root_path + '/pipeline/sample_fashion_mnist_sklearn', root_path + '/pipeline/bc_tabular_credit']
    await modelPage.uploadAIModelPipelineButton.click()
    await modelPage.nextButton.click()
    await modelPage.uploadFolder(folderPathStringArray)
    await modelPage.aivlogo.click()

    /* Homepage */
    console.log('[INFO] AI Verify Home Page')
    await homePage.manageButton.click()

    /* Manage Page */
    console.log('[INFO] Manage Page')
    await managePage.datasetButton.click()

    /* Upload Dataset File */
    console.log('[INFO] Upload Dataset Files')
    filePathStringArray = [root_path + '/data/pickle_pandas_fashion_mnist_annotated_labels_10.sav', root_path + '/data/sample_bc_credit_data.sav']
    await datasetPage.uploadDatasetButton.click()
    await datasetPage.uploadFile(filePathStringArray)
    await datasetPage.uploadDatasetFolderButton.click()

    /* Upload Dataset Folder */
    console.log('[INFO] Upload Dataset Folder')
    folderPathStringArray = [root_path + '/data/raw_fashion_image_10', root_path + '/data/small_test']
    await datasetPage.uploadFolder(folderPathStringArray)
    await datasetPage.aivlogo.click()

})

test('ALE Test', async ({ homePage, page }) => {

    /* Upload Source Text */
    console.log('[INFO] AI Verify Home Page')
    // await createSummaryPage.uploadValidSourceText('docx')
    // await expect.soft(createSummaryPage.generateSummaryButton).toBeVisible()
    // await expect.soft(page.getByText("Words: 6,732")).toBeVisible({ timeout: 60000 })
})

test.skip('AI Verify Process Checklist Report Template', async ({ homePage, page }) => {

    /* Upload Source Text */
    console.log('[INFO] AI Verify Home Page')
    // await createSummaryPage.uploadValidSourceText('docx')
    // await expect.soft(createSummaryPage.generateSummaryButton).toBeVisible()
    // await expect.soft(page.getByText("Words: 6,732")).toBeVisible({ timeout: 60000 })
})
