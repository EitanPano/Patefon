<template>
  <section class="main-screen" @click="exitLoginModal">
    <section class="auth" @click.stop>
      <form v-if="isSignUp" class="login-form" @submit.prevent="login">
        <h1>Logo</h1>
        <h2>Welcome Back.</h2>
        <h4>Login To Continue.</h4>
        <label for=""
          >Username: <input v-model="user.username" type="text"
        /></label>
        <label for=""
          >Password: <input v-model="user.password" type="password"
        /></label>
        <button>Login</button>
        <p>
          Don't have an account? <span @click="switchForm">Create One</span>
        </p>
      </form>
      <form v-else class="signup-form" @submit.prevent="signup">
        <h1>Logo</h1>
        <h2>Create Patefon Account For Free</h2>
        <label for=""
          >Username: <input v-model="newUser.username" type="text"
        /></label>
        <label for=""
          >Password: <input v-model="newUser.password" type="password"
        /></label>
        <label for=""
          >Full name: <input v-model="newUser.fullname" type="text"
        /></label>
        <label for=""
          >Email: <input v-model="newUser.email" type="email"
        /></label>
        <button>Sign up</button>
        <p>
          Already Signed Up?
          <span @click.prevent="switchForm">Back to Login</span>
        </p>
      </form>
    </section>
  </section>
</template>

<script>
import { eventBusService } from "../services/event-bus.service.js";
import { userService } from "../services/user.service.js";

export default {
  components: {
    eventBusService,
  },
  data() {
    return {
      isSignUp: true,
      user: {
        username: "",
        password: null,
      },
      newUser: null,
    };
  },
  created() {
    this.newUser = userService.getEmptyUser();
    // console.log(this.newUser);
  },
  methods: {
    login() {
      // console.log(this.user);
      this.$store.dispatch({ type: "setLogin", user: this.user }).then(() => {
        this.$router.push("/");
        //Logged In Succesfully
      });
    },
    signup() {
      // console.log(this.newUser);
      this.$store
        .dispatch({ type: "setSignup", newUserData: this.newUser })
        .then(() => {
          this.$router.push("/");
          //Signed Up Succesfully
        });
      this.newUser = userService.getEmptyUser;
    },
    switchForm() {
      // console.log("switching");
      this.isSignUp = !this.isSignUp;
      // console.log(this.isSignUp);
    },
    exitLoginModal() {
      this.$router.push("/search");
    },
  },
};
</script>

<style>
</style>