<template>
    <div v-for="item in log" style="width: 100%;">
        <var-space :offset="1" :span="22">
            {{ item }}
        </var-space>
    </div>
</template>

<script setup>
const log = useState("log", () => [`[${(new Date).toLocaleString()}]init log`]);
</script>