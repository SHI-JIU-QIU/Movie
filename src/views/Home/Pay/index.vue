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
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';


const active = ref(1)
const route = useRoute()


if(route.name=='Order'){
    active.value=1
}
else if(route.name=='PayOrder'){
    active.value=2
}
else{
    active.value=3
}



</script>

<style scoped>

</style>