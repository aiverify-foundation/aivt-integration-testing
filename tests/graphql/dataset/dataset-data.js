export const DATASETS = `query Datasets {
    datasets {
      id
      filename
      name
      filePath
      subFolder
      type
      ctime
      dataColumns {
        id
        name
        datatype
        label
        sensitive
      }
      numRows
      numCols
      description
      status
      size
      serializer
      dataFormat
      errorMessages
    }
  }`

export const DELETE_DATASET = `mutation Mutation($deleteDatasetId: ObjectID!) {
    deleteDataset(id: $deleteDatasetId)
  }`