// 引入封装好的组件
import easyForm from "./libs/index.vue";
const componentList = [easyForm];
const install = (Vue)=> componentList.forEach((item) => Vue.component(item.name, item));
export default install; 