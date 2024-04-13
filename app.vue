<script setup>
import { StyleProvider, Themes } from '@varlet/ui'
import { onMounted, onUnmounted } from 'vue';
import { Snackbar } from "@varlet/ui";

const style_value = useState("style_value", () => true);
const active = useState("active_bottom_navigation", () => 0);
const left = ref(false);
const router = useRouter();
const log = useState("log", () => [`[${(new Date).toLocaleString()}]init log`]);
const login = useState("login", () => { return { "id": "", "islogin": false, "name": "" } });

/// 根据系统亮暗主题设置主题
const updateStyleValue = () => {
    const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    style_value.value = isDarkMode;
    StyleProvider(style_value.value ? Themes.md3Dark : Themes.md3Light);
};

/// 监听系统亮暗主题变化
onMounted(() => {
    updateStyleValue();
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', updateStyleValue);

    const route = useRoute();
    switch (route.path) {
        case "/log":
            active.value = 3;
            break;
        case "/student_info":
            active.value = 2;
            break;
        case "/choose_lesson":
            active.value = 1;
            break;
        case "/":
            active.value = 0;
            break;
        default:
            break;
    }
});

/// 注销监听系统亮暗主题变化
onUnmounted(() => {
    updateStyleValue();
    window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', updateStyleValue);
});

/// 切换主题
function toggle_style_value() {
    style_value.value = !style_value.value;
    log.value.push(`[${(new Date).toLocaleString()}]切换主题为${style_value.value ? "暗色" : "亮色"}`)
    StyleProvider(style_value.value ? Themes.md3Dark : Themes.md3Light);
}

/// 路由切换函数
const switch_page = (page) => {
    // Snackbar("切换页面：" + page);
    // 根据传入的页面参数进行路由切换
    switch (page) {
        case 0:
            // 执行首页路由切换逻辑
            router.push('/');
            log.value.push(`[${(new Date).toLocaleString()}]跳转到/`);
            break;
        case 1:
            // 执行选课路由切换逻辑
            router.push('/choose_lesson');
            log.value.push(`[${(new Date).toLocaleString()}]跳转到/course_lesson`);
            break;
        case 2:
            // 执行学生信息路由切换逻辑
            router.push('/student_info');
            log.value.push(`[${(new Date).toLocaleString()}]跳转到/student_info`);
            break;
        case 3:
            // 执行日志路由切换逻辑
            router.push('/log');
            log.value.push(`[${(new Date).toLocaleString()}]跳转到/log`);
            break;
    }
}

</script>

<template>
    <!-- 顶栏 -->
    <var-app-bar :fixed="true" title="数据库大作业"
        image-linear-gradient="to right top, rgba(29, 68, 147, 0.5) 0%, rgba(74, 198, 170, 0.9) 100%">

        <template #left>
            <var-button round text @click="left = !left">
                <var-icon name="menu" />
            </var-button>
        </template>

        <template #right>
            <var-button round text @click="toggle_style_value()">
                <var-icon :name="style_value ? 'white-balance-sunny' : 'weather-night'" />
            </var-button>
        </template>

    </var-app-bar>
    <br /><br /><br /><br />

    <!-- 页面 -->
    <var-row :gutter="[10, 10]">
        <NuxtPage />
    </var-row>

    <br /><br /><br /><br />
    <var-bottom-navigation @change="switch_page" variant v-model:active="active" :fixed="true">
        <var-bottom-navigation-item icon="home" label="首页" />
        <var-bottom-navigation-item icon="calendar-month" label="选课" />
        <var-bottom-navigation-item icon="card-account-details-outline" label="学生信息" />
        <var-bottom-navigation-item icon="xml" label="日志" />
    </var-bottom-navigation>

    <!-- 左侧弹出菜单 感觉 安卓端还是不适合，有时间做不同设备适配，没时间就一个底栏上吧 -->
    <var-popup position="left" v-model:show="left">
        <var-app-bar :fixed="true" title="日志"
            image-linear-gradient="to right top, rgba(29, 68, 147, 0.5) 0%, rgba(74, 198, 170, 0.9) 100%">

            <template #left>
                <var-button round text @click="left = !left">
                    <var-icon name="menu" />
                </var-button>
            </template>

            <template #right>
                <var-button round text @click="toggle_style_value()">
                    <var-icon :name="style_value ? 'white-balance-sunny' : 'weather-night'" />
                </var-button>
            </template>

        </var-app-bar>
        <var-row>
            <div v-for="item in log" style="width: 100%;">
                <var-col :offset="1" :span="22">
                    <var-cell style="font-size: 0.8em;">
                        {{ item }}
                    </var-cell>
                </var-col>
            </div>
        </var-row>
    </var-popup>

</template>

<style>
.page-enter-active,
.page-leave-active {
    transition: all 0.4s;
}

.page-enter-from,
.page-leave-to {
    opacity: 0;
    filter: blur(1rem);
}
</style>