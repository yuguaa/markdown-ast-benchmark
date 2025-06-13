import { describe, bench } from 'vitest'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import { marked } from 'marked'
import MarkdownIt from 'markdown-it'
import md from '../test.md?raw'
const processor = unified().use(remarkParse)
const mdt = new MarkdownIt({
  html: true,
  breaks: true,
  linkify: true,
  typographer: true,
  xhtmlOut: true
})

const loop = 100
let markdown
for (let i = 0; i < loop; i++) {
  markdown = markdown ? markdown + md : md
}

describe('marked performance test', () => {
  bench(
    'remark unified解析 ast',
    () => {
      processor.parse(markdown)
    },
    { time: 1000 }
  )
  bench(
    'marked 解析',
    () => {
      marked.lexer(markdown)
    },
    { time: 1000 }
  )
  bench(
    'markdown-it token 属性提取',
    () => {
      const tokens = mdt.parse(markdown, {})
      tokens.map(token => ({
        type: token.type,
        tag: token.tag,
        content: token.content,
        nesting: token.nesting
      }))
    },
    { time: 1000 }
  )
})
