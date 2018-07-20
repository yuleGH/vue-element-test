# 渲染：
1. {{}}    转义输出
2. v-html  原样输出
3. :title  属性
4. @click  事件

# 指令
1. v-bind 渲染属性
2. v-on   事件
3. v-model  双向绑定
4. v-html
5. v-for   array、string、number、json  
        :key能带来性能上的改进

# 显示
1. v-if    删除、插入DOM节点
2. v-show  显示、隐藏——display  
    配合使用：<transition></transition>  带动画的

# 其他
1. v-cloak

# 提高性能
1. v-once 仅渲染一次
2. v-pre 禁用某一个标签里面的表达式（即{{}}）

# 计算属性
1. getter setter
2. 受控制的访问——get/set
3.
```js
    data: {num1: 0, num2: 0}
    computed: {
        a: {
            get: function(){
                return this.num1;
            },
            set: function(newVal){
                this.num1 = parseInt(newVal);
            }
        }
    }
```

# 监听
1. 当数据变化的时候，有通知

# 坑
1. 变量：_a ；vue自己使用带_的作为一个内部用的，所以我们不能这样用。

# 修饰符
1. 事件的修饰符  eg：@submit.prevent=""

# 对比
1. data  普通属性
2. methods   普通方法
3. computed  计算数据  简单、可缓存；调用的属性会很频繁，可以使用计算属性，提高性能效率；同步操作
4. 监听   异步操作
    数据变了通知你，然后做什么操作自己慢慢做

# vue-router 前端路由
1. 申明路由
```js
let r1 = new VueRouter({
    routes: [
        {path, componet}
    ]
});
let vm = new Vue({
    el: '#div1',
    router: r1
});

<div id="div1">
    <a href="#/path">啦啦啦</a>
    <router-link to="/path">啦啦啦</router-link>
    <router-view></route-view>
<div>
```

2. 调用路由
3. 用法：
<br>渲染容器：<router-view></route-view>
        router的componet会被渲染到里面
    <br>路由跳转：<router-link to="/path">文字</router-link>
4. js操作路由：
    <br>this.$router.go(1);
    <br>this.$router.push(/path);
5. 路由参数:
    <br>path: 'user/:id'
    <br>$route.params.id
6. 监听跳转
    - Vue的watch 不推荐
    - VueRouter里的beforeRouteUpdate
        ```js
            beforeRouteUpdate(to, from, next){
                //走路由跳转
                next();
                //不希望路由切换，则不写next();
            }
        ```

7.
