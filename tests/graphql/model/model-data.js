export const MODELS = `query ModelFiles {
    modelFiles {
      id
      filename
      name
      filePath
      subFolder
      ctime
      description
      status
      size
      modelType
      serializer
      modelFormat
      errorMessages
      type
    }
  }`

export const DELETE_MODEL = `mutation Mutation($deleteModelFileId: ObjectID!) {
    deleteModelFile(id: $deleteModelFileId)
  }`