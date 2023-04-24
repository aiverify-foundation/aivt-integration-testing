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

export const GENERATE_REPORT_TO_GENERATE_REPORT_STATUS = `mutation GenerateReport($projectId: ObjectID!, $algorithms: [String]!, $modelAndDatasets: ModelAndDatasetsReportInput) {
    generateReport(projectID: $projectId, algorithms: $algorithms, modelAndDatasets: $modelAndDatasets) {
      projectID
      status
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