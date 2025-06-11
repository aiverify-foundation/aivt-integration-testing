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
        ],
    ]

    const POST_TEST_MODELS = [
        // {
        //     TEST_NAME: "With Valid File Arrays With Classification Model Type Arrays", CASE_TYPE: "POSITIVE", EXPECTED:
        //         [
        //             {
        //                 name: "sample_bc_credit_sklearn_linear.LogisticRegression_27.sav", // To Update The Number Once Finalised Test Execution
        //                 mode: "upload",
        //                 modelType: "classification",
        //                 fileType: "file",
        //                 filename: "sample_bc_credit_sklearn_linear.LogisticRegression_27.sav", // To Update The Number Once Finalised Test Execution
        //                 serializer: "pickle",
        //                 modelFormat: "sklearn",
        //                 status: "valid"
        //             },
        //             {
        //                 name: "sample_bc_credit_sklearn_linear.LogisticRegression_28.sav", // To Update The Number Once Finalised Test Execution
        //                 mode: "upload",
        //                 modelType: "classification",
        //                 fileType: "file",
        //                 filename: "sample_bc_credit_sklearn_linear.LogisticRegression_28.sav", // To Update The Number Once Finalised Test Execution
        //                 serializer: "pickle",
        //                 modelFormat: "sklearn",
        //                 status: "valid"
        //             }
        //         ], FILES: ARRAY_OF_FILES[0], STATUS: 200
        // },
        // { TEST_NAME: "With Valid File Arrays With Regression Model Type Arrays", CASE_TYPE: "POSITIVE", EXPECTED: 
        //     [
        //         {
        //             name: "sample_reg_donation_sklearn_linear.LinearRegression_10.sav", // To Update The Number Once Finalised Test Execution
        //             mode: "upload",
        //             modelType: "regression",
        //             fileType: "file",
        //             filename: "sample_reg_donation_sklearn_linear.LinearRegression_10.sav", // To Update The Number Once Finalised Test Execution
        //             serializer: "pickle",
        //             modelFormat: "sklearn",
        //             status: "valid"
        //         },
        //         {
        //             name: "sample_reg_donation_sklearn_linear.LinearRegression_11.sav", // To Update The Number Once Finalised Test Execution
        //             mode: "upload",
        //             modelType: "regression",
        //             fileType: "file",
        //             filename: "sample_reg_donation_sklearn_linear.LinearRegression_11.sav", // To Update The Number Once Finalised Test Execution
        //             serializer: "pickle",
        //             modelFormat: "sklearn",
        //             status: "valid"
        //         }
        //     ], FILES: ARRAY_OF_FILES[1], STATUS: 200 },
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
        // {
        //     TEST_NAME: "With Files Non Arrays", EXPECTED:
        //     {
        //         name: 'sample_bc_credit_sklearn_linear.LogisticRegression_33.sav', // To Update The Number Once Finalised Test Execution
        //         mode: 'upload',
        //         modelType: 'classification',
        //         fileType: 'file',
        //         filename: 'sample_bc_credit_sklearn_linear.LogisticRegression_33.sav', // To Update The Number Once Finalised Test Execution
        //         serializer: "pickle",
        //         modelFormat: "sklearn",
        //         status: "valid"

        //     }, FILES: ARRAY_OF_FILES[12], STATUS: 200
        // }
        { TEST_NAME: "With Valid File Integer Arrays", FILETYPE: "INVALID_FILE", EXPECTED: { detail: [{ type: 'value_error', msg: "Value error, Expected UploadFile, received: <class 'str'>", input: "10" }] }, FILES: ARRAY_OF_FILES[13], STATUS: 422 },
        { TEST_NAME: "With Valid File Float Arrays", FILETYPE: "INVALID_FILE", EXPECTED: { detail: [{ type: 'value_error', msg: "Value error, Expected UploadFile, received: <class 'str'>", input: "10.1" }] }, FILES: ARRAY_OF_FILES[14], STATUS: 422 },
    ]

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

    const GET_TEST_MODELS_BY_MODEL_ID = [
        // {
        //     TEST_NAME: "With Existing Model ID", CASE_TYPE: "POSITIVE", MODEL_NAME: "sample_bc_credit_sklearn_linear.LogisticRegression.sav", MODEL_TYPE: "classification", EXPECTED: {
        //         name: "sample_reg_donation_sklearn_linear.LinearRegression_37.sav", // To Update The Number Once Finalised Test Execution
        //         mode: "upload",
        //         modelType: "regression",
        //         fileType: "file",
        //         filename: "sample_reg_donation_sklearn_linear.LinearRegression_37.sav", // To Update The Number Once Finalised Test Execution
        //         serializer: "pickle",
        //         modelFormat: "sklearn",
        //         status: "valid"
        //     }, STATUS: 200
        // },
        { TEST_NAME: "With Non-existing Model ID", TEST_MODEL_ID: 100000000000000, EXPECTED: { detail: 'Test model not found' }, STATUS: 404 },
        { TEST_NAME: "With String Model ID", TEST_MODEL_ID: "test", EXPECTED: { detail: [{ type: 'int_parsing', msg: 'Input should be a valid integer, unable to parse string as an integer', input: 'test' }] }, STATUS: 422 },
        { TEST_NAME: "With Float Model ID ", TEST_MODEL_ID: floatValue, EXPECTED: { detail: [{ type: 'int_parsing', msg: 'Input should be a valid integer, unable to parse string as an integer', input: '10.1' }] }, STATUS: 422 },
        { TEST_NAME: "With Boolean Model ID", TEST_MODEL_ID: true, EXPECTED: { detail: [{ type: 'int_parsing', msg: 'Input should be a valid integer, unable to parse string as an integer', input: 'true' }] }, STATUS: 422 },
        { TEST_NAME: "With Null Model ID", TEST_MODEL_ID: null, EXPECTED: { detail: [{ type: 'int_parsing', msg: 'Input should be a valid integer, unable to parse string as an integer', input: 'null' }] }, STATUS: 422 },
    ]

    const PATCH_TEST_MODELS_ID_BY_MODEL_ID = [
        { TEST_NAME: "With Name Character Length Between 1 and 256 Characters With Description < 4096 Characters With Model Type Classification", CASE_TYPE: "MODEL_TYPE", MODEL_TYPE: "classification", MODEL_NAME: "sample_bc_credit_sklearn_linear.LogisticRegression.sav", EXPECTED: { modelType: "classification" }, STATUS: 200 },
        { TEST_NAME: "With Name Character Length Between 1 and 256 Characters With Description < 4096 Characters With Model Type Regression",CASE_TYPE: "MODEL_TYPE", MODEL_TYPE: "regression", MODEL_NAME: "sample_bc_credit_sklearn_linear.LogisticRegression.sav", EXPECTED: { modelType: "regression" }, STATUS: 200 },
        { TEST_NAME: "With Name Character Length Between 1 and 256 Characters With Description < 4096 Characters With Model Type Uplift", CASE_TYPE: "MODEL_TYPE", MODEL_TYPE: "uplift", MODEL_NAME: "sample_bc_credit_sklearn_linear.LogisticRegression.sav", EXPECTED: { modelType: "uplift" }, STATUS: 200 },
        { TEST_NAME: "With Name Character Length Between 1 and 256 Characters With Description < 4096 Characters With Invalid Model Type", CASE_TYPE: "MODEL_TYPE", MODEL_TYPE: "test", MODEL_NAME: "sample_bc_credit_sklearn_linear.LogisticRegression.sav", EXPECTED: { detail: [{ type: 'enum', msg: "Input should be 'classification', 'regression' or 'uplift'", input: 'test' }] }, STATUS: 422 },
        { TEST_NAME: "With Name Character Length Between 1 and 256 Characters With Description < 4096 Characters With Model Type Input Integer", CASE_TYPE: "MODEL_TYPE", MODEL_TYPE: intValue, MODEL_NAME: "sample_bc_credit_sklearn_linear.LogisticRegression.sav", EXPECTED: { detail: [{ type: 'enum', msg: "Input should be 'classification', 'regression' or 'uplift'", input: 10 }] }, STATUS: 422 },
        { TEST_NAME: "With Name Character Length Between 1 and 256 Characters With Description < 4096 Characters With Model Type Input Float", CASE_TYPE: "MODEL_TYPE", MODEL_TYPE: floatValue, MODEL_NAME: "sample_bc_credit_sklearn_linear.LogisticRegression.sav", EXPECTED: { detail: [{ type: 'enum', msg: "Input should be 'classification', 'regression' or 'uplift'", input: 10.1 }] }, STATUS: 422 },
        { TEST_NAME: "With Name Character Length Between 1 and 256 Characters With Description < 4096 Characters With Model Type Input Boolean", CASE_TYPE: "MODEL_TYPE", MODEL_TYPE: true, MODEL_NAME: "sample_bc_credit_sklearn_linear.LogisticRegression.sav", EXPECTED: { detail: [{ type: 'enum', msg: "Input should be 'classification', 'regression' or 'uplift'", input: true }] }, STATUS: 422 },
        { TEST_NAME: "With Name Character Length Between 1 and 256 Characters With Description < 4096 Characters With Model Type Input Empty", CASE_TYPE: "MODEL_TYPE", MODEL_TYPE: "", MODEL_NAME: "sample_bc_credit_sklearn_linear.LogisticRegression.sav", EXPECTED: { detail: [{ type: 'enum', msg: "Input should be 'classification', 'regression' or 'uplift'", input: '' }] }, STATUS: 422 },
        // { TEST_NAME: "With Name Character Length Between 1 and 256 Characters With Description < 4096 Characters With Model Type Input Null", CASE_TYPE: "MODEL_TYPE", MODEL_TYPE: null, MODEL_NAME: "sample_bc_credit_sklearn_linear.LogisticRegression.sav", EXPECTED: {}, STATUS: 422 }, //Null should go through?
        // { TEST_NAME: "With Name Character Length Between 1 and 256 Characters With Description < 4096 Characters With Model Type Input No Value", CASE_TYPE: "MODEL_TYPE", MODEL_NAME: "sample_bc_credit_sklearn_linear.LogisticRegression.sav", EXPECTED: {}, STATUS: 422 }, //No Value should go through?
        { TEST_NAME: "With Name Character Length Between 1 and 256 Characters With Description < 4096 Characters With Valid Model Type", CASE_TYPE: "DESCRIPTION", DESCRIPTION: "sample bc credit sklearn model", MODEL_NAME: "sample_bc_credit_sklearn_linear.LogisticRegression.sav", EXPECTED: { description: "sample bc credit sklearn model" }, STATUS: 200 },
        { TEST_NAME: "With Name Character Length Between 1 and 256 Characters With Description > 4096 Characters With Valid Model Type", CASE_TYPE: "DESCRIPTION", DESCRIPTION: STRING_4096_CHARACTERS, MODEL_NAME: "sample_bc_credit_sklearn_linear.LogisticRegression.sav", EXPECTED: { detail: [{ type: 'string_too_long', msg: 'String should have at most 4096 characters', input: STRING_4096_CHARACTERS }] }, STATUS: 422 },
        { TEST_NAME: "With Name Character Length Between 1 and 256 Characters With Description Integer With Valid Model Type", CASE_TYPE: "DESCRIPTION", DESCRIPTION: intValue, MODEL_NAME: "sample_bc_credit_sklearn_linear.LogisticRegression.sav", EXPECTED: { detail: [{ type: 'string_type', msg: 'Input should be a valid string', input: 10 }] }, STATUS: 422 },
        { TEST_NAME: "With Name Character Length Between 1 and 256 Characters With Description Float With Valid Model Type", CASE_TYPE: "DESCRIPTION", DESCRIPTION: floatValue, MODEL_NAME: "sample_bc_credit_sklearn_linear.LogisticRegression.sav", EXPECTED: { detail: [{ type: 'string_type', msg: 'Input should be a valid string', input: 10.1 }] }, STATUS: 422 },
        { TEST_NAME: "With Name Character Length Between 1 and 256 Characters With Description Boolean With Valid Model Type", CASE_TYPE: "DESCRIPTION", DESCRIPTION: true, MODEL_NAME: "sample_bc_credit_sklearn_linear.LogisticRegression.sav", EXPECTED: { detail: [{ type: 'string_type', msg: 'Input should be a valid string', input: true }] }, STATUS: 422 },
        { TEST_NAME: "With Name Character Length Between 1 and 256 Characters With Description Empty With Valid Model Type", CASE_TYPE: "DESCRIPTION", DESCRIPTION: "", MODEL_NAME: "sample_bc_credit_sklearn_linear.LogisticRegression.sav", EXPECTED: { description: null }, STATUS: 200 },
        { TEST_NAME: "With Name Character Length Between 1 and 256 Characters With Description Null With Valid Model Type", CASE_TYPE: "DESCRIPTION", DESCRIPTION: null, MODEL_NAME: "sample_bc_credit_sklearn_linear.LogisticRegression.sav", EXPECTED: { description: null }, STATUS: 200 },
        { TEST_NAME: "With Name Character Length Between 1 and 256 Characters With Description No Values With Valid Model Type", CASE_TYPE: "DESCRIPTION", MODEL_NAME: "sample_bc_credit_sklearn_linear.LogisticRegression.sav", EXPECTED: { description: null}, STATUS: 200 },
        { TEST_NAME: "With Name Character Length < 256 Characters With Description < 4096 Characters With Valid Model Type", CASE_TYPE: "NAME", NAME: "sample bc credit sklearn model", MODEL_NAME: "sample_bc_credit_sklearn_linear.LogisticRegression.sav", EXPECTED: { name: "sample bc credit sklearn model" }, STATUS: 200 },
        { TEST_NAME: "With Name > 256 Characters With Description < 4096 Characters With Valid Model Type", CASE_TYPE: "NAME", NAME: STRING_4096_CHARACTERS, MODEL_NAME: "sample_bc_credit_sklearn_linear.LogisticRegression.sav", EXPECTED: { detail: [{ type: 'string_too_long', msg: 'String should have at most 256 characters', input: STRING_4096_CHARACTERS }]}, STATUS: 422 },
        { TEST_NAME: "With Name Integer With Description < 4096 Characters With Valid Model Type", CASE_TYPE: "NAME", NAME: intValue, MODEL_NAME: "sample_bc_credit_sklearn_linear.LogisticRegression.sav", EXPECTED: { detail: [{ type: 'string_type', msg: 'Input should be a valid string', input: 10 }] }, STATUS: 422 },
        { TEST_NAME: "With Name Float With Description < 4096 Characters With Valid Model Type", CASE_TYPE: "NAME", NAME: floatValue, MODEL_NAME: "sample_bc_credit_sklearn_linear.LogisticRegression.sav", EXPECTED: { detail: [{ type: 'string_type', msg: 'Input should be a valid string', input: 10.1 }] }, STATUS: 422 },
        { TEST_NAME: "With Name Boolean With Description < 4096 Characters With Valid Model Type", CASE_TYPE: "NAME", NAME: true, MODEL_NAME: "sample_bc_credit_sklearn_linear.LogisticRegression.sav", EXPECTED: { detail: [{ type: 'string_type', msg: 'Input should be a valid string', input: true }] }, STATUS: 422 },
        { TEST_NAME: "With Name Empty With Description < 4096 Characters With Valid Model Type", CASE_TYPE: "NAME", NAME: "", MODEL_NAME: "sample_bc_credit_sklearn_linear.LogisticRegression.sav", EXPECTED: { detail: [{ type: 'string_too_short', msg: 'String should have at least 1 character', input: '' }] }, STATUS: 422 },
        // { TEST_NAME: "With Name Null With Description < 4096 Characters With Valid Model Type", CASE_TYPE: "NAME", NAME: null, MODEL_NAME: "sample_bc_credit_sklearn_linear.LogisticRegression.sav", EXPECTED: { }, STATUS: 422 }, //Null should go through?
        // { TEST_NAME: "With Name No Value With Description < 4096 Characters With Valid Model Type", CASE_TYPE: "NAME", MODEL_NAME: "sample_bc_credit_sklearn_linear.LogisticRegression.sav", EXPECTED: { }, STATUS: 422 }, //No Value should go through?
    ]

    const DELETE_TEST_MODELS_BY_MODEL_ID = [
        { TEST_NAME: "With Existing Model ID", CASE_TYPE: "POSITIVE", MODEL_NAME: "sample_bc_credit_sklearn_linear.LogisticRegression.sav", EXPECTED: { detail: 'Test model deleted successfully' }, STATUS: 200 },
        { TEST_NAME: "With Non-existing Model ID", TEST_MODEL_ID: 100000000000000, EXPECTED: { detail: 'Test model not found' }, STATUS: 404 },
        { TEST_NAME: "With String Model ID", TEST_MODEL_ID: "test", EXPECTED: { detail: [{ type: 'int_parsing', msg: 'Input should be a valid integer, unable to parse string as an integer', input: 'test' }] }, STATUS: 422 },
        { TEST_NAME: "With Float Model ID ", TEST_MODEL_ID: floatValue, EXPECTED: { detail: [{ type: 'int_parsing', msg: 'Input should be a valid integer, unable to parse string as an integer', input: '10.1' }] }, STATUS: 422 },
        { TEST_NAME: "With Boolean Model ID", TEST_MODEL_ID: true, EXPECTED: { detail: [{ type: 'int_parsing', msg: 'Input should be a valid integer, unable to parse string as an integer', input: 'true' }] }, STATUS: 422 },
        { TEST_NAME: "With Null Model ID", TEST_MODEL_ID: null, EXPECTED: { detail: [{ type: 'int_parsing', msg: 'Input should be a valid integer, unable to parse string as an integer', input: 'null' }] }, STATUS: 422 },
        { TEST_NAME: "With No Value Model ID", TEST_MODEL_ID: null, EXPECTED: { detail: [{ type: 'int_parsing', msg: 'Input should be a valid integer, unable to parse string as an integer', input: 'null' }] }, STATUS: 422 },

    ]

    for (const data of POST_TEST_MODELS) {
        test.skip(`Upload Test Model ${data.TEST_NAME}`, async () => {
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

    for (const data of POST_TEST_MODELS_FOLDER) {
        test.skip(`Upload Test Model Folder ${data.TEST_NAME}`, async () => {
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

    for (const data of PATCH_TEST_MODELS_ID_BY_MODEL_ID) {
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

            if(data.CASE_TYPE == "MODEL_TYPE") {
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

            if(data.CASE_TYPE == "DESCRIPTION") {
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

            if(data.CASE_TYPE == "NAME") {
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
})