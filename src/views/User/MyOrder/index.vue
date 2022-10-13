<template>
  <el-table :data="orderList" style="width: 100%" height="740">
    <el-table-column fixed align="left" label="订单信息" width="160">
      <template #default="scope">
        <el-image class="movie-img" style="width: 100px; height: 130px" fit="fill" :src="scope.row.url"></el-image>
      </template>
    </el-table-column>

    <el-table-column prop="info" label="" width="300">
      <template #default="scope">
        <div class="movie-info">
          <p class="movie-name">{{ scope.row.name }}</p>
          <p class="cinema">{{ scope.row.cinema }}</p>
          <p class="time">{{ scope.row.time }}</p>
          <p class="">{{ scope.row.hall }}</p>
          <p class="">{{ scope.row.position }}</p>
          <p style="color: red">取票订单号 : {{ scope.row.id }}</p>

        </div>
      </template>

    </el-table-column>

    <el-table-column label="数量（张）" width="120" align="center">
      <template #default="scope">
        <p class="quantity">{{ scope.row.quantity }}</p>
      </template>
    </el-table-column>
    <el-table-column label="付款金额（元）" width="200" align="center">
      <template #default="scope">
        <p class="amount">{{ scope.row.amount }}</p>
      </template>
    </el-table-column>
    <el-table-column label="订单状态" width="200" align="center">
      <template #default="scope">
        <p class="status">{{ scope.row.status }}</p>
      </template>
    </el-table-column>
    <el-table-column label="操作" width="180" align="center">
      <template #default="scope">
        <el-button type="primary" v-if="scope.row.status == '已下单'" @click="pay(scope.$index, scope.row)">支付</el-button>
        <el-button type="danger" v-if="scope.row.status == '支付成功' || scope.row.status == '已下单'"
          @click="refund(scope.$index, scope.row)">退票</el-button>
        <!-- <p class="operation">{{ scope.row.operation }}</p> -->
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts" setup>
import { apiapplyForRefund, apipayOrder, apiselectOrderByUserName } from '@/api/order';
import useStore from '@/store/index'
import { keysOf } from 'element-plus/es/utils';
import { ref } from 'vue';
import { ElMessage } from 'element-plus'


interface Info {
  name: string
  cinema: string
  time: string
  id: string
  url: string
  quantity: string
  amount: string
  status: string
  operation: string
}



// const orderInfo: Info[] = [
//   {
//     name: '肖申克的救赎 The Shawshank Redemption',
//     cinema: '影院影院影院影院影院影院',
//     time: '2022-10-10 10:10:10',
//     id: 'ABCDABCDABCDABCD',
//     url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
//     quantity: '2',
//     amount: '150',
//     status: '已支付',
//     operation: '详情',
//   },
//   {
//     name: '肖申克的救赎',
//     cinema: 'asdada',
//     time: '123123',
//     id: '123123',
//     url: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
//     quantity: '2',
//     amount: '200',
//     status: '已支付',
//     operation: '详情',
//   }
// ]



const orderList = ref<any[]>([])
const { userStore } = useStore()
type Index = 0 | 1 | 2 | 3
const status = ['退票中', '已下单', '退票成功', '支付成功']
apiselectOrderByUserName({ username: userStore.user.username }).then((result) => {
  if (result.code == 200) {
    orderList.value = []
    result.data.forEach((item: any) => {
      let index: Index = item.orderState
      orderList.value.push({
        name: item.orderSchedule.scheduleMovie.movieCName + '     ' + item.orderSchedule.scheduleMovie.movieFName,
        cinema: item.orderSchedule.scheduleHall.hallCinema.cinemaName,
        time: item.orderTime.slice(0, 19).replace('T', ' '),
        id: item.id,
        quantity: '1',
        amount: item.orderPrice,
        status: status[index],
        hall: item.orderSchedule.scheduleHall.hallName,
        position: item.orderPosition,
        url: `data:image/png;base64,` + item.orderSchedule.scheduleMovie.movieImg
      })
    });
  }

})

const refund = (index: any, item: any) => {
  console.log(item);

  apiapplyForRefund({ orderId: item.id }).then((result) => {
    if (result.code == 200) {
      ElMessage({
        message: '退票中，请等待管理员确认',
        type: 'success',
      })
      apiselectOrderByUserName({ username: userStore.user.username }).then((result) => {
        if (result.code == 200) {
          orderList.value = []
          result.data.forEach((item: any) => {
            let index: Index = item.orderState
            orderList.value.push({
              name: item.orderSchedule.scheduleMovie.movieCName + '     ' + item.orderSchedule.scheduleMovie.movieFName,
              cinema: item.orderSchedule.scheduleHall.hallCinema.cinemaName,
              time: item.orderTime.slice(0, 19).replace('T', ' '),
              id: item.id,
              quantity: '1',
              amount: item.orderPrice,
              status: status[index],
              hall: item.orderSchedule.scheduleHall.hallName,
              position: item.orderPosition,
              url: `data:image/png;base64,` + item.orderSchedule.scheduleMovie.movieImg
            })
          });
        }


      })

    }
  })
}


const pay = (index: any, item: any) => {
  apipayOrder({ orderId: item.id ,userId:userStore.user.id}).then(() => {
    ElMessage({
      message: '支付成功',
      type: 'success',
    })
    userStore.reqGetUserById(userStore.user.id)
    apiselectOrderByUserName({ username: userStore.user.username }).then((result) => {
      if (result.code == 200) {
        orderList.value = []
        result.data.forEach((item: any) => {
          let index: Index = item.orderState
          orderList.value.push({
            name: item.orderSchedule.scheduleMovie.movieCName + '     ' + item.orderSchedule.scheduleMovie.movieFName,
            cinema: item.orderSchedule.scheduleHall.hallCinema.cinemaName,
            time: item.orderTime.slice(0, 19).replace('T', ' '),
            id: item.id,
            quantity: '1',
            amount: item.orderPrice,
            status: status[index],
            hall: item.orderSchedule.scheduleHall.hallName,
            position: item.orderPosition,
            url: `data:image/png;base64,` + item.orderSchedule.scheduleMovie.movieImg
          })
        });
      }

    })
  })
}


</script>

<style scoped>
.movie-name {
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  font-size: 17px;
  margin-bottom: 5px;
}

.cinema {
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  font-size: 15px;
}

.order-id {
  color: red;
}

.status {
  color: #5eb25e;
}
</style>
