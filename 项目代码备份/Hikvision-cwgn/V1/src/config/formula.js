export default
    

function getFormula(opt) {
    let time = opt.time;
    let org = opt.org;
    let name = opt.name;
    let timeStr = "";
    let timeYearEndDayStr = "";
    let orgStr = "";
    let currDate = new Date();
    currDate.setDate(currDate.getDate() - 1);
    let marginStartMonth = currDate.Format('yyyy') / 1 - 1 + "01";
    let marginEndMonth = currDate.Format('yyyyMM');

    function mGetDate(year, month) {
        var d = new Date(year, month, 0);
        return d.getDate();
    }

    let days = mGetDate(time.year, time.endMonth);
    switch (time.name) {
        case "其他":
            timeStr = ">=" + time.startMonth + "/1/" + time.year + "<=" + time.endMonth + "/" + days + "/" + time.year;
            timeYearEndDayStr = ">=" + time.startMonth + "/1/" + time.year + "<=" + time.endMonth + "/" + days + "/" + time.year;
            break;
        case "本月":
            timeStr = ">=$(vCurrMonthStartDay)<=$(vCurrDay)";
            timeYearEndDayStr = ">=$(vCurrMonthStartDay)<=$(vCurrMonthEndDay)";
            break;
        case "本季":
            timeStr = ">=$(vCurrQuarterStartDay)<=$(vCurrDay)"
            timeYearEndDayStr = ">=$(vCurrQuarterStartDay)<=$(vCurrQuarterEndDay)"
            break;
        case "本年":
            timeStr = ">=$(vCurrYearStartDay)<=$(vCurrDay)"
            timeYearEndDayStr = ">=$(vCurrYearStartDay)<=$(vCurrYearEndDay)"
            break;
        case "上月":
            timeStr = ">=$(vLastMonthStartDay)<=$(vLastMonthEndDay)"
            timeYearEndDayStr = ">=$(vLastMonthStartDay)<=$(vLastMonthEndDay)"
            break;
    }
    timeStr = 'CALDAY={"' + timeStr + '"}';
    timeYearEndDayStr = 'CALDAY={"' + timeYearEndDayStr + '"}';
    orgStr = "TXTSH_YWZX={'" + org + "'}";

    let formula = {
        'main-persion': {
            qDimensions: [
                `=[姓名]`
            ],
            qMeasures: ["=sum(1)"]
        },
        'main-business-center': {
            qDimensions: [
                `=TXTSH_YWZX`
            ],
            qMeasures: ["=sum(1)"]
        },
        'over-all-kpi': {
            qDimensions: ["='KPI'"],
            qMeasures: [
                `=num(Sum({<${timeStr},${orgStr},ZSALESORG_FLAG={'分公司'},ZGNGM={'国内'},MATERIAL_FLAG={'收入物料'}>}ZFI_PJSR)/10000,'#,##0')`,
                `=num(Sum({<${timeStr},${orgStr},ZSALESORG_FLAG={'分公司'},ZGNGM={'国内'},MATERIAL_FLAG={'收入物料'}>}ZFI_PJSR)/ Sum({<${timeYearEndDayStr},${orgStr},ZFI_XWLX={'GN-MB001'}>}ZFI_MBZ),'0.0%')`,
                `=num((Sum({<${timeStr},${orgStr},ZSALESORG_FLAG={'分公司'},ZGNGM={'国内'},MATERIAL_FLAG={'收入物料'}>}ZFI_PJSR)-Sum({<${timeStr},${orgStr},ZSALESORG_FLAG={'分公司'},ZGNGM={'国内'},MATERIAL_FLAG={'收入物料'}>}ZFI_PJSR_LY))/fAbs(Sum({<${timeStr},${orgStr},ZSALESORG_FLAG={'分公司'},ZGNGM={'国内'},MATERIAL_FLAG={'收入物料'}>}ZFI_PJSR_LY)),'0.0%')`,
                `=num(Sum({<${timeStr},${orgStr},ZFLAG={'X'},ZSALESORG_FLAG={'分公司'},ZGNGM={'国内'},MATERIAL_FLAG={'收入物料'}>}ZFI_PJSR)/10000,'#,##0')`,
                `=num(Sum({<${timeStr},${orgStr},ZFLAG={'X'},ZSALESORG_FLAG={'分公司'},ZGNGM={'国内'},MATERIAL_FLAG={'收入物料'}>}ZFI_PJSR)/ Sum({<${timeYearEndDayStr},${orgStr},ZFI_XWLX={'GN-MB002'}>}ZFI_MBZ),'0.0%')`,
                `=num((Sum({<${timeStr},${orgStr},ZFLAG={'X'},ZSALESORG_FLAG={'分公司'},ZGNGM={'国内'},MATERIAL_FLAG={'收入物料'}>}ZFI_PJSR)-Sum({<${timeStr},${orgStr},ZFLAG={'X'},ZSALESORG_FLAG={'分公司'},ZGNGM={'国内'},MATERIAL_FLAG={'收入物料'}>}ZFI_PJSR_LY))/fAbs(Sum({<${timeStr},${orgStr},ZFLAG={'X'},ZYJTZLX-={"*GNFHW01*"},ZSALESORG_FLAG={'分公司'},ZGNGM={'国内'},MATERIAL_FLAG={'收入物料'}>}ZFI_PJSR_LY)),'0.0%')`,
                `=num(Sum({<${timeStr},${orgStr},ZSALESORG_FLAG={'分公司'},ZGNGM={'国内'},MATERIAL_FLAG={'收入物料'}>}ZFI_PJML)/10000,'#,##0')`,
                `=num((Sum({<${timeStr},${orgStr},ZSALESORG_FLAG={'分公司'},ZGNGM={'国内'},MATERIAL_FLAG={'收入物料'}>}ZFI_PJML)-Sum({<${timeStr},${orgStr},ZSALESORG_FLAG={'分公司'},ZGNGM={'国内'},MATERIAL_FLAG={'收入物料'}>}ZFI_PJML_LY))/fAbs(Sum({<${timeStr},${orgStr},ZSALESORG_FLAG={'分公司'},ZGNGM={'国内'},MATERIAL_FLAG={'收入物料'}>}ZFI_PJML_LY)),'0.0%')`,
                `=num(Sum({<${timeStr},${orgStr},ZSALESORG_FLAG={'分公司'},ZGNGM={'国内'},MATERIAL_FLAG={'收入物料'}>}ZFI_PJML)/ Sum({<${timeStr},${orgStr},ZSALESORG_FLAG={'分公司'},ZGNGM={'国内'},MATERIAL_FLAG={'收入物料'}>}ZFI_PJSR),'0.0%')`,
                `=num(Sum({<${timeStr},${orgStr},ZSALESORG_FLAG={'分公司'},ZGNGM={'国内'},MATERIAL_FLAG={'收入物料'}>}ZFI_PJML_LY)/ Sum({<${timeStr},${orgStr},ZSALESORG_FLAG={'分公司'},ZGNGM={'国内'},MATERIAL_FLAG={'收入物料'}>}ZFI_PJSR_LY),'0.0%')`,
                `=num(Sum({<${timeStr},${orgStr},ZDEPTCOD1={'00DM000000'}>}ZFI_FY)/10000,'#,##0')`,
                `=num(Sum({<${timeStr},${orgStr},ZDEPTCOD1={'00DM000000'}>}ZFI_FY)/ Sum({<${timeYearEndDayStr},${orgStr},ZFI_XWLX={'GN-MB003'}>}ZFI_MBZ),'0.0%')`,
                `=num((Sum({<${timeStr},${orgStr},ZDEPTCOD1={'00DM000000'}>}ZFI_FY)- Sum({<${timeStr},${orgStr},ZDEPTCOD1={'00DM000000'}>}ZFI_FY_LY))/fAbs(Sum({<${timeStr},${orgStr},ZDEPTCOD1={'00DM000000'}>}ZFI_FY_LY)),'0.0%')`,
                `=num(Sum({<${timeStr},${orgStr},ZDEPTCOD1={'00DM000000'}>}ZFI_FY)/ Sum({<${timeStr},${orgStr},ZFLAG={'X'},ZSALESORG_FLAG={'分公司'},ZGNGM={'国内'},MATERIAL_FLAG={'收入物料'}>}ZFI_PJSR),'0.0%')`,
                `=num(Sum({<${timeStr},${orgStr},ZDEPTCOD1={'00DM000000'}>}ZFI_FY_LY)/Sum({<${timeStr},${orgStr},ZFLAG={'X'},ZSALESORG_FLAG={'分公司'},ZGNGM={'国内'},MATERIAL_FLAG={'收入物料'}>}ZFI_PJSR_LY),'0.0%')`,
                `=num((Sum({<${timeStr},${orgStr},ZSALESORG_FLAG={'分公司'},ZGNGM={'国内'},MATERIAL_FLAG={'收入物料'}>}ZFI_PJML)-Sum({<${timeStr},${orgStr},ZDEPTCOD1={'00DM000000'}>}ZFI_FY))/10000,'#,##0')`,
                `=num(((Sum({<${timeStr},${orgStr},ZSALESORG_FLAG={'分公司'},ZGNGM={'国内'},MATERIAL_FLAG={'收入物料'}>}ZFI_PJML)-Sum({<${timeStr},${orgStr},ZDEPTCOD1={'00DM000000'}>}ZFI_FY))-(Sum({<${timeStr},${orgStr},ZSALESORG_FLAG={'分公司'},ZGNGM={'国内'},MATERIAL_FLAG={'收入物料'}>}ZFI_PJML_LY)-Sum({<${timeStr},${orgStr},ZDEPTCOD1={'00DM000000'}>}ZFI_FY_LY)))/fabs(Sum({<${timeStr},${orgStr},ZSALESORG_FLAG={'分公司'},ZGNGM={'国内'},MATERIAL_FLAG={'收入物料'}>}ZFI_PJML_LY)-Sum({<${timeStr},${orgStr},ZDEPTCOD1={'00DM000000'}>}ZFI_FY_LY)),'0.0%')`,
                `=num((Sum({<${timeStr},${orgStr},ZSALESORG_FLAG={'分公司'},ZGNGM={'国内'},MATERIAL_FLAG={'收入物料'}>}ZFI_PJML)-Sum({<${timeStr},${orgStr},ZDEPTCOD1={'00DM000000'}>}ZFI_FY))/Sum({<${timeStr},${orgStr},ZFLAG={'X'},ZSALESORG_FLAG={'分公司'},ZGNGM={'国内'},MATERIAL_FLAG={'收入物料'}>}ZFI_PJSR),'0.0%')`,
                `=num((Sum({<${timeStr},${orgStr},ZSALESORG_FLAG={'分公司'},ZGNGM={'国内'},MATERIAL_FLAG={'收入物料'}>}ZFI_PJML)-Sum({<${timeStr},${orgStr},ZDEPTCOD1={'00DM000000'}>}ZFI_FY_LY))/Sum({<${timeStr},${orgStr},ZFLAG={'X'},ZSALESORG_FLAG={'分公司'},ZGNGM={'国内'},MATERIAL_FLAG={'收入物料'}>}ZFI_PJSR_LY),'0.0%')`
            ]
        },
        'over-all-progress': {
            qDimensions: [],
            qMeasures: [
                `=Sum({<CALDAY={">=$(vCurrYearStartDay)<=$(vCurrDay)"},${orgStr},ZSALESORG_FLAG={'分公司'},ZGNGM={'国内'},MATERIAL_FLAG={'收入物料'}>}ZFI_PJSR)/Sum({<CALYEAR={'$(vCurrYear)'},${orgStr},ZFI_XWLX={'GN-MB001'}>}ZFI_MBZ)`,
                `=Sum({<CALDAY={">=$(vCurrYearStartDay)<=$(vCurrDay)"},${orgStr},ZFLAG={'X'},ZSALESORG_FLAG={'分公司'},ZGNGM={'国内'},MATERIAL_FLAG={'收入物料'}>}ZFI_PJSR)/Sum({<CALYEAR={'$(vCurrYear)'},${orgStr},ZFI_XWLX={'GN-MB002'}>}ZFI_MBZ)`,
                `=Sum({<CALDAY={">=$(vCurrYearStartDay)<=$(vCurrDay)"},${orgStr},ZDEPTCOD1={'00DM000000'}>}ZFI_FY)/Sum({<CALYEAR={'$(vCurrYear)'},${orgStr},ZFI_XWLX={'GN-MB003'}>}ZFI_MBZ)`,
            ]
        },
        'over-all-ranking': {
            qDimensions: [
                `=if(ZZXSZZ<>'',ZZXSZZ)`
            ],
            qMeasures: [
                `=Sum({<${timeStr},${orgStr},ZSALESORG_FLAG={'分公司'},ZGNGM={'国内'},MATERIAL_FLAG={'收入物料'}>}ZFI_PJSR)`,
                `=Sum({<${timeYearEndDayStr},${orgStr},ZFI_XWLX={'GN-MB001'}>}ZFI_MBZ)`,
                `=Sum({<${timeStr},${orgStr},ZSALESORG_FLAG={'分公司'},ZGNGM={'国内'},MATERIAL_FLAG={'收入物料'}>}ZFI_PJSR)/Sum({<${timeYearEndDayStr},${orgStr},ZFI_XWLX={'GN-MB001'}>}ZFI_MBZ)`,
                `=Sum(total {<${timeStr},${orgStr},ZSALESORG_FLAG={'分公司'},ZGNGM={'国内'},MATERIAL_FLAG={'收入物料'}>}ZFI_PJSR)/Sum(total {<${timeYearEndDayStr},${orgStr},ZFI_XWLX={'GN-MB001'}>}ZFI_MBZ)`
            ]
        },
        'income-view': {
            qDimensions: ["='KPI'"],
            qMeasures: [
                `=num(Sum({<${timeStr},${orgStr},ZSALESORG_FLAG={'分公司'},ZGNGM={'国内'},MATERIAL_FLAG={'收入物料'}>}ZFI_PJSR)/10000,'#,##0')`,
                `=round(Sum({<${timeStr},${orgStr},ZSALESORG_FLAG={'分公司'},ZGNGM={'国内'},MATERIAL_FLAG={'收入物料'}>}ZFI_PJSR)/Sum({<${timeYearEndDayStr},${orgStr},ZFI_XWLX={'GN-MB001'}>}ZFI_MBZ)*100,0.1)`,
                `=num(Sum({<${timeYearEndDayStr},${orgStr},ZFI_XWLX={'GN-MB001'}>}ZFI_MBZ)/10000,'#,##0')`,
                `=num((Sum({<${timeYearEndDayStr},${orgStr},ZFI_XWLX={'GN-MB001'}>}ZFI_MBZ)-Sum({<${timeStr},${orgStr},ZSALESORG_FLAG={'分公司'},ZGNGM={'国内'},MATERIAL_FLAG={'收入物料'}>}ZFI_PJSR))/10000,'#,##0')`,
                `=num((Sum({<${timeStr},${orgStr},ZSALESORG_FLAG={'分公司'},ZGNGM={'国内'},MATERIAL_FLAG={'收入物料'}>}ZFI_PJSR)-Sum({<${timeStr},${orgStr},ZSALESORG_FLAG={'分公司'},ZGNGM={'国内'},MATERIAL_FLAG={'收入物料'}>}ZFI_PJSR_LY))/fAbs(Sum({<${timeStr},${orgStr},ZSALESORG_FLAG={'分公司'},ZGNGM={'国内'},MATERIAL_FLAG={'收入物料'}>}ZFI_PJSR_LY)),'0.0%')`,
                `=num(Sum({<${timeStr},${orgStr},ZFLAG={'X'},ZSALESORG_FLAG={'分公司'},ZGNGM={'国内'},MATERIAL_FLAG={'收入物料'}>}ZFI_PJSR)/10000,'#,##0')`,
                `=round(Sum({<${timeStr},${orgStr},ZFLAG={'X'},ZSALESORG_FLAG={'分公司'},ZGNGM={'国内'},MATERIAL_FLAG={'收入物料'}>}ZFI_PJSR)/Sum({<${timeYearEndDayStr},${orgStr},ZFI_XWLX={'GN-MB002'}>}ZFI_MBZ)*100,0.1)`,
                `=num(Sum({<${timeYearEndDayStr},${orgStr},ZFI_XWLX={'GN-MB002'}>}ZFI_MBZ)/10000,'#,##0')`,
                `=num((Sum({<${timeYearEndDayStr},${orgStr},ZFI_XWLX={'GN-MB002'}>}ZFI_MBZ)-Sum({<${timeStr},${orgStr},ZFLAG={'X'},ZSALESORG_FLAG={'分公司'},ZGNGM={'国内'},MATERIAL_FLAG={'收入物料'}>}ZFI_PJSR))/10000,'#,##0')`,
                `=num((Sum({<${timeStr},${orgStr},ZFLAG={'X'},ZSALESORG_FLAG={'分公司'},ZGNGM={'国内'},MATERIAL_FLAG={'收入物料'}>}ZFI_PJSR)-Sum({<${timeStr},${orgStr},ZFLAG={'X'},ZSALESORG_FLAG={'分公司'},ZGNGM={'国内'},MATERIAL_FLAG={'收入物料'}>}ZFI_PJSR_LY))/fAbs(Sum({<${timeStr},${orgStr},ZFLAG={'X'},ZSALESORG_FLAG={'分公司'},ZGNGM={'国内'},MATERIAL_FLAG={'收入物料'}>}ZFI_PJSR_LY)),'0.0%')`
            ]
        },
        'income-year': {
            qDimensions: [],
            qMeasures: [
                `=num(Sum({<CALDAY={">=$(vCurrYearStartDay)<=$(vCurrDay)"},${orgStr},ZSALESORG_FLAG={'分公司'},ZGNGM={'国内'},MATERIAL_FLAG={'收入物料'}>}ZFI_PJSR)/Sum({<CALYEAR={'$(vCurrYear)'},${orgStr},ZFI_XWLX={'GN-MB001'}>}ZFI_MBZ)*100,'0.0')`,
                `=num(Sum({<CALDAY={">=$(vCurrYearStartDay)<=$(vCurrDay)"},${orgStr},ZSALESORG_FLAG={'分公司'},ZGNGM={'国内'},MATERIAL_FLAG={'收入物料'}>}ZFI_PJSR)/10000,'#,##0')`,
                `=num(Sum({<CALYEAR={'$(vCurrYear)'},${orgStr},ZFI_XWLX={'GN-MB001'}>}ZFI_MBZ)/10000,'#,##0')`,
                `=num((Sum({<CALYEAR={'$(vCurrYear)'},${orgStr},ZFI_XWLX={'GN-MB001'}>}ZFI_MBZ)-Sum({<CALDAY={">=$(vCurrYearStartDay)<=$(vCurrDay)"},${orgStr},ZSALESORG_FLAG={'分公司'},ZGNGM={'国内'},MATERIAL_FLAG={'收入物料'}>}ZFI_PJSR))/10000,'#,##0')`,
                `=num(Sum({<CALDAY={">=$(vCurrYearStartDay)<=$(vCurrDay)"},${orgStr},ZFLAG={'X'},ZSALESORG_FLAG={'分公司'},ZGNGM={'国内'},MATERIAL_FLAG={'收入物料'}>}ZFI_PJSR)/Sum({<CALYEAR={'$(vCurrYear)'},${orgStr},ZFI_XWLX={'GN-MB002'}>}ZFI_MBZ)*100,'0.0')`,
                `=num(Sum({<CALDAY={">=$(vCurrYearStartDay)<=$(vCurrDay)"},${orgStr},ZFLAG={'X'},ZSALESORG_FLAG={'分公司'},ZGNGM={'国内'},MATERIAL_FLAG={'收入物料'}>}ZFI_PJSR)/10000,'#,##0')`,
                `=num(Sum({<CALYEAR={'$(vCurrYear)'},${orgStr},ZFI_XWLX={'GN-MB002'}>}ZFI_MBZ)/10000,'#,##0')`,
                `=num((Sum({<CALYEAR={'$(vCurrYear)'},${orgStr},ZFI_XWLX={'GN-MB002'}>}ZFI_MBZ)-Sum({<CALDAY={">=$(vCurrYearStartDay)<=$(vCurrDay)"},${orgStr},ZFLAG={'X'},ZSALESORG_FLAG={'分公司'},ZGNGM={'国内'},MATERIAL_FLAG={'收入物料'}>}ZFI_PJSR))/10000,'#,##0')`
            ]
        },
        'income-industry': {
            qDimensions: [
                `=if(TXTMD_HY<>'',TXTMD_HY)`
            ],
            qMeasures: [
                `=num(Sum({<${timeStr},${orgStr},ZSALESORG_FLAG={'分公司'},ZGNGM={'国内'},MATERIAL_FLAG={'收入物料'}>}ZFI_PJSR)/10000,'#,##0')`,
                `=num(Sum({<${timeStr},${orgStr},ZSALESORG_FLAG={'分公司'},ZGNGM={'国内'},MATERIAL_FLAG={'收入物料'}>}ZFI_PJSR)/Sum( total {<TXTMD_HY-={''},${timeStr},${orgStr},ZSALESORG_FLAG={'分公司'},ZGNGM={'国内'},MATERIAL_FLAG={'收入物料'}>}ZFI_PJSR),'0.0%')`,
                `=num((Sum({<${timeStr},${orgStr},ZSALESORG_FLAG={'分公司'},ZGNGM={'国内'},MATERIAL_FLAG={'收入物料'}>}ZFI_PJSR)-Sum({<${timeStr},${orgStr},ZSALESORG_FLAG={'分公司'},ZGNGM={'国内'},MATERIAL_FLAG={'收入物料'}>}ZFI_PJSR_LY))/fAbs(Sum({<${timeStr},${orgStr},ZSALESORG_FLAG={'分公司'},ZGNGM={'国内'},MATERIAL_FLAG={'收入物料'}>}ZFI_PJSR_LY)),'0.0%')`,
                `=num(Sum({<${timeStr},${orgStr},ZFLAG={'X'},ZSALESORG_FLAG={'分公司'},ZGNGM={'国内'},MATERIAL_FLAG={'收入物料'}>}ZFI_PJSR)/10000,'#,##0')`,
                `=num(Sum({<${timeStr},${orgStr},ZFLAG={'X'},ZSALESORG_FLAG={'分公司'},ZGNGM={'国内'},MATERIAL_FLAG={'收入物料'}>}ZFI_PJSR)/Sum(total {<TXTMD_HY-={''},${timeStr},${orgStr},ZFLAG={'X'},ZSALESORG_FLAG={'分公司'},ZGNGM={'国内'},MATERIAL_FLAG={'收入物料'}>}ZFI_PJSR),'0.0%')`,
                `=num((Sum({<${timeStr},${orgStr},ZFLAG={'X'},ZSALESORG_FLAG={'分公司'},ZGNGM={'国内'},MATERIAL_FLAG={'收入物料'}>}ZFI_PJSR)-Sum({<${timeStr},${orgStr},ZFLAG={'X'},ZSALESORG_FLAG={'分公司'},ZGNGM={'国内'},MATERIAL_FLAG={'收入物料'}>}ZFI_PJSR_LY))/fAbs(Sum({<${timeStr},${orgStr},ZFLAG={'X'},ZSALESORG_FLAG={'分公司'},ZGNGM={'国内'},MATERIAL_FLAG={'收入物料'}>}ZFI_PJSR_LY)),'0.0%')`
            ]
        },
        'income-industryTotal': {
            qDimensions: [
                `='—合计—'`
            ],
            qMeasures: [
                `=num(Sum({<TXTMD_HY-={''},${timeStr},${orgStr},ZSALESORG_FLAG={'分公司'},ZGNGM={'国内'},MATERIAL_FLAG={'收入物料'}>}ZFI_PJSR)/10000,'#,##0')`,
                `=num(sum(1),'0.0%')`,
                `=num((Sum({<TXTMD_HY-={''},${timeStr},${orgStr},ZSALESORG_FLAG={'分公司'},ZGNGM={'国内'},MATERIAL_FLAG={'收入物料'}>}ZFI_PJSR)-Sum({<TXTMD_HY-={''},${timeStr},${orgStr},ZSALESORG_FLAG={'分公司'},ZGNGM={'国内'},MATERIAL_FLAG={'收入物料'}>}ZFI_PJSR_LY))/fAbs(Sum({<TXTMD_HY-={''},${timeStr},${orgStr},ZSALESORG_FLAG={'分公司'},ZGNGM={'国内'},MATERIAL_FLAG={'收入物料'}>}ZFI_PJSR_LY)),'0.0%')`,
                `=num(Sum({<TXTMD_HY-={''},${timeStr},${orgStr},ZFLAG={'X'},ZSALESORG_FLAG={'分公司'},ZGNGM={'国内'},MATERIAL_FLAG={'收入物料'}>}ZFI_PJSR)/10000,'#,##0')`,
                `=num(Sum(1),'0.0%')`,
                `=num((Sum({<TXTMD_HY-={''},${timeStr},${orgStr},ZFLAG={'X'},ZSALESORG_FLAG={'分公司'},ZGNGM={'国内'},MATERIAL_FLAG={'收入物料'}>}ZFI_PJSR)-Sum({<TXTMD_HY-={''},${timeStr},${orgStr},ZFLAG={'X'},ZSALESORG_FLAG={'分公司'},ZGNGM={'国内'},MATERIAL_FLAG={'收入物料'}>}ZFI_PJSR_LY))/fAbs(Sum({<TXTMD_HY-={''},${timeStr},${orgStr},ZFLAG={'X'},ZSALESORG_FLAG={'分公司'},ZGNGM={'国内'},MATERIAL_FLAG={'收入物料'}>}ZFI_PJSR_LY)),'0.0%')`
            ]
        },
        'income-product': {
            qDimensions: [
                `=if(ZZMVGR5<>'',ZZMVGR5)`
            ],
            qMeasures: [
                `=num(Sum({<${timeStr},${orgStr},ZSALESORG_FLAG={'分公司'},ZGNGM={'国内'},MATERIAL_FLAG={'收入物料'}>}ZFI_PJSR)/10000,'#,##0')`,
                `=num(Sum({<${timeStr},${orgStr},ZSALESORG_FLAG={'分公司'},ZGNGM={'国内'},MATERIAL_FLAG={'收入物料'}>}ZFI_PJSR)/Sum( total {<${timeStr},${orgStr},ZSALESORG_FLAG={'分公司'},ZGNGM={'国内'},MATERIAL_FLAG={'收入物料'}>}ZFI_PJSR),'0.0%')`,
                `=num((Sum({<${timeStr},${orgStr},ZSALESORG_FLAG={'分公司'},ZGNGM={'国内'},MATERIAL_FLAG={'收入物料'}>}ZFI_PJSR)-Sum({<${timeStr},${orgStr},ZSALESORG_FLAG={'分公司'},ZGNGM={'国内'},MATERIAL_FLAG={'收入物料'}>}ZFI_PJSR_LY))/fAbs(Sum({<${timeStr},${orgStr},ZSALESORG_FLAG={'分公司'},ZGNGM={'国内'},MATERIAL_FLAG={'收入物料'}>}ZFI_PJSR_LY)),'0.0%')`,
                `=num(Sum({<${timeStr},${orgStr},ZFLAG={'X'},ZSALESORG_FLAG={'分公司'},ZGNGM={'国内'},MATERIAL_FLAG={'收入物料'}>}ZFI_PJSR)/10000,'#,##0')`,
                `=num(Sum({<${timeStr},${orgStr},ZFLAG={'X'},ZSALESORG_FLAG={'分公司'},ZGNGM={'国内'},MATERIAL_FLAG={'收入物料'}>}ZFI_PJSR)/Sum(total {<${timeStr},${orgStr},ZFLAG={'X'},ZSALESORG_FLAG={'分公司'},ZGNGM={'国内'},MATERIAL_FLAG={'收入物料'}>}ZFI_PJSR),'0.0%')`,
                `=num((Sum({<${timeStr},${orgStr},ZFLAG={'X'},ZSALESORG_FLAG={'分公司'},ZGNGM={'国内'},MATERIAL_FLAG={'收入物料'}>}ZFI_PJSR)-Sum({<${timeStr},${orgStr},ZFLAG={'X'},ZSALESORG_FLAG={'分公司'},ZGNGM={'国内'},MATERIAL_FLAG={'收入物料'}>}ZFI_PJSR_LY))/fAbs(Sum({<${timeStr},${orgStr},ZFLAG={'X'},ZSALESORG_FLAG={'分公司'},ZGNGM={'国内'},MATERIAL_FLAG={'收入物料'}>}ZFI_PJSR_LY)),'0.0%')`
            ]
        },
        'income-productTotal': {
            qDimensions: [
                `='—合计—'`
            ],
            qMeasures: [
                `=num(Sum({<${timeStr},${orgStr},ZSALESORG_FLAG={'分公司'},ZGNGM={'国内'},MATERIAL_FLAG={'收入物料'}>}ZFI_PJSR)/10000,'#,##0')`,
                `=num(Sum({<${timeStr},${orgStr},ZSALESORG_FLAG={'分公司'},ZGNGM={'国内'},MATERIAL_FLAG={'收入物料'}>}ZFI_PJSR)/Sum( total {<${timeStr},${orgStr},ZSALESORG_FLAG={'分公司'},ZGNGM={'国内'},MATERIAL_FLAG={'收入物料'}>}ZFI_PJSR),'0.0%')`,
                `=num((Sum({<${timeStr},${orgStr},ZSALESORG_FLAG={'分公司'},ZGNGM={'国内'},MATERIAL_FLAG={'收入物料'}>}ZFI_PJSR)-Sum({<${timeStr},${orgStr},ZSALESORG_FLAG={'分公司'},ZGNGM={'国内'},MATERIAL_FLAG={'收入物料'}>}ZFI_PJSR_LY))/fAbs(Sum({<${timeStr},${orgStr},ZSALESORG_FLAG={'分公司'},ZGNGM={'国内'},MATERIAL_FLAG={'收入物料'}>}ZFI_PJSR_LY)),'0.0%')`,
                `=num(Sum({<${timeStr},${orgStr},ZFLAG={'X'},ZSALESORG_FLAG={'分公司'},ZGNGM={'国内'},MATERIAL_FLAG={'收入物料'}>}ZFI_PJSR)/10000,'#,##0')`,
                `=num(Sum({<${timeStr},${orgStr},ZFLAG={'X'},ZSALESORG_FLAG={'分公司'},ZGNGM={'国内'},MATERIAL_FLAG={'收入物料'}>}ZFI_PJSR)/Sum(total {<${timeStr},${orgStr},ZFLAG={'X'},ZSALESORG_FLAG={'分公司'},ZGNGM={'国内'},MATERIAL_FLAG={'收入物料'}>}ZFI_PJSR),'0.0%')`,
                `=num((Sum({<${timeStr},${orgStr},ZFLAG={'X'},ZSALESORG_FLAG={'分公司'},ZGNGM={'国内'},MATERIAL_FLAG={'收入物料'}>}ZFI_PJSR)-Sum({<${timeStr},${orgStr},ZFLAG={'X'},ZSALESORG_FLAG={'分公司'},ZGNGM={'国内'},MATERIAL_FLAG={'收入物料'}>}ZFI_PJSR_LY))/fAbs(Sum({<${timeStr},${orgStr},ZFLAG={'X'},ZSALESORG_FLAG={'分公司'},ZGNGM={'国内'},MATERIAL_FLAG={'收入物料'}>}ZFI_PJSR_LY)),'0.0%')`
            ]
        },
        'income-cityz': {
            qDimensions: [
                `=if(TXTSH_YWZX='${org}',if(ZZXSZZ<>'',ZZXSZZ))`
            ],
            qMeasures: [
                `=Sum({<${timeStr},ZSALESORG_FLAG={'分公司'},ZGNGM={'国内'},MATERIAL_FLAG={'收入物料'}>}ZFI_PJSR)`,
                `=(Sum({<${timeStr},ZSALESORG_FLAG={'分公司'},ZGNGM={'国内'},MATERIAL_FLAG={'收入物料'}>}ZFI_PJSR)-Sum({<${timeStr},ZSALESORG_FLAG={'分公司'},ZGNGM={'国内'},MATERIAL_FLAG={'收入物料'}>}ZFI_PJSR_LY))/fAbs(Sum({<${timeStr},ZSALESORG_FLAG={'分公司'},ZGNGM={'国内'},MATERIAL_FLAG={'收入物料'}>}ZFI_PJSR_LY))`,
                `=Sum({<${timeStr},ZYJTZLX-={"*GNFHW01*"},ZSALESORG_FLAG={'分公司'},ZGNGM={'国内'},MATERIAL_FLAG={'收入物料'}>}ZFI_PJSR)/Sum({<${timeYearEndDayStr},${orgStr},ZFI_XWLX={'GN-MB001'}>}ZFI_MBZ)`,
            ]
        },
        'income-cityzy': {
            qDimensions: [
                `=if(TXTSH_YWZX='${org}',if(ZZXSZZ<>'',ZZXSZZ))`
            ],
            qMeasures: [
                `=Sum({<${timeStr},ZFLAG={'X'},ZSALESORG_FLAG={'分公司'},ZGNGM={'国内'},MATERIAL_FLAG={'收入物料'}>}ZFI_PJSR)`,
                `=(Sum({<${timeStr},ZFLAG={'X'},ZSALESORG_FLAG={'分公司'},ZGNGM={'国内'},MATERIAL_FLAG={'收入物料'}>}ZFI_PJSR)-Sum({<${timeStr},ZFLAG={'X'},ZSALESORG_FLAG={'分公司'},ZGNGM={'国内'},MATERIAL_FLAG={'收入物料'}>}ZFI_PJSR_LY))/fAbs(Sum({<${timeStr},ZFLAG={'X'},ZSALESORG_FLAG={'分公司'},ZGNGM={'国内'},MATERIAL_FLAG={'收入物料'}>}ZFI_PJSR_LY))`,
                `=Sum({<${timeStr},ZFLAG={'X'},ZYJTZLX-={"*GNFHW01*"},ZSALESORG_FLAG={'分公司'},ZGNGM={'国内'},MATERIAL_FLAG={'收入物料'}>}ZFI_PJSR)/Sum({<${timeYearEndDayStr},${orgStr},ZFI_XWLX={'GN-MB002'}>}ZFI_MBZ)`,
            ]
        },
        'margin-city': {
            qDimensions: [
                `=if(TXTSH_YWZX='${org}',if(ZZXSZZ<>'',ZZXSZZ))`,
            ],
            qMeasures: [
                `=Sum({<${timeStr},ZSALESORG_FLAG={'分公司'},ZGNGM={'国内'},MATERIAL_FLAG={'收入物料'}>}ZFI_PJML)`,
                `=(Sum({<${timeStr},ZSALESORG_FLAG={'分公司'},ZGNGM={'国内'},MATERIAL_FLAG={'收入物料'}>}ZFI_PJML)-Sum({<${timeStr},ZSALESORG_FLAG={'分公司'},ZGNGM={'国内'},MATERIAL_FLAG={'收入物料'}>}ZFI_PJML_LY))/fAbs(Sum({<${timeStr},ZSALESORG_FLAG={'分公司'},ZGNGM={'国内'},MATERIAL_FLAG={'收入物料'}>}ZFI_PJML_LY))`
            ]
        },
        'cost-main': {
            qDimensions: [],
            qMeasures: [
                `=Sum({<${timeStr},${orgStr},ZFYXZ={'人力成本'},ZDEPTCOD1={'00DM000000'}>}ZFI_FY)`,
                `=if(Sum({<${timeStr},${orgStr},ZFYXZ={'人力成本'},ZDEPTCOD1={'00DM000000'}>}ZFI_FY)
                /Sum({<${timeYearEndDayStr},${orgStr},ZFYXZ={'人力成本'},ZFI_XWLX={'GN-MB003'}>}ZFI_MBZ)
                -1>0,Sum({<${timeStr},${orgStr},ZFYXZ={'人力成本'},ZDEPTCOD1={'00DM000000'}>}ZFI_FY)
                /Sum({<${timeYearEndDayStr},${orgStr},ZFYXZ={'人力成本'},ZFI_XWLX={'GN-MB003'}>}ZFI_MBZ)-1,0)`,
                `=(Sum({<${timeStr},${orgStr},ZFYXZ={'人力成本'},ZDEPTCOD1={'00DM000000'}>}ZFI_FY)
                -Sum({<${timeStr},${orgStr},ZFYXZ={'人力成本'},ZDEPTCOD1={'00DM000000'}>}ZFI_FY_LY)
                )/fAbs(Sum({<${timeStr},${orgStr},ZFYXZ={'人力成本'},ZDEPTCOD1={'00DM000000'}>}ZFI_FY_LY))`,
                `=Sum({<${timeStr},${orgStr},ZFYXZ={'业务招待'},ZDEPTCOD1={'00DM000000'}>}ZFI_FY)`,
                `=if(Sum({<${timeStr},${orgStr},ZFYXZ={'业务招待'},ZDEPTCOD1={'00DM000000'}>}ZFI_FY)
                /Sum({<${timeYearEndDayStr},${orgStr},ZFYXZ={'业务招待'},ZFI_XWLX={'GN-MB003'}>}ZFI_MBZ)
                -1>0,Sum({<${timeStr},${orgStr},ZFYXZ={'业务招待'},ZDEPTCOD1={'00DM000000'}>}ZFI_FY)
                /Sum({<${timeYearEndDayStr},${orgStr},ZFYXZ={'业务招待'},ZFI_XWLX={'GN-MB003'}>}ZFI_MBZ)-1,0)`,
                `=(Sum({<${timeStr},${orgStr},ZFYXZ={'业务招待'},ZDEPTCOD1={'00DM000000'}>}ZFI_FY)
                -Sum({<${timeStr},${orgStr},ZFYXZ={'业务招待'},ZDEPTCOD1={'00DM000000'}>}ZFI_FY_LY)
                )/fAbs(Sum({<${timeStr},${orgStr},ZFYXZ={'业务招待'},ZDEPTCOD1={'00DM000000'}>}ZFI_FY_LY))`,
                `=Sum({<${timeStr},${orgStr},ZFYXZ={'差旅费用'},ZDEPTCOD1={'00DM000000'}>}ZFI_FY)`,
                `=if(Sum({<${timeStr},${orgStr},ZFYXZ={'差旅费用'},ZDEPTCOD1={'00DM000000'}>}ZFI_FY)
                /Sum({<${timeYearEndDayStr},${orgStr},ZFYXZ={'差旅费用'},ZFI_XWLX={'GN-MB003'}>}ZFI_MBZ)
                -1>0,Sum({<${timeStr},${orgStr},ZFYXZ={'差旅费用'},ZDEPTCOD1={'00DM000000'}>}ZFI_FY)
                /Sum({<${timeYearEndDayStr},${orgStr},ZFYXZ={'差旅费用'},ZFI_XWLX={'GN-MB003'}>}ZFI_MBZ)-1,0)`,
                `=(Sum({<${timeStr},${orgStr},ZFYXZ={'差旅费用'},ZDEPTCOD1={'00DM000000'}>}ZFI_FY)
                -Sum({<${timeStr},${orgStr},ZFYXZ={'差旅费用'},ZDEPTCOD1={'00DM000000'}>}ZFI_FY_LY)
                )/fAbs(Sum({<${timeStr},${orgStr},ZFYXZ={'差旅费用'},ZDEPTCOD1={'00DM000000'}>}ZFI_FY_LY))`,
                `=Sum({<${timeStr},${orgStr},ZFYXZ={'物流成本'},ZDEPTCOD1={'00DM000000'}>}ZFI_FY)`,
                `=if(Sum({<${timeStr},${orgStr},ZFYXZ={'物流成本'},ZDEPTCOD1={'00DM000000'}>}ZFI_FY)
                /Sum({<${timeYearEndDayStr},${orgStr},ZFYXZ={'物流成本'},ZFI_XWLX={'GN-MB003'}>}ZFI_MBZ)
                -1>0,Sum({<${timeStr},${orgStr},ZFYXZ={'物流成本'},ZDEPTCOD1={'00DM000000'}>}ZFI_FY)
                /Sum({<${timeYearEndDayStr},${orgStr},ZFYXZ={'物流成本'},ZFI_XWLX={'GN-MB003'}>}ZFI_MBZ)-1,0)`,
                `=(Sum({<${timeStr},${orgStr},ZFYXZ={'物流成本'},ZDEPTCOD1={'00DM000000'}>}ZFI_FY)
                -Sum({<${timeStr},${orgStr},ZFYXZ={'物流成本'},ZDEPTCOD1={'00DM000000'}>}ZFI_FY_LY)
                )/fAbs(Sum({<${timeStr},${orgStr},ZFYXZ={'物流成本'},ZDEPTCOD1={'00DM000000'}>}ZFI_FY_LY))`,
                `=Sum({<${timeStr},${orgStr},ZFYXZ={'日常开支成本'}, ZFYFL={'日常交通费'},ZDEPTCOD1={'00DM000000'}>}ZFI_FY)`,
                `=if(Sum({<${timeStr},${orgStr},ZFYXZ={'日常开支成本'}, ZFYFL={'日常交通费'},ZDEPTCOD1={'00DM000000'}>}ZFI_FY)
                /Sum({<${timeYearEndDayStr},${orgStr},ZFYXZ={'日常开支成本'}, ZFYFL={'日常交通费'},ZFI_XWLX={'GN-MB003'}>}ZFI_MBZ)-1>0,
                Sum({<${timeStr},${orgStr},ZFYXZ={'日常开支成本'}, ZFYFL={'日常交通费'},ZDEPTCOD1={'00DM000000'}>}ZFI_FY)
                /Sum({<${timeYearEndDayStr},${orgStr},ZFYXZ={'日常开支成本'}, ZFYFL={'日常交通费'},ZFI_XWLX={'GN-MB003'}>}ZFI_MBZ)-1,0)`,
                `=(Sum({<${timeStr},${orgStr},ZFYXZ={'日常开支成本'}, ZFYFL={'日常交通费'},ZDEPTCOD1={'00DM000000'}>}ZFI_FY)
                -Sum({<${timeStr},${orgStr},ZFYXZ={'日常开支成本'}, ZFYFL={'日常交通费'},ZDEPTCOD1={'00DM000000'}>}ZFI_FY_LY)
                )/fAbs(Sum({<${timeStr},${orgStr},ZFYXZ={'日常开支成本'}, ZFYFL={'日常交通费'},ZDEPTCOD1={'00DM000000'}>}ZFI_FY_LY))`,
                `=Sum({<${timeStr},${orgStr},ZFYFL={'退货拆解费'},ZDEPTCOD1={'00DM000000'}>}ZFI_FY)`,
                `=if(Sum({<${timeStr},${orgStr},ZFYFL={'退货拆解费'},ZDEPTCOD1={'00DM000000'}>}ZFI_FY)
                /Sum({<${timeYearEndDayStr},${orgStr},ZFYFL={'退货拆解费'},ZFI_XWLX={'GN-MB003'}>}ZFI_MBZ)-1>0,
                Sum({<${timeStr},${orgStr},ZFYFL={'退货拆解费'},ZDEPTCOD1={'00DM000000'}>}ZFI_FY)
                /Sum({<${timeYearEndDayStr},${orgStr},ZFYFL={'退货拆解费'},ZFI_XWLX={'GN-MB003'}>}ZFI_MBZ)-1,0)`,
                `=(Sum({<${timeStr},${orgStr},ZFYFL={'退货拆解费'},ZDEPTCOD1={'00DM000000'}>}ZFI_FY)
                -Sum({<${timeStr},${orgStr},ZFYFL={'退货拆解费'},ZDEPTCOD1={'00DM000000'}>}ZFI_FY_LY)
                )/fabs(Sum({<${timeStr},${orgStr},ZFYFL={'退货拆解费'},ZDEPTCOD1={'00DM000000'}>}ZFI_FY_LY))`,
            ]
        },
        'cost-pie': {
            qDimensions: [
                `=if(ZFYXZ<>'',ZFYXZ)`,
            ],
            qMeasures: [
                `=num(Sum({<${timeStr},${orgStr},ZDEPTCOD1={'00DM000000'}>}ZFI_FY)/10000,'#,##0')`,
            ]
        },
        'cost-rlcb': {
            qDimensions: [],
            qMeasures: [
                `=Sum({<${timeStr},${orgStr},ZFYXZ={'人力成本'},ZDEPTCOD1={'00DM000000'}>}ZFI_FY)/Sum({<${timeYearEndDayStr},${orgStr},ZFYXZ={'人力成本'},ZFI_XWLX={'GN-MB003'}>}ZFI_MBZ)`,
                `=Sum({<CALDAY={">=$(vCurrYearStartDay)<=$(vCurrDay)"},${orgStr},ZFYXZ={'人力成本'},ZDEPTCOD1={'00DM000000'}>}ZFI_FY)/Sum({<CALYEAR={'$(vCurrYear)'},${orgStr},ZFYXZ={'人力成本'},ZFI_XWLX={'GN-MB003'}>}ZFI_MBZ)`,
                `=Sum({<${timeStr},${orgStr},ZFYXZ={'人力成本'},ZDEPTCOD1={'00DM000000'}>}ZFI_FY)`,
                `=Sum({<CALDAY={">=$(vCurrYearStartDay)<=$(vCurrDay)"},${orgStr},ZFYXZ={'人力成本'},ZDEPTCOD1={'00DM000000'}>}ZFI_FY)`,
                `=(Sum({<${timeStr},${orgStr},ZFYXZ={'人力成本'},ZDEPTCOD1={'00DM000000'}>}ZFI_FY)-Sum({<${timeStr},${orgStr},ZFYXZ={'人力成本'},ZDEPTCOD1={'00DM000000'}>}ZFI_FY_LY))/fAbs(Sum({<${timeStr},${orgStr},ZFYXZ={'人力成本'},ZDEPTCOD1={'00DM000000'}>}ZFI_FY_LY))`
            ]
        },
        'cost-gxfy': {
            qDimensions: [],
            qMeasures: [
                `=Sum({<${timeStr},${orgStr},ZFYXZ={'广宣费用'},ZDEPTCOD1={'00DM000000'}>}ZFI_FY)/Sum({<${timeYearEndDayStr},${orgStr},ZFYXZ={'广宣费用'},ZFI_XWLX={'GN-MB003'}>}ZFI_MBZ)`,
                `=Sum({<CALDAY={">=$(vCurrYearStartDay)<=$(vCurrDay)"},${orgStr},ZFYXZ={'广宣费用'},ZDEPTCOD1={'00DM000000'}>}ZFI_FY)/Sum({<CALYEAR={'$(vCurrYear)'},${orgStr},ZFYXZ={'广宣费用'},ZFI_XWLX={'GN-MB003'}>}ZFI_MBZ)`,
                `=Sum({<${timeStr},${orgStr},ZFYXZ={'广宣费用'},ZDEPTCOD1={'00DM000000'}>}ZFI_FY)`,
                `=Sum({<CALDAY={">=$(vCurrYearStartDay)<=$(vCurrDay)"},${orgStr},ZFYXZ={'广宣费用'},ZDEPTCOD1={'00DM000000'}>}ZFI_FY)`,
                `=(Sum({<${timeStr},${orgStr},ZFYXZ={'广宣费用'},ZDEPTCOD1={'00DM000000'}>}ZFI_FY)-Sum({<${timeStr},${orgStr},ZFYXZ={'广宣费用'},ZDEPTCOD1={'00DM000000'}>}ZFI_FY_LY))/fAbs(Sum({<${timeStr},${orgStr},ZFYXZ={'广宣费用'},ZDEPTCOD1={'00DM000000'}>}ZFI_FY_LY))`
            ]
        },
        'cost-wlcb': {
            qDimensions: [],
            qMeasures: [
                `=Sum({<${timeStr},${orgStr},ZFYXZ={'物流成本'},ZDEPTCOD1={'00DM000000'}>}ZFI_FY)/Sum({<${timeYearEndDayStr},${orgStr},ZFYXZ={'物流成本'},ZFI_XWLX={'GN-MB003'}>}ZFI_MBZ)`,
                `=Sum({<CALDAY={">=$(vCurrYearStartDay)<=$(vCurrDay)"},${orgStr},ZFYXZ={'物流成本'},ZDEPTCOD1={'00DM000000'}>}ZFI_FY)/Sum({<CALYEAR={'$(vCurrYear)'},${orgStr},ZFYXZ={'物流成本'},ZFI_XWLX={'GN-MB003'}>}ZFI_MBZ)`,
                `=Sum({<${timeStr},${orgStr},ZFYXZ={'物流成本'},ZDEPTCOD1={'00DM000000'}>}ZFI_FY)`,
                `=Sum({<CALDAY={">=$(vCurrYearStartDay)<=$(vCurrDay)"},${orgStr},ZFYXZ={'物流成本'},ZDEPTCOD1={'00DM000000'}>}ZFI_FY)`,
                `=(Sum({<${timeStr},${orgStr},ZFYXZ={'物流成本'},ZDEPTCOD1={'00DM000000'}>}ZFI_FY)-Sum({<${timeStr},${orgStr},ZFYXZ={'物流成本'},ZDEPTCOD1={'00DM000000'}>}ZFI_FY_LY))/fAbs(Sum({<${timeStr},${orgStr},ZFYXZ={'物流成本'},ZDEPTCOD1={'00DM000000'}>}ZFI_FY_LY))`
            ]
        },
        'cost-yxcb': {
            qDimensions: [],
            qMeasures: [
                `=Sum({<${timeStr},${orgStr},ZFYXZ={'营销成本'},ZDEPTCOD1={'00DM000000'}>}ZFI_FY)/Sum({<${timeYearEndDayStr},${orgStr},ZFYXZ={'营销成本'},ZFI_XWLX={'GN-MB003'}>}ZFI_MBZ)`,
                `=Sum({<CALDAY={">=$(vCurrYearStartDay)<=$(vCurrDay)"},${orgStr},ZFYXZ={'营销成本'},ZDEPTCOD1={'00DM000000'}>}ZFI_FY)/Sum({<CALYEAR={'$(vCurrYear)'},${orgStr},ZFYXZ={'营销成本'},ZFI_XWLX={'GN-MB003'}>}ZFI_MBZ)`,
                `=Sum({<${timeStr},${orgStr},ZFYXZ={'营销成本'},ZDEPTCOD1={'00DM000000'}>}ZFI_FY)`,
                `=Sum({<CALDAY={">=$(vCurrYearStartDay)<=$(vCurrDay)"},${orgStr},ZFYXZ={'营销成本'},ZDEPTCOD1={'00DM000000'}>}ZFI_FY)`,
                `=(Sum({<${timeStr},${orgStr},ZFYXZ={'营销成本'},ZDEPTCOD1={'00DM000000'}>}ZFI_FY)-Sum({<${timeStr},${orgStr},ZFYXZ={'营销成本'},ZDEPTCOD1={'00DM000000'}>}ZFI_FY_LY))/fAbs(Sum({<${timeStr},${orgStr},ZFYXZ={'营销成本'},ZDEPTCOD1={'00DM000000'}>}ZFI_FY_LY))`
            ]
        },
        'cost-clfy': {
            qDimensions: [],
            qMeasures: [
                `=Sum({<${timeStr},${orgStr},ZFYXZ={'差旅费用'},ZDEPTCOD1={'00DM000000'}>}ZFI_FY)/Sum({<${timeYearEndDayStr},${orgStr},ZFYXZ={'差旅费用'},ZFI_XWLX={'GN-MB003'}>}ZFI_MBZ)`,
                `=Sum({<CALDAY={">=$(vCurrYearStartDay)<=$(vCurrDay)"},${orgStr},ZFYXZ={'差旅费用'},ZDEPTCOD1={'00DM000000'}>}ZFI_FY)/Sum({<CALYEAR={'$(vCurrYear)'},${orgStr},ZFYXZ={'差旅费用'},ZFI_XWLX={'GN-MB003'}>}ZFI_MBZ)`,
                `=Sum({<${timeStr},${orgStr},ZFYXZ={'差旅费用'},ZDEPTCOD1={'00DM000000'}>}ZFI_FY)`,
                `=Sum({<CALDAY={">=$(vCurrYearStartDay)<=$(vCurrDay)"},${orgStr},ZFYXZ={'差旅费用'},ZDEPTCOD1={'00DM000000'}>}ZFI_FY)`,
                `=(Sum({<${timeStr},${orgStr},ZFYXZ={'差旅费用'},ZDEPTCOD1={'00DM000000'}>}ZFI_FY)-Sum({<${timeStr},${orgStr},ZFYXZ={'差旅费用'},ZDEPTCOD1={'00DM000000'}>}ZFI_FY_LY))/fAbs(Sum({<${timeStr},${orgStr},ZFYXZ={'差旅费用'},ZDEPTCOD1={'00DM000000'}>}ZFI_FY_LY))`
            ]
        },
        'cost-clfy-chart': {
            qDimensions: [
                `=if(TXTMD_RY<>'',TXTMD_RY)`
            ],
            qMeasures: [
                `=Sum({<${timeStr},${orgStr},ZFYXZ={'差旅费用'},ZDEPTCOD1={'00DM000000'}>}ZFI_FY)`,
                `=Sum({<${timeStr},${orgStr},ZFYXZ={'差旅费用'},ZDEPTCOD1={'00DM000000'}>}ZFI_FY)/Sum(total {<${timeStr},${orgStr},ZFYXZ={'差旅费用'},ZDEPTCOD1={'00DM000000'}>}ZFI_FY)`
            ]
        },
        'cost-ywzd': {
            qDimensions: [],
            qMeasures: [
                `=Sum({<${timeStr},${orgStr},ZFYXZ={'业务招待'},ZDEPTCOD1={'00DM000000'}>}ZFI_FY)/Sum({<${timeYearEndDayStr},${orgStr},ZFYXZ={'业务招待'},ZFI_XWLX={'GN-MB003'}>}ZFI_MBZ)`,
                `=Sum({<CALDAY={">=$(vCurrYearStartDay)<=$(vCurrDay)"},${orgStr},ZFYXZ={'业务招待'},ZDEPTCOD1={'00DM000000'}>}ZFI_FY)/Sum({<CALYEAR={'$(vCurrYear)'},${orgStr},ZFYXZ={'业务招待'},ZFI_XWLX={'GN-MB003'}>}ZFI_MBZ)`,
                `=Sum({<${timeStr},${orgStr},ZFYXZ={'业务招待'},ZDEPTCOD1={'00DM000000'}>}ZFI_FY)`,
                `=Sum({<CALDAY={">=$(vCurrYearStartDay)<=$(vCurrDay)"},${orgStr},ZFYXZ={'业务招待'},ZDEPTCOD1={'00DM000000'}>}ZFI_FY)`,
                `=(Sum({<${timeStr},${orgStr},ZFYXZ={'业务招待'},ZDEPTCOD1={'00DM000000'}>}ZFI_FY)-Sum({<${timeStr},${orgStr},ZFYXZ={'业务招待'},ZDEPTCOD1={'00DM000000'}>}ZFI_FY_LY))/fAbs(Sum({<${timeStr},${orgStr},ZFYXZ={'业务招待'},ZDEPTCOD1={'00DM000000'}>}ZFI_FY_LY))`
            ]
        },
        'cost-ywzd-chart': {
            qDimensions: [
                `=if(TXTMD_RY<>'',TXTMD_RY)`
            ],
            qMeasures: [
                `=Sum({<${timeStr},${orgStr},ZFYXZ={'业务招待'},ZDEPTCOD1={'00DM000000'}>}ZFI_FY)`,
                `=Sum({<${timeStr},${orgStr},ZFYXZ={'业务招待'},ZDEPTCOD1={'00DM000000'}>}ZFI_FY)/Sum(total {<${timeStr},${orgStr},ZFYXZ={'业务招待'},ZDEPTCOD1={'00DM000000'}>}ZFI_FY)`
            ]
        },
        'cost-rckz': {
            qDimensions: [],
            qMeasures: [
                `=Sum({<CALDAY={">=$(vCurrYearStartDay)<=$(vCurrDay)"},${orgStr},ZFYXZ={'日常开支成本'},ZDEPTCOD1={'00DM000000'}>}ZFI_FY)`,
                `=Sum({<${timeStr},${orgStr},ZFYXZ={'日常开支成本'},ZDEPTCOD1={'00DM000000'}>}ZFI_FY)/Sum({<${timeYearEndDayStr},${orgStr},ZFYXZ={'日常开支成本'},ZFI_XWLX={'GN-MB003'}>}ZFI_MBZ)`,
                `=(Sum({<${timeStr},${orgStr},ZFYXZ={'日常开支成本'},ZDEPTCOD1={'00DM000000'}>}ZFI_FY)-Sum({<${timeStr},${orgStr},ZFYXZ={'日常开支成本'},ZDEPTCOD1={'00DM000000'}>}ZFI_FY_LY))/fAbs(Sum({<${timeStr},${orgStr},ZFYXZ={'日常开支成本'},ZDEPTCOD1={'00DM000000'}>}ZFI_FY_LY))`,
                `=Sum({<CALDAY={">=$(vCurrYearStartDay)<=$(vCurrDay)"},${orgStr},ZFYXZ={'日常开支成本'},ZDEPTCOD1={'00DM000000'}>}ZFI_FY)/Sum({<CALYEAR={'$(vCurrYear)'},${orgStr},ZFYXZ={'日常开支成本'},ZFI_XWLX={'GN-MB003'}>}ZFI_MBZ)`
            ]
        },
        'cost-rckz-chart': {
            qDimensions: [
                `=if(ZFYFL<>'',ZFYFL)`
            ],
            qMeasures: [
                `=Sum({<${timeStr},${orgStr},ZFYXZ={'日常开支成本'},ZFYFL={'汽车费用','房屋租赁费','行政办公费','日常交通费','物业管理费','工程装修费'},ZDEPTCOD1={'00DM000000'}>}ZFI_FY)`
            ]
        },
        'de-margin-per': {
            qDimensions: [
                `=if(CALMONTH>=${marginStartMonth} and CALMONTH<=${marginEndMonth},CALMONTH)`
            ],
            qMeasures: [
                `=Sum({<ZSALESORG_FLAG={'分公司'},${orgStr},ZGNGM={'国内'},MATERIAL_FLAG={'收入物料'}>}ZFI_PJSR)/Sum({<ZFI_XWLX={'GN-RS001'},${orgStr}>}ZFI_MBZ)`,
                `=Sum({<ZDEPTCOD1={'00DM000000'},${orgStr}>}ZFI_FY)/Sum({<ZFI_XWLX={'GN-RS001'},${orgStr}>}ZFI_MBZ)`,
                `=(Sum({<ZSALESORG_FLAG={'分公司'},${orgStr},ZGNGM={'国内'},MATERIAL_FLAG={'收入物料'}>}ZFI_PJML)-Sum({<ZDEPTCOD1={'00DM000000'},${orgStr}>}ZFI_FY))/Sum({<ZFI_XWLX={'GN-RS001'},${orgStr}>}ZFI_MBZ)`,
                `=(Sum({<ZSALESORG_FLAG={'分公司'},${orgStr},ZGNGM={'国内'},MATERIAL_FLAG={'收入物料'}>}ZFI_PJML)-Sum({<ZDEPTCOD1={'00DM000000'},${orgStr}>}ZFI_FY))/Sum({<ZFYXZ={'人力成本'},${orgStr},ZDEPTCOD1={'00DM000000'}>}ZFI_FY)`
            ]
        }


    }
    return formula[name];
}

