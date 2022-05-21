import {ref} from 'vue'
import {defineStore} from 'pinia'
import {VIEW_TAGS} from '@/utils/constant'




const viewTagsStore = defineStore(VIEW_TAGS, () => {
  const viewTags = ref([])

  const isSame = (route1, route2) => {
    if (route1.name !== route2.name) {
      return false
    }
    if (Object.keys(route1.query).length !== Object.keys(route2.query).length || Object.keys(route1.params).length !== Object.keys(route2.params).length) {
      return false
    }
    for (const key in route1.query) {
      if (route1.query[key] !== route2.query[key]) {
        return false
      }
    }
    for (const key in route1.params) {
      if (route1.params[key] !== route2.params[key]) {
        return false
      }
    }
    return true
  }


  function pushViewTags(route) {

    // console.log("leven",route.value)
    // let target = viewTags.value.find(item =>{
    //
    //
    //   console.log("item",item.fullPath,route.fullPath);
    //   return item.fullPath === route.fullPath
    //   }
    // )
     console.log("fuck",route)

   // let isName = route.name

    if (!viewTags.value.some((item) => isSame(item, route))) {
      const obj = {}
      obj.name = route.name
      obj.meta = { ...route.meta }
      delete obj.meta.matched
      obj.query = route.query
      obj.params = route.params
      obj.fullPath=route.fullPath
      console.log(obj)
      viewTags.value.push(obj)
    }
    // if(  isName){
    //   console.log("route:",route)
    //
    //   if (!historys.value.some((item) => isSame(item, route))) {
    //     const obj = {}
    //     obj.name = route.name
    //     obj.meta = { ...route.meta }
    //     delete obj.meta.matched
    //     obj.query = route.query
    //     obj.params = route.params
    //     console.log(obj)
    //     historys.value.push(obj)
    //   }
    //   viewTags.value.push(route)
    //   viewTags.value.forEach((item,index)=>{
    //     console.log(item.name,index)
    //   })
    // }
  }

  function removeViewTags(route){
    viewTags.value.forEach((item, index) => {
      if (item.fullPath === route.fullPath){
        viewTags.value.splice(index, 1)
      }
    })
  }

  function updateViewTags(route){
    viewTags.value.forEach(item => {
      if (item.fullPath === route.fullPath){
        item = {...item, ...route}
      }
    })
    console.log('viewTags.value', viewTags.value)
  }

  function updateViewTagsTitle(title = ''){
    const nowFullPath = location.hash.substring(1)
    viewTags.value.forEach(item => {
      if (item.fullPath === nowFullPath){
        item.meta.title = title
      }
    })
  }

  function clearViewTags(){
    viewTags.value = []
  }

  return {
    viewTags,
    pushViewTags, removeViewTags, updateViewTags, updateViewTagsTitle, clearViewTags
  }
})

export default viewTagsStore
