import { test, expect } from '@playwright/test'
import { MongoClient, ObjectId } from 'mongodb'
import * as project_data from './project-data.js'

import axios from 'axios';

const ENDPOINT = "http://localhost:4000/graphql"

const uri =
  "mongodb://mongodb:mongodb@127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.6.1";
const mongoClient = new MongoClient(uri)
const database = mongoClient.db('aiverify')
const projects = database.collection('projecttemplatemodels')
const reports = database.collection('reportmodels')

test.describe('Get Projects', () => {

  let projectId, project

  test.beforeAll(async () => {

    const response = await axios.post(ENDPOINT, {
      query: project_data.CREATE_PROJECT,
      variables: project_data.PROJECT_VARIABLES
    })

    project = response.data.data.createProject
    projectId = project.id

  })

  test('Get Projects', async () => {

    // Get Response
    const response = await axios.post(ENDPOINT, {
      query: project_data.GET_PROJECTS
    })

    const output = response.data.data.projects

    // Get Project Info directly from MongoDB
    const projectInfoObj = await projects.find({}).sort({ _id: 1 }).limit(2).toArray();

    // Assert Response
    expect(output[0].projectInfo.name).toBe(projectInfoObj[0].projectInfo.name)
    expect(output[0].projectInfo.description).toBe(projectInfoObj[0].projectInfo.description)
    expect(output[0].projectInfo.reportTitle).toBe(projectInfoObj[0].projectInfo.reportTitle)
    expect(output[0].projectInfo.company).toBe(projectInfoObj[0].projectInfo.company)

    expect(output[1].projectInfo.name).toBe(projectInfoObj[1].projectInfo.name)
    expect(output[1].projectInfo.description).toBe(projectInfoObj[1].projectInfo.description)
    expect(output[1].projectInfo.reportTitle).toBe(projectInfoObj[1].projectInfo.reportTitle)
    expect(output[1].projectInfo.company).toBe(projectInfoObj[1].projectInfo.company)
  })

  test('Get Project By Project ID', async () => {

    // Get Response
    const response = await axios.post(ENDPOINT, {
      query: project_data.GET_PROJECT_BY_ID,
      variables: {
        "projectId": projectId
      }
    })

    const projectInfo = response.data.data.project

    // Get Project Info directly from MongoDB
    const query = { _id: ObjectId(projectId) }
    const projectInfoObj = await projects.findOne(query)

    // Assert Response
    expect(projectInfo.projectInfo.name).toBe(projectInfoObj.projectInfo.name)
    expect(projectInfo.projectInfo.description).toBe(projectInfoObj.projectInfo.description)
    expect(projectInfo.projectInfo.reportTitle).toBe(projectInfoObj.projectInfo.reportTitle)
    expect(projectInfo.projectInfo.company).toBe(projectInfoObj.projectInfo.company)

  })

  test('Get Project By Invalid Project ID', async () => {

    // Get Response
    const response = await axios.post(ENDPOINT, {
      query: project_data.GET_PROJECT_BY_ID,
      variables: {
        "projectId": "63b53adfc05b0b2df748f43"
      }
    })

    const errorMessage = response.data.errors

    // Assert Response
    expect(errorMessage[0].message).toBe('Variable "$projectId" got invalid value "63b53adfc05b0b2df748f43"; Value is not a valid mongodb object id of form: 63b53adfc05b0b2df748f43')
  })

  test('Get Project By Empty Project ID', async () => {

    // Get Response
    const response = await axios.post(ENDPOINT, {
      query: project_data.GET_PROJECT_BY_ID,
      variables: {
        "projectId": ""
      }
    })

    const errorMessage = response.data.errors

    // Assert Response
    expect(errorMessage[0].message).toBe('Variable "$projectId" got invalid value ""; Value is not a valid mongodb object id of form: ')

  })

})

