<template>
    <div id="wrapper">
        <div class="page-index" id="home" data-log="首页">
            <!--焦点图-->
            <!--{{slides}}-->
            <section class="slider">
                <div class="flexslider">
                    <ul class="slides">
                        <li v-for="slide in slides">
                            <a href="">
                                <img :src="'http://images.canon4ever.com/' + slide.image">
                            </a>
                        </li>
                    </ul>
                </div>
            </section>

            <!--推荐商品-->
            <div class="list">
                <!--banner-->
                <div class="section">
                    <div class="mcells_auto_fill">
                        <div class="body">
                            <div v-for="banner in banners">
                                <div class="items" >
                                    <img :src="'http://images.canon4ever.com/' + banner.image">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!--banner end-->

                <div class="section" v-for="recommend in showdetailList">
                    <div>
                        <router-link :to="{name:'ProductView',params:{cid:recommend.id}}" class="item">
                            <div class="img">
                                <img class="ico " :src="'http://images.canon4ever.com/' + recommend.image">
                                <img class="tag " src="http://c1.mifile.cn/f/i/f/mishop/iic/xp.png">
                            </div>
                            <div class="info">
                                <div class="name"><p>{{recommend.name}}</p></div>
                                <div class="brief"><p>{{recommend.description}}</p></div>
                                <div class="price"><p>{{recommend.price}}元 起</p></div>
                            </div>
                        </router-link>
                    </div>
                </div>

                <div v-if="recommends.length > 5" v-on:click="changeFoldState">
                    <span>{{brandFold?'展开':'收起'}}</span>
                </div>
            </div>
        </div>

        <my-footer></my-footer>

    </div>

</template>

<script>
    import Footer from '@/components/Footer.vue'
    export default {
        components:{
            'my-footer': Footer,
        },
        data() {
            return {
                banners: [],
                recommends: [],
                slides: [],
                brandFold: true,
            }
        },
        computed: {
            showdetailList: {
                get: function () {
                    if (this.brandFold) {
                        if (this.recommends.length < 5) {
                            return this.recommends
                        }
                        let newArr = []
                        for (var i = 0; i < 5;i++) {
                            let item = this.recommends[i]
                            newArr.push(item)
                        }
                        return newArr
                    }
                    return this.recommends
                },
                set: function (val) {
                    this.showdetailList = val
                }
            }
        },
        created() {
            this.axios.get(`http://localhost:8000/api`).then(response => {
                console.log(response)
                this.banners = response.data.banners
                this.recommends = response.data.recommends
                this.slides = response.data.slides
            })
        },
        methods:{
            changeFoldState() {
                this.brandFold = !this.brandFold
            }
        },
        updated() {
                $('.flexslider').flexslider({
                    animation: "slide",
                    directionNav: false
                });
        }
    }
</script>



