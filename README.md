![Logo](resource/static/logo.png)

# PT-Manager

**暂时放弃。**

在 Element 和 iView 等国内两个常见的Vue框架进行构建测试中，
遇到很严重的Vue框架和userscript不适应情况。

因为要调用用户脚本管理器提供的GM_xmlHttpRequest方法，所以管理页面中所有元素均应由userscript中脚本渲染完成，
而测试结果均表示 类似Menu的存在子构件的构件 均无法被正常渲染。
疑似Vue组件在 userscript+webpack 的环境下，组件之间的关联被切断，无法正常判断上下文环境。

而不基于Vue的话，
一方面无法有效从 PTPP 借鉴代码，
另一方面，本人曾写过的 `PT-Plugin Rhilip修改版` 也说明了，在传统Web开发环境下，逻辑复杂难以整理，后期维护麻烦。

且本人目前无较多空闲时间，无力具体判定问题，只能放弃。
