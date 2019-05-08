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
            "DeptID",
            "Parent_DeptID",
            "OADAccount",
            "DomainName",
            "Flag",
            "DeptName"
        ],
        qMeasures: ["=sum(1)"]
    },
    summaryCircle: {
        qDimensions: [],
        qMeasures: [
            `=num(count({<[RZTX/JH]={"J"},WorkPost-={"*总经理*","*总监*","*实习生*","*总裁*"}>} OADAccount)/count({<WorkPost-={"*总经理*","*总监*","*实习生*","*总裁*"}>} OADAccount)*100,'0.0')`,
            `=num(count({<[RZTX/JH]={"T"},WorkPost-={"*总经理*","*总监*","*实习生*","*总裁*"}>} OADAccount)/count({<WorkPost-={"*总经理*","*总监*","*实习生*","*总裁*"}>} OADAccount)*100,'0.0')`,
            `=num(count({<[RZTX/JH]={'J'},Is_Excute={'Y'}>}PlanID)/count({<[RZTX/JH]={'J'}>}PlanID)*100,'0.0')`,
            `=num(count({<[RZTX/JH]={'T'},Is_Sign={'Y'}>}LogID)/count({<[RZTX/JH]={'T'}>}LogID)*100,'0.0')`
        ]
    },
    summaryEasyKPI: {
        qDimensions: [],
        qMeasures: [
            `=count({<[RZTX/JH]={"J"},WorkPost-={"*总经理*","*总监*","*实习生*","*总裁*"}>} OADAccount)`,
            `=count({<WorkPost-={"*总经理*","*总监*","*实习生*","*总裁*"}>} OADAccount)`,
            `=count({<[RZTX/JH]={"T"},WorkPost-={"*总经理*","*总监*","*实习生*","*总裁*"}>} OADAccount)`,
            `=count({<WorkPost-={"*总经理*","*总监*","*实习生*","*总裁*"}>} OADAccount)`,
            `=count({<[RZTX/JH]={'J'},Is_Excute={'Y'}>}PlanID)`,
            `=count({<[RZTX/JH]={'J'}>}PlanID)`,
            `=count({<[RZTX/JH]={'T'},Is_Sign={'Y'}>}LogID)`,
            `=count({<[RZTX/JH]={'T'}>}LogID)`
        ]
    },
    summaryLineA: {
        qDimensions: ["WeekName"],
        qMeasures: [
            "=count({<[RZTX/JH]={'T'},DimensionName=>} LogID)"
        ]
    },
    summaryLineB: {
        qDimensions: ["WeekName"],
        qMeasures: [
            "=count({<[RZTX/JH]={'T'},IsPartnerOrUser={'N'},DimensionName=>}Partner_EndUser)",
            `=count({<[RZTX/JH]={'T'},IsPartnerOrUser={'Y'},DimensionName=>}Partner_EndUser)`
        ]
    },
    summaryOrgList: {
        qDimensions: [
            // "=$(selfLevel)"
            "=$(firstLevel)",
            "=$(nextLevel)"
        ],
        qMeasures: [
            "=count({<[RZTX/JH]={'T'},Is_Sign={'Y'}>}LogID)/count({<[RZTX/JH]={'T'}>}LogID)",
            "=count({<[RZTX/JH]={'T'}>}LogID)",
            "=count({<[RZTX/JH]={'J'},Is_Excute={'Y'}>}PlanID)/count({<[RZTX/JH]={'J'}>}PlanID)",
            "=count(total <[$(firstLevel)]> {<[RZTX/JH]={'T'},Is_Sign={'Y'}>}LogID)/count(total <[$(firstLevel)]>{<[RZTX/JH]={'T'}>}LogID)",
            "=count(total <[$(firstLevel)]> {<[RZTX/JH]={'T'}>} LogID)",
            "=count(total <[$(firstLevel)]> {<[RZTX/JH]={'J'},Is_Excute={'Y'}>}PlanID)/count(total <[$(firstLevel)]> {<[RZTX/JH]={'J'}>}PlanID)"
        ]
    },
    planExecutionLine: {
        qDimensions: ["WeekName"],
        qMeasures: [
            `=count({<[RZTX/JH]={'J'},Is_Excute={'Y'},DimensionName=>}PlanID)/count({<[RZTX/JH]={'J'},DimensionName=>}PlanID)*100`
        ]
    },
    planExecutionCollapseA: {
        qDimensions: ["=IF(DimensionName='本周' and Is_Excute='N' and [RZTX/JH]='J' ,PUDescribe)",
                      "TaskType",
                      "=if(Is_Excute='N' and [RZTX/JH]='J' ,PlanActive)",
                      "=IF(DimensionName='本周' and Is_Excute='N' and [RZTX/JH]='J' ,CALDAY)"],
        qMeasures: ["=sum({<DimensionName=>}1)"]
    },
    planExecutionCollapseB: {
        qDimensions: ["=IF(DimensionName='上周' and Is_Excute='N' and [RZTX/JH]='J',PUDescribe)",
                      "=IF(DimensionName='上周' and Is_Excute='N' and [RZTX/JH]='J',TaskType)",
                      "=IF(DimensionName='上周' and Is_Excute='N' and [RZTX/JH]='J',PlanActive)",
                      "=IF(DimensionName='上周' and Is_Excute='N' and [RZTX/JH]='J',CALDAY)"
                     ],
        qMeasures: ["=sum({<DimensionName=>}1)"]
    },
    visitWarningKPI: {
        qDimensions: [],
        qMeasures: [
            `=count({<[RZTX/JH]={'T'},LogMode={'拜访'},IsPartnerOrUser={'Y','Z'}>}Partner_EndUser)/count({<Statu={'完成分配'},IsPartnerOrUser={'Y','Z'}>}Partner_EndUser)*100`,
            `=count({<[RZTX/JH]={'T'},LogMode={'拜访'},IsPartnerOrUser={'N','Z'}>}Partner_EndUser)/count({<Statu={'完成分配'},IsPartnerOrUser={'N','Z'}>}Partner_EndUser)*100`,
            `=count({<[RZTX/JH]={'T'},LogMode={'拜访'},PartnerCategory={"战略客户"},IsPartnerOrUser={'Y','Z'}>} Partner_EndUser)&'/' & count({<PartnerCategory={"战略客户"},IsPartnerOrUser={'Y','Z'}>} Partner_EndUser)`,
            `=count({<[RZTX/JH]={'T'},LogMode={'拜访'},PartnerCategory={"核心客户"},IsPartnerOrUser={'Y','Z'}>} Partner_EndUser)&'/' & count({<PartnerCategory={"核心客户"},IsPartnerOrUser={'Y','Z'}>} Partner_EndUser)`,
            `=count({<[RZTX/JH]={'T'},LogMode={'拜访'},PartnerCategory={"潜力客户"},IsPartnerOrUser={'Y','Z'}>} Partner_EndUser)&'/' & count({<PartnerCategory={"潜力客户"},IsPartnerOrUser={'Y','Z'}>} Partner_EndUser)`,
            `=count({<[RZTX/JH]={'T'},LogMode={'拜访'},PartnerCategory={"认证客户"},IsPartnerOrUser={'Y','Z'}>} Partner_EndUser)&'/' & count({<PartnerCategory={"认证客户"},IsPartnerOrUser={'Y','Z'}>} Partner_EndUser)`,
            `=count({<[RZTX/JH]={'T'},LogMode={'拜访'},UserCategory={"战略锁定"},IsPartnerOrUser={'N','Z'}>} Partner_EndUser)&'/' & count({<UserCategory={"战略锁定"},IsPartnerOrUser={'N','Z'}>} Partner_EndUser)`,
            `=count({<[RZTX/JH]={'T'},LogMode={'拜访'},UserCategory={"核心锁定"},IsPartnerOrUser={'N','Z'}>} Partner_EndUser)&'/' & count({<UserCategory={"核心锁定"},IsPartnerOrUser={'N','Z'}>} Partner_EndUser)`,
            `=count({<[RZTX/JH]={'T'},LogMode={'拜访'},UserCategory={"市场锁定"},IsPartnerOrUser={'N','Z'}>} Partner_EndUser)&'/' & count({<UserCategory={"市场锁定"},IsPartnerOrUser={'N','Z'}>} Partner_EndUser)`,
            `=count({<[RZTX/JH]={'T'},LogMode={'拜访'},UserCategory={"重要锁定"},IsPartnerOrUser={'N','Z'}>} Partner_EndUser)&'/' & count({<UserCategory={"重要锁定"},IsPartnerOrUser={'N','Z'}>} Partner_EndUser)`
        ]
    },
    visitWarningTableA: {
        qDimensions: ["PartnerCategory", "SOADAccount" ,"=if( [RZTX/JH]<>'T'and  (IsPartnerOrUser='Y' OR IsPartnerOrUser='Z' ) , DomainName )"],
        qMeasures: [`=sum({<Year={$(vYear)}>}SalesTarget)`]
    },
    visitWarningTableB: {
        qDimensions: ["UserCategory", "SOADAccount", "=if( [RZTX/JH]<>'T'and  (IsPartnerOrUser='N' OR IsPartnerOrUser='Z' ) , DomainName)"],
        qMeasures: [
            `=sum({<Year={$(vYear)}>}SalesTarget)`
        ]
    },
    visitCustomerA: {
        qDimensions: ["PartnerCategory"],
        qMeasures: ["=count(distinct {<[RZTX/JH]={'T'},IsPartnerOrUser={'Y','Z'},LogMode={'拜访'}>}Partner_EndUser)",
                    "=count({<[RZTX/JH]={'T'},IsPartnerOrUser={'Y','Z'},LogMode={'拜访'}>}LogID)"
        ]
    },
    visitCustomerB: {
        qDimensions: ["UserCategory"],
        qMeasures: [
            "=count(distinct {<[RZTX/JH]={'T'},IsPartnerOrUser={'N','Z'},LogMode={'拜访'}>}Partner_EndUser)",
            "=count({<[RZTX/JH]={'T'},IsPartnerOrUser={'Y','Z'},LogMode={'拜访'}>}LogID)"
        ]
    },
    customerDistribution: {
        qDimensions: ["WorkType"],
        qMeasures: [
            "=count({<[RZTX/JH]={'T'},LogMode={'拜访'}>} LogID)/count(total {<[RZTX/JH]={'T'},LogMode={'拜访'}>} LogID)",
            "=count({<[RZTX/JH]={'T'},LogMode={'拜访'}>} LogID)"
        ]
    },
    
}

export default formula;