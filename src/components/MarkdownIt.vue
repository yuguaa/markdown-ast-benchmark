<template>
  <div class="container">
    <h2>MarkdownIt AST</h2>
    <el-row class="json">
      <el-col :span="8" class="json">
        <json-viewer :value="ast" :expand-depth="10"></json-viewer>
      </el-col>
      <el-col :span="16">
        <MarkdownRender :markdown="tip" />
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import MarkdownIt from 'markdown-it';
import MarkdownRender from './MarkdownRender.vue';
const props = defineProps({
  markdown: {
    type: String,
  }
});
const md = new MarkdownIt({
  html: true,
  breaks: true,
  linkify: true,
  typographer: true,
  xhtmlOut: true
});
const ast = md.parse(props.markdown);
const tip = `
| 属性名        | 类型       | 含义                                                                 |
|---------------|------------|----------------------------------------------------------------------|
| \`type\`      | String     | Token 类型，如 \`heading_open\`、\`paragraph_open\`、\`inline\`、\`text\`、\`custom_directive\`。 |
| \`tag\`         | String     | HTML 标签，如 \`h1\`、\`p\`、\`strong\`，为空字符串表示无标签（如 \`inline\`）。 |
| \`content\`     | String     | 文本内容，通常用于 \`inline\` 或 \`text\`，如 \`标题\` 或 \`这是一个段落。\`。 |
| \`children\`    | Array      | 子 token 数组，表示嵌套内容，如 \`inline\` 的子节点（\`text\`、\`strong\`）。 |
| \`level\`       | Number     | 嵌套层级，0 表示顶层，递增表示深度。                               |
| \`attrs\`       | Array      | HTML 属性数组，如 \`[["class", "callout"]]\`，用于渲染 HTML。         |
| \`meta\`        | Object     | 自定义元数据，如 \`{ name: "callout", content: "提示框" }\`。         |
| \`map\`         | Array      | 源代码行号映射，如 \`[1, 2]\`，用于调试。                             |
| \`markup\`      | String     | Markdown 标记，如 \`#\`、\`:::\`。                                      |
| \`nesting\`     | Number     | 嵌套状态，1 表示开始标签，-1 表示结束标签，0 表示自闭合。          |
`
</script>

<style scoped></style>
