import { test, expect } from '../../fixtures/base-test'
import { setTimeout } from "timers/promises"

const url = process.env.URL
const port_number = process.env.PORT_NUMBER
const root_path = process.env.ROOT_PATH

const modelName = "sample_bc_credit_sklearn_linear.LogisticRegression.sav"

test.describe('View Uploaded Models', () => {

    test.beforeEach(async ({ homePage, managePage }) => {

        /* AI Verify Homepage */
        console.log('[INFO] Navigate to AI Verify Home Page')
        await homePage.goto(url + ":" + port_number)
        await expect.soft(homePage.aivlogo).toBeVisible({ timeout: 60000 })
        await homePage.manageButton.click()

        /* Manage Page */
        console.log('[INFO] Manage Page')
        await managePage.modelButton.click()

    })

    test('Search Model Bar', async ({ modelPage }) => {

        /* Search Model */
        modelPage.searchModel('pytorch')

        /* Assert Search Model */
        await expect.soft(this.page.getByText('sample_fashion_mnist_pytorch')).toBeVisible()

    })

    test('Upload Model Button', async ({ modelPage, page }) => {

        /* Upload Model Button */
        console.log('[INFO] Upload Model')
        modelPage.uploadModelButton.click()

        /* Assert Upload Model Button */
        await expect.soft(page).toHaveURL(new RegExp(url + ":" + port_number + "/models/upload"))

    })

    test('Model Filter', async ({ modelPage, page }) => {

        /* Model Filter */
        console.log('[INFO] Model Filter')
        modelPage.modelFilter.click()
        await setTimeout(1000)

        let isModelType = false
        let i = 0
        while (await page.locator('td:nth-child(4)').nth(i).isVisible()) {
            const modelType = await page.locator('td:nth-child(4)').nth(i).textContent()
            if (modelType == "Pipeline") {
                isModelType = true
                break
            }
            i++
        }

        /* Assert Model Filter */
        await expect.soft(isModelType).toBeFalsy()

    })

    test('Pipeline Filter', async ({ modelPage, page }) => {

        /* Pipeline Filter */
        console.log('[INFO] Pipeline Filter')
        modelPage.pipelineFilter.click()
        await setTimeout(1000)

        let isModelType = false
        let i = 0
        while (await page.locator('td:nth-child(4)').nth(i).isVisible()) {
            const modelType = await page.locator('td:nth-child(4)').nth(i).textContent()
            if (modelType == "Model") {
                isModelType = true
                break
            }
            i++
        }

        i = 0

        if (await modelPage.page2Button.isVisible()) {

            await modelPage.page2Button.click()

            while (await page.locator('td:nth-child(4)').nth(i).isVisible()) {
                const modelType = await page.locator('td:nth-child(4)').nth(i).textContent()
                if (modelType == "Model") {
                    isModelType = true
                    break
                }
                i++
            }

        }

        /* Assert Pipeline Filter */
        await expect.soft(isModelType).toBeFalsy()

    })

    test('No Filter Selected', async ({ modelPage, page }) => {

        /* No Filter Selected */
        console.log('[INFO] No Filter')
        let isModel = false, isPipeline = false
        let i = 0
        while (await page.locator('td:nth-child(4)').nth(i).isVisible()) {
            const modelType = await page.locator('td:nth-child(4)').nth(i).textContent()
            if (modelType == "Model") {
                isModel = true
            }
            if (modelType == "Pipeline") {
                isPipeline = true
            }
            i++
        }

        i = 0

        if (await modelPage.page2Button.isVisible()) {

            await modelPage.page2Button.click()

            while (await page.locator('td:nth-child(4)').nth(i).isVisible()) {
                const modelType = await page.locator('td:nth-child(4)').nth(i).textContent()
                if (modelType == "Model") {
                    isModel = true
                }
                if (modelType == "Pipeline") {
                    isPipeline = true
                }
                i++
            }

        }

        /* Assert No Filter Selected */
        await expect.soft(isModel).toBeTruthy()
        await expect.soft(isPipeline).toBeTruthy()

    })

    test('Model Details', async ({ page }) => {

        /* Model Details */
        console.log('[INFO] Model Details')
        await page.getByText(modelName).click()

        /* Assert Model Details */
        await expect.soft(page.getByRole("heading", { name: modelName })).toBeVisible()
        await expect.soft(page.getByText('Status: valid')).toBeVisible()
        await expect.soft(page.getByText('Type: file')).toBeVisible()
        await expect.soft(page.getByText('Date Updated:')).toBeVisible()
        await expect.soft(page.getByText('Size: 952')).toBeVisible()
        await expect.soft(page.getByText('Serializer: pickle')).toBeVisible()
        await expect.soft(page.getByText('Model Format: sklearn')).toBeVisible()
        await expect.soft(page.getByText('Model Type: classification')).toBeVisible()

    })

    test('Download Model File', async ({ modelPage, page }) => {

        console.log('[INFO] Model Page')
        await page.getByText(modelName).click()

        /* Download File */
        console.log('[INFO] Download Model File')
        const downloadPromise = page.waitForEvent('download')
        await modelPage.downloadModelFileButton.click()
        const download = await downloadPromise

        /* Assert Download Model File */
        await download.saveAs(root_path + download.suggestedFilename())
        await setTimeout(2000)

    })

    test('Edit Model Details', async ({ modelPage, page }) => {

        const editModelData = {
            modelName: "test",
            modelDescription: "test description",
            modelType: "Regression"
        }

        console.log('[INFO] Model Page')
        await page.getByText(modelName).click()
        await modelPage.editModelDetailsButton.click()

        console.log('[INFO] Edit Model Details')
        await modelPage.editModelName.fill(editModelData.modelName)
        await modelPage.editDescription.fill(editModelData.modelDescription)
        await modelPage.toggleModelType.click()
        await modelPage.editModelType.filter({ hasText: editModelData.modelType }).click()
        await modelPage.saveChangesButton.click()
        await expect.soft(page.getByText('Changes made successfully!')).toBeVisible()
        await modelPage.closeEditDialogBoxButton.click()

        /* Assert Edit Model Details */
        await page.getByRole("heading", { name: editModelData.modelName, exact: true }).click()

        await expect.soft(page.getByRole("heading", { name: editModelData.modelName, exact: true })).toBeVisible()
        await expect.soft(page.getByText('Model Type: ' + editModelData.modelType )).toBeVisible()

        console.log('[INFO] Revert Details')
        await modelPage.editModelDetailsButton.click()
        await modelPage.editModelName.fill(modelName)
        await modelPage.editDescription.fill(editModelData.modelDescription)
        await modelPage.toggleModelType.click()
        await modelPage.editModelType.filter({ hasText: 'Classification' }).click()
        await modelPage.saveChangesButton.click()
        await expect.soft(page.getByText('Changes made successfully!')).toBeVisible()
        await modelPage.closeEditDialogBoxButton.click()

    })

    test('Edit Model Dialog Box Cancel Button', async ({ modelPage, page }) => {

        console.log('[INFO] Model Page')
        await page.getByText(modelName).click()

        console.log('[INFO] Edit Model Details')
        await modelPage.editModelDetailsButton.click()
        await modelPage.cancelEditDialogBoxButton.click()

        /* Assert Edit Model Dialog Box Cancel Button */
        await expect.soft(page.getByRole('heading', { name: 'Edit Model' })).not.toBeVisible()

    })

    test('CheckBox', async ({ modelPage, page }) => {

        console.log('[INFO] CheckBox On Models')
        await modelPage.checkBox.nth(0).click()
        await modelPage.deleteButton.click()

        /* Assert CheckBox */
        console.log('[INFO] Delete Dialog Box')
        await expect.soft(page.getByRole('heading', { name: 'Confirm Deletion' })).toBeVisible()

    })

    test('Delete Button', async ({ modelPage, page }) => {

        console.log('[INFO] CheckBox On Models')
        const modelName = await page.locator('td:nth-child(2)').nth(1).textContent() // need to modify
        await modelPage.checkBox.nth(1).click()
        await modelPage.deleteButton.click()

        console.log('[INFO] Delete Model Dialog Box')
        await modelPage.deleteDialogBoxButton.click()

        /* Assert CheckBox */
        console.log('[INFO] Model ' + modelName + " Deleted")
        await expect.soft(page.getByText(modelName)).not.toBeVisible()
    })

    test('Delete Button Reference Test Results', async ({ modelPage, page }) => {

        console.log('[INFO] CheckBox On Models')
        const modelName = await page.locator('td:nth-child(2)').nth(1).textContent()
        await modelPage.checkBox.nth(1).click()
        await modelPage.deleteButton.click()

        console.log('[INFO] Delete Model Dialog Box')
        await modelPage.deleteDialogBoxButton.click()

        /* Assert CheckBox */
        console.log('[INFO] Model ' + modelName + " Not Deleted")
        await expect.soft(page.getByText('Test model cannot be deleted if there are test results referencing this model')).toBeVisible()
        await expect.soft(page.getByText(modelName)).toBeVisible()

    })

    test('Delete Model Dialog Box Cancel Button', async ({ modelPage, page }) => {

        console.log('[INFO] Model Page')
        await modelPage.checkBox.nth(1).click()
        await modelPage.deleteButton.click()

        console.log('[INFO] Delete Model Dialog Box')
        await modelPage.cancelDeleteDialogBoxButton.click()

        /* Assert Delete Model Dialog Box Cancel Button */
        await expect.soft(page.getByRole('heading', { name: 'Confirm Deletion' })).not.toBeVisible()

    })

    test('Number of Models Per Page Dropdown List', async ({ modelPage, page }) => {

        let dropdownListOption = '5', i = 0

        console.log('[INFO] Models Dropdown List')
        await modelPage.modelsDropdownList.selectOption(dropdownListOption)

        while (await page.locator('td:nth-child(2)').nth(i).isVisible()) {
            i++
        }

        /* Assert Models Dropdown List 5 */
        await expect.soft(i.toString()).toBe(dropdownListOption)
        await expect.soft(modelPage.page1Button).toBeVisible()
        await expect.soft(modelPage.page2Button).toBeVisible()

    })

    test('Number of Models Per Page Dropdown List All', async ({ modelPage }) => {

        console.log('[INFO] Models Dropdown List')
        await modelPage.modelsDropdownList.selectOption('All')

        /* Assert Models Dropdown List All */
        await expect.soft(modelPage.page1Button).not.toBeVisible()
        await expect.soft(modelPage.page2Button).not.toBeVisible()

    })
})