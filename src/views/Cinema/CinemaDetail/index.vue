<template>
    <div>
        <div class="h-300px " :style="`background-image:url(${bg})`">
            <div class="flex h-300px items-center max-w-1200px mx-auto justify-center">

                <div class="w-250px h-250px mr-30 bg-white flex justify-center items-center">
                    <img v-if="cinema.cinemaImg" class="w-240px h-240px" :src="`data:image/jpg;base64,` + cinema.cinemaImg" alt="">
                </div>

                <div class="text-white mr-30">
                    <div class="text-3xl">{{ cinema.cinemaName }}</div>
                    <div class="my-2">{{ cinema.cinemaAddress }}</div>
                    <div>
                        <el-rate v-model="cinema.cinemaScore" disabled text-color="#ff9900" />
                    </div>
                </div>

                <div class="text-white">
                    <div class="mb-4">影院服务</div>
                    <div class="mb-2"><span
                            class="text-xs border-1 border-white p-1 mr-2">&ensp;&ensp;&ensp;退&ensp;&ensp;&ensp;</span><span
                            class="text-xs">未取票用户放映前60分钟可退票</span></div>
                    <div class="mb-2"><span
                            class="text-xs border-1 border-white p-1 mr-2">&ensp;&ensp;改签&ensp;&ensp;</span><span
                            class="text-xs">未取票用户放映前60分钟可改签</span></div>
                    <div class="mb-2"><span class="text-xs border-1 border-white p-1 mr-2">3D眼镜收费</span><span
                            class="text-xs">3D眼镜需自备或到影院购买3元/副起</span></div>
                    <div class="mb-2"><span class="text-xs border-1 border-white p-1 mr-2">儿童优惠</span><span
                            class="text-xs">1.3m以下儿童免费（无座须家长陪同）</span></div>
                    <div class="mb-2"><span
                            class="text-xs border-1 border-white p-1 mr-2">&ensp;&ensp;WiFi&ensp;&ensp;</span><span
                            class="text-xs">影院有免费wifi</span></div>
                </div>
            </div>
        </div>

        <Carousel ref="myCarousel" :itemsToShow="3.95" :wrapAround="true" class="max-w-1200px mx-auto h-240px my-8">
            <Slide v-if="movieList" v-for="item in movieList" key="item">
                <img  :src="`data:image/jpg;base64,` + item.movieImg" alt="" class="h-240px">
            </Slide>
            <template #addons>
                <!-- <Pagination /> -->
                <Navigation />
            </template>

        </Carousel>


        <div class="show-list max-w-1200px mx-auto" v-if="currentMovie">
            <div class="movie-info">
                <div>
                    <h2 class="movie-name">{{ currentMovie.movieCName }}</h2>
                    <span class="score">{{ currentMovie.movieScore }}</span>
                </div>
                <div class="movie-describe">
                    <div>
                        <span class="key">时长 :</span>
                        <span class="value">{{ currentMovie.movieDuration }}</span>
                    </div>
                    <div>
                        <span class="key">类型 :</span>
                        <span class="value">
                            <a href="#">{{ currentMovie.movieType }}</a>
                        </span>
                    </div>
                    <div>
                        <span class="key">主演 :</span>
                        <span>{{ currentMovie.movieActor }}</span>
                    </div>
                </div>
            </div>

            <div class="show-date">
                <span>观影时间</span>
                <!-- <span class="date-item active" date-index="0">今天 9月20</span>
                <span class="date-item " date-index="1">今天 9月20</span>
                <span class="date-item " date-index="2">今天 9月20</span>
                <span class="date-item " date-index="3">今天 9月20</span> -->
            </div>

            <div class="plist-container">
                <table class="plist">
                    <thead>
                        <tr>
                            <th>放映时间</th>
                            <th>放映厅</th>
                            <th>售价（元）</th>
                            <th>选座购票</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in currentScreen">
                            <td>
                                <span class="begin-time">{{ item.scheduleStartTime }}</span>
                                <br>
                                <!-- <span class="end-time">15:21散场</span> -->
                            </td>

                            <td class="hall">
                                {{item.scheduleHall.hallName}}
                            </td>
                            <td>
                                <span class="sell-price">
                                    <span class="stonefont">{{ item.schedulePrice }}</span>
                                </span>
                            </td>
                            <td>
                                <span href="" class="buy-btn" @click="toPay(item,route.query.cinemaId)">
                                    选座购票
                                </span>
                            </td>

                        </tr>
                    </tbody>
                </table>
            </div>
        </div>


    </div>
</template>

<script setup lang='ts'>
import bg from '@/assets/banner.png'

import { ref, onMounted } from 'vue'

