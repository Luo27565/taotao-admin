<template>
    <div>
        <el-menu router :default-active="navMenus[0].path">
           <template v-for="(item,index) in navMenus">
               <el-menu-item v-if="!item.meta" :key="index" :index="item.path">
                    <svg class="svg" aria-hidden="true">
                        <use :xlink:href="item.children[0].meta.icon"></use> 
                    </svg>
                    <span class="font">{{item.children[0].meta.name}}</span>
               </el-menu-item>
               <el-submenu v-if="item.meta" :key="index" :index="item.path">
                   <template slot="title">
                   <svg class="svg" aria-hidden="true">
                        <use :xlink:href="item.meta.icon"></use> 
                    </svg>
                    <span class="font">{{item.meta.name}}</span>
                    </template> 
                    <el-menu-item v-for="(val,group) of item.children" :key="group" :index="val.path">
                        <svg class="svg" aria-hidden="true">
                            <use :xlink:href="val.meta.icon"></use> 
                        </svg>
                        <span class="font">{{val.meta.name}}</span>
                    </el-menu-item>
               </el-submenu>
           </template>
        </el-menu>
    </div>
</template>

<script>
import {reactive} from '@vue/composition-api';
export default {
    name:'navMenu',
    setup(props,{root}){
       const navMenus = reactive(root.$router.options.routes).filter(value => !value.hidden);
       return{
           navMenus
       }
    }
}
</script>

<style lang="scss" scoped>
.svg{
    font-size: 24px;
    padding: 0 16px 0 0;
    width: 1em;
    height: 1em;
    vertical-align: -0.35em;
}
.el-menu-item.is-active {
    color: #ffffff;
    background-color: 	#00BFFF;
}
</style>