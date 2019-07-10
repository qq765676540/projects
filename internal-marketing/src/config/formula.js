export default
    function getFormula(opt) {
    let time = opt.time;
    let org = opt.org;
    let name = opt.name;
    let orgStr = "";
    let orgMatch = "";
    if(org.length>0) {
        orgStr = "[OADAccount]={";
        orgMatch = "match([OADAccount],";
        $.each(org,(i,v)=>{
            if(i===org.length-1){
                orgStr = orgStr+"'"+v+"'}"
                orgMatch = orgMatch+"'"+v+"')>0"
            }else {
                orgStr = orgStr+"'"+v+"',"
                orgMatch = orgMatch+"'"+v+"',"
            }
        });
    }
    else {
        orgStr = "[OADAccount]=";
        orgMatch = "[OADAccount]=[OADAccount]";
    }
    var formula = {
        //当前层级
        currentLevel: {
            qDimensions: [
                "=if(match(mid('$(DeptID)',1,3),'1-1','1-2')>0,'$(DeptID)')",
                "='-'",
                "='$(Account)'",
                "='$(DomainName)'",
                "='-'",
                "='$(DeptName)'",
                "='0000'"
            ],
            qMeasures: ["=sum(1)"]
        },
        //组织架构
        organization: {
            qDimensions: [
                "=if(match(mid('$(DeptID)',1,3),'1-1','1-2')>0,if(DeptID<>'$(DeptID)',DeptID),'maxlevel')",
                "=if(match(mid('$(DeptID)',1,3),'1-1','1-2')>0,if(DeptID<>'$(DeptID)',Parent_DeptID),'-')",
                "OADAccount",
                "DomainName",
                "='0'&Flag",
                "DeptName",
                "DeptSort"
            ],
            qMeasures: ["=sum({<OADAccount=>}1)"]
        },
        summaryCircle: {
            qDimensions: [],
            qMeasures: [
                `=num(count(distinct{<[DimensionName]={'${time}'},${orgStr},[RZTX/JH]={"J"},WorkPost-={"*总经理*","*总监*","*实习生*","*总裁*"}>} OADAccount)/count(distinct{<[DimensionName]={'${time}'},${orgStr},WorkPost-={"*总经理*","*总监*","*实习生*","*总裁*"}>}OADAccount)*100,'0.0')`,
                `=num(count(distinct{<[DimensionName]={'${time}'},${orgStr},[RZTX/JH]={"T"},WorkPost-={"*总经理*","*总监*","*实习生*","*总裁*"}>} OADAccount)/count(distinct{<[DimensionName]={'${time}'},${orgStr},WorkPost-={"*总经理*","*总监*","*实习生*","*总裁*"}>}OADAccount)*100,'0.0')`,
                `=num(count(distinct{<[DimensionName]={'${time}'},${orgStr},[RZTX/JH]={'J'},Is_Excute={'Y'}>}PlanID)/count(distinct {<[DimensionName]={'${time}'},${orgStr},[RZTX/JH]={'J'}>}PlanID)*100,'0.0')`,
                `=num(count(distinct{<[DimensionName]={'${time}'},${orgStr},[RZTX/JH]={'T'},Is_Sign={'Y'},LogMode={'拜访'}>}LogID)/count(distinct{<[DimensionName]={'${time}'},${orgStr},[RZTX/JH]={'T'},LogMode={'拜访'}>}LogID)*100,'0.0')`
            ]
        },
        summaryEasyKPI: {
            qDimensions: [],
            qMeasures: [
                `=count(distinct{<[DimensionName]={'${time}'},${orgStr},[RZTX/JH]={"J"},WorkPost-={"*总经理*","*总监*","*实习生*","*总裁*"}>} OADAccount)`,
                `=count(distinct{<[DimensionName]={'${time}'},${orgStr},WorkPost-={"*总经理*","*总监*","*实习生*","*总裁*"}>}OADAccount)`,
                `=count(distinct{<[DimensionName]={'${time}'},${orgStr},[RZTX/JH]={"T"},WorkPost-={"*总经理*","*总监*","*实习生*","*总裁*"}>} OADAccount)`,
                `=count(distinct{<[DimensionName]={'${time}'},${orgStr},WorkPost-={"*总经理*","*总监*","*实习生*","*总裁*"}>}OADAccount)`,
                `=count(distinct{<[DimensionName]={'${time}'},${orgStr},[RZTX/JH]={'J'},Is_Excute={'Y'}>}PlanID)`,
                `=count(distinct{<[DimensionName]={'${time}'},${orgStr},[RZTX/JH]={'J'}>}PlanID)`,
                `=count(distinct{<[DimensionName]={'${time}'},${orgStr},[RZTX/JH]={'T'},Is_Sign={'Y'},LogMode={'拜访'}>}LogID)`,
                `=count(distinct{<[DimensionName]={'${time}'},${orgStr},[RZTX/JH]={'T'},LogMode={'拜访'}>}LogID)`
            ]
        },
        summaryOrgListA: {
            qDimensions: [
                "=if(match(mid('$(DeptID)',1,3),'1-1','1-2')>0,'$(DomainName)')",
                "='$(DeptID)'"
            ],
            qMeasures: [
                `=if(isnull(count({<[DimensionName]={'${time}'},${orgStr},[RZTX/JH]={'T'},Is_Sign={'Y'},LogMode={'拜访'}>}LogID)/count({<[DimensionName]={'${time}'},${orgStr},[RZTX/JH]={'T'},LogMode={'拜访'}>}LogID)),sum(0),count({<[DimensionName]={'${time}'},${orgStr},[RZTX/JH]={'T'},Is_Sign={'Y'},LogMode={'拜访'}>}LogID)/count({<[DimensionName]={'${time}'},${orgStr},[RZTX/JH]={'T'},LogMode={'拜访'}>}LogID))`,
                `=if(isnull(count(distinct {<[DimensionName]={'${time}'},${orgStr},[RZTX/JH]={'T'},LogMode={'拜访'}>} LogID)),sum(0),count(distinct {<[DimensionName]={'${time}'},${orgStr},[RZTX/JH]={'T'},LogMode={'拜访'}>} LogID))`,
                `=if(isnull(count(distinct {<[DimensionName]={'${time}'},${orgStr},[RZTX/JH]={'J'},Is_Excute={'Y'}>}PlanID)/count(distinct {<[DimensionName]={'${time}'},${orgStr},[RZTX/JH]={'J'}>}PlanID)),sum(0),count(distinct {<[DimensionName]={'${time}'},${orgStr},[RZTX/JH]={'J'},Is_Excute={'Y'}>}PlanID)/count(distinct {<[DimensionName]={'${time}'},${orgStr},[RZTX/JH]={'J'}>}PlanID))`
            ]
        },
        summaryOrgListB: {
            qDimensions: [
                "=if(match(mid('$(DeptID)',1,3),'1-1','1-2')>0,if(DeptID<>'$(DeptID)',DeptID),'maxlevel')",
                "=if(match(mid('$(DeptID)',1,3),'1-1','1-2')>0,if(DeptID<>'$(DeptID)',Parent_DeptID),'-')",
                "=DeptSort",
                "=DeptName",
                "=DomainName"
            ],
            qMeasures: [
                `=if(isnull(count({<[DimensionName]={'${time}'},${orgStr},[RZTX/JH]={'T'},Is_Sign={'Y'},LogMode={'拜访'}>}LogID)/count({<[DimensionName]={'${time}'},${orgStr},[RZTX/JH]={'T'},LogMode={'拜访'}>}LogID)),sum(0),count({<[DimensionName]={'${time}'},${orgStr},[RZTX/JH]={'T'},Is_Sign={'Y'},LogMode={'拜访'}>}LogID)/count({<[DimensionName]={'${time}'},${orgStr},[RZTX/JH]={'T'},LogMode={'拜访'}>}LogID))`,
                `=if(isnull(count(distinct {<[DimensionName]={'${time}'},${orgStr},[RZTX/JH]={'T'},LogMode={'拜访'}>} LogID)),sum(0),count(distinct {<[DimensionName]={'${time}'},${orgStr},[RZTX/JH]={'T'},LogMode={'拜访'}>} LogID))`,
                `=if(isnull(count(distinct {<[DimensionName]={'${time}'},${orgStr},[RZTX/JH]={'J'},Is_Excute={'Y'}>}PlanID)/count(distinct {<[DimensionName]={'${time}'},${orgStr},[RZTX/JH]={'J'}>}PlanID)),sum(0),count(distinct {<[DimensionName]={'${time}'},${orgStr},[RZTX/JH]={'J'},Is_Excute={'Y'}>}PlanID)/count(distinct {<[DimensionName]={'${time}'},${orgStr},[RZTX/JH]={'J'}>}PlanID))`,
                `=if(isnull(count(total <DeptName> {<[DimensionName]={'${time}'},${orgStr},[RZTX/JH]={'T'},Is_Sign={'Y'},LogMode={'拜访'}>}LogID)/count(total <DeptName> {<[DimensionName]={'${time}'},${orgStr},[RZTX/JH]={'T'},LogMode={'拜访'}>}LogID)),sum(0),count(total <DeptName> {<[DimensionName]={'${time}'},${orgStr},[RZTX/JH]={'T'},Is_Sign={'Y'},LogMode={'拜访'}>}LogID)/count(total <DeptName> {<[DimensionName]={'${time}'},${orgStr},[RZTX/JH]={'T'},LogMode={'拜访'}>}LogID))`,
                `=if(isnull(count(total <DeptName> distinct {<[DimensionName]={'${time}'},${orgStr},[RZTX/JH]={'T'},LogMode={'拜访'}>} LogID)),sum(0),count(total <DeptName> distinct {<[DimensionName]={'${time}'},${orgStr},[RZTX/JH]={'T'},LogMode={'拜访'}>} LogID))`,
                `=if(isnull(count(total <DeptName> distinct {<[DimensionName]={'${time}'},${orgStr},[RZTX/JH]={'J'},Is_Excute={'Y'}>}PlanID)/count(total <DeptName> distinct {<[DimensionName]={'${time}'},${orgStr},[RZTX/JH]={'J'}>}PlanID)),sum(0),count(total <DeptName> distinct {<[DimensionName]={'${time}'},${orgStr},[RZTX/JH]={'J'},Is_Excute={'Y'}>}PlanID)/count(total <DeptName> distinct {<[DimensionName]={'${time}'},${orgStr},[RZTX/JH]={'J'}>}PlanID))`
            ]
        },
        summaryLineA: {
            qDimensions: ["WeekName"],
            qMeasures: [
                `=count(distinct {<${orgStr},[RZTX/JH]={'T'},DimensionName=,LogMode={'拜访'}>} LogID)`
            ]
        },
        summaryLineB: {
            qDimensions: ["WeekName"],
            qMeasures: [
                `=count(distinct{<${orgStr},[RZTX/JH]={'T'},IsPartnerOrUser_Y={'N','Z'},DimensionName=,LogMode={'拜访'}>}Partner_EndUser_Y)`,
                `=count(distinct{<${orgStr},[RZTX/JH]={'T'},IsPartnerOrUser_Y={'Y','Z'},DimensionName=,LogMode={'拜访'}>}Partner_EndUser_Y)`
            ]
        },
        planExecutionLine: {
            qDimensions: ["WeekName"],
            qMeasures: [
                `=count({<${orgStr},[RZTX/JH]={'J'},Is_Excute={'Y'},DimensionName=>}PlanID)/count({<${orgStr},[RZTX/JH]={'J'},DimensionName=>}PlanID)*100`
            ]
        },
        planExecutionCollapseA: {
            qDimensions: [
                `=if(${orgMatch},DomainName)`,
                "DeptName",
                "=IF(Is_Excute='N' and [RZTX/JH]='J' and Partner_EndUserName_Y<>'' ,Partner_EndUserName_Y)",
                "TaskType",
                `=IF(Is_Excute='N' and [RZTX/JH]='J' and [DimensionName]='本周',CALDAY)`,
                "=if(Is_Excute='N' and [RZTX/JH]='J' ,PlanActive)"
            ],
            qMeasures: [`=count(total <DomainName> distinct {<Is_Excute={'N'},[RZTX/JH]={'J'},[DimensionName]={'本周'}>} PlanID)`]
        },
        planExecutionCollapseB: {
            qDimensions: [
                `=if(${orgMatch},DomainName)`,
                "DeptName",
                "=IF(Is_Excute='N' and [RZTX/JH]='J' and Partner_EndUserName_Y<>'' ,Partner_EndUserName_Y)",
                "TaskType",
                `=IF(Is_Excute='N' and [RZTX/JH]='J' and [DimensionName]='上周',CALDAY)`,
                "=if(Is_Excute='N' and [RZTX/JH]='J' ,PlanActive)"
            ],
            qMeasures: [`=count(total <DomainName> distinct {<Is_Excute={'N'},[RZTX/JH]={'J'},[DimensionName]={'上周'}>} PlanID)`]
        },
        visitWarningKPI: {
            qDimensions: [],
            qMeasures: [
                `=count(distinct{<[DimensionName]={'${time}'},${orgStr},[RZTX/JH]={'T'},LogMode={'拜访'},IsPartnerOrUser_Y={'Y','Z'},PartnerCategory_Y-={'其他'} >}Partner_EndUser_Y)/count(distinct{<[DimensionName]=,${orgStr},Statu={'完成分配'},IsPartnerOrUser={'Y','Z'},PartnerCategory-={'其他'},[是否拜访]={1}>}Partner_EndUser)*100`,
                `=count(distinct{<[DimensionName]={'${time}'},${orgStr},[RZTX/JH]={'T'},LogMode={'拜访'},IsPartnerOrUser_Y={'N','Z'},UserCategory_Y-={'其他'} >}Partner_EndUser_Y)/count(distinct{<[DimensionName]=,${orgStr},Statu={'完成分配'},IsPartnerOrUser={'N','Z'},UserCategory-={'其他'},[是否拜访]={1}>}Partner_EndUser)*100`,
                `=if(count(distinct{<[DimensionName]={'${time}'},${orgStr},[RZTX/JH]={'T'},LogMode={'拜访'},PartnerCategory_Y={"战略客户"},IsPartnerOrUser_Y={'Y','Z'}>} Partner_EndUser_Y) > count(distinct{<[DimensionName]=,${orgStr},Statu={'完成分配'},PartnerCategory={'战略客户'},IsPartnerOrUser={'Y','Z'},[是否拜访]={1}>} Partner_EndUser),count(distinct{<[DimensionName]=,${orgStr},Statu={'完成分配'},PartnerCategory={'战略客户'},IsPartnerOrUser={'Y','Z'},[是否拜访]={1}>} Partner_EndUser),count(distinct{<[DimensionName]={'${time}'},${orgStr},[RZTX/JH]={'T'},LogMode={'拜访'},PartnerCategory_Y={"战略客户"},IsPartnerOrUser_Y={'Y','Z'}>} Partner_EndUser_Y))&'/'& count(distinct{<[DimensionName]=,${orgStr},Statu={'完成分配'},PartnerCategory={'战略客户'},IsPartnerOrUser={'Y','Z'},[是否拜访]={1}>} Partner_EndUser)`,
                `=if(count(distinct{<[DimensionName]={'${time}'},${orgStr},[RZTX/JH]={'T'},LogMode={'拜访'},PartnerCategory_Y={"核心客户"},IsPartnerOrUser_Y={'Y','Z'}>} Partner_EndUser_Y) > count(distinct{<[DimensionName]=,${orgStr},Statu={'完成分配'},PartnerCategory={'核心客户'},IsPartnerOrUser={'Y','Z'},[是否拜访]={1}>} Partner_EndUser),count(distinct{<[DimensionName]=,${orgStr},Statu={'完成分配'},PartnerCategory={'核心客户'},IsPartnerOrUser={'Y','Z'},[是否拜访]={1}>} Partner_EndUser),count(distinct{<[DimensionName]={'${time}'},${orgStr},[RZTX/JH]={'T'},LogMode={'拜访'},PartnerCategory_Y={"核心客户"},IsPartnerOrUser_Y={'Y','Z'}>} Partner_EndUser_Y))&'/'& count(distinct{<[DimensionName]=,${orgStr},Statu={'完成分配'},PartnerCategory={"核心客户"},IsPartnerOrUser={'Y','Z'},[是否拜访]={1}>} Partner_EndUser)`,
                `=if(count(distinct{<[DimensionName]={'${time}'},${orgStr},[RZTX/JH]={'T'},LogMode={'拜访'},PartnerCategory_Y={"潜力客户"},IsPartnerOrUser_Y={'Y','Z'}>} Partner_EndUser_Y) > count(distinct{<[DimensionName]=,${orgStr},Statu={'完成分配'},PartnerCategory={'潜力客户'},IsPartnerOrUser={'Y','Z'},[是否拜访]={1}>} Partner_EndUser),count(distinct{<[DimensionName]=,${orgStr},Statu={'完成分配'},PartnerCategory={'潜力客户'},IsPartnerOrUser={'Y','Z'},[是否拜访]={1}>} Partner_EndUser),count(distinct{<[DimensionName]={'${time}'},${orgStr},[RZTX/JH]={'T'},LogMode={'拜访'},PartnerCategory_Y={"潜力客户"},IsPartnerOrUser_Y={'Y','Z'}>} Partner_EndUser_Y))&'/'& count(distinct{<[DimensionName]=,${orgStr},Statu={'完成分配'},PartnerCategory={"潜力客户"},IsPartnerOrUser={'Y','Z'},[是否拜访]={1}>} Partner_EndUser)`,
                `=if(count(distinct{<[DimensionName]={'${time}'},${orgStr},[RZTX/JH]={'T'},LogMode={'拜访'},PartnerCategory_Y={"认证客户"},IsPartnerOrUser_Y={'Y','Z'}>} Partner_EndUser_Y) > count(distinct{<[DimensionName]=,${orgStr},Statu={'完成分配'},PartnerCategory={'认证客户'},IsPartnerOrUser={'Y','Z'},[是否拜访]={1}>} Partner_EndUser),count(distinct{<[DimensionName]=,${orgStr},Statu={'完成分配'},PartnerCategory={'认证客户'},IsPartnerOrUser={'Y','Z'},[是否拜访]={1}>} Partner_EndUser),count(distinct{<[DimensionName]={'${time}'},${orgStr},[RZTX/JH]={'T'},LogMode={'拜访'},PartnerCategory_Y={"认证客户"},IsPartnerOrUser_Y={'Y','Z'}>} Partner_EndUser_Y))&'/'& count(distinct{<[DimensionName]=,${orgStr},Statu={'完成分配'},PartnerCategory={"认证客户"},IsPartnerOrUser={'Y','Z'},[是否拜访]={1}>} Partner_EndUser)`,
                `=if(count(distinct{<[DimensionName]={'${time}'},${orgStr},[RZTX/JH]={'T'},LogMode={'拜访'},UserCategory_Y={"战略锁定"},IsPartnerOrUser_Y={'N','Z'}>} Partner_EndUser_Y) > count(distinct{<[DimensionName]=,${orgStr},Statu={'完成分配'},UserCategory={"战略锁定"},IsPartnerOrUser={'N','Z'},[是否拜访]={1}>} Partner_EndUser),count(distinct{<[DimensionName]=,${orgStr},Statu={'完成分配'},UserCategory={"战略锁定"},IsPartnerOrUser={'N','Z'},[是否拜访]={1}>} Partner_EndUser),count(distinct{<[DimensionName]={'${time}'},${orgStr},[RZTX/JH]={'T'},LogMode={'拜访'},UserCategory_Y={"战略锁定"},IsPartnerOrUser_Y={'N','Z'}>} Partner_EndUser_Y))&'/'& count(distinct{<[DimensionName]=,${orgStr},Statu={'完成分配'},UserCategory={"战略锁定"},IsPartnerOrUser={'N','Z'},[是否拜访]={1}>} Partner_EndUser)`,
                `=if(count(distinct{<[DimensionName]={'${time}'},${orgStr},[RZTX/JH]={'T'},LogMode={'拜访'},UserCategory_Y={"核心锁定"},IsPartnerOrUser_Y={'N','Z'}>} Partner_EndUser_Y) > count(distinct{<[DimensionName]=,${orgStr},Statu={'完成分配'},UserCategory={"核心锁定"},IsPartnerOrUser={'N','Z'},[是否拜访]={1}>} Partner_EndUser),count(distinct{<[DimensionName]=,${orgStr},Statu={'完成分配'},UserCategory={"核心锁定"},IsPartnerOrUser={'N','Z'},[是否拜访]={1}>} Partner_EndUser),count(distinct{<[DimensionName]={'${time}'},${orgStr},[RZTX/JH]={'T'},LogMode={'拜访'},UserCategory_Y={"核心锁定"},IsPartnerOrUser_Y={'N','Z'}>} Partner_EndUser_Y))&'/'& count(distinct{<[DimensionName]=,${orgStr},Statu={'完成分配'},UserCategory={"核心锁定"},IsPartnerOrUser={'N','Z'},[是否拜访]={1}>} Partner_EndUser)`,
                `=if(count(distinct{<[DimensionName]={'${time}'},${orgStr},[RZTX/JH]={'T'},LogMode={'拜访'},UserCategory_Y={"市场锁定"},IsPartnerOrUser_Y={'N','Z'}>} Partner_EndUser_Y) > count(distinct{<[DimensionName]=,${orgStr},Statu={'完成分配'},UserCategory={"市场锁定"},IsPartnerOrUser={'N','Z'},[是否拜访]={1}>} Partner_EndUser),count(distinct{<[DimensionName]=,${orgStr},Statu={'完成分配'},UserCategory={"市场锁定"},IsPartnerOrUser={'N','Z'},[是否拜访]={1}>} Partner_EndUser),count(distinct{<[DimensionName]={'${time}'},${orgStr},[RZTX/JH]={'T'},LogMode={'拜访'},UserCategory_Y={"市场锁定"},IsPartnerOrUser_Y={'N','Z'}>} Partner_EndUser_Y))&'/'& count(distinct{<[DimensionName]=,${orgStr},Statu={'完成分配'},UserCategory={"市场锁定"},IsPartnerOrUser={'N','Z'},[是否拜访]={1}>} Partner_EndUser)`,
                `=if(count(distinct{<[DimensionName]={'${time}'},${orgStr},[RZTX/JH]={'T'},LogMode={'拜访'},UserCategory_Y={"重要锁定"},IsPartnerOrUser_Y={'N','Z'}>} Partner_EndUser_Y) > count(distinct{<[DimensionName]=,${orgStr},Statu={'完成分配'},UserCategory={"重要锁定"},IsPartnerOrUser={'N','Z'},[是否拜访]={1}>} Partner_EndUser),count(distinct{<[DimensionName]=,${orgStr},Statu={'完成分配'},UserCategory={"重要锁定"},IsPartnerOrUser={'N','Z'},[是否拜访]={1}>} Partner_EndUser),count(distinct{<[DimensionName]={'${time}'},${orgStr},[RZTX/JH]={'T'},LogMode={'拜访'},UserCategory_Y={"重要锁定"},IsPartnerOrUser_Y={'N','Z'}>} Partner_EndUser_Y))&'/'& count(distinct{<[DimensionName]=,${orgStr},Statu={'完成分配'},UserCategory={"重要锁定"},IsPartnerOrUser={'N','Z'},[是否拜访]={1}>} Partner_EndUser)`
            ]
        },
        visitWarningCollapseA1: {
            qDimensions: [
                `=if(${orgMatch},SalesName_KN)`,
                "DeptName",
                "PartnerCategory_KN"
            ],
            qMeasures: [
                `=count(distinct{<[DimensionName]={'${time}'},${orgStr}>}Partner_KN)`,
                `=count(total <SalesName_KN> distinct{<[DimensionName]={'${time}'},${orgStr}>}Partner_KN)`
            ]
        },
        visitWarningCollapseA2: {
            qDimensions: [
                `=if(${orgMatch},SalesName_KN)`,
                `=if([DimensionName]='${time}' and ${orgMatch}, PartnerName_KN)`,
                "PartnerCategory_KN"
            ],
            qMeasures: [`=sum({<${orgMatch},Year={'$(vYear)'}>}SalesTarget)`]
        },
        visitWarningCollapseB1: {
            qDimensions: [
                `=if(${orgMatch},SalesName_KN)`,
                "DeptName",
                "UserCategory_YN"
            ],
            qMeasures: [
                `=count(distinct{<[DimensionName]={'${time}'},${orgStr}>}User_YN)`,
                `=count(total <SalesName_KN> distinct{<[DimensionName]={'${time}'},${orgStr}>}User_YN)`
            ]
        },
        visitWarningCollapseB2: {
            qDimensions: [
                `=if(${orgMatch},SalesName_KN)`,
                `=if([DimensionName]='${time}' and ${orgMatch}, UserName_YN)`,
                "UserCategory_YN"
            ],
            qMeasures: [`=sum({<${orgMatch},Year={'$(vYear)'}>}SalesTarget)`]
        },
        visitCustomerA: {
            qDimensions: ["=IF(PartnerCategory_Y<>'其他',PartnerCategory_Y)"],
            qMeasures: [
                `=count(distinct {<[DimensionName]={'${time}'},${orgStr},[RZTX/JH]={'T'},IsPartnerOrUser_Y={'Y','Z'},LogMode={'拜访'}>}Partner_EndUser_Y)`,
                `=count(distinct {<[DimensionName]={'${time}'},${orgStr},[RZTX/JH]={'T'},IsPartnerOrUser_Y={'Y','Z'},LogMode={'拜访'}>}LogID)`
            ]
        },
        visitCustomerB: {
            qDimensions: ["=if(UserCategory_Y<>'其他',UserCategory_Y)"],
            qMeasures: [
                `=count(distinct {<[DimensionName]={'${time}'},${orgStr},[RZTX/JH]={'T'},IsPartnerOrUser_Y={'N','Z'},LogMode={'拜访'}>}Partner_EndUser_Y)`,
                `=count(distinct {<[DimensionName]={'${time}'},${orgStr},[RZTX/JH]={'T'},IsPartnerOrUser_Y={'N','Z'},LogMode={'拜访'}>}LogID)`
            ]
        },
        customerDistribution: {
            qDimensions: ["WorkType"],
            qMeasures: [
                `=count(distinct{<[DimensionName]={'${time}'},${orgStr},[RZTX/JH]={'T'},LogMode={'拜访'}>} LogID)/count(total distinct {<[DimensionName]={'${time}'},${orgStr},[RZTX/JH]={'T'},LogMode={'拜访'}>} LogID)`,
                `=count(distinct{<[DimensionName]={'${time}'},${orgStr},[RZTX/JH]={'T'},LogMode={'拜访'}>} LogID)`
            ]
        }
    }
    return formula[name];
}

