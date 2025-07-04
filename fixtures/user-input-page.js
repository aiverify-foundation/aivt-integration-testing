import { readFileSync } from 'fs'
import { expect } from './base-test'

export class UserInputPage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;

        /* User Input Page */
        this.AIVerifyProcessChecklistButton = page.getByRole('link', { name: 'Manage input blocks in this group AI Verify Process Checklists' });
        this.VeritasProcessChecklistButton = page.getByRole('link', { name: 'Manage input blocks in this group Veritas Process Checklists' });
        this.FairnessTreeButton = page.getByRole('link', { name: 'Manage input blocks in this group Fairness Tree' });

        /* Shared Components */
        this.addNewChecklist = page.getByRole('button', { name: 'ADD CHECKLISTS' });
        this.userInputSearchBar = page.getByPlaceholder('Search');
        this.addCheckListButton = page.getByRole('button', { name: 'ADD CHECKLISTS' });

        /* AI Verify Process Checklist */
        this.createNewChecklist = page.getByRole('button', { name: 'Create New' });
        this.elaborationTextArea = page.locator('textarea');
        this.summaryJustificationTextBox = page.getByRole('textbox').filter({ hasText: /^$/ });
        this.createNewButton = page.getByRole('button', { name: 'Create New' });
        this.exportCheckListButton = page.getByRole('button', { name: 'Export checklists' });
        this.excelSheetRadioButton = page.getByRole('radio', { name: 'Excel (.xlsx)' });
        this.jsonRadioButton = page.getByRole('radio', { name: 'JSON (.json)' });
        this.exportCheckListExportDialogButton = page.getByRole('button', { name: 'Export', exact: true });
        this.editChecklistNameButton = page.getByRole('button').nth(2);
        this.editChecklistTextBox = page.locator('#edit-name-form').getByRole('textbox');
        this.saveChecklistNameButton = page.getByRole('button', { name: 'Save' });
        this.cancelChecklistNameButton = page.getByRole('button', { name: 'Cancel' });
        this.deleteChecklistButton = page.getByRole('button').nth(3);
        this.confirmDeleteDialogBoxButton = page.getByRole('button', { name: "Confirm" });
        this.AIVerifyProcessChecklistSearchBar = page.getByPlaceholder('Search');
        this.uploadExcelSheetButton = page.getByRole('button', { name: 'Upload Excel' });
        this.removeExcelSheetButton = page.getByRole('button').filter({ hasText: /^$/ });
        this.confirmUploadDialogBoxButton = page.getByRole('button', { name: 'CONFIRM UPLOAD' });

        /* Fairness Tree */
        this.addInputBlock = page.getByRole('button', { name: 'ADD INPUT BLOCK' });
        this.FairnessTreeName = page.getByRole('textbox', { name: 'Name', exact: true });
        this.sensitiveFeatureName = page.getByRole('textbox', { name: 'Sensitive Feature Name(s)*' });
        this.favourableAllocatedResource = page.getByRole('textbox', { name: 'Favourable Allocated Resource' })
        this.qualifiedGroup = page.getByRole('textbox', { name: 'Qualified Group*', exact: true })
        this.unqualifiedGroup = page.getByRole('textbox', { name: 'Unqualified Group*' })
        this.nextButton = page.getByRole('button', { name: 'Next' });
        this.outcome1checkbox = page.locator('[id="outcome-select-n1\\.1"]');
        this.textArea = page.locator('textarea')
        this.yesButton = page.getByText('Yes')
        this.submitButton = page.getByRole('button', { name: 'Submit' });

    }

    /**
     * @param { object }
     */
    async completeProcessChecklist(processCheckListParameters, processChecklistType, processChecklistID) {
        for (const checklistParameters of processCheckListParameters) {
            console.log('[INFO] Completing ' + checklistParameters.name + ' Category');
            await this.page.getByText(checklistParameters.name).nth(1).click();
            for (let counter = 0; counter < checklistParameters.numberOfRows; counter++) {
                await this.page.getByText(checklistParameters.yesNoNAOptions, { exact: true }).nth(counter).click()
                await this.elaborationTextArea.nth(counter).fill('test')
            }
            if (processChecklistType == "aiverify")
                await this.summaryJustificationTextBox.fill('Summary Justification')
            await this.page.evaluate(() => window.scrollTo(0, 0));
            await this.page.getByRole('link', { name: processChecklistID }).click();
        }

        console.log('[INFO] Process Checklist Completed')
    }

    /**
     * @param {}
     */
    async dragAndDropFile(filePathStringArray, format) {
        for (const filePath of filePathStringArray) {
            const bufferData = readFileSync(filePath).toString('base64');
            const dataTransfer = await this.page.evaluateHandle(async (data) => {
                const transferData = new DataTransfer();
                const blobData = await fetch(data).then(res => res.blob());
                const file = new File([blobData], 'AI Verify Process Checklists Exported Excel_checklists.xlsx', { type: 'application/vnd.ms-excel' });
                transferData.items.add(file);
                return transferData;
            }, 'data:application/octet-stream;base64,' + bufferData);
            await this.page.dispatchEvent('#fileInput', 'drop', { dataTransfer });
        }
    }

    /**
     * @param {*} filePathStringArray 
     */
    async uploadFile(filePathStringArray) {
        for (const filePath of filePathStringArray) {
            await this.page.locator('#fileInput').setInputFiles(filePath);
        }
    }

    /**
     * @param {}
     */
    async validateProcessChecklist() {
        let i = 0
        while (await this.page.locator('circle').nth(i).isVisible()) {
            if (i < 5)
                await expect.soft(this.page.locator('circle').nth(i)).toHaveCSS('fill', 'rgb(59, 177, 64)')
            else
                await expect.soft(this.page.locator('circle').nth(i)).toHaveCSS('fill', 'rgb(238, 145, 78)')
            i++
        }
    }

    /**
     * @param {}
     */
    async completeFairnessTree() {
        await this.addInputBlock.click()
        await this.FairnessTreeName.click()
        await this.FairnessTreeName.fill('Fairness Tree')
        await this.sensitiveFeatureName.click()
        await this.sensitiveFeatureName.fill('test')
        await this.favourableAllocatedResource.click()
        await this.favourableAllocatedResource.fill('test')
        await this.qualifiedGroup.click()
        await this.qualifiedGroup.fill('test')
        await this.unqualifiedGroup.click()
        await this.unqualifiedGroup.fill('test')
        await this.nextButton.click()
        await this.outcome1checkbox.check()
        await this.textArea.click()
        await this.textArea.fill('test')
        await this.nextButton.click()
        await this.yesButton.click()
        await this.textArea.click()
        await this.textArea.fill('test')
        await this.nextButton.click()
        await this.submitButton.click()
        await expect.soft(this.page.getByText('Tree updated successfully')).toBeVisible()

    }

    /**
     * @param { string }
     */
    async searchUserInput(reportTemplateName) {

        await this.reportTemplateSearchBar.fill(reportTemplateName);

    }

}
