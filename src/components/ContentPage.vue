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
  </q-page>
</template>

<script lang="ts">
import {defineComponent, reactive} from 'vue';

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
  name: 'ContentPage',
  setup() {
    const messages = reactive<Message[]>([
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
            id: messages.length + 1,
            userId: '1',
            channelId: 1,
            content: 'I am fine, thank you',
            date: 'Just now',
            avatar: 'https://cdn.quasar.dev/img/avatar.png',
          },
          {
            id: messages.length + 2,
            userId: 'Palo Ščerba',
            channelId: 1,
            content: 'Ďalšia súťaž bude o 2 týždne',
            date: 'Just now',
            avatar: 'https://i.ytimg.com/vi/DUZWiXmMoC0/maxresdefault.jpg',
          },
        ];
        if (moreMessages.length > 0) {
          messages.unshift(...moreMessages);
          done(); // continue loading
        } else {
          done(true); // stop loading, no more messages
        }
      }, 2000);
    }

    return {
      messages,
      loadMoreMessages,
    };
  },
});
</script>

<style scoped>
.q-page {
  flex: 1;
}


</style>
