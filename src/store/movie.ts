import { defineStore } from "pinia"
import { apiHotPlayMovie, apiToBePlayMovie } from '@/api/movie'

export const useMovieStore = defineStore('movieStore', {
    state: () => {
        return {
            hotPlayList: [],
            toBePlayList: [],
        }
    },

    getters: {

    },

    actions: {
        async reqHotPlayList() {
            let result = await apiHotPlayMovie('评价')
            if (result.code == 200) {
                this.hotPlayList = result.data
            }
        },
        async reqToBePlayList() {
            let result = await apiToBePlayMovie()
            if (result.code == 200) {
                this.toBePlayList = result.data
            }
        },
        async reqSortHotPlayByTimeList() {
            let result = await apiHotPlayMovie('时间')
            if (result.code == 200) {
                this.hotPlayList = result.data
            }
        },
        async reqSortHotPlayByEvaluateList() {
            let result = await apiHotPlayMovie('热门')
            if (result.code == 200) {
                this.hotPlayList = result.data
            }
        },
    }
})