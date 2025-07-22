import subprocess, requests, pytest, json

## Need To Run & Install Docker Images Before Running Docker Tests ##
## Need To Install Jupyter Notebook ##
## python -m pip install jupyter ##
## jupyter execute <notebook name>.ipynb ##

pwd = "/home/ubuntu/actions-runner/_work/aiverify/aiverify" ## To remove hardcode once script is debug completely

root_path = pwd + "/stock-plugins/user_defined_files"

def run_test(run_plugin_command, PATH, isZip):

    ## Run Plugin ##
    run_plugin = subprocess.Popen(
    run_plugin_command,
    stdout=subprocess.PIPE,
    stderr=subprocess.PIPE,
    stdin=subprocess.PIPE,
    shell=True,
    text=True,
    cwd=PATH,
    )

    output, errors = run_plugin.communicate()
    assert output == ""
    assert errors == ""

    if(isZip == True):

        ## Zip Test Results ##
        zip_test_results = subprocess.Popen("zip -r output.zip .",
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        stdin=subprocess.PIPE,
        shell=True,
        text=True,
        cwd=PATH + 'output'
        )

        zip_test_results.communicate()

        ## Upload Test Results Zip File ##
        url = "http://127.0.0.1:4000/test_results/upload_zip"

        files=[
            ('file',("output.zip",open(PATH + 'output/output.zip','rb'),'application/zip'))
        ]

        result = requests.request("POST", url, files=files)

        assert result.status_code == 200
    
    if(isZip == False):

        ## Upload Test Results ##
        url = "http://127.0.0.1:4000/test_results/upload"

        with open(PATH + 'output/results.json', 'r') as file:
            data = json.load(file)

        payload = json.dumps(data)

        result = requests.request("POST", url, data={ "test_result" : payload })

        assert result.status_code == 200

    ## Delete Test Results ##
    subprocess.Popen("rm -rf * -y",
    stdout=subprocess.PIPE,
    stderr=subprocess.PIPE,
    stdin=subprocess.PIPE,
    shell=True,
    text=True,
    cwd=PATH + 'output'
    )

def run_test_docker(build_plugin_docker_image_command, run_plugin_docker_command, PATH, isZip):

    if (build_plugin_docker_image_command != ""):

        ## Build Docker Image ##
        build_plugin_docker_image = subprocess.Popen(
        build_plugin_docker_image_command,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        stdin=subprocess.PIPE,
        shell=True,
        text=True,
        cwd=pwd,
        )

        build_plugin_docker_image.communicate()
    
    ## Run Plugin ##
    run_plugin_docker = subprocess.Popen(
    run_plugin_docker_command,
    stdout=subprocess.PIPE,
    stderr=subprocess.PIPE,
    stdin=subprocess.PIPE,
    shell=True,
    text=True,
    cwd=pwd,
    )

    run_plugin_docker.communicate()

    if(isZip == True):

        ## Zip Test Results ##
        zip_test_results_docker = subprocess.Popen("zip -r output.zip .",
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        stdin=subprocess.PIPE,
        shell=True,
        text=True,
        cwd=PATH + 'output'
        )

        zip_test_results_docker.communicate()

        ## Upload Test Results Zip File ##
        url = "http://127.0.0.1:4000/test_results/upload_zip"

        files=[
            ('file',("output.zip",open(PATH + 'output/output.zip','rb'),'application/zip'))
        ]

        result = requests.request("POST", url, files=files)

        assert result.status_code == 200
    
    if(isZip == False):

        ## Upload Test Results ##
        url = "http://127.0.0.1:4000/test_results/upload"

        with open(PATH + 'output/results.json', 'r') as file:
            data = json.load(file)

        payload = json.dumps(data)

        result = requests.request("POST", url, data={ "test_result" : payload })

        assert result.status_code == 200

    ## Delete Test Results ##
    subprocess.Popen("rm -rf * -y",
    stdout=subprocess.PIPE,
    stderr=subprocess.PIPE,
    stdin=subprocess.PIPE,
    shell=True,
    text=True,
    cwd=PATH + 'output'
    )

def run_test_docker_veritas(build_plugin_docker_image_command, run_plugin_docker_command, PATH, isZip):

    if (build_plugin_docker_image_command != ""):

        ## Build Docker Image ##
        build_plugin_docker_image = subprocess.Popen(
        build_plugin_docker_image_command,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        stdin=subprocess.PIPE,
        shell=True,
        text=True,
        cwd=pwd,
        )

        build_plugin_docker_image.communicate()
    
    ## Run Plugin ##
    run_plugin_docker = subprocess.Popen(
    run_plugin_docker_command,
    stdout=subprocess.PIPE,
    stderr=subprocess.PIPE,
    stdin=subprocess.PIPE,
    shell=True,
    text=True,
    cwd=pwd,
    )

    run_plugin_docker.communicate()

    if(isZip == True):

        ## Zip Test Results ##
        zip_test_results_docker = subprocess.Popen("zip -r output.zip .",
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        stdin=subprocess.PIPE,
        shell=True,
        text=True,
        cwd=PATH + 'output'
        )

        zip_test_results_docker.communicate()

        ## Upload Test Results Zip File ##
        url = "http://127.0.0.1:4000/test_results/upload_zip"

        files=[
            ('file',("output.zip",open(PATH + 'output/output.zip','rb'),'application/zip'))
        ]

        result = requests.request("POST", url, files=files)

        assert result.status_code == 200
    
    if(isZip == False):

        ## Upload Test Results ##
        url = "http://127.0.0.1:4000/test_results/upload"

        with open(PATH + 'output/results.json', 'r') as file:
            data = json.load(file)

        payload = json.dumps(data)

        result = requests.request("POST", url, data={ "test_result" : payload })

        assert result.status_code == 200

    ## Delete Test Results ##
    subprocess.Popen("rm -rf * -y",
    stdout=subprocess.PIPE,
    stderr=subprocess.PIPE,
    stdin=subprocess.PIPE,
    shell=True,
    text=True,
    cwd=PATH + 'output'
    )

def run_test_image_corruption(run_plugin_command, PATH):

    ## Run Plugin ##
    run_plugin = subprocess.Popen(
    run_plugin_command,
    stdout=subprocess.PIPE,
    stderr=subprocess.PIPE,
    stdin=subprocess.PIPE,
    shell=True,
    text=True,
    cwd=PATH,
    )

    run_plugin.communicate()

    ## Zip Test Results ##
    zip_test_results = subprocess.Popen("zip -r output.zip results.json temp",
    stdout=subprocess.PIPE,
    stderr=subprocess.PIPE,
    stdin=subprocess.PIPE,
    shell=True,
    text=True,
    cwd=PATH + 'output'
    )
    
    zip_test_results.communicate()

    ## Upload Test Results Zip File ##
    url = "http://127.0.0.1:4000/test_results/upload_zip"

    files=[
        ('file',("output.zip",open(PATH + 'output/output.zip','rb'),'application/zip'))
    ]

    result = requests.request("POST", url, files=files)

    assert result.status_code == 200

    ## Delete Test Results ##
    subprocess.Popen("rm -rf * -y",
    stdout=subprocess.PIPE,
    stderr=subprocess.PIPE,
    stdin=subprocess.PIPE,
    shell=True,
    text=True,
    cwd=PATH + 'output'
    )

