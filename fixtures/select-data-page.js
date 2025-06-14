export class SelectDataPage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;

        /* Select Data Page */
        this.modelDropDownBox = page.locator('select')
        this.inputDropDownBox = page.locator('.relative > .w-full')
        this.inputComboBox = page.getByRole('combobox');
        this.nextButton = page.getByRole('button', { name: 'Next' })

    }

    /**
     * @param { object }
     */
    async selectData(arrayofIDs) {

        /* Select Data */
        console.log('[INFO] Select Data');
        for(let counter = 0; counter < arrayofIDs.length; counter++) {
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
            await this.inputComboBox.nth(counter + 1).selectOption(arrayofIDs[counter]);
        }
        await this.nextButton.click()

    }
}