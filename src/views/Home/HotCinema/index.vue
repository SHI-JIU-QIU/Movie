<template>
  <div class="hot-cinema">
    <Rank v-if="data" :title="title" :data="data">
      <template #detail="scope">
        <el-rate
          v-model="scope.rankDetail"
          disabled
          
          text-color="#ff9900"
        />
      </template>
    </Rank>
  </div>
</template>

<script setup lang="ts">
import Rank from "@/components/Rank/index.vue";
import { ref } from "vue";
import { apiSelectCinemaByScore } from "@/api/cinema";


type hotCinema = {
  id:number
  rankName: string;
  rankDetail: number;
};

let data = ref<hotCinema[]>([]);
const title = ref<string>("热门影院");

apiSelectCinemaByScore().then((result)=>{
  if(result.code == 200){
    result.data.slice(0,5).forEach( (item:any) => {
      
      
      data?.value?.push({id:item.id,rankName:item.cinemaName,rankDetail:item.cinemaScore /2})
 
      
    });
  }
})




</script>

<style scoped>
.el-rate{
    margin-left: auto;
}

</style>
