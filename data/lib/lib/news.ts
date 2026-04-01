import type { NewsItem } from './db';

export async function fetchPhoneNews(): Promise<NewsItem[]> {
  try {
    // 先用 IT之家测试，稳定可靠
    const res = await fetch('https://www.ithome.com/rss/', {
      headers: { 'User-Agent': 'Mozilla/5.0' }
    });
    
    if (!res.ok) return [];
    
    const xml = await res.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(xml, 'text/xml');
    
    // 检查解析错误
    if (doc.querySelector('parsererror')) return [];
    
    const items: NewsItem[] = [];
    const rssItems = doc.querySelectorAll('item');
    
    rssItems.forEach((item: Element) => {
      const title = item.querySelector('title')?.textContent || '';
      const link = item.querySelector('link')?.textContent || '';
      
      if (title.includes('手机') && link) {
        items.push({
          title: title.slice(0, 80),
          url: link,
          source: 'IT之家',
          publishedAt: new Date().toISOString(),
          description: '来自IT之家的最新手机资讯'
        });
      }
    });
    
    return items.slice(0, 10);
  } catch (error) {
    console.error('RSS fetch failed:', error);
    return []; // 出错返回空数组，不崩
  }
}
