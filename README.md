# Integration Testing
Consists of the following test cases:
- APIGW Test Cases
- Standalone Plugins Test Cases
- Portal Test Cases (Smoke Test Will Use A Subset of Portal Test Cases)

## Smoke Test
To run Smoke Test, run the following command in CLI:

```
URL=<url> PORT_NUMBER=<port_number> ROOT_PATH=</path/to/user/defined/files>/stock-plugins/user_defined_files npx playwright test tests/portal/01-workflows.spec.js
```
To run Smoke Test in headed mode, add the `--headed` flag at the end of the command.

## UI Integration Test

To run UI Integration Test, run the following command in CLI:

```
URL=<url> PORT_NUMBER=<port_number> ROOT_PATH=</path/to/user/defined/files>/stock-plugins/user_defined_files npx playwright test tests/portal/
```

To run UI Integration Test in headed mode, add the `--headed` flag at the end of the command.

To run individual files in UI Integration Test, run the following command in CLI:

```
URL=<url | default: http://localhost> PORT_NUMBER=<port_number | default: 3000> ROOT_PATH=</path/to/user/defined/files>/stock-plugins/user_defined_files npx playwright test tests/portal/<portal file name>
```

To run individual files in UI Integration Test in headed mode, add the `--headed` flag at the end of the command.

To run individual test cases in UI Integration Test, run the following command in CLI:

```
URL=<url | default: http://localhost> PORT_NUMBER=<port_number | default: 3000> ROOT_PATH=</path/to/user/defined/files>/stock-plugins/user_defined_files npx playwright test tests/portal/<portal file name> -g "<test case name>"
```

To run individual test cases in UI Integration Test in headed mode, add the `--headed` flag at the end of the command.