import { test, expect } from '@playwright/test'

import axios from 'axios'
import fs from 'fs'
import FormData from 'form-data'

const url = process.env.URL
const port_number = process.env.PORT_NUMBER
const root_path = process.env.ROOT_PATH

const test_result = '{"cid":"fairness_metrics_toolbox_for_classification","gid":"aiverify.stock.fairness_metrics_toolbox_for_classification","output":{"output_classes":[0,1],"results":[{"False Omission Rate":[{"group":[0],"metric":0.23680904522613067},{"group":[1],"metric":0.24685929648241206}],"Disparate Impact":[{"group":[0,1],"metric":1.0218689431079695}],"False Positive Rate":[{"group":[0],"metric":0.19675925925925927},{"group":[1],"metric":0.16898148148148148}],"Equal Selection Parity":[{"group":[0,1],"metric":12}],"False Discovery Rate":[{"group":[0],"metric":0.28083700440528636},{"group":[1],"metric":0.24118942731277532}],"False Negative Rate":[{"group":[0],"metric":0.3131229235880399},{"group":[1],"metric":0.32641196013289037}],"Negative Predictive Value Parity":[{"group":[0],"metric":0.2613065326633166},{"group":[1],"metric":0.2550251256281407}],"True Positive Rate":[{"group":[0],"metric":0.17026578073089702},{"group":[1],"metric":0.19019933554817275}],"Positive Predictive Value Parity":[{"group":[0],"metric":0.22577092511013216},{"group":[1],"metric":0.2522026431718062}],"True Negative Rate":[{"group":[0],"metric":0.32098765432098764},{"group":[1],"metric":0.3132716049382716}]},{"False Omission Rate":[{"group":[0],"metric":0.28083700440528636},{"group":[1],"metric":0.24118942731277532}],"Disparate Impact":[{"group":[0,1],"metric":0.9877380644400872}],"False Positive Rate":[{"group":[0],"metric":0.3131229235880399},{"group":[1],"metric":0.32641196013289037}],"Equal Selection Parity":[{"group":[0,1],"metric":6}],"False Discovery Rate":[{"group":[0],"metric":0.23680904522613067},{"group":[1],"metric":0.24685929648241206}],"False Negative Rate":[{"group":[0],"metric":0.19675925925925927},{"group":[1],"metric":0.16898148148148148}],"Negative Predictive Value Parity":[{"group":[0],"metric":0.22577092511013216},{"group":[1],"metric":0.2522026431718062}],"True Positive Rate":[{"group":[0],"metric":0.32098765432098764},{"group":[1],"metric":0.3132716049382716}],"Positive Predictive Value Parity":[{"group":[0],"metric":0.2613065326633166},{"group":[1],"metric":0.2550251256281407}],"True Negative Rate":[{"group":[0],"metric":0.17026578073089702},{"group":[1],"metric":0.19019933554817275}]}],"sensitive_feature":["gender"]},"startTime":"2024-07-24T09:20:24.822881","testArguments":{"algorithmArgs":{"annotated_labels_path":"file:///examples/data/sample_bc_credit_data.sav","file_name_label":"NA","sensitive_feature":["gender"]},"groundTruth":"default","groundTruthDataset":"file:///examples/data/sample_bc_credit_data.sav","mode":"upload","modelFile":"file:///examples/model/sample_bc_credit_sklearn_linear.LogisticRegression.sav","modelType":"classification","testDataset":"file:///examples/data/sample_bc_credit_data.sav"},"timeTaken":0,"version":"0.9.0"}'

