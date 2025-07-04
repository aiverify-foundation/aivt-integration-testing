import { test, expect } from '../../fixtures/base-test'

const url = process.env.URL
const port_number = process.env.PORT_NUMBER
const root_path = process.env.ROOT_PATH

test.describe('AI Verify Process Checklist', () => {

    test.beforeEach(async ({ homePage, managePage, userInputPage }) => {

        /* AI Verify Homepage */
        console.log('[INFO] Navigate to AI Verify Home Page')
        await homePage.goto(url + ":" + port_number)
        await expect.soft(homePage.aivlogo).toBeVisible({ timeout: 60000 })
        await homePage.manageButton.click()

        /* Manage Page */
        console.log('[INFO] Manage Page')
        await managePage.userInputButton.click()

        /* User Input Page */
        console.log('[INFO] User Input Page')
        await userInputPage.AIVerifyProcessChecklistButton.click()

    })

    test('Search AI Verify Process Checklist By Search Term', async ({ userInputPage, page }) => {

        /* Search AI Verify Process Checklist */
        await userInputPage.userInputSearchBar.fill('test')

        /* Assert AI Verify Process Checklist Not Appearing */
        await expect.soft(page.locator('h3').filter({ hasText: /^AI Verify Process Checklists$/ })).not.toBeVisible()

        /* Search AI Verify Process Checklist */
        await userInputPage.userInputSearchBar.fill('AI Verify Process Checklist')

        /* Assert AI Verify Process Checklist */
        await expect.soft(page.locator('h3').filter({ hasText: /^AI Verify Process Checklists$/ })).toBeVisible()

    })

    test('AI Verify Add Checklist Button - Create New Checklist', async ({ userInputPage, page }) => {

        /* AI Verify Add Checklist Dialog Box */
        console.log('[INFO] Add New Checklist')
        await userInputPage.addCheckListButton.click()
        await userInputPage.createNewButton.click()

        /* Assert AI Verify Add Checklist Button - Create New Checklist */
        await expect.soft(page).toHaveURL(new RegExp(url + ':' + port_number + '/inputs/groups/aiverify.stock.process_checklist'))

    })

    test('AI Verify Add Checklist Button - Upload Excel', async ({ userInputPage, page }) => {

        /* AI Verify Add Checklist Dialog Box */
        console.log('[INFO] Add New Checklist')
        await userInputPage.addCheckListButton.click()
        await userInputPage.uploadExcelSheetButton.click()

        /* Assert AI Verify Add Checklist Button - Upload Excel Sheet */
        await expect.soft(page.getByRole('heading', { name: 'upload excel header' })).toBeVisible()

    })

    test('Create New Checklist Add Checklist Button', async ({ userInputPage, page }) => {

        /* AI Verify Add Checklist Dialog Box */
        console.log('[INFO] Add New Checklist')
        await userInputPage.addCheckListButton.click()

        /* AI Verify Process Checklist */
        console.log('[INFO] AI Verify Process Checklist')
        await userInputPage.createNewButton.click()
        await userInputPage.addCheckListButton.click()

        /* Assert Create New Checklist Add Checklist Button */
        await expect.soft(page.getByText('Choose an option to add input:')).toBeVisible()
        await expect.soft(userInputPage.createNewButton).toBeVisible()
        await expect.soft(userInputPage.uploadExcelSheetButton).toBeVisible()

    })

    test('Search Individual AI Verify Process Checklist By Search Term', async ({ userInputPage, page }) => {

        /* AI Verify Add Checklist Dialog Box */
        console.log('[INFO] Add New Checklist')
        await userInputPage.addCheckListButton.click()

        /* AI Verify Process Checklist */
        console.log('[INFO] AI Verify Process Checklist')
        await userInputPage.createNewButton.click()
        await userInputPage.addCheckListButton.click()

        /* Search AI Verify Process Checklist */
        console.log('[INFO] Search AI Verify Process Checklist')
        await userInputPage.AIVerifyProcessChecklistSearchBar.fill('Accounta')

        /* Assert AI Verify Process Checklist By Search Term */
        await expect.soft(page.getByText('Accountability Process').nth(1)).toBeVisible()
    })

    test('Fill Up Checklist', async ({ userInputPage, page }) => {

        /* AI Verify Add Checklist Dialog Box */
        console.log('[INFO] Add New Checklist')
        await userInputPage.addCheckListButton.click()

        /* AI Verify Process Checklist */
        console.log('[INFO] AI Verify Process Checklist')
        await userInputPage.createNewButton.click()

        /* Fill Up Checklist Completely */
        const processCheckListParameters = [
            { name: "Transparency Process Checklist", yesNoNAOptions: "Yes", numberOfRows: 10 },
            { name: "Explainability Process Checklist", yesNoNAOptions: "No", numberOfRows: 1 },
            { name: "Reproducibility Process Checklist", yesNoNAOptions: "Not Applicable", numberOfRows: 15 },
            { name: "Safety Process Checklist", yesNoNAOptions: "Yes", numberOfRows: 9 },
            { name: "Security Process Checklist", yesNoNAOptions: "No", numberOfRows: 14 },
            { name: "Robustness Process Checklist", yesNoNAOptions: "Not Applicable", numberOfRows: 7 },
            { name: "Fairness Process Checklist", yesNoNAOptions: "Yes", numberOfRows: 10 },
            { name: "Data Governance Process Checklist", yesNoNAOptions: "No", numberOfRows: 4 },
            { name: "Accountability Process Checklist", yesNoNAOptions: "Not Applicable", numberOfRows: 11 },
            { name: "Human Agency & Oversight Process Checklist", yesNoNAOptions: "Yes", numberOfRows: 8 },
            { name: "Inclusive Growth, Societal & Environmental Well-being Process Checklist", yesNoNAOptions: "No", numberOfRows: 1 },
            { name: "Organisational Considerations Process Checklist", yesNoNAOptions: "Not Applicable", numberOfRows: 7 }
        ]

        await userInputPage.completeProcessChecklist(processCheckListParameters, "aiverify", 3)

        /* Assert Fill Up Checklist */
        let i = 0
        while (await page.locator('circle').nth(i).isVisible()) {
            await expect.soft(page.locator('circle').nth(i)).toHaveCSS('background-color', 'rgb(57, 177, 64)')
            i++
        }

    })

    test('Fill Up Checklist Incomplete', async ({ userInputPage, page }) => {

        /* AI Verify Add Checklist Dialog Box */
        console.log('[INFO] Add New Checklist')
        await userInputPage.addCheckListButton.click()

        /* AI Verify Process Checklist */
        console.log('[INFO] AI Verify Process Checklist')
        await userInputPage.createNewButton.click()

        const processCheckListParameters = [
            { name: "Transparency Process Checklist", yesNoNAOptions: "Yes", numberOfRows: 10 },
            { name: "Explainability Process Checklist", yesNoNAOptions: "No", numberOfRows: 1 },
            { name: "Reproducibility Process Checklist", yesNoNAOptions: "Not Applicable", numberOfRows: 15 },
            { name: "Safety Process Checklist", yesNoNAOptions: "Yes", numberOfRows: 9 },
            { name: "Security Process Checklist", yesNoNAOptions: "No", numberOfRows: 14 }
        ]

        await userInputPage.completeProcessChecklist(processCheckListParameters, "aiverify", 4)

        /* Assert Fill Up Checklist Incomplete */
        await userInputPage.validateProcessChecklist()


    })

    test('Export Checklist Excel', async ({ userInputPage, page }) => {

        /* AI Verify Process Checklist */
        console.log('[INFO] AI Verify Process Checklist')
        await page.getByRole('heading', { name: 'AI Verify Process Checklists' }).nth(2).click()

        /* Export Checklist */
        console.log('[INFO] Export Checklist Dialog Box')
        await userInputPage.exportCheckListButton.click()
        await userInputPage.excelSheetRadioButton.check()

        /* Assert Export Checklist Excel */
        const downloadPromise = page.waitForEvent('download')
        await userInputPage.exportCheckListExportDialogButton.click()
        const download = await downloadPromise
        await expect.soft(page.getByText('Export as XLSX completed')).toBeVisible()

    })

    test('Export Checklist JSON', async ({ userInputPage, page }) => {

        /* AI Verify Process Checklist */
        console.log('[INFO] AI Verify Process Checklist')
        await page.getByRole('heading', { name: 'AI Verify Process Checklists' }).nth(2).click()

        /* Export Checklist */
        console.log('[INFO] Export Checklist Dialog Box')
        await userInputPage.exportCheckListButton.click()
        await userInputPage.jsonRadioButton.check()

        /* Assert Export Checklist JSON */
        const downloadPromise = page.waitForEvent('download')
        await userInputPage.exportCheckListExportDialogButton.click()
        const download = await downloadPromise
        await expect.soft(page.getByText('Export as JSON completed')).toBeVisible()

    })

    test('Rename Checklist', async ({ userInputPage, page }) => {

        /* AI Verify Process Checklist */
        console.log('[INFO] AI Verify Process Checklist')
        await page.getByRole('heading', { name: 'AI Verify Process Checklists' }).nth(2).click()

        /* Rename Checklist */
        await userInputPage.editChecklistNameButton.click()
        await userInputPage.editChecklistTextBox.fill('AI Verify Process Checklist One')
        await userInputPage.saveChecklistNameButton.click()

        /* Assert Rename Checklist */
        await expect.soft(page.getByRole('heading', { name: 'AI Verify Process Checklist One' }).nth(1)).toBeVisible()

    })

    test('Rename Checklist Cancel Button', async ({ userInputPage, page }) => {

        /* AI Verify Process Checklist */
        console.log('[INFO] AI Verify Process Checklist')
        await page.getByRole('heading', { name: 'AI Verify Process Checklists' }).nth(2).click()

        /* Rename Checklist */
        await userInputPage.editChecklistNameButton.click()
        await userInputPage.cancelChecklistNameButton.click()

        /* Assert Rename Checklist Cancel Button */
        await expect.soft(page.getByRole('heading', { name: 'AI Verify Process Checklist' }).nth(1)).toBeVisible()

    })

    test('Delete Checklist', async ({ userInputPage, page }) => {

        /* AI Verify Process Checklist */
        console.log('[INFO] AI Verify Process Checklist')
        await page.getByRole('heading', { name: 'AI Verify Process Checklists' }).nth(3).click()

        /* Delete Checklist */
        console.log('[INFO] Delete Checklist Dialog Box')
        await userInputPage.deleteChecklistButton.click()
        await userInputPage.confirmDeleteDialogBoxButton.click()
        await expect.soft(page.getByText('Group deleted successfully.')).toBeVisible()

    })

    test('Import Valid AI Verify Process Checklist Excel - Drag and Drop', async ({ userInputPage, page }) => {

        /* AI Verify Add Checklist Dialog Box */
        console.log('[INFO] Add New Checklist')
        await userInputPage.addCheckListButton.click()

        /* AI Verify Process Checklist */
        console.log('[INFO] AI Verify Process Checklist')
        await userInputPage.uploadExcelSheetButton.click()

        /* Upload AI Verify Process Checklist Excel Sheet - Drag And Drop */
        console.log('[INFO] Upload AI Verify Process Checklist')
        let filePathStringArray = [root_path + '/checklist/AI Verify Process Checklists Exported Excel_checklists.xlsx']
        await userInputPage.uploadFile(filePathStringArray)
        await userInputPage.confirmUploadDialogBoxButton.click()

        /* Assert Upload AI Verify Process Checklist Excel Sheet - Drag And Drop */
        await expect.soft(page.getByText('Upload Successful!')).toBeVisible()

    })

    test('Import Valid AI Verify Process Checklist Excel - Click To Browse', async ({ userInputPage }) => {

        /* AI Verify Add Checklist Dialog Box */
        console.log('[INFO] Add New Checklist')
        await userInputPage.addCheckListButton.click()

        /* AI Verify Process Checklist */
        console.log('[INFO] AI Verify Process Checklist')
        await userInputPage.uploadExcelSheetButton.click()

        /* Upload AI Verify Process Checklist Excel Sheet - Drag And Drop */
        let filePathStringArray = [root_path + '/checklist/AI Verify Process Checklists Exported Excel_checklists.xlsx']
        await userInputPage.uploadFile(filePathStringArray)
        await userInputPage.confirmUploadDialogBoxButton.click()

        /* Assert Upload AI Verify Process Checklist Excel Sheet - Click To Browse */
        console.log('[INFO] Upload AI Verify Process Checklist')
        await userInputPage.validateProcessChecklist()

    })

    test('Import Valid AI Verify Process Checklist Invalid Name', async ({ userInputPage, page }) => {

        /* AI Verify Add Checklist Dialog Box */
        console.log('[INFO] Add New Checklist')
        await userInputPage.addCheckListButton.click()

        /* AI Verify Process Checklist */
        console.log('[INFO] AI Verify Process Checklist')
        await userInputPage.uploadExcelSheetButton.click()

        /* Upload AI Verify Process Checklist Excel Sheet Invalid Name */
        console.log('[INFO] Upload AI Verify Process Checklist')
        let filePathStringArray = [root_path + '/checklist/AI Verify Process Checklists Exported Excel_checklists_copy.xlsx']
        await userInputPage.uploadFile(filePathStringArray)
        await userInputPage.confirmUploadDialogBoxButton.click()

        /* Upload AI Verify Process Checklist Excel Sheet Invalid Name */
        await expect.soft(page.getByText('Upload failed: Cannot read')).toBeVisible()

    })

    test('Import Invalid Excel Sheet', async ({ userInputPage, page }) => {

        /* AI Verify Add Checklist Dialog Box */
        console.log('[INFO] Add New Checklist')
        await userInputPage.addCheckListButton.click()

        /* AI Verify Process Checklist */
        console.log('[INFO] AI Verify Process Checklist')
        await userInputPage.uploadExcelSheetButton.click()

        /* Upload Corrupted AI Verify Process Checklist Excel Sheet */
        console.log('[INFO] Upload AI Verify Process Checklist')
        let filePathStringArray = [root_path + '/checklist/Corrupted_checklists.xlsx']
        await userInputPage.uploadFile(filePathStringArray)
        await userInputPage.confirmUploadDialogBoxButton.click()

        /* Upload AI Verify Process Checklist Excel Invalid Name */
        await expect.soft(page.getByText('Upload failed: Cannot read')).toBeVisible()

    })

    test('Remove Excel Sheet To Be Uploaded', async ({ userInputPage, page }) => {

        /* AI Verify Add Checklist Dialog Box */
        console.log('[INFO] Add New Checklist')
        await userInputPage.addCheckListButton.click()

        /* AI Verify Process Checklist */
        console.log('[INFO] AI Verify Process Checklist')
        await userInputPage.uploadExcelSheetButton.click()

        /* Upload AI Verify Process Checklist Excel Sheet - Drag And Drop */
        let filePathStringArray = [root_path + '/checklist/AI Verify Process Checklists Exported Excel_checklists.xlsx']
        await userInputPage.uploadFile(filePathStringArray)
        await userInputPage.removeExcelSheetButton.click()

        /* Assert Remove Excel Sheet To Be Uploaded */
        await expect.soft(page.locator('div').filter({ hasText: /^AI Verify Process Checklists Exported Excel_checklists\.xlsx$/ }).first()).not.toBeVisible()

    })

    test('Confirm Upload Button Enabled', async ({ userInputPage, page }) => {

        /* AI Verify Add Checklist Dialog Box */
        console.log('[INFO] Add New Checklist')
        await userInputPage.addCheckListButton.click()

        /* AI Verify Process Checklist */
        console.log('[INFO] AI Verify Process Checklist')
        await userInputPage.uploadExcelSheetButton.click()

        /* Upload AI Verify Process Checklist Excel Sheet - Drag And Drop */
        let filePathStringArray = [root_path + '/checklist/AI Verify Process Checklists Exported Excel_checklists.xlsx']
        await userInputPage.uploadFile(filePathStringArray)

        /* Assert onfirm Upload Button Enabled */
        await expect.soft(userInputPage.confirmUploadDialogBoxButton).toBeEnabled()

    })

    test('Confirm Upload Button Disabled', async ({ userInputPage, page }) => {

        /* AI Verify Add Checklist Dialog Box */
        console.log('[INFO] Add New Checklist')
        await userInputPage.addCheckListButton.click()

        /* AI Verify Process Checklist */
        console.log('[INFO] AI Verify Process Checklist')
        await userInputPage.uploadExcelSheetButton.click()

        /* Assert onfirm Upload Button Enabled */
        await expect.soft(userInputPage.confirmUploadDialogBoxButton).not.toBeEnabled()

    })

})

