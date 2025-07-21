import { test, expect } from '@playwright/test'

import axios from 'axios'
import fs from 'fs'
import FormData from 'form-data'

const url = process.env.URL
const port_number = process.env.PORT_NUMBER
const root_path = process.env.ROOT_PATH

const STRING_4096_CHARACTERS = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin in malesuada elit. Fusce id commodo neque. Aliquam fermentum sem eget faucibus interdum. Donec vulputate pellentesque lectus, a commodo magna congue vitae. Quisque ullamcorper dolor vel consequat malesuada. Aenean est orci, porta ut mi eget, iaculis ultricies felis. Nulla elementum purus vel nisl pharetra, vitae iaculis dolor ornare. Nunc id augue vulputate, sollicitudin elit et, imperdiet nulla. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Cras interdum sodales ipsum. Quisque commodo diam lorem, eu vehicula felis tincidunt et. Mauris in enim faucibus massa rhoncus lobortis vitae vel urna. In velit enim, accumsan at lacus id, vehicula interdum quam. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.\
Curabitur vitae blandit arcu. In ut justo pulvinar, pharetra purus ut, gravida augue. Proin pharetra quam at lacus ultrices, in lobortis libero pellentesque. Vivamus eget ex a leo egestas mattis. Proin pellentesque nisl lacus, in convallis elit imperdiet non. Cras non enim non neque commodo fermentum. Quisque nec libero malesuada dui lobortis ultricies non eu tellus. Ut sit amet dictum dolor. Nulla dui lacus, imperdiet nec dapibus ut, rhoncus at eros. Vivamus sed lorem vulputate, pharetra lacus et, viverra metus. Fusce a pharetra leo. Nunc vel finibus orci.\
Etiam tempor, ante vitae porttitor tincidunt, enim nibh dignissim mi, a aliquam felis odio viverra turpis. Aliquam erat volutpat. Nunc pulvinar blandit risus. Mauris non lacus dolor. Curabitur et elit non nisl venenatis pretium. Integer sit amet dui vitae justo condimentum elementum. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Morbi pulvinar interdum dui, sit amet fringilla purus sodales eget. Duis sollicitudin, ante eu efficitur consectetur, mi leo volutpat libero, ut fermentum felis metus non felis. Mauris bibendum lacus libero, et suscipit ipsum dictum eu. Sed faucibus pharetra convallis. Nunc maximus nunc sit amet risus aliquet blandit. Duis tincidunt porta justo, id semper mi ullamcorper at. Integer ac molestie dui. Donec tempus ligula quis nunc ultrices scelerisque.\
In hac habitasse platea dictumst. Nulla facilisi. Pellentesque vulputate erat velit, sed varius magna ultricies nec. Pellentesque quis laoreet turpis, at bibendum magna. Curabitur hendrerit facilisis facilisis. Aliquam tortor nisi, rhoncus eget mi vel, imperdiet tempus eros. Quisque laoreet fringilla augue, at maximus lacus mollis et. Fusce commodo, purus eu efficitur ultricies, sapien lacus mattis elit, non consequat tellus justo in nibh. Aliquam dolor libero, aliquet et erat sit amet, eleifend tincidunt purus. Quisque id rhoncus dui. Aliquam egestas mattis nisi, et aliquam dui hendrerit vel. Cras in eros porttitor, volutpat eros ornare, ultrices lacus.\
Etiam nibh est, posuere in tincidunt eu, consequat sit amet diam. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Curabitur eget magna vel nisl vestibulum elementum. In sed felis rhoncus, sollicitudin est ac, finibus mi. Nunc porttitor magna ut feugiat consectetur. Donec at est maximus, facilisis libero eget, imperdiet eros. Pellentesque pretium aliquam interdum. Curabitur sed ullamcorper nunc. Etiam fermentum faucibus enim sit amet consectetur. Cras posuere diam non porta malesuada.\
Donec tempor ut eros vel hendrerit. Sed lobortis ex in ante mattis pharetra. Nullam imperdiet velit vitae fringilla vulputate. Morbi quis nisi lacus. Integer magna odio, finibus nec luctus sed, accumsan et lacus. Donec non hendrerit odio, nec fermentum felis. Maecenas dolor erat, euismod eget iaculis ut, iaculis vitae magna. Morbi nibh erat, facilisis in sollicitudin condimentum, ultricies at elit. Nunc bibendum purus rhoncus nibh faucibus cursus. Nunc condimentum, nisi in fermentum porttitor, nunc urna tincidunt sapien, sed imperdiet erat justo nec eros. Fusce et nulla in leo rutrum rutrum eget a tellus.\
Aliquam erat volutpat. Praesent sed arcu blandit, elementum lacus sed, sodales nunc. Phasellus ante velit, pulvinar ac nunc et, mattis tincidunt nisi. Ut congue aliquam efficitur. Duis vitae hendrerit nunc. Curabitur egestas dui vitae lorem laoreet, ut lacinia lectus laoreet. Vivamus ultricies turpis non metus scelerisque, ut laoreet eros dignissim. Nulla ut turpis nec elit ultricies bibendum nec eleifend lectus. Integer risus urna, gravida tempus ex eget, cursus interdum libero. Nunc ac sapien imperdiet, aliquet erat sit amet, dapibus lectus. Aliquam et metus quis ex rutrum elementum eget vitae metus. Curabitur nisi diam, sodales eget condimentum nec, aliquam ac velit. Aliquam dictum hendrerit commodo. Maecenas mattis ipsum lectus, sed efficitur sem mattis eu. Donec vitae dolor ullamcorper, congue nisi eu, egestas justo. Mauris scelerisque, nisi non mattis sagittis, mauris ante faucibus enim, sit amet ullamcorper ante nulla sed libero."

