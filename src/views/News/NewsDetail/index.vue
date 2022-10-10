<template>
    <div class="max-w-800px mx-auto " v-if="news">
        <span class="text-gray-700 text-2xl py-10 block ">{{news.consultTitle}}</span>
        <span class="block border-b-0.5 border-gray-300 text-end pb-2">by: {{news.consultAnnouncer}}</span>
        <img :src="`data:image/jpg;base64,`+news.img" alt="" class="my-10 block mx-auto max-w-800px">
        <p class="leading-normal text-gray-700">
            {{news.consultContent}}
        </p>
    </div>
</template>

<script setup lang='ts'>
import { apiGetNewsById } from '@/api/news';
import { ref } from 'vue';
import { useRoute } from 'vue-router'

let news = ref()
const route = useRoute()
apiGetNewsById({ id: route.query.id }).then((result) => {
    news.value = result.data
})
</script>

<style scoped>
</style>