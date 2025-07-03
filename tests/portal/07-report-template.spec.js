import { test, expect } from '../../fixtures/base-test'

const url = process.env.URL
const port_number = process.env.PORT_NUMBER

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
        await reportTemplatePage.searchReportTemplate('')

    })

    test('Upload Template Button', async ({ reportTemplatePage, page }) => {

        console.log('[INFO] Report Template Page')
        await reportTemplatePage.uploadTemplateButton.click()

        /* Assert Upload Template Button */
        await expect(page).toHaveURL(new RegExp(url + ":" + port_number + "/templates/upload"))

    })

    test('Clear Search Button', async ({ reportTemplatePage }) => {

        console.log('[INFO] Report Template Page')

        console.log('[INFO] Search Template With Search Term')
        await reportTemplatePage.searchReportTemplate('')
        await reportTemplatePage.clearSearchButton.click()

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

        /* Assert Copy Report Template Button */
        while (!(await page.getByRole('heading', { name: 'Copy of AI Verify Summary' }).nth(0).isVisible())) {
            await page.mouse.wheel(0, 600)
          }

    })

    test('Edit Mode Button', async ({ reportTemplatePage, canvasPage, page }) => {

        console.log('[INFO] Report Template Page')

        console.log('[INFO] View Report Template')
        await reportTemplatePage.viewReportTemplateButton.click()

        console.log('[INFO] Edit Mode')
        await reportTemplatePage.editModeButton.click()

        /* Assert Edit Mode */
        await expect.soft(canvasPage.addPageButton).toBeVisible()
        await expect.soft(reportTemplatePage.viewModeButton).toBeVisible()

    })

    test('View Mode Button', async ({ reportTemplatePage, canvasPage }) => {

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