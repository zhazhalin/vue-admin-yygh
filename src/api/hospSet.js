import request from '@/utils/request'

export default {
  getHospSetList(current,limit,searchObj) {
    return request({
      url: `/admin/hosp/hospitalSet/findPageHospSet/${current}/${limit}`,
      method: 'post',
      data:searchObj //使用json进行传递
    })
  },
  //删除医院设置
  removeDataById(id){
    return request({
      url: `/admin/hosp/hospitalSet/${id}`,
      method: 'delete',
    })
  },
//批量删除
  batchHospDelete(idList){
    return request({
      url: `/admin/hosp/hospitalSet/batchRemove`,
      method: 'delete',
      data:idList
    })
  },
  //锁定和取消锁定
  lockHospitalSet(id,status){
    return request({
      url: `/admin/hosp/hospitalSet/lockHospitalSet/${id}/${status}`,
      method: 'put',
    })
  },
  //添加医院设置
  saveHospSet(hospitalSet){
    return request({
      url: `/admin/hosp/hospitalSet/saveHospitalSet`,
      method: 'post',
      data:hospitalSet
    })
  },

  //修改医院设置
  updateHospSet(hospitalSet) {
    return request ({
      url: `/admin/hosp/hospitalSet/updateHospitalSet`,
      method: 'post',
      data: hospitalSet
    })
  },
  getHospSet(id) {
    return request ({
      url: `/admin/hosp/hospitalSet/getHospSet/${id}`,
      method: 'get',
    })
  }

}