function addMonth(date, num) {
    //num 不可以大于12
    num = parseInt(num);
    var sDate = dateToDate(date);

    var sYear = sDate.getFullYear();
    var sMonth = sDate.getMonth() + 1;
    var sDay = sDate.getDate();

    var eYear = sYear;
    var eMonth = sMonth + num;
    var eDay = sDay;

    if (num >= 0) {
        if (eMonth > 12) {
            eYear += 1;
            eMonth -= 12;
        } else {

        }
    } else {
        if (eMonth <= 0) {
            eYear -= 1;
            eMonth += 12;
        } else {

        }
    }

    var eDate = new Date(eYear, eMonth - 1, eDay);

    return eDate;
};

function dateToDate(date) {
    var sDate = new Date();
    if (typeof date == 'object'
        && typeof new Date().getMonth == "function"
    ) {
        sDate = date;
    }
    else if (typeof date == "string") {
        var arr = date.split('-')
        if (arr.length == 3) {
            sDate = new Date(arr[0] + '-' + arr[1] + '-' + arr[2]);
        }
    }

    return sDate;
};

Date.prototype.Format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1,               //月份   
        "d+": this.getDate(),                    //日   
        "h+": this.getHours(),                   //小时   
        "m+": this.getMinutes(),                 //分   
        "s+": this.getSeconds(),                 //秒   
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度   
        "S": this.getMilliseconds()             //毫秒   
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
};