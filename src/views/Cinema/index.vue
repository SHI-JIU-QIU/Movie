<template>
    <div class="max-w-1200px mx-auto">
        <div class=" ">
            <span class="text-xl font-medium border-l-4 border-red-600	 pl-2 mt-8 block">影院列表</span>
        </div>

        <CinemaCard v-if="cinemaList" v-for="item in cinemaList" :key="item.id" :cinema="item"></CinemaCard>

    </div>
</template>

<script setup lang='ts'>
import CinemaCard from './CinemaCard/index.vue';
import useStore from '@/store/index'
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { apiGetCinemaByMovieId } from '@/api/cinema';
import { result } from 'lodash';


const route = useRoute()
const { cinemaStore } = useStore()
let cinemaList = ref([] as any[])
if (!route.query.movieId) {
    cinemaStore.reqGetCinemaList().then(() => {
        cinemaList.value = cinemaStore.cinemaList
        console.log(cinemaList.value);

    })
}
else {
    apiGetCinemaByMovieId({ id: route.query.movieId }).then((result) => {
        if (result.code == 200) {

            let list = result.data
            let listId:any[] = [] 
            for (var item of list) {
                if (listId.indexOf(item['id']) == -1) {
                    listId.push(item['id']);
                    cinemaList.value.push(item);
                }
            }
            console.log(cinemaList);
            


        }
    })
}

</script>

<style scoped>
</style>