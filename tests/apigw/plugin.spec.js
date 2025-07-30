import { test, expect } from '@playwright/test'

import axios from 'axios'
import fs from 'fs'
import FormData from 'form-data'

const url = process.env.URL
const port_number = process.env.PORT_NUMBER
const root_path = process.env.ROOT_PATH

test.describe('Plugin', () => {

    const POST_PLUGIN = [
        { TEST_NAME: "With Valid Plugin Meta Data", PLUGIN_PATH: root_path + "/third-party-plugins/cccs_plugins/cccs_explainability_2.0.zip", PLUGIN_NAME: "cccs_explainability_2.0.zip", STATUS: 200 },
        { TEST_NAME: "With Invalid Plugin Meta Data", PLUGIN_PATH: root_path + "/third-party-plugins/cccs_plugins/corrupted.zip", PLUGIN_NAME: "corrupted.zip", STATUS: 400 }
    ]

    for (const data of POST_PLUGIN) {
        test(`Upload Plugin ${data.TEST_NAME}`, async () => {
            const form = new FormData()
            form.append('file', fs.readFileSync(data.PLUGIN_PATH), data.PLUGIN_NAME)

            const response = await axios.post(url + ":" + port_number + '/plugins/upload',
                form,
                {
                    headers: {
                        ...form.getHeaders(),
                        'accept': 'application/json',
                        'Content-Type': 'multipart/form-data'
                    },
                    validateStatus: function (status) {
                        return status
                    }
                }
            )
            expect.soft(response.status).toBe(data.STATUS)
        })
    }

    test(`Get All Plugins`, async () => {
        const response = await axios.get(url + ":" + port_number + '/plugins/', {
            validateStatus: function (status) {
                return status
            }
        })
        expect.soft(response.status).toBe(200)
    })

    const GET_PLUGIN_BY_GID = [
        { TEST_NAME: "With Existing GID", GID: "aiverify.stock.process_checklist", STATUS: 200 },
        { TEST_NAME: "With Non-existing GID", GID: "aiverify.stock", STATUS: 404 }
    ]

    for (const data of GET_PLUGIN_BY_GID) {
        test(`Get Plugin ${data.TEST_NAME}`, async () => {
            const response = await axios.get(url + ":" + port_number + '/plugins/' + data.GID, {
                validateStatus: function (status) {
                    return status
                }
            })
            expect.soft(response.status).toBe(data.STATUS)
        })
    }

    const GET_PLUGIN_DOWNLOAD_BY_GID = [
        { TEST_NAME: "With Existing GID", CASE_TYPE: 1, GID: "aiverify.stock.process_checklist", STATUS: 200 },
        { TEST_NAME: "With Non-existing GID", CASE_TYPE: 0, GID: "aiverify.stock", EXPECTED: { detail: 'Plugin not found' }, STATUS: 404 },
    ]

    for (const data of GET_PLUGIN_DOWNLOAD_BY_GID) {
        test(`Download Plugin As A Zip File ${data.TEST_NAME}`, async () => {
            const response = await axios.get(url + ":" + port_number + "/plugins/download/" + data.GID, {
                validateStatus: function (status) {
                    return status
                }
            })

            if (data.CASE_TYPE == 0)
                expect.soft(response.data).toStrictEqual(data.EXPECTED)

            expect.soft(response.status).toBe(data.STATUS)
        })
    }

    const GET_PLUGIN_ALGORITHM_DOWNLOAD_BY_GID_AND_CID = [
        { TEST_NAME: "With Existing GID With Existing CID", CASE_TYPE: 1, GID: "aiverify.stock.image_corruption_toolbox", CID: "aiverify_environment_corruptions", STATUS: 200 },
        { TEST_NAME: "With Existing GID With Non-existing CID", CASE_TYPE: 0, GID: "aiverify.stock.image_corruption_toolbox", CID: "aiverify_environment", EXPECTED: { detail: 'Algorithm not found' }, STATUS: 404 },
        { TEST_NAME: "With Non-existing GID", CASE_TYPE: 0, GID: "aiverify.stock", CID: "aiverify_environment_corruptions", EXPECTED: { detail: 'Algorithm not found' }, STATUS: 404 },
    ]

    for (const data of GET_PLUGIN_ALGORITHM_DOWNLOAD_BY_GID_AND_CID) {
        test(`Download Plugin Algorithms As A Zip File ${data.TEST_NAME}`, async () => {
            const response = await axios.get(url + ":" + port_number + "/plugins/" + data.GID + "/algorithms/" + data.CID, {
                validateStatus: function (status) {
                    return status
                }
            })

            if (data.CASE_TYPE == 0)
                expect.soft(response.data).toStrictEqual(data.EXPECTED)

            expect.soft(response.status).toBe(data.STATUS)

        })
    }

    const GET_PLUGIN_WIDGET_DOWNLOAD_BY_GID = [
        { TEST_NAME: "With Existing GID With Widgets", CASE_TYPE: 1, GID: "aiverify.stock.process_checklist", STATUS: 200 },
        { TEST_NAME: "With Existing GID Without Widgets", CASE_TYPE: 1, GID: "", EXPECTED: { detail: 'Widget not found'}, STATUS: 404 },
        { TEST_NAME: "With Non-existing GID", CASE_TYPE: 0, GID: "aiverify.stock", EXPECTED: { detail: 'Plugin not found' }, STATUS: 404 },
        { TEST_NAME: "With Empty GID", CASE_TYPE: 1, GID: "", EXPECTED: { detail: 'Widget not found' }, STATUS: 404 }
    ]

    for (const data of GET_PLUGIN_WIDGET_DOWNLOAD_BY_GID) {
        test(`Download Plugin Widgets As A Zip File ${data.TEST_NAME}`, async () => {
            const response = await axios.get(url + ":" + port_number + "/plugins/" + data.GID + "/widgets", {
                validateStatus: function (status) {
                    return status
                }
            })

            if (data.CASE_TYPE == 0)
                expect.soft(response.data).toStrictEqual(data.EXPECTED)

            expect.soft(response.status).toBe(data.STATUS)
        })
    }

    const GET_PLUGIN_INPUT_BLOCKS_DONWLOAD_BY_GID = [
        { TEST_NAME: "With Existing GID With Input Blocks", CASE_TYPE: 1, GID: "aiverify.stock.process_checklist", STATUS: 200 },
        { TEST_NAME: "With Existing GID Without Input Blocks", CASE_TYPE: 1, GID: "aiverify.stock.image_corruption_toolbox", EXPECTED: { detail: "Input Block not found" }, STATUS: 404 },
        { TEST_NAME: "With Non-existing GID", CASE_TYPE: 0, GID: "aiverify.stock", EXPECTED: { detail: 'Plugin not found' }, STATUS: 404 },
        { TEST_NAME: "With Empty GID", CASE_TYPE: 1, GID: "", EXPECTED: { detail: 'Input Block not found' }, STATUS: 404 }
    ]

    for (const data of GET_PLUGIN_INPUT_BLOCKS_DONWLOAD_BY_GID) {
        test(`Download Plugin Input Blocks As A Zip File ${data.TEST_NAME}`, async () => {
            const response = await axios.get(url + ":" + port_number + "/plugins/" + data.GID + "/input_blocks", {
                validateStatus: function (status) {
                    return status
                }
            })

            if (data.CASE_TYPE == 0)
                expect.soft(response.data).toStrictEqual(data.EXPECTED)

            expect.soft(response.status).toBe(data.STATUS)
        })
    }

    const GET_PLUGIN_BUNDLE_DOWNLOAD_BY_GID_AND_CID = [
        { TEST_NAME: "With Existing GID With Existing CID", CASE_TYPE: 1, GID: "aiverify.stock.process_checklist", CID: "robustness_responses", STATUS: 200 },
        { TEST_NAME: "With Existing GID With Non-existing CID", CASE_TYPE: 0, GID: "aiverify.stock.process_checklist", CID: "robustness", EXPECTED: { detail: 'Invalid cid: robustness not found in widget or input block' }, STATUS: 404 },
        { TEST_NAME: "With Existing GID With Empty CID", CASE_TYPE: 0, GID: "aiverify.stock.process_checklist", CID: "", EXPECTED: { detail: 'Not Found' }, STATUS: 404 },
        { TEST_NAME: "With Non-existing GID", CASE_TYPE: 0, GID: "aiverify.stock", CID: "robustness_responses", EXPECTED: { detail: 'Plugin not found' }, STATUS: 404 },
        { TEST_NAME: "With Empty GID", CASE_TYPE: 0, GID: "", CID: "aiverify_environment_corruptions", EXPECTED: { detail: 'Not Found' }, STATUS: 404 },
    ]

    for (const data of GET_PLUGIN_BUNDLE_DOWNLOAD_BY_GID_AND_CID) {
        test(`Download Plugin Bundle As A Zip File ${data.TEST_NAME}`, async () => {
            const response = await axios.get(url + ":" + port_number + "/plugins/" + data.GID + "/bundle/" + data.CID, {
                validateStatus: function (status) {
                    return status
                }
            })

            if (data.CASE_TYPE == 0)
                expect.soft(response.data).toStrictEqual(data.EXPECTED)

            expect.soft(response.status).toBe(data.STATUS)
        })

    }

    const GET_PLUGIN_SUMMARY_DOWNLOAD_BY_GID_AND_CID = [
        // { TEST_NAME: "With Existing GID With Existing CID", CASE_TYPE: 1, GID: "aiverify.stock.process_checklist", CID: "summary_data_governance", STATUS: 200 },
        { TEST_NAME: "With Existing GID With Non-existing CID", CASE_TYPE: 0, GID: "aiverify.stock.process_checklist", CID: "robustness", EXPECTED: { detail: 'Bundle not found' }, STATUS: 404 },
        { TEST_NAME: "With Existing GID With Empty CID", CASE_TYPE: 0, GID: "aiverify.stock.process_checklist", CID: "", EXPECTED: { detail: 'Not Found' }, STATUS: 404 },
        { TEST_NAME: "With Non-existing GID", CASE_TYPE: 0, GID: "aiverify.stock", CID: "robustness_responses", EXPECTED: { detail: 'Plugin not found' }, STATUS: 404 },
        { TEST_NAME: "With Empty GID", CASE_TYPE: 0, GID: "", CID: "aiverify_environment_corruptions", EXPECTED: { detail: 'Not Found' }, STATUS: 404 },
    ]

    for (const data of GET_PLUGIN_SUMMARY_DOWNLOAD_BY_GID_AND_CID) {
        test(`Download Plugin Summary As A Zip File ${data.TEST_NAME}`, async () => {
            const response = await axios.get(url + ":" + port_number + "/plugins/" + data.GID + "/summary/" + data.CID, {
                validateStatus: function (status) {
                    return status
                }
            })

            if (data.CASE_TYPE == 0)
                expect.soft(response.data).toStrictEqual(data.EXPECTED)

            expect.soft(response.status).toBe(data.STATUS)
        })

    }

    const DELETE_PLUGIN_BY_GID = [
        { TEST_NAME: "With Existing GID", GID: "cccs_explainability", STATUS: 200 },
        { TEST_NAME: "With Non-existing GID", GID: "aiverify.stock", STATUS: 404 }
    ]

    for (const data of DELETE_PLUGIN_BY_GID) {
        test(`Delete Plugin ${data.TEST_NAME}`, async () => {
            const response = await axios.delete(url + ":" + port_number + '/plugins/' + data.GID, {
                validateStatus: function (status) {
                    return status
                }
            })
            expect.soft(response.status).toBe(data.STATUS)
        })
    }

})