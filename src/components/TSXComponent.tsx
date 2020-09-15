export default {

    // 通过setup返回 attrs 和 emit
    // 但是要写在 第二个参数 ，因为 props 第一个参数
    // setup(
    //     props: Object, {attrs, emit}: {attrs: {name: String}, emit: Function}
    // ) {
    //     console.log("======log from setup======");
    //     console.log(attrs);
    //     console.log(emit);
    //     return { attrs, emit }
    // },

    // tsx 使用render函数
    // 这列应该就是利用了之前 返回的 attrs emit，把它定义到新的props上 
    // 实际上这个不叫 props， 只是我们定义的， 应该改名，否则会产生歧义

    // 或者直接通过 this调用，不应该用props
    // setup返回的 数据，会直接挂载到this上，都可以通过 this调用

    // 接下来就是 为什么父组件直接传 name 就可以
    
    // 最后 就是 直接使用 this.$emit  this.$attrs， 这个就可以可以在 this引用


    render(
        // tools: {attrs: {name: String}, emit: Function}
        arg
    ) {
        console.log("========log from render======");
        console.log(arg);
        console.log(this);

        console.log(this === arg);   //true
        // render函数中,第一个参数就是this

        // 通过返回 tsx 作为模板
        return (
            <div 
                onClick={() => {
                    // this.emit('updateName', "newName from tsxComponent")
                    this.$emit('updateName', "newName from tsxComponent")
                }}
            >
                hello {this.$attrs.name} &nbsp;
                {this.$attrs.msg}
            </div>
        )
    }
}
