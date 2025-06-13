<script setup>
import MarkdownIt from './components/MarkdownIt.vue'
import Remark from './components/Remark.vue'
import Marked from './components/Marked.vue'
import md from './test.md?raw'
const markdown = md;

</script>

<template>
  <el-tabs type="border-card" class="demo-tabs">
    <el-tab-pane label="Remark">
      <Remark :markdown="markdown" />
    </el-tab-pane>
    <el-tab-pane label="Marked">
      <Marked :markdown="markdown" />
    </el-tab-pane>
    <el-tab-pane label="MarkdownIt">
      <MarkdownIt :markdown="markdown" />
    </el-tab-pane>
  </el-tabs>
</template>
<style>
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
}

#app {
  height: 100%;
  overflow: hidden;
}

.demo-tabs {
  background-color: beige;
}

.el-tabs__content {
  height: calc(100vh - 39px);
  overflow: auto;
}

.container {
  height: calc(100vh - 69px);
}

.json {
  height: calc(100% - 66px);
  overflow: auto;
}
</style>