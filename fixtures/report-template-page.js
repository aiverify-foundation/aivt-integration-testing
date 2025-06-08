export class ReportTemplatePage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;

    }

    /**
     * @param { string }
     */
    async selectReportTemplate(reportTemplateName) {

        /* Report Template */
        console.log('[INFO] Select Report Template');
        await this.page.getByRole('heading',{ name: reportTemplateName, exact: true }).click();
        
    }
}