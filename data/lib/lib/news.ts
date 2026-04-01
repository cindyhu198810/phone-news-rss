import type { NewsItem } from './db';

const RSS_SOURCES = [
  { name: 'IT之家', url: 'https://www.ithome.com/rss/' },
  { name: '36氪', url: 'https://36kr.com/feed' },
  { name: '极客公园', url: 'https://www.geekpark.net/feed' },
  { name: '雷锋网', url: 'https://www.leiphone.com/rss.xml' },
  { name: '钛媒体', url: 'https://www.tmtpost.com/feed' }
];

const PHONE_KEYWORDS = ['手机', '智能手机', 'iPhone', '华为', '小米', 'OPPO', 'vivo', '安卓', 'iOS', '折叠屏', '屏幕', '芯片', '处理器', '出货量', '销量'];

export async function fetchPhoneNews(): Promise<NewsItem[]> {
  const allItems: NewsItem[] = [];

  for (const source of RSS_SOURCES) {
    try {
      const res = await fetch(source.url, { 
        cache: 'no-store',
        headers: { 'User-Agent': 'Mozilla/5.0 (compatible; NewsBot/1.0)' }
      });
      
      if (!res.ok) continue;
      
      const xmlText = await res.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(xmlText, 'text/xml');
      
      if (doc.querySelector('parsererror')) continue;

      const items = doc.querySelectorAll('item');
      items.forEach((item: Element) => {
        const titleEl = item.querySelector('title');
        const linkEl = item.querySelector('link');
        const descEl = item.querySelector('description');
        const pubDateEl = item.querySelector('pubDate') || item.querySelector('dc\\:date');

        const title = titleEl?.textContent?.trim() || '';
        const link = linkEl?.textContent?.trim() || '';
        const description = descEl?.textContent?.trim() || '';
        const publishedAt = pubDateEl?.textContent?.trim() || new Date().toISOString();

        if (title && link && PHONE_KEYWORDS.some(kw => title.includes(kw))) {
          allItems.push({
            title: title.slice(0, 100),
            url: link,
            source: source.name,
            publishedAt,
            description: description.slice(0, 200) + '...'
          });
        }
      });
    } catch (error) {
      console.error(`Failed ${source.name}:`, error);
    }
  }

  return allItems
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, 20);
}
