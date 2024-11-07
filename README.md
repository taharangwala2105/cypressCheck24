# Introduction

This task is divided into three parts:

1. Test plan
2. Test cases
3. Test automation

***Project*** - Availability Check web form on this page https://www.check24.de/internet/

![Screenshot 2024-11-07 at 18.01.49.png](docs%2FScreenshot%202024-11-07%20at%2018.01.49.png)

## 1. Test plan

Develop a comprehensive test plan to ensure the quality and stability of the product before release. 
This test plan should provide an organized, structured approach to testing and define the scope, 
objectives, resources, and schedule for testing activities.

Test plan document MUST contain such required sections:

1. **Project overview**
2. **Scope**
   1. In scope - specify the features, modules, and integrations to be tested.
   2. Out of scope - specify the features, modules, and integrations to be not tested.
3. **Objectives**
   1. clearly articulate the primary objectives of the test plan, such as ensuring functional accuracy, reliability, performance, and user experience.
4. **How to test**
   1. Identify types of testing to be performed (e.g., functional, integration, system, regression, performance, security).
   2. Include levels of testing (e.g., unit testing, API testing, UI testing, end-to-end testing).
5. **Reporting and tracking**
   1. describe the approach to tracking test progress, logging defects, and updating stakeholders.
   2. outline the reporting cadence, format, and tools that will be used to communicate progress and outcomes.
6. **Resource & Environment**
   1. specify any setup, configurations, data, or tools needed for testing.
   2. highlight the dependencies and constraints of the test environment.

## 2. Test Cases

In this section you need to write test cases - positive and negative - you will automate in section 3.

Test case acceptance criteria:

1. Precondition
2. Steps to reproduce
3. Expected result

## 3. Test automation

1. All automated test cases should be placed in the ***./cypress/e2e*** folder
2. Test data, used for test cases, should be in the ***./cypress/fixtures*** folder
3. ***./cypress/e2e/test-spec.cy.js*** contains one test cases, to check, if webform in on the page
4. The code should be written in **TypeScript**
