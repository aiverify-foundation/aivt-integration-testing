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
            { datasetName: "pickle_pandas_fashion_mnist_annotated_labels_10.sav" },
        ],

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
        { TEST_NAME: 'With Folder Arrays', FILETYPE: "FOLDER", FILES: ARRAY_OF_FILES[2], EXPECTED: { detail: [
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
        ]}, STATUS: 422 },
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
        { TEST_NAME: "With Null Teest Dataset ID", TEST_DATASET_ID: null, EXPECTED: { detail: [{ type: 'int_parsing', msg: 'Input should be a valid integer, unable to parse string as an integer', input: 'null' }] }, STATUS: 422 },
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