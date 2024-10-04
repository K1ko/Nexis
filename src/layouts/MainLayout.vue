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
                <q-badge floating color="red" rounded />
                <q-tooltip v-if="iconName === 'Activity'">{{ iconName }}</q-tooltip>
              </q-btn>
            </q-item-section>
          </q-item>
          <q-toolbar-title></q-toolbar-title>
          <q-item clickable v-ripple class="text-white">
            <q-item-section avatar>
              <q-btn round
                     @click="onMenuClick('profile')"
                     @mouseover="iconName = 'Profile'"
                     @mouseleave="iconName = ''"
              >
                <q-avatar size="42px" class="shadow-4">
                  <img src="https://cdn.quasar.dev/img/avatar.png" alt="User Avatar"/>
                  <q-badge floating color="green" rounded position="bottom-right"/>
                </q-avatar>
                <q-tooltip v-if="iconName === 'Profile'">{{ iconName }}</q-tooltip>
              </q-btn>
            </q-item-section>
          </q-item>

        </q-toolbar>
      </q-header>

      <q-drawer v-model="drawer" side="left" bordered style="background: #F2E8E4">
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
                <q-item-label>User Name</q-item-label>
                <q-item-label caption>Email@example.com</q-item-label>
                <q-item-label caption>Status: Online</q-item-label>
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

        <q-footer class="flex-footer">
          <div class="fixed-input-container">
            <q-input rounded outlined v-model="text">
              <template v-slot:append>
                <q-btn flat dense round icon="send"/>
              </template>
            </q-input>
          </div>
        </q-footer>
      </q-page-container>
    </q-layout>
  </div>
</template>

<script>
import ContentPage from 'components/ContentPage.vue';

export default {
  components: {
    ContentPage
  },
  data() {
    return {
      drawer: false,
      iconName: '',
      activeDrawer: ''
    };
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

.fixed-input-container {
  flex: 1;
  max-width: 100%;
}
.half-opacity {
  opacity: 0.7;
}
</style>
