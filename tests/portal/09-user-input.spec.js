import { test, expect } from '../../fixtures/base-test'
import { setTimeout } from "timers/promises"

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

    // test('Search AI Verify Process Checklist By Search Term', async ({ userInputPage, page }) => {

    //     /* Search AI Verify Process Checklist */
    //     await userInputPage.userInputSearchBar.fill('test')

    //     /* Assert AI Verify Process Checklist Not Appearing */
    //     await expect.soft(page.locator('h3').filter({ hasText: /^AI Verify Process Checklists$/ })).not.toBeVisible()

    //     /* Search AI Verify Process Checklist */
    //     await userInputPage.userInputSearchBar.fill('AI Verify Process Checklist')

    //     /* Assert AI Verify Process Checklist */
    //     await expect.soft(page.locator('h3').filter({ hasText: /^AI Verify Process Checklists$/ })).toBeVisible()

    // })

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
        await userInputPage.searchBar.fill('Accounta')

        /* Assert AI Verify Process Checklist By Search Term */
        await expect.soft(page.getByText('Accountability Process').nth(1)).toBeVisible()
    })

    test('Fill Up AI Verify Process Checklist Complete', async ({ userInputPage }) => {

        /* AI Verify Process Checklist Add Checklist Dialog Box */
        console.log('[INFO] Add New Checklist')
        await userInputPage.addCheckListButton.click()

        /* AI Verify Process Checklist */
        console.log('[INFO] AI Verify Process Checklist')
        await userInputPage.createNewButton.click()

        /* Fill Up AI Verify Process Checklist Completely */
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

        await userInputPage.completeProcessChecklist(processCheckListParameters, "aiverify", "AI Verify Process Checklists")

        /* Assert Fill Up AI Verify Process Checklist */
        await userInputPage.validateProcessChecklistComplete()

    })

    test('Fill Up AI Verify Process Checklist Incomplete', async ({ userInputPage }) => {

        /* AI Verify Process Checklist Add Checklist Dialog Box */
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

        await userInputPage.completeProcessChecklist(processCheckListParameters, "aiverify", "AI Verify Process Checklists")

        /* Assert Fill Up AI Verify Process Checklist Incomplete */
        await userInputPage.validateProcessChecklistIncomplete(5)

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

        /* Assert Download Model File */
        await download.saveAs(root_path + '/checklist/' + download.suggestedFilename())
        await setTimeout(1000)
        await expect.soft(page.getByText('Export as JSON completed')).toBeVisible()

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

        /* Assert Download Model File */
        await download.saveAs(root_path + '/checklist/' + download.suggestedFilename())
        await setTimeout(1000)
        await expect.soft(page.getByText('Export as XLSX completed')).toBeVisible()

    })

    test('Rename Checklist', async ({ userInputPage, page }) => {

        /* AI Verify Process Checklist */
        console.log('[INFO] AI Verify Process Checklist')
        await page.getByRole('heading', { name: 'AI Verify Process Checklists' }).nth(2).click()

        /* Rename Checklist */
        await userInputPage.editChecklistNameButton.click()
        await userInputPage.editChecklistTextBox.fill('AI Verify Process Checklist One')
        await userInputPage.saveChecklistNameButton.click()
        await setTimeout(2000)

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
        await page.locator('div').filter({ hasText: /^AI Verify Process Checklist One$/ }).nth(1).click();

        /* Delete Checklist */
        console.log('[INFO] Delete Checklist Dialog Box')
        await userInputPage.deleteChecklistButton.click()
        await userInputPage.confirmDeleteDialogBoxButton.click()
        await expect.soft(page.getByText('Group deleted successfully.')).toBeVisible()

        /* Assert Delete Checklist */
        await expect.soft(page.locator('div').filter({ hasText: /^AI Verify Process Checklists One$/ }).nth(1)).not.toBeVisible()

    })

    test('Import Valid AI Verify Process Checklist Excel Sheet Format And Valid Name - Drag and Drop', async ({ userInputPage, page }) => {

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
        await expect.soft(page).toHaveURL(new RegExp(url + ":" + port_number + "/inputs/groups/aiverify.stock.process_checklist"))

    })

    test('Import Valid AI Verify Process Checklist Excel Sheet Format And Valid Name - Click To Browse', async ({ userInputPage, page }) => {

        /* AI Verify Add Checklist Dialog Box */
        console.log('[INFO] Add New Checklist')
        await userInputPage.addCheckListButton.click()

        /* AI Verify Process Checklist */
        console.log('[INFO] AI Verify Process Checklist')
        await userInputPage.uploadExcelSheetButton.click()

        /* Upload AI Verify Process Checklist Excel Sheet - Drag And Drop */
        let filePathStringArray = [root_path + '/checklist/AI Verify Process Checklists Exported Excel_checklists.xlsx']
        await userInputPage.uploadFile(filePathStringArray)
        await expect.soft(page).toHaveURL(new RegExp(url + ":" + port_number + "/inputs/groups/aiverify.stock.process_checklist"))

        /* Assert Upload AI Verify Process Checklist Excel Sheet - Click To Browse */
        console.log('[INFO] Upload AI Verify Process Checklist')
        await userInputPage.validateProcessChecklistComplete()

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
        await expect.soft(page.getByText('An error occurred while')).toBeVisible()

    })

    test('Import Valid AI Verify Process Checklist Excel Sheet Format And Invalid Name', async ({ userInputPage, page }) => {

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

        /* Upload AI Verify Process Checklist Excel Sheet Invalid Name */
        await expect.soft(page.getByText('Invalid file name:')).toBeVisible()

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

    test('Confirm Upload Button Enabled', async ({ userInputPage }) => {

        /* AI Verify Add Checklist Dialog Box */
        console.log('[INFO] Add New Checklist')
        await userInputPage.addCheckListButton.click()

        /* AI Verify Process Checklist */
        console.log('[INFO] AI Verify Process Checklist')
        await userInputPage.uploadExcelSheetButton.click()

        /* Upload AI Verify Process Checklist Excel Sheet - Drag And Drop */
        let filePathStringArray = [root_path + '/checklist/AI Verify Process Checklists Exported Excel_checklists.xlsx']
        await userInputPage.uploadFile(filePathStringArray)

        /* Assert Confirm Upload Button Enabled */
        await expect.soft(userInputPage.confirmUploadDialogBoxButton).toBeEnabled()

    })

    test('Confirm Upload Button Disabled', async ({ userInputPage }) => {

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

    test('Search Veritas Process Checklist By Search Term', async ({ userInputPage, page }) => {

        /* Search Veritas Process Checklist */
        await userInputPage.userInputSearchBar.fill('test')

        /* Assert Veritas Process Checklist Not Appearing */
        await expect.soft(page.locator('h3').filter({ hasText: /^Veritas Process Checklists$/ })).not.toBeVisible()

        /* Search Veritas Process Checklist */
        await userInputPage.userInputSearchBar.fill('Veritas Process Checklists')

        /* Assert Veritas Process Checklist */
        await expect.soft(page.locator('h3').filter({ hasText: /^Veritas Process Checklists$/ })).toBeVisible()

    })

    test('Veritas Process Checklist - Add Checklist Button - Create New Checklist', async ({ userInputPage, page }) => {

        /* Veritas Add Checklist Dialog Box */
        console.log('[INFO] Add New Checklist')
        await userInputPage.addCheckListButton.click()

        /* Assert Veritas Process Checklist Add Checklist Button - Create New Checklist */
        await expect.soft(page).toHaveURL(new RegExp(url + ':' + port_number + '/inputs/groups/aiverify.stock.veritas/'))

    })

    test('Add Checklist Button - Create New Checklist', async ({ userInputPage, page }) => {

        /* Veritas Add Checklist Dialog Box */
        console.log('[INFO] Add New Checklist')
        await userInputPage.addCheckListButton.click()

        /* Add CheckList Button */
        const currentProcessURL = page.url()
        await userInputPage.addCheckListButton.click()

        /* Assert Add Checklist Button - Create New Checklist */
        await expect.soft(page).not.toHaveURL(new RegExp(currentProcessURL))

    })

    test('Search Individual Veritas Process Checklist By Search Term', async ({ userInputPage, page }) => {

        /* Veritas Add Checklist Dialog Box */
        console.log('[INFO] Add New Checklist')
        await userInputPage.addCheckListButton.click()

        /* Search Veritas Process Checklist */
        console.log('[INFO] Search Veritas Process Checklist')
        await userInputPage.searchBar.fill('Ethics')

        /* Assert Veritas Process Checklist By Search Term */
        await expect.soft(page.getByText('Ethics and Accountability').nth(1)).toBeVisible()

    })

    test('Fill Up Veritas Process Checklist Complete', async ({ userInputPage }) => {

        /* Veritas Add Checklist Dialog Box */
        console.log('[INFO] Add New Checklist')
        await userInputPage.addCheckListButton.click()

        /* Fill Veritas Process Checklist Completely */
        console.log('[INFO] Veritas Process Checklist')
        const processChecklistParameters = [
            { name: "Generic Process Checklist", yesNoNAOptions: "Yes", numberOfRows: 16 },
            { name: "Fairness Process Checklist", yesNoNAOptions: "No", numberOfRows: 15 },
            { name: "Ethics and Accountability Process Checklist", yesNoNAOptions: "Not Applicable", numberOfRows: 10 },
            { name: "Transparency Process Checklist", yesNoNAOptions: "Yes", numberOfRows: 21 }
        ]
        await userInputPage.completeProcessChecklist(processChecklistParameters, 'veritas', "Veritas Process Checklists")

        /* Assert Fill Up AI Verify Process Checklist */
        await userInputPage.validateProcessChecklistComplete()

    })

    test('Fill Up Veritas Process Checklist Incomplete', async ({ userInputPage }) => {

        /* Veritas Add Checklist Dialog Box */
        console.log('[INFO] Add New Checklist')
        await userInputPage.addCheckListButton.click()

        /* Fill Veritas Process Checklist Completely */
        console.log('[INFO] Veritas Process Checklist')
        const processChecklistParameters = [
            { name: "Generic Process Checklist", yesNoNAOptions: "Yes", numberOfRows: 16 },
            { name: "Fairness Process Checklist", yesNoNAOptions: "No", numberOfRows: 15 }
        ]

        await userInputPage.completeProcessChecklist(processChecklistParameters, 'veritas', "Veritas Process Checklists")

        /* Assert Fill Up AI Verify Process Checklist */
        await userInputPage.validateProcessChecklistIncomplete(2)

    })

    test('Rename Veritas Process Checklist', async ({ userInputPage, page }) => {

        /* Veritas Process Checklist */
        console.log('[INFO] Veritas Process Checklist')
        await page.getByRole('heading', { name: 'Veritas Process Checklists' }).nth(2).click()

        /* Rename Checklist */
        await userInputPage.editChecklistNameVeritasButton.click()
        await userInputPage.editChecklistTextBox.fill('Veritas Process Checklist One')
        await userInputPage.saveChecklistNameButton.click()
        await setTimeout(2000)

        /* Assert Rename Checklist */
        await expect.soft(page.getByRole('heading', { name: 'Veritas Process Checklist One' }).nth(1)).toBeVisible()

    })

    test('Rename Veritas Process Checklist Cancel Button', async ({ userInputPage, page }) => {

        /* Veritas Process Checklist */
        console.log('[INFO] Veritas Process Checklist')
        await page.getByRole('heading', { name: 'Veritas Process Checklist' }).nth(2).click()

        /* Rename Veritas Process Checklist */
        await userInputPage.editChecklistNameButton.click()
        await userInputPage.cancelChecklistNameButton.click()

        /* Assert Rename Checklist Cancel Button */
        await expect.soft(page.getByRole('heading', { name: 'Veritas Process Checklist' }).nth(2)).toBeVisible()

    })

    test('Delete Veritas Process Checklist', async ({ userInputPage, page }) => {

        /* Veritas Process Checklist */
        console.log('[INFO] Veritas Process Checklist')
        await page.locator('div').filter({ hasText: /^Veritas Process Checklist One$/ }).nth(1).click();

        /* Delete Checklist */
        console.log('[INFO] Delete Checklist Dialog Box')
        await userInputPage.deleteChecklistVeritasButton.click()
        await userInputPage.confirmDeleteDialogBoxButton.click()
        await expect.soft(page.getByText('Group deleted successfully.')).toBeVisible()

        /* Assert Delete Veritas Process Checklist */
        await expect.soft(page.locator('div').filter({ hasText: /^Veritas Process Checklist One$/ }).nth(1)).not.toBeVisible()

    })

})

test.describe('Fairness Tree', () => {

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
        await userInputPage.FairnessTreeButton.click()

    })

    test('Search Fairness Tree By Search Term', async ({ userInputPage, page }) => {

        /* Search Fairness Tree */
        await userInputPage.userInputSearchBar.fill('test')

        /* Assert Fairness Tree Not Appearing */
        await expect.soft(page.locator('h3').filter({ hasText: /^Fairness Tree$/ })).not.toBeVisible()

        /* Search Fairness Tree */
        await userInputPage.userInputSearchBar.fill('Fairness Tree')

        /* Assert Fairness Tree Appearing */
        await expect.soft(page.locator('h3').filter({ hasText: /^Fairness Tree$/ })).toBeVisible()
    })

    test('Add Input Block Button - Add Fairness Tree', async ({ userInputPage, page }) => {

        /* Add Fairness Tree */
        console.log('[INFO] Fairness Tree')
        await userInputPage.addInputBlock.click()

        /* Assert Add Input Block Button - Add Fairness Tree */
        await expect.soft(page).toHaveURL(url + ":" + port_number + "/inputs/aiverify.stock.fairness_metrics_toolbox_for_classification/fairness_tree")

    })

    test('Fairness Tree Name', async ({ userInputPage, page }) => {

        /* Add Fairness Tree */
        console.log('[INFO] Fairness Tree')

        /* Complete Fairness Tree */
        await userInputPage.completeFairnessTree('Fairness Tree 10')

        /* Assert Fairness Tree Name */
        await expect.soft(page.getByText('Tree updated successfully')).toBeVisible()
        await userInputPage.closeSuccessFairnessTreeDialogBox.click()
        await expect.soft(page.getByRole('heading', { name: 'Fairness Tree 10' })).toBeVisible()

    })

    test('Empty Fairness Tree Name', async ({ userInputPage, page }) => {

        /* Add Fairness Tree */
        console.log('[INFO] Fairness Tree')

        /* Complete Fairness Tree */
        await userInputPage.completeFairnessTree('')

        /* Assert Fairness Tree Name */
        await expect.soft(page.getByText('Please enter a name before')).toBeVisible()
        await expect.soft(page.getByText('Tree updated successfully')).not.toBeVisible()

    })

    test('Required Field Not Completed', async ({ userInputPage }) => {

        /* Add Fairness Tree */
        console.log('[INFO] Fairness Tree')

        /* Complete Some Fields */
        await userInputPage.addInputBlock.click()
        await userInputPage.sensitiveFeatureName.click()
        await userInputPage.sensitiveFeatureName.fill('test')
        await userInputPage.favourableAllocatedResource.click()
        await userInputPage.favourableAllocatedResource.fill('test')

        /* Assert Next Button Not Enabled */
        await expect.soft(userInputPage.nextButton).not.toBeEnabled()

    })

    test('Required Field Completed', async ({ userInputPage }) => {

        /* Add Fairness Tree */
        console.log('[INFO] Fairness Tree')

        /* Complete All Required Fields */
        await userInputPage.addInputBlock.click()
        await userInputPage.FairnessTreeName.click()
        await userInputPage.FairnessTreeName.fill('Fairness Tree')
        await userInputPage.sensitiveFeatureName.click()
        await userInputPage.sensitiveFeatureName.fill('test')
        await userInputPage.favourableAllocatedResource.click()
        await userInputPage.favourableAllocatedResource.fill('test')
        await userInputPage.qualifiedGroup.click()
        await userInputPage.qualifiedGroup.fill('test')
        await userInputPage.unqualifiedGroup.click()
        await userInputPage.unqualifiedGroup.fill('test')

        /* Assert Next Button Enabled */
        await expect.soft(userInputPage.nextButton).toBeEnabled()

    })

    test('Previous Button', async ({ userInputPage }) => {

        /* Add Fairness Tree */
        console.log('[INFO] Fairness Tree')

        /* Complete All Required Fields */
        await userInputPage.addInputBlock.click()
        await userInputPage.sensitiveFeatureName.click()
        await userInputPage.sensitiveFeatureName.fill('test')
        await userInputPage.favourableAllocatedResource.click()
        await userInputPage.favourableAllocatedResource.fill('test')
        await userInputPage.qualifiedGroup.click()
        await userInputPage.qualifiedGroup.fill('test')
        await userInputPage.unqualifiedGroup.click()
        await userInputPage.unqualifiedGroup.fill('test')

        /* Assert Previous Button Not Enabled */
        await expect.soft(userInputPage.previousButton).not.toBeEnabled()
        await userInputPage.nextButton.click()

        /* Assert Previous Button Enabled */
        await expect.soft(userInputPage.previousButton).toBeEnabled()
        await userInputPage.previousButton.click()

        /* Assert Previous Button Clicked */
        await expect.soft(userInputPage.sensitiveFeatureName).toBeVisible()
        await expect.soft(userInputPage.favourableAllocatedResource).toBeVisible()
        await expect.soft(userInputPage.qualifiedGroup).toBeVisible()
        await expect.soft(userInputPage.unqualifiedGroup).toBeVisible()

    })

    test('Submit Button - All Fields Completed', async ({ userInputPage, page }) => {

        /* Add Fairness Tree */
        console.log('[INFO] Fairness Tree')

        /* Complete Fairness Tree */
        await userInputPage.completeFairnessTree('Fairness Tree 11')

        /* Assert Submit Button - All Fields Completed */
        await expect.soft(page.getByText('Tree updated successfully')).toBeVisible()
        await userInputPage.closeSuccessFairnessTreeDialogBox.click()
        await expect.soft(page.getByRole('heading', { name: 'Fairness Tree 11' })).toBeVisible()

    })

    test('Submit Button - Fields Incomplete', async ({ userInputPage, page }) => {

        /* Add Fairness Tree */
        console.log('[INFO] Fairness Tree')

        /* Complete No Fields Except Name */
        await userInputPage.addInputBlock.click()
        await userInputPage.FairnessTreeName.click()
        await userInputPage.FairnessTreeName.fill('Fairness Tree')
        await userInputPage.submitButton.click()

        /* Assert Submit Button  */
        await expect.soft(page.getByText('Please fill in all fields')).toBeVisible()

    })

    test('Fairness Tree Cancel Button', async ({ userInputPage, page }) => {

        /* Add Fairness Tree */
        console.log('[INFO] Fairness Tree')
        await userInputPage.addInputBlock.click()

        /* Cancel Button */
        await userInputPage.cancelButton.click()

        /* Assert Cancel Button */
        await expect.soft(page.getByRole('heading', { name: 'Manage and view Decision Trees' })).toBeVisible()

    })

})