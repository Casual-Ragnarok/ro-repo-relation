# 随缘仙境仓库关系索引

交互关系图：[打开 RO 仓库关联关系图](index.html)。可离线打开，支持按功能查看、搜索仓库、点击查看上下游及导出 SVG。修改 `repos.json` 后运行 `node scripts/build-map.mjs`，重新生成页面内嵌数据，无需安装依赖。

线上入口：[RO 仓库关联关系图](https://casual-ragnarok.github.io/ro-repo-relation/)。资料卡使用远端仓库与文档链接；存在站点时显示站点地址，优先采用已核对的自定义域名。`repos.json` 的 `page` 保存站点信息；翻译平台等未确认站点的项目不猜测地址。HTML 内嵌数据不包含本机绝对路径。

GitHub Pages 使用 `.github/workflows/pages.yml` 从 `main` 构建和部署，仅上传生成后的 `index.html`；首次发布需在仓库 Settings → Pages 将 Source 设为 GitHub Actions。

图中收录 29 个本地项目和 RO-GRF 资源仓库，功能说明以各仓库 README 为主，必要时查阅源码或配置。`diagram_category` 指定图中分类，`relations[].diagram: true` 指定展示的关系，每个节点与连线都附 `evidence`。安装目录、外部运行组件、REA 内部子模块及一次性的皮肤/插画参考不进入图中；`repos.json` 仍保留这些流程上下文，但不作为图中的仓库关联。

记录日期：2026-10-21（Asia/Shanghai）。范围是本次开发对话实际涉及的仓库和本机路径，不是所有 RO 项目的完整清单。仓库路径、origin、当前分支及关键脚本已从本机核对；网站地址是项目约定入口，本次没有联网验证 DNS、线上内容或 Pages 设置。

需要改东西时，先看下面的定位表，再查 [开发与发布流程](docs/development-and-release.md) 或 [网站与 NPC 索引](docs/websites.md)、[Warp、助手与逆向工具链](docs/client-toolchain.md)、[登陆器、主题与补丁更新](docs/launcher-and-updates.md)。GRF 解包资源的分类与配置草稿生成见 [资源分类工具](docs/grf-resource-analysis.md)。可供工具读取的路径和关系见 [repos.json](repos.json)。

## 仓库速查

除特别标注的 Nemo（`D:\workspace\Gitlab\Nemo`）外，下表本地仓库均位于 `D:\workspace\Github`，本地目录名与仓库名相同。

|仓库|负责什么|关键入口或产物|
|---|---|---|
|[casual-ro-server](https://github.com/Casual-Ragnarok/casual-ro-server)|服务端 C++ 源码、特性分支、原生数据库及 NPC|实际开发引擎在 `CasualRO/`；`FEATURE-011-Pokemon`；`codex/test-2023`|
|[casual-ro-server-docker](https://github.com/Casual-Ragnarok/casual-ro-server-docker)|Docker 部署、覆盖配置、自定义数据和开发辅助工具|`docker-compose.yml`、`covers/`、`customs/`、`dev/py/pokemon/`|
|[casual-ro-client-patch](https://github.com/Casual-Ragnarok/casual-ro-client-patch)|客户端补丁装配与发布|`py/package.py`、`Ragexe/`、`data/`、`System/`、`Assistant/`|
|[ro-patcher](https://github.com/Casual-Ragnarok/ro-patcher)|玩家启动游戏前使用的 Electron 更新登陆器；独立于 RO 助手|`src/main.cjs`、`config.example.json`、`themes/`、`scripts/make-patch.cjs`；完整目录包 `dist/win-unpacked`|
|[ragexe-diff](https://github.com/Casual-Ragnarok/ragexe-diff)|原胚、Diff 会话、密钥检查与 RO 助手开发|`diff/Warp/`；`py/packet/packet_keys.py`；`assistant/` 的 DLL 与 Electron UI|
|[WarpEdition](https://github.com/Casual-Ragnarok/WarpEdition)|当前 Warp 补丁脚本适配、逐原胚测试和支持矩阵|`Scripts/`、`Patches/`、`Sessions/Clients/`、`Docs/Patch-Support/`|
|[rea](https://github.com/EXP-Tools/rea)|分析 EXE 的逆向工具工程；辅助定位和验证补丁|上游 `morluto/rea`；不是 RO 客户端或助手运行依赖|
|[Nemo](https://gitlab.com/4144/Nemo)|另一套 Diff 工具和补丁脚本参考|本地 `D:\workspace\Gitlab\Nemo`；`Patches/`、`NEMO.exe`|
|[grf-crypto-mgr](https://github.com/Casual-Ragnarok/grf-crypto-mgr)|GRF 加解密、文件表处理、运行时内存提取和素材合包|`run_playbook.py`、`auto_merge_grf.py`；`RO-GRF/` 资源子模块|
|[ro-grf-res](https://github.com/Casual-Ragnarok/ro-grf-res)|已解包 GRF 素材分类、重复筛查及客户端/服务端配置草稿推导|`py/classify_grf.py`；输入 `res/raw/`，输出 `res/out/`；需人工审核迁移|
|[casual-ro-website](https://github.com/Casual-Ragnarok/casual-ro-website)|官网首页与导航入口|`casualro.top`，`tools/build.mjs`|
|[casual-ro-feature-showcase](https://github.com/Casual-Ragnarok/casual-ro-feature-showcase)|玩家向特色介绍、PokeWorld 玩法介绍及公开名称形态图鉴|README 使用 GitHub Pages 默认入口；`pokeworld/`、`pokeworld/pokedex/`；不存储战斗数据库或原始 GRF|
|[ro-docs](https://github.com/Casual-Ragnarok/ro-docs)|文档、资料与工具目录|`docs.casualro.top`，有效站点内容主要在 `docs/`|
|[cro-patch-grf](https://github.com/Casual-Ragnarok/cro-patch-grf)|玩家访问的 GRF/客户端补丁下载说明页|`grf.casualro.top`，不等同于 GRF 资源构建工程|
|[hexo-store](https://github.com/Casual-Ragnarok/hexo-store)|商城内容、NPC 模块资料与 NPC 索引生成|`py/gen_npc_list.py`、`tpl/summary/html/`、Hexo 发布流程|
|[ro-npcs](https://github.com/Casual-Ragnarok/ro-npcs)|NPC 索引的静态发布副本|本地 origin 指向 Casual-Ragnarok；实际已使用的另一发布目标是 [EHakker/ro-npcs](https://github.com/EHakker/ro-npcs)，详见网站文档|
|[ro-repo-relation](https://github.com/Casual-Ragnarok/ro-repo-relation)|本索引：记录仓库职责、依赖和操作入口|本仓库不承载游戏代码或发布制品|
|[casual-ro-AI-Bot](https://github.com/Casual-Ragnarok/casual-ro-AI-Bot)|现有实现为 OpenKore 多账号配置与容器连接管理|README 标注强化学习；已检查脚本不据此认定训练功能已实现|
|[openkore-docker](https://github.com/Casual-Ragnarok/openkore-docker)|OpenKore 镜像构建、依赖封装、连接与行为配置|`openkore/` 子模块远端为 `OpenKore/openkore`|
|[openkore](https://github.com/Casual-Ragnarok/openkore)|跨平台 RO 自定义客户端与自动化助手的本地 fork|`openkore.pl`；不能当作 Docker 子模块指向的 fork|
|[GRFEditor](https://github.com/Casual-Ragnarok/GRFEditor)|GRF/GPF/Thor 格式编辑器与 GRF 库|随缘仙境定制分支，来源 `Tokeiburu/GRFEditor`|
|[FluxCP](https://github.com/Casual-Ragnarok/FluxCP)|rAthena 的 PHP Web 控制面板与玩家服务|含新闻、工单、排名及日志等功能；区别于静态官网|
|[Gepard](https://github.com/Hypercall/Gepard)|Gepard Bypass 反作弊绕过研究|不是官方防护工程或已集成的服务器防护|
|[ragnarok-clients](https://github.com/Casual-Ragnarok/ragnarok-clients)|按年份、地区、语言整理客户端资源与下载来源|`scripts/generate_pages.py` 生成静态索引；归入客户端与资源|
|[RagnarokSDE](https://github.com/Casual-Ragnarok/RagnarokSDE)|RO 服务端数据库文件编辑器|随缘仙境定制版，来源 `Tokeiburu/RagnarokSDE`|
|[ro-effects](https://github.com/Casual-Ragnarok/ro-effects)|RO 特效编号与演示清单|`effects/list/`；按 ID 区间浏览|
|[ro-selfsys / ro-selftrans](https://github.com/Casual-Ragnarok/ro-selftrans)|客户端文本自助翻译平台设计|本地名 `ro-selfsys`，README 与 origin 为 `ro-selftrans`；设计思路不代表全部功能已实现|
|[ro-single-client](https://github.com/Casual-Ragnarok/ro-single-client)|旧单机版登录与汉化补丁|README 要求搭配 `Ragnarok_KRO_20190306_Lite` 与 `ro-single-server`|
|[ro-single-server](https://github.com/Casual-Ragnarok/ro-single-server)|eAthena 系旧单机服务端整合包|支持本机与联网；属于独立历史链，不是当前 Pandas/CasualRO 源码链|

## 关系图

仅展示有明确依据的 RO 仓库关系。实线包括依赖、产出、配套和站点导航；虚线包括人工流转与工具使用参考，不代表步骤已自动化。

```mermaid
flowchart LR
    subgraph group0["服务端与数据"]
        repo0["casual-ro-server"]
        repo1["casual-ro-server-docker"]
        repo28["ro-single-server"]
    end
    subgraph group1["客户端与资源"]
        repo2["casual-ro-client-patch"]
        repo3["ro-patcher"]
        repo4["ragexe-diff"]
        repo5["grf-crypto-mgr"]
        repo6["ro-grf-res"]
        repo23["ragnarok-clients"]
        repo27["ro-single-client"]
        repo29["RO-GRF"]
    end
    subgraph group2["网站与内容"]
        repo7["casual-ro-website"]
        repo8["casual-ro-feature-showcase"]
        repo9["ro-docs"]
        repo10["cro-patch-grf"]
        repo11["hexo-store"]
        repo12["ro-npcs"]
        repo13["ro-repo-relation"]
        repo21["FluxCP"]
        repo25["ro-effects"]
        repo26["ro-selfsys"]
    end
    subgraph group3["工具与外部目标"]
        repo14["WarpEdition"]
        repo15["rea"]
        repo16["Nemo"]
        repo17["casual-ro-AI-Bot"]
        repo18["openkore-docker"]
        repo19["openkore"]
        repo20["GRFEditor"]
        repo22["Gepard"]
        repo24["RagnarokSDE"]
    end
    repo1 -.->|审核后迁移配置与生成数据| repo0
    repo5 -.->|GRF 与客户端补丁协调发布| repo2
    repo1 -.->|公开图鉴与水印缩略图导出| repo8
    repo11 -->|生成并发布 NPC 脚本索引| repo12
    repo7 -->|网站导航| repo8
    repo4 -.->|原胚与逐版本会话输入| repo14
    repo14 -.->|补丁后的 Ragexe EXE| repo2
    repo4 -.->|RO 助手 DLL / Electron 制品| repo2
    repo2 -.->|手工准备文件与 JSON 清单| repo3
    repo6 -.->|审核后的分类素材| repo5
    repo6 -.->|客户端配置草稿迁移| repo2
    repo6 -.->|服务端 DB / NPC 草稿迁移| repo0
    repo1 -->|配套服务端与客户端补丁| repo2
    repo29 -->|资源子模块 → 素材合包| repo5
    repo16 -.->|DIFF 教程所用的补丁工具| repo4
    repo0 -->|封包版本与数据 ID 契约| repo2
    repo7 -->|网站导航| repo9
    repo7 -->|网站导航| repo10
    repo7 -->|网站导航| repo12
    repo7 -->|导航至脚本商城发布站| repo11
    repo19 -->|封装 OpenKore 上游源码| repo18
    repo18 -->|提供多账号运行所用镜像| repo17
    repo28 -->|历史单机版配套服务端与补丁| repo27
```

## 要改什么，应该去哪里

|需求|首选仓库与后续动作|
|---|---|
|修改口袋妖怪捕获、宠物技能、进化或服务端宏|`casual-ro-server`；生成工具在 `casual-ro-server-docker/dev/py/pokemon`，同步前须审查差异|
|修改服务端镜像部署、挂载或覆盖配置|`casual-ro-server-docker`；本次本地功能测试不需要改服务端镜像|
|修改客户端名称、宠物合成界面、道具说明|`casual-ro-client-patch` 的 Lua/LUB 等配置，然后 `py/package.py`|
|修改客户端 EXE 补丁选项|优先 `WarpEdition/Scripts` 与 `Patches`；原胚保存在 `ragexe-diff/diff/Warp`；生成结果放回客户端 `Ragexe/`，发布并同步服务端 MD5 白名单|
|查看每个原胚哪些补丁可用|`WarpEdition/Docs/Patch-Support/README.md` 与 `matrix.csv`；失败代表当前脚本未通过，不等于不能适配|
|提取最终 EXE 的三把封包密钥、核对文件 MD5|`ragexe-diff/py/packet/packet_keys.py`；MD5 是最终文件摘要，不是第四把封包密钥|
|维护 2004 樱之花嫁客户端或 PRE 联服|先查 [旧客户端适配链](docs/legacy-2004.md)；客户端记录在数据仓库，协议改动在服务端 `codex/pre-renewal`|
|分析原胚或参考另一套 Diff 实现|`rea` 辅助逆向；`D:\workspace\Gitlab\Nemo/Patches` 参考实现；最终修改落到目标工具的脚本|
|修改 RO 助手逻辑或 UI|`ragexe-diff/assistant`；构建制品复制到客户端 `Assistant/runtime`，更新来源与校验清单|
|修改启动前的更新界面、公告或主题|`ro-patcher`；集中配置在安装目录 `ro-patcher/config.json`，主题在 `ro-patcher/themes/`；不是 `ragexe-diff/assistant`|
|发布给登陆器自动下载的补丁|先准备客户端变更文件，再用 `ro-patcher/scripts/make-patch.cjs` 生成清单，上传文件及清单到明确配置的 HTTP(S) 地址；尚未与 `package.py` 自动接通|
|从已解包素材识别资源配套关系、生成初步配置|`ro-grf-res`；先复制输入、核对硬编码路径及 ID 起点；输出需人工审核，详见 [资源分类工具](docs/grf-resource-analysis.md)|
|合并/替换 SPR、ACT、地图或装备图档|`grf-crypto-mgr` 与其 `RO-GRF` 资源；重新构建并确认 `data.ini`|
|修改 PokeWorld 宣传或公开图鉴|`casual-ro-feature-showcase`；不要把服务端数据库或原始 GRF 放进去|
|修改官网首页/导航|`casual-ro-website`|
|修改文档站菜单/页尾|`ro-docs/docs`|
|修改 GRF 下载页菜单/页尾|`cro-patch-grf`|
|修改 NPC 索引菜单/页尾|先改 `hexo-store/tpl/summary/html`，生成后发布到正确的 `ro-npcs`，不要只改生成副本|
|修改商城自身页尾或微信悬浮二维码|`hexo-store` 的商城主题；不要把 NPC 索引页尾直接套到商城|

## 2004 樱之花嫁：另一条独立适配链

本会话还涉及旧客户端数据仓库、实际安装副本和 PRE 协议适配，详见 [2004 客户端与 PRE 服务端](docs/legacy-2004.md)。它不属于上面的 2023 客户端打包链。

|位置或项目|职责|与现有仓库的关系|
|---|---|---|
|[Cherry_Blossom_Bride_FullClient_2004](https://huggingface.co/datasets/EXPM02/Cherry_Blossom_Bride_FullClient_2004)|2004 完整客户端资料、补丁记录和开关脚本；本地位于 `D:\workspace\ro\Cherry_Blossom_Bride_FullClient_2004`|Hugging Face 数据集 Git 仓库，不是 GitHub 项目，也不是 `casual-ro-client-patch` 子目录|
|`R:\RO\04-GF\2004樱之花嫁`|实际运行的旧客户端及图形兼容 DLL|安装目录，不是上述数据仓库的自动同步副本|
|`casual-ro-server` / `codex/pre-renewal`|2004 协议与复兴前规则适配|同一个服务端仓库的分支，不是另一套 GitHub 服务端；当前主工作区仍是 `codex/test-2023`|
|[dgVoodoo2](https://github.com/dege-diosg/dgVoodoo2)|将旧 DirectX 图形调用转换到现代图形接口|旧客户端的运行组件；不是 REA、Nemo 或服务端的子模块|

REA 提供分析证据，Nemo 提供补丁实现参考；补丁记录和可重复开关归入旧客户端数据仓库。PRE 只是规则模式，不会自动把 PACKETVER 改成 2004；服务端分支有独立构建、启动和回退入口。

## 本项目已经明确的约定

- 后续服务端源码开发按现有约定在 `casual-ro-server` 中使用分支。本机还保留此前已创建的 `casual-ro-server-custom-commands` 工作区，它属于同一个 Git 仓库，不是新项目；详见工具链文档。本地测试不改 Docker 服务端镜像。
- 特性源码受宏开关保护，尽量少改引擎，方便后续合并。
- `FEATURE-008` 是 AutoAttack、`FEATURE-009` 是 BotPlayer、`FEATURE-010` 是 CustomCommands；口袋妖怪使用 `FEATURE-011-Pokemon`，主宏 `CasualRO_Pokemon`。
- `codex/test-2023` 是实际已有的测试分支名，口头说的 test-2023 指它，不是另一个名为 test-2023 的分支。
- 不把临时 `.before-*` 备份混入客户端源码或发布包；发布备份放在专用临时目录。
- 仓库内容发生修改不等于已经提交、推送或发布。本索引不承诺这些状态；操作前看 `git status`、分支和对应构建记录。
- `ro-patcher` 首版已有文件替换、完整 GRF 下载替换和主题切换；Thor 皮肤导入、`.thor` 解包、GRF 内部合并、网盘解析和自身升级尚未实现。下载介绍页 `cro-patch-grf` 不等同于已配置的自动更新服务。
- 不记录 `.env` 内容、数据库密码、SSH 私钥、访问令牌或私人运行配置。

## 更新方式

新增仓库或调整构建/发布链时，同时更新本表、对应流程文档和 `repos.json`。分支和本地运行状态会变化，JSON 中的分支是记录日期的快照，执行操作前仍需重新确认。部分仓库 README/CNAME 保留旧域名，不能只根据旧说明判断当前入口。
