import Vue from 'vue'
import Vuex from 'vuex'
import axios from './http'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        carts: [],
        changing:false //   自定义一个点击变数值判断状态
    },
    mutations: {
        setCarts(state,x) {
            state.carts = x
        },
        changeNum(state, payload) {
            payload.type == 'inc' ? payload.cart.num++ : payload.cart.num--
        },
        trash(state, payload) {
            let index = state.carts.indexOf(payload.cart)
            state.carts.splice(index, 1)
        },
        changingStatus(state,status){
            state.changing = false
        },
    },
    actions: {
        getAllCarts({commit}) {
            axios.get("api/cart").then(response => {
                console.log(response)
                commit('setCarts', response.data.carts)
            })
        },
        changeNum({commit}, payload) {
            if (this.state.changing == true) {
                return //不执行下面的代码
            }
            if (payload.type == 'dec' && payload.cart.num == 1) {
                return
            }
            // 方法一执行就变成真
            commit('changingStatus',true)
            axios.patch("api/cart", {cart_id: payload.cart.id, type: payload.type}).then((response) => {
                // 变换之后变成假
                commit('changingStatus',false)
                commit('changeNum', payload)
            })
        },
        trash({dispatch,commit}, payload) {
            axios.delete(`api/cart?cart_id=${payload.cart.id}`).then((response) => {
                commit('getAllCarts', payload)
                dispatch('getAllCarts')
            })
        },
    },
    getters: {
        total: state => {
            let num = 0
            let price = 0
            state.carts.forEach(item => {
                num += item.num
                price += item.num * item.product.price
            })
            return {num: num, price: price}
        }
    }

})
