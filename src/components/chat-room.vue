<template>
<section class="chat-room">
  <!-- <button @click="openChatModal" v-if="!isChatModalOpen"> Show Chat </button> -->
       <button class="btn-chat"><span class="material-icons" @click="openChatModal">textsms</span></button>
  <div v-if="isChatModalOpen" class="chat"> 
        <form @submit.prevent="sendChatMsg">
     <input type="textarea" v-model="chatMsg"/>
     </form>
    <!-- {{chatMsgs}} -->
    <ul>
      <li v-for="(chatMsg,idx) in chatMsgs" :key="chatMsg+idx"> <p>{{user.username}} : {{chatMsg}}</p> </li>
      </ul>
       <!-- <button @click="openChatModal"> Close Chat </button> -->
      </div>
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
      chatMsgs : [],
      user : null,
      isChatModalOpen : false,
        }
    },
    created () {
      setTimeout( () => {
          socketService.emit('chat topic', this.currStation._id)
        socketService.on('chat addMsg', msg => {
        this.chatMsgs.push(msg)
      })
      },1000)
      this.user = JSON.parse(sessionStorage.getItem('user'))
    },
    methods: {
         sendChatMsg() {
        socketService.emit('chat newMsg', this.chatMsg) 
        this.chatMsg = '';
    },
    openChatModal() {
      this.isChatModalOpen = !this.isChatModalOpen;
    }
    }
}
</script>

<style>

</style>