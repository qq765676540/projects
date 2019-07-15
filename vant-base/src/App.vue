<template>
<div id="app">
    {{msg}}
</div>
</template>

<script>
export default {
    name: "vant",
    components: {},
    data() {
        return {
            msg: 'Hello Vue',
            qApp: {},
        };
    },
    mounted() {
        var interval = setInterval(() => {
            if (window.qApp) {
                this.qApp = window.qApp;
                this.cubeInit(this.qApp);
                clearInterval(interval);
            }
        }, 1000);

    },
    methods: {
        cubeInit(app) {
            // console.log('YCQ日志记录:标识->',app);
            let _this = this;
            app.createCube({
                "qInitialDataFetch": [{
                    "qHeight": 200,
                    "qWidth": 2
                }],
                "qDimensions": [{
                    "qDef": {
                        "qFieldDefs": [
                            "DeptName"
                        ]
                    },
                    "qNullSuppression": true,
                    "qOtherTotalSpec": {
                        "qOtherMode": "OTHER_OFF",
                        "qSuppressOther": true,
                        "qOtherSortMode": "OTHER_SORT_DESCENDING",
                        "qOtherCounted": {
                            "qv": "5"
                        },
                        "qOtherLimitMode": "OTHER_GE_LIMIT"
                    }
                }],
                "qMeasures": [{
                    "qDef": {
                        "qDef": "Sum(mea1)"
                    },
                    "qLabel": "Sum(mea1)",
                    "qLibraryId": null,
                    "qSortBy": {
                        "qSortByState": 0,
                        "qSortByFrequency": 0,
                        "qSortByNumeric": 0,
                        "qSortByAscii": 1,
                        "qSortByLoadOrder": 0,
                        "qSortByExpression": 0,
                        "qExpression": {
                            "qv": " "
                        }
                    }
                }],
                "qSuppressZero": false,
                "qSuppressMissing": false,
                "qMode": "S",
                "qInterColumnSortOrder": [],
                "qStateName": "$"
            }, function(reply){ _this.Test(reply)});
        },
        Test(reply) {
            console.log(reply.qHyperCube.qDataPages[0].qMatrix);
        }
    }
}
</script>

<style>
.vist-warning {
    width: 100%;
    overflow-y: scroll !important;
    overflow-x: hidden !important;
    position: relative;
}
</style>
