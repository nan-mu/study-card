<template>

</template>

<script setup>
import { onMounted } from "vue";
import { Snackbar } from "@varlet/ui";

const active = useState("active_bottom_navigation", () => 2);
const log = useState("log", () => [`[${(new Date).toLocaleString()}]init log`]);

</script>