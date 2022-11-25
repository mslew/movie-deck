<template>
  <nav class="navbar navbar-expand-lg navbar-dark menu shadow fixed-top">
        <div class="container">
          <h1 class="display-5 logo-text">Movie Deck</h1>
          <img class="logo" src="./assets/images/logo.png" alt="logo image">
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item p-3"><router-link to="/">Home</router-link></li>
              <li class="nav-item p-3"><router-link to="/feed">Review Feed</router-link></li>
              <li class="nav-item p-3"><router-link to="/register">Register</router-link></li>
              <li class="nav-item p-3"><router-link to="/sign-in">Login</router-link></li>
              <li class="nav-item p-3"><router-link to="/author">Write a Review</router-link></li>
            </ul>
            <button class="btn-standard" @click="handleSignOut" v-if="isLoggedIn">Sign Out</button>
          </div>
        </div>
    </nav>
<router-view/>
</template>

<script setup>
  import { onMounted, ref} from "vue";
  import { getAuth, onAuthStateChanged, signOut} from "firebase/auth";
  import router from "./router";
  const isLoggedIn = ref(false);
  let auth;

  onMounted(()=>{
    auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if(user){
        isLoggedIn.value = true;
      }else{
        isLoggedIn.value = false;
      }
    });
  });

  const handleSignOut = () => {
    signOut(auth).then(()=>{
      router.push("/");
    });
  } 
</script>

<style lang="scss" scoped>
  @import "scss/common/buttons";
  @import "scss/custom";
  .menu{
    background-color: $main-color;
    li{
      text-decoration: none;
      padding: 0 0.7rem;
      a{  
          size: 1rem;
          text-decoration: none;
          color: $accent-color;
          padding: 0 0.7rem;
          text-transform: none;
          font-weight: 600;
          &:hover{
            color: $white;
          } 
      }
      &:hover{
          color: $white;
      }
  }
}
.logo-text{
  color:black;
  padding-right: 1rem;
}
.logo{
  width: 4rem;
  height: auto;
}
</style>