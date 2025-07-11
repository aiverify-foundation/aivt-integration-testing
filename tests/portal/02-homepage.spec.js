import { test, expect } from '../../fixtures/base-test'

const url = process.env.URL
const port_number = process.env.PORT_NUMBER

test.describe('HomePage', () => {

    test.beforeEach(async ({ homePage }) => {

        /* AI Verify Homepage */
        console.log('[INFO] Navigate to AI Verify Home Page')
        await homePage.goto(url + ":" + port_number)
        await expect.soft(homePage.aivlogo).toBeVisible({ timeout: 60000 })

    })

    test('Project Card', async ({ homePage }) => {

        /* Project Card */
        console.log('[INFO] Project Card Details')
        const projectName = await homePage.projectNameDetailCard.nth(0).textContent()
        const projectDescription = await homePage.projectDescriptionDetailCard.nth(0).textContent()

        /* Assert Project Card */
        await expect.soft(projectName).toBeTruthy()
        await expect.soft(projectDescription).toBeTruthy()

    })

    test('Search Existing Project Name', async ({ homePage, page }) => {

        /* Search Project */
        console.log('[INFO] Search Project Bar')
        await homePage.searchBar.fill('Classification')

        /* Assert Search Existing Project Name */
        await expect.soft(page.getByRole('heading', { name: 'Veritas Base Classification' })).toBeVisible()

    })

    test('Search Non-existing Project Name', async ({ homePage }) => {

        /* Search Project */
        console.log('[INFO] Search Project Bar')
        await homePage.searchBar.fill('   bar')

        /* Assert Search Non-existing Project Name */
        await expect.soft(homePage.projectNameDetailCard).not.toBeVisible()
        await expect.soft(homePage.projectDescriptionDetailCard).not.toBeVisible()

    })

    test('Clear Button', async ({ homePage, page }) => {

        /* Search Project */
        console.log('[INFO] Search Project Bar')
        await homePage.searchBar.fill('   bar')

        /* Assert Search Non-existing Project Name */
        await expect.soft(homePage.projectNameDetailCard).not.toBeVisible()
        await expect.soft(homePage.projectDescriptionDetailCard).not.toBeVisible()

        await homePage.clearButton.click()

        /* Assert Clear Button */
        await expect.soft(page.getByText('bar')).not.toBeVisible()

    })

    test('View Generated Button', async ({ homePage, page }) => {

        /* View Report */
        console.log('[INFO] View Report')
        await homePage.viewReportButton.first().click()
        
        /* Assert View Generated Button */
        await expect(page).toHaveURL(new RegExp(url + ":" + port_number + "/canvas"))

    })

    test('Edit Existing Project', async ({ homePage, page }) => {

        /* Edit Project */
        console.log('[INFO] Edit Project')
        await homePage.editProjectButton.first().click()

        /* Assert Edit Existing Project */
        await expect(page).toHaveURL(new RegExp(url + ":" + port_number + "/project/select_data"))

    })

    test('Delete Existing Project', async ({ homePage, page }) => {

        /* Get Project Details */
        const projectName = await homePage.projectNameDetailCard.nth(0).textContent()
        const projectDescription = await homePage.projectDescriptionDetailCard.nth(0).textContent()

        /* Delete Existing Project */
        console.log('[INFO] Delete Existing Project')
        await homePage.deleteProjectButton.first().click()
        await homePage.deleteProjectDialogBoxButton.click()

        /* Assert Delete Existing Project */
        await expect.soft(page.locator('header').filter({ hasText: 'Success' })).toBeVisible()
        await page.getByRole('button', { name: 'OK' }).click()
        await expect(await homePage.projectNameDetailCard.nth(0).textContent()).not.toBe(projectName)
        await expect(await homePage.projectDescriptionDetailCard.nth(0).textContent()).not.toBe(projectDescription)

    })

    test('Cancel Delete Existing Project', async ({ homePage }) => {

        /* Get Project Details */
        const projectName = await homePage.projectNameDetailCard.nth(0).textContent()
        const projectDescription = await homePage.projectDescriptionDetailCard.nth(0).textContent()

        /* Delete Existing Project */
        console.log('[INFO] Delete Existing Project')
        await homePage.deleteProjectButton.first().click()
        await homePage.cancelDeleteProjectDialogBoxButton.click()

        /* Assert Cancel Delete Existing Project */
        await expect(await homePage.projectNameDetailCard.nth(0).textContent()).toBe(projectName)
        await expect(await homePage.projectDescriptionDetailCard.nth(0).textContent()).toBe(projectDescription)

    })
    
})