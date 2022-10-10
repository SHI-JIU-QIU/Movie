<template>
  <div class="latest-news">


    <div class="latest-news-list clearfix" @click="toNewsDetail">

      <div class="latest-news-box">
        <a href="#"></a>
        <img class="rounded " :src="`data:image/jpg;base64,` + latestNews.img">
        <p class="latest-mews-title truncate text-gray-800">{{ latestNews.consultTitle }}</p>
        <div class="info-box">
          <span class="views-count text-gray-500 mt-1 block text-sm">{{ latestNews.consultAnnouncer }}</span>
        </div>
      </div>


    </div>
  </div>

</template>

<script setup lang="ts">
import router from '@/router';

type Props = {
  latestNews: any
}

const { latestNews } = defineProps<Props>()


const toNewsDetail = () => {
  router.push({
    name:'NewsDetail',
    query:{
      id:latestNews.id
    }
  })
}
</script>

<style>
.latest-news {
  width: 730px;
  margin-right: 0;

}

.latest-news-box {
  width: 230px;
  height: 190px;
  float: left;
  /* margin: 0 20px 20px 0; */
}

.latest-header {
  font-size: 26px;
  line-height: 1;
  margin-bottom: 20px;
  color: #ef4238;
}

.latest-all {
  font-size: 14px;
  color: inherit;
  float: right;
  margin-top: 10px;
}

.latest-news-list {
  margin-right: -20px;
}

.latest-news-list img {
  width: 230px;
  height: 129px;
}
</style>