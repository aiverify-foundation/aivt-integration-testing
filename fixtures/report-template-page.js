import { readFileSync } from 'fs'

export class ReportTemplatePage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;

        /* Select Report Template Pagge */
        this.reportTemplateCard = page.locator('.card_card__xeFXn')

        /* Report Template Page */
        this.reportTemplateSearchBar = page.getByPlaceholder('Search templates...')
        this.uploadTemplateButton = page.getByRole('button', { name: 'UPLOAD TEMPLATE' })
        this.clearSearchButton = page.getByRole('button', { name: 'Clear' })
        this.editReportTemplateButton = page.locator('.transition-colors')
        this.viewReportTemplateButton = page.locator('.transition-colors').first()
        this.copyReportTemplateButton = page.locator('.undefined > button:nth-child(2)').first()

        /* Edit Mode */
        this.editModeButton = page.getByRole('button', { name: 'Switch to Edit Mode' })
        this.viewModeButton = page.getByRole('button', { name: 'Switch to View Mode' })

        /* Upload Report Template */
        this.removeReportTemplateFileButton = page.getByRole('button').nth(1)

    }

    /**
     * @param { string }
     */
    async selectReportTemplate(reportTemplateName) {

        /* Report Template */
        console.log('[INFO] Select Report Template');
        await this.page.getByRole('heading', { name: reportTemplateName, exact: true }).click();

    }

    /**
     * @param { string }
     */
    async searchReportTemplate(reportTemplateName) {

        await this.reportTemplateSearchBar.fill(reportTemplateName);

    }

    /**
     * @param {*} filePathStringArray 
     */
    async dragAndDropFile(filePathStringArray) {
        for (const filePath of filePathStringArray) {
            const bufferData = readFileSync(filePath).toString('base64');
            const dataTransfer = await this.page.evaluateHandle(async (data) => {
                const transferData = new DataTransfer();
                const blobData = await fetch(data).then(res => res.blob());
                const file = new File([blobData], 'Project-1-12.data.json', { type: 'application/json' });
                transferData.items.add(file);
                return transferData;
            }, 'data:application/octet-stream;base64,' + bufferData);
            await this.page.dispatchEvent('#fileInput', 'drop', { dataTransfer });
        }
    }
}