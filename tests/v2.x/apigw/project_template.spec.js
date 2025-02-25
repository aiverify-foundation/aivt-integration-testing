import { test, expect } from '@playwright/test'

import axios from 'axios'
import fs from 'fs'
import FormData from 'form-data'

const ENDPOINT = process.env.ENDPOINT

const STRING_4096_CHARACTERS = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin in malesuada elit. Fusce id commodo neque. Aliquam fermentum sem eget faucibus interdum. Donec vulputate pellentesque lectus, a commodo magna congue vitae. Quisque ullamcorper dolor vel consequat malesuada. Aenean est orci, porta ut mi eget, iaculis ultricies felis. Nulla elementum purus vel nisl pharetra, vitae iaculis dolor ornare. Nunc id augue vulputate, sollicitudin elit et, imperdiet nulla. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Cras interdum sodales ipsum. Quisque commodo diam lorem, eu vehicula felis tincidunt et. Mauris in enim faucibus massa rhoncus lobortis vitae vel urna. In velit enim, accumsan at lacus id, vehicula interdum quam. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.\
Curabitur vitae blandit arcu. In ut justo pulvinar, pharetra purus ut, gravida augue. Proin pharetra quam at lacus ultrices, in lobortis libero pellentesque. Vivamus eget ex a leo egestas mattis. Proin pellentesque nisl lacus, in convallis elit imperdiet non. Cras non enim non neque commodo fermentum. Quisque nec libero malesuada dui lobortis ultricies non eu tellus. Ut sit amet dictum dolor. Nulla dui lacus, imperdiet nec dapibus ut, rhoncus at eros. Vivamus sed lorem vulputate, pharetra lacus et, viverra metus. Fusce a pharetra leo. Nunc vel finibus orci.\
Etiam tempor, ante vitae porttitor tincidunt, enim nibh dignissim mi, a aliquam felis odio viverra turpis. Aliquam erat volutpat. Nunc pulvinar blandit risus. Mauris non lacus dolor. Curabitur et elit non nisl venenatis pretium. Integer sit amet dui vitae justo condimentum elementum. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Morbi pulvinar interdum dui, sit amet fringilla purus sodales eget. Duis sollicitudin, ante eu efficitur consectetur, mi leo volutpat libero, ut fermentum felis metus non felis. Mauris bibendum lacus libero, et suscipit ipsum dictum eu. Sed faucibus pharetra convallis. Nunc maximus nunc sit amet risus aliquet blandit. Duis tincidunt porta justo, id semper mi ullamcorper at. Integer ac molestie dui. Donec tempus ligula quis nunc ultrices scelerisque.\
In hac habitasse platea dictumst. Nulla facilisi. Pellentesque vulputate erat velit, sed varius magna ultricies nec. Pellentesque quis laoreet turpis, at bibendum magna. Curabitur hendrerit facilisis facilisis. Aliquam tortor nisi, rhoncus eget mi vel, imperdiet tempus eros. Quisque laoreet fringilla augue, at maximus lacus mollis et. Fusce commodo, purus eu efficitur ultricies, sapien lacus mattis elit, non consequat tellus justo in nibh. Aliquam dolor libero, aliquet et erat sit amet, eleifend tincidunt purus. Quisque id rhoncus dui. Aliquam egestas mattis nisi, et aliquam dui hendrerit vel. Cras in eros porttitor, volutpat eros ornare, ultrices lacus.\
Etiam nibh est, posuere in tincidunt eu, consequat sit amet diam. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Curabitur eget magna vel nisl vestibulum elementum. In sed felis rhoncus, sollicitudin est ac, finibus mi. Nunc porttitor magna ut feugiat consectetur. Donec at est maximus, facilisis libero eget, imperdiet eros. Pellentesque pretium aliquam interdum. Curabitur sed ullamcorper nunc. Etiam fermentum faucibus enim sit amet consectetur. Cras posuere diam non porta malesuada.\
Donec tempor ut eros vel hendrerit. Sed lobortis ex in ante mattis pharetra. Nullam imperdiet velit vitae fringilla vulputate. Morbi quis nisi lacus. Integer magna odio, finibus nec luctus sed, accumsan et lacus. Donec non hendrerit odio, nec fermentum felis. Maecenas dolor erat, euismod eget iaculis ut, iaculis vitae magna. Morbi nibh erat, facilisis in sollicitudin condimentum, ultricies at elit. Nunc bibendum purus rhoncus nibh faucibus cursus. Nunc condimentum, nisi in fermentum porttitor, nunc urna tincidunt sapien, sed imperdiet erat justo nec eros. Fusce et nulla in leo rutrum rutrum eget a tellus.\
Aliquam erat volutpat. Praesent sed arcu blandit, elementum lacus sed, sodales nunc. Phasellus ante velit, pulvinar ac nunc et, mattis tincidunt nisi. Ut congue aliquam efficitur. Duis vitae hendrerit nunc. Curabitur egestas dui vitae lorem laoreet, ut lacinia lectus laoreet. Vivamus ultricies turpis non metus scelerisque, ut laoreet eros dignissim. Nulla ut turpis nec elit ultricies bibendum nec eleifend lectus. Integer risus urna, gravida tempus ex eget, cursus interdum libero. Nunc ac sapien imperdiet, aliquet erat sit amet, dapibus lectus. Aliquam et metus quis ex rutrum elementum eget vitae metus. Curabitur nisi diam, sodales eget condimentum nec, aliquam ac velit. Aliquam dictum hendrerit commodo. Maecenas mattis ipsum lectus, sed efficitur sem mattis eu. Donec vitae dolor ullamcorper, congue nisi eu, egestas justo. Mauris scelerisque, nisi non mattis sagittis, mauris ante faucibus enim, sit amet ullamcorper ante nulla sed libero."

