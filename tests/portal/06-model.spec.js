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

    test('Search Model With Search Term', async ({ modelPage, page }) => {

        /* Search Model */
        await modelPage.searchModel('pytorch')

        /* Assert Search Model */
        await expect.soft(page.getByText('sample_fashion_mnist_pytorch')).toBeVisible()

    })

    test('Upload Model Button', async ({ modelPage, page }) => {

        /* Upload Model Button */
        console.log('[INFO] Upload Model')
        await modelPage.uploadModelButton.click()

        /* Assert Upload Model Button */
        await expect.soft(page).toHaveURL(new RegExp(url + ":" + port_number + "/models/upload"))

    })

    test('Model Filter', async ({ modelPage, page }) => {

        /* Model Filter */
        console.log('[INFO] Model Filter')
        await modelPage.modelFilter.click()
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
        await modelPage.pipelineFilter.click()
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
        await download.saveAs(root_path + "/model/" + download.suggestedFilename())
        await setTimeout(1000)

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
        await expect.soft(page.getByText('Model Type: ' + editModelData.modelType)).toBeVisible()

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

    test('Select Models', async ({ modelPage, page }) => {

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

test.describe('Upload Model', () => {

    test.beforeEach(async ({ homePage, managePage, modelPage }) => {

        /* AI Verify Homepage */
        console.log('[INFO] Navigate to AI Verify Home Page')
        await homePage.goto(url + ":" + port_number)
        await expect.soft(homePage.aivlogo).toBeVisible({ timeout: 60000 })
        await homePage.manageButton.click()

        /* Manage Page */
        console.log('[INFO] Manage Page')
        await managePage.modelButton.click()

        /* Upload AI Model */
        console.log('[INFO] Upload AI Models')
        await modelPage.uploadModelButton.click()

    })

    test('Upload AI Model Option', async ({ modelPage, page }) => {

        console.log('[INFO] Upload AI Model')
        await modelPage.uploadAIModelButton.click()
        await modelPage.nextButton.click()

        /* Assert Upload AI Model Option */
        await expect.soft(page.getByRole('heading', { name: 'Add New AI Model > Upload' })).toBeVisible()

    })

    test('Upload Pipeline Option', async ({ modelPage, page }) => {

        console.log('[INFO] Upload Pipeline')
        await modelPage.uploadAIModelPipelineButton.click()
        await modelPage.nextButton.click()

        /* Assert Upload Pipeline Option */
        await expect.soft(page.getByRole('heading', { name: 'Add New AI Model > Upload Model Pipeline' })).toBeVisible()

    })

    test('Upload Valid Model File - Drag and Drop', async ({ modelPage }) => {

        console.log('[INFO] Upload AI Model')
        await modelPage.uploadAIModelButton.click()
        await modelPage.nextButton.click()

        let filePathStringArray = [root_path + '/model/' + modelName]
        await modelPage.dragAndDropFile(filePathStringArray)

    })

    test('Upload Valid Model File - Click To Browse', async ({ modelPage }) => {

        console.log('[INFO] Upload AI Model')
        await modelPage.uploadAIModelButton.click()
        await modelPage.nextButton.click()

        let filePathStringArray = [root_path + '/model/' + modelName]
        await modelPage.uploadFile(filePathStringArray)

    })

    test('Upload Model Than One Model File', async ({ modelPage }) => {

        console.log('[INFO] Upload AI Model')
        await modelPage.uploadAIModelButton.click()
        await modelPage.nextButton.click()

        let filePathStringArray = [root_path + '/model/' + modelName, root_path + '/model/sample_mc_toxic_sklearn_linear.LogisticRegression.sav']
        await modelPage.uploadFile(filePathStringArray)

    })

    test('Upload Invalid Model File', async ({ modelPage, page }) => {

        console.log('[INFO] Upload AI Model')
        await modelPage.uploadAIModelButton.click()
        await modelPage.nextButton.click()

        await page.locator('#fileInput').setInputFiles(root_path + '/data/sample_bc_credit_data.sav')

        await modelPage.modelTypeComboBox.click()
        await modelPage.modelTypeComboBox.selectOption('classification')

        await modelPage.uploadFileButton.click()

        /* Assert Uploading Invalid Files */
        await expect.soft(page.getByText('Error uploading files.')).toBeVisible()

    })

    test('Model Type Not Selected', async ({ modelPage, page }) => {

        console.log('[INFO] Upload AI Model')
        await modelPage.uploadAIModelButton.click()
        await modelPage.nextButton.click()

        await page.locator('#fileInput').setInputFiles(root_path + '/model/' + modelName)

        await modelPage.uploadFileButton.click()

        /* Assert Model Type Is Not Selected */
        await expect.soft(page.getByText("Files uploaded successfully!")).not.toBeVisible()

    })

    test('Remove Model File To Be Uploaded', async ({ modelPage, page }) => {

        console.log('[INFO] Upload AI Model')
        await modelPage.uploadAIModelButton.click()
        await modelPage.nextButton.click()

        await page.locator('#fileInput').setInputFiles(root_path + '/model/' + modelName)
        await modelPage.removeModelFile.nth(2).click()

        /* Assert Remove Model File To Be Uploaded */
        await expect.soft(page.getByText(modelName)).not.toBeVisible()

    })

    // test('Upload Valid Model Folder - Click To Browse', async ({ modelPage }) => {

    //     console.log('[INFO] Upload AI Model')
    //     await modelPage.uploadAIModelButton.click()
    //     await modelPage.nextButton.click()

    //     let folderPathStringArray = [root_path + "/model/tensorflow_tabular_sequential.sav"]
    //     await modelPage.uploadFolder(folderPathStringArray, "folderInput")

    // })

    test('Empty Model Folder Name', async ({ modelPage, page }) => {

        console.log('[INFO] Upload AI Model')
        await modelPage.uploadAIModelButton.click()
        await modelPage.nextButton.click()
        await modelPage.folderButton.click()
        await modelPage.page.locator('#folderInput').setInputFiles(root_path + "/model/tensorflow_tabular_sequential.sav")
        await modelPage.modelFolderNameTextBox.clear()
        await modelPage.modelTypeComboBox.click()
        await modelPage.modelTypeComboBox.selectOption('classification')
        await modelPage.uploadFolderButton.click()

        /* Assert Empty Model Folder Name */
        await expect.soft(page.getByText('Folder uploaded successfully!')).not.toBeVisible()

    })

    test('Upload More Than One Model Folder', async ({ modelPage, page }) => {

        console.log('[INFO] Upload AI Model')
        await modelPage.uploadAIModelButton.click()
        await modelPage.nextButton.click()
        await modelPage.folderButton.click()

        await modelPage.page.locator('#folderInput').setInputFiles(root_path + "/model/tensorflow_tabular_sequential.sav")
        await modelPage.page.locator('#folderInput').setInputFiles(root_path + "/model/tensorflow_tabular_sequential2.sav")

        /* Assert Upload More Than One Model Folder */
        await expect.soft(page.getByRole('heading', { name: 'tensorflow_tabular_sequential2.sav/ (2 files)'})).toBeVisible()
        await expect.soft(page.getByRole('heading', { name: 'tensorflow_tabular_sequential2.sav/variables/ (2 files)' })).toBeVisible()
        await expect.soft(page.getByRole('heading', { name: 'tensorflow_tabular_sequential.sav/ (2 files)'})).not.toBeVisible()
        await expect.soft(page.getByRole('heading', { name: 'tensorflow_tabular_sequential.sav/variables/ (2 files)' })).not.toBeVisible()

    })

    test('Upload Invalid Model Folder', async ({ modelPage, page }) => {

        console.log('[INFO] Upload AI Model')
        await modelPage.uploadAIModelButton.click()
        await modelPage.nextButton.click()
        await modelPage.folderButton.click()
        await modelPage.page.locator('#folderInput').setInputFiles(root_path + "/data/raw_fashion_image_10")
        await modelPage.modelTypeComboBox.click()
        await modelPage.modelTypeComboBox.selectOption('classification')
        await modelPage.uploadFolderButton.click()

        /* Assert Upload Invalid Model Folder */
        await expect.soft(await page.getByText('Error uploading folder "')).toBeVisible()

    })

    test('Model Type Not Selected Model Folder', async ({ modelPage, page }) => {

        console.log('[INFO] Upload AI Model')
        await modelPage.uploadAIModelButton.click()
        await modelPage.nextButton.click()
        await modelPage.folderButton.click()
        await modelPage.page.locator('#folderInput').setInputFiles(root_path + "/model/tensorflow_tabular_sequential.sav")
        await modelPage.uploadFolderButton.click()

        /* Assert Model Type Is Not Selected Model Folder */
        await expect.soft(page.getByText("Files uploaded successfully!")).not.toBeVisible()

    })

    test('Clear All Button', async ({ modelPage, page }) => {

        console.log('[INFO] Upload AI Model')
        await modelPage.uploadAIModelButton.click()
        await modelPage.nextButton.click()
        await modelPage.folderButton.click()
        await page.locator('#folderInput').setInputFiles(root_path + "/model/tensorflow_tabular_sequential.sav")
        await modelPage.clearAllButton.click()

        /* Assert Clear All Button */
        await expect.soft(page.getByText("tensorflow_tabular_sequential.sav")).not.toBeVisible()

    })

    test('Cancel Button Model Folder', async ({ modelPage }) => {

        console.log('[INFO] Upload AI Model')
        await modelPage.uploadAIModelButton.click()
        await modelPage.nextButton.click()
        await modelPage.folderButton.click()
        await modelPage.cancelButton.click()

        /* Assert Cancel Button Model Folder */
        await expect.soft(modelPage.uploadAIModelButton).toBeVisible()
        await expect.soft(modelPage.uploadAIModelPipelineButton).toBeVisible()
        
    })

    test('Upload Valid Pipeline Folder - Click To Browse', async ({ modelPage }) => {

        let folderPathStringArray = [root_path + '/pipeline/bc_image_face']

        console.log('[INFO] Upload AI Model Pipelines')
        await modelPage.uploadAIModelPipelineButton.click()
        await modelPage.nextButton.click()

        /* Assert Upload Valid Pipeline Folder - Click To Browse */
        await modelPage.uploadFolder(folderPathStringArray, "pipelineInput")
        
    })

    test('Upload More Than One Pipeline Folder', async ({ modelPage, page }) => {

        console.log('[INFO] Upload AI Model Pipelines')
        await modelPage.uploadAIModelPipelineButton.click()
        await modelPage.nextButton.click()

        await page.locator('#pipelineInput').setInputFiles(root_path + '/pipeline/bc_image_face')
        await page.locator('#pipelineInput').setInputFiles(root_path + '/pipeline/bc_tabular_credit')
        await modelPage.uploadFolderCloseDialogButton.click()

        /* Assert Upload More Than One Pipeline Folder */
        await expect.soft(page.getByRole('heading', { name: 'bc_tabular_credit'})).toBeVisible()
        await expect.soft(page.getByRole('heading', { name: 'bc_image_face'})).toBeVisible()

    })

    test('Upload Invalid Pipeline Folder', async ({ modelPage, page }) => {

        console.log('[INFO] Upload AI Model Pipelines')
        await modelPage.uploadAIModelPipelineButton.click()
        await modelPage.nextButton.click()

        await page.locator('#pipelineInput').setInputFiles(root_path + '/data/raw_fashion_image_10')
        await modelPage.uploadFolderCloseDialogButton.click()
        await modelPage.modelTypeComboBox.first().click()
        await modelPage.modelTypeComboBox.first().selectOption('classification')
        await modelPage.uploadPipelineButton.click()

        /* Assert Upload Invalid Pipeline Folder */
        await expect.soft(page.getByText('Upload completed: 0')).toBeVisible()

    })

    test('Pipeline Model Type Not Selected', async ({ modelPage, page }) => {

        console.log('[INFO] Upload AI Model Pipelines')
        await modelPage.uploadAIModelPipelineButton.click()
        await modelPage.nextButton.click()

        await page.locator('#pipelineInput').setInputFiles(root_path + '/data/raw_fashion_image_10')
        await modelPage.uploadFolderCloseDialogButton.click()
        await modelPage.modelTypeComboBox.first().click()
        await modelPage.uploadPipelineButton.click()

        /* Assert Upload Invalid Pipeline Folder */
        await expect.soft(page.getByText('Upload completed: 1 successful, 0 failed.')).not.toBeVisible()

    })

    test('Remove Button', async ({ modelPage, page }) => {

        console.log('[INFO] Upload AI Model Pipelines')
        await modelPage.uploadAIModelPipelineButton.click()
        await modelPage.nextButton.click()

        await page.locator('#pipelineInput').setInputFiles(root_path + '/pipeline/bc_image_face')
        await modelPage.uploadFolderCloseDialogButton.click()
        await modelPage.removeButton.click()

        /* Assert Remove Button */
        await expect.soft(page.getByRole('heading', { name: 'bc_image_face(2 files)' })).not.toBeVisible()

    })

    test('Clear All Button Pipeline Folder', async ({ modelPage, page }) => {

        console.log('[INFO] Upload AI Model Pipelines')
        await modelPage.uploadAIModelPipelineButton.click()
        await modelPage.nextButton.click()

        await page.locator('#pipelineInput').setInputFiles(root_path + '/pipeline/bc_image_face')
        await modelPage.uploadFolderCloseDialogButton.click()
        await modelPage.clearAllButton.click()

        /* Assert Clear All Button Pipeline Folder */
        await expect.soft(page.getByRole('heading', { name: 'bc_image_face(2 files)' })).not.toBeVisible()

    })

    test('Cancel Button Pipeline Folder', async ({ modelPage }) => {

        console.log('[INFO] Upload AI Model Pipelines')
        await modelPage.uploadAIModelPipelineButton.click()
        await modelPage.nextButton.click()
        await modelPage.cancelButton.click()

        /* Assert Cancel Button Pipeline Folder */
        await expect.soft(modelPage.uploadAIModelButton).toBeVisible()
        await expect.soft(modelPage.uploadAIModelPipelineButton).toBeVisible()

    })

})