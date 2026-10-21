# RO 仓库关系索引

整理随缘仙境及相关 RO 项目的职责、资源流转和配套关系。

**[查看交互关系图](https://repos.casualro.top/)** · [离线页面](index.html) · [结构化数据](repos.json)

关系图支持功能搜索、分类筛选、上下游高亮和 SVG 导出。点击仓库可查看完整说明、源码地址、站点入口及关系依据。

本仓库同时维护[全站共享导航、页脚和主题](shared/README.md)。其他站点在线引用 `shared/` 的公共资源，统一修改后随本仓库发布；首页仅使用导航，商城保留独立主题。

## 仓库目录

### 服务端与数据

| 仓库 | 职责 |
| --- | --- |
| [casual-ro-server](https://github.com/Casual-Ragnarok/casual-ro-server) | Pandas 基础上的定制服务端与特性分支 |
| [casual-ro-server-docker](https://github.com/Casual-Ragnarok/casual-ro-server-docker) | Pandas 服务端 Docker 构建、部署与配置 |
| [ro-single-server](https://github.com/Casual-Ragnarok/ro-single-server) | eAthena 系旧单机服务端整合包 |

### 客户端与资源

| 仓库 | 职责 |
| --- | --- |
| [casual-ro-client-patch](https://github.com/Casual-Ragnarok/casual-ro-client-patch) | 随缘仙境登录补丁、配置与客户端装配 |
| [ro-patcher](https://github.com/Casual-Ragnarok/ro-patcher) | Electron 更新登陆器、公告与游戏启动 |
| [ragexe-diff](https://github.com/Casual-Ragnarok/ragexe-diff) | Ragexe DIFF 教程、原胚与 RO 助手源码 |
| [grf-crypto-mgr](https://github.com/Casual-Ragnarok/grf-crypto-mgr) | GRF 加解密、内存提取与素材合包 |
| [ro-grf-res](https://github.com/Casual-Ragnarok/ro-grf-res) | GRF 素材分类与资源配置逆向推导 |
| [ragnarok-clients](https://github.com/Casual-Ragnarok/ragnarok-clients) · [站点](https://casual-ragnarok.github.io/ragnarok-clients/) | 历年 RO 客户端资源与下载来源索引 |
| [ro-single-client](https://github.com/Casual-Ragnarok/ro-single-client) | 旧单机版客户端登录与汉化补丁 |
| [RO-GRF](https://huggingface.co/datasets/EXPM02/RO-GRF) | GRF 图档与客户端素材资源仓库 |

### 网站与内容

| 仓库 | 职责 |
| --- | --- |
| [casual-ro-website](https://github.com/Casual-Ragnarok/casual-ro-website) · [站点](https://casualro.top/) | 官网首页与商城、资料、补丁导航 |
| [casual-ro-feature-showcase](https://github.com/Casual-Ragnarok/casual-ro-feature-showcase) · [站点](https://feature.casualro.top/) | 玩家向特色介绍与 PokeWorld 公开图鉴 |
| [ro-docs](https://github.com/Casual-Ragnarok/ro-docs) · [站点](https://docs.casualro.top/) | RO 开发运营资料与工具归档 |
| [cro-patch-grf](https://github.com/Casual-Ragnarok/cro-patch-grf) · [站点](https://grf.casualro.top/) | 已加密 GRF 下载列表与加载指引 |
| [hexo-store](https://github.com/Casual-Ragnarok/hexo-store) · [站点](https://store.casualro.top/) | Hexo NPC 脚本商城与索引生成 |
| [ro-npcs](https://github.com/Casual-Ragnarok/ro-npcs) · [站点](https://npc.casualro.top/) | NPC 脚本清单静态发布副本 |
| [ro-repo-relation](https://github.com/Casual-Ragnarok/ro-repo-relation) · [站点](https://repos.casualro.top/) | RO 仓库职责、关系与流程索引 |
| [FluxCP](https://github.com/Casual-Ragnarok/FluxCP) | 面向 rAthena 的 PHP Web 控制面板 |
| [ro-effects](https://github.com/Casual-Ragnarok/ro-effects) | RO 特效编号与演示清单 |
| [ro-selfsys](https://github.com/Casual-Ragnarok/ro-selftrans) | RO 客户端文本自助翻译平台设计 |

### 工具与外部目标

| 仓库 | 职责 |
| --- | --- |
| [WarpEdition](https://github.com/Casual-Ragnarok/WarpEdition) | RO 客户端 DIFF 工具与补丁脚本定制 |
| [rea](https://github.com/EXP-Tools/rea) · [站点](https://rea.tools/) | 跨二进制、应用与运行时的逆向分析工具 |
| [Nemo](https://gitlab.com/4144/Nemo) | RO 客户端 EXE 补丁工具 |
| [casual-ro-AI-Bot](https://github.com/Casual-Ragnarok/casual-ro-AI-Bot) | 基于 OpenKore 的多账号 Bot 容器管理 |
| [openkore-docker](https://github.com/Casual-Ragnarok/openkore-docker) | OpenKore Docker 封装与运行配置 |
| [openkore](https://github.com/Casual-Ragnarok/openkore) | 跨平台 RO 自定义客户端与自动化助手 |
| [GRFEditor](https://github.com/Casual-Ragnarok/GRFEditor) | GRF / GPF / Thor 格式编辑器与库 |
| [Gepard](https://github.com/Hypercall/Gepard) | Gepard 反作弊绕过研究工程 |
| [RagnarokSDE](https://github.com/Casual-Ragnarok/RagnarokSDE) | RO 服务端数据库文件编辑器 |

## 文件说明

| 文件 | 用途 |
| --- | --- |
| [repos.json](repos.json) | 仓库职责、分类、站点、关联和资料依据 |
| [index.html](index.html) | 可离线使用的交互关系图 |
| [scripts/build-map.mjs](scripts/build-map.mjs) | 校验关系数据，生成页面内嵌数据和远端文档链接 |
| [.github/workflows/pages.yml](.github/workflows/pages.yml) | GitHub Pages 构建与部署 |

## 更新与发布

修改仓库信息或关系时，更新 `repos.json`，然后使用 Node.js 22+ 重新生成页面：

```sh
node scripts/build-map.mjs
```

`diagram_category` 指定分类，`relations[].diagram` 控制连线是否展示，`evidence` 记录依据，`page` 保存站点入口。站点优先使用自定义域名。

提交并推送到 `main` 后，GitHub Actions 自动构建并发布。部署只包含生成后的 HTML，页面使用远端仓库和文档链接。

## 专题文档

- [开发与发布](docs/development-and-release.md)
- [客户端工具链](docs/client-toolchain.md)
- [GRF 资源分类](docs/grf-resource-analysis.md)
- [登陆器与补丁更新](docs/launcher-and-updates.md)
- [网站与 NPC 索引](docs/websites.md)
- [2004 客户端适配](docs/legacy-2004.md)
