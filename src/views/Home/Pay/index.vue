<template>
    <div>
        <el-steps class="justify-center mt-10 max-w-800px mx-auto" :active="active">
            <el-step title="选座" />
            <el-step title="支付" />
            <el-step title="完成" />
        </el-steps>

        <router-view></router-view>


    </div>
</template>

<script setup lang='ts'>

import { ref } from 'vue';
import { useRoute, useRouter,onBeforeRouteUpdate } from 'vue-router';


const active = ref(1)
const route: any = useRoute()
const router: any = useRouter()
// console.log(router);



onBeforeRouteUpdate((to) => {
     if (to.name == 'Order') {
            active.value = 1
        }
        else if (to.name == 'PayOrder') {
            active.value = 2
        }
        else {
            active.value = 3
        }
})
// onMounted(() => {
//         console.log(newValue);
//         if (newValue == 'Order') {
//             active.value = 1
//         }
//         else if (newValue == 'PayOrder') {
//             active.value = 2
//         }
//         else {
//             active.value = 3
//         }
// })






</script>

<style scoped>
</style>