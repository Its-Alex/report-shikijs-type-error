import fs from 'node:fs/promises'
import rehypeShikiFromHighlighter from '@shikijs/rehype/core'
import rehypeStringify from 'rehype-stringify'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import { createHighlighterCore } from 'shiki/core'
import { createOnigurumaEngine } from 'shiki/engine/oniguruma'

import { unified } from 'unified'

const highlighter = await createHighlighterCore({
  themes: [
    import('@shikijs/themes/vitesse-light')
  ],
  langs: [
    import('@shikijs/langs/javascript'),
  ],
  engine: createOnigurumaEngine(() => import('shiki/wasm'))
})

const raw = await fs.readFile('./input.md')
await unified()
  .use(remarkParse)
  .use(remarkRehype)
  .use(rehypeShikiFromHighlighter, highlighter, {
    // or `theme` for a single theme
    themes: {
      light: 'vitesse-light',
      dark: 'vitesse-dark',
    }
  })
  .use(rehypeStringify)
  .processSync(raw) // it's also possible to process synchronously