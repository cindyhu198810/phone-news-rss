import { fetchPhoneNews } from '@/lib/news';
import { upsertNews } from '@/lib/db';
export const dynamic = 'force-dynamic';
export async function GET() {
  const items = await fetchPhoneNews();
  upsertNews(items);
  return Response.json({success: true, count: items.length});
}
