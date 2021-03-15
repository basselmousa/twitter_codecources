<template>
    <div class="">
        <app-tweets
            v-for="tweet in tweets " :key="tweet.id" :tweet="tweet"
        />
        <div v-if="tweets.length"
             v-observe-visibility="{ callback:handleScrollToBottomOfTimeline }"

        >

        </div>
    </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'

export default {
    name: "AppTimeline",
    data(){
        return{
            page:1,
            lastPage:1
        }
    },
    computed: {
        ...mapGetters({
            tweets: 'timeline/tweets'
        }),
        urlWithPage(){
            return `api/timeline?page=${this.page}`;
        }
    },
    methods: {
        ...mapActions({
            getTweets: 'timeline/getTweets'
        }),
        loadTweets(){
            this.getTweets(this.urlWithPage).then((res)=>{
                this.lastPage = res.data.meta.last_page
            }).catch((err) =>{
                console.log(err)
            });
        },
        handleScrollToBottomOfTimeline(isVisible){
            if(!isVisible){
                return;
            }
            if(this.lastPage === this.page){
                return;
            }

            this.page++;
            this.loadTweets()
        }
    },
    mounted() {
        this.loadTweets()
    },

}
</script>

<style scoped>

</style>
