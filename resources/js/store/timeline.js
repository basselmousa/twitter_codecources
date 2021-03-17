import axios from "axios";

export default {
    namespaced: true,

    state: {
        tweets: [],

    },
    // return the state objects
    getters: {
        tweets(state) {
            return state.tweets.sort((a, b) => b.created_at - a.created_at)
        }
    },
    // mutate the state
    // commit and update the state
    mutations: {
        PUSH_TWEETS(state, data) {
            state.tweets.push(
                ...data.filter((tweet) => {
                    /** check and filter the pagination issue */
                    return !state.tweets.map((t) => t.id).includes(tweet.id)
                })
            )
        }
    },
    //
    actions: {
        async getTweets({commit}, url) {
            /** Fetch data with axios from api route */
            let response = await axios.get(url);

            commit('PUSH_TWEETS', response.data.data);

            commit('likes/PUSH_LIKES', response.data.meta.likes, {root:true})

            return response;
        }
    }
}
