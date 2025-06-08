export class CreateProjectPage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;

        /* Create Project Page */
        this.projectName = page.getByRole('textbox', { name: 'Project Name*' });
        this.projectDescription = page.getByRole('textbox', { name: 'Project Description*' });
        this.reportTitle = page.getByRole('textbox', { name: 'Report Title*' });
        this.companyName = page.getByRole('textbox', { name: 'Company Name*' })
        this.nextButton = page.getByRole('button', { name: 'Next' })

    }

    /**
     * @param { object }
     */
    async createProject(projectInfo) {

        /* Create Project */
        console.log('[INFO] Create Project')
        await this.projectName.fill(projectInfo.projectName);
        await this.projectDescription.fill(projectInfo.projectDescription);
        await this.reportTitle.fill(projectInfo.reportTitle);
        await this.companyName.fill(projectInfo.companyName);
        await this.nextButton.click();
        
    }
}