import { Carousel, Pagination, Slide, Navigation } from 'vue3-carousel';
import 'vue3-carousel/dist/carousel.css';
import { apiGetHallList, apiGetMovieByCinemaId, apiSelectCinemaById, apiselectfromHall } from '@/api/cinema'

import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const toPay = (data: any,cinemaId:any) => {
    router.push({
        name: 'Pay',
        query: {
            scheduleId: data.id,
            price: data.schedulePrice,
            movieId: data.movieId,
            cinemaName:data.scheduleHall.hallCinema.cinemaName,
            hallName:data.scheduleHall.hallName,
            scheduleStartTime:data.scheduleStartTime
        }
    })
}

let cinema = ref({} as any)
const route = useRoute()
apiSelectCinemaById({ id: route.query.cinemaId }).then((result) => {
    if (result.code == 200) {
        cinema.value = result.data
        cinema.value.cinemaScore = cinema.value.cinemaScore / 2
    }
})

let movieList = ref([] as any)
apiGetMovieByCinemaId({ id: route.query.cinemaId }).then((result) => {
    if (result.code == 200) {
        let list = result.data
        var arrId = [];
        for (var item of list) {
            if (arrId.indexOf(item['id']) == -1) {
                arrId.push(item['id']);
                movieList.value.push(item);
            }
        }

        currentMovie.value = movieList.value[0]
        apiGetHallList({ id: route.query.cinemaId }).then((result) => {
            result.data.forEach((item: any) => {
                apiselectfromHall({ id: item.id }).then((result) => {
                    result.data.forEach((item: any) => {
                        if (item.movieId == currentMovie.value.id) {
                            currentScreen.value.push(item)
                            console.log(currentScreen.value);
                        }
                    })
                })
            })
        })

    }
})

let currentMovie = ref()
let currentScreen = ref<any[]>([])
let index = 0

onMounted(() => {



    document.querySelector('.carousel__prev')?.addEventListener('click', () => {
        currentScreen.value = []
        if (index == 0) {
            index = movieList.value.length - 1
            currentMovie.value = movieList.value[index]

        }
        else {
            index--
            currentMovie.value = movieList.value[index]

        }
        apiGetHallList({ id: route.query.cinemaId }).then((result) => {
            result.data.forEach((item: any) => {
                apiselectfromHall({ id: item.id }).then((result) => {
                    result.data.forEach((item: any) => {
                        if (item.movieId == currentMovie.value.id) {
                            currentScreen.value.push(item)
                            console.log(currentScreen.value);
                        }
                    })
                })
            })
        })

    })
    document.querySelector('.carousel__next')?.addEventListener('click', () => {
        currentScreen.value = []


        if (index == movieList.value.length - 1) {
            index = 0
            currentMovie.value = movieList.value[index]


        }
        else {
            index++
            currentMovie.value = movieList.value[index]

        }
        apiGetHallList({ id: route.query.cinemaId }).then((result) => {
            result.data.forEach((item: any) => {
                apiselectfromHall({ id: item.id }).then((result) => {
                    result.data.forEach((item: any) => {
                        if (item.movieId == currentMovie.value.id) {
                            currentScreen.value.push(item)
                        }
                    })
                })
            })
        })
    })
})









const activeIndex = ref('1')
const activeIndex2 = ref('1')
const handleSelect = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
}
</script>

<style scoped>
.el-button+.el-button {
    margin: 0
}

.carousel__slide>.carousel__item {
    transform: scale(1);
    opacity: 0.5;
    transition: 0.5s;
}

.carousel__slide--visible>.carousel__item {
    opacity: 1;
    transform: rotateY(0);
}

.carousel__slide--next>.carousel__item {
    transform: scale(0.9) translate(-10px);
}

.carousel__slide--prev>.carousel__item {
    transform: scale(0.9) translate(10px);
}

.carousel__slide--active>.carousel__item {
    transform: scale(1.1);
}

.container {
    width: 1200px;
    margin: 0 auto;
    margin-top: 120px;
}

.crumbs-nav-container {
    margin-bottom: 25px;
    font-size: 14px;
    color: #666;
    margin-top: -55px;
}

.movie-list-container {
    height: 280px;
    padding: 22px 5px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    overflow: hidden;
    -webkit-box-shadow: inset 0 0 100px 80px #ededed;
    box-shadow: inset 0 0 100px 80px #ededed;
    position: relative;
}

.movie-list {
    white-space: nowrap;
    position: relative;
    display: table;
    left: 0;
    -webkit-transition: left .2s ease;
    transition: left .2s ease;
}

.movie.active {
    -webkit-transform: scale(1);
    -ms-transform: scale(1);
    transform: scale(1);
    border-color: #f24030;
}

