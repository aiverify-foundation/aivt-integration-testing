import { expect } from './base-test'

export class TestResultPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    /* Test Result Page */
    this.aivlogo = page.getByRole('link', { name: 'AI Verify' });
    this.runNewTestButton = page.getByRole('button', { name: 'RUN NEW TESTS' });

    /* Run New Test Page */
    this.algorithmDropDownList = page.getByRole('button', { name: 'Algorithm' });
    this.modelDropDownList = page.getByRole('button', { name: 'Model', exact: true });
    this.datasetDropDownList = page.getByRole('button', { name: 'Test Dataset' });
    this.groundTruthDatasetDropDownList = page.getByRole('button', { name: 'Ground Truth Dataset' });
    this.groundTruthColumnDropDownList = page.getByRole('button', { name: 'Ground Truth Column' });
    this.sensitiveFeature = page.locator('#root_sensitive_feature_0');
    this.annotatedLabelsPath = page.getByRole('button', { name: 'Annotated labels path' });
    this.annotatedGroundTruthPath = page.getByRole('button', { name: 'Annotated ground truth path' });
    this.nameOfImageColumn = page.getByRole('textbox', { name: 'Name of column containing' });
    this.nameOfCorruptionAddButton = page.locator('.array-field-container > .mb-2').first();
    this.nameOfCorruption = page.locator('#root_corruptions_0');
    this.runTestButton = page.getByRole('button', { name: 'Run Test' });

    /* View Running Test Page */
    this.deleteTestRunButton = page.getByRole('button', { name: 'Delete test run' })
    this.confirmDeleteTestRunButton = page.getByRole('button', { name: 'Delete', exact: true })
    this.confirmDeleteTestRunOkayButton = page.getByRole('button', { name: 'OK' })

    /* Blur Corruptions Specific Parameters */
    this.blurSigmaAddButton = page.locator('div:nth-child(6) > .mb-4 > .array-field-container > .mb-2');
    this.blurSigma = page.locator('#root_gaussian_blur_sigma_0');

    /* General Corruptions Specific Parameters */
    this.noiseSigmaAddButton = page.getByRole('button', { name: '+ Add' }).nth(1);
    this.noiseSigma = page.locator('#root_gaussian_noise_sigma_0');

    /* Environment Corruptions Specific Parameters */
    this.snowIntensityAddButton = page.getByRole('button', { name: '+ Add' }).nth(1)
    this.snowIntensity = page.locator('#root_snow_intensity_0');

    /* Digital Corruptions Specific Parameters */
    this.brightnessDownFactorAddButton = page.locator('div:nth-child(6) > .mb-4 > .array-field-container > .mb-2');
    this.brightnessDownFactor = page.locator('#root_brightness_down_factor_0');

    /* SHAP ToolBox Specific Parameters */
    this.backgroundPath = page.getByRole('button', { name: 'Path of the Background Path' });
    this.backgroundSample = page.locator('#root_background_samples');
    this.dataSample = page.locator('#root_data_samples');

    /* Veritas Tool */
    this.privilegedGroup = page.locator('#root_privileged_groups_newKey-key');
    this.privilegedGroupAddButton = page.getByRole('group', { name: 'Privileged Groups', exact: true }).getByRole('button');
    this.privilegedGroupAddValueButton = page.locator('#root_privileged_groups').getByText('+ Add');
    this.privilegedGroupSex = page.locator('#root_privileged_groups_SEX_0');
    this.privilegedGroupMarriage = page.locator('#root_privileged_groups_MARRIAGE_0');
    this.modelTypeDropDownList = page.getByRole('button', { name: 'Model Type' });
    this.positiveLabelAddButton = page.locator('div:nth-child(8) > .mb-4 > .array-field-container > .mb-2');
    this.positiveLabel = page.locator('#root_positive_label_0');
    this.fairnessConcern = page.getByText('Fairness Concern', { exact: true });
    this.performanceMetric = page.getByRole('textbox', { name: 'Performance Metric' });
    this.transparencyRow1 = page.locator('#root_transparency_rows_0');
    this.transparencyRow2 = page.locator('#root_transparency_rows_1');
    this.transparencyRowAddButton = page.locator('div').filter({ hasText: /^Transparency Analysis Rows-1\*✕\+ Add$/ }).getByRole('button').nth(1);
    this.transparencyMaxSamples = page.locator('#root_transparency_max_samples');

  }

  /**
   * @param { object }
   */
  async imageCorruption(parameters) {
    await this.algorithmDropDownList.click()
    await this.page.getByRole('option', { name: parameters.algorithm, exact: true }).click()
    await this.modelDropDownList.click()
    await this.page.getByRole('option', { name: parameters.model, exact: true }).click()
    await this.datasetDropDownList.click()
    await this.page.getByRole('option', { name: parameters.dataset, exact: true }).click()
    await this.groundTruthDatasetDropDownList.click()
    await this.page.getByRole('option', { name: parameters.groundTruthDataset, exact: true }).click()
    await this.groundTruthColumnDropDownList.click()
    await this.page.getByRole('option', { name: parameters.groundTruthColumn, exact: true }).click()
    await this.nameOfImageColumn.fill(parameters.nameOfImageColumn)
    await this.nameOfCorruptionAddButton.click()
    await this.nameOfCorruption.fill(parameters.nameOfCorruption)
    if (parameters.algorithm == "aiverify_blur_corruptions") {
      await this.blurSigmaAddButton.click()
      await this.blurSigma.fill(parameters.blurSigma)
    }
    if (parameters.algorithm == "aiverify_general_corruptions") {
      await this.noiseSigmaAddButton.click()
      await this.noiseSigma.fill(parameters.noiseSigma)
    }
    if (parameters.algorithm == "aiverify_environment_corruptions") {
      await this.snowIntensityAddButton.click()
      await this.snowIntensity.fill(parameters.snowIntensity)
    }
    if (parameters.algorithm == "aiverify_digital_corruptiions") {
      await this.brightnessDownFactorAddButton.click()
      await this.brightnessDownFactor.fill(parameters.brightnessDownFactor)
    }
    await this.runTestButton.click()

    /* Run Test */
    console.log('[INFO] Run Test')
    await this.page.getByLabel('Algorithm:').selectOption('aiverify.stock.image_corruption_toolbox');
    await expect.soft(this.page.getByText('image corruption toolboxSUCCESS').nth(0)).toBeVisible({ timeout: 400000 })

    /* Delete Test Results */
    console.log('[INFO] Delete Test Results')
    await this.deleteTestRunButton.click()
    await this.confirmDeleteTestRunButton.click()
    await this.confirmDeleteTestRunOkayButton.click()
  }

  /**
   * @param { object }
   */
  async runAlgorithms(parameters) {
    await this.algorithmDropDownList.click()
    await this.page.getByRole('option', { name: parameters.algorithm, exact: true }).click()
    await this.modelDropDownList.click()
    await this.page.getByRole('option', { name: parameters.model, exact: true }).click()
    await this.datasetDropDownList.click()
    await this.page.getByRole('option', { name: parameters.dataset, exact: true }).click()
    await this.groundTruthDatasetDropDownList.click()
    await this.page.getByRole('option', { name: parameters.groundTruthDataset, exact: true }).click()
    await this.groundTruthColumnDropDownList.click()
    await this.page.getByRole('option', { name: parameters.groundTruthColumn, exact: true}).click()

    if(parameters.algorithm == "fairness_metrics_toolbox_for_classification") {
      await this.sensitiveFeature.fill(parameters.sensitiveFeature)
      await this.annotatedLabelsPath.click()
      await this.page.getByRole('option', { name: parameters.annotatedLabelsPath }).click()
      await this.nameOfImageColumn.fill(parameters.nameOfImageColumn)
    }

    if(parameters.algorithm == "fairness_metrics_toolbox_for_regression")
      await this.sensitiveFeature.fill(parameters.sensitiveFeature)

    if(parameters.algorithm == "aiverify_robustness_toolbox") {
      await this.annotatedGroundTruthPath.click()
      await this.page.getByRole('option', { name: parameters.annotatedGroundTruthPath, exact: true}).click()
      await this.nameOfImageColumn.click()
      await this.nameOfImageColumn.fill(parameters.nameOfImageColumn)
    }

    if(parameters.algorithm == "aiverify_shap_toolbox") {
      await this.backgroundPath.click()
      await this.page.getByRole('option', { name: parameters.backgroundPath, exact: true }).click()
      await this.backgroundSample.fill(parameters.backgroundSample)
      await this.dataSample.fill(parameters.dataSample)
    }
    if(parameters.algorithm == "veritastool") {
      await this.privilegedGroupAddButton.click()
      await this.privilegedGroup.click()
      await this.privilegedGroup.fill(parameters.privilegedGroup[0][0])
      await this.privilegedGroupAddValueButton.click()
      await this.privilegedGroupAddValueButton.click()
      await this.privilegedGroupSex.fill(parameters.privilegedGroup[0][1])
      await this.privilegedGroupAddButton.nth(3).click()
      await this.privilegedGroup.click()
      await this.privilegedGroup.fill(parameters.privilegedGroup[1][0])
      await this.privilegedGroupAddValueButton.nth(1).click()
      await this.privilegedGroupAddValueButton.nth(1).click()
      await this.privilegedGroupMarriage.fill(parameters.privilegedGroup[1][1])
      await this.modelTypeDropDownList.click()
      await this.page.getByRole('option', { name: parameters.modelType }).click()
      await this.positiveLabelAddButton.click()
      await this.positiveLabel.fill(parameters.positiveLabel)
      await this.performanceMetric.fill(parameters.performanceMetric)
      await this.transparencyRow1.fill(parameters.transparencyRow[0])
      await this.transparencyRowAddButton.click()
      await this.transparencyRow2.fill(parameters.transparencyRow[1])
      await this.transparencyMaxSamples.fill(parameters.transparencyMaxSample)

    }

    /* Run Test */
    console.log('[INFO] Run Test')
    await this.runTestButton.click()
    
    await this.page.getByLabel('Algorithm:').selectOption(parameters.algorithmDropDownListOption)
    await expect.soft(this.page.getByText(parameters.testrunValidationSuccessText).nth(0)).toBeVisible({ timeout: 600000 })

    /* Delete Test Results */
    console.log('[INFO] Delete Test Results')
    await this.deleteTestRunButton.click()
    await this.confirmDeleteTestRunButton.click()
    await this.confirmDeleteTestRunOkayButton.click()
  }
}