<template>
  <div class="container">
    
    <div class="seach">
      <el-form :inline="true" size="medium" v-model="search" class="form">
                <el-form-item label="渔具分类：">
                  <el-select v-model="search.cid">
                     <el-option label="不限" key="" value=""></el-option>
                     <el-option
                      v-for="item in category.item"
                      :key="item.cid"
                      :label="item.cname"
                      :value="item.cid">
                     </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="渔具名称">
                  <el-input v-model="search.fname" placeholder="请输入渔具名称关键字"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="onSubmit">查询</el-button>
                </el-form-item>
        </el-form>
    </div>
    <div class="main">
      <el-table
              border
              :data="fishing.item"
              stripe>
            <el-table-column
              prop="fid"
              label="编号"
              align="center"
              width="80">
            </el-table-column>
            <el-table-column
              prop="fname"
              label="渔具名称">
            </el-table-column>
            <el-table-column
              label="渔具价格"
              width="80">
              <template slot-scope="scope">
                <span>{{ scope.row.price}}元</span>
              </template>
            </el-table-column>
            <el-table-column
              label="渔具库存"
              width="80">
              <template slot-scope="scope">
                <span :class="{'stock':scope.row.stock<100}">{{ scope.row.stock}}件</span>
              </template>
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              align="center"
              width="250">
                <template>
                  <el-button type="primary" icon="el-icon-edit" circle></el-button>
                </template>
              </el-table-column>
            </el-table>
    </div>
    <div class="foot">
      <el-pagination
            class="pagination"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :page-sizes="[8, 10, 15, 20]"
            page-size="search.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
      </el-pagination>
    </div>

  </div>
</template>

<script>
import {getCategory} from '@/services/category';
import { countFishing, getFishing } from '@/services/fishing';
import { onMounted, reactive, ref } from '@vue/composition-api';
export default {
    name:'detail',
     setup(props,{root}){

         const category = reactive({item:[]});
         const search = reactive({cid:'',fname:'',pageNumber:1,pageSize:8});
         const fishing = reactive({item:[]});
         const total = ref(0);

         const showFishing = data => {
           getFishing(data).then(
             res => {
               if(res.status===200){
                 fishing.item = res.data.list;
                 total.value = res.data.total
               }
             }
           ).catch(error => {})
         }

         const onSubmit = () => {
           showFishing(search);
         }

         const showSelect = () => {
            getCategory().then(
            res => {
              category.item = res.data;
            }
            ).catch(error => {})
         }

         const showCount = () => {
            countFishing().then(
             res => {
               if(res.status===200){
                total.value = res.data;
               }
             }
           ).catch(error => {})
         }

         const init = () => {
           showCount();
           showSelect();
           showFishing(search);
         }

         const handleSizeChange = val => {
           search.pageSize = val;
           showFishing(search);
         }

         const handleCurrentChange = val => {
           search.pageNumber = val;
           showFishing(search);
         }


          onMounted(()=>{
            init();
          })

          return{
            category,
            search,
            onSubmit,
            total,
            handleSizeChange,
            handleCurrentChange,
            fishing
          }
     }
}
</script>

<style lang="scss" scoped>
.container{
  margin: 20px;
  height: 80vh;
  background: #fff;
  display: flex;
  flex-direction: column;
  
  .seach{
    .form{
      padding: 10px 0 0 10px;
    }
  }

  .main{
    flex: 1;
    margin: 0 10px;
    overflow: auto;
    .stock{
      color: red;
    }
  }

  .foot{
    align-self: flex-end;
    .pagination{
      padding: 10px 10px 10px 0;
    }
  }

}
</style>