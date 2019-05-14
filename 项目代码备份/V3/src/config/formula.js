var formula = {
    //当前层级
    currentLevel:{
        qDimensions: [
            "='$(DeptID)'",
            "='-'",
            "='$(Account)'",
            "='$(DomainName)'",
            "='-'",
            "='$(DeptName)'"
        ],
        qMeasures: []
    },
    //组织架构
    organization:{
        qDimensions: [
            "=if(DeptID<>'$(DeptID)',DeptID)",
            "Parent_DeptID",
            "OADAccount",
            "DomainName",
            "Flag",
            "DeptName"
        ],
        qMeasures: ["=sum({<OADAccount=>}1)"]
    },
    summaryCircle: {
        qDimensions: [],
        qMeasures: [
            `=num(count(distinct{<[RZTX/JH]={"J"},WorkPost-={"*总经理*","*总监*","*实习生*","*总裁*"}>} OADAccount)/count(distinct{<WorkPost-={"*总经理*","*总监*","*实习生*","*总裁*"}>}OADAccount)*100,'0.0')`,
            `=num(count(distinct{<[RZTX/JH]={"T"},WorkPost-={"*总经理*","*总监*","*实习生*","*总裁*"}>} OADAccount)/count(distinct{<WorkPost-={"*总经理*","*总监*","*实习生*","*总裁*"}>}OADAccount)*100,'0.0')`,
            `=num(count(distinct {<[RZTX/JH]={'J'},Is_Excute={'Y'}>}PlanID)/count(distinct {<[RZTX/JH]={'J'}>}PlanID)*100,'0.0')`,
            `=num(count({<[RZTX/JH]={'T'},Is_Sign={'Y'},LogMode={'拜访'}>}LogID)/count({<[RZTX/JH]={'T'},LogMode={'拜访'}>}LogID)*100,'0.0')`
        ]
    },
    summaryEasyKPI: {
        qDimensions: [],
        qMeasures: [
            `=count(distinct{<[RZTX/JH]={"J"},WorkPost-={"*总经理*","*总监*","*实习生*","*总裁*"}>} OADAccount)`,
            `=count(distinct{<WorkPost-={"*总经理*","*总监*","*实习生*","*总裁*"}>}OADAccount)`,
            `=count(distinct{<[RZTX/JH]={"T"},WorkPost-={"*总经理*","*总监*","*实习生*","*总裁*"}>} OADAccount)`,
            `=count(distinct{<WorkPost-={"*总经理*","*总监*","*实习生*","*总裁*"}>}OADAccount)`,
            `=count(distinct {<[RZTX/JH]={'J'},Is_Excute={'Y'}>}PlanID)`,
            `=count(distinct {<[RZTX/JH]={'J'}>}PlanID)`,
            `=count({<[RZTX/JH]={'T'},Is_Sign={'Y'},LogMode={'拜访'}>}LogID)`,
            `=count({<[RZTX/JH]={'T'},LogMode={'拜访'}>}LogID)`
        ]
    },
    summaryLineA: {
        qDimensions: ["WeekName"],
        qMeasures: [
            "=count(distinct {<[RZTX/JH]={'T'},DimensionName=,LogMode={'拜访'}>} LogID)"
        ]
    },
    summaryLineB: {
        qDimensions: ["WeekName"],
        qMeasures: [
            "=count(distinct{<[RZTX/JH]={'T'},IsPartnerOrUser_Y={'N','Z'},DimensionName=>}Partner_EndUser_Y)",
            `=count(distinct{<[RZTX/JH]={'T'},IsPartnerOrUser_Y={'Y','Z'},DimensionName=>}Partner_EndUser_Y)`
        ]
    },
    summaryOrgListA:{
        qDimensions: [
            "='$(DomainName)'",
            "='-'"
        ],
        qMeasures: [
            "=sum(1)",
            "=sum(1)",
            "=sum(1)",
            "=count({<[RZTX/JH]={'T'},Is_Sign={'Y'},LogMode={'拜访'}>}LogID)/count({<[RZTX/JH]={'T'},LogMode={'拜访'}>}LogID)",
            "=count(distinct {<[RZTX/JH]={'T'},LogMode={'拜访'}>} LogID)",
            "=count(distinct {<[RZTX/JH]={'J'},Is_Excute={'Y'}>}PlanID)/count(distinct {<[RZTX/JH]={'J'}>}PlanID)"
        ]
    },
    summaryOrgListB: {
        qDimensions: [
            "=DeptName",
            "=if(Parent_DeptID='$(DeptID)',DomainName)"      
        ],
        qMeasures: [
            "=count({<[RZTX/JH]={'T'},Is_Sign={'Y'},LogMode={'拜访'}>}LogID)/count({<[RZTX/JH]={'T'},LogMode={'拜访'}>}LogID)",
            "=count(distinct {<[RZTX/JH]={'T'},LogMode={'拜访'}>} LogID)",
            "=count(distinct {<[RZTX/JH]={'J'},Is_Excute={'Y'}>}PlanID)/count(distinct {<[RZTX/JH]={'J'}>}PlanID)",
            "=count(total <DeptName> {<[RZTX/JH]={'T'},Is_Sign={'Y'},LogMode={'拜访'}>}LogID)/count(total <DeptName> {<[RZTX/JH]={'T'},LogMode={'拜访'}>}LogID)",
            "=count(total <DeptName> distinct {<[RZTX/JH]={'T'},LogMode={'拜访'}>} LogID)",
            "=count(total <DeptName> distinct {<[RZTX/JH]={'J'},Is_Excute={'Y'}>}PlanID)/count(total <DeptName> distinct {<[RZTX/JH]={'J'}>}PlanID)"
        ]
    },
    planExecutionLine: {
        qDimensions: ["WeekName"],
        qMeasures: [
            `=count({<[RZTX/JH]={'J'},Is_Excute={'Y'},DimensionName=>}PlanID)/count({<[RZTX/JH]={'J'},DimensionName=>}PlanID)*100`
        ]
    },
    planExecutionCollapseA: {
        qDimensions: [
            "DomainName",
            "DeptName",
            "=IF(Is_Excute='N' and [RZTX/JH]='J' and Partner_EndUserName_Y<>'' ,Partner_EndUserName_Y)",
            "TaskType",
            "=IF(Is_Excute='N' and [RZTX/JH]='J'and  ( CALDAY>=$(vCurrWeekStart) and CALDAY<=$(vCurrWeekEnd) ),CALDAY)",
            "=if(Is_Excute='N' and [RZTX/JH]='J' ,PlanActive)"
        ],
        qMeasures: ["=sum(total <DomainName> if(Is_Excute='N' and [RZTX/JH]='J' ,1,0))"]
    },
    planExecutionCollapseB: {
        qDimensions: [
            "DomainName",
            "DeptName",
            "=IF(Is_Excute='N' and [RZTX/JH]='J' and Partner_EndUserName_Y<>'' ,Partner_EndUserName_Y)",
            "TaskType",
            "=IF(Is_Excute='N' and [RZTX/JH]='J'and  ( CALDAY>=$(vCurrWeekStart) and CALDAY<=$(vCurrWeekEnd) ),CALDAY)",
            "=if(Is_Excute='N' and [RZTX/JH]='J' ,PlanActive)"
        ],
        qMeasures: ["=if(Is_Excute='N'  and [RZTX/JH]='J' and (CALDAY>=$(vLastWeekStart)and CALDAY<=$(vLastWeekEnd) ) , CALDAY)"]
    },
    visitWarningKPI: {
        qDimensions: [],
        qMeasures: [
            `=count(distinct {<[RZTX/JH]={'T'},LogMode={'拜访'},IsPartnerOrUser_Y={'Y','Z'},PartnerCategory_Y-={'其他'} >}Partner_EndUser_Y)/count(distinct{<Statu={'完成分配'},IsPartnerOrUser={'Y','Z'},PartnerCategory-={'其他'},DimensionName= ,[是否拜访]={1}>}Partner_EndUser)*100`,
            `=count(distinct {<[RZTX/JH]={'T'},LogMode={'拜访'},IsPartnerOrUser_Y={'N','Z'},UserCategory_Y-={'其他'} >}Partner_EndUser_Y)/count(distinct{<Statu={'完成分配'},IsPartnerOrUser={'N','Z'},UserCategory-={'其他'},DimensionName=,[是否拜访]={1}>}Partner_EndUser)*100`,
            `=count(distinct {<[RZTX/JH]={'T'},LogMode={'拜访'},PartnerCategory_Y={"战略客户"},IsPartnerOrUser_Y={'Y','Z'},DimensionName=>} Partner_EndUser_Y) & '/' & count(distinct{<Statu={'完成分配'},IsPartnerOrUser={'Y','Z'},PartnerCategory={'战略客户'},DimensionName= ,[是否拜访]={1}>}Partner_EndUser)`,
            `=count(distinct {<[RZTX/JH]={'T'},LogMode={'拜访'},PartnerCategory_Y={"核心客户"},IsPartnerOrUser_Y={'Y','Z'}>} Partner_EndUser_Y)& '/' & count(distinct{<PartnerCategory={"核心客户"},IsPartnerOrUser={'Y','Z'},DimensionName= ,[是否拜访]={1}>} Partner_EndUser)`,
            `=count(distinct{<[RZTX/JH]={'T'},LogMode={'拜访'},PartnerCategory_Y={"潜力客户"},IsPartnerOrUser_Y={'Y','Z'}>} Partner_EndUser_Y)&'/' & count(distinct{<PartnerCategory={"潜力客户"},IsPartnerOrUser={'Y','Z'},DimensionName=,[是否拜访]={1} >} Partner_EndUser)`,
            `=count(distinct{<[RZTX/JH]={'T'},LogMode={'拜访'},PartnerCategory_Y={"认证客户"},IsPartnerOrUser_Y={'Y','Z'}>} Partner_EndUser_Y)&'/' & count(distinct{<PartnerCategory={"认证客户"},IsPartnerOrUser={'Y','Z'},[是否拜访]={1}>} Partner_EndUser)`,
            `=count(distinct{<[RZTX/JH]={'T'},LogMode={'拜访'},UserCategory_Y={"战略锁定"},IsPartnerOrUser_Y={'N','Z'}>} Partner_EndUser_Y)&'/' & count(distinct{<UserCategory={"战略锁定"},IsPartnerOrUser={'N','Z'},[是否拜访]={1}>} Partner_EndUser)`,
            `=count(distinct{<[RZTX/JH]={'T'},LogMode={'拜访'},UserCategory_Y={"核心锁定"},IsPartnerOrUser_Y={'N','Z'}>} Partner_EndUser_Y)&'/' & count(distinct{<UserCategory={"核心锁定"},IsPartnerOrUser={'N','Z'},[是否拜访]={1}>} Partner_EndUser)`,
            `=count(distinct{<[RZTX/JH]={'T'},LogMode={'拜访'},UserCategory_Y={"市场锁定"},IsPartnerOrUser_Y={'N','Z'}>} Partner_EndUser_Y)&'/' & count(distinct{<UserCategory={"市场锁定"},IsPartnerOrUser={'N','Z'},[是否拜访]={1}>} Partner_EndUser)`,
            `=count(distinct{<[RZTX/JH]={'T'},LogMode={'拜访'},UserCategory_Y={"重要锁定"},IsPartnerOrUser_Y={'N','Z'}>} Partner_EndUser_Y)&'/' & count(distinct{<UserCategory={"重要锁定"},IsPartnerOrUser={'N','Z'},[是否拜访]={1}>} Partner_EndUser)`
        ]
    },
    visitWarningCollapseA1: {
        qDimensions: [
            "DomainName",
            "DeptName",
            "=if(PartnerCategory<>'其他',PartnerCategory)"
        ],
        qMeasures: [
            "=count(distinct{<[是否拜访]={2},IsPartnerOrUser={'Y','Z'}>}Partner_EndUserName)",
            "=count(total <DomainName> distinct{<[是否拜访]={2},IsPartnerOrUser={'Y','Z'}>}Partner_EndUserName)"
        ]
    },
    visitWarningCollapseA2: {
        qDimensions: [
            "DomainName",
            "=if( [是否拜访]='2' and  (IsPartnerOrUser='Y' OR IsPartnerOrUser='Z' ) , Partner_EndUserName )",
            "=if(PartnerCategory<>'其他',PartnerCategory)"
        ],
        qMeasures: ["=sum(1)"]
    },
    visitWarningCollapseB1: {
        qDimensions: [
            "DomainName",
            "DeptName",
            "=if(UserCategory<>'其他',UserCategory)"
        ],
        qMeasures: [
            "=count(distinct{<[是否拜访]={2},IsPartnerOrUser={'N','Z'}>}Partner_EndUserName)",
            "=count(total <DomainName> distinct{<[是否拜访]={2},IsPartnerOrUser={'N','Z'}>}Partner_EndUserName)"
        ]
    },
    visitWarningCollapseB2: {
        qDimensions: [
            "DomainName",
            "=if( 是否拜访='2' and  (IsPartnerOrUser='N' OR IsPartnerOrUser='Z' ) , Partner_EndUserName)",
            "=if(UserCategory<>'其他',UserCategory)"
        ],
        qMeasures: ["=sum(1)"]
    },
    visitCustomerA: {
        qDimensions: ["=IF(PartnerCategory_Y<>'其他',PartnerCategory_Y)"],
        qMeasures: [
            "=count(distinct {<[RZTX/JH]={'T'},IsPartnerOrUser_Y={'Y','Z'},LogMode={'拜访'}>}Partner_EndUser_Y)",
            "=count( distinct{<[RZTX/JH]={'T'},IsPartnerOrUser_Y={'Y','Z'},LogMode={'拜访'}>}LogID)"
        ]
    },
    visitCustomerB: {
        qDimensions: ["=if(UserCategory_Y<>'其他',UserCategory_Y)"],
        qMeasures: [
            "=count(distinct {<[RZTX/JH]={'T'},IsPartnerOrUser_Y={'N','Z'},LogMode={'拜访'}>}Partner_EndUser_Y)",
            "=count( distinct{<[RZTX/JH]={'T'},IsPartnerOrUser_Y={'N','Z'},LogMode={'拜访'}>}LogID)"
        ]
    },
    customerDistribution: {
        qDimensions: ["WorkType"],
        qMeasures: [
            "=count(distinct{<[RZTX/JH]={'T'},LogMode={'拜访'}>} LogID)/count(total distinct {<[RZTX/JH]={'T'},LogMode={'拜访'}>} LogID)",
            "=count(distinct{<[RZTX/JH]={'T'},LogMode={'拜访'}>} LogID)"
        ]
    },
    
}

export default formula;