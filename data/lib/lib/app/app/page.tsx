export default function Home() {
  return (
    <main style={{
      padding: 40, maxWidth: 800, margin: '0 auto',
      fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif'
    }}>
      <h1 style={{ color: '#0066cc', marginBottom: 20 }}>
        📱 手机市场新闻聚合
      </h1>
      <div style={{ background: 'white', padding: 30, borderRadius: 12, boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
        <h3>✅ 部署成功！</h3>
        <p><strong>网站功能正常</strong></p>
        <ul>
          <li>Next.js 14 完美运行</li>
          <li>Vercel serverless 环境 OK</li>
          <li>下一步添加 RSS 抓取</li>
        </ul>
        <div style={{ marginTop: 20, padding: 20, background: '#f0f8ff', borderRadius: 8 }}>
          <p><strong>测试新闻：</strong></p>
          <div style={{ margin: 10, padding: 15, border: '1px solid #ddd', borderRadius: 6 }}>
            <strong>华为新机曝光</strong><br/>
            IT之家 • 刚刚
          </div>
        </div>
      </div>
    </main>
  );
}
