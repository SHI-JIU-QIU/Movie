<template>

    <div class="max-w-800px mx-auto flex justify-between items-center">
        <div class="ml-10 p-l-10 border-gray-200 w-300px" v-if="movie">
            <div class="mt-10 pb-10">
                <div class="flex"><img class="w-140px mr-4" :src="`data:image/jpg;base64,` + movie.movieImg" alt="">
                    <div class="flex flex-col justify-between">
                        <div class="text-2xl text-gray-700">{{ movie.movieCName }}</div>
                        <div class="text-2xl text-gray-700">{{ movie.movieFName }}</div>
                        <div class="text-sm text-gray-500">{{ movie.movieCountry }}
                        </div>
                        <div class="text-sm text-gray-500">{{ movie.movieDuration }}
                        </div>
                    </div>
                </div>
            </div>

            <div class="text-sm ">
                <div><span class="text-gray-500">影院：</span><span>{{ route.query.cinemaName }}</span></div>
                <div><span class="text-gray-500">影厅：</span><span>{{ route.query.hallName }}</span></div>
                <div><span class="text-gray-500">票价：</span><span>{{ route.query.price }}元/张</span></div>
                <div><span class="text-gray-500">场次：</span><span>{{ route.query.scheduleStartTime }}</span>
                </div>
                <div><span class="text-gray-500">座位：</span><span class="p-2" v-for="item in route.query.positionList">{{
                        item
                }}</span></div>
            </div>

            <div class="mt-10 mb-6">
                <span class="text-sm text-gray-500">总计：</span>
                <span class="text-orange-600 text-3xl ">{{ route.query.money }}元</span>
            </div>

        </div>

        <div class="flex flex-col justify-center">
            <img src="@/assets/微信图片_20221010111434.jpg" alt="" class="w-200px">
            <el-button type="primary" class="mt-10" @click="pay">立即支付</el-button>
        </div>



    </div>
</template>

<script setup lang='ts'>
import { apiGetMovieById } from '@/api/movie';
import { apipayOrder } from '@/api/order';
import router from '@/router';
import { ElMessage } from 'element-plus'
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import useStore from '@/store'


const route = useRoute()
const { userStore } = useStore()
let movie = ref()
apiGetMovieById(route.query.movieId).then((result) => {
    movie.value = result.data
})

const pay = async () => {
    let flag = null

    if (route.query.orderIdList instanceof Array) {
        for (let item of (route.query.orderIdList as any[])) {
            await apipayOrder({ orderId: item, userId: userStore.user.id }).then((result) => {
                if (result.code == 200) {
                    userStore.reqGetUserById(userStore.user.id)
                    flag = true
                }
                else {
                    flag = false
                }
            })
        }

        if (flag == true) {
            ElMessage({
                message: '支付成功',
                type: 'success',
            })
            router.push({
                name: 'Success'
            })
        }

    }
    else {
        await apipayOrder({ orderId: route.query.orderIdList }).then((result) => {
            if (result.code == 200) {
                userStore.reqGetUserById(userStore.user.id)
                ElMessage({
                    message: '支付成功',
                    type: 'success',
                })

                router.push({
                    name: 'Success'
                })
            }
            else {
                ElMessage({
                    message: '支付失败',
                    type: 'error',
                })

            }
        })
    }



}


</script>

<style scoped>
</style>