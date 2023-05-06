<script>
import { RouterLink, RouterView } from 'vue-router'

export default{

}
</script>

<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
  <div class="container-fluid">
    <img src="@/components/icons/bluetext.png" id="log">
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="true" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div class="navbar-nav">
        <a class="nav-link">
          <RouterLink to="/">Home</RouterLink>
        </a>
        <a class="nav-link">
          <RouterLink to="/account">Account</RouterLink>
        </a>
      </div>
    </div>
  </div>
</nav>

<RouterView/>
</template>

<style>
@import url('/public/font.css');

#log {
    width: 150px;
    height: auto;
    margin: 20px;
}

#center {
  margin: 20px;
}


</style>
