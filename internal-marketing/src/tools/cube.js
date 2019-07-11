/** 
 * 向qliksense的APP请求数据
 **/ 

import getFormula from '../config/formulaDev'
// import getFormula from '../config/formula'

class Cube {
    constructor() {
    }
    
    /**
     * 拼接createCube方法所需参数
     * @param {*} arr
     * @param {*} type
     **/

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
    
    getData(qApp, vApp, opt, callback) {

        let cf = {
            formulaOpt: opt.formulaOpt,
            orderType: opt.orderType || -1,
            orderCol: opt.orderCol || 0,
            filtNull: opt.filtNull && true,
            qHeight: opt.qHeight || 100,
            qWidth: opt.qWidth || 10,
            dataName: opt.dataName || opt.formulaOpt.name
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

            qApp.createCube(params, function (reply) {
                let rows = reply.qHyperCube.qDataPages[0].qMatrix;
                
                let vuexOpt = {
                    dataName: cf.dataName,
                    data: rows
                };
                
                vApp.$store.dispatch('updateData', vuexOpt);
                qApp.destroySessionObject(reply.qInfo.qId);
                
                (callback && typeof (callback) === "function") && callback(rows);
            });   
        }
    }
}

export default new Cube();