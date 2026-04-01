export default async function Home() {
  const res = await fetch(`${process.env.VERCEL_URL}/api/news`);
  const {items} = await res.json();
  return (
    <div style={{padding:'20px', maxWidth:'800px', margin:'auto'}}>
      <h1>📱 手机新闻</h1>
      {items.map((n:any,i:number)=>
        <div key={i} style={{border:'1px solid #eee', padding:'15px', margin:'10px 0'}}>
          <h3><a href={n.url} target="_blank">{n.title}</a></h3>
          <p>{n.source} - {new Date(n.publishedAt).toLocaleString()}</p>
        </div>
      )}
    </div>
  );
}
