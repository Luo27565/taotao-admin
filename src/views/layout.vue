<template>
    <div>
        <el-container class="container">
            <el-header height="60px">
               <div class="header">
                    <div class="header-font">后台管理</div>
                    <div>
                        <el-button class="el-icon-switch-button" circle/>
                    </div>
                </div>
            </el-header>
            <el-container>
                <el-aside width="200px">
                    <NavMenu/>
                </el-aside>
                <el-main>
                    <BreadCrumb v-show='show'/>
                    <router-view/>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
import {watch, ref} from '@vue/composition-api';
import NavMenu from '@/components/nav-menu.vue';
import BreadCrumb from '@/components/bread-crumb.vue';
export default {
    name:'layout',
    components:{NavMenu,BreadCrumb},
       setup(props,{root}){
       const show = ref(root.$route.path.substr(1)).value==='index'? false : true;
       return{
           show
       }
    },
    watch:{
	    $route(to,from){
            this.show = this.$route.path.substr(1)==='index'? false : true;
	    }
    }
}
</script>

<style lang="scss" scoped>
    .container {
        height: 100vh;
    }

    .el-header {
        background-color: #344a5f;
        color: #fff;

        .header {
            height: 60px;
            display: flex;
            justify-content: space-between;
            align-items: center;

            .header-font {
                font-size: 20px;
            }
        }
    }

    .el-aside {
        background-color: #EEF5F9;
    }

    .el-main{
        padding: 0;
        background-color: #EEF5F9;
    }

</style>