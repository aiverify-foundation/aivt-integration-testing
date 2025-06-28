import { expect } from './base-test'
import { setTimeout } from "timers/promises"

export class CanvasPage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;

        /* Canvas SideBar */
        this.searchBar = page.getByPlaceholder('Search plugins');
        this.sideBarButton = page.locator('button').first();

        /* Canvas */
        this.deleteWidget = page.locator('div > .remixicon').first();
        this.deletePage2 = page.locator('#page-1').getByRole('button');

        /* Canvas Page */
        this.grid = page.locator(".grid");
        this.printButton = page.getByRole('button', { name: 'Print' });
        this.saveAsTemplateButton = page.getByRole('button', { name: 'Save as Template' });
        this.gridButton = page.getByRole('button', { name: 'Toggle Grid' });
        this.specificPageButton = page.getByRole('button', { name: 'Go to specific page' });
        this.specificPageTextBox = page.getByRole('textbox', { name: 'Go to page' });
        this.zoomInButton = page.getByRole('button', { name: 'Zoom in' });
        this.resetViewButton = page.getByRole('button', { name: '%' });
        this.zoomOutButton = page.getByRole('button', { name: 'Zoom out' });
        this.addPageButton = page.getByRole('button', { name: 'Add new page' });
        this.nextPageButton = page.getByRole('button', { name: 'Next page' });
        this.page1 = page.getByTitle('Go to page 1');
        this.page2 = page.getByRole('button', { name: '2', exact: true });
        this.previousPageButton = page.getByRole('button', { name: 'Previous page'});
        this.viewTestAlgorithmsButton = page.getByTitle('View test(s)/algorithm(s) for this report');
        this.viewInputBlocksButton = page.getByTitle('View input block(s) for this report');
        this.goBackButton = page.getByRole('button', { name: 'Go back' });
        this.nextButton = page.getByRole('button', { name: 'Next', exact: true });
        this.backButton = page.getByRole('button', { name: 'Back' });

    }

    /**
     * @param { string, string, string, array }
     */
    async searchTerm(searchTerm, searchType, pluginName, pluginNamesArray) {

        /* Search Term */
        console.log('[INFO] Search Plugin / Widget')
        await this.searchBar.fill(searchTerm)

        /* Assert Search Term */
        if(searchTerm == "plugin")
            await expect(this.page.getByText(searchTerm)).toBeVisible()

        if(searchType == "widget") {
            await this.page.getByRole('button', { name: pluginName }).click()
            await expect(this.page.getByText(searchTerm)).toBeVisible()
        }

        /* Assert Non-Searched Term */
        for(const names of pluginNamesArray) {
            await expect(this.page.getByText(names)).not.toBeVisible()
        }

    }

    /**
     * @param { object array }
     */
    async dragAndDrop(plugins) {
        for(const plugin of plugins) {
            await this.page.getByRole('button', { name: plugin.pluginName }).click();
            await this.page.getByText(plugin.widgetName).dragTo(this.page.locator('#printableContent'));
            await setTimeout(2000)
        }
    }
}
