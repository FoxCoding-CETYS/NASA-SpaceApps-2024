import { NextResponse } from 'next/server';

// Named export for the GET method
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const latitude = searchParams.get('latitude');
  const longitude = searchParams.get('longitude');

  if (!latitude || !longitude) {
    return NextResponse.json({ error: 'Missing latitude or longitude in query parameters' }, { status: 400 });
  }

  const apiKey = process.env.AZURE_MAPS_API_KEY;
  const apiUrl = `https://atlas.microsoft.com/weather/currentConditions/json?api-version=1.0&query=${latitude},${longitude}&subscription-key=${apiKey}`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Failed to fetch weather data');
    }

    const data = await response.json();
    const weather = data.results[0];
    const humidity = weather.relativeHumidity;
    const temperature = weather.temperature.value;
    const precipitation = weather.precipitationSummary?.past24Hours?.value ?? 0;

    return NextResponse.json({ humidity, temperature, precipitation });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch weather data' }, { status: 500 });
  }
}
