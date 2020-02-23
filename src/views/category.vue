<template>
    <div class="main">
      <template>
  <el-table
    :data="category.item"
    stripe>
    <el-table-column
      prop="cid"
      label="编号"
      align="center"
      width="100">
    </el-table-column>
    <el-table-column
      prop="cname"
      label="分类"
      align="center"
      width="400">
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      align="center"
      width="400">
      <template slot-scope="scope">
         <el-button type="primary" icon="el-icon-edit" circle @click="editCategory(scope.row)"></el-button>
      </template>
    </el-table-column>
  </el-table>
</template>
    </div>
</template>

<script>
import {getCategory} from '@/services/category';
import {openMessage} from '@/utils/message-box';
import { onMounted, reactive } from '@vue/composition-api';
export default {
    name:'category',
    setup(props,{root}){
       const category = reactive({item:[]});
       const showCategory = (()=>{
          getCategory().then(
            res => {
              category.item = res.data;
            }
          ).catch(error => {})
       })
       const editCategory = (row) => {
         console.log(row.cid);
         openMessage(root,{},row);
       }
       onMounted(()=>{
         showCategory();
       })
       return{
         showCategory,
         category,
         editCategory
       }
    }
}
</script>

<style lang="scss" scoped>
.main{
  padding: 20px;
}
</style>