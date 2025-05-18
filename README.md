# React Hooks Library

A collection of reusable React hooks built with TypeScript to accelerate your development workflow.

## Installation

```bash
npm install @saif29oct/react-hooks
```

or

```bash
yarn add @saif29oct/react-hooks
```

## Available Hooks

### useLocalStorage

Persist state in localStorage.

```tsx
import { useLocalStorage } from '@saif29oct/react-hooks';

function App() {
  const [name, setName] = useLocalStorage('name', 'Guest');
  
  return (
    <div>
      <input
        type="text"
        value={name}
        onChange={e => setName(e.target.value)}
      />
    </div>
  );
}
```

### useMediaQuery

Respond to media query changes.

```tsx
import { useMediaQuery } from '@saif29oct/react-hooks';

function App() {
  const isMobile = useMediaQuery('(max-width: 768px)');
  
  return (
    <div>
      {isMobile ? 'Mobile View' : 'Desktop View'}
    </div>
  );
}
```

### useDebounce

Debounce rapidly changing values.

```tsx
import { useDebounce } from '@saif29oct/react-hooks';
import { useState, useEffect } from 'react';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  
  useEffect(() => {
    // Search API call here
    console.log('Searching for:', debouncedSearchTerm);
  }, [debouncedSearchTerm]);
  
  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        placeholder="Search..."
      />
    </div>
  );
}
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT
```

## 11. Build the Library

```bash
npm run build
```

## 12. Test Locally (Optional)

To test your library locally before publishing, you can use `npm link`:

```bash
npm link
```

Then in your test project:

```bash
npm link @saif29oct/react-hooks
```

## 13. Publish to npm

When you're ready to publish:

```bash
npm login
```

```bash
npm publish --access=public
```

## 14. Continuous Integration (Optional)

Consider setting up GitHub Actions for CI/CD:

```bash
mkdir -p .github/workflows
```

```bash
touch .github/workflows/publish.yml
```

Add the following to `publish.yml`:

```yaml:.github/workflows/publish.yml
name: Publish Package

on:
  release:
    types: [created]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '16.x'
          registry-url: 'https://registry.npmjs.org/'
      - run: npm ci
      - run: npm run build
      - run: npm publish --access public
        env:
          NODE_AUTH_TOKEN: ${{secrets.NPM_TOKEN}}
