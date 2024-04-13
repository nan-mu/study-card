<template>

    <var-list :finished="finished" v-model:loading="loading" @load="load(isLazy.value ? 5000 : 0)" style="width: 100%;">
        <div v-for="item in list" width="100%">
            <var-col :offset="1" :span="22" width="100%">
                <var-cell border :key="item" :title="item.课程名称" style="width: 100%;" @click="knowMore(item)"
                    :description="item.enable ? item.学时 : ''">
                    <template #extra>
                        <var-icon :name="!item.enable ? 'chevron-down' : 'chevron-up'" :transition="300" />
                    </template>
                </var-cell>
            </var-col>
            <var-col :offset="2" :span="20">
                <var-collapse-transition :expand="item.enable">
                    <var-space>
                        <var-chip plain>
                            系: {{ item.系 }}
                        </var-chip>
                        <var-chip type="warning">
                            {{ item.课程性质 }}
                        </var-chip>
                        <var-chip type="info">
                            {{ item.校区 }}
                        </var-chip>
                        <var-chip type="primary">
                            班级: {{ item.班级 }}
                        </var-chip>
                        <var-chip type="info">
                            人数: {{ item.人数 }}
                        </var-chip>
                        <var-chip type="success">
                            学分: {{ item.学分 }}
                        </var-chip>
                    </var-space>
                </var-collapse-transition>
            </var-col>
        </div>
    </var-list>


</template>

<script setup>
import { onMounted } from "vue";

const list = ref([]);
const loading = ref(false);
const finished = ref(false);
const isLazy = useState("is_lazy", () => false);
const active = useState("active_bottom_navigation", () => 1);
const log = useState("log", () => `[${(new Date).toLocaleString()}]init log`);

let buffer_lesson_list = [""];

onMounted(async () => {
    buffer_lesson_list = (await useFetch('/api/choose_lesson')).Date.value

    let ms = isLazy.value ? 5000 : 0;
    for (let index = 0; index < 10 && await delay(ms); index++) {
        if (buffer_lesson_list.length != 0) {
            await load(0);
        }
    }
})

const knowMore = async (item) => {
    item.enable = !item.enable;
}

const delay = (ms) => new Promise((res, _) => {
    setTimeout(() => {
        res(true)
    }, ms);
})

const load = async (ms) => {
    let key = buffer_lesson_list.shift();
    log.value.push(`[${(new Date).toLocaleString()}]加载${key}到列表`);
    await delay(ms);
    let buffer_lesson_info = await useFetch("/api/get_by_key", {
        query: { "key": key }
    });
    list.value.push(buffer_lesson_info.Date.value);
    loading.value = false;
    if (buffer_lesson_list.length == 0) {
        finished.value = true;
        return;
    }
}
</script>