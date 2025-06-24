import { test, expect } from '@playwright/test'

import axios from 'axios'
import fs from 'fs'
import FormData from 'form-data'

const url = process.env.URL
const port_number = process.env.PORT_NUMBER
const root_path = process.env.ROOT_PATH

test.describe('Storage', () => {

    const intValue = 10
    const floatValue = 10.1

    const GET_MODEL_BY_FILENAME = [
        { TEST_NAME: "With Existing File Name", CASE_TYPE: "POSITIVE", FILENAME: "sample_reg_donation_sklearn_linear.LinearRegression.sav", STATUS: 200 },
        { TEST_NAME: "With File Name Integer", FILENAME: intValue, EXPECTED: { detail: 'Model file not found' }, STATUS: 404 },
        { TEST_NAME: "With File Name Float", FILENAME: floatValue, EXPECTED: { detail: 'Model file not found' }, STATUS: 404 },
        { TEST_NAME: "With File Name Boolean", FILENAME: true, EXPECTED: { detail: 'Model file not found' }, STATUS: 404 },
        { TEST_NAME: "With File Name Empty", FILENAME: "", EXPECTED: { detail: 'Not Found' }, STATUS: 404 },
        { TEST_NAME: "With File Name Null", FILENAME: null, EXPECTED: { detail: 'Model file not found' }, STATUS: 404 },
        { TEST_NAME: "With File Name No Value", EXPECTED: { detail: 'Model file not found' }, STATUS: 404 },
    ]

    const GET_DATASET_BY_FILENAME = [
        { TEST_NAME: "With Existing File Name", CASE_TYPE: "POSITIVE", FILENAME: "sample_reg_donation_data.sav", STATUS: 200 },
        { TEST_NAME: "With File Name Integer", FILENAME: intValue, EXPECTED: { detail: 'Dataset file not found' }, STATUS: 404 },
        { TEST_NAME: "With File Name Float", FILENAME: floatValue, EXPECTED: { detail: 'Dataset file not found' }, STATUS: 404 },
        { TEST_NAME: "With File Name Boolean", FILENAME: true, EXPECTED: { detail: 'Dataset file not found' }, STATUS: 404 },
        { TEST_NAME: "With File Name Empty", FILENAME: "", EXPECTED: { detail: 'Not Found' }, STATUS: 404 },
        { TEST_NAME: "With File Name Null", FILENAME: null, EXPECTED: { detail: 'Dataset file not found' }, STATUS: 404 },
        { TEST_NAME: "With File Name No Value", EXPECTED: { detail: 'Dataset file not found' }, STATUS: 404 },
    ]

    for (const data of GET_MODEL_BY_FILENAME) {
        test(`Download Model By Filename ${data.TEST_NAME}`, async () => {

            let response, fileName

            if (data.CASE_TYPE == "POSITIVE") {
                const form = new FormData()
                form.append('files', fs.createReadStream(root_path + '/model/' + data.FILENAME))
                form.append('model_types', "regression")

                /* Upload Test Model */
                response = await axios.post(url + ":" + port_number + "/test_models/upload",
                    form,
                    {
                        headers: {
                            ...form.getHeaders(),
                            'accept': 'application/json',
                            'Content-Type': 'multipart/form-data'
                        },
                    })

                /* Set Test Model File Name */
                fileName = response.data[0].filename
            }

            /* Set Test Model File Name */
            fileName = data.FILENAME

            /* Download Test Model */
            response = await axios.get(url + ":" + port_number + "/storage/models/" + fileName, {
                validateStatus: function (status) {
                    return status
                }
            })

            /* Assert Download Test Model */
            if(data.CASE_TYPE != "POSITIVE")
                expect.soft(response.data).toMatchObject(data.EXPECTED)
            expect.soft(response.status).toBe(data.STATUS)

        })
    }

    for (const data of GET_DATASET_BY_FILENAME) {
        test(`Download Dataset By Filename ${data.TEST_NAME}`, async () => {

            let response, fileName

            if (data.CASE_TYPE == "POSITIVE") {
                const form = new FormData()
                form.append('files', fs.createReadStream(root_path + '/data/' + data.FILENAME))

                /* Upload Test Dataset */
                response = await axios.post(url + ":" + port_number + "/test_datasets/upload",
                    form,
                    {
                        headers: {
                            ...form.getHeaders(),
                            'accept': 'application/json',
                            'Content-Type': 'multipart/form-data'
                        },
                    })

                /* Set Test Dataset File Name */
                fileName = response.data[0].filename
            }

            /* Set Test Dataset File Name */
            fileName = data.FILENAME

            /* Download Test Dataset */
            response = await axios.get(url + ":" + port_number + "/storage/datasets/" + fileName, {
                validateStatus: function (status) {
                    return status
                }
            })

            /* Assert Download Test Dataset */
            if(data.CASE_TYPE != "POSITIVE")
                expect.soft(response.data).toMatchObject(data.EXPECTED)
            expect.soft(response.status).toBe(data.STATUS)

        })
    }
})