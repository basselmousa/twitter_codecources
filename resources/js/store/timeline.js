import axios from "axios";

export default {
    namespaced: true,

    state: {
        tweets: [],

    },
    // return the state objects
    getters: {
        tweets(state) {
            return state.tweets
        }
    },
    // mutate the state
    // commit and update the state
    mutations: {
        PUSH_TWEETS(state, data) {
            state.tweets.push(...data)
        }
    },
    //
    actions: {
        async getTweets({commit}, url) {
            /** Fetch data with axios from api route */
            let response = await axios.get(url);
            commit('PUSH_TWEETS', response.data.data);
            return response;
        }
    }
}
