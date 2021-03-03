import PopComponent from './Pop.vue'

const Pop = {}

Pop.install = (Vue) => {
  // 注册Pop组件
  const PopConstructor = Vue.extend(PopComponent)
  const instance = new PopConstructor()
  instance.$mount(document.createElement('div'))
  document.body.appendChild(instance.$el)

  // 4. 添加实例方法，以供全局调用
  Vue.prototype.$pop = (type, msg) => {
    // 逻辑...
    instance.type = type
    instance.msg = msg
    instance.isShow = true
  }

}

export default Pop