def run_test_veritas(run_plugin_command, PATH, isZip):

    ## Run Plugin ##
    run_plugin = subprocess.Popen(
    run_plugin_command,
    stdout=subprocess.PIPE,
    stderr=subprocess.PIPE,
    stdin=subprocess.PIPE,
    shell=True,
    text=True,
    cwd=PATH,
    )
    
    run_plugin.communicate()

    if(isZip == True):

        ## Zip Test Results ##
        zip_test_results = subprocess.Popen("zip -r output.zip .",
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        stdin=subprocess.PIPE,
        shell=True,
        text=True,
        cwd=PATH + 'output'
        )

        zip_test_results.communicate()

        ## Upload Test Results Zip File ##
        url = "http://127.0.0.1:4000/test_results/upload_zip"

        files=[
            ('file',("output.zip",open(PATH + 'output/output.zip','rb'),'application/zip'))
        ]

        result = requests.request("POST", url, files=files)

        assert result.status_code == 200

    if(isZip == False):

        ## Upload Test Results ##
        url = "http://127.0.0.1:4000/test_results/upload"

        with open(PATH + 'output/results.json', 'r') as file:
            data = json.load(file)

        payload = json.dumps(data)

        result = requests.request("POST", url, data={ "test_result" : payload })

        assert result.status_code == 200

    ## Delete Test Results ##
    subprocess.Popen("rm -rf * -y",
    stdout=subprocess.PIPE,
    stderr=subprocess.PIPE,
    stdin=subprocess.PIPE,
    shell=True,
    text=True,
    cwd=PATH + 'output'
    )

def test_accumulated_local_effects_classification():

    run_plugin_command = "pip install " + pwd + "/aiverify-test-engine && pip install . && pip freeze > requirements.txt && pip uninstall -r requirements.txt -y && pip list"

    PATH = pwd + "/stock-plugins/aiverify.stock.accumulated-local-effect/algorithms/accumulated_local_effect/"

    # python -m aiverify_accumulated_local_effect \
    #     --data_path " + root_path + "/data/sample_bc_credit_data.sav \
    #     --model_path " + root_path + "/model/sample_bc_credit_sklearn_linear.LogisticRegression.sav \
    #     --ground_truth_path " + root_path + "/data/sample_bc_credit_data.sav \
    #     --ground_truth default \
    #     --model_type CLASSIFICATION"
    
    ## Run Test ##
    run_test(run_plugin_command, PATH, False)

@pytest.mark.skip
def test_accumulated_local_effects_regression():

    run_plugin_command = "python -m venv .venv && source .venv/bin/activate && pip install " + pwd + "/aiverify-test-engine && pip install . && \
        python -m aiverify_accumulated_local_effect \
        --data_path " + root_path + "/data/sample_mc_toxic_data.sav \
        --model_path " + root_path + "/model/sample_mc_toxic_sklearn_linear.LogisticRegression.sav \
        --ground_truth_path " + root_path + "/data/sample_mc_toxic_data.sav \
        --ground_truth toxic \
        --model_type REGRESSION"

    PATH = pwd + "/stock-plugins/aiverify.stock.accumulated-local-effect/algorithms/accumulated_local_effect/"

    ## Run Test ##
    run_test(run_plugin_command, PATH, False)

@pytest.mark.skip
def test_accumulated_local_effects_zip():

    run_plugin_command = "python -m venv .venv && source .venv/bin/activate && pip install " + pwd + "/aiverify-test-engine && pip install . && \
        python -m aiverify_accumulated_local_effect \
        --data_path " + root_path + "/data/sample_bc_credit_data.sav \
        --model_path " + root_path + "/model/sample_bc_credit_sklearn_linear.LogisticRegression.sav \
        --ground_truth_path " + root_path + "/data/sample_bc_credit_data.sav \
        --ground_truth default \
        --model_type CLASSIFICATION"

    PATH = pwd + "/stock-plugins/aiverify.stock.accumulated-local-effect/algorithms/accumulated_local_effect/"
    
    ## Run Test ##
    run_test(run_plugin_command, PATH, True)

@pytest.mark.skip
def test_accumulated_local_effects_docker():

    build_plugin_docker_image_command = "docker build -t aiverify-accumulated-local-effect \
        -f stock-plugins/aiverify.stock.accumulated-local-effect/algorithms/accumulated_local_effect/Dockerfile ."

    run_plugin_docker_command = "docker run --rm \
        -v $(pwd)/stock-plugins/user_defined_files:/input \
        -v $(pwd)/stock-plugins/aiverify.stock.accumulated-local-effect/algorithms/accumulated_local_effect/output:/app/aiverify/output \
        aiverify-accumulated-local-effect \
        --data_path /input/data/sample_bc_credit_data.sav \
        --model_path /input/model/sample_bc_credit_sklearn_linear.LogisticRegression.sav \
        --ground_truth_path /input/data/sample_bc_credit_data.sav \
        --ground_truth default \
        --model_type CLASSIFICATION "
    
    PATH = pwd + "/stock-plugins/aiverify.stock.accumulated-local-effect/algorithms/accumulated_local_effect/"

    ## Run Test Docker ##
    run_test_docker(build_plugin_docker_image_command, run_plugin_docker_command, PATH, False)

@pytest.mark.skip
def test_accumulated_local_effects_docker_zip():

    build_plugin_docker_image_command = ""

    run_plugin_docker_command = "docker run --rm \
        -v $(pwd)/stock-plugins/user_defined_files:/input \
        -v $(pwd)/stock-plugins/aiverify.stock.accumulated-local-effect/algorithms/accumulated_local_effect/output:/app/aiverify/output \
        aiverify-accumulated-local-effect \
        --data_path /input/data/sample_bc_credit_data.sav \
        --model_path /input/model/sample_bc_credit_sklearn_linear.LogisticRegression.sav \
        --ground_truth_path /input/data/sample_bc_credit_data.sav \
        --ground_truth default \
        --model_type CLASSIFICATION "
    
    PATH = pwd + "/stock-plugins/aiverify.stock.accumulated-local-effect/algorithms/accumulated_local_effect/"

    ## Run Test Docker ##
    run_test_docker(build_plugin_docker_image_command, run_plugin_docker_command, PATH, True)

@pytest.mark.skip
def test_fairness_metrics_toolbox_for_classification():

    run_plugin_command = "python -m venv .venv && source .venv/bin/activate && pip install . && \
        python -m aiverify_fairness_metrics_toolbox_for_classification \
        --data_path " + root_path + "/data/sample_mc_pipeline_toxic_data.sav \
        --model_path " + root_path + "/pipeline/mc_tabular_toxic \
        --ground_truth_path " + root_path + "/data/sample_mc_pipeline_toxic_ytest_data.sav \
        --ground_truth toxic \
        --model_type CLASSIFICATION \
        --run_pipeline \
        --sensitive_features_list gender"
    
    PATH = pwd + "/stock-plugins/aiverify.stock.fairness-metrics-toolbox-for-classification/algorithms/fairness_metrics_toolbox_for_classification/"

    # Run Test ##
    run_test(run_plugin_command, PATH, False)

