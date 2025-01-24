# vite-plugin-styled-components-minify

A Vite plugin to minify `styled-components` template literals.

## Installation

Install the plugin using your package manager of choice:

```sh
pnpm add -D vite-plugin-styled-components-minify
```

## Usage

Add the plugin to your Vite configuration:

```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import viteStyledComponentsMinify from 'vite-plugin-styled-components-minify';

export default defineConfig({
  plugins: [viteStyledComponentsMinify()],
});
```

## Example

Before minification:

```typescript
import styled from 'styled-components';

const Button = styled.button`
  color: red;
  background: blue;
`;
```

After minification:

```typescript
import styled from 'styled-components';

const Button = styled.button`color:red;background:blue;`;
```

## Tests

Run the tests using Vitest:

```sh
pnpm test
```

## License

This project is licensed under the MIT License.
