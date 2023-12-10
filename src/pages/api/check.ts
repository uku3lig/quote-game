import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ request, locals }) => {
	const quotesBucket =
		await locals.runtime.env.QUOTES_BUCKET.get("quotes.json");
	if (!quotesBucket) {
		return new Response(null, { status: 500 });
	}

	const quotes: JsonQuote[] = await quotesBucket.json();
	const params = Object.fromEntries(new URL(request.url).searchParams);

	if (!params.guess) {
		return new Response(JSON.stringify({ error: "guess not set" }), {
			status: 400,
		});
	}

	const quote = quotes[Number(params.id)];
	if (!quote) {
		return new Response(null, { status: 404 });
	}

	return new Response(
		JSON.stringify({
			answer: quote.author,
		}),
	);
};
