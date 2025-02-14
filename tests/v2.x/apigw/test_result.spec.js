import { test, expect } from '@playwright/test'

import axios from 'axios'
import fs from 'fs'
import FormData from 'form-data'

// import {setTimeout} from "timers/promises"

const ENDPOINT = process.env.ENDPOINT

const test_result = '{"cid":"fairness_metrics_toolbox_for_classification","gid":"aiverify.stock.fairness_metrics_toolbox_for_classification","output":{"output_classes":[0,1],"results":[{"False Omission Rate":[{"group":[0],"metric":0.23680904522613067},{"group":[1],"metric":0.24685929648241206}],"Disparate Impact":[{"group":[0,1],"metric":1.0218689431079695}],"False Positive Rate":[{"group":[0],"metric":0.19675925925925927},{"group":[1],"metric":0.16898148148148148}],"Equal Selection Parity":[{"group":[0,1],"metric":12}],"False Discovery Rate":[{"group":[0],"metric":0.28083700440528636},{"group":[1],"metric":0.24118942731277532}],"False Negative Rate":[{"group":[0],"metric":0.3131229235880399},{"group":[1],"metric":0.32641196013289037}],"Negative Predictive Value Parity":[{"group":[0],"metric":0.2613065326633166},{"group":[1],"metric":0.2550251256281407}],"True Positive Rate":[{"group":[0],"metric":0.17026578073089702},{"group":[1],"metric":0.19019933554817275}],"Positive Predictive Value Parity":[{"group":[0],"metric":0.22577092511013216},{"group":[1],"metric":0.2522026431718062}],"True Negative Rate":[{"group":[0],"metric":0.32098765432098764},{"group":[1],"metric":0.3132716049382716}]},{"False Omission Rate":[{"group":[0],"metric":0.28083700440528636},{"group":[1],"metric":0.24118942731277532}],"Disparate Impact":[{"group":[0,1],"metric":0.9877380644400872}],"False Positive Rate":[{"group":[0],"metric":0.3131229235880399},{"group":[1],"metric":0.32641196013289037}],"Equal Selection Parity":[{"group":[0,1],"metric":6}],"False Discovery Rate":[{"group":[0],"metric":0.23680904522613067},{"group":[1],"metric":0.24685929648241206}],"False Negative Rate":[{"group":[0],"metric":0.19675925925925927},{"group":[1],"metric":0.16898148148148148}],"Negative Predictive Value Parity":[{"group":[0],"metric":0.22577092511013216},{"group":[1],"metric":0.2522026431718062}],"True Positive Rate":[{"group":[0],"metric":0.32098765432098764},{"group":[1],"metric":0.3132716049382716}],"Positive Predictive Value Parity":[{"group":[0],"metric":0.2613065326633166},{"group":[1],"metric":0.2550251256281407}],"True Negative Rate":[{"group":[0],"metric":0.17026578073089702},{"group":[1],"metric":0.19019933554817275}]}],"sensitive_feature":["gender"]},"startTime":"2024-07-24T09:20:24.822881","testArguments":{"algorithmArgs":{"annotated_labels_path":"file:///examples/data/sample_bc_credit_data.sav","file_name_label":"NA","sensitive_feature":["gender"]},"groundTruth":"default","groundTruthDataset":"file:///examples/data/sample_bc_credit_data.sav","mode":"upload","modelFile":"file:///examples/model/sample_bc_credit_sklearn_linear.LogisticRegression.sav","modelType":"classification","testDataset":"file:///examples/data/sample_bc_credit_data.sav"},"timeTaken":0,"version":"0.9.0"}'
const invalid_test_result = '{"cid":"","gid":"aiverify.stock.fairness_metrics_toolbox_for_classification","output":{"output_classes":[0,1],"results":[{"False Omission Rate":[{"group":[0],"metric":0.23680904522613067},{"group":[1],"metric":0.24685929648241206}],"Disparate Impact":[{"group":[0,1],"metric":1.0218689431079695}],"False Positive Rate":[{"group":[0],"metric":0.19675925925925927},{"group":[1],"metric":0.16898148148148148}],"Equal Selection Parity":[{"group":[0,1],"metric":12}],"False Discovery Rate":[{"group":[0],"metric":0.28083700440528636},{"group":[1],"metric":0.24118942731277532}],"False Negative Rate":[{"group":[0],"metric":0.3131229235880399},{"group":[1],"metric":0.32641196013289037}],"Negative Predictive Value Parity":[{"group":[0],"metric":0.2613065326633166},{"group":[1],"metric":0.2550251256281407}],"True Positive Rate":[{"group":[0],"metric":0.17026578073089702},{"group":[1],"metric":0.19019933554817275}],"Positive Predictive Value Parity":[{"group":[0],"metric":0.22577092511013216},{"group":[1],"metric":0.2522026431718062}],"True Negative Rate":[{"group":[0],"metric":0.32098765432098764},{"group":[1],"metric":0.3132716049382716}]},{"False Omission Rate":[{"group":[0],"metric":0.28083700440528636},{"group":[1],"metric":0.24118942731277532}],"Disparate Impact":[{"group":[0,1],"metric":0.9877380644400872}],"False Positive Rate":[{"group":[0],"metric":0.3131229235880399},{"group":[1],"metric":0.32641196013289037}],"Equal Selection Parity":[{"group":[0,1],"metric":6}],"False Discovery Rate":[{"group":[0],"metric":0.23680904522613067},{"group":[1],"metric":0.24685929648241206}],"False Negative Rate":[{"group":[0],"metric":0.19675925925925927},{"group":[1],"metric":0.16898148148148148}],"Negative Predictive Value Parity":[{"group":[0],"metric":0.22577092511013216},{"group":[1],"metric":0.2522026431718062}],"True Positive Rate":[{"group":[0],"metric":0.32098765432098764},{"group":[1],"metric":0.3132716049382716}],"Positive Predictive Value Parity":[{"group":[0],"metric":0.2613065326633166},{"group":[1],"metric":0.2550251256281407}],"True Negative Rate":[{"group":[0],"metric":0.17026578073089702},{"group":[1],"metric":0.19019933554817275}]}],"sensitive_feature":["gender"]},"startTime":"2024-07-24T09:20:24.822881","testArguments":{"algorithmArgs":{"annotated_labels_path":"file:///examples/data/sample_bc_credit_data.sav","file_name_label":"NA","sensitive_feature":["gender"]},"groundTruth":"default","groundTruthDataset":"file:///examples/data/sample_bc_credit_data.sav","mode":"upload","modelFile":"file:///examples/model/sample_bc_credit_sklearn_linear.LogisticRegression.sav","modelType":"classification","testDataset":"file:///examples/data/sample_bc_credit_data.sav"},"timeTaken":0,"version":"0.9.0"}'

