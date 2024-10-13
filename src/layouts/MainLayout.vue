<template>
  <div class="q-pa-md">
    <q-layout view="hHh Lpr lFf" class="flex-layout">
      <q-header class="blue-custom no-shadow">
        <q-toolbar class="blue-gradient">
          <q-btn flat @click="drawer = !drawer" round dense icon="menu" v-show="$q.screen.lt.sm"/>

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


          <q-toolbar-title class="text-center glow">Nexis</q-toolbar-title>


          <q-item clickable v-ripple class="text-white">
            <q-item-section avatar>
              <q-btn round
                     @click="onMenuClick('profile')"
                     @mouseover="iconName = 'Profile'"
                     @mouseleave="iconName = ''"
              >
                <q-avatar size="42px" class="shadow-4">
                  <img src="https://cdn.quasar.dev/img/avatar.png" alt="User Avatar"/>
                  <q-badge color="white" class="absolute-bottom-right" style="display: flex; justify-content: center; align-items: center;">
                    <q-badge class="absolute-center" style="border-radius: 7px; width: 14px; height: 14px">
                      <q-icon :name="userStatusIcon" :color="userStatusColor" size="xs" style="right: 7px" />
                    </q-badge>
                  </q-badge>

                </q-avatar>
                <q-tooltip v-if="iconName === 'Profile'">{{ iconName }}</q-tooltip>
              </q-btn>
            </q-item-section>
          </q-item>

        </q-toolbar>
      </q-header>

      <q-drawer v-model="drawer" side="left" bordered style="background: linear-gradient(to bottom, rgba(52, 148, 230, 0.9), rgba(236, 110, 173, 0.5))">
        <q-list>
          <q-item>
            <q-btn flat dense round icon="arrow_left" @click="drawer = false"/>
          </q-item>
          <template v-if="activeDrawer === 'home'">
            <q-expansion-item label="Favorites" icon="star">
              <q-list v-for="n in 5" :key="n">
                <q-item clickable v-ripple>

                  <q-item-section avatar>
                    <q-avatar icon="star"></q-avatar>
                  </q-item-section>
                  <q-item-section>
                    Favorite {{ n }}
                  </q-item-section>
                </q-item>
              </q-list>
            </q-expansion-item>
            <q-expansion-item label="Channels" icon="tag">
              <q-list v-for="n in 5" :key="n">
                <q-item clickable v-ripple>

                  <q-item-section avatar>
                    <q-avatar icon="tag"></q-avatar>
                  </q-item-section>
                  <q-item-section>
                    Channel {{ n }}
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
              </q-avatar>
            </q-item>
            <q-item>
              <q-item-section>
                <q-item-label>{{user.name}}</q-item-label>
                <q-item-label caption>{{user.email}}</q-item-label>
                <q-item-label caption>Status: {{user.status}}
                  <q-icon :name="userStatusIcon" :color="userStatusColor" size="xs" class="q-ml-xs" />
                </q-item-label>

              </q-item-section>
            </q-item>
            <q-separator/>
            <q-item clickable v-ripple>
              <q-item-section>Settings</q-item-section>
            </q-item>
            <q-item clickable v-ripple>
              <q-item-section>Help</q-item-section>
            </q-item>
            <q-item clickable v-ripple>
              <q-item-section>Sign Out</q-item-section>
            </q-item>
          </template>
        </q-list>
      </q-drawer>
      <q-page-container>
        <ContentPage/>

        <!-- Input container -->
        <q-footer class="flex-footer">
          <PromptComponent v-model="text"/>
        </q-footer>
      </q-page-container>
    </q-layout>
  </div>
</template>

<script>
import {ref} from 'vue';
import ContentPage from 'components/ContentPage.vue';
import PromptComponent from 'components/PromptComponent.vue';

export default {
  components: {ContentPage, PromptComponent},
  setup() {
    const text = ref('');
    return {
      text
    };
  },
  data() {
    return {
      drawer: false,
      iconName: '',
      activeDrawer: '',
      user: {
        name: 'John Doe',
        email: 'Email@example.com',
        status: 'Online'
      }
    };
  },
  computed: {
    userStatusColor() {
      switch (this.user.status) {
        case 'Online':
          return 'green';
        case 'Offline':
          return 'red';
        case 'Busy':
          return 'orange';
        default:
          return 'gray';
      }
    },
    userStatusIcon() {
      switch (this.user.status) {
        case 'Online':
          return 'check_circle';
        case 'Offline':
          return 'cancel';
        case 'Busy':
          return 'error';
        default:
          return 'help_outline';
      }
    }
  },
  methods: {
    onMenuClick(menuItem) {
      if (this.activeDrawer === menuItem) {
        this.drawer = !this.drawer;
      } else {
        this.drawer = true;
        this.activeDrawer = menuItem;
      }
    }
  }
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

@keyframes typewriter {
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
}


.glow {
  font-family: Consolas, monaco, monospace;
  color: #FDD835; /* Sand yellow color */
  font-size: 40px;
  text-align: center;
  -webkit-animation: glow 1s ease-in-out infinite alternate;
  -moz-animation: glow 1s ease-in-out infinite alternate;
  animation: glow 1s ease-in-out infinite alternate;
}

@keyframes glow {
  from {
    text-shadow: 0 0 10px #FFFFE0, 0 0 20px #FFFFE0, 0 0 30px #FDD835, 0 0 40px #FDD835, 0 0 50px #FDD835, 0 0 60px #FDD835, 0 0 70px #FDD835;
  }
  to {
    text-shadow: 0 0 20px #FFFFE0, 0 0 30px #FFFFE0, 0 0 40px #FFEB3B, 0 0 50px #FFEB3B, 0 0 60px #FFEB3B, 0 0 70px #FFEB3B, 0 0 80px #FFEB3B;
  }
}
</style>
