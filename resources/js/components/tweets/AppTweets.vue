<template>
    <div class="w-full inline-block p-4 border-b border-gray-800 cursor-pointer hover:bg-gray-800">

        <component
            :is="`app-tweet-variant-${tweet.type}`"
            :tweet="tweet"
        />


    </div>
</template>

<script>
export default {
    name: "AppTweets",

    props: {
        tweet: {
            required: true,
            type: Object
        }
    },
}
</script>

<style scoped>

</style>
