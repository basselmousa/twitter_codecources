<template>
    <div class="">
        <div class="border-b-8 border-gray-800 p-4 w-full">
            <app-tweet-compose/>
        </div>
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
import {mapGetters, mapActions, mapMutations} from 'vuex'

export default {
    name: "AppTimeline",

    data() {
        return {
            page: 1,
            lastPage: 1
        }
    },
    computed: {
        ...mapGetters({
            tweets: 'timeline/tweets'
        }),
        urlWithPage() {
            return `api/timeline?page=${this.page}`;
        }
    },
    methods: {
        ...mapActions({
            getTweets: 'timeline/getTweets'
        }),
        ...mapMutations({
            PUSH_TWEETS: 'timeline/PUSH_TWEETS',
        }),
        loadTweets() {
            this.getTweets(this.urlWithPage).then((res) => {
                this.lastPage = res.data.meta.last_page
            }).catch((err) => {
                console.log(err)
            });
        },
        handleScrollToBottomOfTimeline(isVisible) {
            if (!isVisible) {
                return;
            }
            if (this.lastPage === this.page) {
                return;
            }

            this.page++;
            this.loadTweets()
        }
    },
    mounted() {
        this.loadTweets()
        /** listen to channels */
        Echo.private(`timeline.${this.$user.id}`)
            .listen('.TweetWasCreated', (e) => {
                this.PUSH_TWEETS([e])
        });
    },

}
</script>

<style scoped>

</style>
