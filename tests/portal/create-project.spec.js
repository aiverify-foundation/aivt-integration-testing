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
        await expect(page).toHaveURL(new RegExp("http://localhost:3000/templates"))

    })

    test('No Project Name', async({ createProjectPage, page }) => {

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
        await createProjectPage.createProjectError(projectInfo)

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
        await createProjectPage.createProjectError(projectInfo)

    })

    test('No Report Title', async({ createProjectPage, page }) => {

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
        await createProjectPage.createProjectError(projectInfo)

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
        await createProjectPage.createProjectError(projectInfo)

    })

})