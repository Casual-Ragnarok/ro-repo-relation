# 登陆器、主题与补丁更新

核对日期：2026-10-21。依据本次登陆器开发对话及本地源码、README、配置模板和打包脚本；未验证线上部署，也未安装到真实 RO 客户端。

## 先区分三个位置

|位置|用途|
|---|---|
|`D:\workspace\Github\ro-patcher`|Electron 登陆器源码仓库，origin 为 `Casual-Ragnarok/ro-patcher`，本次核对分支为 `main`|
|`ro-patcher/dist/win-unpacked`|构建后的完整 Windows x64 目录包，不能只取其中的 EXE|
|`R:\RO\02-开发中客户端\CasualRO-2023\ro-patcher`|建议安装位置；2022 客户端也应有自己的专用目录。本索引不表示这些目录已经部署|

源码仓库中的 `.runtime/ro-patcher` 是普通开发运行资料，`.demo/client` 和 `.demo/smoke` 是隔离测试产物；都不是正式游戏客户端。

## 与其他仓库的关系

|相关仓库|与登陆器的关系|当前边界|
|---|---|---|
|`casual-ro-client-patch`|生成或装配待发布的 EXE、配置和资源文件；可作为新更新清单的文件来源|尚未自动连接 `py/package.py` 与新清单生成工具；是待人工衔接的制品流，不是已配置的流水线|
|`grf-crypto-mgr`|构建可供客户端使用的完整 GRF；其输出可作为更新文件|资源构建仍归原工程；登陆器仅支持完整文件替换，未实现 GRF 内部合并|
|`ragexe-diff/assistant`|游戏中的 DLL/辅助 UI，交由客户端工程装配|它与启动前更新的登陆器是独立项目；不是同一套 Electron 应用|
|`casual-ro-website`|官网视觉参考与插画来源；默认官网入口|主题素材手动复制，不是源码依赖、Git 子模块或自动同步|
|`ro-docs`|Thor 原版、社区皮肤与开发资料的参考入口|参考资料不等于已实现 Thor 兼容；见登陆器 `docs/THOR-ANALYSIS.md`|
|`cro-patch-grf`|玩家下载说明页，登陆器提供前往它的入口|不等于 `updates.manifestUrl`，未确认承担本版自动更新文件托管|
|`rea`|辅助静态分析 Thor 制品|非运行依赖；已有 PE 资源证据，函数级反编译当时因 provider 未配置而未完成|
|`casual-ro-server`|登陆器最终启动的游戏客户端与其通信|登陆器本身不编译或启动游戏服务端、不修改 PACKETVER、密钥或 MD5 白名单|

## 统一配置和主题

用户明确要求：配置集中维护，不兼容 Thor 原有分散 INI 的读取方式。部署结构如下：

```text
RO客户端/
├── _CasualRO.exe
├── data.grf
└── ro-patcher/
    ├── 开始游戏.exe
    ├── resources/
    ├── config.json
    ├── themes/
    │   ├── casualro-sakura/
    │   └── moonlight/
    ├── state/
    ├── cache/
    ├── backups/
    └── logs/
```

默认游戏目录 `..`、程序 `_CasualRO.exe`、参数 `["-1sak1"]`，相对路径按登陆器专用目录解析。每套客户端单独保存配置及补丁状态，换主题不改变服务器或启动参数。

原生主题接口 v1 为 `theme.json`、`theme.css` 和本地素材，不接受任意 Node.js 脚本。说明见源码仓库 `docs/THEMES.md`，预览图见 `docs/preview-sakura.png` 和 `docs/preview-moonlight.png`。旧 Thor 皮肤自动导入不是首版硬性要求，当前尚未实现。

## 构建、演示与部署

在登陆器源码仓库运行：

```powershell
npm install
npm run demo
```

演示启动本机补丁服务，仅写入 `.demo/client`，不带真实游戏。构建运行 `npm run dist`，把 `dist/win-unpacked` 整体复制为客户端中的 `ro-patcher/`，再配置补丁和公告地址。源码已有 `npm test`、`npm run check`、`npm run smoke` 和 `npm run smoke:packaged`；此前已完成核心测试、真实 Electron 窗口与目录包验证，不能等同于真实 RO 联服验收。

## 更新文件的发布链

```text
客户端装配工程的变更文件 / GRF 工程的完整 GRF 制品
  -> 人工选择此次更新文件，按游戏目录结构准备 patch-files/
  -> ro-patcher/scripts/make-patch.cjs 生成或追加 JSON 清单
  -> 将文件上传到选定的 HTTP(S) 托管目录
  -> 上传清单，客户端 config.json 指向它
  -> 登陆器下载、逐文件 SHA-256 校验、备份、安装、提交进度
  -> 启动 _CasualRO.exe
```

例如在登陆器源码根目录生成新补丁（示例地址不是已部署服务）：

```powershell
node scripts/make-patch.cjs --input ./patch-files --output ./publish/manifest.json --id 1 --channel casualro-2023 --base-url https://example.com/patches/1/ --title "首次更新"
```

清单生成工具不负责上传。公开 OSS、S3 对象、CDN 或普通静态服务器可提供文件 URL，也支持多 HTTP 镜像。公告另行配置 JSON `items` 数据源；官网公告按钮则用浏览器打开配置的页面。

## 已实现和仍待完成

已实现：统一配置、主题切换、JSON 公告、游戏启动、文件下载替换及删除、SHA-256 校验、多镜像、安装事务恢复、清单生成工具。

尚未实现：Thor 皮肤自动导入、`.thor` 解包、GRF 内部增量合并、具体网盘分享解析、断点续传、清单签名、登陆器自身升级。初次接入新清单时会安装全部未记录补丁，需要按客户端基线配置正确频道；不能复用或猜测旧 `upgrade.dat` 状态。

没有证据表明本版补丁清单、公告源或自动上传流水线已在线部署。修改源码、构建成功、目录包验证、安装到真实客户端与上线发布是不同状态。
