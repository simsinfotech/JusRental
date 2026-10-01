import { NextRequest, NextResponse } from 'next/server';

function generateFallbackSeo(data: {
  title?: string;
  location?: string;
  area?: string;
  bhk?: string | number;
  type?: string;
  furnished?: string;
  price?: string | number;
  description?: string;
}) {
  const bhkStr = data.bhk ? `${data.bhk} BHK` : '';
  const typeStr = data.type || 'Apartment';
  const locStr = data.area || data.location || 'Bangalore';
  const priceStr = data.price ? `₹${Number(data.price).toLocaleString('en-IN')}/mo` : '';

  // Title max 60 chars
  let seoTitle = `${bhkStr} ${typeStr} for Rent in ${locStr}`.trim();
  if (data.furnished) seoTitle += ` (${data.furnished})`;
  if (seoTitle.length > 60) {
    seoTitle = `${bhkStr} ${typeStr} for Rent in ${locStr}`;
  }
  if (seoTitle.length > 60) {
    seoTitle = seoTitle.slice(0, 57) + '...';
  }

  // Description max 160 chars
  let seoDescription = `Spacious ${bhkStr} ${typeStr.toLowerCase()} for rent in ${locStr}, Bangalore. ${data.furnished ? `${data.furnished}. ` : ''}${priceStr ? `Rent: ${priceStr}. ` : ''}Contact now for viewing!`.trim();
  if (seoDescription.length > 160) {
    seoDescription = seoDescription.slice(0, 157) + '...';
  }

  // Keywords
  const keywordsArr = [
    `${bhkStr} for rent in ${locStr}`,
    `${typeStr.toLowerCase()} for rent ${locStr}`,
    `house for rent in ${locStr}`,
    `flat for rent ${locStr} bangalore`,
    `${data.furnished ? data.furnished.toLowerCase() + ' apartment' : 'rental house'}`,
    `jusrental ${locStr}`,
    `rent house in ${locStr}`
  ].filter(Boolean);

  const seoKeywords = keywordsArr.join(', ');

  return { seoTitle, seoDescription, seoKeywords };
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, location, area, bhk, type, furnished, price, description } = body;

    const apiKey = process.env.DEEPSEEK_API_KEY;

    if (apiKey) {
      const prompt = `You are an SEO expert for rental property listings in Bangalore, India. Generate optimized SEO content for this property:

Title: ${title || 'N/A'}
Location: ${location || 'N/A'}
Area: ${area || 'N/A'}
BHK: ${bhk || 'N/A'}
Type: ${type || 'N/A'}
Furnished: ${furnished || 'N/A'}
Rent: ₹${price || 'N/A'}/month
Description: ${description || 'N/A'}

Return a JSON object with exactly these keys:
- "seoTitle": An SEO-optimized page title (max 60 characters). Include BHK, property type, area/location, and "for Rent" naturally. Use high-traffic rental search terms.
- "seoDescription": A compelling meta description (max 160 characters). Mention key features, location, rent, and a call-to-action. Use keywords people search when looking for rentals.
- "seoKeywords": 10-15 comma-separated high-traffic keywords relevant to this rental listing. Include location variants, property type terms, and common rental search phrases.

Return ONLY the raw JSON object, no markdown, no code fences, no explanation.`;

      try {
        const response = await fetch('https://api.deepseek.com/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model: 'deepseek-chat',
            max_tokens: 512,
            messages: [{ role: 'user', content: prompt }],
          }),
        });

        if (response.ok) {
          const data = await response.json();
          const text = data.choices?.[0]?.message?.content || '';
          const cleanedText = text.replace(/```json/g, '').replace(/```/g, '').trim();
          const parsed = JSON.parse(cleanedText);

          if (parsed.seoTitle || parsed.seoDescription || parsed.seoKeywords) {
            return NextResponse.json({
              seoTitle: parsed.seoTitle || '',
              seoDescription: parsed.seoDescription || '',
              seoKeywords: parsed.seoKeywords || '',
            });
          }
        }
      } catch (err) {
        console.warn('DeepSeek AI API call failed, falling back to algorithmic SEO generator:', err);
      }
    }

    // Fallback if API key missing or DeepSeek failed
    const fallback = generateFallbackSeo(body);
    return NextResponse.json(fallback);
  } catch (err: unknown) {
    console.error('SEO suggest error:', err);
    const message = err instanceof Error ? err.message : 'Failed to generate SEO suggestions';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
