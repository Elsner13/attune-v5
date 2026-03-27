import { NextResponse } from 'next/server';

export const revalidate = 3600;

export async function GET() {
  try {
    const res = await fetch('https://findthesignal.substack.com/feed', {
      next: { revalidate: 3600 },
      headers: { 'User-Agent': 'Mozilla/5.0' },
    });

    if (!res.ok) throw new Error('Feed fetch failed');

    const xml = await res.text();
    const items: { title: string; date: string; url: string }[] = [];
    const itemRegex = /<item>([\s\S]*?)<\/item>/g;
    let match;

    while ((match = itemRegex.exec(xml)) !== null) {
      const item = match[1];

      const titleMatch =
        item.match(/<title><!\[CDATA\[([\s\S]*?)\]\]><\/title>/) ||
        item.match(/<title>([\s\S]*?)<\/title>/);

      const linkMatch = item.match(/<link>(https?:\/\/[^<\s]+)<\/link>/);

      const dateMatch = item.match(/<pubDate>([\s\S]*?)<\/pubDate>/);

      if (titleMatch && dateMatch) {
        const date = new Date(dateMatch[1].trim());
        items.push({
          title: titleMatch[1].trim(),
          url: linkMatch ? linkMatch[1].trim() : 'https://findthesignal.substack.com',
          date: date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          }).toUpperCase(),
        });
      }

      if (items.length >= 10) break;
    }

    return NextResponse.json(items);
  } catch {
    return NextResponse.json([], { status: 500 });
  }
}
