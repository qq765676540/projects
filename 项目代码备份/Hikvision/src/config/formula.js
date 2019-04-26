var formula = {
    summaryCircle: {
        qDimensions: [],
        qMeasures: [
            `=num(count({<[RZTX/JH]={"J"},WorkPost-={"*总经理*","*总监*","*实习生*","*总裁*"}>} OADAccount)/count({<WorkPost-={"*总经理*","*总监*","*实习生*","*总裁*"}>}OADAccount)*100,'0.0')`,
            `=num(count({<[RZTX/JH]={"T"},WorkPost-={"*总经理*","*总监*","*实习生*","*总裁*"}>} OADAccount)/count({<WorkPost-={"*总经理*","*总监*","*实习生*","*总裁*"}>}OADAccount)*100,'0.0')`,
            `=num(count({<[RZTX/JH]={'J'},Is_Excute={'Y'}>}PlanID)/count({<[RZTX/JH]={'J'}>}PlanID)*100,'0.0')`,
            `=num(count({<[RZTX/JH]={'T'},Is_Sign={'Y'}>}LogID)/count({<[RZTX/JH]={'T'}>}LogID)*100,'0.0')`
        ]
    },
    summaryEasyKPI: {
        qDimensions: [],
        qMeasures: [
            `=count({<[RZTX/JH]={"J"},WorkPost-={"*总经理*","*总监*","*实习生*","*总裁*"}>} OADAccount)`,
            `=count({<WorkPost-={"*总经理*","*总监*","*实习生*","*总裁*"}>}OADAccount)`,
            `=count({<[RZTX/JH]={"T"},WorkPost-={"*总经理*","*总监*","*实习生*","*总裁*"}>} OADAccount)`,
            `=count({<WorkPost-={"*总经理*","*总监*","*实习生*","*总裁*"}>}OADAccount)`,
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
    planExecutionLine: {
        qDimensions: ["WeekName"],
        qMeasures: [
            `=count({<[RZTX/JH]={'J'},Is_Excute={'Y'},DimensionName=>}PlanID)/count({<[RZTX/JH]={'J'},DimensionName=>}PlanID)*100`
        ]
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
    }
}

export default formula;