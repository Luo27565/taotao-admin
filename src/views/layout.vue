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
                    <router-view/>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
import NavMenu from '@/components/nav-menu.vue';
export default {
    name:'layout',
    components:{NavMenu},
}
</script>

<style lang="scss" scoped>
    .container {
        height: 100vh;
    }

    .el-header {
        background-color: #EEF5F9;

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

</style>