import formula from '../config/formula'

class Cube {
    constructor() {
    }

    /**
     * 拼接createCube方法所需参数
     * @param {*} arr 
     * @param {*} type 
     */

    _initParam(arr, type) {
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
                            qSortByAscii: -1
                        }
                    }
                } else if (type === "dimension") {
                    item = {
                        qDef: {
                            qFieldDefs: [name]
                        },
                        qNullSuppression: true
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
    getData(qApp, vApp, kpiName, orderColunm, dataName) {
        if (qApp) {
            var qDimensions = formula[kpiName].qDimensions,
                qMeasures = formula[kpiName].qMeasures;
            var params = {
                qInitialDataFetch: [{
                    qTop: 0,
                    qLeft: 0,
                    qHeight: 20,
                    qWidth: 10
                }]
            };

            params.qDimensions = this._initParam(qDimensions, "dimension");
            params.qMeasures = this._initParam(qMeasures, "measure");
            params.qInterColumnSortOrder = [orderColunm];
           
            // console.log(dataName+'维度对象：',params.qDimensions);
            // console.log(dataName+'指标对象：',params.qMeasures);
            qApp.createCube(params, function (reply) {
                var rows = reply.qHyperCube.qDataPages[0].qMatrix;
                
                let tmp = {
                    dataName: dataName,
                    data: rows
                };
                
                vApp.$store.dispatch('updateData', tmp);
                // (callback && typeof (callback) === "function") && callback(tmp);

                // console.log(tmp.dataName+'数据',rows);
            })
            
        }
    }
}

export default Cube;