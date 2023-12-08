import type { APIRoute } from "astro";

import quotes from '../../data/quotes.json';

export const GET: APIRoute = async () => {
    const i = Math.floor(Math.random() * quotes.length);
    const quote = quotes[i];

    return new Response(JSON.stringify({
        text: quote.quote,
        image: quote.image,
        id: i
    }));
};