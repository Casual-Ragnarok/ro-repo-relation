import assert from 'node:assert/strict';
import {readFile,readdir,access} from 'node:fs/promises';
import {resolve,dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
import {Script} from 'node:vm';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'../shared');
for(const file of await readdir(root)){
  if(!file.endsWith('.css'))continue;
  const css=await readFile(resolve(root,file),'utf8');
  for(const [,url] of css.matchAll(/@import\s+url\(['"]([^'"]+)['"]\)/g)){
    const target=resolve(root,url);assert(target.startsWith(root+'/')||target.startsWith(root+'\\'),'Import must stay in shared/');await access(target);
  }
}
new Script(await readFile(resolve(root,'site.js'),'utf8'));
assert((await readFile(resolve(root,'wechat.jpg'))).length>1000,'QR image missing');
const workflow=await readFile(resolve(root,'../.github/workflows/pages.yml'),'utf8');
assert(workflow.includes('cp -R shared _site/shared'),'Shared assets must be published');
console.log('Shared CSS imports, JavaScript syntax, QR image and deployment contents are valid.');
