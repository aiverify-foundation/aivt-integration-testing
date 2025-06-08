import { expect } from './base-test'

export class HomePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    /* Home Page */
    this.aivlogo = page.getByRole('link', { name: 'AI Verify' });
    this.manageButton = page.getByRole('link', { name: 'Manage Models, Datasets, etc' });
    this.createProjectButton = page.getByRole('link', { name: 'Test an AI Model and generate' });
    
  }

  /**
   * @param { string }
   */
  async goto(url) {
    await this.page.goto(url)
  }

  /**
   * @param { string }
   */
  async validateProjectCreation(reportTitle) {

    /* Validate Project Creation */
    console.log('[INFO] Validate Project Creation')
    await expect(this.page.getByRole('heading', { name: reportTitle, exact: true })).toBeVisible()
    console.log('[INFO] Project Created')

  }

}