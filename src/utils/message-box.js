export function openMessageByPrompt(root,message,title,data){
    root.$prompt(message,title,data).then(() => {
      }).catch(() => {   
      });
}

export function openMessageByMessage(root,data){
  root.$message(data);
}