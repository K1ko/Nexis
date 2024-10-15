<template>
  <q-page padding>
    <q-infinite-scroll
      reverse
      @load="loadMoreMessages"
      :offset="200">
      <template v-slot:loading>
        <div class="row justify-center q-my-md">
          <q-spinner color="primary" name="dots" size="40px"/>
        </div>
      </template>
      <div class="q-pa-md row items-start justify-end">

        <div style="width: 100%;">
          <q-chat-message
            label="Sunday, 19th"
          />

          <q-chat-message
            v-for="(message, index) in messages"
            :key="index"
            :name="message.userName"
            :avatar="message.avatar"
            :text="[message.text]"
            :stamp="message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })"
            :sent="message.userName === '1'"
            :bg-color="message.userName === '1' ? 'info' : 'primary'"
          ></q-chat-message>
        </div>
      </div>
    </q-infinite-scroll>
    <q-footer class="flex-footer">
      <PromptComponent v-model="text" @send-message="sendMessage"/>
    </q-footer>
  </q-page>
</template>

<script lang="ts">
import {defineComponent, ref} from 'vue';
import PromptComponent from 'components/PromptComponent.vue';


interface Message {
  id: number;
  userName: string;
  channelId: number;
  text: string;
  timestamp: Date ;
  avatar: string;
}

export default defineComponent({
  components: {PromptComponent},
  name: 'ContentPage',
  setup() {
    const text = ref('');
    const messages = ref<Message[]>([
      {id: 1, userName: 'GogomanTV', channelId: 1, text: 'Pozor zítra', timestamp: new Date(), avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnlhmIMyTezz0ViDYMMvoOVNESnBQqCi2HcA&s'},
      {id: 2, userName: 'Palo Ščerba', channelId: 1, text: 'Kedy bude ďalšia súťaž?', timestamp: new Date(), avatar: 'https://i.ytimg.com/vi/DUZWiXmMoC0/maxresdefault.jpg'},
      {id: 3, userName: 'ResttPowered', channelId: 1, text: 'nehehehe', timestamp: new Date(), avatar: 'https://fs5.mojevideo.sk/imgxl/141577.jpg'},
      {id: 4, userName: '1', channelId: 1, text: 'jakoooo', timestamp: new Date(), avatar: 'https://cdn.quasar.dev/img/avatar.png'},
      {id: 5, userName: 'Separ', channelId: 1, text: 'Kupil som si nove lambo', timestamp: new Date(), avatar: 'https://cdn.ticketlive.cz/upload/obrazek/nahled/o16tp-separ.jpg'},
      {id: 6, userName: 'ResttPowered', channelId: 1, text: 'elektrika je lepšia', timestamp: new Date(), avatar: 'https://fs5.mojevideo.sk/imgxl/141577.jpg'},
      {id: 7, userName: 'GogomanTV', channelId: 1, text: 'Pozor zítra', timestamp: new Date(), avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnlhmIMyTezz0ViDYMMvoOVNESnBQqCi2HcA&s'},
      {id: 8, userName: 'Palo Ščerba', channelId: 1, text: 'Kedy bude ďalšia súťaž?', timestamp: new Date(), avatar: 'https://i.ytimg.com/vi/DUZWiXmMoC0/maxresdefault.jpg'},
      {id: 9, userName: 'ResttPowered', channelId: 1, text: 'Vy ostatní nezúfajte... o ďalší týždeň je ďalšia súťaž... o ďalší protein', timestamp: new Date(), avatar: 'https://fs5.mojevideo.sk/imgxl/141577.jpg'},

    ]);

    function loadMoreMessages(index: number, done: (stop?: boolean) => void) {
      setTimeout(() => {
        const moreMessages = [
          {id: messages.value.length + 1, userName: '1', channelId: 1, text: 'I am fine, thank you', timestamp: new Date(), avatar: 'https://cdn.quasar.dev/img/avatar.png',},
          {id: messages.value.length + 2, userName: 'Palo Ščerba', channelId: 1, text: 'Ďalšia súťaž bude o 2 týždne', timestamp: new Date(), avatar: 'https://i.ytimg.com/vi/DUZWiXmMoC0/maxresdefault.jpg',},
        ];
        if (moreMessages.length > 0) {
          messages.value.unshift(...moreMessages);
          done(); // continue loading
        } else {
          done(true); // stop loading, no more messages
        }
      }, 2000);
    }
    function sendMessage(content: string) {
      messages.value.push({
        id: messages.value.length + 1,
        userName: '1',
        channelId: 1,
        text: content,
        timestamp: new Date(),
        avatar: 'https://cdn.quasar.dev/img/avatar.png',
      });
    }

    return {
      messages,
      loadMoreMessages,
      text,
      sendMessage
    };
  },
});
</script>

<style scoped>

.flex-footer {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px;
  background: white;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
}


</style>
