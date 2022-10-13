<template>
  <div class="box-office">
    <Rank :data="data" :title="title">
      <template #detail="scope">
        <span class="rank-detail">{{ scope.rankDetail }} 亿</span>
      </template>
    </Rank>
  </div>
</template>

<script setup lang="ts">
import Rank from "@/components/Rank/index.vue";
import { ref } from "vue";
import useStore from '@/store/index';
import { } from '@/api/movie'

type boxOffice = {
  id: number
  rankName: string;
  rankDetail: string;
};

let data = ref<boxOffice[]>([]);
const title = ref<string>("今日票房");



const { movieStore } = useStore()

movieStore.$subscribe(
  () => {
    movieStore.hotPlayList.slice(0, 5).forEach((item: any) => {
      if (data.value.length == 5) {
        return
      }
      data.value.push({ id: item.id, rankName: item.movieCName, rankDetail: item.movieBoxOffice })
    });

  }
)




</script>

<style scoped>
.rank-detail {
  font-size: 14px;
  color: #f81515;
  flex: 1;
  text-align: end;
}
</style>
