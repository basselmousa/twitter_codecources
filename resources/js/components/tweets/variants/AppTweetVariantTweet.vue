<template>
    <div class="flex w-full">

        <img :src="tweet.user.avatar" class="w-12 h-12 mr-3 rounded-full">

        <div class="flex-grow">
            <app-tweet-username :user="tweet.user"/>
            <p class="text-gray-300 whitespace-pre-wrap">{{ tweet.body }}</p>

            <div class="flex flex-wrap mb-4 mt-4" v-if="images.length">
                <div class="w-6/12 flex-grow" v-for="(image, index) in images" :key="index">
                    <img :src="image.url" class="mb-2">
                </div>
            </div>

            <div class="mt-4 mb-4" v-if="videos">
                <video :src="videos.url" controls class="rounded-lg"></video>
            </div>

            <app-tweet-action-group
                :tweet="tweet"
            />
        </div>
    </div>
</template>

<script>
export default {
    name: "AppTweetVariantTweet",
    props: {
        tweet: {
            required: true,
            type: Object
        }
    },
    computed: {
        images() {
            return this.tweet.media.data.filter(m => m.type === 'image')
        },
        videos() {
            return this.tweet.media.data.filter(m => m.type === 'video')[0]
        },
    }
}
</script>

<style scoped>

</style>
