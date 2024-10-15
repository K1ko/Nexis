<template>
  <div class="q-pa-md">
    <q-layout view="hHh LpR lFr" class="flex-layout">
      <q-header class="blue-custom no-shadow">
        <q-toolbar class="blue-gradient">
          <q-item active clickable v-ripple class="text-white">
            <q-btn round
                   icon="tag"
                   @click="onMenuClick('home')"
                   @mouseover="iconName = 'Channels'"
                   @mouseleave="iconName = ''"
            >
              <q-tooltip v-if="iconName === 'Channels'">{{ iconName }}</q-tooltip>
            </q-btn>
          </q-item>

          <q-item clickable v-ripple class="text-white">
            <q-item-section avatar>
              <q-btn round
                     icon="notifications"
                     @click="onMenuClick('activity')"
                     @mouseover="iconName = 'Activity'"
                     @mouseleave="iconName = ''"

              >
                <q-badge floating color="red" rounded/>
                <q-tooltip v-if="iconName === 'Activity'">{{ iconName }}</q-tooltip>
              </q-btn>
            </q-item-section>
          </q-item>


          <q-toolbar-title class="text-center">Nexis</q-toolbar-title>


          <q-item clickable v-ripple class="text-white">
            <q-item-section avatar>
              <q-btn round
                     @click="onMenuClick('profile')"
                     @mouseover="iconName = 'Profile'"
                     @mouseleave="iconName = ''"
              >
                <q-avatar size="42px" class="shadow-4">
                  <img src="https://cdn.quasar.dev/img/avatar.png" alt="User Avatar"/>
                  <q-badge color="white" class="absolute-bottom-right"
                           style="display: flex; justify-content: center; align-items: center;">
                    <q-badge class="absolute-center" :color="userStatusColor"
                             style="border-radius: 7px; width: 14px; height: 14px">

                    </q-badge>
                  </q-badge>

                </q-avatar>
                <q-tooltip v-if="iconName === 'Profile'">{{ iconName }}</q-tooltip>
              </q-btn>
            </q-item-section>
          </q-item>
          <q-btn dense flat round icon="menu" @click="rightDrawer = !rightDrawer"/>
        </q-toolbar>
      </q-header>
      <!-- Left drawer      -->
      <q-drawer v-model="leftDrawer" side="left" bordered
                style="background: linear-gradient(to bottom, rgba(52, 148, 230, 0.9), rgba(236, 110, 173, 0.5))">
        <q-list>
          <q-item>
            <q-btn flat dense round icon="arrow_left" @click="leftDrawer = false"/>
          </q-item>
          <template v-if="activeDrawer === 'home'">

            <q-expansion-item label="Channels" icon="tag">
              <q-list>
                <q-item v-for="channel in channels" :key="channel.id" clickable v-ripple
                        @click="selectChannel(channel.id)">
                  <q-item-section avatar>
                    <q-avatar icon="group"></q-avatar>
                  </q-item-section>
                  <q-item-section>
                    {{ channel.name }}
                  </q-item-section>
                </q-item>
              </q-list>
            </q-expansion-item>
            <q-btn class="half-opacity" rounded color="accent" label="Create Channel"
                   style="position: absolute; width:80% ;bottom: 16px; left: 50%; transform: translateX(-50%);"/>
          </template>
          <template v-if="activeDrawer === 'activity'">
            <q-expansion-item label="Unread" icon="notifications">
              <q-item clickable v-ripple>
                <q-item-section>Notification 1</q-item-section>
              </q-item>
              <q-item clickable v-ripple>
                <q-item-section>Notification 2</q-item-section>
              </q-item>
            </q-expansion-item>
            <q-expansion-item label="Mentions" icon="alternate_email">
              <q-item clickable v-ripple>
                <q-item-section>Mention 1</q-item-section>
              </q-item>
              <q-item clickable v-ripple>
                <q-item-section>Mention 2</q-item-section>
              </q-item>
            </q-expansion-item>
          </template>
          <template v-if="activeDrawer === 'profile'">
            <q-item>
              <q-avatar size="50px">
                <img src="https://cdn.quasar.dev/img/avatar.png" alt="User Avatar"/>
                <q-badge color="white" class="absolute-bottom-right"
                         style="display: flex; justify-content: center; align-items: center;">
                  <q-badge class="absolute-center" :color="userStatusColor"
                           style="border-radius: 7px; width: 14px; height: 14px">
                  </q-badge>
                </q-badge>
              </q-avatar>
            </q-item>
            <q-item v-if="currentUser">
              <q-item-section>
                <q-item-label>{{ currentUser.name }}</q-item-label>
                <q-item-label caption>{{ currentUser.email }}</q-item-label>
                <q-item-label caption>
                  Status: {{ currentUser.status }}
                </q-item-label>
              </q-item-section>
            </q-item>
            <q-separator/>
            <q-item clickable v-ripple>
              <q-item-section class="row items-center justify-center">Settings
                <q-icon name="settings"/>
              </q-item-section>
            </q-item>
            <q-item clickable v-ripple>
              <q-item-section class="row items-center justify-center">Help
                <q-icon name="help"/>
              </q-item-section>
            </q-item>
            <q-item clickable v-ripple>
              <q-item-section class="row items-center justify-center">Sign Out
                <q-icon name="logout"/>
              </q-item-section>
            </q-item>
          </template>
        </q-list>
      </q-drawer>
      <!-- Right drawer      -->
      <q-drawer v-model="rightDrawer" side="right" bordered show-if-above
      >
        <q-item v-if="activeChannel">
          <q-item-section>Active Channel: {{ activeChannelReturn["activeChannelName"] }}</q-item-section>
        </q-item>
        <q-item v-else>
          <q-item-section>No active channel</q-item-section>
        </q-item>
        <!-- Check whether the channel is active, if active display its type       -->
        <q-item v-if="activeChannel">
          <q-item-label>
            {{ channels.find(channel => channel.id === activeChannel)?.type }}
            <q-icon v-if="channels.find(channel => channel.id === activeChannel)?.type === 'private'" name="lock"/>
            <q-icon v-else name="lock_open"/>
          </q-item-label>
        </q-item>
        <q-separator/>
        <q-item v-if="activeChannel">
          <q-item-section>Users in channel:</q-item-section>
        </q-item>
        <q-item v-for="user in activeChannelReturn['activeChannelUsers']" :key="user" clickable v-ripple>
          <q-item-section>
            <q-avatar color="secondary">
              {{ users.find(u => u.id === parseInt(user))?.name.charAt(0) }}
            </q-avatar>
          </q-item-section>
          <q-item-section>
            {{ users.find(u => u.id === parseInt(user))?.name || 'Unknown User' }}
            <q-item-label caption>
              {{ users.find(u => u.id === parseInt(user))?.status || 'Unknown Status' }}
            </q-item-label>
          </q-item-section>
        </q-item>
        <q-separator/>
        <q-item clickable v-ripple>
          <q-item-section class="row items-center justify-center">Settings
            <q-icon name="settings"/>
          </q-item-section>
        </q-item>
        <q-separator/>


      </q-drawer>
      <q-page-container>
        <ContentPage/>
      </q-page-container>
    </q-layout>
  </div>
