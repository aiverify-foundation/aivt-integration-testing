export const GET_PROJECTS = `query Query {
    projects {
      projectInfo {
        company
        description
        name
        reportTitle
      }
    }
  }`

export const GET_PROJECT_BY_ID = `query Query($projectId: ObjectID!) {
    project(id: $projectId) {
      projectInfo {
        name
        description
        company
        reportTitle
      }
    }
  }`

export const GET_REPORT_BY_PROJECT_ID = `query Query($projectId: ObjectID!) {
    report(projectID: $projectId) {
      projectID
      status
      timeStart
      timeTaken
      totalTestTimeTaken
      inputBlockData
    }
  }`

export const CREATE_PROJECT = `mutation CreateProject($project: ProjectInput!) {
  createProject(project: $project) {
    id
    projectInfo {
      name
      description
      reportTitle
      company
    }
    globalVars {
      key
      value
    }
    pages {
      layouts
      reportWidgets {
        widgetGID
        key
        layoutItemProperties {
          justifyContent
          alignItems
          color
          bgcolor
        }
        properties
      }
    }
    createdAt
    updatedAt
  }
}`

export const CREATE_PROJECT_FROM_TEMPLATE = `mutation CreateProjectFromTemplate($project: ProjectInput!, $templateId: String!) {
  createProjectFromTemplate(project: $project, templateId: $templateId) {
    id
    template {
      id
      fromPlugin
      projectInfo {
        name
        description
        reportTitle
        company
      }
      globalVars {
        key
        value
      }
      pages {
        layouts
        reportWidgets {
          widgetGID
          key
          layoutItemProperties {
            justifyContent
            alignItems
            color
            bgcolor
          }
          properties
        }
      }
      createdAt
      updatedAt
    }
    projectInfo {
      name
      description
      reportTitle
      company
    }
    globalVars {
      key
      value
    }
    pages {
      layouts
      reportWidgets {
        widgetGID
        key
        layoutItemProperties {
          justifyContent
          alignItems
          color
          bgcolor
        }
        properties
      }
    }
    inputBlockData
    testInformationData {
      algorithmGID
      testArguments
    }
    report {
      projectID
      status
      timeStart
      timeTaken
      totalTestTimeTaken
      inputBlockData
    }
    createdAt
    updatedAt
    modelAndDatasets {
      model {
        id
        filename
        name
        filePath
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
      testDataset {
        id
        filename
        name
        filePath
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
      groundTruthDataset {
        id
        filename
        name
        filePath
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
      groundTruthColumn
    }
  }
}`

export const UPDATE_PROJECT = `mutation Mutation($updateProjectId: ObjectID!, $project: ProjectInput!) {
    updateProject(id: $updateProjectId, project: $project) {
      projectInfo {
        name
        description
        company
        reportTitle
      }
    }
  }`

export const DELETE_PROJECT = `mutation DeleteProject($deleteProjectId: ObjectID!) {
    deleteProject(id: $deleteProjectId)
  }`

export const CLONE_PROJECT = `mutation Mutation($cloneProjectId: ObjectID!) {
    cloneProject(id: $cloneProjectId) {
      projectInfo {
        name
        description
        reportTitle
        company
      }
    }
  }`

export const GENERATE_REPORT = `mutation Mutation($projectId: ObjectID!, $algorithms: [String]!) {
    generateReport(projectID: $projectId, algorithms: $algorithms) {
      projectSnapshot {
        report {
          projectID
          status
          timeStart
          timeTaken
          totalTestTimeTaken
          inputBlockData
        }
      }
    }
  }`

export const GENERATE_REPORT_TO_GENERATE_REPORT_STATUS = `mutation GenerateReport($projectId: ObjectID!, $algorithms: [String]!, $modelAndDatasets: ModelAndDatasetsReportInput) {
  generateReport(projectID: $projectId, algorithms: $algorithms, modelAndDatasets: $modelAndDatasets) {
    projectID
    status
  }
}`

export const CREATE_PROJECT_TEMPLATE = `mutation CreateProjectTemplate($projectTemplate: ProjectTemplateInput!) {
  createProjectTemplate(projectTemplate: $projectTemplate) {
    id
    projectInfo {
      name
      description
      reportTitle
      company
    }
    globalVars {
      key
      value
    }
    pages {
      layouts
      reportWidgets {
        widgetGID
        key
        layoutItemProperties {
          justifyContent
          alignItems
          color
          bgcolor
        }
        properties
      }
    }
    createdAt
    updatedAt
  }
}`