@pytest.mark.skip
def test_fairness_metrics_toolbox_for_classification_zip():

    run_plugin_command = "python -m venv .venv && source .venv/bin/activate && pip install " + pwd + "/aiverify-test-engine && pip install . && \
        python -m aiverify_fairness_metrics_toolbox_for_classification \
        --data_path " + root_path + "/data/sample_mc_pipeline_toxic_data.sav \
        --model_path " + root_path + "/pipeline/mc_tabular_toxic \
        --ground_truth_path " + root_path + "/data/sample_mc_pipeline_toxic_ytest_data.sav \
        --ground_truth toxic \
        --model_type CLASSIFICATION \
        --run_pipeline \
        --sensitive_features_list gender"
    
    PATH = pwd + "/stock-plugins/aiverify.stock.fairness-metrics-toolbox-for-classification/algorithms/fairness_metrics_toolbox_for_classification/"

    ## Run Test ##
    run_test(run_plugin_command, PATH, True)

@pytest.mark.skip
def test_fairness_metrics_toolbox_for_classification_docker():

    build_plugin_docker_image_command = "docker build -t aiverify-fairness-metrics-toolbox-for-classification \
        -f stock-plugins/aiverify.stock.fairness-metrics-toolbox-for-classification/algorithms/fairness_metrics_toolbox_for_classification/Dockerfile ."

    run_plugin_docker_command = "docker run --rm \
        -v $(pwd)/stock-plugins/user_defined_files:/input \
        -v $(pwd)/stock-plugins/aiverify.stock.fairness-metrics-toolbox-for-classification/algorithms/fairness_metrics_toolbox_for_classification/output:/app/aiverify/output \
        aiverify-fairness-metrics-toolbox-for-classification \
        --data_path /input/data/sample_mc_pipeline_toxic_data.sav \
        --model_path /input/pipeline/mc_tabular_toxic \
        --ground_truth_path /input/data/sample_mc_pipeline_toxic_ytest_data.sav \
        --ground_truth toxic \
        --model_type CLASSIFICATION \
        --run_pipeline \
        --sensitive_features_list gender"

    PATH = pwd + "/stock-plugins/aiverify.stock.fairness-metrics-toolbox-for-classification/algorithms/fairness_metrics_toolbox_for_classification/"

    ## Run Test Docker ##
    run_test_docker(build_plugin_docker_image_command, run_plugin_docker_command, PATH, False)

@pytest.mark.skip
def test_fairness_metrics_toolbox_for_classification_docker_zip():

    build_plugin_docker_image_command = ""

    run_plugin_docker_command = "docker run --rm \
        -v $(pwd)/stock-plugins/user_defined_files:/input \
        -v $(pwd)/stock-plugins/aiverify.stock.fairness-metrics-toolbox-for-classification/algorithms/fairness_metrics_toolbox_for_classification/output:/app/aiverify/output \
        aiverify-fairness-metrics-toolbox-for-classification \
        --data_path /input/data/sample_mc_pipeline_toxic_data.sav \
        --model_path /input/pipeline/mc_tabular_toxic \
        --ground_truth_path /input/data/sample_mc_pipeline_toxic_ytest_data.sav \
        --ground_truth toxic \
        --model_type CLASSIFICATION \
        --run_pipeline \
        --sensitive_features_list gender"

    PATH = pwd + "/stock-plugins/aiverify.stock.fairness-metrics-toolbox-for-classification/algorithms/fairness_metrics_toolbox_for_classification/"

    ## Run Test Docker ##
    run_test_docker(build_plugin_docker_image_command, run_plugin_docker_command, PATH, True)

@pytest.mark.skip
def test_fairness_metric_toolbox_for_regression():

    run_plugin_command = "python -m venv .venv && source .venv/bin/activate && pip install " + pwd + "/aiverify-test-engine && pip install . && \
        python -m aiverify_fairness_metrics_toolbox_for_regression \
        --data_path " + root_path + "/data/sample_reg_pipeline_data.sav \
        --model_path " + root_path + "/pipeline/regression_tabular_donation \
        --ground_truth_path " + root_path + "/data/sample_reg_pipeline_ytest_data.sav \
        --ground_truth donation \
        --model_type REGRESSION \
        --run_pipeline \
        --sensitive_features_list gender"
    
    PATH = pwd + "/stock-plugins/aiverify.stock.fairness-metrics-toolbox-for-regression/algorithms/fairness_metrics_toolbox_for_regression/"

    ## Run Test ##
    run_test(run_plugin_command, PATH, False)

@pytest.mark.skip
def test_fairness_metric_toolbox_for_regression_zip():

    run_plugin_command = "python -m venv .venv && source .venv/bin/activate && pip install " + pwd + "/aiverify-test-engine && pip install . && \
        python -m aiverify_fairness_metrics_toolbox_for_regression \
        --data_path " + root_path + "/data/sample_reg_pipeline_data.sav \
        --model_path " + root_path + "/pipeline/regression_tabular_donation \
        --ground_truth_path " + root_path + "/data/sample_reg_pipeline_ytest_data.sav \
        --ground_truth donation \
        --model_type REGRESSION \
        --run_pipeline \
        --sensitive_features_list gender"

    PATH = pwd + "/stock-plugins/aiverify.stock.fairness-metrics-toolbox-for-regression/algorithms/fairness_metrics_toolbox_for_regression/"

    ## Run Test ##
    run_test(run_plugin_command, PATH, True)

@pytest.mark.skip
def test_fairness_metric_toolbox_for_regression_docker():

    build_plugin_docker_image_command = "docker build -t aiverify-fairness-metrics-toolbox-for-regression \
        -f stock-plugins/aiverify.stock.fairness-metrics-toolbox-for-regression/algorithms/fairness_metrics_toolbox_for_regression/Dockerfile ."

    run_plugin_docker_command = "docker run --rm \
        -v $(pwd)/stock-plugins/user_defined_files:/input \
        -v $(pwd)/stock-plugins/aiverify.stock.fairness-metrics-toolbox-for-regression/algorithms/fairness_metrics_toolbox_for_regression/output:/app/aiverify/output \
        aiverify-fairness-metrics-toolbox-for-regression \
        --data_path /input/data/sample_reg_pipeline_data.sav \
        --model_path /input/pipeline/regression_tabular_donation \
        --ground_truth_path /input/data/sample_reg_pipeline_ytest_data.sav \
        --ground_truth donation \
        --model_type REGRESSION \
        --run_pipeline \
        --sensitive_features_list gender"

    PATH = pwd + "/stock-plugins/aiverify.stock.fairness-metrics-toolbox-for-regression/algorithms/fairness_metrics_toolbox_for_regression/"

    ## Run Test Docker ##
    run_test_docker(build_plugin_docker_image_command, run_plugin_docker_command, PATH, False)

@pytest.mark.skip
def test_fairness_metric_toolbox_for_regression_docker_zip():

    build_plugin_docker_image_command = ""

    run_plugin_docker_command = "docker run --rm \
            -v $(pwd)/stock-plugins/user_defined_files:/input \
            -v $(pwd)/stock-plugins/aiverify.stock.fairness-metrics-toolbox-for-regression/algorithms/fairness_metrics_toolbox_for_regression/output:/app/aiverify/output \
            aiverify-fairness-metrics-toolbox-for-regression \
            --data_path /input/data/sample_reg_pipeline_data.sav \
            --model_path /input/pipeline/regression_tabular_donation \
            --ground_truth_path /input/data/sample_reg_pipeline_ytest_data.sav \
            --ground_truth donation \
            --model_type REGRESSION \
            --run_pipeline \
            --sensitive_features_list gender"

    PATH = pwd + "/stock-plugins/aiverify.stock.fairness-metrics-toolbox-for-regression/algorithms/fairness_metrics_toolbox_for_regression/"

    ## Run Test Docker ##
    run_test_docker(build_plugin_docker_image_command, run_plugin_docker_command, PATH, True)

