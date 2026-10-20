# 游戏开发、资源与本地测试

核对日期：2026-10-21。相对路径均以各自仓库根目录为准。

## 服务端源码和 Docker 工程

`D:\workspace\Github\casual-ro-server\CasualRO` 是本轮功能开发与 Windows 测试的引擎目录；仓库内 `Pandas` 是上游基线子模块，不要因为它也有服务端源码就直接在那里启动或修改。本地源码仓库的 `.gitmodules` 指向 `Casual-Ragnarok/Pandas`。

`casual-ro-server-docker` 是部署和覆盖配置工程：Compose 的游戏容器使用现有服务端镜像，`covers/` 与 `customs/` 挂载到容器，启动前覆盖对应配置；MySQL 使用 `ro-db` 容器。本次测试使用本机编译的三服务程序连接它，不是重新构建 Docker 游戏镜像。

口袋妖怪生成脚本在 Docker 工程的 `dev/py/pokemon/`，涉及物种资料、资源映射、魔物数值、技能喊话、宠物捕获和进化等。生成结果曾迁移到源码工程 `CasualRO/db/EPs/`、`db/import/`、`npc/custom/EPs/pokemon/`。生成、源码配置、运行副本是三个位置，不能假设改其中一个就自动同步另外两个。

## 分支与本地测试目录

|位置|用途|
|---|---|
|`casual-ro-server` 的 `FEATURE-011-Pokemon`|口袋妖怪特性分支，宏 `CasualRO_Pokemon`|
|`casual-ro-server` 的 `codex/test-2023`|集成后的 2023 本地测试分支|
|`CasualRO/rAthena.sln`|实际编译解决方案|
|`bin/build-test2023.ps1`|编译登录、角色、地图服务的入口|
|`bin/start-test2023.ps1`|启动测试服并按最终客户端刷新 MD5 白名单|
|`output/test2023/build/bin`|本地编译产物|
|`output/test2023/runtime`|运行副本、数据库/NPC 副本及日志；不是源码目录的自动链接|
|`output/test2023/local.json`|本地数据库/客户端定位配置，不应公开其中私人配置|

在服务端源码仓库根目录运行：

```powershell
git branch --show-current
.\bin\build-test2023.ps1
.\bin\start-test2023.ps1
```

先确认当前分支是需要测试的分支。启动脚本会检查在线角色，并重启同一运行目录下的三服务；不能把它当作只读状态检查。配置修改还须同步运行副本；本轮此前采用逐个文件备份、审查后复制，不直接覆盖全部本地私有配置。

停止本地测试服时，只停止该 runtime 目录的 `map-server.exe`、`char-server.exe`、`login-server.exe`；此前“停止服务”的操作保留了数据库容器，不代表永远停止或启动数据库。历史运行状态不是实时状态。

## 客户端与助手

最终开发客户端：`R:\RO\02-开发中客户端\CasualRO-2023`。这是安装目录，不是 Git 仓库。

当前 EXE 补丁脚本适配工程是 `WarpEdition`；`ragexe-diff/diff/Warp` 保存原胚和会话资料，`ragexe-diff/assistant` 保存助手源码。四者与 Nemo、rea 的分工见 [客户端工具链](client-toolchain.md)。最终 EXE 放入客户端仓库的 `Ragexe/{打包版本}_CasualRO.exe`，`py/package.py` 选择它，发布时复制为 `_CasualRO.exe`。

RO 助手的源码与构建入口在 `ragexe-diff/assistant`：

- Win32/x86 DLL：`assistant/build/Release/ROAssistant.dll`。
- Electron UI 完整发布目录：`assistant/electron/dist/ROAssistantUI/`，其中含前台辅助 EXE、资源与运行库。
- 客户端仓库保存发布制品于 `Assistant/runtime/`，来源说明为 `Assistant/README.md`，SHA256 清单为 `Assistant/manifest.json`。这些大制品使用 Git LFS；克隆后须 `git lfs pull`。
- 助手原胚兼容性由实际 PE/运行时特征决定，不能只看文件名中的日期。打包附带文件不等于 EXE 已导入 DLL。
- Warp 的 Use Custom DLL 通过 YAML 配置多 DLL/函数；Use Custom dll in simple way 直接填写单个 DLL 与函数。它们不同时使用；RO 助手导出是 `ROAssistant.dll` / `AssistantInit`。
- 原版助手只验证了 20230809 原胚；沿用客户端仓库 `20230817` 的文件名并不能证明它是另一已适配原胚。

