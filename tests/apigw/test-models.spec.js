import { test, expect } from '@playwright/test'

import axios from 'axios'
import fs from 'fs'
import FormData from 'form-data'

const url = process.env.URL
const port_number = process.env.PORT_NUMBER
const root_path = process.env.ROOT_PATH

test.describe('Test Models', () => {

    const ARRAY_OF_FILES = [
        [
            { modelName: "sample_bc_credit_sklearn_linear.LogisticRegression.sav", modelType: "classification" },
            { modelName: "sample_bc_credit_sklearn_linear.LogisticRegression.sav", modelType: "classification" }
        ],
        [
            { modelName: "sample_reg_donation_sklearn_linear.LinearRegression.sav", modelType: "regression" },
            { modelName: "sample_reg_donation_sklearn_linear.LinearRegression.sav", modelType: "regression" }
        ]
    ]

    const POST_TEST_MODELS = [
        { TEST_NAME: "WITH VALID FILE ARRAYS CLASSIFICATION", FILES: ARRAY_OF_FILES[0], STATUS: 200 },
        { TEST_NAME: "WITH VALID FILE ARRAYS REGRESSION", FILES: ARRAY_OF_FILES[1], STATUS: 200 }
    ]

    for (const data of POST_TEST_MODELS) {
        test.skip(`Upload Test Model ${data.TEST_NAME}`, async () => {
            const form = new FormData()
            let modelTypes = ""
            for (const file of data.FILES) {
                form.append('files', fs.createReadStream(root_path + '/model/' + file.modelName))
                modelTypes += file.modelType + ","
            }
            const modelTypesTrimmed = modelTypes.slice(0, -1)
            form.append('model_types', modelTypesTrimmed)

            /* Upload Test Model */
            const response = await axios.post(url + ":" + port_number + "/test_models/upload",
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
                })

            /* Assert Upload Model */
            expect.soft(response.status).toBe(data.STATUS)

        })
    }

    const ARRAY_OF_PIPELINE_FILES = [
        [
            { fileName: "faceimgCustomClass.py" },
            { fileName: "pipeline_train_80000.sav" }
        ],
        [
            { fileName: "regressionCustomClass.py" },
            { fileName: "sample_reg_donation_sklearn_linear.Pipeline.sav" }
        ]
    ]

    const PIPELINE_FOLDER_PARAMETERS = [
        { folderName: "bc_image_face", fileType: "folder", modelType: "classification", subfolders: "" },
        { folderName: "regression_tabular_donation", fileType: "folder", modelType: "regression", subfolders: "" }
    ]

    const POST_TEST_MODELS_FOLDER = [
        { TEST_NAME: "WITH VALID PIPELINE FILES CLASSIFICATION", PIPELINE_FOLDER_PARAMETERS: PIPELINE_FOLDER_PARAMETERS[0], FILES: ARRAY_OF_PIPELINE_FILES[0], STATUS: 200 },
        { TEST_NAME: "WITH VALID PIPELINE FILES REGRESSION", PIPELINE_FOLDER_PARAMETERS: PIPELINE_FOLDER_PARAMETERS[1], FILES: ARRAY_OF_PIPELINE_FILES[1], STATUS: 200 }
    ]

    for (const data of POST_TEST_MODELS_FOLDER) {
        test(`Upload Test Model Folder ${data.TEST_NAME}`, async () => {
            const form = new FormData()
            for (const file of data.FILES) {
                form.append('files', fs.createReadStream(root_path + '/pipeline/' + data.PIPELINE_FOLDER_PARAMETERS.folderName + '/' + file.fileName))
            }
            form.append('model_type', data.PIPELINE_FOLDER_PARAMETERS.modelType)
            form.append('file_type', data.PIPELINE_FOLDER_PARAMETERS.fileType)
            form.append('foldername', data.PIPELINE_FOLDER_PARAMETERS.folderName)
            form.append('subfolders', data.PIPELINE_FOLDER_PARAMETERS.subfolders)

            /* Upload Pipeline Model */
            const response = await axios.post(url + ":" + port_number + "/test_models/upload_folder",
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
                })

            /* Assert Upload Pipeline Folder */
            expect.soft(response.status).toBe(data.STATUS)

        })
    }
})