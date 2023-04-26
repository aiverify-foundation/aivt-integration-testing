import { test, expect } from '@playwright/test'

import axios from 'axios'
import qs from 'querystring'
import fs from 'fs'
import FormData from 'form-data'

const API_ENDPOINT = "http://localhost:3000"

test.skip('Get Report', () => {

    test('Get Generated Report with Valid Project ID', async () => {

        const projectId = "641701b8a2342c3bef3ba2db"

        const response = await axios.get(API_ENDPOINT + "/api/report/" + projectId, {
            validateStatus: function (status) {
                return status < 600; // Resolve only if the status code is less than 600
            }
        })

        // Assert Response
        expect(response.status).toBe(200)

    })

    test('Get Generated Report with Invalid Project ID', async () => {

        const projectId = "6416da997de481f468cd535"

        const response = await axios.get(API_ENDPOINT + "/api/report/" + projectId, {
            validateStatus: function (status) {
                return status < 600; // Resolve only if the status code is less than 600
            }
        })

        expect(response.status).toBe(400)
    })

    test('Get Generated Report with Empty Project ID', async () => {

        const projectId = " "

        const response = await axios.get(API_ENDPOINT + "/api/report/" + projectId, {
            validateStatus: function (status) {
                return status < 600; // Resolve only if the status code is less than 600
            }
        })

        expect(response.status).toBe(404)
    })

    test('Get Non-Generated Report with Valid Project ID', async () => {

        const projectId = "640ed93df41596fba88f013b"

        const response = await axios.get(API_ENDPOINT + "/api/report/" + projectId, {
            validateStatus: function (status) {
                return status < 600; // Resolve only if the status code is less than 600
            }
        })

        expect(response.status).toBe(400)
    })

})

