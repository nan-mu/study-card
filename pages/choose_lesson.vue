<template>
    <p>{{ get_data }}</p>
</template>

<script setup>
import { onMounted } from "vue";
// import { Snackbar } from '@varlet/ui'
const get_data = ref("");
onMounted(async () => {
    let buffer = await useFetch('/api/choose_lesson');
    // get_data.value = buffer.data.value;
    let buffer2 = await useFetch("/api/get_by_key", {
        query: { "key": buffer.data.value[2] }
    });
    get_data.value = buffer2.data.value;
})
</script>