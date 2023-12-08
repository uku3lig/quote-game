import type { APIRoute } from "astro";

import quotes from '../../data/quotes.json';

export const GET: APIRoute = async () => {
    const people = new Set(quotes.map(quote => quote.author));
    const peopleArr = Array.from(people);
    peopleArr.sort();

    return new Response(JSON.stringify(peopleArr));
};