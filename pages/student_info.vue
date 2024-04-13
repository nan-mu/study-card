<template>
    <var-overlay v-model:show="center" :lock-scroll="true" :close-on-key-escape="false" @click="center.value = true">
        <var-paper :elevation="2" :width="350" style="padding: 24px">
            <var-form ref="form" scroll-to-error="start">
                <var-row>
                    <var-col :span="23" :offset="1">
                        <h3>学号</h3>
                    </var-col>
                    <var-col :span="23" :offset="1">
                        <var-input :rules="[v => !!student_id_list.include(v) || '未填写学号或学号错误']" v-model="login.id"
                            label="学号" placeholder="请输入学号（空着的话会随机登陆一个）" style="width: 100%;" />
                    </var-col><var-col :span="23" :offset="1"><br /></var-col>
                    <var-col :span="23" :offset="1">
                        <var-button block @click="form.validate()">登陆</var-button>
                    </var-col>
                </var-row>
            </var-form>
        </var-paper>
    </var-overlay>
</template>

<script setup>
import { onMounted } from "vue";
// import { Snackbar } from "@varlet/ui";

const active = useState("active_bottom_navigation", () => 2);
const center = ref(false);
const form = ref(null);
const log = useState("log", () => [`[${(new Date).toLocaleString()}]init log`]);
const login = useState("login", () => { return { "id": "", "islogin": false, "name": "" } });
const student_id_list = (await useFetch("/api/find", {
    query: { "type": "Student" }
})).data.value;

function submit(v) {

}

onMounted(() => {
    if (!login.value.islogin) {
        center.value = true;
    }
});
</script>