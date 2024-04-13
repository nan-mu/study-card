<template>

</template>

<script setup>
import { onMounted } from "vue";
import { Snackbar } from "@varlet/ui";

const active = useState("active_bottom_navigation", () => 2);
const log = useState("log", () => [`[${(new Date).toLocaleString()}]init log`]);

onMounted(async () => {
    let student_id_list = (await useFetch("/api/find", {
        query: { "type": "Student" }
    })).data.value;
});

</script>