@pytest.mark.skip
def test_blur_corruptions_zip():

    run_plugin_command = "python -m venv .venv && source .venv/bin/activate && pip install " + pwd + "/aiverify-test-engine && pip install . && \
        python -m aiverify_blur_corruptions \
        --data_path " + root_path + "/data/raw_fashion_image_10 \
        --model_path " + root_path + "/pipeline/sample_fashion_mnist_sklearn \
        --ground_truth_path " + root_path + "/data/pickle_pandas_fashion_mnist_annotated_labels_10.sav \
        --ground_truth label \
        --model_type CLASSIFICATION \
        --set_seed 10 \
        --file_name_label file_name \
        --corruptions gaussian_blur defocus_blur"

    PATH = pwd + "/stock-plugins/aiverify.stock.image-corruption-toolbox/algorithms/blur_corruptions/"

    ## Run Test ##
    run_test_image_corruption(run_plugin_command, PATH)

@pytest.mark.skip
def test_blur_corruptions_docker_zip():

    build_plugin_docker_image_command = "docker build -t aiverify-blur-corruptions \
        -f stock-plugins/aiverify.stock.image-corruption-toolbox/algorithms/blur_corruptions/Dockerfile ."

    run_plugin_docker_command = "docker run --rm \
        -v $(pwd)/stock-plugins/user_defined_files:/input \
        -v $(pwd)/stock-plugins/aiverify.stock.image-corruption-toolbox/algorithms/blur_corruptions/output:/app/aiverify/output \
        aiverify-blur-corruptions \
        --data_path /input/data/raw_fashion_image_10 \
        --model_path /input/pipeline/sample_fashion_mnist_sklearn \
        --ground_truth_path /input/data/pickle_pandas_fashion_mnist_annotated_labels_10.sav \
        --ground_truth label \
        --model_type CLASSIFICATION \
        --set_seed 10 \
        --file_name_label file_name \
        --corruptions gaussian_blur defocus_blur"

    PATH = pwd + "/stock-plugins/aiverify.stock.image-corruption-toolbox/algorithms/blur_corruptions/"

    ## Run Test Docker ##
    run_test_docker(build_plugin_docker_image_command, run_plugin_docker_command, PATH, True)

@pytest.mark.skip
def test_digital_corruptions_zip():

    run_plugin_command = "python -m venv .venv && source .venv/bin/activate && pip install " + pwd + "/aiverify-test-engine && pip install . && \
        python -m aiverify_digital_corruptions \
        --data_path " + root_path + "/data/raw_fashion_image_10 \
        --model_path " + root_path + "/pipeline/sample_fashion_mnist_sklearn \
        --ground_truth_path " + root_path + "/data/pickle_pandas_fashion_mnist_annotated_labels_10.sav \
        --ground_truth label \
        --model_type CLASSIFICATION \
        --set_seed 10 \
        --file_name_label file_name \
        --corruptions random_perspective jpeg_compression \
        --brightness_down_factor 0.1 0.2 0.3"

    PATH = pwd + "/stock-plugins/aiverify.stock.image-corruption-toolbox/algorithms/digital_corruptions/"

    ## Run Test ##
    run_test_image_corruption(run_plugin_command, PATH)

@pytest.mark.skip
def test_digital_corruptions_docker_zip():

    build_plugin_docker_image_command = "docker build -t aiverify-digital-corruptions \
        -f stock-plugins/aiverify.stock.image-corruption-toolbox/algorithms/digital_corruptions/Dockerfile ."

    run_plugin_docker_command = "docker run --rm \
        -v $(pwd)/stock-plugins/user_defined_files:/input \
        -v $(pwd)/stock-plugins/aiverify.stock.image-corruption-toolbox/algorithms/digital_corruptions/output:/app/aiverify/output \
        aiverify-digital-corruptions \
        --data_path /input/data/raw_fashion_image_10 \
        --model_path /input/pipeline/sample_fashion_mnist_sklearn \
        --ground_truth_path /input/data/pickle_pandas_fashion_mnist_annotated_labels_10.sav \
        --ground_truth label \
        --model_type CLASSIFICATION \
        --set_seed 10 \
        --file_name_label file_name \
        --corruptions random_perspective jpeg_compression \
        --brightness_down_factor 0.1 0.2 0.3"

    PATH = pwd + "/stock-plugins/aiverify.stock.image-corruption-toolbox/algorithms/digital_corruptions/"

    ## Run Docker Test ##
    run_test_docker(build_plugin_docker_image_command, run_plugin_docker_command, PATH, True)

@pytest.mark.skip
def test_environment_corruptions_zip():

    ## Need to install: brew install freetype imagemagick
    ## export MAGICK_HOME=/opt/homebrew/opt/imagemagick
    ## export PATH=$MAGICK_HOME/bin:$PATH

    run_plugin_command = "python -m venv .venv && source .venv/bin/activate && pip install " + pwd + "/aiverify-test-engine && pip install . && \
        python -m aiverify_environment_corruptions \
        --data_path " + root_path + "/data/raw_fashion_image_10 \
        --model_path " + root_path + "/pipeline/sample_fashion_mnist_sklearn \
        --ground_truth_path " + root_path + "/data/pickle_pandas_fashion_mnist_annotated_labels_10.sav \
        --ground_truth label \
        --model_type CLASSIFICATION \
        --file_name_label file_name \
        --corruptions snow rain \
        --snow_intensity 1.0 2.0 3.0"

    PATH = pwd + "/stock-plugins/aiverify.stock.image-corruption-toolbox/algorithms/environment_corruptions/"

    ## Run Test ##
    run_test_image_corruption(run_plugin_command, PATH)

@pytest.mark.skip
def test_environment_corruptions_docker_zip():

    build_plugin_docker_image_command = "docker build -t aiverify-environment-corruptions \
        -f stock-plugins/aiverify.stock.image-corruption-toolbox/algorithms/environment_corruptions/Dockerfile ."

    run_plugin_docker_command = "docker run --rm \
        -v $(pwd)/stock-plugins/user_defined_files:/input \
        -v $(pwd)/stock-plugins/aiverify.stock.image-corruption-toolbox/algorithms/environment_corruptions/output:/app/aiverify/output \
        aiverify-environment-corruptions \
        --data_path /input/data/raw_fashion_image_10 \
        --model_path /input/pipeline/sample_fashion_mnist_sklearn \
        --ground_truth_path /input/data/pickle_pandas_fashion_mnist_annotated_labels_10.sav \
        --ground_truth label \
        --model_type CLASSIFICATION \
        --set_seed 10 \
        --file_name_label file_name \
        --corruptions snow rain \
        --snow_intensity 1.0 2.0 3.0"

    PATH = pwd + "/stock-plugins/aiverify.stock.image-corruption-toolbox/algorithms/environment_corruptions/"

    ## Run Docker Test ##
    run_test_docker(build_plugin_docker_image_command, run_plugin_docker_command, PATH, True)

