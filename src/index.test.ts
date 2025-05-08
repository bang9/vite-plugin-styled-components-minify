import { describe, expect, it } from 'vitest';
import viteStyledComponentsMinify from './index';

const plugin = viteStyledComponentsMinify() as unknown as {
  transform: (code: string) => { code: string; map: any } | null;
};

describe('viteStyledComponentsMinify', () => {
  it('should minify styled-components template literals', () => {
    const code = `
      import styled from 'styled-components';
      const Button = styled.button\`
        color: red;
        background: blue;
      \`;
    `;

    const result = plugin.transform(code);

    expect(result).not.toBeNull();
    expect(result?.code).toBe(`
      import styled from 'styled-components';
      const Button = styled.button\`color:red;background:blue;\`;
    `);
  });

  it('should minify css template literals', () => {
    const code = `
      import { css } from 'styled-components';
      const styles = css\`
        color: red;
        background: blue;
      \`;
    `;

    const result = plugin.transform(code);

    expect(result).not.toBeNull();
    expect(result?.code).toBe(`
      import { css } from 'styled-components';
      const styles = css\`color:red;background:blue;\`;
    `);
  });

  it('should minify keyframes template literals', () => {
    const code = `
      import { keyframes } from 'styled-components';
      const fadeIn = keyframes\`
        from { opacity: 0; }
        to { opacity: 1; }
      \`;
    `;

    const result = plugin.transform(code);

    expect(result).not.toBeNull();
    expect(result?.code).toBe(`
      import { keyframes } from 'styled-components';
      const fadeIn = keyframes\`from{opacity:0;}to{opacity:1;}\`;
    `);
  });

  it('should minify createGlobalStyle template literals', () => {
    const code = `
      import { createGlobalStyle } from 'styled-components';
      const GlobalStyle = createGlobalStyle\`
        body {
          margin: 0;
          padding: 0;
        }
      \`;
    `;

    const result = plugin.transform(code);

    expect(result).not.toBeNull();
    expect(result?.code).toBe(`
      import { createGlobalStyle } from 'styled-components';
      const GlobalStyle = createGlobalStyle\`body{margin:0;padding:0;}\`;
    `);
  });

  it('should return null if no styled-components template literals are found', () => {
    const code = `
      const message = 'Hello, world!';
    `;

    const result = plugin.transform(code);

    expect(result).toBeNull();
  });

  it('should handle animation properties correctly', () => {
    const code = `
      import styled, { keyframes } from 'styled-components';
      const fadeIn = keyframes\`
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      \`;
      
      const Component = styled.div\`
        animation: \${fadeIn} 0.3s;
      \`;
    `;

    const result = plugin.transform(code);

    expect(result).not.toBeNull();
    expect(result?.code).toBe(`
      import styled, { keyframes } from 'styled-components';
      const fadeIn = keyframes\`from{opacity:0;}to{opacity:1;}\`;
      
      const Component = styled.div\`animation:\${fadeIn} 0.3s;\`;
    `);
  });
});
