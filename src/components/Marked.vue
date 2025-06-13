<template>
  <div class="container">
    <h2>Marked AST</h2>
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
import { marked } from 'marked';
import MarkdownRender from './MarkdownRender.vue';
const props = defineProps({
  markdown: {
    type: String,
  }
});

const ast = marked.lexer(props.markdown);
const tip = `
|属性名        | 类型       | 含义                                                                 |
|--------------|------------|----------------------------------------------------------------------|
|\`type\`        | String     | Token 类型，如 \`heading\`、\`paragraph\`、\`list\`、\`text\`、\`strong\`、\`custom_directive\`。 |
|\`raw\`         | String     | 原始 Markdown 文本，如 \`# 标题\` 或 \`::callout[提示框]\`。        |
|\`text\`        | String     | 文本内容，通常是去除了 Markdown 标记的内容。                        |
|\`tokens\`      | Array      | 子 token 数组，表示行内元素（如 \`strong\`）或块级内容的子节点。      |
|\`depth\`       | Number     | 标题层级，仅用于 \`heading\`（1 表示 \`#\`，2 表示 \`##\`）。             |
|\`ordered\`     | Boolean    | 列表是否有序，仅用于 \`list\`（\`true\` 表示有序，\`false\` 表示无序）。 |
|\`items\`       | Array      | 列表项数组，仅用于 \`list\`，包含 \`list_item\` token。                 |
|\`lang\`        | String     | 代码块语言，仅用于 \`code\`，如 \`javascript\`。                        |
|\`name\`        | String     | 自定义指令名称，如 \`callout\`（来自 \`::callout\` 或 \`:::callout\`）。  |
|\`content\`     | String     | 自定义指令内容，如 \`提示框\` 或块级指令的子内容。                    |
`
</script>

<style scoped></style>
