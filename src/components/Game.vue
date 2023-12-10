<script lang="ts" setup>
import { onMounted, ref } from "vue";

const props = defineProps<{ url: string }>();

const quote = ref<Quote | null>(null);
const score = ref<number>(0);
const isChecking = ref<boolean>(false);

async function check(guess: string) {
	if (!quote.value || !guess || isChecking.value) {
		return;
	}

    isChecking.value = true;

	const response = await fetch(
		`${props.url}/api/check?id=${quote.value.id}&guess=${guess}`,
	);
	const { answer }: { answer: string } = await response.json();

	const clicked = document.getElementById(guess);
	const correct = document.getElementById(answer);

	if (!clicked || !correct) {
		return;
	}

	if (answer === guess) {
		clicked.style.backgroundColor = "green";
		score.value++;
	} else {
		correct.style.backgroundColor = "green";
		clicked.style.backgroundColor = "red";
		score.value = 0;
	}

	setTimeout(async () => {
		correct.style.backgroundColor = "#23262d";
		clicked.style.backgroundColor = "#23262d";
		quote.value = await fetch(props.url + "/api/random").then((res) =>
			res.json(),
		);

        isChecking.value = false;
	}, 1000);
}

onMounted(async () => {
	quote.value = await fetch(props.url + "/api/random").then((res) =>
		res.json(),
	);
});
</script>

<template>
	<div v-if="quote">
		<div class="quote">
			<div v-if="quote.text">
				{{ quote.text }}
			</div>
			<div v-if="quote.image">
				<img :src="quote.image" />
			</div>
		</div>

		<div class="input-grid">
			<div v-for="p in quote.possible" :id="p" class="input" @click="check(p)">
				{{ p }}
			</div>
		</div>

		<h2>Score: {{ score }}</h2>
	</div>

	<h2 v-else>Loading...</h2>
</template>

<style scoped>
h2 {
	text-align: center;
}

.quote {
	margin-bottom: 2rem;
	border: 1px solid rgba(var(--accent-light), 25%);
	background: linear-gradient(
		rgba(var(--accent-dark), 66%),
		rgba(var(--accent-dark), 33%)
	);
	padding: 1.5rem;
	border-radius: 8px;
	text-align: center;
	white-space: pre-wrap;
}

.input-grid {
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(24ch, 1fr));
	gap: 1rem;
}

.input {
	text-align: center;
	padding: 6px;
	background-color: #23262d;
	border-radius: 7px;
	transition: background-color 0.6s cubic-bezier(0.22, 1, 0.36, 1);
	box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.1);
	cursor: pointer;
}

.input:is(:hover, :focus-within) {
	background-color: #14161a;
}

img {
	max-width: 100%;
	max-height: 400px;
}
</style>
