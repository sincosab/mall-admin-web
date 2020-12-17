import request from '@/utils/request'
export function listCrawlSite(params) {
  return request({
    url:'/list',
    method:'get',
    params:params
  })
}
export function createCrawlSite(data) {
  return request({
    url:'/create',
    method:'post',
    data:data
  })
}

export function deleteCrawlSite(id) {
  return request({
    url:'/delete/'+id,
    method:'get',
  })
}

export function getCrawlSite(id) {
  return request({
    url:'/'+id,
    method:'get',
  })
}

export function updateCrawlSite(id,data) {
  return request({
    url:'/update/'+id,
    method:'post',
    data:data
  })
}

export function updateStatus(data) {
  return request({
    url:'/crawlSite/update',
    method:'post',
    data:data
  })
}