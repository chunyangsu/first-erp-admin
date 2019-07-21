import remarkComponent from './Remark'

const Remark = {
  install: function(Vue) {
    Vue.component('Remark', remarkComponent)
  }
}

export default Remark
