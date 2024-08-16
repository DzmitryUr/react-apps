## Unit Tests

### How to add unit tests to the project

#### 1. Install dependencies

```
npm install --save-dev vitest @testing-library/react @testing-library/jest-dom jsdom @vitest/coverage-v8
```

#### 2. Update vite.config.js

```
test: {
    environment: 'jsdom',
    setupFiles: ['./tests/setup.js'],
    globals: true,
  },
```

### 3. Create tests/setup.js

```
import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';

afterEach(() => {
  cleanup();
});
```

#### 4. Update scripts section in package.json

```
    "test": "vitest run",
    "test:watch": "vitest"
```

#### 5. Update .gitignore by adding coverage

#### 6. Create .spec.jsx or .test.jsx files with unit tests and run test script
