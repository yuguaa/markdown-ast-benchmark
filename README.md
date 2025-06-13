# Markdown 解析器 Token 属性汇总

以下是 **Remark**（MDAST）、**Marked** 和 **markdown-it** 三种 Markdown 解析器生成的 token（或节点）的属性及其含义，统一整理为表格，涵盖标准 Markdown 和自定义指令（如 `::callout[内容]`、`:::callout\n内容\n:::`）的属性。

| 解析器       | 属性名        | 类型       | 含义                                                                 |
|--------------|---------------|------------|----------------------------------------------------------------------|
| **Remark**   | `type`        | String     | 节点类型，如 `root`、`heading`、`paragraph`、`text`、`strong`、`list`、`containerDirective`。 |
|              | `children`    | Array      | 子节点数组，表示嵌套内容（如标题中的文本或列表中的列表项）。         |
|              | `value`       | String     | 文本内容，仅用于叶子节点，如 `text` 或 `code`。                     |
|              | `depth`       | Number     | 标题层级，仅用于 `heading`（1 表示 `#`，2 表示 `##`）。             |
|              | `ordered`     | Boolean    | 列表是否有序，仅用于 `list`（`true` 表示有序，`false` 表示无序）。 |
|              | `data`        | Object     | 自定义数据，由插件添加（如 `{ hName: "div", hProperties: { className: "callout" } }`）。 |
|              | `hName`       | String     | HTML 标签名，由插件添加，用于渲染（如 `div`、`span`）。             |
|              | `hProperties` | Object     | HTML 属性对象，由插件添加，如 `{ className: "callout" }`。          |
|              | `position`    | Object     | 源代码位置，包含 `start` 和 `end`（行号、列号）。                   |
|              | `name`        | String     | 自定义指令名称，如 `callout`（来自 `::callout` 或 `:::callout`）。  |
|              | `attributes`  | Object     | 自定义指令属性，如 `{ id: "my-id", class: "alert" }`。              |

| 解析器       | 属性名        | 类型       | 含义                                                                 |
|--------------|---------------|------------|----------------------------------------------------------------------|
| **Marked**   | `type`        | String     | Token 类型，如 `heading`、`paragraph`、`list`、`text`、`strong`、`custom_directive`。 |
|              | `raw`         | String     | 原始 Markdown 文本，如 `# 标题\n` 或 `::callout[提示框]\n`。        |
|              | `text`        | String     | 文本内容，通常是去除了 Markdown 标记的内容。                        |
|              | `tokens`      | Array      | 子 token 数组，表示行内元素（如 `strong`）或块级内容的子节点。      |
|              | `depth`       | Number     | 标题层级，仅用于 `heading`（1 表示 `#`，2 表示 `##`）。             |
|              | `ordered`     | Boolean    | 列表是否有序，仅用于 `list`（`true` 表示有序，`false` 表示无序）。 |
|              | `items`       | Array      | 列表项数组，仅用于 `list`，包含 `list_item` token。                 |
|              | `lang`        | String     | 代码块语言，仅用于 `code`，如 `javascript`。                        |
|              | `name`        | String     | 自定义指令名称，如 `callout`（来自 `::callout` 或 `:::callout`）。  |
|              | `content`     | String     | 自定义指令内容，如 `提示框` 或块级指令的子内容。                    |

| 解析器       | 属性名        | 类型       | 含义                                                                 |
|--------------|---------------|------------|----------------------------------------------------------------------|
| **markdown-it** | `type`      | String     | Token 类型，如 `heading_open`、`paragraph_open`、`inline`、`text`、`custom_directive`。 |
|              | `tag`         | String     | HTML 标签，如 `h1`、`p`、`strong`，为空字符串表示无标签（如 `inline`）。 |
|              | `content`     | String     | 文本内容，通常用于 `inline` 或 `text`，如 `标题` 或 `这是一个段落。`。 |
|              | `children`    | Array      | 子 token 数组，表示嵌套内容，如 `inline` 的子节点（`text`、`strong`）。 |
|              | `level`       | Number     | 嵌套层级，0 表示顶层，递增表示深度。                               |
|              | `attrs`       | Array      | HTML 属性数组，如 `[["class", "callout"]]`，用于渲染 HTML。         |
|              | `meta`        | Object     | 自定义元数据，如 `{ name: "callout", content: "提示框" }`。         |
|              | `map`         | Array      | 源代码行号映射，如 `[1, 2]`，用于调试。                             |
|              | `markup`      | String     | Markdown 标记，如 `#`、`:::`。                                      |
|              | `nesting`     | Number     | 嵌套状态，1 表示开始标签，-1 表示结束标签，0 表示自闭合。          |