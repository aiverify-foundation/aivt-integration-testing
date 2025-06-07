export class HomePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    /* Home Page */
    this.aivlogo = page.getByRole('link', { name: 'AI Verify' });
    this.manageButton = page.getByRole('link', { name: 'Manage Models, Datasets, etc' });
    
  }

  /**
   * @param {string}
   */
  async goto(url) {
    await this.page.goto(url)
  }

}