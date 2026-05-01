# AI-Enabled-Project

## Overview

This repository is a Playwright-based test project designed to validate the Sauce Demo web application at `https://www.saucedemo.com/` using TypeScript + Page Object pattern.

The tests focus on cross-browser end-to-end scenarios such as user login, product browsing, cart interactions, and checkout flows. The project uses `@playwright/test` to execute tests and produce HTML reports.

Additionally this repository includes a separate task stored under `ai.test.maitenance/`

## Project Structure

```
ai-enabled-roject/
├── .github/
│   └── workflows/
│       └── playwright-tests.yml # GitHub Actions for running tests and publishing HTML report
├── .gitignore                   # Git ignore rules
├── .vscode/                     # VS Code settings and configurations
├── ai.test.maintenance/         # Separate maintenance task folder
├── package.json                 # Node project config and dependencies
├── package-lock.json            # NPM lock file for exact dependency versions
├── playwright.config.ts         # Playwright configuration 
├── README.md                    # Project documentation and instructions
├── src/
│    └── fixtures/                # page fixtures
│    └── pages/                   # page objects
│    └── testData/                # constants
│    └── utils/                   # helpers
└── tests/                       # Playwright test files    
```
## Prerequisites

- Node.js 18+ installed
- npm available
- Git installed (for cloning the repository)

## Setup

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd "ai-enabled-roject"
   ```

2. Install dependencies:

   ```bash
   npm ci
   ```

3. Install Playwright browsers:

   ```bash
   npx playwright install --with-deps
   ```

## Running Tests

Run all Playwright tests:

```bash
npx playwright test
```

Run tests in the interactive Playwright UI:

```bash
npx playwright test --ui
```

Run a single test file:

```bash
npx playwright test tests/example.spec.ts
```

## Reports

After test execution, Playwright generates an HTML report in the `playwright-report/` directory.

Open the report locally:

```bash
npx playwright show-report
```

## Framework Overview

This project uses Playwright Test, a modern automated testing framework for web applications with the following features:

- Browser automation for Chromium, Firefox, and WebKit
- Built-in test runner and assertions
- HTML report generation
- Support for retries, tracing, screenshots, and video capture
- Integration with CI environments via GitHub Actions

## Notes

- `package.json` currently includes the core dev dependencies for Playwright and Node type definitions.
- If you add new tests or change configuration, re-run `npm ci` and `npx playwright install --with-deps` as needed.
