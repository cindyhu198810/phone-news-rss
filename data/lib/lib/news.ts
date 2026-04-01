import type { NewsItem } from './db';

export async function fetchPhoneNews(): Promise<NewsItem[]> {
  const res = await fetch('https://www.ithome.com/rss/');
  const xml = await res.text();
  const parser = new DOMParser();
  const doc = parser.parseFromString(xml, 'text/xml');
  
  return Array.from(doc.querySelectorAll('item'))
    .map(item => ({
      title: item.querySelector('title')?.textContent || '',
      url: item.querySelector('link')?.textContent || '',
      source: 'IT之家',
      publishedAt: item.querySelector('pubDate')?.textContent || new Date().toISOString(),
      description: item.querySelector('description')?.textContent?.slice(0, 200) || ''
    }))
    .filter(i => i.title.includes('手机'))
    .slice(0, 10);
}
