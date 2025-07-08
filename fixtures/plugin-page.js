import { readFileSync } from 'fs'
import { expect } from './base-test'

export class PluginPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    /* View Plugins Page */
    this.templateFilter = page.getByRole('button', { name: 'TEMPLATES' });
    this.widgetFilter = page.getByRole('button', { name: 'WIDGETS' });
    this.algorithmFilter = page.getByRole('button', { name: 'ALGORITHMS' });
    this.inputBlockFilter = page.getByRole('button', { name: 'INPUT BLOCKS' });
    this.tagsDropDownList = page.locator('#filter-dropdown');
    this.searchBar = page.getByPlaceholder('Search Plugins');

    /* Upload Plugins Page */
    this.uploadPluginButton = page.getByRole('button', { name: 'UPLOAD PLUGIN' });
    this.confirmUploadButton = page.getByRole('button', { name: 'CONFIRM UPLOAD' });
    this.closeDialogBoxButton = page.getByRole('dialog', { name: 'upload status modal' }).getByRole('img');
    this.backButton = page.getByRole('banner', { name: 'Uploader header' }).getByRole('link');
    this.removePluginFileButton = page.locator('g#cross')

  }

  /**
   * @param { string array }
   */
  async dragAndDropFile(filePathStringArray) {
    for (const filePath of filePathStringArray) {
      const bufferData = readFileSync(filePath).toString('base64');
      const dataTransfer = await this.page.evaluateHandle(async (data) => {
        const transferData = new DataTransfer();
        const blobData = await fetch(data).then(res => res.blob());
        const file = new File([blobData], 'cccs_explainability_2.0.zip', { type: 'application/json' });
        transferData.items.add(file);
        return transferData;
      }, 'data:application/octet-stream;base64,' + bufferData);
      await this.page.dispatchEvent('#fileInput', 'drop', { dataTransfer });
    }
  }

  /**
   * @param { string array }
   * 
   */
  async uploadFile(filePathStringArray) {
    for (const filePath of filePathStringArray) {
      await this.page.locator('#fileInput').setInputFiles(filePath);
    }
    
  }
}