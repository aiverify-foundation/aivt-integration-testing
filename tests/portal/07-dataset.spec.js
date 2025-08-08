import { test, expect } from '../../fixtures/base-test'

const url = process.env.URL
const port_number = process.env.PORT_NUMBER
const root_path = process.env.ROOT_PATH

const datasetName = "sample_reg_pipeline_data.sav"

test.describe('View Uploaded Dataset', () => {

    test.beforeEach(async ({ homePage, managePage }) => {

        /* AI Verify Homepage */
        console.log('[INFO] Navigate to AI Verify Home Page')
        await homePage.goto(url + ":" + port_number)
        await expect.soft(homePage.aivlogo).toBeVisible({ timeout: 60000 })
        await homePage.manageButton.click()

        /* Manage Page */
        console.log('[INFO] Manage Page')
        await managePage.datasetButton.click()

    })

    test('Search Dataset Bar', async ({ datasetPage, page }) => {

        /* Search Dataset */
        await datasetPage.searchDataset('veritas')

        /* Assert Search Dataset */
        await expect.soft(page.getByText('sample_bc_credit_data.sav')).toBeVisible()

    })

    test('Upload Dataset Button', async ({ datasetPage, page }) => {

        /* Upload Dataset Button */
        console.log('[INFO] Dataset Page')
        datasetPage.uploadDatasetButton.click()

        /* Assert Upload Dataset Button */
        await expect.soft(page.getByRole('heading', { name: 'upload dataset header' })).toBeVisible()

    })

    test('Dataset Details', async ({ datasetPage, page }) => {

        /* Dataset Details */
        console.log('[INFO] Dataset Details')
        const algorithmName = await datasetPage.algorithmNameCell.nth(1).textContent()
        const rowsValue = await datasetPage.rowsCell.nth(1).textContent()
        const colsValue = await datasetPage.colsCell.nth(1).textContent()
        const dateValue = await datasetPage.dateCell.nth(1).textContent()

        /* Assert Dataset Details */
        await expect.soft(algorithmName).toBeTruthy()
        await expect.soft(rowsValue).toBeTruthy()
        await expect.soft(colsValue).toBeTruthy()
        await expect.soft(dateValue).toBeTruthy()
        
    })

    test('More Dataset Details', async ({ page }) => {

        /* Dataset Details */
        console.log('[INFO] Dataset Details')
        await page.getByText(datasetName).click()

        /* Assert Dataset Details */
        await expect.soft(page.getByText('File Type:file')).toBeVisible()
        await expect.soft(page.getByText('File Name:' + datasetName)).toBeVisible()
        await expect.soft(page.getByText('Size:17143 bytes')).toBeVisible()
        await expect.soft(page.getByText('Data Format:pandas')).toBeVisible()
        await expect.soft(page.getByText('Rows:250')).toBeVisible()
        await expect.soft(page.getByText('Columns:8')).toBeVisible()
        await expect.soft(page.getByText('Status:valid')).toBeVisible()

    })

    // test('Delete Dataset Button', async ({ datasetPage, page }) => {

    //     /* Delete Dataset */
    //     const algorithmName = await datasetPage.algorithmNameCell.nth(0).textContent()
    //     await datasetPage.checkBox.nth(0).click()
    //     await datasetPage.deleteDatasetButton.click()
    //     await datasetPage.deleteDialogBoxButton.click()

    //     /* Assert Delete Dataset Button */
    //     await expect.soft(page.getByText('Datasets deleted successfully!')).toBeVisible()
    //     await expect.soft(datasetPage.algorithmNameCell.nth(0).textContent()).not.toBe(algorithmName)

    // })

    test('Upload Dataset File - Drag And Drop', async ({ datasetPage }) => {

        /* Upload Dataset File */
        console.log('[INFO] Upload Dataset Files')
        let filePathStringArray = [root_path + '/data/pickle_pandas_fashion_mnist_annotated_labels_10.sav']
        await datasetPage.uploadDatasetButton.click()
        await datasetPage.dragAndDropFile(filePathStringArray)

    })

    test('Upload Dataset File - Click To Browse', async ({ datasetPage }) => {

        /* Upload Dataset File */
        console.log('[INFO] Upload Dataset Files')
        let filePathStringArray = [root_path + '/data/pickle_pandas_fashion_mnist_annotated_labels_10.sav']
        await datasetPage.uploadDatasetButton.click()
        await datasetPage.uploadFile(filePathStringArray)

    })

    test('Upload More Than One Dataset', async ({ datasetPage }) => {

        /* Upload Dataset File */
        console.log('[INFO] Upload Dataset Files')
        let filePathStringArray = [root_path + '/data/pickle_pandas_fashion_mnist_annotated_labels_10.sav', root_path + '/data/sample_bc_pipeline_credit_data.sav']
        await datasetPage.uploadDatasetButton.click()
        await datasetPage.uploadFile(filePathStringArray)

    })

    test('Upload Invalid Dataset File', async ({ datasetPage, page }) => {

        /* Upload Dataset File */
        console.log('[INFO] Upload Dataset Files')
        await datasetPage.uploadDatasetButton.click()
        await page.locator('#fileInput').setInputFiles(root_path + '/model/sample_bc_credit_sklearn_linear.LogisticRegression.sav')
        await datasetPage.uploadFileButton.click()

        /* Assert Upload Invalid Dataset File */
        await expect.soft(page.getByText('Some files failed to upload.')).toBeVisible()
        await expect.soft(page.getByText('Unsupported Dataset')).toBeVisible()

    })

    test('Remove Dataset File To Be Uploaded', async ({ datasetPage, page }) => {

        /* Upload Dataset File */
        console.log('[INFO] Upload Dataset Files')
        await datasetPage.uploadDatasetButton.click()
        await page.locator('#fileInput').setInputFiles(root_path + '/data/pickle_pandas_fashion_mnist_annotated_labels_10.sav')
        await datasetPage.removeDatasetFile.click()

        /* Assert Remove Dataset File To Be Uploaded */
        await expect.soft(page.getByText('pickle_pandas_fashion_mnist_annotated_labels_10.sav')).not.toBeVisible()

    })

    test('Upload Valid Dataset Folder - Click To Browse', async ({ datasetPage }) => {

        /* Upload Dataset Folder */
        let folderPathStringArray = [root_path + '/data/raw_fashion_image_10', root_path + '/data/small_test']

        console.log('[INFO] Upload Dataset Folder')
        await datasetPage.uploadDatasetButton.click()
        await datasetPage.uploadDatasetFolderButton.click()
        await datasetPage.uploadFolder(folderPathStringArray)

    })

    test('Upload More Than One Dataset Folder', async ({ datasetPage, page }) => {

        /* Upload Dataset Folder */
        console.log('[INFO] Upload Dataset Folder')
        await datasetPage.uploadDatasetButton.click()
        await datasetPage.uploadDatasetFolderButton.click()
        await page.locator('#folderInput').setInputFiles(root_path + '/data/raw_fashion_image_10')
        await page.locator('#folderInput').setInputFiles(root_path + '/data/small_test')
        await datasetPage.uploadFolderCloseDialogButton.click()

        /* Assert Upload More Than One Dataset Folder */
        await expect.soft(page.getByRole('heading', { name: 'raw_fashion_image_10' })).toBeVisible()
        await expect.soft(page.getByRole('heading', { name: 'small_test' })).toBeVisible()

    })

    test('Upload Invalid Dataset Folder', async ({ datasetPage, page }) => {

        /* Upload Dataset Folder */
        console.log('[INFO] Upload Dataset Folder')
        await datasetPage.uploadDatasetButton.click()
        await datasetPage.uploadDatasetFolderButton.click()
        await page.locator('#folderInput').setInputFiles(root_path + '/model/tensorflow_tabular_sequential.sav')
        await datasetPage.uploadFolderCloseDialogButton.click()
        await datasetPage.uploadFolderButton.click()

        /* Assert Upload Invalid Dataset Folder */
        await expect.soft(page.getByText('Upload completed: 0')).toBeVisible()

    })

    test('Clear All Button', async ({ datasetPage, page }) => {

        /* Upload Dataset Folder */
        console.log('[INFO] Upload Dataset Folder')
        await datasetPage.uploadDatasetButton.click()
        await datasetPage.uploadDatasetFolderButton.click()
        await page.locator('#folderInput').setInputFiles(root_path + '/data/raw_fashion_image_10')
        await datasetPage.uploadFolderCloseDialogButton.click()
        await datasetPage.clearAllButton.click()

        /* Assert Clear All Button */
        await expect.soft(page.getByRole('headings', { name: 'raw_fashion_image_10'})).not.toBeVisible()

    })

    test('Remove Dataset Folder Button', async ({ datasetPage, page }) => {

        /* Upload Dataset Folder */
        console.log('[INFO] Upload Dataset Folder')
        await datasetPage.uploadDatasetButton.click()
        await datasetPage.uploadDatasetFolderButton.click()
        await page.locator('#folderInput').setInputFiles(root_path + '/data/raw_fashion_image_10')
        await datasetPage.uploadFolderCloseDialogButton.click()
        await datasetPage.removeDatasetFolder.click()
        
        /* Assert Remove Dataset Folder Button */
        await expect.soft(page.getByRole('headings', { name: 'raw_fashion_image_10'})).not.toBeVisible()

    })

    test('View Dataset Button', async ({ datasetPage, page }) => {

        /* Upload Dataset Folder */
        console.log('[INFO] Upload Dataset Folder')
        await datasetPage.uploadDatasetButton.click()
        await datasetPage.uploadDatasetFolderButton.click()
        await datasetPage.viewDatasetButton.click()
        
        /* Assert View Dataset Button */
        await expect.soft(page.getByRole('heading', { name: 'Test Datasets', exact: true })).toBeVisible()

    })

})