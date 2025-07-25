# Integration Testing
Consists of the following test cases:
- APIGW Test Cases
- Standalone Plugins Test Cases
- Portal Test Cases (Smoke Test Will Use A Subset of Portal Test Cases)

## Pre-Requisites
- Node 20
- Python 3.11

## Installation
Playwright is used to run Smoke Test and UI and API Integration Test. To install Playwright, run the following command in CLI in the root folder:

```
npm install
npx playwright install --with-deps # To install Browsers and other dependencies used by Playwright
```

Pytest is used to run Standalone Plugins Integration Test. To install Pytest, run the following command in CLI in the root folder:

```
# Create Virtual Environment
python -m venv .venv

# Activate Virtual Environment
source .venv/bin/activate

# Install Pytest and other dependencies in Virtual Environment
pip install pytest requests
```

## Smoke Test
To run Smoke Test, run the following command in CLI in the root folder:

```
URL=<url | default: http://localhost> PORT_NUMBER=<port_number | default: 3000> ROOT_PATH=</path/to/user/defined/files>/stock-plugins/user_defined_files npx playwright test tests/portal/01-workflows.spec.js
```
To run Smoke Test in headed mode, add the `--headed` flag at the end of the command.

## UI Integration Test

To run UI Integration Test, run the following command in CLI in the root folder:

```
URL=<url | default: http://localhost> PORT_NUMBER=<port_number | default: 3000> ROOT_PATH=</path/to/user/defined/files>/stock-plugins/user_defined_files npx playwright test tests/portal/
```

To run UI Integration Test in headed mode, add the `--headed` flag at the end of the command.

To run individual files in UI Integration Test, run the following command in CLI in the root folder:

```
URL=<url | default: http://localhost> PORT_NUMBER=<port_number | default: 3000> ROOT_PATH=</path/to/user/defined/files>/stock-plugins/user_defined_files npx playwright test tests/portal/<portal file name>
```

To run individual files in UI Integration Test in headed mode, add the `--headed` flag at the end of the command.

To run individual test cases in UI Integration Test, run the following command in CLI in the root folder:

```
URL=<url | default: http://localhost> PORT_NUMBER=<port_number | default: 3000> ROOT_PATH=</path/to/user/defined/files>/stock-plugins/user_defined_files npx playwright test tests/portal/<portal file name> -g "<test case name>"
```

To run individual test cases in UI Integration Test in headed mode, add the `--headed` flag at the end of the command.

## API Integration Test

To run API Integration Test, run the following command in CLI in the root folder:

```
URL=<url | default: http://localhost> PORT_NUMBER=<port_number | default: 4000> ROOT_PATH=</path/to/user/defined/files>/stock-plugins/user_defined_files npx playwright test tests/apigw/
```

To run API Integration Test in headed mode, add the `--headed` flag at the end of the command.

To run individual files in API Integration Test, run the following command in CLI in the root folder:

```
URL=<url | default: http://localhost> PORT_NUMBER=<port_number | default: 4000> ROOT_PATH=</path/to/user/defined/files>/stock-plugins/user_defined_files npx playwright test tests/apigw/<apigw file name>
```

To run individual files in API Integration Test in headed mode, add the `--headed` flag at the end of the command.

To run individual test cases in API Integration Test, run the following command in CLI in the root folder:

```
URL=<url | default: http://localhost> PORT_NUMBER=<port_number | default: 4000> ROOT_PATH=</path/to/user/defined/files>/stock-plugins/user_defined_files npx playwright test tests/apigw/<apigw file name> -g "<test case name>"
```

To run individual test cases in API Integration Test in headed mode, add the `--headed` flag at the end of the command.

## Standalone Plugin Integration Test

To run Standalone Plugin Integration Test, run the following command in CLI in the root folder:

```
cd tests/standalone-plugins
pytest .
```

For a verbose output, add the `--vv` flag at the end of the command.