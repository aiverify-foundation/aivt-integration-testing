import { test, expect } from '@playwright/test'

import axios from 'axios'
import { setTimeout } from "timers/promises"

const url = process.env.URL
const port_number = process.env.PORT_NUMBER

const strValue = "test"
const intValue = 10
const floatValue = 10.1

test.describe('Test Run', () => {

    test('Server Active', async () => {

        /* Server Active */
        const response = await axios.post(url + ":" + port_number + "/test_runs/server_active", {
            validateStatus: function (status) {
                return status
            }
        })

        /* Assert Server Active */
        expect.soft(response.data).toBeTruthy()
        expect.soft(response.status).toBe(200)
    })

    const POST_RUN_TESTS = [
        {
            TEST_NAME: "With Valid Algorithm Arguments With Valid Algorithm CID With Valid Algorithm GID With Valid Ground Truth With Valid Ground Truth Dataset Name With Valid Mode With Valid Model File Name With Valid Test Dataset File Name",
            CASE_TYPE: "POSITIVE", EXPECTED: {
                algorithmArgs: {
                    file_name_label: 'file_name',
                    set_seed: 10,
                    corruptions: ['all'],
                    gaussian_blur_sigma: [1],
                    glass_blur_max_delta: [],
                    defocus_blur_radius: [],
                    horizontal_motion_blur_kernel_size: [],
                    vertical_motion_blur_kernel_size: [],
                    zoom_blur_zoom_factor: []
                },
                testDatasetFilename: 'raw_fashion_image_10',
                groundTruthDatasetFilename: 'pickle_pandas_fashion_mnist_annotated_labels_10.sav',
                groundTruth: null,
                modelFilename: 'sample_fashion_mnist_sklearn',
            }, STATUS: 200
        },
        {
            TEST_NAME: "With Valid Algorithm Arguments With Valid Algorithm CID With Valid Algorithm GID With Valid Ground Truth With Valid Ground Truth Dataset Name With Valid Mode With Valid Model File Name With Non-existing Dataset File Name",
            CASE_TYPE: "DATASET", INVALID_DATASET_FILENAME: "sample_bc_credit_", EXPECTED: { detail: 'Test dataset not found with the provided testDatasetId' }, STATUS: 404
        },
        {
            TEST_NAME: "With Valid Algorithm Arguments With Valid Algorithm CID With Valid Algorithm GID With Valid Ground Truth With Valid Ground Truth Dataset Name With Valid Mode With Valid Model File Name With Dataset File Name Integer",
            CASE_TYPE: "DATASET", INVALID_DATASET_FILENAME: intValue, EXPECTED: { detail: [{ type: 'string_type', msg: 'Input should be a valid string', input: 10 }] }, STATUS: 422
        },
        {
            TEST_NAME: "With Valid Algorithm Arguments With Valid Algorithm CID With Valid Algorithm GID With Valid Ground Truth With Valid Ground Truth Dataset Name With Valid Mode With Valid Model File Name With Dataset File Name Float",
            CASE_TYPE: "DATASET", INVALID_DATASET_FILENAME: floatValue, EXPECTED: { detail: [{ type: 'string_type', msg: 'Input should be a valid string', input: 10.1 }] }, STATUS: 422
        },
        {
            TEST_NAME: "With Valid Algorithm Arguments With Valid Algorithm CID With Valid Algorithm GID With Valid Ground Truth With Valid Ground Truth Dataset Name With Valid Mode With Valid Model File Name With Dataset File Name Boolean",
            CASE_TYPE: "DATASET", INVALID_DATASET_FILENAME: true, EXPECTED: { detail: [{ type: 'string_type', msg: 'Input should be a valid string', input: true }] }, STATUS: 422
        },
        {
            TEST_NAME: "With Valid Algorithm Arguments With Valid Algorithm CID With Valid Algorithm GID With Valid Ground Truth With Valid Ground Truth Dataset Name With Valid Mode With Valid Model File Name With Dataset File Name Empty",
            CASE_TYPE: "DATASET", INVALID_DATASET_FILENAME: "", EXPECTED: { detail: "Test dataset not found with the provided testDatasetId" }, STATUS: 404
        },
        {
            TEST_NAME: "With Valid Algorithm Arguments With Valid Algorithm CID With Valid Algorithm GID With Valid Ground Truth With Valid Ground Truth Dataset Name With Valid Mode With Valid Model File Name With Dataset File Name Null",
            CASE_TYPE: "DATASET", INVALID_DATASET_FILENAME: null, EXPECTED: { detail: [{ type: 'string_type', msg: 'Input should be a valid string', input: null }] }, STATUS: 422
        },
        {
            TEST_NAME: "With Valid Algorithm Arguments With Valid Algorithm CID With Valid Algorithm GID With Valid Ground Truth With Valid Ground Truth Dataset Name With Valid Mode With Valid Model File Name With Dataset File Name No Value",
            CASE_TYPE: "DATASET", EXPECTED: { detail: [{ type: 'missing', msg: 'Field required' }] }, STATUS: 422
        },
        {
            TEST_NAME: "With Valid Algorithm Arguments With Valid Algorithm CID With Valid Algorithm GID With Valid Ground Truth With Valid Ground Truth Dataset Name With Valid Mode With Non-existing Model File Name With Valid Dataset File Name",
            CASE_TYPE: "MODEL", INVALID_MODEL_FILENAME: "sample_fashion_mnist", EXPECTED: { detail: 'Model not found with the provided modelId' }, STATUS: 404
        },
        {
            TEST_NAME: "With Valid Algorithm Arguments With Valid Algorithm CID With Valid Algorithm GID With Valid Ground Truth With Valid Ground Truth Dataset Name With Valid Mode With Model File Name Integer With Valid Dataset File Name",
            CASE_TYPE: "MODEL", INVALID_MODEL_FILENAME: intValue, EXPECTED: { detail: [{ type: 'string_type', msg: 'Input should be a valid string', input: 10 }] }, STATUS: 422
        },
        {
            TEST_NAME: "With Valid Algorithm Arguments With Valid Algorithm CID With Valid Algorithm GID With Valid Ground Truth With Valid Ground Truth Dataset Name With Valid Mode With Model File Name Float With Valid Dataset File Name",
            CASE_TYPE: "MODEL", INVALID_MODEL_FILENAME: floatValue, EXPECTED: { detail: [{ type: 'string_type', msg: 'Input should be a valid string', input: 10.1 }] }, STATUS: 422
        },
        {
            TEST_NAME: "With Valid Algorithm Arguments With Valid Algorithm CID With Valid Algorithm GID With Valid Ground Truth With Valid Ground Truth Dataset Name With Valid Mode With Model File Name Boolean With Valid Dataset File Name",
            CASE_TYPE: "MODEL", INVALID_MODEL_FILENAME: true, EXPECTED: { detail: [{ type: 'string_type', msg: 'Input should be a valid string', input: true }] }, STATUS: 422
        },
        {
            TEST_NAME: "With Valid Algorithm Arguments With Valid Algorithm CID With Valid Algorithm GID With Valid Ground Truth With Valid Ground Truth Dataset Name With Valid Mode With Model File Name Empty With Valid Dataset File Name",
            CASE_TYPE: "MODEL", INVALID_MODEL_FILENAME: "", EXPECTED: { detail: 'Model not found with the provided modelId' }, STATUS: 404
        },
        {
            TEST_NAME: "With Valid Algorithm Arguments With Valid Algorithm CID With Valid Algorithm GID With Valid Ground Truth With Valid Ground Truth Dataset Name With Valid Mode With Model File Name Null With Valid Dataset File Name",
            CASE_TYPE: "MODEL", INVALID_MODEL_FILENAME: null, EXPECTED: { detail: [{ type: 'string_type', msg: 'Input should be a valid string', input: null }] }, STATUS: 422
        },
        {
            TEST_NAME: "With Valid Algorithm Arguments With Valid Algorithm CID With Valid Algorithm GID With Valid Ground Truth With Valid Ground Truth Dataset Name With Valid Mode With Model File Name No Value With Valid Dataset File Name",
            CASE_TYPE: "MODEL", EXPECTED: { detail: [{ type: 'missing', msg: 'Field required' }] }, STATUS: 422
        },
        {
            TEST_NAME: "With Valid Algorithm Arguments With Valid Algorithm CID With Valid Algorithm GID With Valid Ground Truth With Valid Ground Truth Dataset Name With Invalid Mode With Valid Model File Name With Valid Dataset File Name",
            CASE_TYPE: "MODE", INVALID_MODE: strValue, EXPECTED: { detail: [{ type: 'enum', msg: "Input should be 'upload' or 'api'", input: 'test' }] }, STATUS: 422
        },
        {
            TEST_NAME: "With Valid Algorithm Arguments With Valid Algorithm CID With Valid Algorithm GID With Valid Ground Truth With Valid Ground Truth Dataset Name With Mode Integer With Valid Model File Name With Valid Dataset File Name",
            CASE_TYPE: "MODE", INVALID_MODE: intValue, EXPECTED: { detail: [{ type: 'enum', msg: "Input should be 'upload' or 'api'", input: 10 }] }, STATUS: 422
        },
        {
            TEST_NAME: "With Valid Algorithm Arguments With Valid Algorithm CID With Valid Algorithm GID With Valid Ground Truth With Valid Ground Truth Dataset Name With Mode Float With Valid Model File Name With Valid Dataset File Name",
            CASE_TYPE: "MODE", INVALID_MODE: floatValue, EXPECTED: { detail: [{ type: 'enum', msg: "Input should be 'upload' or 'api'", input: 10.1 }] }, STATUS: 422
        },
        {
            TEST_NAME: "With Valid Algorithm Arguments With Valid Algorithm CID With Valid Algorithm GID With Valid Ground Truth With Valid Ground Truth Dataset Name With Mode Boolean With Valid Model File Name With Valid Dataset File Name",
            CASE_TYPE: "MODE", INVALID_MODE: true, EXPECTED: { detail: [{ type: 'enum', msg: "Input should be 'upload' or 'api'", input: true }] }, STATUS: 422
        },
        {
            TEST_NAME: "With Valid Algorithm Arguments With Valid Algorithm CID With Valid Algorithm GID With Valid Ground Truth With Valid Ground Truth Dataset Name With Mode Empty With Valid Model File Name With Valid Dataset File Name",
            CASE_TYPE: "MODE", INVALID_MODE: "", EXPECTED: { detail: [{ type: 'enum', msg: "Input should be 'upload' or 'api'", input: '' }] }, STATUS: 422
        },
        {
            TEST_NAME: "With Valid Algorithm Arguments With Valid Algorithm CID With Valid Algorithm GID With Valid Ground Truth With Valid Ground Truth Dataset Name With Mode Null With Valid Model File Name With Valid Dataset File Name",
            CASE_TYPE: "MODE", INVALID_MODE: null, EXPECTED: { detail: [{ type: 'enum', msg: "Input should be 'upload' or 'api'", input: null }] }, STATUS: 422
        },
        {
            TEST_NAME: "With Valid Algorithm Arguments With Valid Algorithm CID With Valid Algorithm GID With Valid Ground Truth With Valid Ground Truth Dataset Name With Mode No Value With Valid Model File Name With Valid Dataset File Name",
            CASE_TYPE: "MODE", EXPECTED: { detail: [{ type: 'missing', msg: 'Field required' }] }, STATUS: 422
        },
        {
            TEST_NAME: "With Valid Algorithm Arguments With Valid Algorithm CID With Valid Algorithm GID With Valid Ground Truth With Invalid Ground Truth Dataset Name With Valid Mode With Valid Model File Name With Valid Dataset File Name",
            CASE_TYPE: "GROUND_TRUTH_DATASET", INVALID_GROUND_TRUTH_DATASET: "test1", EXPECTED: { detail: 'Test dataset not found with the provided groundTruthDatasetId' }, STATUS: 404
        },
        {
            TEST_NAME: "With Valid Algorithm Arguments With Valid Algorithm CID With Valid Algorithm GID With Valid Ground Truth With Ground Truth Dataset Name Integer With Valid Mode With Valid Model File Name With Valid Dataset File Name",
            CASE_TYPE: "GROUND_TRUTH_DATASET", INVALID_GROUND_TRUTH_DATASET: intValue, EXPECTED: { detail: [{ type: 'string_type', msg: 'Input should be a valid string', input: 10 }] }, STATUS: 422
        },
        {
            TEST_NAME: "With Valid Algorithm Arguments With Valid Algorithm CID With Valid Algorithm GID With Valid Ground Truth With Ground Truth Dataset Name Float With Valid Mode With Valid Model File Name With Valid Dataset File Name",
            CASE_TYPE: "GROUND_TRUTH_DATASET", INVALID_GROUND_TRUTH_DATASET: floatValue, EXPECTED: { detail: [{ type: 'string_type', msg: 'Input should be a valid string', input: 10.1 }] }, STATUS: 422
        },
        {
            TEST_NAME: "With Valid Algorithm Arguments With Valid Algorithm CID With Valid Algorithm GID With Valid Ground Truth With Ground Truth Dataset Name Boolean With Valid Mode With Valid Model File Name With Valid Dataset File Name",
            CASE_TYPE: "GROUND_TRUTH_DATASET", INVALID_GROUND_TRUTH_DATASET: true, EXPECTED: { detail: [{ type: 'string_type', msg: 'Input should be a valid string', input: true }] }, STATUS: 422
        },
        {
            TEST_NAME: "With Valid Algorithm Arguments With Valid Algorithm CID With Valid Algorithm GID With Valid Ground Truth With Ground Truth Dataset Name Empty With Valid Mode With Valid Model File Name With Valid Dataset File Name",
            CASE_TYPE: "GROUND_TRUTH_DATASET", INVALID_GROUND_TRUTH_DATASET: "", EXPECTED: {
                mode: 'upload',
                algorithmGID: 'aiverify.stock.image_corruption_toolbox',
                algorithmArgs: {
                    file_name_label: 'file_name',
                    set_seed: 10,
                    corruptions: ['all'],
                    gaussian_blur_sigma: [1],
                    glass_blur_max_delta: [],
                    defocus_blur_radius: [],
                    horizontal_motion_blur_kernel_size: [],
                    vertical_motion_blur_kernel_size: [],
                    zoom_blur_zoom_factor: []
                },
                testDatasetFilename: 'raw_fashion_image_10',
                groundTruthDatasetFilename: null,
                groundTruth: null,
            }, STATUS: 200
        },
        {
            TEST_NAME: "With Valid Algorithm Arguments With Valid Algorithm CID With Valid Algorithm GID With Valid Ground Truth With Ground Truth Dataset Name Null With Valid Mode With Valid Model File Name With Valid Dataset File Name",
            CASE_TYPE: "GROUND_TRUTH_DATASET", INVALID_GROUND_TRUTH_DATASET: null, EXPECTED: {
                mode: 'upload',
                algorithmGID: 'aiverify.stock.image_corruption_toolbox',
                algorithmArgs: {
                    file_name_label: 'file_name',
                    set_seed: 10,
                    corruptions: ['all'],
                    gaussian_blur_sigma: [1],
                    glass_blur_max_delta: [],
                    defocus_blur_radius: [],
                    horizontal_motion_blur_kernel_size: [],
                    vertical_motion_blur_kernel_size: [],
                    zoom_blur_zoom_factor: []
                },
                testDatasetFilename: 'raw_fashion_image_10',
                groundTruthDatasetFilename: null,
                groundTruth: null,
                modelFilename: 'sample_fashion_mnist_sklearn'
            }, STATUS: 200
        },
        {
            TEST_NAME: "With Valid Algorithm Arguments With Valid Algorithm CID With Valid Algorithm GID With Valid Ground Truth With Ground Truth Dataset Name No Value With Valid Mode With Valid Model File Name With Valid Dataset File Name",
            CASE_TYPE: "GROUND_TRUTH_DATASET", EXPECTED: {
                mode: 'upload',
                algorithmGID: 'aiverify.stock.image_corruption_toolbox',
                algorithmArgs: {
                    file_name_label: 'file_name',
                    set_seed: 10,
                    corruptions: ['all'],
                    gaussian_blur_sigma: [1],
                    glass_blur_max_delta: [],
                    defocus_blur_radius: [],
                    horizontal_motion_blur_kernel_size: [],
                    vertical_motion_blur_kernel_size: [],
                    zoom_blur_zoom_factor: []
                },
                testDatasetFilename: 'raw_fashion_image_10',
                groundTruthDatasetFilename: null,
                groundTruth: null,
                modelFilename: 'sample_fashion_mnist_sklearn'
            }, STATUS: 200
        },
        {
            TEST_NAME: "With Valid Algorithm Arguments With Valid Algorithm CID With Valid Algorithm GID With Invalid Ground Truth With Valid Ground Truth Dataset Name With Valid Mode With Valid Model File Name With Valid Dataset File Name",
            CASE_TYPE: "GROUND_TRUTH", INVALID_GROUND_TRUTH: strValue, EXPECTED: {
                mode: 'upload',
                algorithmGID: 'aiverify.stock.image_corruption_toolbox',
                algorithmArgs: {
                    file_name_label: 'file_name',
                    set_seed: 10,
                    corruptions: ['all'],
                    gaussian_blur_sigma: [1],
                    glass_blur_max_delta: [],
                    defocus_blur_radius: [],
                    horizontal_motion_blur_kernel_size: [],
                    vertical_motion_blur_kernel_size: [],
                    zoom_blur_zoom_factor: []
                },
                testDatasetFilename: 'raw_fashion_image_10',
                groundTruthDatasetFilename: 'pickle_pandas_fashion_mnist_annotated_labels_10.sav',
                groundTruth: null,
                modelFilename: 'sample_fashion_mnist_sklearn'
            }, STATUS: 200
        },
        {
            TEST_NAME: "With Valid Algorithm Arguments With Valid Algorithm CID With Valid Algorithm GID With Ground Truth Integer With Valid Ground Truth Dataset Name With Valid Mode With Valid Model File Name With Valid Dataset File Name",
            CASE_TYPE: "GROUND_TRUTH", INVALID_GROUND_TRUTH: intValue, EXPECTED: { detail: [{ type: 'string_type', msg: 'Input should be a valid string', input: 10 }] }, STATUS: 422
        },
        {
            TEST_NAME: "With Valid Algorithm Arguments With Valid Algorithm CID With Valid Algorithm GID With Ground Truth Float With Valid Ground Truth Dataset Name With Valid Mode With Valid Model File Name With Valid Dataset File Name",
            CASE_TYPE: "GROUND_TRUTH", INVALID_GROUND_TRUTH: floatValue, EXPECTED: { detail: [{ type: 'string_type', msg: 'Input should be a valid string', input: 10.1 }] }, STATUS: 422
        },
        {
            TEST_NAME: "With Valid Algorithm Arguments With Valid Algorithm CID With Valid Algorithm GID With Ground Truth Boolean With Valid Ground Truth Dataset Name With Valid Mode With Valid Model File Name With Valid Dataset File Name",
            CASE_TYPE: "GROUND_TRUTH", INVALID_GROUND_TRUTH: true, EXPECTED: { detail: [{ type: 'string_type', msg: 'Input should be a valid string', input: true }] }, STATUS: 422
        },
        {
            TEST_NAME: "With Valid Algorithm Arguments With Valid Algorithm CID With Valid Algorithm GID With Ground Truth Empty With Valid Ground Truth Dataset Name With Valid Mode With Valid Model File Name With Valid Dataset File Name",
            CASE_TYPE: "GROUND_TRUTH", INVALID_GROUND_TRUTH: "",
            EXPECTED: {
                mode: 'upload',
                algorithmGID: 'aiverify.stock.image_corruption_toolbox',
                algorithmArgs: {
                    file_name_label: 'file_name',
                    set_seed: 10,
                    corruptions: ['all'],
                    gaussian_blur_sigma: [1],
                    glass_blur_max_delta: [],
                    defocus_blur_radius: [],
                    horizontal_motion_blur_kernel_size: [],
                    vertical_motion_blur_kernel_size: [],
                    zoom_blur_zoom_factor: []
                },
                testDatasetFilename: 'raw_fashion_image_10',
                groundTruthDatasetFilename: 'pickle_pandas_fashion_mnist_annotated_labels_10.sav',
                groundTruth: null,
                modelFilename: 'sample_fashion_mnist_sklearn'
            }, STATUS: 200
        },
        {
            TEST_NAME: "With Valid Algorithm Arguments With Valid Algorithm CID With Valid Algorithm GID With Ground Truth Null With Valid Ground Truth Dataset Name With Valid Mode With Valid Model File Name With Valid Dataset File Name",
            CASE_TYPE: "GROUND_TRUTH", INVALID_GROUND_TRUTH: null, EXPECTED: {
                mode: 'upload',
                algorithmGID: 'aiverify.stock.image_corruption_toolbox',
                algorithmArgs: {
                    file_name_label: 'file_name',
                    set_seed: 10,
                    corruptions: ['all'],
                    gaussian_blur_sigma: [1],
                    glass_blur_max_delta: [],
                    defocus_blur_radius: [],
                    horizontal_motion_blur_kernel_size: [],
                    vertical_motion_blur_kernel_size: [],
                    zoom_blur_zoom_factor: []
                },
                testDatasetFilename: 'raw_fashion_image_10',
                groundTruthDatasetFilename: 'pickle_pandas_fashion_mnist_annotated_labels_10.sav',
                groundTruth: null,
                modelFilename: 'sample_fashion_mnist_sklearn'
            }, STATUS: 200
        },
        {
            TEST_NAME: "With Valid Algorithm Arguments With Valid Algorithm CID With Valid Algorithm GID With Ground Truth No Value With Valid Ground Truth Dataset Name With Valid Mode With Valid Model File Name With Valid Dataset File Name",
            CASE_TYPE: "GROUND_TRUTH", EXPECTED: {
                mode: 'upload',
                algorithmGID: 'aiverify.stock.image_corruption_toolbox',
                algorithmArgs: {
                    file_name_label: 'file_name',
                    set_seed: 10,
                    corruptions: ['all'],
                    gaussian_blur_sigma: [1],
                    glass_blur_max_delta: [],
                    defocus_blur_radius: [],
                    horizontal_motion_blur_kernel_size: [],
                    vertical_motion_blur_kernel_size: [],
                    zoom_blur_zoom_factor: []
                },
                testDatasetFilename: 'raw_fashion_image_10',
                groundTruthDatasetFilename: 'pickle_pandas_fashion_mnist_annotated_labels_10.sav',
                groundTruth: null,
                modelFilename: 'sample_fashion_mnist_sklearn'
            }, STATUS: 200
        },
        {
            TEST_NAME: "With Valid Algorithm Arguments With Valid Algorithm CID With Invalid Algorithm GID With Valid Ground Truth With Valid Ground Truth Dataset Name With Valid Mode With Valid Model File Name With Valid Dataset File Name",
            CASE_TYPE: "ALGORITHM_GID", INVALID_ALGORITHM_GID: strValue, EXPECTED: { detail: 'Algorithm not found with the provided GID and CID' }, STATUS: 404
        },
        {
            TEST_NAME: "With Valid Algorithm Arguments With Valid Algorithm CID With Algorithm GID Integer With Valid Ground Truth With Valid Ground Truth Dataset Name With Valid Mode With Valid Model File Name With Valid Dataset File Name",
            CASE_TYPE: "ALGORITHM_GID", INVALID_ALGORITHM_GID: intValue, EXPECTED: { detail: [{ type: 'string_type', msg: 'Input should be a valid string', input: 10 }] }, STATUS: 422
        },
        {
            TEST_NAME: "With Valid Algorithm Arguments With Valid Algorithm CID With Algorithm GID Float With Valid Ground Truth With Valid Ground Truth Dataset Name With Valid Mode With Valid Model File Name With Valid Dataset File Name",
            CASE_TYPE: "ALGORITHM_GID", INVALID_ALGORITHM_GID: floatValue, EXPECTED: { detail: [{ type: 'string_type', msg: 'Input should be a valid string', input: 10.1 }] }, STATUS: 422
        },
        {
            TEST_NAME: "With Valid Algorithm Arguments With Valid Algorithm CID With Algorithm GID Boolean With Valid Ground Truth With Valid Ground Truth Dataset Name With Valid Mode With Valid Model File Name With Valid Dataset File Name",
            CASE_TYPE: "ALGORITHM_GID", INVALID_ALGORITHM_GID: true, EXPECTED: { detail: [{ type: 'string_type', msg: 'Input should be a valid string', input: true }] }, STATUS: 422
        },
        {
            TEST_NAME: "With Valid Algorithm Arguments With Valid Algorithm CID With Algorithm GID Empty With Valid Ground Truth With Valid Ground Truth Dataset Name With Valid Mode With Valid Model File Name With Valid Dataset File Name",
            CASE_TYPE: "ALGORITHM_GID", INVALID_ALGORITHM_GID: "", EXPECTED: { detail: "Algorithm not found with the provided GID and CID" }, STATUS: 404
        },
        {
            TEST_NAME: "With Valid Algorithm Arguments With Valid Algorithm CID With Algorithm GID Null With Valid Ground Truth With Valid Ground Truth Dataset Name With Valid Mode With Valid Model File Name With Valid Dataset File Name",
            CASE_TYPE: "ALGORITHM_GID", INVALID_ALGORITHM_GID: null, EXPECTED: { detail: [{ type: 'string_type', msg: 'Input should be a valid string', input: null }] }, STATUS: 422
        },
        {
            TEST_NAME: "With Valid Algorithm Arguments With Valid Algorithm CID With Algorithm GID No Value With Valid Ground Truth With Valid Ground Truth Dataset Name With Valid Mode With Valid Model File Name With Valid Dataset File Name",
            CASE_TYPE: "ALGORITHM_GID", EXPECTED: { detail: [{ type: 'missing', msg: 'Field required' }] }, STATUS: 422
        },
        {
            TEST_NAME: "With Valid Algorithm Arguments With Invalid Algorithm CID With Valid Algorithm GID With Valid Ground Truth With Valid Ground Truth Dataset Name With Valid Mode With Valid Model File Name With Valid Dataset File Name",
            CASE_TYPE: "ALGORITHM_CID", INVALID_ALGORITHM_CID: strValue, EXPECTED: { detail: 'Algorithm not found with the provided GID and CID' }, STATUS: 404
        },
        {
            TEST_NAME: "With Valid Algorithm Arguments With Algorithm CID Integer With Valid Algorithm GID With Valid Ground Truth With Valid Ground Truth Dataset Name With Valid Mode With Valid Model File Name With Valid Dataset File Name",
            CASE_TYPE: "ALGORITHM_CID", INVALID_ALGORITHM_CID: intValue, EXPECTED: { detail: [{ type: 'string_type', msg: 'Input should be a valid string', input: 10 }] }, STATUS: 422
        },
        {
            TEST_NAME: "With Valid Algorithm Arguments With Algorithm CID Float With Valid Algorithm GID With Valid Ground Truth With Valid Ground Truth Dataset Name With Valid Mode With Valid Model File Name With Valid Dataset File Name",
            CASE_TYPE: "ALGORITHM_CID", INVALID_ALGORITHM_CID: floatValue, EXPECTED: { detail: [{ type: 'string_type', msg: 'Input should be a valid string', input: 10.1 }] }, STATUS: 422
        },
        {
            TEST_NAME: "With Valid Algorithm Arguments With Algorithm CID Boolean With Valid Algorithm GID With Valid Ground Truth With Valid Ground Truth Dataset Name With Valid Mode With Valid Model File Name With Valid Dataset File Name",
            CASE_TYPE: "ALGORITHM_CID", INVALID_ALGORITHM_CID: true, EXPECTED: { detail: [{ type: 'string_type', msg: 'Input should be a valid string', input: true }] }, STATUS: 422
        },
        {
            TEST_NAME: "With Valid Algorithm Arguments With Algorithm CID Empty With Valid Algorithm GID With Valid Ground Truth With Valid Ground Truth Dataset Name With Valid Mode With Valid Model File Name With Valid Dataset File Name",
            CASE_TYPE: "ALGORITHM_CID", INVALID_ALGORITHM_CID: "", EXPECTED: { detail: "Algorithm not found with the provided GID and CID" }, STATUS: 404
        },
        {
            TEST_NAME: "With Valid Algorithm Arguments With Algorithm CID Null With Valid Algorithm GID With Valid Ground Truth With Valid Ground Truth Dataset Name With Valid Mode With Valid Model File Name With Valid Dataset File Name",
            CASE_TYPE: "ALGORITHM_CID", INVALID_ALGORITHM_CID: null, EXPECTED: { detail: [{ type: 'string_type', msg: 'Input should be a valid string', input: null }] }, STATUS: 422
        },
        {
            TEST_NAME: "With Valid Algorithm Arguments With Algorithm CID No Value With Valid Algorithm GID With Valid Ground Truth With Valid Ground Truth Dataset Name With Valid Mode With Valid Model File Name With Valid Dataset File Name",
            CASE_TYPE: "ALGORITHM_CID", EXPECTED: { detail: [{ type: 'missing', msg: 'Field required' }] }, STATUS: 422
        },
        {
            TEST_NAME: "With Algorithm Arguments Non Array String With Valid Algorithm CID With Valid Algorithm GID With Valid Ground Truth With Valid Ground Truth Dataset Name With Valid Mode With Valid Model File Name With Valid Dataset File Name",
            CASE_TYPE: "ALGORITHM_ARGUMENTS", INVALID_ALGORITHM_ARGUMENTS: strValue, EXPECTED: { detail: [{ type: 'dict_type', msg: 'Input should be a valid dictionary', input: 'test' }] }, STATUS: 422
        },
        {
            TEST_NAME: "With Algorithm Arguments Non Array Integer With Valid Algorithm CID With Valid Algorithm GID With Valid Ground Truth With Valid Ground Truth Dataset Name With Valid Mode With Valid Model File Name With Valid Dataset File Name",
            CASE_TYPE: "ALGORITHM_ARGUMENTS", INVALID_ALGORITHM_ARGUMENTS: intValue, EXPECTED: { detail: [{ type: 'dict_type', msg: 'Input should be a valid dictionary', input: 10 }] }, STATUS: 422
        },
        {
            TEST_NAME: "With Algorithm Arguments Non Array Float With Valid Algorithm CID With Valid Algorithm GID With Valid Ground Truth With Valid Ground Truth Dataset Name With Valid Mode With Valid Model File Name With Valid Dataset File Name",
            CASE_TYPE: "ALGORITHM_ARGUMENTS", INVALID_ALGORITHM_ARGUMENTS: floatValue, EXPECTED: { detail: [{ type: 'dict_type', msg: 'Input should be a valid dictionary', input: 10.1 }] }, STATUS: 422
        },
        {
            TEST_NAME: "With Algorithm Arguments Non Array Boolean With Valid Algorithm CID With Valid Algorithm GID With Valid Ground Truth With Valid Ground Truth Dataset Name With Valid Mode With Valid Model File Name With Valid Dataset File Name",
            CASE_TYPE: "ALGORITHM_ARGUMENTS", INVALID_ALGORITHM_ARGUMENTS: true, EXPECTED: { detail: [{ type: 'dict_type', msg: 'Input should be a valid dictionary', input: true }] }, STATUS: 422
        },
        {
            TEST_NAME: "With Algorithm Arguments Non Array Empty With Valid Algorithm CID With Valid Algorithm GID With Valid Ground Truth With Valid Ground Truth Dataset Name With Valid Mode With Valid Model File Name With Valid Dataset File Name",
            CASE_TYPE: "ALGORITHM_ARGUMENTS", INVALID_ALGORITHM_ARGUMENTS: "", EXPECTED: { detail: [{ type: 'dict_type', msg: 'Input should be a valid dictionary', input: '' }] }, STATUS: 422
        },
        {
            TEST_NAME: "With Algorithm Arguments Non Array Null With Valid Algorithm CID With Valid Algorithm GID With Valid Ground Truth With Valid Ground Truth Dataset Name With Valid Mode With Valid Model File Name With Valid Dataset File Name",
            CASE_TYPE: "ALGORITHM_ARGUMENTS", INVALID_ALGORITHM_ARGUMENTS: null, EXPECTED: { detail: [{ type: 'dict_type', msg: 'Input should be a valid dictionary', input: null }] }, STATUS: 422
        },
        {
            TEST_NAME: "With Algorithm Arguments Non Array No Value With Valid Algorithm CID With Valid Algorithm GID With Valid Ground Truth With Valid Ground Truth Dataset Name With Valid Mode With Valid Model File Name With Valid Dataset File Name",
            CASE_TYPE: "ALGORITHM_ARGUMENTS", EXPECTED: { detail: [{ type: 'missing', msg: 'Field required' }] }, STATUS: 422
        }
    ]

    for (const data of POST_RUN_TESTS) {
        test(`Run Test ${data.TEST_NAME}`, async () => {

            let response, RUN_TEST_DATA

            if (data.CASE_TYPE == "POSITIVE") {

                RUN_TEST_DATA = {
                    mode: "upload",
                    algorithmGID: "aiverify.stock.image_corruption_toolbox",
                    algorithmCID: "aiverify_blur_corruptions",
                    algorithmArgs: {
                        file_name_label: "file_name",
                        set_seed: 10,
                        corruptions: [
                            "all"
                        ],
                        gaussian_blur_sigma: [
                            1
                        ],
                        glass_blur_max_delta: [],
                        defocus_blur_radius: [],
                        horizontal_motion_blur_kernel_size: [],
                        vertical_motion_blur_kernel_size: [],
                        zoom_blur_zoom_factor: []
                    },
                    testDatasetFilename: "raw_fashion_image_10",
                    groundTruthDatasetFilename: "pickle_pandas_fashion_mnist_annotated_labels_10.sav",
                    groundTruth: "label",
                    modelFilename: "sample_fashion_mnist_sklearn"
                }

            }
            if (data.CASE_TYPE == "DATASET") {

                RUN_TEST_DATA = {
                    mode: "upload",
                    algorithmGID: "aiverify.stock.image_corruption_toolbox",
                    algorithmCID: "aiverify_blur_corruptions",
                    algorithmArgs: {
                        file_name_label: "file_name",
                        set_seed: 10,
                        corruptions: [
                            "all"
                        ],
                        gaussian_blur_sigma: [
                            1
                        ],
                        glass_blur_max_delta: [],
                        defocus_blur_radius: [],
                        horizontal_motion_blur_kernel_size: [],
                        vertical_motion_blur_kernel_size: [],
                        zoom_blur_zoom_factor: []
                    },
                    testDatasetFilename: data.INVALID_DATASET_FILENAME,
                    groundTruthDatasetFilename: "pickle_pandas_fashion_mnist_annotated_labels_10.sav",
                    groundTruth: "label",
                    modelFilename: "sample_fashion_mnist_sklearn"
                }
            }
            if (data.CASE_TYPE == "MODEL") {

                RUN_TEST_DATA = {
                    mode: "upload",
                    algorithmGID: "aiverify.stock.image_corruption_toolbox",
                    algorithmCID: "aiverify_blur_corruptions",
                    algorithmArgs: {
                        file_name_label: "file_name",
                        set_seed: 10,
                        corruptions: [
                            "all"
                        ],
                        gaussian_blur_sigma: [
                            1
                        ],
                        glass_blur_max_delta: [],
                        defocus_blur_radius: [],
                        horizontal_motion_blur_kernel_size: [],
                        vertical_motion_blur_kernel_size: [],
                        zoom_blur_zoom_factor: []
                    },
                    testDatasetFilename: "raw_fashion_image_10",
                    groundTruthDatasetFilename: "pickle_pandas_fashion_mnist_annotated_labels_10.sav",
                    groundTruth: "label",
                    modelFilename: data.INVALID_MODEL_FILENAME
                }
            }
            if (data.CASE_TYPE == "MODE") {

                RUN_TEST_DATA = {
                    mode: data.INVALID_MODE,
                    algorithmGID: "aiverify.stock.image_corruption_toolbox",
                    algorithmCID: "aiverify_blur_corruptions",
                    algorithmArgs: {
                        file_name_label: "file_name",
                        set_seed: 10,
                        corruptions: [
                            "all"
                        ],
                        gaussian_blur_sigma: [
                            1
                        ],
                        glass_blur_max_delta: [],
                        defocus_blur_radius: [],
                        horizontal_motion_blur_kernel_size: [],
                        vertical_motion_blur_kernel_size: [],
                        zoom_blur_zoom_factor: []
                    },
                    testDatasetFilename: "raw_fashion_image_10",
                    groundTruthDatasetFilename: "pickle_pandas_fashion_mnist_annotated_labels_10.sav",
                    groundTruth: "label",
                    modelFilename: "sample_fashion_mnist_sklearn"
                }
            }
            if (data.CASE_TYPE == "GROUND_TRUTH_DATASET") {

                RUN_TEST_DATA = {
                    mode: "upload",
                    algorithmGID: "aiverify.stock.image_corruption_toolbox",
                    algorithmCID: "aiverify_blur_corruptions",
                    algorithmArgs: {
                        file_name_label: "file_name",
                        set_seed: 10,
                        corruptions: [
                            "all"
                        ],
                        gaussian_blur_sigma: [
                            1
                        ],
                        glass_blur_max_delta: [],
                        defocus_blur_radius: [],
                        horizontal_motion_blur_kernel_size: [],
                        vertical_motion_blur_kernel_size: [],
                        zoom_blur_zoom_factor: []
                    },
                    testDatasetFilename: "raw_fashion_image_10",
                    groundTruthDatasetFilename: data.INVALID_GROUND_TRUTH_DATASET,
                    groundTruth: "label",
                    modelFilename: "sample_fashion_mnist_sklearn"
                }
            }
            if (data.CASE_TYPE == "GROUND_TRUTH") {

                RUN_TEST_DATA = {
                    mode: "upload",
                    algorithmGID: "aiverify.stock.image_corruption_toolbox",
                    algorithmCID: "aiverify_blur_corruptions",
                    algorithmArgs: {
                        file_name_label: "file_name",
                        set_seed: 10,
                        corruptions: [
                            "all"
                        ],
                        gaussian_blur_sigma: [
                            1
                        ],
                        glass_blur_max_delta: [],
                        defocus_blur_radius: [],
                        horizontal_motion_blur_kernel_size: [],
                        vertical_motion_blur_kernel_size: [],
                        zoom_blur_zoom_factor: []
                    },
                    testDatasetFilename: "raw_fashion_image_10",
                    groundTruthDatasetFilename: "pickle_pandas_fashion_mnist_annotated_labels_10.sav",
                    groundTruth: data.INVALID_GROUND_TRUTH,
                    modelFilename: "sample_fashion_mnist_sklearn"
                }
            }
            if (data.CASE_TYPE == "ALGORITHM_GID") {

                RUN_TEST_DATA = {
                    mode: "upload",
                    algorithmGID: data.INVALID_ALGORITHM_GID,
                    algorithmCID: "aiverify_blur_corruptions",
                    algorithmArgs: {
                        file_name_label: "file_name",
                        set_seed: 10,
                        corruptions: [
                            "all"
                        ],
                        gaussian_blur_sigma: [
                            1
                        ],
                        glass_blur_max_delta: [],
                        defocus_blur_radius: [],
                        horizontal_motion_blur_kernel_size: [],
                        vertical_motion_blur_kernel_size: [],
                        zoom_blur_zoom_factor: []
                    },
                    testDatasetFilename: "raw_fashion_image_10",
                    groundTruthDatasetFilename: "pickle_pandas_fashion_mnist_annotated_labels_10.sav",
                    groundTruth: "label",
                    modelFilename: "sample_fashion_mnist_sklearn"
                }
            }
            if (data.CASE_TYPE == "ALGORITHM_CID") {

                RUN_TEST_DATA = {
                    mode: "upload",
                    algorithmGID: "aiverify.stock.image_corruption_toolbox",
                    algorithmCID: data.INVALID_ALGORITHM_CID,
                    algorithmArgs: {
                        file_name_label: "file_name",
                        set_seed: 10,
                        corruptions: [
                            "all"
                        ],
                        gaussian_blur_sigma: [
                            1
                        ],
                        glass_blur_max_delta: [],
                        defocus_blur_radius: [],
                        horizontal_motion_blur_kernel_size: [],
                        vertical_motion_blur_kernel_size: [],
                        zoom_blur_zoom_factor: []
                    },
                    testDatasetFilename: "raw_fashion_image_10",
                    groundTruthDatasetFilename: "pickle_pandas_fashion_mnist_annotated_labels_10.sav",
                    groundTruth: "label",
                    modelFilename: "sample_fashion_mnist_sklearn"
                }
            }
            if (data.CASE_TYPE == "ALGORITHM_ARGUMENTS") {

                RUN_TEST_DATA = {
                    mode: "upload",
                    algorithmGID: "aiverify.stock.image_corruption_toolbox",
                    algorithmCID: "aiverify_blur_corruptions",
                    algorithmArgs: data.INVALID_ALGORITHM_ARGUMENTS,
                    testDatasetFilename: "raw_fashion_image_10",
                    groundTruthDatasetFilename: "pickle_pandas_fashion_mnist_annotated_labels_10.sav",
                    groundTruth: "label",
                    modelFilename: "sample_fashion_mnist_sklearn"
                }
            }

            /* Post Test Run */
            response = await axios.post(url + ":" + port_number + "/test_runs/run_test", RUN_TEST_DATA, {
                validateStatus: function (status) {
                    return status
                }
            })

            /* Assert Post Test Run */
            expect.soft(response.data).toMatchObject(data.EXPECTED)
            expect.soft(response.status).toBe(data.STATUS)
        })
    }

    test('Get All Test Runs', async () => {

        /* Get All Test Runs */
        const response = await axios.get(url + ":" + port_number + "/test_runs", {
            validateStatus: function (status) {
                return status
            }
        })

        /* Assert Get All Test Runs */
        expect.soft(response.status).toBe(200)

    })

    const GET_TEST_RUN_BY_TEST_RUN_ID = [
        {
            TEST_NAME: "With Existing Test Run ID", CASE_TYPE: "POSITIVE", EXPECTED: {
                mode: 'upload',
                algorithmGID: 'aiverify.stock.accumulated_local_effect',
                algorithmCID: 'aiverify_accumulated_local_effect',
                algorithmArgs: {},
                testDatasetFilename: 'sample_bc_credit_data.sav',
                groundTruthDatasetFilename: 'sample_bc_credit_data.sav',
                groundTruth: null,
                modelFilename: 'sample_bc_credit_sklearn_linear.LogisticRegression.sav',
                status: 'pending',
                progress: 0,
                testResult: null
            }, STATUS: 200
        },
        { TEST_NAME: "With Non-existing Test RUN ID", RUN_TEST_ID: strValue, EXPECTED: "Internal Server Error", STATUS: 500 },
        { TEST_NAME: "With Test RUN ID Integer", RUN_TEST_ID: intValue, EXPECTED: "Internal Server Error", STATUS: 500 },
        { TEST_NAME: "With Test RUN ID Float", RUN_TEST_ID: floatValue, EXPECTED: "Internal Server Error", STATUS: 500 },
        { TEST_NAME: "With Test RUN ID Boolean", RUN_TEST_ID: true, EXPECTED: "Internal Server Error", STATUS: 500 },
        { TEST_NAME: "With Test RUN ID Null", RUN_TEST_ID: null, EXPECTED: "Internal Server Error", STATUS: 500 },
        { TEST_NAME: "With Test RUN ID No Value", EXPECTED: "Internal Server Error", STATUS: 500 },
    ]

    for (const data of GET_TEST_RUN_BY_TEST_RUN_ID) {

        test(`Get Test Run By Test Run ID ${data.TEST_NAME}`, async () => {

            let response, run_test_id

            if (data.CASE_TYPE == "POSITIVE") {

                const RUN_TEST_DATA = {
                    algorithmArgs: {},
                    algorithmCID: "aiverify_accumulated_local_effect",
                    algorithmGID: "aiverify.stock.accumulated_local_effect",
                    groundTruth: "default",
                    groundTruthDatasetFilename: "sample_bc_credit_data.sav",
                    mode: "upload",
                    modelFilename: "sample_bc_credit_sklearn_linear.LogisticRegression.sav",
                    testDatasetFilename: "sample_bc_credit_data.sav"
                }

                /* Run Test */
                response = await axios.post(url + ":" + port_number + "/test_runs/run_test", RUN_TEST_DATA, {
                    validateStatus: function (status) {
                        return status
                    }
                })

                await setTimeout(7000)

                /* Set Run Test ID */
                run_test_id = response.data.id

            } else {
                run_test_id = data.RUN_TEST_ID
            }

            /* Get Test Run By Test Run ID */
            response = await axios.get(url + ":" + port_number + "/test_runs/" + run_test_id, {
                validateStatus: function (status) {
                    return status
                }
            })

            /* Assert Get Test Run By Test Run ID */
            if (data.CASE_TYPE == "POSITIVE")
                expect.soft(response.data).toMatchObject(data.EXPECTED)
            else
                expect.soft(response.data).toBe(data.EXPECTED)

            expect.soft(response.status).toBe(data.STATUS)

        })
    }

    const PATCH_TEST_RUNS_BY_TEST_RUN_ID = [
        {
            TEST_NAME: "With Existing Test Run ID With Status Pending With Valid Progress With Valid Error Messages", CASE_TYPE: "POSITIVE", TEST_RUN_STATUS: "pending", EXPECTED: {
                mode: 'upload',
                algorithmGID: 'aiverify.stock.accumulated_local_effect',
                algorithmCID: 'aiverify_accumulated_local_effect',
                algorithmArgs: {},
                testDatasetFilename: 'sample_bc_credit_data.sav',
                groundTruthDatasetFilename: 'sample_bc_credit_data.sav',
                groundTruth: null,
                modelFilename: 'sample_bc_credit_sklearn_linear.LogisticRegression.sav',
                status: 'pending',
                progress: 100,
                testResult: null,
                errorMessages: null
            }, STATUS: 200
        },
        {
            TEST_NAME: "With Existing Test Run ID With Status Success With Valid Progress With Valid Error Messages", CASE_TYPE: "POSITIVE", TEST_RUN_STATUS: "success", EXPECTED: {
                mode: 'upload',
                algorithmGID: 'aiverify.stock.accumulated_local_effect',
                algorithmCID: 'aiverify_accumulated_local_effect',
                algorithmArgs: {},
                testDatasetFilename: 'sample_bc_credit_data.sav',
                groundTruthDatasetFilename: 'sample_bc_credit_data.sav',
                groundTruth: null,
                modelFilename: 'sample_bc_credit_sklearn_linear.LogisticRegression.sav',
                status: 'success',
                progress: 100,
                testResult: null,
                errorMessages: null
            }, STATUS: 200
        },
        {
            TEST_NAME: "With Existing Test Run ID With Status Error With Valid Progress With Valid Error Messages", CASE_TYPE: "POSITIVE", TEST_RUN_STATUS: "error", EXPECTED: {
                mode: 'upload',
                algorithmGID: 'aiverify.stock.accumulated_local_effect',
                algorithmCID: 'aiverify_accumulated_local_effect',
                algorithmArgs: {},
                testDatasetFilename: 'sample_bc_credit_data.sav',
                groundTruthDatasetFilename: 'sample_bc_credit_data.sav',
                groundTruth: null,
                modelFilename: 'sample_bc_credit_sklearn_linear.LogisticRegression.sav',
                status: 'error',
                progress: 100,
                testResult: null,
                errorMessages: 'test'
            }, STATUS: 200
        },
        {
            TEST_NAME: "With Existing Test Run ID With Status Cancelled With Valid Progress With Valid Error Messages", CASE_TYPE: "POSITIVE", TEST_RUN_STATUS: "cancelled", EXPECTED: {
                mode: 'upload',
                algorithmGID: 'aiverify.stock.accumulated_local_effect',
                algorithmCID: 'aiverify_accumulated_local_effect',
                algorithmArgs: {},
                testDatasetFilename: 'sample_bc_credit_data.sav',
                groundTruthDatasetFilename: 'sample_bc_credit_data.sav',
                groundTruth: null,
                modelFilename: 'sample_bc_credit_sklearn_linear.LogisticRegression.sav',
                status: 'cancelled',
                progress: 100,
                testResult: null,
                errorMessages: null
            }, STATUS: 200
        },
        { TEST_NAME: "With Existing Test Run ID With Status Error With Valid Progress With Error Message Integer", CASE_TYPE: "ERROR_MESSAGES", ERROR_MESSAGES: intValue, EXPECTED: { detail: [{ input: 10, type: 'string_type', msg: 'Input should be a valid string' }] }, STATUS: 422 },
        { TEST_NAME: "With Existing Test Run ID With Status Error With Valid Progress With Error Message Float", CASE_TYPE: "ERROR_MESSAGES", ERROR_MESSAGES: floatValue, EXPECTED: { detail: [{ type: "string_type", loc: [ "body", "errorMessages" ], msg: "Input should be a valid string", input: 10.1 }]}, STATUS: 422 },
        { TEST_NAME: "With Existing Test Run ID With Status Error With Valid Progress With Error Message Boolean", CASE_TYPE: "ERROR_MESSAGES", ERROR_MESSAGES: true, EXPECTED: { detail: [{ type: "string_type", loc: [ "body", "errorMessages" ], msg: "Input should be a valid string", input: true }] }, STATUS: 422 },
        { TEST_NAME: "With Existing Test Run ID With Status Error With Valid Progress With Error Message Empty", CASE_TYPE: "ERROR_MESSAGES", ERROR_MESSAGES: "", EXPECTED: { detail: { type: 'string_type', msg: 'Input should be a valid string', input: "" } }, STATUS: 200 },
        { TEST_NAME: "With Existing Test Run ID With Status Error With Valid Progress With Error Message Null", CASE_TYPE: "ERROR_MESSAGES", ERROR_MESSAGES: null, EXPECTED: { detail: { type: 'string_type', msg: 'Input should be a valid string', input: null } }, STATUS: 200 },
        { TEST_NAME: "With Existing Test Run ID With Status Error With Valid Progress With Error Message No Value", CASE_TYPE: "ERROR_MESSAGES", EXPECTED: { detail: { type: 'missing', msg: 'Field required' } }, STATUS: 200 },
        { TEST_NAME: "With Existing Test Run ID With Valid Status With Invalid Progress With Valid Error Message", CASE_TYPE: "PROGRESS", PROGRESS: strValue, EXPECTED: { detail: [{ type: 'int_type', msg: 'Input should be a valid integer', input: 'test' }] }, STATUS: 422 },
        { TEST_NAME: "With Existing Test Run ID With Valid Status With Progress Float With Valid Error Message", CASE_TYPE: "PROGRESS", PROGRESS: floatValue, EXPECTED: { detail: [{ type: 'int_type', msg: 'Input should be a valid integer', input: 10.1 }] }, STATUS: 422 },
        { TEST_NAME: "With Existing Test Run ID With Valid Status With Progress Boolean With Valid Error Message", CASE_TYPE: "PROGRESS", PROGRESS: true, EXPECTED: { detail: [{ type: 'int_type', msg: 'Input should be a valid integer', input: true }] }, STATUS: 422 },
        { TEST_NAME: "With Existing Test Run ID With Valid Status With Progress Empty With Valid Error Message", CASE_TYPE: "PROGRESS", PROGRESS: "", EXPECTED: { detail: [{ type: 'int_type', msg: 'Input should be a valid integer', input: "" }] }, STATUS: 422 },
        {
            TEST_NAME: "With Existing Test Run ID With Valid Status With Progress Null With Valid Error Message", CASE_TYPE: "PROGRESS", PROGRESS: null, EXPECTED: {
                mode: 'upload',
                algorithmGID: 'aiverify.stock.accumulated_local_effect',
                algorithmCID: 'aiverify_accumulated_local_effect',
                algorithmArgs: {},
                testDatasetFilename: 'sample_bc_credit_data.sav',
                groundTruthDatasetFilename: 'sample_bc_credit_data.sav',
                groundTruth: null,
                modelFilename: 'sample_bc_credit_sklearn_linear.LogisticRegression.sav',
                status: 'pending',
                progress: 0,
                testResult: null,
                errorMessages: null
            }, STATUS: 200
        },
        {
            TEST_NAME: "With Existing Test Run ID With Valid Status With Progress No Value With Valid Error Message", CASE_TYPE: "PROGRESS", EXPECTED: {
                mode: 'upload',
                algorithmGID: 'aiverify.stock.accumulated_local_effect',
                algorithmCID: 'aiverify_accumulated_local_effect',
                algorithmArgs: {},
                testDatasetFilename: 'sample_bc_credit_data.sav',
                groundTruthDatasetFilename: 'sample_bc_credit_data.sav',
                groundTruth: null,
                modelFilename: 'sample_bc_credit_sklearn_linear.LogisticRegression.sav',
                status: 'pending',
                progress: 0,
                testResult: null,
                errorMessages: null
            }, STATUS: 200
        },
        { TEST_NAME: "With Existing Test Run ID With Invalid Status With Valid Progress With Valid Error Message", CASE_TYPE: "TEST_RUN_STATUS", TEST_RUN_STATUS: strValue, EXPECTED: { detail: [{ type: 'enum', msg: "Input should be 'pending', 'success', 'error' or 'cancelled'", input: 'test' }] }, STATUS: 422 },
        { TEST_NAME: "With Existing Test Run ID With Status Integer With Valid Progress With Valid Error Message", CASE_TYPE: "TEST_RUN_STATUS", TEST_RUN_STATUS: intValue, EXPECTED: { detail: [{ ctx: { expected: "'pending', 'success', 'error' or 'cancelled'"}, loc: [ "body", "status"], type: 'enum', msg: "Input should be 'pending', 'success', 'error' or 'cancelled'", input: 10 }] }, STATUS: 422 },
        { TEST_NAME: "With Existing Test Run ID With Status Float With Valid Progress With Valid Error Message", CASE_TYPE: "TEST_RUN_STATUS", TEST_RUN_STATUS: floatValue, EXPECTED: { detail: [{ type: 'enum', msg: "Input should be 'pending', 'success', 'error' or 'cancelled'", input: 10.1 }] }, STATUS: 422 },
        { TEST_NAME: "With Existing Test Run ID With Status Boolean With Valid Progress With Valid Error Message", CASE_TYPE: "TEST_RUN_STATUS", TEST_RUN_STATUS: true, EXPECTED: { detail: [{ type: 'enum', msg: "Input should be 'pending', 'success', 'error' or 'cancelled'", input: true }] }, STATUS: 422 },
        { TEST_NAME: "With Existing Test Run ID With Status Empty With Valid Progress With Valid Error Message", CASE_TYPE: "TEST_RUN_STATUS", TEST_RUN_STATUS: "", EXPECTED: { detail: [{ type: 'enum', msg: "Input should be 'pending', 'success', 'error' or 'cancelled'", input: "" }] }, STATUS: 422 },
        {
            TEST_NAME: "With Existing Test Run ID With Status Null With Valid Progress With Valid Error Message", CASE_TYPE: "TEST_RUN_STATUS", TEST_RUN_STATUS: null, EXPECTED: {
                mode: 'upload',
                algorithmGID: 'aiverify.stock.accumulated_local_effect',
                algorithmCID: 'aiverify_accumulated_local_effect',
                algorithmArgs: {},
                testDatasetFilename: 'sample_bc_credit_data.sav',
                groundTruthDatasetFilename: 'sample_bc_credit_data.sav',
                groundTruth: null,
                modelFilename: 'sample_bc_credit_sklearn_linear.LogisticRegression.sav',
                status: 'pending',
                progress: 0,
                testResult: null,
                errorMessages: null
            }, STATUS: 200
        },
        {
            TEST_NAME: "With Existing Test Run ID With Status No Value With Valid Progress With Valid Error Message", CASE_TYPE: "TEST_RUN_STATUS", EXPECTED: {
                mode: 'upload',
                algorithmGID: 'aiverify.stock.accumulated_local_effect',
                algorithmCID: 'aiverify_accumulated_local_effect',
                algorithmArgs: {},
                testDatasetFilename: 'sample_bc_credit_data.sav',
                groundTruthDatasetFilename: 'sample_bc_credit_data.sav',
                groundTruth: null,
                modelFilename: 'sample_bc_credit_sklearn_linear.LogisticRegression.sav',
                status: 'pending',
                progress: 0,
                testResult: null,
                errorMessages: null
            }, STATUS: 200
        },
        { TEST_NAME: "With Non-existing Test Run ID With Valid Status With Valid Progress With Valid Error Message", CASE_TYPE: "TEST_RUN_ID", TEST_RUN_ID: strValue, EXPECTED: "Internal Server Error", STATUS: 500 },
        { TEST_NAME: "With Test Run ID Integer With Valid Status With Valid Progress With Valid Error Message", CASE_TYPE: "TEST_RUN_ID", TEST_RUN_ID: intValue, EXPECTED: "Internal Server Error", STATUS: 500 },
        { TEST_NAME: "With Test Run ID Float With Valid Status With Valid Progress With Valid Error Message", CASE_TYPE: "TEST_RUN_ID", TEST_RUN_ID: floatValue, EXPECTED: "Internal Server Error", STATUS: 500 },
        { TEST_NAME: "With Test Run ID Boolean With Valid Status With Valid Progress With Valid Error Message", CASE_TYPE: "TEST_RUN_ID", TEST_RUN_ID: true, EXPECTED: "Internal Server Error", STATUS: 500 },
        { TEST_NAME: "With Test Run ID Empty With Valid Status With Valid Progress With Valid Error Message", CASE_TYPE: "TEST_RUN_ID", TEST_RUN_ID: "", EXPECTED: { detail: "Method Not Allowed" }, STATUS: 405 },
        { TEST_NAME: "With Test Run ID Null With Valid Status With Valid Progress With Valid Error Message", CASE_TYPE: "TEST_RUN_ID", TEST_RUN_ID: null, EXPECTED: "Internal Server Error", STATUS: 500 },
        { TEST_NAME: "With Test Run ID No Value With Valid Status With Valid Progress With Valid Error Message", CASE_TYPE: "TEST_RUN_ID", EXPECTED: "Internal Server Error", STATUS: 500 },
    ]

    for (const data of PATCH_TEST_RUNS_BY_TEST_RUN_ID) {

        test(`Update Test Run By Test Run ID ${data.TEST_NAME}`, async () => {

            let response, run_test_id, PATCH_TEST_RUN_DATA

            const RUN_TEST_DATA = {
                algorithmArgs: {},
                algorithmCID: "aiverify_accumulated_local_effect",
                algorithmGID: "aiverify.stock.accumulated_local_effect",
                groundTruth: "default",
                groundTruthDatasetFilename: "sample_bc_credit_data.sav",
                mode: "upload",
                modelFilename: "sample_bc_credit_sklearn_linear.LogisticRegression.sav",
                testDatasetFilename: "sample_bc_credit_data.sav"
            }

            /* Run Test */
            response = await axios.post(url + ":" + port_number + "/test_runs/run_test", RUN_TEST_DATA, {
                validateStatus: function (status) {
                    return status
                }
            })

            /* Set Run Test ID */
            run_test_id = response.data.id

            if (data.CASE_TYPE == "POSITIVE") {

                /* PATCH TEST RUNS DATA */
                PATCH_TEST_RUN_DATA = {
                    status: data.TEST_RUN_STATUS,
                    progress: 100,
                    errorMessages: strValue
                }
            }

            if (data.CASE_TYPE == "ERROR_MESSAGES") {

                /* PATCH TEST RUNS DATA */
                PATCH_TEST_RUN_DATA = {
                    status: "error",
                    progress: 100,
                    errorMessages: data.ERROR_MESSAGES
                }

            }
            if (data.CASE_TYPE == "PROGRESS") {

                /* PATCH TEST RUNS DATA */
                PATCH_TEST_RUN_DATA = {
                    status: "pending",
                    progress: data.PROGRESS,
                    errorMessages: strValue
                }

            }
            if (data.CASE_TYPE == "TEST_RUN_STATUS") {

                /* PATCH TEST RUNS DATA */
                PATCH_TEST_RUN_DATA = {
                    status: data.TEST_RUN_STATUS,
                    progress: 0,
                    errorMessages: strValue
                }

            }
            if (data.CASE_TYPE == "TEST_RUN_ID") {

                /* PATCH TEST RUNS DATA */
                PATCH_TEST_RUN_DATA = {
                    status: "pending",
                    progress: 100,
                    errorMessages: strValue
                }

                run_test_id = data.TEST_RUN_ID

            }

            /* Patch Test Run By Test Run ID */
            response = await axios.patch(url + ":" + port_number + "/test_runs/" + run_test_id, PATCH_TEST_RUN_DATA, {
                validateStatus: function (status) {
                    return status
                }
            })

            /* Assert Patch Test Run By Test Run ID */
            if (response.status == "500")
                expect.soft(response.data).toBe(data.EXPECTED)
            else
                expect.soft(response.data).toMatchObject(data.EXPECTED) 
            expect.soft(response.status).toBe(data.STATUS)
        })
    }

    const DELETE_TEST_RUN_BY_TEST_RUN_ID = [
        { TEST_NAME: "With Existing Test Run ID", CASE_TYPE: "POSITIVE", EXPECTED: { "detail": "Pending test runs cannot be deleted. Cancel the test run instead" }, STATUS: 204 },
        { TEST_NAME: "With Non-existing Test RUN ID", RUN_TEST_ID: strValue, EXPECTED: "Internal Server Error", STATUS: 500 },
        { TEST_NAME: "With Test RUN ID Integer", RUN_TEST_ID: intValue, EXPECTED: "Internal Server Error", STATUS: 500 },
        { TEST_NAME: "With Test RUN ID Float", RUN_TEST_ID: floatValue, EXPECTED: "Internal Server Error", STATUS: 500 },
        { TEST_NAME: "With Test RUN ID Boolean", RUN_TEST_ID: true, EXPECTED: "Internal Server Error", STATUS: 500 },
        { TEST_NAME: "With Test RUN ID Empty", RUN_TEST_ID: "", EXPECTED: "Method Not Allowed", STATUS: 405 },
        { TEST_NAME: "With Test RUN ID Null", RUN_TEST_ID: null, EXPECTED: "Internal Server Error", STATUS: 500 },
        { TEST_NAME: "With Test RUN ID No Value", EXPECTED: "Internal Server Error", STATUS: 500 },
    ]

    for (const data of DELETE_TEST_RUN_BY_TEST_RUN_ID) {

        test(`Delete Test Run By Test Run ID ${data.TEST_NAME}`, async () => {

            let response, run_test_id

            if (data.CASE_TYPE == "POSITIVE") {

                const RUN_TEST_DATA = {
                    algorithmArgs: {},
                    algorithmCID: "aiverify_accumulated_local_effect",
                    algorithmGID: "aiverify.stock.accumulated_local_effect",
                    groundTruth: "default",
                    groundTruthDatasetFilename: "sample_bc_credit_data.sav",
                    mode: "upload",
                    modelFilename: "sample_bc_credit_sklearn_linear.LogisticRegression.sav",
                    testDatasetFilename: "sample_bc_credit_data.sav"
                }

                /* Run Test */
                response = await axios.post(url + ":" + port_number + "/test_runs/run_test", RUN_TEST_DATA, {
                    validateStatus: function (status) {
                        return status
                    }
                })

                await setTimeout(10000)

                /* Set Run Test ID */
                run_test_id = response.data.id

            } else {
                run_test_id = data.RUN_TEST_ID
            }

            /* Delete Test Run By Test Run ID */
            response = await axios.delete(url + ":" + port_number + "/test_runs/" + run_test_id, {
                validateStatus: function (status) {
                    return status
                }
            }).catch(error => {
                if (error.response) {
                    expect.soft(error.response.status).toBe(data.STATUS)
                    expect.soft(response.data).toBe(data.EXPECTED)
                }

            })

            /* Assert Delete Test Run By Test Run ID */
            if (data.CASE_TYPE == "POSITIVE") {
                expect.soft(response.status).toBe(data.STATUS)
            }

        })
    }

    const CANCEL_TEST_RUN_BY_TEST_RUN_ID = [
        {
            TEST_NAME: "With Existing Test Run ID", CASE_TYPE: "POSITIVE", EXPECTED: {
                mode: 'upload',
                algorithmGID: 'aiverify.stock.accumulated_local_effect',
                algorithmCID: 'aiverify_accumulated_local_effect',
                algorithmArgs: {},
                testDatasetFilename: 'sample_bc_credit_data.sav',
                groundTruthDatasetFilename: 'sample_bc_credit_data.sav',
                groundTruth: null,
                modelFilename: 'sample_bc_credit_sklearn_linear.LogisticRegression.sav',
                status: 'cancelled',
                progress: 0,
                testResult: null,
                errorMessages: null
            }, STATUS: 200
        },
        { TEST_NAME: "With Non-existing Test RUN ID", RUN_TEST_ID: strValue, EXPECTED: "Internal Server Error", STATUS: 500 },
        { TEST_NAME: "With Test RUN ID Integer", RUN_TEST_ID: intValue, EXPECTED: "Internal Server Error", STATUS: 500 },
        { TEST_NAME: "With Test RUN ID Float", RUN_TEST_ID: floatValue, EXPECTED: "Internal Server Error", STATUS: 500 },
        { TEST_NAME: "With Test RUN ID Boolean", RUN_TEST_ID: true, EXPECTED: "Internal Server Error", STATUS: 500 },
        { TEST_NAME: "With Test RUN ID Empty", RUN_TEST_ID: "", EXPECTED: { detail: 'Not Found' }, STATUS: 404 },
        { TEST_NAME: "With Test RUN ID Null", RUN_TEST_ID: null, EXPECTED: "Internal Server Error", STATUS: 500 },
        { TEST_NAME: "With Test RUN ID No Value", EXPECTED: "Internal Server Error", STATUS: 500 },
    ]

    for (const data of CANCEL_TEST_RUN_BY_TEST_RUN_ID) {

        test(`Cancel Test Run By Test Run ID ${data.TEST_NAME}`, async () => {

            let response, run_test_id

            if (data.CASE_TYPE == "POSITIVE") {

                const RUN_TEST_DATA = {
                    algorithmArgs: {},
                    algorithmCID: "aiverify_accumulated_local_effect",
                    algorithmGID: "aiverify.stock.accumulated_local_effect",
                    groundTruth: "default",
                    groundTruthDatasetFilename: "sample_bc_credit_data.sav",
                    mode: "upload",
                    modelFilename: "sample_bc_credit_sklearn_linear.LogisticRegression.sav",
                    testDatasetFilename: "sample_bc_credit_data.sav"
                }

                /* Run Test */
                response = await axios.post(url + ":" + port_number + "/test_runs/run_test", RUN_TEST_DATA, {
                    validateStatus: function (status) {
                        return status
                    }
                })

                /* Set Run Test ID */
                run_test_id = response.data.id

            } else {
                run_test_id = data.RUN_TEST_ID
            }

            /* Delete Test Run By Test Run ID */
            response = await axios.post(url + ":" + port_number + "/test_runs/" + run_test_id + "/cancel", {
                validateStatus: function (status) {
                    return status
                }
            }).catch(error => {
                if (error.response) {
                    expect.soft(error.response.status).toBe(data.STATUS)
                    if (error.response.status == "404")
                        expect.soft(error.response.data).toMatchObject(data.EXPECTED)
                    else
                        expect.soft(error.response.data).toBe(data.EXPECTED)
                }

            })

            /* Assert Cancel Test Run By Test Run ID */
            if (data.CASE_TYPE == "POSITIVE")
                expect.soft(response.data).toMatchObject(data.EXPECTED)

        })
    }
})