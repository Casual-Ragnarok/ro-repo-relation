# 网站、导航与 NPC 索引发布

核对日期：2026-10-21。以下是项目约定域名与职责；本次未联网验证线上站点。导航相连不代表使用同一个构建系统。

## 页面归属

|页面入口|应修改的工程|关键说明|
|---|---|---|
|`https://casualro.top/`|`casual-ro-website`|官网首页、导航；master 的 Actions 执行 npm 检查/构建并发布 Pages|
|`https://feature.casualro.top/`|`casual-ro-feature-showcase`|特色列表、PokeWorld 详情、独立口袋妖怪图鉴；main 的 Actions 发布 Pages|
|`https://docs.casualro.top/`|`ro-docs/docs`|资料站，公共导航和样式文件在 docs/casualro|
|`https://grf.casualro.top/`|`cro-patch-grf`|GRF/客户端补丁下载介绍页；此处不是 grf-crypto-mgr 的资源构建器|
|`https://npc.casualro.top/`|源模板在 hexo-store；生成页发布到 ro-npcs|先确认具体部署目标，见下一节|
|商城页面|`hexo-store` 的 Hexo 内容和主题|与 NPC 索引不同的页面；商城发布域名由对应环境变量/部署流程配置，不在此猜测|

官网与特色站当前源码都提供：

```powershell
npm run check
npm run build
```

两者的实际构建脚本是 `tools/build.mjs`，不是另造 scripts 目录。Pages 的部署来源与目录设置仍应在 GitHub 仓库设置及 `.github/workflows/pages.yml` 复核。

## hexo-store 与 ro-npcs：源和发布副本

构建关系：

```text
hexo-store/volumes/hexo/source/_posts 下的 NPC 模块资料
  + hexo-store/tpl/summary/html/{index,table,row}.tpl
  + hexo-store/tpl/summary/html/casualro 的公共静态文件
  -> python py/gen_npc_list.py
  -> hexo-store/docs/index.html 和 docs/casualro/
  -> 选定的 ro-npcs 仓库的 docs/
  -> NPC 索引站
```

此生成器还会生成 NPC 清单的 Markdown 内容，调用前应检查当前分支及改动范围。只想更新 NPC 索引时，不必运行商城的完整 Hexo 构建/部署。

核对到的发布分流：

|位置|ro-npcs 目标|
|---|---|
|本地 `D:\workspace\Github\ro-npcs` 的 origin|`Casual-Ragnarok/ro-npcs`|
|hexo-store/.github/workflows/github_deploy_local.yml|`Casual-Ragnarok/ro-npcs`|
|hexo-store/.github/workflows/gitee_deploy.yml 中的 NPC 发布步骤|`Casual-Ragnarok/ro-npcs`|
|hexo-store/.github/workflows/github_deploy_other.yml|`EHakker/ro-npcs`|

前面对 npc.casualro.top 的更新已按 EHakker/ro-npcs 路线处理过；用户曾授权使用已有 EHakker 身份，仅发布 NPC 索引更新。这个历史授权不表示其他仓库也应切换为 EHakker，也不能把 SSH 别名、Git 提交作者和仓库权限视为同一件事。

本地 origin 的仓库身份和实际线上部署目标可能不同。后续必须核对选中的流水线、发布账户、Pages 来源和域名，不能只看本地 ro-npcs 的 origin 或只改其静态生成页。

## 导航、页尾和二维码的同步范围

此前统一过官网、特色站、文档站、GRF 下载页、NPC 索引的导航与页尾，其中新增“特色介绍”。特色站还与首页对齐 favicon 与导航，进入详情/图鉴仍保留返回其他站点的入口。

这是多个仓库中的样式和模板同步，不是一个中央组件仓库自动向所有站点下发。改公共菜单时，应逐站检查，并在 NPC 索引侧先改生成模板，避免下次流水线把手工修正覆盖。

商城自己的页尾保持原主题行为，微信二维码为鼠标悬浮显示；不要因为其他站点页尾固定展示二维码就一起替换商城。只修 NPC 索引不应顺带触发商城全站重构或部署。

## 官网与桌面登陆器的关系

`ro-patcher` 的「樱花来信」「月夜营地」主题参考官网视觉，插画取自 `casualro.top/assets/hero-sakura.png` 与 `assets/promo-night.png`，已复制为本地主题素材。官网更新不会自动更新登陆器的 CSS 或图片。

登陆器示例配置中的官网、资源、文档入口分别指向 `casualro.top`、`grf.casualro.top`、`docs.casualro.top`，这些是外部浏览器导航关系。`announcements.feedUrl` 和 `updates.manifestUrl` 在模板中均为空：公告需要独立配置 JSON 数据源，补丁需要独立配置 JSON 清单，不能因首页或下载页可访问就认定自动更新服务已经部署。

`ro-docs` 的 `docs/01-developer/03-resources/Thor_Patcher/` 保存 Thor 原包与社区皮肤资料，是研究参考，未建立新登陆器对旧皮肤或补丁的自动兼容。详细分工见 [登陆器与更新链](launcher-and-updates.md)。

## 旧域名与旧说明

本机看到 `ro-docs` 和 `ro-npcs` 根目录 CNAME 仍有 `*.ragnarok.buzz`，各自 docs/CNAME 为 `*.casualro.top`。有效入口必须结合实际 Pages 发布目录判断。

特色站 README 还保留过“feature 子域尚未配置”之类的早期说明；不能把这些历史段落当作当前线上状态证据。本关系库记录约定入口，若要验证线上可达性需另行检查 DNS、证书和实际 Pages 配置。
