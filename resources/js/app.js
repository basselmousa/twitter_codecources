/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */


require('./bootstrap');

window.Vue = require('vue').default;
import Vuex from 'vuex'

Vue.use(Vuex);

import VueObserveVisibility from 'vue-observe-visibility'

Vue.use(VueObserveVisibility)

Vue.prototype.$user = User;

/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */
//
const files = require.context('./', true, /\.vue$/i)
files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))

// Vue.component('app-timeline', require('./components/timeline/AppTimeline.vue').default);

import timeline from './store/timeline'
import likes from './store/likes'
import retweets from './store/retweets'

const store = new Vuex.Store({
    modules: {
        timeline,
        likes,
        retweets,
    }
})

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

const app = new Vue({
    el: '#app',
    store
});

Echo.channel('tweets')
    .listen('.TweetLikesWereUpdated', (e) => {
        if (e.user_id === User.id) {
            store.dispatch('likes/syncLike', e.id)
        }
        store.commit('timeline/SEL_LIKES', e)
    })
    .listen('.TweetRetweetsWereUpdated', (e) => {
        if (e.user_id === User.id) {
            store.dispatch('retweets/syncRetweet', e.id)
        }
        store.commit('timeline/SEL_RETWEETS', e)
    })
    .listen('.TweetWasDeleted', (e) => {
        store.commit('timeline/POP_TWEET', e.id)
    })
