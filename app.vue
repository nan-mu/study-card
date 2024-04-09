<script setup>
import { StyleProvider, Themes } from '@varlet/ui'
import { onMounted, onUnmounted } from 'vue';

const style_value = ref(true);

const updateStyleValue = () => {
    const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    style_value.value = isDarkMode;
    StyleProvider(style_value.value ? Themes.md3Dark : Themes.md3Light);
};

onMounted(() => {
    updateStyleValue();
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', updateStyleValue);
});

onUnmounted(() => {
    updateStyleValue();
    window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', updateStyleValue);
});

function toggle_style_value() {
    style_value.value = !style_value.value;
    StyleProvider(style_value.value ? Themes.md3Dark : Themes.md3Light);
}
</script>

<template>
    <var-app-bar :fixed="true" title="数据库大作业"
        image-linear-gradient="to right top, rgba(29, 68, 147, 0.5) 0%, rgba(74, 198, 170, 0.9) 100%">

        <template #right>
            <var-button class="var-elevation--0" round @click="toggle_style_value()">
                <var-icon :name="style_value ? 'white-balance-sunny' : 'weather-night'" />
            </var-button>
        </template>
    </var-app-bar>
    <br />
    <br />
    <h1>欢迎！</h1>
    <p></p>
    <p>这是一个用nuxt+vue+...构建的网页前端，预计部署在我的树莓派上，应该在交作业期间可以在公网访问。目前实现了以下功能：
    </p>
    <ul class="no-bullet">
        <li>
            <var-checkbox>
                数据库开发
            </var-checkbox>
        </li>
    </ul>
</template>

<style scoped>
ul {
    list-style-type: none;
}
</style>