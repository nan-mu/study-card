<template>

    <!-- <var-col></var-col> -->
    <var-cell><var-chip block>
            {{ get_data.课程名称 }}
        </var-chip></var-cell>
    <var-cell>
        <var-space>
            <var-chip plain>
                系: {{ get_data.系 }}
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

    </var-cell>

</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { Snackbar } from '@varlet/ui'
const get_data = ref("");
onMounted(async () => {
    let buffer_lesson_list = await useFetch('/api/choose_lesson');
    let buffer_lesson_info = await useFetch("/api/get_by_key", {
        query: { "key": buffer_lesson_list.data.value[1] }
    });

    let lesson_info = buffer_lesson_info.data.value;
    get_data.value = lesson_info;
})
</script>