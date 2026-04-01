export default function HomePage() {
  return (
    <html>
      <head>
        <title>手机新闻 - Cindy</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body style={{
        margin: 0,
        padding: 0,
        fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{
          background: 'rgba(255,255,255,0.95)',
          padding: '60px 40px',
          borderRadius: '24px',
          boxShadow: '0 25px 50px rgba(0,0,0,0.15)',
          maxWidth: '600px',
          textAlign: 'center',
          backdropFilter: 'blur(10px)'
        }}>
          <h1 style={{
            fontSize: '2.8em',
            background: 'linear-gradient(45deg, #ff6b6b, #4ecdc4)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            margin: '0 0 20px 0',
            fontWeight: 800
          }}>
            📱 手机新闻
          </h1>
          
          <div style={{
            background: 'white',
            padding: '30px',
            borderRadius: '16px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
            marginBottom: '30px'
          }}>
            <h3 style={{ color: '#333', marginBottom: 15 }}>✅ 部署成功！</h3>
            <p style={{ color: '#666', lineHeight: 1.6 }}>
              <strong>cindyhu198810</strong> 的<br/>
              Next.js + Vercel 手机新闻聚合器
            </p>
          </div>
          
          <div style={{ fontSize: '0.95em', color: '#888' }}>
            <p>步骤1完成：基础环境正常</p>
            <p>下一步：RSS抓取 + 定时任务</p>
          </div>
        </div>
      </body>
    </html>
  );
}
