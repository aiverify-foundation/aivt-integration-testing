import { test, expect } from '../../fixtures/base-test'

const url = process.env.URL
const port_number = process.env.PORT_NUMBER
const root_path = process.env.ROOT_PATH

test.describe('View All Plugins', () => {

    test.beforeEach(async ({ homePage, managePage }) => {

        /* AI Verify Homepage */
        console.log('[INFO] Navigate to AI Verify Home Page')
        await homePage.goto(url + ":" + port_number)
        await expect.soft(homePage.aivlogo).toBeVisible({ timeout: 60000 })
        await homePage.manageButton.click()

        /* Manage Page */
        console.log('[INFO] Manage Page')
        await managePage.pluginButton.click()

    })

    test('Templates Filter', async ({ pluginPage, page }) => {

        /* Plugin Page */
        console.log('[INFO] Plugin Page')
        await pluginPage.templateFilter.click()

        /* Assert Templates Filter */
        await expect.soft(page.getByRole('heading', { name: 'AI Verify Veritas' })).toBeVisible()
        await expect.soft(page.getByRole('heading', { name: 'AI Verify Reports' })).toBeVisible()
        await page.getByRole('heading', { name: 'AI Verify Veritas' }).click()
        await expect.soft(page.getByRole('heading', { name: 'Partial Dependence Plot' })).not.toBeVisible()
        await expect.soft(page.getByRole('heading', { name: 'Fairness for Classification' })).not.toBeVisible()
        await expect.soft(page.getByRole('heading', { name: 'Fairness for Regression' })).not.toBeVisible()
        await expect.soft(page.getByRole('heading', { name: 'SHAP Toolbox' })).not.toBeVisible()
        await expect.soft(page.getByRole('heading', { name: 'AI Verify Stock Decorators' })).not.toBeVisible()
        await expect.soft(page.getByRole('heading', { name: 'Image Corruption Toolbox' })).not.toBeVisible()
        await expect.soft(page.getByRole('heading', { name: 'Robustness Toolbox' })).not.toBeVisible()
        await expect.soft(page.getByRole('heading', { name: 'Accumulated Local Effect' })).not.toBeVisible()
        await expect.soft(page.getByRole('heading', { name: 'AI Verify Process Checklist' })).not.toBeVisible()

    })

    test('Widget Filter', async ({ pluginPage, page }) => {

        /* Plugin Page */
        console.log('[INFO] Plugin Page')
        await pluginPage.widgetFilter.click()

        /* Assert Widget Filter */
        await expect.soft(page.getByRole('heading', { name: 'AI Verify Veritas' })).toBeVisible()
        await expect.soft(page.getByRole('heading', { name: 'AI Verify Reports' })).toBeVisible()
        await page.getByRole('heading', { name: 'AI Verify Veritas' }).click()
        await expect.soft(page.getByRole('heading', { name: 'Partial Dependence Plot' })).toBeVisible()
        await expect.soft(page.getByRole('heading', { name: 'Fairness for Classification' })).toBeVisible()
        await expect.soft(page.getByRole('heading', { name: 'Fairness for Regression' })).toBeVisible()
        await expect.soft(page.getByRole('heading', { name: 'SHAP Toolbox' })).toBeVisible()
        await expect.soft(page.getByRole('heading', { name: 'AI Verify Stock Decorators' })).toBeVisible()
        await expect.soft(page.getByRole('heading', { name: 'Image Corruption Toolbox' })).toBeVisible()
        await expect.soft(page.getByRole('heading', { name: 'Robustness Toolbox' })).toBeVisible()
        await expect.soft(page.getByRole('heading', { name: 'Accumulated Local Effect' })).toBeVisible()
        await expect.soft(page.getByRole('heading', { name: 'AI Verify Process Checklist' })).toBeVisible()

    })

    test('Algorithm Filter', async ({ pluginPage, page }) => {

        /* Plugin Page */
        console.log('[INFO] Plugin Page')
        await pluginPage.algorithmFilter.click()

        /* Assert Algorithm Filter */
        await expect.soft(page.getByRole('heading', { name: 'AI Verify Veritas' })).toBeVisible()
        await expect.soft(page.getByRole('heading', { name: 'AI Verify Reports' })).not.toBeVisible()
        await page.getByRole('heading', { name: 'AI Verify Veritas' }).click()
        await expect.soft(page.getByRole('heading', { name: 'Partial Dependence Plot' })).toBeVisible()
        await expect.soft(page.getByRole('heading', { name: 'Fairness for Classification' })).toBeVisible()
        await expect.soft(page.getByRole('heading', { name: 'Fairness for Regression' })).toBeVisible()
        await expect.soft(page.getByRole('heading', { name: 'SHAP Toolbox' })).toBeVisible()
        await expect.soft(page.getByRole('heading', { name: 'AI Verify Stock Decorators' })).not.toBeVisible()
        await expect.soft(page.getByRole('heading', { name: 'Image Corruption Toolbox' })).toBeVisible()
        await expect.soft(page.getByRole('heading', { name: 'Robustness Toolbox' })).toBeVisible()
        await expect.soft(page.getByRole('heading', { name: 'Accumulated Local Effect' })).toBeVisible()
        await expect.soft(page.getByRole('heading', { name: 'AI Verify Process Checklist' })).not.toBeVisible()

    })

    test('Input Block Filter', async ({ pluginPage, page }) => {

        /* Plugin Page */
        console.log('[INFO] Plugin Page')
        await pluginPage.inputBlockFilter.click()

        /* Assert Input Block Filter */
        await expect.soft(page.getByRole('heading', { name: 'AI Verify Veritas' })).toBeVisible()
        await expect.soft(page.getByRole('heading', { name: 'AI Verify Reports' })).not.toBeVisible()
        await page.getByRole('heading', { name: 'AI Verify Veritas' }).click()
        await expect.soft(page.getByRole('heading', { name: 'Partial Dependence Plot' })).not.toBeVisible()
        await expect.soft(page.getByRole('heading', { name: 'Fairness for Classification' })).toBeVisible()
        await expect.soft(page.getByRole('heading', { name: 'Fairness for Regression' })).not.toBeVisible()
        await expect.soft(page.getByRole('heading', { name: 'SHAP Toolbox' })).not.toBeVisible()
        await expect.soft(page.getByRole('heading', { name: 'AI Verify Stock Decorators' })).not.toBeVisible()
        await expect.soft(page.getByRole('heading', { name: 'Image Corruption Toolbox' })).not.toBeVisible()
        await expect.soft(page.getByRole('heading', { name: 'Robustness Toolbox' })).not.toBeVisible()
        await expect.soft(page.getByRole('heading', { name: 'Accumulated Local Effect' })).not.toBeVisible()
        await expect.soft(page.getByRole('heading', { name: 'AI Verify Process Checklist' })).toBeVisible()

    })

    test('Regression Tag', async ({ pluginPage, page }) => {

        /* Plugin Page */
        console.log('[INFO] Plugin Page')
        await pluginPage.tagsDropDownList.click()
        await page.getByLabel('Options for Select').getByText('regression').click()

        /* Assert Regression Tag */
        await expect.soft(page.getByRole('heading', { name: 'Fairness for Regression' })).toBeVisible()
        await page.getByRole('heading', { name: 'Fairness for Regression' }).click()
        await expect.soft(page.getByRole('heading', { name: 'AI Verify Veritas' })).not.toBeVisible()
        await expect.soft(page.getByRole('heading', { name: 'AI Verify Reports' })).not.toBeVisible()
        await expect.soft(page.getByRole('heading', { name: 'Partial Dependence Plot' })).not.toBeVisible()
        await expect.soft(page.getByRole('heading', { name: 'Fairness for Classification' })).toBeVisible()
        await expect.soft(page.getByRole('heading', { name: 'SHAP Toolbox' })).not.toBeVisible()
        await expect.soft(page.getByRole('heading', { name: 'AI Verify Stock Decorators' })).not.toBeVisible()
        await expect.soft(page.getByRole('heading', { name: 'Image Corruption Toolbox' })).not.toBeVisible()
        await expect.soft(page.getByRole('heading', { name: 'Robustness Toolbox' })).not.toBeVisible()
        await expect.soft(page.getByRole('heading', { name: 'Accumulated Local Effect' })).not.toBeVisible()
        await expect.soft(page.getByRole('heading', { name: 'AI Verify Process Checklist' })).not.toBeVisible()

    })

    test('Fairness Tag', async ({ pluginPage, page }) => {

        /* Plugin Page */
        console.log('[INFO] Plugin Page')
        await pluginPage.tagsDropDownList.click()
        await page.getByText('fairness', { exact: true }).click()

        /* Assert Fairness Tag */
        await expect.soft(page.getByRole('heading', { name: 'Fairness for Regression' })).toBeVisible()
        await page.getByRole('heading', { name: 'Fairness for Regression' }).click()
        await expect.soft(page.getByRole('heading', { name: 'AI Verify Veritas' })).not.toBeVisible()
        await expect.soft(page.getByRole('heading', { name: 'AI Verify Reports' })).not.toBeVisible()
        await expect.soft(page.getByRole('heading', { name: 'Partial Dependence Plot' })).not.toBeVisible()
        await expect.soft(page.getByRole('heading', { name: 'Fairness for Classification' })).toBeVisible()
        await expect.soft(page.getByRole('heading', { name: 'SHAP Toolbox' })).not.toBeVisible()
        await expect.soft(page.getByRole('heading', { name: 'AI Verify Stock Decorators' })).not.toBeVisible()
        await expect.soft(page.getByRole('heading', { name: 'Image Corruption Toolbox' })).not.toBeVisible()
        await expect.soft(page.getByRole('heading', { name: 'Robustness Toolbox' })).not.toBeVisible()
        await expect.soft(page.getByRole('heading', { name: 'Accumulated Local Effect' })).not.toBeVisible()
        await expect.soft(page.getByRole('heading', { name: 'AI Verify Process Checklist' })).not.toBeVisible()

    })

    test('Multiclassification Tag', async ({ pluginPage, page }) => {

        console.log('[INFO] Plugin Page')
        await pluginPage.tagsDropDownList.click()
        await page.getByText('multiclass classification').click()

        /* Assert Multiclassification Tag */
        await expect.soft(page.getByRole('heading', { name: 'Fairness for Classification' })).toBeVisible()
        await page.getByRole('heading', { name: 'Fairness for Classification' }).click()
        await expect.soft(page.getByRole('heading', { name: 'AI Verify Veritas' })).not.toBeVisible()
        await expect.soft(page.getByRole('heading', { name: 'AI Verify Reports' })).not.toBeVisible()
        await expect.soft(page.getByRole('heading', { name: 'Partial Dependence Plot' })).not.toBeVisible()
        await expect.soft(page.getByRole('heading', { name: 'Fairness for Regression' })).not.toBeVisible()
        await expect.soft(page.getByRole('heading', { name: 'SHAP Toolbox' })).not.toBeVisible()
        await expect.soft(page.getByRole('heading', { name: 'AI Verify Stock Decorators' })).not.toBeVisible()
        await expect.soft(page.getByRole('heading', { name: 'Image Corruption Toolbox' })).not.toBeVisible()
        await expect.soft(page.getByRole('heading', { name: 'Robustness Toolbox' })).not.toBeVisible()
        await expect.soft(page.getByRole('heading', { name: 'Accumulated Local Effect' })).not.toBeVisible()
        await expect.soft(page.getByRole('heading', { name: 'AI Verify Process Checklist' })).not.toBeVisible()

    })

    test('Binary Classification Tag', async ({ pluginPage, page }) => {

        console.log('[INFO] Plugin Page')
        await pluginPage.tagsDropDownList.click()
        await page.getByText('binary classification').click();

        /* Assert Binary Classification Tag */
        await expect.soft(page.getByRole('heading', { name: 'Fairness for Classification' })).toBeVisible()
        await page.getByRole('heading', { name: 'Fairness for Classification' }).click()
        await expect.soft(page.getByRole('heading', { name: 'AI Verify Veritas' })).not.toBeVisible()
        await expect.soft(page.getByRole('heading', { name: 'AI Verify Reports' })).not.toBeVisible()
        await expect.soft(page.getByRole('heading', { name: 'Partial Dependence Plot' })).not.toBeVisible()
        await expect.soft(page.getByRole('heading', { name: 'Fairness for Regression' })).not.toBeVisible()
        await expect.soft(page.getByRole('heading', { name: 'SHAP Toolbox' })).not.toBeVisible()
        await expect.soft(page.getByRole('heading', { name: 'AI Verify Stock Decorators' })).not.toBeVisible()
        await expect.soft(page.getByRole('heading', { name: 'Image Corruption Toolbox' })).not.toBeVisible()
        await expect.soft(page.getByRole('heading', { name: 'Robustness Toolbox' })).not.toBeVisible()
        await expect.soft(page.getByRole('heading', { name: 'Accumulated Local Effect' })).not.toBeVisible()
        await expect.soft(page.getByRole('heading', { name: 'AI Verify Process Checklist' })).not.toBeVisible()

    })

    test('Search Plugin By Search Term', async ({ pluginPage, page }) => {

        console.log('[INFO] Plugin Page')
        await pluginPage.searchBar.fill('Checklist')

        /* Assert Search Bar By Search Term */
        await expect.soft(page.getByRole('heading', { name: 'AI Verify Veritas' })).toBeVisible()
        await expect.soft(page.getByRole('heading', { name: 'AI Verify Process Checklist' })).toBeVisible()
        await expect.soft(page.getByRole('heading', { name: 'AI Verify Reports' })).toBeVisible()
        await page.getByRole('heading', { name: 'AI Verify Reports' }).click()
        await expect.soft(page.getByRole('heading', { name: 'Fairness for Classification' })).not.toBeVisible()
        await expect.soft(page.getByRole('heading', { name: 'Partial Dependence Plot' })).not.toBeVisible()
        await expect.soft(page.getByRole('heading', { name: 'Fairness for Regression' })).not.toBeVisible()
        await expect.soft(page.getByRole('heading', { name: 'SHAP Toolbox' })).not.toBeVisible()
        await expect.soft(page.getByRole('heading', { name: 'AI Verify Stock Decorators' })).not.toBeVisible()
        await expect.soft(page.getByRole('heading', { name: 'Image Corruption Toolbox' })).not.toBeVisible()
        await expect.soft(page.getByRole('heading', { name: 'Robustness Toolbox' })).not.toBeVisible()
        await expect.soft(page.getByRole('heading', { name: 'Accumulated Local Effect' })).not.toBeVisible()

    })

    test('Upload Plugin Button', async ({ pluginPage, page }) => {

        console.log('[INFO] Plugin Page')
        await pluginPage.uploadPluginButton.click()

        /* Assert Plugin Details */
        await expect.soft(page).toHaveURL(new RegExp(url + ":" + port_number + "/plugins/upload"))
        
    })

    test('Uninstall Plugin', async ({ pluginPage, page }) => {

        console.log('[INFO] Plugin Page')
        await pluginPage.uninstallPlugin('CCCS Process Checklist')

        /* Assert Uninstalled Plugin */
        await expect(page.getByText('CCCS Process Checklist')).not.toBeVisible()

    })

})

