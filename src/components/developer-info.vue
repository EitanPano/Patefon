<template>
    <div class="eitan space">
        <div>
            <div class="welcome">
                <ul>
                    <li>
                        <p>Html - <span>{{ devInfo.skills.html }}%</span></p>
                        <div class="skill-progress-pool">
                            <div :style="{ width: devInfo.skills.html + '%'}" class="progress-pool-bar"></div>
                        </div>
                    </li>
                    <li>
                        <p>Css - <span>{{ devInfo.skills.css }}%</span></p>
                        <div class="skill-progress-pool">
                            <div :style="{ width: devInfo.skills.css + '%'}" class="progress-pool-bar"></div>
                        </div>
                    </li>
                    <li>
                        <p>JavaScript - <span>{{ devInfo.skills.javascript }}%</span></p>
                        <div class="skill-progress-pool">
                            <div :style="{ width: devInfo.skills.javascript + '%'}" class="progress-pool-bar"></div>
                        </div>
                    </li>
                    <li>
                        <p>Vue - <span>{{ devInfo.skills.vue }}%</span></p>
                        <div class="skill-progress-pool">
                            <div :style="{ width: devInfo.skills.vue + '%'}" class="progress-pool-bar"></div>
                        </div>
                    </li>
                </ul>
                <article>
                    <img :src="require(`../assets/images/developers/${devInfo.imgUrl}`)" alt="Check Path"/>
                    <div class="links">
                        <a :href="devInfo.socialLinks.facebook" target="blank" >
                            <img src="../assets/images/developers/facebook-circled-48.png" alt="Facebook" />
                        </a>
                        <a :href="devInfo.socialLinks.github" target="blank">
                            <img src="../assets/images/developers/github-50.png" alt="GitHub"/>
                        </a>
                        <a :href="devInfo.socialLinks.linkedin" target="blank" >
                            <img src="../assets/images/developers/linkedin-48.png" alt="LinkedIN"/>
                        </a>
                    </div>
                </article>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['devInfo']
};
</script>

<style>
</style>