const POST_TEST_RESULT = [
    { TEST_NAME: "With Valid Test Results With Valid Artifacts", TEST_RESULT: test_result, ARTIFACT_PATH: "/Users/benedict/Desktop/output.zip", ARTIFACT_NAME: "output.zip", STATUS: 200 },
    { TEST_NAME: "With Valid Test Results With Invalid Artifacts", TEST_RESULT: test_result, ARTIFACT_PATH: "/Users/benedict/Downloads/batch-processing.sh", ARTIFACT_NAME: "batch-processing.sh", STATUS: 200 },
    { TEST_NAME: "With Invalid Test Results", TEST_RESULT: invalid_test_result, ARTIFACT_PATH: "/Users/benedict/Desktop/output.zip", ARTIFACT_NAME: "output.zip", STATUS: 422 }
]

const POST_TEST_RESULT_ZIP = [
    { TEST_NAME: "With Valid Test Results in Zip Format", TEST_RESULT: test_result, ARTIFACT_PATH: "/Users/benedict/Desktop/output.zip", ARTIFACT_NAME: "output.zip", STATUS: 200 },
    { TEST_NAME: "With Invalid Test Results in Zip Format", TEST_RESULT: invalid_test_result, ARTIFACT_PATH: "/Users/benedict/Desktop/output.zip", ARTIFACT_NAME: "output.zip", STATUS: 422 },
    { TEST_NAME: "With Non Zip Format", TEST_RESULT: invalid_test_result, ARTIFACT_PATH: "/Users/benedict/Downloads/batch-processing.sh", ARTIFACT_NAME: "batch-processing.sh", STATUS: 422 }
]

const GET_TEST_RESULT_ARTIFACT = [
    // { TEST_NAME: "With Existing Test Result Id With Existing Filename", TEST_RESULT_ID: 17, ARTIFACT_NAME: "output", STATUS: 200 },
    { TEST_NAME: "With Existing Test Result Id With Non-existing Filename", TEST_RESULT_ID: 1, ARTIFACT_NAME: "output.zip", STATUS: 400 },
    { TEST_NAME: "With Non-existing Test Result Id", TEST_RESULT_ID: 10000, ARTIFACT_NAME: "output.zip", STATUS: 400 },
]

const GET_TEST_RESULT_BY_TEST_RESULT_ID = [
    { TEST_NAME: "With Existing Test Result Id Integer", TEST_RESULT_ID: 1, STATUS: 200 },
    { TEST_NAME: "With Existing Test Result Id String", TEST_RESULT_ID: "1", STATUS: 200 },
    { TEST_NAME: "With Existing Test Result Id Float", TEST_RESULT_ID: 1.0, STATUS: 200 },
    { TEST_NAME: "With Existing Test Result Id Decimal", TEST_RESULT_ID: 1.7, STATUS: 422 },
    { TEST_NAME: "With Non Existing Test Result Id", TEST_RESULT_ID: 10000, STATUS: 404 },
]

