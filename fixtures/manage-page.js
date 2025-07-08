export class ManagePage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;

        /* Manage Page */
        this.modelButton = page.getByRole('link', { name: 'Manage Models Models' });
        this.datasetButton = page.getByRole('link', { name: 'Manage datasets Data' });
        this.reportTemplateButton = page.getByRole('link', { name: 'Manage report templates' });
        this.userInputButton = page.getByRole('link', { name: 'Manage user inputs User Inputs' });
        this.pluginButton = page.getByRole('link', { name: 'Manage plugins Plugins' });
        this.testResultButton = page.getByRole('link', { name: 'Manage test results Test' });
    }

}