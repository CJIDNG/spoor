<style scoped>
</style>
<template>
    <div class="wrapper">
        <div class="section">
            <div class="container">
                <h1 class="title text-center">
                    {{ member.full_name }} 
                    <small>
                        {{ member.designation }}
                    </small>
                </h1><hr>
                <div class="row">
                    <div class="col-md-4">
                        <img class="img-fluid" :src="'/storage/'+member.thumbnail" alt="">
                    </div>
                    <div v-html="member.bio" class="col-md-8"></div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                activeTab: "first"
            };
        },
        components: {
            
        },
        created() {
            this.$store.dispatch( 'getAuthUser' );
            this.$store.dispatch( 'loadMember', {
                id: this.$route.params.memberId
            });
        },
        mounted() {

        },
        computed: {
            user() {
                return this.$store.getters.getUser;
            },
            userLoadStatus() {
                return this.$store.getters.getUserLoadStatus;
            },
            member() {
                return this.$store.getters.getMember;
            },
            memberLoadStatus() {
                return this.$store.getters.getMemberLoadStatus;
            }
        },
        watch: {

        },
        methods: {
            handleClick(tab, event) {
                console.log(tab, event);
            }
        }
    }
</script>