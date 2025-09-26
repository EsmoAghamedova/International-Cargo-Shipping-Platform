# International Cargo Shipping Platform

## Project Overview

The International Cargo Shipping Platform is a modern web application built with **React**, **TypeScript**, and **Vite** to streamline and manage international cargo shipping processes. It provides a user-friendly interface for managing shipments, tracking cargo, and handling related logistics.

This project leverages cutting-edge technologies to deliver a seamless and efficient experience for both administrators and users.

---

## Screen Shots

### 🚢 Home & Auth page
<img width="500" height="300" alt="image" src="https://github.com/user-attachments/assets/aea3ae60-1fd3-47c6-9642-315011404959" />
<img width="500" height="300" alt="image" src="https://github.com/user-attachments/assets/a2165d90-5c6e-4045-9cfb-ebf9cfac71ae" />
<img width="500" height="300" alt="image" src="https://github.com/user-attachments/assets/82bf996c-3a27-4f79-addd-abc7938b1521" />
<img width="500" height="300" alt="image" src="https://github.com/user-attachments/assets/0fd0541e-4cfa-4187-9cd9-3be3157bb922" />
<img width="500" height="300" alt="image" src="https://github.com/user-attachments/assets/1390933d-40be-4a56-b7ec-da882ad0cbac" />

### 👩‍🦱Client Side
<img width="500" height="300" alt="image" src="https://github.com/user-attachments/assets/910492a3-4088-4ba0-8480-55ccafa982d9" />
<img width="500" height="300" alt="image" src="https://github.com/user-attachments/assets/04abd69f-3c59-4100-9cec-636ca21c8a0c" />
</br>

```Create Requst Stepper Design```

</br>
<img width="500" height="300" alt="image" src="https://github.com/user-attachments/assets/a19c4816-35c2-4af8-b07b-aeaac5d0aca7" />
<img width="500" height="300" alt="image" src="https://github.com/user-attachments/assets/7c496d28-08cc-4646-acbf-aff2e459b49f" />
<img width="500" height="300" alt="image" src="https://github.com/user-attachments/assets/9d7d2f5c-ae57-44e3-a7b0-a16c3273bd6f" />
<img width="500" height="300" alt="image" src="https://github.com/user-attachments/assets/6cda858f-d6c0-4d11-b200-9bd25eeb42e4" />
<img width="500" height="300" alt="image" src="https://github.com/user-attachments/assets/8557e1db-7863-4779-a0f4-cd09ae523766" />
<img width="500" height="300" alt="image" src="https://github.com/user-attachments/assets/a0df75fc-efad-45cb-8934-979f4e7337dc" />


### 🧑‍💼Company Side
<img width="500" height="300" alt="image" src="https://github.com/user-attachments/assets/e849deb3-25ef-4ca3-bf30-6b83f7da62da" />
<img width="500" height="300" alt="image" src="https://github.com/user-attachments/assets/bd0f2d97-fb26-4c2f-9c9b-da9eef1d24ab" />
<img width="500" height="300" alt="image" src="https://github.com/user-attachments/assets/013e53d6-48bf-4202-9745-bce209d6300d" />
<img width="500" height="300" alt="image" src="https://github.com/user-attachments/assets/bc6ffc11-2b38-4441-b022-9070b30038e1" />

### 📱Responsie design examples
<img width="200" height="400" alt="image" src="https://github.com/user-attachments/assets/add144d6-7aba-4574-9ba4-3464c9cca1e4" />
<img width="200" height="400" alt="image" src="https://github.com/user-attachments/assets/b06d0c39-db87-43f2-b52c-c5061abb3179" />
<img width="200" height="400" alt="image" src="https://github.com/user-attachments/assets/489bfe19-3bca-43a4-b7a4-337ee83fe03a" />
<img width="200" height="400" alt="image" src="https://github.com/user-attachments/assets/33b70329-1495-41a9-8317-857f2480490b" />


---

## Tech Stack

- **Frontend:** [React](https://reactjs.org/), [TypeScript](https://www.typescriptlang.org/)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Styling:** [Styled Components](https://styled-components.com/), [Windi CSS](https://windicss.org)
- **State Management:** [Zustand](https://github.com/pmndrs/zustand)
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

| Command      | Description                                      |
| ------------ | ------------------------------------------------ |
| `dev`        | Run development server                           |
| `host`       | Run dev server with host mode for network access |
| `build`      | Build the app for production (`tsc -b` + Vite)   |
| `lint`       | Run ESLint for code style checks                 |
| `lint:fix`   | Run ESLint and auto-fix issues                   |
| `preview`    | Preview the production build locally             |
| `format`     | Format code using Prettier                       |
| `type-check` | Type-check with TypeScript (no output files)     |
| `test`       | Run Vitest unit tests                            |
| `test:ci`    | Run Vitest tests in CI mode                      |

---

## Folder Structure

- **Mock Data:**  
  Located in `src/mockData`. Each file represents an entity (e.g., `shipments.ts`, `customers.ts`).  
  To extend, add entries to these arrays or create new files for new entities.

- **Services:**  
  In `src/services`, handles API calls (using `fetch` or `axios`).

- **Store:**  
  State management via `Zustand` in `src/store`.

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

[https://esmoaghamedova.github.io/International-Cargo-Shipping-Platform/](https://esmoaghamedova.github.io/International-Cargo-Shipping-Platform/)

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
  plugins: [
    '@typescript-eslint',
    'react',
    'react-hooks',
    'jsx-a11y',
    'prettier',
  ],
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

_For questions or feedback, please open an issue or contact the maintainer._
