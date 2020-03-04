<template>
  <div class="container" id="loading">
    
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
              min-width="500"
              label="渔具名称">
              <template slot-scope="scope">
                <el-popover placement="top-end" trigger="click">
                  <el-image  style="width: 200px; height: 200px" :src="scope.row.image"></el-image>
                  <div slot="reference">
                    <el-tag class="tag">{{scope.row.fname}}</el-tag>
                    <el-badge v-if='scope.row.stock<100' class="mark" value="缺货" />
                    <el-badge v-if='scope.row.isSpecial===1' class="mark" value="特价" type="warning"/>
                  </div>
                </el-popover>
              </template>
            </el-table-column>
            <el-table-column 
            label="渔具分类"
            width="150">
            <template slot-scope="scope">
                <span>{{category.obj[scope.row.cid]}}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="渔具价格"
              width="120">
              <template slot-scope="scope">
                  <span>{{ scope.row.price}}元</span>
              </template>
            </el-table-column>
            <el-table-column
              label="渔具库存"
              width="120">
              <template slot-scope="scope">
                <span>{{ scope.row.stock}}件</span>
              </template>
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              align="center"
              width="250">
                <template slot-scope="scope">
                  <el-tooltip content="添加轮播图" placement="top" effect="light">
                  <i class="el-icon-picture-outline icon" />
                  </el-tooltip>
                  <el-tooltip content="查看详情" placement="top" effect="light">
                  <i class="el-icon-thumb icon" @click="viewDetail(scope.row.detail)"></i>
                  </el-tooltip>
                  <el-tooltip v-if='scope.row.isSpecial===0' content="开启特价" placement="top" effect="light">
                  <i class="el-icon-turn-off icon" @click="startSpecial(scope.row.fid)"></i>
                  </el-tooltip>
                  <el-tooltip v-if='scope.row.isSpecial===1' content="关闭特价" placement="top" effect="light">
                  <i class="el-icon-open icon" @click="stopSpecial(scope.row.fid)"></i>
                  </el-tooltip>
                  <el-tooltip content="编辑" placement="top" effect="light">
                  <i class="el-icon-edit icon"></i>
                  </el-tooltip>
                  <el-tooltip content="删除" placement="top" effect="light">
                  <i class="el-icon-delete icon"></i>
                  </el-tooltip>
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
            :page-size="search.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
      </el-pagination>
    </div>

  </div>
</template>

<script>
import { setLoading, closeLoading } from '@/utils/loading';
import {getCategory} from '@/services/category';
import { countFishing, getFishing, openOnSale, closeOnSale } from '@/services/fishing';
import { onMounted, reactive, ref } from '@vue/composition-api';
export default {
    name:'detail',
     setup(props,{root}){

         const category = reactive({item:[],obj:{}});
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
              res.data.map( item => {
                category.obj[item.cid] = item.cname;
              })
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

         const viewDetail = value => {
           console.log(value)
         }

         const startSpecial = value => {
           const qs = require('qs');
           const item = qs.stringify({fid:value});
           const loading = reactive({lock:true,text:'更新中...',background: 'rgba(255, 255, 255, 0.5)',target:'#loading'})
           openOnSale(item).then(
             res => {
               setLoading(loading);
               if(res.data===1&&res.status===200){
                 showFishing(search);
               }
               setTimeout(() => closeLoading(),1000)
             }
           ).catch(error => {})
         }

         const stopSpecial = value => {
           const qs = require('qs');
           const item = qs.stringify({fid:value});
           const loading = reactive({lock:true,text:'更新中...',background: 'rgba(255, 255, 255, 0.5)',target:'#loading'})
           closeOnSale(item).then(
             res => {
               setLoading(loading);
               if(res.data===1&&res.status===200){
                 showFishing(search);
               }
               setTimeout(() => closeLoading(),1000)
             }
           ).catch(error => {})
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
            fishing,
            viewDetail,
            startSpecial,
            stopSpecial
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
    .tag{
      cursor: pointer;
      height: 36px;
      line-height: 36px;
    }
    .mark{
      margin-left: 10px;
      line-height: 16px;
    }
    .icon{
      color: #3a8ee6;
      font-size: 1.5em;
      cursor: pointer;
      margin: 0 10px;
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