test.describe('Upload Plugins', () => {

    test.beforeEach(async ({ homePage, managePage, pluginPage }) => {

        /* AI Verify Homepage */
        console.log('[INFO] Navigate to AI Verify Home Page')
        await homePage.goto(url + ":" + port_number)
        await expect.soft(homePage.aivlogo).toBeVisible({ timeout: 60000 })
        await homePage.manageButton.click()

        /* Manage Page */
        console.log('[INFO] Manage Page')
        await managePage.pluginButton.click()

        /* Plugin Page */
        console.log('[INFO] Plugin Page')
        await pluginPage.uploadPluginButton.click()

    })

    test('Upload Plugin Using Valid Zip Plugin File - Drag and Drop', async ({ pluginPage, page }) => {

        /* Upload Plugin Using Valid Zip Plugin File */
        console.log('[INFO] Upload Plugins')
        let filePathStringArray = [root_path + "/third-party-plugins/cccs_plugins/cccs_explainability_2.0.zip"]
        await pluginPage.dragAndDropFile(filePathStringArray)
        await pluginPage.confirmUploadButton.click()

        /* Assert Upload Plugin Using Valid Zip Plugin File - Drag And Drop */
        await expect.soft(page.getByText('Upload Successful!')).toBeVisible({ timeout: 20000 })
        await pluginPage.closeDialogBoxButton.click()
        await pluginPage.backButton.click()
        await expect.soft(page.getByRole('heading', { name: 'CCCS Explainability Technical' })).toBeVisible()
        
    })

    test('Upload Plugin Using Valid Zip Plugin File - Click To Browse', async ({ pluginPage, page }) => {

        /* Upload Plugin Using Valid Zip Plugin File */
        console.log('[INFO] Upload Plugins')
        let filePathStringArray = [root_path + "/third-party-plugins/cccs_plugins/cccs_explainability_2.0.zip"]
        await pluginPage.uploadFile(filePathStringArray)
        await pluginPage.confirmUploadButton.click()

        /* Assert Upload Plugin Using Valid Zip Plugin File - Click To Browse */
        await expect.soft(page.getByText('Upload Successful!')).toBeVisible({ timeout: 20000 })
        await pluginPage.closeDialogBoxButton.click()
        await pluginPage.backButton.click()
        await expect.soft(page.getByRole('heading', { name: 'CCCS Explainability Technical' })).toBeVisible()
        
    })

    test('Upload More Than One Plugin', async ({ pluginPage, page }) => {

        /* Upload Plugin Using Valid Zip Plugin File */
        console.log('[INFO] Upload Plugins')
        let filePathStringArray = [
            root_path + "/third-party-plugins/cccs_plugins/cccs_explainability_2.0.zip",
            root_path + "/third-party-plugins/cccs_plugins/cccs_fairness_classification_2.0.zip",
            root_path + "/third-party-plugins/cccs_plugins/cccs_process_checklist.zip",
            root_path + "/third-party-plugins/cccs_plugins/cccs_report_template.zip"
        ]
        await pluginPage.uploadFile(filePathStringArray)
        await pluginPage.confirmUploadButton.click()

        /* Assert Upload More Than One Plugin File */
        await expect.soft(page.getByText('Upload Successful!')).toBeVisible({ timeout: 20000 })
        await pluginPage.closeDialogBoxButton.click()
        await pluginPage.backButton.click()
        await pluginPage.searchBar.fill('CCCS')

        await expect.soft(page.getByRole('heading', { name: 'CCCS Explainability Technical' })).toBeVisible()
        await expect.soft(page.getByRole('heading', { name: 'CCCS Fairness Technical Test' })).toBeVisible()
        await expect.soft(page.getByRole('heading', { name: 'CCCS Process Checklist' })).toBeVisible()
        await expect.soft(page.getByRole('heading', { name: 'CCCS AIM toolkit' })).toBeVisible()
        
    })

    test('Upload More Than 10 Plugins', async ({ pluginPage, page }) => {

        /* Upload Plugin Using Valid Zip Plugin File */
        console.log('[INFO] Upload Plugins')
        let filePathStringArray = [
            root_path + "/third-party-plugins/cccs_plugins/cccs_explainability_2.0.zip",
            root_path + "/third-party-plugins/cccs_plugins/cccs_fairness_classification_2.0.zip",
            root_path + "/third-party-plugins/cccs_plugins/cccs_process_checklist.zip",
            root_path + "/third-party-plugins/cccs_plugins/cccs_report_template.zip",
            root_path + "/third-party-plugins/cccs_plugins/cccs_explainability_2.0_copy.zip",
            root_path + "/third-party-plugins/cccs_plugins/cccs_fairness_classification_2.0_copy.zip",
            root_path + "/third-party-plugins/cccs_plugins/cccs_process_checklist_copy.zip",
            root_path + "/third-party-plugins/cccs_plugins/cccs_report_template_copy.zip",
            root_path + "/third-party-plugins/cccs_plugins/cccs_explainability_2.0_copy1.zip",
            root_path + "/third-party-plugins/cccs_plugins/cccs_fairness_classification_2.0_copy1.zip",
            root_path + "/third-party-plugins/cccs_plugins/cccs_process_checklist_copy1.zip",
            root_path + "/third-party-plugins/cccs_plugins/cccs_report_template_copy1.zip"
        ]
        await pluginPage.uploadFile(filePathStringArray)
        await pluginPage.confirmUploadButton.click()

        /* Assert Upload More Than 10 Plugin Files*/
        await expect.soft(page.getByText('Upload Successful!')).toBeVisible({ timeout: 20000 })
        await pluginPage.closeDialogBoxButton.click()
    })

    test('Upload Invalid Plugin Format', async ({ pluginPage, page }) => {

        console.log('[INFO] Upload Plugins')
        let filePathStringArray = [
            root_path + "/data/sample_bc_credit_data.sav",
        ]
        await pluginPage.uploadFile(filePathStringArray)
        await pluginPage.confirmUploadButton.click()

        /* Assert Invalid Plugin Format */
        await expect.soft(page.getByText('Upload failed: An unexpected error occurred during upload.')).toBeVisible()

    })

    test('Upload Invalid Zip Structure', async ({ pluginPage }) => {

        console.log('[INFO] Upload Plugins')
        let filePathStringArray = [
            root_path + "/third-party-plugins/cccs_plugins/invalidZip.zip",
        ]
        await pluginPage.uploadFile(filePathStringArray)
        await pluginPage.confirmUploadButton.click()

        /* Assert Invalid Plugin Format */
        await expect.soft(page.getByText('Upload failed: An unexpected error occurred during upload.')).toBeVisible()

    })

    test('Upload Plugin With Invalid Plugin Meta JSON', async ({ pluginPage, page }) => {

        console.log('[INFO] Upload Plugins')
        let filePathStringArray = [
            root_path + "/third-party-plugins/cccs_plugins/invalidPluginMetaJson.zip",
        ]
        await pluginPage.uploadFile(filePathStringArray)
        await pluginPage.confirmUploadButton.click()

        /* Assert Invalid Plugin Format */
        await expect.soft(page.getByText('Upload failed: An unexpected error occurred during upload.')).toBeVisible()

    })

    test('Remove Plugin To Be Uploaded', async ({ pluginPage, page }) => {

        /* Upload Plugin Using Valid Zip Plugin File */
        console.log('[INFO] Upload Plugins')
        let filePathStringArray = [root_path + "/third-party-plugins/cccs_plugins/cccs_explainability_2.0.zip"]
        await pluginPage.uploadFile(filePathStringArray)
        await pluginPage.removePluginFileButton.click()

        /* Assert Remove Plugin To Be Uploaded */
        await expect.soft(page.getByText('cccs_explainability_2.0.zip')).not.toBeVisible()
    })
        
})