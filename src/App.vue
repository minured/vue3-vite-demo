<template>
  <HelloWorld msg="Vue 3.0 + Vite" />
  <hr />
  <p @click="onResponseDataAdd">响应式数据ref：{{ responseData }}</p>
  <p @click="onNotResponseDataAdd">非响应式数据： {{ notResponseData }}</p>
  <hr />
  <p>reactive数据， 使用proxy 可以深入监听对象内部</p>
  <ul>
    <li v-for="(item, i) in reactiveData" :key="i">{{ item }}</li>
  </ul>
  <hr />
  <p>toRefs 把 reactive 转化为 ref，对象失去了深入监听</p>
  <p>{{ list }}</p>
  <button @click="onChangeList">修改ref类型的对象</button>
  <h4 ref="h4">ref 绑定 dom</h4>
  <!-- 组件系统 -->
  <hr />
  <h4>vue3 的三种组件</h4>
  <p>1、传统的单文件组件 .vue</p>
  <Test msg="来自父组件的props" :list="list" />
  <p>2、tsx/jsx 组件</p>
  <TSXComponent
    name="minured"
    @updateName="onUpdateName"
    msg="利用attrs直接传值"
  />
</template>

<script lang="ts">
import HelloWorld from "./components/HelloWorld.vue";
import Test from "./components/Test.vue";
import TSXComponent from "./components/TSXComponent";

// 在vue3中， 大部分都是先引入后调用
import {
  nextTick,
  onBeforeMount,
  onMounted,
  reactive,
  ref,
  toRefs,
  watch,
  watchEffect,
} from "vue";

export default {
  name: "App",
  components: {
    TSXComponent,
    HelloWorld,
    Test,
  },

  // setup是入口函数，
  // 相当于以前的 beforeCreate 和 created，其他生命周期在 setup 中调用
  setup() {
    // 生命周期
    console.log("setup");
    onBeforeMount(() => {
      console.log("onBeforeMount");
    });
    onMounted(() => {
      console.log("onMounted");

      // 同名的ref在mounted之后，获取绑定的 dom
      console.log(h4.value);
    });
    nextTick(() => {
      console.log("nextTick");
    });

    // ref绑定dom，顶一个同名的ref，并传入null
    // 在onMounted之后 该ref既可以获得 绑定的dom
    let h4 = ref(null);

    // 响应式数据ref, RefImpl类型
    // 注意 ref 的值的使用， 只有在template不需要加 value
    let responseData = ref(18);
    console.log(responseData);

    let notResponseData = 17;

    // 响应式对象reactive, Proxy类型
    let state1 = reactive({
      reactiveData: [1, 2, 3, 4, 5],
    });
    console.log(state1);

    // 定义多个reactive state
    let state2 = reactive({
      list: [5, 4, 3, 2, 1],
    });

    // 函数定义
    const methods = {
      onResponseDataAdd() {
        // ref的修改要加 value
        responseData.value += 1;
      },
      onNotResponseDataAdd() {
        notResponseData += 1;
        console.log(notResponseData);
      },
      onChangeList() {
        state2.list.push(8);
      },
      onUpdateName(newName) {
        console.log("触发 updateName： " + newName);
      },
    };

    // watch支持监听多个值
    // 只要有一个值变化，就会触发handler
    // handler 入参一个 当前变动的最新值
    // watch只可以监听 响应式的数据
    watch([state1.reactiveData, responseData, state2.list], (newValue) => {
      // newVal为 变动后的所有值， 就是第一个参数， 为数组。并不是变动的那个值
      console.log(`值发生改变， 最新值为：${newValue}`);
    });

    // 副作用函数
    // 函数体用到的响应式数据， 首次加载会触发， 当前值发生变化也会触发
    watchEffect(() => {
      console.log("watchEffect-触发");
      console.log(responseData.value);
    });

    // setTimeout的执行时机
    setTimeout(() => {
      console.log("setTimeout 触发");
      responseData.value += 1;
    }, 2000);

    // setup通过return来输出数据
    // 相当于以前的data，可以在模板中使用
    // 经常忘记：任何要在template使用的数据 都要return，
    return {
      responseData,
      notResponseData,

      //函数 和 state 的使用 要注意析构
      ...methods,
      ...state1,

      // toRefs 把 state 转换为 ref
      ...toRefs(state2),
      h4,
    };
  },

  // vue3 的组件系统
  // vue3 支持jsx
};
</script>
