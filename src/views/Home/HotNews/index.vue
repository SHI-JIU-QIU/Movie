<template>
  <Rank :title="title" :data="data"></Rank>
</template>

<script setup lang="ts">
import Rank from "@/components/Rank/index.vue";
import { ref } from "vue";
import useStore from '@/store/index'
const title = ref<string>("热门资讯");

type hotNews = {
  rankName: string
  id: number
};

let data = ref<hotNews[]>([]);

const { newsStore } = useStore()
newsStore.reqGetHotNewsList().then(() => {
  newsStore.newsList.slice(0, 5).forEach((item) => {
    data.value.push({ id: item.id, rankName: item.consultTitle })
  })
})



</script>

<style>
</style>
