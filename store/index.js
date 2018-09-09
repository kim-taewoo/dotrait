import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const createStore = () => {
  return new Vuex.Store({
    state: {
      user: null,
      loading: false,
      error: null
    },
    mutations: {
      setLoading (state, payload) {
        state.loading = payload
      },
      setError (state, payload) {
        state.error = payload
      },
      clearError (state) {
        state.error = null
      },
      setUser (state, payload) {
        state.user = payload
      }
      // setPosts(state, posts) {
      //   state.loadedPosts = posts
      // },
      // addPost(state,post) {
      //   state.loadedPosts.push(post)
      // },
      // editPost(state,editedPost){
      //   const postIndex = state.loadedPosts.findIndex(
      //     post => post.id === editedPost.id
      //   );
      //   state.loadedPosts[postIndex] = editedPost
      // },
      // setToken(state,token) {
      //   state.token = token
      // },
      // clearToken(state) {
      //   state.token = null
      // }
    },
    actions: {
      signUserIn (vuexContext, payload) {
        vuexContext.commit('setLoading', true)
        vuexContext.commit('clearError')
        vuexContext.commit('setLoading', false)
        const newUser = {
          email: payload.email,        
        }
        vuexContext.commit('setUser', newUser)
      },
      clearError (vuexContext) {
        vuexContext.commit('clearError')
      },
      // addPost(vuexContext, post) {
      //   const createdPost = {
      //     ...post,
      //     updatedDate: new Date()
      //   }
      //   return axios.post('https://nuxt-blog-tw.firebaseio.com/posts.json?auth=' + vuexContext.state.token, createdPost)
      //     .then(result => {
      //       vuexContext.commit('addPost', {...createdPost, id: result.data.name})
      //     })
      //     .catch(e => console.log(e))
      // },
      // editPost(vuexContext,editedPost) {
      //   return axios.put('https://nuxt-blog-tw.firebaseio.com/posts/' + editedPost.id + '.json?auth=' + vuexContext.state.token, editedPost)
      //     .then(res => {
      //       vuexContext.commit('editPost', editedPost)
      //     })
      //     .catch(e => console.log(e))
      // },
      // setPosts(vuexContext, posts) {
      //   vuexContext.commit('setPosts', posts)
      // },
      // authenticateUser(vuexContext, authData) {
      //   let authUrl  =
      //     'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key='+process.env.fbAPI
      //   if (!authData.isLogin) {
      //     authUrl = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key='+process.env.fbAPI
      //   }
      //   return axios
      //     .post(authUrl, {
      //     email:authData.email,
      //     password:authData.password,
      //     returnSecureToken: true
      //     })
      //     .then(result => {
      //       vuexContext.commit("setToken", result.data.idToken);
      //       localStorage.setItem('token', result.data.idToken);
      //       localStorage.setItem('tokenExpiration', new Date().getTime() + Number.parseInt(result.data.expiresIn)*1000);
      //       localStorage.setItem('currentId', result.data.email);
      //       Cookie.set("jwt", result.data.idToken);
      //       Cookie.set(
      //         "expirationDate",
      //         new Date().getTime() + Number.parseInt(result.data.expiresIn) *1000
      //       );
      //       return axios.post('http://localhost:3000/api/track-data', {data: 'Authenticated!'})
      //         .then(res => {
      //           console.log(res.data.message);
      //         })
      //     })
      //     .catch(e => console.log(e))
      // },
      
      // initAuth(vuexContext, req) {
      //   let token;
      //   let expirationDate;

      //   if (req) {
      //     if (!req.headers.cookie) {
      //       return;
      //     }
      //     const jwtCookie = req.headers.cookie.split(';').find(c => c.trim().startsWith('jwt='));
      //     if (!jwtCookie) {
      //       return;
      //     }
      //     token = jwtCookie.split('=')[1];
      //     expirationDate = req.headers.cookie.split(';').find(c => c.trim().startsWith('expirationDate=')).split("=")[1];

      //   } else if (process.client) {
      //     token = localStorage.getItem("token");
      //     expirationDate = localStorage.getItem('tokenExpiration');
      //   }
      //   if (new Date().getTime() > +expirationDate || ! token) {
      //     console.log('No token or invalid token');
      //     vuexContext.dispatch('logout');
      //     return;
      //   }
      //   vuexContext.commit('setToken', token);
      // },
      logout(vuexContext) {
        vuexContext.commit('setUser', null)
        // vuexContext.commit('clearToken');
        // Cookie.remove('token');
        // Cookie.remove('expirationDate');
        // if (process.client) {
        //   localStorage.removeItem('token');
        //   localStorage.removeItem('tokenExpiration');
        // }
      }
    },
    getters: {
      user (state) {
        return state.user
      },
      loading (state) {
        return state.loading
      },
      error (state) {
        return state.error
      }
      // loadedPosts(state) {
      //   return state.loadedPosts
      // },
      // isAuthenticated(state) {
      //   return state.token != null
      // }
    }
  })
}

export default createStore
