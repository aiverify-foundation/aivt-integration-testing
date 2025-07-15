import { test, expect } from '../../fixtures/base-test'

const url = process.env.URL
const port_number = process.env.PORT_NUMBER
const root_path = process.env.ROOT_PATH

test.describe('View Uploaded Template', () => {

    test.beforeEach(async ({ homePage, managePage }) => {

        /* AI Verify Homepage */
        console.log('[INFO] Navigate to AI Verify Home Page')
        await homePage.goto(url + ":" + port_number)
        await expect.soft(homePage.aivlogo).toBeVisible({ timeout: 60000 })
        await homePage.manageButton.click()

        /* Manage Page */
        console.log('[INFO] Manage Page')
        await managePage.reportTemplateButton.click()

    })

    test('Search Template Bar', async ({ reportTemplatePage }) => {

        console.log('[INFO] Report Template Page')
        
        console.log('[INFO] Search Template With Search Term')
        await reportTemplatePage.searchReportTemplate('veritas')

        let i = 0
        let isVeritas = true

        /* Assert Search Template Bar */
        while(await reportTemplatePage.reportTemplateName.nth(i).isVisible()) {
            let templateName = await reportTemplatePage.reportTemplateName.nth(i).textContent()
            if(!templateName.includes('Veritas')) {
                isVeritas = false
                break
            }
            i++
        }

        await expect.soft(isVeritas).toBeTruthy()

    })

    test('Upload Template Button', async ({ reportTemplatePage, page }) => {

        console.log('[INFO] Report Template Page')
        await reportTemplatePage.uploadTemplateButton.click()

        /* Assert Upload Template Button */
        await expect(page).toHaveURL(new RegExp(url + ":" + port_number + "/templates/upload"))

    })

    test('Clear Search Button', async ({ reportTemplatePage, page }) => {

        console.log('[INFO] Report Template Page')

        console.log('[INFO] Search Template With Search Term')
        await reportTemplatePage.searchReportTemplate('xxxyyy')
        await reportTemplatePage.clearSearchButton.click()

        /* Assert Clear Search Button */
        await expect.soft(page.getByText('xxxyyy')).not.toBeVisible()

    })

    test('View Report Template Button', async ({ reportTemplatePage, page }) => {

        console.log('[INFO] Report Template Page')

        console.log('[INFO] View Report Template')
        await reportTemplatePage.viewReportTemplateButton.click()

        /* Assert View Report Template Button */
        await expect(page).toHaveURL(new RegExp(url + ":" + port_number + "/canvas"))

    })

    test('Copy Report Template Button', async ({ reportTemplatePage, page }) => {

        console.log('[INFO] Report Template Page')

        console.log('[INFO] Copy Report Template')
        await reportTemplatePage.copyReportTemplateButton.click()
        await expect.soft(page.getByRole('heading', { name: 'Template Cloned Successfully' })).toBeVisible()
        await page.getByRole('button', { name: 'OK' }).click();

        /* Assert Copy Report Template Button */
        while (!(await page.getByRole('heading', { name: 'Copy of AI Verify Summary' }).nth(0).isVisible())) {
            await page.mouse.wheel(0, 600)
        }

    })

    test('Edit Report Template Mode Button', async ({ reportTemplatePage, canvasPage}) => {

        console.log('[INFO] Report Template Page')

        console.log('[INFO] View Report Template')
        await reportTemplatePage.viewReportTemplateButton.click()

        console.log('[INFO] Edit Mode')
        await reportTemplatePage.editModeButton.click()

        /* Assert Edit Mode */
        await expect.soft(canvasPage.addPageButton).toBeVisible()
        await expect.soft(reportTemplatePage.viewModeButton).toBeVisible()

    })

    test('View Report Template Mode Button', async ({ reportTemplatePage, canvasPage }) => {

        console.log('[INFO] Report Template Page')

        console.log('[INFO] View Report Template')
        await reportTemplatePage.viewReportTemplateButton.click()

        console.log('[INFO] Edit Mode')
        await reportTemplatePage.editModeButton.click()

        console.log('[INFO] View Mode')
        await reportTemplatePage.viewModeButton.click()

        /* Assert View Mode */
        await expect.soft(canvasPage.addPageButton).not.toBeVisible()
        await expect.soft(reportTemplatePage.editModeButton).toBeVisible()

    })

})

test.describe('Upload Report Template', () => {

    test.beforeEach(async ({ homePage, managePage, reportTemplatePage }) => {

        /* AI Verify Homepage */
        console.log('[INFO] Navigate to AI Verify Home Page')
        await homePage.goto(url + ":" + port_number)
        await expect.soft(homePage.aivlogo).toBeVisible({ timeout: 60000 })
        await homePage.manageButton.click()

        /* Manage Page */
        console.log('[INFO] Manage Page')
        await managePage.reportTemplateButton.click()

        /* Report Template Page */
        console.log('[INFO] Report Template Page')
        await reportTemplatePage.uploadTemplateButton.click()

    })

    test('Upload Report Template - Drag and Drop', async ({ reportTemplatePage, page }) => {

        /* Upload Report Template */
        let filePathStringArray = [root_path + "/template/templates.zip"]
        
        console.log('[INFO] Upload Report Template')
        await reportTemplatePage.dragAndDropFile(filePathStringArray)

        /* Assert Upload Report Template - Drag and Drop */
        await expect.soft(page.getByText('Upload Successful!')).toBeVisible()

    })

    test('Upload Report Template - Click To Browse', async ({ reportTemplatePage, page }) => {

        /* Upload Report Template */
        let filePathStringArray = [root_path + "/template/templates.zip"]
        
        console.log('[INFO] Upload Report Template')
        await reportTemplatePage.uploadFile(filePathStringArray)
        await reportTemplatePage.confirmUpload.click()

        /* Assert Upload Report Template - Click To Browse */
        await expect.soft(page.getByText('Upload Successful!')).toBeVisible()

    })

    test('Upload More Than One Report Template', async ({ reportTemplatePage, page }) => {

        /* Upload Multiple Report Template */
        let filePathStringArray = [
            root_path + "/template/templates.zip",
            root_path + "/template/templates2.zip"
        ]
        
        console.log('[INFO] Upload Report Template')
        await reportTemplatePage.uploadFile(filePathStringArray)
        await reportTemplatePage.confirmUpload.click()

        /* Assert Upload Report Template - Drag and Drop */
        await expect.soft(page.getByText('Upload Successful!')).toBeVisible()

    })

    test('Upload Invalid Report Template File', async ({ reportTemplatePage, page }) => {

        /* Upload Invalid Report Template File */
        let filePathStringArray = [root_path + "/test_results/output-robustness.zip"]
        
        console.log('[INFO] Upload Report Template')
        await reportTemplatePage.uploadFile(filePathStringArray)

        /* Assert Upload Invalid Report Template File */
        await expect.soft(page.getByText('No valid ZIP files were processed. Please check file contents and try again.')).toBeVisible()

    })

    test('Remove Report Template File To Be Uploaded', async ({ reportTemplatePage, page }) => {

        /* Upload Report Template*/
        let filePathStringArray = [root_path + "/template/templates.zip"]
        
        console.log('[INFO] Upload Report Template')
        await reportTemplatePage.uploadFile(filePathStringArray)
        await reportTemplatePage.removeReportTemplateFileButton.click()

        /* Assert Remove Report Template File To Be Uploaded */
        await expect.soft(page.getByText('templates.zip')).not.toBeVisible()

    })
})