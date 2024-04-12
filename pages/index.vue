<template>
    <var-col :offset="1" :span="22">
        <h1>欢迎！🎉</h1>
    </var-col>
    <var-col :offset="1" :span="22">
        <p>这是075223班叶正楠的数据库结课作业，下面是功能介绍：</p>
    </var-col>
    <var-col :offset="1" :span="22">
        <var-card title="前端技术 🎨" description="网站使用vue框架，使用nuxt实现SSR，组件库库使用varlet，这是一个仿照Google的质感设计的框架。">
            <br />
        </var-card>
    </var-col>
    <var-col :offset="1" :span="22">
        <var-card title="夜间模式 🌏️" description="可以根据设备设置（根据浏览器的不同部分设备可能失效）自动选择日间夜间样式，也可以使用右上角的开关切换">
            <template #extra>
                <var-button round text @click="toggle_style_value()">
                    <var-icon :name="style_value ? 'white-balance-sunny' : 'weather-night'" />
                </var-button>
            </template>
        </var-card>
    </var-col>
    <var-col :offset="1" :span="22">
        <var-card title="懒加载 😪"
            description="在选课页面中，只有当当前页面需要查看时对象时才会向服务器发送请求。尝试打开开发者日志查看服务器请求。或者点击该选项卡中的按钮，它会让加载函数延迟一秒钟执行。" />
    </var-col>
</template>

<script setup>
import { StyleProvider, Themes } from '@varlet/ui'
const style_value = useState("style_value");
/// 切换主题
function toggle_style_value() {
    style_value.value = !style_value.value;
    StyleProvider(style_value.value ? Themes.md3Dark : Themes.md3Light);
}
</script>
