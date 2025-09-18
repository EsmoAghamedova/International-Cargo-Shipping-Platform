# International Cargo Shipping Platform

## Project Overview

The International Cargo Shipping Platform is a modern web application built with React, TypeScript, and Vite to streamline and manage international cargo shipping processes. It provides a user-friendly interface for managing shipments, tracking cargo, and handling related logistics.

This project leverages cutting-edge technologies to deliver a seamless and efficient experience for both administrators and users.

[//]: # (Add some screenshots or GIFs here to showcase the application's user interface and key features.  Example below)

> **[Placeholder: Insert Screenshots/GIFs Here]**
>
> Example:
>
> ![Dashboard Screenshot](path/to/dashboard.png)
> *The main dashboard providing an overview of ongoing shipments.*
>
> ![Shipment Tracking](path/to/tracking.gif)
> *Real-time tracking of cargo shipments.*

## Tech Stack

*   **Core Libraries:**
    *   [React](https://reactjs.org/): A JavaScript library for building user interfaces.
    *   [TypeScript](https://www.typescriptlang.org/): Adds static typing to JavaScript.
*   **Build Tool:**
    *   [Vite](https://vitejs.dev/): A fast build tool for modern web development.
*   **Styling:**
    *   [Styled Components](https://styled-components.com/): CSS-in-JS library for component-level styling.
*   **State Management:**
    *   [Zustand](https://github.com/pmndrs/zustand): A small, fast and scalable bearbones state-management solution.
    *   [React Query](https://tanstack.com/query/latest): For managing, caching, and updating asynchronous data in React applications.
*   **Routing:**
    *   [React Router](https://reactrouter.com/): Declarative routing for React applications.
*   **Icons:**
    *   [Lucide React](https://lucide.dev/): Beautifully simple icons.
*   **Utilities:**
    *   [uuid](https://github.com/uuidjs/uuid): For generating unique identifiers.
*   **Linting & Formatting:**
    *   [ESLint](https://eslint.org/): A JavaScript linting tool.
    *   [Prettier](https://prettier.io/): An opinionated code formatter.
*   **Testing:**
    *   [Vitest](https://vitest.dev/): A fast and easy-to-use unit testing framework.

## Getting Started

### Prerequisites

Before running the application, ensure you have the following installed:

*   **Node.js:** Version 18 or higher.  It is recommended to use the latest LTS version. Download from [nodejs.org](https://nodejs.org/).
*   **npm, Yarn, or pnpm:** Package managers for installing dependencies. npm is included with Node.js.

### Installation

1.  Clone the repository:

bash
    > npm install   # or yarn install or pnpm install
    
    VITE_API_BASE_URL=https://api.example.com
    The following scripts are defined in `package.json`:

*   `dev`: Runs the development server using Vite.
*   `host`: Runs the development server with host mode enabled (allows access from other devices on the network).
*   `build`: Builds the application for production.  This script first runs `tsc -b` to perform a TypeScript build, then uses Vite to bundle the application.
*   `lint`: Runs ESLint to check for code style and potential issues.
*   `lint:fix`: Runs ESLint and automatically fixes some of the detected issues.
*   `preview`: Starts a local server to preview the production build.
*   `format`: Formats the code using Prettier.
*   `type-check`: Runs the TypeScript compiler to check for type errors without emitting any output files.
*   `test`: Runs the Vitest test suite.
*   `test:ci`: Runs the Vitest test suite in CI mode (headless, with a dot reporter, and allows tests to pass even if there are no tests).

## Folder Structure

> Describe where your mock data is located (e.g., `src/mockData`) and how it's structured. Explain how developers can extend or modify this data for testing and development purposes.  For example:

The mock data is in `src/mockData` directory. Each file there represents a different entity type such as `shipments.ts`, `customers.ts`, etc. To extend, simply add new entries to the arrays in these files, following the existing data structure. You can also create new files for new entity types.

## Architecture Notes

*   **Services:** Located in `src/services`, these modules handle API interactions. They use `fetch` or a library like `axios` to make HTTP requests to the backend.
*   **Query:**  `React Query` is utilized for asynchronous state management, data fetching, caching, and updating data within the application.
*   **Store:**  `Zustand` is used for managing application state that is shared across components. Stores are defined in the `src/store` directory and provide a simple way to manage application-wide data.

## Pricing Algorithm & Assumptions

> Document the pricing algorithm used in the platform. This includes:
> *   Factors considered (e.g., weight, distance, type of cargo).
> *   Formulas used to calculate shipping costs.
> *   Assumptions made in the calculations (e.g., fuel costs, currency exchange rates).

**Example:**

The pricing algorithm calculates the shipping cost based on the following factors:

1.  **Weight:** The weight of the cargo in kilograms.
2.  **Distance:** The distance between the origin and destination in kilometers.
3.  **Cargo Type:** Different cargo types (e.g., general, fragile, hazardous) have different rates.

The formula is: `Shipping Cost = (Weight * Distance * Cargo Type Rate) + Base Fee`

Assumptions:

*   Fuel costs are assumed to be constant.
*   Currency exchange rates are based on the current market rates.

## CI/CD & Deployment URL

> Describe your CI/CD pipeline (e.g., using GitHub Actions, GitLab CI). Provide the deployment URL of the application.

**Example:**

This project uses GitHub Actions for CI/CD.  The workflow is defined in `.github/workflows/deploy.yml`.  It automatically builds and deploys the application to [Netlify](https://www.netlify.com/) on every push to the `main` branch.

Deployment URL: `https://your-app-url.com`

## Known Limitations & Future Work

*   **Scalability:** The current implementation is suitable for a small number of users. Future work will focus on improving scalability to handle a larger user base.
*   **Real-time Tracking:**  Real-time tracking is simulated.  Integration with a real-time tracking API is planned for future versions.
*   **Payment Gateway Integration:**  Currently, there is no payment gateway integration.  Integration with a payment gateway like Stripe or PayPal is planned.
*   **More comprehensive testing:** Expanding the test suite for better coverage of components and services.

## ESLint Configuration

This template comes pre-configured with ESLint to enforce code style and best practices. The configuration is located in `.eslintrc.cjs`.

### Expanding the ESLint Configuration

To expand the ESLint configuration, modify the `.eslintrc.cjs` file. Below is an example of a more comprehensive configuration:

javascript
// .eslintrc.cjs
/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json'], // Specify the path to your tsconfig.json
    tsconfigRootDir: __dirname,
  },
  plugins: ['@typescript-eslint', 'react', 'react-hooks', 'jsx-a11y', 'prettier'],
  rules: {
    'no-unused-vars': 'warn',
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    'prettier/prettier': 'error',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
};
You can also install [`eslint-plugin-react-x`](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [`eslint-plugin-react-dom`](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

1.  Install the plugins:

    javascript
    // eslint.config.js
    /** @type {import("eslint").Linter.Config} */
    module.exports = {
      extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
        'plugin:jsx-a11y/recommended',
        'prettier',
        'plugin:react-x/recommended', // Add this line
        'plugin:react-dom/recommended', // Add this line
      ],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: ['./tsconfig.json'], // Specify the path to your tsconfig.json
        tsconfigRootDir: __dirname,
      },
      plugins: ['@typescript-eslint', 'react', 'react-hooks', 'jsx-a11y', 'prettier', 'react-x', 'react-dom'], // Add 'react-x' and 'react-dom'
      rules: {
        'no-unused-vars': 'warn',
        'react/react-in-jsx-scope': 'off',
        'react/prop-types': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        'prettier/prettier': 'error',
      },
      settings: {
        react: {
          version: 'detect',
        },
      },
      env: {
        browser: true,
        es2021: true,
        node: true,
      },
    };
        Run `npm run type-check` to check for TypeScript type errors.

*   **Dependency issues?**

    Try deleting your `node_modules` folder and running `npm install` again. Ensure your Node.js and npm versions are compatible.

## Contributing

>  We welcome contributions to the International Cargo Shipping Platform! Please refer to the `CONTRIBUTING.md` file for guidelines on how to contribute.  Create a `CONTRIBUTING.md` file in the root of the repository and link it here.

## License

>  This project is licensed under the [MIT License](LICENSE).  Create a `LICENSE` file in the root of the repository and link it here.