@pytest.mark.skip
def test_general_corruptions_zip():

    run_plugin_command = "python -m venv .venv && source .venv/bin/activate && pip install " + pwd + "/aiverify-test-engine && pip install . && \
        python -m aiverify_general_corruptions \
        --data_path " + root_path + "/data/raw_fashion_image_10 \
        --model_path " + root_path + "/pipeline/sample_fashion_mnist_sklearn \
        --ground_truth_path " + root_path + "/data/pickle_pandas_fashion_mnist_annotated_labels_10.sav \
        --ground_truth label \
        --model_type CLASSIFICATION \
        --set_seed 10 \
        --file_name_label file_name \
        --corruptions gaussian_noise poisson_noise \
        --gaussian_noise_sigma 0.1 0.2 0.3"

    PATH = pwd + "/stock-plugins/aiverify.stock.image-corruption-toolbox/algorithms/general_corruptions/"

    ## Run Test ##
    run_test_image_corruption(run_plugin_command, PATH)

@pytest.mark.skip
def test_general_corruptions_docker_zip():

    build_plugin_docker_image_command = "docker build -t aiverify-general-corruptions \
        -f stock-plugins/aiverify.stock.image-corruption-toolbox/algorithms/general_corruptions/Dockerfile ."

    run_plugin_docker_command = "docker run --rm \
        -v $(pwd)/stock-plugins/user_defined_files:/input \
        -v $(pwd)/stock-plugins/aiverify.stock.image-corruption-toolbox/algorithms/general_corruptions/output:/app/aiverify/output \
        aiverify-general-corruptions \
        --data_path /input/data/raw_fashion_image_10 \
        --model_path /input/pipeline/sample_fashion_mnist_sklearn \
        --ground_truth_path /input/data/pickle_pandas_fashion_mnist_annotated_labels_10.sav \
        --ground_truth label \
        --model_type CLASSIFICATION \
        --set_seed 10 \
        --file_name_label file_name \
        --corruptions gaussian_noise poisson_noise \
        --gaussian_noise_sigma 0.1 0.2 0.3"

    PATH = pwd + "/stock-plugins/aiverify.stock.image-corruption-toolbox/algorithms/general_corruptions/"

    ## Run Docker Test ##
    run_test_docker(build_plugin_docker_image_command, run_plugin_docker_command, PATH, True)

@pytest.mark.skip
def test_partial_dependence_plot():

    run_plugin_command = "python -m venv .venv && source .venv/bin/activate && pip install " + pwd + "/aiverify-test-engine && pip install . && \
        python -m aiverify_partial_dependence_plot \
        --data_path " + root_path + "/data/sample_bc_credit_data.sav \
        --model_path " + root_path + "/model/sample_bc_credit_sklearn_linear.LogisticRegression.sav \
        --ground_truth_path " + root_path + "/data/sample_bc_credit_data.sav \
        --ground_truth default \
        --model_type CLASSIFICATION \
        --no-run_pipeline"

    PATH = pwd + "/stock-plugins/aiverify.stock.partial-dependence-plot/algorithms/partial_dependence_plot/"

    ## Run Test ##
    run_test(run_plugin_command, PATH, False)

@pytest.mark.skip
def test_partial_dependence_plot_zip():

    run_plugin_command = "python -m venv .venv && source .venv/bin/activate && pip install " + pwd + "/aiverify-test-engine && pip install . && \
        python -m aiverify_partial_dependence_plot \
        --data_path " + root_path + "/data/sample_bc_credit_data.sav \
        --model_path " + root_path + "/model/sample_bc_credit_sklearn_linear.LogisticRegression.sav \
        --ground_truth_path " + root_path + "/data/sample_bc_credit_data.sav \
        --ground_truth default \
        --model_type CLASSIFICATION \
        --no-run_pipeline"

    PATH = pwd + "/stock-plugins/aiverify.stock.partial-dependence-plot/algorithms/partial_dependence_plot/"

    ## Run Test ##
    run_test(run_plugin_command, PATH, True)

@pytest.mark.skip
def test_partial_dependence_plot_docker():

    build_plugin_docker_image_command = "docker build -t aiverify-partial-dependence-plot \
        -f stock-plugins/aiverify.stock.partial-dependence-plot/algorithms/partial_dependence_plot/Dockerfile ."

    run_plugin_docker_command = "docker run --rm \
        -v $(pwd)/stock-plugins/user_defined_files:/input \
        -v $(pwd)/stock-plugins/aiverify.stock.partial-dependence-plot/algorithms/partial_dependence_plot/output:/app/aiverify/output \
        aiverify-partial-dependence-plot \
        --data_path /input/data/sample_bc_credit_data.sav \
        --model_path /input/model/sample_bc_credit_sklearn_linear.LogisticRegression.sav \
        --ground_truth_path /input/data/sample_bc_credit_data.sav \
        --ground_truth default \
        --model_type CLASSIFICATION \
        --no-run_pipeline"

    PATH = pwd + "/stock-plugins/aiverify.stock.partial-dependence-plot/algorithms/partial_dependence_plot/"

    ## Run Docker Test ##
    run_test_docker(build_plugin_docker_image_command, run_plugin_docker_command, PATH, False)

@pytest.mark.skip
def test_partial_dependence_plot_docker_zip():

    build_plugin_docker_image_command = ""

    run_plugin_docker_command = "docker run --rm \
        -v $(pwd)/stock-plugins/user_defined_files:/input \
        -v $(pwd)/stock-plugins/aiverify.stock.partial-dependence-plot/algorithms/partial_dependence_plot/output:/app/aiverify/output \
        aiverify-partial-dependence-plot \
        --data_path /input/data/sample_bc_credit_data.sav \
        --model_path /input/model/sample_bc_credit_sklearn_linear.LogisticRegression.sav \
        --ground_truth_path /input/data/sample_bc_credit_data.sav \
        --ground_truth default \
        --model_type CLASSIFICATION \
        --no-run_pipeline"

    PATH = pwd + "/stock-plugins/aiverify.stock.partial-dependence-plot/algorithms/partial_dependence_plot/"

    ## Run Docker Test ##
    run_test_docker(build_plugin_docker_image_command, run_plugin_docker_command, PATH, True)

@pytest.mark.skip
def test_robustness_toolbox_pipeline():

    run_plugin_command = "python -m venv .venv && source .venv/bin/activate && pip install " + pwd + "/aiverify-test-engine && pip install . && \
        python -m aiverify_robustness_toolbox \
        --data_path " + root_path + "/data/sample_bc_pipeline_credit_data.sav \
        --model_path " + root_path + "/pipeline/bc_tabular_credit \
        --ground_truth_path " + root_path + "/data/sample_bc_pipeline_credit_ytest_data.sav \
        --ground_truth default \
        --model_type CLASSIFICATION \
        --run_pipeline \
        --annotated_ground_truth_path " + root_path + "/data/pickle_pandas_fashion_mnist_annotated_labels_10.sav \
        --file_name_label file_name"
    
    PATH = pwd + "/stock-plugins/aiverify.stock.robustness-toolbox/algorithms/robustness_toolbox/"

    ## Run Test ##
    run_test(run_plugin_command, PATH, False)

@pytest.mark.skip
def test_robustness_toolbox_classification():

    run_plugin_command = "python -m venv .venv && source .venv/bin/activate && pip install " + pwd + "/aiverify-test-engine && pip install . && \
        python -m aiverify_robustness_toolbox \
        --data_path " + root_path + "/data/sample_bc_credit_data.sav \
        --model_path " + root_path + "/model/sample_bc_credit_sklearn_linear.LogisticRegression.sav \
        --ground_truth_path " + root_path + "/data/sample_bc_credit_data.sav \
        --ground_truth default \
        --model_type CLASSIFICATION \
        --no-run_pipeline"
    
    PATH = pwd + "/stock-plugins/aiverify.stock.robustness-toolbox/algorithms/robustness_toolbox/"

    ## Run Test ##
    run_test(run_plugin_command, PATH, False)

