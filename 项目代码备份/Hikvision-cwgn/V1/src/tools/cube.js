// import formula from '../config/formulaDev'
import getFormula from '../config/formula'

class Cube {
    constructor() {}

    /**
     * 拼接createCube方法所需参数
     * @param {*} arr 
     * @param {*} type 
     */

    _initParam(arr, type, orderType, qNullSuppression) {
            if (qNullSuppression === undefined) {
                qNullSuppression = true;
            }
            if (arr.length === 0) {
                return [];
            } else {
                var list = [];
                var item = {};
                arr.forEach(function(name) {
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
    getData(qApp, vApp, opt) {

        let cf = {
            formulaOpt: opt.formulaOpt || { time: '本月', org: ['集团'], name: '' },
            orderType: opt.orderType || -1, //排序
            orderCol: opt.orderCol || 0, //第几列
            filtNull: opt.filtNull && true, //null过滤
            qHeight: opt.qHeight || 300, //
            qWidth: opt.qWidth || 30, //
            dataName: opt.dataName || opt.formulaOpt.name //最终数据的名字
        }

        if (qApp) {
            var formula = getFormula(cf.formulaOpt);
            var qDimensions = formula.qDimensions,
                qMeasures = formula.qMeasures;
            var params = {
                qInitialDataFetch: [{
                    qTop: 0,
                    qLeft: 0,
                    qHeight: cf.qHeight,
                    qWidth: cf.qWidth
                }],
            };

            params.qDimensions = this._initParam(qDimensions, "dimension", cf.orderType, cf.filtNull);
            params.qMeasures = this._initParam(qMeasures, "measure", cf.orderType, cf.filtNull);
            params.qInterColumnSortOrder = [cf.orderCol];

            // console.log(cf.dataName+'-qDimensions',params.qDimensions);
            // console.log(cf.dataName+'-qMeasures',params.qMeasures);

            qApp.createCube(params, function(reply) {
                let rows = reply.qHyperCube.qDataPages[0].qMatrix;
                let vuexOpt = {
                    dataName: cf.dataName,
                    data: rows
                };

                vApp.$store.dispatch('updateData', vuexOpt);
                qApp.destroySessionObject(reply.qInfo.qId);

            })

        }
    }
}

export default new Cube();