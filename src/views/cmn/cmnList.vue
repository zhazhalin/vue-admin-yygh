<template>
  <div class="app-container">
    <el-table
      :data="list"
      style="width: 100%"
      row-key="id"
      border
      lazy
      :load="getChildrens"
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
      <el-table-column label="名称" width="230" align="left">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column label="编码" width="220">
        <template slot-scope="{row}">
          {{ row.dictCode }}
        </template>
      </el-table-column>
      <el-table-column label="值" width="230" align="left">
        <template slot-scope="scope">
          <span>{{ scope.row.value }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.createTime }}</span>
        </template>
      </el-table-column>
    </el-table>

  </div>
</template>

<script>
import cmnList from '../../api/cmnList'

export default {
  data() {
    return {
      list:[]
    }
  }, created() {
    this.getCmnList(1)
  },
  methods: {
    getCmnList(id) {
      cmnList.getList(id).then(response => {
        console.log(response.data)
        this.list=response.data
      })
    },
    getChildrens(tree, treeNode, resolve) {
      cmnList.getList(tree.id).then(response => {
        resolve(response.data)
      })
    }
  }
}
</script>

<style scoped>

</style>
