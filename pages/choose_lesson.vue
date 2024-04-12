<template>

    <var-list :finished="finished" v-model:loading="loading" @load="load" style="width: 100%;">
        <div v-for="item in list" width="100%">
            <var-col :offset="1" :span="22" width="100%">
                <var-cell border :key="item" :title="item.课程名称" style="width: 100%;" @click="knowMore(item)"
                    :description="item.enable ? item.学时 : ''">
                    <template #extra>
                        <var-icon :name="!item.enable ? 'chevron-down' : 'chevron-up'" />
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

<script setup>
import { onMounted } from "vue";

const list = ref([]);
const loading = ref(false);
const finished = ref(false);

let buffer_lesson_list = (await useFetch('/api/choose_lesson')).data.value;

buffer_lesson_list.pop();
buffer_lesson_list.shift();

onMounted(async () => {
    for (let index = 0; index < 10; index++) {
        load();
    }
})

const knowMore = async (item) => {
    item.enable = !item.enable;
}

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