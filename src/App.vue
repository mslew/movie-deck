<template>
  <nav class="navbar navbar-expand-lg navbar-dark menu shadow fixed-top">
        <div class="container">
          <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item"><router-link class="nav-item" to="/">Home</router-link></li>
              <li class="nav-item"><router-link to="/feed">Feed</router-link></li>
              <li class="nav-item"><router-link to="/register">Register</router-link></li>
              <li class="nav-item"><router-link to="/sign-in">Login</router-link></li>
              <li class="nav-item"><router-link to="/about">About</router-link></li>
            </ul>
          </div>
        </div>
    </nav>
<router-view/>
</template>

<style src="../src/css/style.css"/>
<script src="../node_modules/bootstrap/dist/js/bootstrap.min.js"></script>
