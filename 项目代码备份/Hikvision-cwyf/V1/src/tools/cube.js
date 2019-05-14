import getFormula from '../config/formula'

class Cube {
    constructor() {
    }
    /**
     * @param {*} arr 
     * @param {*} type 
     */

    _initParam(arr, type, orderType, qNullSuppression = true) {
        if (arr.length === 0) {
            return [];
        } else {
            var list = [];
            var item = {};
            arr.forEach(name=> {
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
                        qNullSuppression: qNullSuppression,
                        qOtherTotalSpec: {
                            qOtherMode: "OTHER_OFF",
                            qSuppressOther: true,
                            qOtherSortMode: "OTHER_SORT_DESCENDING",
                            qOtherCounted: {
                                qv: "5"
                            },
                            qOtherLimitMode: "OTHER_GE_LIMIT"
                        }
                    }
                }
                list.push(item);
            });
            return list;
        }
    }
    /**
     * config: {
     *     kpiName: String, 必填
     *     kpiParams: Array,
     *     storeName: String,
     *     orderType: 1|-1,
     *     orderCol: Number,
     *     filtNull: Boolean
     * }
     */
    getData(qApp, vApp, config) {
        var cf = {
            kpiName: config.kpiName,
            kpiParams: config.kpiParams || [],
            storeName: config.storeName || config.kpiName,
            orderType: config.orderType || 1,
            orderCol: config.orderCol || 0,
            filtNull: config.filtNull || true,
            qHeight: config.qHeight || 20
        }

        if (qApp) {
            var formula = getFormula(cf.kpiName, cf.kpiParams),
                qDimensions = formula.qDimensions,
                qMeasures = formula.qMeasures;
                console.log('formula: ', formula);

            var params = {
                qInitialDataFetch: [{
                    qTop: 0,
                    qLeft: 0,
                    qHeight: cf.qHeight,
                    qWidth: 10
                }],
            };

            params.qDimensions = this._initParam(qDimensions, "dimension", cf.orderType, cf.filtNull);
            params.qMeasures = this._initParam(qMeasures, "measure", cf.orderType, cf.filtNull);
            params.qInterColumnSortOrder = [cf.orderCol];
            params.qSuppressZero = cf.filtNull;

            qApp.createCube(params, function (reply) {
                var rows = reply.qHyperCube.qDataPages[0].qMatrix;
                
                let tmp = {
                    dataName: cf.storeName,
                    data: rows
                };

                vApp.$store.dispatch('updateData', tmp);
                console.log('tmp: ', cf.storeName);
                
                //组织架构只需要初始化一次，初始化后直接销毁session
                // if (cf.storeName === 'organization') {
                //     qApp.destroySessionObject(reply.qInfo.qId);
                // }
            })

        }
    }

    /*---------------------------------------------------------------------*/
    _initKpiParam(arr) {
        if (arr.length === 0) {
            return [];
        }
        else {
            var list = [];
            var item = {};
            var shortName = [];
            arr.forEach(name=> {
                item = {
                    qDef: {
                        qDef: name[0]
                    }
                }
                list.push(item);
                shortName.push(name[1])
            });
            return {list, shortName};
        }
    }

    getKpiData(qApp, vApp, config) {
        var cf = {
            kpiName: config.kpiName,
            kpiParams: config.kpiParams || [],
            storeName: config.storeName || config.kpiName,
            orderType: config.orderType || 1,
            orderCol: config.orderType || 0,
            filtNull: config.filtNull || true
        }

        if (qApp) {
            var formula = getFormula(cf.kpiName, cf.kpiParams),
                qMeasures = formula.qMeasures;

            var params = {
                qInitialDataFetch: [{
                    qTop: 0,
                    qLeft: 0,
                    qHeight: 1,
                    qWidth: 100
                }],
            };

            var kpiParams = this._initKpiParam(qMeasures);
            params.qMeasures = kpiParams.list;
            params.qInterColumnSortOrder = [cf.orderCol];
            var shortName = kpiParams.shortName,
                result = {};
        

            qApp.createCube(params, function (reply) {
                var values = reply.qHyperCube.qDataPages[0].qMatrix[0] || [];

                values.forEach((v, i)=>{
                    result[shortName[i]] = v
                });

                window.Log.info('result', result);

                vApp.$store.dispatch('updateData', result);
            })

        }
    }
}

export default new Cube();