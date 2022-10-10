<template>
  <!-- 轮播图 -->
  <el-carousel trigger="click" height="300px" class="max-w-1200px mx-auto">
    <el-carousel-item v-for="item in carouselImg" :key="item">
      <img class="w-full" :src="item" alt="">
    </el-carousel-item>
  </el-carousel>
  <!-- 正在热播 -->

  <div class=" mt-10 max-w-1200px overflow-hidden flex justify-center mx-auto">
    <div class="movie-info-body">
      <hot-play></hot-play>
      <to-be-play></to-be-play>
    </div>
    <div class="movie-info-aside">
      <BoxOffice class="movie-info-aside-item"></BoxOffice>
      <HotCinema class="movie-info-aside-item"></HotCinema>
      <HotNews class="movie-info-aside-item"></HotNews>
    </div>
  </div>
</template>

<script setup lang='ts'>
import HotPlay from "./HotPlay/index.vue";
import ToBePlay from "./ToBePlay/index.vue";
import BoxOffice from "./BoxOffice/index.vue";
import HotCinema from "./HotCinema/index.vue";
import HotNews from "./HotNews/index.vue";
import { apiGetCarouselImg } from "@/api/movie";
import { ref } from "vue";

let carouselImg = ref<string[]>(['https://image11.m1905.cn/uploadfile/2022/0930/thumb_1_1000_322_20220930122723630164.jpg','https://image11.m1905.cn/uploadfile/2022/0928/thumb_1_1000_322_20220928050038168747.jpg','https://image11.m1905.cn/uploadfile/2022/0923/thumb_1_1000_322_20220923050408504512.jpg',])
// apiGetCarouselImg().then((result)=>{
//   if(result.code == 200){
//     result.data.forEach((item:any)=>{
//       carouselImg.value.push(`data:image/jpg;base64,`+item.movieImg)
//     })
//   }
// })



</script>

<style scoped>
.movie-info-body {
  width: 68%;
  display: flex;
  flex-direction: column;
}

.movie-info-aside {
  width: 32%;
  display: flex;
  flex-direction: column;
}

.movie-info-aside-item {
  height: 400px;
  margin: 0 0 80px 70px;
}

.swiper-button-next {
  color: white;
}
</style>