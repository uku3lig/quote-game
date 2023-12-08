<script lang="ts" setup>
import { onMounted, ref } from 'vue';

interface Quote {
    text?: string;
    image?: string;
    id: number;
}

const props = defineProps<{ url: string }>();

const quote = ref<Quote | null>(null);
const people = ref<string[] | null>(null);

const score = ref<number>(0);
const selected = ref<string | null>(null);

async function check() {
    if (!quote.value || !selected.value) {
        return;
    }

    const response = await fetch(`${props.url}/api/check?id=${quote.value.id}&guess=${selected.value}`);

    if (response.ok) {
        const result = await response.json();
        if (result.correct) {
            score.value++;
        } else {
            alert(`Et non! Cette citation vient de ${result.answer}. Ton score était ${score.value}`);
            score.value = 0;
        }
    } else {
        alert("le site il est tout cassé :(");
        console.log(response);
    }

    quote.value = await fetch(props.url + "/api/random").then((res) => res.json());
}

onMounted(async () => {
    quote.value = await fetch(props.url + "/api/random").then((res) => res.json());
    people.value = await fetch(props.url + "/api/people").then((res) => res.json());
})
</script>

<template>
    <div v-if="quote && people">
        <p class="quote">
        <div v-if="quote.text">
            {{ quote.text }}
        </div>
        <div v-if="quote.image">
            <img :src="quote.image" />
        </div>
        </p>

        <div class="input">
            <select v-model="selected" class="input-select">
                <option v-for="p in people" :value="p">{{ p }}</option>
            </select>
            <br />
            <button @click="check">Check</button>
        </div>

        <p class="input">Score: {{ score }}</p>
    </div>

    <p v-else class="quote">Loading...</p>
</template>

<style scoped>
.quote {
    margin-bottom: 2rem;
    border: 1px solid rgba(var(--accent-light), 25%);
    background: linear-gradient(rgba(var(--accent-dark), 66%),
            rgba(var(--accent-dark), 33%));
    padding: 1.5rem;
    border-radius: 8px;
    text-align: center;
    white-space: pre-wrap;
}

.input {
    text-align: center;
    padding: 6px;
    background-color: #23262d;
    background-image: none;
    border-radius: 7px;
    background-position: 100%;
    transition: background-position 0.6s cubic-bezier(0.22, 1, 0.36, 1);
    box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.1);
}

img {
    max-width: 100%;
    max-height: 400px;
}
</style>