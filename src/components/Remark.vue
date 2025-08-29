<template>
  <div class="container">
    <h2>Remark AST</h2>
    <el-row class="json">
      <el-col :span="4" class="json">
        <json-viewer :value="ast" :expand-depth="10"></json-viewer>
      </el-col>
      <el-col :span="4" class="json">
        <json-viewer :value="hast" :expand-depth="10"></json-viewer>
      </el-col>
      <el-col :span="16">
        <MarkdownRender :markdown="tip" />
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import rehypeRaw from 'rehype-raw'
import remarkRehype from 'remark-rehype'
import MarkdownRender from './MarkdownRender.vue'
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize'
import remarkGfm from 'remark-gfm'
import remarkBreaks from 'remark-breaks'
const props = defineProps({
  markdown: {
    type: String
  }
})

// 创建处理器
const processor = unified()
  .use(remarkParse)
  .use(remarkGfm) // 支持 GFM 语法
  .use(remarkBreaks)
  .use(remarkRehype, {
    allowDangerousHtml: true
  })
  .use(rehypeRaw)
  // .use([rehypeSanitize])

// 解析为 AST
const ast = processor.parse(props.markdown)
const hast = processor.runSync(ast);
console.log(`🚀 ~ hast:`, hast)

const tip = `
|属性名        | 类型       | 含义                                                                 |
|--------------|------------|----------------------------------------------------------------------|
|\`type\`        | String     | 节点类型，如 \`root\`、\`heading\`、\`paragraph\`、\`text\`、\`strong\`、\`list\`、\`containerDirective\`。 |
|\`children\`    | Array      | 子节点数组，表示嵌套内容（如标题中的文本或列表中的列表项）。         |
|\`value\`       | String     | 文本内容，仅用于叶子节点，如 \`text\` 或 \`code\`。                     |
|\`depth\`       | Number     | 标题层级，仅用于 \`heading\`（1 表示 \`#\`，2 表示 \`##\`）。             |
|\`ordered\`     | Boolean    | 列表是否有序，仅用于 \`list\`（\`true\` 表示有序，\`false\` 表示无序）。 |
|\`data\`        | Object     | 自定义数据，由插件添加（如 \`{ hName: "div", hProperties: { className: "callout" } }\`）。 |
|\`hName\`       | String     | HTML 标签名，由插件添加，用于渲染（如 \`div\`、\`span\`）。             |
|\`hProperties\` | Object     | HTML 属性对象，由插件添加，如 \`{ className: "callout" }\`。          |
|\`position\`    | Object     | 源代码位置，包含 \`start\` 和 \`end\`（行号、列号）。                   |
|\`name\`        | String     | 自定义指令名称，如 \`callout\`（来自 \`::callout\` 或 \`:::callout\`）。  |
|\`attributes\`  | Object     | 自定义指令属性，如 \`{ id: "my-id", class: "alert" }\`。              |
`
</script>

<style scoped></style>
