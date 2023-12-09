import type { APIRoute } from "astro";

import quotes from '../../data/quotes.json';

const people = new Set(quotes.map(quote => quote.author));

export const GET: APIRoute = async () => {
    const i = Math.floor(Math.random() * quotes.length);
    const quote = quotes[i];

    let random_people = Array.from(people).sort(() => Math.random() - 0.5).slice(0, 6);

    if (!random_people.includes(quote.author)) {
        random_people[Math.floor(Math.random() * random_people.length)] = quote.author;
    }

    return new Response(JSON.stringify({
        text: quote.quote,
        image: quote.image,
        possible: random_people,
        id: i
    }));
};