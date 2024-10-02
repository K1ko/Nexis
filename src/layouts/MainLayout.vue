<template>
  <div class="q-pa-md">
    <q-layout view="hHh Lpr lFf" class="flex-layout">
      <q-header class="blue-custom no-shadow">
        <q-toolbar class="blue-gradient">
          <q-btn flat @click="drawer = !drawer" round dense icon="menu" v-show="$q.screen.lt.sm"/>

          <q-item active clickable v-ripple class="text-white">
            <q-btn round
                   icon="home"
                   @click="onMenuClick('home')"
                   @mouseover="iconName = 'home'"
                   @mouseleave="iconName = ''"
            >
              <q-tooltip v-if="iconName === 'home'">{{ iconName }}</q-tooltip>
            </q-btn>
          </q-item>

          <q-item clickable v-ripple class="text-white">
            <q-btn round
                   icon="forum"
                   @click="onMenuClick('dms')"
                   @mouseover="iconName = 'DMs'"
                   @mouseleave="iconName = ''"
            >
              <q-tooltip v-if="iconName === 'DMs'">{{ iconName }}</q-tooltip>
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
                <q-tooltip v-if="iconName === 'Activity'">{{ iconName }}</q-tooltip>
              </q-btn>
            </q-item-section>
          </q-item>

          <q-item clickable v-ripple class="text-white">
            <q-item-section avatar>
              <q-btn round
                     @click="onMenuClick('profile')"
                     @mouseover="iconName = 'Profile'"
                     @mouseleave="iconName = ''"
              >
                <q-avatar size="42px">
                  <img src="https://cdn.quasar.dev/img/avatar.png" alt="User Avatar"/>
                </q-avatar>
                <q-tooltip v-if="iconName === 'Profile'">{{ iconName }}</q-tooltip>
              </q-btn>
            </q-item-section>
          </q-item>

          <q-item clickable v-ripple class="text-white">
            <q-item-section avatar size="42px">
              <q-btn round
                     @click="onMenuClick('add')"
                     @mouseover="iconName = 'Add'"
                     @mouseleave="iconName = ''"
              >
                <q-icon name="add"></q-icon>
                <q-tooltip v-if="iconName === 'Add'">{{ iconName }}</q-tooltip>
              </q-btn>
            </q-item-section>
          </q-item>
        </q-toolbar>
      </q-header>

      <q-drawer v-model="drawer" side="left" bordered>
        <q-list>
          <q-item>
            <q-btn flat dense round icon="close" @click="drawer = false" />
          </q-item>
          <template v-if="activeDrawer === 'home'">
            <q-item>Home Content</q-item>
          </template>
          <template v-if="activeDrawer === 'dms'">
            <q-item>DMs Content</q-item>
          </template>
          <template v-if="activeDrawer === 'activity'">
            <q-item>Activity Content</q-item>
          </template>
          <template v-if="activeDrawer === 'profile'">
            <q-item>Profile Content</q-item>
          </template>
          <template v-if="activeDrawer === 'add'">
            <q-item>Add Content</q-item>
          </template>
        </q-list>
      </q-drawer>

      <q-page-container>
        <q-page padding >
          <p v-for="n in 15" :key="n">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit nihil praesentium molestias a adipisci,
            dolore vitae odit, quidem consequatur optio voluptates asperiores pariatur eos numquam rerum delectus
            commodi perferendis voluptate?
          </p>
        </q-page>

        <q-footer class="flex-footer">
          <div class="fixed-input-container">
            <q-input rounded outlined v-model="text">
              <template v-slot:append>
                <q-avatar>
                  <img src="https://cdn.quasar.dev/logo-v2/svg/logo.svg">
                </q-avatar>
              </template>
            </q-input>
          </div>
        </q-footer>
      </q-page-container>
    </q-layout>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    const drawer = ref(false);
    const text = ref('');
    const iconName = ref('');
    const activeDrawer = ref('home');  // Reactive property to manage active drawer content

    const onMenuClick = (menuItem) => {
      activeDrawer.value = menuItem;  // Set active drawer content
      drawer.value = true; // Open the drawer when any menu item is clicked
    };


    return {
      drawer,
      text,
      iconName,
      activeDrawer,
      onMenuClick,
    };
  }
}
</script>

<style lang="scss">
.blue-gradient {
  background: #4b6cb7;
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
</style>
