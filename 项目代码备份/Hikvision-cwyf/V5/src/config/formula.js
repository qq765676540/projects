/** 
 * 向qliksense的APP请求数据时所用的维度指标表达式
 **/

export default
    function getFormula(opt) {
    let myDate = new Date();
    myDate.setDate(myDate.getDate() - 1);
    let time = opt.time;
    let startMonth = '';
    let endMonth = '';
    let budgetMonth = '';
    let avgEndMonth = '';
    let syearMonth = '';
    let l12sMonth = '';
    let l12eMonth = '';
    let l24sMonth = '';
    let l24eMonth = '';

    switch (time) {
        case '本月':
            startMonth = myDate.Format('yyyyMM')+'01';
            endMonth = myDate.Format('yyyyMMdd');
            budgetMonth = endMonth;
            avgEndMonth = startMonth;
            syearMonth = myDate.Format('yyyy')+'0101';
            l12sMonth = addMonth(myDate,-11).Format('yyyyMM');
            l12eMonth = myDate.Format('yyyyMM');
            l24sMonth = addMonth(myDate,-23).Format('yyyyMM');
            l24eMonth = myDate.Format('yyyyMM');
            break;
        case '上月':
            startMonth = addMonth(myDate,-1).Format('yyyyMM')+'01';
            endMonth = addMonth(myDate,-1).Format('yyyyMM')+'31';
            budgetMonth = endMonth;
            avgEndMonth = startMonth;
            syearMonth = addMonth(myDate,-1).Format('yyyy')+'0101';
            l12sMonth = addMonth(myDate,-11).Format('yyyyMM');
            l12eMonth = myDate.Format('yyyyMM');
            l24sMonth = addMonth(myDate,-23).Format('yyyyMM');
            l24eMonth = myDate.Format('yyyyMM');
            break;
        case '本季':
            startMonth = myDate.Format('yyyy')+('00'+(parseInt((myDate.Format('MM')/1+2)/3)*3-2)).slice(-2)+'01';
            endMonth = myDate.Format('yyyyMMdd');
            budgetMonth = myDate.Format('yyyy')+('00'+(parseInt((myDate.Format('MM')/1+2)/3)*3)).slice(-2)+'31';;
            avgEndMonth = myDate.Format('yyyyMM')+'01';
            syearMonth = myDate.Format('yyyy')+'0101';
            l12sMonth = addMonth(myDate,-11).Format('yyyyMM');
            l12eMonth = myDate.Format('yyyyMM');
            l24sMonth = addMonth(myDate,-23).Format('yyyyMM');
            l24eMonth = myDate.Format('yyyyMM');
            break;
        case '上季':
            if(parseInt((myDate.Format('MM')/1+2)/3)==1) {
                startMonth = (myDate.Format('yyyy')-1)+'1001';
                endMonth = (myDate.Format('yyyy')-1)+'1231';
                budgetMonth = endMonth;
                avgEndMonth = (myDate.Format('yyyy')-1)+'1201';
                syearMonth = (myDate.Format('yyyy')-1)+'0101';
            }else {
                startMonth = myDate.Format('yyyy')+('00'+(parseInt((myDate.Format('MM')/1+2)/3-1)*3-2)).slice(-2)+'01';
                endMonth = myDate.Format('yyyy')+('00'+(parseInt((myDate.Format('MM')/1+2)/3-1)*3)).slice(-2)+'31';
                budgetMonth = endMonth;
                avgEndMonth = myDate.Format('yyyy')+('00'+(parseInt((myDate.Format('MM')/1+2)/3-1)*3)).slice(-2)+'01';
                syearMonth = myDate.Format('yyyy')+'0101';
            }
            l12sMonth = addMonth(myDate,-11).Format('yyyyMM');
            l12eMonth = myDate.Format('yyyyMM');
            l24sMonth = addMonth(myDate,-23).Format('yyyyMM');
            l24eMonth = myDate.Format('yyyyMM');
            break;
        case '本年':
            startMonth = myDate.Format('yyyy')+'0101';
            endMonth = myDate.Format('yyyyMMdd');
            budgetMonth = myDate.Format('yyyy')+'1231';
            avgEndMonth = myDate.Format('yyyyMM')+'01';
            syearMonth = myDate.Format('yyyy')+'0101';
            l12sMonth = addMonth(myDate,-11).Format('yyyyMM');
            l12eMonth = myDate.Format('yyyyMM');
            l24sMonth = addMonth(myDate,-23).Format('yyyyMM');
            l24eMonth = myDate.Format('yyyyMM');
            break;
        case '上年':
            startMonth = (myDate.Format('yyyy')-1)+'0101';
            endMonth = (myDate.Format('yyyy')-1)+'1231';
            budgetMonth = endMonth;
            avgEndMonth = (myDate.Format('yyyy')-1)+'1201';
            syearMonth = (myDate.Format('yyyy')-1)+'0101';
            l12sMonth = (myDate.Format('yyyy')-1)+'01';
            l12eMonth = (myDate.Format('yyyy')-1)+'12';
            l24sMonth = (myDate.Format('yyyy')-2)+'01';
            l24eMonth = (myDate.Format('yyyy')-1)+'12';
            break;
        default:
            startMonth = time.split('年')[0]+('00'+time.split('年')[1].split('-')[0]).slice(-2)+'01';
            endMonth = time.split('年')[0]+('00'+time.split('年')[1].split('-')[1].replace('月','')).slice(-2)+'31';
            budgetMonth = endMonth;
            avgEndMonth = time.split('年')[0]+('00'+time.split('年')[1].split('-')[1].replace('月','')).slice(-2)+'01';
            syearMonth = time.split('年')[0]+'0101';
            l12sMonth = time.split('年')[0]+('00'+time.split('年')[1].split('-')[0]).slice(-2);
            l12eMonth = time.split('年')[0]+('00'+time.split('年')[1].split('-')[1].replace('月','')).slice(-2);
            l24sMonth = time.split('年')[0]+('00'+time.split('年')[1].split('-')[0]).slice(-2);
            l24eMonth = time.split('年')[0]+('00'+time.split('年')[1].split('-')[1].replace('月','')).slice(-2);
            break;
    }

    let org = opt.org;
    let orgManager = opt.orgManager;
    let dataScope = opt.dataScope == 'T' ? "[ZGNGM]=" : ("[ZGNGM]={'" + (opt.dataScope == 'I' ? '国内' : '海外') + "'}");
    let name = opt.name;
    let orgFilterDim = orgManager == 'Y' ? '[TXTSH_YWB]' : '[TXTSH_CBX]';
    let orgStr = "";
    let orgMatch = "";
    let branchDim = opt.dataScope == 'T' ? "='Total'" : (opt.dataScope == 'I' ? "[TXTSH_YWZX]" : "TXTSH_XSBGS");

    if (org.length > 0) {
        orgStr = orgFilterDim + "={";
        orgMatch = "match(" + orgFilterDim + ",";
        $.each(org, (i, v) => {
            if (i === org.length - 1) {
                orgStr = orgStr + "'" + v + "'}"
                orgMatch = orgMatch + "'" + v + "')>0"
            } else {
                orgStr = orgStr + "'" + v + "',"
                orgMatch = orgMatch + "'" + v + "',"
            }
        });
    }
    else {
        orgStr = orgFilterDim + "=";
        orgMatch = orgFilterDim + "=" + orgFilterDim;
    }
    // console.log('YCQ日志记录:过滤->',"");
    let formula = {
        'level': {
            qDimensions: [
                `=vUserName`,
                `=vOrgLevel`,
                `=vOrgFlag`
            ],
            qMeasures: [
                `=sum(1)`
            ]
        },
        'org': {
            qDimensions: [
                `=vRole`,
                `=if(vOrgAdmin='Y',$(vYWB),if(TXTSH_CBX<>'',TXTSH_CBX))`,
                `=if(vOrgAdmin='Y',if(ZFI_YWB<>'',ZFI_YWB),if(ZFI_CBX<>'',ZFI_CBX))`
            ],
            qMeasures: [
                `=sum(1)`
            ]
        },
        'home-overview': {
            qDimensions: [
                `='KPI'`
            ],
            qMeasures: [
                //人民币
                //总收入
                `=num(sum({<CALDAY_NUM={">=${startMonth}<=${endMonth}"},${dataScope},${orgStr},ZFI_YWB={'A','B','C','D','E','F','G','H','I'}>}ZFI_PJSR)/10000,'#,##0')`,
                `=num(sum({<CALDAY_NUM={">=${startMonth}<=${endMonth}"},${dataScope},${orgStr},ZFI_YWB={'A','B','C','D','E','F','G','H','I'}>}ZFI_PJSR)/sum({<CALDAY_NUM={">=${startMonth}<=${budgetMonth}"},${dataScope},${orgStr},ZFI_XWLX={'YF-MB001'}>}ZFI_MBZ),'0%')`,
                `=num((sum({<CALDAY_NUM={">=${startMonth}<=${endMonth}"},${dataScope},${orgStr},ZFI_YWB={'A','B','C','D','E','F','G','H','I'}>}ZFI_PJSR)-sum({<CALDAY_NUM={">=${startMonth}<=${endMonth}"},${dataScope},${orgStr},ZFI_YWB={'A','B','C','D','E','F','G','H','I'}>}ZFI_PJSR_LY))/fAbs(sum({<CALDAY_NUM={">=${startMonth}<=${endMonth}"},${dataScope},${orgStr},ZFI_YWB={'A','B','C','D','E','F','G','H','I'}>}ZFI_PJSR_LY)),'0%')`,
                //战略产品
                `=num(sum({<CALDAY_NUM={">=${startMonth}<=${endMonth}"},${dataScope},${orgStr},ZSTRATEGI={'X'},ZGNGM={'国内'},ZFI_YWB={'A','B','D','E','F','G','H','I'}>}DLV_QTY)+(sum({<CALDAY_NUM={">=${startMonth}<=${endMonth}"},${dataScope},${orgStr},ZSTRATEGI={'X'},ZGNGM={'国内'},ZFI_YWB={'C'}>}ZFI_PJSR)/${startMonth.substr(0,4)<2019?1:5000}),'#,##0')`,
                `=num((Sum({<CALDAY_NUM={">=${startMonth}<=${endMonth}"},${dataScope},${orgStr},ZSTRATEGI={'X'},ZGNGM={'国内'},ZFI_YWB={'A','B','D','E','F','G','H','I'}>}DLV_QTY)+(Sum({<CALDAY_NUM={">=${startMonth}<=${endMonth}"},${dataScope},${orgStr},ZSTRATEGI={'X'},ZGNGM={'国内'},ZFI_YWB={'C'}>}ZFI_PJSR) /${startMonth.substr(0,4)<2019?1:5000}))/Sum({<CALDAY_NUM={">=${startMonth}<=${budgetMonth}"},${dataScope},${orgStr},ZFI_XWLX={'YF-MB003'}>}ZFI_MBZ),'0%')`,
                `=num(((Sum({<CALDAY_NUM={">=${startMonth}<=${endMonth}"},${dataScope},${orgStr},ZSTRATEGI={'X'},ZGNGM={'国内'},ZFI_YWB={'A','B','D','E','F','G','H','I'}>}DLV_QTY) +(Sum({<CALDAY_NUM={">=${startMonth}<=${endMonth}"},${dataScope},${orgStr},ZSTRATEGI={'X'},ZGNGM={'国内'},ZFI_YWB={'C'}>}ZFI_PJSR) /${startMonth.substr(0,4)<2019?1:5000}))-(Sum({<CALDAY_NUM={">=${startMonth}<=${endMonth}"},${dataScope},${orgStr},ZSTRATEGI={'X'},ZGNGM={'国内'},ZFI_YWB={'A','B','D','E','F','G','H','I'}>}DLV_QTY_LY) +(Sum({<CALDAY_NUM={">=${startMonth}<=${endMonth}"},${dataScope},${orgStr},ZSTRATEGI={'X'},ZGNGM={'国内'},ZFI_YWB={'C'}>}ZFI_PJSR_LY) /${startMonth.substr(0,4)<2020?1:5000})))/fAbs((Sum({<CALDAY_NUM={">=${startMonth}<=${endMonth}"},${dataScope},${orgStr},ZSTRATEGI={'X'},ZGNGM={'国内'},ZFI_YWB={'A','B','D','E','F','G','H','I'}>}DLV_QTY_LY) +(Sum({<CALDAY_NUM={">=${startMonth}<=${endMonth}"},${dataScope},${orgStr},ZSTRATEGI={'X'},ZGNGM={'国内'},ZFI_YWB={'C'}>}ZFI_PJSR_LY) /${startMonth.substr(0,4)<2020?1:5000}))),'0%')`,
                //毛利额
                `=num(Sum({<CALDAY_NUM={">=${startMonth}<=${endMonth}"},${dataScope},${orgStr},ZFI_YWB={'A','B','C','D','E','F','G','H','I'},ZFI_XWLX-={"*GN-ML*"}>}ZFI_PJML)/10000,'#,##0')`,
                `=num(Sum({<CALDAY_NUM={">=${startMonth}<=${endMonth}"},${dataScope},${orgStr},ZFI_YWB={'A','B','C','D','E','F','G','H','I'},ZFI_XWLX-={"*GN-ML*"}>}ZFI_PJML)/Sum({<CALDAY_NUM={">=${startMonth}<=${budgetMonth}"},${dataScope},${orgStr},ZFI_XWLX={'YF-MB004'}>}ZFI_MBZ),'0%')`,
                `=num((Sum({<CALDAY_NUM={">=${startMonth}<=${endMonth}"},${dataScope},${orgStr},ZFI_YWB={'A','B','C','D','E','F','G','H','I'},ZFI_XWLX-={"*GN-ML*"}>}ZFI_PJML)-Sum({<CALDAY_NUM={">=${startMonth}<=${endMonth}"},${dataScope},${orgStr},ZFI_YWB={'A','B','C','D','E','F','G','H','I'},ZFI_XWLX-={"*GN-ML*"}>}ZFI_PJML_LY))/fAbs(Sum({<CALDAY_NUM={">=${startMonth}<=${endMonth}"},${dataScope},${orgStr},ZFI_YWB={'A','B','C','D','E','F','G','H','I'},ZFI_XWLX-={"*GN-ML*"}>}ZFI_PJML_LY)),'0%')`,
                //毛利率
                `=num(Sum({<CALDAY_NUM={">=${startMonth}<=${endMonth}"},${dataScope},${orgStr},ZFI_YWB={'A','B','C','D','E','F','G','H','I'},ZFI_XWLX-={"*GN-ML*"}>}ZFI_PJML)/Sum({<CALDAY_NUM={">=${startMonth}<=${endMonth}"},${dataScope},${orgStr},ZFI_YWB={'A','B','C','D','E','F','G','H','I'}>}ZFI_PJSR),'0.0%')`,
                `=num(Sum({<CALDAY_NUM={">=${startMonth}<=${endMonth}"},${dataScope},${orgStr},ZFI_YWB={'A','B','C','D','E','F','G','H','I'},ZFI_XWLX-={"*GN-ML*"}>}ZFI_PJML_LY)/Sum({<CALDAY_NUM={">=${startMonth}<=${endMonth}"},${dataScope},${orgStr},ZFI_YWB={'A','B','C','D','E','F','G','H','I'}>}ZFI_PJSR_LY),'0.0%')`,
                `=num((Sum({<CALDAY_NUM={">=${startMonth}<=${endMonth}"},${dataScope},${orgStr},ZFI_YWB={'A','B','C','D','E','F','G','H','I'},ZFI_XWLX-={"*GN-ML*"}>}ZFI_PJML)/Sum({<CALDAY_NUM={">=${startMonth}<=${endMonth}"},${dataScope},${orgStr},ZFI_YWB={'A','B','C','D','E','F','G','H','I'}>}ZFI_PJSR))-(Sum({<CALDAY_NUM={">=${startMonth}<=${endMonth}"},${dataScope},${orgStr},ZFI_YWB={'A','B','C','D','E','F','G','H','I'},ZFI_XWLX-={"*GN-ML*"}>}ZFI_PJML_LY)/Sum({<CALDAY_NUM={">=${startMonth}<=${endMonth}"},${dataScope},${orgStr},ZFI_YWB={'A','B','C','D','E','F','G','H','I'}>}ZFI_PJSR_LY)),'0%')`,
                //扣费毛利
                `=num((Sum({<CALDAY_NUM={">=${startMonth}<=${endMonth}"},${dataScope},${orgStr},ZFI_YWB={'A','B','C','D','E','F','G','H','I'},ZFI_XWLX-={"*GN-ML*"}>}ZFI_PJML)-Sum({<CALDAY_NUM={">=${startMonth}<=${endMonth}"},${dataScope},${orgStr},ZGNGM={"$(vOrgFlagName)"},ZYJBM={'产品研发中心'}>}ZFI_FY))/10000,'#,##0')`,
                `=num((Sum({<CALDAY={">=${startMonth}<=${endMonth}"},${dataScope},${orgStr},ZFI_YWB={'A','B','C','D','E','F','G','H','I'},ZFI_XWLX-={"*GN-ML*"}>}ZFI_PJML)-Sum({<CALDAY={">=${startMonth}<=${endMonth}"},${dataScope},${orgStr},ZGNGM={"$(vOrgFlagName)"},ZYJBM={'产品研发中心'}>}ZFI_FY))/(Sum({<CALDAY={">=${startMonth}<=${budgetMonth}"},${dataScope},${orgStr},ZFI_XWLX={'YF-MB004'}>}ZFI_MBZ)-Sum({<CALDAY={">=${startMonth}<=${budgetMonth}"},${dataScope},${orgStr},ZGNGM={"$(vOrgFlagName)"},ZFI_XWLX={'YF-MB002'}>}ZFI_MBZ)),'0%')`,
                `=num(((Sum({<CALDAY_NUM={">=${startMonth}<=${endMonth}"},${dataScope},${orgStr},ZFI_YWB={'A','B','C','D','E','F','G','H','I'},ZFI_XWLX-={"*GN-ML*"}>}ZFI_PJML)-Sum({<CALDAY_NUM={">=${startMonth}<=${endMonth}"},${dataScope},${orgStr},ZGNGM={"$(vOrgFlagName)"},ZYJBM={'产品研发中心'}>}ZFI_FY))-(Sum({<CALDAY_NUM={">=${startMonth}<=${endMonth}"},${dataScope},${orgStr},ZFI_YWB={'A','B','C','D','E','F','G','H','I'},ZFI_XWLX-={"*GN-ML*"}>}ZFI_PJML_LY)-Sum({<CALDAY_NUM={">=${startMonth}<=${endMonth}"},${dataScope},${orgStr},ZGNGM={"$(vOrgFlagName)"},ZYJBM={'产品研发中心'}>}ZFI_FY_LY)))/fAbs((Sum({<CALDAY_NUM={">=${startMonth}<=${endMonth}"},${dataScope},${orgStr},ZFI_YWB={'A','B','C','D','E','F','G','H','I'},ZFI_XWLX-={"*GN-ML*"}>}ZFI_PJML_LY)-Sum({<CALDAY_NUM={">=${startMonth}<=${endMonth}"},${dataScope},${orgStr},ZGNGM={"$(vOrgFlagName)"},ZYJBM={'产品研发中心'}>}ZFI_FY_LY))),'0%')`,
                //扣费毛利率
                `=num((Sum({<CALDAY_NUM={">=${startMonth}<=${endMonth}"},${dataScope},${orgStr},ZFI_YWB={'A','B','C','D','E','F','G','H','I'},ZFI_XWLX-={"*GN-ML*"}>}ZFI_PJML)-Sum({<CALDAY_NUM={">=${startMonth}<=${endMonth}"},${dataScope},${orgStr},ZGNGM={"$(vOrgFlagName)"},ZYJBM={'产品研发中心'}>}ZFI_FY))/Sum({<CALDAY_NUM={">=${startMonth}<=${endMonth}"},${dataScope},${orgStr},ZFI_YWB={'A','B','C','D','E','F','G','H','I'}>}ZFI_PJSR),'0.0%')`,
                `=num((Sum({<CALDAY_NUM={">=${startMonth}<=${endMonth}"},${dataScope},${orgStr},ZFI_YWB={'A','B','C','D','E','F','G','H','I'},ZFI_XWLX-={"*GN-ML*"}>}ZFI_PJML_LY)-Sum({<CALDAY_NUM={">=${startMonth}<=${endMonth}"},${dataScope},${orgStr},ZGNGM={"$(vOrgFlagName)"},ZYJBM={'产品研发中心'}>}ZFI_FY_LY))/Sum({<CALDAY_NUM={">=${startMonth}<=${endMonth}"},${dataScope},${orgStr},ZFI_YWB={'A','B','C','D','E','F','G','H','I'}>}ZFI_PJSR_LY),'0.0%')`,
                `=num(((Sum({<CALDAY_NUM={">=${startMonth}<=${endMonth}"},${dataScope},${orgStr},ZFI_YWB={'A','B','C','D','E','F','G','H','I'},ZFI_XWLX-={"*GN-ML*"}>}ZFI_PJML)-Sum({<CALDAY_NUM={">=${startMonth}<=${endMonth}"},${dataScope},${orgStr},ZGNGM={"$(vOrgFlagName)"},ZYJBM={'产品研发中心'}>}ZFI_FY))/Sum({<CALDAY_NUM={">=${startMonth}<=${endMonth}"},${dataScope},${orgStr},ZFI_YWB={'A','B','C','D','E','F','G','H','I'}>}ZFI_PJSR))-((Sum({<CALDAY_NUM={">=${startMonth}<=${endMonth}"},${dataScope},${orgStr},ZFI_YWB={'A','B','C','D','E','F','G','H','I'},ZFI_XWLX-={"*GN-ML*"}>}ZFI_PJML_LY)-Sum({<CALDAY_NUM={">=${startMonth}<=${endMonth}"},${dataScope},${orgStr},ZGNGM={"$(vOrgFlagName)"},ZYJBM={'产品研发中心'}>}ZFI_FY_LY))/Sum({<CALDAY_NUM={">=${startMonth}<=${endMonth}"},${dataScope},${orgStr},ZFI_YWB={'A','B','C','D','E','F','G','H','I'}>}ZFI_PJSR_LY)),'0%')`,
                //人均销售额
                `=num(Sum({<CALDAY_NUM={">=${startMonth}<=${endMonth}"},${dataScope},${orgStr},ZFI_YWB={'A','B','C','D','E','F','G','H','I'}>}ZFI_PJSR)/10000/((Sum({<CALDAY_NUM={'${startMonth}'},${dataScope},${orgStr},ZFI_XWLX={'YF-RS001'}>}ZFI_MBZ)+Sum({<CALDAY_NUM={'${avgEndMonth}'},${dataScope},${orgStr},ZFI_XWLX={'YF-RS001'}>}ZFI_MBZ))/2),'#,##0')`,
                `=num(Sum({<CALDAY_NUM={">=${startMonth}<=${endMonth}"},${dataScope},${orgStr},ZFI_YWB={'A','B','C','D','E','F','G','H','I'}>}ZFI_PJSR_LY)/10000/((Sum({<CALDAY_NUM={'${startMonth}'},${dataScope},${orgStr},ZFI_XWLX={'YF-RS001'}>}ZFI_MBZ_LY)+Sum({<CALDAY_NUM={'${avgEndMonth}'},${dataScope},${orgStr},ZFI_XWLX={'YF-RS001'}>}ZFI_MBZ_LY))/2),'#,##0')`,
                `=num(((Sum({<CALDAY_NUM={">=${startMonth}<=${endMonth}"},${dataScope},${orgStr},ZFI_YWB={'A','B','C','D','E','F','G','H','I'}>}ZFI_PJSR)/((Sum({<CALDAY_NUM={'${startMonth}'},${dataScope},${orgStr},ZFI_XWLX={'YF-RS001'}>}ZFI_MBZ)+Sum({<CALDAY_NUM={'${avgEndMonth}'},${dataScope},${orgStr},ZFI_XWLX={'YF-RS001'}>}ZFI_MBZ))/2))-(Sum({<CALDAY_NUM={">=${startMonth}<=${endMonth}"},${dataScope},${orgStr},ZFI_YWB={'A','B','C','D','E','F','G','H','I'}>}ZFI_PJSR_LY)/((Sum({<CALDAY_NUM={'${startMonth}'},${dataScope},${orgStr},ZFI_XWLX={'YF-RS001'}>}ZFI_MBZ_LY)+Sum({<CALDAY_NUM={'${avgEndMonth}'},${dataScope},${orgStr},ZFI_XWLX={'YF-RS001'}>}ZFI_MBZ_LY))/2)))/fAbs(Sum({<CALDAY_NUM={">=${startMonth}<=${endMonth}"},${dataScope},${orgStr},ZFI_YWB={'A','B','C','D','E','F','G','H','I'}>}ZFI_PJSR_LY)/((Sum({<CALDAY_NUM={'${startMonth}'},${dataScope},${orgStr},ZFI_XWLX={'YF-RS001'}>}ZFI_MBZ_LY)+Sum({<CALDAY_NUM={'${avgEndMonth}'},${dataScope},${orgStr},ZFI_XWLX={'YF-RS001'}>}ZFI_MBZ_LY))/2)),'0%')`,
                //人均扣费毛利
                `=num((Sum({<CALDAY_NUM={">=${startMonth}<=${endMonth}"},${dataScope},${orgStr},ZFI_YWB={'A','B','C','D','E','F','G','H','I'},ZFI_XWLX-={"*GN-ML*"}>}ZFI_PJML)-Sum({<CALDAY_NUM={">=${startMonth}<=${endMonth}"},${dataScope},${orgStr},ZGNGM={"$(vOrgFlagName)"},ZYJBM={'产品研发中心'}>}ZFI_FY))/10000/((Sum({<CALDAY_NUM={'${startMonth}'},${dataScope},${orgStr},ZFI_XWLX={'YF-RS001'}>}ZFI_MBZ)+Sum({<CALDAY_NUM={'${avgEndMonth}'},${dataScope},${orgStr},ZFI_XWLX={'YF-RS001'}>}ZFI_MBZ))/2),'#,##0')`,
                `=num((Sum({<CALDAY_NUM={">=${startMonth}<=${endMonth}"},${dataScope},${orgStr},ZFI_YWB={'A','B','C','D','E','F','G','H','I'},ZFI_XWLX-={"*GN-ML*"}>}ZFI_PJML_LY)-Sum({<CALDAY_NUM={">=${startMonth}<=${endMonth}"},${dataScope},${orgStr},ZGNGM={"$(vOrgFlagName)"},ZYJBM={'产品研发中心'}>}ZFI_FY_LY))/10000/((Sum({<CALDAY_NUM={'${startMonth}'},${dataScope},${orgStr},ZFI_XWLX={'YF-RS001'}>}ZFI_MBZ_LY)+Sum({<CALDAY_NUM={'${avgEndMonth}'},${dataScope},${orgStr},ZFI_XWLX={'YF-RS001'}>}ZFI_MBZ_LY))/2),'#,##0')`,
                `=num((((Sum({<CALDAY_NUM={">=${startMonth}<=${endMonth}"},${dataScope},${orgStr},ZFI_YWB={'A','B','C','D','E','F','G','H','I'},ZFI_XWLX-={"*GN-ML*"}>}ZFI_PJML)-Sum({<CALDAY_NUM={">=${startMonth}<=${endMonth}"},${dataScope},${orgStr},ZGNGM={"$(vOrgFlagName)"},ZYJBM={'产品研发中心'}>}ZFI_FY))/10000/((Sum({<CALDAY_NUM={'${startMonth}'},${dataScope},${orgStr},ZFI_XWLX={'YF-RS001'}>}ZFI_MBZ)+Sum({<CALDAY_NUM={'${avgEndMonth}'},${dataScope},${orgStr},ZFI_XWLX={'YF-RS001'}>}ZFI_MBZ))/2))-((Sum({<CALDAY_NUM={">=${startMonth}<=${endMonth}"},${dataScope},${orgStr},ZFI_YWB={'A','B','C','D','E','F','G','H','I'},ZFI_XWLX-={"*GN-ML*"}>}ZFI_PJML_LY)-Sum({<CALDAY_NUM={">=${startMonth}<=${endMonth}"},${dataScope},${orgStr},ZGNGM={"$(vOrgFlagName)"},ZYJBM={'产品研发中心'}>}ZFI_FY_LY))/10000/((Sum({<CALDAY_NUM={'${startMonth}'},${dataScope},${orgStr},ZFI_XWLX={'YF-RS001'}>}ZFI_MBZ_LY)+Sum({<CALDAY_NUM={'${avgEndMonth}'},${dataScope},${orgStr},ZFI_XWLX={'YF-RS001'}>}ZFI_MBZ_LY))/2)))/((Sum({<CALDAY_NUM={">=${startMonth}<=${endMonth}"},${dataScope},${orgStr},ZFI_YWB={'A','B','C','D','E','F','G','H','I'},ZFI_XWLX-={"*GN-ML*"}>}ZFI_PJML_LY)-Sum({<CALDAY_NUM={">=${startMonth}<=${endMonth}"},${dataScope},${orgStr},ZGNGM={"$(vOrgFlagName)"},ZYJBM={'产品研发中心'}>}ZFI_FY_LY))/10000/((Sum({<CALDAY_NUM={'${startMonth}'},${dataScope},${orgStr},ZFI_XWLX={'YF-RS001'}>}ZFI_MBZ_LY)+Sum({<CALDAY_NUM={'${avgEndMonth}'},${dataScope},${orgStr},ZFI_XWLX={'YF-RS001'}>}ZFI_MBZ_LY))/2)),'0%')`,
                //美元
                //总收入
                `=num(sum({<CALDAY_NUM={">=${startMonth}<=${endMonth}"},${dataScope},${orgStr},ZFI_YWB={'A','B','C','D','E','F','G','H','I'}>}ZFI_PJSR_U)/10000,'#,##0')`,
                `=num(sum({<CALDAY_NUM={">=${startMonth}<=${endMonth}"},${dataScope},${orgStr},ZFI_YWB={'A','B','C','D','E','F','G','H','I'}>}ZFI_PJSR_U)/sum({<CALDAY_NUM={">=${startMonth}<=${budgetMonth}"},${dataScope},${orgStr},ZFI_XWLX={'YF-MB001'}>}ZFI_MBZ_U),'0%')`,
                `=num((sum({<CALDAY_NUM={">=${startMonth}<=${endMonth}"},${dataScope},${orgStr},ZFI_YWB={'A','B','C','D','E','F','G','H','I'}>}ZFI_PJSR_U)-sum({<CALDAY_NUM={">=${startMonth}<=${endMonth}"},${dataScope},${orgStr},ZFI_YWB={'A','B','C','D','E','F','G','H','I'}>}ZFI_PJSR_U_LY))/fAbs(sum({<CALDAY_NUM={">=${startMonth}<=${endMonth}"},${dataScope},${orgStr},ZFI_YWB={'A','B','C','D','E','F','G','H','I'}>}ZFI_PJSR_U_LY)),'0%')`,
                //战略产品
                `=num(sum({<CALDAY_NUM={">=${startMonth}<=${endMonth}"},${dataScope},${orgStr},ZSTRATEGI={'X'},ZFI_YWB={'A','B','D','E','F','G','H','I'}>}DLV_QTY)+(sum({<CALDAY_NUM={">=${startMonth}<=${endMonth}"},${dataScope},${orgStr},ZSTRATEGI={'X'},ZFI_YWB={'C'}>}ZFI_PJSR)/${startMonth.substr(0,4)<2019?1:5000}),'#,##0')`,
                `=num((Sum({<CALDAY_NUM={">=${startMonth}<=${endMonth}"},${dataScope},${orgStr},ZSTRATEGI={'X'},ZFI_YWB={'A','B','D','E','F','G','H','I'}>}DLV_QTY)+(Sum({<CALDAY_NUM={">=${startMonth}<=${endMonth}"},${dataScope},${orgStr},ZSTRATEGI={'X'},ZFI_YWB={'C'}>}ZFI_PJSR) /${startMonth.substr(0,4)<2019?1:5000}))/Sum({<CALDAY_NUM={">=${startMonth}<=${budgetMonth}"},${dataScope},${orgStr},ZFI_XWLX={'YF-MB003'}>}ZFI_MBZ),'0%')`,
                `=num(((Sum({<CALDAY_NUM={">=${startMonth}<=${endMonth}"},${dataScope},${orgStr},ZSTRATEGI={'X'},ZFI_YWB={'A','B','D','E','F','G','H','I'}>}DLV_QTY) +(Sum({<CALDAY_NUM={">=${startMonth}<=${endMonth}"},${dataScope},${orgStr},ZSTRATEGI={'X'},ZFI_YWB={'C'}>}ZFI_PJSR) /${startMonth.substr(0,4)<2019?1:5000}))-(Sum({<CALDAY_NUM={">=${startMonth}<=${endMonth}"},${dataScope},${orgStr},ZSTRATEGI={'X'},ZFI_YWB={'A','B','D','E','F','G','H','I'}>}DLV_QTY_LY) +(Sum({<CALDAY_NUM={">=${startMonth}<=${endMonth}"},${dataScope},${orgStr},ZSTRATEGI={'X'},ZFI_YWB={'C'}>}ZFI_PJSR_LY) /${startMonth.substr(0,4)<2020?1:5000})))/fAbs((Sum({<CALDAY_NUM={">=${startMonth}<=${endMonth}"},${dataScope},${orgStr},ZSTRATEGI={'X'},ZFI_YWB={'A','B','D','E','F','G','H','I'}>}DLV_QTY_LY) +(Sum({<CALDAY_NUM={">=${startMonth}<=${endMonth}"},${dataScope},${orgStr},ZSTRATEGI={'X'},ZFI_YWB={'C'}>}ZFI_PJSR_LY) /${startMonth.substr(0,4)<2020?1:5000}))),'0%')`,
                //毛利额
                `=num(Sum({<CALDAY_NUM={">=${startMonth}<=${endMonth}"},${dataScope},${orgStr},ZFI_YWB={'A','B','C','D','E','F','G','H','I'},ZFI_XWLX-={"*GN-ML*"}>}ZFI_PJML_U)/10000,'#,##0')`,
                `=num(Sum({<CALDAY_NUM={">=${startMonth}<=${endMonth}"},${dataScope},${orgStr},ZFI_YWB={'A','B','C','D','E','F','G','H','I'},ZFI_XWLX-={"*GN-ML*"}>}ZFI_PJML_U)/Sum({<CALDAY_NUM={">=${startMonth}<=${budgetMonth}"},${dataScope},${orgStr},ZFI_XWLX={'YF-MB004'}>}ZFI_MBZ_U),'0%')`,
                `=num((Sum({<CALDAY_NUM={">=${startMonth}<=${endMonth}"},${dataScope},${orgStr},ZFI_YWB={'A','B','C','D','E','F','G','H','I'},ZFI_XWLX-={"*GN-ML*"}>}ZFI_PJML_U)-Sum({<CALDAY_NUM={">=${startMonth}<=${endMonth}"},${dataScope},${orgStr},ZFI_YWB={'A','B','C','D','E','F','G','H','I'},ZFI_XWLX-={"*GN-ML*"}>}ZFI_PJML_U_LY))/fAbs(Sum({<CALDAY_NUM={">=${startMonth}<=${endMonth}"},${dataScope},${orgStr},ZFI_YWB={'A','B','C','D','E','F','G','H','I'},ZFI_XWLX-={"*GN-ML*"}>}ZFI_PJML_U_LY)),'0%')`,
                //毛利率
                `=num(Sum({<CALDAY_NUM={">=${startMonth}<=${endMonth}"},${dataScope},${orgStr},ZFI_YWB={'A','B','C','D','E','F','G','H','I'},ZFI_XWLX-={"*GN-ML*"}>}ZFI_PJML_U)/Sum({<CALDAY_NUM={">=${startMonth}<=${endMonth}"},${dataScope},${orgStr},ZFI_YWB={'A','B','C','D','E','F','G','H','I'}>}ZFI_PJSR_U),'0.0%')`,
                `=num(Sum({<CALDAY_NUM={">=${startMonth}<=${endMonth}"},${dataScope},${orgStr},ZFI_YWB={'A','B','C','D','E','F','G','H','I'},ZFI_XWLX-={"*GN-ML*"}>}ZFI_PJML_U_LY)/Sum({<CALDAY_NUM={">=${startMonth}<=${endMonth}"},${dataScope},${orgStr},ZFI_YWB={'A','B','C','D','E','F','G','H','I'}>}ZFI_PJSR_U_LY),'0.0%')`,
                `=num((Sum({<CALDAY_NUM={">=${startMonth}<=${endMonth}"},${dataScope},${orgStr},ZFI_YWB={'A','B','C','D','E','F','G','H','I'},ZFI_XWLX-={"*GN-ML*"}>}ZFI_PJML_U)/Sum({<CALDAY_NUM={">=${startMonth}<=${endMonth}"},${dataScope},${orgStr},ZFI_YWB={'A','B','C','D','E','F','G','H','I'}>}ZFI_PJSR_U))-(Sum({<CALDAY_NUM={">=${startMonth}<=${endMonth}"},${dataScope},${orgStr},ZFI_YWB={'A','B','C','D','E','F','G','H','I'},ZFI_XWLX-={"*GN-ML*"}>}ZFI_PJML_U_LY)/Sum({<CALDAY_NUM={">=${startMonth}<=${endMonth}"},${dataScope},${orgStr},ZFI_YWB={'A','B','C','D','E','F','G','H','I'}>}ZFI_PJSR_U_LY)),'0%')`,
                //扣费毛利
                `=sum(1)`,
                `=sum(1)`,
                `=sum(1)`,
                //扣费毛利率
                `=sum(1)`,
                `=sum(1)`,
                `=sum(1)`,
                //人均销售额
                `=num(Sum({<CALDAY_NUM={">=${startMonth}<=${endMonth}"},${dataScope},${orgStr},ZFI_YWB={'A','B','C','D','E','F','G','H','I'}>}ZFI_PJSR_U)/10000/((Sum({<CALDAY_NUM={'${startMonth}'},${dataScope},${orgStr},ZFI_XWLX={'YF-RS001'}>}ZFI_MBZ)+Sum({<CALDAY_NUM={'${avgEndMonth}'},${dataScope},${orgStr},ZFI_XWLX={'YF-RS001'}>}ZFI_MBZ))/2),'#,##0')`,
                `=num(Sum({<CALDAY_NUM={">=${startMonth}<=${endMonth}"},${dataScope},${orgStr},ZFI_YWB={'A','B','C','D','E','F','G','H','I'}>}ZFI_PJSR_U_LY)/10000/((Sum({<CALDAY_NUM={'${startMonth}'},${dataScope},${orgStr},ZFI_XWLX={'YF-RS001'}>}ZFI_MBZ_LY)+Sum({<CALDAY_NUM={'${avgEndMonth}'},${dataScope},${orgStr},ZFI_XWLX={'YF-RS001'}>}ZFI_MBZ_LY))/2),'#,##0')`,
                `=num(((Sum({<CALDAY_NUM={">=${startMonth}<=${endMonth}"},${dataScope},${orgStr},ZFI_YWB={'A','B','C','D','E','F','G','H','I'}>}ZFI_PJSR_U)/((Sum({<CALDAY_NUM={'${startMonth}'},${dataScope},${orgStr},ZFI_XWLX={'YF-RS001'}>}ZFI_MBZ)+Sum({<CALDAY_NUM={'${avgEndMonth}'},${dataScope},${orgStr},ZFI_XWLX={'YF-RS001'}>}ZFI_MBZ))/2))-(Sum({<CALDAY_NUM={">=${startMonth}<=${endMonth}"},${dataScope},${orgStr},ZFI_YWB={'A','B','C','D','E','F','G','H','I'}>}ZFI_PJSR_U_LY)/((Sum({<CALDAY_NUM={'${startMonth}'},${dataScope},${orgStr},ZFI_XWLX={'YF-RS001'}>}ZFI_MBZ_LY)+Sum({<CALDAY_NUM={'${avgEndMonth}'},${dataScope},${orgStr},ZFI_XWLX={'YF-RS001'}>}ZFI_MBZ_LY))/2)))/fAbs(Sum({<CALDAY_NUM={">=${startMonth}<=${endMonth}"},${dataScope},${orgStr},ZFI_YWB={'A','B','C','D','E','F','G','H','I'}>}ZFI_PJSR_U_LY)/((Sum({<CALDAY_NUM={'${startMonth}'},${dataScope},${orgStr},ZFI_XWLX={'YF-RS001'}>}ZFI_MBZ_LY)+Sum({<CALDAY_NUM={'${avgEndMonth}'},${dataScope},${orgStr},ZFI_XWLX={'YF-RS001'}>}ZFI_MBZ_LY))/2)),'0%')`,
                //人均扣费毛利
                `=sum(1)`,
                `=sum(1)`,
                `=sum(1)`
            ]
        },
        'income-bp': {
            qDimensions: [
                `=if(vOrgAdmin='Y',if(${orgMatch} and TXTSH_YWB<>'' and TXTSH_YWB<>'网络安全部',TXTSH_YWB),if(TXTSH_CBX<>'' and ${orgMatch},TXTSH_CBX))`
            ],
            qMeasures: [
                `=round(Sum({<CALDAY_NUM={">=${startMonth}<=${budgetMonth}"},${dataScope},ZFI_XWLX={'YF-MB001'}>}ZFI_MBZ)/10000)`,
                `=round(Sum({<CALDAY_NUM={">=${startMonth}<=${budgetMonth}"},${dataScope},ZFI_YWB={'A','B','C','D','E','F','G','H','I'}>}ZFI_PJSR)/10000)`,
                `=round((Sum({<CALDAY_NUM={">=${startMonth}<=${endMonth}"},${dataScope},ZFI_YWB={'A','B','C','D','E','F','G','H','I'}>}ZFI_PJSR)-Sum({<CALDAY_NUM={">=${startMonth}<=${endMonth}"},${dataScope},ZFI_YWB={'A','B','C','D','E','F','G','H','I'}>}ZFI_PJSR_LY))/fAbs(Sum({<CALDAY_NUM={">=${startMonth}<=${endMonth}"},${dataScope},ZFI_YWB={'A','B','C','D','E','F','G','H','I'}>}ZFI_PJSR_LY))*100)`,
                `=round(Sum({<CALDAY_NUM={">=${startMonth}<=${budgetMonth}"},${dataScope},ZFI_XWLX={'YF-MB001'}>}ZFI_MBZ_U)/10000)`,
                `=round(Sum({<CALDAY_NUM={">=${startMonth}<=${budgetMonth}"},${dataScope},ZFI_YWB={'A','B','C','D','E','F','G','H','I'}>}ZFI_PJSR_U)/10000)`,
                `=round((Sum({<CALDAY_NUM={">=${startMonth}<=${endMonth}"},${dataScope},ZFI_YWB={'A','B','C','D','E','F','G','H','I'}>}ZFI_PJSR_U)-Sum({<CALDAY_NUM={">=${startMonth}<=${endMonth}"},${dataScope},ZFI_YWB={'A','B','C','D','E','F','G','H','I'}>}ZFI_PJSR_U_LY))/fAbs(Sum({<CALDAY_NUM={">=${startMonth}<=${endMonth}"},${dataScope},ZFI_YWB={'A','B','C','D','E','F','G','H','I'}>}ZFI_PJSR_U_LY))*100)`
            ]
        },
        'income-bpDrill': {
            qDimensions: [
                `=if(vOrgAdmin='Y',if(${orgMatch} and TXTSH_YWB<>'' and TXTSH_YWB<>'网络安全部',TXTSH_YWB),if(TXTSH_CBX<>'' and ${orgMatch},TXTSH_CBX))`,
                `=if(vOrgAdmin='Y',if(TXTSH_CBX<>'',TXTSH_CBX),if(TXTSH_CPXL<>'',TXTSH_CPXL))`
            ],
            qMeasures: [
                `=round(Sum({<CALDAY_NUM={">=${startMonth}<=${budgetMonth}"},${dataScope},ZFI_XWLX={'YF-MB001'}>}ZFI_MBZ)/10000)`,
                `=round(Sum({<CALDAY_NUM={">=${startMonth}<=${budgetMonth}"},${dataScope},ZFI_YWB={'A','B','C','D','E','F','G','H','I'}>}ZFI_PJSR)/10000)`,
                `=round((Sum({<CALDAY_NUM={">=${startMonth}<=${endMonth}"},${dataScope},ZFI_YWB={'A','B','C','D','E','F','G','H','I'}>}ZFI_PJSR)-Sum({<CALDAY_NUM={">=${startMonth}<=${endMonth}"},${dataScope},ZFI_YWB={'A','B','C','D','E','F','G','H','I'}>}ZFI_PJSR_LY))/fAbs(Sum({<CALDAY_NUM={">=${startMonth}<=${endMonth}"},${dataScope},ZFI_YWB={'A','B','C','D','E','F','G','H','I'}>}ZFI_PJSR_LY))*100)`,
                `=round(Sum({<CALDAY_NUM={">=${startMonth}<=${budgetMonth}"},${dataScope},ZFI_XWLX={'YF-MB001'}>}ZFI_MBZ_U)/10000)`,
                `=round(Sum({<CALDAY_NUM={">=${startMonth}<=${budgetMonth}"},${dataScope},ZFI_YWB={'A','B','C','D','E','F','G','H','I'}>}ZFI_PJSR_U)/10000)`,
                `=round((Sum({<CALDAY_NUM={">=${startMonth}<=${endMonth}"},${dataScope},ZFI_YWB={'A','B','C','D','E','F','G','H','I'}>}ZFI_PJSR_U)-Sum({<CALDAY_NUM={">=${startMonth}<=${endMonth}"},${dataScope},ZFI_YWB={'A','B','C','D','E','F','G','H','I'}>}ZFI_PJSR_U_LY))/fAbs(Sum({<CALDAY_NUM={">=${startMonth}<=${endMonth}"},${dataScope},ZFI_YWB={'A','B','C','D','E','F','G','H','I'}>}ZFI_PJSR_U_LY))*100)`
            ]
        },
        'income-structure-bar': {
            qDimensions: [
                `=$(vHY)`
            ],
            qMeasures: [
                `=round((Sum({<CALDAY_NUM={">=${startMonth}<=${endMonth}"},${dataScope},${orgStr},ZFI_YWB={'A','B','C','D','E','F','G','H','I'}>}ZFI_PJSR)-Sum({<CALDAY_NUM={">=${startMonth}<=${endMonth}"},${dataScope},${orgStr},ZFI_YWB={'A','B','C','D','E','F','G','H','I'}>}ZFI_PJSR_LY))/fAbs(Sum({<CALDAY_NUM={">=${startMonth}<=${endMonth}"},${dataScope},${orgStr},ZFI_YWB={'A','B','C','D','E','F','G','H','I'}>}ZFI_PJSR_LY))*100)`,
                `=round((Sum(total {<CALDAY_NUM={">=${startMonth}<=${endMonth}"},${dataScope},${orgStr},ZFI_YWB={'A','B','C','D','E','F','G','H','I'}>}ZFI_PJSR)-Sum(total {<CALDAY_NUM={">=${startMonth}<=${endMonth}"},${dataScope},${orgStr},ZFI_YWB={'A','B','C','D','E','F','G','H','I'}>}ZFI_PJSR_LY))/fAbs(Sum(total {<CALDAY_NUM={">=${startMonth}<=${endMonth}"},${dataScope},${orgStr},ZFI_YWB={'A','B','C','D','E','F','G','H','I'}>}ZFI_PJSR_LY))*100)`,
                `=round((Sum({<CALDAY_NUM={">=${startMonth}<=${endMonth}"},${dataScope},${orgStr},ZFI_YWB={'A','B','C','D','E','F','G','H','I'}>}ZFI_PJSR_U)-Sum({<CALDAY_NUM={">=${startMonth}<=${endMonth}"},${dataScope},${orgStr},ZFI_YWB={'A','B','C','D','E','F','G','H','I'}>}ZFI_PJSR_U_LY))/fAbs(Sum({<CALDAY_NUM={">=${startMonth}<=${endMonth}"},${dataScope},${orgStr},ZFI_YWB={'A','B','C','D','E','F','G','H','I'}>}ZFI_PJSR_U_LY))*100)`,
                `=round((Sum(total {<CALDAY_NUM={">=${startMonth}<=${endMonth}"},${dataScope},${orgStr},ZFI_YWB={'A','B','C','D','E','F','G','H','I'}>}ZFI_PJSR_U)-Sum(total {<CALDAY_NUM={">=${startMonth}<=${endMonth}"},${dataScope},${orgStr},ZFI_YWB={'A','B','C','D','E','F','G','H','I'}>}ZFI_PJSR_U_LY))/fAbs(Sum(total {<CALDAY_NUM={">=${startMonth}<=${endMonth}"},${dataScope},${orgStr},ZFI_YWB={'A','B','C','D','E','F','G','H','I'}>}ZFI_PJSR_U_LY))*100)`,
                `=round(Sum({<CALDAY_NUM={">=${startMonth}<=${endMonth}"},${dataScope},${orgStr},ZFI_YWB={'A','B','C','D','E','F','G','H','I'}>}ZFI_PJSR)/10000)`    
            ]
        },
        'income-structureDrill-bar': {
            qDimensions: [
                `=$(vHY)`,
                `=if(vOrgAdmin='Y',if(${orgMatch} and TXTSH_YWB<>'' and TXTSH_YWB<>'网络安全部',TXTSH_YWB),if(TXTSH_CBX<>'' and ${orgMatch},TXTSH_CBX))`
            ],
            qMeasures: [
                `=round((Sum({<CALDAY_NUM={">=${startMonth}<=${endMonth}"},${dataScope},ZFI_YWB={'A','B','C','D','E','F','G','H','I'}>}ZFI_PJSR)-Sum({<CALDAY_NUM={">=${startMonth}<=${endMonth}"},${dataScope},ZFI_YWB={'A','B','C','D','E','F','G','H','I'}>}ZFI_PJSR_LY))/fAbs(Sum({<CALDAY_NUM={">=${startMonth}<=${endMonth}"},${dataScope},ZFI_YWB={'A','B','C','D','E','F','G','H','I'}>}ZFI_PJSR_LY))*100)`,
                `=round((Sum(total <TXTMD_HY> {<CALDAY_NUM={">=${startMonth}<=${endMonth}"},${dataScope},ZFI_YWB={'A','B','C','D','E','F','G','H','I'}>}ZFI_PJSR)-Sum(total <TXTMD_HY> {<CALDAY_NUM={">=${startMonth}<=${endMonth}"},${dataScope},ZFI_YWB={'A','B','C','D','E','F','G','H','I'}>}ZFI_PJSR_LY))/fAbs(Sum(total <TXTMD_HY> {<CALDAY_NUM={">=${startMonth}<=${endMonth}"},${dataScope},ZFI_YWB={'A','B','C','D','E','F','G','H','I'}>}ZFI_PJSR_LY))*100)`,
                `=round((Sum({<CALDAY_NUM={">=${startMonth}<=${endMonth}"},${dataScope},ZFI_YWB={'A','B','C','D','E','F','G','H','I'}>}ZFI_PJSR_U)-Sum({<CALDAY_NUM={">=${startMonth}<=${endMonth}"},${dataScope},ZFI_YWB={'A','B','C','D','E','F','G','H','I'}>}ZFI_PJSR_U_LY))/fAbs(Sum({<CALDAY_NUM={">=${startMonth}<=${endMonth}"},${dataScope},ZFI_YWB={'A','B','C','D','E','F','G','H','I'}>}ZFI_PJSR_U_LY))*100)`,
                `=round((Sum(total <TXTMD_HY> {<CALDAY_NUM={">=${startMonth}<=${endMonth}"},${dataScope},ZFI_YWB={'A','B','C','D','E','F','G','H','I'}>}ZFI_PJSR_U)-Sum(total <TXTMD_HY> {<CALDAY_NUM={">=${startMonth}<=${endMonth}"},${dataScope},ZFI_YWB={'A','B','C','D','E','F','G','H','I'}>}ZFI_PJSR_U_LY))/fAbs(Sum(total <TXTMD_HY> {<CALDAY_NUM={">=${startMonth}<=${endMonth}"},${dataScope},ZFI_YWB={'A','B','C','D','E','F','G','H','I'}>}ZFI_PJSR_U_LY))*100)`,
                `=round(Sum({<CALDAY_NUM={">=${startMonth}<=${endMonth}"},${dataScope},ZFI_YWB={'A','B','C','D','E','F','G','H','I'}>}ZFI_PJSR)/10000)`
            ]
        },
        'income-structure-pie': {
            qDimensions: [
                `=$(vHY)`
            ],
            qMeasures: [
                `=round(Sum({<CALDAY_NUM={">=${startMonth}<=${endMonth}"},${dataScope},${orgStr},ZFI_YWB={'A','B','C','D','E','F','G','H','I'}>}ZFI_PJSR)/10000)`,
                `=round(Sum({<CALDAY_NUM={">=${startMonth}<=${endMonth}"},${dataScope},${orgStr},ZFI_YWB={'A','B','C','D','E','F','G','H','I'}>}ZFI_PJSR_U)/10000)`      
            ]
        },
        'income-structureDrill-pie': {
            qDimensions: [
                `=$(vHY)`,
                `=if(vOrgAdmin='Y',if(${orgMatch} and TXTSH_YWB<>'' and TXTSH_YWB<>'网络安全部',TXTSH_YWB),if(TXTSH_CBX<>'' and ${orgMatch},TXTSH_CBX))`
            ],
            qMeasures: [
                `=round(Sum({<CALDAY_NUM={">=${startMonth}<=${endMonth}"},${dataScope},ZFI_YWB={'A','B','C','D','E','F','G','H','I'}>}ZFI_PJSR)/10000)`,
                `=round(Sum({<CALDAY_NUM={">=${startMonth}<=${endMonth}"},${dataScope},ZFI_YWB={'A','B','C','D','E','F','G','H','I'}>}ZFI_PJSR_U)/10000)`      
            ]
        },
        'income-branch': {
            qDimensions: [
                `${branchDim}`
            ],
            qMeasures: [
                `=round(Sum({<CALDAY_NUM={">=${syearMonth}<=${endMonth}"},${dataScope},${orgStr},ZFI_YWB={'A','B','C','D','E','F','G','H','I'}>}ZFI_PJSR_LY)/10000)`,
                `=round(Sum({<CALDAY_NUM={">=${syearMonth}<=${endMonth}"},${dataScope},${orgStr},ZFI_YWB={'A','B','C','D','E','F','G','H','I'}>}ZFI_PJSR)/10000)`,
                `=round(((Sum({<CALDAY_NUM={">=${syearMonth}<=${endMonth}"},${dataScope},${orgStr},ZFI_YWB={'A','B','C','D','E','F','G','H','I'}>}ZFI_PJSR))-(Sum({<CALDAY_NUM={">=${syearMonth}<=${endMonth}"},${dataScope},${orgStr},ZFI_YWB={'A','B','C','D','E','F','G','H','I'}>}ZFI_PJSR_LY)))/fabs(Sum({<CALDAY_NUM={">=${syearMonth}<=${endMonth}"},${dataScope},${orgStr},ZFI_YWB={'A','B','C','D','E','F','G','H','I'}>}ZFI_PJSR_LY))*100)`,
                `=round(Sum({<CALDAY_NUM={">=${syearMonth}<=${endMonth}"},${dataScope},${orgStr},ZFI_YWB={'A','B','C','D','E','F','G','H','I'}>}ZFI_PJSR_U_LY)/10000)`,
                `=round(Sum({<CALDAY_NUM={">=${syearMonth}<=${endMonth}"},${dataScope},${orgStr},ZFI_YWB={'A','B','C','D','E','F','G','H','I'}>}ZFI_PJSR_U)/10000)`,
                `=round(((Sum({<CALDAY_NUM={">=${syearMonth}<=${endMonth}"},${dataScope},${orgStr},ZFI_YWB={'A','B','C','D','E','F','G','H','I'}>}ZFI_PJSR_U))-(Sum({<CALDAY_NUM={">=${syearMonth}<=${endMonth}"},${dataScope},${orgStr},ZFI_YWB={'A','B','C','D','E','F','G','H','I'}>}ZFI_PJSR_U_LY)))/fabs(Sum({<CALDAY_NUM={">=${syearMonth}<=${endMonth}"},${dataScope},${orgStr},ZFI_YWB={'A','B','C','D','E','F','G','H','I'}>}ZFI_PJSR_U_LY))*100)`,    
            ]
        },
        'income-trend': {
            qDimensions: [
                `=if(CALMONTH>=${l12sMonth} and CALMONTH<=${l12eMonth},CALMONTH)`,
                `=if(vOrgAdmin='Y',if(${orgMatch} and TXTSH_YWB<>'' and TXTSH_YWB<>'网络安全部',TXTSH_YWB),if(TXTSH_CBX<>'' and ${orgMatch},TXTSH_CBX))`,
                `=if(vOrgAdmin='Y',if(ZFI_YWB<>'',ZFI_YWB),if(ZFI_CBX<>'',ZFI_CBX))`
            ],
            qMeasures: [
                `=round(Sum({<ZFI_YWB={'A','B','C','D','E','F','G','H','I'},${dataScope}>}ZFI_PJSR)/Sum({<ZFI_YWB={'A','B','C','D','E','F','G','H','I'},${dataScope}>}DLV_QTY))`,
                `=round(Sum({<ZFI_YWB={'A','B','C','D','E','F','G','H','I'},${dataScope}>}ZFI_PJSR_U)/Sum({<ZFI_YWB={'A','B','C','D','E','F','G','H','I'},${dataScope}>}DLV_QTY))`,
                `=round(Sum({<ZFI_YWB={'A','B','C','D','E','F','G','H','I'},${dataScope}>}DLV_QTY))`,
            ]
        },
        'gross-bp': {
            qDimensions: [
                `=if(vOrgAdmin='Y',if(${orgMatch} and TXTSH_YWB<>'' and TXTSH_YWB<>'网络安全部',TXTSH_YWB),if(TXTSH_CBX<>'' and ${orgMatch},TXTSH_CBX))`
            ],
            qMeasures: [
                `=round(Sum({<CALDAY_NUM={">=${startMonth}<=${budgetMonth}"},${dataScope},ZFI_XWLX={'YF-MB004'}>}ZFI_MBZ)/10000)`,
                `=round(Sum({<CALDAY_NUM={">=${startMonth}<=${endMonth}"},${dataScope},ZFI_YWB={'A','B','C','D','E','F','G','H','I'},ZFI_XWLX-={"*GN-ML*"}>}ZFI_PJML)/10000)`,
                `=round((Sum({<CALDAY_NUM={">=${startMonth}<=${endMonth}"},${dataScope},ZFI_YWB={'A','B','C','D','E','F','G','H','I'},ZFI_XWLX-={"*GN-ML*"}>}ZFI_PJML)-Sum({<CALDAY_NUM={">=${startMonth}<=${endMonth}"},${dataScope},ZFI_YWB={'A','B','C','D','E','F','G','H','I'},ZFI_XWLX-={"*GN-ML*"}>}ZFI_PJML_LY))/fAbs(Sum({<CALDAY_NUM={">=${startMonth}<=${endMonth}"},${dataScope},ZFI_YWB={'A','B','C','D','E','F','G','H','I'},ZFI_XWLX-={"*GN-ML*"}>}ZFI_PJML_LY))*100)`,
                `=round(Sum({<CALDAY_NUM={">=${startMonth}<=${budgetMonth}"},${dataScope},ZFI_XWLX={'YF-MB004'}>}ZFI_MBZ_U)/10000)`,
                `=round(Sum({<CALDAY_NUM={">=${startMonth}<=${endMonth}"},${dataScope},ZFI_YWB={'A','B','C','D','E','F','G','H','I'},ZFI_XWLX-={"*GN-ML*"}>}ZFI_PJML_U)/10000)`,
                `=round((Sum({<CALDAY_NUM={">=${startMonth}<=${endMonth}"},${dataScope},ZFI_YWB={'A','B','C','D','E','F','G','H','I'},ZFI_XWLX-={"*GN-ML*"}>}ZFI_PJML_U)-Sum({<CALDAY_NUM={">=${startMonth}<=${endMonth}"},${dataScope},ZFI_YWB={'A','B','C','D','E','F','G','H','I'},ZFI_XWLX-={"*GN-ML*"}>}ZFI_PJML_U_LY))/fAbs(Sum({<CALDAY_NUM={">=${startMonth}<=${endMonth}"},${dataScope},ZFI_YWB={'A','B','C','D','E','F','G','H','I'},ZFI_XWLX-={"*GN-ML*"}>}ZFI_PJML_U_LY))*100)`,
            ]
        },
        'gross-deduction': {
            qDimensions: [
                `=if(CALYEAR=left('${startMonth}',4),right(CALMONTH,2)&'月')`,
            ],
            qMeasures: [
                `=round(Sum({<ZFI_YWB={'A','B','C','D','E','F','G','H','I'},${dataScope},${orgStr},ZFI_XWLX-={"*GN-ML*"}>}ZFI_PJML_LY)/Sum({<ZFI_YWB={'A','B','C','D','E','F','G','H','I'},${dataScope},${orgStr}>}ZFI_PJSR_LY)*100,0.1)`,
                `=round(Sum({<ZFI_YWB={'A','B','C','D','E','F','G','H','I'},${dataScope},${orgStr},ZFI_XWLX-={"*GN-ML*"}>}ZFI_PJML)/Sum({<ZFI_YWB={'A','B','C','D','E','F','G','H','I'},${dataScope},${orgStr}>}ZFI_PJSR)*100,0.1)`,
                `=round((Sum({<ZFI_YWB={'A','B','C','D','E','F','G','H','I'},${dataScope},${orgStr},ZFI_XWLX-={"*GN-ML*"}>}ZFI_PJML_LY)-Sum({<ZYJBM={'产品研发中心'},${dataScope},${orgStr}>}ZFI_FY_LY))/Sum({<ZFI_YWB={'A','B','C','D','E','F','G','H','I'},${dataScope},${orgStr}>}ZFI_PJSR_LY)*100,0.1)`,
                `=round((Sum({<ZFI_YWB={'A','B','C','D','E','F','G','H','I'},${dataScope},${orgStr},ZFI_XWLX-={"*GN-ML*"}>}ZFI_PJML)-Sum({<ZYJBM={'产品研发中心'},${dataScope},${orgStr}>}ZFI_FY))/Sum({<ZFI_YWB={'A','B','C','D','E','F','G','H','I'},${dataScope},${orgStr}>}ZFI_PJSR)*100,0.1)`,
                `=round(Sum({<ZFI_YWB={'A','B','C','D','E','F','G','H','I'},${dataScope},${orgStr},ZFI_XWLX-={"*GN-ML*"}>}ZFI_PJML_U_LY)/Sum({<ZFI_YWB={'A','B','C','D','E','F','G','H','I'},${dataScope},${orgStr}>}ZFI_PJSR_U_LY)*100,0.1)`,
                `=round(Sum({<ZFI_YWB={'A','B','C','D','E','F','G','H','I'},${dataScope},${orgStr},ZFI_XWLX-={"*GN-ML*"}>}ZFI_PJML_U)/Sum({<ZFI_YWB={'A','B','C','D','E','F','G','H','I'},${dataScope},${orgStr}>}ZFI_PJSR_U)*100,0.1)`,
            ]
        },
        'cost-rate': {
            qDimensions: [
                `=if(ZFYXZ<>'',ZFYXZ)`,
                `=if(CALYEAR=left('${startMonth}',4),right(CALMONTH,2)&'月')`
            ],
            qMeasures: [
                `=round(Sum({<ZYJBM={'产品研发中心'},${dataScope},${orgStr},ZGNGM={"$(vOrgFlagName)"}>}ZFI_FY_LY)/10000)`,
                `=round(Sum({<CALDAY_NUM={"<=${endMonth}"},ZYJBM={'产品研发中心'},${dataScope},${orgStr},ZGNGM={"$(vOrgFlagName)"}>}ZFI_FY)/10000)`,
                `=round((Sum({<CALDAY_NUM={"<=${endMonth}"},ZYJBM={'产品研发中心'},${dataScope},${orgStr},ZGNGM={"$(vOrgFlagName)"}>}ZFI_FY)-Sum({<ZYJBM={'产品研发中心'},${dataScope},${orgStr},ZGNGM={"$(vOrgFlagName)"}>}ZFI_FY_LY))/fAbs(Sum({<ZYJBM={'产品研发中心'},${dataScope},${orgStr},ZGNGM={"$(vOrgFlagName)"}>}ZFI_FY_LY))*100)`,
                `=round((Sum(total {<CALYEAR={"${startMonth.substr(0,4)}"},${dataScope},${orgStr},ZGNGM={"$(vOrgFlagName)"},ZYJBM={'产品研发中心'}>}ZFI_FY)-Sum(total {<CALYEAR={"${startMonth.substr(0,4)}"},${dataScope},${orgStr},ZGNGM={"$(vOrgFlagName)"},ZYJBM={'产品研发中心'}>}ZFI_FY_LY))/fAbs(Sum(total {<CALYEAR={"${startMonth.substr(0,4)}"},${dataScope},${orgStr},ZGNGM={"$(vOrgFlagName)"},ZYJBM={'产品研发中心'}>}ZFI_FY_LY))*100)`
            ]
        },
        'cost-rateTotal': {
            qDimensions: [
                `='费用合计'`,
                `=if(CALYEAR=left('${startMonth}',4),right(CALMONTH,2)&'月')`
            ],
            qMeasures: [
                `=round(Sum({<ZYJBM={'产品研发中心'},${dataScope},${orgStr},ZGNGM={"$(vOrgFlagName)"}>}ZFI_FY_LY)/10000)`,
                `=round(Sum({<CALDAY_NUM={"<=${endMonth}"},ZYJBM={'产品研发中心'},${dataScope},${orgStr},ZGNGM={"$(vOrgFlagName)"}>}ZFI_FY)/10000)`,
                `=round((Sum({<CALDAY_NUM={"<=${endMonth}"},ZYJBM={'产品研发中心'},${dataScope},${orgStr},ZGNGM={"$(vOrgFlagName)"}>}ZFI_FY)-Sum({<ZYJBM={'产品研发中心'},${dataScope},${orgStr},ZGNGM={"$(vOrgFlagName)"}>}ZFI_FY_LY))/fAbs(Sum({<ZYJBM={'产品研发中心'},${dataScope},${orgStr},ZGNGM={"$(vOrgFlagName)"}>}ZFI_FY_LY))*100)`,
                `=round((Sum(total {<CALYEAR={"${startMonth.substr(0,4)}"},${dataScope},${orgStr},ZGNGM={"$(vOrgFlagName)"},ZYJBM={'产品研发中心'}>}ZFI_FY)-Sum(total {<CALYEAR={"${startMonth.substr(0,4)}"},${dataScope},${orgStr},ZGNGM={"$(vOrgFlagName)"},ZYJBM={'产品研发中心'}>}ZFI_FY_LY))/fAbs(Sum(total {<CALYEAR={"${startMonth.substr(0,4)}"},${dataScope},${orgStr},ZGNGM={"$(vOrgFlagName)"},ZYJBM={'产品研发中心'}>}ZFI_FY_LY))*100)`
            ]
        },
        'cost-structure': {
            qDimensions: [
                `='KPI'`
            ],
            qMeasures: [
                `=num(Sum({<CALDAY_NUM={">=${startMonth}<=${endMonth}"},${dataScope},${orgStr},ZGNGM={"$(vOrgFlagName)"},ZFYXZ={'人力成本'},ZYJBM={'产品研发中心'}>}ZFI_FY)/10000,'#,##0')`,
                `=num(((Sum({<CALDAY_NUM={">=${startMonth}<=${endMonth}"},${dataScope},${orgStr},ZGNGM={"$(vOrgFlagName)"},ZFYXZ={'人力成本'},ZYJBM={'产品研发中心'}>}ZFI_FY))-(Sum({<CALDAY_NUM={">=${startMonth}<=${endMonth}"},${dataScope},${orgStr},ZGNGM={"$(vOrgFlagName)"},ZFYXZ={'人力成本'},ZYJBM={'产品研发中心'}>}ZFI_FY_LY)))/fabs(Sum({<CALDAY_NUM={">=${startMonth}<=${endMonth}"},${dataScope},${orgStr},ZGNGM={"$(vOrgFlagName)"},ZFYXZ={'人力成本'},ZYJBM={'产品研发中心'}>}ZFI_FY_LY)),'0%')`,
                `=num(Sum({<CALDAY_NUM={">=${startMonth}<=${endMonth}"},${dataScope},${orgStr},ZGNGM={"$(vOrgFlagName)"},ZFYXZ={'人力成本'},ZYJBM={'产品研发中心'}>}ZFI_FY)/Sum({<CALDAY_NUM={">=${startMonth}<=${budgetMonth}"},${dataScope},${orgStr},ZGNGM={"$(vOrgFlagName)"},ZFYXZ={'人力成本'},ZFI_XWLX={'YF-MB002'}>}ZFI_MBZ),'0%')`,
                `=num(Sum({<CALDAY_NUM={">=${startMonth}<=${endMonth}"},${dataScope},${orgStr},ZGNGM={"$(vOrgFlagName)"},ZFYXZ={'差旅费用'},ZYJBM={'产品研发中心'}>}ZFI_FY)/10000,'#,##0')`,
                `=num(((Sum({<CALDAY_NUM={">=${startMonth}<=${endMonth}"},${dataScope},${orgStr},ZGNGM={"$(vOrgFlagName)"},ZFYXZ={'差旅费用'},ZYJBM={'产品研发中心'}>}ZFI_FY))-(Sum({<CALDAY_NUM={">=${startMonth}<=${endMonth}"},${dataScope},${orgStr},ZGNGM={"$(vOrgFlagName)"},ZFYXZ={'差旅费用'},ZYJBM={'产品研发中心'}>}ZFI_FY_LY)))/fabs(Sum({<CALDAY_NUM={">=${startMonth}<=${endMonth}"},${dataScope},${orgStr},ZGNGM={"$(vOrgFlagName)"},ZFYXZ={'差旅费用'},ZYJBM={'产品研发中心'}>}ZFI_FY_LY)),'0%')`,
                `=num(Sum({<CALDAY_NUM={">=${startMonth}<=${endMonth}"},${dataScope},${orgStr},ZGNGM={"$(vOrgFlagName)"},ZFYXZ={'差旅费用'},ZYJBM={'产品研发中心'}>}ZFI_FY)/Sum({<CALDAY_NUM={">=${startMonth}<=${budgetMonth}"},${dataScope},${orgStr},ZGNGM={"$(vOrgFlagName)"},ZFYXZ={'差旅费用'},ZFI_XWLX={'YF-MB002'}>}ZFI_MBZ),'0%')`,
                `=num(Sum({<CALDAY_NUM={">=${startMonth}<=${endMonth}"},${dataScope},${orgStr},ZGNGM={"$(vOrgFlagName)"},GL_ACCOUNT={'0066081008'},ZYJBM={'产品研发中心'}>}ZFI_FY)/10000,'#,##0')`,
                `=num(((Sum({<CALDAY_NUM={">=${startMonth}<=${endMonth}"},${dataScope},${orgStr},ZGNGM={"$(vOrgFlagName)"},GL_ACCOUNT={'0066081008'},ZYJBM={'产品研发中心'}>}ZFI_FY))-(Sum({<CALDAY_NUM={">=${startMonth}<=${endMonth}"},${dataScope},${orgStr},ZGNGM={"$(vOrgFlagName)"},GL_ACCOUNT={'0066081008'},ZYJBM={'产品研发中心'}>}ZFI_FY_LY)))/fabs(Sum({<CALDAY_NUM={">=${startMonth}<=${endMonth}"},${dataScope},${orgStr},ZGNGM={"$(vOrgFlagName)"},GL_ACCOUNT={'0066081008'},ZYJBM={'产品研发中心'}>}ZFI_FY_LY)),'0%')`,
                `=num(Sum({<CALDAY_NUM={">=${startMonth}<=${endMonth}"},${dataScope},${orgStr},ZGNGM={"$(vOrgFlagName)"},GL_ACCOUNT={'0066081008'},ZYJBM={'产品研发中心'}>}ZFI_FY)/Sum({<CALDAY_NUM={">=${startMonth}<=${budgetMonth}"},${dataScope},${orgStr},ZGNGM={"$(vOrgFlagName)"},GL_ACCOUNT={'0066081008'},ZFI_XWLX={'YF-MB002'}>}ZFI_MBZ),'0%')`,
                `=num(Sum({<CALDAY_NUM={">=${startMonth}<=${endMonth}"},${dataScope},${orgStr},ZGNGM={"$(vOrgFlagName)"},GL_ACCOUNT={'0066082001'},ZYJBM={'产品研发中心'}>}ZFI_FY)/10000,'#,##0')`,
                `=num(((Sum({<CALDAY_NUM={">=${startMonth}<=${endMonth}"},${dataScope},${orgStr},ZGNGM={"$(vOrgFlagName)"},GL_ACCOUNT={'0066082001'},ZYJBM={'产品研发中心'}>}ZFI_FY))-(Sum({<CALDAY_NUM={">=${startMonth}<=${endMonth}"},${dataScope},${orgStr},ZGNGM={"$(vOrgFlagName)"},GL_ACCOUNT={'0066082001'},ZYJBM={'产品研发中心'}>}ZFI_FY_LY)))/fabs(Sum({<CALDAY_NUM={">=${startMonth}<=${endMonth}"},${dataScope},${orgStr},ZGNGM={"$(vOrgFlagName)"},GL_ACCOUNT={'0066082001'},ZYJBM={'产品研发中心'}>}ZFI_FY_LY)),'0%')`,
                `=num(Sum({<CALDAY_NUM={">=${startMonth}<=${endMonth}"},${dataScope},${orgStr},ZGNGM={"$(vOrgFlagName)"},GL_ACCOUNT={'0066082001'},ZYJBM={'产品研发中心'}>}ZFI_FY)/Sum({<CALDAY_NUM={">=${startMonth}<=${budgetMonth}"},${dataScope},${orgStr},ZGNGM={"$(vOrgFlagName)"},GL_ACCOUNT={'0066082001'},ZFI_XWLX={'YF-MB002'}>}ZFI_MBZ),'0%')`,
                `=num(Sum({<CALDAY_NUM={">=${startMonth}<=${endMonth}"},${dataScope},${orgStr},ZGNGM={"$(vOrgFlagName)"},GL_ACCOUNT={'0066081304'},ZYJBM={'产品研发中心'}>}ZFI_FY)/10000,'#,##0')`,
                `=num(((Sum({<CALDAY_NUM={">=${startMonth}<=${endMonth}"},${dataScope},${orgStr},ZGNGM={"$(vOrgFlagName)"},GL_ACCOUNT={'0066081304'},ZYJBM={'产品研发中心'}>}ZFI_FY))-(Sum({<CALDAY_NUM={">=${startMonth}<=${endMonth}"},${dataScope},${orgStr},ZGNGM={"$(vOrgFlagName)"},GL_ACCOUNT={'0066081304'},ZYJBM={'产品研发中心'}>}ZFI_FY_LY)))/fabs(Sum({<CALDAY_NUM={">=${startMonth}<=${endMonth}"},${dataScope},${orgStr},ZGNGM={"$(vOrgFlagName)"},GL_ACCOUNT={'0066081304'},ZYJBM={'产品研发中心'}>}ZFI_FY_LY)),'0%')`,
                `=num(Sum({<CALDAY_NUM={">=${startMonth}<=${endMonth}"},${dataScope},${orgStr},ZGNGM={"$(vOrgFlagName)"},GL_ACCOUNT={'0066081304'},ZYJBM={'产品研发中心'}>}ZFI_FY)/Sum({<CALDAY_NUM={">=${startMonth}<=${budgetMonth}"},${dataScope},${orgStr},ZGNGM={"$(vOrgFlagName)"},GL_ACCOUNT={'0066081304'},ZFI_XWLX={'YF-MB002'}>}ZFI_MBZ),'0%')`,
                `=num(Sum({<CALDAY_NUM={">=${startMonth}<=${endMonth}"},${dataScope},${orgStr},ZGNGM={"$(vOrgFlagName)"},GL_ACCOUNT={'0066081902'},ZYJBM={'产品研发中心'}>}ZFI_FY)/10000,'#,##0')`,
                `=num(((Sum({<CALDAY_NUM={">=${startMonth}<=${endMonth}"},${dataScope},${orgStr},ZGNGM={"$(vOrgFlagName)"},GL_ACCOUNT={'0066081902'},ZYJBM={'产品研发中心'}>}ZFI_FY))-(Sum({<CALDAY_NUM={">=${startMonth}<=${endMonth}"},${dataScope},${orgStr},ZGNGM={"$(vOrgFlagName)"},GL_ACCOUNT={'0066081902'},ZYJBM={'产品研发中心'}>}ZFI_FY_LY)))/fabs(Sum({<CALDAY_NUM={">=${startMonth}<=${endMonth}"},${dataScope},${orgStr},ZGNGM={"$(vOrgFlagName)"},GL_ACCOUNT={'0066081902'},ZYJBM={'产品研发中心'}>}ZFI_FY_LY)),'0%')`,
                `=num(Sum({<CALDAY_NUM={">=${startMonth}<=${endMonth}"},${dataScope},${orgStr},ZGNGM={"$(vOrgFlagName)"},GL_ACCOUNT={'0066081902'},ZYJBM={'产品研发中心'}>}ZFI_FY)/Sum({<CALDAY_NUM={">=${startMonth}<=${budgetMonth}"},${dataScope},${orgStr},ZGNGM={"$(vOrgFlagName)"},GL_ACCOUNT={'0066081902'},ZFI_XWLX={'YF-MB002'}>}ZFI_MBZ),'0%')`
            ]
        },
        'cost-trend': {
            qDimensions: [
                `=if(CALMONTH>=${l24sMonth} and CALMONTH<=${l24eMonth},CALMONTH)`
            ],
            qMeasures: [
                `=round(Sum({<ZYJBM={'产品研发中心'},ZFYXZ={'人力成本'},${dataScope},${orgStr},ZGNGM={"$(vOrgFlagName)"}>}ZFI_FY)/Sum({<ZFI_XWLX={'YF-RS001'},${dataScope},${orgStr},ZGNGM={"$(vOrgFlagName)"}>}ZFI_MBZ))`,
                `=round(Sum({<ZYJBM={'产品研发中心'},ZFYXZ-={'人力成本'},${dataScope},${orgStr},ZGNGM={"$(vOrgFlagName)"}>}ZFI_FY)/Sum({<ZFI_XWLX={'YF-RS001'},${dataScope},${orgStr},ZGNGM={"$(vOrgFlagName)"}>}ZFI_MBZ))`,
                `=round(Sum({<ZYJBM={'产品研发中心'},${dataScope},${orgStr},ZGNGM={"$(vOrgFlagName)"}>}ZFI_FY)/Sum({<ZFI_XWLX={'YF-RS001'},${dataScope},${orgStr},ZGNGM={"$(vOrgFlagName)"}>}ZFI_MBZ))`
            ]
        },
        'order-base': {
            qDimensions: [
                `p5n1dim1`
            ],
            qMeasures: [
                `=sum(p5n1mea1)`,
                `=sum(p5n1mea2)`,
                `=sum(p5n1mea3)`,
                `=sum(p5n1mea4)`,
                `=sum(p5n1mea5)`,
                `=sum(p5n1mea6)`
            ]
        },
        'order-structure': {
            qDimensions: [
                `p5n2dim1`
            ],
            qMeasures: [
                `=sum(p5n2mea1)`,
                `=sum(p5n2mea2)`,
                `=sum(p5n2mea3)`
            ]
        },
        'order-branch': {
            qDimensions: [
                `p5n3dim1`
            ],
            qMeasures: [
                `=sum(p5n3mea1)`,
                `=sum(p5n3mea2)`
            ]
        }
    }
    return formula[name];
};

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
