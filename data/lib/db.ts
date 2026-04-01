import fs from 'fs';
import path from 'path';

export type NewsItem = {
  title: string;
  url: string;
  source: string;
  publishedAt: string;
  description: string;
};

const dataDir = path.join(process.cwd(), 'data');
const dbPath = path.join(dataDir, 'news.json');

function ensureFile() {
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
  if (!fs.existsSync(dbPath)) fs.writeFileSync(dbPath, '[]', 'utf-8');
}

export function readNews(): NewsItem[] {
  ensureFile();
  return JSON.parse(fs.readFileSync(dbPath, 'utf-8')) as NewsItem[];
}

export function saveNews(items: NewsItem[]) {
  ensureFile();
  fs.writeFileSync(dbPath, JSON.stringify(items, null, 2), 'utf-8');
}

export function upsertNews(newItems: NewsItem[]) {
  const oldItems = readNews();
  const map = new Map<string, NewsItem>();
  for (const item of oldItems) map.set(item.url, item);
  for (const item of newItems) map.set(item.url, item);
  const merged = Array.from(map.values()).sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
  saveNews(merged);
  return merged;
}