test.describe('Get Reports', () => {

  let project, projectId

  test.beforeAll(async () => {

    let response = await axios.post(ENDPOINT, {
      query: project_data.CREATE_PROJECT,
      variables: project_data.PROJECT_VARIABLES
    })

    project = response.data.data.createProject
    projectId = project.id

    response = await axios.post(ENDPOINT, {
      query: project_data.GENERATE_REPORT_TO_GENERATE_REPORT_STATUS,
      variables: {
        "projectId": projectId,
        "algorithms": "aiverify.stock.algorithms.fairness_metrics_toolbox:fairness_metrics_toolbox",
        "modelAndDatasets": {
          "modelFileName": '/home/benflop/uploads/model/pickle_scikit_multiclasslr_loan.sav',
          "testDatasetFileName": '/home/benflop/uploads/data/pickle_pandas_tabular_loan_testing.sav',
          "groundTruthDatasetFileName": "/home/benflop/uploads/data/pickle_pandas_tabular_loan_testing.sav",
          "modelType": 'Classification',
          "groundTruthColumn": 'Interest_Rate'
        }
      }
    })
  })

  test('Get Report By Project ID', async () => {

    // Get Response
    const response = await axios.post(ENDPOINT, {
      query: project_data.GET_REPORT_BY_PROJECT_ID,
      variables: {
        "projectId": projectId
      }
    })

    const reportInfo = response.data.data.report

    // Get Report directly from MongoDB
    const query = { _id: ObjectId(projectId) }
    const reportId = (await projects.findOne(query)).report

    const query2 = { _id: ObjectId(reportId) }
    const reportInfoObj = (await reports.findOne(query2))

    // Assert Response
    expect(reportInfo.projectId).toBe(reportInfo._id)
    expect(reportInfo.status).toBe(reportInfoObj.status)
    expect(Date(reportInfo.timeStart)).toBe(Date(reportInfoObj.timeStart))
    expect(reportInfo.timeTaken).toBe(reportInfoObj.timeTaken)
    expect(reportInfo.totalTimeTaken).toBe(reportInfoObj.totalTimeTaken)
    expect(reportInfo.inputBlockData).toEqual(reportInfoObj.inputBlockData)

  })

  test('Get Report By Invalid Project ID', async () => {

    const projectId = "63b518f4c05b0b2df748f418"

    // Get Response
    const response = await axios.post(ENDPOINT, {
      query: project_data.GET_REPORT_BY_PROJECT_ID,
      variables: {
        "projectId": projectId
      }
    })

    const errorMessage = response.data.errors

    // Get Report Info directly from MongoDB
    const query = { _id: ObjectId(projectId) }
    const reportInfoObj = await projects.findOne(query)

    // Assert Response
    expect(errorMessage[0].message).toBe('Unexpected error value: "Invalid project ID"')
    expect(reportInfoObj).toBeNull
  })

  test('Get Report By Empty Project ID', async () => {

    // Get Response
    const response = await axios.post(ENDPOINT, {
      query: project_data.GET_REPORT_BY_PROJECT_ID,
      variables: {
        "projectId": ""
      }
    })

    const errorMessage = response.data.errors

    // Assert Response
    expect(errorMessage[0].message).toBe('Variable "$projectId" got invalid value ""; Value is not a valid mongodb object id of form: ')
  })

  test('Get Non-Generated Report with Valid Project ID', async () => {

    const projectId = "640ed93df41596fba88f013b"

    // Get Response
    const response = await axios.post(ENDPOINT, {
      query: project_data.GET_REPORT_BY_PROJECT_ID,
      variables: {
        "projectId": projectId
      }
    })

    const report = response.data.data.report

    // Get Report directly from MongoDB
    const query = { _id: ObjectId(projectId) }
    const reportId = (await projects.findOne(query)).report

    const query2 = { _id: ObjectId(reportId) }
    const reportInfoObj = (await reports.findOne(query2))

    expect(report).toBeNull
    expect(reportInfoObj).toBeNull

  })

})