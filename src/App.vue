<template>
  <nav class="navbar navbar-expand-lg navbar-dark menu shadow fixed-top">
        <div class="container">
          <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item p-3"><router-link class="nav-item" to="/">Home</router-link></li>
              <li class="nav-item p-3"><router-link to="/feed">Feed</router-link></li>
              <li class="nav-item p-3"><router-link to="/register">Register</router-link></li>
              <li class="nav-item p-3"><router-link to="/sign-in">Login</router-link></li>
              <li class="nav-item p-3"><router-link to="/about">About</router-link></li>
              <li class="nav-item p-3"><router-link to="/author">Author</router-link></li>
            </ul>
            <button @click = "handleSignOut" v-if="isLoggedIn">Sign Out</button>
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

<style>
</style>