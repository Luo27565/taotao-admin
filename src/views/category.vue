<template>
    <div class="main">
        <template>
          <el-button icon="el-icon-circle-plus" @click="addCategory">添加分类</el-button>
          <el-table
            :data="category.item"
            border
            stripe
            class="table">
            <el-table-column
              prop="cid"
              label="编号"
              align="center"
              width="150">
            </el-table-column>
            <el-table-column
              prop="cname"
              label="分类名称">
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              align="center"
              width="150">
                <template slot-scope="scope">
                  <el-button type="primary" icon="el-icon-edit" circle @click="editCategory(scope.row)"></el-button>
                </template>
              </el-table-column>
            </el-table>
          </template>
    </div>
</template>

<script>
import {getCategory, updateCategory, insertCategory} from '@/services/category';
import {openMessageByPrompt, openMessageByMessage} from '@/utils/message-box';
import { onMounted, reactive, ref } from '@vue/composition-api';
export default {
    name:'category',
    setup(props,{root}){
       const category = reactive({item:[]});

       // 获取种类
       const showCategory = (()=>{
          getCategory().then(
            res => {
              category.item = res.data;
            }
          ).catch(error => {})
       })

       // 更新种类名称
       const editCategory = (row) => {
         const message = ref('')
         const title = ref('渔具分类')
         const data = reactive({
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputValue: row.cname,
          inputPattern: /\S/,
          inputErrorMessage: '分类名称不能为空',
          beforeClose: (action, instance, done) => {
            if(action === 'confirm'&& instance.inputValue != row.cname){
              instance.confirmButtonLoading = true;
              instance.confirmButtonText = '更新中...';
              const qs = require('qs');
              const item = qs.stringify({cid:row.cid,cname:instance.inputValue});
              updateCategory(item).then(
                res => {
                  if(res.status===200&&res.data===1){
                    setTimeout(() => {
                      done();
                      setTimeout(() => {
                        instance.confirmButtonLoading = false;
                        showCategory();
                        const mes = reactive({
                          type:'success',
                          message: '更新成功'
                        });
                        openMessageByMessage(root,mes);
                      }, 300);
                    }, 1000);
                  }else{
                     setTimeout(() => {
                      done();
                      setTimeout(() => {
                        instance.confirmButtonLoading = false;
                        const mes = reactive({
                          type:'error',
                          message: '更新失败'
                        });
                        openMessageByMessage(root,mes);
                      }, 300);
                    }, 1000);
                  }
                } 
              )
            } else {
                done();
            }
          } 
         })
         openMessageByPrompt(root,message.value,title.value,data);
       }

      // 添加种类
      const addCategory = () => {
        const message = ref('请输入分类名称')
         const title = ref('渔具分类')
         const data = reactive({
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /\S/,
          inputErrorMessage: '分类名称不能为空',
          beforeClose: (action, instance, done) => {
            if(action === 'confirm'){
              instance.confirmButtonLoading = true;
              instance.confirmButtonText = '添加中...';
              const qs = require('qs');
              const item = qs.stringify({cname:instance.inputValue});
              insertCategory(item).then(
                res => {
                     if(res.status===200&&res.data===1){
                    setTimeout(() => {
                      done();
                      setTimeout(() => {
                        instance.confirmButtonLoading = false;
                        showCategory();
                        const mes = reactive({
                          type:'success',
                          message: '添加成功'
                        });
                        openMessageByMessage(root,mes);
                      }, 300);
                    }, 1000);
                  }else{
                     setTimeout(() => {
                      done();
                      setTimeout(() => {
                        instance.confirmButtonLoading = false;
                        const mes = reactive({
                          type:'error',
                          message: '添加失败'
                        });
                        openMessageByMessage(root,mes);
                      }, 300);
                    }, 1000);
                  }
                }
              )
            } else {
                done();
            }
          }
         })
         openMessageByPrompt(root,message.value,title.value,data);
      }

       onMounted(()=>{
         showCategory();
       })

       return{
         showCategory,
         category,
         editCategory,
         addCategory
       }
    }
}
</script>

<style lang="scss" scoped>
.main{
  padding: 20px;
}
.table{
  margin-top: 20px;
}
</style>