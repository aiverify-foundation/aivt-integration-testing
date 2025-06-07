import { readFileSync } from 'fs'

export class ManagePage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;

        /* Manage Page */
        this.modelButton = page.getByRole('link', { name: 'Manage Models Models' });
        this.datasetButton = page.getByRole('link', { name: 'Manage datasets Data' });
        this.testResultButton = page.getByRole('link', { name: 'Manage test results Test' });
        this.userInputButton = page.getByRole('link', { name: 'Manage user inputs User Inputs' });
    }

}