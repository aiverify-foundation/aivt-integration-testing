import { readFileSync } from 'fs'
import { expect } from './base-test'

export class ModelPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    /* Model Page */
    this.aivlogo = page.getByRole('link', { name: 'AI Verify' }).nth(1);
    this.uploadModelButton = page.getByRole('button', { name: 'UPLOAD MODEL' });

    /* Upload Model Option */
    this.uploadAIModelButton = page.getByText('Upload AI ModelSupported');
    this.uploadAIModelPipelineButton = page.getByText('Upload PipelineSupported');
    this.nextButton = page.getByRole('button', { name: 'NEXT' });

    /* Upload AI Model */
    this.uploadModelFileButton = page.getByRole('button', { name: 'FILE' });
    this.uploadModelFolderButton = page.getByRole('button', { name: 'FOLDER' });
    this.modelTypeComboBox = page.getByRole('combobox');
    this.uploadFileButton = page.getByRole('button', { name: 'UPLOAD FILE(S)' });
    this.uploadFileBackButton = page.locator('div').filter({ hasText: /^Add New AI Model > Upload Model$/ }).getByRole('img');

    /* Upload AI Model Pipeline */
    this.uploadPipelineButton = page.getByRole('button', { name: 'UPLOAD 1 PIPELINE' });
    this.uploadFolderButton = page.getByRole('button', { name: 'UPLOAD FOLDER' });
    this.uploadFolderCloseDialogButton = page.locator('header').filter({ hasText: 'Upload Status' }).getByRole('img');

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
        const file = new File([blobData], 'sample_bc_credit_sklearn_linear.LogisticRegression.sav', { type: 'application/x-spss-sav' });
        transferData.items.add(file);
        return transferData;
      }, 'data:application/octet-stream;base64,' + bufferData);
      await this.page.dispatchEvent('#fileInput', 'drop', { dataTransfer });
    }
    await this.modelTypeComboBox.click();
    await this.modelTypeComboBox.selectOption('classification');
    await this.uploadFileButton.click();
    await expect.soft(this.page.getByText("Files uploaded successfully!")).toBeVisible();
    await this.uploadFolderCloseDialogButton.click();
  }

  /**
   * @param { string array }
   */
  async dragAndDropFolder(folderPathStringArray) {
    // const fileList = readdirSync('')
    // await this.page.dispatchEvent('#folderInput', 'drop', { dataTransfer });
    // await this.modelTypeComboBox.click();
    // await this.modelTypeComboBox.selectOption('classification');
    // await this.uploadFileButton.click();
    // await expect.soft(this.page.getByText("Files uploaded successfully!")).toBeVisible();
    // await this.uploadFolderCloseDialogButton.click();
  }

  /**
   * @param {string}
   */
  async uploadFolder(folderPathStringArray, modelType) {
    if (modelType == "folderInput") {
      for (const folderPath of folderPathStringArray) {
        await this.page.locator('#folderInput').setInputFiles(folderPath);
        await this.modelTypeComboBox.click();
        await this.modelTypeComboBox.selectOption('classification');
        await this.uploadFolderButton.click();
        await expect.soft(this.page.getByText('Folder uploaded successfully!')).toBeVisible();
        await this.uploadFolderCloseDialogButton.click();
      }
    }

    if (modelType == "pipelineInput") {
      for (const folderPath of folderPathStringArray) {
        await this.page.locator('#pipelineInput').setInputFiles(folderPath);
        await this.uploadFolderCloseDialogButton.click();
        await this.modelTypeComboBox.first().click();
        if(folderPath.includes('regression_tabular_donation'))
          await this.modelTypeComboBox.first().selectOption('regression');
        else
          await this.modelTypeComboBox.first().selectOption('classification');
        await this.uploadPipelineButton.click();
        await expect.soft(this.page.getByText('Upload completed: 1 successful, 0 failed.')).toBeVisible();
        await this.uploadFolderCloseDialogButton.click();
      }
    }
  }

}