const GET_PROJECT_TEMPLATE = [
    { TEST_NAME: "", STATUS: 200 }
]

const CREATE_PROJECT_TEMPLATE = [
    { TEST_NAME: "With Valid Global Vars With Valid Pages With Valid Project Info", CASE_TYPE: "POSITIVE", GLOBAL_VARS: [{ key: "Company Name", value: "ABC Company" }], PAGES: [], PROJECT_INFO_DATA: { "description": "Test summary report for regression model", "name": "My Test Regression Report" }, EXPECTED: { globalVars: [{ key: 'Company Name', value: 'ABC Company' }], pages: [], projectInfo: { name: 'My Test Regression Report', description: 'Test summary report for regression model' }, fromPlugin: false }, STATUS: 200 },
    { TEST_NAME: "With Valid Global Vars With Valid Pages With Project Info Name Character > 256 Characters", CASE_TYPE: "NEGATIVE", GLOBAL_VARS: [{ key: "Company Name", value: "ABC Company" }], PAGES: [], PROJECT_INFO_DATA: { "description": "Test summary report for regression model", "name": STRING_4096_CHARACTERS }, EXPECTED: { detail: [{ type: 'string_too_long', loc: ['body', 'projectInfo', 'name'], msg: 'String should have at most 256 characters', input: STRING_4096_CHARACTERS, ctx: { max_length: 256 } }] }, STATUS: 422 },
    { TEST_NAME: "With Valid Global Vars With Valid Pages With Project Info Name Float", CASE_TYPE: "NEGATIVE", GLOBAL_VARS: [{ key: "Company Name", value: "ABC Company" }], PAGES: [], PROJECT_INFO_DATA: { "description": "Test summary report for regression model", "name": 12.3 }, EXPECTED: { detail: [{ type: 'string_type', loc: ['body', 'projectInfo', 'name'], msg: 'Input should be a valid string', input: 12.3 }] }, STATUS: 422 },
    { TEST_NAME: "With Valid Global Vars With Valid Pages With Project Info Name Integer", CASE_TYPE: "NEGATIVE", GLOBAL_VARS: [{ key: "Company Name", value: "ABC Company" }], PAGES: [], PROJECT_INFO_DATA: { "description": "Test summary report for regression model", "name": 123 }, EXPECTED: { detail: [{ type: 'string_type', loc: ['body', 'projectInfo', 'name'], msg: 'Input should be a valid string', input: 123 }] }, STATUS: 422 },
    { TEST_NAME: "With Valid Global Vars With Valid Pages With Project Info Name Boolean", CASE_TYPE: "NEGATIVE", GLOBAL_VARS: [{ key: "Company Name", value: "ABC Company" }], PAGES: [], PROJECT_INFO_DATA: { "description": "Test summary report for regression model", "name": true }, EXPECTED: { detail: [{ type: 'string_type', loc: ['body', 'projectInfo', 'name'], msg: 'Input should be a valid string', input: true }] }, STATUS: 422 },
    // { TEST_NAME: "With Valid Global Vars With Valid Pages With Project Info Name Empty", CASE_TYPE: "NEGATIVE", GLOBAL_VARS: [ { key: "Company Name", value: "ABC Company" } ], PAGES: [], PROJECT_INFO_DATA: { "description": "My Test Project Description", "name": "" }, EXPECTED: { detail: [ { type: 'string_type', loc: [ 'body', 'projectInfo', 'name'], msg: 'Input should be a valid string', input: "" }]}, STATUS: 422 }, // Can Name be empty?
    { TEST_NAME: "With Valid Global Vars With Valid Pages With Project Info Name Null", CASE_TYPE: "NEGATIVE", GLOBAL_VARS: [{ key: "Company Name", value: "ABC Company" }], PAGES: [], PROJECT_INFO_DATA: { "description": "Test summary report for regression model", "name": null }, EXPECTED: { detail: [{ type: 'string_type', loc: ['body', 'projectInfo', 'name'], msg: 'Input should be a valid string', input: null }] }, STATUS: 422 },
    { TEST_NAME: "With Valid Global Vars With Valid Pages With Project Info Name No Values", CASE_TYPE: "NEGATIVE", GLOBAL_VARS: [{ key: "Company Name", value: "ABC Company" }], PAGES: [], PROJECT_INFO_DATA: { "description": "Test summary report for regression model" }, EXPECTED: { detail: [{ type: 'missing', loc: ['body', 'projectInfo', 'name'], msg: 'Field required', input: { "description": "Test summary report for regression model" } }] }, STATUS: 422 },
    { TEST_NAME: "With Valid Global Vars With Valid Pages With Project Info Description Characters > 256 Characters", CASE_TYPE: "NEGATIVE", GLOBAL_VARS: [{ key: "Company Name", value: "ABC Company" }], PAGES: [], PROJECT_INFO_DATA: { "description": STRING_4096_CHARACTERS, "name": "My Test Regression Report" }, EXPECTED: { detail: [{ type: 'string_too_long', loc: ['body', 'projectInfo', 'description'], msg: 'String should have at most 4096 characters', input: STRING_4096_CHARACTERS, ctx: { max_length: 4096 } }] }, STATUS: 422 },
    { TEST_NAME: "With Valid Global Vars With Valid Pages With Project Info Description Float", CASE_TYPE: "NEGATIVE", GLOBAL_VARS: [{ key: "Company Name", value: "ABC Company" }], PAGES: [], PROJECT_INFO_DATA: { "description": 12.3, "name": "My Test Regression Report" }, EXPECTED: { detail: [{ type: 'string_type', loc: ['body', 'projectInfo', 'description'], msg: 'Input should be a valid string', input: 12.3 }] }, STATUS: 422 },
    { TEST_NAME: "With Valid Global Vars With Valid Pages With Project Info Description Integer", CASE_TYPE: "NEGATIVE", GLOBAL_VARS: [{ key: "Company Name", value: "ABC Company" }], PAGES: [], PROJECT_INFO_DATA: { "description": 123, "name": "My Test Regression Report" }, EXPECTED: { detail: [{ type: 'string_type', loc: ['body', 'projectInfo', 'description'], msg: 'Input should be a valid string', input: 123 }] }, STATUS: 422 },
    { TEST_NAME: "With Valid Global Vars With Valid Pages With Project Info Description Boolean", CASE_TYPE: "NEGATIVE", GLOBAL_VARS: [{ key: "Company Name", value: "ABC Company" }], PAGES: [], PROJECT_INFO_DATA: { "description": true, "name": "My Test Regression Report" }, EXPECTED: { detail: [{ type: 'string_type', loc: ['body', 'projectInfo', 'description'], msg: 'Input should be a valid string', input: true }] }, STATUS: 422 },
    { TEST_NAME: "With Valid Global Vars With Valid Pages With Project Info Description Empty", CASE_TYPE: "NEGATIVE", GLOBAL_VARS: [{ key: "Company Name", value: "ABC Company" }], PAGES: [], PROJECT_INFO_DATA: { "description": "", "name": "My Test Regression Report" }, EXPECTED: { globalVars: [{ key: 'Company Name', value: 'ABC Company' }], pages: [], projectInfo: { name: 'My Test Regression Report', description: '' }, fromPlugin: false }, STATUS: 200 },
    { TEST_NAME: "With Valid Global Vars With Valid Pages With Project Info Description Null", CASE_TYPE: "NEGATIVE", GLOBAL_VARS: [{ key: "Company Name", value: "ABC Company" }], PAGES: [], PROJECT_INFO_DATA: { "description": null, "name": "My Test Regression Report" }, EXPECTED: { globalVars: [{ key: 'Company Name', value: 'ABC Company' }], pages: [], projectInfo: { name: 'My Test Regression Report', description: null }, fromPlugin: false }, STATUS: 200 },
    { TEST_NAME: "With Valid Global Vars With Valid Pages With Project Info Description No Value", CASE_TYPE: "NEGATIVE", GLOBAL_VARS: [{ key: "Company Name", value: "ABC Company" }], PAGES: [], PROJECT_INFO_DATA: { "name": "My Test Regression Report", }, EXPECTED: { globalVars: [{ key: 'Company Name', value: 'ABC Company' }], pages: [], projectInfo: { name: 'My Test Regression Report', description: null }, fromPlugin: false }, STATUS: 200 },
    { TEST_NAME: "With Valid Global Vars With Pages Non Array Object Items With Valid Project Info", CASE_TYPE: "NEGATIVE", PROJECT_ID: 1, GLOBAL_VARS: [{ key: "Company Name", value: "ABC Company" }], PAGES: 1, PROJECT_INFO_DATA: { "description": "Test summary report for regression model", "name": "My Test Regression Report" }, EXPECTED: { "detail": [{ "input": 1, "loc": ["body", "pages"], "msg": "Input should be a valid list", "type": "list_type" }] }, STATUS: 422 },
    { TEST_NAME: "With Valid Global Vars With Pages Non Array Object Layout With Valid Project Info", CASE_TYPE: "NEGATIVE", PROJECT_ID: 1, GLOBAL_VARS: [{ key: "Company Name", value: "ABC Company" }], PAGES: [{ layouts: 1, reportWidgets: [] }], PROJECT_INFO_DATA: { "description": "Test summary report for regression model", "name": "My Test Regression Report" }, EXPECTED: { "detail": [{ "input": 1, "loc": ["body", "pages", 0, "layouts"], "msg": "Input should be a valid list", "type": "list_type" }] }, STATUS: 422 },
    { TEST_NAME: "With Valid Global Vars With Pages Non Array Object Report Widgets With Valid Project Info", CASE_TYPE: "NEGATIVE", PROJECT_ID: 1, GLOBAL_VARS: [{ key: "Company Name", value: "ABC Company" }], PAGES: [{ layouts: [], reportWidgets: 1 }], PROJECT_INFO_DATA: { "description": "Test summary report for regression model", "name": "My Test Regression Report" }, EXPECTED: { "detail": [{ "input": 1, "loc": ["body", "pages", 0, "reportWidgets"], "msg": "Input should be a valid list", "type": "list_type" }] }, STATUS: 422 },
    { TEST_NAME: "With Empty Global Vars With Valid Pages With Valid Project Info With Valid Test Model Id With Valid Input Blocks With Valid Test Results", CASE_TYPE: "NEGATIVE", GLOBAL_VARS: "", PAGES: [], PROJECT_INFO_DATA: { "description": "Test summary report for regression model", "name": "My Test Regression Report" }, EXPECTED: { detail: [{ type: 'list_type', loc: ['body', 'globalVars'], msg: 'Input should be a valid list', input: "" }] }, STATUS: 422 },
    { TEST_NAME: "With Null Global Vars With Valid Pages With Valid Project Info With Valid Test Model Id With Valid Input Blocks With Valid Test Results", CASE_TYPE: "NEGATIVE", GLOBAL_VARS: null, PAGES: [], PROJECT_INFO_DATA: { "description": "Test summary report for regression model", "name": "My Test Regression Report" }, EXPECTED: { globalVars: null, pages: [], projectInfo: { name: 'My Test Regression Report', description: 'Test summary report for regression model' }, fromPlugin: false }, STATUS: 200 },
    { TEST_NAME: "With No Values Global Vars With Valid Pages With Valid Project Info With Valid Test Model Id With Valid Input Blocks With Valid Test Results", CASE_TYPE: "NEGATIVE", PAGES: [], PROJECT_INFO_DATA: { "description": "Test summary report for regression model", "name": "My Test Regression Report" }, EXPECTED: { globalVars: null, pages: [], projectInfo: { name: 'My Test Regression Report', description: 'Test summary report for regression model' }, fromPlugin: false }, STATUS: 200 },
    { TEST_NAME: "With Key > 128 Characters Global Vars With Valid Pages With Valid Project Info With Valid Test Model Id With Valid Input Blocks With With Valid Test Results", CASE_TYPE: "NEGATIVE", GLOBAL_VARS: [{ key: STRING_4096_CHARACTERS, value: "ABC Company" }], PAGES: [], PROJECT_INFO_DATA: { "description": "Test summary report for regression model", "name": "My Test Regression Report" }, EXPECTED: { detail: [{ type: 'string_too_long', loc: ['body', 'globalVars', 0, 'key'], msg: 'String should have at most 128 characters', input: STRING_4096_CHARACTERS, ctx: { max_length: 128 } }] }, STATUS: 422 },
    { TEST_NAME: "With Key Integer Global Vars With Valid Pages With Valid Project Info With Valid Test Model Id With Valid Input Blocks With With Valid Test Results", CASE_TYPE: "NEGATIVE", GLOBAL_VARS: [{ key: 123, value: "ABC Company" }], PAGES: [], PROJECT_INFO_DATA: { "description": "Test summary report for regression model", "name": "My Test Regression Report" }, EXPECTED: { detail: [{ type: 'string_type', loc: ['body', 'globalVars', 0, 'key'], msg: 'Input should be a valid string', input: 123 }] }, STATUS: 422 },
    { TEST_NAME: "With Key Float Global Vars Valid Pages With Valid Project Info With Valid Test Model Id With Valid Input Blocks With With Valid Test Results", CASE_TYPE: "NEGATIVE", GLOBAL_VARS: [{ key: 12.3, value: "ABC Company" }], PAGES: [], PROJECT_INFO_DATA: { "description": "Test summary report for regression model", "name": "My Test Regression Report" }, EXPECTED: { detail: [{ type: 'string_type', loc: ['body', 'globalVars', 0, 'key'], msg: 'Input should be a valid string', input: 12.3 }] }, STATUS: 422 },
    { TEST_NAME: "With Key Boolean Global Vars Valid Pages With Valid Project Info With Valid Test Model Id With Valid Input Blocks With With Valid Test Results", CASE_TYPE: "NEGATIVE", GLOBAL_VARS: [{ key: true, value: "ABC Company" }], PAGES: [], PROJECT_INFO_DATA: { "description": "Test summary report for regression model", "name": "My Test Regression Report" }, EXPECTED: { detail: [{ type: 'string_type', loc: ['body', 'globalVars', 0, 'key'], msg: 'Input should be a valid string', input: true }] }, STATUS: 422 },
    { TEST_NAME: "With Key Empty Global Vars With Valid Pages With Valid Project Info With Valid Test Model Id With Valid Input Blocks With With Valid Test Results", CASE_TYPE: "NEGATIVE", GLOBAL_VARS: [{ key: "", value: "ABC Company" }], PAGES: [], PROJECT_INFO_DATA: { "description": "Test summary report for regression model", "name": "My Test Regression Report" }, EXPECTED: { detail: [{ type: 'string_too_short', loc: ['body', 'globalVars', 0, 'key'], msg: 'String should have at least 1 character', input: "" }] }, STATUS: 422 }, // <-- Example of empty input
    { TEST_NAME: "With Key Null Valid Global Vars With Valid Pages With Valid Project Info With Valid Test Model Id With Valid Input Blocks With With Valid Test Results", CASE_TYPE: "NEGATIVE", GLOBAL_VARS: [{ key: null, value: "ABC Company" }], PAGES: [], PROJECT_INFO_DATA: { "description": "Test summary report for regression model", "name": "My Test Regression Report" }, EXPECTED: { detail: [{ type: 'string_type', loc: ['body', 'globalVars', 0, 'key'], msg: 'Input should be a valid string', input: null }] }, STATUS: 422 },
    { TEST_NAME: "With Key No Values Global Vars With Valid Pages With Valid Project Info With Valid Test Model Id With Valid Input Blocks With With Valid Test Results", CASE_TYPE: "NEGATIVE", GLOBAL_VARS: [{ value: "ABC Company" }], PAGES: [], PROJECT_INFO_DATA: { "description": "Test summary report for regression model", "name": "My Test Regression Report" }, EXPECTED: { detail: [{ type: 'missing', loc: ['body', 'globalVars', 0, 'key'], msg: 'Field required', input: { value: 'ABC Company' } }] }, STATUS: 422 },
    { TEST_NAME: "With Value > 128 Characters Global Vars With Valid Pages With Valid Project Info With Valid Test Model Id With Valid Input Blocks With With Valid Test Results", CASE_TYPE: "NEGATIVE", GLOBAL_VARS: [{ key: "Company Name", value: STRING_4096_CHARACTERS }], PAGES: [], PROJECT_INFO_DATA: { "description": "Test summary report for regression model", "name": "My Test Regression Report" }, EXPECTED: { detail: [{ type: 'string_too_long', loc: ['body', 'globalVars', 0, 'value'], msg: 'String should have at most 128 characters', input: STRING_4096_CHARACTERS, ctx: { max_length: 128 } }] }, STATUS: 422 },
    { TEST_NAME: "With Value Integer Global Vars With Valid Pages With Valid Project Info With Valid Test Model Id With Valid Input Blocks With With Valid Test Results", CASE_TYPE: "NEGATIVE", GLOBAL_VARS: [{ key: "Company Name", value: 123 }], PAGES: [], PROJECT_INFO_DATA: { "description": "Test summary report for regression model", "name": "My Test Regression Report" }, EXPECTED: { detail: [{ type: 'string_type', loc: ['body', 'globalVars', 0, 'value'], msg: 'Input should be a valid string', input: 123 }] }, STATUS: 422 },
    { TEST_NAME: "With Value Float Global Vars Valid Pages With Valid Project Info With Valid Test Model Id With Valid Input Blocks With With Valid Test Results", CASE_TYPE: "NEGATIVE", GLOBAL_VARS: [{ key: "Company Name", value: 12.3 }], PAGES: [], PROJECT_INFO_DATA: { "description": "Test summary report for regression model", "name": "My Test Regression Report" }, EXPECTED: { detail: [{ type: 'string_type', loc: ['body', 'globalVars', 0, 'value'], msg: 'Input should be a valid string', input: 12.3 }] }, STATUS: 422 },
    { TEST_NAME: "With Value Boolean Global Vars Valid Pages With Valid Project Info Boolean With Valid Test Model Id With Valid Input Blocks With With Valid Test Results", CASE_TYPE: "NEGATIVE", GLOBAL_VARS: [{ key: "Company Name", value: true }], PAGES: [], PROJECT_INFO_DATA: { "description": "Test summary report for regression model", "name": "My Test Regression Report" }, EXPECTED: { detail: [{ type: 'string_type', loc: ['body', 'globalVars', 0, 'value'], msg: 'Input should be a valid string', input: true }] }, STATUS: 422 },
    // { TEST_NAME: "With Value Empty Global Vars With Valid Pages With Valid Project Info With Valid Test Model Id With Valid Input Blocks With With Valid Test Results", CASE_TYPE: "NEGATIVE", GLOBAL_VARS: [ { key: "Company Name", value: "" } ], PAGES: [], PROJECT_INFO_DATA: { "description": "Test summary report for regression model", "name": "My Test Regression Report" }, EXPECTED: { detail: [ { type: 'string_too_short', loc: [ 'body', 'globalVars', 0, 'value'], msg: 'String should have at least 1 character', input: "" }]}, STATUS: 422 }, // Value cannot be empty?
    { TEST_NAME: "With Value Null Valid Global Vars With Valid Pages With Valid Project Info With Valid Test Model Id With Valid Input Blocks With With Valid Test Results", CASE_TYPE: "NEGATIVE", GLOBAL_VARS: [{ key: "Company Name", value: null }], PAGES: [], PROJECT_INFO_DATA: { "description": "Test summary report for regression model", "name": "My Test Regression Report" }, EXPECTED: { detail: [{ type: 'string_type', loc: ['body', 'globalVars', 0, 'value'], msg: 'Input should be a valid string', input: null }] }, STATUS: 422 },

]