test.describe('Veritas Process Checklist', () => {

    test.beforeEach(async ({ homePage, managePage, userInputPage }) => {

        /* AI Verify Homepage */
        console.log('[INFO] Navigate to AI Verify Home Page')
        await homePage.goto(url + ":" + port_number)
        await expect.soft(homePage.aivlogo).toBeVisible({ timeout: 60000 })
        await homePage.manageButton.click()

        /* Manage Page */
        console.log('[INFO] Manage Page')
        await managePage.userInputButton.click()

        /* User Input Page */
        console.log('[INFO] User Input Page')
        await userInputPage.VeritasProcessChecklistButton.click()

    })

    test('Search Veritas Process Checklist Bar', async ({ userInputPage, page }) => {

        /* Search Veritas Process Checklist */
        await userInputPage.userInputSearchBar.fill('test')

        /* Assert Veritas Process Checklist Not Appearing */
        await expect.soft(page.locator('h3').filter({ hasText: /^Veritas Process Checklists$/ })).not.toBeVisible()

        /* Search Veritas Process Checklist */
        await userInputPage.userInputSearchBar.fill('Veritas Process Checklists')

        /* Assert Veritas Process Checklist */
        await expect.soft(page.locator('h3').filter({ hasText: /^Veritas Process Checklists$/ })).toBeVisible()

    })

    test('Veritas Process Checklist Add Checklist Button - Create New Checklist', async ({ userInputPage, page }) => {

        /* AI Verify Add Checklist Dialog Box */
        console.log('[INFO] Add New Checklist')
        await userInputPage.addCheckListButton.click()

        /* Assert AI Verify Add Checklist Button - Create New Checklist */
        await expect.soft(page).toHaveURL(new RegExp(url + ':' + port_number + '/inputs/groups/aiverify.stock.veritas/'))

    })

})