test.skip('Export As Plugin', () => {

    test.skip('Export As Plugin with Valid Inputs', async () => {

        const data = qs.stringify({
            'templateId': '641c23081f8093b05d8455e4',
            'pluginGID': 'cd743373-b5bb-4b6c-98e3-2a36a7d5f6b5',
            'templateCID': 'project-0-5598544214335246'
        });

        const response = await axios.post(API_ENDPOINT + '/api/template/export', data, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            validateStatus: function (status) {
                return status < 600; // Resolve only if the status code is less than 600
            }
        })

        expect(response.status).toBe(200)

    })

    test.skip('Export As Plugin with Invalid Template ID', async () => {

        // Non-existing Template ID
        let data = qs.stringify({
            'templateId': '123',
            'pluginGID': 'cd743373-b5bb-4b6c-98e3-2a36a7d5f6b5',
            'templateCID': 'project-0-5598544214335246'
        });

        let response = await axios.post(API_ENDPOINT + '/api/template/export', data, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            validateStatus: function (status) {
                return status < 600; // Resolve only if the status code is less than 600
            }
        })

        expect(response.status).toBe(500)

        // NULL Template ID
        data = qs.stringify({
            'templateId': null,
            'pluginGID': 'cd743373-b5bb-4b6c-98e3-2a36a7d5f6b5',
            'templateCID': 'project-0-5598544214335246'
        });

        response = await axios.post(API_ENDPOINT + '/api/template/export', data, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            validateStatus: function (status) {
                return status < 600; // Resolve only if the status code is less than 600
            }
        })

        expect(response.status).toBe(400)

        // Invalid Template ID Data Type
        data = qs.stringify({
            'templateId': true,
            'pluginGID': 'cd743373-b5bb-4b6c-98e3-2a36a7d5f6b5',
            'templateCID': 'project-0-5598544214335246'
        });

        response = await axios.post(API_ENDPOINT + '/api/template/export', data, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            validateStatus: function (status) {
                return status < 600; // Resolve only if the status code is less than 600
            }
        })

        expect(response.status).toBe(500)

    })

    test.skip('Export As Plugin with Empty Template ID', async () => {

        const data = qs.stringify({
            'templateId': '',
            'pluginGID': 'cd743373-b5bb-4b6c-98e3-2a36a7d5f6b5',
            'templateCID': 'project-0-5598544214335246'
        });

        const response = await axios.post(API_ENDPOINT + '/api/template/export', data, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            validateStatus: function (status) {
                return status < 600; // Resolve only if the status code is less than 600
            }
        })

        expect(response.status).toBe(400)

    })

    test('Export As Plugin with Invalid Plugin GID', async () => {

        // Non-Existing Plugin GID
        let data = qs.stringify({
            'templateId': '641c23081f8093b05d8455e4',
            'pluginGID': '123',
            'templateCID': 'project-0-5598544214335246'
        });

        let response = await axios.post(API_ENDPOINT + '/api/template/export', data, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            validateStatus: function (status) {
                return status < 600; // Resolve only if the status code is less than 600
            }
        })

        expect(response.status).toBe(404)

        // NULL Plugin GID
        data = qs.stringify({
            'templateId': '641c23081f8093b05d8455e4',
            'pluginGID': null,
            'templateCID': 'project-0-5598544214335246'
        });

        response = await axios.post(API_ENDPOINT + '/api/template/export', data, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            validateStatus: function (status) {
                return status < 600; // Resolve only if the status code is less than 600
            }
        })

        expect(response.status).toBe(400)

        // Invalid Plugin GID Data Type
        data = qs.stringify({
            'templateId': '6434f9ba614ddc68e2e251cb',
            'pluginGID': true, //FIXME Explicitly change to String?
            'templateCID': 'project-10'
        });

        response = await axios.post(API_ENDPOINT + '/api/template/export', data, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            validateStatus: function (status) {
                return status < 600; // Resolve only if the status code is less than 600
            }
        })

        expect(response.status).toBe(400)

    })

    test.skip('Export As Plugin with Empty Plugin GID', async () => {

        const data = qs.stringify({
            'templateId': '641c23081f8093b05d8455e4',
            'pluginGID': '',
            'templateCID': 'project-0-5598544214335246'
        });

        const response = await axios.post(API_ENDPOINT + '/api/template/export', data, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            validateStatus: function (status) {
                return status < 600; // Resolve only if the status code is less than 600
            }
        })

        expect(response.status).toBe(400)

    })

    test.skip('Export As Plugin with Invalid Template CID', async () => {

        // Non-Existing Template CID
        let data = qs.stringify({
            'templateId': '641c23081f8093b05d8455e4',
            'pluginGID': 'cd743373-b5bb-4b6c-98e3-2a36a7d5f6b5',
            'templateCID': '123'
        });

        let response = await axios.post(API_ENDPOINT + '/api/template/export', data, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            validateStatus: function (status) {
                return status < 600; // Resolve only if the status code is less than 600
            }
        })

        expect(response.status).toBe(200)

        // NULL Template CID
        data = qs.stringify({
            'templateId': '641c23081f8093b05d8455e4',
            'pluginGID': 'cd743373-b5bb-4b6c-98e3-2a36a7d5f6b5',
            'templateCID': null
        });

        response = await axios.post(API_ENDPOINT + '/api/template/export', data, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            validateStatus: function (status) {
                return status < 600; // Resolve only if the status code is less than 600
            }
        })

        expect(response.status).toBe(400)

        // Invalid Template CID Data Type
        data = qs.stringify({
            'templateId': '641c23081f8093b05d8455e4',
            'pluginGID': 'cd743373-b5bb-4b6c-98e3-2a36a7d5f6b5',
            'templateCID': true //FIXME Explicitly change to String?
        });

        response = await axios.post(API_ENDPOINT + '/api/template/export', data, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            validateStatus: function (status) {
                return status < 600; // Resolve only if the status code is less than 600
            }
        })

        expect(response.status).toBe(400)

    })

    test.skip('Export As Plugin with Empty Template CID', async () => {

        const data = qs.stringify({
            'templateId': '641c23081f8093b05d8455e4',
            'pluginGID': 'cd743373-b5bb-4b6c-98e3-2a36a7d5f6b5',
            'templateCID': ''
        });

        const response = await axios.post(API_ENDPOINT + '/api/template/export', data, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            validateStatus: function (status) {
                return status < 600; // Resolve only if the status code is less than 600
            }
        })

        expect(response.status).toBe(400)

    })

    // FIXME How to trigger a 500 error

})

test.skip('Upload Dataset', () => {

    test('Upload Dataset with Valid Dataset', async () => {

        const form_data = new FormData()
        form_data.append('myFiles', fs.createReadStream('/home/benflop/GitHub/frontend-testing/fixtures/pickle_pandas_tabular_loan_testing.sav'));

        const response = await axios.post(API_ENDPOINT + '/api/upload/data', form_data, {
            headers: {
                ...form_data.getHeaders()
            },
            data: form_data,
            validateStatus: function (status) {
                return status < 600; // Resolve only if the status code is less than 600
            }
        })

        expect(response.status).toBe(201)

    })

    test('Upload Dataset with Invalid Dataset', async () => {

        const form_data = new FormData()

        // TODO Need invalid dataset
        form_data.append('myFiles', fs.createReadStream('/home/benflop/GitHub/frontend-testing/fixtures/pickle_pandas_tabular_loan_testing.sav'));

        const response = await axios.post(API_ENDPOINT + '/api/upload/data', form_data, {
            headers: {
                ...form_data.getHeaders()
            },
            data: form_data,
            validateStatus: function (status) {
                return status < 600; // Resolve only if the status code is less than 600
            }
        })

        expect(response.status).toBe(400)

    })

    test('Upload Dataset with Empty Dataset', async () => {

        const form_data = new FormData()

        const response = await axios.post(API_ENDPOINT + '/api/upload/data', form_data, {
            headers: {
                ...form_data.getHeaders()
            },
            data: form_data,
            validateStatus: function (status) {
                return status < 600; // Resolve only if the status code is less than 600
            }
        })

        expect(response.status).toBe(400)

    })

    test('Upload Unsupported File Format Dataset', async () => {

        const form_data = new FormData()
        form_data.append('myFiles', fs.createReadStream('/home/benflop/GitHub/frontend-testing/fixtures/combine_all.sh'));

        const response = await axios.post(API_ENDPOINT + '/api/upload/data', form_data, {
            headers: {
                ...form_data.getHeaders()
            },
            data: form_data,
            validateStatus: function (status) {
                return status < 600; // Resolve only if the status code is less than 600
            }
        })

        expect(response.status).toBe(400) // FIXME Should uploading other files besides pickle and joblib be allowed?

    })
})