@pytest.mark.skip
def test_robustness_toolbox_regression():

    run_plugin_command = "python -m venv .venv && source .venv/bin/activate && pip install " + pwd + "/aiverify-test-engine && pip install . && \
        python -m aiverify_robustness_toolbox \
        --data_path " + root_path + "/data/sample_mc_toxic_data.sav \
        --model_path " + root_path + "/model/sample_mc_toxic_sklearn_linear.LogisticRegression.sav \
        --ground_truth_path " + root_path + "/data/sample_mc_toxic_data.sav \
        --ground_truth toxic \
        --model_type REGRESSION \
        --no-run_pipeline"
    
    PATH = pwd + "/stock-plugins/aiverify.stock.robustness-toolbox/algorithms/robustness_toolbox/"

    ## Run Test ##
    run_test(run_plugin_command, PATH, False)

@pytest.mark.skip
def test_robustness_toolbox_zip():

    run_plugin_command = "python -m venv .venv && source .venv/bin/activate && pip install " + pwd + "/aiverify-test-engine && pip install . && \
        python -m aiverify_robustness_toolbox \
        --data_path " + root_path + "/data/sample_bc_pipeline_credit_data.sav \
        --model_path " + root_path + "/pipeline/bc_tabular_credit \
        --ground_truth_path " + root_path + "/data/sample_bc_pipeline_credit_ytest_data.sav \
        --ground_truth default \
        --model_type CLASSIFICATION \
        --run_pipeline \
        --annotated_ground_truth_path " + root_path + "/data/pickle_pandas_fashion_mnist_annotated_labels_10.sav \
        --file_name_label file_name"
    
    PATH = pwd + "/stock-plugins/aiverify.stock.robustness-toolbox/algorithms/robustness_toolbox/"

    ## Run Test ##
    run_test(run_plugin_command, PATH, True)

@pytest.mark.skip
def test_robustness_toolbox_docker():

    build_plugin_docker_image_command = "docker build -t aiverify-robustness-toolbox \
        -f stock-plugins/aiverify.stock.robustness-toolbox/algorithms/robustness_toolbox/Dockerfile ."

    run_plugin_docker_command = "docker run --rm \
        -v $(pwd)/stock-plugins/user_defined_files:/input \
        -v $(pwd)/stock-plugins/aiverify.stock.robustness-toolbox/algorithms/robustness_toolbox/output:/app/aiverify/output \
        aiverify-robustness-toolbox \
        --data_path /input/data/raw_fashion_image_10 \
        --model_path /input/pipeline/mc_image_fashion \
        --ground_truth_path /input/data/pickle_pandas_fashion_mnist_annotated_labels_10.sav \
        --ground_truth label \
        --model_type CLASSIFICATION \
        --run_pipeline \
        --annotated_ground_truth_path /input/data/pickle_pandas_fashion_mnist_annotated_labels_10.sav \
        --file_name_label file_name"

    PATH = pwd + "/stock-plugins/aiverify.stock.robustness-toolbox/algorithms/robustness_toolbox/"

    ## Run Docker Test ##
    run_test_docker(build_plugin_docker_image_command, run_plugin_docker_command, PATH, False)

@pytest.mark.skip
def test_robustness_toolbox_docker_zip():

    build_plugin_docker_image_command = ""

    run_plugin_docker_command = "docker run --rm \
        -v $(pwd)/stock-plugins/user_defined_files:/input \
        -v $(pwd)/stock-plugins/aiverify.stock.robustness-toolbox/algorithms/robustness_toolbox/output:/app/aiverify/output \
        aiverify-robustness-toolbox \
        --data_path /input/data/raw_fashion_image_10 \
        --model_path /input/pipeline/mc_image_fashion \
        --ground_truth_path /input/data/pickle_pandas_fashion_mnist_annotated_labels_10.sav \
        --ground_truth label \
        --model_type CLASSIFICATION \
        --run_pipeline \
        --annotated_ground_truth_path /input/data/pickle_pandas_fashion_mnist_annotated_labels_10.sav \
        --file_name_label file_name"

    PATH = pwd + "/stock-plugins/aiverify.stock.robustness-toolbox/algorithms/robustness_toolbox/"

    run_test_docker(build_plugin_docker_image_command, run_plugin_docker_command, PATH, True)

@pytest.mark.skip
def test_shap_toolbox_classification():

    # OpenMP runtime is not installed
    # - vcomp140.dll or libgomp-1.dll for Windows
    # - libomp.dylib for Mac OSX
    # - libgomp.so for Linux and other UNIX-like OSes
    # Mac OSX users: Run `brew install libomp` to install OpenMP runtime.

    run_plugin_command = "python -m venv .venv && source .venv/bin/activate && pip install " + pwd + "/aiverify-test-engine && pip install . && \
        python -m aiverify_shap_toolbox \
            --data_path " + root_path + "/data/sample_bc_credit_data.sav \
            --model_path " + root_path + "/model/sample_bc_credit_sklearn_linear.LogisticRegression.sav \
            --ground_truth_path " + root_path + "/data/sample_bc_credit_data.sav \
            --ground_truth default \
            --model_type CLASSIFICATION \
            --no-run_pipeline \
            --background_path " + root_path + "/data/sample_bc_credit_data.sav \
            --background_samples 25 \
            --data_samples 25 \
            --explain_type global"
    
    PATH = pwd + "/stock-plugins/aiverify.stock.shap-toolbox/algorithms/shap_toolbox/"

    ## Run Test ##
    run_test(run_plugin_command, PATH, False)

@pytest.mark.skip
def test_shap_toolbox_regression():

    # OpenMP runtime is not installed
    # - vcomp140.dll or libgomp-1.dll for Windows
    # - libomp.dylib for Mac OSX
    # - libgomp.so for Linux and other UNIX-like OSes
    # Mac OSX users: Run `brew install libomp` to install OpenMP runtime.

    run_plugin_command = "python -m venv .venv && source .venv/bin/activate && pip install " + pwd + "/aiverify-test-engine && pip install . && \
        python -m aiverify_shap_toolbox \
            --data_path " + root_path + "/data/sample_mc_toxic_data.sav \
            --model_path " + root_path + "/model/sample_mc_toxic_sklearn_linear.LogisticRegression.sav \
            --ground_truth_path " + root_path + "/data/sample_mc_toxic_data.sav \
            --ground_truth toxic \
            --model_type REGRESSION \
            --no-run_pipeline \
            --background_path " + root_path + "/data/sample_mc_toxic_data.sav \
            --background_samples 25 \
            --data_samples 25 \
            --explain_type global"
    
    PATH = pwd + "/stock-plugins/aiverify.stock.shap-toolbox/algorithms/shap_toolbox/"

    ## Run Test ##
    run_test(run_plugin_command, PATH, False)