export const CANCEL_TEST_RUNS = `mutation Mutation($projectId: ObjectID!, $algorithms: [String]!) {
    cancelTestRuns(projectID: $projectId, algorithms: $algorithms) {
      projectID
      status
      timeStart
      timeTaken
      totalTestTimeTaken
      inputBlockData
    }
  }`

export const SAVE_PROJECT_AS_TEMPLATE = `mutation Mutation($projectId: ObjectID!, $templateInfo: ProjectInformationInput!) {
    saveProjectAsTemplate(projectId: $projectId, templateInfo: $templateInfo) {
      id
      fromPlugin
      projectInfo {
        name
        description
        reportTitle
        company
      }
      globalVars {
        key
        value
      }
      pages {
        layouts
        reportWidgets {
          widgetGID
          key
          layoutItemProperties {
            justifyContent
            alignItems
            color
            bgcolor
          }
          properties
        }
      }
      createdAt
      updatedAt
    }
  }`

export const PROJECT_VARIABLES = {
  "project": {
    "projectInfo": {
      "name": "Project 301",
      "company": "Project 301",
      "description": "Project 301",
      "reportTitle": "Project 301"
    },
    "globalVars": [
      {
        "key": "20",
        "value": "30"
      },
      {
        "key": "30",
        "value": "30"
      }
    ],
    "inputBlockData": {
      "aiverify.stock.fairness-metrics-toolbox-widgets:fairness-tree": {}
    },
    "testInformationData": [
      {
        "algorithmGID": "aiverify.stock.algorithms.fairness_metrics_toolbox:fairness_metrics_toolbox",
        "testArguments": {
          "sensitive_feature": [
            "Gender",
            "Home_Owner"
          ]
        },
      }
    ],
    "pages": [
      {
        "layouts": [
          {
            "w": 12,
            "h": 12,
            "x": 0,
            "y": 0,
            "i": "1678694721822",
            "minW": 12,
            "maxW": 12,
            "minH": 12,
            "maxH": 36,
            "moved": false,
            "static": false
          },
          {
            "w": 12,
            "h": 1,
            "x": 0,
            "y": 35,
            "i": "_youcantseeme",
            "moved": false,
            "static": false
          }
        ],
        "reportWidgets": [
          {
            "widgetGID": "aiverify.stock.fairness-metrics-toolbox-widgets:false-discovery-rate-chart",
            "key": "1678694721822",
            "layoutItemProperties": {
              "justifyContent": "left",
              "alignItems": "top",
              "color": null,
              "bgcolor": null,
            },
            "properties": null,
          }
        ]
      }
    ],
    "modelAndDatasets": {
      "model": {
        "id": "640ed49cf41596fba88efb56",
        "name": "pickle_scikit_multiclasslr_loan_1.sav",
        "filename": "pickle_scikit_multiclasslr_loan_1.sav",
        "filePath": "/home/benflop/uploads/model/pickle_scikit_multiclasslr_loan_1.sav",
        "ctime": "2023-03-13T07:45:32.325Z",
        "size": "1.13 KB",
        "status": "Valid",
        "description": "",
        "serializer": "pickle",
        "modelFormat": "sklearn",
        "modelType": "Classification",
        "errorMessages": "",
      },
      "testDataset": {
        "id": "640ed48cf41596fba88efab6",
        "name": "pickle_pandas_tabular_loan_testing_1.sav",
        "filename": "pickle_pandas_tabular_loan_testing_1.sav",
        "filePath": "/home/benflop/uploads/data/pickle_pandas_tabular_loan_testing_1.sav",
        "ctime": "2023-03-13T07:45:16.545Z",
        "size": "5.79 MB",
        "status": "Valid",
        "description": "",
        "dataColumns": [
          {
            "id": "640ed48c5c293a52f7c1e908",
            "name": "Loan_Amount_Requested",
            "datatype": "int64",
            "label": "Loan_Amount_Requested"
          },
          {
            "id": "640ed48c5c293a52f7c1e909",
            "name": "Length_Employed",
            "datatype": "int64",
            "label": "Length_Employed"
          },
          {
            "id": "640ed48c5c293a52f7c1e90a",
            "name": "Home_Owner",
            "datatype": "int64",
            "label": "Home_Owner"
          },
          {
            "id": "640ed48c5c293a52f7c1e90b",
            "name": "Annual_Income",
            "datatype": "float64",
            "label": "Annual_Income"
          },
          {
            "id": "640ed48c5c293a52f7c1e90c",
            "name": "Income_Verified",
            "datatype": "int64",
            "label": "Income_Verified"
          },
          {
            "id": "640ed48c5c293a52f7c1e90d",
            "name": "Purpose_Of_Loan",
            "datatype": "int64",
            "label": "Purpose_Of_Loan"
          },
          {
            "id": "640ed48c5c293a52f7c1e90e",
            "name": "Debt_To_Income",
            "datatype": "float64",
            "label": "Debt_To_Income"
          },
          {
            "id": "640ed48c5c293a52f7c1e90f",
            "name": "Inquiries_Last_6Mo",
            "datatype": "int64",
            "label": "Inquiries_Last_6Mo"
          },
          {
            "id": "640ed48c5c293a52f7c1e910",
            "name": "Months_Since_Deliquency",
            "datatype": "float64",
            "label": "Months_Since_Deliquency"
          },
          {
            "id": "640ed48c5c293a52f7c1e911",
            "name": "Number_Open_Accounts",
            "datatype": "int64",
            "label": "Number_Open_Accounts"
          },
          {
            "id": "640ed48c5c293a52f7c1e912",
            "name": "Total_Accounts",
            "datatype": "int64",
            "label": "Total_Accounts"
          },
          {
            "id": "640ed48c5c293a52f7c1e913",
            "name": "Gender",
            "datatype": "int64",
            "label": "Gender"
          },
          {
            "id": "640ed48c5c293a52f7c1e914",
            "name": "Interest_Rate",
            "datatype": "int64",
            "label": "Interest_Rate"
          }
        ],
        "serializer": "pickle",
        "dataFormat": "pandas",
        "errorMessages": ""
      },
      "groundTruthDataset": {
        "id": "640ed48cf41596fba88efab6",
        "name": "pickle_pandas_tabular_loan_testing_1.sav",
        "filename": "pickle_pandas_tabular_loan_testing_1.sav",
        "filePath": "/home/benflop/uploads/data/pickle_pandas_tabular_loan_testing_1.sav",
        "ctime": "2023-03-13T07:45:16.545Z",
        "size": "5.79 MB",
        "status": "Valid",
        "description": "",
        "dataColumns": [
          {
            "id": "640ed48c5c293a52f7c1e908",
            "name": "Loan_Amount_Requested",
            "datatype": "int64",
            "label": "Loan_Amount_Requested"
          },
          {
            "id": "640ed48c5c293a52f7c1e909",
            "name": "Length_Employed",
            "datatype": "int64",
            "label": "Length_Employed"
          },
          {
            "id": "640ed48c5c293a52f7c1e90a",
            "name": "Home_Owner",
            "datatype": "int64",
            "label": "Home_Owner"
          },
          {
            "id": "640ed48c5c293a52f7c1e90b",
            "name": "Annual_Income",
            "datatype": "float64",
            "label": "Annual_Income"
          },
          {
            "id": "640ed48c5c293a52f7c1e90c",
            "name": "Income_Verified",
            "datatype": "int64",
            "label": "Income_Verified"
          },
          {
            "id": "640ed48c5c293a52f7c1e90d",
            "name": "Purpose_Of_Loan",
            "datatype": "int64",
            "label": "Purpose_Of_Loan"
          },
          {
            "id": "640ed48c5c293a52f7c1e90e",
            "name": "Debt_To_Income",
            "datatype": "float64",
            "label": "Debt_To_Income"
          },
          {
            "id": "640ed48c5c293a52f7c1e90f",
            "name": "Inquiries_Last_6Mo",
            "datatype": "int64",
            "label": "Inquiries_Last_6Mo"
          },
          {
            "id": "640ed48c5c293a52f7c1e910",
            "name": "Months_Since_Deliquency",
            "datatype": "float64",
            "label": "Months_Since_Deliquency"
          },
          {
            "id": "640ed48c5c293a52f7c1e911",
            "name": "Number_Open_Accounts",
            "datatype": "int64",
            "label": "Number_Open_Accounts"
          },
          {
            "id": "640ed48c5c293a52f7c1e912",
            "name": "Total_Accounts",
            "datatype": "int64",
            "label": "Total_Accounts"
          },
          {
            "id": "640ed48c5c293a52f7c1e913",
            "name": "Gender",
            "datatype": "int64",
            "label": "Gender"
          },
          {
            "id": "640ed48c5c293a52f7c1e914",
            "name": "Interest_Rate",
            "datatype": "int64",
            "label": "Interest_Rate"
          }
        ],
        "serializer": "pickle",
        "dataFormat": "pandas",
        "errorMessages": ""
      },
      "groundTruthColumn": "Interest_Rate",
    },
  }
}

