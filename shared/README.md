# 随缘仙境共享界面

导航、页脚、二维码、字体和公共主题在本目录维护。发布本仓库后，各接入站点通过稳定 URL 自动取得更新，无需逐仓库复制。

## 接入

放在页面自己的样式、脚本之后：

```html
<link rel="stylesheet" href="https://repos.casualro.top/shared/site.css">
<script defer data-site="docs" src="https://repos.casualro.top/shared/site.js"></script>
```

`data-site` 支持 `docs`、`effects`、`features`、`downloads`、`npcs`、`clients`、`relations`。脚本统一创建页眉、二维码和页脚，并为反馈链接选择对应仓库和当前公开页面地址。

首页仅使用导航：样式改为 `chrome.css`，脚本设置 `data-site="home" data-mode="navigation"`。商城为独立站，不接入本公共主题。

目录型页面另外加载 `catalog.css`，特色页加载 `feature.css`，历史文档加载 `document.css`。这些文件也在本目录统一维护。各仓库仅保留页面功能与专用布局，例如图鉴、特效预览、搜索筛选和关系图绘制。

## 修改位置

| 内容 | 文件 |
| --- | --- |
| 菜单、页脚文案、站点入口、反馈仓库 | `site.js` |
| 颜色、字体、圆角等设计变量 | `tokens.css` |
| 全站主题与通用控件 | `site.css`、`fonts.css` |
| 导航与移动端菜单 | `navigation.css` |
| 页脚与二维码面板 | `community.css`、`wechat.jpg` |
| 资料目录公共皮肤 | `catalog-base.css`、`catalog-skin.css` |
| 特色介绍公共皮肤 | `feature.css` |
| 历史文档公共皮肤 | `document.css` |

资源使用稳定 URL，不绑定提交号或完整性哈希。部署完成并刷新浏览器/CDN 缓存后，各站同步生效。
