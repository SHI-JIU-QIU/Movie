<template>
  <div class="user-page ">
    <el-tabs type="border-card" class="demo-tabs">
      <el-tab-pane label="个人资料">
        <UserInfo class="" />
        <!-- <el-button type="primary" class="change-password-btn">修改密码</el-button> -->
      </el-tab-pane>
      <el-tab-pane label="我的订单">
        <MyOrder />
      </el-tab-pane>
      <el-tab-pane label="修改密码" class="changePass">

        <el-form ref="ruleFormRef" :model="ruleForm" status-icon :rules="rules" label-width="120px"
          class="demo-ruleForm max-w-60% mx-auto">
          <el-form-item label="旧密码" prop="oldPassword">
            <el-input v-model="ruleForm.oldPassword" />
          </el-form-item>
          <el-form-item label="新密码" prop="pass">
            <el-input v-model="ruleForm.pass" type="password" autocomplete="off" />
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass">
            <el-input v-model="ruleForm.checkPass" type="password" autocomplete="off" />
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="submitForm(ruleFormRef)">修改密码</el-button>
            <el-button @click="resetForm(ruleFormRef)">重置</el-button>
          </el-form-item>
        </el-form>

      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts" setup>
import UserInfo from './UserInfo/index.vue'
import MyOrder from './MyOrder/index.vue'
import { ElMessage } from 'element-plus'
import { reactive, ref } from 'vue'
import type { FormInstance } from 'element-plus'
import { apimodifyUserPwd } from '@/api/user';
import router from '@/router'

const ruleFormRef = ref<FormInstance>()



const validatePass = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('Please input the password'))
  } else {
    if (ruleForm.checkPass !== '') {
      if (!ruleFormRef.value) return
      ruleFormRef.value.validateField('checkPass', () => null)
    }
    callback()
  }
}
const validatePass2 = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('Please input the password again'))
  } else if (value !== ruleForm.pass) {
    callback(new Error("新密码不一致"))
  } else {
    callback()
  }
}

const ruleForm = reactive({
  pass: '',
  checkPass: '',
  oldPassword: ''
})

const rules = reactive({
  pass: [{ validator: validatePass, trigger: 'blur' }],
  checkPass: [{ validator: validatePass2, trigger: 'blur' }],
})

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      apimodifyUserPwd({ oldPwd: ruleForm.oldPassword, newPwd: ruleForm.pass }).then(() => {
        ElMessage({
          showClose: true,
          message: '修改成功,请重新登录',
          type: 'success',
        })
      })
      router.push({
        name: 'Login'
      })


    } else {
      console.log('error submit!')
      return false
    }
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}


</script>

<style scoped>
.demo-tabs>.el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}

.demo-tabs .custom-tabs-label .el-icon {
  vertical-align: middle;
}

.demo-tabs .custom-tabs-label span {
  vertical-align: middle;
  margin-left: 4px;
}

.user-page {
  width: 1200px;
  margin: 60px auto 0;
}

.change-password-btn {
  margin-left: 120px;
}
</style>
