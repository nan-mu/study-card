<template>
    <var-overlay :show="!login.islogin" :lock-scroll="true" :close-on-key-escape="false">
        <var-paper :elevation="2" :width="350" style="padding: 24px">
            <var-form ref="form" scroll-to-error="start" @submit="submit">
                <var-space direction="column" :size="[20, 0]">
                    <h3>学号</h3>
                    <var-input :rules="[veify]" v-model="login.id" label="学号" placeholder="请输入学号（空着的话会随机登陆一个）"
                        style="width: 100%;" />
                    <var-button block native-type="submit">登陆</var-button>
                </var-space>
            </var-form>
        </var-paper>
    </var-overlay>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
// import { Snackbar } from "@varlet/ui";
// student_id_list.include(`+${v}`)
const form = ref(null);
const log = useState("log", () => [`[${(new Date).toLocaleString()}]init log`]);
const login = useState("login", () => { return { "id": "", "islogin": false, "name": "", "majoy": "", "gender": "", "class": "" } });
const student_id_list = (await useFetch("/api/find", {
    query: { "type": "Student" }
})).data.value;

const veify = async (v) => {
    let id = "";

    if (v == "") {
        id = student_id_list[Math.floor(Math.random() * student_id_list.length)];
        log.value.push(`[${(new Date).toLocaleString()}]随机登陆学号 ${id}`);
    } else if (student_id_list.includes(`+${v}`)) {
        id = `+${v}`;
        log.value.push(`[${(new Date).toLocaleString()}]登陆 ${v} 成功`);
    } else {
        log.value.push(`[${(new Date).toLocaleString()}]尝试登陆学号 ${v}`);
        return '未填写学号或学号错误'
    }
    login.value.id = id.slice(1);

    let student = (await useFetch("/api/get_by_key", {
        query: { "key": `+${login.value.id}`, "type": "Student" }
    })).data.value;
    login.value.islogin = true;
    login.value.name = student.姓名;
    login.value.majoy = student.专业;
    login.value.gender = student.性别;
    login.value.class = student.班级;
    return true
}

const submit = async (v) => {
    await veify("");
}
</script>