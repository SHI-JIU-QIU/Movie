<template>
    <div class="max-w-1200px mt-10 w-100% mx-auto grid grid-cols-5 gap-15 justify-center">

        <div v-for="item in movieList" :key="item.id" v-if="movieList.length" class="w-100%">

            <MovieCard class="hot-play-list-item group relative transform hover:scale-105" :movieDetail="item">
                <template #info>
                    <div style="padding: 6px"
                        class="hidden group-hover:block absolute -bottom-1px w-100%  z-999 bg-white rounded-t-sm">
                        <span class="text-gray-600 text-xl font-medium">{{ item.movieCName }}</span>
                        <div class="flex justify-between">
                            <ul class="text-sm text-gray-400 w-60%">
                                <li class="truncate">主演:{{ item.movieActor }}</li>
                                <li class="truncate  ">上映时间:{{ item.movieReleaseDate.slice(0, 10) }}</li>
                            </ul>
                            <span class="text-orange-600 text-3xl">{{ item.movieScore }}</span>
                        </div>
                    </div>
                </template>

            </MovieCard>

            <div class="flex flex-col items-center p-2 group-hover:hidden">
                <span class=" pb-1">{{ item.movieCName }}</span>
                <span class="text-orange-600 text-xl">{{ item.movieScore }}</span>
            </div>

        </div>
    </div>
</template>

<script setup lang='ts'>
import { apiselectMovieByName } from '@/api/movie'
import MovieCard from "@/components/MovieCard/index.vue";
import { ref, watch } from 'vue'
import { useRoute, onBeforeRouteUpdate,onBeforeRouteLeave } from 'vue-router'
import { getCurrentInstance } from 'vue'


type MovieDetail = {
    id: number;
    movieCName: string;
    movieFName: string;
    movieActor: string;
    movieDirector: string;
    movieDetail: string;
    movieDuration: string;
    movieType: string;
    movieScore: number;
    movieBoxOffice: number;
    movieCommentCount: number;
    movieReleaseDate: string;
    movieCountry: string;
    moviePicture: string;
    movieState: number;
    commentList?: any;
    movieImg: string;
}

const route: any = useRoute()
let movieList = ref<MovieDetail[]>([])

apiselectMovieByName({ name: route.query.keyword }).then((result) => {
    movieList.value = result.data
})
onBeforeRouteUpdate((to) => {
    apiselectMovieByName({ name: to.query.keyword }).then((result) => {
        movieList.value = result.data
    })
})

const instance = getCurrentInstance();
onBeforeRouteLeave(()=>{
     instance?.proxy?.$Bus.emit('clear')
})






</script>

<style scoped>
.hot-play-list-item {
    width: 100%;
}
</style>