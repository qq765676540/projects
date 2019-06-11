export default

function getFormula(opt) {
    let time = opt.time;
    let org = opt.org;
    let name = opt.name;
    let timeStr = "";
    let timeYearEndDayStr = "";
    let orgStr = "";

    function mGetDate(year, month) {
        var d = new Date(year, month, 0);
        return d.getDate();
    }

    let days = mGetDate(time.year, time.endMonth);
    switch (time.name) {
        case "其他":
            timeStr = ">=1/" + time.startMonth + "/" + time.year + "<=" + days + "/" + time.endMonth + "/" + time.year;
            timeYearEndDayStr = ">=1/" + time.startMonth + "/" + time.year + "<=" + days + "/" + time.endMonth + "/" + time.year;
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
    orgStr = "TXTSH_YWZX={'" + org + "'}"
    let formula = {
        'main-persion': {
            qDimensions: [
                `=[人员名称]`
            ],
            qMeasures: []
        },
        'main-business-center': {
            qDimensions: [
                `=TXTSH_YWZX`
            ],
            qMeasures: []
        },
        'over-all-top': {
            qDimensions: [],
            qMeasures: [
                `=Sum({<${timeStr},${orgStr},ZSALESORG_FLAG={'分公司'},ZGNGM={'国内'},MATERIAL_FLAG={'收入物料'}>}ZFI_PJSR)`,
                `=Sum({<${timeStr},${orgStr},ZSALESORG_FLAG={'分公司'},ZGNGM={'国内'},MATERIAL_FLAG={'收入物料'}>}ZFI_PJSR)
                / Sum({<${timeYearEndDayStr},${orgStr},ZFI_XWLX={'GN-MB001'}>}ZFI_MBZ)`,
                `=(Sum({<${timeStr},${orgStr},ZSALESORG_FLAG={'分公司'},ZGNGM={'国内'},MATERIAL_FLAG={'收入物料'}>}ZFI_PJSR)
                -Sum({<${timeStr},${orgStr},ZSALESORG_FLAG={'分公司'},ZGNGM={'国内'},MATERIAL_FLAG={'收入物料'}>}ZFI_PJSR_LY)
                )/fAbs(Sum({<${timeStr},${orgStr},ZSALESORG_FLAG={'分公司'},ZGNGM={'国内'},MATERIAL_FLAG={'收入物料'}>}ZFI_PJSR_LY))`,
                `=Sum({<${timeStr},${orgStr},ZFLAG={'X'},ZSALESORG_FLAG={'分公司'},ZGNGM={'国内'},MATERIAL_FLAG={'收入物料'}>}ZFI_PJSR)`,
                `=Sum({<${timeStr},${orgStr},ZFLAG={'X'},ZSALESORG_FLAG={'分公司'},ZGNGM={'国内'},MATERIAL_FLAG={'收入物料'}>}ZFI_PJSR)
                / Sum({<${timeYearEndDayStr},${orgStr},ZFI_XWLX={'GN-MB002'}>}ZFI_MBZ)`,
                `=(Sum({<${timeStr},${orgStr},ZFLAG={'X'},ZSALESORG_FLAG={'分公司'},ZGNGM={'国内'},MATERIAL_FLAG={'收入物料'}>}ZFI_PJSR)
                -Sum({<${timeStr},${orgStr},ZFLAG={'X'},ZSALESORG_FLAG={'分公司'},ZGNGM={'国内'},MATERIAL_FLAG={'收入物料'}>}ZFI_PJSR_LY)
                )/fAbs(Sum({<${timeStr},${orgStr},ZFLAG={'X'},ZYJTZLX-={"*GNFHW01*"},ZSALESORG_FLAG={'分公司'},ZGNGM={'国内'},MATERIAL_FLAG={'收入物料'}>}ZFI_PJSR_LY))`,
                `=Sum({<${timeStr},${orgStr},ZSALESORG_FLAG={'分公司'},ZGNGM={'国内'},MATERIAL_FLAG={'收入物料'}>}ZFI_PJML)`,
                `=(Sum({<${timeStr},${orgStr},ZSALESORG_FLAG={'分公司'},ZGNGM={'国内'},MATERIAL_FLAG={'收入物料'}>}ZFI_PJML)
                -Sum({<${timeStr},${orgStr},ZSALESORG_FLAG={'分公司'},ZGNGM={'国内'},MATERIAL_FLAG={'收入物料'}>}ZFI_PJML_LY)
                )/fAbs(Sum({<${timeStr},${orgStr},ZSALESORG_FLAG={'分公司'},ZGNGM={'国内'},MATERIAL_FLAG={'收入物料'}>}ZFI_PJML_LY))`,
                `=Sum({<${timeStr},${orgStr},ZSALESORG_FLAG={'分公司'},ZGNGM={'国内'},MATERIAL_FLAG={'收入物料'}>}ZFI_PJML)
                / Sum({<${timeStr},${orgStr},ZSALESORG_FLAG={'分公司'},ZGNGM={'国内'},MATERIAL_FLAG={'收入物料'}>}ZFI_PJSR)`,
                `=Sum({<${timeStr},${orgStr},ZSALESORG_FLAG={'分公司'},ZGNGM={'国内'},MATERIAL_FLAG={'收入物料'}>}ZFI_PJML_LY)
                / Sum({<${timeStr},${orgStr},ZSALESORG_FLAG={'分公司'},ZGNGM={'国内'},MATERIAL_FLAG={'收入物料'}>}ZFI_PJSR_LY)`,
            ]
        },
        'over-all-btm': {
            qDimensions: [],
            qMeasures: [
                `=Sum({<${timeStr},${orgStr},ZDEPTCOD1={'00DM000000'}>}ZFI_FY)`,
                `=Sum({<${timeStr},${orgStr},ZDEPTCOD1={'00DM000000'}>}ZFI_FY)
                / Sum({<${timeYearEndDayStr},${orgStr},ZFI_XWLX={'GN-MB003'}>}ZFI_MBZ)`,
                `=(Sum({<${timeStr},${orgStr},ZDEPTCOD1={'00DM000000'}>}ZFI_FY)
                -  Sum({<${timeStr},${orgStr},ZDEPTCOD1={'00DM000000'}>}ZFI_FY_LY)
                )/fAbs(Sum({<${timeStr},${orgStr},ZDEPTCOD1={'00DM000000'}>}ZFI_FY_LY))`,
                `=Sum({<${timeStr},${orgStr},ZDEPTCOD1={'00DM000000'}>}ZFI_FY)
                / Sum({<${timeStr},${orgStr},ZFLAG={'X'},ZSALESORG_FLAG={'分公司'},ZGNGM={'国内'},MATERIAL_FLAG={'收入物料'}>}ZFI_PJSR)`,
                `Sum({<${timeStr},${orgStr},ZDEPTCOD1={'00DM000000'}>}ZFI_FY_LY)
                /Sum({<${timeStr},${orgStr},ZFLAG={'X'},ZSALESORG_FLAG={'分公司'},ZGNGM={'国内'},MATERIAL_FLAG={'收入物料'}>}ZFI_PJSR_LY)`,
                `=Sum({<${timeStr},${orgStr},ZSALESORG_FLAG={'分公司'},ZGNGM={'国内'},MATERIAL_FLAG={'收入物料'}>}ZFI_PJML)
                - Sum({<${timeStr},${orgStr},ZDEPTCOD1={'00DM000000'}>}ZFI_FY)`,
                `=((Sum({<${timeStr},${orgStr},ZSALESORG_FLAG={'分公司'},ZGNGM={'国内'},MATERIAL_FLAG={'收入物料'}>}ZFI_PJML)-
                Sum({<${timeStr},${orgStr},ZDEPTCOD1={'00DM000000'}>}ZFI_FY)
                )-(Sum({<${timeStr},${orgStr},ZSALESORG_FLAG={'分公司'},ZGNGM={'国内'},MATERIAL_FLAG={'收入物料'}>}ZFI_PJML_LY)
                -Sum({<${timeStr},${orgStr},ZDEPTCOD1={'00DM000000'}>}ZFI_FY_LY)
                ))/fAbs((Sum({<${timeStr},${orgStr},ZSALESORG_FLAG={'分公司'},ZGNGM={'国内'},MATERIAL_FLAG={'收入物料'}>}ZFI_PJML_LY)
                -Sum({<${timeStr},${orgStr},ZDEPTCOD1={'00DM000000'}>}ZFI_FY_LY)))`,
                `=(Sum({<${timeStr},${orgStr},ZSALESORG_FLAG={'分公司'},ZGNGM={'国内'},MATERIAL_FLAG={'收入物料'}>}ZFI_PJML)
                -Sum({<${timeStr},${orgStr},ZDEPTCOD1={'00DM000000'}>}ZFI_FY)
                )/Sum({<${timeStr},${orgStr},ZFLAG={'X'},ZSALESORG_FLAG={'分公司'},ZGNGM={'国内'},MATERIAL_FLAG={'收入物料'}>}ZFI_PJSR)`,
                `=(Sum({<${timeStr},${orgStr},ZSALESORG_FLAG={'分公司'},ZGNGM={'国内'},MATERIAL_FLAG={'收入物料'}>}ZFI_PJML_LY)
                -Sum({<${timeStr},${orgStr},ZDEPTCOD1={'00DM000000'}>}ZFI_FY_LY)
                )/Sum({<${timeStr},${orgStr},ZFLAG={'X'},ZSALESORG_FLAG={'分公司'},ZGNGM={'国内'},MATERIAL_FLAG={'收入物料'}>}ZFI_PJSR_LY)`,
            ]
        },
        'over-all-progress': {
            qDimensions: [],
            qMeasures: [
                `=Sum({<CALDAY={">=$(vCurrYearStartDay)<=$(vCurrDay)"},ZSALESORG_FLAG={'分公司'},ZGNGM={'国内'},MATERIAL_FLAG={'收入物料'}>}ZFI_PJSR)
                /Sum({<CALYEAR={'$(vCurrYear)'},ZFI_XWLX={'GN-MB001'}>}ZFI_MBZ)`,
                `=Sum({<CALDAY={">=$(vCurrYearStartDay)<=$(vCurrDay)"},ZFLAG={'X'},ZSALESORG_FLAG={'分公司'},ZGNGM={'国内'},MATERIAL_FLAG={'收入物料'}>}ZFI_PJSR)
                /Sum({<CALYEAR={'$(vCurrYear)'},ZFI_XWLX={'GN-MB002'}>}ZFI_MBZ)`,
                `=Sum({<CALDAY={">=$(vCurrYearStartDay)<=$(vCurrDay)"},ZDEPTCOD1={'00DM000000'}>}ZFI_FY)
                /Sum({<CALYEAR={'$(vCurrYear)'},ZFI_XWLX={'GN-MB003'}>}ZFI_MBZ)`,
            ]
        },
        'over-all-ranking': {
            qDimensions: [
                `=ZZXSZZ`
            ],
            qMeasures: [
                `=Sum({<${timeStr},${orgStr},ZSALESORG_FLAG={'分公司'},ZGNGM={'国内'},MATERIAL_FLAG={'收入物料'}>}ZFI_PJSR)`,
                `=Sum({<${timeStr},${orgStr},ZSALESORG_FLAG={'分公司'},ZGNGM={'国内'},MATERIAL_FLAG={'收入物料'}>}ZFI_PJSR)
                /Sum({<${timeYearEndDayStr},${orgStr},ZFI_XWLX={'GN-MB001'}>}ZFI_MBZ)`,
                `=Sum(total {<${timeStr},${orgStr},ZSALESORG_FLAG={'分公司'},ZGNGM={'国内'},MATERIAL_FLAG={'收入物料'}>}ZFI_PJSR)
                /Sum(total {<${timeYearEndDayStr},${orgStr},ZFI_XWLX={'GN-MB001'}>}ZFI_MBZ)`
            ]
        },
        'income-all': {
            qDimensions: [],
            qMeasures: [
                `=Sum({<${timeStr},${orgStr},ZSALESORG_FLAG={'分公司'},ZGNGM={'国内'},MATERIAL_FLAG={'收入物料'}>}ZFI_PJSR)`,
                `=Sum({<${timeStr},${orgStr},ZSALESORG_FLAG={'分公司'},ZGNGM={'国内'},MATERIAL_FLAG={'收入物料'}>}ZFI_PJSR)
                / Sum({<${timeYearEndDayStr},${orgStr},ZFI_XWLX={'GN-MB001'}>}ZFI_MBZ)`,
                `=Sum({<${timeYearEndDayStr},${orgStr},ZFI_XWLX={'GN-MB001'}>}ZFI_MBZ)`,
                `=Sum({<${timeYearEndDayStr},${orgStr},ZFI_XWLX={'GN-MB001'}>}ZFI_MBZ)
                -Sum({<${timeStr},${orgStr},ZSALESORG_FLAG={'分公司'},ZGNGM={'国内'},MATERIAL_FLAG={'收入物料'}>}ZFI_PJSR)`,
                `=(Sum({<${timeStr},${orgStr},ZSALESORG_FLAG={'分公司'},ZGNGM={'国内'},MATERIAL_FLAG={'收入物料'}>}ZFI_PJSR)
                -Sum({<${timeStr},${orgStr},ZSALESORG_FLAG={'分公司'},ZGNGM={'国内'},MATERIAL_FLAG={'收入物料'}>}ZFI_PJSR_LY)
                )/fAbs(Sum({<${timeStr},${orgStr},ZSALESORG_FLAG={'分公司'},ZGNGM={'国内'},MATERIAL_FLAG={'收入物料'}>}ZFI_PJSR_LY))`,
                `=Sum({<${timeStr},${orgStr},ZFLAG={'X'},ZSALESORG_FLAG={'分公司'},ZGNGM={'国内'},MATERIAL_FLAG={'收入物料'}>}ZFI_PJSR)`,
                `=Sum({<${timeStr},${orgStr},ZFLAG={'X'},ZSALESORG_FLAG={'分公司'},ZGNGM={'国内'},MATERIAL_FLAG={'收入物料'}>}ZFI_PJSR)
                / Sum({<${timeYearEndDayStr},${orgStr},ZFI_XWLX={'GN-MB002'}>}ZFI_MBZ)`,
                `=Sum({<${timeYearEndDayStr},${orgStr},ZFI_XWLX={'GN-MB002'}>}ZFI_MBZ)`,
                `=Sum({<${timeYearEndDayStr},${orgStr},ZFI_XWLX={'GN-MB002'}>}ZFI_MBZ)
                -Sum({<${timeStr},${orgStr},ZFLAG={'X'},ZSALESORG_FLAG={'分公司'},ZGNGM={'国内'},MATERIAL_FLAG={'收入物料'}>}ZFI_PJSR)`,
                `=(Sum({<${timeStr},${orgStr},ZFLAG={'X'},ZSALESORG_FLAG={'分公司'},ZGNGM={'国内'},MATERIAL_FLAG={'收入物料'}>}ZFI_PJSR)
                -Sum({<${timeStr},${orgStr},ZFLAG={'X'},ZSALESORG_FLAG={'分公司'},ZGNGM={'国内'},MATERIAL_FLAG={'收入物料'}>}ZFI_PJSR_LY)
                )/fAbs(Sum({<${timeStr},${orgStr},ZFLAG={'X'},ZSALESORG_FLAG={'分公司'},ZGNGM={'国内'},MATERIAL_FLAG={'收入物料'}>}ZFI_PJSR_LY))`
            ]
        },
        'income-year': {
            qDimensions: [],
            qMeasures: [
                `=Sum({<CALDAY={">=$(vCurrYearStartDay)<=$(vCurrDay)"},ZSALESORG_FLAG={'分公司'},ZGNGM={'国内'},MATERIAL_FLAG={'收入物料'}>}ZFI_PJSR)
                /Sum({<CALYEAR={'$(vCurrYear)'},ZFI_XWLX={'GN-MB001'}>}ZFI_MBZ)`,
                `=Sum({<CALDAY={">=$(vCurrYearStartDay)<=$(vCurrDay)"},ZSALESORG_FLAG={'分公司'},ZGNGM={'国内'},MATERIAL_FLAG={'收入物料'}>}ZFI_PJSR)`,
                `=Sum({<CALYEAR={'$(vCurrYear)'},ZFI_XWLX={'GN-MB001'}>}ZFI_MBZ)`,
                `=Sum({<CALYEAR={'$(vCurrYear)'},ZFI_XWLX={'GN-MB001'}>}ZFI_MBZ)
                -Sum({<CALDAY={">=$(vCurrYearStartDay)<=$(vCurrDay)"},ZSALESORG_FLAG={'分公司'},ZGNGM={'国内'},MATERIAL_FLAG={'收入物料'}>}ZFI_PJSR)`,
                `=Sum({<CALDAY={">=$(vCurrYearStartDay)<=$(vCurrDay)"},ZFLAG={'X'},ZSALESORG_FLAG={'分公司'},ZGNGM={'国内'},MATERIAL_FLAG={'收入物料'}>}ZFI_PJSR)
                /Sum({<CALYEAR={'$(vCurrYear)'},ZFI_XWLX={'GN-MB002'}>}ZFI_MBZ)`,
                `=Sum({<CALDAY={">=$(vCurrYearStartDay)<=$(vCurrDay)"},ZFLAG={'X'},ZSALESORG_FLAG={'分公司'},ZGNGM={'国内'},MATERIAL_FLAG={'收入物料'}>}ZFI_PJSR)`,
                `=Sum({<CALYEAR={'$(vCurrYear)'},ZFI_XWLX={'GN-MB002'}>}ZFI_MBZ)`,
                `=Sum({<CALYEAR={'$(vCurrYear)'},ZFI_XWLX={'GN-MB002'}>}ZFI_MBZ)
                -Sum({<CALDAY={">=$(vCurrYearStartDay)<=$(vCurrDay)"},ZFLAG={'X'},ZSALESORG_FLAG={'分公司'},ZGNGM={'国内'},MATERIAL_FLAG={'收入物料'}>}ZFI_PJSR)`,
            ]
        },
        'income-hz': {
            qDimensions: [
                `=TXTMD_HY`
            ],
            qMeasures: [
                `=Sum({<${timeStr},${orgStr},ZSALESORG_FLAG={'分公司'},ZGNGM={'国内'},MATERIAL_FLAG={'收入物料'}>}ZFI_PJSR)`,
                `=Sum({<${timeStr},${orgStr},ZSALESORG_FLAG={'分公司'},ZGNGM={'国内'},MATERIAL_FLAG={'收入物料'}>}ZFI_PJSR)
                /Sum( total {<${timeStr},${orgStr},ZSALESORG_FLAG={'分公司'},ZGNGM={'国内'},MATERIAL_FLAG={'收入物料'}>}ZFI_PJSR)`,
                `(Sum({<${timeStr},${orgStr},ZSALESORG_FLAG={'分公司'},ZGNGM={'国内'},MATERIAL_FLAG={'收入物料'}>}ZFI_PJSR)
                -Sum({<${timeStr},${orgStr},ZSALESORG_FLAG={'分公司'},ZGNGM={'国内'},MATERIAL_FLAG={'收入物料'}>}ZFI_PJSR_LY)
                )/fAbs(Sum({<${timeStr},${orgStr},ZSALESORG_FLAG={'分公司'},ZGNGM={'国内'},MATERIAL_FLAG={'收入物料'}>}ZFI_PJSR_LY))`,
            ]
        },
        'income-hzy': {
            qDimensions: [
                `=TXTMD_HY`
            ],
            qMeasures: [
                `=Sum({<${timeStr},${orgStr},ZFLAG={'X'},ZSALESORG_FLAG={'分公司'},ZGNGM={'国内'},MATERIAL_FLAG={'收入物料'}>}ZFI_PJSR)`,
                `=Sum({<${timeStr},${orgStr},ZFLAG={'X'},ZSALESORG_FLAG={'分公司'},ZGNGM={'国内'},MATERIAL_FLAG={'收入物料'}>}ZFI_PJSR)
                /Sum(total {<${timeStr},${orgStr},ZFLAG={'X'},ZSALESORG_FLAG={'分公司'},ZGNGM={'国内'},MATERIAL_FLAG={'收入物料'}>}ZFI_PJSR)`,
                `=(Sum({<${timeStr},${orgStr},ZFLAG={'X'},ZSALESORG_FLAG={'分公司'},ZGNGM={'国内'},MATERIAL_FLAG={'收入物料'}>}ZFI_PJSR)
                -Sum({<${timeStr},${orgStr},ZFLAG={'X'},ZSALESORG_FLAG={'分公司'},ZGNGM={'国内'},MATERIAL_FLAG={'收入物料'}>}ZFI_PJSR_LY)
                )/fAbs(Sum({<${timeStr},${orgStr},ZFLAG={'X'},ZSALESORG_FLAG={'分公司'},ZGNGM={'国内'},MATERIAL_FLAG={'收入物料'}>}ZFI_PJSR_LY))`,
            ]
        },
        'income-cz': {
            qDimensions: [
                `=ZZMVGR5`
            ],
            qMeasures: [
                `=Sum({<${timeStr},${orgStr},ZSALESORG_FLAG={'分公司'},ZGNGM={'国内'},MATERIAL_FLAG={'收入物料'}>}ZFI_PJSR)`,
                `=Sum({<${timeStr},${orgStr},ZSALESORG_FLAG={'分公司'},ZGNGM={'国内'},MATERIAL_FLAG={'收入物料'}>}ZFI_PJSR)
                /Sum( total {<${timeStr},${orgStr},ZSALESORG_FLAG={'分公司'},ZGNGM={'国内'},MATERIAL_FLAG={'收入物料'}>}ZFI_PJSR)`,
                `=(Sum({<${timeStr},${orgStr},ZSALESORG_FLAG={'分公司'},ZGNGM={'国内'},MATERIAL_FLAG={'收入物料'}>}ZFI_PJSR)
                -Sum({<${timeStr},${orgStr},ZSALESORG_FLAG={'分公司'},ZGNGM={'国内'},MATERIAL_FLAG={'收入物料'}>}ZFI_PJSR_LY)
                )/fAbs(Sum({<${timeStr},${orgStr},ZSALESORG_FLAG={'分公司'},ZGNGM={'国内'},MATERIAL_FLAG={'收入物料'}>}ZFI_PJSR_LY))`
            ]
        },
        'income-czy': {
            qDimensions: [
                `=ZZMVGR5`
            ],
            qMeasures: [
                `=Sum({<${timeStr},${orgStr},ZFLAG={'X'},ZSALESORG_FLAG={'分公司'},ZGNGM={'国内'},MATERIAL_FLAG={'收入物料'}>}ZFI_PJSR)`,
                `=Sum({<${timeStr},${orgStr},ZFLAG={'X'},ZSALESORG_FLAG={'分公司'},ZGNGM={'国内'},MATERIAL_FLAG={'收入物料'}>}ZFI_PJSR)
                /Sum(total {<${timeStr},${orgStr},ZFLAG={'X'},ZSALESORG_FLAG={'分公司'},ZGNGM={'国内'},MATERIAL_FLAG={'收入物料'}>}ZFI_PJSR)`,
                `=(Sum({<${timeStr},${orgStr},ZFLAG={'X'},ZSALESORG_FLAG={'分公司'},ZGNGM={'国内'},MATERIAL_FLAG={'收入物料'}>}ZFI_PJSR)
                -Sum({<${timeStr},${orgStr},ZFLAG={'X'},ZSALESORG_FLAG={'分公司'},ZGNGM={'国内'},MATERIAL_FLAG={'收入物料'}>}ZFI_PJSR_LY)
                )/fAbs(Sum({<${timeStr},${orgStr},ZFLAG={'X'},ZSALESORG_FLAG={'分公司'},ZGNGM={'国内'},MATERIAL_FLAG={'收入物料'}>}ZFI_PJSR_LY))`
            ]
        },
        'income-cityz': {
            qDimensions: [
                `=FL_CITY`,
                `=ZZDCSBS`,
                `=ZZXSZZ`
            ],
            qMeasures: [
                `=Sum({<${timeStr},${orgStr},ZSALESORG_FLAG={'分公司'},ZGNGM={'国内'},MATERIAL_FLAG={'收入物料'}>}ZFI_PJSR)`,
                `=(Sum({<${timeStr},${orgStr},ZSALESORG_FLAG={'分公司'},ZGNGM={'国内'},MATERIAL_FLAG={'收入物料'}>}ZFI_PJSR)
                -Sum({<${timeStr},${orgStr},ZSALESORG_FLAG={'分公司'},ZGNGM={'国内'},MATERIAL_FLAG={'收入物料'}>}ZFI_PJSR_LY)
                )/fAbs(Sum({<${timeStr},${orgStr},ZSALESORG_FLAG={'分公司'},ZGNGM={'国内'},MATERIAL_FLAG={'收入物料'}>}ZFI_PJSR_LY))`,
                `=Sum({<${timeStr},${orgStr},ZYJTZLX-={"*GNFHW01*"},ZSALESORG_FLAG={'分公司'},ZGNGM={'国内'},MATERIAL_FLAG={'收入物料'}>}ZFI_PJSR)
                /Sum({<CALDAY={">=$(vStartDay)<=$(vEndDay_MBZ)"},ZFI_XWLX={'GN-MB001'}>}ZFI_MBZ)`,
            ]
        },
        'income-cityzy': {
            qDimensions: [
                `=FL_CITY`,
                `=ZZDCSBS`,
                `=ZZXSZZ`
            ],
            qMeasures: [
                `=Sum({<${timeStr},${orgStr},ZFLAG={'X'},ZSALESORG_FLAG={'分公司'},ZGNGM={'国内'},MATERIAL_FLAG={'收入物料'}>}ZFI_PJSR)`,
                `=(Sum({<${timeStr},${orgStr},ZFLAG={'X'},ZSALESORG_FLAG={'分公司'},ZGNGM={'国内'},MATERIAL_FLAG={'收入物料'}>}ZFI_PJSR)
                -Sum({<${timeStr},${orgStr},ZFLAG={'X'},ZSALESORG_FLAG={'分公司'},ZGNGM={'国内'},MATERIAL_FLAG={'收入物料'}>}ZFI_PJSR_LY)
                )/fAbs(Sum({<${timeStr},${orgStr},ZFLAG={'X'},ZSALESORG_FLAG={'分公司'},ZGNGM={'国内'},MATERIAL_FLAG={'收入物料'}>}ZFI_PJSR_LY))`,
                `=Sum({<${timeStr},${orgStr},ZFLAG={'X'},ZYJTZLX-={"*GNFHW01*"},ZSALESORG_FLAG={'分公司'},ZGNGM={'国内'},MATERIAL_FLAG={'收入物料'}>}ZFI_PJSR)
                /Sum({<CALDAY={">=$(vStartDay)<=$(vEndDay_MBZ)"},ZFI_XWLX={'GN-MB002'}>}ZFI_MBZ)`,
            ]
        },
        'margin-all': {
            qDimensions: [],
            qMeasures: [
                `=Sum({<${timeStr},${orgStr},ZSALESORG_FLAG={'分公司'},ZGNGM={'国内'},MATERIAL_FLAG={'收入物料'}>}ZFI_PJML)`,
                `=(Sum({<${timeStr},${orgStr},ZSALESORG_FLAG={'分公司'},ZGNGM={'国内'},MATERIAL_FLAG={'收入物料'}>}ZFI_PJML)
                -Sum({<${timeStr},${orgStr},ZSALESORG_FLAG={'分公司'},ZGNGM={'国内'},MATERIAL_FLAG={'收入物料'}>}ZFI_PJML_LY)
                )/fAbs(Sum({<${timeStr},${orgStr},ZSALESORG_FLAG={'分公司'},ZGNGM={'国内'},MATERIAL_FLAG={'收入物料'}>}ZFI_PJML_LY))`, //todo
                `=(Sum({<${timeStr},${orgStr},ZSALESORG_FLAG={'分公司'},ZGNGM={'国内'},MATERIAL_FLAG={'收入物料'}>}ZFI_PJML)
                -Sum({<${timeStr},${orgStr},ZSALESORG_FLAG={'分公司'},ZGNGM={'国内'},MATERIAL_FLAG={'收入物料'}>}ZFI_PJML_LY)
                )/fAbs(Sum({<${timeStr},${orgStr},ZSALESORG_FLAG={'分公司'},ZGNGM={'国内'},MATERIAL_FLAG={'收入物料'}>}ZFI_PJML_LY))`,
                `=Sum({<${timeStr},${orgStr},ZSALESORG_FLAG={'分公司'},ZGNGM={'国内'},MATERIAL_FLAG={'收入物料'}>}ZFI_PJML)
                /Sum({<${timeStr},${orgStr},ZSALESORG_FLAG={'分公司'},ZGNGM={'国内'},MATERIAL_FLAG={'收入物料'}>}ZFI_PJSR)`,
                `=Sum({<${timeStr},${orgStr},ZSALESORG_FLAG={'分公司'},ZGNGM={'国内'},MATERIAL_FLAG={'收入物料'}>}ZFI_PJML_LY)
                /Sum({<${timeStr},${orgStr},ZSALESORG_FLAG={'分公司'},ZGNGM={'国内'},MATERIAL_FLAG={'收入物料'}>}ZFI_PJSR_LY)`,
            ]
        },
        'margin-city': {
            qDimensions: [
                `=FL_CITY`,
            ],
            qMeasures: [
                `=ZZDCSBS`,
                `=ZZXSZZ`,
                `=Sum({<${timeStr},${orgStr},ZSALESORG_FLAG={'分公司'},ZGNGM={'国内'},MATERIAL_FLAG={'收入物料'}>}ZFI_PJML)`,
                `=(Sum({<${timeStr},${orgStr},ZSALESORG_FLAG={'分公司'},ZGNGM={'国内'},MATERIAL_FLAG={'收入物料'}>}ZFI_PJML)
                -Sum({<${timeStr},${orgStr},ZSALESORG_FLAG={'分公司'},ZGNGM={'国内'},MATERIAL_FLAG={'收入物料'}>}ZFI_PJML_LY)
                )/fAbs(Sum({<${timeStr},${orgStr},ZSALESORG_FLAG={'分公司'},ZGNGM={'国内'},MATERIAL_FLAG={'收入物料'}>}ZFI_PJML_LY))`
            ]
        },
        'cost-main': {
            qDimensions: [],
            qMeasures: [
                `=Sum({<${timeStr},${orgStr},ZFYXZ={'人力成本'},ZDEPTCOD1={'00DM000000'}>}ZFI_FY)`,
                `=if(Sum({<${timeStr},${orgStr},ZFYXZ={'人力成本'},ZDEPTCOD1={'00DM000000'}>}ZFI_FY)
                /Sum({<CALDAY={">=$(vStartDay)<=$(vEndDay_MBZ)"},ZFYXZ={'人力成本'},ZFI_XWLX={'GN-MB003'}>}ZFI_MBZ)
                -1>0,Sum({<${timeStr},${orgStr},ZFYXZ={'人力成本'},ZDEPTCOD1={'00DM000000'}>}ZFI_FY)
                /Sum({<CALDAY={">=$(vStartDay)<=$(vEndDay_MBZ)"},ZFYXZ={'人力成本'},ZFI_XWLX={'GN-MB003'}>}ZFI_MBZ)-1,0)`,
                `=(Sum({<${timeStr},${orgStr},ZFYXZ={'人力成本'},ZDEPTCOD1={'00DM000000'}>}ZFI_FY)
                -Sum({<${timeStr},${orgStr},ZFYXZ={'人力成本'},ZDEPTCOD1={'00DM000000'}>}ZFI_FY_LY)
                )/fAbs(Sum({<${timeStr},${orgStr},ZFYXZ={'人力成本'},ZDEPTCOD1={'00DM000000'}>}ZFI_FY_LY))`,
                `=Sum({<${timeStr},${orgStr},ZFYXZ={'业务招待'},ZDEPTCOD1={'00DM000000'}>}ZFI_FY)`,
                `=if(Sum({<${timeStr},${orgStr},ZFYXZ={'业务招待'},ZDEPTCOD1={'00DM000000'}>}ZFI_FY)
                /Sum({<CALDAY={">=$(vStartDay)<=$(vEndDay_MBZ)"},ZFYXZ={'业务招待'},ZFI_XWLX={'GN-MB003'}>}ZFI_MBZ)
                -1>0,Sum({<${timeStr},${orgStr},ZFYXZ={'业务招待'},ZDEPTCOD1={'00DM000000'}>}ZFI_FY)
                /Sum({<CALDAY={">=$(vStartDay)<=$(vEndDay_MBZ)"},ZFYXZ={'业务招待'},ZFI_XWLX={'GN-MB003'}>}ZFI_MBZ)-1,0)`,
                `=(Sum({<${timeStr},${orgStr},ZFYXZ={'业务招待'},ZDEPTCOD1={'00DM000000'}>}ZFI_FY)
                -Sum({<${timeStr},${orgStr},ZFYXZ={'业务招待'},ZDEPTCOD1={'00DM000000'}>}ZFI_FY_LY)
                )/fAbs(Sum({<${timeStr},${orgStr},ZFYXZ={'业务招待'},ZDEPTCOD1={'00DM000000'}>}ZFI_FY_LY))`,
                `=Sum({<${timeStr},${orgStr},ZFYXZ={'差旅费用'},ZDEPTCOD1={'00DM000000'}>}ZFI_FY)`,
                `=if(Sum({<${timeStr},${orgStr},ZFYXZ={'差旅费用'},ZDEPTCOD1={'00DM000000'}>}ZFI_FY)
                /Sum({<CALDAY={">=$(vStartDay)<=$(vEndDay_MBZ)"},ZFYXZ={'差旅费用'},ZFI_XWLX={'GN-MB003'}>}ZFI_MBZ)
                -1>0,Sum({<${timeStr},${orgStr},ZFYXZ={'差旅费用'},ZDEPTCOD1={'00DM000000'}>}ZFI_FY)
                /Sum({<CALDAY={">=$(vStartDay)<=$(vEndDay_MBZ)"},ZFYXZ={'差旅费用'},ZFI_XWLX={'GN-MB003'}>}ZFI_MBZ)-1,0)`,
                `=(Sum({<${timeStr},${orgStr},ZFYXZ={'差旅费用'},ZDEPTCOD1={'00DM000000'}>}ZFI_FY)
                -Sum({<${timeStr},${orgStr},ZFYXZ={'差旅费用'},ZDEPTCOD1={'00DM000000'}>}ZFI_FY_LY)
                )/fAbs(Sum({<${timeStr},${orgStr},ZFYXZ={'差旅费用'},ZDEPTCOD1={'00DM000000'}>}ZFI_FY_LY))`,
                `=Sum({<${timeStr},${orgStr},ZFYXZ={'物流成本'},ZDEPTCOD1={'00DM000000'}>}ZFI_FY)`,
                `=if(Sum({<${timeStr},${orgStr},ZFYXZ={'物流成本'},ZDEPTCOD1={'00DM000000'}>}ZFI_FY)
                /Sum({<CALDAY={">=$(vStartDay)<=$(vEndDay_MBZ)"},ZFYXZ={'物流成本'},ZFI_XWLX={'GN-MB003'}>}ZFI_MBZ)
                -1>0,Sum({<${timeStr},${orgStr},ZFYXZ={'物流成本'},ZDEPTCOD1={'00DM000000'}>}ZFI_FY)
                /Sum({<CALDAY={">=$(vStartDay)<=$(vEndDay_MBZ)"},ZFYXZ={'物流成本'},ZFI_XWLX={'GN-MB003'}>}ZFI_MBZ)-1,0)`,
                `=(Sum({<${timeStr},${orgStr},ZFYXZ={'物流成本'},ZDEPTCOD1={'00DM000000'}>}ZFI_FY)
                -Sum({<${timeStr},${orgStr},ZFYXZ={'物流成本'},ZDEPTCOD1={'00DM000000'}>}ZFI_FY_LY)
                )/fAbs(Sum({<${timeStr},${orgStr},ZFYXZ={'物流成本'},ZDEPTCOD1={'00DM000000'}>}ZFI_FY_LY))`,
                `=Sum({<${timeStr},${orgStr},ZFYXZ={'日常开支成本'}, ZFYFL={'日常交通费'},ZDEPTCOD1={'00DM000000'}>}ZFI_FY)`,
                `=if(Sum({<${timeStr},${orgStr},ZFYXZ={'日常开支成本'}, ZFYFL={'日常交通费'},ZDEPTCOD1={'00DM000000'}>}ZFI_FY)
                /Sum({<CALDAY={">=$(vStartDay)<=$(vEndDay_MBZ)"},ZFYXZ={'日常开支成本'}, ZFYFL={'日常交通费'},ZFI_XWLX={'GN-MB003'}>}ZFI_MBZ)-1>0,
                Sum({<${timeStr},${orgStr},ZFYXZ={'日常开支成本'}, ZFYFL={'日常交通费'},ZDEPTCOD1={'00DM000000'}>}ZFI_FY)
                /Sum({<CALDAY={">=$(vStartDay)<=$(vEndDay_MBZ)"},ZFYXZ={'日常开支成本'}, ZFYFL={'日常交通费'},ZFI_XWLX={'GN-MB003'}>}ZFI_MBZ)-1,0)`,
                `=(Sum({<${timeStr},${orgStr},ZFYXZ={'日常开支成本'}, ZFYFL={'日常交通费'},ZDEPTCOD1={'00DM000000'}>}ZFI_FY)
                -Sum({<${timeStr},${orgStr},ZFYXZ={'日常开支成本'}, ZFYFL={'日常交通费'},ZDEPTCOD1={'00DM000000'}>}ZFI_FY_LY)
                )/fAbs(Sum({<${timeStr},${orgStr},ZFYXZ={'日常开支成本'}, ZFYFL={'日常交通费'},ZDEPTCOD1={'00DM000000'}>}ZFI_FY_LY))`,
                `=Sum({<${timeStr},${orgStr},ZFYFL={'退货拆解费'},ZDEPTCOD1={'00DM000000'}>}ZFI_FY)`,
                `=if(Sum({<${timeStr},${orgStr},ZFYFL={'退货拆解费'},ZDEPTCOD1={'00DM000000'}>}ZFI_FY)
                /Sum({<CALDAY={">=$(vStartDay)<=$(vEndDay_MBZ)"},ZFYFL={'退货拆解费'},ZFI_XWLX={'GN-MB003'}>}ZFI_MBZ)-1>0,
                Sum({<${timeStr},${orgStr},ZFYFL={'退货拆解费'},ZDEPTCOD1={'00DM000000'}>}ZFI_FY)
                /Sum({<CALDAY={">=$(vStartDay)<=$(vEndDay_MBZ)"},ZFYFL={'退货拆解费'},ZFI_XWLX={'GN-MB003'}>}ZFI_MBZ)-1,0)`,
                `=(Sum({<${timeStr},${orgStr},ZFYFL={'退货拆解费'},ZDEPTCOD1={'00DM000000'}>}ZFI_FY)
                -Sum({<${timeStr},${orgStr},ZFYFL={'退货拆解费'},ZDEPTCOD1={'00DM000000'}>}ZFI_FY_LY)
                )/fabs(Sum({<${timeStr},${orgStr},ZFYFL={'退货拆解费'},ZDEPTCOD1={'00DM000000'}>}ZFI_FY_LY))`,
            ]
        },
        'cost-pie': {
            qDimensions: [
                `=ZFYXZ`,
            ],
            qMeasures: [
                `=Sum({<${timeStr},${orgStr},ZDEPTCOD1={'00DM000000'}>}ZFI_FY)`,
            ]
        },
        'cost-rlcb': {
            qDimensions: [],
            qMeasures: [
                `=Sum({<${timeStr},${orgStr},ZFYXZ={'人力成本'},ZDEPTCOD1={'00DM000000'}>}ZFI_FY)
                /Sum({<CALDAY={">=$(vStartDay)<=$(vEndDay_MBZ)"},ZFYXZ={'人力成本'},ZFI_XWLX={'GN-MB003'}>}ZFI_MBZ)`,
                `=Sum({<CALDAY={">=$(vCurrYearStartDay)<=$(vCurrDay)"},ZFYXZ={'人力成本'},ZDEPTCOD1={'00DM000000'}>}ZFI_FY)
                /Sum({<CALYEAR={'$(vCurrYear)'},ZFYXZ={'人力成本'},ZFI_XWLX={'GN-MB003'}>}ZFI_MBZ)`,
                `=Sum({<${timeStr},${orgStr},ZFYXZ={'人力成本'},ZDEPTCOD1={'00DM000000'}>}ZFI_FY)`,
                `=Sum({<CALDAY={">=$(vCurrYearStartDay)<=$(vCurrDay)"},ZFYXZ={'人力成本'},ZDEPTCOD1={'00DM000000'}>}ZFI_FY)`,
                `=(Sum({<${timeStr},${orgStr},ZFYXZ={'人力成本'},ZDEPTCOD1={'00DM000000'}>}ZFI_FY)
                -Sum({<${timeStr},${orgStr},ZFYXZ={'人力成本'},ZDEPTCOD1={'00DM000000'}>}ZFI_FY_LY)
                )/fAbs(Sum({<${timeStr},${orgStr},ZFYXZ={'人力成本'},ZDEPTCOD1={'00DM000000'}>}ZFI_FY_LY))`
            ]
        },
        'cost-gxfy': {
            qDimensions: [],
            qMeasures: [
                `=Sum({<${timeStr},${orgStr},ZFYXZ={'广宣费用'},ZDEPTCOD1={'00DM000000'}>}ZFI_FY)
                /Sum({<CALDAY={">=$(vStartDay)<=$(vEndDay_MBZ)"},ZFYXZ={'广宣费用'},ZFI_XWLX={'GN-MB003'}>}ZFI_MBZ)`,
                `=Sum({<CALDAY={">=$(vCurrYearStartDay)<=$(vCurrDay)"},ZFYXZ={'广宣费用'},ZDEPTCOD1={'00DM000000'}>}ZFI_FY)
                /Sum({<CALYEAR={'$(vCurrYear)'},ZFYXZ={'广宣费用'},ZFI_XWLX={'GN-MB003'}>}ZFI_MBZ)`,
                `=Sum({<${timeStr},${orgStr},ZFYXZ={'广宣费用'},ZDEPTCOD1={'00DM000000'}>}ZFI_FY)`,
                `=Sum({<CALDAY={">=$(vCurrYearStartDay)<=$(vCurrDay)"},ZFYXZ={'广宣费用'},ZDEPTCOD1={'00DM000000'}>}ZFI_FY)`,
                `=(Sum({<${timeStr},${orgStr},ZFYXZ={'广宣费用'},ZDEPTCOD1={'00DM000000'}>}ZFI_FY)
                -Sum({<${timeStr},${orgStr},ZFYXZ={'广宣费用'},ZDEPTCOD1={'00DM000000'}>}ZFI_FY_LY)
                )/fAbs(Sum({<${timeStr},${orgStr},ZFYXZ={'广宣费用'},ZDEPTCOD1={'00DM000000'}>}ZFI_FY_LY))`
            ]
        },
        'cost-wlcb': {
            qDimensions: [],
            qMeasures: [
                `=Sum({<${timeStr},${orgStr},ZFYXZ={'物流成本'},ZDEPTCOD1={'00DM000000'}>}ZFI_FY)
                /Sum({<CALDAY={">=$(vStartDay)<=$(vEndDay_MBZ)"},ZFYXZ={'物流成本'},ZFI_XWLX={'GN-MB003'}>}ZFI_MBZ)`,
                `=Sum({<CALDAY={">=$(vCurrYearStartDay)<=$(vCurrDay)"},ZFYXZ={'物流成本'},ZDEPTCOD1={'00DM000000'}>}ZFI_FY)
                /Sum({<CALYEAR={'$(vCurrYear)'},ZFYXZ={'物流成本'},ZFI_XWLX={'GN-MB003'}>}ZFI_MBZ)`,
                `=Sum({<${timeStr},${orgStr},ZFYXZ={'物流成本'},ZDEPTCOD1={'00DM000000'}>}ZFI_FY)`,
                `=Sum({<CALDAY={">=$(vCurrYearStartDay)<=$(vCurrDay)"},ZFYXZ={'物流成本'},ZDEPTCOD1={'00DM000000'}>}ZFI_FY)`,
                `=(Sum({<${timeStr},${orgStr},ZFYXZ={'物流成本'},ZDEPTCOD1={'00DM000000'}>}ZFI_FY)
                -Sum({<${timeStr},${orgStr},ZFYXZ={'物流成本'},ZDEPTCOD1={'00DM000000'}>}ZFI_FY_LY)
                )/fAbs(Sum({<${timeStr},${orgStr},ZFYXZ={'物流成本'},ZDEPTCOD1={'00DM000000'}>}ZFI_FY_LY))`
            ]
        },
        'cost-yxcb': {
            qDimensions: [],
            qMeasures: [
                `=Sum({<${timeStr},${orgStr},ZFYXZ={'营销成本'},ZDEPTCOD1={'00DM000000'}>}ZFI_FY)
                /Sum({<CALDAY={">=$(vStartDay)<=$(vEndDay_MBZ)"},ZFYXZ={'营销成本'},ZFI_XWLX={'GN-MB003'}>}ZFI_MBZ)`,
                `=Sum({<CALDAY={">=$(vCurrYearStartDay)<=$(vCurrDay)"},ZFYXZ={'营销成本'},ZDEPTCOD1={'00DM000000'}>}ZFI_FY)
                /Sum({<CALYEAR={'$(vCurrYear)'},ZFYXZ={'营销成本'},ZFI_XWLX={'GN-MB003'}>}ZFI_MBZ)`,
                `=Sum({<${timeStr},${orgStr},ZFYXZ={'营销成本'},ZDEPTCOD1={'00DM000000'}>}ZFI_FY)`,
                `=Sum({<CALDAY={">=$(vCurrYearStartDay)<=$(vCurrDay)"},ZFYXZ={'营销成本'},ZDEPTCOD1={'00DM000000'}>}ZFI_FY)`,
                `=(Sum({<${timeStr},${orgStr},ZFYXZ={'营销成本'},ZDEPTCOD1={'00DM000000'}>}ZFI_FY)
                -Sum({<${timeStr},${orgStr},ZFYXZ={'营销成本'},ZDEPTCOD1={'00DM000000'}>}ZFI_FY_LY)
                )/fAbs(Sum({<${timeStr},${orgStr},ZFYXZ={'营销成本'},ZDEPTCOD1={'00DM000000'}>}ZFI_FY_LY))`
            ]
        },
        'cost-clfy': {
            qDimensions: [],
            qMeasures: [
                `=Sum({<${timeStr},${orgStr},ZFYXZ={'差旅费用'},ZDEPTCOD1={'00DM000000'}>}ZFI_FY)
                /Sum({<CALDAY={">=$(vStartDay)<=$(vEndDay_MBZ)"},ZFYXZ={'差旅费用'},ZFI_XWLX={'GN-MB003'}>}ZFI_MBZ)`,
                `=Sum({<CALDAY={">=$(vCurrYearStartDay)<=$(vCurrDay)"},ZFYXZ={'差旅费用'},ZDEPTCOD1={'00DM000000'}>}ZFI_FY)
                /Sum({<CALYEAR={'$(vCurrYear)'},ZFYXZ={'差旅费用'},ZFI_XWLX={'GN-MB003'}>}ZFI_MBZ)`,
                `=Sum({<${timeStr},${orgStr},ZFYXZ={'差旅费用'},ZDEPTCOD1={'00DM000000'}>}ZFI_FY)`,
                `=Sum({<CALDAY={">=$(vCurrYearStartDay)<=$(vCurrDay)"},ZFYXZ={'差旅费用'},ZDEPTCOD1={'00DM000000'}>}ZFI_FY)`,
                `=(Sum({<${timeStr},${orgStr},ZFYXZ={'差旅费用'},ZDEPTCOD1={'00DM000000'}>}ZFI_FY)
                -Sum({<${timeStr},${orgStr},ZFYXZ={'差旅费用'},ZDEPTCOD1={'00DM000000'}>}ZFI_FY_LY)
                )/fAbs(Sum({<${timeStr},${orgStr},ZFYXZ={'差旅费用'},ZDEPTCOD1={'00DM000000'}>}ZFI_FY_LY))`
            ]
        },
        'cost-clfy-chart': {
            qDimensions: [
                `=TXTMD_RY`
            ],
            qMeasures: [
                `=Sum({<${timeStr},${orgStr},ZFYXZ={'差旅费用'},ZDEPTCOD1={'00DM000000'}>}ZFI_FY)`,
                `=Sum({<${timeStr},${orgStr},ZFYXZ={'差旅费用'},ZDEPTCOD1={'00DM000000'}>}ZFI_FY)
                /Sum(total {<${timeStr},${orgStr},ZFYXZ={'差旅费用'},ZDEPTCOD1={'00DM000000'}>}ZFI_FY)`
            ]
        },
        'cost-ywzd': {
            qDimensions: [],
            qMeasures: [
                `=Sum({<${timeStr},${orgStr},ZFYXZ={'业务招待'},ZDEPTCOD1={'00DM000000'}>}ZFI_FY)
                /Sum({<CALDAY={">=$(vStartDay)<=$(vEndDay_MBZ)"},ZFYXZ={'业务招待'},ZFI_XWLX={'GN-MB003'}>}ZFI_MBZ)`,
                `=Sum({<CALDAY={">=$(vCurrYearStartDay)<=$(vCurrDay)"},ZFYXZ={'业务招待'},ZDEPTCOD1={'00DM000000'}>}ZFI_FY)
                /Sum({<CALYEAR={'$(vCurrYear)'},ZFYXZ={'业务招待'},ZFI_XWLX={'GN-MB003'}>}ZFI_MBZ)`,
                `=Sum({<${timeStr},${orgStr},ZFYXZ={'业务招待'},ZDEPTCOD1={'00DM000000'}>}ZFI_FY)`,
                `=Sum({<CALDAY={">=$(vCurrYearStartDay)<=$(vCurrDay)"},ZFYXZ={'业务招待'},ZDEPTCOD1={'00DM000000'}>}ZFI_FY)`,
                `=(Sum({<${timeStr},${orgStr},ZFYXZ={'业务招待'},ZDEPTCOD1={'00DM000000'}>}ZFI_FY)
                -Sum({<${timeStr},${orgStr},ZFYXZ={'业务招待'},ZDEPTCOD1={'00DM000000'}>}ZFI_FY_LY)
                )/fAbs(Sum({<${timeStr},${orgStr},ZFYXZ={'业务招待'},ZDEPTCOD1={'00DM000000'}>}ZFI_FY_LY))`
            ]
        },
        'cost-ywzd-chart': {
            qDimensions: [
                `=TXTMD_RY`
            ],
            qMeasures: [
                `=Sum({<${timeStr},${orgStr},ZFYXZ={'业务招待'},ZDEPTCOD1={'00DM000000'}>}ZFI_FY)`,
                `=Sum({<${timeStr},${orgStr},ZFYXZ={'业务招待'},ZDEPTCOD1={'00DM000000'}>}ZFI_FY)
                /Sum(total {<${timeStr},${orgStr},ZFYXZ={'业务招待'},ZDEPTCOD1={'00DM000000'}>}ZFI_FY)`
            ]
        },
        'cost-rckz': {
            qDimensions: [],
            qMeasures: [
                `=Sum({<CALDAY={">=$(vCurrYearStartDay)<=$(vCurrDay)"},ZFYXZ={'日常开支成本'},ZDEPTCOD1={'00DM000000'}>}ZFI_FY)`,
                `=Sum({<${timeStr},${orgStr},ZFYXZ={'日常开支成本'},ZDEPTCOD1={'00DM000000'}>}ZFI_FY)
                /Sum({<CALDAY={">=$(vStartDay)<=$(vEndDay_MBZ)"},ZFYXZ={'日常开支成本'},ZFI_XWLX={'GN-MB003'}>}ZFI_MBZ)`,
                `=(Sum({<${timeStr},${orgStr},ZFYXZ={'日常开支成本'},ZDEPTCOD1={'00DM000000'}>}ZFI_FY)
                -Sum({<${timeStr},${orgStr},ZFYXZ={'日常开支成本'},ZDEPTCOD1={'00DM000000'}>}ZFI_FY_LY)
                )/fAbs(Sum({<${timeStr},${orgStr},ZFYXZ={'日常开支成本'},ZDEPTCOD1={'00DM000000'}>}ZFI_FY_LY))`,
                `=Sum({<CALDAY={">=$(vCurrYearStartDay)<=$(vCurrDay)"},ZFYXZ={'日常开支成本'},ZDEPTCOD1={'00DM000000'}>}ZFI_FY)
                /Sum({<CALYEAR={'$(vCurrYear)'},ZFYXZ={'日常开支成本'},ZFI_XWLX={'GN-MB003'}>}ZFI_MBZ)`,
            ]
        },
        'cost-rckz-chart': {
            qDimensions: [
                `=ZFYFL`
            ],
            qMeasures: [
                `=Sum({<${timeStr},${orgStr},ZFYXZ={'日常开支成本'},ZFYFL={'汽车费用','房屋租赁费','行政办公费','市内交通费','物业管理费','工程装修费'},ZDEPTCOD1={'00DM000000'}>}ZFI_FY)`,
            ]
        },

        'de-margin-all': {
            qDimensions: [],
            qMeasures: [
                `=Sum({<${timeStr},${orgStr},ZSALESORG_FLAG={'分公司'},ZGNGM={'国内'},MATERIAL_FLAG={'收入物料'}>}ZFI_PJML)
                -Sum({<${timeStr},${orgStr},ZDEPTCOD1={'00DM000000'}>}ZFI_FY)`,
                `=Sum({<${timeStr},${orgStr},ZSALESORG_FLAG={'分公司'},ZGNGM={'国内'},MATERIAL_FLAG={'收入物料'}>}ZFI_PJML)
                -Sum({<${timeStr},${orgStr},ZDEPTCOD1={'00DM000000'}>}ZFI_FY)`, //todo
                `=((Sum({<${timeStr},${orgStr},ZSALESORG_FLAG={'分公司'},ZGNGM={'国内'},MATERIAL_FLAG={'收入物料'}>}ZFI_PJML)
                -Sum({<${timeStr},${orgStr},ZDEPTCOD1={'00DM000000'}>}ZFI_FY)
                )-(Sum({<${timeStr},${orgStr},ZSALESORG_FLAG={'分公司'},ZGNGM={'国内'},MATERIAL_FLAG={'收入物料'}>}ZFI_PJML_LY)
                -Sum({<${timeStr},${orgStr},ZDEPTCOD1={'00DM000000'}>}ZFI_FY_LY)
                ))/fAbs((Sum({<${timeStr},${orgStr},ZSALESORG_FLAG={'分公司'},ZGNGM={'国内'},MATERIAL_FLAG={'收入物料'}>}ZFI_PJML_LY)
                -Sum({<${timeStr},${orgStr},ZDEPTCOD1={'00DM000000'}>}ZFI_FY_LY)))`,
                `=(Sum({<${timeStr},${orgStr},ZSALESORG_FLAG={'分公司'},ZGNGM={'国内'},MATERIAL_FLAG={'收入物料'}>}ZFI_PJML)
                -Sum({<${timeStr},${orgStr},ZDEPTCOD1={'00DM000000'}>}ZFI_FY)
                )/Sum({<${timeStr},${orgStr},ZFLAG={'X'},ZSALESORG_FLAG={'分公司'},ZGNGM={'国内'},MATERIAL_FLAG={'收入物料'}>}ZFI_PJSR)`,
                `=(Sum({<${timeStr},${orgStr},ZSALESORG_FLAG={'分公司'},ZGNGM={'国内'},MATERIAL_FLAG={'收入物料'}>}ZFI_PJML_LY)
                -Sum({<${timeStr},${orgStr},ZDEPTCOD1={'00DM000000'}>}ZFI_FY_LY)
                )/Sum({<${timeStr},${orgStr},ZFLAG={'X'},ZSALESORG_FLAG={'分公司'},ZGNGM={'国内'},MATERIAL_FLAG={'收入物料'}>}ZFI_PJSR_LY)`,
            ]
        },
        'de-margin-per': {
            qDimensions: [
                `=CALMONTH_T`
            ],
            qMeasures: [
                `=Sum({<ZSALESORG_FLAG={'分公司'},ZGNGM={'国内'},MATERIAL_FLAG={'收入物料'}>}ZFI_PJSR)
                /Sum({<ZFI_XWLX={'GN-RS001'}>}ZFI_MBZ)`,
                `=(Sum({<ZSALESORG_FLAG={'分公司'},ZGNGM={'国内'},MATERIAL_FLAG={'收入物料'}>}ZFI_PJSR)/
                Sum({<ZFI_XWLX={'GN-RS001'}>}ZFI_MBZ)
                -(Sum({<ZSALESORG_FLAG={'分公司'},ZGNGM={'国内'},MATERIAL_FLAG={'收入物料'}>}ZFI_PJSR_LY)/
                Sum({<ZFI_XWLX={'GN-RS001'}>}ZFI_MBZ_LY))
                )/fAbs((Sum({<ZSALESORG_FLAG={'分公司'},ZGNGM={'国内'},MATERIAL_FLAG={'收入物料'}>}ZFI_PJSR_LY)/
                Sum({<ZFI_XWLX={'GN-RS001'}>}ZFI_MBZ_LY)))`,
                `=Sum({<ZDEPTCOD1={'00DM000000'}>}ZFI_FY)
                /Sum({<ZFI_XWLX={'GN-RS001'}>}ZFI_MBZ)`,
                `=(Sum({<ZDEPTCOD1={'00DM000000'}>}ZFI_FY)/Sum({<ZFI_XWLX={'GN-RS001'}>}ZFI_MBZ)
                -Sum({<ZDEPTCOD1={'00DM000000'}>}ZFI_FY_LY)/Sum({<ZFI_XWLX={'GN-RS001'}>}ZFI_MBZ_LY)
                )/fAbs((Sum({<ZDEPTCOD1={'00DM000000'}>}ZFI_FY_LY)/Sum({<ZFI_XWLX={'GN-RS001'}>}ZFI_MBZ_LY)))`,
                `=(Sum({<ZSALESORG_FLAG={'分公司'},ZGNGM={'国内'},MATERIAL_FLAG={'收入物料'}>}ZFI_PJML)
                -Sum({<ZDEPTCOD1={'00DM000000'}>}ZFI_FY))
                /Sum({<ZFI_XWLX={'GN-RS001'}>}ZFI_MBZ)`,
                `=(((Sum({<ZSALESORG_FLAG={'分公司'},ZGNGM={'国内'},MATERIAL_FLAG={'收入物料'}>}ZFI_PJML)
                -Sum({<ZDEPTCOD1={'00DM000000'}>}ZFI_FY))/Sum({<ZFI_XWLX={'GN-RS001'}>}ZFI_MBZ))
                -((Sum({<ZSALESORG_FLAG={'分公司'},ZGNGM={'国内'},MATERIAL_FLAG={'收入物料'}>}ZFI_PJML_LY)-
                Sum({<ZDEPTCOD1={'00DM000000'}>}ZFI_FY_LY))/Sum({<ZFI_XWLX={'GN-RS001'}>}ZFI_MBZ_LY))
                )/fAbs(((Sum({<ZSALESORG_FLAG={'分公司'},ZGNGM={'国内'},MATERIAL_FLAG={'收入物料'}>}ZFI_PJML_LY)-
                Sum({<ZDEPTCOD1={'00DM000000'}>}ZFI_FY_LY))/Sum({<ZFI_XWLX={'GN-RS001'}>}ZFI_MBZ_LY)))`,
                `=(Sum({<ZSALESORG_FLAG={'分公司'},ZGNGM={'国内'},MATERIAL_FLAG={'收入物料'}>}ZFI_PJML)
                -Sum({<ZDEPTCOD1={'00DM000000'}>}ZFI_FY)
                )/Sum({<ZFYXZ={'人力成本'},ZDEPTCOD1={'00DM000000'}>}ZFI_FY)`,
                `=(((Sum({<ZSALESORG_FLAG={'分公司'},ZGNGM={'国内'},MATERIAL_FLAG={'收入物料'}>}ZFI_PJML)-Sum({<[/BIC/ZDEPTCOD1]={'00DM000000'}>}ZFI_FY))
                /Sum({<ZFYXZ={'人力成本'},ZDEPTCOD1={'00DM000000'}>}ZFI_FY)
                )-((Sum({<ZSALESORG_FLAG={'分公司'},ZGNGM={'国内'},MATERIAL_FLAG={'收入物料'}>}ZFI_PJML_LY)-Sum({<[/BIC/ZDEPTCOD1]={'00DM000000'}>}ZFI_FY_LY))
                /Sum({<ZFYXZ={'人力成本'},ZDEPTCOD1={'00DM000000'}>}ZFI_FY_LY))
                )/fAbs(((Sum({<ZSALESORG_FLAG={'分公司'},ZGNGM={'国内'},MATERIAL_FLAG={'收入物料'}>}ZFI_PJML_LY)-Sum({<[/BIC/ZDEPTCOD1]={'00DM000000'}>}ZFI_FY_LY))
                /Sum({<ZFYXZ={'人力成本'},ZDEPTCOD1={'00DM000000'}>}ZFI_FY_LY)))`,
            ]
        },


    }
    return formula[name];
}