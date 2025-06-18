import { test, expect } from '@playwright/test'

import axios from 'axios'
import fs from 'fs'
import FormData from 'form-data'

const url = process.env.URL
const port_number = process.env.PORT_NUMBER
const root_path = process.env.ROOT_PATH

test.describe('Test Datasets', () => {

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
            { datasetName: "pickle_pandas_fashion_mnist_annotated_labels_10.sav" },
            { datasetName: "sample_bc_credit_data.sav" }
        ],
        [
            /* Test Case 1 */
            { invalidFileName: "sample_bc_credit_sklearn_linear.LogisticRegression.sav" },
            { invalidFileName: "sample_mc_toxic_sklearn_linear.LogisticRegression.sav" }
        ],
        [
            /* Test Case 2 */
            { folderName: "raw_fashion_image_10" },
            { folderName: "small_test" },
        ],
        [
            /* Test Case 3 */
            { datasetName: "pickle_pandas_fashion_mnist_annotated_labels_10.sav" }
        ],
        [
            /* File Name > 128 Characters */
            { datasetName: STRING_128_CHARACTERS }
        ],
        [
            /* File Name Integer */
            { datasetName: intValue }
        ],
        [
            /* File Name Float */
            { datasetName: floatValue }
        ],
        [
            /* File Name Boolean */
            { datasetName: true }
        ],
        [
            /* File Name Null */
            { datasetName: null }
        ]

    ]

    const POST_TEST_DATASETS = [
        {
            TEST_NAME: 'With Valid File Arrays', FILES: ARRAY_OF_FILES[0], EXPECTED: [
                {
                    fileType: 'file',
                    zip_hash: 'c6b080b55c4e15c66db0824ed3db7bc5bb920e8d8029c3a290d4d76dff81415c',
                    size: 877,
                    serializer: 'pickle',
                    dataFormat: 'pandas',
                    numRows: 10,
                    numCols: 2,
                    status: 'valid'
                },
                {
                    fileType: 'file',
                    zip_hash: '0b2b85f467f9dce0d1e8b1e072998eb42501e589cf79c25564a17dec2606da08',
                    size: 181224,
                    serializer: 'pickle',
                    dataFormat: 'pandas',
                    numRows: 2500,
                    numCols: 9,
                    status: 'valid'
                }
            ], STATUS: 200
        },
        { TEST_NAME: 'With Invalid File Type Arrays', FILETYPE: "INVALID", FILES: ARRAY_OF_FILES[1], EXPECTED: { detail: 'Unsupported Dataset' }, STATUS: 400 },
        {
            TEST_NAME: 'With Folder Arrays', FILETYPE: "FOLDER", FILES: ARRAY_OF_FILES[2], EXPECTED: {
                detail: [
                    {
                        type: 'value_error',
                        msg: "Value error, Expected UploadFile, received: <class 'str'>",
                        input: 'raw_fashion_image_10'
                    },
                    {
                        type: 'value_error',
                        msg: "Value error, Expected UploadFile, received: <class 'str'>",
                        input: 'small_test'
                    }
                ]
            }, STATUS: 422
        },
        {
            TEST_NAME: 'With Files Non Array', FILES: ARRAY_OF_FILES[3], EXPECTED: [
                {
                    fileType: 'file',
                    zip_hash: 'c6b080b55c4e15c66db0824ed3db7bc5bb920e8d8029c3a290d4d76dff81415c',
                    size: 877,
                    serializer: 'pickle',
                    dataFormat: 'pandas',
                    numRows: 10,
                    numCols: 2,
                    status: 'valid'
                }
            ], STATUS: 200
        },
        {
            TEST_NAME: 'With File Name > 128 Characters', FILES: ARRAY_OF_FILES[4], EXPECTED: {
                detail: 'Invalid filename Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin in malesuada elit. Fusce id commodo neque. Aliquam fermentum sem eget faucibus interdum. '
            }, STATUS: 400
        },
        {
            TEST_NAME: 'With File Name Integer', FILES: ARRAY_OF_FILES[5], EXPECTED: [
                {
                    fileType: 'file',
                    zip_hash: 'def0ce08fe6118e39431fe78b640b7054ff318451aa5f1c18a70359d69cdabec',
                    size: 1644,
                    serializer: 'pickle',
                    dataFormat: 'pandas',
                    numRows: 50,
                    numCols: 3,
                    status: 'valid'
                }
            ], STATUS: 200
        },
        {
            TEST_NAME: 'With File Name Float', FILES: ARRAY_OF_FILES[6], EXPECTED: [
                {
                    fileType: 'file',
                    zip_hash: '0b2b85f467f9dce0d1e8b1e072998eb42501e589cf79c25564a17dec2606da08',
                    size: 181224,
                    serializer: 'pickle',
                    dataFormat: 'pandas',
                    numRows: 2500,
                    numCols: 9,
                    status: 'valid'
                }
            ], STATUS: 200
        },
        {
            TEST_NAME: 'With File Name Boolean', FILES: ARRAY_OF_FILES[7], EXPECTED: [
                {
                    fileType: 'file',
                    zip_hash: '49942f413ea7ae21e7d110295b91c08ab874413d81d0478e05c53f1ca961c897',
                    size: 15035,
                    serializer: 'pickle',
                    dataFormat: 'pandas',
                    numRows: 250,
                    numCols: 7,
                    status: 'valid'
                }
            ], STATUS: 200
        },
        {
            TEST_NAME: 'With File Name Null', FILES: ARRAY_OF_FILES[8], EXPECTED: [
                {
                    fileType: 'file',
                    zip_hash: '8b21b0be78cf18540cd5877233a19877fdde9e4d08236235a8879a37a55c4487',
                    size: 17143,
                    serializer: 'pickle',
                    dataFormat: 'pandas',
                    numRows: 250,
                    numCols: 8,
                    status: 'valid'
                }
            ], STATUS: 200
        }

    ]

    const ARRAY_OF_FOLDER_FILES = [
        [
            /* Test Case 0 */
            { fileName: "0.png" },
            { fileName: "1.png" },
            { fileName: "2.png" },
            { fileName: "3.png" },
            { fileName: "4.png" },
            { fileName: "5.png" },
            { fileName: "6.png" },
            { fileName: "7.png" },
            { fileName: "8.png" },
            { fileName: "9.png" },
        ],
        [
            /* Invalid File Type Arrays */
            { fileName: "faceimgCustomClass.py" },
            { fileName: "pipeline_train_80000.sav" },
        ],
        [
            /* Invalid File Name Integer */
            { fileName: intValue }
        ],
        [
            /* Invalid File Name Float */
            { fileName: floatValue }
        ],
        [
            /* Invalid File Name Boolean */
            { fileName: true }
        ],
        [
            /* Invalid File Name Null */
            { fileName: null }
        ]

    ]

    const FOLDER_PARAMETERS = [
        { folderName: "raw_fashion_image_10", subfolders: "" },
        { folderName: STRING_128_CHARACTERS + "folder", subfolders: "" },
        { folderName: intValue + " folder", subfolders: "" },
        { folderName: floatValue + " folder", subfolders: "" },
        { folderName: true + " folder", subfolders: "" },
        { folderName: null + " folder", subfolders: "" },
        { folderName: "bc_image_face", subfolders: "" },
        { folderName: "test", subfolders: "" }

    ]

    const POST_TEST_DATASETS_FOLDER = [
        {
            TEST_NAME: "With Valid File Arrays With Folder Name Between 1 And 128 Characters With Valid Sub Folder Arrays", DATASET_ROOT_FOLDER: "data", FOLDER_PARAMETERS: FOLDER_PARAMETERS[0], FILES: ARRAY_OF_FOLDER_FILES[0], EXPECTED: {
                fileType: 'folder',
                size: 46500,
                serializer: 'image',
                dataFormat: 'pandas',
                numRows: 10,
                numCols: 1,
                dataColumns: [
                    {
                        name: 'image_directory',
                        datatype: 'object',
                        label: 'image_directory'
                    }
                ],
                status: 'valid'
            }, STATUS: 200
        },
        { TEST_NAME: "With Valid File Arrays With Folder Name > 128 Characters With Valid Sub Folder Arrays", DATASET_ROOT_FOLDER: "data", FOLDER_PARAMETERS: FOLDER_PARAMETERS[1], FILES: ARRAY_OF_FOLDER_FILES[0], EXPECTED: { detail: [{ type: 'string_too_long', msg: 'String should have at most 128 characters', input: STRING_128_CHARACTERS + 'folder' }] }, STATUS: 422 },
        { TEST_NAME: "With Valid File Arrays With Folder Name Integer With Valid Sub Folder Arrays", DATASET_ROOT_FOLDER: "data", FOLDER_PARAMETERS: FOLDER_PARAMETERS[2], FILES: ARRAY_OF_FOLDER_FILES[0], EXPECTED: { detail: 'Invalid foldername: 10 folder' }, STATUS: 400 },
        { TEST_NAME: "With Valid File Arrays With Folder Name Float With Valid Sub Folder Arrays", DATASET_ROOT_FOLDER: "data", FOLDER_PARAMETERS: FOLDER_PARAMETERS[3], FILES: ARRAY_OF_FOLDER_FILES[0], EXPECTED: { detail: 'Invalid foldername: 10.1 folder' }, STATUS: 400 },
        { TEST_NAME: "With Valid File Arrays With Folder Name Boolean With Valid Sub Folder Arrays", DATASET_ROOT_FOLDER: "data", FOLDER_PARAMETERS: FOLDER_PARAMETERS[4], FILES: ARRAY_OF_FOLDER_FILES[0], EXPECTED: { detail: 'Invalid foldername: true folder' }, STATUS: 400 },
        { TEST_NAME: "With Valid File Arrays With Folder Name Null With Valid Sub Folder Arrays", DATASET_ROOT_FOLDER: "data", FOLDER_PARAMETERS: FOLDER_PARAMETERS[5], FILES: ARRAY_OF_FOLDER_FILES[0], EXPECTED: { detail: 'Invalid foldername: null folder' }, STATUS: 400 },
        { TEST_NAME: "With Invalid File Type Arrays With Folder Name Between 1 And 128 Characters With Valid Sub Folder Arrays", DATASET_ROOT_FOLDER: "pipeline", FOLDER_PARAMETERS: FOLDER_PARAMETERS[6], FILES: ARRAY_OF_FOLDER_FILES[1], EXPECTED: { detail: 'Unsupported Dataset' }, STATUS: 400 },
        {
            TEST_NAME: "With File Name Integer With Folder Name Between 1 And 128 Characters With Valid Sub Folder Arrays", DATASET_ROOT_FOLDER: "data", FOLDER_PARAMETERS: FOLDER_PARAMETERS[7], FILES: ARRAY_OF_FOLDER_FILES[2], EXPECTED: {
                size: 15035,
                serializer: 'pickle',
                dataFormat: 'pandas',
                numRows: 250,
                numCols: 7,
                dataColumns: [
                    { name: 'age', datatype: 'int64', label: 'age' },
                    { name: 'gender', datatype: 'int64', label: 'gender' },
                    { name: 'race', datatype: 'int64', label: 'race' },
                    { name: 'ban_count', datatype: 'int64', label: 'ban_count' },
                    { name: 'prior_count', datatype: 'int64', label: 'prior_count' },
                    { name: 'toxic_words', datatype: 'int64', label: 'toxic_words' },
                    { name: 'toxic', datatype: 'int64', label: 'toxic' }
                ],
                status: 'valid'
            }, STATUS: 200
        },
        {
            TEST_NAME: "With File Name Float With Folder Name Between 1 And 128 Characters With Valid Sub Folder Arrays", DATASET_ROOT_FOLDER: "data", FOLDER_PARAMETERS: FOLDER_PARAMETERS[7], FILES: ARRAY_OF_FOLDER_FILES[3], EXPECTED: {
                size: 15035,
                serializer: 'pickle',
                dataFormat: 'pandas',
                numRows: 250,
                numCols: 7,
                dataColumns: [
                    { name: 'age', datatype: 'int64', label: 'age' },
                    { name: 'gender', datatype: 'int64', label: 'gender' },
                    { name: 'race', datatype: 'int64', label: 'race' },
                    { name: 'ban_count', datatype: 'int64', label: 'ban_count' },
                    { name: 'prior_count', datatype: 'int64', label: 'prior_count' },
                    { name: 'toxic_words', datatype: 'int64', label: 'toxic_words' },
                    { name: 'toxic', datatype: 'int64', label: 'toxic' }
                ],
                status: 'valid'
            }, STATUS: 200
        },
        {
            TEST_NAME: "With File Name Boolean With Folder Name Between 1 And 128 Characters With Valid Sub Folder Arrays", DATASET_ROOT_FOLDER: "data", FOLDER_PARAMETERS: FOLDER_PARAMETERS[7], FILES: ARRAY_OF_FOLDER_FILES[4], EXPECTED: {
                size: 15035,
                serializer: 'pickle',
                dataFormat: 'pandas',
                numRows: 250,
                numCols: 7,
                dataColumns: [
                    { name: 'age', datatype: 'int64', label: 'age' },
                    { name: 'gender', datatype: 'int64', label: 'gender' },
                    { name: 'race', datatype: 'int64', label: 'race' },
                    { name: 'ban_count', datatype: 'int64', label: 'ban_count' },
                    { name: 'prior_count', datatype: 'int64', label: 'prior_count' },
                    { name: 'toxic_words', datatype: 'int64', label: 'toxic_words' },
                    { name: 'toxic', datatype: 'int64', label: 'toxic' }
                ],
                status: 'valid'
            }, STATUS: 200
        },
        {
            TEST_NAME: "With File Name Null With Folder Name Between 1 And 128 Characters With Valid Sub Folder Arrays", DATASET_ROOT_FOLDER: "data", FOLDER_PARAMETERS: FOLDER_PARAMETERS[7], FILES: ARRAY_OF_FOLDER_FILES[5], EXPECTED: {
                size: 15035,
                serializer: 'pickle',
                dataFormat: 'pandas',
                numRows: 250,
                numCols: 7,
                dataColumns: [
                    { name: 'age', datatype: 'int64', label: 'age' },
                    { name: 'gender', datatype: 'int64', label: 'gender' },
                    { name: 'race', datatype: 'int64', label: 'race' },
                    { name: 'ban_count', datatype: 'int64', label: 'ban_count' },
                    { name: 'prior_count', datatype: 'int64', label: 'prior_count' },
                    { name: 'toxic_words', datatype: 'int64', label: 'toxic_words' },
                    { name: 'toxic', datatype: 'int64', label: 'toxic' }
                ],
                status: 'valid'
            }, STATUS: 200
        },
    ]

    const GET_TEST_DATASETS_BY_DATASET_ID = [
        {
            TEST_NAME: "With Existing Test Dataset ID", CASE_TYPE: "POSITIVE", DATASET_NAME: "sample_bc_credit_data.sav", EXPECTED: {
                fileType: 'file',
                zip_hash: '0b2b85f467f9dce0d1e8b1e072998eb42501e589cf79c25564a17dec2606da08',
                size: 181224,
                serializer: 'pickle',
                dataFormat: 'pandas',
                numRows: 2500,
                numCols: 9,
                status: 'valid'
            }, STATUS: 200
        },
        { TEST_NAME: "With Non-existing Test Dataset ID", TEST_DATASET_ID: 100000000000000, EXPECTED: { detail: "Dataset not found" }, STATUS: 404 },
        { TEST_NAME: "With String Test Dataset ID", TEST_DATASET_ID: "test", EXPECTED: { detail: [{ type: 'int_parsing', msg: 'Input should be a valid integer, unable to parse string as an integer', input: 'test' }] }, STATUS: 422 },
        { TEST_NAME: "With Float Test Dataset ID ", TEST_DATASET_ID: floatValue, EXPECTED: { detail: [{ type: 'int_parsing', msg: 'Input should be a valid integer, unable to parse string as an integer', input: '10.1' }] }, STATUS: 422 },
        { TEST_NAME: "With Boolean Test Dataset ID", TEST_DATASET_ID: true, EXPECTED: { detail: [{ type: 'int_parsing', msg: 'Input should be a valid integer, unable to parse string as an integer', input: 'true' }] }, STATUS: 422 },
        { TEST_NAME: "With Null Test Dataset ID", TEST_DATASET_ID: null, EXPECTED: { detail: [{ type: 'int_parsing', msg: 'Input should be a valid integer, unable to parse string as an integer', input: 'null' }] }, STATUS: 422 },
    ]

    const PATCH_TEST_DATASETS_BY_DATASET_ID = [
        { TEST_NAME: "With Name Character Length Between 1 and 256 Characters With Description < 4096 Characters With Valid Data Column Name With Valid Data Column Label", CASE_TYPE: "POSITIVE", DATASET_NAME: "pickle_pandas_fashion_mnist_annotated_labels_10.sav", EXPECTED: { name: "test", description: "test", dataColumns: [{ name: 'file_name', datatype: 'object', label: 'test' }, { name: 'label', datatype: 'uint8', label: 'label' }] }, STATUS: 200 }, //What is the purpose of updating label when user cannot update it from the frontend
        { TEST_NAME: "With Name Character Length Between 1 and 256 Characters With Description < 4096 Characters With Valid Data Column Name With Valid Data Column Label Integer", CASE_TYPE: "DATA_COLUMN_LABEL", DATASET_NAME: "pickle_pandas_fashion_mnist_annotated_labels_10.sav", DATA_COLUMN_LABEL: intValue, EXPECTED: { detail: [{ type: 'string_type', msg: 'Input should be a valid string', input: 10 }] }, STATUS: 422 },
        { TEST_NAME: "With Name Character Length Between 1 and 256 Characters With Description < 4096 Characters With Valid Data Column Name With Valid Data Column Label Float", CASE_TYPE: "DATA_COLUMN_LABEL", DATASET_NAME: "pickle_pandas_fashion_mnist_annotated_labels_10.sav", DATA_COLUMN_LABEL: floatValue, EXPECTED: { detail: [{ type: 'string_type', msg: 'Input should be a valid string', input: 10.1 }] }, STATUS: 422 },
        { TEST_NAME: "With Name Character Length Between 1 and 256 Characters With Description < 4096 Characters With Valid Data Column Name With Valid Data Column Label Boolean", CASE_TYPE: "DATA_COLUMN_LABEL", DATASET_NAME: "pickle_pandas_fashion_mnist_annotated_labels_10.sav", DATA_COLUMN_LABEL: true, EXPECTED: { detail: [{ type: 'string_type', msg: 'Input should be a valid string', input: true }] }, STATUS: 422 },
        { TEST_NAME: "With Name Character Length Between 1 and 256 Characters With Description < 4096 Characters With Valid Data Column Name With Valid Data Column Label Empty", CASE_TYPE: "DATA_COLUMN_LABEL", DATASET_NAME: "pickle_pandas_fashion_mnist_annotated_labels_10.sav", DATA_COLUMN_LABEL: "", EXPECTED: { dataColumns: [{ name: 'file_name', datatype: 'object', label: '' }, { name: 'label', datatype: 'uint8', label: 'label' }] }, STATUS: 200 }, //What is the purpose of updating label when user cannot update it from the frontend
        { TEST_NAME: "With Name Character Length Between 1 and 256 Characters With Description < 4096 Characters With Valid Data Column Name With Valid Data Column Label Null", CASE_TYPE: "DATA_COLUMN_LABEL", DATASET_NAME: "pickle_pandas_fashion_mnist_annotated_labels_10.sav", DATA_COLUMN_LABEL: null, EXPECTED: { detail: [{ type: 'string_type', msg: 'Input should be a valid string', input: null }] }, STATUS: 422 },
        { TEST_NAME: "With Name Character Length Between 1 and 256 Characters With Description < 4096 Characters With Valid Data Column Name With Valid Data Column Label No Value", CASE_TYPE: "DATA_COLUMN_LABEL", DATASET_NAME: "pickle_pandas_fashion_mnist_annotated_labels_10.sav", EXPECTED: { detail: [{ type: 'missing', msg: 'Field required' }] }, STATUS: 422 },
        { TEST_NAME: "With Name Character Length Between 1 and 256 Characters With Description < 4096 Characters With Data Column Name Integer With Valid Data Column Label", CASE_TYPE: "DATA_COLUMN_NAME", DATASET_NAME: "pickle_pandas_fashion_mnist_annotated_labels_10.sav", DATA_COLUMN_NAME: intValue, EXPECTED: { detail: [{ type: 'string_type', msg: 'Input should be a valid string', input: 10 }] }, STATUS: 422 },
        { TEST_NAME: "With Name Character Length Between 1 and 256 Characters With Description < 4096 Characters With Data Column Name Float With Valid Data Column Label", CASE_TYPE: "DATA_COLUMN_NAME", DATASET_NAME: "pickle_pandas_fashion_mnist_annotated_labels_10.sav", DATA_COLUMN_NAME: floatValue, EXPECTED: { detail: [{ type: 'string_type', msg: 'Input should be a valid string', input: 10.1 }] }, STATUS: 422 },
        { TEST_NAME: "With Name Character Length Between 1 and 256 Characters With Description < 4096 Characters With Data Column Name Boolean With Valid Data Column Label", CASE_TYPE: "DATA_COLUMN_NAME", DATASET_NAME: "pickle_pandas_fashion_mnist_annotated_labels_10.sav", DATA_COLUMN_NAME: true, EXPECTED: { detail: [{ type: 'string_type', msg: 'Input should be a valid string', input: true }] }, STATUS: 422 },
        { TEST_NAME: "With Name Character Length Between 1 and 256 Characters With Description < 4096 Characters With Data Column Name Empty With Valid Data Column Label", CASE_TYPE: "DATA_COLUMN_NAME", DATASET_NAME: "pickle_pandas_fashion_mnist_annotated_labels_10.sav", DATA_COLUMN_NAME: "", EXPECTED: { detail: [{ ctx: { "min_length": 1 }, input: "", loc: ["body", "dataColumns", 0, "name"], "msg": "String should have at least 1 character", type: 'string_too_short' }] }, STATUS: 422 },
        { TEST_NAME: "With Name Character Length Between 1 and 256 Characters With Description < 4096 Characters With Data Column Name Null With Valid Data Column Label", CASE_TYPE: "DATA_COLUMN_NAME", DATASET_NAME: "pickle_pandas_fashion_mnist_annotated_labels_10.sav", DATA_COLUMN_NAME: null, EXPECTED: { detail: [{ type: 'string_type', msg: 'Input should be a valid string', input: null }] }, STATUS: 422 },
        { TEST_NAME: "With Name Character Length Between 1 and 256 Characters With Description < 4096 Characters With Data Column Name No Value With Valid Data Column Label", CASE_TYPE: "DATA_COLUMN_NAME", DATASET_NAME: "pickle_pandas_fashion_mnist_annotated_labels_10.sav", EXPECTED: { detail: [{ type: 'missing', msg: 'Field required' }] }, STATUS: 422 },
        { TEST_NAME: "With Name Character Length Between 1 and 256 Characters With Description > 4096 Characters With Data Column Name Integer With Valid Data Column Label", CASE_TYPE: "DESCRIPTION", DATASET_NAME: "pickle_pandas_fashion_mnist_annotated_labels_10.sav", DESCRIPTION: STRING_4096_CHARACTERS, EXPECTED: { detail: [{ type: 'string_too_long', msg: 'String should have at most 4096 characters', input: STRING_4096_CHARACTERS }] }, STATUS: 422 },
        { TEST_NAME: "With Name Character Length Between 1 and 256 Characters With Description Integer With Data Column Name Integer With Valid Data Column Label", CASE_TYPE: "DESCRIPTION", DATASET_NAME: "pickle_pandas_fashion_mnist_annotated_labels_10.sav", DESCRIPTION: intValue, EXPECTED: { detail: [{ type: 'string_type', msg: 'Input should be a valid string', input: 10 }] }, STATUS: 422 },
        { TEST_NAME: "With Name Character Length Between 1 and 256 Characters With Description Float With Valid Data Column Name With Valid Data Column Label", CASE_TYPE: "DESCRIPTION", DATASET_NAME: "pickle_pandas_fashion_mnist_annotated_labels_10.sav", DESCRIPTION: floatValue, EXPECTED: { detail: [{ type: 'string_type', msg: 'Input should be a valid string', input: 10.1 }] }, STATUS: 422 },
        { TEST_NAME: "With Name Character Length Between 1 and 256 Characters With Description Boolean With Valid Data Column Name With Valid Data Column Label", CASE_TYPE: "DESCRIPTION", DATASET_NAME: "pickle_pandas_fashion_mnist_annotated_labels_10.sav", DESCRIPTION: true, EXPECTED: { detail: [{ type: 'string_type', msg: 'Input should be a valid string', input: true }] }, STATUS: 422 },
        { TEST_NAME: "With Name Character Length Between 1 and 256 Characters With Description Empty With Valid Data Column Name With Valid Data Column Label", CASE_TYPE: "DESCRIPTION", DATASET_NAME: "pickle_pandas_fashion_mnist_annotated_labels_10.sav", DESCRIPTION: "", EXPECTED: { description: null }, STATUS: 200 },
        { TEST_NAME: "With Name Character Length Between 1 and 256 Characters With Description Null With Valid Data Column Name With Valid Data Column Label", CASE_TYPE: "DESCRIPTION", DATASET_NAME: "pickle_pandas_fashion_mnist_annotated_labels_10.sav", DESCRIPTION: null, EXPECTED: { description: null }, STATUS: 200 },
        { TEST_NAME: "With Name Character Length Between 1 and 256 Characters With Description No Value With Valid Data Column Name With Valid Data Column Label", CASE_TYPE: "DESCRIPTION", DATASET_NAME: "pickle_pandas_fashion_mnist_annotated_labels_10.sav", EXPECTED: { description: null }, STATUS: 200 },
        { TEST_NAME: "With Name Character Length Between > 256 Characters With Description < 4096 Characters With Data Column Name Integer With Valid Data Column Label", CASE_TYPE: "NAME", DATASET_NAME: "pickle_pandas_fashion_mnist_annotated_labels_10.sav", NAME: STRING_4096_CHARACTERS, EXPECTED: { detail: [{ type: 'string_too_long', msg: 'String should have at most 256 characters', input: STRING_4096_CHARACTERS }] }, STATUS: 422 },
        { TEST_NAME: "With Name Integer With Description < 4096 Characters With Data Column Name Integer With Valid Data Column Label", CASE_TYPE: "NAME", DATASET_NAME: "pickle_pandas_fashion_mnist_annotated_labels_10.sav", NAME: intValue, EXPECTED: { detail: [{ type: 'string_type', msg: 'Input should be a valid string', input: 10 }] }, STATUS: 422 },
        { TEST_NAME: "With Name Float With Description < 4096 Characters With Data Column Name Integer With Valid Data Column Label", CASE_TYPE: "NAME", DATASET_NAME: "pickle_pandas_fashion_mnist_annotated_labels_10.sav", NAME: floatValue, EXPECTED: { detail: [{ type: 'string_type', msg: 'Input should be a valid string', input: 10.1 }] }, STATUS: 422 },
        { TEST_NAME: "With Name Boolean With Description < 4096 Characters With Data Column Name Integer With Valid Data Column Label", CASE_TYPE: "NAME", DATASET_NAME: "pickle_pandas_fashion_mnist_annotated_labels_10.sav", NAME: true, EXPECTED: { detail: [{ type: 'string_type', msg: 'Input should be a valid string', input: true }] }, STATUS: 422 },
        { TEST_NAME: "With Name Empty With Description < 4096 Characters With Data Column Name Integer With Valid Data Column Label", CASE_TYPE: "NAME", DATASET_NAME: "pickle_pandas_fashion_mnist_annotated_labels_10.sav", NAME: "", EXPECTED: { detail: [{ ctx: { "min_length": 1 }, input: "", loc: ["body", "name"], "msg": "String should have at least 1 character", type: 'string_too_short' }] }, STATUS: 422 },
        { TEST_NAME: "With Name Null With Description < 4096 Characters With Data Column Name Integer With Valid Data Column Label", CASE_TYPE: "NAME", DATASET_NAME: "pickle_pandas_fashion_mnist_annotated_labels_10.sav", NAME: null, EXPECTED: {}, STATUS: 200 },
        { TEST_NAME: "With Name No Value With Description < 4096 Characters With Data Column Name Integer With Valid Data Column Label", CASE_TYPE: "NAME", DATASET_NAME: "pickle_pandas_fashion_mnist_annotated_labels_10.sav", EXPECTED: {}, STATUS: 200 },
    ]

    const DELETE_TEST_DATASETS_BY_DATASET_ID = [
        { TEST_NAME: "With Existing Test Dataset ID", CASE_TYPE: "POSITIVE", DATASET_NAME: "sample_bc_credit_data.sav", EXPECTED: { message: 'Dataset deleted successfully' }, STATUS: 200 },
        { TEST_NAME: "With Non-existing Test Dataset ID", TEST_DATASET_ID: 100000000000000, EXPECTED: { detail: 'Dataset not found' }, STATUS: 404 },
        { TEST_NAME: "With String Test Dataset ID", TEST_DATASET_ID: "test", EXPECTED: { detail: [{ type: 'int_parsing', msg: 'Input should be a valid integer, unable to parse string as an integer', input: 'test' }] }, STATUS: 422 },
        { TEST_NAME: "With Float Test Dataset ID ", TEST_DATASET_ID: floatValue, EXPECTED: { detail: [{ type: 'int_parsing', msg: 'Input should be a valid integer, unable to parse string as an integer', input: '10.1' }] }, STATUS: 422 },
        { TEST_NAME: "With Boolean Test Datset ID", TEST_DATASET_ID: true, EXPECTED: { detail: [{ type: 'int_parsing', msg: 'Input should be a valid integer, unable to parse string as an integer', input: 'true' }] }, STATUS: 422 },
        { TEST_NAME: "With Null Test Dataset ID", TEST_DATASET_ID: null, EXPECTED: { detail: [{ type: 'int_parsing', msg: 'Input should be a valid integer, unable to parse string as an integer', input: 'null' }] }, STATUS: 422 },
        { TEST_NAME: "With No Value Test Dataset ID", EXPECTED: { detail: [{ type: 'int_parsing', msg: 'Input should be a valid integer, unable to parse string as an integer', input: 'undefined' }] }, STATUS: 422 },
    ]

    const DOWNLOAD_TEST_DATASETS_BY_DATASET_ID = [
        { TEST_NAME: "With Existing Model ID", CASE_TYPE: "POSITIVE", DATASET_NAME: "sample_bc_credit_data.sav", STATUS: 200 },
        { TEST_NAME: "With Non-existing Model ID", TEST_DATASET_ID: 100000000000000, EXPECTED: { detail: 'Test dataset not found' }, STATUS: 404 },
        { TEST_NAME: "With String Model ID", TEST_DATASET_ID: "test", EXPECTED: { detail: [{ type: 'int_parsing', msg: 'Input should be a valid integer, unable to parse string as an integer', input: 'test' }] }, STATUS: 422 },
        { TEST_NAME: "With Float Model ID ", TEST_DATASET_ID: floatValue, EXPECTED: { detail: [{ type: 'int_parsing', msg: 'Input should be a valid integer, unable to parse string as an integer', input: '10.1' }] }, STATUS: 422 },
        { TEST_NAME: "With Boolean Model ID", TEST_DATASET_ID: true, EXPECTED: { detail: [{ type: 'int_parsing', msg: 'Input should be a valid integer, unable to parse string as an integer', input: 'true' }] }, STATUS: 422 },
        { TEST_NAME: "With Null Model ID", TEST_DATASET_ID: null, EXPECTED: { detail: [{ type: 'int_parsing', msg: 'Input should be a valid integer, unable to parse string as an integer', input: 'null' }] }, STATUS: 422 },
        { TEST_NAME: "With No Value Model ID", EXPECTED: { detail: [{ type: 'int_parsing', msg: 'Input should be a valid integer, unable to parse string as an integer', input: 'undefined' }] }, STATUS: 422 },
    ]

    for (const data of POST_TEST_DATASETS) {
        test(`Upload Test Dataset ${data.TEST_NAME}`, async () => {
            const form = new FormData()
            for (const file of data.FILES) {
                if (data.FILETYPE == "INVALID")
                    form.append('files', fs.createReadStream(root_path + '/model/' + file.invalidFileName))
                else if (data.FILETYPE == "FOLDER") {
                    form.append('files', file.folderName)
                }
                else
                    form.append("files", fs.createReadStream(root_path + '/data/' + file.datasetName))
            }

            /* Upload Test Dataset */
            const response = await axios.post(url + ":" + port_number + "/test_datasets/upload",
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

            /* Assert Upload Dataset */
            expect.soft(response.data).toMatchObject(data.EXPECTED)
            expect.soft(response.status).toBe(data.STATUS)

        })
    }

    for (const data of POST_TEST_DATASETS_FOLDER) {
        test(`Upload Test Dataset Folder ${data.TEST_NAME}`, async () => {
            const form = new FormData()
            for (const file of data.FILES) {
                form.append('files', fs.createReadStream(root_path + '/' + data.DATASET_ROOT_FOLDER + '/' + data.FOLDER_PARAMETERS.folderName + '/' + file.fileName))
            }
            form.append('foldername', data.FOLDER_PARAMETERS.folderName)
            form.append('subfolders', data.FOLDER_PARAMETERS.subfolders)

            /* Upload Test Dataset Model */
            const response = await axios.post(url + ":" + port_number + "/test_datasets/upload_folder",
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

            /* Assert Upload Test Dataset Folder */
            expect.soft(response.data).toMatchObject(data.EXPECTED)
            expect.soft(response.status).toBe(data.STATUS)

        })
    }

    test('Get All Test Datasets', async () => {

        /* Get All Test Datasets */
        const response = await axios.get(url + ":" + port_number + "/test_datasets", {
            validateStatus: function (status) {
                return status
            }
        })

        /* Assert Get All Test Datasets */
        expect.soft(response.status).toBe(200)
    })

    for (const data of GET_TEST_DATASETS_BY_DATASET_ID) {
        test(`Get Test Dataset By Dataset ID ${data.TEST_NAME}`, async () => {

            let response, test_dataset_id

            if (data.CASE_TYPE == "POSITIVE") {

                const form = new FormData()
                form.append('files', fs.createReadStream(root_path + "/data/" + data.DATASET_NAME))

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

                /* Set Test Dataset ID */
                test_dataset_id = response.data[0].id

            }
            else {

                /* Set Test DATASET ID */
                test_dataset_id = data.TEST_DATASET_ID

            }

            /* Get Test Dataset By Model ID */
            response = await axios.get(url + ":" + port_number + "/test_datasets/" + test_dataset_id, {
                validateStatus: function (status) {
                    return status
                }
            })

            /* Assert Get Test Dataset By Dataset ID */
            expect.soft(response.data).toMatchObject(data.EXPECTED)
            expect.soft(response.status).toBe(data.STATUS)
        })
    }

    for (const data of PATCH_TEST_DATASETS_BY_DATASET_ID) {
        test(`Update Test Dataset By Dataset ID ${data.TEST_NAME}`, async () => {

            let response, test_dataset_id

            const form = new FormData()
            form.append('files', fs.createReadStream(root_path + "/data/" + data.DATASET_NAME))

            /* Upload Test Dataset Model */
            response = await axios.post(url + ":" + port_number + "/test_datasets/upload",
                form,
                {
                    headers: {
                        ...form.getHeaders(),
                        'accept': 'application/json',
                        'Content-Type': 'multipart/form-data'
                    },
                })

            /* Set Test Dataset ID */
            test_dataset_id = response.data[0].id

            /* Create Update Test Dataset By Dataset ID */
            const PATCH_TEST_DATASET_DATA = {
                name: "test",
                description: "test",
                dataColumns: [{
                    name: "file_name",
                    label: "test"
                }]
            }

            if (data.CASE_TYPE == "POSITIVE") {
                response = await axios.patch(url + ":" + port_number + "/test_datasets/" + test_dataset_id, PATCH_TEST_DATASET_DATA,
                    {
                        validateStatus: function (status) {
                            return status
                        }
                    }
                )

            }

            if (data.CASE_TYPE == "DATA_COLUMN_LABEL") {
                response = await axios.patch(url + ":" + port_number + "/test_datasets/" + test_dataset_id, {
                    dataColumns: [{
                        "name": "file_name",
                        "label": data.DATA_COLUMN_LABEL
                    }]
                },
                    {
                        validateStatus: function (status) {
                            return status
                        }
                    }
                )
            }

            if (data.CASE_TYPE == "DATA_COLUMN_NAME") {
                response = await axios.patch(url + ":" + port_number + "/test_datasets/" + test_dataset_id, {
                    dataColumns: [{
                        "name": data.DATA_COLUMN_NAME,
                        "label": "label"
                    }]
                },
                    {
                        validateStatus: function (status) {
                            return status
                        }
                    }
                )
            }

            if (data.CASE_TYPE == "DESCRIPTION") {
                response = await axios.patch(url + ":" + port_number + "/test_datasets/" + test_dataset_id, {
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
                response = await axios.patch(url + ":" + port_number + "/test_datasets/" + test_dataset_id, {
                    name: data.NAME
                },
                    {
                        validateStatus: function (status) {
                            return status
                        }
                    }
                )
            }

            /* Assert Update Test Dataset By Dataset ID */
            expect(response.data).toMatchObject(data.EXPECTED)
            expect(response.status).toBe(data.STATUS)

        })
    }

    for (const data of DELETE_TEST_DATASETS_BY_DATASET_ID) {
        test(`Delete Test Datasets By Dataset ID ${data.TEST_NAME}`, async () => {

            let response, test_dataset_id

            if (data.CASE_TYPE == "POSITIVE") {

                const form = new FormData()
                form.append('files', fs.createReadStream(root_path + "/data/" + data.DATASET_NAME))

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

                /* Set Test Dataset ID */
                test_dataset_id = response.data[0].id

            }
            else {

                /* Set Test Dataset ID */
                test_dataset_id = data.TEST_DATASET_ID

            }

            /* Delete Test Dataset By Dataset ID */
            response = await axios.delete(url + ":" + port_number + "/test_datasets/" + test_dataset_id, {
                validateStatus: function (status) {
                    return status
                }
            })

            /* Assert Delete Test Datasets By Dataset ID */
            expect.soft(response.data).toMatchObject(data.EXPECTED)
            expect.soft(response.status).toBe(data.STATUS)
        })
    }

    for (const data of DOWNLOAD_TEST_DATASETS_BY_DATASET_ID) {
        test(`Download Test Datasets By Dataset ID ${data.TEST_NAME}`, async () => {

            let response, test_dataset_id

            if (data.CASE_TYPE == "POSITIVE") {

                const form = new FormData()
                form.append('files', fs.createReadStream(root_path + "/data/" + data.DATASET_NAME))

                /* Upload Test Dataset Model */
                response = await axios.post(url + ":" + port_number + "/test_datasets/upload",
                    form,
                    {
                        headers: {
                            ...form.getHeaders(),
                            'accept': 'application/json',
                            'Content-Type': 'multipart/form-data'
                        },
                    })

                /* Set Test Dataset ID */
                test_dataset_id = response.data[0].id

            }
            else {

                /* Set Test Dataset ID */
                test_dataset_id = data.TEST_DATASET_ID
            }

            /* Download Test Dataset By Dataset ID */
            response = await axios.get(url + ":" + port_number + "/test_datasets/" + test_dataset_id + "/download", {
                validateStatus: function (status) {
                    return status
                }
            })

            /* Assert Delete Test Dataset By Dataset ID */
            if (data.CASE_TYPE != "POSITIVE")
                expect.soft(response.data).toMatchObject(data.EXPECTED)
            expect.soft(response.status).toBe(data.STATUS)
        })
    }
})