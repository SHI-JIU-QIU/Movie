<template>
  <!-- 头部 -->
  <div class="header overflow-hidden">
    <!-- nav -->
    <el-menu :default-active="route.name" class="nav" mode="horizontal" :ellipsis="false" @select="handleSelect">
      <el-menu-item index="0">LOGO</el-menu-item>
      <div class="flex-grow" />
      <el-menu-item index="page" @click="toHome">首页</el-menu-item>
      <el-menu-item :index="route.path.slice(1, 6)" @click="toMovie">电影</el-menu-item>
      <el-menu-item index="Cinema" @click="toCinema">影院</el-menu-item>
      <el-menu-item index="News" @click="toNews">资讯</el-menu-item>

      <!-- 搜索 -->
      <el-input v-model="input2" class="search" placeholder="搜索 电影" type="text"><template #append>
          <el-button :icon="Search" @click="toSearch" />
        </template></el-input>

      <!-- 头像 -->
      <el-sub-menu index="6" class="avatar">
        <template #title>
          <div>
            <el-avatar :src="avatar" />
          </div>
        </template>
        <el-menu-item index="6-1" v-if="Object.keys(user).length == 0" @click="toLogin">登录/注册</el-menu-item>
        <el-menu-item index="6-2" v-if="Object.keys(user).length != 0" @click="toUser">个人中心</el-menu-item>
        <el-menu-item index="6-3" @click="exit" v-if="Object.keys(user).length != 0">退出登录</el-menu-item>
      </el-sub-menu>
    </el-menu>
  </div>
</template>

<script setup lang="ts">
import { ref, toRaw, computed, inject } from "vue";
import { Search } from "@element-plus/icons-vue";
import { useRouter, useRoute } from "vue-router";
import useStore from '@/store/index'
import { useCookies } from "@vueuse/integrations/useCookies"
import { apilogout } from "@/api/user";

const { userStore } = useStore()

let user: any = userStore.user



let avatar = computed(() => {
  if (user.avatar) {
    return `data:image/jpg;base64,` + user.avatar
  }
  else {
    return 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
  }
})




const activeIndex = ref("1");
const input2 = ref("");
const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};

const router = useRouter()
const route = useRoute()
const toMovie = () => {
  router.push({
    name: 'Movie'
  })
}

const toHome = () => {
  router.push({
    name: 'Home'
  })
}
const toCinema = () => {
  router.push({
    name: 'Cinema'
  })
}
const toNews = () => {
  router.push({
    name: 'News'
  })
}

const toLogin = () => {
  router.push({
    name: 'Login'
  })
}
const toUser = () => {
  router.push({
    name: 'User'
  })
}


const cookie = useCookies()
const reload = inject<Function>('reload') as Function
const exit = (): void => {

  userStore.$reset()
  localStorage.removeItem('pinia-userStore')
  apilogout()

  reload()
  console.log('exit');

}

const toSearch = () => {
  router.push({
    name: 'SearchPage',
    query: {
      keyword: input2.value
    }
  })
}

</script>

<style scoped>
.header {

  width: 100%;
  left: 50%;
  transform: translateX(-50%);
  height: 74px;
  position: fixed;
  background-color: white;
  z-index: 999;
}

.flex-grow {
  flex-grow: 1;
}

.demo-type {
  display: flex;
}

.demo-type>div {
  flex: 1;
  text-align: center;
}

.demo-type>div:not(:last-child) {
  border-right: 1px solid var(--el-border-color);
}

.el-input {
  width: 20%;
  height: 50%;
}

.avatar .el-avatar {
  vertical-align: middle;
}

.el-menu {
  align-items: center;
  height: 100%;
  max-width: 1200px;
  margin: 0 auto;
}

.el-sub-menu {
  height: 100%;
}

.search {
  margin: 0 50px;
}
</style>
