/// <reference types="astro/client" />

type R2Bucket = import("@cloudflare/workers-types/experimental").R2Bucket;
type ENV = {
	QUOTES_BUCKET: R2Bucket;
};

type Runtime = import("@astrojs/cloudflare").AdvancedRuntime<ENV>;

declare namespace App {
	interface Locals extends Runtime {
		user: {
			name: string;
			surname: string;
		};
	}
}

type Quote = {
	text?: string;
	image?: string;
	possible: string[];
	id: number;
};

type JsonQuote = {
	quote?: string;
	image?: string;
	author: string;
	date: string;
};
