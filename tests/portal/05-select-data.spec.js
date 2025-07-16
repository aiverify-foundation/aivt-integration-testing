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
        await homePage.editProjectButton.nth(1).click()

    })

    test('Add New AI Model Button', async ({ selectDataPage, page }) => {
        
        console.log('[INFO] Add New AI Model')
        await selectDataPage.addNewAIModelButton.click()

        /* Assert Add New AI Model Button */
        await expect(page).toHaveURL(new RegExp(url + ":" + port_number + "/models/upload"))

    })

    test('Run Test Button', async ({ selectDataPage, page }) => {

        console.log('[INFO] Run Test')
        await selectDataPage.runTestButton.first().click()

        /* Assert Add New AI Model Button */
        await expect(page).toHaveURL(new RegExp(url + ":" + port_number + "/results/run"))

    })

    test('Upload Test Results Button', async ({ selectDataPage, page }) => {

        console.log('[INFO] Upload Test Results')
        await selectDataPage.uploadTestResultsButton.click()

        /* Assert Upload Test Results Button' */
        await expect(page).toHaveURL(new RegExp(url + ":" + port_number + "/results/upload"))

    })

    test('Add Input Button', async ({ selectDataPage, page }) => {

        console.log('[INFO] Add Input')
        await selectDataPage.addInputButton.click()

        /* Assert Add Input Button */
        await expect(page).toHaveURL(new RegExp(url + ":" + port_number + "/inputs/groups"))
    })

    test('Next Button', async ({ selectDataPage, page}) => {

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