test.describe('Test Results', () => {

    /* Put Veritas Result */
    const VERITAS_IMAGES = [
        { ARTIFACT_NAME: "veritas_classDistributionPieChart.png", ARTIFACT_PATH: root_path + "/test_results/output/images/veritas_classDistributionPieChart.png" },
        { ARTIFACT_NAME: "veritas_featureDistributionPieChartMap_isfemale.png", ARTIFACT_PATH: root_path + "/test_results/output/images/veritas_featureDistributionPieChartMap_isfemale.png" },
        { ARTIFACT_NAME: "veritas_featureDistributionPieChartMap_isforeign.png", ARTIFACT_PATH: root_path + "/test_results/output/images/veritas_featureDistributionPieChartMap_isforeign.png" },
        { ARTIFACT_NAME: "veritas_weightedConfusionHeatMapChart.png", ARTIFACT_PATH: root_path + "/test_results/output/images/veritas_weightedConfusionHeatMapChart.png" },

    ]
    const POST_TEST_RESULT = [
        { TEST_NAME: "With Valid Test Results With Valid Artifacts", RESULTS_PATH: root_path + "/test_results/output/results.json", ARTIFACTS: VERITAS_IMAGES, STATUS: 200 },
        { TEST_NAME: "With Valid Test Results With Invalid Artifacts", RESULTS_PATH: root_path + "/test_results/output/results.json", ARTIFACTS: [{ ARTIFACT_NAME: "pickle_pandas_fashion_mnist_annotated_labels_10.sav", ARTIFACT_PATH: root_path + "/data/pickle_pandas_fashion_mnist_annotated_labels_10.sav" }], STATUS: 200 },
        { TEST_NAME: "With Invalid Test Results", RESULTS_PATH: root_path + "/test_results/corrupted_results.json", ARTIFACTS: [{ ARTIFACT_NAME: "output.zip", ARTIFACT_PATH: root_path + "/test_results/output.zip" }], STATUS: 422 }
    ]

    for (const data of POST_TEST_RESULT) {
        test(`Upload Test Results ${data.TEST_NAME}`, async () => {
            const form = new FormData()
            form.append('test_result', fs.readFileSync(data.RESULTS_PATH))
            for(const images of data.ARTIFACTS) {
                form.append('artifacts', fs.readFileSync(images.ARTIFACT_PATH), images.ARTIFACT_NAME)
            }

            const response = await axios.post(url + ":" + port_number + '/test_results/upload',
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

    test(`Upload Test Results With Valid Test Results With No Artifacts`, async () => {
        const form = new FormData()
        form.append('test_result', test_result)

        const response = await axios.post(url + ":" + port_number + '/test_results/upload',
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
        expect.soft(response.status).toBe(200)
    })

    const POST_TEST_RESULT_ZIP = [
        { TEST_NAME: "With Valid Test Results in Zip Format", ARTIFACT_PATH: root_path + "/test_results/output-image-standalone.zip", ARTIFACT_NAME: "output-image-standalone.zip", STATUS: 200 },
        { TEST_NAME: "With Invalid Test Results in Zip Format", ARTIFACT_PATH: root_path + "/test_results/corrupted_results.zip", ARTIFACT_NAME: "corrupted_results.zip", STATUS: 400 },
        { TEST_NAME: "With Non Zip Format", ARTIFACT_PATH: root_path + "/test_results/Result for aiverify_digital_corruptions_output.json", ARTIFACT_NAME: "Result for aiverify_digital_corruptions_output.json", STATUS: 400 }
    ]

    for (const data of POST_TEST_RESULT_ZIP) {
        test(`Upload Test Results In Zip File ${data.TEST_NAME}`, async () => {
            const form = new FormData()
            form.append('file', fs.readFileSync(data.ARTIFACT_PATH), data.ARTIFACT_NAME)

            const response = await axios.post(url + ":" + port_number + '/test_results/upload_zip',
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

    const GET_TEST_RESULT_ARTIFACT = [
        { TEST_NAME: "With Existing Test Result Id With Existing Filename", CASE_TYPE: "POSITIVE", ARTIFACT_PATH: root_path + "/test_results/output-image-standalone.zip", ARTIFACT_NAME: "output-image-standalone.zip", ARTIFACT_UPLOAD_PATH: "/artifacts/images/Gaussian_Blur/severity0/9.png", STATUS: 200 },
        { TEST_NAME: "With Existing Test Result Id With Non-existing Filename", CASE_TYPE: "POSITIVE", ARTIFACT_PATH: root_path + "/test_results/output-image-standalone.zip", ARTIFACT_NAME: "output-image-standalone.zip", ARTIFACT_UPLOAD_PATH: "/output.zip", STATUS: 404 },
        { TEST_NAME: "With Non-existing Test Result Id", TEST_RESULT_ID: 10000, ARTIFACT_UPLOAD_PATH: "/artifacts/images/Gaussian_Blur/severity0/9.png", STATUS: 400 },
    ]

    for (const data of GET_TEST_RESULT_ARTIFACT) {
        test(`Get Test Result Artifact ${data.TEST_NAME}`, async () => {

            let response, test_result_id

            if (data.CASE_TYPE == "POSITIVE") {

                const form = new FormData()
                form.append('file', fs.readFileSync(data.ARTIFACT_PATH), data.ARTIFACT_NAME)

                response = await axios.post(url + ":" + port_number + '/test_results/upload_zip',
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

                /* Set Test Result ID */
                const test_results_id_array = JSON.stringify(response.data)
                const test_results_id = test_results_id_array.replace("\"]", "").split("/", 3)
                test_result_id = parseInt(test_results_id[2].replace('\",\"', ""))

            }
            else {
                test_result_id = data.TEST_RESULT_ID
            }

            response = await axios.get(url + ":" + port_number + "/test_results/" + test_result_id + data.ARTIFACT_UPLOAD_PATH, {
                validateStatus: function (status) {
                    return status
                }
            })
            expect.soft(response.status).toBe(data.STATUS)
        })
    }

    test('Get Test Results', async () => {
        const response = await axios.get(url + ":" + port_number + "/test_results/", {
            validateStatus: function (status) {
                return status
            }
        })
        expect.soft(response.status).toBe(200)
    })

    const GET_TEST_RESULT_BY_TEST_RESULT_ID = [
        { TEST_NAME: "With Existing Test Result ID", CASE_TYPE: "POSITIVE", ARTIFACT_PATH: root_path + "/test_results/output-image-standalone.zip", ARTIFACT_NAME: "output-image-standalone.zip", STATUS: 200 },
        { TEST_NAME: "With Test Result ID Non Integer String", TEST_RESULT_ID: "test", STATUS: 422 },
        { TEST_NAME: "With Test Result ID Float", TEST_RESULT_ID: 1.7, STATUS: 422 },
        { TEST_NAME: "With Test Result ID Boolean", TEST_RESULT_ID: true, STATUS: 422 },
        { TEST_NAME: "With Non-existing Test Result ID", TEST_RESULT_ID: 10000, STATUS: 404 }
    ]

    for (const data of GET_TEST_RESULT_BY_TEST_RESULT_ID) {
        test(`Get Test Result ${data.TEST_NAME}`, async () => {

            let response, test_result_id

            if (data.CASE_TYPE == "POSITIVE") {

                const form = new FormData()
                form.append('file', fs.readFileSync(data.ARTIFACT_PATH), data.ARTIFACT_NAME)

                response = await axios.post(url + ":" + port_number + '/test_results/upload_zip',
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

                /* Set Test Result ID */
                const test_results_id_array = JSON.stringify(response.data)
                const test_results_id = test_results_id_array.replace("\"]", "").split("/", 3)
                test_result_id = parseInt(test_results_id[2].replace('\",\"', ""))

            }
            else {
                test_result_id = data.TEST_RESULT_ID
            }

            response = await axios.get(url + ":" + port_number + "/test_results/" + test_result_id, {
                validateStatus: function (status) {
                    return status
                }
            })

            expect.soft(response.status).toBe(data.STATUS)
        })
    }

    const PUT_TEST_RESULT_BY_TEST_RESULT_ID = [
        { TEST_NAME: "With Existing Test Result ID Integer String Name Input", CASE_TYPE: "EXISTING_ID", TEST_RESULT_NAME: "Test 2", STATUS: 200 },
        { TEST_NAME: "With Existing Test Result ID Integer Integer Name Input", CASE_TYPE: "EXISTING_ID", TEST_RESULT_NAME: 1, STATUS: 422 },
        { TEST_NAME: "With Existing Test Result ID Integer Float Name Input", CASE_TYPE: "EXISTING_ID", TEST_RESULT_NAME: 1.7, STATUS: 422 },
        { TEST_NAME: "With Existing Test Result ID Integer Boolean Name Input", CASE_TYPE: "EXISTING_ID", TEST_RESULT_NAME: true, STATUS: 422 },
        { TEST_NAME: "With Existing Test Result ID Non-numeric String", TEST_RESULT_ID: "test", TEST_RESULT_NAME: "Test 2", STATUS: 422 },
        { TEST_NAME: "With Existing Test Result ID Float", TEST_RESULT_ID: 1.7, TEST_RESULT_NAME: "Test 2", STATUS: 422 },
        { TEST_NAME: "With Existing Test Result ID Boolean", TEST_RESULT_ID: true, TEST_RESULT_NAME: "Test 2", STATUS: 422 },
        { TEST_NAME: "With Non Existing Test Result ID", TEST_RESULT_ID: 10000, TEST_RESULT_NAME: "Test 2", STATUS: 404 },
    ]

    for (const data of PUT_TEST_RESULT_BY_TEST_RESULT_ID) {
        test(`Update Test Result Name ${data.TEST_NAME}`, async () => {

            let response, test_result_id

            if (data.CASE_TYPE == "EXISTING_ID") {

                let ARTIFACT_DATA = {
                    ARTIFACT_PATH: root_path + "/test_results/output-image-standalone.zip",
                    ARTIFACT_NAME: "output-image-standalone.zip",
                }

                const form = new FormData()
                form.append('file', fs.readFileSync(ARTIFACT_DATA.ARTIFACT_PATH), ARTIFACT_DATA.ARTIFACT_NAME)

                response = await axios.post(url + ":" + port_number + '/test_results/upload_zip',
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

                /* Set Test Result ID */
                const test_results_id_array = JSON.stringify(response.data)
                const test_results_id = test_results_id_array.replace("\"]", "").split("/", 3)
                test_result_id = parseInt(test_results_id[2].replace('\",\"', ""))

            }
            else
                test_result_id = data.TEST_RESULT_ID

            response = await axios.put(url + ":" + port_number + "/test_results/" + test_result_id, { "name": data.TEST_RESULT_NAME }, {
                validateStatus: function (status) {
                    return status
                }
            })

            expect.soft(response.status).toBe(data.STATUS)

        })
    }

    const DELETE_TEST_RESULT_BY_TEST_RESULT_ID = [
        { TEST_NAME: "With Existing Test Result ID", CASE_TYPE: "POSITIVE", ARTIFACT_PATH: root_path + "/test_results/output-image-standalone.zip", ARTIFACT_NAME: "output-image-standalone.zip", STATUS: 200 },
        { TEST_NAME: "With Test Result ID Non-integer String", TEST_RESULT_ID: "test", STATUS: 422 },
        { TEST_NAME: "With Test Result ID Float", TEST_RESULT_ID: 1.7, STATUS: 422 },
        { TEST_NAME: "With Test Result ID Boolean", TEST_RESULT_ID: true, STATUS: 422 },
        { TEST_NAME: "With Non-existing Test Result ID", TEST_RESULT_ID: 10000, STATUS: 404 },
    ]

    for (const data of DELETE_TEST_RESULT_BY_TEST_RESULT_ID) {
        test(`Delete Test Result ${data.TEST_NAME}`, async () => {

            let response, test_result_id

            if (data.CASE_TYPE == "POSITIVE") {

                const form = new FormData()
                form.append('file', fs.readFileSync(data.ARTIFACT_PATH), data.ARTIFACT_NAME)

                response = await axios.post(url + ":" + port_number + '/test_results/upload_zip',
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

                /* Set Test Result ID */
                const test_results_id_array = JSON.stringify(response.data)
                const test_results_id = test_results_id_array.replace("\"]", "").split("/", 3)
                test_result_id = parseInt(test_results_id[2].replace('\",\"', ""))

            }
            else {
                test_result_id = data.TEST_RESULT_ID
            }

            response = await axios.delete(url + ":" + port_number + "/test_results/" + test_result_id, {
                validateStatus: function (status) {
                    return status
                }
            })

            expect.soft(response.status).toBe(data.STATUS)
        })
    }

})