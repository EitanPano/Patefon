<template>
    <section class="main-layout layout-padding about">
        <h1>Development Team :</h1>
        <developer-info v-for="dev in developers" :key="dev.fullName" :devInfo="dev" />

    </section>
</template>

<script>
import developerInfo from '../components/developer-info.vue'
export default {
    components: {developerInfo},
    data() {
        return {
            developers: [
                {
                    fullName: 'Eitan Pano',
                    age: '26',
                    imgUrl: 'profile-eitan.jpg',
                    socialLinks: {
                        facebook: 'https://www.facebook.com/eitan.pano/',
                        github: 'https://github.com/eitanpano',
                        linkedin: 'https://www.linkedin.com/in/eitanpano/',
                    },
                    skills: {
                        html: 90,
                        css: 85,
                        javascript: 80,
                        vue: 85,
                    }
                },
                {
                    fullName: 'Nir Funt',
                    age: '35',
                    imgUrl: 'profile-nir.jpg',
                    socialLinks: {
                        facebook: 'https://www.facebook.com/AntiFlag2020/',
                        github: 'https://github.com/NirFunt',
                        linkedin: 'https://www.linkedin.com/in/nir-funt-81b199142',
                    },
                    skills: {
                        html: 80,
                        css: 85,
                        javascript: 90,
                        vue: 85,
                    }
                },
                {
                    fullName: 'Mark Fishman',
                    age: '23',
                    imgUrl: 'git_profile.jpg',
                    socialLinks: {
                        facebook: 'https://www.facebook.com/mark.fishman.35',
                        github: 'https://github.com/markfishman1',
                        linkedin: 'https://www.linkedin.com/in/mark-fishman-631998217/',
                    },
                    skills: {
                        html: 80,
                        css: 85,
                        javascript: 90,
                        vue: 85,
                    }
                },

            ]
        }
    }

};
</script>

<style>
</style>