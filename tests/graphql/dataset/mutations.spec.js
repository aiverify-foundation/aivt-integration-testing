import { test, expect } from '@playwright/test'
import { MongoClient, ObjectId } from 'mongodb'
import * as dataset_data from './dataset-data.js'

import axios from 'axios'
import fs from 'fs'
import FormData from 'form-data'
import { setTimeout } from "timers/promises"

const uri =
    "mongodb://mongodb:mongodb@127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.6.1";
const mongoClient = new MongoClient(uri)
const database = mongoClient.db('aiverify')
const datasets = database.collection('datasetmodels')

const ENDPOINT = "http://localhost:4000/graphql"
const API_ENDPOINT = "http://localhost:3000"

test.describe('Update Datasets', () => {

    let datasetID

    test.beforeAll(async () => {

        const form_data = new FormData()
        form_data.append('myFiles', fs.createReadStream('/home/benflop/GitLab/front-end-testing/fixtures/pickle_pandas_tabular_loan_testing.sav'));

        await axios.post(API_ENDPOINT + '/api/upload/data', form_data, {
            headers: {
                ...form_data.getHeaders()
            },
            data: form_data,
        })

        await setTimeout(5000);

    })

})

test.describe('Delete Datasets', () => {

    let datasetID

    test.beforeAll(async () => {

        const form_data = new FormData()
        form_data.append('myFiles', fs.createReadStream('/home/benflop/GitLab/front-end-testing/fixtures/pickle_pandas_tabular_loan_testing.sav'));

        await axios.post(API_ENDPOINT + '/api/upload/data', form_data, {
            headers: {
                ...form_data.getHeaders()
            },
            data: form_data,
        })

    })

    test.skip('Delete Dataset With Valid Dataset ID', async () => {

        await axios.post(ENDPOINT, {
            query: dataset_data.DELETE_DATASET,
            variables: {
                "deleteDatasetId": datasetID
            }
        })

        // Get Dataset directly from MongoDB
        const query = { _id: ObjectId(datasetID) }
        const datasetObj = await datasets.findOne(query)

        expect(datasetObj).toBeNull()

    })

    test('Delete Dataset with Invalid Dataset ID', async () => {

        // Null Dataset ID
        let response = await axios.post(ENDPOINT, {
            query: dataset_data.DELETE_DATASET,
            variables: {
                "deleteDatasetId": null
            }
        })

        let errorMessage = response.data.errors
        expect(errorMessage).toBe('Variable "$deleteDatasetId" of required type "ObjectID!" was not provided.') // FIXME Verbose Error Message

        // Non-Existing Dataset ID
        response = await axios.post(ENDPOINT, {
            query: dataset_data.DELETE_DATASET,
            variables: {
                "deleteDatasetId": datasetID
            }
        })

        errorMessage = response.data.errors
        expect(errorMessage).toBe('Variable "$deleteDatasetId" of required type "ObjectID!" was not provided.')

    })

    test.skip('Delete Dataset with Empty Dataset ID', async () => {

        const response = await axios.post(ENDPOINT, {
            query: dataset_data.DELETE_DATASET,
            variables: {
                "deleteDatasetId": ""
            }
        })

        const errorMessage = response.data.errors
        expect(errorMessage).toBe('Variable "$deleteDatasetId" got invalid value ""; Value is not a valid mongodb object id of form: ')

    })

})