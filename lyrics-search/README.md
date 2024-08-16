## Unit Tests

### How to add unit tests to the project

#### 1. Install dependencies

```
npm install --save-dev vitest @testing-library/react @testing-library/jest-dom jsdom
```

#### 2. Update vite.config.js

```
test: {
    environment: 'jsdom',
    setupFiles: ['./test/setup.js'],
    globals: true,
  },
```

#### 3. Update scripts section in package.json

```
    "test": "vitest run",
    "test:watch": "vitest"
```

### 4 Create .spec.jsx or .test.jsx files with unit tests and run test script
