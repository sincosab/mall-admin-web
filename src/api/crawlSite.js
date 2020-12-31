import request from '@/utils/request'
export function listCrawlSite(params) {
  return request({
    url:'/crawlSite/list',
    method:'get',
    params:params
  })
}
export function createCrawlSite(data) {
  return request({
    url:'/crawlSite/create',
    method:'post',
    data:data
  })
}
export function updateStatus(data) {
  return request({
    url:'/crawlSite/updateStatus',
    method:'post',
    data:data
  })
}
export function getCrawlSite(id) {
  return request({
    url:'/crawlSite/'+id,
    method:'get',
  })
}

export function updateCrawlSite(id,data) {
  return request({
    url:'/crawlSite/update/'+id,
    method:'post',
    data:data
  })
}

  export function deleteCrawlSite(id) {
    return request({
      url:'/crawlSite/delete/'+id,
      method:'get',
    })
  }


