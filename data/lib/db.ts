import fs from 'fs';
import path from 'path';

export type NewsItem = {
  title: string;
  url: string;
  source: string;
  publishedAt: string;
  description: string;
};

const dbPath = path.join(process.cwd(), 'data/news.json');

export function readNews(): NewsItem[] {
  if (!fs.existsSync(dbPath)) return [];
  return JSON.parse(fs.readFileSync(dbPath, 'utf-8')) as NewsItem[];
}

export function saveNews(items: NewsItem[]) {
  fs.mkdirSync(path.dirname(dbPath), { recursive: true });
  fs.writeFileSync(dbPath, JSON.stringify(items, null, 2));
}

export function upsertNews(newItems: NewsItem[]) {
  const old = readNews();
  const map = new Map(old.map(i => [i.url, i]));
  newItems.forEach(i => map.set(i.url, i));
  const merged = Array.from(map.values()).sort((a,b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
  saveNews(merged);
  return merged;
}
