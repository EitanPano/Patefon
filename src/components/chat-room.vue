<template>
    <section class="chat-room">
        <button v-if="!isChatModalOpen" class="btn-chat">
            <span class="material-icons" @click="openChatModal">textsms</span>
        </button>
        <transition name="rise">
            <div v-if="isChatModalOpen" class="chat">
                <div class="chat-header flex space-between">
                    <p class="highlight normal">Station Chat</p>
                    <button
                        class="btn-close flex align-center"
                        @click="openChatModal"
                    >
                        <span class="normal material-icons">close</span>
                    </button>
                </div>
                <ul>
                    <li v-for="(chatMsg, idx) in chatMsgs" :key="chatMsg + idx">
                        <p>{{ user.username }} : {{ chatMsg }}</p>
                    </li>
                </ul>
                <form class="chat-form" @submit.prevent="sendChatMsg">
                    <button class="btn-send">
                        <span class="material-icons">send</span>
                    </button>
                    <input type="textarea" v-model="chatMsg" />
                </form>
            </div>
        </transition>
    </section>
</template>

<script>
import { socketService } from "../services/socket.service";
export default {
    props: ["currStation"],
    data() {
        return {
            chatMsg: "",
            chatMsgs: [],
            user: null,
            isChatModalOpen: false,
        };
    },
    created() {
        setTimeout(() => {
            socketService.emit("chat topic", this.currStation._id);
            socketService.on("chat addMsg", (msg) => {
                this.chatMsgs.push(msg);
            });
        }, 1000);
        this.user = JSON.parse(sessionStorage.getItem("user"));
    },
    methods: {
        sendChatMsg() {
            socketService.emit("chat newMsg", this.chatMsg);
            this.chatMsg = "";
        },
        openChatModal() {
            this.isChatModalOpen = !this.isChatModalOpen;
        },
    },
};
</script>

<style>
</style>