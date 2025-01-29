<script setup>

import { useRouter } from "vue-router"

const router = useRouter()

const logout = () => {
  localStorage.removeItem("token")
  localStorage.removeItem("authenticated")
  router.push("/login")
}

</script>
<template>
  <div>

    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container-fluid">
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item">
              <button class="btn btn-outline-light" @click="logout">Logout</button>
            </li>
          </ul>
        </div>
      </div>
    </nav>

  </div>
</template>



