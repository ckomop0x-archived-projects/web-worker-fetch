import { Comlink } from './node_modules/comlinkjs/comlink.es6.js';

const worker = new Worker('./node_modules/comlink-fetch/src/fetch.worker.js');

const proxy = Comlink.proxy(worker);
const $page1 = document.getElementById('page1');
const $page2 = document.getElementById('page2');

async function getSecondaryInfo() {
  const API = await new proxy.Fetch;

  API.setBaseUrl("https://jsonplaceholder.typicode.com/");
  API.setDefaultHeaders({ 'Content-Type': 'application/json' });
  API.setDefaultBody({ lang: 'en' });

  let page1 = API.get('posts/1');
  let page2 = API.get('posts/2');

  const fetchedPage1 = await page1
  const fetchedPage2 = await page2
  $page1.innerHTML = fetchedPage1.title
  $page2.innerHTML = fetchedPage2.title
}

getSecondaryInfo();
