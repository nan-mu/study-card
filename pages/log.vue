<template>
    <var-col v-for="item in log" :offset="1" :span="22" width="100%">
        <var-cell :key="item" :title="item" />
    </var-col>
</template>

<script setup>
const active = useState("active_bottom_navigation", () => 3);
const log = useState("log", () => `[${(new Date).toLocaleString()}]init log`);
</script>