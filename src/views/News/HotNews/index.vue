<template>
  <div class="hot-news">

    <ul>
      <li class="top-list">
        <div class="top" @click="toNewsDetail(hotNews[0].id)">
          <a href="#">
            <img v-if="hotNews.length" :src="`data:image/jpg;base64,` + hotNews[0].img">
            <i class="ranking">1</i>
          </a>
          <span class="top1-list-content">
            <a href="#" v-if="hotNews[0]">{{ hotNews[0].consultContent }}</a>
          </span>
        </div>

      </li>


      <li v-for="(item,index) in hotNews.slice(1, hotNews.length)" @click="toNewsDetail(item.id)">
        <div class="normal-link">
          <i class="ranking">{{index+2}}</i>
          <p class="top10-content">
            <a href="#">
              <span class="normal-text">
               {{item.consultContent}}
              </span>
            </a>
          </p>
        </div>
      </li>


    </ul>
  </div>
</template>

<script setup lang="ts">
import {useRouter} from 'vue-router';


type Props = {
  hotNews: any[]
}

const { hotNews } = defineProps<Props>()
console.log(hotNews);
const router = useRouter()
const toNewsDetail = (id:number) => {
  router.push({
    name:'NewsDetail',
    query:{
      id:id
    }
  })
}

</script>

<style>
.hot-news {
  width: 360px;
  margin-right: 0;
  float: right;
}

.hot-news-title {
  font-size: 26px;
  line-height: 1;
  margin-bottom: 20px;
  color: #ef4238;
}

h4 {
  font-weight: 400;
  margin: 0;
}

.top-list {
  margin-bottom: 10px;
}

.top a img {
  width: 120px;
  height: 68px;
  vertical-align: bottom;
  color: #030303;
}


.top1-list-content {
  float: right;
  width: 220px;
  height: 40px;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-top: 10px;

  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2
}



.top a i {
  position: absolute;
  width: 20px;
  height: 17px;
  background-color: red;
  left: 0;
  bottom: 0;
  margin: 0;
  padding: 0;
  text-align: center;
  color: white;
}

.top a {
  position: relative;

}

.normal-link {
  padding: 10px 0;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  display: flex;
  align-items: center;

}

.normal-link i {
  width: 15px;
  /*height: 18px;*/
  color: #ef4238;
  font-size: 20px;
  font-style: italic;
  margin: 10px 10px 10px 0;
}

/*.top1-list-content a,*/
.normal-link a {
  /*display: block;*/
  /*padding: 10px 0;*/
  /*overflow: hidden;*/
  /*white-space: nowrap;*/
  /*text-overflow: ellipsis;*/
  /*position: relative;*/

}

.normal-text {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.top10-content {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>