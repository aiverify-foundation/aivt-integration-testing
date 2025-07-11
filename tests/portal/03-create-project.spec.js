import { test, expect } from '../../fixtures/base-test'

const url = process.env.URL
const port_number = process.env.PORT_NUMBER

test.describe('Create Project', () => {

    test.beforeEach(async ({ homePage }) => {

        /* AI Verify Homepage */
        console.log('[INFO] Navigate to AI Verify Home Page')
        await homePage.goto(url + ":" + port_number)
        await expect.soft(homePage.aivlogo).toBeVisible({ timeout: 60000 })
        await homePage.createProjectButton.click()

    })

    test('All Project Details Completed', async ({ createProjectPage, page }) => {

        /* Create Project Page */
        console.log('[INFO] Create Project Page')

        /* Project Info */
        const projectInfo = {
            projectName: 'AI Verify Technical Tests Report for Classification Model',
            projectDescription: 'AI Verify Technical Tests Report for Classification Model',
            reportTitle: 'AI Verify Technical Tests Report for Classification Model',
            companyName: 'AI Verify Technical Tests Report for Classification Model'
        }

        await createProjectPage.createProject(projectInfo)

        /* Assert Next Button Is Clicked */
        await expect(page).toHaveURL(new RegExp(url + ":" + port_number + "/templates"))

    })

    test('No Project Name', async({ createProjectPage }) => {

        /* Create Project Page */
        console.log('[INFO] Create Project Page')

        /* Project Info */
        const projectInfo = {
            projectName: '',
            projectDescription: 'AI Verify Technical Tests Report for Classification Model',
            reportTitle: 'AI Verify Technical Tests Report for Classification Model',
            companyName: 'AI Verify Technical Tests Report for Classification Model'
        }

        /* Assert Next Button Is Disabled */
        await createProjectPage.createProjectError(projectInfo, url, port_number)

    })

    test('No Project Description', async({ createProjectPage, page }) => {

        /* Create Project Page */
        console.log('[INFO] Create Project Page')

        /* Project Info */
        const projectInfo = {
            projectName: 'AI Verify Technical Tests Report for Classification Model',
            projectDescription: '',
            reportTitle: 'AI Verify Technical Tests Report for Classification Model',
            companyName: 'AI Verify Technical Tests Report for Classification Model'
        }

        /* Assert Next Button Is Disabled */
        await createProjectPage.createProjectError(projectInfo, url, port_number)

    })

    test('No Report Title', async({ createProjectPage }) => {

        /* Create Project Page */
        console.log('[INFO] Create Project Page')

        /* Project Info */
        const projectInfo = {
            projectName: 'AI Verify Technical Tests Report for Classification Model',
            projectDescription: 'AI Verify Technical Tests Report for Classification Model',
            reportTitle: '',
            companyName: 'AI Verify Technical Tests Report for Classification Model'
        }

        /* Assert Next Button Is Disabled */
        await createProjectPage.createProjectError(projectInfo, url, port_number)

    })

    test('No Company Name', async({ createProjectPage, page }) => {

        /* Create Project Page */
        console.log('[INFO] Create Project Page')

        /* Project Info */
        const projectInfo = {
            projectName: 'AI Verify Technical Tests Report for Classification Model',
            projectDescription: 'AI Verify Technical Tests Report for Classification Model',
            reportTitle: 'AI Verify Technical Tests Report for Classification Model',
            companyName: ''
        }

        /* Assert Next Button Is Disabled */
        await createProjectPage.createProjectError(projectInfo, url, port_number)

    })

})

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
        await expect(page).toHaveURL(new RegExp(url + ":" + port_number + "/templates"))

    })

    test('Create New Report Template Button', async ({ reportTemplatePage, page }) => {

        /* Report Template */
        console.log('[INFO] Create New Report Template')

        await reportTemplatePage.selectReportTemplate('Create New Report Template')

        /* Assert Report Template Is Clicked */
        await expect(page).toHaveURL(new RegExp(url + ":" + port_number + "/canvas"))

    })

    test('Select Existing Template', async ({ reportTemplatePage, page }) => {

        /* Report Template */
        console.log('[INFO] Select Existing Template')

        await reportTemplatePage.selectReportTemplate('AI Verify Summary Report for Classification Model')

        /* Assert Report Template Is Clicked */
        await expect(page).toHaveURL(new RegExp(url + ":" + port_number + "/project/select_data"))

    })

    test('Search Existing Template', async ({ reportTemplatePage, page }) => {

        /* Search Report Template */
        console.log('[INFO] Search Report Template')

        await reportTemplatePage.searchReportTemplate('AI Verify Report for Process Checklist')

        /* Assert Existing Report Template Is Displayed */
        await expect(page.getByRole('heading', { name: 'AI Verify Report for Process Checklist' })).toBeVisible()

    })

    test('Search Non-Existing Template', async ({ reportTemplatePage }) => {

        /* Search Report Template */
        console.log('[INFO] Search Report Template')

        await reportTemplatePage.searchReportTemplate('model')

        /* Assert Search Non-Existing Template */
        await expect(reportTemplatePage.reportTemplateCard).not.toBeVisible()

    })

    test('Edit Report Template', async({ reportTemplatePage, page }) => {

        /* Edit Report Template */
        console.log('[INFO] Edit Report Template')

        await reportTemplatePage.editReportTemplateButton.first().click()

        /* Assert Edit Report Template Button */
        await expect(page).toHaveURL(new RegExp(url + ":" + port_number + "/canvas"))
    })

})