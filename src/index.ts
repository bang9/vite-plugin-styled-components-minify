import MagicString from 'magic-string';
import { Plugin } from 'vite';

// @ts-expect-error
import { minifyRaw } from 'babel-plugin-styled-components/lib/minify/index.js';

interface TransformResult {
  code: string;
  map: any;
}

export default function viteStyledComponentsMinify(): Plugin {
  return {
    name: 'vite-plugin-styled-components-minify',
    transform(code: string): TransformResult | null {
      const s = new MagicString(code);

      const regex = /(\bstyled\s*(?:\.\w+|\(\w+\))|css|keyframes|createGlobalStyle)\s*`([^`]+)`/g;

      let match;
      let replacedSomething = false;

      while ((match = regex.exec(code)) !== null) {
        replacedSomething = true;

        const fullMatch = match[0];
        const matchedTag = match[1];
        const templateContent = match[2];

        const [compressed] = minifyRaw(templateContent);

        const start = match.index + matchedTag.length;
        const end = start + (fullMatch.length - matchedTag.length);

        const newChunk = `\`${compressed}\``;
        s.overwrite(start, end, newChunk);
      }

      if (replacedSomething) {
        return {
          code: s.toString(),
          map: s.generateMap({ hires: true }),
        };
      }
      return null;
    },
  };
}
