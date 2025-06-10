import { test, expect } from '@playwright/test'

import axios from 'axios'

const url = process.env.URL
const port_number = process.env.PORT_NUMBER

const STRING_4096_CHARACTERS = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin in malesuada elit. Fusce id commodo neque. Aliquam fermentum sem eget faucibus interdum. Donec vulputate pellentesque lectus, a commodo magna congue vitae. Quisque ullamcorper dolor vel consequat malesuada. Aenean est orci, porta ut mi eget, iaculis ultricies felis. Nulla elementum purus vel nisl pharetra, vitae iaculis dolor ornare. Nunc id augue vulputate, sollicitudin elit et, imperdiet nulla. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Cras interdum sodales ipsum. Quisque commodo diam lorem, eu vehicula felis tincidunt et. Mauris in enim faucibus massa rhoncus lobortis vitae vel urna. In velit enim, accumsan at lacus id, vehicula interdum quam. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.\
Curabitur vitae blandit arcu. In ut justo pulvinar, pharetra purus ut, gravida augue. Proin pharetra quam at lacus ultrices, in lobortis libero pellentesque. Vivamus eget ex a leo egestas mattis. Proin pellentesque nisl lacus, in convallis elit imperdiet non. Cras non enim non neque commodo fermentum. Quisque nec libero malesuada dui lobortis ultricies non eu tellus. Ut sit amet dictum dolor. Nulla dui lacus, imperdiet nec dapibus ut, rhoncus at eros. Vivamus sed lorem vulputate, pharetra lacus et, viverra metus. Fusce a pharetra leo. Nunc vel finibus orci.\
Etiam tempor, ante vitae porttitor tincidunt, enim nibh dignissim mi, a aliquam felis odio viverra turpis. Aliquam erat volutpat. Nunc pulvinar blandit risus. Mauris non lacus dolor. Curabitur et elit non nisl venenatis pretium. Integer sit amet dui vitae justo condimentum elementum. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Morbi pulvinar interdum dui, sit amet fringilla purus sodales eget. Duis sollicitudin, ante eu efficitur consectetur, mi leo volutpat libero, ut fermentum felis metus non felis. Mauris bibendum lacus libero, et suscipit ipsum dictum eu. Sed faucibus pharetra convallis. Nunc maximus nunc sit amet risus aliquet blandit. Duis tincidunt porta justo, id semper mi ullamcorper at. Integer ac molestie dui. Donec tempus ligula quis nunc ultrices scelerisque.\
In hac habitasse platea dictumst. Nulla facilisi. Pellentesque vulputate erat velit, sed varius magna ultricies nec. Pellentesque quis laoreet turpis, at bibendum magna. Curabitur hendrerit facilisis facilisis. Aliquam tortor nisi, rhoncus eget mi vel, imperdiet tempus eros. Quisque laoreet fringilla augue, at maximus lacus mollis et. Fusce commodo, purus eu efficitur ultricies, sapien lacus mattis elit, non consequat tellus justo in nibh. Aliquam dolor libero, aliquet et erat sit amet, eleifend tincidunt purus. Quisque id rhoncus dui. Aliquam egestas mattis nisi, et aliquam dui hendrerit vel. Cras in eros porttitor, volutpat eros ornare, ultrices lacus.\
Etiam nibh est, posuere in tincidunt eu, consequat sit amet diam. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Curabitur eget magna vel nisl vestibulum elementum. In sed felis rhoncus, sollicitudin est ac, finibus mi. Nunc porttitor magna ut feugiat consectetur. Donec at est maximus, facilisis libero eget, imperdiet eros. Pellentesque pretium aliquam interdum. Curabitur sed ullamcorper nunc. Etiam fermentum faucibus enim sit amet consectetur. Cras posuere diam non porta malesuada.\
Donec tempor ut eros vel hendrerit. Sed lobortis ex in ante mattis pharetra. Nullam imperdiet velit vitae fringilla vulputate. Morbi quis nisi lacus. Integer magna odio, finibus nec luctus sed, accumsan et lacus. Donec non hendrerit odio, nec fermentum felis. Maecenas dolor erat, euismod eget iaculis ut, iaculis vitae magna. Morbi nibh erat, facilisis in sollicitudin condimentum, ultricies at elit. Nunc bibendum purus rhoncus nibh faucibus cursus. Nunc condimentum, nisi in fermentum porttitor, nunc urna tincidunt sapien, sed imperdiet erat justo nec eros. Fusce et nulla in leo rutrum rutrum eget a tellus.\
Aliquam erat volutpat. Praesent sed arcu blandit, elementum lacus sed, sodales nunc. Phasellus ante velit, pulvinar ac nunc et, mattis tincidunt nisi. Ut congue aliquam efficitur. Duis vitae hendrerit nunc. Curabitur egestas dui vitae lorem laoreet, ut lacinia lectus laoreet. Vivamus ultricies turpis non metus scelerisque, ut laoreet eros dignissim. Nulla ut turpis nec elit ultricies bibendum nec eleifend lectus. Integer risus urna, gravida tempus ex eget, cursus interdum libero. Nunc ac sapien imperdiet, aliquet erat sit amet, dapibus lectus. Aliquam et metus quis ex rutrum elementum eget vitae metus. Curabitur nisi diam, sodales eget condimentum nec, aliquam ac velit. Aliquam dictum hendrerit commodo. Maecenas mattis ipsum lectus, sed efficitur sem mattis eu. Donec vitae dolor ullamcorper, congue nisi eu, egestas justo. Mauris scelerisque, nisi non mattis sagittis, mauris ante faucibus enim, sit amet ullamcorper ante nulla sed libero."

const GET_INPUT_BLOCK = [
    { TEST_NAME: "", STATUS: 200 }
]

