<template>

    <div>
        <app-dropdown v-if="!retweeted">
            <template slot="trigger">
                <app-tweet-retweet-action-button
                    :tweet="tweet"
                />
            </template>
            <app-dropdown-item @click.prevent="tweetOrUnretweet">
                Retweet
            </app-dropdown-item>
            <app-dropdown-item>
                Retweet With Comment
            </app-dropdown-item>
        </app-dropdown>


        <app-tweet-retweet-action-button
            v-else
            :tweet="tweet"
            @click.prevent="tweetOrUnretweet"
        />

    </div>


</template>

<script>
import {mapGetters, mapActions} from 'vuex'

export default {
    name: "AppTweetRetweetAction",
    props: {
        tweet: {
            required: true,
            type: Object
        }
    },
    computed: {
        ...mapGetters({
            retweets: 'retweets/retweets'
        }),
        retweeted() {
            return this.retweets.includes(this.tweet.id)
        }
    },
    methods:{
        ...mapActions({
            retweetTweet : 'retweets/retweetTweet',
            unretweetTweet : 'retweets/unretweetTweet'
        }),
        tweetOrUnretweet(){
            if (this.retweeted){
                this.unretweetTweet(this.tweet)
                return
            }
            this.retweetTweet(this.tweet)
        }
    }
}
</script>

<style scoped>

</style>
