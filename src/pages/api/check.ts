import type { APIRoute } from "astro";

import quotes from '../../data/quotes.json';

export const GET: APIRoute = async ({request}) => {
    const params = Object.fromEntries(new URL(request.url).searchParams);

    if (!params.guess) {
        return new Response(JSON.stringify({error: "guess not set"}), {status: 400});
    }

    const quote = quotes[Number(params.id)];
    if (!quote) {
        return new Response(null, {status: 404});
    }
    
    return new Response(JSON.stringify({
        correct: quote.author === params.guess,
        answer: quote.author
    }));
}