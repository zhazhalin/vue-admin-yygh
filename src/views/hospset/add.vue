<template>
  <div class="app-container">
    <el-form label-width="120px">
      <el-form-item label="医院名称">
        <el-input v-model="hospitalSet.hosname"/>
      </el-form-item>
      <el-form-item label="医院编号">
        <el-input v-model="hospitalSet.hoscode"/>
      </el-form-item>
      <el-form-item label="api基础路径">
        <el-input v-model="hospitalSet.apiUrl"/>
      </el-form-item>
      <el-form-item label="联系人姓名">
        <el-input v-model="hospitalSet.contactsName"/>
      </el-form-item>
      <el-form-item label="联系人手机">
        <el-input v-model="hospitalSet.contactsPhone"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="saveOrUpdate">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import hospSet from '../../api/hospSet'

export default {
  data() {
    return {
      hospitalSet: {}
    }
  },
  created() {
    //获取路由信息，并且得到对应数据
    if (this.$route.params && this.$route.params.id) {
      const id = this.$route.params.id
      this.getHostSet(id)
    }else {
      this.hospitalSet={}
    }
  },
  methods: {
    getHostSet(id) {
      hospSet.getHospSet(id)
        .then(response => {
          this.hospitalSet = response.data
        })
    },
    //添加
    saveOrUpdate() {
      if (!this.hospitalSet.id) {
        this.save()
      } else {
        this.update()
      }
    },
    update() {
      hospSet.updateHospSet(this.hospitalSet)
        .then(response => {
          this.$message({
            type: 'success',
            message: '更新成功!'
          })
          //跳转到页面
          this.$router.push({ path: '/hospSet/list' })
        })
    },
    save(){
      hospSet.saveHospSet(this.hospitalSet)
        .then(response => {
          this.$message({
            type: 'success',
            message: '保存成功!'
          })
          //跳转到页面
          this.$router.push({ path: '/hospSet/list' })
        })
    }
  }
}
</script>

<style scoped>

</style>
