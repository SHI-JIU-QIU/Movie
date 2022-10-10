<template>
    <div class="max-w-1000px  mx-auto">

        <div class="flex justify-end">
            <div class=" flex flex-col w-fit items-center mt-8 ">
                <span class="text-white text-sm bg-gray-200 block text-center w-20% rounded-2xl mb-4 ">荧屏</span>
                <div class="flex w-fit">
                    <aside class="bg-gray-300 rounded-2xl w-fit mr-4">
                        <div class="flex flex-col py-4 px-2">
                            <span class="h-40px text-center">1</span>
                            <span class="h-40px text-center">2</span>
                            <span class="h-40px text-center">3</span>
                            <span class="h-40px text-center">4</span>
                            <span class="h-40px text-center">5</span>
                            <span class="h-40px text-center">6</span>
                            <span class="h-40px text-center">7</span>
                            <span class="h-40px text-center">8</span>
                            <span class="h-40px text-center">9</span>
                            <span class="h-40px text-center">10</span>
                            <span class="h-40px text-center">11</span>
                            <span class=" text-center">12</span>

                        </div>
                    </aside>

                    <div>
                        <el-checkbox-group v-model="checkList" v-if="positionList.length"
                            class="grid grid-cols-12  w-500px grid-rows-12 h-490px justify-items-center">
                            <el-checkbox :label="item.position" v-for="item in positionList" :disabled="item.disable" />
                        </el-checkbox-group>


                    </div>
                </div>
            </div>

            <div class="ml-10 border-l-1 p-l-10 border-gray-200 w-280px" v-if="movie">
                <div class="mt-10 pb-10">
                    <div class="flex"><img class="w-100px mr-4" :src="`data:image/jpg;base64,` + movie.movieImg" alt="">
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
                    <div><span class="text-gray-500">座位：</span><span class="p-2"
                            v-for="item in checkList.slice(buyedLength, checkList.length)">{{ item }}</span></div>
                </div>

                <div class="mt-10 mb-6">
                    <span class="text-sm text-gray-500">总计：</span>
                    <span class="text-orange-600 text-3xl ">{{ Number(route.query.price) *
                            (checkList.length -
                                buyedLength)
                    }}元</span>
                </div>

                <el-button color="#ff6600" class="w-200px" @click="buy">立即购票</el-button>
            </div>
        </div>




    </div>



    <div>
    </div>
</template>

<script setup lang='ts'>
import { apiselectOrdersByScheduleId } from '@/api/cinema';
import { apiGetMovieById } from '@/api/movie';
import { apiBuyTickets } from '@/api/order';
import { ref, inject } from 'vue'
import { useRoute } from 'vue-router';
import { ElMessage } from 'element-plus'
import router from '@/router';

const route = useRoute()
const checkList = ref<any[]>([])
let positionList = ref<any[]>([])
let buyedLength = ref(0)
console.log(positionList);
let movie = ref()
apiGetMovieById(route.query.movieId).then((result) => {
    movie.value = result.data
})


apiselectOrdersByScheduleId({ id: route.query.scheduleId }).then((result) => {
    if (result.code == 200) {
        for (let i = 1; i <= 12; i++) {
            for (let j = 1; j <= 12; j++) {
                if (result.data.length != 0) {
                    if (result.data.includes(`${i}排${j}座`)) {
                        positionList.value.push({ position: `${i}排${j}座`, disable: true })
                        checkList.value.push(`${i}排${j}座`)
                        buyedLength.value++
                    }
                    else {
                        positionList.value.push({ position: `${i}排${j}座`, disable: false })
                    }
                }
                else {
                    positionList.value.push({ position: `${i}排${j}座`, disable: false })

                }
            }
        }
    }
})


const reload = inject('reload')
let orderIdList = ref()
const buy = () => {
    apiBuyTickets({ scheduleId: route.query.scheduleId, price: route.query.price, position: checkList.value.slice(buyedLength.value, checkList.value.length) }).then((result) => {
        if (result.code == 200) {
            orderIdList.value = result.data
            ElMessage({
                message: '下单成功',
                type: 'success',
            })
            router.push({
                name: 'PayOrder',
                query: {
                    movieId: route.query.movieId,
                    cinemaName: route.query.cinemaName,
                    hallName: route.query.hallName,
                    scheduleStartTime: route.query.scheduleStartTime,
                    positionList: checkList.value.slice(buyedLength.value, checkList.value.length),
                    money: Number(route.query.price) * (checkList.value.length - buyedLength.value),
                    orderIdList: orderIdList.value
                }
            })
        }
        else if (result.code == 400) {
            ElMessage.error('请先登录')
        }





    })
}
</script>

<style scoped>
/* :deep() .el-checkbox__inner{
     width:40px;
     height: 40px; 
} */

.el-checkbox {
    zoom: 200%;
    margin: 0;
    height: auto;
}

:deep() .el-checkbox__label {
    display: none;
}
</style>