test.skip('Upload Model', () => {

    test('Upload Model with Valid Model', async () => {

        const form_data = new FormData()
        form_data.append('myModelFiles', fs.createReadStream('/home/benflop/GitHub/frontend-testing/fixtures/pickle_scikit_multiclasslr_loan.sav'));

        const response = await axios.post(API_ENDPOINT + '/api/upload/model', form_data, {
            headers: {
                ...form_data.getHeaders()
            },
            data: form_data,
            validateStatus: function (status) {
                return status < 600; // Resolve only if the status code is less than 600
            }
        })

        expect(response.status).toBe(201)

    })

    test('Upload Model with Invalid Model', async () => {

        const form_data = new FormData()

        // TODO Need invalid model
        form_data.append('myModelFiles', fs.createReadStream('/home/benflop/GitHub/frontend-testing/fixtures/pickle_scikit_multiclasslr_loan.sav'));

        const response = await axios.post(API_ENDPOINT + '/api/upload/model', form_data, {
            headers: {
                ...form_data.getHeaders()
            },
            data: form_data,
            validateStatus: function (status) {
                return status < 600; // Resolve only if the status code is less than 600
            }
        })

        expect(response.status).toBe(400)

    })

    test('Upload Model with Empty Model', async () => {

        const form_data = new FormData()

        const response = await axios.post(API_ENDPOINT + '/api/upload/model', form_data, {
            headers: {
                ...form_data.getHeaders()
            },
            data: form_data,
            validateStatus: function (status) {
                return status < 600; // Resolve only if the status code is less than 600
            }
        })

        expect(response.status).toBe(400)

    })

    test('Upload Model Unsupported File Format Model', async () => {

        const form_data = new FormData()
        form_data.append('myModelFiles', fs.createReadStream('/home/benflop/GitHub/frontend-testing/fixtures/combine_all.sh'));

        const response = await axios.post(API_ENDPOINT + '/api/upload/model', form_data, {
            headers: {
                ...form_data.getHeaders()
            },
            data: form_data,
            validateStatus: function (status) {
                return status < 600; // Resolve only if the status code is less than 600
            }
        })

        expect(response.status).toBe(400)

    })
})

test.skip('List Plugins', () => {

    test('List All Plugins', async () => {
        const response = await axios.post(API_ENDPOINT + '/api/plugins/list')
        const plugins = response.data.plugins
        
        let i = 0

        while(plugins[i]){
            console.log(plugins[i])
            i++
        }

        expect(i).toBe(10)
    })

})

test.describe('Upload Plugins', () => {

    test('Upload Plugins', async () => {

        const form_data = new FormData()
        form_data.append('plugins', fs.createReadStream('/home/benflop/GitHub/frontend-testing/fixtures/aiverify.stock.process-checklist-test.zip'));

        const response = await axios.post(API_ENDPOINT + '/api/plugins/upload', form_data, {
            headers: {
                ...form_data.getHeaders()
            },
            data: form_data,
            validateStatus: function (status) {
                return status < 600; // Resolve only if the status code is less than 600
            }
        })

        expect.soft(response.status).toBe(200)
    })


    test('Upload Invalid File', async () => {

        const form_data = new FormData()
        form_data.append('plugins', fs.createReadStream('/home/benflop/GitHub/frontend-testing/fixtures/combine_all.sh'));

        const response = await axios.post(API_ENDPOINT + '/api/plugins/upload', form_data, {
            headers: {
                ...form_data.getHeaders()
            },
            data: form_data,
            validateStatus: function (status) {
                return status < 600; // Resolve only if the status code is less than 600
            }
        })

        expect.soft(response.status).toBe(400)
    })

    test('Corrupted Meta JSON File', async () => {
        
    })
})