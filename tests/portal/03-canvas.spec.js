import { test, expect } from '../../fixtures/base-test'

const url = process.env.URL
const port_number = process.env.PORT_NUMBER

const projectInfo = {
    projectName: 'Canvas Project',
    projectDescription: 'Canvas Project Description',
    reportTitle: 'Canvas Project',
    companyName: 'Canvas Project'
}

const dragAndDropPlugins = [
    {
        pluginName: "Accumulated Local Effect",
        widgetName: "ALE Line Graphs"
    },
    {
        pluginName: "AI Verify Process Checklist",
        widgetName: "Summary - Accountability"
    }
]

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

    test.beforeEach(async ({ homePage, selectDataPage }) => {

        /* AI Verify Homepage */
        console.log('[INFO] Navigate to AI Verify Home Page')
        await homePage.goto(url + ":" + port_number)
        await expect.soft(homePage.aivlogo).toBeVisible({ timeout: 60000 })

        /* Edit Canvas */
        console.log('[INFO] Edit Project Report Canvas')
        await homePage.editCanvasProjectButton.click()
        await selectDataPage.backButton.click()

    })

    test('Project Name', async ({ page }) => {

        /* Assert Project Name */
        await expect(page.getByRole('heading', { name: projectInfo.projectName })).toBeVisible()


    })

    test('Project Description', async ({ page }) => {

        /* Assert Project Description */
        await expect(page.getByRole('paragraph').filter({ hasText: projectInfo.projectDescription })).toBeVisible()

    })

    test('Search Plugin With Search Term', async ({ canvasPage }) => {

        const pluginNamesArray = [
            "Accumulated Local Effect", "AI Verify Process Checklist", "AI Verify Reports", "AI Verify Stock Decorators",
            "AI Verify Veritas", "Fairness for Classification", "Fairness for Regression", "Image Corruption ToolBox",
            "Partial Dependence Plot", "Robustness ToolBox"
        ]

        /* Assert Search Term For Plugins */
        await canvasPage.searchTerm('SHAP Tool', 'plugin', 'SHAP ToolBox', pluginNamesArray)

    })

    test('Search Widget With Search Term', async ({ canvasPage }) => {

        const pluginNamesArray = [
            "AI Verify Process Checklist", "AI Verify Reports", "AI Verify Stock Decorators",
            "AI Verify Veritas", "Fairness for Classification", "Fairness for Regression", "Image Corruption ToolBox",
            "Partial Dependence Plot", "Robustness ToolBox", "SHAP ToolBox"
        ]

        /* Assert Search Term For Widgets */
        await canvasPage.searchTerm('ALE', 'widget', 'Accumulated Local Effect', pluginNamesArray)

    })

    test('Minimise Plugin Side Bar', async ({ canvasPage, page }) => {

        const pluginNamesArray = [
            "Accumulated Local Effect", "AI Verify Process Checklist", "AI Verify Reports", "AI Verify Stock Decorators",
            "AI Verify Veritas", "Fairness for Classification", "Fairness for Regression", "Image Corruption ToolBox",
            "Partial Dependence Plot", "Robustness ToolBox", "SHAP ToolBox"
        ]

        console.log('[INFO] Minimise Plugin Side Bar')
        await canvasPage.sideBarButton.click()

        /* Assert Minimise Plugin Side Bar */
        for (const names of pluginNamesArray)
            await expect(page.getByText(names)).not.toBeVisible()

        await expect(canvasPage.searchBar).not.toBeVisible()

    })

    test('Maximise Plugin Side Bar', async ({ canvasPage, page }) => {

        const pluginNamesArray = [
            "Accumulated Local Effect", "AI Verify Process Checklist", "AI Verify Reports", "AI Verify Stock Decorators",
            "AI Verify Veritas", "Fairness for Classification", "Fairness for Regression", "Image Corruption ToolBox",
            "Partial Dependence Plot", "Robustness ToolBox", "SHAP ToolBox"
        ]

        console.log('[INFO] Minimise Plugin Side Bar')
        await canvasPage.sideBarButton.click()

        console.log('[INFO] Maximise Plugin Side Bar')
        await canvasPage.sideBarButton.click()

        /* Assert Maximise Plugin Side Bar */
        for (const names of pluginNamesArray)
            await expect(page.getByText(names)).toBeVisible()

        await expect(canvasPage.searchBar).toBeVisible()

    })

    test('Drag Plugin With Technical Test and Input Blocks To Canvas', async ({ canvasPage, page }) => {

        console.log('[INFO] Drag And Drop Technical Test')
        await canvasPage.dragAndDrop(dragAndDropPlugins)

        const aleWords = [
            "age", "gender", "income", "race", "home_ownership", "prior_count", "loan_amount", "loan_interests"
        ]

        /* Assert ALE Words In Widget */
        for (const word of aleWords) {
            await expect(page.getByRole('heading', { name: word, exact: true })).toBeVisible()
        }

        /* Assert AI Verify Process Checklist Words */
        await expect(page.getByText('Summary Justification')).toBeVisible()

        console.log('[INFO] View Test Algorithms')
        await canvasPage.viewTestAlgorithmsButton.click()

        /* Assert List Of Test Algorithms */
        await expect(page.getByRole("heading", { name: dragAndDropPlugins[0].pluginName })).toBeVisible()
        await canvasPage.goBackButton.click()

        console.log('[INFO] View Input Blocks')
        await canvasPage.viewInputBlocksButton.click()

        /* Assert List Of Input Blocks */
        await expect(page.getByRole("heading", { name: "Accountability Process" })).toBeVisible()
        await canvasPage.goBackButton.click()

    })

    test('Save To PDF', async ({ canvasPage, page }) => {
        console.log('[INFO] Save to PDF')
        await page.evaluate('(() => {window.waitForPrintDialog = new Promise(f => window.print = f);})()')
        await canvasPage.printButton.click()

        /* Assert Print Dialog For Save To PDF Appears */
        await page.waitForFunction('window.waitForPrintDialog')
    })

    test('Save As Template', async ({ canvasPage, page }) => {

        console.log('[INFO] Save As Template')
        await canvasPage.saveAsTemplateButton.click()

        /* Assert Save As Template */
        await expect(page.getByText('Project has been successfully')).toBeVisible()

        console.log('[INFO] Report Templates')
        await page.goto(url + ":" + port_number + "/templates")

        /* Assert Saved Template Appears in Report Template List */
        await expect(page.getByRole("heading", { name: projectInfo.projectName })).toBeVisible()
        await expect(page.getByText(projectInfo.projectDescription)).toBeVisible()

    })

    test('Toggle Grid Mode Off', async ({ canvasPage }) => {

        console.log('[INFO] Toggle Grid Off')
        await canvasPage.gridButton.click()

        /* Assert Grid Is Not Visible */
        await expect(canvasPage.grid).not.toBeVisible()

    })

    test('Toggle Grid Mode On', async ({ canvasPage }) => {

        console.log('[INFO] Toggle Grid On')
        await canvasPage.gridButton.click()
        await canvasPage.gridButton.click()

        /* Assert Grid Is Visible */
        await expect(canvasPage.grid).toBeVisible()

    })

    test('Zoom In', async ({ canvasPage, page }) => {

        console.log('[INFO] Zoom In')
        await canvasPage.zoomInButton.click()

        /* Assert Canvas Is Zoomed In */
        await expect(page.getByText('115%')).toBeVisible()

    })

    test('Zoom Out', async ({ canvasPage, page }) => {

        console.log('[INFO] Zoom Out')
        await canvasPage.zoomOutButton.click()

        /* Assert Canvas Is Zoomed Out */
        await expect(page.getByText('85%')).toBeVisible()

    })

    test('Reset to 100%', async ({ canvasPage, page }) => {
        
        console.log('[INFO] Zoom Out')
        await canvasPage.zoomOutButton.click()

        /* Assert Canvas Is Zoomed Out */
        await expect(page.getByText('85%')).toBeVisible()

        console.log('[INFO] Reset To 100%')
        await canvasPage.resetViewButton.click()

        /* Assert Canvas View Is Reset To 100% */
        await expect(page.getByText('100%')).toBeVisible()

    })

    test('Add A New Page', async ({ canvasPage }) => {

        console.log('[INFO] Add A New Page')
        await canvasPage.addPageButton.click()

        /* Assert New Page Is Added */
        await expect(canvasPage.page2).toBeVisible()

    })

    test('Next Page', async ({ canvasPage }) => {

        console.log('[INFO] Next Page')
        await canvasPage.nextPageButton.click()

        /* Assert Next Page Is Focused On */
        await expect(canvasPage.page2).toHaveCSS('background-color', 'rgb(55, 65, 81)')

    })

    test('Previous Page', async ({ canvasPage }) => {

        console.log('[INFO] Previous Page')
        await canvasPage.nextPageButton.click()
        await canvasPage.previousPageButton.click()

        /* Assert Previous Page Is Focused On */
        await expect(canvasPage.page1).toHaveCSS('background-color', 'rgb(55, 65, 81)')

    })

    test('Page Number', async ({ canvasPage }) => {

        console.log('[INFO] Page 2')
        await canvasPage.page2.click()

        /* Assert Selected Page Is Focused On */
        await expect(canvasPage.page2).toHaveCSS('background-color', 'rgb(55, 65, 81)')

    })

    test('List of Technical Tests', async ({ canvasPage, page }) => {

        console.log('[INFO] List of Technical Test')
        await canvasPage.viewTestAlgorithmsButton.click()

        /* Assert List of Test Algorithms */
        await expect(page.getByRole("heading", { name: dragAndDropPlugins[0].pluginName })).toBeVisible()
        await canvasPage.goBackButton.click()

    })

    test('List of Input Blocks', async ({ canvasPage, page }) => {

        console.log('[INFO] View Input Blocks')
        await canvasPage.viewInputBlocksButton.click()

        /* Assert List of Input Blocks */
        await expect(page.getByRole("heading", { name: "Accountability Process" })).toBeVisible()
        await canvasPage.goBackButton.click()

    })

    test('Next Button', async ({ canvasPage, page }) => {

        console.log('[INFO] Select Data')
        await canvasPage.nextButton.click()

        /* Assert Next Button Is Clicked */
        await expect(page).toHaveURL(new RegExp(url + ":" + port_number + "/project/select_data"))

    })

    test('Delete Widget From Canvas', async ({ canvasPage, page }) => {

        console.log('[INFO] Delete Widget From Canvas')
        await canvasPage.deleteWidget.click()
        
        /* Assert Widget Is Deleted */
        await expect(page.getByText('Summary Justification')).not.toBeVisible()
    })

    test('Delete Page From Canvas', async ({ canvasPage }) => {

        console.log('[INFO] Delete Page 2 From Canvas')
        await canvasPage.deletePage2.click()

        /* Assert Page 2 Is Deleted */
        await expect(canvasPage.page2).not.toBeVisible()

    })


})