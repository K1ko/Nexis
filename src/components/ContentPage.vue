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
            :name="message.userId"
            :avatar="message.avatar"
            :text="[message.content]"
            :stamp="message.date"
            :sent="message.userId === '1'"
            :bg-color="message.userId === '1' ? 'info' : 'primary'"
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
  userId: string;
  channelId: number;
  content: string;
  date: string;
  avatar: string;
}

/*
* TODO: ADD CODE EXPLANATION
*  - reactive
* - loadMoreMessages
* - messages
* - update viewport
*
*
*
* */
export default defineComponent({
  components: {PromptComponent},
  name: 'ContentPage',
  setup() {
    const text = ref('');
    const messages = ref<Message[]>([
      {
        id: 1,
        userId: '1',
        channelId: 1,
        content: 'hey, how are you?',
        date: '7 minutes ago',
        avatar: 'https://cdn.quasar.dev/img/avatar.png',
      },
      {
        id: 2,
        userId: 'Palo Ščerba',
        channelId: 1,
        content: 'Kedy bude ďalšia súťaž?',
        date: '7 minutes ago',
        avatar: 'https://i.ytimg.com/vi/DUZWiXmMoC0/maxresdefault.jpg',
      },
    ]);

    function loadMoreMessages(index: number, done: (stop?: boolean) => void) {
      setTimeout(() => {
        const moreMessages = [
          {
            id: messages.value.length + 1,
            userId: '1',
            channelId: 1,
            content: 'I am fine, thank you',
            date: 'Just now',
            avatar: 'https://cdn.quasar.dev/img/avatar.png',
          },
          {
            id: messages.value.length + 2,
            userId: 'Palo Ščerba',
            channelId: 1,
            content: 'Ďalšia súťaž bude o 2 týždne',
            date: 'Just now',
            avatar: 'https://i.ytimg.com/vi/DUZWiXmMoC0/maxresdefault.jpg',
          },
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
        userId: '1', // Assuming user with id '1' is the sender
        channelId: 1,
        content: content,
        date: 'Just now',
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
