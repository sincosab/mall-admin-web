import request from '@/utils/request'
export function listCrawlData(params) {
  return request({
    url:'/crawlData/list',
    method:'get',
    params:params
  })
}
export function createCrawlData(data) {
  return request({
    url:'/crawlData/create',
    method:'post',
    data:data
  })
}
export function updateStatus(data) {
  return request({
    url:'/crawlData/updateStatus',
    method:'post',
    data:data
  })
}
export function getCrawlData(id) {
  return request({
    url:'/crawlData/'+id,
    method:'get',
  })
}

export function updateCrawlData(id,data) {
  return request({
    url:'/crawlData/update/'+id,
    method:'post',
    data:data
  })
}

  export function deleteCrawlData(id) {
    return request({
      url:'/crawlData/delete/'+id,
      method:'get',
    })
  }


