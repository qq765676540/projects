<template>
<van-pull-refresh v-model="isLoading" @refresh="onRefresh">
    <div class="gross flex flex-column">
        <div class="partner-distribution border-bottom flex flex-1 flex-column">
            <div class="sub-title">
                <div class="sub-title-icon"></div>
                <span class="sub-title-name">分级合作伙伴拜访情况</span>
            </div>
        </div>
    </div>
</van-pull-refresh>
</template>

<script>
import {PullRefresh} from "vant";


export default {
    name: "cost",
    components: {
        [PullRefresh.name]: PullRefresh
    },
    data() {
        return {
            isLoading: false
        }
    },
    beforeCreate() {
        
    },
    computed: {
        dataA() {
            if(this.$store.state.visitCustomerA.length>0){
                let a = this.$store.state.visitCustomerA;
                // console.log('visitCustomerA',a);
                return a;
            }
            return false;
        },
        dataB() {
            if(this.$store.state.visitCustomerB.length>0){
                let a = this.$store.state.visitCustomerB;
                // console.log('visitCustomerB',a);
                return a;
            }
            return false;
        }
    },
    mounted() {},
    methods: {
        onRefresh() {
            setTimeout(() => {
                this.isLoading = false;
                this.$router.replace({
                    path: "/refresh",
                    query: {
                        t: Date.now()
                    }
                });
            }, 500);
        }
    }
};
</script>

<style scoped>
.gross {
    width: 100%;
    height: calc(100% - 120px);
    overflow: hidden;
}

.gross .partner-distribution {
    min-height: 350px;
}


.gross-bottom {
    min-height: 200px;
    margin: 0 10px 10px 10px;
}
</style>