@pytest.mark.skip
def test_shap_toolbox_zip():

    # OpenMP runtime is not installed
    # - vcomp140.dll or libgomp-1.dll for Windows
    # - libomp.dylib for Mac OSX
    # - libgomp.so for Linux and other UNIX-like OSes
    # Mac OSX users: Run `brew install libomp` to install OpenMP runtime.

    run_plugin_command = "python -m venv .venv && source .venv/bin/activate && pip install " + pwd + "/aiverify-test-engine && pip install . && \
        python -m aiverify_shap_toolbox \
            --data_path " + root_path + "/data/sample_bc_credit_data.sav \
            --model_path " + root_path + "/model/sample_bc_credit_sklearn_linear.LogisticRegression.sav \
            --ground_truth_path " + root_path + "/data/sample_bc_credit_data.sav \
            --ground_truth default \
            --model_type CLASSIFICATION \
            --no-run_pipeline \
            --background_path " + root_path + "/data/sample_bc_credit_data.sav \
            --background_samples 25 \
            --data_samples 25 \
            --explain_type global"
    
    PATH = pwd + "/stock-plugins/aiverify.stock.shap-toolbox/algorithms/shap_toolbox/"

    ## Run Test ##
    run_test(run_plugin_command, PATH, True)

@pytest.mark.skip
def test_shap_toolbox_docker():

    build_plugin_docker_image_command = "docker build -t aiverify-shap-toolbox \
        -f stock-plugins/aiverify.stock.shap-toolbox/algorithms/shap_toolbox/Dockerfile ."

    run_plugin_docker_command = "docker run --rm \
        -v $(pwd)/stock-plugins/user_defined_files:/input \
        -v $(pwd)/stock-plugins/aiverify.stock.shap-toolbox/algorithms/shap_toolbox/output:/app/aiverify/output \
        aiverify-shap-toolbox \
        --data_path /input/data/sample_bc_credit_data.sav \
        --model_path /input/model/sample_bc_credit_sklearn_linear.LogisticRegression.sav \
        --ground_truth_path /input/data/sample_bc_credit_data.sav \
        --ground_truth default \
        --model_type CLASSIFICATION \
        --no-run_pipeline \
        --background_path /input/data/sample_bc_credit_data.sav \
        --background_samples 25 \
        --data_samples 25 \
        --explain_type global"

    PATH = pwd + "/stock-plugins/aiverify.stock.shap-toolbox/algorithms/shap_toolbox/"

    ## Run Docker Test ##
    run_test_docker(build_plugin_docker_image_command, run_plugin_docker_command, PATH, False)

@pytest.mark.skip
def test_shap_toolbox_docker_zip():

    build_plugin_docker_image_command = ""

    run_plugin_docker_command = "docker run --rm \
        -v $(pwd)/stock-plugins/user_defined_files:/input \
        -v $(pwd)/stock-plugins/aiverify.stock.shap-toolbox/algorithms/shap_toolbox/output:/app/aiverify/output \
        aiverify-shap-toolbox \
        --data_path /input/data/sample_bc_credit_data.sav \
        --model_path /input/model/sample_bc_credit_sklearn_linear.LogisticRegression.sav \
        --ground_truth_path /input/data/sample_bc_credit_data.sav \
        --ground_truth default \
        --model_type CLASSIFICATION \
        --no-run_pipeline \
        --background_path /input/data/sample_bc_credit_data.sav \
        --background_samples 25 \
        --data_samples 25 \
        --explain_type global"

    PATH = pwd + "/stock-plugins/aiverify.stock.shap-toolbox/algorithms/shap_toolbox/"

    ## Run Docker Test ##
    run_test_docker(build_plugin_docker_image_command, run_plugin_docker_command, PATH, True)

@pytest.mark.skip
def test_veritas_cm_demo():

    PATH = pwd + "/aiverify-apigw"

    subprocess.Popen("source .venv/bin/activate && pip install ../stock-plugins/aiverify.stock.veritas/algorithms/veritastool",
    stdout=subprocess.PIPE,
    stderr=subprocess.PIPE,
    stdin=subprocess.PIPE,
    shell=True,
    text=True,
    cwd=PATH,
    )

    run_plugin_command = "source " + pwd + "/aiverify-apigw/.venv/bin/activate && pip install jupyter && jupyter execute CM_demo.ipynb"

    PATH = pwd + "/stock-plugins/aiverify.stock.veritas/algorithms/veritastool/examples/customer_marketing_example/"

    ## Run Test ##
    run_test_veritas(run_plugin_command, PATH, False)

@pytest.mark.skip
def test_veritas_cm_demo_zip():

    PATH = pwd + "/aiverify-apigw"

    subprocess.Popen("source .venv/bin/activate && pip install ../stock-plugins/aiverify.stock.veritas/algorithms/veritastool",
    stdout=subprocess.PIPE,
    stderr=subprocess.PIPE,
    stdin=subprocess.PIPE,
    shell=True,
    text=True,
    cwd=PATH,
    )

    run_plugin_command = "source " + pwd + "/aiverify-apigw/.venv/bin/activate && pip install jupyter && jupyter execute CM_demo.ipynb"

    PATH = pwd + "/stock-plugins/aiverify.stock.veritas/algorithms/veritastool/examples/customer_marketing_example/"

    ## Run Test ##
    run_test_veritas(run_plugin_command, PATH, True)

@pytest.mark.skip
def test_veritas_base_classification_demo():

    PATH = pwd + "/aiverify-apigw"

    subprocess.Popen("source .venv/bin/activate && pip install ../stock-plugins/aiverify.stock.veritas/algorithms/veritastool",
    stdout=subprocess.PIPE,
    stderr=subprocess.PIPE,
    stdin=subprocess.PIPE,
    shell=True,
    text=True,
    cwd=PATH,
    )

    run_plugin_command = "source " + pwd + "/aiverify-apigw/.venv/bin/activate && pip install jupyter && jupyter execute BaseClassification_demo.ipynb"

    PATH = pwd + "/stock-plugins/aiverify.stock.veritas/algorithms/veritastool/examples/"

    ## Run Test ##
    run_test_veritas(run_plugin_command, PATH, False)

@pytest.mark.skip
def test_veritas_base_classification_demo_zip():

    PATH = pwd + "/aiverify-apigw"

    subprocess.Popen("source .venv/bin/activate && pip install ../stock-plugins/aiverify.stock.veritas/algorithms/veritastool",
    stdout=subprocess.PIPE,
    stderr=subprocess.PIPE,
    stdin=subprocess.PIPE,
    shell=True,
    text=True,
    cwd=PATH,
    )

    run_plugin_command = "source " + pwd + "/aiverify-apigw/.venv/bin/activate &&  pip install jupyter && jupyter execute BaseClassification_demo.ipynb"

    PATH = pwd + "/stock-plugins/aiverify.stock.veritas/algorithms/veritastool/examples/"

    ## Run Test ##
    run_test_veritas(run_plugin_command, PATH, True)

@pytest.mark.skip
def test_veritas_base_regression_demo():

    PATH = pwd + "/aiverify-apigw"

    subprocess.Popen("source .venv/bin/activate && pip install ../stock-plugins/aiverify.stock.veritas/algorithms/veritastool",
    stdout=subprocess.PIPE,
    stderr=subprocess.PIPE,
    stdin=subprocess.PIPE,
    shell=True,
    text=True,
    cwd=PATH,
    )

    run_plugin_command = "source " + pwd + "/aiverify-apigw/.venv/bin/activate && pip install jupyter && jupyter execute BaseRegression_demo.ipynb"

    PATH = pwd + "/stock-plugins/aiverify.stock.veritas/algorithms/veritastool/examples/"

    ## Run Test ##
    run_test_veritas(run_plugin_command, PATH, False)