const CREATE_INPUT_BLOCK = [
    { TEST_NAME: "With Gid Character Length Between 1 - 128 Characters With Cid Character Length Between 1 - 128 Characters With Name Character Length Between 1 - 128 Characters With Group Character Length Between 1 - 128 Characters With Valid User Data", CASE_TYPE: "POSITIVE", INPUT_BLOCK_DATA: { "cid": "explainability_process_checklist", "data": { "completed-2.1.1": "Yes", "elaboration-2.1.1": "Documented as part of company's software development process." }, "group": "tested2", "gid": "aiverify.stock.process_checklist", "name": "explainability_process_checklist" }, EXPECTED: { gid: 'aiverify.stock.process_checklist', cid: 'explainability_process_checklist', name: 'explainability_process_checklist', group: 'tested2', data: { 'completed-2.1.1': 'Yes', 'elaboration-2.1.1': "Documented as part of company's software development process." } }, STATUS: 200 },
    { TEST_NAME: "With Gid Character Length Between 1 - 128 Characters With Cid Character Length Between 1 - 128 Characters With Name Character Length Between 1 - 128 Characters With Group Character Length Between 1 - 128 Characters With Empty User Data", CASE_TYPE: "NEGATIVE", INPUT_BLOCK_DATA: { "cid": "explainability_process_checklist", "data": "", "group": "test", "gid": "aiverify.stock.process_checklist", "name": "explainability_process_checklist" }, EXPECTED: { detail: [{ type: 'dict_type', loc: [ 'body', 'data' ], msg: 'Input should be a valid dictionary', input: '' } ] }, STATUS: 422 },
    { TEST_NAME: "With Gid Character Length Between 1 - 128 Characters With Cid Character Length Between 1 - 128 Characters With Name Character Length Between 1 - 128 Characters With Group Character Length Between 1 - 128 Characters With Null User Data", CASE_TYPE: "NEGATIVE", INPUT_BLOCK_DATA: { "cid": "explainability_process_checklist", "data": null, "group": "test", "gid": "aiverify.stock.process_checklist", "name": "explainability_process_checklist" }, EXPECTED: { detail: [{ type: 'dict_type', loc: [ 'body', 'data' ], msg: 'Input should be a valid dictionary', input: null } ] }, STATUS: 422  },
    { TEST_NAME: "With Gid Character Length Between 1 - 128 Characters With Cid Character Length Between 1 - 128 Characters With Name Character Length Between 1 - 128 Characters With Group Character Length Between 1 - 128 Characters With No Values User Data", CASE_TYPE: "NEGATIVE", INPUT_BLOCK_DATA: { "cid": "explainability_process_checklist", "group": "test", "gid": "aiverify.stock.process_checklist", "name": "explainability_process_checklist" }, EXPECTED: { detail: [{ type: 'missing', loc: [ 'body', 'data' ], msg: 'Field required', input: { cid: 'explainability_process_checklist', gid: 'aiverify.stock.process_checklist', name: 'explainability_process_checklist' }} ] }, STATUS: 422  },
    // { TEST_NAME: "With Gid Character Length Between 1 - 128 Characters With Cid Character Length Between 1 - 128 Characters With Name Character Length Between 1 - 128 Characters With Group Character Length Between 1 - 128 Characters With Empty Key User Data", CASE_TYPE: "NEGATIVE", INPUT_BLOCK_DATA: { "cid": "explainability_process_checklist", "data": { "": "Yes" }, "group": "test", "gid": "aiverify.stock.process_checklist", "name": "explainability_process_checklist" }, EXPECTED: { detail: [{ type: 'dict_type', loc: [ 'body', 'data' ], msg: 'Input should be a valid dictionary', input: null } ] }, STATUS: 422  }, // Does the Key/Value Pair Need Validation
    // { TEST_NAME: "With Gid Character Length Between 1 - 128 Characters With Cid Character Length Between 1 - 128 Characters With Name Character Length Between 1 - 128 Characters With Group Character Length Between 1 - 128 Characters With Null Key User Data", CASE_TYPE: "NEGATIVE", INPUT_BLOCK_DATA: { "cid": "explainability_process_checklist", "data": { null: "Yes" }, "group": "test", "gid": "aiverify.stock.process_checklist", "name": "explainability_process_checklist" }, EXPECTED: { detail: [{ type: 'dict_type', loc: [ 'body', 'data' ], msg: 'Input should be a valid dictionary', input: null } ] }, STATUS: 422  }, // Does the Key/Value Pair Need Validation
    // { TEST_NAME: "With Gid Character Length Between 1 - 128 Characters With Cid Character Length Between 1 - 128 Characters With Name Character Length Between 1 - 128 Characters With Group Character Length Between 1 - 128 Characters With Empty Value User Data", CASE_TYPE: "NEGATIVE", INPUT_BLOCK_DATA: { "cid": "explainability_process_checklist", "data": { "completed-2.1.1": "" } , "group": "test", "gid": "aiverify.stock.process_checklist", "name": "explainability_process_checklist" }, EXPECTED: { detail: [{ type: 'dict_type', loc: [ 'body', 'data' ], msg: 'Input should be a valid dictionary', input: "" } ] }, STATUS: 422  }, // Does the Key/Value Pair Need Validation
    // { TEST_NAME: "With Gid Character Length Between 1 - 128 Characters With Cid Character Length Between 1 - 128 Characters With Name Character Length Between 1 - 128 Characters With Group Character Length Between 1 - 128 Characters With Null Value User Data", CASE_TYPE: "NEGATIVE", INPUT_BLOCK_DATA: { "cid": "explainability_process_checklist", "data": { "completed-2.1.1": null }, "group": "test", "gid": "aiverify.stock.process_checklist", "name": "explainability_process_checklist" }, EXPECTED: { detail: [{ type: 'dict_type', loc: [ 'body', 'data' ], msg: 'Input should be a valid dictionary', input: null }]}, STATUS: 422 }, // Does the Key/Value Pair Need Validation
    { TEST_NAME: "With Gid Character Length Between 1 - 128 Characters With Cid Character Length Between 1 - 128 Characters With Name Character Length Between 1 - 128 Characters With Group Character Length > 128 Characters With Valid User Data", CASE_TYPE: "NEGATIVE", INPUT_BLOCK_DATA: { "cid": "explainability_process_checklist", "data": { "completed-2.1.1": "Yes", "elaboration-2.1.1": "Documented as part of company's software development process." }, "group": STRING_4096_CHARACTERS, "gid": "aiverify.stock.process_checklist", "name": "explainability_process_checklist" }, EXPECTED: { detail: [{ type: 'string_too_long', loc: [ 'body', 'group'], msg: 'String should have at most 128 characters', input: STRING_4096_CHARACTERS, ctx: { max_length: 128 } }]}, STATUS: 422 },
    { TEST_NAME: "With Gid Character Length Between 1 - 128 Characters With Cid Character Length Between 1 - 128 Characters With Name Character Length Between 1 - 128 Characters With Group Integer Characters With Valid User Data", CASE_TYPE: "NEGATIVE", INPUT_BLOCK_DATA: { "cid": "explainability_process_checklist", "data": { "completed-2.1.1": "Yes", "elaboration-2.1.1": "Documented as part of company's software development process." }, "group": 123, "gid": "aiverify.stock.process_checklist", "name": "explainability_process_checklist" }, EXPECTED: { detail: [{ type: 'string_type', loc: [ 'body', 'group' ], msg: 'Input should be a valid string', input: 123 }]}, STATUS: 422 },
    { TEST_NAME: "With Gid Character Length Between 1 - 128 Characters With Cid Character Length Between 1 - 128 Characters With Name Character Length Between 1 - 128 Characters With Group Float Characters With Valid User Data", CASE_TYPE: "NEGATIVE", INPUT_BLOCK_DATA: { "cid": "explainability_process_checklist", "data": { "completed-2.1.1": "Yes", "elaboration-2.1.1": "Documented as part of company's software development process." }, "group": 12.3, "gid": "aiverify.stock.process_checklist", "name": "explainability_process_checklist" }, EXPECTED: { detail: [{ type: 'string_type', loc: [ 'body', 'group' ], msg: 'Input should be a valid string', input: 12.3 }]}, STATUS: 422 },
    { TEST_NAME: "With Gid Character Length Between 1 - 128 Characters With Cid Character Length Between 1 - 128 Characters With Name Character Length Between 1 - 128 Characters With Group Boolean Characters With Valid User Data", CASE_TYPE: "NEGATIVE", INPUT_BLOCK_DATA: { "cid": "explainability_process_checklist", "data": { "completed-2.1.1": "Yes", "elaboration-2.1.1": "Documented as part of company's software development process." }, "group": true, "gid": "aiverify.stock.process_checklist", "name": "explainability_process_checklist" }, EXPECTED: { detail: [{ type: 'string_type', loc: [ 'body', 'group' ], msg: 'Input should be a valid string', input: true }]}, STATUS: 422 },
    { TEST_NAME: "With Gid Character Length Between 1 - 128 Characters With Cid Character Length Between 1 - 128 Characters With Name Character Length Between 1 - 128 Characters With Group Empty Characters With Valid User Data", CASE_TYPE: "NEGATIVE", INPUT_BLOCK_DATA: { "cid": "explainability_process_checklist", "data": { "completed-2.1.1": "Yes", "elaboration-2.1.1": "Documented as part of company's software development process." }, "group": "", "gid": "aiverify.stock.process_checklist", "name": "explainability_process_checklist" }, EXPECTED: { detail: [{ type: 'string_too_short', loc: [ 'body', 'group' ], msg: 'String should have at least 1 character', input: "" }]}, STATUS: 422 },
    { TEST_NAME: "With Gid Character Length Between 1 - 128 Characters With Cid Character Length Between 1 - 128 Characters With Name Character Length Between 1 - 128 Characters With Group Null Characters With Valid User Data", CASE_TYPE: "NEGATIVE", INPUT_BLOCK_DATA: { "cid": "explainability_process_checklist", "data": { "completed-2.1.1": "Yes", "elaboration-2.1.1": "Documented as part of company's software development process." }, "group": null, "gid": "aiverify.stock.process_checklist", "name": "explainability_process_checklist" }, EXPECTED: { detail: [{ type: 'string_type', loc: [ 'body', 'group' ], msg: 'Input should be a valid string', input: null }]}, STATUS: 422 },
    { TEST_NAME: "With Gid Character Length Between 1 - 128 Characters With Cid Character Length Between 1 - 128 Characters With Name Character Length Between 1 - 128 Characters With Group No Value Characters With Valid User Data", CASE_TYPE: "NEGATIVE", INPUT_BLOCK_DATA: { "cid": "explainability_process_checklist", "data": { "completed-2.1.1": "Yes", "elaboration-2.1.1": "Documented as part of company's software development process." }, "gid": "aiverify.stock.process_checklist", "name": "explainability_process_checklist" }, EXPECTED: { detail: [{ type: 'missing', loc: [ 'body', 'group' ], msg: 'Field required', input: { cid: 'explainability_process_checklist', data: { "completed-2.1.1": "Yes", "elaboration-2.1.1": "Documented as part of company's software development process." }, gid: 'aiverify.stock.process_checklist', name: 'explainability_process_checklist' }} ]}, STATUS: 422 },
    { TEST_NAME: "With Gid Character Length Between 1 - 128 Characters With Cid Character Length Between 1 - 128 Characters With Name Character Length > 128 Characters With Group Character Length Between 1 - 128 Characters With Valid User Data", CASE_TYPE: "NEGATIVE", INPUT_BLOCK_DATA: { "cid": "explainability_process_checklist", "data": { "completed-2.1.1": "Yes", "elaboration-2.1.1": "Documented as part of company's software development process." }, "group": "null", "gid": "aiverify.stock.process_checklist", "name": STRING_4096_CHARACTERS }, EXPECTED: { detail: [{ type: 'string_too_long', loc: [ 'body', 'name'], msg: 'String should have at most 128 characters', input: STRING_4096_CHARACTERS, ctx: { max_length: 128 } }]}, STATUS: 422 },
    { TEST_NAME: "With Gid Character Length Between 1 - 128 Characters With Cid Character Length Between 1 - 128 Characters With Name Integer Characters With Group Character Length Between 1 - 128 Characters With Valid User Data", CASE_TYPE: "NEGATIVE", INPUT_BLOCK_DATA: { "cid": "explainability_process_checklist", "data": { "completed-2.1.1": "Yes", "elaboration-2.1.1": "Documented as part of company's software development process." }, "group": "test", "gid": "aiverify.stock.process_checklist", "name": 123 }, EXPECTED: { detail: [{ type: 'string_type', loc: [ 'body', 'name' ], msg: 'Input should be a valid string', input: 123 }]}, STATUS: 422 },
    { TEST_NAME: "With Gid Character Length Between 1 - 128 Characters With Cid Character Length Between 1 - 128 Characters With Name Float Characters With Group Character Length Between 1 - 128 Characters With Valid User Data", CASE_TYPE: "NEGATIVE", INPUT_BLOCK_DATA: { "cid": "explainability_process_checklist", "data": { "completed-2.1.1": "Yes", "elaboration-2.1.1": "Documented as part of company's software development process." }, "group": "test", "gid": "aiverify.stock.process_checklist", "name": 12.3 }, EXPECTED: { detail: [{ type: 'string_type', loc: [ 'body', 'name' ], msg: 'Input should be a valid string', input: 12.3 }]}, STATUS: 422 },
    { TEST_NAME: "With Gid Character Length Between 1 - 128 Characters With Cid Character Length Between 1 - 128 Characters With Name Boolean Characters With Group Character Length Between 1 - 128 Characters With Valid User Data", CASE_TYPE: "NEGATIVE", INPUT_BLOCK_DATA: { "cid": "explainability_process_checklist", "data": { "completed-2.1.1": "Yes", "elaboration-2.1.1": "Documented as part of company's software development process." }, "group": "test", "gid": "aiverify.stock.process_checklist", "name": true }, EXPECTED: { detail: [{ type: 'string_type', loc: [ 'body', 'name' ], msg: 'Input should be a valid string', input: true }]}, STATUS: 422 },
    { TEST_NAME: "With Gid Character Length Between 1 - 128 Characters With Cid Character Length Between 1 - 128 Characters With Name Empty Characters With Group Character Length Between 1 - 128 Characters With Valid User Data", CASE_TYPE: "NEGATIVE", INPUT_BLOCK_DATA: { "cid": "explainability_process_checklist", "data": { "completed-2.1.1": "Yes", "elaboration-2.1.1": "Documented as part of company's software development process." }, "group": "test", "gid": "aiverify.stock.process_checklist", "name": "" }, EXPECTED: { detail: [{ type: 'string_too_short', loc: [ 'body', 'name' ], msg: 'String should have at least 1 character', input: "" }]}, STATUS: 422 },
    { TEST_NAME: "With Gid Character Length Between 1 - 128 Characters With Cid Character Length Between 1 - 128 Characters With Name Null Characters With Group Character Length Between 1 - 128 Characters With Valid User Data", CASE_TYPE: "NEGATIVE", INPUT_BLOCK_DATA: { "cid": "explainability_process_checklist", "data": { "completed-2.1.1": "Yes", "elaboration-2.1.1": "Documented as part of company's software development process." }, "group": "test", "gid": "aiverify.stock.process_checklist", "name": null }, EXPECTED: { detail: [{ type: 'string_type', loc: [ 'body', 'name' ], msg: 'Input should be a valid string', input: null }]}, STATUS: 422 },
    { TEST_NAME: "With Gid Character Length Between 1 - 128 Characters With Cid Character Length Between 1 - 128 Characters With Name No Value Characters With Group Character Length Between 1 - 128 Characters With Valid User Data", CASE_TYPE: "NEGATIVE", INPUT_BLOCK_DATA: { "cid": "explainability_process_checklist", "data": { "completed-2.1.1": "Yes", "elaboration-2.1.1": "Documented as part of company's software development process." }, "group": "test", "gid": "aiverify.stock.process_checklist" }, EXPECTED: { detail: [{ type: 'missing', loc: [ 'body', 'name' ], msg: 'Field required', input: { cid: "explainability_process_checklist", data: { "completed-2.1.1": "Yes", "elaboration-2.1.1": "Documented as part of company's software development process." }, gid: "aiverify.stock.process_checklist", group: "test" } }]}, STATUS: 422 },
    { TEST_NAME: "With Gid Character Length Between 1 - 128 Characters With Cid Character Length > 128 Characters With Name Character Length Between 1 - 128 Characters With Group Character Length Between 1 - 128 Characters With Valid User Data", CASE_TYPE: "NEGATIVE", INPUT_BLOCK_DATA: { "cid": STRING_4096_CHARACTERS, "data": { "completed-2.1.1": "Yes", "elaboration-2.1.1": "Documented as part of company's software development process." }, "group": "test", "gid": "aiverify.stock.process_checklist", "name": "explainability_process_checklist" }, EXPECTED: { detail: [{ type: 'string_too_long', loc: [ 'body', 'cid'], msg: 'String should have at most 128 characters', input: STRING_4096_CHARACTERS, ctx: { max_length: 128 } }]}, STATUS: 422 },
    // { TEST_NAME: "With Gid Character Length Between 1 - 128 Characters With Non Existing Cid With Name Character Length Between 1 - 128 Characters With Group Character Length Between 1 - 128 Characters With Valid User Data", CASE_TYPE: "NEGATIVE", INPUT_BLOCK_DATA: { "cid": "explainability_process_checklist", "data": { "completed-2.1.1": "Yes", "elaboration-2.1.1": "Documented as part of company's software development process." }, "group": "test", "gid": "aiverify.stock.process_checklist", "name": "explainability_process_checklist" }, EXPECTED: { detail: 'Internal error 400: InputBlock cid explainability_process_checklist not found' }, STATUS: 422 }, // Error Code 500?
    { TEST_NAME: "With Gid Character Length Between 1 - 128 Characters With Cid Integer Character With Name Character Length Between 1 - 128 Characters With Group Character Length Between 1 - 128 Characters With Valid User Data", CASE_TYPE: "NEGATIVE", INPUT_BLOCK_DATA: { "cid": 123, "data": { "completed-2.1.1": "Yes", "elaboration-2.1.1": "Documented as part of company's software development process." }, "group": "test", "gid": "aiverify.stock.process_checklist", "name": "explainability_process_checklist" }, EXPECTED: { detail: [{ type: 'string_type', loc: [ 'body', 'cid' ], msg: 'Input should be a valid string', input: 123 }]}, STATUS: 422 },
    { TEST_NAME: "With Gid Character Length Between 1 - 128 Characters With Cid Float Character With Name Character Length Between 1 - 128 Characters With Group Character Length Between 1 - 128 Characters With Valid User Data", CASE_TYPE: "NEGATIVE", INPUT_BLOCK_DATA: { "cid": 12.3, "data": { "completed-2.1.1": "Yes", "elaboration-2.1.1": "Documented as part of company's software development process." }, "group": "test", "gid": "aiverify.stock.process_checklist", "name": "explainability_process_checklist" }, EXPECTED: { detail: [{ type: 'string_type', loc: [ 'body', 'cid' ], msg: 'Input should be a valid string', input: 12.3 }]}, STATUS: 422 },
    { TEST_NAME: "With Gid Character Length Between 1 - 128 Characters With Cid Boolean Character With Name Character Length Between 1 - 128 Characters With Group Character Length Between 1 - 128 Characters With Valid User Data", CASE_TYPE: "NEGATIVE", INPUT_BLOCK_DATA: { "cid": true, "data": { "completed-2.1.1": "Yes", "elaboration-2.1.1": "Documented as part of company's software development process." }, "group": "test", "gid": "aiverify.stock.process_checklist", "name": "explainability_process_checklist" }, EXPECTED: { detail: [{ type: 'string_type', loc: [ 'body', 'cid' ], msg: 'Input should be a valid string', input: true }]}, STATUS: 422 },
    { TEST_NAME: "With Gid Character Length Between 1 - 128 Characters With Cid Empty Character With Name Character Length Between 1 - 128 Characters With Group Character Length Between 1 - 128 Characters With Valid User Data", CASE_TYPE: "NEGATIVE", INPUT_BLOCK_DATA: { "cid": "", "data": { "completed-2.1.1": "Yes", "elaboration-2.1.1": "Documented as part of company's software development process." }, "group": "test", "gid": "aiverify.stock.process_checklist", "name": "explainability_process_checklist" }, EXPECTED: { detail: [{ type: 'string_too_short', loc: [ 'body', 'cid' ], msg: 'String should have at least 1 character', input: "" }]}, STATUS: 422 },
    { TEST_NAME: "With Gid Character Length Between 1 - 128 Characters With Cid Null Character With Name Character Length Between 1 - 128 Characters With Group Character Length Between 1 - 128 Characters With Valid User Data", CASE_TYPE: "NEGATIVE", INPUT_BLOCK_DATA: { "cid": null, "data": { "completed-2.1.1": "Yes", "elaboration-2.1.1": "Documented as part of company's software development process." }, "group": "test", "gid": "aiverify.stock.process_checklist", "name": "explainability_process_checklist" }, EXPECTED: { detail: [{ type: 'string_type', loc: [ 'body', 'cid' ], msg: 'Input should be a valid string', input: null }]}, STATUS: 422 },
    { TEST_NAME: "With Gid Character Length Between 1 - 128 Characters With Cid No Value Character With Name Character Length Between 1 - 128 Characters With Group Character Length Between 1 - 128 Characters With Valid User Data", CASE_TYPE: "NEGATIVE", INPUT_BLOCK_DATA: { "data": { "completed-2.1.1": "Yes", "elaboration-2.1.1": "Documented as part of company's software development process." }, "group": "test", "gid": "aiverify.stock.process_checklist", "name": "explainability_process_checklist" }, EXPECTED: { detail: [{ type: 'missing', loc: [ 'body', 'cid' ], msg: 'Field required', input: { data: { "completed-2.1.1": "Yes", "elaboration-2.1.1": "Documented as part of company's software development process." }, gid: 'aiverify.stock.process_checklist', name: 'explainability_process_checklist' }} ]}, STATUS: 422 },
    { TEST_NAME: "With Gid Character Length Between 1 - 128 Characters With Cid Invalid Character With Name Character Length Between 1 - 128 Characters With Group Character Length Between 1 - 128 Characters With Valid User Data", CASE_TYPE: "NEGATIVE", INPUT_BLOCK_DATA: { "cid": "explainability process checklist", "data": { "completed-2.1.1": "Yes", "elaboration-2.1.1": "Documented as part of company's software development process." }, "group": "test", "gid": "aiverify.stock.process_checklist", "name": "explainability_process_checklist" }, EXPECTED: { detail: [{ type: 'string_pattern_mismatch', loc: [ 'body', 'cid' ], msg: 'String should match pattern \'^[a-zA-Z0-9][a-zA-Z0-9-._]*$\'', input: "explainability process checklist" }]}, STATUS: 422 },
    { TEST_NAME: "With Gid Character Length > 128 Characters With Cid Integer Character With Name Character Length Between 1 - 128 Characters With Group Character Length Between 1 - 128 Characters With Valid User Data", CASE_TYPE: "NEGATIVE", INPUT_BLOCK_DATA: { "cid": "explainability_process_checklist", "data": { "completed-2.1.1": "Yes", "elaboration-2.1.1": "Documented as part of company's software development process." }, "group": "test", "gid": 123, "name": "explainability_process_checklist" }, EXPECTED: { detail: [{ type: 'string_type', loc: [ 'body', 'gid' ], msg: 'Input should be a valid string', input: 123 }]}, STATUS: 422 },
    { TEST_NAME: "With Gid Float Character With Cid Character Length Between 1 - 128 Characters With Name Character Length Between 1 - 128 Characters With Group Character Length Between 1 - 128 Characters With Valid User Data", CASE_TYPE: "NEGATIVE", INPUT_BLOCK_DATA: { "cid": "explainability_process_checklist", "data": { "completed-2.1.1": "Yes", "elaboration-2.1.1": "Documented as part of company's software development process." }, "group": "test", "gid": 12.3, "name": "explainability_process_checklist" }, EXPECTED: { detail: [{ type: 'string_type', loc: [ 'body', 'gid' ], msg: 'Input should be a valid string', input: 12.3 }]}, STATUS: 422 },
    { TEST_NAME: "With Gid Boolean Character With Cid Character Length Between 1 - 128 Characters With Name Character Length Between 1 - 128 Characters With Group Character Length Between 1 - 128 Characters With Valid User Data", CASE_TYPE: "NEGATIVE", INPUT_BLOCK_DATA: { "cid": "explainability_process_checklist", "data": { "completed-2.1.1": "Yes", "elaboration-2.1.1": "Documented as part of company's software development process." }, "group": "test", "gid": true, "name": "explainability_process_checklist" }, EXPECTED: { detail: [{ type: 'string_type', loc: [ 'body', 'gid' ], msg: 'Input should be a valid string', input: true }]}, STATUS: 422 },
    { TEST_NAME: "With Gid Empty Character With Cid Character Length Between 1 - 128 Characters With Name Character Length Between 1 - 128 Characters With Group Character Length Between 1 - 128 Characters With Valid User Data", CASE_TYPE: "NEGATIVE", INPUT_BLOCK_DATA: { "cid": "explainability_process_checklist", "data": { "completed-2.1.1": "Yes", "elaboration-2.1.1": "Documented as part of company's software development process." }, "group": "test", "gid": "", "name": "explainability_process_checklist" }, EXPECTED: { detail: [{ type: 'string_too_short', loc: [ 'body', 'gid' ], msg: 'String should have at least 1 character', input: "" }]}, STATUS: 422 },
    { TEST_NAME: "With Gid Null Character With Cid Character Length Between 1 - 128 Characters With Name Character Length Between 1 - 128 Characters With Group Character Length Between 1 - 128 Characters With Valid User Data", CASE_TYPE: "NEGATIVE", INPUT_BLOCK_DATA: { "cid": "explainability_process_checklist", "data": { "completed-2.1.1": "Yes", "elaboration-2.1.1": "Documented as part of company's software development process." }, "group": "test", "gid": null, "name": "explainability_process_checklist" }, EXPECTED: { detail: [{ type: 'string_type', loc: [ 'body', 'gid' ], msg: 'Input should be a valid string', input: null }]}, STATUS: 422 },
    { TEST_NAME: "With Gid No Value Character With Cid Character Length Between 1 - 128 Characters With Name Character Length Between 1 - 128 Characters With Group Character Length Between 1 - 128 Characters With Valid User Data", CASE_TYPE: "NEGATIVE", INPUT_BLOCK_DATA: { "cid": "explainability_process_checklist", "data": { "completed-2.1.1": "Yes", "elaboration-2.1.1": "Documented as part of company's software development process." }, "group": "test", "name": "explainability_process_checklist" }, EXPECTED: { detail: [{ type: 'missing', loc: [ 'body', 'gid' ], msg: 'Field required', input: { data: { "completed-2.1.1": "Yes", "elaboration-2.1.1": "Documented as part of company's software development process." }, name: 'explainability_process_checklist' }} ]}, STATUS: 422 },
    { TEST_NAME: "With Gid Invalid Character With Cid Character Length Between 1 - 128 Characters With Name Character Length Between 1 - 128 Characters With Group Character Length Between 1 - 128 Characters With Valid User Data", CASE_TYPE: "NEGATIVE", INPUT_BLOCK_DATA: { "cid": "explainability_process_checklist", "data": { "completed-2.1.1": "Yes", "elaboration-2.1.1": "Documented as part of company's software development process." }, "group": "test", "gid": "aiverify stock process checklist", "name": "explainability_process_checklist" }, EXPECTED: { detail: [{ type: 'string_pattern_mismatch', loc: [ 'body', 'gid' ], msg: 'String should match pattern \'^[a-zA-Z0-9][a-zA-Z0-9-._]*$\'', input: "aiverify stock process checklist" }]}, STATUS: 422 },
    // { TEST_NAME: "With Existing Gid Character Length Between 1 - 128 Characters With Existing Cid Character Length Between 1 - 128 Characters With Name Character Length Between 1 - 128 Characters With Existing Group With Valid User Data", CASE_TYPE: "NEGATIVE", INPUT_BLOCK_DATA: { "cid": "explainability_process_checklist", "data": { "completed-2.1.1": "Yes", "elaboration-2.1.1": "Documented as part of company's software development process." }, "group": "test", "gid": "aiverify.stock.process_checklist", "name": "explainability_process_checklist" }, EXPECTED: { detail: "Internal error 400: A checklist with gid 'aiverify.stock.process_checklist', cid 'explainability_process_checklist', and group 'test' already exists." }, STATUS: 422 }, //HTTP Error 500?

]

