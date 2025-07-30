import { test, expect } from '@playwright/test'

import axios from 'axios'
import fs from 'fs'
import FormData from 'form-data'

const url = process.env.URL
const port_number = process.env.PORT_NUMBER
const root_path = process.env.ROOT_PATH

test.describe('Test Models', () => {

    const intValue = 10
    const floatValue = 10.1

    const STRING_4096_CHARACTERS = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin in malesuada elit. Fusce id commodo neque. Aliquam fermentum sem eget faucibus interdum. Donec vulputate pellentesque lectus, a commodo magna congue vitae. Quisque ullamcorper dolor vel consequat malesuada. Aenean est orci, porta ut mi eget, iaculis ultricies felis. Nulla elementum purus vel nisl pharetra, vitae iaculis dolor ornare. Nunc id augue vulputate, sollicitudin elit et, imperdiet nulla. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Cras interdum sodales ipsum. Quisque commodo diam lorem, eu vehicula felis tincidunt et. Mauris in enim faucibus massa rhoncus lobortis vitae vel urna. In velit enim, accumsan at lacus id, vehicula interdum quam. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.\
    Curabitur vitae blandit arcu. In ut justo pulvinar, pharetra purus ut, gravida augue. Proin pharetra quam at lacus ultrices, in lobortis libero pellentesque. Vivamus eget ex a leo egestas mattis. Proin pellentesque nisl lacus, in convallis elit imperdiet non. Cras non enim non neque commodo fermentum. Quisque nec libero malesuada dui lobortis ultricies non eu tellus. Ut sit amet dictum dolor. Nulla dui lacus, imperdiet nec dapibus ut, rhoncus at eros. Vivamus sed lorem vulputate, pharetra lacus et, viverra metus. Fusce a pharetra leo. Nunc vel finibus orci.\
    Etiam tempor, ante vitae porttitor tincidunt, enim nibh dignissim mi, a aliquam felis odio viverra turpis. Aliquam erat volutpat. Nunc pulvinar blandit risus. Mauris non lacus dolor. Curabitur et elit non nisl venenatis pretium. Integer sit amet dui vitae justo condimentum elementum. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Morbi pulvinar interdum dui, sit amet fringilla purus sodales eget. Duis sollicitudin, ante eu efficitur consectetur, mi leo volutpat libero, ut fermentum felis metus non felis. Mauris bibendum lacus libero, et suscipit ipsum dictum eu. Sed faucibus pharetra convallis. Nunc maximus nunc sit amet risus aliquet blandit. Duis tincidunt porta justo, id semper mi ullamcorper at. Integer ac molestie dui. Donec tempus ligula quis nunc ultrices scelerisque.\
    In hac habitasse platea dictumst. Nulla facilisi. Pellentesque vulputate erat velit, sed varius magna ultricies nec. Pellentesque quis laoreet turpis, at bibendum magna. Curabitur hendrerit facilisis facilisis. Aliquam tortor nisi, rhoncus eget mi vel, imperdiet tempus eros. Quisque laoreet fringilla augue, at maximus lacus mollis et. Fusce commodo, purus eu efficitur ultricies, sapien lacus mattis elit, non consequat tellus justo in nibh. Aliquam dolor libero, aliquet et erat sit amet, eleifend tincidunt purus. Quisque id rhoncus dui. Aliquam egestas mattis nisi, et aliquam dui hendrerit vel. Cras in eros porttitor, volutpat eros ornare, ultrices lacus.\
    Etiam nibh est, posuere in tincidunt eu, consequat sit amet diam. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Curabitur eget magna vel nisl vestibulum elementum. In sed felis rhoncus, sollicitudin est ac, finibus mi. Nunc porttitor magna ut feugiat consectetur. Donec at est maximus, facilisis libero eget, imperdiet eros. Pellentesque pretium aliquam interdum. Curabitur sed ullamcorper nunc. Etiam fermentum faucibus enim sit amet consectetur. Cras posuere diam non porta malesuada.\
    Donec tempor ut eros vel hendrerit. Sed lobortis ex in ante mattis pharetra. Nullam imperdiet velit vitae fringilla vulputate. Morbi quis nisi lacus. Integer magna odio, finibus nec luctus sed, accumsan et lacus. Donec non hendrerit odio, nec fermentum felis. Maecenas dolor erat, euismod eget iaculis ut, iaculis vitae magna. Morbi nibh erat, facilisis in sollicitudin condimentum, ultricies at elit. Nunc bibendum purus rhoncus nibh faucibus cursus. Nunc condimentum, nisi in fermentum porttitor, nunc urna tincidunt sapien, sed imperdiet erat justo nec eros. Fusce et nulla in leo rutrum rutrum eget a tellus.\
    Aliquam erat volutpat. Praesent sed arcu blandit, elementum lacus sed, sodales nunc. Phasellus ante velit, pulvinar ac nunc et, mattis tincidunt nisi. Ut congue aliquam efficitur. Duis vitae hendrerit nunc. Curabitur egestas dui vitae lorem laoreet, ut lacinia lectus laoreet. Vivamus ultricies turpis non metus scelerisque, ut laoreet eros dignissim. Nulla ut turpis nec elit ultricies bibendum nec eleifend lectus. Integer risus urna, gravida tempus ex eget, cursus interdum libero. Nunc ac sapien imperdiet, aliquet erat sit amet, dapibus lectus. Aliquam et metus quis ex rutrum elementum eget vitae metus. Curabitur nisi diam, sodales eget condimentum nec, aliquam ac velit. Aliquam dictum hendrerit commodo. Maecenas mattis ipsum lectus, sed efficitur sem mattis eu. Donec vitae dolor ullamcorper, congue nisi eu, egestas justo. Mauris scelerisque, nisi non mattis sagittis, mauris ante faucibus enim, sit amet ullamcorper ante nulla sed libero."

    const STRING_128_CHARACTERS = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin in malesuada elit. Fusce id commodo neque. Aliquam fermentum sem eget faucibus interdum. "

    const ARRAY_OF_FILES = [
        [
            /* Test Case 0 */
            { modelName: "sample_bc_credit_sklearn_linear.LogisticRegression.sav", modelType: "classification" },
            { modelName: "sample_bc_credit_sklearn_linear.LogisticRegression.sav", modelType: "classification" }
        ],
        [
            /* Test Case 1 */
            { modelName: "sample_reg_donation_sklearn_linear.LinearRegression.sav", modelType: "regression" },
            { modelName: "sample_reg_donation_sklearn_linear.LinearRegression.sav", modelType: "regression" }
        ],
        [
            /* Test Case 2 */
            { modelName: "sample_bc_credit_sklearn_linear.LogisticRegression.sav", modelType: "modelType" },
            { modelName: "sample_reg_donation_sklearn_linear.LinearRegression.sav", modelType: "modelType" }
        ],
        [
            /* Test Case 3 */
            { modelName: "sample_bc_credit_sklearn_linear.LogisticRegression.sav", modelType: "" },
            { modelName: "sample_reg_donation_sklearn_linear.LinearRegression.sav", modelType: "" }
        ],
        [
            /* Test Case 4 */
            { modelName: "sample_bc_credit_sklearn_linear.LogisticRegression.sav", modelType: intValue },
            { modelName: "sample_reg_donation_sklearn_linear.LinearRegression.sav", modelType: intValue }
        ],
        [
            /* Test Case 5 */
            { modelName: "sample_bc_credit_sklearn_linear.LogisticRegression.sav", modelType: floatValue },
            { modelName: "sample_reg_donation_sklearn_linear.LinearRegression.sav", modelType: floatValue }
        ],
        [
            /* Test Case 6 */
            { modelName: "sample_bc_credit_sklearn_linear.LogisticRegression.sav", modelType: true },
            { modelName: "sample_reg_donation_sklearn_linear.LinearRegression.sav", modelType: false }
        ],
        [
            /* Test Case 7 */
            { modelName: "sample_bc_credit_sklearn_linear.LogisticRegression.sav", modelType: "" },
            { modelName: "sample_reg_donation_sklearn_linear.LinearRegression.sav", modelType: "" }
        ],
        [
            /* Test Case 8 */
            { modelName: "sample_bc_credit_sklearn_linear.LogisticRegression.sav", modelType: null },
            { modelName: "sample_reg_donation_sklearn_linear.LinearRegression.sav", modelType: null }
        ],
        [
            /* Test Case 9 */
            { modelName: "sample_bc_credit_sklearn_linear.LogisticRegression.sav" },
            { modelName: "sample_reg_donation_sklearn_linear.LinearRegression.sav" }
        ],
        [
            /* Test Case 10 */
            { invalidFileName: "pickle_pandas_annotated_labels_50.sav", modelType: "classification" },
            { invalidFileName: "dog.jpg", modelType: "regression" }
        ],
        [
            /* Test Case 11 */
            { modelName: "sample_bc_credit_sklearn_linear.LogisticRegression.sav", modelType: "classification" },
            { modelName: "sample_reg_donation_sklearn_linear.LinearRegression.sav", modelType: "regression" }
        ],
        [
            /* Test Case 12 */
            { modelName: "sample_bc_credit_sklearn_linear.LogisticRegression.sav", modelType: "classification" }
        ],
        [
            /* Test Case 13 */
            { modelName: intValue, modelType: "classification" },
        ],
        [
            /* Test Case 14 */
            { modelName: floatValue, modelType: "classification" },
        ]
    ]

    const POST_TEST_MODELS = [
        {
            TEST_NAME: "With Valid File Arrays With Classification Model Type Arrays", CASE_TYPE: "POSITIVE", EXPECTED:
                [
                    {
                        mode: "upload",
                        modelType: "classification",
                        fileType: "file",
                        zip_hash: "7091938136e17b7f726cbdf60cdea04beea32cc8ce1d09fcb02695cd3746bf84",
                        size: 952,
                        serializer: "pickle",
                        modelFormat: "sklearn",
                        status: "valid"
                    },
                    {
                        mode: "upload",
                        modelType: "classification",
                        fileType: "file",
                        zip_hash: "7091938136e17b7f726cbdf60cdea04beea32cc8ce1d09fcb02695cd3746bf84",
                        size: 952,
                        serializer: "pickle",
                        modelFormat: "sklearn",
                        status: "valid"
                    }
                ], FILES: ARRAY_OF_FILES[0], STATUS: 200
        },
        { TEST_NAME: "With Valid File Arrays With Regression Model Type Arrays", CASE_TYPE: "POSITIVE", EXPECTED: 
            [
                {
                    mode: "upload",
                    modelType: "regression",
                    fileType: "file",
                    zip_hash: "0ee56294046d1fbd6f44936786ba90ae6c6f9b63912f946f8f4044d84efa9539",
                    size: 736,
                    serializer: "pickle",
                    modelFormat: "sklearn",
                    status: "valid"
                },
                {
                    mode: "upload",
                    modelType: "regression",
                    fileType: "file",
                    zip_hash: "0ee56294046d1fbd6f44936786ba90ae6c6f9b63912f946f8f4044d84efa9539",
                    size: 736,
                    serializer: "pickle",
                    modelFormat: "sklearn",
                    status: "valid"
                }
            ], FILES: ARRAY_OF_FILES[1], STATUS: 200 },
        { TEST_NAME: "With Valid File Arrays With Invalid Model Type Arrays", EXPECTED: { detail: "Error validating form data: 'modelType' is not a valid ModelType" }, FILES: ARRAY_OF_FILES[2], STATUS: 400 },
        { TEST_NAME: "With Valid File Arrays With Model Type Non Arrays", EXPECTED: { detail: "Error validating form data: '' is not a valid ModelType" }, FILES: ARRAY_OF_FILES[3], STATUS: 400 },
        { TEST_NAME: "With Valid File Arrays With Model Type Integer Arrays", EXPECTED: { detail: "Error validating form data: '10' is not a valid ModelType" }, FILES: ARRAY_OF_FILES[4], STATUS: 400 },
        { TEST_NAME: "With Valid File Arrays With Model Type Float Arrays", EXPECTED: { detail: "Error validating form data: '10.1' is not a valid ModelType" }, FILES: ARRAY_OF_FILES[5], STATUS: 400 },
        { TEST_NAME: "With Valid File Arrays With Model Type Boolean Arrays", EXPECTED: { detail: "Error validating form data: 'true' is not a valid ModelType" }, FILES: ARRAY_OF_FILES[6], STATUS: 400 },
        { TEST_NAME: "With Valid File Arrays With Model Type Empty Arrays", EXPECTED: { detail: "Error validating form data: '' is not a valid ModelType" }, FILES: ARRAY_OF_FILES[7], STATUS: 400 },
        { TEST_NAME: "With Valid File Arrays With Model Type Null Arrays", EXPECTED: { detail: "Error validating form data: 'null' is not a valid ModelType" }, FILES: ARRAY_OF_FILES[8], STATUS: 400 },
        { TEST_NAME: "With Valid File Arrays With Model Type No Value Arrays", EXPECTED: { detail: "Error validating form data: 'undefined' is not a valid ModelType" }, FILES: ARRAY_OF_FILES[9], STATUS: 400 },
        { TEST_NAME: "With Invalid File Type Arrays", FILETYPE: "INVALID", EXPECTED: { detail: "Unsupported Model Files" }, FILES: ARRAY_OF_FILES[10], STATUS: 400 },
        // { TEST_NAME: "With Folder Arrays", FILETYPE: "FOLDER", EXPECTED: {}, FILES: ARRAY_OF_FILES[11], STATUS: 400 }, // Can Upload Folder?
        {
            TEST_NAME: "With Files Non Arrays", EXPECTED:
            [{
                name: 'sample_bc_credit_sklearn_linear.LogisticRegression_8.sav', // To Update The Number Once Finalised Test Execution
                mode: 'upload',
                modelType: 'classification',
                fileType: 'file',
                filename: 'sample_bc_credit_sklearn_linear.LogisticRegression_8.sav', // To Update The Number Once Finalised Test Execution
                serializer: "pickle",
                modelFormat: "sklearn",
                status: "valid",
                zip_hash: "7091938136e17b7f726cbdf60cdea04beea32cc8ce1d09fcb02695cd3746bf84"

            }], FILES: ARRAY_OF_FILES[12], STATUS: 200

        },
        { TEST_NAME: "With Valid File Integer Arrays", FILETYPE: "INVALID_FILE", EXPECTED: { detail: [{ type: 'value_error', msg: "Value error, Expected UploadFile, received: <class 'str'>", input: "10" }] }, FILES: ARRAY_OF_FILES[13], STATUS: 422 },
        { TEST_NAME: "With Valid File Float Arrays", FILETYPE: "INVALID_FILE", EXPECTED: { detail: [{ type: 'value_error', msg: "Value error, Expected UploadFile, received: <class 'str'>", input: "10.1" }] }, FILES: ARRAY_OF_FILES[14], STATUS: 422 },
    ]

    for (const data of POST_TEST_MODELS) {
        test(`Upload Test Model ${data.TEST_NAME}`, async () => {
            const form = new FormData()
            let modelTypes = ""
            for (const file of data.FILES) {
                if (data.FILETYPE == "INVALID")
                    form.append('files', fs.createReadStream(root_path + '/data/' + file.invalidFileName))
                else {
                    if (data.FILETYPE == "INVALID_FILE" || data.FILETYPE == "FOLDER") {
                        form.append('files', file.modelName)
                    }
                    else
                        form.append('files', fs.createReadStream(root_path + '/model/' + file.modelName))
                }
                modelTypes += file.modelType + ","
            }
            const modelTypesTrimmed = modelTypes.slice(0, -1)
            form.append('model_types', modelTypesTrimmed)

            if (data.FILETYPE == "FOLDER") {
                form.append('file_type', "folder")
                form.append('foldername', "model")
                form.append('subfolders', "")
            }

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
            expect.soft(response.data).toMatchObject(data.EXPECTED)
            expect.soft(response.status).toBe(data.STATUS)

        })
    }

    const ARRAY_OF_FOLDER_FILES = [
        [
            /* Test Case 0 */
            { fileName: "cs_model.pkl" }

        ],
        [
            /* Test Case 1 */
            { fileName: "faceimgCustomClass.py" },
            { fileName: "pipeline_train_80000.sav" }
        ],
        [
            /* Test Case 2 */
            { fileName: "cs_model.pkl" }
        ],
        [
            /* Test Case 3 */
            { fileName: "regressionCustomClass.py" },
            { fileName: "sample_reg_donation_sklearn_linear.Pipeline.sav" }
        ],
        [
            /* Test Case 4 */
            { fileName: "bc_tabular_credit" },
            { fileName: "mc_image_fashion" }
        ],
        [
            /* Invalid File */
            { fileName: "mktg_uplift_acq_dict.pickle" },
            { fileName: "cs_X_test.pkl" }
        ],
        [
            /* Invalid File Integer*/
            { fileName: intValue },
        ],
        [
            /* Invalid File Float */
            { fileName: floatValue },
        ],
        [
            /* Invalid File Boolean */
            { fileName: true },
        ],
        [
            /* Invalid File Null */
            { fileName: null },
        ],

    ]

    const FOLDER_PARAMETERS = [
        { folderName: "cs_model", fileType: "folder", modelType: "classification", subfolders: "" },
        { folderName: "bc_image_face", fileType: "pipeline", modelType: "classification", subfolders: "" },
        { folderName: "cs_model", fileType: "folder", modelType: "regression", subfolders: "" },
        { folderName: "regression_tabular_donation", fileType: "pipeline", modelType: "regression", subfolders: "" },
        { folderName: STRING_128_CHARACTERS, fileType: "pipeline", modelType: "regression", subfolders: "" },
        { folderName: intValue, fileType: "pipeline", modelType: "classification", subfolders: "" },
        { folderName: floatValue, fileType: "pipeline", modelType: "classification", subfolders: "" },
        { folderName: "regression_tabular_donation", fileType: "test", modelType: "regression", subfolders: "" },
        { folderName: "regression_tabular_donation", fileType: intValue, modelType: "regression", subfolders: "" },
        { folderName: "regression_tabular_donation", fileType: floatValue, modelType: "regression", subfolders: "" },
        { folderName: "regression_tabular_donation", fileType: "", modelType: "regression", subfolders: "" },
        { folderName: "cs_model", fileType: "test", modelType: "classification", subfolders: "" },
        { folderName: "cs_model", fileType: intValue, modelType: "classification", subfolders: "" },
        { folderName: "cs_model", fileType: floatValue, modelType: "classification", subfolders: "" },
        { folderName: "cs_model", fileType: "", modelType: "classification", subfolders: "" },
        { folderName: "test_files", fileType: "pipeline", modelType: "classification", subfolders: "" },
        { folderName: "bc_image_face_copy", fileType: "pipeline", modelType: "classification", subfolders: "" },
        
    ]

    const POST_TEST_MODELS_FOLDER = [
        { TEST_NAME: "With Valid File Arrays With Classification Model Type Arrays With File Type Folder With Folder Name Between 1 to 128 Characters With No Sub Folder Arrray", ALGORITHM_ROOT_FOLDER: "veritas_data", FOLDER_PARAMETERS: FOLDER_PARAMETERS[0], FILES: ARRAY_OF_FOLDER_FILES[0], STATUS: 200 },
        { TEST_NAME: "With Valid File Arrays With Classification Model Type Arrays With File Type Pipeline With Folder Name Between 1 to 128 Characters With No Sub Folder Array", ALGORITHM_ROOT_FOLDER: "pipeline", FOLDER_PARAMETERS: FOLDER_PARAMETERS[1], FILES: ARRAY_OF_FOLDER_FILES[1], STATUS: 200 },
        { TEST_NAME: "With Valid File Arrays With Regression Model Type Arrays With File Type Folder With Folder Name Between 1 to 128 Characters With Valid No Sub Folder Arrray", ALGORITHM_ROOT_FOLDER: "veritas_data", FOLDER_PARAMETERS: FOLDER_PARAMETERS[2], FILES: ARRAY_OF_FOLDER_FILES[2], STATUS: 200 },
        { TEST_NAME: "With Valid File Arrays With Regression Model Type Arrays With Valid File Type With Folder Name Between 1 to 128 Characters With Valid No Sub Folder Array", ALGORITHM_ROOT_FOLDER: "pipeline", FOLDER_PARAMETERS: FOLDER_PARAMETERS[3], FILES: ARRAY_OF_FOLDER_FILES[3], STATUS: 200 },
        { TEST_NAME: "With Valid File Arrays With Valid Model Type Arrays With Valid File Type With Folder Name > 128 Characters With Valid Sub Folder Array", CASE_TYPE: "NEGATIVE", ALGORITHM_ROOT_FOLDER: "pipeline", FOLDER_PARAMETERS: FOLDER_PARAMETERS[4], FILES: ARRAY_OF_FOLDER_FILES[3], EXPECTED: { detail: [{ type: 'string_too_long', msg: 'String should have at most 128 characters', input: STRING_128_CHARACTERS }]}, STATUS: 422 },
        { TEST_NAME: "With Valid File Arrays With Valid Model Type Arrays With Valid File Type With Folder Name Input Integer With Valid Sub Folder Array", ALGORITHM_ROOT_FOLDER: "pipeline", FOLDER_PARAMETERS: FOLDER_PARAMETERS[5], FILES: ARRAY_OF_FOLDER_FILES[3], STATUS: 200 },
        { TEST_NAME: "With Valid File Arrays With Valid Model Type Arrays With Valid File Type With Folder Name Input Float With Valid Sub Folder Array", ALGORITHM_ROOT_FOLDER: "pipeline", FOLDER_PARAMETERS: FOLDER_PARAMETERS[6], FILES: ARRAY_OF_FOLDER_FILES[3], STATUS: 200 },
        { TEST_NAME: "With Valid File Arrays With Valid Model Type Arrays With Invalid File Type With Valid Folder Name With Valid Sub Folder Array", CASE_TYPE: "NEGATIVE", ALGORITHM_ROOT_FOLDER: "pipeline", FOLDER_PARAMETERS: FOLDER_PARAMETERS[7], FILES: ARRAY_OF_FOLDER_FILES[3], EXPECTED: { detail: [{ type: 'literal_error', msg: "Input should be <TestModelFileType.Folder: 'folder'> or <TestModelFileType.Pipeline: 'pipeline'>", input: 'test' }]}, STATUS: 422 }, //Error Wrong?
        { TEST_NAME: "With Valid File Arrays With Valid Model Type Arrays With File Type Input Integer With Valid Folder Name With Valid Sub Folder Array", CASE_TYPE: "NEGATIVE", ALGORITHM_ROOT_FOLDER: "pipeline", FOLDER_PARAMETERS: FOLDER_PARAMETERS[8], FILES: ARRAY_OF_FOLDER_FILES[3], EXPECTED: { detail: [{ type: 'literal_error', msg: "Input should be <TestModelFileType.Folder: 'folder'> or <TestModelFileType.Pipeline: 'pipeline'>", input: '10' }]}, STATUS: 422 }, //Error Wrong?
        { TEST_NAME: "With Valid File Arrays With Valid Model Type Arrays With File Type Input Float With Valid Folder Name With Valid Sub Folder Array", CASE_TYPE: "NEGATIVE", ALGORITHM_ROOT_FOLDER: "pipeline", FOLDER_PARAMETERS: FOLDER_PARAMETERS[9], FILES: ARRAY_OF_FOLDER_FILES[3], EXPECTED: { detail: [{ type: 'literal_error', msg: "Input should be <TestModelFileType.Folder: 'folder'> or <TestModelFileType.Pipeline: 'pipeline'>", input: '10.1' }]}, STATUS: 422 }, //Error Wrong?
        { TEST_NAME: "With Valid File Arrays With Valid Model Type Arrays With File Type Input Empty With Valid Folder Name With Valid Sub Folder Array", CASE_TYPE: "NEGATIVE", ALGORITHM_ROOT_FOLDER: "pipeline", FOLDER_PARAMETERS: FOLDER_PARAMETERS[10], FILES: ARRAY_OF_FOLDER_FILES[3], EXPECTED: { detail: [{ type: 'literal_error', msg: "Input should be <TestModelFileType.Folder: 'folder'> or <TestModelFileType.Pipeline: 'pipeline'>", input: "" }]}, STATUS: 422 }, //Error Wrong?
        { TEST_NAME: "With Valid File Arrays With Invalid Model Type Arrays With Valid File Type With Valid Folder Name With Valid Sub Folder Array", CASE_TYPE: "NEGATIVE", ALGORITHM_ROOT_FOLDER: "veritas_data", FOLDER_PARAMETERS: FOLDER_PARAMETERS[11], FILES: ARRAY_OF_FOLDER_FILES[2], EXPECTED: { detail: [{ type: 'literal_error', msg: "Input should be <TestModelFileType.Folder: 'folder'> or <TestModelFileType.Pipeline: 'pipeline'>", input: "test" }]}, STATUS: 422 },
        { TEST_NAME: "With Valid File Arrays With Model Type Input Integer With Valid File Type With Valid Folder Name With Valid Sub Folder Array", CASE_TYPE: "NEGATIVE", ALGORITHM_ROOT_FOLDER: "veritas_data", FOLDER_PARAMETERS: FOLDER_PARAMETERS[12], FILES: ARRAY_OF_FOLDER_FILES[2], EXPECTED: { detail: [{ type: 'literal_error', msg: "Input should be <TestModelFileType.Folder: 'folder'> or <TestModelFileType.Pipeline: 'pipeline'>", input: "10" }]}, STATUS: 422 },
        { TEST_NAME: "With Valid File Arrays With Model Type Input Float With Valid File Type With Valid Folder Name With Valid Sub Folder Array", CASE_TYPE: "NEGATIVE", ALGORITHM_ROOT_FOLDER: "veritas_data", FOLDER_PARAMETERS: FOLDER_PARAMETERS[13], FILES: ARRAY_OF_FOLDER_FILES[2], EXPECTED: { detail: [{ type: 'literal_error', msg: "Input should be <TestModelFileType.Folder: 'folder'> or <TestModelFileType.Pipeline: 'pipeline'>", input: "10.1" }]}, STATUS: 422 },
        { TEST_NAME: "With Valid File Arrays With Model Type Input Empty With Valid File Type With Valid Folder Name With Valid Sub Folder Array", CASE_TYPE: "NEGATIVE", ALGORITHM_ROOT_FOLDER: "veritas_data", FOLDER_PARAMETERS: FOLDER_PARAMETERS[14], FILES: ARRAY_OF_FOLDER_FILES[2], EXPECTED: { detail: [{ type: 'literal_error', msg: "Input should be <TestModelFileType.Folder: 'folder'> or <TestModelFileType.Pipeline: 'pipeline'>", input: "" }]}, STATUS: 422 },
        { TEST_NAME: "With Invalid File Arrays With Valid Model Type With Valid File Type With Valid Folder Name With Valid Sub Folder Array", CASE_TYPE: "NEGATIVE", ALGORITHM_ROOT_FOLDER: "veritas_data", FOLDER_PARAMETERS: FOLDER_PARAMETERS[15], FILES: ARRAY_OF_FOLDER_FILES[5], EXPECTED: { "detail": "Unsupported Model Folder" }, STATUS: 400 },
        { TEST_NAME: "With File Input Integer With Valid Model Type With Valid File Type With Valid Folder Name With Valid Sub Folder Array", ALGORITHM_ROOT_FOLDER: "pipeline", FOLDER_PARAMETERS: FOLDER_PARAMETERS[16], FILES: ARRAY_OF_FOLDER_FILES[6], STATUS: 200 },
        { TEST_NAME: "With File Input Float With Valid Model Type With Valid File Type With Valid Folder Name With Valid Sub Folder Array", ALGORITHM_ROOT_FOLDER: "pipeline", FOLDER_PARAMETERS: FOLDER_PARAMETERS[16], FILES: ARRAY_OF_FOLDER_FILES[7], STATUS: 200 },
        { TEST_NAME: "With File Input Boolean With Valid Model Type With Valid File Type With Valid Folder Name With Valid Sub Folder Array", ALGORITHM_ROOT_FOLDER: "pipeline", FOLDER_PARAMETERS: FOLDER_PARAMETERS[16], FILES: ARRAY_OF_FOLDER_FILES[8], STATUS: 200 },
        { TEST_NAME: "With File Input Null With Valid Model Type With Valid File Type With Valid Folder Name With Valid Sub Folder Array", ALGORITHM_ROOT_FOLDER: "pipeline", FOLDER_PARAMETERS: FOLDER_PARAMETERS[16], FILES: ARRAY_OF_FOLDER_FILES[9], STATUS: 200 },
    ]

    for (const data of POST_TEST_MODELS_FOLDER) {
        test(`Upload Test Model Folder ${data.TEST_NAME}`, async () => {
            const form = new FormData()
            for (const file of data.FILES) {
                form.append('files', fs.createReadStream(root_path + '/' + data.ALGORITHM_ROOT_FOLDER + '/' + data.FOLDER_PARAMETERS.folderName + '/' + file.fileName))
            }
            form.append('model_type', data.FOLDER_PARAMETERS.modelType)
            form.append('file_type', data.FOLDER_PARAMETERS.fileType)
            form.append('foldername', data.FOLDER_PARAMETERS.folderName)
            form.append('subfolders', data.FOLDER_PARAMETERS.subfolders)

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
            if(data.CASE_TYPE == "NEGATIVE")
                expect.soft(response.data).toMatchObject(data.EXPECTED)
            expect.soft(response.status).toBe(data.STATUS)

        })
    }

    test('Get All Test Models', async () => {

        /* Get All Test Models */
        const response = await axios.get(url + ":" + port_number + "/test_models", {
            validateStatus: function (status) {
                return status
            }
        })

        /* Assert Get All Test Models */
        expect.soft(response.status).toBe(200)
    })

    const GET_TEST_MODELS_BY_MODEL_ID = [
        {
            TEST_NAME: "With Existing Model ID", CASE_TYPE: "POSITIVE", MODEL_NAME: "sample_bc_credit_sklearn_linear.LogisticRegression.sav", MODEL_TYPE: "classification", EXPECTED: {
                mode: "upload",
                modelType: "classification",
                fileType: "file",
                zip_hash: "7091938136e17b7f726cbdf60cdea04beea32cc8ce1d09fcb02695cd3746bf84",
                size: 952,
                serializer: "pickle",
                modelFormat: "sklearn",
                status: "valid"
            }, STATUS: 200
        },
        { TEST_NAME: "With Non-existing Model ID", TEST_MODEL_ID: 100000000000000, EXPECTED: { detail: 'Test model not found' }, STATUS: 404 },
        { TEST_NAME: "With String Model ID", TEST_MODEL_ID: "test", EXPECTED: { detail: [{ type: 'int_parsing', msg: 'Input should be a valid integer, unable to parse string as an integer', input: 'test' }] }, STATUS: 422 },
        { TEST_NAME: "With Float Model ID ", TEST_MODEL_ID: floatValue, EXPECTED: { detail: [{ type: 'int_parsing', msg: 'Input should be a valid integer, unable to parse string as an integer', input: '10.1' }] }, STATUS: 422 },
        { TEST_NAME: "With Boolean Model ID", TEST_MODEL_ID: true, EXPECTED: { detail: [{ type: 'int_parsing', msg: 'Input should be a valid integer, unable to parse string as an integer', input: 'true' }] }, STATUS: 422 },
        { TEST_NAME: "With Null Model ID", TEST_MODEL_ID: null, EXPECTED: { detail: [{ type: 'int_parsing', msg: 'Input should be a valid integer, unable to parse string as an integer', input: 'null' }] }, STATUS: 422 },
    ]

    for (const data of GET_TEST_MODELS_BY_MODEL_ID) {
        test(`Get Test Models By Model ID ${data.TEST_NAME}`, async () => {

            let response, test_model_id

            if (data.CASE_TYPE == "POSITIVE") {

                const form = new FormData()
                form.append('files', fs.createReadStream(root_path + "/model/" + data.MODEL_NAME))
                form.append('model_types', data.MODEL_TYPE)

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

                /* Set Test Model ID */
                test_model_id = response.data[0].id

            }
            else {

                /* Set Test Model ID */
                test_model_id = data.TEST_MODEL_ID

            }

            /* Get Test Model By Model ID */
            response = await axios.get(url + ":" + port_number + "/test_models/" + test_model_id, {
                validateStatus: function (status) {
                    return status
                }
            })

            /* Assert Get Test Model By Model ID */
            expect.soft(response.data).toMatchObject(data.EXPECTED)
            expect.soft(response.status).toBe(data.STATUS)
        })
    }

    const PATCH_TEST_MODELS_BY_MODEL_ID = [
        { TEST_NAME: "With Name Character Length Between 1 and 256 Characters With Description < 4096 Characters With Model Type Classification", CASE_TYPE: "MODEL_TYPE", MODEL_TYPE: "classification", MODEL_NAME: "sample_bc_credit_sklearn_linear.LogisticRegression.sav", EXPECTED: { modelType: "classification" }, STATUS: 200 },
        { TEST_NAME: "With Name Character Length Between 1 and 256 Characters With Description < 4096 Characters With Model Type Regression", CASE_TYPE: "MODEL_TYPE", MODEL_TYPE: "regression", MODEL_NAME: "sample_bc_credit_sklearn_linear.LogisticRegression.sav", EXPECTED: { modelType: "regression" }, STATUS: 200 },
        { TEST_NAME: "With Name Character Length Between 1 and 256 Characters With Description < 4096 Characters With Model Type Uplift", CASE_TYPE: "MODEL_TYPE", MODEL_TYPE: "uplift", MODEL_NAME: "sample_bc_credit_sklearn_linear.LogisticRegression.sav", EXPECTED: { modelType: "uplift" }, STATUS: 200 },
        { TEST_NAME: "With Name Character Length Between 1 and 256 Characters With Description < 4096 Characters With Invalid Model Type", CASE_TYPE: "MODEL_TYPE", MODEL_TYPE: "test", MODEL_NAME: "sample_bc_credit_sklearn_linear.LogisticRegression.sav", EXPECTED: { detail: [{ type: 'enum', msg: "Input should be 'classification', 'regression' or 'uplift'", input: 'test' }] }, STATUS: 422 },
        { TEST_NAME: "With Name Character Length Between 1 and 256 Characters With Description < 4096 Characters With Model Type Input Integer", CASE_TYPE: "MODEL_TYPE", MODEL_TYPE: intValue, MODEL_NAME: "sample_bc_credit_sklearn_linear.LogisticRegression.sav", EXPECTED: { detail: [{ type: 'enum', msg: "Input should be 'classification', 'regression' or 'uplift'", input: 10 }] }, STATUS: 422 },
        { TEST_NAME: "With Name Character Length Between 1 and 256 Characters With Description < 4096 Characters With Model Type Input Float", CASE_TYPE: "MODEL_TYPE", MODEL_TYPE: floatValue, MODEL_NAME: "sample_bc_credit_sklearn_linear.LogisticRegression.sav", EXPECTED: { detail: [{ type: 'enum', msg: "Input should be 'classification', 'regression' or 'uplift'", input: 10.1 }] }, STATUS: 422 },
        { TEST_NAME: "With Name Character Length Between 1 and 256 Characters With Description < 4096 Characters With Model Type Input Boolean", CASE_TYPE: "MODEL_TYPE", MODEL_TYPE: true, MODEL_NAME: "sample_bc_credit_sklearn_linear.LogisticRegression.sav", EXPECTED: { detail: [{ type: 'enum', msg: "Input should be 'classification', 'regression' or 'uplift'", input: true }] }, STATUS: 422 },
        { TEST_NAME: "With Name Character Length Between 1 and 256 Characters With Description < 4096 Characters With Model Type Input Empty", CASE_TYPE: "MODEL_TYPE", MODEL_TYPE: "", MODEL_NAME: "sample_bc_credit_sklearn_linear.LogisticRegression.sav", EXPECTED: { detail: [{ type: 'enum', msg: "Input should be 'classification', 'regression' or 'uplift'", input: '' }] }, STATUS: 422 },
        { TEST_NAME: "With Name Character Length Between 1 and 256 Characters With Description < 4096 Characters With Model Type Input Null", CASE_TYPE: "MODEL_TYPE", MODEL_TYPE: null, MODEL_NAME: "sample_bc_credit_sklearn_linear.LogisticRegression.sav", EXPECTED: {}, STATUS: 200 }, //Null should go through?
        { TEST_NAME: "With Name Character Length Between 1 and 256 Characters With Description < 4096 Characters With Model Type Input No Value", CASE_TYPE: "MODEL_TYPE", MODEL_NAME: "sample_bc_credit_sklearn_linear.LogisticRegression.sav", EXPECTED: {}, STATUS: 200 }, //No Value should go through?
        { TEST_NAME: "With Name Character Length Between 1 and 256 Characters With Description < 4096 Characters With Valid Model Type", CASE_TYPE: "DESCRIPTION", DESCRIPTION: "sample bc credit sklearn model", MODEL_NAME: "sample_bc_credit_sklearn_linear.LogisticRegression.sav", EXPECTED: { description: "sample bc credit sklearn model" }, STATUS: 200 },
        { TEST_NAME: "With Name Character Length Between 1 and 256 Characters With Description > 4096 Characters With Valid Model Type", CASE_TYPE: "DESCRIPTION", DESCRIPTION: STRING_4096_CHARACTERS, MODEL_NAME: "sample_bc_credit_sklearn_linear.LogisticRegression.sav", EXPECTED: { detail: [{ type: 'string_too_long', msg: 'String should have at most 4096 characters', input: STRING_4096_CHARACTERS }] }, STATUS: 422 },
        { TEST_NAME: "With Name Character Length Between 1 and 256 Characters With Description Integer With Valid Model Type", CASE_TYPE: "DESCRIPTION", DESCRIPTION: intValue, MODEL_NAME: "sample_bc_credit_sklearn_linear.LogisticRegression.sav", EXPECTED: { detail: [{ type: 'string_type', msg: 'Input should be a valid string', input: 10 }] }, STATUS: 422 },
        { TEST_NAME: "With Name Character Length Between 1 and 256 Characters With Description Float With Valid Model Type", CASE_TYPE: "DESCRIPTION", DESCRIPTION: floatValue, MODEL_NAME: "sample_bc_credit_sklearn_linear.LogisticRegression.sav", EXPECTED: { detail: [{ type: 'string_type', msg: 'Input should be a valid string', input: 10.1 }] }, STATUS: 422 },
        { TEST_NAME: "With Name Character Length Between 1 and 256 Characters With Description Boolean With Valid Model Type", CASE_TYPE: "DESCRIPTION", DESCRIPTION: true, MODEL_NAME: "sample_bc_credit_sklearn_linear.LogisticRegression.sav", EXPECTED: { detail: [{ type: 'string_type', msg: 'Input should be a valid string', input: true }] }, STATUS: 422 },
        { TEST_NAME: "With Name Character Length Between 1 and 256 Characters With Description Empty With Valid Model Type", CASE_TYPE: "DESCRIPTION", DESCRIPTION: "", MODEL_NAME: "sample_bc_credit_sklearn_linear.LogisticRegression.sav", EXPECTED: { description: null }, STATUS: 200 },
        { TEST_NAME: "With Name Character Length Between 1 and 256 Characters With Description Null With Valid Model Type", CASE_TYPE: "DESCRIPTION", DESCRIPTION: null, MODEL_NAME: "sample_bc_credit_sklearn_linear.LogisticRegression.sav", EXPECTED: { description: null }, STATUS: 200 },
        { TEST_NAME: "With Name Character Length Between 1 and 256 Characters With Description No Values With Valid Model Type", CASE_TYPE: "DESCRIPTION", MODEL_NAME: "sample_bc_credit_sklearn_linear.LogisticRegression.sav", EXPECTED: { description: null }, STATUS: 200 },
        { TEST_NAME: "With Name Character Length < 256 Characters With Description < 4096 Characters With Valid Model Type", CASE_TYPE: "NAME", NAME: "sample bc credit sklearn model", MODEL_NAME: "sample_bc_credit_sklearn_linear.LogisticRegression.sav", EXPECTED: { name: "sample bc credit sklearn model" }, STATUS: 200 },
        { TEST_NAME: "With Name > 256 Characters With Description < 4096 Characters With Valid Model Type", CASE_TYPE: "NAME", NAME: STRING_4096_CHARACTERS, MODEL_NAME: "sample_bc_credit_sklearn_linear.LogisticRegression.sav", EXPECTED: { detail: [{ type: 'string_too_long', msg: 'String should have at most 256 characters', input: STRING_4096_CHARACTERS }] }, STATUS: 422 },
        { TEST_NAME: "With Name Integer With Description < 4096 Characters With Valid Model Type", CASE_TYPE: "NAME", NAME: intValue, MODEL_NAME: "sample_bc_credit_sklearn_linear.LogisticRegression.sav", EXPECTED: { detail: [{ type: 'string_type', msg: 'Input should be a valid string', input: 10 }] }, STATUS: 422 },
        { TEST_NAME: "With Name Float With Description < 4096 Characters With Valid Model Type", CASE_TYPE: "NAME", NAME: floatValue, MODEL_NAME: "sample_bc_credit_sklearn_linear.LogisticRegression.sav", EXPECTED: { detail: [{ type: 'string_type', msg: 'Input should be a valid string', input: 10.1 }] }, STATUS: 422 },
        { TEST_NAME: "With Name Boolean With Description < 4096 Characters With Valid Model Type", CASE_TYPE: "NAME", NAME: true, MODEL_NAME: "sample_bc_credit_sklearn_linear.LogisticRegression.sav", EXPECTED: { detail: [{ type: 'string_type', msg: 'Input should be a valid string', input: true }] }, STATUS: 422 },
        { TEST_NAME: "With Name Empty With Description < 4096 Characters With Valid Model Type", CASE_TYPE: "NAME", NAME: "", MODEL_NAME: "sample_bc_credit_sklearn_linear.LogisticRegression.sav", EXPECTED: { detail: [{ type: 'string_too_short', msg: 'String should have at least 1 character', input: '' }] }, STATUS: 422 },
        { TEST_NAME: "With Name Null With Description < 4096 Characters With Valid Model Type", CASE_TYPE: "NAME", NAME: null, MODEL_NAME: "sample_bc_credit_sklearn_linear.LogisticRegression.sav", EXPECTED: { }, STATUS: 200 }, //Null should go through?
        { TEST_NAME: "With Name No Value With Description < 4096 Characters With Valid Model Type", CASE_TYPE: "NAME", MODEL_NAME: "sample_bc_credit_sklearn_linear.LogisticRegression.sav", EXPECTED: { }, STATUS: 200 }, //No Value should go through?
    ]

    for (const data of PATCH_TEST_MODELS_BY_MODEL_ID) {
        test(`Update Test Model By Model ID ${data.TEST_NAME}`, async () => {

            let response, test_model_id

            const form = new FormData()
            form.append('files', fs.createReadStream(root_path + "/model/" + data.MODEL_NAME))
            form.append('model_types', "classification")

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

            /* Set Test Model ID */
            test_model_id = response.data[0].id

            /* Update Test Model By Test Model ID */

            if (data.CASE_TYPE == "MODEL_TYPE") {
                response = await axios.patch(url + ":" + port_number + "/test_models/" + test_model_id, {
                    modelType: data.MODEL_TYPE
                },
                    {
                        validateStatus: function (status) {
                            return status
                        }
                    }
                )

            }

            if (data.CASE_TYPE == "DESCRIPTION") {
                response = await axios.patch(url + ":" + port_number + "/test_models/" + test_model_id, {
                    description: data.DESCRIPTION
                },
                    {
                        validateStatus: function (status) {
                            return status
                        }
                    }
                )

            }

            if (data.CASE_TYPE == "NAME") {
                response = await axios.patch(url + ":" + port_number + "/test_models/" + test_model_id, {
                    name: data.NAME
                },
                    {
                        validateStatus: function (status) {
                            return status
                        }
                    }
                )

            }

            /* Assert Update Test Model By Test Model ID */
            expect(response.data).toMatchObject(data.EXPECTED)
            expect(response.status).toBe(data.STATUS)

        })
    }

    const DELETE_TEST_MODELS_BY_MODEL_ID = [
        { TEST_NAME: "With Existing Model ID", CASE_TYPE: "POSITIVE", MODEL_NAME: "sample_bc_credit_sklearn_linear.LogisticRegression.sav", EXPECTED: { detail: 'Test model deleted successfully' }, STATUS: 200 },
        { TEST_NAME: "With Non-existing Model ID", TEST_MODEL_ID: 100000000000000, EXPECTED: { detail: 'Test model not found' }, STATUS: 404 },
        { TEST_NAME: "With String Model ID", TEST_MODEL_ID: "test", EXPECTED: { detail: [{ type: 'int_parsing', msg: 'Input should be a valid integer, unable to parse string as an integer', input: 'test' }] }, STATUS: 422 },
        { TEST_NAME: "With Float Model ID ", TEST_MODEL_ID: floatValue, EXPECTED: { detail: [{ type: 'int_parsing', msg: 'Input should be a valid integer, unable to parse string as an integer', input: '10.1' }] }, STATUS: 422 },
        { TEST_NAME: "With Boolean Model ID", TEST_MODEL_ID: true, EXPECTED: { detail: [{ type: 'int_parsing', msg: 'Input should be a valid integer, unable to parse string as an integer', input: 'true' }] }, STATUS: 422 },
        { TEST_NAME: "With Null Model ID", TEST_MODEL_ID: null, EXPECTED: { detail: [{ type: 'int_parsing', msg: 'Input should be a valid integer, unable to parse string as an integer', input: 'null' }] }, STATUS: 422 },
        { TEST_NAME: "With No Value Model ID", EXPECTED: { detail: [{ type: 'int_parsing', msg: 'Input should be a valid integer, unable to parse string as an integer', input: 'undefined' }] }, STATUS: 422 },
    ]

    for (const data of DELETE_TEST_MODELS_BY_MODEL_ID) {
        test(`Delete Test Models By Model ID ${data.TEST_NAME}`, async () => {

            let response, test_model_id

            if (data.CASE_TYPE == "POSITIVE") {

                const form = new FormData()
                form.append('files', fs.createReadStream(root_path + "/model/" + data.MODEL_NAME))
                form.append('model_types', "classification")

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

                /* Set Test Model ID */
                test_model_id = response.data[0].id

            }
            else {

                /* Set Test Model ID */
                test_model_id = data.TEST_MODEL_ID

            }

            /* Delete Test Model By Model ID */
            response = await axios.delete(url + ":" + port_number + "/test_models/" + test_model_id, {
                validateStatus: function (status) {
                    return status
                }
            })

            /* Assert Delete Test Model By Model ID */
            expect.soft(response.data).toMatchObject(data.EXPECTED)
            expect.soft(response.status).toBe(data.STATUS)
        })
    }

    const DOWNLOAD_TEST_MODELS_BY_MODEL_ID = [
        { TEST_NAME: "With Existing Model ID", CASE_TYPE: "POSITIVE", MODEL_NAME: "sample_bc_credit_sklearn_linear.LogisticRegression.sav", STATUS: 200 },
        { TEST_NAME: "With Non-existing Model ID", TEST_MODEL_ID: 100000000000000, EXPECTED: { detail: 'Test model not found' }, STATUS: 404 },
        { TEST_NAME: "With String Model ID", TEST_MODEL_ID: "test", EXPECTED: { detail: [{ type: 'int_parsing', msg: 'Input should be a valid integer, unable to parse string as an integer', input: 'test' }] }, STATUS: 422 },
        { TEST_NAME: "With Float Model ID ", TEST_MODEL_ID: floatValue, EXPECTED: { detail: [{ type: 'int_parsing', msg: 'Input should be a valid integer, unable to parse string as an integer', input: '10.1' }] }, STATUS: 422 },
        { TEST_NAME: "With Boolean Model ID", TEST_MODEL_ID: true, EXPECTED: { detail: [{ type: 'int_parsing', msg: 'Input should be a valid integer, unable to parse string as an integer', input: 'true' }] }, STATUS: 422 },
        { TEST_NAME: "With Null Model ID", TEST_MODEL_ID: null, EXPECTED: { detail: [{ type: 'int_parsing', msg: 'Input should be a valid integer, unable to parse string as an integer', input: 'null' }] }, STATUS: 422 },
        { TEST_NAME: "With No Value Model ID", EXPECTED: { detail: [{ type: 'int_parsing', msg: 'Input should be a valid integer, unable to parse string as an integer', input: 'undefined' }] }, STATUS: 422 },
    ]

    for (const data of DOWNLOAD_TEST_MODELS_BY_MODEL_ID) {
        test(`Download Test Models By Model ID ${data.TEST_NAME}`, async () => {

            let response, test_model_id

            if (data.CASE_TYPE == "POSITIVE") {

                const form = new FormData()
                form.append('files', fs.createReadStream(root_path + "/model/" + data.MODEL_NAME))
                form.append('model_types', "classification")

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

                /* Set Test Model ID */
                test_model_id = response.data[0].id

            }
            else {

                /* Set Test Model ID */
                test_model_id = data.TEST_MODEL_ID

            }

            /* Download Test Model By Model ID */
            response = await axios.get(url + ":" + port_number + "/test_models/download/" + test_model_id, {
                validateStatus: function (status) {
                    return status
                }
            })

            /* Assert Delete Test Model By Model ID */
            if (data.CASE_TYPE != "POSITIVE")
                expect.soft(response.data).toMatchObject(data.EXPECTED)
            expect.soft(response.status).toBe(data.STATUS)
        })
    }
})