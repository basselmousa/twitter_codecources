import axios from "axios";
import { get } from 'lodash'
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
        },
        SEL_LIKES(state, { id, count }){
            state.tweets = state.tweets.map((t)=>{
                if(t.id === id){
                    t.likes_count = count
                }

                if(get(t.original_tweet,'id') === id){
                    t.original_tweet.likes_count = count
                }

                return t
            })
        }
    },
    //
    actions: {
        async getTweets({commit}, url) {
            /** Fetch data with axios from api route */
            let response = await axios.get(url);

            commit('PUSH_TWEETS', response.data.data);

            commit('likes/PUSH_LIKES', response.data.meta.likes, {root:true})
            commit('retweets/PUSH_RETWEETS', response.data.meta.retweets, {root:true})

            return response;
        }
    }
}
