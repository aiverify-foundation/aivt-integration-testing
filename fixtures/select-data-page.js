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
    async selectDataComboBox(arrayofOptionLabels) {

        /* Select Data */
        console.log('[INFO] Select Data');
        for(let counter = 0; counter < arrayofOptionLabels.length; counter++) {
            const combobox = this.inputComboBox.nth(counter + 1);
            await expect(combobox).toBeVisible()
            
            const searchText = arrayofOptionLabels[counter];
            const matchingValue = await combobox.locator('option')
                                                .filter({ hasText: searchText })
                                                .first()
                                                .getAttribute('value');
            await expect(matchingValue).toEqual(expect.any(String));
            await expect(matchingValue.length).toBeGreaterThan(0);

            console.log('[INFO] Matching Value:', matchingValue, ', Search Text:', searchText);
            await combobox.selectOption(matchingValue);
        }
        
        await this.nextButton.click()
    }
}