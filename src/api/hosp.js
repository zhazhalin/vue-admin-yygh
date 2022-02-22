import request from '@/utils/request'

export default {
  //医院列表设置
  getHospList(page,limit,searchObj) {
    return request({
      url: `/admin/hosp/hospital/${page}/${limit}`,
      method: 'get',
      params:searchObj
    })
  },
  //根据dictcode查询所有子节点(所有省)
  findByDictCode(dictCode){
    return request({
      url: `/admin/cmn/dict/findByDictCode/${dictCode}`,
      method: 'get',
    })
  },
//根据省查询所有的市
  findChildData(id){
    return request({
      url: `/admin/cmn/dict/findChildData/${id}`,
      method: 'get',
    })
  },
  //updateStatus更新上线状态
  updateStatus(id,status){
    return request({
      url: `/admin/hosp/hospital/status/${id}/${status}`,
      method: 'put',
    })
  },
  //获取医院详细信息
  getDetailById(id){
    return request({
      url: `/admin/hosp/hospital/detail/${id}`,
      method: 'get',
    })
  },
//获取科室信息
  getDeptByHoscode(hoscode) {
    return request ({
      url: `/admin/hosp/department/${hoscode}`,
      method: 'get',
    })
  },
  //分页查询预约规则
  getScheduleRule(page, limit, hoscode, depcode) {
    return request({
      url: `/admin/hosp/schedule/getScheduleRule/${page}/${limit}/${hoscode}/${depcode}`,
      method: 'get'
    })
  },
  //查询排班详情
  getScheduleDetail(hoscode,depcode,workDate) {
    return request ({
      url: `/admin/hosp/schedule/getScheduleDetail/${hoscode}/${depcode}/${workDate}`,
      method: 'get'
    })
  }
}
