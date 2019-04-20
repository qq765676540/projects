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

    getData(qApp, vApp, kpiName, dataName) {
        var qDimensions = formula[kpiName].qDimensions,
            qMeasures = formula[kpiName].qMeasures;
        var params = {
            qInitialDataFetch: [{
                qTop: 0,
                qLeft: 0,
                qHeight: 1000,
                qWidth: 4
            }]
        };

        params.qDimensions = this._initParam(qDimensions, "dimension");
        params.qMeasures = this._initParam(qMeasures, "measure");

        // return new Promise((resolve, reject) => { 
        //     qApp.createCube(params, function (reply) {
        //         var rows = reply.qHyperCube.qDataPages[0].qMatrix;
        //         var grandTotal = reply.qHyperCube.qGrandTotalRow;
        //         resolve({
        //             grandTotal: grandTotal,
        //             rows: rows
        //         });
        //         callback({
        //             grandTotal: grandTotal,
        //             rows: rows
        //         })
        //     })
        // })

        qApp.createCube(params, function (reply) {
            var rows = reply.qHyperCube.qDataPages[0].qMatrix;
            var grandTotal = reply.qHyperCube.qGrandTotalRow;
            
            // var data = {
            //     grandTotal: grandTotal,
            //     rows: rows
            // }

            vApp.$store.dispatch('updateData', {
                dataName: dataName,
                data: rows
            })
        })
    }
}

export default Cube;