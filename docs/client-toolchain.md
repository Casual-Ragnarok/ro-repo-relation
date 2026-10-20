# Warp、RO 助手与逆向工具链

核对日期：2026-10-21。本页补充此前客户端适配和测试服工作的仓库关系；本地分支只是快照。没有提交、推送或启动服务。

## 四个容易混淆的目录

|目录|负责内容|修改落点|
|---|---|---|
|`D:\workspace\Github\WarpEdition`|正在使用的 Warp 适配工程，origin 为 `Casual-Ragnarok/WarpEdition`，当前 `master`|`Scripts/Init`、`Scripts/Patches`、`Scripts/Support`；选项登记在 `Patches/*.yml`|
|`D:\workspace\Github\ragexe-diff`|原胚、保存的会话、密钥检查工具，以及 RO 助手源码；当前 `main`|`diff/Warp`、`py/packet`、`assistant`|
|`D:\workspace\Gitlab\Nemo`|4144/Nemo 的另一套 Diff 实现；当前 `master`|补丁参考在 `Patches`；不是 Warp 的子模块，脚本不能直接照搬|
|`D:\workspace\Github\rea`|EXP-Tools/rea，upstream 为 morluto/rea；当前 `main`|逆向工具本身的源码；用于分析目标 EXE，不保存 Warp 选项配置|

`ragexe-diff/diff/Warp` 与独立的 `WarpEdition` 是两个位置。此次多原胚兼容、2026 补丁适配和全选项报告的维护落点是 **WarpEdition**；RO 助手源码仍在 **ragexe-diff/assistant**。不要因同有 Warp 字样而假定两边自动同步。

## 从原胚到测试客户端

1. 原胚来源目录：`ragexe-diff/diff/Warp/KRO-客户端主程序脱壳 - 原胚`。是否可 Diff 要检查实际 PE、壳和已有改动；文件名不证明是干净官方原胚。
2. 在 `WarpEdition` 修改脚本。`Tools/prepare-client-sessions.py` 准备逐原胚会话，`Sessions/Clients` 保存会话，默认补丁结果在 `Outputs/Patched`。如需输入规范化，应对副本执行并核对哈希，保留原文件。
3. 查 `WarpEdition/Docs/Client-Version-Support.md`；2026-01-07 的边界见 `Docs/2026-01-07-Compatibility.md`。该版本基础会话通过不等于助手或自定义封包密钥已适配。
4. 全选项结果见 `WarpEdition/Docs/Patch-Support/README.md`、每个原胚的 supported/unsupported 清单及 `matrix.csv`。现有报告覆盖 20 个原胚、267 个声明选项（266 个全局加载），为逐项独立测试；这不是可同时全选的组合，也没有证明游戏内运行正确。定位失败应继续分析脚本，不能一概理解成无法修改。
5. 对最终输出运行 `ragexe-diff/py/packet/packet_keys.py`，核对三把封包密钥、文件 MD5 和 Send MD5 Hash 补丁识别结果；具体参数和限制见该目录 README。客户端文件再次改动会改变 MD5。
6. EXE 交给 `casual-ro-client-patch/Ragexe`，助手制品交给其 `Assistant/runtime`，由客户端工程装配到 `R:\RO\02-开发中客户端\CasualRO-2023`。具体发布流程见 [开发与发布](development-and-release.md)。安装目录不是源码仓库。
7. 联服前核对实际 PACKETVER、三把封包密钥和启用时的 MD5 白名单。只更新 ROAssistant.dll 不等于修改 EXE；以实际文件摘要判断是否需更新白名单。

## RO 助手如何跨仓库协作

- `ragexe-diff/assistant` 是 DLL 与 Electron UI 的源码归属。DLL 读取已验证版本的进程内角色状态，经受限交互下发聊天命令；Electron 负责显示和操作界面。详细地址和通信设计以其 README 为准。
- Warp 或 Nemo 的自定义 DLL 选项负责让 EXE 加载 `ROAssistant.dll` 并调用 `AssistantInit`。成功加载 DLL 不代表其他日期原胚的内存结构已经兼容；当前验证基准是 20230809。
- `casual-ro-client-patch/Assistant/runtime` 保存交付制品，不能替代助手源码；构建时需要完整 Electron 目录，不能只复制一个 UI EXE。
- 服务端 `casual-ro-server` 处理 GM 命令和权限；现有命令可直接复用，新增服务端命令才需要改服务端。助手显示按钮不会授予 GM 权限。
- 更新正在加载的客户端 EXE、DLL 或助手运行目录前，先正常退出游戏与助手。构建完成不等于已经安装到开发客户端。

## 登陆器与 RO 助手是两个项目

`ro-patcher` 是独立的 Electron 更新登陆器：检查和下载补丁、展示 JSON 公告、切换主题，然后启动 `_CasualRO.exe`。`ragexe-diff/assistant` 的 Electron UI 配合 DLL 提供游戏中的辅助操作。两者虽然都使用 Electron，源码、制品、配置和运行职责不同，不需要因修改其中一个而重新构建另一个。

`ro-patcher/dist/win-unpacked` 整体部署到客户端的 `ro-patcher/`；助手制品通过 `casual-ro-client-patch/Assistant/runtime` 交付。当前没有证据表明客户端 `package.py` 已自动装配新登陆器。更新链和主题接口见 [登陆器、主题与补丁更新](launcher-and-updates.md)。

Thor 原包位于 `ro-docs` 对应资料目录，是兼容性研究材料。REA 是分析工具，不是新登陆器的运行依赖。已有分析不代表实现了 Thor 皮肤导入、`.thor` 或 GRF 内部合并。

## 测试分支和自定义命令工作区

本机 `git worktree list` 显示：

|工作区|分支|关系|
|---|---|---|
|`D:\workspace\Github\casual-ro-server`|`codex/test-2023`|集成功能的测试分支，测试运行目录见开发与发布文档|
|`D:\workspace\Github\casual-ro-server-custom-commands`|`FEATURE-010-CustomCommands`|同一仓库的独立工作区，共用 Git 对象；origin 同样是 Casual-Ragnarok/casual-ro-server|

`FEATURE-010-CustomCommands` 从 master 开出，收纳 `killnear`；遵守 `CasualRO_Custom_Commands` / `CasualRO_Custom_Commands_Enable` 宏开关，默认关闭，说明位于该分支 `docs/feature/FEATURE-010.md`。与 `FEATURE-008-AutoAttack`、`FEATURE-009-BotPlayer` 分工不同。

测试分支此前曾保存临时 `killnear` 实现。合并独立特性分支前应检查是否仍存在，避免重复注册/定义，并按特性约定启用宏。不要根据工作区存在推断它已经合入 master、已推送，或测试服正运行该版本。

## 维护入口

只修 Warp 适配：改 WarpEdition，记录对应原胚哈希、会话和测试证据。改助手：改 ragexe-diff/assistant，构建后更新客户端发布制品。改自定义指令：改 casual-ro-server 对应特性分支，再合入测试分支验证。Nemo 和 rea 是参考/分析工具，除非修它们自身，否则不用同步修改。

## 2004 旧客户端与 PRE 分支

旧版资料仓库、实际安装目录、Nemo/REA、图形兼容 DLL 与服务端 `codex/pre-renewal` 的关系见 [2004 客户端与 PRE 服务端](legacy-2004.md)。它使用独立的 `output/pre2004` 工作流，不能与本文 2023 客户端、助手及打包流程混用。历史 `bot-player` 启动方式已迁移，执行前以对应分支的说明为准。
