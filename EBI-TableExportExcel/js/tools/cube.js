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
            filtNull: opt.filtNull && true,
            qHeight: opt.qHeight || 3000,
            qWidth: opt.qWidth || 3
        }

        if (qApp) {
            var formula = cf.formulaOpt;
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

            params.qDimensions = _initParam(qDimensions, "dimension", cf.orderType, cf.filtNull);
            params.qMeasures = _initParam(qMeasures, "measure", cf.orderType, cf.filtNull);
            params.qInterColumnSortOrder = [0,1];

            // console.log(cf.dataName+'-qDimensions',params.qDimensions);
            // console.log(cf.dataName+'-qMeasures',params.qMeasures);

            qApp.createCube(params, function (reply) {
                let rows = reply.qHyperCube.qDataPages[0].qMatrix;
                qApp.destroySessionObject(reply.qInfo.qId);

                (callback && typeof (callback) === "function") && callback(rows);
            });
        }
    }

});