const GET_INPUT_BLOCK_DATA_BY_INPUT_BLOCK_ID = [
    { TEST_NAME: "With Existing Input Block Id", CASE_TYPE: "POSITIVE", INPUT_BLOCK_DATA: { "cid": "explainability_process_checklist", "data": { "completed-2.1.1": "Yes", "elaboration-2.1.1": "Documented as part of company's software development process." }, "group": "tests", "gid": "aiverify.stock.process_checklist", "name": "explainability_process_checklist" }, EXPECTED: { gid: 'aiverify.stock.process_checklist', cid: 'explainability_process_checklist', name: 'explainability_process_checklist', group: 'tests', data: { 'completed-2.1.1': 'Yes', 'elaboration-2.1.1': "Documented as part of company's software development process." } }, STATUS: 200 },
    { TEST_NAME: "With Non-Existing Input Block Id", CASE_TYPE: "NEGATIVE", INPUT_BLOCK_ID: 100000000000000, EXPECTED: { detail: 'InputBlockData not found' }, STATUS: 404 },
    { TEST_NAME: "With String Input Block Id", CASE_TYPE: "NEGATIVE", INPUT_BLOCK_ID: "abc", EXPECTED: { detail: [{ type: 'int_parsing', loc: ['path', 'inputblock_id'], msg: 'Input should be a valid integer, unable to parse string as an integer', input: 'abc' }] }, STATUS: 422 },
    { TEST_NAME: "With Float Input Block Id", CASE_TYPE: "NEGATIVE", INPUT_BLOCK_ID: 12.3, EXPECTED: { detail: [{ type: 'int_parsing', loc: ['path', 'inputblock_id'], msg: 'Input should be a valid integer, unable to parse string as an integer', input: '12.3' }] }, STATUS: 422 },
    { TEST_NAME: "With Boolean Input Block Id", CASE_TYPE: "NEGATIVE", INPUT_BLOCK_ID: true, EXPECTED: { detail: [{ type: 'int_parsing', loc: ['path', 'inputblock_id'], msg: 'Input should be a valid integer, unable to parse string as an integer', input: 'true' }] }, STATUS: 422 },
    { TEST_NAME: "With Null Input Block Id", CASE_TYPE: "NEGATIVE", INPUT_BLOCK_ID: null, EXPECTED: { detail: [{ type: 'int_parsing', loc: ['path', 'inputblock_id'], msg: 'Input should be a valid integer, unable to parse string as an integer', input: 'null' }] }, STATUS: 422 },
    { TEST_NAME: "With No Value Input Block Id", CASE_TYPE: "NEGATIVE", EXPECTED: { detail: [{ type: 'int_parsing', loc: ['path', 'inputblock_id'], msg: 'Input should be a valid integer, unable to parse string as an integer', input: 'undefined' }] }, STATUS: 422 }
]

