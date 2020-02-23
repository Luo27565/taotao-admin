<template>
    <div class="bread">
<el-breadcrumb separator-class="el-icon-arrow-right" class="crumb">
  <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item>{{name}}</el-breadcrumb-item>
</el-breadcrumb>
    </div>
</template>

<script>
import {watch, ref, reactive} from '@vue/composition-api';
export default {
    name:'breadCrumb',
    setup(props,{root}){
       const index = ref(root.$route.path);
       const crumb = new Array();
       reactive(root.$router.options.routes).filter( item =>{
           if(item.children){
               item.children.forEach(element => {
                  crumb.push(element);
               }); 
           }
       });
       const name = crumb.filter(item => item.path === index.value)[0].meta.name;
       return{
           index,
           name,
           crumb
       }
    },
    watch:{
	    $route(to,from){
            this.index = this.$route.path;
            this.name = this.crumb.filter(item =>item.path === this.index)[0].meta.name;
	    }
    }
}
</script>

<style lang="scss" scoped>
.bread{
    background-color: #fff;
    height: 56px;
    .crumb{
        padding-left: 20px;
        line-height: 56px;
    }
}
</style>