@pytest.mark.skip
def test_veritas_base_regression_demo_zip():

    PATH = pwd + "/aiverify-apigw"

    subprocess.Popen("source .venv/bin/activate && pip install ../stock-plugins/aiverify.stock.veritas/algorithms/veritastool",
    stdout=subprocess.PIPE,
    stderr=subprocess.PIPE,
    stdin=subprocess.PIPE,
    shell=True,
    text=True,
    cwd=PATH,
    )

    run_plugin_command = "source " + pwd + "/aiverify-apigw/.venv/bin/activate && pip install jupyter && jupyter execute BaseRegression_demo.ipynb"

    PATH = pwd + "/stock-plugins/aiverify.stock.veritas/algorithms/veritastool/examples/"

    ## Run Test ##
    run_test_veritas(run_plugin_command, PATH, True)

@pytest.mark.skip
def test_veritas_cs_demo():

    PATH = pwd + "/aiverify-apigw"

    subprocess.Popen("source .venv/bin/activate && pip install ../stock-plugins/aiverify.stock.veritas/algorithms/veritastool",
    stdout=subprocess.PIPE,
    stderr=subprocess.PIPE,
    stdin=subprocess.PIPE,
    shell=True,
    text=True,
    cwd=PATH,
    )

    run_plugin_command =  "source " + pwd + "/aiverify-apigw/.venv/bin/activate && pip install imblearn && pip install jupyter && jupyter execute CS_demo.ipynb"

    PATH = pwd + "/stock-plugins/aiverify.stock.veritas/algorithms/veritastool/examples/"

    ## Run Test ##
    run_test_veritas(run_plugin_command, PATH, False)

@pytest.mark.skip
def test_veritas_cs_demo_zip():

    PATH = pwd + "/aiverify-apigw"

    subprocess.Popen("source .venv/bin/activate && pip install ../stock-plugins/aiverify.stock.veritas/algorithms/veritastool",
    stdout=subprocess.PIPE,
    stderr=subprocess.PIPE,
    stdin=subprocess.PIPE,
    shell=True,
    text=True,
    cwd=PATH,
    )

    run_plugin_command =  "source " + pwd + "/aiverify-apigw/.venv/bin/activate && pip install imblearn && pip install jupyter && jupyter execute CS_demo.ipynb"

    PATH = pwd + "/stock-plugins/aiverify.stock.veritas/algorithms/veritastool/examples/"

    ## Run Test ##
    run_test_veritas(run_plugin_command, PATH, True)

@pytest.mark.skip
def test_veritas_puw_demo():

    PATH = pwd + "/aiverify-apigw"

    subprocess.Popen("source .venv/bin/activate && pip install ../stock-plugins/aiverify.stock.veritas/algorithms/veritastool",
    stdout=subprocess.PIPE,
    stderr=subprocess.PIPE,
    stdin=subprocess.PIPE,
    shell=True,
    text=True,
    cwd=PATH,
    )

    run_plugin_command = "source " + pwd + "/aiverify-apigw/.venv/bin/activate && pip install jupyter && jupyter execute PUW_demo.ipynb"

    PATH = pwd + "/stock-plugins/aiverify.stock.veritas/algorithms/veritastool/examples/"

    ## Run Test ##
    run_test_veritas(run_plugin_command, PATH, False)

@pytest.mark.skip
def test_veritas_puw_demo_zip():

    PATH = pwd + "/aiverify-apigw"

    subprocess.Popen("source .venv/bin/activate && pip install ../stock-plugins/aiverify.stock.veritas/algorithms/veritastool",
    stdout=subprocess.PIPE,
    stderr=subprocess.PIPE,
    stdin=subprocess.PIPE,
    shell=True,
    text=True,
    cwd=PATH,
    )

    run_plugin_command = "source " + pwd + "/aiverify-apigw/.venv/bin/activate && pip install jupyter && jupyter execute PUW_demo.ipynb"

    PATH = pwd + "/stock-plugins/aiverify.stock.veritas/algorithms/veritastool/examples/"

    ## Run Test ##
    run_test_veritas(run_plugin_command, PATH, True)

@pytest.mark.skip
def test_veritas_docker():

    build_plugin_docker_image_command = "docker build -t aiverify-veritastool -f ./stock-plugins/aiverify.stock.veritas/algorithms/veritastool/Dockerfile ."

    run_plugin_docker_command = "docker run --rm \
        -v $(pwd)/stock-plugins/user_defined_files:/input \
        -v $(pwd)/stock-plugins/aiverify.stock.veritas/algorithms/veritastool/output:/app/aiverify/output \
        aiverify-veritastool \
        --data_path /input/veritas_data/cs_X_test.pkl \
        --model_path /input/veritas_data/cs_model.pkl \
        --ground_truth_path /input/veritas_data/cs_y_test.pkl \
        --ground_truth y_test \
        --training_data_path /input/veritas_data/cs_X_train.pkl \
        --training_ground_truth_path /input/veritas_data/cs_y_train.pkl \
        --training_ground_truth y_train \
        --use_case \"base_regression\" \
        --privileged_groups '{\"SEX\": [1], \"MARRIAGE\": [1]}' \
        --model_type CLASSIFICATION \
        --fair_threshold 80 \
        --fair_metric \"auto\" \
        --fair_concern \"eligible\" \
        --performance_metric \"accuracy\" \
        --transparency_rows 20 40 \
        --transparency_max_samples 1000 \
        --transparency_features LIMIT_BAL \
        --run_pipeline"

    PATH = pwd + "/stock-plugins/aiverify.stock.veritas/algorithms/veritastool/"

    ## Run Docker Test ##
    run_test_docker_veritas(build_plugin_docker_image_command, run_plugin_docker_command, PATH, False)

@pytest.mark.skip
def test_veritas_docker_zip():

    build_plugin_docker_image_command = "docker build -t aiverify-veritastool -f ./stock-plugins/aiverify.stock.veritas/algorithms/veritastool/Dockerfile ."

    run_plugin_docker_command = "docker run --rm \
        -v $(pwd)/stock-plugins/user_defined_files:/input \
        -v $(pwd)/stock-plugins/aiverify.stock.veritas/algorithms/veritastool/output:/app/aiverify/output \
        aiverify-veritastool \
        --data_path /input/veritas_data/cs_X_test.pkl \
        --model_path /input/veritas_data/cs_model.pkl \
        --ground_truth_path /input/veritas_data/cs_y_test.pkl \
        --ground_truth y_test \
        --training_data_path /input/veritas_data/cs_X_train.pkl \
        --training_ground_truth_path /input/veritas_data/cs_y_train.pkl \
        --training_ground_truth y_train \
        --use_case \"base_regression\" \
        --privileged_groups '{\"SEX\": [1], \"MARRIAGE\": [1]}' \
        --model_type CLASSIFICATION \
        --fair_threshold 80 \
        --fair_metric \"auto\" \
        --fair_concern \"eligible\" \
        --performance_metric \"accuracy\" \
        --transparency_rows 20 40 \
        --transparency_max_samples 1000 \
        --transparency_features LIMIT_BAL \
        --run_pipeline"

    PATH = pwd + "/stock-plugins/aiverify.stock.veritas/algorithms/veritastool/"

    ## Run Docker Test ##
    run_test_docker_veritas(build_plugin_docker_image_command, run_plugin_docker_command, PATH, True)