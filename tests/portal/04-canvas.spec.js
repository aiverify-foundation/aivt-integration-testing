import { test, expect } from '../../fixtures/base-test'

const url = process.env.URL
const port_number = process.env.PORT_NUMBER

test.describe('Canvas Test Case Setup', () => {

    test.beforeEach(async ({ homePage, createProjectPage, reportTemplatePage }) => {

        console.log('[INFO] Prepare Canvas Project')

        /* AI Verify Homepage */
        console.log('[INFO] Navigate to AI Verify Home Page')
        await homePage.goto(url + ":" + port_number)
        await expect.soft(homePage.aivlogo).toBeVisible({ timeout: 60000 })
        await homePage.createProjectButton.click()

        /* Create Project Page */
        console.log('[INFO] Create Project Page')
        const projectInfo = {
            projectName: 'Canvas Project',
            projectDescription: 'Canvas Project',
            reportTitle: 'Canvas Project',
            companyName: 'Canvas Project'
        }

        await createProjectPage.createProject(projectInfo)

        /* Select Report Template */
        console.log('[INFO] Select Report Template')
        await reportTemplatePage.selectReportTemplate('Create New Report Template')

         /* Navigate To Home Page */
         await homePage.goto(url + ":" + port_number)

         /* Validate Project Creation */
         await homePage.validateProjectCreation(projectInfo.reportTitle)

    })

    test('Setup Run', async () => {

        /* Setup Complete */
        console.log('[INFO] Setup Complete')
    })

})

test.describe('Canvas', () => {

    test.beforeEach(async ({ homePage, canvasPage, selectDataPage }) => {

        /* AI Verify Homepage */
        console.log('[INFO] Navigate to AI Verify Home Page')
        await homePage.goto(url + ":" + port_number)
        await expect.soft(homePage.aivlogo).toBeVisible({ timeout: 60000 })
        await homePage.viewCanvasProjectButton.click()
        await canvasPage.backButton.click()
        await selectDataPage.backButton.click()

    })

    test('Project Name', async () => {

        /* Assert Project Name */
        

    })

})