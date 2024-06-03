# About this repository
This is test automation repository for saucelabdemo project

## Pre-requirments
Node.js and npm need to be installed. You can download them from the [Node.js website](https://nodejs.org/).

## Setup
Before running tests, you need to install the required dependencies. Navigate to the root directory of the saucedemo_test project in your terminal and run the following commands:
- `npm install`
- `npx playwright install`


## How to run
All scenarios can be found in basic_scenarios.spec.ts

### To run tests with headless browser
`npx playwright test`

### To run tests with headed browser
`npx playwright test --headed`

### To run particular test or group of tests
- define any tag in test description like, for exmaple, @basic:

`test('Customer sorts product items @basic', async () => {`

- then use the same tag when run your tests

`npx playwright test --grep @basic`

## Reports
`npx playwright show-report`

## Test run config
Can be found in /playwright.config.ts