test.describe('Project', () => {

    test(`Get All Project`, async () => {
        const response = await axios.get(url + ":" + port_number + "/projects", {
            validateStatus: function (status) {
                return status
            }
        })

        /* Assert Get Project */
        expect.soft(response.data[0].globalVars).toBeTruthy()
        expect.soft(response.data[0].pages).toBeTruthy()
        expect.soft(response.data[0].id).toBeTruthy()
        expect.soft(response.data[0].templateId).toBeNull()
        expect.soft(response.data[0].projectInfo.company).toBeTruthy()
        expect.soft(response.data[0].projectInfo.description).toBeTruthy()
        expect.soft(response.data[0].projectInfo.name).toBeTruthy()
        expect.soft(response.data[0].projectInfo.reportTitle).toBeTruthy()
        expect.soft(response.data[0].inputBlocks).toBeTruthy()
        expect.soft(response.data[0].testResults).toBeTruthy()
        expect.soft(response.data[0].created_at).toBeTruthy()
        expect.soft(response.data[0].updated_at).toBeTruthy()

        expect.soft(response.data[1].globalVars).toBeTruthy()
        expect.soft(response.data[1].pages).toBeTruthy()
        expect.soft(response.data[1].id).toBeTruthy()
        expect.soft(response.data[1].templateId).toBeNull()
        expect.soft(response.data[1].projectInfo.company).toBeTruthy()
        expect.soft(response.data[1].projectInfo.description).toBeTruthy()
        expect.soft(response.data[1].projectInfo.name).toBeTruthy()
        expect.soft(response.data[1].projectInfo.reportTitle).toBeTruthy()
        expect.soft(response.data[1].testModelId).toBeNull()
        expect.soft(response.data[1].inputBlocks).toBeTruthy()
        expect.soft(response.data[1].testResults).toBeTruthy()
        expect.soft(response.data[1].created_at).toBeTruthy()
        expect.soft(response.data[1].updated_at).toBeTruthy()

        expect.soft(response.status).toBe(200)
    })

    const CREATE_PROJECT = [
        { TEST_NAME: "With Name Character Length <= 128 Characters With Description With Report Title With Company Name", CASE_TYPE: "POSITIVE", COMPANY: "Company ABC", DESCRIPTION: "My Test Project Description", NAME: "My Test Project", REPORT_TITLE: "My Report Title", STATUS: 200 },
        { TEST_NAME: "With Name Character Length <= 128 Characters With Description With Report Title With Company Name Integer", CASE_TYPE: "NEGATIVE", COMPANY: 123, DESCRIPTION: "My Test Project Description", NAME: "My Test Project", REPORT_TITLE: "My Report Title", EXPECTED: [{ type: 'string_type', loc: ['body', 'company'], msg: 'Input should be a valid string', input: 123 }], STATUS: 422 },
        { TEST_NAME: "With Name Character Length <= 128 Characters With Description With Report Title With Company Name Float", CASE_TYPE: "NEGATIVE", COMPANY: 12.3, DESCRIPTION: "My Test Project Description", NAME: "My Test Project", REPORT_TITLE: "My Report Title", EXPECTED: [{ type: 'string_type', loc: ['body', 'company'], msg: 'Input should be a valid string', input: 12.3 }], STATUS: 422 },
        { TEST_NAME: "With Name Character Length <= 128 Characters With Description With Report Title With Company Name Boolean", CASE_TYPE: "NEGATIVE", COMPANY: true, DESCRIPTION: "My Test Project Description", NAME: "My Test Project", REPORT_TITLE: "My Report Title", EXPECTED: [{ type: 'string_type', loc: ['body', 'company'], msg: 'Input should be a valid string', input: true }], STATUS: 422 },
        { TEST_NAME: "With Name Character Length <= 128 Characters With Description With Report Title With Company Name Empty", CASE_TYPE: "POSITIVE", COMPANY: "", DESCRIPTION: "My Test Project Description", NAME: "My Test Project", REPORT_TITLE: "My Report Title", STATUS: 200 },
        { TEST_NAME: "With Name Character Length <= 128 Characters With Description With Report Title With Company Name Null", CASE_TYPE: "POSITIVE", COMPANY: null, DESCRIPTION: "My Test Project Description", NAME: "My Test Project", REPORT_TITLE: "My Report Title", STATUS: 200 },
        { TEST_NAME: "With Name Character Length <= 128 Characters With Description With Report Title Integer With Company Name", CASE_TYPE: "NEGATIVE", COMPANY: "Company ABC", DESCRIPTION: "My Test Project Description", NAME: "My Test Project", REPORT_TITLE: 123, EXPECTED: [{ type: 'string_type', loc: ['body', 'reportTitle'], msg: 'Input should be a valid string', input: 123 }], STATUS: 422 },
        { TEST_NAME: "With Name Character Length <= 128 Characters With Description With Report Title Float With Company Name", CASE_TYPE: "NEGATIVE", COMPANY: "Company ABC", DESCRIPTION: "My Test Project Description", NAME: "My Test Project", REPORT_TITLE: 12.3, EXPECTED: [{ type: 'string_type', loc: ['body', 'reportTitle'], msg: 'Input should be a valid string', input: 12.3 }], STATUS: 422 },
        { TEST_NAME: "With Name Character Length <= 128 Characters With Description With Report Title Boolean With Company Name", CASE_TYPE: "NEGATIVE", COMPANY: "Company ABC", DESCRIPTION: "My Test Project Description", NAME: "My Test Project", REPORT_TITLE: true, EXPECTED: [{ type: 'string_type', loc: ['body', 'reportTitle'], msg: 'Input should be a valid string', input: true }], STATUS: 422 },
        { TEST_NAME: "With Name Character Length <= 128 Characters With Description With Report Title Empty With Company Name", CASE_TYPE: "NEGATIVE", COMPANY: "Company ABC", DESCRIPTION: "My Test Project Description", NAME: "My Test Project", REPORT_TITLE: "", EXPECTED: [{ type: 'string_too_short', msg: 'String should have at least 1 character'}], STATUS: 422 },
        { TEST_NAME: "With Name Character Length <= 128 Characters With Description With Report Title Null With Company Name", CASE_TYPE: "POSITIVE", COMPANY: "Company ABC", DESCRIPTION: "My Test Project Description", NAME: "My Test Project", REPORT_TITLE: null, STATUS: 200 },
        { TEST_NAME: "With Name Character Length <= 128 Characters With Description > 4096 Characters With Report Title With Company Name", CASE_TYPE: "NEGATIVE", COMPANY: "Company ABC", DESCRIPTION: STRING_4096_CHARACTERS, NAME: "My Test Project", REPORT_TITLE: "My Report Title", EXPECTED: [{ type: 'string_too_long', loc: ['body', 'description'], msg: "String should have at most 4096 characters", input: STRING_4096_CHARACTERS, ctx: { max_length: 4096 } }], STATUS: 422 },
        { TEST_NAME: "With Name Character Length <= 128 Characters With Description Integer With Report Title With Company Name", CASE_TYPE: "NEGATIVE", COMPANY: "Company ABC", DESCRIPTION: 123, NAME: "My Test Project", REPORT_TITLE: "My Report Title", EXPECTED: [{ type: 'string_type', loc: ['body', 'description'], msg: 'Input should be a valid string', input: 123 }], STATUS: 422 },
        { TEST_NAME: "With Name Character Length <= 128 Characters With Description Float With Report Title With Company Name", CASE_TYPE: "NEGATIVE", COMPANY: "Company ABC", DESCRIPTION: 12.3, NAME: "My Test Project", REPORT_TITLE: "My Report Title", EXPECTED: [{ type: 'string_type', loc: ['body', 'description'], msg: 'Input should be a valid string', input: 12.3 }], STATUS: 422 },
        { TEST_NAME: "With Name Character Length <= 128 Characters With Description Boolean With Report Title With Company Name", CASE_TYPE: "NEGATIVE", COMPANY: "Company ABC", DESCRIPTION: true, NAME: "My Test Project", REPORT_TITLE: "My Report Title", EXPECTED: [{ type: 'string_type', loc: ['body', 'description'], msg: 'Input should be a valid string', input: true }], STATUS: 422 },
        { TEST_NAME: "With Name Character Length <= 128 Characters With Description Empty With Report Title With Company Name", CASE_TYPE: "NEGATIVE", COMPANY: "Company ABC", DESCRIPTION: "", NAME: "My Test Project", REPORT_TITLE: "My Report Title", EXPECTED: [{ type: 'string_too_short', msg: 'String should have at least 1 character' }], STATUS: 422 },
        { TEST_NAME: "With Name Character Length <= 128 Characters With Description Null With Report Title With Company Name", CASE_TYPE: "POSITIVE", COMPANY: "Company ABC", DESCRIPTION: null, NAME: "My Test Project", REPORT_TITLE: "My Report Title", STATUS: 200 },
        { TEST_NAME: "With Name Character Length > 128 Characters With Description With Report Title With Company Name", CASE_TYPE: "NEGATIVE", COMPANY: "Company ABC", DESCRIPTION: "My Test Project Description", NAME: STRING_4096_CHARACTERS, REPORT_TITLE: "My Report Title", EXPECTED: [{ type: 'string_too_long', loc: ['body', 'name'], msg: 'String should have at most 256 characters', input: STRING_4096_CHARACTERS, ctx: { max_length: 256 } }], STATUS: 422 },
        { TEST_NAME: "With Name Character Length Integer With Description With Report Title With Company Name", CASE_TYPE: "NEGATIVE", COMPANY: "Company ABC", DESCRIPTION: "My Test Project Description", NAME: 123, REPORT_TITLE: "My Report Title", EXPECTED: [{ type: 'string_type', loc: ['body', 'name'], msg: 'Input should be a valid string', input: 123 }], STATUS: 422 },
        { TEST_NAME: "With Name Character Length Float With Description With Report Title With Company Name", CASE_TYPE: "NEGATIVE", COMPANY: "Company ABC", DESCRIPTION: "My Test Project Description", NAME: 12.3, REPORT_TITLE: "My Report Title", EXPECTED: [{ type: 'string_type', loc: ['body', 'name'], msg: 'Input should be a valid string', input: 12.3 }], STATUS: 422 },
        { TEST_NAME: "With Name Character Length Boolean With Description With Report Title With Company Name", CASE_TYPE: "NEGATIVE", COMPANY: "Company ABC", DESCRIPTION: "My Test Project Description", NAME: true, REPORT_TITLE: "My Report Title", EXPECTED: [{ type: 'string_type', loc: ['body', 'name'], msg: 'Input should be a valid string', input: true }], STATUS: 422 },
        { TEST_NAME: "With Name Character Length Empty With Description With Report Title With Company Name", CASE_TYPE: "NEGATIVE", COMPANY: "Company ABC", DESCRIPTION: "My Test Project Description", NAME: "", REPORT_TITLE: "My Report Title", EXPECTED: [{ type: "string_too_short", loc: [ "body", "name" ], msg: "String should have at least 1 character", input: "", ctx: { min_length: 1 } }], STATUS: 422 },
        { TEST_NAME: "With Name Character Length Null With Description With Report Title With Company Name", CASE_TYPE: "NEGATIVE", COMPANY: "Company ABC", DESCRIPTION: "My Test Project Description", NAME: null, REPORT_TITLE: "My Report Title", EXPECTED: [{ type: 'string_type', loc: ['body', 'name'], msg: 'Input should be a valid string', input: null }], STATUS: 422 },
        { TEST_NAME: "With Name Character Length No Value With Description With Report Title With Company Name", CASE_TYPE: "NEGATIVE", COMPANY: "Company ABC", DESCRIPTION: "My Test Project Description", REPORT_TITLE: "My Report Title", EXPECTED: [{ type: 'missing', loc: ['body', 'name'], msg: 'Field required', input: { "company": "Company ABC", "description": "My Test Project Description", "reportTitle": "My Report Title", } }], STATUS: 422 },
    ]

    for (const data of CREATE_PROJECT) {

        const PROJECT_INFO_DATA = {
            "company": data.COMPANY,
            "description": data.DESCRIPTION,
            "name": data.NAME,
            "reportTitle": data.REPORT_TITLE
        }

        test(`Create Project ${data.TEST_NAME}`, async () => {
            const response = await axios.post(url + ":" + port_number + "/projects", PROJECT_INFO_DATA, {
                validateStatus: function (status) {
                    return status
                }
            })

            if (data.CASE_TYPE == "POSITIVE") {

                /* Assert Create Project */
                expect.soft(response.data.globalVars).toBeTruthy()
                expect.soft(response.data.pages).toBeTruthy()
                expect.soft(response.data.id).toBe
                expect.soft(response.data.templateId).toBeNull()
                expect.soft(response.data.projectInfo.company).toBe(PROJECT_INFO_DATA.company)
                expect.soft(response.data.projectInfo.description).toBe(PROJECT_INFO_DATA.description)
                expect.soft(response.data.projectInfo.name).toBe(PROJECT_INFO_DATA.name)
                expect.soft(response.data.projectInfo.reportTitle).toBe(PROJECT_INFO_DATA.reportTitle)
                expect.soft(response.data.testModelId).toBeNull()
                expect.soft(response.data.inputBlocks).toBeTruthy()
                expect.soft(response.data.testResults).toBeTruthy()
                expect.soft(response.data.created_at).toBeTruthy()
                expect.soft(response.data.updated_at).toBeTruthy()

                expect.soft(response.status).toBe(data.STATUS)

            }

            if (data.CASE_TYPE == "NEGATIVE") {

                /* Assert Create Project */
                expect.soft(response.data.detail).toMatchObject(data.EXPECTED)
                expect.soft(response.status).toBe(data.STATUS)

            }
        })
    }

    const GET_PROJECT_BY_PROJECT_ID = [
        { TEST_NAME: "With Existing Project Id", CASE_TYPE: "POSITIVE", STATUS: 200 },
        { TEST_NAME: "With Non-Existing Project Id", CASE_TYPE: "NEGATIVE", PROJECT_ID: 100000000000000, EXPECTED: { detail: 'Project not found' }, STATUS: 404 },
        { TEST_NAME: "With String Project Id", CASE_TYPE: "NEGATIVE", PROJECT_ID: "abc", EXPECTED: { detail: [{ type: 'int_parsing', loc: ['path', 'project_id'], msg: 'Input should be a valid integer, unable to parse string as an integer', input: 'abc' }] }, STATUS: 422 },
        { TEST_NAME: "With Float Project Id", CASE_TYPE: "NEGATIVE", PROJECT_ID: 12.3, EXPECTED: { detail: [{ type: 'int_parsing', loc: ['path', 'project_id'], msg: 'Input should be a valid integer, unable to parse string as an integer', input: '12.3' }] }, STATUS: 422 },
        { TEST_NAME: "With Boolean Project Id", CASE_TYPE: "NEGATIVE", PROJECT_ID: true, EXPECTED: { detail: [{ type: 'int_parsing', loc: ['path', 'project_id'], msg: 'Input should be a valid integer, unable to parse string as an integer', input: 'true' }] }, STATUS: 422 },
        { TEST_NAME: "With Null Project Id", CASE_TYPE: "NEGATIVE", PROJECT_ID: null, EXPECTED: { detail: [{ type: 'int_parsing', loc: ['path', 'project_id'], msg: 'Input should be a valid integer, unable to parse string as an integer', input: 'null' }] }, STATUS: 422 },
        { TEST_NAME: "With No Value Project Id", CASE_TYPE: "NEGATIVE", EXPECTED: { detail: [{ type: 'int_parsing', loc: ['path', 'project_id'], msg: 'Input should be a valid integer, unable to parse string as an integer', input: 'undefined' }] }, STATUS: 422 }
    ]

    for (const data of GET_PROJECT_BY_PROJECT_ID) {

        const PROJECT_INFO_DATA = {
            "company": "Company ABC",
            "description": "My Test Project Description",
            "name": "My Test Project",
            "reportTitle": "My Report Title"
        }

        test(`Get Project By Project Id ${data.TEST_NAME}`, async () => {

            let response

            if (data.CASE_TYPE == "POSITIVE") {

                /* Create Project */
                response = await axios.post(url + ":" + port_number + "/projects", PROJECT_INFO_DATA, {
                    validateStatus: function (status) {
                        return status
                    }
                })

                /* Set Project ID */
                const project_id = response.data.id

                /* Get Project By Id */
                response = await axios.get(url + ":" + port_number + "/projects/" + project_id, {
                    validateStatus: function (status) {
                        return status
                    }
                })

                /* Assert Get Project By ID */
                expect.soft(response.data.globalVars).toBeTruthy()
                expect.soft(response.data.pages).toBeTruthy()
                expect.soft(response.data.id).toBeTruthy()
                expect.soft(response.data.templateId).toBeNull()
                expect.soft(response.data.projectInfo.company).toBe(PROJECT_INFO_DATA.company)
                expect.soft(response.data.projectInfo.description).toBe(PROJECT_INFO_DATA.description)
                expect.soft(response.data.projectInfo.name).toBe(PROJECT_INFO_DATA.name)
                expect.soft(response.data.projectInfo.reportTitle).toBe(PROJECT_INFO_DATA.reportTitle)
                expect.soft(response.data.testModelId).toBeNull()
                expect.soft(response.data.inputBlocks).toBeTruthy()
                expect.soft(response.data.testResults).toBeTruthy()
                expect.soft(response.data.created_at).toBeTruthy()
                expect.soft(response.data.updated_at).toBeTruthy()

                expect.soft(response.status).toBe(data.STATUS)

            }

            if (data.CASE_TYPE == "NEGATIVE") {

                /* Set Project ID */
                const project_id = data.PROJECT_ID

                /* Get Project By Id */
                response = await axios.get(url + ":" + port_number + "/projects/" + project_id, {
                    validateStatus: function (status) {
                        return status
                    }
                })

                /* Assert Get Project By ID */
                expect.soft(response.data).toMatchObject(data.EXPECTED)
                expect.soft(response.status).toBe(data.STATUS)

            }
        })
    }

    const UPDATE_PROJECT_BY_PROJECT_ID = [
        { TEST_NAME: "With Existing Project Id With Valid Global Vars With Valid Pages With Valid Project Info With Valid Test Model Id With Valid Input Blocks With Valid Test Results", CASE_TYPE: "POSITIVE", MODEL_NAME: "sample_bc_credit_sklearn_linear.LogisticRegression.sav", MODEL_PATH: root_path + "/model/sample_bc_credit_sklearn_linear.LogisticRegression.sav", MODEL_TYPE: "classification", INPUT_BLOCK: { "gid": "aiverify.stock.fairness_metrics_toolbox_for_classification", "cid": "fairness_tree", "name": "testing", "data": { "sensitiveFeature": "gender", "favourableOutcomeName": "loan", "qualified": "non-reoffenders", "unqualified": "reoffenders", "metrics": ["Equal Parity"], "selections": { "nodes": ["n1.1", "n2", "n2.1"], "edges": ["n2-n2.1"] }, "selectedOutcomes": ["n1.1"], "ans-n1.1": "answer for first n1.1", "ans-n2": "answer for percentage" } }, ARTIFACT_PATH: root_path + "/test_results/output-image-standalone.zip", ARTIFACT_NAME: "output-image-standalone.zip", STATUS: 200 },
        { TEST_NAME: "With Existing Project Id With Valid Global Vars With Valid Pages With Valid Project Info With Valid Test Model Id With Valid Input Blocks With Test Results Non Array Object Items", CASE_TYPE: "NEGATIVE", PROJECT_ID: 1, GLOBAL_VARS: [{ key: "Company Name", value: "ABC Company" }], PAGES: [], PROJECT_INFO_DATA: { "company": "Company ABC", "description": "My Test Project Description", "name": "My Test Project", "reportTitle": "My Report Title" }, TEST_MODEL_ID: 17, INPUT_BLOCK: [1], TEST_RESULT: 1, EXPECTED: { detail: [{ type: 'list_type', loc: ['body', 'testResults'], msg: 'Input should be a valid list', input: 1 }] }, STATUS: 422 },
        { TEST_NAME: "With Existing Project Id With Valid Global Vars With Valid Pages With Valid Project Info With Valid Test Model Id With Valid Input Blocks With Test Results String", CASE_TYPE: "NEGATIVE", PROJECT_ID: 1, GLOBAL_VARS: [{ key: "Company Name", value: "ABC Company" }], PAGES: [], PROJECT_INFO_DATA: { "company": "Company ABC", "description": "My Test Project Description", "name": "My Test Project", "reportTitle": "My Report Title" }, TEST_MODEL_ID: 17, INPUT_BLOCK: [1], TEST_RESULT: ["abc"], EXPECTED: { detail: [{ type: 'int_type', loc: ['body', 'testResults', 0], msg: 'Input should be a valid integer', input: "abc" }] }, STATUS: 422 },
        { TEST_NAME: "With Existing Project Id With Valid Global Vars With Valid Pages With Valid Project Info With Valid Test Model Id With Valid Input Blocks With Test Results Float", CASE_TYPE: "NEGATIVE", PROJECT_ID: 1, GLOBAL_VARS: [{ key: "Company Name", value: "ABC Company" }], PAGES: [], PROJECT_INFO_DATA: { "company": "Company ABC", "description": "My Test Project Description", "name": "My Test Project", "reportTitle": "My Report Title" }, TEST_MODEL_ID: 17, INPUT_BLOCK: [1], TEST_RESULT: [12.3], EXPECTED: { detail: [{ type: 'int_type', loc: ['body', 'testResults', 0], msg: 'Input should be a valid integer', input: 12.3 }] }, STATUS: 422 },
        { TEST_NAME: "With Existing Project Id With Valid Global Vars With Valid Pages With Valid Project Info With Valid Test Model Id With Valid Input Blocks With Test Results Boolean", CASE_TYPE: "NEGATIVE", PROJECT_ID: 1, GLOBAL_VARS: [ { key: "Company Name", value: "ABC Company" } ], PAGES: [], PROJECT_INFO_DATA: { "company": "Company ABC", "description": "My Test Project Description", "name": "My Test Project", "reportTitle": "My Report Title" }, TEST_MODEL_ID: 17, INPUT_BLOCK: [1], TEST_RESULT: [true], EXPECTED: { "detail": [{ "type": "int_type", "loc": [ "body", "testResults", 0 ], "msg": "Input should be a valid integer", "input": true }]}, STATUS: 422 },
        { TEST_NAME: "With Existing Project Id With Valid Global Vars With Valid Pages With Valid Project Info With Valid Test Model Id With Valid Input Blocks With Test Results Empty", CASE_TYPE: "NEGATIVE", PROJECT_ID: 1, GLOBAL_VARS: [{ key: "Company Name", value: "ABC Company" }], PAGES: [], PROJECT_INFO_DATA: { "company": "Company ABC", "description": "My Test Project Description", "name": "My Test Project", "reportTitle": "My Report Title" }, TEST_MODEL_ID: 17, INPUT_BLOCK: [1], TEST_RESULT: [""], EXPECTED: { detail: [{ type: 'int_type', loc: ['body', 'testResults', 0], msg: 'Input should be a valid integer', input: "" }] }, STATUS: 422 },
        { TEST_NAME: "With Existing Project Id With Valid Global Vars With Valid Pages With Valid Project Info With Valid Test Model Id With Valid Input Blocks With Test Results Null", CASE_TYPE: "NEGATIVE", PROJECT_ID: 1, GLOBAL_VARS: [{ key: "Company Name", value: "ABC Company" }], PAGES: [], PROJECT_INFO_DATA: { "company": "Company ABC", "description": "My Test Project Description", "name": "My Test Project", "reportTitle": "My Report Title" }, TEST_MODEL_ID: 17, INPUT_BLOCK: [1], TEST_RESULT: [null], EXPECTED: { detail: [{ type: 'int_type', loc: ['body', 'testResults', 0], msg: 'Input should be a valid integer', input: null }] }, STATUS: 422 },
        { TEST_NAME: "With Existing Project Id With Valid Global Vars With Valid Pages With Valid Project Info With Valid Test Model Id With Valid Input Blocks With Test Results No Values", CASE_TYPE: "NEGATIVE", PROJECT_ID: 1, GLOBAL_VARS: [{ key: "Company Name", value: "ABC Company" }], PAGES: [], PROJECT_INFO_DATA: { "company": "Company ABC", "description": "My Test Project Description", "name": "My Test Project", "reportTitle": "My Report Title" }, TEST_MODEL_ID: 17, INPUT_BLOCK: [17], EXPECTED: { globalVars: [{ key: 'Company Name', value: 'ABC Company' }], pages: [], id: 1, templateId: null, projectInfo: { name: 'My Test Project', description: 'My Test Project Description', reportTitle: 'My Report Title', company: 'Company ABC' }, testModelId: 17, inputBlocks: [{ gid: 'aiverify.stock.fairness_metrics_toolbox_for_classification', cid: 'fairness_tree', id: 17 }], testResults: [], }, STATUS: 200 },
        { TEST_NAME: "With Existing Project Id With Valid Global Vars With Valid Pages With Valid Project Info With Valid Test Model Id With Input Blocks Non Array Object Items With Valid Test Results", CASE_TYPE: "NEGATIVE", PROJECT_ID: 1, GLOBAL_VARS: [{ key: "Company Name", value: "ABC Company" }], PAGES: [], PROJECT_INFO_DATA: { "company": "Company ABC", "description": "My Test Project Description", "name": "My Test Project", "reportTitle": "My Report Title" }, TEST_MODEL_ID: 17, INPUT_BLOCK: 1, TEST_RESULT: [1], EXPECTED: { detail: [{ type: 'list_type', loc: ['body', 'inputBlocks'], msg: 'Input should be a valid list', input: 1 }] }, STATUS: 422 },
        { TEST_NAME: "With Existing Project Id With Valid Global Vars With Valid Pages With Valid Project Info With Valid Test Model Id With Input Blocks String With Valid Test Results", CASE_TYPE: "NEGATIVE", PROJECT_ID: 1, GLOBAL_VARS: [{ key: "Company Name", value: "ABC Company" }], PAGES: [], PROJECT_INFO_DATA: { "company": "Company ABC", "description": "My Test Project Description", "name": "My Test Project", "reportTitle": "My Report Title" }, TEST_MODEL_ID: 17, INPUT_BLOCK: ["abc"], TEST_RESULT: [1], EXPECTED: { detail: [{ type: 'int_type', loc: ['body', 'inputBlocks', 0], msg: 'Input should be a valid integer', input: "abc" }] }, STATUS: 422 },
        { TEST_NAME: "With Existing Project Id With Valid Global Vars With Valid Pages With Valid Project Info With Valid Test Model Id With Input Blocks Float With Valid Test Results", CASE_TYPE: "NEGATIVE", PROJECT_ID: 1, GLOBAL_VARS: [{ key: "Company Name", value: "ABC Company" }], PAGES: [], PROJECT_INFO_DATA: { "company": "Company ABC", "description": "My Test Project Description", "name": "My Test Project", "reportTitle": "My Report Title" }, TEST_MODEL_ID: 17, INPUT_BLOCK: [12.3], TEST_RESULT: [1], EXPECTED: { detail: [{ type: 'int_type', loc: ['body', 'inputBlocks', 0], msg: 'Input should be a valid integer', input: 12.3 }] }, STATUS: 422 },
        { TEST_NAME: "With Existing Project Id With Valid Global Vars With Valid Pages With Valid Project Info With Valid Test Model Id With Input Blocks Boolean With Valid Test Results", CASE_TYPE: "NEGATIVE", PROJECT_ID: 1, GLOBAL_VARS: [ { key: "Company Name", value: "ABC Company" } ], PAGES: [], PROJECT_INFO_DATA: { "company": "Company ABC", "description": "My Test Project Description", "name": "My Test Project", "reportTitle": "My Report Title" }, TEST_MODEL_ID: 17, INPUT_BLOCK: [true], TEST_RESULT: [1], EXPECTED: { detail: [{ type: "int_type", loc: [ "body", "inputBlocks", 0 ], msg: "Input should be a valid integer", input: true }]}, STATUS: 422 },
        { TEST_NAME: "With Existing Project Id With Valid Global Vars With Valid Pages With Valid Project Info With Valid Test Model Id With Input Blocks Empty With Valid Test Results", CASE_TYPE: "NEGATIVE", PROJECT_ID: 1, GLOBAL_VARS: [{ key: "Company Name", value: "ABC Company" }], PAGES: [], PROJECT_INFO_DATA: { "company": "Company ABC", "description": "My Test Project Description", "name": "My Test Project", "reportTitle": "My Report Title" }, TEST_MODEL_ID: 17, INPUT_BLOCK: [""], TEST_RESULT: [1], EXPECTED: { detail: [{ type: 'int_type', loc: ['body', 'inputBlocks', 0], msg: 'Input should be a valid integer', input: "" }] }, STATUS: 422 },
        { TEST_NAME: "With Existing Project Id With Valid Global Vars With Valid Pages With Valid Project Info With Valid Test Model Id With Input Blocks Null With Valid Test Results", CASE_TYPE: "NEGATIVE", PROJECT_ID: 1, GLOBAL_VARS: [{ key: "Company Name", value: "ABC Company" }], PAGES: [], PROJECT_INFO_DATA: { "company": "Company ABC", "description": "My Test Project Description", "name": "My Test Project", "reportTitle": "My Report Title" }, TEST_MODEL_ID: 17, INPUT_BLOCK: [null], TEST_RESULT: [1], EXPECTED: { detail: [{ type: 'int_type', loc: ['body', 'inputBlocks', 0], msg: 'Input should be a valid integer', input: null }] }, STATUS: 422 },
        { TEST_NAME: "With Existing Project Id With Valid Global Vars With Valid Pages With Valid Project Info With Valid Test Model Id With Input Blocks No Values With Valid Test Results", CASE_TYPE: "NEGATIVE", PROJECT_ID: 1, GLOBAL_VARS: [{ key: "Company Name", value: "ABC Company" }], PAGES: [], PROJECT_INFO_DATA: { "company": "Company ABC", "description": "My Test Project Description", "name": "My Test Project", "reportTitle": "My Report Title" }, TEST_MODEL_ID: 17, TEST_RESULT: [2], EXPECTED: { globalVars: [{ key: 'Company Name', value: 'ABC Company' }], pages: [], id: 1, templateId: null, projectInfo: { name: 'My Test Project', description: 'My Test Project Description', reportTitle: 'My Report Title', company: 'Company ABC' }, testModelId: 17, inputBlocks: [], testResults: [{ gid: 'aiverify.stock.fairness_metrics_toolbox_for_classification', cid: 'fairness_metrics_toolbox_for_classification', id: 2 }], }, STATUS: 200 },
        { TEST_NAME: "With Existing Project Id With Valid Global Vars With Valid Pages With Valid Project Info With Non-Existing Test Model Id With Valid Input Blocks With Valid Test Results", CASE_TYPE: "NEGATIVE", PROJECT_ID: 1, GLOBAL_VARS: [{ key: "Company Name", value: "ABC Company" }], PAGES: [], PROJECT_INFO_DATA: { "company": "Company ABC", "description": "My Test Project Description", "name": "My Test Project", "reportTitle": "My Report Title" }, TEST_MODEL_ID: 100000000000000, INPUT_BLOCK: [1], TEST_RESULT: [1], EXPECTED: { detail: "Test model 100000000000000 not found" }, STATUS: 404 },
        { TEST_NAME: "With Existing Project Id With Valid Global Vars With Valid Pages With Valid Project Info With Test Model Id String With Valid Input Blocks With Valid Test Results", CASE_TYPE: "NEGATIVE", PROJECT_ID: 1, GLOBAL_VARS: [{ key: "Company Name", value: "ABC Company" }], PAGES: [], PROJECT_INFO_DATA: { "company": "Company ABC", "description": "My Test Project Description", "name": "My Test Project", "reportTitle": "My Report Title" }, TEST_MODEL_ID: 'abc', INPUT_BLOCK: [1], TEST_RESULT: [1], EXPECTED: { detail: [{ type: 'int_type', loc: ['body', 'testModelId'], msg: 'Input should be a valid integer', input: "abc" }] }, STATUS: 422 },
        { TEST_NAME: "With Existing Project Id With Valid Global Vars With Valid Pages With Valid Project Info With Test Model Id Float With Valid Input Blocks With Valid Test Results", CASE_TYPE: "NEGATIVE", PROJECT_ID: 1, GLOBAL_VARS: [{ key: "Company Name", value: "ABC Company" }], PAGES: [], PROJECT_INFO_DATA: { "company": "Company ABC", "description": "My Test Project Description", "name": "My Test Project", "reportTitle": "My Report Title" }, TEST_MODEL_ID: 12.3, INPUT_BLOCK: [1], TEST_RESULT: [1], EXPECTED: { detail: [{ type: 'int_type', loc: ['body', 'testModelId'], msg: 'Input should be a valid integer', input: 12.3 }] }, STATUS: 422 },
        { TEST_NAME: "With Existing Project Id With Valid Global Vars With Valid Pages With Valid Project Info With Test Model Id Boolean With Valid Input Blocks With Valid Test Results", CASE_TYPE: "NEGATIVE", PROJECT_ID: 1, GLOBAL_VARS: [ { key: "Company Name", value: "ABC Company" } ], PAGES: [], PROJECT_INFO_DATA: { "company": "Company ABC", "description": "My Test Project Description", "name": "My Test Project", "reportTitle": "My Report Title" }, TEST_MODEL_ID: true, INPUT_BLOCK: [1], TEST_RESULT: [1], EXPECTED: { detail: [{ type: "int_type", loc: [ "body", "testModelId" ], msg: "Input should be a valid integer", input: true }]}, STATUS: 422 },
        { TEST_NAME: "With Existing Project Id With Valid Global Vars With Valid Pages With Valid Project Info With Test Model Id Empty With Valid Input Blocks With Valid Test Results", CASE_TYPE: "NEGATIVE", PROJECT_ID: 1, GLOBAL_VARS: [{ key: "Company Name", value: "ABC Company" }], PAGES: [], PROJECT_INFO_DATA: { "company": "Company ABC", "description": "My Test Project Description", "name": "My Test Project", "reportTitle": "My Report Title" }, TEST_MODEL_ID: "", INPUT_BLOCK: [1], TEST_RESULT: [1], EXPECTED: { detail: [{ type: 'int_type', loc: ['body', 'testModelId'], msg: 'Input should be a valid integer', input: "" }] }, STATUS: 422 },
        { TEST_NAME: "With Existing Project Id With Valid Global Vars With Valid Pages With Valid Project Info With Test Model Id Null With Valid Input Blocks With Valid Test Results", CASE_TYPE: "NEGATIVE", PROJECT_ID: 1, GLOBAL_VARS: [{ key: "Company Name", value: "ABC Company" }], PAGES: [], PROJECT_INFO_DATA: { "company": "Company ABC", "description": "My Test Project Description", "name": "My Test Project", "reportTitle": "My Report Title" }, TEST_MODEL_ID: null, INPUT_BLOCK: [17], TEST_RESULT: [2], EXPECTED: { globalVars: [{ key: 'Company Name', value: 'ABC Company' }], pages: [], id: 1, templateId: null, projectInfo: { name: 'My Test Project', description: 'My Test Project Description', reportTitle: 'My Report Title', company: 'Company ABC' }, testModelId: null, inputBlocks: [{ gid: 'aiverify.stock.fairness_metrics_toolbox_for_classification', cid: 'fairness_tree', id: 17 }], testResults: [{ gid: 'aiverify.stock.fairness_metrics_toolbox_for_classification', cid: 'fairness_metrics_toolbox_for_classification', id: 2 }] }, STATUS: 200 },
        { TEST_NAME: "With Existing Project Id With Valid Global Vars With Valid Pages With Valid Project Info With Test Model Id No Values With Valid Input Blocks With Valid Test Results", CASE_TYPE: "NEGATIVE", PROJECT_ID: 1, GLOBAL_VARS: [{ key: "Company Name", value: "ABC Company" }], PAGES: [], PROJECT_INFO_DATA: { "company": "Company ABC", "description": "My Test Project Description", "name": "My Test Project", "reportTitle": "My Report Title" }, INPUT_BLOCK: [17], TEST_RESULT: [2], EXPECTED: { globalVars: [{ key: 'Company Name', value: 'ABC Company' }], pages: [], id: 1, templateId: null, projectInfo: { name: 'My Test Project', description: 'My Test Project Description', reportTitle: 'My Report Title', company: 'Company ABC' }, testModelId: null, inputBlocks: [{ gid: 'aiverify.stock.fairness_metrics_toolbox_for_classification', cid: 'fairness_tree', id: 17 }], testResults: [{ gid: 'aiverify.stock.fairness_metrics_toolbox_for_classification', cid: 'fairness_metrics_toolbox_for_classification', id: 2 }] }, STATUS: 200 },
        { TEST_NAME: "With Existing Project Id With Valid Global Vars With Valid Pages With Project Info Name Characters > 256 Characters With Valid Test Model Id With Valid Input Blocks With With Valid Test Results", CASE_TYPE: "NEGATIVE", PROJECT_ID: 1, GLOBAL_VARS: [{ key: "Company Name", value: "ABC Company" }], PAGES: [], PROJECT_INFO_DATA: { "company": "Company ABC", "description": "My Test Project Description", "name": STRING_4096_CHARACTERS, "reportTitle": "My Report Title" }, TEST_MODEL_ID: 17, INPUT_BLOCK: [1], TEST_RESULT: [1], EXPECTED: { detail: [{ type: 'string_too_long', loc: ['body', 'projectInfo', 'name'], msg: 'String should have at most 256 characters', input: STRING_4096_CHARACTERS, ctx: { max_length: 256 } }] }, STATUS: 422 },
        { TEST_NAME: "With Existing Project Id With Valid Global Vars With Valid Pages With Project Info Name Float With Valid Test Model Id With Valid Input Blocks With With Valid Test Results", CASE_TYPE: "NEGATIVE", PROJECT_ID: 1, GLOBAL_VARS: [{ key: "Company Name", value: "ABC Company" }], PAGES: [], PROJECT_INFO_DATA: { "company": "Company ABC", "description": "My Test Project Description", "name": 12.3, "reportTitle": "My Report Title" }, TEST_MODEL_ID: 17, INPUT_BLOCK: [1], TEST_RESULT: [1], EXPECTED: { detail: [{ type: 'string_type', loc: ['body', 'projectInfo', 'name'], msg: 'Input should be a valid string', input: 12.3 }] }, STATUS: 422 },
        { TEST_NAME: "With Existing Project Id With Valid Global Vars With Valid Pages With Project Info Name Integer With Valid Test Model Id With Valid Input Blocks With With Valid Test Results", CASE_TYPE: "NEGATIVE", PROJECT_ID: 1, GLOBAL_VARS: [{ key: "Company Name", value: "ABC Company" }], PAGES: [], PROJECT_INFO_DATA: { "company": "Company ABC", "description": "My Test Project Description", "name": 123, "reportTitle": "My Report Title" }, TEST_MODEL_ID: 17, INPUT_BLOCK: [1], TEST_RESULT: [1], EXPECTED: { detail: [{ type: 'string_type', loc: ['body', 'projectInfo', 'name'], msg: 'Input should be a valid string', input: 123 }] }, STATUS: 422 },
        { TEST_NAME: "With Existing Project Id With Valid Global Vars With Valid Pages With Project Info Name Boolean With Valid Test Model Id With Valid Input Blocks With With Valid Test Results", CASE_TYPE: "NEGATIVE", PROJECT_ID: 1, GLOBAL_VARS: [{ key: "Company Name", value: "ABC Company" }], PAGES: [], PROJECT_INFO_DATA: { "company": "Company ABC", "description": "My Test Project Description", "name": true, "reportTitle": "My Report Title" }, TEST_MODEL_ID: 17, INPUT_BLOCK: [1], TEST_RESULT: [1], EXPECTED: { detail: [{ type: 'string_type', loc: ['body', 'projectInfo', 'name'], msg: 'Input should be a valid string', input: true }] }, STATUS: 422 },
        { TEST_NAME: "With Existing Project Id With Valid Global Vars With Valid Pages With Project Info Name Empty With Valid Test Model Id With Valid Input Blocks With With Valid Test Results", CASE_TYPE: "NEGATIVE", PROJECT_ID: 1, GLOBAL_VARS: [ { key: "Company Name", value: "ABC Company" } ], PAGES: [], PROJECT_INFO_DATA: { "company": "Company ABC", "description": "My Test Project Description", "name": "", "reportTitle": "My Report Title" }, TEST_MODEL_ID: 17, INPUT_BLOCK: [1], TEST_RESULT: [1], EXPECTED: { "detail": [{ "type": "string_too_short", "loc": [ "body", "projectInfo", "name" ], "msg": "String should have at least 1 character", "input": "", "ctx": { "min_length": 1 }}]}, STATUS: 422 },
        { TEST_NAME: "With Existing Project Id With Valid Global Vars With Valid Pages With Project Info Name Null With Valid Test Model Id With Valid Input Blocks With With Valid Test Results", CASE_TYPE: "NEGATIVE", PROJECT_ID: 1, GLOBAL_VARS: [{ key: "Company Name", value: "ABC Company" }], PAGES: [], PROJECT_INFO_DATA: { "company": "Company ABC", "description": "My Test Project Description", "name": null, "reportTitle": "My Report Title" }, TEST_MODEL_ID: 17, INPUT_BLOCK: [1], TEST_RESULT: [1], EXPECTED: { detail: [{ type: 'string_type', loc: ['body', 'projectInfo', 'name'], msg: 'Input should be a valid string', input: null }] }, STATUS: 422 },
        { TEST_NAME: "With Existing Project Id With Valid Global Vars With Valid Pages With Project Info Name No Value With Valid Test Model Id With Valid Input Blocks With With Valid Test Results", CASE_TYPE: "NEGATIVE", PROJECT_ID: 1, GLOBAL_VARS: [{ key: "Company Name", value: "ABC Company" }], PAGES: [], PROJECT_INFO_DATA: { "company": "Company ABC", "description": "My Test Project Description", "reportTitle": "My Report Title" }, TEST_MODEL_ID: 17, INPUT_BLOCK: [1], TEST_RESULT: [1], EXPECTED: { detail: [{ type: 'missing', loc: ['body', 'projectInfo', 'name'], msg: 'Field required', input: { "company": "Company ABC", "description": "My Test Project Description", "reportTitle": "My Report Title" } }] }, STATUS: 422 },
        { TEST_NAME: "With Existing Project Id With Valid Global Vars With Valid Pages With Project Info Description Characters > 256 Characters With Valid Test Model Id With Valid Input Blocks With With Valid Test Results", CASE_TYPE: "NEGATIVE", PROJECT_ID: 1, GLOBAL_VARS: [{ key: "Company Name", value: "ABC Company" }], PAGES: [], PROJECT_INFO_DATA: { "company": "Company ABC", "description": STRING_4096_CHARACTERS, "name": "My Test Project", "reportTitle": "My Report Title" }, TEST_MODEL_ID: 17, INPUT_BLOCK: [1], TEST_RESULT: [1], EXPECTED: { detail: [{ type: 'string_too_long', loc: ['body', 'projectInfo', 'description'], msg: 'String should have at most 4096 characters', input: STRING_4096_CHARACTERS, ctx: { max_length: 4096 } }] }, STATUS: 422 },
        { TEST_NAME: "With Existing Project Id With Valid Global Vars With Valid Pages With Project Info Description Float With Valid Test Model Id With Valid Input Blocks With With Valid Test Results", CASE_TYPE: "NEGATIVE", PROJECT_ID: 1, GLOBAL_VARS: [{ key: "Company Name", value: "ABC Company" }], PAGES: [], PROJECT_INFO_DATA: { "company": "Company ABC", "description": 12.3, "name": "My Test Project", "reportTitle": "My Report Title" }, TEST_MODEL_ID: 17, INPUT_BLOCK: [1], TEST_RESULT: [1], EXPECTED: { detail: [{ type: 'string_type', loc: ['body', 'projectInfo', 'description'], msg: 'Input should be a valid string', input: 12.3 }] }, STATUS: 422 },
        { TEST_NAME: "With Existing Project Id With Valid Global Vars With Valid Pages With Project Info Description Integer With Valid Test Model Id With Valid Input Blocks With With Valid Test Results", CASE_TYPE: "NEGATIVE", PROJECT_ID: 1, GLOBAL_VARS: [{ key: "Company Name", value: "ABC Company" }], PAGES: [], PROJECT_INFO_DATA: { "company": "Company ABC", "description": 123, "name": "My Test Project", "reportTitle": "My Report Title" }, TEST_MODEL_ID: 17, INPUT_BLOCK: [1], TEST_RESULT: [1], EXPECTED: { detail: [{ type: 'string_type', loc: ['body', 'projectInfo', 'description'], msg: 'Input should be a valid string', input: 123 }] }, STATUS: 422 },
        { TEST_NAME: "With Existing Project Id With Valid Global Vars With Valid Pages With Project Info Description Boolean With Valid Test Model Id With Valid Input Blocks With With Valid Test Results", CASE_TYPE: "NEGATIVE", PROJECT_ID: 1, GLOBAL_VARS: [{ key: "Company Name", value: "ABC Company" }], PAGES: [], PROJECT_INFO_DATA: { "company": "Company ABC", "description": true, "name": "My Test Project", "reportTitle": "My Report Title" }, TEST_MODEL_ID: 17, INPUT_BLOCK: [1], TEST_RESULT: [1], EXPECTED: { detail: [{ type: 'string_type', loc: ['body', 'projectInfo', 'description'], msg: 'Input should be a valid string', input: true }] }, STATUS: 422 },
        { TEST_NAME: "With Existing Project Id With Valid Global Vars With Valid Pages With Project Info Description Empty With Valid Test Model Id With Valid Input Blocks With With Valid Test Results", CASE_TYPE: "NEGATIVE", PROJECT_ID: 1, GLOBAL_VARS: [{ key: "Company Name", value: "ABC Company" }], PAGES: [], PROJECT_INFO_DATA: { "company": "Company ABC", "description": "", "name": "My Test Project", "reportTitle": "My Report Title" }, TEST_MODEL_ID: 17, INPUT_BLOCK: [1], TEST_RESULT: [1], EXPECTED: { detail: [{ ctx: { min_length: 1 }, input: "", loc: [ "body", "projectInfo", "description" ], msg: "String should have at least 1 character", type: "string_too_short" }]}, STATUS: 422 },
        { TEST_NAME: "With Existing Project Id With Valid Global Vars With Valid Pages With Project Info Description Null With Valid Test Model Id With Valid Input Blocks With With Valid Test Results", CASE_TYPE: "NEGATIVE", PROJECT_ID: 1, GLOBAL_VARS: [{ key: "Company Name", value: "ABC Company" }], PAGES: [], PROJECT_INFO_DATA: { "company": "Company ABC", "description": null, "name": "My Test Project", "reportTitle": "My Report Title" }, TEST_MODEL_ID: 17, INPUT_BLOCK: [17], TEST_RESULT: [2], EXPECTED: { pages: [], id: 1, templateId: null, projectInfo: { name: 'My Test Project', description: null, reportTitle: 'My Report Title', company: 'Company ABC' }, testModelId: 17, inputBlocks: [{ gid: 'aiverify.stock.fairness_metrics_toolbox_for_classification', cid: 'fairness_tree', id: 17 }], testResults: [{ gid: 'aiverify.stock.fairness_metrics_toolbox_for_classification', cid: 'fairness_metrics_toolbox_for_classification', id: 2 }] }, STATUS: 200 },
        { TEST_NAME: "With Existing Project Id With Valid Global Vars With Valid Pages With Project Info Description No Value With Valid Test Model Id With Valid Input Blocks With With Valid Test Results", CASE_TYPE: "NEGATIVE", PROJECT_ID: 1, GLOBAL_VARS: [{ key: "Company Name", value: "ABC Company" }], PAGES: [], PROJECT_INFO_DATA: { "company": "Company ABC", "name": "My Test Project", "reportTitle": "My Report Title" }, TEST_MODEL_ID: 17, INPUT_BLOCK: [17], TEST_RESULT: [2], EXPECTED: { pages: [], id: 1, templateId: null, projectInfo: { name: 'My Test Project', reportTitle: 'My Report Title', company: 'Company ABC' }, testModelId: 17, inputBlocks: [{ gid: 'aiverify.stock.fairness_metrics_toolbox_for_classification', cid: 'fairness_tree', id: 17 }], testResults: [{ gid: 'aiverify.stock.fairness_metrics_toolbox_for_classification', cid: 'fairness_metrics_toolbox_for_classification', id: 2 }] }, STATUS: 200 },
        { TEST_NAME: "With Existing Project Id With Valid Global Vars With Valid Pages With Project Info Report Title Characters > 256 Characters With Valid Test Model Id With Valid Input Blocks With With Valid Test Results", CASE_TYPE: "NEGATIVE", PROJECT_ID: 1, GLOBAL_VARS: [{ key: "Company Name", value: "ABC Company" }], PAGES: [], PROJECT_INFO_DATA: { "company": "Company ABC", "description": "My Test Project Description", "name": "My Test Project", "reportTitle": STRING_4096_CHARACTERS }, TEST_MODEL_ID: 17, INPUT_BLOCK: [1], TEST_RESULT: [1], EXPECTED: { detail: [{ type: 'string_too_long', loc: ['body', 'projectInfo', 'reportTitle'], msg: 'String should have at most 256 characters', input: STRING_4096_CHARACTERS, ctx: { max_length: 256 } }] }, STATUS: 422 },
        { TEST_NAME: "With Existing Project Id With Valid Global Vars With Valid Pages With Project Info Report Title Float With Valid Test Model Id With Valid Input Blocks With With Valid Test Results", CASE_TYPE: "NEGATIVE", PROJECT_ID: 1, GLOBAL_VARS: [{ key: "Company Name", value: "ABC Company" }], PAGES: [], PROJECT_INFO_DATA: { "company": "Company ABC", "description": "My Test Project Description", "name": "My Test Project", "reportTitle": 12.3 }, TEST_MODEL_ID: 17, INPUT_BLOCK: [1], TEST_RESULT: [1], EXPECTED: { detail: [{ type: 'string_type', loc: ['body', 'projectInfo', 'reportTitle'], msg: 'Input should be a valid string', input: 12.3 }] }, STATUS: 422 },
        { TEST_NAME: "With Existing Project Id With Valid Global Vars With Valid Pages With Project Info Report Title Integer With Valid Test Model Id With Valid Input Blocks With With Valid Test Results", CASE_TYPE: "NEGATIVE", PROJECT_ID: 1, GLOBAL_VARS: [{ key: "Company Name", value: "ABC Company" }], PAGES: [], PROJECT_INFO_DATA: { "company": "Company ABC", "description": "My Test Project Description", "name": "My Test Project", "reportTitle": 123 }, TEST_MODEL_ID: 17, INPUT_BLOCK: [1], TEST_RESULT: [1], EXPECTED: { detail: [{ type: 'string_type', loc: ['body', 'projectInfo', 'reportTitle'], msg: 'Input should be a valid string', input: 123 }] }, STATUS: 422 },
        { TEST_NAME: "With Existing Project Id With Valid Global Vars With Valid Pages With Project Info Report Title Boolean With Valid Test Model Id With Valid Input Blocks With With Valid Test Results", CASE_TYPE: "NEGATIVE", PROJECT_ID: 1, GLOBAL_VARS: [{ key: "Company Name", value: "ABC Company" }], PAGES: [], PROJECT_INFO_DATA: { "company": "Company ABC", "description": "My Test Project Description", "name": "My Test Project", "reportTitle": true }, TEST_MODEL_ID: 17, INPUT_BLOCK: [1], TEST_RESULT: [1], EXPECTED: { detail: [{ type: 'string_type', loc: ['body', 'projectInfo', 'reportTitle'], msg: 'Input should be a valid string', input: true }] }, STATUS: 422 },
        { TEST_NAME: "With Existing Project Id With Valid Global Vars With Valid Pages With Project Info Report Title Empty With Valid Test Model Id With Valid Input Blocks With With Valid Test Results", CASE_TYPE: "NEGATIVE", PROJECT_ID: 1, GLOBAL_VARS: [{ key: "Company Name", value: "ABC Company" }], PAGES: [], PROJECT_INFO_DATA: { "company": "Company ABC", "description": "My Test Project Description", "name": "My Test Project", "reportTitle": "" }, TEST_MODEL_ID: 17, INPUT_BLOCK: [1], TEST_RESULT: [1], EXPECTED: { detail: [{ ctx: { min_length: 1 }, input: "", loc: [ "body", "projectInfo", "reportTitle" ], msg: "String should have at least 1 character", type: "string_too_short" }]}, STATUS: 422 },
        { TEST_NAME: "With Existing Project Id With Valid Global Vars With Valid Pages With Project Info Report Title Null With Valid Test Model Id With Valid Input Blocks With With Valid Test Results", CASE_TYPE: "NEGATIVE", PROJECT_ID: 1, GLOBAL_VARS: [{ key: "Company Name", value: "ABC Company" }], PAGES: [], PROJECT_INFO_DATA: { "company": "Company ABC", "description": "My Test Project Description", "name": "My Test Project", "reportTitle": null }, TEST_MODEL_ID: 17, INPUT_BLOCK: [17], TEST_RESULT: [2], EXPECTED: { pages: [], id: 1, templateId: null, projectInfo: { name: 'My Test Project', description: 'My Test Project Description', reportTitle: null, company: 'Company ABC' }, testModelId: 17, inputBlocks: [{ gid: 'aiverify.stock.fairness_metrics_toolbox_for_classification', cid: 'fairness_tree', id: 17 }], testResults: [{ gid: 'aiverify.stock.fairness_metrics_toolbox_for_classification', cid: 'fairness_metrics_toolbox_for_classification', id: 2 }] }, STATUS: 200 },
        { TEST_NAME: "With Existing Project Id With Valid Global Vars With Valid Pages With Project Info Report Title No Value With Valid Test Model Id With Valid Input Blocks With With Valid Test Results", CASE_TYPE: "NEGATIVE", PROJECT_ID: 1, GLOBAL_VARS: [{ key: "Company Name", value: "ABC Company" }], PAGES: [], PROJECT_INFO_DATA: { "company": "Company ABC", "description": "My Test Project Description", "name": "My Test Project" }, TEST_MODEL_ID: 17, INPUT_BLOCK: [17], TEST_RESULT: [2], EXPECTED: { pages: [], id: 1, templateId: null, projectInfo: { name: 'My Test Project', description: "My Test Project Description", reportTitle: null, company: 'Company ABC' }, testModelId: 17, inputBlocks: [{ gid: 'aiverify.stock.fairness_metrics_toolbox_for_classification', cid: 'fairness_tree', id: 17 }], testResults: [{ gid: 'aiverify.stock.fairness_metrics_toolbox_for_classification', cid: 'fairness_metrics_toolbox_for_classification', id: 2 }] }, STATUS: 200 },
        { TEST_NAME: "With Existing Project Id With Valid Global Vars With Valid Pages With Project Info Company Characters > 256 Characters With Valid Test Model Id With Valid Input Blocks With With Valid Test Results", CASE_TYPE: "NEGATIVE", PROJECT_ID: 1, GLOBAL_VARS: [{ key: "Company Name", value: "ABC Company" }], PAGES: [], PROJECT_INFO_DATA: { "company": STRING_4096_CHARACTERS, "description": "My Test Project Description", "name": "My Test Project", "reportTitle": "My Report Title" }, TEST_MODEL_ID: 17, INPUT_BLOCK: [1], TEST_RESULT: [1], EXPECTED: { detail: [{ type: 'string_too_long', loc: ['body', 'projectInfo', 'company'], msg: 'String should have at most 256 characters', input: STRING_4096_CHARACTERS, ctx: { max_length: 256 } }] }, STATUS: 422 },
        { TEST_NAME: "With Existing Project Id With Valid Global Vars With Valid Pages With Project Info Company Float With Valid Test Model Id With Valid Input Blocks With With Valid Test Results", CASE_TYPE: "NEGATIVE", PROJECT_ID: 1, GLOBAL_VARS: [{ key: "Company Name", value: "ABC Company" }], PAGES: [], PROJECT_INFO_DATA: { "company": 12.3, "description": "My Test Project Description", "name": "My Test Project", "reportTitle": "My Report Title" }, TEST_MODEL_ID: 17, INPUT_BLOCK: [1], TEST_RESULT: [1], EXPECTED: { detail: [{ type: 'string_type', loc: ['body', 'projectInfo', 'company'], msg: 'Input should be a valid string', input: 12.3 }] }, STATUS: 422 },
        { TEST_NAME: "With Existing Project Id With Valid Global Vars With Valid Pages With Project Info Company Integer With Valid Test Model Id With Valid Input Blocks With With Valid Test Results", CASE_TYPE: "NEGATIVE", PROJECT_ID: 1, GLOBAL_VARS: [{ key: "Company Name", value: "ABC Company" }], PAGES: [], PROJECT_INFO_DATA: { "company": 123, "description": "My Test Project Description", "name": "My Test Project", "reportTitle": "My Report Title" }, TEST_MODEL_ID: 17, INPUT_BLOCK: [1], TEST_RESULT: [1], EXPECTED: { detail: [{ type: 'string_type', loc: ['body', 'projectInfo', 'company'], msg: 'Input should be a valid string', input: 123 }] }, STATUS: 422 },
        { TEST_NAME: "With Existing Project Id With Valid Global Vars With Valid Pages With Project Info Company Boolean With Valid Test Model Id With Valid Input Blocks With With Valid Test Results", CASE_TYPE: "NEGATIVE", PROJECT_ID: 1, GLOBAL_VARS: [{ key: "Company Name", value: "ABC Company" }], PAGES: [], PROJECT_INFO_DATA: { "company": true, "description": "My Test Project Description", "name": "My Test Project", "reportTitle": "My Report Title" }, TEST_MODEL_ID: 17, INPUT_BLOCK: [1], TEST_RESULT: [1], EXPECTED: { detail: [{ type: 'string_type', loc: ['body', 'projectInfo', 'company'], msg: 'Input should be a valid string', input: true }] }, STATUS: 422 },
        { TEST_NAME: "With Existing Project Id With Valid Global Vars With Valid Pages With Project Info Company Empty With Valid Test Model Id With Valid Input Blocks With With Valid Test Results", CASE_TYPE: "NEGATIVE", PROJECT_ID: 1, GLOBAL_VARS: [{ key: "Company Name", value: "ABC Company" }], PAGES: [], PROJECT_INFO_DATA: { "company": "", "description": "My Test Project Description", "name": "My Test Project", "reportTitle": "My Report Title" }, TEST_MODEL_ID: 17, INPUT_BLOCK: [17], TEST_RESULT: [2], EXPECTED: { globalVars: [{ key: 'Company Name', value: 'ABC Company' }], pages: [], id: 1, templateId: null, projectInfo: { name: 'My Test Project', reportTitle: 'My Report Title', description: 'My Test Project Description', company: '' }, testModelId: 17, inputBlocks: [{ gid: 'aiverify.stock.fairness_metrics_toolbox_for_classification', cid: 'fairness_tree', id: 17 }], testResults: [{ gid: 'aiverify.stock.fairness_metrics_toolbox_for_classification', cid: 'fairness_metrics_toolbox_for_classification', id: 2 }] }, STATUS: 200 },
        { TEST_NAME: "With Existing Project Id With Valid Global Vars With Valid Pages With Project Info Company Null With Valid Test Model Id With Valid Input Blocks With With Valid Test Results", CASE_TYPE: "NEGATIVE", PROJECT_ID: 1, GLOBAL_VARS: [{ key: "Company Name", value: "ABC Company" }], PAGES: [], PROJECT_INFO_DATA: { "company": null, "description": "My Test Project Description", "name": "My Test Project", "reportTitle": "My Report Title" }, TEST_MODEL_ID: 17, INPUT_BLOCK: [17], TEST_RESULT: [2], EXPECTED: { pages: [], id: 1, templateId: null, projectInfo: { name: 'My Test Project', description: 'My Test Project Description', reportTitle: 'My Report Title', company: null }, testModelId: 17, inputBlocks: [{ gid: 'aiverify.stock.fairness_metrics_toolbox_for_classification', cid: 'fairness_tree', id: 17 }], testResults: [{ gid: 'aiverify.stock.fairness_metrics_toolbox_for_classification', cid: 'fairness_metrics_toolbox_for_classification', id: 2 }] }, STATUS: 200 },
        { TEST_NAME: "With Existing Project Id With Valid Global Vars With Valid Pages With Project Info Company No Value With Valid Test Model Id With Valid Input Blocks With With Valid Test Results", CASE_TYPE: "NEGATIVE", PROJECT_ID: 1, GLOBAL_VARS: [{ key: "Company Name", value: "ABC Company" }], PAGES: [], PROJECT_INFO_DATA: { "description": "My Test Project Description", "name": "My Test Project", "reportTitle": "My Report Title" }, TEST_MODEL_ID: 17, INPUT_BLOCK: [17], TEST_RESULT: [2], EXPECTED: { pages: [], id: 1, templateId: null, projectInfo: { name: 'My Test Project', description: "My Test Project Description", reportTitle: 'My Report Title', company: null }, testModelId: 17, inputBlocks: [{ gid: 'aiverify.stock.fairness_metrics_toolbox_for_classification', cid: 'fairness_tree', id: 17 }], testResults: [{ gid: 'aiverify.stock.fairness_metrics_toolbox_for_classification', cid: 'fairness_metrics_toolbox_for_classification', id: 2 }] }, STATUS: 200 },
        { TEST_NAME: "With Existing Project Id With Valid Global Vars With Pages Non Array Object Items With Valid Project Info With Valid Test Model Id With Valid Input Blocks With Valid Test Results", CASE_TYPE: "NEGATIVE", PROJECT_ID: 1, GLOBAL_VARS: [{ key: "Company Name", value: "ABC Company" }], PAGES: 1, PROJECT_INFO_DATA: { "company": "Company ABC", "description": "My Test Project Description", "name": "My Test Project", "reportTitle": "My Report Title" }, TEST_MODEL_ID: 17, INPUT_BLOCK: [1], TEST_RESULT: [1], EXPECTED: { "detail": [{ "input": 1, "loc": ["body", "pages"], "msg": "Input should be a valid list", "type": "list_type" }] }, STATUS: 422 },
        { TEST_NAME: "With Existing Project Id With Valid Global Vars With Pages Non Array Object Layout With Valid Project Info With Valid Test Model Id With Valid Input Blocks With Valid Test Results", CASE_TYPE: "NEGATIVE", PROJECT_ID: 1, GLOBAL_VARS: [{ key: "Company Name", value: "ABC Company" }], PAGES: [{ layouts: 1, reportWidgets: [] }], PROJECT_INFO_DATA: { "company": "Company ABC", "description": "My Test Project Description", "name": "My Test Project", "reportTitle": "My Report Title" }, TEST_MODEL_ID: 17, INPUT_BLOCK: [1], TEST_RESULT: [1], EXPECTED: { "detail": [{ "input": 1, "loc": ["body", "pages", 0, "layouts"], "msg": "Input should be a valid list", "type": "list_type" }] }, STATUS: 422 },
        { TEST_NAME: "With Existing Project Id WIth Valid Global Vars With Pages Non Array Object Report Widgets With Valid Project Info WIth Valid Test Model Id With Valid Input Block With Valid Test Results", CASE_TYPE: "NEGATIVE", PROJECT_ID: 1, GLOBAL_VARS: [{ key: "Company Name", value: "ABC Company" }], PAGES: [{ layouts: [], reportWidgets: 1 }], PROJECT_INFO_DATA: { "company": "Company ABC", "description": "My Test Project Description", "name": "My Test Project", "reportTitle": "My Report Title" }, TEST_MODEL_ID: 17, INPUT_BLOCK: [1], TEST_RESULT: [1], EXPECTED: { "detail": [{ "input": 1, "loc": ["body", "pages", 0, "reportWidgets"], "msg": "Input should be a valid list", "type": "list_type" }] }, STATUS: 422 },
        { TEST_NAME: "With Existing Project Id With Non Array Object Global Vars With Valid Pages With Valid Project Info With Valid Test Model Id With Valid Input Blocks With Valid Test Results", CASE_TYPE: "NEGATIVE", PROJECT_ID: 1, GLOBAL_VARS: 1, PAGES: [], PROJECT_INFO_DATA: { "company": "Company ABC", "description": "My Test Project Description", "name": "My Test Project", "reportTitle": "My Report Title" }, TEST_MODEL_ID: 17, INPUT_BLOCK: [1], TEST_RESULT: [1], EXPECTED: { detail: [{ type: 'list_type', loc: ['body', 'globalVars'], msg: 'Input should be a valid list', input: 1 }] }, STATUS: 422 },
        { TEST_NAME: "With Existing Project Id With Empty Global Vars With Valid Pages With Valid Project Info With Valid Test Model Id With Valid Input Blocks With Valid Test Results", CASE_TYPE: "NEGATIVE", PROJECT_ID: 1, GLOBAL_VARS: "", PAGES: [], PROJECT_INFO_DATA: { "company": "Company ABC", "description": "My Test Project Description", "name": "My Test Project", "reportTitle": "My Report Title" }, TEST_MODEL_ID: 17, INPUT_BLOCK: [1], TEST_RESULT: [1], EXPECTED: { detail: [{ type: 'list_type', loc: ['body', 'globalVars'], msg: 'Input should be a valid list', input: "" }] }, STATUS: 422 },
        { TEST_NAME: "With Existing Project Id With Null Object Global Vars With Valid Pages With Valid Project Info With Valid Test Model Id With Valid Input Blocks With Valid Test Results", CASE_TYPE: "NEGATIVE", PROJECT_ID: 1, GLOBAL_VARS: null, PAGES: [], PROJECT_INFO_DATA: { "company": "Company ABC", "description": "My Test Project Description", "name": "My Test Project", "reportTitle": "My Report Title" }, TEST_MODEL_ID: 17, INPUT_BLOCK: [17], TEST_RESULT: [2], EXPECTED: { pages: [], id: 1, templateId: null, projectInfo: { name: 'My Test Project', reportTitle: 'My Report Title', company: 'Company ABC' }, testModelId: 17, inputBlocks: [{ gid: 'aiverify.stock.fairness_metrics_toolbox_for_classification', cid: 'fairness_tree', id: 17 }], testResults: [{ gid: 'aiverify.stock.fairness_metrics_toolbox_for_classification', cid: 'fairness_metrics_toolbox_for_classification', id: 2 }] }, STATUS: 200 },
        { TEST_NAME: "With Existing Project Id With Key > 128 Characters Global Vars With Valid Pages With Valid Project Info With Valid Test Model Id With Valid Input Blocks With With Valid Test Results", CASE_TYPE: "NEGATIVE", PROJECT_ID: 1, GLOBAL_VARS: [{ key: STRING_4096_CHARACTERS, value: "ABC Company" }], PAGES: [], PROJECT_INFO_DATA: { "company": "Company ABC", "description": "My Test Project Description", "name": "My Test Project", "reportTitle": "My Report Title" }, TEST_MODEL_ID: 17, INPUT_BLOCK: [1], TEST_RESULT: [1], EXPECTED: { detail: [{ type: 'string_too_long', loc: ['body', 'globalVars', 0, 'key'], msg: 'String should have at most 128 characters', input: STRING_4096_CHARACTERS, ctx: { max_length: 128 } }] }, STATUS: 422 },
        { TEST_NAME: "With Existing Project Id With Key Integer Global Vars With Valid Pages With Valid Project Info With Valid Test Model Id With Valid Input Blocks With With Valid Test Results", CASE_TYPE: "NEGATIVE", PROJECT_ID: 1, GLOBAL_VARS: [{ key: 123, value: "ABC Company" }], PAGES: [], PROJECT_INFO_DATA: { "company": "Company ABC", "description": "My Test Project Description", "name": "My Test Project", "reportTitle": "My Report Title" }, TEST_MODEL_ID: 17, INPUT_BLOCK: [1], TEST_RESULT: [1], EXPECTED: { detail: [{ type: 'string_type', loc: ['body', 'globalVars', 0, 'key'], msg: 'Input should be a valid string', input: 123 }] }, STATUS: 422 },
        { TEST_NAME: "With Existing Project Id With Key Float Global Vars Valid Pages With Valid Project Info With Valid Test Model Id With Valid Input Blocks With With Valid Test Results", CASE_TYPE: "NEGATIVE", PROJECT_ID: 1, GLOBAL_VARS: [{ key: 12.3, value: "ABC Company" }], PAGES: [], PROJECT_INFO_DATA: { "company": "Company ABC", "description": "My Test Project Description", "name": "My Test Project", "reportTitle": "My Report Title" }, TEST_MODEL_ID: 17, INPUT_BLOCK: [1], TEST_RESULT: [1], EXPECTED: { detail: [{ type: 'string_type', loc: ['body', 'globalVars', 0, 'key'], msg: 'Input should be a valid string', input: 12.3 }] }, STATUS: 422 },
        { TEST_NAME: "With Existing Project Id With Key Boolean Global Vars Valid Pages With Valid Project Info With Valid Test Model Id With Valid Input Blocks With With Valid Test Results", CASE_TYPE: "NEGATIVE", PROJECT_ID: 1, GLOBAL_VARS: [{ key: true, value: "ABC Company" }], PAGES: [], PROJECT_INFO_DATA: { "company": "Company ABC", "description": "My Test Project Description", "name": "My Test Project", "reportTitle": "My Report Title" }, TEST_MODEL_ID: 17, INPUT_BLOCK: [1], TEST_RESULT: [1], EXPECTED: { detail: [{ type: 'string_type', loc: ['body', 'globalVars', 0, 'key'], msg: 'Input should be a valid string', input: true }] }, STATUS: 422 },
        { TEST_NAME: "With Existing Project Id With Key Empty Global Vars With Valid Pages With Valid Project Info With Valid Test Model Id With Valid Input Blocks With With Valid Test Results", CASE_TYPE: "NEGATIVE", PROJECT_ID: 1, GLOBAL_VARS: [{ key: "", value: "ABC Company" }], PAGES: [], PROJECT_INFO_DATA: { "company": "Company ABC", "description": "My Test Project Description", "name": "My Test Project", "reportTitle": "My Report Title" }, TEST_MODEL_ID: 17, INPUT_BLOCK: [1], TEST_RESULT: [1], EXPECTED: { detail: [{ type: 'string_too_short', loc: ['body', 'globalVars', 0, 'key'], msg: 'String should have at least 1 character', input: "" }] }, STATUS: 422 },
        { TEST_NAME: "With Existing Project Id With Key Null Valid Global Vars With Valid Pages With Valid Project Info With Valid Test Model Id With Valid Input Blocks With With Valid Test Results", CASE_TYPE: "NEGATIVE", PROJECT_ID: 1, GLOBAL_VARS: [{ key: null, value: "ABC Company" }], PAGES: [], PROJECT_INFO_DATA: { "company": "Company ABC", "description": "My Test Project Description", "name": "My Test Project", "reportTitle": "My Report Title" }, TEST_MODEL_ID: 17, INPUT_BLOCK: [1], TEST_RESULT: [1], EXPECTED: { detail: [{ type: 'string_type', loc: ['body', 'globalVars', 0, 'key'], msg: 'Input should be a valid string', input: null }] }, STATUS: 422 },
        { TEST_NAME: "With Existing Project Id With Key No Values Global Vars With Valid Pages With Valid Project Info With Valid Test Model Id With Valid Input Blocks With With Valid Test Results", CASE_TYPE: "NEGATIVE", PROJECT_ID: 1, GLOBAL_VARS: [{ value: "ABC Company" }], PAGES: [], PROJECT_INFO_DATA: { "company": "Company ABC", "description": "My Test Project Description", "name": "My Test Project", "reportTitle": "My Report Title" }, TEST_MODEL_ID: 17, INPUT_BLOCK: [1], TEST_RESULT: [1], EXPECTED: { detail: [{ type: 'missing', loc: ['body', 'globalVars', 0, 'key'], msg: 'Field required', input: { value: 'ABC Company' } }] }, STATUS: 422 },
        { TEST_NAME: "With Existing Project Id With Value > 128 Characters Global Vars With Valid Pages With Valid Project Info With Valid Test Model Id With Valid Input Blocks With With Valid Test Results", CASE_TYPE: "NEGATIVE", PROJECT_ID: 1, GLOBAL_VARS: [{ key: "Company Name", value: STRING_4096_CHARACTERS }], PAGES: [], PROJECT_INFO_DATA: { "company": "Company ABC", "description": "My Test Project Description", "name": "My Test Project", "reportTitle": "My Report Title" }, TEST_MODEL_ID: 17, INPUT_BLOCK: [1], TEST_RESULT: [1], EXPECTED: { detail: [{ type: 'string_too_long', loc: ['body', 'globalVars', 0, 'value'], msg: 'String should have at most 128 characters', input: STRING_4096_CHARACTERS, ctx: { max_length: 128 } }] }, STATUS: 422 },
        { TEST_NAME: "With Existing Project Id With Value Integer Global Vars With Valid Pages With Valid Project Info With Valid Test Model Id With Valid Input Blocks With With Valid Test Results", CASE_TYPE: "NEGATIVE", PROJECT_ID: 1, GLOBAL_VARS: [{ key: "Company Name", value: 123 }], PAGES: [], PROJECT_INFO_DATA: { "company": "Company ABC", "description": "My Test Project Description", "name": "My Test Project", "reportTitle": "My Report Title" }, TEST_MODEL_ID: 17, INPUT_BLOCK: [1], TEST_RESULT: [1], EXPECTED: { detail: [{ type: 'string_type', loc: ['body', 'globalVars', 0, 'value'], msg: 'Input should be a valid string', input: 123 }] }, STATUS: 422 },
        { TEST_NAME: "With Existing Project Id With Value Float Global Vars Valid Pages With Valid Project Info With Valid Test Model Id With Valid Input Blocks With With Valid Test Results", CASE_TYPE: "NEGATIVE", PROJECT_ID: 1, GLOBAL_VARS: [{ key: "Company Name", value: 12.3 }], PAGES: [], PROJECT_INFO_DATA: { "company": "Company ABC", "description": "My Test Project Description", "name": "My Test Project", "reportTitle": "My Report Title" }, TEST_MODEL_ID: 17, INPUT_BLOCK: [1], TEST_RESULT: [1], EXPECTED: { detail: [{ type: 'string_type', loc: ['body', 'globalVars', 0, 'value'], msg: 'Input should be a valid string', input: 12.3 }] }, STATUS: 422 },
        { TEST_NAME: "With Existing Project Id With Value Boolean Global Vars Valid Pages With Valid Project Info Boolean With Valid Test Model Id With Valid Input Blocks With With Valid Test Results", CASE_TYPE: "NEGATIVE", PROJECT_ID: 1, GLOBAL_VARS: [{ key: "Company Name", value: true }], PAGES: [], PROJECT_INFO_DATA: { "company": "Company ABC", "description": "My Test Project Description", "name": "My Test Project", "reportTitle": "My Report Title" }, TEST_MODEL_ID: 17, INPUT_BLOCK: [1], TEST_RESULT: [1], EXPECTED: { detail: [{ type: 'string_type', loc: ['body', 'globalVars', 0, 'value'], msg: 'Input should be a valid string', input: true }] }, STATUS: 422 },
        { TEST_NAME: "With Existing Project Id With Value Empty Global Vars With Valid Pages With Valid Project Info With Valid Test Model Id With Valid Input Blocks With With Valid Test Results", CASE_TYPE: "NEGATIVE", PROJECT_ID: 1, GLOBAL_VARS: [ { key: "Company Name", value: "" } ], PAGES: [], PROJECT_INFO_DATA: { "company": "Company ABC", "description": "My Test Project Description", "name": "My Test Project", "reportTitle": "My Report Title" }, TEST_MODEL_ID: 17, INPUT_BLOCK: [17], TEST_RESULT: [2], EXPECTED: { pages: [], id: 1, templateId: null, projectInfo: { name: 'My Test Project', reportTitle: 'My Report Title', company: 'Company ABC' }, testModelId: 17, inputBlocks: [{ gid: 'aiverify.stock.fairness_metrics_toolbox_for_classification', cid: 'fairness_tree', id: 17 }], testResults: [{ gid: 'aiverify.stock.fairness_metrics_toolbox_for_classification', cid: 'fairness_metrics_toolbox_for_classification', id: 2 }] }, STATUS: 200 },
        { TEST_NAME: "With Existing Project Id With Value Null Valid Global Vars With Valid Pages With Valid Project Info With Valid Test Model Id With Valid Input Blocks With With Valid Test Results", CASE_TYPE: "NEGATIVE", PROJECT_ID: 1, GLOBAL_VARS: [{ key: "Company Name", value: null }], PAGES: [], PROJECT_INFO_DATA: { "company": "Company ABC", "description": "My Test Project Description", "name": "My Test Project", "reportTitle": "My Report Title" }, TEST_MODEL_ID: 17, INPUT_BLOCK: [1], TEST_RESULT: [1], EXPECTED: { detail: [{ type: 'string_type', loc: ['body', 'globalVars', 0, 'value'], msg: 'Input should be a valid string', input: null }] }, STATUS: 422 },
        { TEST_NAME: "With Existing Project Id With Value No Values Global Vars With Valid Pages With Valid Project Info With Valid Test Model Id With Valid Input Blocks With With Valid Test Results", CASE_TYPE: "NEGATIVE", PROJECT_ID: 1, GLOBAL_VARS: [{ key: "Company Name", }], PAGES: [], PROJECT_INFO_DATA: { "company": "Company ABC", "description": "My Test Project Description", "name": "My Test Project", "reportTitle": "My Report Title" }, TEST_MODEL_ID: 17, INPUT_BLOCK: [1], TEST_RESULT: [1], EXPECTED: { detail: [{ type: 'missing', loc: ['body', 'globalVars', 0, 'value'], msg: 'Field required', input: { key: 'Company Name' } }] }, STATUS: 422 },
        { TEST_NAME: "With Non-Existing Project Id With Valid Global Vars With Valid Pages With Valid Project Info With Valid Test Model Id With Valid Input Blocks With Valid Test Results", CASE_TYPE: "NEGATIVE", PROJECT_ID: 100000000000000, GLOBAL_VARS: [{ key: "Company Name", value: "ABC Company" }], PAGES: [], PROJECT_INFO_DATA: { "company": "Company ABC", "description": "My Test Project Description", "name": "My Test Project", "reportTitle": "My Report Title" }, TEST_MODEL_ID: 17, INPUT_BLOCK: [1], TEST_RESULT: [1], EXPECTED: { detail: 'Project not found' }, STATUS: 404 },
        { TEST_NAME: "With String Project Id With Valid Global Vars With Valid Pages With Valid Project Info With Valid Test Model Id With Valid Input Blocks With Valid Test Results", CASE_TYPE: "NEGATIVE", PROJECT_ID: "abc", GLOBAL_VARS: [{ key: "Company Name", value: "ABC Company" }], PAGES: [], PROJECT_INFO_DATA: { "company": "Company ABC", "description": "My Test Project Description", "name": "My Test Project", "reportTitle": "My Report Title" }, TEST_MODEL_ID: 17, INPUT_BLOCK: [1], TEST_RESULT: [1], EXPECTED: { detail: [{ type: 'int_parsing', loc: ['path', 'project_id'], msg: 'Input should be a valid integer, unable to parse string as an integer', input: 'abc' }] }, STATUS: 422 },
        { TEST_NAME: "With Float Project Id With Valid Global Vars With Valid Pages With Valid Project Info With Valid Test Model Id With Valid Input Blocks With Valid Test Results", CASE_TYPE: "NEGATIVE", PROJECT_ID: 12.3, GLOBAL_VARS: [{ key: "Company Name", value: "ABC Company" }], PAGES: [], PROJECT_INFO_DATA: { "company": "Company ABC", "description": "My Test Project Description", "name": "My Test Project", "reportTitle": "My Report Title" }, TEST_MODEL_ID: 17, INPUT_BLOCK: [1], TEST_RESULT: [1], EXPECTED: { detail: [{ type: 'int_parsing', loc: ['path', 'project_id'], msg: 'Input should be a valid integer, unable to parse string as an integer', input: '12.3' }] }, STATUS: 422 },
        { TEST_NAME: "With Boolean Project Id With Valid Global Vars With Valid Pages With Valid Project Info With Valid Test Model Id With Valid Input Blocks With Valid Test Results", CASE_TYPE: "NEGATIVE", PROJECT_ID: true, GLOBAL_VARS: [{ key: "Company Name", value: "ABC Company" }], PAGES: [], PROJECT_INFO_DATA: { "company": "Company ABC", "description": "My Test Project Description", "name": "My Test Project", "reportTitle": "My Report Title" }, TEST_MODEL_ID: 17, INPUT_BLOCK: [1], TEST_RESULT: [1], EXPECTED: { detail: [{ type: 'int_parsing', loc: ['path', 'project_id'], msg: 'Input should be a valid integer, unable to parse string as an integer', input: 'true' }] }, STATUS: 422 },
        { TEST_NAME: "With Empty Project Id With Valid Global Vars With Valid Pages With Valid Project Info With Valid Test Model Id With Valid Input Blocks With Valid Test Results", CASE_TYPE: "NEGATIVE", PROJECT_ID: "", GLOBAL_VARS: [{ key: "Company Name", value: "ABC Company" }], PAGES: [], PROJECT_INFO_DATA: { "company": "Company ABC", "description": "My Test Project Description", "name": "My Test Project", "reportTitle": "My Report Title" }, TEST_MODEL_ID: 17, INPUT_BLOCK: [1], TEST_RESULT: [1], EXPECTED: { detail: 'Method Not Allowed' }, STATUS: 405 },
        { TEST_NAME: "With Null Project Id With Valid Global Vars With Valid Pages With Valid Project Info With Valid Test Model Id With Valid Input Blocks With Valid Test Results", CASE_TYPE: "NEGATIVE", PROJECT_ID: null, GLOBAL_VARS: [{ key: "Company Name", value: "ABC Company" }], PAGES: [], PROJECT_INFO_DATA: { "company": "Company ABC", "description": "My Test Project Description", "name": "My Test Project", "reportTitle": "My Report Title" }, TEST_MODEL_ID: 17, INPUT_BLOCK: [1], TEST_RESULT: [1], EXPECTED: { detail: [{ type: 'int_parsing', loc: ['path', 'project_id'], msg: 'Input should be a valid integer, unable to parse string as an integer', input: 'null' }] }, STATUS: 422 },
        { TEST_NAME: "With No Value Project Id With Valid Global Vars With Valid Pages With Valid Project Info With Valid Test Model Id With Valid Input Blocks With Valid Test Results", CASE_TYPE: "NEGATIVE", GLOBAL_VARS: [{ key: "Company Name", value: "ABC Company" }], PAGES: [], PROJECT_INFO_DATA: { "company": "Company ABC", "description": "My Test Project Description", "name": "My Test Project", "reportTitle": "My Report Title" }, TEST_MODEL_ID: 17, INPUT_BLOCK: [1], TEST_RESULT: [1], EXPECTED: { detail: [{ type: 'int_parsing', loc: ['path', 'project_id'], msg: 'Input should be a valid integer, unable to parse string as an integer', input: 'undefined' }] }, STATUS: 422 },

    ]

    for (const data of UPDATE_PROJECT_BY_PROJECT_ID) {

        let response

        const PROJECT_INFO_DATA = {
            "company": "Company ABC",
            "description": "My Test Project Description",
            "name": "My Test Project",
            "reportTitle": "My Report Title"
        }

        test(`Update Project By ID ${data.TEST_NAME}`, async () => {

            if (data.CASE_TYPE == "POSITIVE") {

                /* Create Project */
                response = await axios.post(url + ":" + port_number + "/projects", PROJECT_INFO_DATA, {
                    validateStatus: function (status) {
                        return status
                    }
                })

                /* Set Project ID */
                const project_id = response.data.id

                /* Upload AI Model */
                const ai_model_form = new FormData()
                ai_model_form.append('model_types', data.MODEL_TYPE)
                ai_model_form.append('files', fs.readFileSync(data.MODEL_PATH), data.MODEL_NAME)

                response = await axios.post(url + ":" + port_number + "/test_models/upload", ai_model_form,
                    {
                        headers: {
                            ...ai_model_form.getHeaders(),
                            'accept': 'application/json',
                            'Content-Type': 'multipart/form-data'
                        },
                        validateStatus: function (status) {
                            return status
                        }
                    })

                /* Set Model ID */
                const model_id = response.data[0].id

                /* Create Input Block */
                response = await axios.post(url + ":" + port_number + "/input_block_data", data.INPUT_BLOCK, {
                    validateStatus: function (status) {
                        return status
                    }
                })

                /* Set Input Block ID */
                const input_block_id = response.data.id

                /* Upload Test Results */
                const test_results_zip_form = new FormData()
                test_results_zip_form.append('file', fs.readFileSync(data.ARTIFACT_PATH), data.ARTIFACT_NAME)

                response = await axios.post(url + ":" + port_number + '/test_results/upload_zip', test_results_zip_form,
                    {
                        headers: {
                            ...test_results_zip_form.getHeaders(),
                            'accept': 'application/json',
                            'Content-Type': 'multipart/form-data'
                        },
                        validateStatus: function (status) {
                            return status
                        }
                    }
                )

                /* Set Test Results ID */
                const test_results_id_array = JSON.stringify(response.data)
                const test_results_id = test_results_id_array.replace("\"]", "").split("/", 3)
                const testResultsID = parseInt(test_results_id[2].replace('\",\"', ""))

                /* Create Update Project Data */
                const UPDATE_PROJECT_DATA = {
                    "globalVars": [
                        {
                            "key": "Company Name",
                            "value": "ABC Company"
                        }
                    ],
                    "pages": [],
                    "projectInfo": PROJECT_INFO_DATA,
                    "testModelId": model_id,
                    "inputBlocks": [input_block_id],
                    "testResults": [testResultsID]
                }

                /* Update Project */
                response = await axios.put(url + ":" + port_number + "/projects/" + project_id, UPDATE_PROJECT_DATA, {
                    validateStatus: function (status) {
                        return status
                    }
                })

                /* Assert Update Project By ID */
                expect.soft(response.data.globalVars).toMatchObject(UPDATE_PROJECT_DATA.globalVars)
                expect.soft(response.data.pages).toBeTruthy()
                expect.soft(response.data.id).toBe(project_id)
                expect.soft(response.data.templateId).toBeNull()
                expect.soft(response.data.projectInfo.company).toBe(PROJECT_INFO_DATA.company)
                expect.soft(response.data.projectInfo.description).toBe(PROJECT_INFO_DATA.description)
                expect.soft(response.data.projectInfo.name).toBe(PROJECT_INFO_DATA.name)
                expect.soft(response.data.projectInfo.reportTitle).toBe(PROJECT_INFO_DATA.reportTitle)
                expect.soft(response.data.testModelId).toBe(model_id)
                expect.soft(response.data.inputBlocks).toMatchObject([{ "cid": "fairness_tree", "gid": "aiverify.stock.fairness_metrics_toolbox_for_classification", "id": input_block_id }])
                expect.soft(response.data.testResults).toMatchObject([{ "cid": "aiverify_blur_corruptions", "gid": "aiverify.stock.image_corruption_toolbox", "id": parseInt(testResultsID) }])
                expect.soft(response.data.created_at).toBeTruthy()
                expect.soft(response.data.updated_at).toBeTruthy()

                expect.soft(response.status).toBe(data.STATUS)

            }

            if (data.CASE_TYPE == "NEGATIVE") {

                /* Set Project ID */
                const project_id = data.PROJECT_ID

                /* Create Update Project Data */
                const UPDATE_PROJECT_DATA = {
                    "globalVars": data.GLOBAL_VARS,
                    "pages": data.PAGES,
                    "projectInfo": data.PROJECT_INFO_DATA,
                    "testModelId": data.TEST_MODEL_ID,
                    "inputBlocks": data.INPUT_BLOCK,
                    "testResults": data.TEST_RESULT
                }

                /* Update Project */
                response = await axios.put(url + ":" + port_number + "/projects/" + project_id, UPDATE_PROJECT_DATA, {
                    validateStatus: function (status) {
                        return status
                    }
                })

                /* Assert Update Project By ID */
                expect.soft(response.data).toMatchObject(data.EXPECTED)
                expect.soft(response.status).toBe(data.STATUS)

            }
        })

    }

    const PATCH_PROJECT_BY_PROJECT_ID = [
        { TEST_NAME: "With Existing Project Id With Valid Global Vars With Valid Pages With Valid Project Info With Valid Test Model Id With Valid Input Blocks With Valid Test Results", CASE_TYPE: "POSITIVE", MODEL_NAME: "sample_bc_credit_sklearn_linear.LogisticRegression.sav", MODEL_PATH: root_path + "/model/sample_bc_credit_sklearn_linear.LogisticRegression.sav", MODEL_TYPE: "classification", INPUT_BLOCK: { "gid": "aiverify.stock.fairness_metrics_toolbox_for_classification", "cid": "fairness_tree", "name": "testing", "data": { "sensitiveFeature": "gender", "favourableOutcomeName": "loan", "qualified": "non-reoffenders", "unqualified": "reoffenders", "metrics": ["Equal Parity"], "selections": { "nodes": ["n1.1", "n2", "n2.1"], "edges": ["n2-n2.1"] }, "selectedOutcomes": ["n1.1"], "ans-n1.1": "answer for first n1.1", "ans-n2": "answer for percentage" } }, ARTIFACT_PATH: root_path + "/test_results/output-image-standalone.zip", ARTIFACT_NAME: "output-image-standalone.zip", STATUS: 200 },
        { TEST_NAME: "With Existing Project Id With Valid Global Vars With Valid Pages With Valid Project Info With Valid Test Model Id With Valid Input Blocks With Test Results Non Array Object Items", CASE_TYPE: "NEGATIVE", PROJECT_ID: 1, GLOBAL_VARS: [{ key: "Company Name", value: "ABC Company" }], PAGES: [], PROJECT_INFO_DATA: { "company": "Company ABC", "description": "My Test Project Description", "name": "My Test Project", "reportTitle": "My Report Title" }, TEST_MODEL_ID: 17, INPUT_BLOCK: [1], TEST_RESULT: 1, EXPECTED: { detail: [{ type: 'list_type', loc: ['body', 'testResults'], msg: 'Input should be a valid list', input: 1 }] }, STATUS: 422 },
        { TEST_NAME: "With Existing Project Id With Valid Global Vars With Valid Pages With Valid Project Info With Valid Test Model Id With Valid Input Blocks With Test Results String", CASE_TYPE: "NEGATIVE", PROJECT_ID: 1, GLOBAL_VARS: [{ key: "Company Name", value: "ABC Company" }], PAGES: [], PROJECT_INFO_DATA: { "company": "Company ABC", "description": "My Test Project Description", "name": "My Test Project", "reportTitle": "My Report Title" }, TEST_MODEL_ID: 17, INPUT_BLOCK: [1], TEST_RESULT: ["abc"], EXPECTED: { detail: [{ type: 'int_type', loc: ['body', 'testResults', 0], msg: 'Input should be a valid integer', input: "abc" }] }, STATUS: 422 },
        { TEST_NAME: "With Existing Project Id With Valid Global Vars With Valid Pages With Valid Project Info With Valid Test Model Id With Valid Input Blocks With Test Results Float", CASE_TYPE: "NEGATIVE", PROJECT_ID: 1, GLOBAL_VARS: [{ key: "Company Name", value: "ABC Company" }], PAGES: [], PROJECT_INFO_DATA: { "company": "Company ABC", "description": "My Test Project Description", "name": "My Test Project", "reportTitle": "My Report Title" }, TEST_MODEL_ID: 17, INPUT_BLOCK: [1], TEST_RESULT: [12.3], EXPECTED: { detail: [{ type: 'int_type', loc: ['body', 'testResults', 0], msg: 'Input should be a valid integer', input: 12.3 }] }, STATUS: 422 },
        { TEST_NAME: "With Existing Project Id With Valid Global Vars With Valid Pages With Valid Project Info With Valid Test Model Id With Valid Input Blocks With Test Results Boolean", CASE_TYPE: "NEGATIVE", PROJECT_ID: 1, GLOBAL_VARS: [ { key: "Company Name", value: "ABC Company" } ], PAGES: [], PROJECT_INFO_DATA: { "company": "Company ABC", "description": "My Test Project Description", "name": "My Test Project", "reportTitle": "My Report Title" }, TEST_MODEL_ID: 17, INPUT_BLOCK: [1], TEST_RESULT: [true], EXPECTED: { "detail": [{ "type": "int_type", "loc": [ "body", "testResults", 0 ], "msg": "Input should be a valid integer", "input": true }]}, STATUS: 422 },
        { TEST_NAME: "With Existing Project Id With Valid Global Vars With Valid Pages With Valid Project Info With Valid Test Model Id With Valid Input Blocks With Test Results Empty", CASE_TYPE: "NEGATIVE", PROJECT_ID: 1, GLOBAL_VARS: [{ key: "Company Name", value: "ABC Company" }], PAGES: [], PROJECT_INFO_DATA: { "company": "Company ABC", "description": "My Test Project Description", "name": "My Test Project", "reportTitle": "My Report Title" }, TEST_MODEL_ID: 17, INPUT_BLOCK: [1], TEST_RESULT: [""], EXPECTED: { detail: [{ type: 'int_type', loc: ['body', 'testResults', 0], msg: 'Input should be a valid integer', input: "" }] }, STATUS: 422 },
        { TEST_NAME: "With Existing Project Id With Valid Global Vars With Valid Pages With Valid Project Info With Valid Test Model Id With Valid Input Blocks With Test Results Null", CASE_TYPE: "NEGATIVE", PROJECT_ID: 1, GLOBAL_VARS: [{ key: "Company Name", value: "ABC Company" }], PAGES: [], PROJECT_INFO_DATA: { "company": "Company ABC", "description": "My Test Project Description", "name": "My Test Project", "reportTitle": "My Report Title" }, TEST_MODEL_ID: 17, INPUT_BLOCK: [1], TEST_RESULT: [null], EXPECTED: { detail: [{ type: 'int_type', loc: ['body', 'testResults', 0], msg: 'Input should be a valid integer', input: null }] }, STATUS: 422 },
        { TEST_NAME: "With Existing Project Id With Valid Global Vars With Valid Pages With Valid Project Info With Valid Test Model Id With Valid Input Blocks With Test Results No Values", CASE_TYPE: "NEGATIVE", PROJECT_ID: 1, GLOBAL_VARS: [{ key: "Company Name", value: "ABC Company" }], PAGES: [], PROJECT_INFO_DATA: { "company": "Company ABC", "description": "My Test Project Description", "name": "My Test Project", "reportTitle": "My Report Title" }, TEST_MODEL_ID: 17, INPUT_BLOCK: [17], EXPECTED: { globalVars: [{ key: 'Company Name', value: 'ABC Company' }], pages: [], id: 1, templateId: null, projectInfo: { name: 'My Test Project', description: 'My Test Project Description', reportTitle: 'My Report Title', company: 'Company ABC' }, testModelId: 17, inputBlocks: [{ gid: 'aiverify.stock.fairness_metrics_toolbox_for_classification', cid: 'fairness_tree', id: 17 }], testResults: [{ gid: 'aiverify.stock.fairness_metrics_toolbox_for_classification', cid: 'fairness_metrics_toolbox_for_classification', id: 2 }] }, STATUS: 200 },
        { TEST_NAME: "With Existing Project Id With Valid Global Vars With Valid Pages With Valid Project Info With Valid Test Model Id With Input Blocks Non Array Object Items With Valid Test Results", CASE_TYPE: "NEGATIVE", PROJECT_ID: 1, GLOBAL_VARS: [{ key: "Company Name", value: "ABC Company" }], PAGES: [], PROJECT_INFO_DATA: { "company": "Company ABC", "description": "My Test Project Description", "name": "My Test Project", "reportTitle": "My Report Title" }, TEST_MODEL_ID: 17, INPUT_BLOCK: 1, TEST_RESULT: [1], EXPECTED: { detail: [{ type: 'list_type', loc: ['body', 'inputBlocks'], msg: 'Input should be a valid list', input: 1 }] }, STATUS: 422 },
        { TEST_NAME: "With Existing Project Id With Valid Global Vars With Valid Pages With Valid Project Info With Valid Test Model Id With Input Blocks String With Valid Test Results", CASE_TYPE: "NEGATIVE", PROJECT_ID: 1, GLOBAL_VARS: [{ key: "Company Name", value: "ABC Company" }], PAGES: [], PROJECT_INFO_DATA: { "company": "Company ABC", "description": "My Test Project Description", "name": "My Test Project", "reportTitle": "My Report Title" }, TEST_MODEL_ID: 17, INPUT_BLOCK: ["abc"], TEST_RESULT: [1], EXPECTED: { detail: [{ type: 'int_type', loc: ['body', 'inputBlocks', 0], msg: 'Input should be a valid integer', input: "abc" }] }, STATUS: 422 },
        { TEST_NAME: "With Existing Project Id With Valid Global Vars With Valid Pages With Valid Project Info With Valid Test Model Id With Input Blocks Float With Valid Test Results", CASE_TYPE: "NEGATIVE", PROJECT_ID: 1, GLOBAL_VARS: [{ key: "Company Name", value: "ABC Company" }], PAGES: [], PROJECT_INFO_DATA: { "company": "Company ABC", "description": "My Test Project Description", "name": "My Test Project", "reportTitle": "My Report Title" }, TEST_MODEL_ID: 17, INPUT_BLOCK: [12.3], TEST_RESULT: [1], EXPECTED: { detail: [{ type: 'int_type', loc: ['body', 'inputBlocks', 0], msg: 'Input should be a valid integer', input: 12.3 }] }, STATUS: 422 },
        { TEST_NAME: "With Existing Project Id With Valid Global Vars With Valid Pages With Valid Project Info With Valid Test Model Id With Input Blocks Boolean With Valid Test Results", CASE_TYPE: "NEGATIVE", PROJECT_ID: 1, GLOBAL_VARS: [ { key: "Company Name", value: "ABC Company" } ], PAGES: [], PROJECT_INFO_DATA: { "company": "Company ABC", "description": "My Test Project Description", "name": "My Test Project", "reportTitle": "My Report Title" }, TEST_MODEL_ID: 17, INPUT_BLOCK: [true], TEST_RESULT: [1], EXPECTED: { detail: [{ type: "int_type", loc: [ "body", "inputBlocks", 0 ], msg: "Input should be a valid integer", input: true }]}, STATUS: 422 },
        { TEST_NAME: "With Existing Project Id With Valid Global Vars With Valid Pages With Valid Project Info With Valid Test Model Id With Input Blocks Empty With Valid Test Results", CASE_TYPE: "NEGATIVE", PROJECT_ID: 1, GLOBAL_VARS: [{ key: "Company Name", value: "ABC Company" }], PAGES: [], PROJECT_INFO_DATA: { "company": "Company ABC", "description": "My Test Project Description", "name": "My Test Project", "reportTitle": "My Report Title" }, TEST_MODEL_ID: 17, INPUT_BLOCK: [""], TEST_RESULT: [1], EXPECTED: { detail: [{ type: 'int_type', loc: ['body', 'inputBlocks', 0], msg: 'Input should be a valid integer', input: "" }] }, STATUS: 422 },
        { TEST_NAME: "With Existing Project Id With Valid Global Vars With Valid Pages With Valid Project Info With Valid Test Model Id With Input Blocks Null With Valid Test Results", CASE_TYPE: "NEGATIVE", PROJECT_ID: 1, GLOBAL_VARS: [{ key: "Company Name", value: "ABC Company" }], PAGES: [], PROJECT_INFO_DATA: { "company": "Company ABC", "description": "My Test Project Description", "name": "My Test Project", "reportTitle": "My Report Title" }, TEST_MODEL_ID: 17, INPUT_BLOCK: [null], TEST_RESULT: [1], EXPECTED: { detail: [{ type: 'int_type', loc: ['body', 'inputBlocks', 0], msg: 'Input should be a valid integer', input: null }] }, STATUS: 422 },
        { TEST_NAME: "With Existing Project Id With Valid Global Vars With Valid Pages With Valid Project Info With Valid Test Model Id With Input Blocks No Values With Valid Test Results", CASE_TYPE: "NEGATIVE", PROJECT_ID: 1, GLOBAL_VARS: [{ key: "Company Name", value: "ABC Company" }], PAGES: [], PROJECT_INFO_DATA: { "company": "Company ABC", "description": "My Test Project Description", "name": "My Test Project", "reportTitle": "My Report Title" }, TEST_MODEL_ID: 17, TEST_RESULT: [2], EXPECTED: { globalVars: [{ key: 'Company Name', value: 'ABC Company' }], pages: [], id: 1, templateId: null, projectInfo: { name: 'My Test Project', description: 'My Test Project Description', reportTitle: 'My Report Title', company: 'Company ABC' }, testModelId: 17, inputBlocks: [{ gid: 'aiverify.stock.fairness_metrics_toolbox_for_classification', cid: 'fairness_tree', id: 17 }], testResults: [{ gid: 'aiverify.stock.fairness_metrics_toolbox_for_classification', cid: 'fairness_metrics_toolbox_for_classification', id: 2 }] }, STATUS: 200 },
        { TEST_NAME: "With Existing Project Id With Valid Global Vars With Valid Pages With Valid Project Info With Non-Existing Test Model Id With Valid Input Blocks With Valid Test Results", CASE_TYPE: "NEGATIVE", PROJECT_ID: 1, GLOBAL_VARS: [{ key: "Company Name", value: "ABC Company" }], PAGES: [], PROJECT_INFO_DATA: { "company": "Company ABC", "description": "My Test Project Description", "name": "My Test Project", "reportTitle": "My Report Title" }, TEST_MODEL_ID: 100000000000000, INPUT_BLOCK: [1], TEST_RESULT: [1], EXPECTED: { detail: "Test Model 100000000000000 not found" }, STATUS: 400 },
        { TEST_NAME: "With Existing Project Id With Valid Global Vars With Valid Pages With Valid Project Info With Test Model Id String With Valid Input Blocks With Valid Test Results", CASE_TYPE: "NEGATIVE", PROJECT_ID: 1, GLOBAL_VARS: [{ key: "Company Name", value: "ABC Company" }], PAGES: [], PROJECT_INFO_DATA: { "company": "Company ABC", "description": "My Test Project Description", "name": "My Test Project", "reportTitle": "My Report Title" }, TEST_MODEL_ID: 'abc', INPUT_BLOCK: [1], TEST_RESULT: [1], EXPECTED: { detail: [{ type: 'int_type', loc: ['body', 'testModelId'], msg: 'Input should be a valid integer', input: "abc" }] }, STATUS: 422 },
        { TEST_NAME: "With Existing Project Id With Valid Global Vars With Valid Pages With Valid Project Info With Test Model Id Float With Valid Input Blocks With Valid Test Results", CASE_TYPE: "NEGATIVE", PROJECT_ID: 1, GLOBAL_VARS: [{ key: "Company Name", value: "ABC Company" }], PAGES: [], PROJECT_INFO_DATA: { "company": "Company ABC", "description": "My Test Project Description", "name": "My Test Project", "reportTitle": "My Report Title" }, TEST_MODEL_ID: 12.3, INPUT_BLOCK: [1], TEST_RESULT: [1], EXPECTED: { detail: [{ type: 'int_type', loc: ['body', 'testModelId'], msg: 'Input should be a valid integer', input: 12.3 }] }, STATUS: 422 },
        { TEST_NAME: "With Existing Project Id With Valid Global Vars With Valid Pages With Valid Project Info With Test Model Id Boolean With Valid Input Blocks With Valid Test Results", CASE_TYPE: "NEGATIVE", PROJECT_ID: 1, GLOBAL_VARS: [ { key: "Company Name", value: "ABC Company" } ], PAGES: [], PROJECT_INFO_DATA: { "company": "Company ABC", "description": "My Test Project Description", "name": "My Test Project", "reportTitle": "My Report Title" }, TEST_MODEL_ID: true, INPUT_BLOCK: [1], TEST_RESULT: [1], EXPECTED: { detail: [{ type: "int_type", loc: [ "body", "testModelId" ], msg: "Input should be a valid integer", input: true }]}, STATUS: 422 },
        { TEST_NAME: "With Existing Project Id With Valid Global Vars With Valid Pages With Valid Project Info With Test Model Id Empty With Valid Input Blocks With Valid Test Results", CASE_TYPE: "NEGATIVE", PROJECT_ID: 1, GLOBAL_VARS: [{ key: "Company Name", value: "ABC Company" }], PAGES: [], PROJECT_INFO_DATA: { "company": "Company ABC", "description": "My Test Project Description", "name": "My Test Project", "reportTitle": "My Report Title" }, TEST_MODEL_ID: "", INPUT_BLOCK: [1], TEST_RESULT: [1], EXPECTED: { detail: [{ type: 'int_type', loc: ['body', 'testModelId'], msg: 'Input should be a valid integer', input: "" }] }, STATUS: 422 },
        { TEST_NAME: "With Existing Project Id With Valid Global Vars With Valid Pages With Valid Project Info With Test Model Id Null With Valid Input Blocks With Valid Test Results", CASE_TYPE: "NEGATIVE", PROJECT_ID: 1, GLOBAL_VARS: [{ key: "Company Name", value: "ABC Company" }], PAGES: [], PROJECT_INFO_DATA: { "company": "Company ABC", "description": "My Test Project Description", "name": "My Test Project", "reportTitle": "My Report Title" }, TEST_MODEL_ID: null, INPUT_BLOCK: [17], TEST_RESULT: [2], EXPECTED: { globalVars: [{ key: 'Company Name', value: 'ABC Company' }], pages: [], id: 1, templateId: null, projectInfo: { name: 'My Test Project', description: 'My Test Project Description', reportTitle: 'My Report Title', company: 'Company ABC' }, testModelId: null, inputBlocks: [{ gid: 'aiverify.stock.fairness_metrics_toolbox_for_classification', cid: 'fairness_tree', id: 17 }], testResults: [{ gid: 'aiverify.stock.fairness_metrics_toolbox_for_classification', cid: 'fairness_metrics_toolbox_for_classification', id: 2 }] }, STATUS: 200 },
        { TEST_NAME: "With Existing Project Id With Valid Global Vars With Valid Pages With Valid Project Info With Test Model Id No Values With Valid Input Blocks With Valid Test Results", CASE_TYPE: "NEGATIVE", PROJECT_ID: 1, GLOBAL_VARS: [{ key: "Company Name", value: "ABC Company" }], PAGES: [], PROJECT_INFO_DATA: { "company": "Company ABC", "description": "My Test Project Description", "name": "My Test Project", "reportTitle": "My Report Title" }, INPUT_BLOCK: [17], TEST_RESULT: [2], EXPECTED: { globalVars: [{ key: 'Company Name', value: 'ABC Company' }], pages: [], id: 1, templateId: null, projectInfo: { name: 'My Test Project', description: 'My Test Project Description', reportTitle: 'My Report Title', company: 'Company ABC' }, testModelId: null, inputBlocks: [{ gid: 'aiverify.stock.fairness_metrics_toolbox_for_classification', cid: 'fairness_tree', id: 17 }], testResults: [{ gid: 'aiverify.stock.fairness_metrics_toolbox_for_classification', cid: 'fairness_metrics_toolbox_for_classification', id: 2 }] }, STATUS: 200 },
        { TEST_NAME: "With Existing Project Id With Valid Global Vars With Valid Pages With Project Info Name Characters > 256 Characters With Valid Test Model Id With Valid Input Blocks With With Valid Test Results", CASE_TYPE: "NEGATIVE", PROJECT_ID: 1, GLOBAL_VARS: [{ key: "Company Name", value: "ABC Company" }], PAGES: [], PROJECT_INFO_DATA: { "company": "Company ABC", "description": "My Test Project Description", "name": STRING_4096_CHARACTERS, "reportTitle": "My Report Title" }, TEST_MODEL_ID: 17, INPUT_BLOCK: [1], TEST_RESULT: [1], EXPECTED: { detail: [{ type: 'string_too_long', loc: ['body', 'projectInfo', 'name'], msg: 'String should have at most 256 characters', input: STRING_4096_CHARACTERS, ctx: { max_length: 256 } }] }, STATUS: 422 },
        { TEST_NAME: "With Existing Project Id With Valid Global Vars With Valid Pages With Project Info Name Float With Valid Test Model Id With Valid Input Blocks With With Valid Test Results", CASE_TYPE: "NEGATIVE", PROJECT_ID: 1, GLOBAL_VARS: [{ key: "Company Name", value: "ABC Company" }], PAGES: [], PROJECT_INFO_DATA: { "company": "Company ABC", "description": "My Test Project Description", "name": 12.3, "reportTitle": "My Report Title" }, TEST_MODEL_ID: 17, INPUT_BLOCK: [1], TEST_RESULT: [1], EXPECTED: { detail: [{ type: 'string_type', loc: ['body', 'projectInfo', 'name'], msg: 'Input should be a valid string', input: 12.3 }] }, STATUS: 422 },
        { TEST_NAME: "With Existing Project Id With Valid Global Vars With Valid Pages With Project Info Name Integer With Valid Test Model Id With Valid Input Blocks With With Valid Test Results", CASE_TYPE: "NEGATIVE", PROJECT_ID: 1, GLOBAL_VARS: [{ key: "Company Name", value: "ABC Company" }], PAGES: [], PROJECT_INFO_DATA: { "company": "Company ABC", "description": "My Test Project Description", "name": 123, "reportTitle": "My Report Title" }, TEST_MODEL_ID: 17, INPUT_BLOCK: [1], TEST_RESULT: [1], EXPECTED: { detail: [{ type: 'string_type', loc: ['body', 'projectInfo', 'name'], msg: 'Input should be a valid string', input: 123 }] }, STATUS: 422 },
        { TEST_NAME: "With Existing Project Id With Valid Global Vars With Valid Pages With Project Info Name Boolean With Valid Test Model Id With Valid Input Blocks With With Valid Test Results", CASE_TYPE: "NEGATIVE", PROJECT_ID: 1, GLOBAL_VARS: [{ key: "Company Name", value: "ABC Company" }], PAGES: [], PROJECT_INFO_DATA: { "company": "Company ABC", "description": "My Test Project Description", "name": true, "reportTitle": "My Report Title" }, TEST_MODEL_ID: 17, INPUT_BLOCK: [1], TEST_RESULT: [1], EXPECTED: { detail: [{ type: 'string_type', loc: ['body', 'projectInfo', 'name'], msg: 'Input should be a valid string', input: true }] }, STATUS: 422 },
        { TEST_NAME: "With Existing Project Id With Valid Global Vars With Valid Pages With Project Info Name Empty With Valid Test Model Id With Valid Input Blocks With With Valid Test Results", CASE_TYPE: "NEGATIVE", PROJECT_ID: 1, GLOBAL_VARS: [ { key: "Company Name", value: "ABC Company" } ], PAGES: [], PROJECT_INFO_DATA: { "company": "Company ABC", "description": "My Test Project Description", "name": "", "reportTitle": "My Report Title" }, TEST_MODEL_ID: 17, INPUT_BLOCK: [1], TEST_RESULT: [1], EXPECTED: { "detail": [{ "type": "string_too_short", "loc": [ "body", "projectInfo", "name" ], "msg": "String should have at least 1 character", "input": "", "ctx": { "min_length": 1 }}]}, STATUS: 422 },
        { TEST_NAME: "With Existing Project Id With Valid Global Vars With Valid Pages With Project Info Name Null With Valid Test Model Id With Valid Input Blocks With With Valid Test Results", CASE_TYPE: "NEGATIVE", PROJECT_ID: 1, GLOBAL_VARS: [{ key: "Company Name", value: "ABC Company" }], PAGES: [], PROJECT_INFO_DATA: { "company": "Company ABC", "description": "My Test Project Description", "name": null, "reportTitle": "My Report Title" }, TEST_MODEL_ID: 17, INPUT_BLOCK: [1], TEST_RESULT: [1], EXPECTED: { detail: [{ type: 'string_type', loc: ['body', 'projectInfo', 'name'], msg: 'Input should be a valid string', input: null }] }, STATUS: 422 },
        { TEST_NAME: "With Existing Project Id With Valid Global Vars With Valid Pages With Project Info Name No Value With Valid Test Model Id With Valid Input Blocks With With Valid Test Results", CASE_TYPE: "NEGATIVE", PROJECT_ID: 1, GLOBAL_VARS: [{ key: "Company Name", value: "ABC Company" }], PAGES: [], PROJECT_INFO_DATA: { "company": "Company ABC", "description": "My Test Project Description", "reportTitle": "My Report Title" }, TEST_MODEL_ID: 17, INPUT_BLOCK: [1], TEST_RESULT: [1], EXPECTED: { detail: [{ type: 'missing', loc: ['body', 'projectInfo', 'name'], msg: 'Field required', input: { "company": "Company ABC", "description": "My Test Project Description", "reportTitle": "My Report Title" } }] }, STATUS: 422 },
        { TEST_NAME: "With Existing Project Id With Valid Global Vars With Valid Pages With Project Info Description Characters > 256 Characters With Valid Test Model Id With Valid Input Blocks With With Valid Test Results", CASE_TYPE: "NEGATIVE", PROJECT_ID: 1, GLOBAL_VARS: [{ key: "Company Name", value: "ABC Company" }], PAGES: [], PROJECT_INFO_DATA: { "company": "Company ABC", "description": STRING_4096_CHARACTERS, "name": "My Test Project", "reportTitle": "My Report Title" }, TEST_MODEL_ID: 17, INPUT_BLOCK: [1], TEST_RESULT: [1], EXPECTED: { detail: [{ type: 'string_too_long', loc: ['body', 'projectInfo', 'description'], msg: 'String should have at most 4096 characters', input: STRING_4096_CHARACTERS, ctx: { max_length: 4096 } }] }, STATUS: 422 },
        { TEST_NAME: "With Existing Project Id With Valid Global Vars With Valid Pages With Project Info Description Float With Valid Test Model Id With Valid Input Blocks With With Valid Test Results", CASE_TYPE: "NEGATIVE", PROJECT_ID: 1, GLOBAL_VARS: [{ key: "Company Name", value: "ABC Company" }], PAGES: [], PROJECT_INFO_DATA: { "company": "Company ABC", "description": 12.3, "name": "My Test Project", "reportTitle": "My Report Title" }, TEST_MODEL_ID: 17, INPUT_BLOCK: [1], TEST_RESULT: [1], EXPECTED: { detail: [{ type: 'string_type', loc: ['body', 'projectInfo', 'description'], msg: 'Input should be a valid string', input: 12.3 }] }, STATUS: 422 },
        { TEST_NAME: "With Existing Project Id With Valid Global Vars With Valid Pages With Project Info Description Integer With Valid Test Model Id With Valid Input Blocks With With Valid Test Results", CASE_TYPE: "NEGATIVE", PROJECT_ID: 1, GLOBAL_VARS: [{ key: "Company Name", value: "ABC Company" }], PAGES: [], PROJECT_INFO_DATA: { "company": "Company ABC", "description": 123, "name": "My Test Project", "reportTitle": "My Report Title" }, TEST_MODEL_ID: 17, INPUT_BLOCK: [1], TEST_RESULT: [1], EXPECTED: { detail: [{ type: 'string_type', loc: ['body', 'projectInfo', 'description'], msg: 'Input should be a valid string', input: 123 }] }, STATUS: 422 },
        { TEST_NAME: "With Existing Project Id With Valid Global Vars With Valid Pages With Project Info Description Boolean With Valid Test Model Id With Valid Input Blocks With With Valid Test Results", CASE_TYPE: "NEGATIVE", PROJECT_ID: 1, GLOBAL_VARS: [{ key: "Company Name", value: "ABC Company" }], PAGES: [], PROJECT_INFO_DATA: { "company": "Company ABC", "description": true, "name": "My Test Project", "reportTitle": "My Report Title" }, TEST_MODEL_ID: 17, INPUT_BLOCK: [1], TEST_RESULT: [1], EXPECTED: { detail: [{ type: 'string_type', loc: ['body', 'projectInfo', 'description'], msg: 'Input should be a valid string', input: true }] }, STATUS: 422 },
        { TEST_NAME: "With Existing Project Id With Valid Global Vars With Valid Pages With Project Info Description Empty With Valid Test Model Id With Valid Input Blocks With With Valid Test Results", CASE_TYPE: "NEGATIVE", PROJECT_ID: 1, GLOBAL_VARS: [{ key: "Company Name", value: "ABC Company" }], PAGES: [], PROJECT_INFO_DATA: { "company": "Company ABC", "description": "", "name": "My Test Project", "reportTitle": "My Report Title" }, TEST_MODEL_ID: 17, INPUT_BLOCK: [1], TEST_RESULT: [1], EXPECTED: { detail: [{ ctx: { min_length: 1 }, input: "", loc: [ "body", "projectInfo", "description" ], msg: "String should have at least 1 character", type: "string_too_short" }]}, STATUS: 422 },
        { TEST_NAME: "With Existing Project Id With Valid Global Vars With Valid Pages With Project Info Description Null With Valid Test Model Id With Valid Input Blocks With With Valid Test Results", CASE_TYPE: "NEGATIVE", PROJECT_ID: 1, GLOBAL_VARS: [{ key: "Company Name", value: "ABC Company" }], PAGES: [], PROJECT_INFO_DATA: { "company": "Company ABC", "description": null, "name": "My Test Project", "reportTitle": "My Report Title" }, TEST_MODEL_ID: 17, INPUT_BLOCK: [17], TEST_RESULT: [2], EXPECTED: { pages: [], id: 1, templateId: null, projectInfo: { name: 'My Test Project', description: null, reportTitle: 'My Report Title', company: 'Company ABC' }, testModelId: 17, inputBlocks: [{ gid: 'aiverify.stock.fairness_metrics_toolbox_for_classification', cid: 'fairness_tree', id: 17 }], testResults: [{ gid: 'aiverify.stock.fairness_metrics_toolbox_for_classification', cid: 'fairness_metrics_toolbox_for_classification', id: 2 }] }, STATUS: 200 },
        { TEST_NAME: "With Existing Project Id With Valid Global Vars With Valid Pages With Project Info Description No Value With Valid Test Model Id With Valid Input Blocks With With Valid Test Results", CASE_TYPE: "NEGATIVE", PROJECT_ID: 1, GLOBAL_VARS: [{ key: "Company Name", value: "ABC Company" }], PAGES: [], PROJECT_INFO_DATA: { "company": "Company ABC", "name": "My Test Project", "reportTitle": "My Report Title" }, TEST_MODEL_ID: 17, INPUT_BLOCK: [17], TEST_RESULT: [2], EXPECTED: { pages: [], id: 1, templateId: null, projectInfo: { name: 'My Test Project', reportTitle: 'My Report Title', company: 'Company ABC' }, testModelId: 17, inputBlocks: [{ gid: 'aiverify.stock.fairness_metrics_toolbox_for_classification', cid: 'fairness_tree', id: 17 }], testResults: [{ gid: 'aiverify.stock.fairness_metrics_toolbox_for_classification', cid: 'fairness_metrics_toolbox_for_classification', id: 2 }] }, STATUS: 200 },
        { TEST_NAME: "With Existing Project Id With Valid Global Vars With Valid Pages With Project Info Report Title Characters > 256 Characters With Valid Test Model Id With Valid Input Blocks With With Valid Test Results", CASE_TYPE: "NEGATIVE", PROJECT_ID: 1, GLOBAL_VARS: [{ key: "Company Name", value: "ABC Company" }], PAGES: [], PROJECT_INFO_DATA: { "company": "Company ABC", "description": "My Test Project Description", "name": "My Test Project", "reportTitle": STRING_4096_CHARACTERS }, TEST_MODEL_ID: 17, INPUT_BLOCK: [1], TEST_RESULT: [1], EXPECTED: { detail: [{ type: 'string_too_long', loc: ['body', 'projectInfo', 'reportTitle'], msg: 'String should have at most 256 characters', input: STRING_4096_CHARACTERS, ctx: { max_length: 256 } }] }, STATUS: 422 },
        { TEST_NAME: "With Existing Project Id With Valid Global Vars With Valid Pages With Project Info Report Title Float With Valid Test Model Id With Valid Input Blocks With With Valid Test Results", CASE_TYPE: "NEGATIVE", PROJECT_ID: 1, GLOBAL_VARS: [{ key: "Company Name", value: "ABC Company" }], PAGES: [], PROJECT_INFO_DATA: { "company": "Company ABC", "description": "My Test Project Description", "name": "My Test Project", "reportTitle": 12.3 }, TEST_MODEL_ID: 17, INPUT_BLOCK: [1], TEST_RESULT: [1], EXPECTED: { detail: [{ type: 'string_type', loc: ['body', 'projectInfo', 'reportTitle'], msg: 'Input should be a valid string', input: 12.3 }] }, STATUS: 422 },
        { TEST_NAME: "With Existing Project Id With Valid Global Vars With Valid Pages With Project Info Report Title Integer With Valid Test Model Id With Valid Input Blocks With With Valid Test Results", CASE_TYPE: "NEGATIVE", PROJECT_ID: 1, GLOBAL_VARS: [{ key: "Company Name", value: "ABC Company" }], PAGES: [], PROJECT_INFO_DATA: { "company": "Company ABC", "description": "My Test Project Description", "name": "My Test Project", "reportTitle": 123 }, TEST_MODEL_ID: 17, INPUT_BLOCK: [1], TEST_RESULT: [1], EXPECTED: { detail: [{ type: 'string_type', loc: ['body', 'projectInfo', 'reportTitle'], msg: 'Input should be a valid string', input: 123 }] }, STATUS: 422 },
        { TEST_NAME: "With Existing Project Id With Valid Global Vars With Valid Pages With Project Info Report Title Boolean With Valid Test Model Id With Valid Input Blocks With With Valid Test Results", CASE_TYPE: "NEGATIVE", PROJECT_ID: 1, GLOBAL_VARS: [{ key: "Company Name", value: "ABC Company" }], PAGES: [], PROJECT_INFO_DATA: { "company": "Company ABC", "description": "My Test Project Description", "name": "My Test Project", "reportTitle": true }, TEST_MODEL_ID: 17, INPUT_BLOCK: [1], TEST_RESULT: [1], EXPECTED: { detail: [{ type: 'string_type', loc: ['body', 'projectInfo', 'reportTitle'], msg: 'Input should be a valid string', input: true }] }, STATUS: 422 },
        { TEST_NAME: "With Existing Project Id With Valid Global Vars With Valid Pages With Project Info Report Title Empty With Valid Test Model Id With Valid Input Blocks With With Valid Test Results", CASE_TYPE: "NEGATIVE", PROJECT_ID: 1, GLOBAL_VARS: [{ key: "Company Name", value: "ABC Company" }], PAGES: [], PROJECT_INFO_DATA: { "company": "Company ABC", "description": "My Test Project Description", "name": "My Test Project", "reportTitle": "" }, TEST_MODEL_ID: 17, INPUT_BLOCK: [17], TEST_RESULT: [1], EXPECTED: { detail: [{ ctx: { min_length: 1 }, input: "", loc: [ "body", "projectInfo", "reportTitle" ], msg: "String should have at least 1 character", type: "string_too_short" }]}, STATUS: 422 },
        { TEST_NAME: "With Existing Project Id With Valid Global Vars With Valid Pages With Project Info Report Title Null With Valid Test Model Id With Valid Input Blocks With With Valid Test Results", CASE_TYPE: "NEGATIVE", PROJECT_ID: 1, GLOBAL_VARS: [{ key: "Company Name", value: "ABC Company" }], PAGES: [], PROJECT_INFO_DATA: { "company": "Company ABC", "description": "My Test Project Description", "name": "My Test Project", "reportTitle": null }, TEST_MODEL_ID: 17, INPUT_BLOCK: [17], TEST_RESULT: [2], EXPECTED: { pages: [], id: 1, templateId: null, projectInfo: { name: 'My Test Project', description: 'My Test Project Description', reportTitle: null, company: 'Company ABC' }, testModelId: 17, inputBlocks: [{ gid: 'aiverify.stock.fairness_metrics_toolbox_for_classification', cid: 'fairness_tree', id: 17 }], testResults: [{ gid: 'aiverify.stock.fairness_metrics_toolbox_for_classification', cid: 'fairness_metrics_toolbox_for_classification', id: 2 }] }, STATUS: 200 },
        { TEST_NAME: "With Existing Project Id With Valid Global Vars With Valid Pages With Project Info Report Title No Value With Valid Test Model Id With Valid Input Blocks With With Valid Test Results", CASE_TYPE: "NEGATIVE", PROJECT_ID: 1, GLOBAL_VARS: [{ key: "Company Name", value: "ABC Company" }], PAGES: [], PROJECT_INFO_DATA: { "company": "Company ABC", "description": "My Test Project Description", "name": "My Test Project" }, TEST_MODEL_ID: 17, INPUT_BLOCK: [17], TEST_RESULT: [2], EXPECTED: { pages: [], id: 1, templateId: null, projectInfo: { name: 'My Test Project', description: "My Test Project Description", reportTitle: null, company: 'Company ABC' }, testModelId: 17, inputBlocks: [{ gid: 'aiverify.stock.fairness_metrics_toolbox_for_classification', cid: 'fairness_tree', id: 17 }], testResults: [{ gid: 'aiverify.stock.fairness_metrics_toolbox_for_classification', cid: 'fairness_metrics_toolbox_for_classification', id: 2 }] }, STATUS: 200 },
        { TEST_NAME: "With Existing Project Id With Valid Global Vars With Valid Pages With Project Info Company Characters > 256 Characters With Valid Test Model Id With Valid Input Blocks With With Valid Test Results", CASE_TYPE: "NEGATIVE", PROJECT_ID: 1, GLOBAL_VARS: [{ key: "Company Name", value: "ABC Company" }], PAGES: [], PROJECT_INFO_DATA: { "company": STRING_4096_CHARACTERS, "description": "My Test Project Description", "name": "My Test Project", "reportTitle": "My Report Title" }, TEST_MODEL_ID: 17, INPUT_BLOCK: [1], TEST_RESULT: [1], EXPECTED: { detail: [{ type: 'string_too_long', loc: ['body', 'projectInfo', 'company'], msg: 'String should have at most 256 characters', input: STRING_4096_CHARACTERS, ctx: { max_length: 256 } }] }, STATUS: 422 },
        { TEST_NAME: "With Existing Project Id With Valid Global Vars With Valid Pages With Project Info Company Float With Valid Test Model Id With Valid Input Blocks With With Valid Test Results", CASE_TYPE: "NEGATIVE", PROJECT_ID: 1, GLOBAL_VARS: [{ key: "Company Name", value: "ABC Company" }], PAGES: [], PROJECT_INFO_DATA: { "company": 12.3, "description": "My Test Project Description", "name": "My Test Project", "reportTitle": "My Report Title" }, TEST_MODEL_ID: 17, INPUT_BLOCK: [1], TEST_RESULT: [1], EXPECTED: { detail: [{ type: 'string_type', loc: ['body', 'projectInfo', 'company'], msg: 'Input should be a valid string', input: 12.3 }] }, STATUS: 422 },
        { TEST_NAME: "With Existing Project Id With Valid Global Vars With Valid Pages With Project Info Company Integer With Valid Test Model Id With Valid Input Blocks With With Valid Test Results", CASE_TYPE: "NEGATIVE", PROJECT_ID: 1, GLOBAL_VARS: [{ key: "Company Name", value: "ABC Company" }], PAGES: [], PROJECT_INFO_DATA: { "company": 123, "description": "My Test Project Description", "name": "My Test Project", "reportTitle": "My Report Title" }, TEST_MODEL_ID: 17, INPUT_BLOCK: [1], TEST_RESULT: [1], EXPECTED: { detail: [{ type: 'string_type', loc: ['body', 'projectInfo', 'company'], msg: 'Input should be a valid string', input: 123 }] }, STATUS: 422 },
        { TEST_NAME: "With Existing Project Id With Valid Global Vars With Valid Pages With Project Info Company Boolean With Valid Test Model Id With Valid Input Blocks With With Valid Test Results", CASE_TYPE: "NEGATIVE", PROJECT_ID: 1, GLOBAL_VARS: [{ key: "Company Name", value: "ABC Company" }], PAGES: [], PROJECT_INFO_DATA: { "company": true, "description": "My Test Project Description", "name": "My Test Project", "reportTitle": "My Report Title" }, TEST_MODEL_ID: 17, INPUT_BLOCK: [1], TEST_RESULT: [1], EXPECTED: { detail: [{ type: 'string_type', loc: ['body', 'projectInfo', 'company'], msg: 'Input should be a valid string', input: true }] }, STATUS: 422 },
        { TEST_NAME: "With Existing Project Id With Valid Global Vars With Valid Pages With Project Info Company Empty With Valid Test Model Id With Valid Input Blocks With With Valid Test Results", CASE_TYPE: "NEGATIVE", PROJECT_ID: 1, GLOBAL_VARS: [{ key: "Company Name", value: "ABC Company" }], PAGES: [], PROJECT_INFO_DATA: { "company": "", "description": "My Test Project Description", "name": "My Test Project", "reportTitle": "My Report Title" }, TEST_MODEL_ID: 17, INPUT_BLOCK: [17], TEST_RESULT: [2], EXPECTED: { globalVars: [{ key: 'Company Name', value: 'ABC Company' }], pages: [], id: 1, templateId: null, projectInfo: { name: 'My Test Project', reportTitle: 'My Report Title', description: 'My Test Project Description', company: '' }, testModelId: 17, inputBlocks: [{ gid: 'aiverify.stock.fairness_metrics_toolbox_for_classification', cid: 'fairness_tree', id: 17 }], testResults: [{ gid: 'aiverify.stock.fairness_metrics_toolbox_for_classification', cid: 'fairness_metrics_toolbox_for_classification', id: 2 }] }, STATUS: 200 },
        { TEST_NAME: "With Existing Project Id With Valid Global Vars With Valid Pages With Project Info Company Null With Valid Test Model Id With Valid Input Blocks With With Valid Test Results", CASE_TYPE: "NEGATIVE", PROJECT_ID: 1, GLOBAL_VARS: [{ key: "Company Name", value: "ABC Company" }], PAGES: [], PROJECT_INFO_DATA: { "company": null, "description": "My Test Project Description", "name": "My Test Project", "reportTitle": "My Report Title" }, TEST_MODEL_ID: 17, INPUT_BLOCK: [17], TEST_RESULT: [2], EXPECTED: { pages: [], id: 1, templateId: null, projectInfo: { name: 'My Test Project', description: 'My Test Project Description', reportTitle: 'My Report Title', company: null }, testModelId: 17, inputBlocks: [{ gid: 'aiverify.stock.fairness_metrics_toolbox_for_classification', cid: 'fairness_tree', id: 17 }], testResults: [{ gid: 'aiverify.stock.fairness_metrics_toolbox_for_classification', cid: 'fairness_metrics_toolbox_for_classification', id: 2 }] }, STATUS: 200 },
        { TEST_NAME: "With Existing Project Id With Valid Global Vars With Valid Pages With Project Info Company No Value With Valid Test Model Id With Valid Input Blocks With With Valid Test Results", CASE_TYPE: "NEGATIVE", PROJECT_ID: 1, GLOBAL_VARS: [{ key: "Company Name", value: "ABC Company" }], PAGES: [], PROJECT_INFO_DATA: { "description": "My Test Project Description", "name": "My Test Project", "reportTitle": "My Report Title" }, TEST_MODEL_ID: 17, INPUT_BLOCK: [17], TEST_RESULT: [2], EXPECTED: { pages: [], id: 1, templateId: null, projectInfo: { name: 'My Test Project', description: "My Test Project Description", reportTitle: 'My Report Title', company: null }, testModelId: 17, inputBlocks: [{ gid: 'aiverify.stock.fairness_metrics_toolbox_for_classification', cid: 'fairness_tree', id: 17 }], testResults: [{ gid: 'aiverify.stock.fairness_metrics_toolbox_for_classification', cid: 'fairness_metrics_toolbox_for_classification', id: 2 }] }, STATUS: 200 },
        { TEST_NAME: "With Existing Project Id With Valid Global Vars With Pages Non Array Object Items With Valid Project Info With Valid Test Model Id With Valid Input Blocks With Valid Test Results", CASE_TYPE: "NEGATIVE", PROJECT_ID: 1, GLOBAL_VARS: [{ key: "Company Name", value: "ABC Company" }], PAGES: 1, PROJECT_INFO_DATA: { "company": "Company ABC", "description": "My Test Project Description", "name": "My Test Project", "reportTitle": "My Report Title" }, TEST_MODEL_ID: 17, INPUT_BLOCK: [1], TEST_RESULT: [1], EXPECTED: { "detail": [{ "input": 1, "loc": ["body", "pages"], "msg": "Input should be a valid list", "type": "list_type" }] }, STATUS: 422 },
        { TEST_NAME: "With Existing Project Id With Valid Global Vars With Pages Non Array Object Layout With Valid Project Info With Valid Test Model Id With Valid Input Blocks With Valid Test Results", CASE_TYPE: "NEGATIVE", PROJECT_ID: 1, GLOBAL_VARS: [{ key: "Company Name", value: "ABC Company" }], PAGES: [{ layouts: 1, reportWidgets: [] }], PROJECT_INFO_DATA: { "company": "Company ABC", "description": "My Test Project Description", "name": "My Test Project", "reportTitle": "My Report Title" }, TEST_MODEL_ID: 17, INPUT_BLOCK: [1], TEST_RESULT: [1], EXPECTED: { "detail": [{ "input": 1, "loc": ["body", "pages", 0, "layouts"], "msg": "Input should be a valid list", "type": "list_type" }] }, STATUS: 422 },
        { TEST_NAME: "With Existing Project Id WIth Valid Global Vars With Pages Non Array Object Report Widgets With Valid Project Info WIth Valid Test Model Id With Valid Input Block With Valid Test Results", CASE_TYPE: "NEGATIVE", PROJECT_ID: 1, GLOBAL_VARS: [{ key: "Company Name", value: "ABC Company" }], PAGES: [{ layouts: [], reportWidgets: 1 }], PROJECT_INFO_DATA: { "company": "Company ABC", "description": "My Test Project Description", "name": "My Test Project", "reportTitle": "My Report Title" }, TEST_MODEL_ID: 17, INPUT_BLOCK: [1], TEST_RESULT: [1], EXPECTED: { "detail": [{ "input": 1, "loc": ["body", "pages", 0, "reportWidgets"], "msg": "Input should be a valid list", "type": "list_type" }] }, STATUS: 422 },
        { TEST_NAME: "With Existing Project Id With Non Array Object Global Vars With Valid Pages With Valid Project Info With Valid Test Model Id With Valid Input Blocks With Valid Test Results", CASE_TYPE: "NEGATIVE", PROJECT_ID: 1, GLOBAL_VARS: 1, PAGES: [], PROJECT_INFO_DATA: { "company": "Company ABC", "description": "My Test Project Description", "name": "My Test Project", "reportTitle": "My Report Title" }, TEST_MODEL_ID: 17, INPUT_BLOCK: [1], TEST_RESULT: [1], EXPECTED: { detail: [{ type: 'list_type', loc: ['body', 'globalVars'], msg: 'Input should be a valid list', input: 1 }] }, STATUS: 422 },
        { TEST_NAME: "With Existing Project Id With Empty Global Vars With Valid Pages With Valid Project Info With Valid Test Model Id With Valid Input Blocks With Valid Test Results", CASE_TYPE: "NEGATIVE", PROJECT_ID: 1, GLOBAL_VARS: "", PAGES: [], PROJECT_INFO_DATA: { "company": "Company ABC", "description": "My Test Project Description", "name": "My Test Project", "reportTitle": "My Report Title" }, TEST_MODEL_ID: 17, INPUT_BLOCK: [1], TEST_RESULT: [1], EXPECTED: { detail: [{ type: 'list_type', loc: ['body', 'globalVars'], msg: 'Input should be a valid list', input: "" }] }, STATUS: 422 },
        { TEST_NAME: "With Existing Project Id With Null Object Global Vars With Valid Pages With Valid Project Info With Valid Test Model Id With Valid Input Blocks With Valid Test Results", CASE_TYPE: "NEGATIVE", PROJECT_ID: 1, GLOBAL_VARS: null, PAGES: [], PROJECT_INFO_DATA: { "company": "Company ABC", "description": "My Test Project Description", "name": "My Test Project", "reportTitle": "My Report Title" }, TEST_MODEL_ID: 17, INPUT_BLOCK: [17], TEST_RESULT: [2], EXPECTED: { pages: [], id: 1, templateId: null, projectInfo: { name: 'My Test Project', reportTitle: 'My Report Title', company: 'Company ABC' }, testModelId: 17, inputBlocks: [{ gid: 'aiverify.stock.fairness_metrics_toolbox_for_classification', cid: 'fairness_tree', id: 17 }], testResults: [{ gid: 'aiverify.stock.fairness_metrics_toolbox_for_classification', cid: 'fairness_metrics_toolbox_for_classification', id: 2 }] }, STATUS: 200 },
        { TEST_NAME: "With Existing Project Id With Key > 128 Characters Global Vars With Valid Pages With Valid Project Info With Valid Test Model Id With Valid Input Blocks With With Valid Test Results", CASE_TYPE: "NEGATIVE", PROJECT_ID: 1, GLOBAL_VARS: [{ key: STRING_4096_CHARACTERS, value: "ABC Company" }], PAGES: [], PROJECT_INFO_DATA: { "company": "Company ABC", "description": "My Test Project Description", "name": "My Test Project", "reportTitle": "My Report Title" }, TEST_MODEL_ID: 17, INPUT_BLOCK: [1], TEST_RESULT: [1], EXPECTED: { detail: [{ type: 'string_too_long', loc: ['body', 'globalVars', 0, 'key'], msg: 'String should have at most 128 characters', input: STRING_4096_CHARACTERS, ctx: { max_length: 128 } }] }, STATUS: 422 },
        { TEST_NAME: "With Existing Project Id With Key Integer Global Vars With Valid Pages With Valid Project Info With Valid Test Model Id With Valid Input Blocks With With Valid Test Results", CASE_TYPE: "NEGATIVE", PROJECT_ID: 1, GLOBAL_VARS: [{ key: 123, value: "ABC Company" }], PAGES: [], PROJECT_INFO_DATA: { "company": "Company ABC", "description": "My Test Project Description", "name": "My Test Project", "reportTitle": "My Report Title" }, TEST_MODEL_ID: 17, INPUT_BLOCK: [1], TEST_RESULT: [1], EXPECTED: { detail: [{ type: 'string_type', loc: ['body', 'globalVars', 0, 'key'], msg: 'Input should be a valid string', input: 123 }] }, STATUS: 422 },
        { TEST_NAME: "With Existing Project Id With Key Float Global Vars Valid Pages With Valid Project Info With Valid Test Model Id With Valid Input Blocks With With Valid Test Results", CASE_TYPE: "NEGATIVE", PROJECT_ID: 1, GLOBAL_VARS: [{ key: 12.3, value: "ABC Company" }], PAGES: [], PROJECT_INFO_DATA: { "company": "Company ABC", "description": "My Test Project Description", "name": "My Test Project", "reportTitle": "My Report Title" }, TEST_MODEL_ID: 17, INPUT_BLOCK: [1], TEST_RESULT: [1], EXPECTED: { detail: [{ type: 'string_type', loc: ['body', 'globalVars', 0, 'key'], msg: 'Input should be a valid string', input: 12.3 }] }, STATUS: 422 },
        { TEST_NAME: "With Existing Project Id With Key Boolean Global Vars Valid Pages With Valid Project Info With Valid Test Model Id With Valid Input Blocks With With Valid Test Results", CASE_TYPE: "NEGATIVE", PROJECT_ID: 1, GLOBAL_VARS: [{ key: true, value: "ABC Company" }], PAGES: [], PROJECT_INFO_DATA: { "company": "Company ABC", "description": "My Test Project Description", "name": "My Test Project", "reportTitle": "My Report Title" }, TEST_MODEL_ID: 17, INPUT_BLOCK: [1], TEST_RESULT: [1], EXPECTED: { detail: [{ type: 'string_type', loc: ['body', 'globalVars', 0, 'key'], msg: 'Input should be a valid string', input: true }] }, STATUS: 422 },
        { TEST_NAME: "With Existing Project Id With Key Empty Global Vars With Valid Pages With Valid Project Info With Valid Test Model Id With Valid Input Blocks With With Valid Test Results", CASE_TYPE: "NEGATIVE", PROJECT_ID: 1, GLOBAL_VARS: [{ key: "", value: "ABC Company" }], PAGES: [], PROJECT_INFO_DATA: { "company": "Company ABC", "description": "My Test Project Description", "name": "My Test Project", "reportTitle": "My Report Title" }, TEST_MODEL_ID: 17, INPUT_BLOCK: [1], TEST_RESULT: [1], EXPECTED: { detail: [{ type: 'string_too_short', loc: ['body', 'globalVars', 0, 'key'], msg: 'String should have at least 1 character', input: "" }] }, STATUS: 422 }, // <-- Example of empty input
        { TEST_NAME: "With Existing Project Id With Key Null Valid Global Vars With Valid Pages With Valid Project Info With Valid Test Model Id With Valid Input Blocks With With Valid Test Results", CASE_TYPE: "NEGATIVE", PROJECT_ID: 1, GLOBAL_VARS: [{ key: null, value: "ABC Company" }], PAGES: [], PROJECT_INFO_DATA: { "company": "Company ABC", "description": "My Test Project Description", "name": "My Test Project", "reportTitle": "My Report Title" }, TEST_MODEL_ID: 17, INPUT_BLOCK: [1], TEST_RESULT: [1], EXPECTED: { detail: [{ type: 'string_type', loc: ['body', 'globalVars', 0, 'key'], msg: 'Input should be a valid string', input: null }] }, STATUS: 422 },
        { TEST_NAME: "With Existing Project Id With Key No Values Global Vars With Valid Pages With Valid Project Info With Valid Test Model Id With Valid Input Blocks With With Valid Test Results", CASE_TYPE: "NEGATIVE", PROJECT_ID: 1, GLOBAL_VARS: [{ value: "ABC Company" }], PAGES: [], PROJECT_INFO_DATA: { "company": "Company ABC", "description": "My Test Project Description", "name": "My Test Project", "reportTitle": "My Report Title" }, TEST_MODEL_ID: 17, INPUT_BLOCK: [1], TEST_RESULT: [1], EXPECTED: { detail: [{ type: 'missing', loc: ['body', 'globalVars', 0, 'key'], msg: 'Field required', input: { value: 'ABC Company' } }] }, STATUS: 422 },
        { TEST_NAME: "With Existing Project Id With Value > 128 Characters Global Vars With Valid Pages With Valid Project Info With Valid Test Model Id With Valid Input Blocks With With Valid Test Results", CASE_TYPE: "NEGATIVE", PROJECT_ID: 1, GLOBAL_VARS: [{ key: "Company Name", value: STRING_4096_CHARACTERS }], PAGES: [], PROJECT_INFO_DATA: { "company": "Company ABC", "description": "My Test Project Description", "name": "My Test Project", "reportTitle": "My Report Title" }, TEST_MODEL_ID: 17, INPUT_BLOCK: [1], TEST_RESULT: [1], EXPECTED: { detail: [{ type: 'string_too_long', loc: ['body', 'globalVars', 0, 'value'], msg: 'String should have at most 128 characters', input: STRING_4096_CHARACTERS, ctx: { max_length: 128 } }] }, STATUS: 422 },
        { TEST_NAME: "With Existing Project Id With Value Integer Global Vars With Valid Pages With Valid Project Info With Valid Test Model Id With Valid Input Blocks With With Valid Test Results", CASE_TYPE: "NEGATIVE", PROJECT_ID: 1, GLOBAL_VARS: [{ key: "Company Name", value: 123 }], PAGES: [], PROJECT_INFO_DATA: { "company": "Company ABC", "description": "My Test Project Description", "name": "My Test Project", "reportTitle": "My Report Title" }, TEST_MODEL_ID: 17, INPUT_BLOCK: [1], TEST_RESULT: [1], EXPECTED: { detail: [{ type: 'string_type', loc: ['body', 'globalVars', 0, 'value'], msg: 'Input should be a valid string', input: 123 }] }, STATUS: 422 },
        { TEST_NAME: "With Existing Project Id With Value Float Global Vars Valid Pages With Valid Project Info With Valid Test Model Id With Valid Input Blocks With With Valid Test Results", CASE_TYPE: "NEGATIVE", PROJECT_ID: 1, GLOBAL_VARS: [{ key: "Company Name", value: 12.3 }], PAGES: [], PROJECT_INFO_DATA: { "company": "Company ABC", "description": "My Test Project Description", "name": "My Test Project", "reportTitle": "My Report Title" }, TEST_MODEL_ID: 17, INPUT_BLOCK: [1], TEST_RESULT: [1], EXPECTED: { detail: [{ type: 'string_type', loc: ['body', 'globalVars', 0, 'value'], msg: 'Input should be a valid string', input: 12.3 }] }, STATUS: 422 },
        { TEST_NAME: "With Existing Project Id With Value Boolean Global Vars Valid Pages With Valid Project Info Boolean With Valid Test Model Id With Valid Input Blocks With With Valid Test Results", CASE_TYPE: "NEGATIVE", PROJECT_ID: 1, GLOBAL_VARS: [{ key: "Company Name", value: true }], PAGES: [], PROJECT_INFO_DATA: { "company": "Company ABC", "description": "My Test Project Description", "name": "My Test Project", "reportTitle": "My Report Title" }, TEST_MODEL_ID: 17, INPUT_BLOCK: [1], TEST_RESULT: [1], EXPECTED: { detail: [{ type: 'string_type', loc: ['body', 'globalVars', 0, 'value'], msg: 'Input should be a valid string', input: true }] }, STATUS: 422 },
        { TEST_NAME: "With Existing Project Id With Value Empty Global Vars With Valid Pages With Valid Project Info With Valid Test Model Id With Valid Input Blocks With With Valid Test Results", CASE_TYPE: "NEGATIVE", PROJECT_ID: 1, GLOBAL_VARS: [ { key: "Company Name", value: "" } ], PAGES: [], PROJECT_INFO_DATA: { "company": "Company ABC", "description": "My Test Project Description", "name": "My Test Project", "reportTitle": "My Report Title" }, TEST_MODEL_ID: 17, INPUT_BLOCK: [17], TEST_RESULT: [2], EXPECTED: { pages: [], id: 1, templateId: null, projectInfo: { name: 'My Test Project', reportTitle: 'My Report Title', company: 'Company ABC' }, testModelId: 17, inputBlocks: [{ gid: 'aiverify.stock.fairness_metrics_toolbox_for_classification', cid: 'fairness_tree', id: 17 }], testResults: [{ gid: 'aiverify.stock.fairness_metrics_toolbox_for_classification', cid: 'fairness_metrics_toolbox_for_classification', id: 2 }] }, STATUS: 200 },
        { TEST_NAME: "With Existing Project Id With Value Null Valid Global Vars With Valid Pages With Valid Project Info With Valid Test Model Id With Valid Input Blocks With With Valid Test Results", CASE_TYPE: "NEGATIVE", PROJECT_ID: 1, GLOBAL_VARS: [{ key: "Company Name", value: null }], PAGES: [], PROJECT_INFO_DATA: { "company": "Company ABC", "description": "My Test Project Description", "name": "My Test Project", "reportTitle": "My Report Title" }, TEST_MODEL_ID: 17, INPUT_BLOCK: [1], TEST_RESULT: [1], EXPECTED: { detail: [{ type: 'string_type', loc: ['body', 'globalVars', 0, 'value'], msg: 'Input should be a valid string', input: null }] }, STATUS: 422 },
        { TEST_NAME: "With Existing Project Id With Value No Values Global Vars With Valid Pages With Valid Project Info With Valid Test Model Id With Valid Input Blocks With With Valid Test Results", CASE_TYPE: "NEGATIVE", PROJECT_ID: 1, GLOBAL_VARS: [{ key: "Company Name", }], PAGES: [], PROJECT_INFO_DATA: { "company": "Company ABC", "description": "My Test Project Description", "name": "My Test Project", "reportTitle": "My Report Title" }, TEST_MODEL_ID: 17, INPUT_BLOCK: [1], TEST_RESULT: [1], EXPECTED: { detail: [{ type: 'missing', loc: ['body', 'globalVars', 0, 'value'], msg: 'Field required', input: { key: 'Company Name' } }] }, STATUS: 422 },
        { TEST_NAME: "With Non-Existing Project Id With Valid Global Vars With Valid Pages With Valid Project Info With Valid Test Model Id With Valid Input Blocks With Valid Test Results", CASE_TYPE: "NEGATIVE", PROJECT_ID: 100000000000000, GLOBAL_VARS: [{ key: "Company Name", value: "ABC Company" }], PAGES: [], PROJECT_INFO_DATA: { "company": "Company ABC", "description": "My Test Project Description", "name": "My Test Project", "reportTitle": "My Report Title" }, TEST_MODEL_ID: 17, INPUT_BLOCK: [1], TEST_RESULT: [1], EXPECTED: { detail: 'Project not found' }, STATUS: 404 },
        { TEST_NAME: "With String Project Id With Valid Global Vars With Valid Pages With Valid Project Info With Valid Test Model Id With Valid Input Blocks With Valid Test Results", CASE_TYPE: "NEGATIVE", PROJECT_ID: "abc", GLOBAL_VARS: [{ key: "Company Name", value: "ABC Company" }], PAGES: [], PROJECT_INFO_DATA: { "company": "Company ABC", "description": "My Test Project Description", "name": "My Test Project", "reportTitle": "My Report Title" }, TEST_MODEL_ID: 17, INPUT_BLOCK: [1], TEST_RESULT: [1], EXPECTED: { detail: [{ type: 'int_parsing', loc: ['path', 'project_id'], msg: 'Input should be a valid integer, unable to parse string as an integer', input: 'abc' }] }, STATUS: 422 },
        { TEST_NAME: "With Float Project Id With Valid Global Vars With Valid Pages With Valid Project Info With Valid Test Model Id With Valid Input Blocks With Valid Test Results", CASE_TYPE: "NEGATIVE", PROJECT_ID: 12.3, GLOBAL_VARS: [{ key: "Company Name", value: "ABC Company" }], PAGES: [], PROJECT_INFO_DATA: { "company": "Company ABC", "description": "My Test Project Description", "name": "My Test Project", "reportTitle": "My Report Title" }, TEST_MODEL_ID: 17, INPUT_BLOCK: [1], TEST_RESULT: [1], EXPECTED: { detail: [{ type: 'int_parsing', loc: ['path', 'project_id'], msg: 'Input should be a valid integer, unable to parse string as an integer', input: '12.3' }] }, STATUS: 422 },
        { TEST_NAME: "With Boolean Project Id With Valid Global Vars With Valid Pages With Valid Project Info With Valid Test Model Id With Valid Input Blocks With Valid Test Results", CASE_TYPE: "NEGATIVE", PROJECT_ID: true, GLOBAL_VARS: [{ key: "Company Name", value: "ABC Company" }], PAGES: [], PROJECT_INFO_DATA: { "company": "Company ABC", "description": "My Test Project Description", "name": "My Test Project", "reportTitle": "My Report Title" }, TEST_MODEL_ID: 17, INPUT_BLOCK: [1], TEST_RESULT: [1], EXPECTED: { detail: [{ type: 'int_parsing', loc: ['path', 'project_id'], msg: 'Input should be a valid integer, unable to parse string as an integer', input: 'true' }] }, STATUS: 422 },
        { TEST_NAME: "With Empty Project Id With Valid Global Vars With Valid Pages With Valid Project Info With Valid Test Model Id With Valid Input Blocks With Valid Test Results", CASE_TYPE: "NEGATIVE", PROJECT_ID: "", GLOBAL_VARS: [{ key: "Company Name", value: "ABC Company" }], PAGES: [], PROJECT_INFO_DATA: { "company": "Company ABC", "description": "My Test Project Description", "name": "My Test Project", "reportTitle": "My Report Title" }, TEST_MODEL_ID: 17, INPUT_BLOCK: [1], TEST_RESULT: [1], EXPECTED: { detail: 'Method Not Allowed' }, STATUS: 405 },
        { TEST_NAME: "With Null Project Id With Valid Global Vars With Valid Pages With Valid Project Info With Valid Test Model Id With Valid Input Blocks With Valid Test Results", CASE_TYPE: "NEGATIVE", PROJECT_ID: null, GLOBAL_VARS: [{ key: "Company Name", value: "ABC Company" }], PAGES: [], PROJECT_INFO_DATA: { "company": "Company ABC", "description": "My Test Project Description", "name": "My Test Project", "reportTitle": "My Report Title" }, TEST_MODEL_ID: 17, INPUT_BLOCK: [1], TEST_RESULT: [1], EXPECTED: { detail: [{ type: 'int_parsing', loc: ['path', 'project_id'], msg: 'Input should be a valid integer, unable to parse string as an integer', input: 'null' }] }, STATUS: 422 },
        { TEST_NAME: "With No Value Project Id With Valid Global Vars With Valid Pages With Valid Project Info With Valid Test Model Id With Valid Input Blocks With Valid Test Results", CASE_TYPE: "NEGATIVE", GLOBAL_VARS: [{ key: "Company Name", value: "ABC Company" }], PAGES: [], PROJECT_INFO_DATA: { "company": "Company ABC", "description": "My Test Project Description", "name": "My Test Project", "reportTitle": "My Report Title" }, TEST_MODEL_ID: 17, INPUT_BLOCK: [1], TEST_RESULT: [1], EXPECTED: { detail: [{ type: 'int_parsing', loc: ['path', 'project_id'], msg: 'Input should be a valid integer, unable to parse string as an integer', input: 'undefined' }] }, STATUS: 422 },

    ]

    for (const data of PATCH_PROJECT_BY_PROJECT_ID) {

        let response

        const PROJECT_INFO_DATA = {
            "company": "Company ABC",
            "description": "My Test Project Description",
            "name": "My Test Project",
            "reportTitle": "My Report Title"
        }

        test(`Patch Project By ID ${data.TEST_NAME}`, async () => {

            if (data.CASE_TYPE == "POSITIVE") {

                /* Create Project */
                response = await axios.post(url + ":" + port_number + "/projects", PROJECT_INFO_DATA, {
                    validateStatus: function (status) {
                        return status
                    }
                })

                /* Set Project ID */
                const project_id = response.data.id

                /* Upload AI Model */
                const ai_model_form = new FormData()
                ai_model_form.append('model_types', data.MODEL_TYPE)
                ai_model_form.append('files', fs.readFileSync(data.MODEL_PATH), data.MODEL_NAME)

                response = await axios.post(url + ":" + port_number + "/test_models/upload", ai_model_form,
                    {
                        headers: {
                            ...ai_model_form.getHeaders(),
                            'accept': 'application/json',
                            'Content-Type': 'multipart/form-data'
                        },
                        validateStatus: function (status) {
                            return status
                        }
                    })

                /* Set Model ID */
                const model_id = response.data[0].id

                /* Create Input Block */
                response = await axios.post(url + ":" + port_number + "/input_block_data", data.INPUT_BLOCK, {
                    validateStatus: function (status) {
                        return status
                    }
                })

                /* Set Input Block ID */
                const input_block_id = response.data.id

                /* Upload Test Results */
                const test_results_zip_form = new FormData()
                test_results_zip_form.append('file', fs.readFileSync(data.ARTIFACT_PATH), data.ARTIFACT_NAME)

                response = await axios.post(url + ":" + port_number + '/test_results/upload_zip', test_results_zip_form,
                    {
                        headers: {
                            ...test_results_zip_form.getHeaders(),
                            'accept': 'application/json',
                            'Content-Type': 'multipart/form-data'
                        },
                        validateStatus: function (status) {
                            return status
                        }
                    }
                )

                /* Set Test Results ID */
                const test_results_id_array = JSON.stringify(response.data)
                const test_results_id = test_results_id_array.replace("\"]", "").split("/", 3)
                const testResultsID = parseInt(test_results_id[2].replace('\",\"', ""))

                /* Create Update Project Data */
                const PATCH_PROJECT_DATA = {
                    "globalVars": [
                        {
                            "key": "Company Name",
                            "value": "ABC Company"
                        }
                    ],
                    "pages": [],
                    "projectInfo": PROJECT_INFO_DATA,
                    "testModelId": model_id,
                    "inputBlocks": [input_block_id],
                    "testResults": [testResultsID]
                }

                /* Patch Project */
                response = await axios.patch(url + ":" + port_number + "/projects/projects/" + project_id, PATCH_PROJECT_DATA, {
                    validateStatus: function (status) {
                        return status
                    }
                })

                /* Assert Patch Project By ID */
                expect.soft(response.data.globalVars).toMatchObject(PATCH_PROJECT_DATA.globalVars)
                expect.soft(response.data.pages).toBeTruthy()
                expect.soft(response.data.id).toBe(project_id)
                expect.soft(response.data.templateId).toBeNull()
                expect.soft(response.data.projectInfo.company).toBe(PROJECT_INFO_DATA.company)
                expect.soft(response.data.projectInfo.description).toBe(PROJECT_INFO_DATA.description)
                expect.soft(response.data.projectInfo.name).toBe(PROJECT_INFO_DATA.name)
                expect.soft(response.data.projectInfo.reportTitle).toBe(PROJECT_INFO_DATA.reportTitle)
                expect.soft(response.data.testModelId).toBe(model_id)
                expect.soft(response.data.inputBlocks).toMatchObject([{ "cid": "fairness_tree", "gid": "aiverify.stock.fairness_metrics_toolbox_for_classification", "id": input_block_id }])
                expect.soft(response.data.testResults).toMatchObject([{ "cid": "aiverify_blur_corruptions", "gid": "aiverify.stock.image_corruption_toolbox", id: parseInt(testResultsID) }])
                expect.soft(response.data.created_at).toBeTruthy()
                expect.soft(response.data.updated_at).toBeTruthy()

                expect.soft(response.status).toBe(data.STATUS)

            }

            if (data.CASE_TYPE == "NEGATIVE") {

                /* Set Project ID */
                const project_id = data.PROJECT_ID

                /* Create Patch Project Data */
                const PATCH_PROJECT_DATA = {
                    "globalVars": data.GLOBAL_VARS,
                    "pages": data.PAGES,
                    "projectInfo": data.PROJECT_INFO_DATA,
                    "testModelId": data.TEST_MODEL_ID,
                    "inputBlocks": data.INPUT_BLOCK,
                    "testResults": data.TEST_RESULT
                }

                /* Patch Project */
                response = await axios.patch(url + ":" + port_number + "/projects/projects/" + project_id, PATCH_PROJECT_DATA, {
                    validateStatus: function (status) {
                        return status
                    }
                })

                /* Assert Patch Project By ID */
                expect.soft(response.data).toMatchObject(data.EXPECTED)
                expect.soft(response.status).toBe(data.STATUS)

            }
        })

    }

    const DELETE_PROJECT_BY_ID = [
        { TEST_NAME: "With Existing Project Id", CASE_TYPE: "POSITIVE", STATUS: 200 },
        { TEST_NAME: "With Non-Existing Project Id", CASE_TYPE: "NEGATIVE", PROJECT_ID: 100000000000000, EXPECTED: { detail: 'Project not found' }, STATUS: 404 },
        { TEST_NAME: "With String Project Id", CASE_TYPE: "NEGATIVE", PROJECT_ID: "abc", EXPECTED: { detail: [{ type: 'int_parsing', loc: ['path', 'project_id'], msg: 'Input should be a valid integer, unable to parse string as an integer', input: 'abc' }] }, STATUS: 422 },
        { TEST_NAME: "With Float Project Id", CASE_TYPE: "NEGATIVE", PROJECT_ID: 12.3, EXPECTED: { detail: [{ type: 'int_parsing', loc: ['path', 'project_id'], msg: 'Input should be a valid integer, unable to parse string as an integer', input: '12.3' }] }, STATUS: 422 },
        { TEST_NAME: "With Boolean Project Id", CASE_TYPE: "NEGATIVE", PROJECT_ID: true, EXPECTED: { detail: [{ type: 'int_parsing', loc: ['path', 'project_id'], msg: 'Input should be a valid integer, unable to parse string as an integer', input: 'true' }] }, STATUS: 422 },
        { TEST_NAME: "With Empty Project Id", CASE_TYPE: "NEGATIVE", PROJECT_ID: "", EXPECTED: { detail: 'Method Not Allowed' }, STATUS: 405 },
        { TEST_NAME: "With Null Project Id", CASE_TYPE: "NEGATIVE", PROJECT_ID: null, EXPECTED: { detail: [{ type: 'int_parsing', loc: ['path', 'project_id'], msg: 'Input should be a valid integer, unable to parse string as an integer', input: 'null' }] }, STATUS: 422 },
        { TEST_NAME: "With No Value Project Id", CASE_TYPE: "NEGATIVE", EXPECTED: { detail: [{ type: 'int_parsing', loc: ['path', 'project_id'], msg: 'Input should be a valid integer, unable to parse string as an integer', input: 'undefined' }] }, STATUS: 422 },
    ]

    for (const data of DELETE_PROJECT_BY_ID) {

        const PROJECT_INFO_DATA = {
            "company": "Company ABC",
            "description": "My Test Project Description",
            "name": "My Test Project",
            "reportTitle": "My Report Title"
        }

        test(`Delete Project By ID ${data.TEST_NAME}`, async () => {

            let response

            if (data.CASE_TYPE == "POSITIVE") {

                /* Create Project */
                response = await axios.post(url + ":" + port_number + "/projects", PROJECT_INFO_DATA, {
                    validateStatus: function (status) {
                        return status
                    }
                })

                /* Set Project ID */
                const project_id = response.data.id

                /* Delete Project By Project ID */
                response = await axios.delete(url + ":" + port_number + "/projects/projects/" + project_id, {
                    validateStatus: function (status) {
                        return status
                    }
                })

                /* Assert Delete Project By Project ID */
                expect.soft(response.data).toBe(project_id)
                expect.soft(response.status).toBe(data.STATUS)

            }

            if (data.CASE_TYPE == "NEGATIVE") {

                /* Set Project ID */
                const project_id = data.PROJECT_ID

                /* Delete Project By Project ID */
                response = await axios.delete(url + ":" + port_number + "/projects/projects/" + project_id, {
                    validateStatus: function (status) {
                        return status
                    }
                })

                /* Assert Delete Project By Project ID */
                expect.soft(response.data).toMatchObject(data.EXPECTED)
                expect.soft(response.status).toBe(data.STATUS)

            }
        })
    }

    const SAVE_PROJECT_AS_TEMPLATE = [
        { TEST_NAME: "With Existing Project Id With Project Info Name String With Project Info Description String", CASE_TYPE: "POSITIVE", PROJECT_TEMPLATE_NAME: "My Test Project Template", PROJECT_TEMPLATE_DESCRIPTION: "My Test Project Template Description", STATUS: 200 },
        { TEST_NAME: "With Existing Project Id With Project Info Name String With Project Info Description > 4096 Characters", CASE_TYPE: "NEGATIVE", PROJECT_ID: 1, PROJECT_TEMPLATE_NAME: "My Test Project Template", PROJECT_TEMPLATE_DESCRIPTION: STRING_4096_CHARACTERS, EXPECTED: { detail: [{ type: 'string_too_long', loc: ['body', 'description'], msg: "String should have at most 4096 characters", input: STRING_4096_CHARACTERS, ctx: { max_length: 4096 } }] }, STATUS: 422 },
        { TEST_NAME: "With Existing Project Id With Project Info Name String With Project Info Description Integer", CASE_TYPE: "NEGATIVE", PROJECT_ID: 1, PROJECT_TEMPLATE_NAME: "My Test Project Template", PROJECT_TEMPLATE_DESCRIPTION: 123, EXPECTED: { detail: [{ type: 'string_type', loc: ['body', 'description'], msg: 'Input should be a valid string', input: 123 }] }, STATUS: 422 },
        { TEST_NAME: "With Existing Project Id With Project Info Name String With Project Info Description Float", CASE_TYPE: "NEGATIVE", PROJECT_ID: 1, PROJECT_TEMPLATE_NAME: "My Test Project Template", PROJECT_TEMPLATE_DESCRIPTION: 12.3, EXPECTED: { detail: [{ type: 'string_type', loc: ['body', 'description'], msg: 'Input should be a valid string', input: 12.3 }] }, STATUS: 422 },
        { TEST_NAME: "With Existing Project Id With Project Info Name String With Project Info Description Boolean", CASE_TYPE: "NEGATIVE", PROJECT_ID: 1, PROJECT_TEMPLATE_NAME: "My Test Project Template", PROJECT_TEMPLATE_DESCRIPTION: true, EXPECTED: { detail: [{ type: 'string_type', loc: ['body', 'description'], msg: 'Input should be a valid string', input: true }] }, STATUS: 422 },
        { TEST_NAME: "With Existing Project Id With Project Info Name String With Project Info Description Empty", CASE_TYPE: "NEGATIVE", PROJECT_ID: 1, PROJECT_TEMPLATE_NAME: "My Test Project Template", PROJECT_TEMPLATE_DESCRIPTION: "", EXPECTED: { globalVars: [ { key: 'Company Name', value: '' } ], pages: [], projectInfo: { name: 'My Test Project Template', description: 'My Test Project Description' }}, STATUS: 200 },
        { TEST_NAME: "With Existing Project Id With Project Info Name String With Project Info Description Null", CASE_TYPE: "NEGATIVE", PROJECT_ID: 1, PROJECT_TEMPLATE_NAME: "My Test Project Template", PROJECT_TEMPLATE_DESCRIPTION: "", EXPECTED: { globalVars: [ { key: 'Company Name', value: '' } ], pages: [], projectInfo: { name: 'My Test Project Template', description: 'My Test Project Description' }}, STATUS: 200 },
        { TEST_NAME: "With Existing Project Id With Project Info Name String With Project Info Description No Value", CASE_TYPE: "NEGATIVE", PROJECT_ID: 1, PROJECT_TEMPLATE_NAME: "My Test Project Template", EXPECTED: { globalVars: [ { key: 'Company Name', value: '' } ], pages: [], projectInfo: { name: 'My Test Project Template', description: 'My Test Project Description' }}, STATUS: 200 },
        { TEST_NAME: "With Existing Project Id With Project Info Name Integer With Project Info Description String", CASE_TYPE: "NEGATIVE", PROJECT_ID: 1, PROJECT_TEMPLATE_NAME: 123, PROJECT_TEMPLATE_DESCRIPTION: "My Test Project Template Description", EXPECTED: { detail: [{ type: 'string_type', loc: ['body', 'name'], msg: 'Input should be a valid string', input: 123 }] }, STATUS: 422 },
        { TEST_NAME: "With Existing Project Id With Project Info Name Float With Project Info Description String", CASE_TYPE: "NEGATIVE", PROJECT_ID: 1, PROJECT_TEMPLATE_NAME: 12.3, PROJECT_TEMPLATE_DESCRIPTION: "My Test Project Template Description", EXPECTED: { detail: [{ type: 'string_type', loc: ['body', 'name'], msg: 'Input should be a valid string', input: 12.3 }] }, STATUS: 422 },
        { TEST_NAME: "With Existing Project Id With Project Info Name Boolean With Project Info Description String", CASE_TYPE: "NEGATIVE", PROJECT_ID: 1, PROJECT_TEMPLATE_NAME: true, PROJECT_TEMPLATE_DESCRIPTION: "My Test Project Template Description", EXPECTED: { detail: [{ type: 'string_type', loc: ['body', 'name'], msg: 'Input should be a valid string', input: true }] }, STATUS: 422 },
        { TEST_NAME: "With Existing Project Id With Project Info Name Empty With Project Info Description String", CASE_TYPE: "NEGATIVE", PROJECT_ID: 1, PROJECT_TEMPLATE_NAME: "", PROJECT_TEMPLATE_DESCRIPTION: "My Test Project Template Description", EXPECTED: { detail: [ { type: 'string_too_short', loc: [ 'body', 'name' ], msg: 'String should have at least 1 character', input: "" } ] }, STATUS: 422 },
        { TEST_NAME: "With Existing Project Id With Project Info Name Null With Project Info Description String", CASE_TYPE: "NEGATIVE", PROJECT_ID: 1, PROJECT_TEMPLATE_NAME: null, PROJECT_TEMPLATE_DESCRIPTION: "My Test Project Template Description", EXPECTED: { globalVars: [ { key: 'Company Name', value: '' } ], pages: [], projectInfo: { name: 'My Test Project', description: 'My Test Project Template Description' }}, STATUS: 200 },
        { TEST_NAME: "With Existing Project Id With Project Info Name No Value With Project Info Description String", CASE_TYPE: "NEGATIVE", PROJECT_ID: 1, PROJECT_TEMPLATE_DESCRIPTION: "My Test Project Template Description", EXPECTED: { globalVars: [ { key: 'Company Name', value: '' } ], pages: [], projectInfo: { name: 'My Test Project', description: 'My Test Project Template Description' }}, STATUS: 200 },
        { TEST_NAME: "With Non-Existing Project Id With Project Info Name String With Project Info Description String", CASE_TYPE: "NEGATIVE", PROJECT_ID: 100000000000000, PROJECT_TEMPLATE_NAME: "My Test Project Template", PROJECT_TEMPLATE_DESCRIPTION: "My Test Project Template Description", EXPECTED: { detail: 'Project not found' }, STATUS: 404 },
        { TEST_NAME: "With String Project Id With Project Info Name String With Project Info Description String", CASE_TYPE: "NEGATIVE", PROJECT_ID: "abc", PROJECT_TEMPLATE_NAME: "My Test Project Template", PROJECT_TEMPLATE_DESCRIPTION: "My Test Project Template Description", EXPECTED: { detail: [{ type: 'int_parsing', loc: ['path', 'project_id'], msg: 'Input should be a valid integer, unable to parse string as an integer', input: 'abc' }] }, STATUS: 422 },
        { TEST_NAME: "With Float Project Id With Project Info Name String With Project Info Description String", CASE_TYPE: "NEGATIVE", PROJECT_ID: 12.3, PROJECT_TEMPLATE_NAME: "My Test Project Template", PROJECT_TEMPLATE_DESCRIPTION: "My Test Project Template Description", EXPECTED: { detail: [{ type: 'int_parsing', loc: ['path', 'project_id'], msg: 'Input should be a valid integer, unable to parse string as an integer', input: '12.3' }] }, STATUS: 422 },
        { TEST_NAME: "With Boolean Project Id With Project Info Name String With Project Info Description String", CASE_TYPE: "NEGATIVE", PROJECT_ID: true, PROJECT_TEMPLATE_NAME: "My Test Project Template", PROJECT_TEMPLATE_DESCRIPTION: "My Test Project Template Description", EXPECTED: { detail: [{ type: 'int_parsing', loc: ['path', 'project_id'], msg: 'Input should be a valid integer, unable to parse string as an integer', input: 'true' }] }, STATUS: 422 },
        { TEST_NAME: "With Null Project Id With Project Info Name String With Project Info Description String", CASE_TYPE: "NEGATIVE", PROJECT_ID: null, PROJECT_TEMPLATE_NAME: "My Test Project Template", PROJECT_TEMPLATE_DESCRIPTION: "My Test Project Template Description", EXPECTED: { detail: [{ type: 'int_parsing', loc: ['path', 'project_id'], msg: 'Input should be a valid integer, unable to parse string as an integer', input: 'null' }] }, STATUS: 422 },
        { TEST_NAME: "With No Value Project Id With Project Info Name String With Project Info Description String", CASE_TYPE: "NEGATIVE", PROJECT_TEMPLATE_NAME: "My Test Project Template", PROJECT_TEMPLATE_DESCRIPTION: "My Test Project Template Description", EXPECTED: { detail: [{ type: 'int_parsing', loc: ['path', 'project_id'], msg: 'Input should be a valid integer, unable to parse string as an integer', input: 'undefined' }] }, STATUS: 422 }
    ]

    for (const data of SAVE_PROJECT_AS_TEMPLATE) {

        let response

        const PROJECT_INFO_DATA = {
            "company": "Company ABC",
            "description": "My Test Project Description",
            "name": "My Test Project",
            "reportTitle": "My Report Title"
        }

        const PROJECT_TEMPLATE_INFO_DATA = {
            "name": data.PROJECT_TEMPLATE_NAME,
            "description": data.PROJECT_TEMPLATE_DESCRIPTION
        }

        test(`Save Project As Template ${data.TEST_NAME}`, async () => {

            if (data.CASE_TYPE == "POSITIVE") {

                /* Create Project */
                response = await axios.post(url + ":" + port_number + "/projects", PROJECT_INFO_DATA, {
                    validateStatus: function (status) {
                        return status
                    }
                })

                /* Set Project ID */
                const project_id = response.data.id

                /* Save Project As Template */
                response = await axios.post(url + ":" + port_number + "/projects/saveProjectAsTemplate/" + project_id, PROJECT_TEMPLATE_INFO_DATA, {
                    validateStatus: function (status) {
                        return status
                    }
                })

                /* Assert Save Project As Template */
                expect.soft(response.data.globalVars).toBeTruthy()
                expect.soft(response.data.pages).toBeTruthy()
                expect.soft(response.data.id).toBeTruthy()
                expect.soft(response.data.projectInfo.description).toBe(PROJECT_TEMPLATE_INFO_DATA.description)
                expect.soft(response.data.projectInfo.name).toBe(PROJECT_TEMPLATE_INFO_DATA.name)
                expect.soft(response.data.created_at).toBeTruthy()
                expect.soft(response.data.updated_at).toBeTruthy()

                expect.soft(response.status).toBe(data.STATUS)

            }

            if (data.CASE_TYPE == "NEGATIVE") {

                /* Set Project ID */
                const project_id = data.PROJECT_ID

                /* Save Project As Template */
                response = await axios.post(url + ":" + port_number + "/projects/saveProjectAsTemplate/" + project_id, PROJECT_TEMPLATE_INFO_DATA, {
                    validateStatus: function (status) {
                        return status
                    }
                })

                /* Assert Save Project As Template */
                expect.soft(response.data).toMatchObject(data.EXPECTED)
                expect.soft(response.status).toBe(data.STATUS)

            }
        })
    }

})