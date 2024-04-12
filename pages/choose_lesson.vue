<template>

    <!-- <var-col></var-col> -->

    <var-list :finished="finished" v-model:loading="loading" @load="load">
        <var-cell>
            <var-cell :key="item" v-for="item in list">
                {{ item.课程名称 }}
            </var-cell>
        </var-cell>
    </var-list>

    <!-- <var-cell>
        <var-space>
            <var-chip plain>
                系: {{ item.系 }}
            </var-chip>
            <var-chip type="warning">
                {{ get_data.课程性质 }}
            </var-chip>
            <var-chip type="info">
                {{ get_data.校区 }}
            </var-chip>
            <var-chip type="primary">
                {{ get_data.班级 }}
            </var-chip>
            <var-chip type="info">
                {{ get_data.人数 }}
            </var-chip>
            <var-chip type="success">
                {{ get_data.学分 }}
            </var-chip>
        </var-space>

    </var-cell> -->

</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { Snackbar } from '@varlet/ui'

const list = ref([]);
const loading = ref(false);
const finished = ref(false);

let buffer_lesson_list = (await useFetch('/api/choose_lesson')).data.value;

buffer_lesson_list.pop();

onMounted(async () => {
    for (let index = 0; index < 10; index++) {
        load();
    }
})

const load = async () => {
    for (let index = 0; index < 10; index++) {
        let buffer_lesson_info = await useFetch("/api/get_by_key", {
            query: { "key": buffer_lesson_list.shift() }
        });
        list.value.push(buffer_lesson_info.data.value);
        loading.value = false;
        if (buffer_lesson_list.length == 0) {
            finished.value = true;
            break;
        }
    }
}
</script>