const UPDATE_INPUT_BLOCK_DATA_BY_INPUT_BLOCK_ID = [
    // { TEST_NAME: "With Existing Input Block Id With Name Character Length Between 1 - 128 Characters With Group Character Length Between 1 - 128 Characters With Valid User Data", CASE_TYPE: "POSITIVE", INPUT_BLOCK_DATA: { "cid": "explainability_process_checklist", "data": { "completed-2.1.1": "Yes", "elaboration-2.1.1": "Documented as part of company's software development process." }, "group": "tested14", "gid": "aiverify.stock.process_checklist", "name": "explainability_process_checklist" }, UPDATE_INPUT_BLOCK_DATA: { "data": { "completed-2.1.1": "No", "elaboration-2.1.1": "Documented as part of company's software development process." }, "group": "tested15", "name": "explainability_process_checklist" }, EXPECTED: { gid: 'aiverify.stock.process_checklist', cid: 'explainability_process_checklist', name: 'explainability_process_checklist', group: 'tested15', data: { 'completed-2.1.1': 'No', 'elaboration-2.1.1': "Documented as part of company's software development process." } }, STATUS: 200 },
    { TEST_NAME: "With Existing Input Block Id With Name Character Length Between 1 - 128 Characters With Group Character Length Between 1 - 128 Characters With Empty User Data", CASE_TYPE: "NEGATIVE", INPUT_BLOCK_ID: 1, UPDATE_INPUT_BLOCK_DATA: { "data": "", "group": "tested15", "name": "explainability_process_checklist" }, EXPECTED: { detail: [{ type: 'dict_type', loc: [ 'body', 'data' ], msg: 'Input should be a valid dictionary', input: '' } ] }, STATUS: 422 },
    { TEST_NAME: "With Existing Input Block Id With Name Character Length Between 1 - 128 Characters With Group Character Length Between 1 - 128 Characters With Null User Data", CASE_TYPE: "NEGATIVE", INPUT_BLOCK_ID: 1, UPDATE_INPUT_BLOCK_DATA: { "data": null, "group": "tested15", "name": "explainability_process_checklist" }, EXPECTED: { detail: [{ type: 'dict_type', loc: [ 'body', 'data' ], msg: 'Input should be a valid dictionary', input: null } ] }, STATUS: 422  },
    { TEST_NAME: "With Existing Input Block Id With Name Character Length Between 1 - 128 Characters With Group Character Length Between 1 - 128 Characters With No Values User Data", CASE_TYPE: "NEGATIVE", INPUT_BLOCK_ID: 1, UPDATE_INPUT_BLOCK_DATA: { "group": "tested15", "name": "explainability_process_checklist" }, EXPECTED: { detail: [{ type: 'missing', loc: [ 'body', 'data' ], msg: 'Field required', input: { name: 'explainability_process_checklist' }} ] }, STATUS: 422  },
    // { TEST_NAME: "With Existing Input Block Id With Name Character Length Between 1 - 128 Characters With Group Character Length Between 1 - 128 Characters With Empty Key User Data", CASE_TYPE: "NEGATIVE", INPUT_BLOCK_ID: 1, UPDATE_INPUT_BLOCK_DATA: { "data": { "": "Yes" }, "group": "tested15", "name": "explainability_process_checklist" }, EXPECTED: { detail: [{ type: 'dict_type', loc: [ 'body', 'data' ], msg: 'Input should be a valid dictionary', input: "" } ] }, STATUS: 422  }, // Does the Key/Value Pair Need Validation
    // { TEST_NAME: "With Existing Input Block Id With Name Character Length Between 1 - 128 Characters With Group Character Length Between 1 - 128 Characters With Null Key User Data", CASE_TYPE: "NEGATIVE", INPUT_BLOCK_ID: 1, UPDATE_INPUT_BLOCK_DATA: { "data": { null: "Yes" }, "group": "tested15", "name": "explainability_process_checklist" }, EXPECTED: { detail: [{ type: 'dict_type', loc: [ 'body', 'data' ], msg: 'Input should be a valid dictionary', input: null } ] }, STATUS: 422  }, // Does the Key/Value Pair Need Validation
    // { TEST_NAME: "With Existing Input Block Id With Name Character Length Between 1 - 128 Characters With Group Character Length Between 1 - 128 Characters With Empty Value User Data", CASE_TYPE: "NEGATIVE", INPUT_BLOCK_ID: 1, UPDATE_INPUT_BLOCK_DATA: { "data": { "completed-2.1.1": "" } , "group": "test", "name": "explainability_process_checklist" }, EXPECTED: { detail: [{ type: 'dict_type', loc: [ 'body', 'data' ], msg: 'Input should be a valid dictionary', input: "" } ] }, STATUS: 422  }, // Does the Key/Value Pair Need Validation
    // { TEST_NAME: "With Existing Input Block Id With Name Character Length Between 1 - 128 Characters With Group Character Length Between 1 - 128 Characters With Null Value User Data", CASE_TYPE: "NEGATIVE", INPUT_BLOCK_ID: 1, UPDATE_INPUT_BLOCK_DATA: { "data": { "completed-2.1.1": null }, "group": "test", "name": "explainability_process_checklist" }, EXPECTED: { detail: [{ type: 'dict_type', loc: [ 'body', 'data' ], msg: 'Input should be a valid dictionary', input: null }]}, STATUS: 422 }, // Does the Key/Value Pair Need Validation
    { TEST_NAME: "With Existing Input Block Id With Name Character Length Between 1 - 128 Characters With Group Character Length Between 1 - 128 Characters With Group Character Length > 128 Characters With Valid User Data", CASE_TYPE: "NEGATIVE", INPUT_BLOCK_ID: 1, UPDATE_INPUT_BLOCK_DATA: { "data": { "completed-2.1.1": "Yes", "elaboration-2.1.1": "Documented as part of company's software development process." }, "group": STRING_4096_CHARACTERS, "name": "explainability_process_checklist" }, EXPECTED: { detail: [{ type: 'string_too_long', loc: [ 'body', 'group'], msg: 'String should have at most 128 characters', input: STRING_4096_CHARACTERS, ctx: { max_length: 128 } }]}, STATUS: 422 },
    { TEST_NAME: "With Existing Input Block Id With Name Character Length Between 1 - 128 Characters With Group Character Length Between 1 - 128 Characters With Group Integer Characters With Valid User Data", CASE_TYPE: "NEGATIVE", INPUT_BLOCK_ID: 1, UPDATE_INPUT_BLOCK_DATA: { "data": { "completed-2.1.1": "Yes", "elaboration-2.1.1": "Documented as part of company's software development process." }, "group": 123, "name": "explainability_process_checklist" }, EXPECTED: { detail: [{ type: 'string_type', loc: [ 'body', 'group' ], msg: 'Input should be a valid string', input: 123 }]}, STATUS: 422 },
    { TEST_NAME: "With Existing Input Block Id With Name Character Length Between 1 - 128 Characters With Group Character Length Between 1 - 128 Characters With Group Float Characters With Valid User Data", CASE_TYPE: "NEGATIVE", INPUT_BLOCK_ID: 1, UPDATE_INPUT_BLOCK_DATA: { "data": { "completed-2.1.1": "Yes", "elaboration-2.1.1": "Documented as part of company's software development process." }, "group": 12.3, "name": "explainability_process_checklist" }, EXPECTED: { detail: [{ type: 'string_type', loc: [ 'body', 'group' ], msg: 'Input should be a valid string', input: 12.3 }]}, STATUS: 422 },
    { TEST_NAME: "With Existing Input Block Id With Name Character Length Between 1 - 128 Characters With Group Character Length Between 1 - 128 Characters With Group Boolean Characters With Valid User Data", CASE_TYPE: "NEGATIVE", INPUT_BLOCK_ID: 1, UPDATE_INPUT_BLOCK_DATA: { "data": { "completed-2.1.1": "Yes", "elaboration-2.1.1": "Documented as part of company's software development process." }, "group": true, "name": "explainability_process_checklist" }, EXPECTED: { detail: [{ type: 'string_type', loc: [ 'body', 'group' ], msg: 'Input should be a valid string', input: true }]}, STATUS: 422 },
    { TEST_NAME: "With Existing Input Block Id With Name Character Length Between 1 - 128 Characters With Group Character Length Between 1 - 128 Characters With Group Empty Characters With Valid User Data", CASE_TYPE: "NEGATIVE", INPUT_BLOCK_ID: 1, UPDATE_INPUT_BLOCK_DATA: { "data": { "completed-2.1.1": "Yes", "elaboration-2.1.1": "Documented as part of company's software development process." }, "group": "", "name": "explainability_process_checklist" }, EXPECTED: { detail: [{ type: 'string_too_short', loc: [ 'body', 'group' ], msg: 'String should have at least 1 character', input: "" }]}, STATUS: 422 },
    { TEST_NAME: "With Existing Input Block Id With Name Character Length Between 1 - 128 Characters With Group Character Length Between 1 - 128 Characters With Group Null Characters With Valid User Data", CASE_TYPE: "NEGATIVE", INPUT_BLOCK_ID: 1, UPDATE_INPUT_BLOCK_DATA: { "data": { "completed-2.1.1": "Yes", "elaboration-2.1.1": "Documented as part of company's software development process." }, "group": null, "name": "explainability_process_checklist" }, EXPECTED: { detail: [{ type: 'string_type', loc: [ 'body', 'group' ], msg: 'Input should be a valid string', input: null }]}, STATUS: 422 },
    { TEST_NAME: "With Existing Input Block Id With Name Character Length Between 1 - 128 Characters With Group Character Length Between 1 - 128 Characters With Group No Value Characters With Valid User Data", CASE_TYPE: "NEGATIVE", INPUT_BLOCK_ID: 1, UPDATE_INPUT_BLOCK_DATA: { "data": { "completed-2.1.1": "Yes", "elaboration-2.1.1": "Documented as part of company's software development process." }, "name": "explainability_process_checklist" }, EXPECTED: { detail: [{ type: 'missing', loc: [ 'body', 'group' ], msg: 'Field required', input: { data: { "completed-2.1.1": "Yes", "elaboration-2.1.1": "Documented as part of company's software development process." }, name: 'explainability_process_checklist' }} ]}, STATUS: 422 },
    { TEST_NAME: "With Existing Input Block Id With Name Character Length > 128 Characters With Group Character Length Between 1 - 128 Characters With Valid User Data", CASE_TYPE: "NEGATIVE", INPUT_BLOCK_ID: 1, UPDATE_INPUT_BLOCK_DATA: { "data": { "completed-2.1.1": "Yes", "elaboration-2.1.1": "Documented as part of company's software development process." }, "group": "test", "name": STRING_4096_CHARACTERS }, EXPECTED: { detail: [{ type: 'string_too_long', loc: [ 'body', 'name'], msg: 'String should have at most 128 characters', input: STRING_4096_CHARACTERS, ctx: { max_length: 128 } }]}, STATUS: 422 },
    { TEST_NAME: "With Existing Input Block Id With Name Integer Characters With Group Character Length Between 1 - 128 Characters With Valid User Data", CASE_TYPE: "NEGATIVE", INPUT_BLOCK_ID: 1, UPDATE_INPUT_BLOCK_DATA: { "data": { "completed-2.1.1": "Yes", "elaboration-2.1.1": "Documented as part of company's software development process." }, "group": "test", "name": 123 }, EXPECTED: { detail: [{ type: 'string_type', loc: [ 'body', 'name' ], msg: 'Input should be a valid string', input: 123 }]}, STATUS: 422 },
    { TEST_NAME: "With Existing Input Block Id With Name Float Characters With Group Character Length Between 1 - 128 Characters With Valid User Data", CASE_TYPE: "NEGATIVE", INPUT_BLOCK_ID: 1, UPDATE_INPUT_BLOCK_DATA: { "data": { "completed-2.1.1": "Yes", "elaboration-2.1.1": "Documented as part of company's software development process." }, "group": "test", "name": 12.3 }, EXPECTED: { detail: [{ type: 'string_type', loc: [ 'body', 'name' ], msg: 'Input should be a valid string', input: 12.3 }]}, STATUS: 422 },
    { TEST_NAME: "With Existing Input Block Id With Name Boolean Characters With Group Character Length Between 1 - 128 Characters With Valid User Data", CASE_TYPE: "NEGATIVE", INPUT_BLOCK_ID: 1, UPDATE_INPUT_BLOCK_DATA: { "data": { "completed-2.1.1": "Yes", "elaboration-2.1.1": "Documented as part of company's software development process." }, "group": "test", "name": true }, EXPECTED: { detail: [{ type: 'string_type', loc: [ 'body', 'name' ], msg: 'Input should be a valid string', input: true }]}, STATUS: 422 },
    { TEST_NAME: "With Existing Input Block Id With Name Empty Characters With Group Character Length Between 1 - 128 Characters With Valid User Data", CASE_TYPE: "NEGATIVE", INPUT_BLOCK_ID: 1, UPDATE_INPUT_BLOCK_DATA: { "data": { "completed-2.1.1": "Yes", "elaboration-2.1.1": "Documented as part of company's software development process." }, "group": "test", "name": "" }, EXPECTED: { detail: [{ type: 'string_too_short', loc: [ 'body', 'name' ], msg: 'String should have at least 1 character', input: "" }]}, STATUS: 422 },
    { TEST_NAME: "With Existing Input Block Id With Name Null Characters With Group Character Length Between 1 - 128 Characters With Valid User Data", CASE_TYPE: "NEGATIVE", INPUT_BLOCK_ID: 1, UPDATE_INPUT_BLOCK_DATA: { "data": { "completed-2.1.1": "Yes", "elaboration-2.1.1": "Documented as part of company's software development process." }, "group": "test", "name": null }, EXPECTED: { detail: [{ type: 'string_type', loc: [ 'body', 'name' ], msg: 'Input should be a valid string', input: null }]}, STATUS: 422 },
    { TEST_NAME: "With Existing Input Block Id With Name No Value Characters With Group Character Length Between 1 - 128 Characters With Valid User Data", CASE_TYPE: "NEGATIVE", INPUT_BLOCK_ID: 1, UPDATE_INPUT_BLOCK_DATA: { "data": { "completed-2.1.1": "Yes", "elaboration-2.1.1": "Documented as part of company's software development process." }, "group": "test" }, EXPECTED: { detail: [{ type: 'missing', loc: [ 'body', 'name' ], msg: 'Field required', input: { data: { "completed-2.1.1": "Yes", "elaboration-2.1.1": "Documented as part of company's software development process." }, group: "test" } }]}, STATUS: 422 },
    { TEST_NAME: "With Non-Existing Input Block Id With Name Character Length Between 1 - 128 Characters With Group Character Length Between 1 - 128 Characters With Valid User Data", CASE_TYPE: "NEGATIVE", INPUT_BLOCK_ID: 100000000000000, EXPECTED: { detail: 'InputBlockData not found' }, STATUS: 404 },
    { TEST_NAME: "With String Input Block Id With Name Character Length Between 1 - 128 Characters With Group Character Length Between 1 - 128 Characters With Valid User Data", CASE_TYPE: "NEGATIVE", INPUT_BLOCK_ID: "abc", EXPECTED: { detail: [{ type: 'int_parsing', loc: ['path', 'inputblock_id'], msg: 'Input should be a valid integer, unable to parse string as an integer', input: 'abc' }] }, STATUS: 422 },
    { TEST_NAME: "With Float Input Block Id With Name Character Length Between 1 - 128 Characters With Group Character Length Between 1 - 128 Characters With Valid User Data", CASE_TYPE: "NEGATIVE", INPUT_BLOCK_ID: 12.3, EXPECTED: { detail: [{ type: 'int_parsing', loc: ['path', 'inputblock_id'], msg: 'Input should be a valid integer, unable to parse string as an integer', input: '12.3' }] }, STATUS: 422 },
    { TEST_NAME: "With Boolean Input Block Id With Name Character Length Between 1 - 128 Characters With Group Character Length Between 1 - 128 Characters With Valid User Data", CASE_TYPE: "NEGATIVE", INPUT_BLOCK_ID: true, EXPECTED: { detail: [{ type: 'int_parsing', loc: ['path', 'inputblock_id'], msg: 'Input should be a valid integer, unable to parse string as an integer', input: 'true' }] }, STATUS: 422 },
    { TEST_NAME: "With Null Input Block Id With Name Character Length Between 1 - 128 Characters With Group Character Length Between 1 - 128 Characters With Valid User Data", CASE_TYPE: "NEGATIVE", INPUT_BLOCK_ID: null, EXPECTED: { detail: [{ type: 'int_parsing', loc: ['path', 'inputblock_id'], msg: 'Input should be a valid integer, unable to parse string as an integer', input: 'null' }] }, STATUS: 422 },
    { TEST_NAME: "With No Value Input Block Id With Name Character Length Between 1 - 128 Characters With Group Character Length Between 1 - 128 Characters With Valid User Data", CASE_TYPE: "NEGATIVE", EXPECTED: { detail: [{ type: 'int_parsing', loc: ['path', 'inputblock_id'], msg: 'Input should be a valid integer, unable to parse string as an integer', input: 'undefined' }] }, STATUS: 422 }
]

