<template>
  <div class="app-container">
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="searchObj.hosname" placeholder="医院名称"/>
      </el-form-item>
      <el-form-item>
        <el-input v-model="searchObj.hoscode" placeholder="医院编号"/>
      </el-form-item>
      <el-button type="primary" icon="el-icon-search" @click="getHospList()">查询</el-button>
    </el-form>
    <!-- 工具条 -->
    <div>
      <el-button type="danger" size="mini" @click="removeRows()">批量删除</el-button>
    </div>
    <!-- banner列表 -->
    <el-table
      :data="list"
      stripe
      style="width: 100%">
      <el-table-column type="selection" width="55" @selection-change="handleSelectionChange"/>
      <el-table-column type="index" width="50" label="序号"/>
      <el-table-column prop="hosname" label="医院名称"/>
      <el-table-column prop="hoscode" label="医院编号"/>
      <el-table-column prop="apiUrl" label="api基础路径" width="200"/>
      <el-table-column prop="contactsName" label="联系人姓名"/>
      <el-table-column prop="contactsPhone" label="联系人手机"/>
      <el-table-column label="状态" width="80">
        <template slot-scope="scope">
          {{ scope.row.status === 1 ? '可用' : '不可用' }}
          <el-switch

            v-model="scope.row.status"
            :active-value=1
            :inactive-value=0
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="lockHospitalSet($event,scope.row,scope.$index)"
          >
          </el-switch>
        </template>

      </el-table-column>

      <el-table-column label="操作" width="280" align="center">
        <template slot-scope="scope">
          <el-button type="danger" size="mini"
                     icon="el-icon-delete" @click="removeDataById(scope.row.id)"></el-button>

          <router-link :key="$route.fullPath" :to="'/hospSet/edit/'+scope.row.id">
            <el-button type="primary" size="mini" icon="el-icon-edit"></el-button>
          </router-link>
        </template>
      </el-table-column>

    </el-table>
    <!-- 分页 -->
    <el-pagination
      :current-page="current"
      :page-size="limit"
      :total="total"
      style="padding: 30px 0; text-align: center;"
      layout="total, prev, pager, next, jumper"
      @current-change="getHospList"
    />

  </div>
</template>

<script>
import hospSet from '@/api/hospSet'

export default {
  //定义变量和初始值
  data() {
    return {
      current: 1,//当前页
      limit: 3,//每页显示条数
      searchObj: {},//条件封装对象
      list: [],//每页数据集合
      total: 0,
      multipleSelection: [] // 批量选择中选择的记录列表
    }
  },
  created() {//在页面渲染之前执行，一般是调用method中的方法，得到数据
    this.getHospList()
  },
  methods: {//定义方法，进行请求接口的调用
    //医院设置列表
    getHospList(page = 1) {
      this.current = page
      hospSet.getHospSetList(this.current, this.limit, this.searchObj)
        .then(response => { //response是接口返回的数据
          console.log(response.data)
          this.list = response.data.records,
            this.total = response.data.total
        })
        .catch(error => {
          console.log(error)
        })
    },
    removeDataById(id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        hospSet.removeDataById(id).then(response => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.getHospList(1)
        }).catch(error => {
          this.$message({
            type: 'error',
            message: '删除失败!'
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    //锁定和解锁
    lockHospitalSet(data, b, index) {
      console.log(b.status)
      // let status1;
      // if(b.status==1){
      //   status1=0
      // }else {
      //   status1=1
      // }
      hospSet.lockHospitalSet(b.id, b.status).then(response => {
        if (response.code == '200') {
          this.$message({
            type: 'success',
            message: '执行成功!'
          })
          // this.getHospList(1)
        } else {
          let newData = b
          newData.status = newData.status == 1 ? '0' : '1'
          this.list[index] = newData
        }
      }).catch(error => {
        this.$message({
          type: 'error',
          message: '执行失败!'
        })
      })
    },
    //获取选择复选框中的id值
    // 当表格复选框选项发生变化的时候触发
    handleSelectionChange(selection) {
      this.multipleSelection = selection
    },
    removeRows() {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        var idList = []
        //遍历数组得到每个id值，然后传入idlist里面
        for (let i = 0; i < this.multipleSelection.length; i++) {
          idList.push(this.multipleSelection[i].id)
        }
        hospSet.removeRows(idList)
          .then(response => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.getHospList(1)
          }).catch(error => {
          this.$message({
            type: 'error',
            message: '删除失败!'
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
</script>

<style scoped>
.heng {
  display: inline-block;
}
</style>