</template>

<script>
import ContentPage from 'components/ContentPage.vue';

export default {
  components: {ContentPage},
  setup() {
  },
  data() {
    return {
      leftDrawer: false,
      rightDrawer: false,
      iconName: '',
      activeDrawer: '',
      currentUserId: 4,
      users: [{
        id: 1,
        name: 'John Doe',
        email: 'Email@example.com',
        status: 'Online'
      },
        {
          id: 2,
          name: 'Peter Cmorik',
          email: 'peto.cmorik@gmail.com',
          status: 'Online'
        },
        {
          id: 3,
          name: 'Vašo',
          email: 'patejdlvaso@yahoo.com',
          status: 'Online',
        },
        {
          id: 4,
          name: 'Separ',
          email: 'miskokmet@icloud.com',
          status: 'Offline',
        }],
      channels: [{
        id: 1,
        name: 'Pirati',
        users: ['1', '2', '3', '4'],
        owner: '4',
        type: 'public'
      },
        {
          id: 2,
          name: 'Kočner',
          users: ['1', '3', '4'],
          owner: '4',
          type: 'private'
        },
        {
          id: 3,
          name: 'Babiš',
          users: ['1', '2', '4'],
          owner: '3',
          type: 'public'
        }
      ],
      activeChannel: '',
    };
  },
  computed: {
    currentUser() {
      return this.users.find(user => user.id === this.currentUserId) || {};

    },
    userStatusColor() {
      console.log(this.currentUser.status);
      if (!this.currentUser.status) return 'red !important';
      switch (this.currentUser.status) {
        case 'Online':
          return 'green';
        case 'Busy':
          return 'red !important';
        case 'Offline':
          return 'grey';
        default:
          return '';
      }
    },
    activeChannelReturn() {
      let activeChannelName = this.channels.find(channel => channel.id === this.activeChannel)?.name || '';
      let activeChannelUsers = this.channels.find(channel => channel.id === this.activeChannel)?.users || [];
      console.log(activeChannelUsers);

      return {activeChannelName, activeChannelUsers}
    },
  },
  methods: {
    onMenuClick(menuItem) {
      if (this.activeDrawer === menuItem) {
        this.leftDrawer = !this.leftDrawer;
      } else {
        this.leftDrawer = true;
        this.activeDrawer = menuItem;
      }
    },
    selectChannel(channelId) {
      this.activeChannel = channelId;
      console.log(this.activeChannel);
    }
  },

}

</script>

<style lang="scss">
.blue-gradient {
  background: #2980B9;
  background: $gradient-primary;
}

.blue-custom {
  background: #4b6cb7;
}

.no-shadow {
  box-shadow: none !important;
}

.flex-layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.q-page-container {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.q-page {
  flex: 1;
}

.flex-footer {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px;
  background: white;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
}


.half-opacity {
  opacity: 0.7;
}

</style>
