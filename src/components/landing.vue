<template>
    <transition name="fade">
        <section class="landing">
            <h1>Patefon</h1>
            <h2>It's All About The Music</h2>
            <img src="img/logo/patefon.png" alt="patefon" />
            <p>Welcome to Patefon</p>
            <button @click="$emit('explore')">START THE BEAT</button>

            <div class="bubble s1 small"></div>
            <div class="bubble s2 small"></div>
            <div class="bubble s3 small"></div>
            <div class="bubble s4 small"></div>
            <div class="bubble m1 medium"></div>
            <div class="bubble b1 big"></div>
        </section>
    </transition>
</template>

<script>
export default {};
</script>

<style>
</style>