import { test, expect } from '../../fixtures/base-test'
import { setTimeout } from "timers/promises"

const url = process.env.URL
const port_number = process.env.PORT_NUMBER
const root_path = process.env.ROOT_PATH

const datasetName = "sample_bc_credit_data.sav"

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
        datasetPage.searchDataset('veritas')

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

    test('Dataset Details', async ({ page }) => {

        /* Dataset Details */
        console.log('[INFO] Dataset Details')

    })

    test('More Dataset Details', async ({ page }) => {

        /* Dataset Details */
        console.log('[INFO] Dataset Details')
        await page.getByText(datasetName).click()

        /* Assert Dataset Details */
        await expect.soft(page.getByText('File Type:file')).toBeVisible()
        await expect.soft(page.getByText('File Name:' + datasetName)).toBeVisible()
        await expect.soft(page.getByText('Size:181224 bytes')).toBeVisible()
        await expect.soft(page.getByText('Data Format:pandas')).toBeVisible()
        await expect.soft(page.getByText('Rows:2500')).toBeVisible()
        await expect.soft(page.getByText('Columns:9')).toBeVisible()
        await expect.soft(page.getByText('Status:valid')).toBeVisible()

    })

    test('Delete Dataset Button', async ({ datasetPage, page }) => {

        /* Delete Dataset */
        const algorithmName = await datasetPage.algorithmNameCell.nth(1).textContent()
        await datasetPage.checkBox.nth(1).click()
        await datasetPage.deleteDatasetButton.click()
        await datasetPage.deleteDialogBoxButton.click()

        /* Assert Delete Dataset Button */
        await expect(page.getByText('Datasets deleted successfully!')).toBeVisible()
        await expect(datasetPage.algorithmNameCell.nth(1).textContent()).not.toBe(algorithmName)
        
    })

})