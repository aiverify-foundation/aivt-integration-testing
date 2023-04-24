import { test, expect } from '@playwright/test'
import { MongoClient, ObjectId } from 'mongodb'
import * as model_data from './model-data.js'

import axios from 'axios'
import fs from 'fs'
import FormData from 'form-data'
import {setTimeout} from "timers/promises"

const ENDPOINT = "http://localhost:4000/graphql"
const API_ENDPOINT = "http://localhost:3000"

const uri =
    "mongodb://mongodb:mongodb@127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.6.1";
const mongoClient = new MongoClient(uri)
const database = mongoClient.db('aiverify')
const models = database.collection('modelfilemodels')

test.describe('Delete Datasets', () => {

    let modelID

    test.beforeAll(async () => {

        const form_data = new FormData()
        form_data.append('myModelFiles', fs.createReadStream('/home/benflop/GitLab/front-end-testing/fixtures/pickle_scikit_multiclasslr_loan.sav'));

        await axios.post(API_ENDPOINT + '/api/upload/model', form_data, {
            headers: {
                ...form_data.getHeaders()
            },
            data: form_data,
        })

        await setTimeout(5000)

    })

    test('Delete Model With Valid Model ID', async () => {

        await axios.post(ENDPOINT, {
            query: model_data.DELETE_MODEL,
            variables: {
                "deleteModelFileId": modelID
            }
        })

        // Get Dataset directly from MongoDB
        const query = { _id: ObjectId(modelID) }
        const modelObj = await models.findOne(query)

        expect(modelObj).toBeNull()

    })

    test.skip('Delete Model with Invalid Model ID', async () => {

        // Null Model ID
        let response = await axios.post(ENDPOINT, {
            query: model_data.DELETE_MODEL,
            variables: {
                "deleteModelFileId": null
            }
        })

        let errorMessage = response.data.errors
        expect(errorMessage).toBe('Variable "$deleteDatasetId" of required type "ObjectID!" was not provided.') // FIXME Verbose Error Message

        // Non-Existing Dataset ID
        response = await axios.post(ENDPOINT, {
            query: model_data.DELETE_MODEL,
            variables: {
                "deleteModelFileId": modelID
            }
        })

        errorMessage = response.data.errors
        expect(errorMessage).toBe('Variable "$deleteDatasetId" of required type "ObjectID!" was not provided.')

    })

    test.skip('Delete Dataset with Empty Dataset ID', async () => {

        const response = await axios.post(ENDPOINT, {
            query: model_data.DELETE_MODEL,
            variables: {
                "deleteModelFileId": ""
            }
        })

        const errorMessage = response.data.errors
        expect(errorMessage).toBe('Variable "$deleteModelFieldId" got invalid value ""; Value is not a valid mongodb object id of form: ') // FIXME Verbose Error Message

    })

})