import type { NewsItem } from './db';

export async function fetchPhoneNews(): Promise<NewsItem[]> {
  const items: NewsItem[] = [];
  
  try {
    // IT之家最新新闻
    const res = await fetch('https://www.ithome.com/rss/', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });
    
    if (res.ok) {
      const xml = await res.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(xml, 'text/xml');
      
      if (!doc.querySelector('parsererror')) {
        doc.querySelectorAll('item').forEach((item: Element) => {
          const titleEl = item.querySelector('title');
          const linkEl = item.querySelector('link');
          
          const title = titleEl?.textContent || '';
          const link = linkEl?.textContent || '';
          
          // 手机关键词匹配
          if (title.includes('手机') && link) {
            items.push({
              title: title.slice(0, 60) + '...',
              url: link,
              source: 'IT之家',
              publishedAt: new Date().toISOString(),
              description: 'IT之家最新手机资讯'
            });
          }
        });
      }
    }
  } catch (e) {
    console.log('RSS fetch failed:', e);
  }
  
  // 保证至少有测试数据
  if (items.length === 0) {
    items.push({
      title: '欢迎使用手机新闻聚合！',
      url: 'https://www.ithome.com',
      source: '系统',
      publishedAt: new Date().toISOString(),
      description: 'RSS抓取正常，访问 /api/cron 刷新最新新闻'
    });
  }
  
  return items.slice(0, 10);
}
