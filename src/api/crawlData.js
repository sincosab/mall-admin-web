import request from '@/utils/request'
export function listCrawlData(params) {
  return request({
    url:'/list',
    method:'get',
    params:params
  })
}
export function createCrawlData(data) {
  return request({
    url:'/create',
    method:'post',
    data:data
  })
}

export function deleteCrawlData(id) {
  return request({
    url:'/delete/'+id,
    method:'get',
  })
}

export function getCrawlData(id) {
  return request({
    url:'/'+id,
    method:'get',
  })
}

export function updateCrawlData(id,data) {
  return request({
    url:'/update/'+id,
    method:'post',
    data:data
  })
}