const PUT_TEST_RESULT_BY_TEST_RESULT_ID = [
    { TEST_NAME: "With Existing Test Result Id Integer String Name Input", TEST_RESULT_ID: 1, TEST_RESULT_NAME: "Test 2", STATUS: 200 },
    { TEST_NAME: "With Existing Test Result Id Integer Integer Name Input", TEST_RESULT_ID: 1, TEST_RESULT_NAME: 1, STATUS: 422 },
    { TEST_NAME: "With Existing Test Result Id Integer Float Name Input", TEST_RESULT_ID: 1, TEST_RESULT_ID: 1.0, STATUS: 422 },
    { TEST_NAME: "With Existing Test Result Id Numeric String", TEST_RESULT_ID: "1", TEST_RESULT_NAME: "Test 2", STATUS: 200 },
    { TEST_NAME: "With Existing Test Result Id Non-numeric String", TEST_RESULT_ID: "test", TEST_RESULT_NAME: "Test 2", STATUS: 422 },
    { TEST_NAME: "With Existing Test Result Id Float", TEST_RESULT_ID: 1.7, TEST_RESULT_NAME: "Test 2", STATUS: 422 }, // Will 1.0 be resolved to 1?
    { TEST_NAME: "With Non Existing Test Result Id", TEST_RESULT_ID: 10000, TEST_RESULT_NAME: "Test 2", STATUS: 404 },
]

const DELETE_TEST_RESULT_BY_TEST_RESULT_ID = [
    { TEST_NAME: "With Existing Test Result Id Integer", TEST_RESULT_ID: 1, STATUS: 200 },
    { TEST_NAME: "With Existing Test Result Id Non-integer String", TEST_RESULT_ID: "test", STATUS: 422 },
    { TEST_NAME: "With Existing Test Result Id Float", TEST_RESULT_ID: 1.7, STATUS: 422 },
    { TEST_NAME: "With Non-existing Test Result Id", TEST_RESULT_ID: 1, STATUS: 404 },
]

test.describe('Test Results', () => {

    for (const data of POST_TEST_RESULT) {
        test.skip(`Upload Test Results ${data.TEST_NAME}`, async () => {
            const form = new FormData()
            form.append('test_result', data.TEST_RESULT)
            form.append('artifacts', fs.readFileSync(data.ARTIFACT_PATH), data.ARTIFACT_NAME)

            const response = await axios.post(ENDPOINT + '/test_results/upload',
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

    test.skip(`Upload Test Results With Valid Test Results With No Artifacts`, async () => {
        const form = new FormData()
        form.append('test_result', test_result)

        const response = await axios.post(ENDPOINT + '/test_results/upload',
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

    for (const data of POST_TEST_RESULT_ZIP) {
        test.skip(`Upload Test Results In Zip File ${data.TEST_NAME}`, async () => {
            const form = new FormData()
            form.append('test_result', data.TEST_RESULT)
            form.append('artifacts', fs.readFileSync(data.ARTIFACT_PATH), data.ARTIFACT_NAME)

            const response = await axios.post(ENDPOINT + '/test_results/upload',
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

    for (const data of GET_TEST_RESULT_ARTIFACT) {
        test.skip(`Get Test Result Artifact ${data.TEST_NAME}`, async () => {
            const response = await axios.get(ENDPOINT + "/test_results/" + data.TEST_RESULT_ID + "/artifacts/" + data.ARTIFACT_NAME, {
                validateStatus: function (status) {
                    return status
                }
            })
            expect.soft(response.status).toBe(data.STATUS)
        })
    }

    test.skip('Get Test Results', async () => {
        const response = await axios.get(ENDPOINT + "/test_results/", {
            validateStatus: function (status) {
                return status
            }
        })
        console.log(response.data)
        expect.soft(response.status).toBe(200)
    })

    for (const data of GET_TEST_RESULT_BY_TEST_RESULT_ID) {
        test.skip(`Get Test Result ${data.TEST_NAME}`, async () => {
            const response = await axios.get(ENDPOINT + "/test_results/" + data.TEST_RESULT_ID, {
                validateStatus: function (status) {
                    return status
                }
            })
            expect.soft(response.status).toBe(data.STATUS)
        })
    }

    for (const data of PUT_TEST_RESULT_BY_TEST_RESULT_ID) {
        test.skip(`Update Test Result Name ${data.TEST_NAME}`, async () => {
            const response = await axios.put(ENDPOINT + "/test_results/" + data.TEST_RESULT_ID, { "name": data.TEST_RESULT_NAME }, {
                validateStatus: function (status) {
                    return status
                }
            })
            expect.soft(response.status).toBe(data.STATUS)
        })
    }

    for (const data of DELETE_TEST_RESULT_BY_TEST_RESULT_ID) {
        test.skip(`Delete Test Result ${data.TEST_NAME}`, async () => {
            const response = await axios.delete(ENDPOINT + "/test_results/" + data.TEST_RESULT_ID, {
                validateStatus: function (status) {
                    return status
                }
            })
            expect.soft(response.status).toBe(data.STATUS)
        })
    }

})