.movie {
    width: 162px;
    height: 227px;
    border: 4px solid #fff;
    -webkit-box-shadow: 0 1px 3px 0 hsl(0deg 0% 66% / 50%);
    box-shadow: 0 1px 3px 0 hsl(0deg 0% 66% / 50%);
    display: inline-block;
    -webkit-transform-origin: 50%;
    -ms-transform-origin: 50%;
    transform-origin: 50%;
    -webkit-transform: scale(.82);
    -ms-transform: scale(.82);
    transform: scale(.82);
    -webkit-transition: -webkit-transform .1s;
    transition: -webkit-transform .1s;
    transition: transform .1s;
    transition: transform .1s, -webkit-transform .1s;
    word-spacing: 0;
}

.movie img {
    width: 100%;
    height: 100%;
    border-style: none;
}

.scroll-prev {
    left: 0;
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAxCAYAAADNyhlBAAAAAXNSR0IArs4c6QAAArhJREFUWAnF2M9rE0EUB3CjVkNRrJqoLSr+uHj0fxAUFYuIWERERPBi/7J6yCFgSEIOCQmBxCSaoLRGWtRjaav57Uqyft/aKWs2k4nZ1+fAsNOd3fn0bXZ33k7gwP6UgGtY1bZ39znbw64DuJoEUT3oqoQNUPuoVGzq5CwKPYRBj6DORiKRa71eL2Lb9uZgMFjr9/uv0FZXgcVWUc5gtGOop2Ox2A1gW4CGyzKLiEEUSlESGopGozeBbg+Lu3/XOWAPikhvAd3RoLR7xy/sQROJxB2g38eg1LXiB/agyWTyLtAfBvQb+hemhT1oKpW6B7RhQL+i/ypQOv+fiwdNp9OLQJsG9AseqyvQfKPHMUgok8ncB9oyoBvdbvcyG5rNZh8AbRvQdaCX2NBcLvcQaMeAfgZ6kQsN5/P5RxOg9U6nc4ENLRQKS0C7hkjXgJ5nQ4vF4mOAJnS13W7Tc8py94ZLpdIToD1DpB+BzrOh5XL56QToh1ardY4NrVQqz4D+NERaA3qWDa1Wq88BWgb0fbPZPMOG1mq1FxOg7xqNRogNRaQvgf4yRFpG/6lpUZzn3PaU9DmZA717J0Df4piTflCCKeE7ijqHOo8ZhCIZVwropGOnek5x3l4hOIhKl20Bb6VxM43l54W/J6Kh0luV99qWZX1yHzDUngkGgyuI+AT2+46YBvgvvzHBFDmlpjS5h6XualjOZfsLl3iOCaYyKvJ9f3P9oUfgEu9qLS4xO2lxiflYi0tkIFpcIufS4hJZpg4PSeTVWlziS0KLS3w7jcKd5EHia1GLS3wfa3GJFQEtHo/HbyOLMa2BvFYD+Nm6ZzXnN5dY9VH/sAeXWOcaxkVX9kbhs9g5h7XM60iZ3yBBpN+9jrXMZWwDdIm4C42pLj2lU1RVFkurt9TmXUXFgKq4A1JtAqk429/9SruXxl7sIQAAAABJRU5ErkJggg==);
}

.scroll-next {
    right: 0;
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAxCAYAAADNyhlBAAAAAXNSR0IArs4c6QAAAqVJREFUWAnFmF1rE0EUhjvxoyKKta0fLSpWb3rpfxAUEUVEFBEREbzRX6YXXgQMIeQiISGQmEQTFL+wVC9FW5NNNkaS+BzMtFvYdaA7u3vgZU522Xl2NzvnnDlqZtvU1NXjZPvUjNf3HN69u9cDE+AelELijz3CtQtPTSYTNRqNnjB+QN8Hg8ELbBXQQbQfyc3Ijeg3gWvBgD1FO2w8Hv/IZDIXmX4BHUL7kH4TuBYM4ucd1OkP4D/T6fQlEItI4PL09uBwNvzAcgz4Bk9+ORI48z8PAk/hm9ls9op1OJMvo28G+K9cLnfVNlwBPY++GuCdfD5/zTqcZXQO8LoB3i0UCtetw13XXQG8ZoA7xWLxxhR+mNHK166AnwX8xQDvlUqlm1HAzwD2Xd/6hlhq/XK5fMs6vN/vnwbySYP8RoFXKpXbwI8he68d+CmAEsMDDbhbrVbvWIf3ej1Z5+8Dyf9OuLVa7W4U8CXmf2eAD+r1+j3rcMdxTgJ+a4I3Go37UcBPAG4b4L+bzeYD6/But3sc8BsDfNhqtR5ah3c6nUXAr03wdrv9yDoc6DxqGOB/ePLHUcCPAn5lgntiu1QyUmCGrt8kpc6h6v/gZL4GsCU0h2aRlFChTSeWYRCc6OZAWUbz6ABK6boaf1cmT3yEK58hqUR9bTgcfuSEbAqkVg+9ORBo7P+xQGP/qlUS61glEbkUiSL2WC3Q2LOTohiIPR8LNPYKRCVRcwk09ipTYm/sdbUO+LHuJAS6QihcQ4EmmcaTX0MX8YqcKVvV9UAiJ4Ba3S1KwI9/fww0mY4A4MR6IIl1fXz3wXxIkfe5EuvsSS9T4LIJ32RZvaSXeYGiTEpR6WfabycyqS6sZRQFdW+lMgxdHTLHlmmwHNC+Hr0gr791cRjnL3/vu4SC/ROyAAAAAElFTkSuQmCC);
}

