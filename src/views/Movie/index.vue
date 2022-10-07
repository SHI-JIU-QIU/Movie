<template>
  <div class="movie">
    <div class="movie-nav">
      <span @click="toHotPlayList">正在热映<span class="movie-nav-first"
          v-if="route.path.includes('hotplaylist')"></span></span>
      <span @click="toBePlayList">即将上映<span class="movie-nav-second"
          v-if="route.path.includes('tobeplaylist')"></span></span>
    </div>

    <div class="movieType">
      <!-- 类型 -->
      <!-- <div class="type">
        <span>类型：</span>
        <ul class="type-list">
          <li v-for="item in type"><a href="#">{{ item }}</a></li>
        </ul>
      </div> -->

      <!-- 区域 -->
      <!-- <div class="area">
        <span>区域：</span>
        <ul class="area-list">
          <li><a href="#">悬疑</a></li>
          <li><a href="#">悬疑</a></li>
          <li><a href="#">悬疑</a></li>
          <li><a href="#">悬疑</a></li>
          <li><a href="#">悬疑</a></li>
          <li><a href="#">悬疑</a></li>
          <li><a href="#">悬疑</a></li>
          <li><a href="#">悬疑</a></li>
          <li><a href="#">悬疑</a></li>
          <li><a href="#">悬疑</a></li>
          <li><a href="#">悬疑</a></li>
          <li><a href="#">悬疑</a></li>
          <li><a href="#">悬疑</a></li>
          <li><a href="#">悬疑</a></li>
          <li><a href="#">悬疑</a></li>
          <li><a href="#">悬疑</a></li>
          <li><a href="#">悬疑</a></li>
          <li><a href="#">悬疑</a></li>
          <li><a href="#">悬疑</a></li>
          <li><a href="#">悬疑</a></li>
          <li><a href="#">悬疑</a></li>
          <li><a href="#">悬疑</a></li>
        </ul>
      </div> -->

      <!-- 年代 -->
      <!-- <div class="year">
        <span>年代：</span>
        <ul class="year-list">
          <li><a href="#">2022</a></li>
          <li><a href="#">2022</a></li>
          <li><a href="#">2022</a></li>
          <li><a href="#">2022</a></li>
          <li><a href="#">2022</a></li>
          <li><a href="#">2022</a></li>
          <li><a href="#">2022</a></li>
          <li><a href="#">2022</a></li>
          <li><a href="#">2022</a></li>
          <li><a href="#">2022</a></li>
          <li><a href="#">2022</a></li>
          <li><a href="#">2022</a></li>
          <li><a href="#">2022</a></li>
          <li><a href="#">2022</a></li>
          <li><a href="#">2022</a></li>
          <li><a href="#">2022</a></li>
          <li><a href="#">2022</a></li>
          <li><a href="#">2022</a></li>
          <li><a href="#">2022</a></li>
          <li><a href="#">2022</a></li>
          <li><a href="#">2022</a></li>
        </ul>
      </div>-->
    </div> 

    <!-- sort -->
    <div class="sort" v-if="route.path.includes('hotplaylist')">
      <el-radio-group v-model="radio">
        <el-radio :label="1">按热门排序</el-radio>
        <el-radio :label="2">按时间排序</el-radio>
        <el-radio :label="3">按评价排序</el-radio>
      </el-radio-group>
    </div>


    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">

import { ref, watch } from "vue";
import { useRoute, useRouter } from 'vue-router'
import useStore from '@/store'

const route = useRoute()
const router = useRouter()

const toHotPlayList = () => {
  router.push({
    name: 'HotPlayList'
  })
}

const toBePlayList = () => {
  router.push({
    name: 'ToBePlayList'
  })
}

const type = ref<string[]>([
  '动作',
  '科幻',
  '冒险',
  '奇幻',
  '荒诞',
  '喜剧',
  '悬疑',
  '动画',
  '爱情',
  '剧情',
  '推理',
  '犯罪',
  '恐怖',
  '惊悚',
  '战争',
  '历史',
  '青春',
  '家庭'])



const radio = ref(1);
const { movieStore } = useStore()
watch(radio, (newValue) => {
  if (newValue == 1) {
    movieStore.reqHotPlayList()
  }
  else if (newValue == 2) {
    movieStore.reqSortHotPlayByTimeList()
  }
  else {
    movieStore.reqSortHotPlayByEvaluateList()
  }
})

</script>

<style scoped>
.movie-nav {
  width: 100%;
  background-color: rgb(69, 69, 69);
  color: rgb(172, 172, 172);
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.movie-nav>span {
  box-sizing: border-box;
  margin: 0 30px;
  height: 100%;
  font-size: 16px;
  line-height: 60px;
}

.movie-nav-first,
.movie-nav-second {
  display: block;
  width: 0;
  height: 0;
  border: 8px solid transparent;
  border-bottom-color: white;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  top: -16px;
}

.movie-nav span:hover {
  display: block;
  color: white;
}

.type,
.area,
.year {
  display: flex;
  border-bottom: 1px solid rgb(238, 238, 238);
  padding: 10px 0;
}

.type>span,
.area>span,
.year>span {
  width: 70px;
  margin-top: 5px;
}

.type-list,
.area-list,
.year-list {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.type-list li,
.area-list li,
.year-list li {
  padding: 0 20px;
  margin: 5px 0;
  font-size: 15px;
}

.movieType {
  max-width: calc(1200px - 50px);
  /* border: 1px solid rgb(216, 216, 216); */
  margin: 100px auto;
  padding: 0 20px;
  color: rgb(89, 89, 89);
}

.sort {
  max-width: 1150px;
  margin: 0 auto;
  margin-bottom: 24px;
}
</style>
