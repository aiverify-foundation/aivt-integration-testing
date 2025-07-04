import { test, expect } from '../../fixtures/base-test'

const url = process.env.URL
const port_number = process.env.PORT_NUMBER

test.describe('Select Data', () => {

    test.beforeEach(async ({ homePage }) => {

        /* AI Verify Homepage */
        console.log('[INFO] Navigate to AI Verify Home Page')
        await homePage.goto(url + ":" + port_number)
        await expect.soft(homePage.aivlogo).toBeVisible({ timeout: 60000 })

        /* Edit Project */
        console.log('[INFO] Edit Project')
        await homePage.editProjectButton.click()

    })

    test('AI Model Dropdown List', async ({ selectDataPage }) => {

        console.log('[INFO] Select AI Model')
        await selectDataPage.modelDropDownBox.selectOption('1') //sample_bc_credit_sklearn_linear.LogisticRegression.sav

        /* Assert Select AI Model */
        await selectDataPage.inputComboBox.nth(1).selectOption("1")
    })

    test('No Uploaded Models Selected', async ({ selectDataPage }) => {

        console.log('[INFO] Select Test Result')

        /* Assert Select Test Result */
        await selectDataPage.inputComboBox.nth(1).selectOption("1")
    })

    test('Add New AI Model Button', async ({ selectDataPage, page }) => {
        
        console.log('[INFO] Add New AI Model')
        await selectDataPage.addNewAIModelButton.click()

        /* Assert Add New AI Model Button */
        await expect(page).toHaveURL(new RegExp(url + ":" + port_number + "/models/upload"))

    })

    test('Test Results Dropdown List', async ({ selectDataPage }) => {

        console.log('[INFO] Select Test Result')

        /* Assert Select Test Result */
        await selectDataPage.inputComboBox.nth(1).selectOption("1")
    })

    test('Run Test Button', async ({ selectDataPage, page }) => {

        console.log('[INFO] Run Test')
        await selectDataPage.runTestButton.click()

        /* Assert Add New AI Model Button */
        await expect(page).toHaveURL(new RegExp(url + ":" + port_number + "/results/run"))

    })

    test('Upload Test Results Button', async ({ selectDataPage, page }) => {

        console.log('[INFO] Upload Test Results')
        await selectDataPage.uploadTestResultsButton.click()

        /* Assert Add New AI Model Button */
        await expect(page).toHaveURL(new RegExp(url + ":" + port_number + "/results/upload"))

    })

    test('User Inputs Dropdown List', async ({ selectDataPage }) => {

        console.log('[INFO] User Inputs Dropdown List')

        /* Assert Select User Input */
        await selectDataPage.inputComboBox.nth(2).selectOption("1")

    })

    test('Add Input Button', async ({ selectDataPage, page }) => {

        console.log('[INFO] Add Input')
        await selectDataPage.addInputButton.click()

        /* Assert Add Input Button */
        await expect(page).toHaveURL(new RegExp(url + ":" + port_number + "/inputs/groups"))
    })

    test('Next Button', async ({ selectDataPage }) => {

        console.log('[INFO] Generate Report')
        await selectDataPage.nextButton.click()

        /* Assert Next Button */
        await expect(page).toHaveURL(new RegExp(url + ":" + port_number + "/canvas"))
    })

    test('User Inputs Not Completed', async ({ selectDataPage }) => {

        console.log('[INFO] Select Test Result')

        const arrayofIDs = ['1', '2'] 

        await selectDataPage.selectDataComboBox(arrayofIDs)

        console.log('[INFO] Select User Input')

        /* Assert Next Button Is Not Visible */
        await expect(selectDataPage.nextButton).not.toBeVisible()
        
    })

    test('User Inputs Completed', async ({ selectDataPage }) => {

        console.log('[INFO] Select Test Result')

        /* Assert Select Test Result */
        await selectDataPage.inputComboBox.nth(1).selectOption("1")

        console.log('[INFO] Select User Input')

        /* Assert Select User Input */
        await selectDataPage.inputComboBox.nth(2).selectOption("1")

        /* Assert Next Button Is Visible */
        await expect(selectDataPage.nextButton).toBeVisible()

    })

})