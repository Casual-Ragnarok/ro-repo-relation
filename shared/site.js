/* Shared CasualRO shell. Maintained only in ro-repo-relation/shared. */
(() => {
  const entry=document.currentScript;
  const site=entry.dataset.site || document.body.dataset.page || 'docs';
  const navigationOnly=entry.dataset.mode==='navigation';
  const sites={
    home:{url:'https://casualro.top/',repository:'Casual-Ragnarok/casual-ro-website'},
    docs:{url:'https://docs.casualro.top/',repository:'Casual-Ragnarok/ro-docs'},
    effects:{url:'https://effect.casualro.top/',repository:'Casual-Ragnarok/ro-effects'},
    features:{url:'https://feature.casualro.top/',repository:'Casual-Ragnarok/casual-ro-feature-showcase'},
    downloads:{url:'https://grf.casualro.top/',repository:'Casual-Ragnarok/cro-patch-grf'},
    npcs:{url:'https://npc.casualro.top/',repository:'EHakker/ro-npcs'},
    clients:{url:'https://clients.casualro.top/',repository:'Casual-Ragnarok/ragnarok-clients'},
    relations:{url:'https://repos.casualro.top/',repository:'Casual-Ragnarok/ro-repo-relation'}
  };
  const siteInfo=sites[site] || sites.docs;
  document.body.dataset.page=site;
  if(!navigationOnly)document.body.classList.add('cro-theme');
  function publicPageUrl(){
    if(['localhost','127.0.0.1',''].includes(location.hostname))return siteInfo.url+location.search;
    let path=location.pathname;
    if(location.hostname.endsWith('.github.io')&&!new URL(siteInfo.url).hostname.endsWith('.github.io'))path=path.replace(/^\/[^/]+\//,'/');
    return new URL(path+location.search,siteInfo.url).href;
  }
/* Shared CasualRO navigation. Markup and styling originate in casual-ro-website. */
(() => {
  function initialize() {
    const items = [
      ['home', '首页', 'https://casualro.top/'],
      ['npcs', 'NPC 索引', 'https://npc.casualro.top/'],
      ['store', '脚本商城', 'https://store.casualro.top/'],
      ['docs', '文档资料', 'https://docs.casualro.top/'],
      ['downloads', '补丁下载', 'https://grf.casualro.top/'],
      ['features', '特色介绍', 'https://feature.casualro.top/'],
    ];
    const host = location.hostname.replace(/^www\./, '');
    const active = site;
    let menuNumber = 0;
    function docsMarkup() {
      const menuId = `cro-docs-menu-${++menuNumber}`;
      return `<div class="nav-docs${['docs', 'effects'].includes(active) ? ' is-active' : ''}"><a class="docs-link" href="https://docs.casualro.top/">文档资料</a><button class="nav-toggle" type="button" aria-label="展开文档资料菜单" aria-expanded="false" aria-controls="${menuId}"><svg viewBox="0 0 16 16" width="12" height="12" aria-hidden="true"><path d="m4 6 4 4 4-4" fill="none" stroke="currentColor" stroke-width="1.5"/></svg></button><div class="nav-submenu" id="${menuId}" hidden><a href="https://docs.casualro.top/"${active === 'docs' ? ' aria-current="page"' : ''}><span>文档与工具资料</span><small>开发笔记、运营经验与实用工具</small></a><a href="https://effect.casualro.top/"${active === 'effects' ? ' aria-current="page"' : ''}><span>特效演示清单</span><small>按编号查找 RO 特效与动图</small></a></div></div>`;
    }
    const legacy = document.querySelector('#cro-document-nav');
    let wrapper = document.querySelector('header .nav-wrap');
    const store = document.querySelector('#headNav');
    if (!wrapper && store) {
      // Keep the shop's categories, search, mobile drawer and native theme intact.
      const links = [...store.querySelectorAll('a')].filter(a => /^(文档资料|仙境资料)$/.test(a.textContent.trim()));
      for (const link of links) {
      const holder = document.createElement('div');
      holder.innerHTML = docsMarkup();
      link.replaceWith(holder.firstElementChild);
      }
    } else {
      let header = wrapper?.closest('header') || legacy || document.querySelector('header#header, header.site-header');
      const qr = header?.querySelector('.cro-community-menu');
      if (!header) {
        header = document.createElement('header');
        document.body.prepend(header);
        document.body.classList.add('cro-has-global-nav');
      }
      header.classList.add('cro-global-header');
      const nav = items.map(([id, name, url]) => id === 'docs' ? docsMarkup() : `<a href="${url}"${active === id ? ' aria-current="page"' : ''}${id === 'store' ? ' target="_blank" rel="noopener noreferrer"' : ''}>${name}</a>`).join('');
      header.innerHTML = `<a class="skip" href="#main">跳到主要内容</a><div class="nav-wrap"><a class="brand" href="https://casualro.top/"><span class="brand-mark" aria-hidden="true">✿</span><span>随缘仙境<small>CASUAL RAGNAROK</small></span></a><nav aria-label="主导航">${nav}</nav><span class="nav-note" aria-hidden="true">♡ Have a lovely adventure</span></div>`;
      wrapper = header.querySelector('.nav-wrap');
      if (qr) wrapper.append(qr);
      if (!document.querySelector('#main')) document.querySelector('main')?.setAttribute('id', 'main');
    }
    for (const group of document.querySelectorAll('.nav-docs')) {
    const toggle = group.querySelector('.nav-toggle');
    const submenu = group.querySelector('.nav-submenu');
    let closeTimer;
    function open(value) {
      clearTimeout(closeTimer);
      submenu.hidden = !value;
      toggle.setAttribute('aria-expanded', String(value));
      toggle.setAttribute('aria-label', value ? '收起文档资料菜单' : '展开文档资料菜单');
    }
    toggle.addEventListener('click', event => { event.preventDefault(); event.stopPropagation(); open(submenu.hidden); });
    group.querySelector('.docs-link').addEventListener('pointerenter', event => { if (event.pointerType === 'mouse') open(true); });
    // Touch browsers may blur the toggle and emit pointerleave before the link click.
    // Keep links mounted until their native click can navigate.
    group.addEventListener('pointerenter', () => clearTimeout(closeTimer));
    group.addEventListener('pointerleave', event => {
      if (event.pointerType !== 'mouse') return;
      closeTimer = setTimeout(() => {
        if (!group.contains(document.activeElement)) open(false);
      }, 200);
    });
    document.addEventListener('click', event => { if (!group.contains(event.target)) open(false); });
    document.addEventListener('keydown', event => { if (event.key === 'Escape' && !submenu.hidden) { open(false); toggle.focus(); } });
    }
  }
  // Run after existing deferred scripts have installed their shared header controls.
  if (document.readyState !== 'complete') document.addEventListener('DOMContentLoaded', initialize, { once: true }); else initialize();
})();

(() => {
  const base = new URL('./', entry.src);
  const qr = new URL('wechat.jpg', base).href;
  document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('.cro-global-header .nav-wrap');
    if (header) {
      const menu = document.createElement('details');
      menu.className = 'cro-community-menu';
      menu.innerHTML = `<summary aria-label="关注随缘仙境，显示微信二维码"><svg viewBox="0 0 24 24" width="23" height="23" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d="M5 3h5v5H5zM14 3h5v5h-5zM5 12h5v5H5zM14 12h2v2h3v5h-5v-3M3 21h7M21 3v7"/></svg><span>关注我们</span></summary><div class="cro-community-panel"><img src="${qr}" alt="随缘仙境微信公众号二维码" width="220" height="220"><p>微信扫一扫，冒险路上常相见</p></div>`;
      header.append(menu);
      document.addEventListener('click', event => { if (!menu.contains(event.target)) menu.open = false; });
      document.addEventListener('keydown', event => { if (event.key === 'Escape') menu.open = false; });
    }
    if(navigationOnly)return;
    // Skill trees are absolutely positioned; place their footer below the last skill.
    const section = document.createElement('section');
    section.className = 'cro-community-footer';
    section.setAttribute('aria-label', '关注随缘仙境');
    const feedback = new URL('https://github.com/'+siteInfo.repository+'/issues/new');
    feedback.searchParams.set('title', '[资料反馈] ' + document.title);
    // Share a public document URL, never the visitor's local filesystem path.
    const publicPage = publicPageUrl();
    feedback.searchParams.set('body', '页面：' + document.title + '\n地址：' + publicPage + '\n\n遇到的问题：\n\n期望的结果或补充资料：\n');
    section.innerHTML = `<div class="cro-footer-grid"><div class="cro-footer-about"><small>CASUAL RAGNAROK</small><h2>随缘相遇，一起冒险</h2><p>收集仙境里的灵感，分享冒险路上的经验。<br>开发笔记、实用工具与游戏资源，都在这里慢慢积攒。</p><span>愿每一次传送，都通往喜欢的地方。 ♡</span></div><div class="cro-footer-links"><h3>冒险传送门</h3><a href="https://store.casualro.top/">脚本商城</a><a href="https://npc.casualro.top/">NPC 脚本索引</a><a href="https://docs.casualro.top/">文档与工具资料</a><a href="https://grf.casualro.top/">客户端补丁</a></div><div class="cro-footer-links"><h3>一起完善仙境</h3><a href="${feedback.href.replace(/&/g, '&amp;')}">通过 GitHub 反馈 <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false" style="vertical-align:-3px;flex-shrink:0"><path d="M4 4h16v12H9l-5 4Z"/></svg></a><a class="cro-sitemap" href="https://repos.casualro.top/">站点地图</a><p>发现失效链接或资料错误？<br>前往 GitHub 填写 Issue，<br>页面信息会自动带上。</p></div><div class="cro-footer-qr"><img src="${qr}" alt="微信扫码关注随缘仙境" width="160" height="160"><p>微信扫一扫<br>冒险之外，也常来坐坐</p></div></div><div class="cro-footer-bottom"><span>随缘仙境 · Casual Ragnarok</span><p>历史资料请结合游戏版本使用。转载内容保留原作者署名，游戏名称、图像及相关素材归各自权利人所有。</p></div>`;
    if (document.body.classList.contains('cro-simulator')) {
      const bottom = Math.max(...Array.from(document.querySelectorAll('table.job, table.quest'), el => el.offsetTop + el.offsetHeight), 1000);
      section.style.position = 'absolute'; section.style.top = `${bottom + 50}px`; section.style.left = '0'; section.style.right = '0';
    }
    const footer = document.querySelector('footer#footer, body > footer');
    if (footer) footer.replaceWith(section); else document.body.append(section);
  });
})();

})();
