<template>
<section class="chat-room">
     <input type="textarea" v-model="chatMsg"/>
    <button @click="sendChatMsg"> Send Chat Message </button>
    {{chatMsgs}}
    </section>
</template>

<script>
import { socketService } from '../services/socket.service'
export default {
  props : ['currStation']
  ,
    data() {
        return {
      chatMsg : '',
      chatMsgs : []
        }
    },
    created () {
    
  socketService.emit('chat topic', this.currStation._id)
        socketService.on('chat addMsg', msg => {
        this.chatMsgs.push(msg)
      })
    },
    methods: {
         sendChatMsg() {
        socketService.emit('chat newMsg', this.chatMsg) 
    },
    }
}
</script>

<style>

</style>