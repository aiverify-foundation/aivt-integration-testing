import { expect } from './base-test'

export class SelectDataPage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;

        /* Select Data Page */
        this.modelDropDownBox = page.getByRole('combobox').first()
        this.addNewAIModelButton = page.getByRole('button', { name: 'ADD NEW AI MODEL' })
        this.inputDropDownBox = page.locator('.relative > .w-full')
        this.inputComboBox = page.getByRole('combobox');
        this.runTestButton = page.getByRole('button', { name: 'RUN TESTS' })
        this.uploadTestResultsButton = page.getByRole('button', { name: 'UPLOAD TEST RESULTS' })
        this.addInputButton = page.getByRole('button', { name: 'ADD INPUT' })
        this.nextButton = page.getByRole('button', { name: 'Next' })
        this.backButton = page.getByRole('button', { name: 'Back' })

    }

    /**
     * @param { object }
     */
    async selectData(arrayofIDs) {

        /* Select Data */
        console.log('[INFO] Select Data');
        for(let counter = 0; counter < arrayofIDs.length; counter++) {
            // await expect(this.inputDropDownBox.nth(counter + 1).selectOption(arrayofIDs[counter])).toBeVisible()
            await this.inputDropDownBox.nth(counter + 1).selectOption(arrayofIDs[counter]);
        }

        await this.nextButton.click()
    }

    /**
     * @param { object }
     */

    async selectDataComboBox(arrayofIDs) {

        /* Select Data */
        console.log('[INFO] Select Data');
        for(let counter = 0; counter < arrayofIDs.length; counter++) {
            // await expect(this.inputComboBox.nth(counter + 1).selectOption(arrayofIDs[counter])).toBeVisible()
            await this.inputComboBox.nth(counter + 1).selectOption(arrayofIDs[counter]);
        }
        // await expect(this.nextButton).toBeVisible()
        await this.nextButton.click()

    }

     /**
     * @param { object }
     */
    async selectDataComboBoxVeritas(arrayofIDs, reportTemplateName) {

        console.log('[INFO] Select Data');
        for(let counter = 0; counter < arrayofIDs.length; counter++) {
            // await expect(this.inputComboBox.nth(counter + 1).selectOption(arrayofIDs[counter])).toBeVisible()
            await this.inputComboBox.nth(counter + 1).selectOption(arrayofIDs[counter]);
        }

        await this.page.getByRole('button', { name: 'Back' }).click()
        await this.page.getByRole('heading', { name: reportTemplateName, exact: true }).click();

        // await expect(this.nextButton).toBeVisible()
        await this.nextButton.click()


    }
}