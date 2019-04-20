var formula = {
    rankByCustomer: {
        qDimensions: ["year"],
        qMeasures: [
            // "=Sum(客户排序)",
            "=num(Sum(sales),'#,###,###.')",
            // "=num(Sum(客户销售金额)/Sum(total 客户销售金额),'#,##.00%')"
        ]
    },
    rankByCommodity: {
        qDimensions: ["商品名称", "商品排序"],
        qMeasures: [
            "=num(Sum(商品销售金额),'#,###,###.')",
            "=num(Sum(商品销售金额)/Sum(total 商品销售金额),'#,##.00%')"
        ]
    },
    mapData: {
        qDimensions: ["市名称"],
        qMeasures: [
            "=Sum({<省名称={'湖北省'}>}销售金额)"
        ]
    },
    halfYearIncome: {
        qDimensions: ["月份"],
        qMeasures: ["=Sum({<年月={'>=$(vPre6Month)'},[日期_WID]={'<=$(vd)'}>}[销售金额])/10000/10000",
                    "=Sum({<年月={'>=$(vPre6Month)'},[日期_WID]={'<=$(vd)'}>}[销售金额])/Sum({<年月={'>=$(vPre18Month)<=$(vPre12Month)'},[日期_WID]={'<=$(vlast1d)'}>}[销售金额]) -1"]
    },
    yearTotalIncome: {
        qDimensions: [],
        qMeasures: [
            "=Sum(销售金额)"
        ]
    }
}

export default formula;