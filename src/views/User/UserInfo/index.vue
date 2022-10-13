<template>

  <div class="flex justify-center">
    <el-upload class="avatar-uploader w-178px h-178px  border-1 border-gray-200 mr-8" action="/api/updateMyHeader"
      :show-file-list="false" :on-success="handleAvatarSuccess" name="file" :before-upload="beforeAvatarUpload">
      <div v-if="imageUrl" :style="`background-image: url(${imageUrl})`"
        class="avatar w-178px h-178px bg-cover bg-center bg-no-repeat"></div>
      <el-icon v-else class="avatar-uploader-icon ">
        <Plus />
      </el-icon>
    </el-upload>






    <el-form ref="ruleFormRef" :model="ruleForm" label-width="120px" class="demo-ruleForm ml-20" label-position="left">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="ruleForm.username" />
      </el-form-item>
      <el-form-item label="电话" prop="phone">
        <el-input v-model="ruleForm.phone" />
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model.number="ruleForm.email" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm(ruleFormRef)">提交</el-button>

      </el-form-item>
    </el-form>

  </div>


</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { FormInstance } from 'element-plus'
import useStore from '@/store';
import { apiUpdateUser } from '@/api/user';
import type { UploadProps } from 'element-plus'
import { ElMessage } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
const { userStore } = useStore()

const ruleFormRef = ref<FormInstance>()

const ruleForm = reactive({
  username: userStore.user.username,
  phone: userStore.user.phone,
  email: userStore.user.email,
})

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      apiUpdateUser({ username: ruleForm.username, phone: ruleForm.phone, email: ruleForm.email }).then((result) => {
        userStore.reqGetUserById(userStore.user.id)
        ElMessage({
          showClose: true,
          message: '修改成功',
          type: 'success',
        })
      })
      console.log('submit!')
    } else {
      console.log('error submit!')
      return false
    }
  })
}

const imageUrl = ref(`data:image/png;base64,` + userStore.user.avatar)
const handleAvatarSuccess: UploadProps['onSuccess'] = (
  response,
  uploadFile
) => {
  imageUrl.value = URL.createObjectURL(uploadFile.raw!)
  ElMessage({
    showClose: true,
    message: '上传头像成功',
    type: 'success',
  })
}

const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (rawFile.type !== 'image/jpeg') {
    ElMessage.error('Avatar picture must be JPG format!')
    return false
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('Avatar picture size can not exceed 2MB!')
    return false
  }
  return true
}









const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}
</script>


<style scoped>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>