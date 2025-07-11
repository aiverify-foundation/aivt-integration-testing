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
    this.searchBar = page.getByPlaceholder('Search projects...');
    this.clearButton = page.getByRole('button', { name: 'Clear' });
    this.viewReportButton = page.locator('.undefined > a');
    this.editProjectButton = page.locator('div:nth-child(11) > .card_cardFlexbox__uYoDY > .undefined > a:nth-child(2)');
    this.deleteProjectButton = page.locator('.undefined > .cursor-pointer');
    this.deleteProjectDialogBoxButton = page.getByRole('button', { name: 'Delete'});
    this.cancelDeleteProjectDialogBoxButton = page.getByRole('button', { name: 'Cancel' });
    this.projectNameDetailCard = page.locator('.flex > div > .card_cardFlexbox__uYoDY h3');
    this.projectDescriptionDetailCard = page.locator('.flex > div > .card_cardFlexbox__uYoDY p');
    
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