import { expect } from './base-test'
export class CanvasPage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;

        /* Canvas Page */
        this.specificPageButton = page.getByRole('button', { name: 'Go to specific page' });
        this.specificPageTextBox = page.getByRole('textbox', { name: 'Go to page' });
        this.zoomInButton = page.getByRole('button', { name: 'Zoom in' });
        this.zoomOutButton = page.getByRole('button', { name: 'Zoom out' });

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
}
