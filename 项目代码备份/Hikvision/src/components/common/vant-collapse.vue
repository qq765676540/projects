<template>
<div :id="id">
    <div :id="id" class="vant-collapse">
          <van-collapse v-model="activeName" accordion>
            <van-collapse-item v-for="(item,key) in data" 
            :title="item.title" 
            :key="key" 
            :name="key" 
            value-class="title-value"
            :value="'指标1 指标2 指标3'">
              <div class="flex flex-1 flex-column flex-justify-center flex-align-center">
                <ul class="flex flex-1 context-li" v-for="(val,index) in item.subData" 
                      :key="index">
                  <li class="flex flex-justify-left">
                    {{val.subTitle}}
                  </li>
                  <li class="flex">
                    {{val.context}}
                  </li>
                </ul>
              </div>
            </van-collapse-item>

            <!-- <van-collapse-item title="有赞微商城" name="a">
              提供多样店铺模板，快速搭建网上商城
            </van-collapse-item>
            <van-collapse-item title="有赞零售" name="b">
              网店吸粉获客、会员分层营销、一机多种收款，告别经营低效和客户流失
            </van-collapse-item>
            <van-collapse-item title="有赞美业" name="c">
              线上拓客，随时预约，贴心顺手的开单收银
            </van-collapse-item> -->
          </van-collapse>
    </div>
</div>
</template>

<script>
import { Collapse, CollapseItem } from "vant";

export default {
  name: "vant-collapse",
  components: {
    [Collapse.name]: Collapse,
    [CollapseItem.name]: CollapseItem
  },
  props: {
    id: {
      type: String,
      default: Math.random().toFixed(8)
    },
    data: {
      type: Array,
      default() {
        return [{
          title:'一级组织架构',
          subData:[{
            subTitle:"二级组织架构",
            context:"指标1 指标2 指标3"
          },{
            subTitle:"二级组织架构",
            context:"指标1 指标2 指标3"
          },{
            subTitle:"二级组织架构",
            context:"指标1 指标2 指标3"
          },{
            subTitle:"二级组织架构",
            context:"指标1 指标2 指标3"
          },{
            subTitle:"二级组织架构",
            context:"指标1 指标2 指标3"
          },{
            subTitle:"二级组织架构",
            context:"指标1 指标2 指标3"
          }]
        },{
          title:'二级组织架构',
          subData:[{
            subTitle:"二级组织架构",
            context:"指标1 指标2 指标3"
          },{
            subTitle:"二级组织架构",
            context:"指标1 指标2 指标3"
          },{
            subTitle:"二级组织架构",
            context:"指标1 指标2 指标3"
          }]
        },{
          title:'三级组织架构',
          subData:[{
            subTitle:"二级组织架构"
          }]
        }];
      }
    }
  },
  data() {
    return {
      activeName: 0
    };
  },
  beforeCreate() {},
  mounted() {}
};
</script>

<style scoped>
.vant-collapse {
  margin-top: 10px;
}

.title-value{
  font-size: 20px;
  margin-right: 10px;
}

.context-li{
  min-height: 30px;
}
</style>
