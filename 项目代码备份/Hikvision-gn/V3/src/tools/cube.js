// import formula from '../config/formulaDev'
import formula from '../config/formula'
class Cube {
    constructor() {
    }

    /**
     * 拼接createCube方法所需参数
     * @param {*} arr 
     * @param {*} type 
     */

    _initParam(arr, type, orderType, qNullSuppression) {
        if(qNullSuppression===undefined){
            qNullSuppression=true;
        }
        if (arr.length === 0) {
            return [];
        } else {
            var list = [];
            var item = {};
            arr.forEach(function (name, i) {
                if (type === "measure") {
                    item = {
                        qDef: {
                            qDef: name
                        },
                        qSortBy: {
                            qSortByAscii: orderType
                        }
                    }
                } else if (type === "dimension") {
                    item = {
                        qDef: {
                            qFieldDefs: [name]
                        },
                        "qNullSuppression": qNullSuppression,
                        "qOtherTotalSpec": {
                            "qOtherMode": "OTHER_OFF",
                            "qSuppressOther": true,
                            "qOtherSortMode": "OTHER_SORT_DESCENDING",
                            "qOtherCounted": {
                                "qv": "5"
                            },
                            "qOtherLimitMode": "OTHER_GE_LIMIT"
                        }
                    }
                }
                list.push(item);
            });
            return list;
        }
    }
    /**
     * 所需参数
     * qsAPP对象，Vue实例，formula，第N列指标排序默认倒序，时间过滤，组织机构过滤，返回数据名，回调函数 
     *  
     */
    getData(qApp, vApp, kpiName, orderType , orderCol, dataName,qNullSuppression) {
        if (qApp) {
            var qDimensions = formula[kpiName].qDimensions,
                qMeasures = formula[kpiName].qMeasures;
            var params = {
                qInitialDataFetch: [{
                    // qTop: 0,
                    // qLeft: 0,
                    qHeight: 200,
                    qWidth: 10
                }],
            };

            params.qDimensions = this._initParam(qDimensions, "dimension", orderType, qNullSuppression);
            params.qMeasures = this._initParam(qMeasures, "measure", orderType, qNullSuppression);
            params.qInterColumnSortOrder = [orderCol];
           
            qApp.createCube(params, function (reply) {
                var rows = reply.qHyperCube.qDataPages[0].qMatrix;
                
                let tmp = {
                    dataName: dataName,
                    data: rows
                };
                
                vApp.$store.dispatch('updateData', tmp);

                //组织架构只需要初始化一次，初始化后直接销毁session
                if(dataName === 'organization' || dataName === 'currentLevel'){
                    qApp.destroySessionObject(reply.qInfo.qId);
                }
            })
            
        }
    }
}

export default Cube;