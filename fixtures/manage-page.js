import { readFileSync } from 'fs'

export class ManagePage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;

        /* Manage Page */
        this.modelButton = page.getByRole('link', { name: 'Manage Models Models' });
        this.datasetButton = page.getByRole('link', { name: 'Manage datasets Data' });
        this.testResultButton = page.getByRole('link', { name: 'Manage test results Test' });
    }

    /**
      * @param {string}
      */
    async goto(url) {
        await this.page.goto(url);
    }

    /**
     * @param {string}
     */
    async uploadValidSourceText(format) {

        await this.createSummaryButton.click()

        if (format == 'xml') {
            const bufferData = readFileSync('./data/49701-M.xml').toString('base64')
            const dataTransfer = await this.page.evaluateHandle(async (data) => {
                const transferData = new DataTransfer()
                const blobData = await fetch(data).then(res => res.blob())
                const file = new File([blobData], '49701-M.xml', { type: 'text/xml' })
                transferData.items.add(file)

                return transferData
            }, 'data:application/octet-stream;base64,' + bufferData)

            await this.page.dispatchEvent('#upload-input', 'drop', { dataTransfer })

        }
        else if (format == 'docx') {
            const bufferData = readFileSync('./data/[2023] SCGA 30.docx').toString('base64')
            const dataTransfer = await this.page.evaluateHandle(async (data) => {
                const transferData = new DataTransfer()
                const blobData = await fetch(data).then(res => res.blob())
                const file = new File([blobData], '[2023] SCGA 30.docx', { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' })
                transferData.items.add(file)

                return transferData
            }, 'data:application/octet-stream;base64,' + bufferData)

            await this.page.dispatchEvent('#upload-input', 'drop', { dataTransfer })

        }
    }

    /**
     * @param {integer} number
     */
    async uploadInvalidSourceText(option) {

        let filePath = ''

        if (option == 1) {
            filePath = './data/49701-M.xml'
        }
        else if (option == 2) {
            filePath = './data/49701-M-copy.xml'
        }

        await this.createSummaryButton.click()

        const bufferData = readFileSync(filePath).toString('base64')

        const dataTransfer = await this.page.evaluateHandle(async (data) => {

            const transferData = new DataTransfer()
            const blobData = await fetch(data).then(res => res.blob())
            const file = new File([blobData], '49701-M.xml', { type: 'text/html' })
            transferData.items.add(file)

            return transferData
        }, 'data:application/octet-stream;base64,' + bufferData)

        await this.page.dispatchEvent('#upload-input', 'drop', { dataTransfer })
        await this.page.waitForTimeout(500)

    }

}