const GET_PROJECT_TEMPLATE_BY_PROJECT_TEMPLATE_ID = [
    { TEST_NAME: "With Existing Project Id", CASE_TYPE: "POSITIVE", GLOBAL_VARS: [{ key: "Company Name", value: "ABC Company" }], PAGES: [], PROJECT_INFO_DATA: { "description": "Test summary report for regression model", "name": "My Test Regression Report" }, EXPECTED: { globalVars: [{ key: 'Company Name', value: 'ABC Company' }], pages: [], projectInfo: { name: 'My Test Regression Report', description: 'Test summary report for regression model' }, fromPlugin: false }, STATUS: 200 },
    { TEST_NAME: "With Non-Existing Project Id", CASE_TYPE: "NEGATIVE", PROJECT_ID: 100000000000000, EXPECTED: { detail: 'Internal error 404: Project not found' }, STATUS: 404 }, // Should status be 404?
    { TEST_NAME: "With String Project Id", CASE_TYPE: "NEGATIVE", PROJECT_ID: "abc", EXPECTED: { detail: [{ type: 'int_parsing', loc: ['path', 'project_id'], msg: 'Input should be a valid integer, unable to parse string as an integer', input: 'abc' }] }, STATUS: 422 },
    { TEST_NAME: "With Float Project Id", CASE_TYPE: "NEGATIVE", PROJECT_ID: 12.3, EXPECTED: { detail: [{ type: 'int_parsing', loc: ['path', 'project_id'], msg: 'Input should be a valid integer, unable to parse string as an integer', input: '12.3' }] }, STATUS: 422 },
    { TEST_NAME: "With Boolean Project Id", CASE_TYPE: "NEGATIVE", PROJECT_ID: true, EXPECTED: { detail: [{ type: 'int_parsing', loc: ['path', 'project_id'], msg: 'Input should be a valid integer, unable to parse string as an integer', input: 'true' }] }, STATUS: 422 },
    { TEST_NAME: "With Null Project Id", CASE_TYPE: "NEGATIVE", PROJECT_ID: null, EXPECTED: { detail: [{ type: 'int_parsing', loc: ['path', 'project_id'], msg: 'Input should be a valid integer, unable to parse string as an integer', input: 'null' }] }, STATUS: 422 },
    { TEST_NAME: "With No Value Project Id", CASE_TYPE: "NEGATIVE", EXPECTED: { detail: [{ type: 'int_parsing', loc: ['path', 'project_id'], msg: 'Input should be a valid integer, unable to parse string as an integer', input: 'undefined' }] }, STATUS: 422 }
]

