<template>
    <var-popup v-model:show="center">
        <var-form ref="form" scroll-to-error="start">
            <var-input v-model="form.id" label="学号" placeholder="请输入学号（空着的话会随机登陆一个）" />
        </var-form>
    </var-popup>
</template>

<script setup>
import { onMounted } from "vue";
import { Snackbar } from "@varlet/ui";

const active = useState("active_bottom_navigation", () => 2);
const center = ref(false);
const form = reactive({ id: "" });
const log = useState("log", () => [`[${(new Date).toLocaleString()}]init log`]);
const login = useState("login", () => { return { "id": NaN, "islogin": false, "name": "" } });

onMounted(async () => {
    if (!login.value.islogin) {
        center.value = true;
    }
    // let student_id_list = (await useFetch("/api/find", {
    //     query: { "type": "Student" }
    // })).data.value;
});

</script>

<style>
.popup {}
</style>