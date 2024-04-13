<template>
    <div v-for="item in log" style="width: 100%;">
        <var-space direction="column">
            {{ item }}
        </var-space>
    </div>
</template>

<script setup>
const log = useState("log", () => [`[${(new Date).toLocaleString()}]init log`]);
</script>