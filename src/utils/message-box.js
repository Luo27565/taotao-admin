import {MessageBox}  from 'element-ui';
import { Message } from 'element-ui';

export function openMessageByPrompt(message,title,data){
    MessageBox.prompt(message,title,data).then(() => {
      }).catch(() => {   
      });
}

export function openMessageByMessage(data){
    Message(data);
}