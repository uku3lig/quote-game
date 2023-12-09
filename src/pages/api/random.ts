import type { APIRoute } from "astro";

export const GET: APIRoute = async ({locals}) => {
    const quotesBucket = await locals.runtime.env.QUOTES_BUCKET.get('quotes.json');
    if (!quotesBucket) {
        return new Response(null, {status: 500});
    }

    const quotes: JsonQuote[] = await quotesBucket.json();
    const people = new Set(quotes.map(quote => quote.author));

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