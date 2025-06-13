<template>
  <div class="markdown-body" v-html="html"></div>
</template>

<script setup>
import 'github-markdown-css/github-markdown.css';
import { marked } from 'marked';
const props = defineProps({
  markdown: {
    type: String,
    default: ''
  }
});
const html = marked(props.markdown, {
  gfm: true,
  breaks: true,
  headerIds: false,
  mangle: false,
  pedantic: false,
  smartLists: true,
  smartypants: false
});
</script>

<style lang="less" scoped></style>