const DELETE_PROJECT_TEMPLATE_BY_ID = [
    { TEST_NAME: "With Existing Project Template Id", CASE_TYPE: "POSITIVE", GLOBAL_VARS: [{ key: "Company Name", value: "ABC Company" }], PAGES: [], PROJECT_INFO_DATA: { "description": "Test summary report for regression model", "name": "My Test Regression Report" }, EXPECTED: { globalVars: [{ key: 'Company Name', value: 'ABC Company' }], pages: [], projectInfo: { name: 'My Test Regression Report', description: 'Test summary report for regression model' }, fromPlugin: false }, STATUS: 200 },
    { TEST_NAME: "With Non-Existing Project Template Id", CASE_TYPE: "NEGATIVE", PROJECT_TEMPLATE_ID: 100000000000000, EXPECTED: { detail: "Project Template not found" }, STATUS: 404 },
    { TEST_NAME: "With String Project Template Id", CASE_TYPE: "NEGATIVE", PROJECT_TEMPLATE_ID: "abc", EXPECTED: { detail: "Project Template not found" }, STATUS: 404 },
    { TEST_NAME: "With Float Project Template Id", CASE_TYPE: "NEGATIVE", PROJECT_TEMPLATE_ID: 12.3, EXPECTED: { detail: "Project Template not found" }, STATUS: 404 },
    { TEST_NAME: "With Boolean Project Template Id", CASE_TYPE: "NEGATIVE", PROJECT_TEMPLATE_ID: true, EXPECTED: { detail: "Project Template not found" }, STATUS: 404 },
    { TEST_NAME: "With Empty Project Template Id", CASE_TYPE: "NEGATIVE", PROJECT_TEMPLATE_ID: "", EXPECTED: { detail: 'Method Not Allowed' }, STATUS: 405 },
    { TEST_NAME: "With Null Project Template Id", CASE_TYPE: "NEGATIVE", PROJECT_TEMPLATE_ID: null, EXPECTED: { detail: "Project Template not found" }, STATUS: 404 },
    { TEST_NAME: "With No Value Project Template Id", CASE_TYPE: "NEGATIVE", EXPECTED: { detail: "Project Template not found" }, STATUS: 404 }
]

