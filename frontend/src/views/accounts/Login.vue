<template>
  <div class="col-md-12">
    <div class="card card-container">
      <img
        id="profile-img"
        src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
        class="profile-img-card"
      />
      
      <validation-observer
        ref="loginForm"
        #default="{invalid}"
      >
      <form name="form" @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="username">Username</label>
          
          <validation-provider
            #default="{ errors }"
            name="username"
            vid="username"
            rules="required"
          >
          <input
            v-model="user.username"
            
            type="text"
            class="form-control"
            name="username"
          />

          <!-- <div
            v-if="errors.has('username')"
            class="alert alert-danger"
            role="alert"
          >Username is required!</div> -->
        </validation-provider>
        </div>

        <div class="form-group">
          <label for="password">Password</label>
          
          <validation-provider
            #default="{ errors }"
            name="Password"
            vid="password"
            rules="required"
          >
          <input
            v-model="user.password"
            
            type="password"
            class="form-control"
            name="password"
          />

          <!-- <div
            v-if="errors.has('password')"
            class="alert alert-danger"
            role="alert"
          >Password is required!</div> -->
        </validation-provider>
        </div>

        <div class="form-group">
          <button class="btn btn-primary btn-block" :disabled="loading">
            <span v-show="loading" class="spinner-border spinner-border-sm"></span>
            <span>Login</span>
          </button>
        </div>
        
        <div class="form-group">
          <div v-if="message" class="alert alert-danger" role="alert">{{message}}</div>
        </div>
      </form>
      </validation-observer>

    </div>
  </div>
</template>

<script>
import User from '../../models/user';
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { required } from '@validations'

export default {
  name: 'Login',

  components: {
    // validations
    ValidationProvider,
    ValidationObserver,
  },

  data() {
    return {
      user: new User('', ''),
      loading: false,
      message: '',
      // validation rules
      required
    };
  },

  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    }
  },

  created() {
    if (this.loggedIn) {
      this.$router.push('/profile');
    }
  },

  methods: {
    handleLogin() {
      this.loading = true;

      this.$refs.loginForm.validate().then(success => {
        if (!success) {
          this.loading = false;
          return;
        }

        if (this.user.username && this.user.password) {
          this.$store.dispatch('auth/login', this.user).then(
            () => {
              this.$router.push({ name: 'stores_list' });
            },
            error => {
              this.loading = false;
              this.message =
                (error.response && error.response.data) ||
                error.message ||
                error.toString();
            }
          );
        }
      });
    }
  }
};
</script>

<style scoped>
label {
  display: block;
  margin-top: 10px;
}
.card-container.card {
  max-width: 350px !important;
  padding: 40px 40px;
}
.card {
  background-color: #f7f7f7;
  padding: 20px 25px 30px;
  margin: 0 auto 25px;
  margin-top: 50px;
  -moz-border-radius: 2px;
  -webkit-border-radius: 2px;
  border-radius: 2px;
  -moz-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
}
.profile-img-card {
  width: 96px;
  height: 96px;
  margin: 0 auto 10px;
  display: block;
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
  border-radius: 50%;
}
</style>