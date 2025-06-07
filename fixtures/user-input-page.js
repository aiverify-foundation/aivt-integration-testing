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

        /* AI Verify Process Checklist */
        this.createNewChecklist = page.getByRole('button', { name: 'Create New' });
        this.elaborationTextArea = page.locator('textarea');
        this.summaryJustificationTextBox = page.getByRole('textbox').filter({ hasText: /^$/ });

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
            for(let counter = 0; counter < checklistParameters.numberOfRows; counter++) {
                await this.page.getByText(checklistParameters.yesNoNAOptions, { exact: true }).nth(counter).click()
                await this.elaborationTextArea.nth(counter).fill('test')
            }
            if(processChecklistType == "aiverify")
                await this.summaryJustificationTextBox.fill('Summary Justification')
            await this.page.evaluate(() => window.scrollTo(0, 0));
            await this.page.getByRole('link', { name: processChecklistID }).click();
        }

        console.log('[INFO] Process Checklist Completed')
    }

    /**
     * @param { }
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
        await expect(this.page.getByText('Tree updated successfully')).toBeVisible()

    }

}
