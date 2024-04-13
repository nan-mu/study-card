<template>
    <div v-for="item in log" style="width: 100%;">
        <var-col :offset="1" :span="22">
            <var-cell style="font-size: 0.8em;">
                {{ item }}
            </var-cell>
        </var-col>
    </div>
</template>

<script setup>
const active = useState("active_bottom_navigation", () => 3);
const log = useState("log", () => [`[${(new Date).toLocaleString()}]init log`]);
</script>