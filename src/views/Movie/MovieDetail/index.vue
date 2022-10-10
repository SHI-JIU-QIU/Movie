<template>
    <div v-if="movieDetail">
        <div class="h-375px" :style="`background-image:url(${bg})`">
            <div class="h-375px flex justify-center">
                <div class="mt-80px"><img class="w-232px h-322px border-4 border-white"
                        :src="`data:image/jpg;base64,` + movieDetail?.movieImg" alt="">
                </div>

                <div class="mt-80px ml-10 text-white flex flex-col">
                    <div class="flex flex-col mb-4">
                        <span class="text-3xl">{{ movieDetail?.movieCName }}</span> <span class="text-xl">NoName</span>
                    </div>
                    <div class=" flex flex-col mb-4"><span class="text-sm">{{ movieDetail?.movieType }}</span><span
                            class="text-sm">中国大陆 /
                            {{ movieDetail?.movieDuration }}</span><span class="text-sm">{{
                                    movieDetail?.movieReleaseDate.slice(0, 10)
                            }}
                            {{ movieDetail?.movieCountry }}上映</span></div>
                    <div class=" flex flex-col flex-1 justify-center ">
                        <el-button color=" white" round class="mb-4 w-40" @click="toComment">评论</el-button>
                        <el-button color=" #df2d2d" round class="w-40" @click="toCinemaList">购票</el-button>
                    </div>
                </div>

                <div class="mt-auto ml-10 mb-8 text-white">
                    <div class="mb-4">
                        <span class="text-sm">评分</span>
                        <div><span class="text-3xl text-yellow-500 mr-4">{{ movieDetail?.movieScore }}</span>
                            <el-rate class="relative z-9999" disabled show-score v-model="movieScore" allow-half
                                text-color="#ff9900" />
                        </div>
                    </div>
                    <div class="flex flex-col">
                        <span class="text-sm">累计票房</span>
                        <span class="text-2xl">{{ movieDetail?.movieBoxOffice }} <span class="text-sm">亿</span></span>
                    </div>
                </div>


            </div>
        </div>

        <div class="max-w-800px mx-auto mt-18">
            <el-menu :default-active="activeIndex" class="el-menu-demo mb-4" mode="horizontal" @select="handleSelect">
                <el-menu-item index="1" class="text-base leading-12">介绍</el-menu-item>
                <el-menu-item index="2" class="text-base leading-12">演员</el-menu-item>
            </el-menu>

            <div class="flex flex-col mb-10">
                <span class="border-l-4 border-red-500 pl-2 text-lg text-gray-600 mt-8">剧情简介</span>
                <div class="text-sm text-gray-500 p-4">
                    {{ movieDetail?.movieDetail }}
                </div>
            </div>

            <div>
                <span class="border-l-4 border-red-500 pl-2 text-lg text-gray-600 mt-4">演职人员</span>
                <div class="flex flex-col text-gray-500 p-4">
                    <span class="mb-4">导演：<span>{{ movieDetail?.movieDirector }}</span></span>
                    <span class="">演员：<span>{{ movieDetail?.movieActor }}</span></span>
                </div>

            </div>

            <div class="mt-10 flex justify-between items-center">
                <span class="border-l-4 border-red-500 pl-2 text-lg text-gray-600 ">热门短评</span>


            </div>

            <div class="w-80% mx-auto flex mt-6 items-center " id="target">
                <el-input v-model="myComment" :autosize="{ minRows: 2, maxRows: 4 }" type="textarea"
                    class="block text-xl" placeholder="Please input">

                </el-input>
                <el-button class="ml-4" type="primary" @click="addComment()">发送</el-button>
            </div>
            <CommentCard v-if="commentList?.length" v-for="item in commentList" :key="item.id" :comment="item">
            </CommentCard>

            <div class="my-10 p-10 bg-gray-50 text-center text-xl font-semibold text-gray-300"
                v-if="!commentList?.length">
                暂无评论
            </div>




        </div>
    </div>
</template>

<script setup lang='ts'>
import bg from '@/assets/banner.png'
import { apiGetMovieById } from '@/api/movie';
import { apiAddComment } from '@/api/comment';
import { ref, onMounted, onBeforeMount, nextTick } from 'vue'
import CommentCard from '@/components/CommentCard/index.vue';
import { useRoute } from 'vue-router';
import { ElMessage } from 'element-plus'
import { apiGetCinemaByMovieId } from '@/api/cinema';
import router from '@/router';



const movieScore = ref<number>()
const myComment = ref<string>()
const route = useRoute()

const activeIndex = ref('1')
const activeIndex2 = ref('1')
const handleSelect = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
}

const toComment = (): void => {
    document.getElementById("target")?.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });
}
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
type Comment = {
    id: number;
    userId: number;
    commentContent: string;
    movieId: number;
    commentTime: string;
    commentUser?: any;
}


let movieDetail = ref<MovieDetail>()
let commentList = ref<Comment[]>()
apiGetMovieById(route.query.id).then((result) => {
    if (result.code == 200) {
        movieDetail.value = result.data
        movieScore.value = movieDetail.value?.movieScore as number / 2
        commentList.value = movieDetail.value?.commentList
    }
})

const addComment = () => {
    apiAddComment({
        movieId: movieDetail.value?.id,
        commentContent: myComment.value
    }).then(() => {
        ElMessage({
            showClose: true,
            message: "评论成功",
            type: 'success',
        })
        myComment.value = ''
        apiGetMovieById(route.query.id).then((result) => {
            if (result.code == 200) {
                movieDetail.value = result.data
                movieScore.value = movieDetail.value?.movieScore as number / 2
                commentList.value = movieDetail.value?.commentList
            }
        })
    })
}

const toCinemaList = () => {
    router.push({
        name: 'Cinema',
        query: {
            movieId: route.query.id
        }
    })
}




</script>

<style scoped>
.el-button+.el-button {
    margin: 0
}

.el-textarea {
    @apply text-lg
}
</style>