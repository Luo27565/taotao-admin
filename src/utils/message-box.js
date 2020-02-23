export function openMessage(root,data,item){
    console.log(data);
    root.$msgbox({
        title:'渔具分类',
        showCancelButton: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        showInput: true,
        inputValue:item.cname,
       // inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
       // inputErrorMessage: '邮箱格式不正确'
      }).then(({ value }) => {
        root.$message({
          type: 'success',
          message: '你的邮箱是: ' + value
        });
      }).catch(() => {   
      });
}