客户端仓库根目录的发布命令：

```powershell
python py/package.py -y 20230817 -s 127.0.0.1 -k 0 -t "R:\RO\02-开发中客户端\CasualRO-2023"
```

该命令重新生成补丁并覆盖目标目录；助手集成会保留目标现有 `ROAssistant.ini`。客户端 EXE 改动后必须同步服务端 MD5 白名单。服务端 PACKETVER 也必须与实际客户端协议适配，不以补丁文件名替代核对。

## 玩家启动前的补丁更新

`casual-ro-client-patch` 的装配发布与 `ro-patcher` 的运行时更新属于两段流程：前者准备客户端配置、EXE 和资源制品，后者从配置的清单地址下载已经发布的文件，并校验、安装、记录补丁编号后启动游戏。

新登陆器由 `D:\workspace\Github\ro-patcher` 构建，完整目录包部署为客户端下的 `ro-patcher/`。`config.json`、`themes/`、`state/`、`cache/`、`backups/`、`logs/` 集中在此目录；源码仓库与客户端里的同名安装目录不是同一个位置。

目前二者未自动接通：不能假定 `py/package.py` 会生成新登陆器的 JSON 清单，也不能直接将 `.thor` 交给它。准备好的客户端变更文件可手动交给 `ro-patcher/scripts/make-patch.cjs` 生成清单，再上传文件与清单；资源工程生成的完整 GRF 也可以这样替换，但不支持 GRF 内部增量合并。详细命令、基线和边界见 [登陆器与更新链](launcher-and-updates.md)。

本次登陆器验证使用项目内演示客户端与替身游戏程序；不能据此标记 R: 下的真实客户端已完成安装或联服验收。

## GRF 的来源、构建与加载

`grf-crypto-mgr/RO-GRF` 是资源子模块，远程为 Hugging Face 数据集 `EXPM02/RO-GRF`，不是另一个同名 GitHub 代码仓库。GRF 工具代码和大型资源的版本管理、获取权限需要分别检查。

本轮口袋妖怪资源目录：`D:\workspace\Github\grf-crypto-mgr\RO-GRF\series\byGameAnime`。

|文件|用途|
|---|---|
|`pokemon.original-20261018.grf`|原包备份，不加载|
|`pokemon_merged.grf`|实际使用的口袋妖怪魔物外观合并包|
|`pokemon_world.grf`|地图与依赖资源整理包，不能因为存在就假设地图已启用|
|`pokemon_equipment.grf`|额外装备资源整理包，不能因为存在就假设道具已绑定|

原始 PokeRO 补充资源位于 `R:\RO\tmp\PokeRO` 一带，不是 Git 仓库；其中编号不可靠，不能直接把原编号当全国图鉴编号。实际资源命名统一全国图鉴编号与可辨认形态后缀。

此前开发客户端的加载顺序为：

```ini
[Data]
0=cfg.grf
1=pokemon_merged.grf
7=casualro.grf
8=rdata.grf
9=data.grf
```

需要区分：`package.py` 生成 `cfg.grf` 和客户端配置补丁；完整外观 GRF 由资源工程管理。此前本地发布还使用 Docker 工程 `tmp/client-publish/` 的临时包装脚本，额外附带 `pokemon_merged.grf`、设置上述加载项、备份并校验目标文件。**直接运行基础 package.py 不代表会自动重做这些临时包装步骤。**发布前检查源 `data.ini`、目标 `data.ini` 及外观 GRF 是否均正确。

## 口袋妖怪对外展示

历史预览位于 Docker 工程 `tmp/pokemon-merge/preview/index.html`，属于本地分析产物。对外正式特色介绍在 `casual-ro-feature-showcase`。

允许公开的是经授权的低分辨率、加水印缩略图及名称/形态检索信息。不要把原始 GRF、SPR/ACT、服务端源码、数据库、NPC 脚本或内部映射原样发布到展示站。

## 2004 旧客户端与 PRE 分支

旧版资料仓库、实际安装目录、Nemo/REA、图形兼容 DLL 与服务端 `codex/pre-renewal` 的关系见 [2004 客户端与 PRE 服务端](legacy-2004.md)。它使用独立的 `output/pre2004` 工作流，不能与本文 2023 客户端、助手及打包流程混用。历史 `bot-player` 启动方式已迁移，执行前以对应分支的说明为准。