test.describe('Project Template', () => {

    for (const data of GET_PROJECT_TEMPLATE) {
        test.skip(`Get All Project Template ${data.TEST_NAME}`, async () => {
            const response = await axios.get(ENDPOINT + "/project_templates", {
                validateStatus: function (status) {
                    return status
                }
            })

            /* Assert Get Project Template */
            expect.soft(response.data[0].globalVars).toBeTruthy()
            expect.soft(response.data[0].pages).toBeTruthy()
            expect.soft(response.data[0].projectInfo.name).toBeTruthy()
            expect.soft(response.data[0].projectInfo.description).toBeTruthy()
            expect.soft(response.data[0].id).toBeTruthy()
            expect.soft(response.data[0].fromPlugin).toBeTruthy()
            expect.soft(response.data[0].created_at).toBeTruthy()
            expect.soft(response.data[0].updated_at).toBeTruthy()

            expect.soft(response.data[1].globalVars).toBeTruthy()
            expect.soft(response.data[1].pages).toBeTruthy()
            expect.soft(response.data[1].projectInfo.name).toBeTruthy()
            expect.soft(response.data[1].projectInfo.description).toBeTruthy()
            expect.soft(response.data[1].id).toBeTruthy()
            expect.soft(response.data[1].fromPlugin).toBeTruthy()
            expect.soft(response.data[1].created_at).toBeTruthy()
            expect.soft(response.data[1].updated_at).toBeTruthy()

            expect.soft(response.status).toBe(data.STATUS)
        })
    }

    for (const data of CREATE_PROJECT_TEMPLATE) {

        test.skip(`Create Project Template ${data.TEST_NAME}`, async () => {

            const PROJECT_TEMPLATE_DATA = {
                "globalVars": data.GLOBAL_VARS,
                "pages": data.PAGES,
                "projectInfo": data.PROJECT_INFO_DATA,
            }

            /* Create Project Template */
            const response = await axios.post(ENDPOINT + "/project_templates", PROJECT_TEMPLATE_DATA, {
                validateStatus: function (status) {
                    return status
                }
            })

            /* Assert Create Project Template */
            if (data.CASE_TYPE == "POSITIVE") {

                expect.soft(response.data).toMatchObject(data.EXPECTED)
                expect.soft(response.data.id).toBeTruthy()
                expect.soft(response.data.created_at).toBeTruthy()
                expect.soft(response.data.updated_at).toBeTruthy()

                expect.soft(response.status).toBe(data.STATUS)

            }

            if (data.CASE_TYPE == "NEGATIVE") {

                expect.soft(response.data).toMatchObject(data.EXPECTED)
                expect.soft(response.status).toBe(data.STATUS)

            }

        })
    }

    for (const data of GET_PROJECT_TEMPLATE_BY_PROJECT_TEMPLATE_ID) {

        test.skip(`Get Project Template By Project Template Id ${data.TEST_NAME}`, async () => {

            let response

            const PROJECT_TEMPLATE_DATA = {
                "globalVars": data.GLOBAL_VARS,
                "pages": data.PAGES,
                "projectInfo": data.PROJECT_INFO_DATA,
            }

            if (data.CASE_TYPE == "POSITIVE") {

                /* Create Project Template */
                response = await axios.post(ENDPOINT + "/project_templates", PROJECT_TEMPLATE_DATA, {
                    validateStatus: function (status) {
                        return status
                    }
                })

                /* Set Project Template ID */
                const project_template_id = response.data.id

                /* Get Project By Id */
                response = await axios.get(ENDPOINT + "/project_templates/" + project_template_id, {
                    validateStatus: function (status) {
                        return status
                    }
                })

                /* Assert Get Project Project By Project ID */
                expect.soft(response.data).toMatchObject(data.EXPECTED)
                expect.soft(response.data.id).toBeTruthy()
                expect.soft(response.data.created_at).toBeTruthy()
                expect.soft(response.data.updated_at).toBeTruthy()

                expect.soft(response.status).toBe(data.STATUS)

            }

            if (data.CASE_TYPE == "NEGATIVE") {

                /* Set Project ID */
                const project_id = data.PROJECT_ID

                /* Get Project By Id */
                response = await axios.get(ENDPOINT + "/projects/" + project_id, {
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

    for (const data of DELETE_PROJECT_TEMPLATE_BY_ID) {
        test(`Delete Project Template By Id ${data.TEST_NAME}`, async () => {

            const PROJECT_TEMPLATE_DATA = {
                "globalVars": data.GLOBAL_VARS,
                "pages": data.PAGES,
                "projectInfo": data.PROJECT_INFO_DATA,
            }

            let response;

            if (data.CASE_TYPE == "POSITIVE") {
                // Create a project template first
                response = await axios.post(ENDPOINT + "/project_templates", PROJECT_TEMPLATE_DATA, {
                    validateStatus: function (status) {
                        return status;
                    }
                });

                const project_template_id = response.data.id;

                // Delete the project template by ID
                response = await axios.delete(ENDPOINT + "/project_templates/" + project_template_id, {
                    validateStatus: function (status) {
                        return status;
                    }
                });

                // Assert Delete Project Template By ID
                expect.soft(response.status).toBe(data.STATUS);
            }

            if (data.CASE_TYPE == "NEGATIVE") {
                // Set Project Template ID
                const project_template_id = data.PROJECT_TEMPLATE_ID;

                // Delete the project template by ID
                response = await axios.delete(ENDPOINT + "/project_templates/" + project_template_id, {
                    validateStatus: function (status) {
                        return status;
                    }
                });

                // Assert Delete Project Template By ID
                expect.soft(response.data).toMatchObject(data.EXPECTED);
                expect.soft(response.status).toBe(data.STATUS);
            }
        })
    }

})