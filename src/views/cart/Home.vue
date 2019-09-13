<template>
    <div id="wrapper">
        <div class="cart-index" v-if="carts.length>0">
            <div class="cart-index-wrap">
                <div class="cart-list">
                    <ul>
                        <li class="item" v-for="(cart,index) in carts">
                            <div class="ui-box">
                                <div class="imgProduct">
                                    <a href="/1/#/product/view?product_id=1153200008">
                                        <img :src="'http://images.canon4ever.com/'+cart.product.image"></a></div>
                                <div class="info ui-box-flex">
                                    <div class="name">
                                        <span>{{cart.product.name}}</span>
                                    </div>
                                    <div class="price">
                                        <p>
                                            <span>售价：</span><span>{{cart.product.price}}元</span>
                                            <span>合计：</span><span>{{cart.product.price*cart.num}}元</span>
                                        </p>
                                        <div class="tip">
                                            <span style="display: none;">请于2016/04/11 00:58前下单，逾期将失效。</span>
                                        </div>
                                    </div>
                                    <div class="num">
                                        <div class="xm-input-number">
                                            <div class="input-sub" :class="{ active: cart.num > 1 }" @click="changeNum(cart,'dec')"></div>
                                            <div class="input-num"><span>{{cart.num}}</span></div>
                                            <div class="input-add active" @click="changeNum(cart,'inc')"></div>
                                        </div>
                                        <div class="delete">
                                            <a href="javascript:;" @click="trash(cart,index)">
                                                <span class="icon-iconfontshanchu"></span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="append"></div>
                        </li>
                    </ul>
                </div>

                <div class="pointBox">
                    <div class="point" style="display: none;"><span class="act act_special">包邮</span><span></span></div>
                    <div class="point">
                        <p>温馨提示：产品是否购买成功，以最终下单为准，请尽快结算</p>
                    </div>
                </div>

                <!-- Navbar -->
                <div class="bottom-submit ui-box">
                    <div class="price"><span>共{{total.num}}件 金额：</span><br><strong>{{total.price}}</strong><span>元</span></div>
                    <div class="btn">
                        <router-link class="ui-button ui-button-disable" :to="{name:'category'}"><span>继续购物</span>
                        </router-link>
                    </div>
                    <div class="btn">
                        <router-link  :to="{name:'checkOut'}"  class="ui-button">
                            <span>去结算</span>
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
        <div class="cart-index" v-if="show_empty">
            <div style="height:1rem;"></div>
            <div class="cart-index-wrap">
                <div class="empt">
                    <div class="b3">
                        <router-link :to="{name:'home'}" class="ui-button ui-button-disable">
                            <span>全部商品</span>
                        </router-link>
                        <router-link :to="{name:'category'}" class="ui-button">
                            <span>精选商品</span>
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                carts: [],
                count:{},
                changing:true,//我已经变完了
                show_empty:false,
            }
        },
        computed:{
            total(){
                let num = 0
                let price = 0
                this.carts.map(item=>{
                    num+=item.num
                    price+=item.num*item.product.price
                })
                return{num:num,price:price}
            }
        },
        created() {
            this.init()
        },
        watch:{
            carts(val) {
                this.show_empty = this.carts.length==0?true:false
            }
        },
        methods:{
            init(){
                this.axios.get("api/cart").then((response) => {
                    console.log(response)
                    this.carts = response.data.carts
                    // this.count = response.data.count
                })
            },
            changeNum(cart,type){
                console.log(cart.id,type)
                if(type == 'dec' && cart.num<=1){
                    return false
                }
                this.axios.patch("api/cart",{cart_id:cart.id,type:type}).then(response=>{
                    type == 'inc' ? cart.num++ :cart.num--
                })

            },
            // changeGo(cart,type){
            //     this.axios.patch("api/cart",{cart_id:cart.id,type:type}).then(response=>{
            //         type == 'inc' ? cart.num++ :cart.num--
            //         this.changing=true
            //     })
            // },
            trash(cart,index){
                console.log(cart)
                this.axios.delete(`api/cart?cart_id=${cart.id}`).then(response=>{
                    this.carts.splice(index,1)
                })
            }
        }
    }

</script>