export const PROJECT_BY_TEMPLATE_VARIABLES = {
  "project": {
    "projectInfo": {
      "name": "Project 301",
      "company": "Project 301",
      "description": "Project 301",
      "reportTitle": "Project 301"
    },
    "globalVars": [
      {
        "key": "20",
        "value": "30"
      },
      {
        "key": "30",
        "value": "30"
      }
    ],
    "inputBlockData": {
      "aiverify.stock.fairness-metrics-toolbox-widgets:fairness-tree": {}
    },
    "testInformationData": [
      {
        "algorithmGID": "aiverify.stock.algorithms.fairness_metrics_toolbox:fairness_metrics_toolbox",
        "isTestArgumentsValid": true,
        "testArguments": {
          "sensitive_feature": [
            "Gender",
            "Home_Owner"
          ]
        },
      }
    ],
    "pages": [
      {
        "layouts": [
          {
            "w": 12,
            "h": 12,
            "x": 0,
            "y": 0,
            "i": "1678694721822",
            "minW": 12,
            "maxW": 12,
            "minH": 12,
            "maxH": 36,
            "moved": false,
            "static": false
          },
          {
            "w": 12,
            "h": 1,
            "x": 0,
            "y": 35,
            "i": "_youcantseeme",
            "moved": false,
            "static": false
          }
        ],
        "reportWidgets": [
          {
            "widgetGID": "aiverify.stock.fairness-metrics-toolbox-widgets:false-discovery-rate-chart",
            "key": "1678694721822",
            "layoutItemProperties": {
              "justifyContent": "left",
              "alignItems": "top",
              "color": null,
              "bgcolor": null,
            },
            "properties": null,
          }
        ]
      }
    ],
    "modelAndDatasets": {
      "model": {
        "id": "640ed49cf41596fba88efb56",
        "name": "pickle_scikit_multiclasslr_loan_1.sav",
        "filename": "pickle_scikit_multiclasslr_loan_1.sav",
        "filePath": "/home/benflop/uploads/model/pickle_scikit_multiclasslr_loan_1.sav",
        "ctime": "2023-03-13T07:45:32.325Z",
        "size": "1.13 KB",
        "status": "Valid",
        "description": "",
        "serializer": "pickle",
        "modelFormat": "sklearn",
        "modelType": "Classification",
        "errorMessages": "",
      },
      "testDataset": {
        "id": "640ed48cf41596fba88efab6",
        "name": "pickle_pandas_tabular_loan_testing_1.sav",
        "filename": "pickle_pandas_tabular_loan_testing_1.sav",
        "filePath": "/home/benflop/uploads/data/pickle_pandas_tabular_loan_testing_1.sav",
        "ctime": "2023-03-13T07:45:16.545Z",
        "size": "5.79 MB",
        "status": "Valid",
        "description": "",
        "dataColumns": [
          {
            "id": "640ed48c5c293a52f7c1e908",
            "name": "Loan_Amount_Requested",
            "datatype": "int64",
            "label": "Loan_Amount_Requested"
          },
          {
            "id": "640ed48c5c293a52f7c1e909",
            "name": "Length_Employed",
            "datatype": "int64",
            "label": "Length_Employed"
          },
          {
            "id": "640ed48c5c293a52f7c1e90a",
            "name": "Home_Owner",
            "datatype": "int64",
            "label": "Home_Owner"
          },
          {
            "id": "640ed48c5c293a52f7c1e90b",
            "name": "Annual_Income",
            "datatype": "float64",
            "label": "Annual_Income"
          },
          {
            "id": "640ed48c5c293a52f7c1e90c",
            "name": "Income_Verified",
            "datatype": "int64",
            "label": "Income_Verified"
          },
          {
            "id": "640ed48c5c293a52f7c1e90d",
            "name": "Purpose_Of_Loan",
            "datatype": "int64",
            "label": "Purpose_Of_Loan"
          },
          {
            "id": "640ed48c5c293a52f7c1e90e",
            "name": "Debt_To_Income",
            "datatype": "float64",
            "label": "Debt_To_Income"
          },
          {
            "id": "640ed48c5c293a52f7c1e90f",
            "name": "Inquiries_Last_6Mo",
            "datatype": "int64",
            "label": "Inquiries_Last_6Mo"
          },
          {
            "id": "640ed48c5c293a52f7c1e910",
            "name": "Months_Since_Deliquency",
            "datatype": "float64",
            "label": "Months_Since_Deliquency"
          },
          {
            "id": "640ed48c5c293a52f7c1e911",
            "name": "Number_Open_Accounts",
            "datatype": "int64",
            "label": "Number_Open_Accounts"
          },
          {
            "id": "640ed48c5c293a52f7c1e912",
            "name": "Total_Accounts",
            "datatype": "int64",
            "label": "Total_Accounts"
          },
          {
            "id": "640ed48c5c293a52f7c1e913",
            "name": "Gender",
            "datatype": "int64",
            "label": "Gender"
          },
          {
            "id": "640ed48c5c293a52f7c1e914",
            "name": "Interest_Rate",
            "datatype": "int64",
            "label": "Interest_Rate"
          }
        ],
        "serializer": "pickle",
        "dataFormat": "pandas",
        "errorMessages": ""
      },
      "groundTruthDataset": {
        "id": "640ed48cf41596fba88efab6",
        "name": "pickle_pandas_tabular_loan_testing_1.sav",
        "filename": "pickle_pandas_tabular_loan_testing_1.sav",
        "filePath": "/home/benflop/uploads/data/pickle_pandas_tabular_loan_testing_1.sav",
        "ctime": "2023-03-13T07:45:16.545Z",
        "size": "5.79 MB",
        "status": "Valid",
        "description": "",
        "dataColumns": [
          {
            "id": "640ed48c5c293a52f7c1e908",
            "name": "Loan_Amount_Requested",
            "datatype": "int64",
            "label": "Loan_Amount_Requested"
          },
          {
            "id": "640ed48c5c293a52f7c1e909",
            "name": "Length_Employed",
            "datatype": "int64",
            "label": "Length_Employed"
          },
          {
            "id": "640ed48c5c293a52f7c1e90a",
            "name": "Home_Owner",
            "datatype": "int64",
            "label": "Home_Owner"
          },
          {
            "id": "640ed48c5c293a52f7c1e90b",
            "name": "Annual_Income",
            "datatype": "float64",
            "label": "Annual_Income"
          },
          {
            "id": "640ed48c5c293a52f7c1e90c",
            "name": "Income_Verified",
            "datatype": "int64",
            "label": "Income_Verified"
          },
          {
            "id": "640ed48c5c293a52f7c1e90d",
            "name": "Purpose_Of_Loan",
            "datatype": "int64",
            "label": "Purpose_Of_Loan"
          },
          {
            "id": "640ed48c5c293a52f7c1e90e",
            "name": "Debt_To_Income",
            "datatype": "float64",
            "label": "Debt_To_Income"
          },
          {
            "id": "640ed48c5c293a52f7c1e90f",
            "name": "Inquiries_Last_6Mo",
            "datatype": "int64",
            "label": "Inquiries_Last_6Mo"
          },
          {
            "id": "640ed48c5c293a52f7c1e910",
            "name": "Months_Since_Deliquency",
            "datatype": "float64",
            "label": "Months_Since_Deliquency"
          },
          {
            "id": "640ed48c5c293a52f7c1e911",
            "name": "Number_Open_Accounts",
            "datatype": "int64",
            "label": "Number_Open_Accounts"
          },
          {
            "id": "640ed48c5c293a52f7c1e912",
            "name": "Total_Accounts",
            "datatype": "int64",
            "label": "Total_Accounts"
          },
          {
            "id": "640ed48c5c293a52f7c1e913",
            "name": "Gender",
            "datatype": "int64",
            "label": "Gender"
          },
          {
            "id": "640ed48c5c293a52f7c1e914",
            "name": "Interest_Rate",
            "datatype": "int64",
            "label": "Interest_Rate"
          }
        ],
        "serializer": "pickle",
        "dataFormat": "pandas",
        "errorMessages": ""
      },
      "groundTruthColumn": "Interest_Rate",
    },
  }
}

export const PROJECT_TEMPLATE_VARIABLES = {
  "projectTemplate": {
    "projectInfo": {
      "name": "Template 3",
      "company": "Template 3",
      "description": "Template 3",
      "reportTitle": "Template 3"
    },
    "globalVars": [
      {
        "key": "20",
        "value": "30"
      },
      {
        "key": "30",
        "value": "30"
      }
    ],
    "pages": [
      {
        "layouts": {
          "w": 1,
          "h": 4,
          "x": 5,
          "y": 9,
          "i": "1674113927768",
          "minW": 1,
          "maxW": 12,
          "minH": 4,
          "maxH": 37,
          "moved": false,
          "static": false
        },
        "reportWidgets": {
          "widgetGID": "aiverify.tests:test2",
          "key": "1675757519254",
          "layoutItemProperties": {
            "justifyContent": "left",
            "alignItems": "top",
            "color": null,
            "bgcolor": null
          },
          "properties": null
        }
      }
    ],
  }
}