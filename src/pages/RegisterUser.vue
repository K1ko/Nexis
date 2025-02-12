<script setup>
import {ref} from 'vue';
import {useQuasar} from 'quasar';
import {useRouter} from 'vue-router';

const $q = useQuasar();
const router = useRouter();

const firstName = ref(null);
const lastName = ref(null);
const userName = ref(null);
const email = ref(null);
const password = ref(null);
const accept = ref(false);

const onSubmit = () => {
  if (accept.value !== true) {
    $q.notify({
      color: 'red-5',
      textColor: 'white',
      icon: 'warning',
      message: 'You need to accept the license and terms first',
      position: 'top'
    });
  } else {
    $q.notify({
      color: 'green-4',
      textColor: 'white',
      icon: 'cloud_done',
      message: 'Account created',
      position: 'top'
    });
    router.push({name: 'login'});
  }
};
</script>

<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <q-page class="flex flex-center blue-gradient">
        <q-card class="q-pa-md shadow-2 my_card" bordered>
          <q-form @submit="onSubmit" class="q-gutter-md">
            <q-card-section class="text-center">
              <div class="text-grey-9 text-h5 text-weight-bold">Sign up</div>
              <div class="text-grey-8">Sign up below to create your account</div>
            </q-card-section>
            <q-card-section class="q-pb-none q-pt-none">
              <q-input
                dense
                outlined
                v-model="firstName"
                class="q-mt-md"
                label="Your name"
                hint="First name"
                lazy-rules
                :rules="[val => val && val.length > 0 || 'Name required']"
              >
                <template v-slot:prepend>
                  <q-icon name="person"/>
                </template>
              </q-input>
              <q-input
                dense
                outlined
                v-model="lastName"
                class="q-mt-md"
                label="Your surname"
                hint="Last Name"
                lazy-rules
                :rules="[val => val && val.length > 0 || 'Surname required']"
              >
                <template v-slot:prepend>
                  <q-icon name="person"/>
                </template>
              </q-input>
              <q-input
                dense
                outlined
                v-model="userName"
                class="q-mt-md"
                label="Username"
                hint="Enter your username"
                lazy-rules
                :rules="[val => val && val.length > 0 || 'Username is required']"
              >
                <template v-slot:prepend>
                  <q-icon name="alternate_email"/>
                </template>
              </q-input>
              <q-input
                dense
                outlined
                v-model="email"
                class="q-mt-md"
                label="Email Address"
                hint="Enter a valid email"
                lazy-rules
                :rules="[val => val && val.includes('@') && val.includes('.')|| 'Valid email is required']"
              >
                <template v-slot:prepend>
                  <q-icon name="email"/>
                </template>
              </q-input>
              <q-input
                dense
                outlined
                v-model="password"
                type="password"
                class="q-mt-md"
                label="Password"
                hint="At least 8 characters, 1 number, 1 upper & 1 lower case"
                lazy-rules
                :rules="[ val => !!val || 'Password is required',
                 val => val.length >= 8 || 'Password must be at least 8 characters',
                 val => /[0-9]/.test(val) || 'Password must contain at least one number',
                 val => /[a-z]/.test(val) || 'Password must contain at least one lower case letter',
                 val => /[A-Z]/.test(val) || 'Password must contain at least one upper case letter']">
                <template v-slot:prepend>
                  <q-icon name="lock"/>
                </template>
              </q-input>
            </q-card-section>
            <q-card-section class="q-pt-none q-pb-none">
              <q-toggle v-model="accept" label="I accept the license and terms"/>
              <div>
                <q-btn
                  color="accent"
                  rounded size="md"
                  label="Sign up" type="submit"
                  no-caps
                  class="full-width"
                  style="border-radius: 10px;"
                ></q-btn>
              </div>
            </q-card-section>
            <q-card-section class="text-center q-pt-none">
              <div class="text-grey-8">
                Already have an account?
                <router-link to="/login" class="text-dark text-weight-bold" style="text-decoration: none">Sign in.
                </router-link>
              </div>
            </q-card-section>
          </q-form>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<style scoped lang="scss">
.my_card {
  width: 25rem;
  border-radius: 8px;
  box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.7);

}

@media (max-width: 600px) {
  .my_card {
    width: 20rem;
  }
}
</style>