const DELETE_INPUT_BLOCK_DATA_BY_INPUT_BLOCK_ID = [
    { TEST_NAME: "With Existing Input Block Id", CASE_TYPE: "POSITIVE", INPUT_BLOCK_DATA: { "cid": "explainability_process_checklist", "data": { "completed-2.1.1": "Yes", "elaboration-2.1.1": "Documented as part of company's software development process." }, "group": "groups", "gid": "aiverify.stock.process_checklist", "name": "explainability_process_checklist" }, STATUS: 200 },
    { TEST_NAME: "With Non-Existing Input Block Id", CASE_TYPE: "NEGATIVE", INPUT_BLOCK_ID: 100000000000000, EXPECTED: { detail: 'InputBlockData not found' }, STATUS: 404 },
    { TEST_NAME: "With String Input Block Id", CASE_TYPE: "NEGATIVE", INPUT_BLOCK_ID: "abc", EXPECTED: { detail: [{ type: 'int_parsing', loc: ['path', 'inputblock_id'], msg: 'Input should be a valid integer, unable to parse string as an integer', input: 'abc' }] }, STATUS: 422 },
    { TEST_NAME: "With Float Input Block Id", CASE_TYPE: "NEGATIVE", INPUT_BLOCK_ID: 12.3, EXPECTED: { detail: [{ type: 'int_parsing', loc: ['path', 'inputblock_id'], msg: 'Input should be a valid integer, unable to parse string as an integer', input: '12.3' }] }, STATUS: 422 },
    { TEST_NAME: "With Boolean Input Block Id", CASE_TYPE: "NEGATIVE", INPUT_BLOCK_ID: true, EXPECTED: { detail: [{ type: 'int_parsing', loc: ['path', 'inputblock_id'], msg: 'Input should be a valid integer, unable to parse string as an integer', input: 'true' }] }, STATUS: 422 },
    { TEST_NAME: "With Empty Input Block Id", CASE_TYPE: "NEGATIVE", INPUT_BLOCK_ID: "", EXPECTED: { detail: 'Method Not Allowed' }, STATUS: 405 },
    { TEST_NAME: "With Null Input Block Id", CASE_TYPE: "NEGATIVE", INPUT_BLOCK_ID: null, EXPECTED: { detail: [{ type: 'int_parsing', loc: ['path', 'inputblock_id'], msg: 'Input should be a valid integer, unable to parse string as an integer', input: 'null' }] }, STATUS: 422 },
    { TEST_NAME: "With No Value Input Block Id", CASE_TYPE: "NEGATIVE", EXPECTED: { detail: [{ type: 'int_parsing', loc: ['path', 'inputblock_id'], msg: 'Input should be a valid integer, unable to parse string as an integer', input: 'undefined' }] }, STATUS: 422 },
]

