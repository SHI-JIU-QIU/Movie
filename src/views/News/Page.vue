<template>
    <div>
        <div class="news-box">
            <div class="news-box-right">
                <h4 class="hot-news-title">热门资讯</h4>
                <HotNews :hotNews="newsList"></HotNews>
            </div>
            <div class="news-box-left">
                <h4 class="latest-header">最新资讯<span class="arrow red-arrow"></span></h4>
                <div class="grid grid-cols-3 gap-5">
                    <LatestNews v-for="item in newsList" :latestNews="item"></LatestNews>
                </div>
            </div>
        </div>

    </div>
</template>

<script setup lang='ts'>
import LatestNews from "./LatestNews/index.vue";
import HotNews from "./HotNews/index.vue"

import useStore from "@/store";
import { ref } from "vue";



const { newsStore } = useStore()
let newsList = ref<any[]>([])
newsStore.reqGetHotNewsList().then(() => {
    newsList.value = newsStore.newsList
})

</script>

<style scoped>
.news-box {
    /*margin-top: 40px;*/
    margin: 40px auto 0;
    width: 1200px;


}

.news-box-left {
    width: 730px;
    margin-right: 0;
    display: block;
}

.news-box-right {
    float: right;
    width: 360px;
    font-size: 14px;
}
</style>