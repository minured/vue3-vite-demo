<template>
  <p>{{ msg }}</p>
  <p>{{ list }}</p>
</template>

<script lang='ts'>
import { toRaw } from 'vue';
export default {
    name: 'Test',
    props: {
      msg: String,
      list: Array
    },
    setup(props) {
      console.log('子组件log, setup获得的 props');
      console.log(props);
      console.log(props.msg);
      console.log(props.list);

      
      // props 是只读的，不能修改
      // props.msg = "new msg"

      let originProps = toRaw(props)
      // toRaw 将Proxy对象 还原为数据原来的类型
      // 下面就是将 props 还原为一个普通对象
      console.log(originProps);
    }


}
</script>

<style>

</style>