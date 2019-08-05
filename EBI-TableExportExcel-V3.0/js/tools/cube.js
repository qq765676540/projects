define([], function () {

    let _initParam = function (arr, type, orderType, qNullSuppression) {
        if (qNullSuppression === undefined) {
            qNullSuppression = true;
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
                            qFieldDefs: [name],
                            "qSortCriterias": [
                                { "qSortByAscii": 1 }
                            ]
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

    return function (qApp, opt, callback) {
        let cf = {
            formulaOpt: opt.formulaOpt,
            orderType: opt.orderType || -1,
            orderCol: opt.orderCol || 0,
            filtNull: false,
            qHeight: opt.qHeight || 20,
            qWidth: opt.qWidth || 20,
            qTop: opt.qTop || 0
        }

        if (qApp) {
            var formula = cf.formulaOpt;
            var qDimensions = formula.qDimensions,
                qMeasures = formula.qMeasures;
            var params = {
                qInitialDataFetch: [{
                    qTop: cf.qTop,
                    qLeft: 0,
                    qHeight: cf.qHeight,
                    qWidth: cf.qWidth
                }],
            };

            params.qDimensions = _initParam(qDimensions, "dimension", cf.orderType, cf.filtNull);
            params.qMeasures = _initParam(qMeasures, "measure", cf.orderType, cf.filtNull);
            params.qInterColumnSortOrder = [0,1];

            qApp.createCube(params, function (reply) {
                let rows = reply.qHyperCube.qDataPages[0].qMatrix;
                let obj = {
                    rows: rows,
                    qcy: reply.qHyperCube.qSize.qcy
                };
                qApp.destroySessionObject(reply.qInfo.qId);
                // console.log(reply.qHyperCube);
                (callback && typeof (callback) === "function") && callback(obj);
            });
        }
    }

});



