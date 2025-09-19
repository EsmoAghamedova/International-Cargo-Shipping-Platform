# International Cargo Shipping Platform

## Project Overview

The International Cargo Shipping Platform is a modern web application built with **React**, **TypeScript**, and **Vite** to streamline and manage international cargo shipping processes. It provides a user-friendly interface for managing shipments, tracking cargo, and handling related logistics.

This project leverages cutting-edge technologies to deliver a seamless and efficient experience for both administrators and users.

---

## Screenshots

> Add screenshots or GIFs to showcase the application's user interface and key features.

Example:

![Dashboard Screenshot](path/to/dashboard.png)
*The main dashboard providing an overview of ongoing shipments.*

![Shipment Tracking](path/to/tracking.gif)
*Real-time tracking of cargo shipments.*

---

## Tech Stack

- **Frontend:** [React](https://reactjs.org/), [TypeScript](https://www.typescriptlang.org/)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Styling:** [Styled Components](https://styled-components.com/)
- **State Management:** [Zustand](https://github.com/pmndrs/zustand), [React Query](https://tanstack.com/query/latest)
- **Routing:** [React Router](https://reactrouter.com/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Utilities:** [uuid](https://github.com/uuidjs/uuid)
- **Linting & Formatting:** [ESLint](https://eslint.org/), [Prettier](https://prettier.io/)
- **Testing:** [Vitest](https://vitest.dev/)

---

## Getting Started

### Prerequisites

- **Node.js:** v18 or higher ([Download](https://nodejs.org/))
- **npm**, **Yarn**, or **pnpm** (npm comes bundled with Node.js)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/EsmoAghamedova/International-Cargo-Shipping-Platform.git
   cd International-Cargo-Shipping-Platform
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set environment variables:**  
   Create a `.env` file in the root directory and specify your backend API URL:
   ```
   VITE_API_BASE_URL=https://api.example.com
   ```

### Scripts

The following scripts are defined in `package.json`:

| Command            | Description                                                   |
|--------------------|---------------------------------------------------------------|
| `dev`              | Run development server                                        |
| `host`             | Run dev server with host mode for network access              |
| `build`            | Build the app for production (`tsc -b` + Vite)                |
| `lint`             | Run ESLint for code style checks                              |
| `lint:fix`         | Run ESLint and auto-fix issues                                |
| `preview`          | Preview the production build locally                          |
| `format`           | Format code using Prettier                                    |
| `type-check`       | Type-check with TypeScript (no output files)                  |
| `test`             | Run Vitest unit tests                                         |
| `test:ci`          | Run Vitest tests in CI mode                                   |

---

## Folder Structure

- **Mock Data:**  
  Located in `src/mockData`. Each file represents an entity (e.g., `shipments.ts`, `customers.ts`).  
  To extend, add entries to these arrays or create new files for new entities.

- **Services:**  
  In `src/services`, handles API calls (using `fetch` or `axios`).

- **Store:**  
  State management via `Zustand` in `src/store`.

- **Query:**  
  Asynchronous state management with React Query.

---

## Pricing Algorithm

The platform calculates shipping costs based on:

- **Weight:** Cargo weight (kg)
- **Distance:** Distance (km)
- **Cargo Type:** Rate varies for general, fragile, hazardous, etc.

**Formula:**  
`Shipping Cost = (Weight * Distance * Cargo Type Rate) + Base Fee`

**Assumptions:**

- Fuel costs are constant
- Currency exchange rates use current market rates

---

## CI/CD & Deployment

This project uses **GitHub Actions** for CI/CD.  
Workflow is defined in `.github/workflows/deploy.yml` and auto-deploys to [Netlify](https://www.netlify.com/) on pushes to `main`.

**Deployment URL:**  
`https://your-app-url.com`  
*(Replace with your live URL)*

---

## Known Limitations & Future Work

- Scalability improvements for large user bases
- Real-time tracking API integration
- Payment gateway integration (e.g., Stripe, PayPal)
- Expanded test suite for better coverage

---

## ESLint Configuration

ESLint is pre-configured in `.eslintrc.cjs`.

**To extend configuration:**

```js
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
    ecmaFeatures: { jsx: true },
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json'],
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
  settings: { react: { version: 'detect' } },
  env: { browser: true, es2021: true, node: true },
};
```

**Additional plugins:**  
- [`eslint-plugin-react-x`](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x)
- [`eslint-plugin-react-dom`](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom)

**Type-check:**  
```bash
npm run type-check
```

---

## Troubleshooting

- If you encounter dependency issues, delete `node_modules` and reinstall dependencies:
  ```bash
  rm -rf node_modules
  npm install
  ```
- Ensure Node.js and npm versions are compatible.

---

## Contributing

We welcome contributions!  
See [`CONTRIBUTING.md`](CONTRIBUTING.md) for guidelines.

---

## License

This project is licensed under the [MIT License](LICENSE).

---

*For questions or feedback, please open an issue or contact the maintainer.*