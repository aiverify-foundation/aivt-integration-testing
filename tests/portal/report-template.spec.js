import { test, expect } from '../../fixtures/base-test'

const url = process.env.URL
const port_number = process.env.PORT_NUMBER

test.describe('Select Report Template', () => {

    test.beforeEach(async ({ homePage, createProjectPage, page }) => {

        /* Project Info */
        const projectInfo = {
            projectName: 'AI Verify Technical Tests Report for Classification Model',
            projectDescription: 'AI Verify Technical Tests Report for Classification Model',
            reportTitle: 'AI Verify Technical Tests Report for Classification Model',
            companyName: 'AI Verify Technical Tests Report for Classification Model'
        }

        /* AI Verify Homepage */
        console.log('[INFO] Navigate to AI Verify Home Page')
        await homePage.goto(url + ":" + port_number)
        await expect.soft(homePage.aivlogo).toBeVisible({ timeout: 60000 })
        await homePage.createProjectButton.click()

        await createProjectPage.createProject(projectInfo)

        /* Assert Report Template Is Clicked */
        await expect(page).toHaveURL(new RegExp("http://localhost:3000/templates"))

    })

    test('Create New Report Template Button', async ({ reportTemplatePage, page }) => {

        /* Report Template */
        console.log('[INFO] Create New Report Template')

        await reportTemplatePage.selectReportTemplate('Create New Report Template')

        /* Assert Report Template Is Clicked */
        await expect(page).toHaveURL(new RegExp("http://localhost:3000/canvas"))

    })

    test('Select Existing Template', async ({ reportTemplatePage, page }) => {

        /* Report Template */
        console.log('[INFO] Select Existing Template')

        await reportTemplatePage.selectReportTemplate('AI Verify Summary Report for Classification Model')

        /* Assert Report Template Is Clicked */
        await expect(page).toHaveURL(new RegExp("http://localhost:3000/project/select_data"))

    })

    test('Search Existing Template', async ({ reportTemplatePage, page }) => {

        /* Search Report Template */
        console.log('[INFO] Search Report Template')

        await reportTemplatePage.searchReportTemplate('AI Verify Summary Report for Classification Model')

        /* Assert Existing Report Template Is Displayed */
        await expect(page.getByRole('heading', { name: 'AI Verify Summary Report for Classification Model' })).toBeVisible()

    })

    test('Search Non-Existing Template', async ({ reportTemplatePage, page }) => {

        /* Search Report Template */
        console.log('[INFO] Search Report Template')

        await reportTemplatePage.searchReportTemplate('test')

        /* Assert Existing Report Template Is Displayed */
        await expect(page.getByText('CCCS')).toBeHidden()

    })

})