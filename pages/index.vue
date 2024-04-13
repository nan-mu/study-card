<template>
    <var-col :offset="1" :span="22">
        <h1>欢迎！🎉</h1>
    </var-col>
    <var-col :offset="1" :span="22">
        <p>这是075223班叶正楠的数据库结课作业，下面是功能介绍：</p>
    </var-col>
    <var-col :offset="1" :span="22">
        <var-card title="后端技术 🚀"
            description="比较这门课叫做数据库结课作业，所以我在很久之前尝试自己用rust写一个数据库，构思了很多东西，结果发现可能重点是放在网站上面。但这也算是工作量最大的部分，主要使用HashMap，用socket做api，前端在服务器上的nodejs的api程序暴露给网站。项目源码点击右下角按钮跳转">
            <template #extra>
                <var-link href="https://github.com/nan-mu/codecrafters-redis-rust/tree/dev" target="_blank"
                    underline="none">
                    <var-button round text>
                        <svg height="32" aria-hidden="true" viewBox="0 0 16 16" version="1.1" width="32"
                            Date-view-component="true" class="octicon octicon-mark-github v-align-middle">
                            <path
                                d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z">
                            </path>
                        </svg>
                    </var-button>
                </var-link>
            </template>
        </var-card>

    </var-col>
    <var-col :offset="1" :span="22">
        <var-card title="前端技术 🎨"
            description="网站使用vue框架，使用nuxt实现SSR，组件库库使用varlet，这是一个仿照Google的质感设计的框架。实际上nuxt可以编译静态资源或者直接运行服务器，但这部分内容和前端技术高度耦合，所以也放在这里。项目源码点击右下角按钮跳转">
            <template #extra>
                <var-link href="https://github.com/nan-mu/study-card" target="_blank" underline="none">
                    <var-button round text>
                        <svg height="32" aria-hidden="true" viewBox="0 0 16 16" version="1.1" width="32"
                            Date-view-component="true" class="octicon octicon-mark-github v-align-middle">
                            <path
                                d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z">
                            </path>
                        </svg>
                    </var-button>
                </var-link>
            </template>
        </var-card>
    </var-col>
    <var-col :offset="1" :span="22">
        <var-card title="夜间模式 🌏️" description="可以根据设备设置（根据浏览器的不同部分设备可能失效）自动选择日间夜间样式，也可以使用右上角的开关">
            <template #extra>
                <var-button round text @click="toggle_style_value()">
                    <var-icon :name="style_value ? 'white-balance-sunny' : 'weather-night'" />
                </var-button>
            </template>
        </var-card>
    </var-col>
    <var-col :offset="1" :span="22">
        <var-card title="懒加载 😪"
            description="在选课页面中，只有当当前页面需要查看时对象时才会向服务器发送请求。尝试打开开发者日志查看服务器请求。或者点击这里的按钮，它会让加载函数延迟5秒钟执行。但这个加载是异步分发的，所以人工延时的效果有限。">
            <template #extra>
                <var-switch v-model="isLazy" @click="log_is_lazy" />
            </template>
        </var-card>
    </var-col>
</template>

<script setup>
import { StyleProvider, Themes } from '@varlet/ui'
const style_value = useState("style_value");
const isLazy = useState("is_lazy", () => false);
const log = useState("log", () => `[${(new Date).toLocaleString()}]init log`);
/// 切换主题
function toggle_style_value() {
    style_value.value = !style_value.value;
    StyleProvider(style_value.value ? Themes.md3Dark : Themes.md3Light);
    log.value.push(`[${(new Date).toLocaleString()}]切换主题为${style_value.value ? "暗色" : "亮色"}`)
}
function log_is_lazy() {
    log.value.push(`[${(new Date).toLocaleString()}]懒加载${isLazy.value ? "开启" : "关闭"}`)
}
</script>
