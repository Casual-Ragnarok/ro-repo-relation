import { readFileSync, writeFileSync } from 'node:fs';

const root = new URL('../', import.meta.url);
const data = JSON.parse(readFileSync(new URL('repos.json', root), 'utf8').replace(/^\uFEFF/, ''));
const nodes = [...data.repositories, ...data.external_targets].filter(node => node.diagram_category);
const names = new Set(nodes.map(node => node.name));
if (names.size !== nodes.length) throw new Error('关系图存在重名节点');
for (const node of nodes) {
  if (!data.diagram_categories.some(category => category.name === node.diagram_category)) {
    throw new Error(`未知分类：${node.name}`);
  }
  if (!node.role || !node.description || !node.evidence?.length) throw new Error(`缺少说明或依据：${node.name}`);
}
const relations = data.relations.filter(edge => edge.diagram);
for (const edge of relations) {
  if (!names.has(edge.source) || !names.has(edge.target)) throw new Error(`关系端点缺失：${edge.source} → ${edge.target}`);
  if (!edge.label || !edge.evidence?.length) throw new Error(`关系缺少说明或依据：${edge.source} → ${edge.target}`);
}
const file = new URL('index.html', root);
const html = readFileSync(file, 'utf8').replace(/\uFEFF/g, '');
const sources = [...data.repositories, ...data.external_targets]
  .filter(node => node.path && (node.github || node.gitlab || node.url))
  .sort((a, b) => b.path.length - a.path.length);
const normalize = path => path.replaceAll('\\', '/').replace(/\/$/, '');
function publicEvidence(evidence) {
  return evidence.map(item => {
    const path = normalize(item.path);
    const source = sources.find(node => path.toLowerCase().startsWith(normalize(node.path).toLowerCase() + '/'));
    if (!source) throw new Error(`资料依据缺少远端仓库：${item.path}`);
    const relative = path.slice(normalize(source.path).length + 1);
    const base = source.github || source.gitlab || source.url;
    const branch = source.branch_snapshot || 'main';
    const route = source.gitlab ? '/-/blob/' : '/blob/';
    return { url: base + route + branch + '/' + relative.split('/').map(encodeURIComponent).join('/'), label: source.name + '/' + relative };
  });
}
const publicNodes = nodes.map(node => ({
  name: node.name,
  role: node.role,
  description: node.description,
  diagram_category: node.diagram_category,
  branch_snapshot: node.branch_snapshot,
  repository_url: node.github || node.gitlab || node.url,
  page: node.page,
  evidence: publicEvidence(node.evidence),
}));
const publicRelations = relations.map(edge => ({
  source: edge.source, target: edge.target, label: edge.label,
  mode: edge.mode, note: edge.note, evidence: publicEvidence(edge.evidence),
}));
const embedded = JSON.stringify({ verified_date: data.verified_date, categories: data.diagram_categories, nodes: publicNodes, relations: publicRelations }, null, 2).replace(/</g, '\\u003c');
const pattern = /(<script id="repo-data" type="application\/json">)[\s\S]*?(<\/script>)/;
if (!pattern.test(html)) throw new Error('找不到 HTML 数据插入点');
writeFileSync(file, html.replace(pattern, (_, start, end) => start + embedded + end));
console.log(`已生成离线关系图：${nodes.length} 个节点，${relations.length} 条有来源的关系。`);