test.describe('Input Block', () => {

    for (const data of GET_INPUT_BLOCK) {
        test.skip(`Get All Input Blocks ${data.TEST_NAME}`, async () => {
            const response = await axios.get(url + ":" + port_number + "/input_block_data", {
                validateStatus: function (status) {
                    return status
                }
            })

            /* Assert Get Input Block ID */
            // Add Assertion for Get Input Block Data
            expect.soft(response.status).toBe(data.STATUS)
        })
    }

    for (const data of CREATE_INPUT_BLOCK) {
        test.skip(`Create Input Block ${data.TEST_NAME}`, async () => {

            let response

            const INPUT_BLOCK_DATA = data.INPUT_BLOCK_DATA

            if (data.CASE_TYPE == "POSITIVE") {

                /* Create Input Block */
                response = await axios.post(url + ":" + port_number + "/input_block_data", INPUT_BLOCK_DATA, {
                    validateStatus: function (status) {
                        return status
                    }
                })

                /* Set Input Block ID */
                const input_block_id = response.data.id

                /* Get Input Block By Input Block ID */
                response = await axios.get(url + ":" + port_number + "/input_block_data/" + input_block_id, {
                    validateStatus: function (status) {
                        return status
                    }
                })

                /* Assert Create Input Block */
                expect.soft(response.data).toMatchObject(data.EXPECTED)
                expect.soft(response.data.id).toBeTruthy()
                expect.soft(response.data.created_at).toBeTruthy()
                expect.soft(response.data.updated_at).toBeTruthy()
                expect.soft(response.status).toBe(data.STATUS)

            }

            if (data.CASE_TYPE == "NEGATIVE") {

                /* Create Input Block */
                response = await axios.post(url + ":" + port_number + "/input_block_data", INPUT_BLOCK_DATA, {
                    validateStatus: function (status) {
                        return status
                    }
                })

                /* Assert Create Input Block */
                expect.soft(response.data).toMatchObject(data.EXPECTED)
                expect.soft(response.status).toBe(data.STATUS)

            }
        })
    }

    for (const data of GET_INPUT_BLOCK_DATA_BY_INPUT_BLOCK_ID) {
        test.skip(`Get Input Block Data By Input Block ID ${data.TEST_NAME}`, async () => {

            let response

            if (data.CASE_TYPE == "POSITIVE") {

                const INPUT_BLOCK_DATA = data.INPUT_BLOCK_DATA

                /* Create Input Block */
                response = await axios.post(url + ":" + port_number + "/input_block_data", INPUT_BLOCK_DATA, {
                    validateStatus: function (status) {
                        return status
                    }
                })

                /* Set Input Block ID */
                const input_block_id = response.data.id

                /* Get Input Block Data By Input Block ID */
                response = await axios.get(url + ":" + port_number + "/input_block_data/" + input_block_id, {
                    validateStatus: function (status) {
                        return status
                    }
                })

                /* Assert Get Input Block Data By Input Block ID */
                expect.soft(response.data).toMatchObject(data.EXPECTED)
                expect.soft(response.data.id).toBeTruthy()
                expect.soft(response.data.created_at).toBeTruthy()
                expect.soft(response.data.updated_at).toBeTruthy()
                expect.soft(response.status).toBe(data.STATUS)

            }

            if (data.CASE_TYPE == "NEGATIVE") {

                /* Set Input Block ID */
                const input_block_id = data.INPUT_BLOCK_ID

                /* Get Input Block Data By Input Block ID */
                response = await axios.get(url + ":" + port_number + "/input_block_data/" + input_block_id, {
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

    for (const data of UPDATE_INPUT_BLOCK_DATA_BY_INPUT_BLOCK_ID) {
        test.skip(`Update Input Block Data By Input Block ID ${data.TEST_NAME}`, async () => {

            let response

            const INPUT_BLOCK_DATA = data.INPUT_BLOCK_DATA
            const UPDATE_INPUT_BLOCK_DATA = data.UPDATE_INPUT_BLOCK_DATA

            if (data.CASE_TYPE == "POSITIVE") {

                /* Create Input Block */
                response = await axios.post(url + ":" + port_number + "/input_block_data", INPUT_BLOCK_DATA, {
                    validateStatus: function (status) {
                        return status
                    }
                })

                /* Set Input Block ID */
                const input_block_id = response.data.id

                /* Update Input Block Data By Input Block ID */
                response = await axios.put(url + ":" + port_number + "/input_block_data/" + input_block_id, UPDATE_INPUT_BLOCK_DATA, {
                    validateStatus: function (status) {
                        return status
                    }
                })

                /* Assert Update Input Block Data By Input Block ID */
                expect.soft(response.data).toMatchObject(data.EXPECTED)
                expect.soft(response.data.id).toBeTruthy()
                expect.soft(response.data.created_at).toBeTruthy()
                expect.soft(response.data.updated_at).toBeTruthy()
                expect.soft(response.status).toBe(data.STATUS)

            }

            if (data.CASE_TYPE == "NEGATIVE") {

                /* Set Input Block ID */
                const input_block_id = data.INPUT_BLOCK_ID

                /* Update Input Block Data By Input Block ID */
                response = await axios.put(url + ":" + port_number + "/input_block_data/" + input_block_id, UPDATE_INPUT_BLOCK_DATA, {
                    validateStatus: function (status) {
                        return status
                    }
                })

                /* Assert Update Input Block Data By Input Block ID */
                expect.soft(response.data).toMatchObject(data.EXPECTED)
                expect.soft(response.status).toBe(data.STATUS)

            }
        })
    }

    for (const data of DELETE_INPUT_BLOCK_DATA_BY_INPUT_BLOCK_ID) {

        test.skip(`Delete Input Block Data By Input Block ID ${data.TEST_NAME}`, async () => {

            let response

            if (data.CASE_TYPE == "POSITIVE") {

                const INPUT_BLOCK_DATA = data.INPUT_BLOCK_DATA

                response = await axios.post(url + ":" + port_number + "/input_block_data", INPUT_BLOCK_DATA, {
                    validateStatus: function (status) {
                        return status
                    }
                })

                /* Set Input Block ID */
                const input_block_id = response.data.id

                /* Delete Input Block Data By Input Block ID */
                response = await axios.delete(url + ":" + port_number + "/input_block_data/" + input_block_id, {
                    validateStatus: function (status) {
                        return status
                    }
                })

                /* Assert Delete Input Block Data By Input Block ID */
                expect.soft(response.data).toBe(input_block_id)
                expect.soft(response.status).toBe(data.STATUS)

            }

            if (data.CASE_TYPE == "NEGATIVE") {

                /* Set Input Block ID */
                const input_block_id = data.INPUT_BLOCK_ID

                /* Delete Input Block Data By Input Block ID */
                response = await axios.delete(url + ":" + port_number + "/input_block_data/" + input_block_id, {
                    validateStatus: function (status) {
                        return status
                    }
                })

                /* Assert Delete Input Block Data By Input Block ID */
                expect.soft(response.data).toMatchObject(data.EXPECTED)
                expect.soft(response.status).toBe(data.STATUS)

            }
        })
    }
})