.scroll-btn {
    display: inline-block;
    position: absolute;
    width: 30px;
    height: 100%;
    top: 0;
    background-repeat: no-repeat;
    background-position: 50%;
}

.movie-info {
    margin-top: 20px;
    border-bottom: 1px solid #e5e5e5;
}

.movie-name {
    display: inline-block;
    margin: 0 20px 20px 0;
    font-size: 26px;
    font-weight: 400;
    color: #333;
}

.score {
    display: inline-block;
    font-size: 24px;
    color: #faaf00;
}

.score::after {
    content: "\5206";
    font-size: 12px;
}

.movie-describe>div {
    display: inline-block;
    font-size: 14px;
    color: #151515;
    margin-bottom: 20px;
    margin-right: 40px;
}

.movie-describe .key {
    color: #999;
}

.show-date {
    padding: 30px 0;
    font-size: 14px;
    color: #999;
}

.date-item {
    display: inline-block;
    background-color: transparent;
    border-radius: 100px;
    color: #333;
    padding: 2px 10px;
    margin-left: 12px;
    cursor: default;
}

.date-item.active {
    color: #fff;
    background-color: #f03d37;
}

.plist {
    width: 100%;
    border: none;
    border-spacing: 0;
}

table {
    display: table;
    border-collapse: separate;
    box-sizing: border-box;
    text-indent: initial;
    border-spacing: 2px;
    border-color: grey;
}

.plist thead {
    background-color: #f7f7f7;
    color: #333;
    font-size: 16px;
    padding: 18px 0;
}

thead {
    display: table-header-group;
    vertical-align: middle;
    border-color: inherit;
}

tr {
    display: table-row;
    vertical-align: inherit;
    border-color: inherit;
}

.plist thead th {
    padding: 16px 0;
}

th {
    display: table-cell;
    vertical-align: inherit;
    font-weight: bold;
}

tbody {
    display: table-row-group;
    vertical-align: middle;
    border-color: inherit;
}

.plist tbody tr {
    height: 82px;
}

tr {
    display: table-row;
    vertical-align: inherit;
    border-color: inherit;
}

.plist tbody td {
    text-align: center;
    width: 20%;
}

.plist tbody .begin-time {
    font-size: 18px;
    color: #333;
    font-weight: 700;
}

.plist tbody .end-time {
    font-size: 12px;
    color: #999;
}

tbody .lang,
tbody .hall {
    font-size: 14px;
    color: #333;
}

.sell-price {
    font-size: 18px;
    color: #f03d37;
    font-weight: 700;
}

.sell-price::before {
    content: "\FFE5";
    font-size: 12px;
}

.stonefont {
    font-family: mtsi-font;
}

.plist tbody .buy-btn {
    display: inline-block;
    width: 80px;
    height: 30px;
    color: #fff;
    background-color: #f03d37;
    font-size: 14px;
    line-height: 30px;
    border-radius: 100px;
    text-align: center;

    box-shadow: 0 2px 10px -2px #f03d37;
}

body {
    background: #eee;
    font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
    font-size: 14px;
    color: #000;
    margin: 0;
    padding: 0;
}

.swiper-container {
    width: 100%;
    height: auto;
    padding: 90px 0;
    margin-left: auto;
    margin-right: auto;

}

.swiper-slide {
    text-align: center;
    font-size: 18px;
    background: #fff;
    height: 200px;

    /* Center slide text vertically */
    display: -webkit-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    -webkit-align-items: center;
    align-items: center;
    transition-property: all;
}

#progressEffect {
    position: absolute;
    z-index: 10;
    top: 20px;
    left: 20px;
}
</style>