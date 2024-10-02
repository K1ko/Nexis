<script setup>
import {ref} from 'vue';
import {useQuasar} from 'quasar';
import {useRouter} from 'vue-router';

const $q = useQuasar();
const router = useRouter();

const email = ref(null);
const password = ref(null);

const onSubmit = () => {
  //treba spravit normalne overenie emailu a hesla
  if (email.value === null || password.value === null) {
    $q.notify({
      color: 'red-5',
      textColor: 'white',
      icon: 'warning',
      message: 'Email and password are required'
    });
  } else {
    $q.notify({
      color: 'green-4',
      textColor: 'white',
      icon: 'cloud_done',
      message: 'Logged in',
    });
    router.push({name: 'home'});}
}

</script>

<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <q-page class="flex flex-center blue-gradient">
        <q-card class="q-pa-md shadow-2 my_card" bordered>
          <q-form @submit="onSubmit" class="q-gutter-md">
            <q-card-section class="text-center">
              <div class="text-grey-9 text-h5 text-weight-bold">Sign in</div>
              <div class="text-grey-8">Sign in below to access your account</div>
            </q-card-section>
            <q-card-section>
              <q-input
                dense
                outlined
                class="q-mt-md"
                v-model="email"
                label="Email Address"
                lazy-rules
                :rules="[val => !!val || 'Email is required']"
              />
              <q-input
                dense
                outlined
                class="q-mt-md"
                v-model="password"
                type="password"
                label="Password"
                lazy-rules
                :rules="[val => !!val || 'Password is required']"/>
            </q-card-section>
            <q-card-section>
              <q-btn style="border-radius: 8px;" color="dark" rounded size="md" label="Sign in" no-caps
                     class="full-width" type="submit"></q-btn>
            </q-card-section>
            <q-card-section class="text-center q-pt-none">
              <div class="text-grey-8">
                Don't have an account yet?
                <router-link to="/register" class="text-dark text-weight-bold" style="text-decoration: none">Sign
                  up.</router-link>
              </div>
            </q-card-section>
          </q-form>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<style scoped lang="scss">
.blue-gradient {
  background: #4b6cb7;;
  background: $gradient-primary;
}

.blue-custom {
  background: #4b6cb7;;
  background: $gradient-sec;
}
.my_card {
  width: 25rem;
  border-radius: 8px;
  box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
}
@media (max-width: 600px) {
  .my_card {
    width: 20rem;
  }
}
</style>
