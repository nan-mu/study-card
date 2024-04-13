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
    <var-skeleton v-if="!login.islogin" title avatar :rows="3" :loading="!login.islogin" style="width: 100%;" />
    <div style="width: 100%;" v-else>
        <var-col :span="18" :offset="2">
            <var-space :size="[20, 20]">
                <var-avatar :src="src" />
                <h1>{{ login.name }}</h1>
            </var-space>
        </var-col>
        <var-col :span="22" :offset="1">
            <var-table>
                <thead>
                    <tr>
                        <th>学号</th>
                        <th>专业</th>
                        <th>性别</th>
                        <th>班级</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{{ login.id }}</td>
                        <td>{{ login.majoy }}</td>
                        <td>{{ login.gender }}</td>
                        <td>{{ login.class }}</td>
                    </tr>
                </tbody>
            </var-table>
        </var-col>
    </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
const form = ref(null);
const src = ref("");
const log = useState("log", () => [`[${(new Date).toLocaleString()}]init log`]);
const login = useState("login", () => { return { "id": "", "islogin": false, "name": "", "majoy": "", "gender": "", "class": "" } });
const student_id_list: any = (await useFetch("/api/find", {
    query: { "type": "Student" }
})).data.value;

const veify = async (v: string) => {
    if (v == "") {
        return true;
    } else if (student_id_list.includes(`+${v}`)) {
        log.value.push(`[${(new Date).toLocaleString()}]登陆 ${v} 成功`);
        login.value.id = v;
        return true;
    } else {
        log.value.push(`[${(new Date).toLocaleString()}]尝试登陆学号 ${v}`);
        return '未填写学号或学号错误'
    }
}

const submit = async (v: boolean) => {
    if (login.value.id == "") {
        login.value.id = student_id_list[Math.floor(Math.random() * student_id_list.length)].slice(1);
        log.value.push(`[${(new Date).toLocaleString()}]随机登陆学号 ${login.value.id}`);
    }
    if (v) {
        type Student = {
            "学号": string;
            "姓名": string;
            "性别": string;
            "班级": string;
            "专业": string;
        };
        let student: Student = (await useFetch("/api/get_by_key", {
            query: { "key": `+${login.value.id}`, "type": "Student" }
        })).data.value as Student;
        login.value.islogin = true;
        login.value.name = student.姓名;
        login.value.majoy = student.专业;
        login.value.gender = student.性别;
        if (student.性别 == "男") {
            src.value = "/male.jpeg";
        } else if (student.性别 == "女") {
            src.value = "/female.jpeg";
        }
        login.value.class = student.班级;
    }
}
</script>