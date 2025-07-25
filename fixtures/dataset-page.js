import { readFileSync } from 'fs'
import { expect } from './base-test'

export class DatasetPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    
    /* Dataset Page */
    this.aivlogo = page.getByRole('link', { name: 'AI Verify' });
    this.uploadDatasetButton = page.getByRole('button', { name: 'UPLOAD DATASET' });
    this.searchDatasetBar = page.getByPlaceholder('Search by Name');
    this.checkBox = page.getByRole('checkbox');
    this.algorithmNameCell = page.locator('td:nth-child(3)');
    this.rowsCell = page.locator('td:nth-child(4)');
    this.colsCell = page.locator('td:nth-child(5)');
    this.dateCell = page.locator('td:nth-child(6)');
    this.deleteDatasetButton = page.locator('.p-6 > section > div > div > .icon_icon_wrapper__T4ODW > svg');
    this.deleteDialogBoxButton = page.getByRole('button', { name: "DELETE" });

    /* Upload Dataset Option */
    this.uploadDatasetFileButton = page.getByRole('button', { name: 'FILE' });
    this.uploadDatasetFolderButton = page.getByRole('button', { name: 'FOLDER' });
    this.removeDatasetFile = page.getByRole('button').filter({ hasText: /^$/ });

    /* Upload Dataset File */
    this.uploadFileButton = page.getByRole('button', { name: 'CONFIRM UPLOAD' });
    this.uploadFileCloseDialogButton = page.locator('header').filter({ hasText: 'Upload Dataset' }).getByRole('img');

    /* Upload Dataset Folder */
    this.uploadFolderButton = page.getByRole('button', { name: 'UPLOAD 1 FOLDER' })
    this.uploadFolderCloseDialogButton = page.locator('header').filter({ hasText: 'Upload Status' }).getByRole('img');
    this.clearAllButton = page.getByRole('button', { name: 'CLEAR ALL' });
    this.removeDatasetFolder = page.getByRole('button', { name: 'Remove' });
    this.viewDatasetButton = page.getByRole('button', { name: 'VIEW DATASETS' });

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
        const file = new File([blobData], 'pickle_pandas_fashion_mnist_annotated_labels_10.sav', { type: 'application/x-spss-sav' });
        transferData.items.add(file);
        return transferData;
      }, 'data:application/octet-stream;base64,' + bufferData);
      await this.page.dispatchEvent('#fileInput', 'drop', { dataTransfer });
    }
    await this.uploadFileButton.click();
    await expect.soft(this.page.getByText('Upload Successful!')).toBeVisible();
    await this.uploadFileCloseDialogButton.click();
  }

  /**
   * @param { string array }
   */
  async uploadFile(filePathStringArray) {
    for(const filePath of filePathStringArray) {
        await this.page.locator('#fileInput').setInputFiles(filePath);
    }
    await this.uploadFileButton.click();
    await expect.soft(this.page.getByText('Upload Successful!')).toBeVisible();
    await this.uploadFileCloseDialogButton.click();
  }

  /**
   * @param { string array }
   */
  async uploadFolder(folderPathStringArray) {
    for(const folderPath of folderPathStringArray) {
      await this.page.locator('#folderInput').setInputFiles(folderPath);
      await this.uploadFolderCloseDialogButton.click();
      await this.uploadFolderButton.click();
      await expect.soft(this.page.getByText('Upload completed: 1 successful, 0 failed.')).toBeVisible();
      await this.uploadFolderCloseDialogButton.click();
    }

  }

  /**
   * @param { string }
   */
  async searchDataset(term) {

    console.log('[INFO] Search Dataset')
    await this.searchDatasetBar.fill(term)

  }

}