<template>
    <div class="flex justify-between items-center pb-8 border-b-dotted  border-b-1 border-gray-300">
        <div class="flex mt-6">
            <div class="flex flex-col">
                <span class="text-lg">{{ cinema.cinemaName }}</span>
                <span class="text-gray-400 mt-2">地址：{{ cinema.cinemaAddress }}</span>
                <div class="mt-3"><span class="border-1 mr-2 p-0.5 text-sm text-blue-400">改签</span><span
                        class="border-1  text-blue-400 p-0.5 text-sm">折扣卡</span></div>
            </div>
        </div>
        <div class="flex items-center">
            <div class="flex flex-col mr-4 items-center">
                <el-rate v-model="cinemaScore" disabled text-color="#ff9900" />
            </div>
            <el-button round color="#df2d2d" class="" @click="toCinemaDetail">点击购票</el-button>
        </div>
    </div>
</template>

<script setup lang='ts'>

import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router'

type Props = {
    cinema: any
}

const { cinema } = defineProps<Props>()
const cinemaScore = ref(cinema.cinemaScore / 2)

const router = useRouter()
const route = useRoute()
const toCinemaDetail = () => {
    router.push({
        name: 'CinemaDetail',
        query: {
            cinemaId: cinema.id,
            movieId: route.query.movieId
        }
    })
}

</script>

<style scoped>
</style>