export default
    function getFormula(opt) {
    let name= opt.name;
    var formula = {
        currentLevel: {
            qDimensions: [
                "='$(DeptID)'",
                "='-'",
                "='$(Account)'",
                "='$(DomainName)'",
                "='-'",
                "='$(DeptName)'",
                "='0000'"
            ],
            qMeasures: ["=sum(1)"]
        },
        organization: {
            qDimensions: [
                "DeptID",
                "Parent_DeptID",
                "OADAccount",
                "DomainName",
                "='0'&Flag",
                "DeptName",
                "DeptSort"
            ],
            qMeasures: ["=sum(1)"]
        },
        summaryCircle: {
            qDimensions: [],
            qMeasures: [
                `=sum(填写计划率)`,
                `=sum(工作记录填写率)`,
                `=sum(计划执行率)`,
                `=sum(有效拜访率)`
            ]
        },
        summaryEasyKPI: {
            qDimensions: [],
            qMeasures: [
                `=sum(p11指标1)`,
                `=sum(p11指标2)`,
                `=sum(p11指标3)`,
                `=sum(p11指标4)`,
                `=sum(p11指标5)`,
                `=sum(p11指标6)`,
                `=sum(p11指标7)`,
                `=sum(p11指标8)`
            ]
        },
        summaryOrgListA: {
            qDimensions: [
                "='$(DomainName)'",
                "='$(DeptID)'",
                "=if(match(mid('$(DeptID)',1,3),'1-1','1-2')>0,'Y','N')",
            ],
            qMeasures: [
                "=sum(0.55)",
                "=sum(55)",
                "=sum(0.55)"
            ]
        },
        summaryOrgListB: {
            qDimensions: [
                "=if(match(mid('$(DeptID)',1,3),'1-1','1-2')>0,if(DeptID<>'$(DeptID)',DeptID),'maxlevel')",
                "=if(match(mid('$(DeptID)',1,3),'1-1','1-2')>0,if(DeptID<>'$(DeptID)',Parent_DeptID),'-')",
                "=DeptSort",
                "=DeptName",
                "=DomainName",
                "=OADAccount",
                "=Flag"
            ],
            qMeasures: [
                "=sum(mea1)",
                "=sum(mea1)",
                "=sum(mea1)",
                "=sum(total <DeptName> mea1)",
                "=sum(total <DeptName> mea1)",
                "=sum(total <DeptName> mea1)",
            ]
        },
        summaryOrgListC: {
            qDimensions: [    
                "=ACCOUNT_EXT"
            ],
            qMeasures: [
                "=sum(p01mea1)",
                "=sum(p01mea2)",
                "=sum(p01mea3)",
                "=sum(1)"
            ]
        },
        summaryLineA: {
            qDimensions: ["p12周"],
            qMeasures: [
                `=sum(p12指标1)`
            ]
        },
        summaryLineB: {
            qDimensions: ["p12周"],
            qMeasures: [
                `=sum(p12指标1)`,
                `=sum(p12指标2)`
            ]
        },
        planExecutionLine: {
            qDimensions: ["p20周"],
            qMeasures: [
                "=sum(p20指标1)"
            ]
        },
        planExecutionCollapseA: {
            qDimensions: [
                "p21维度1",
                "p21维度2",
                "p21维度3",
                "p21维度4",
                "p21维度5",
                "p21维度6"
            ],
            qMeasures: ["=sum(p21指标1)"]
        },
        planExecutionCollapseB: {
            qDimensions: [
                "p21维度1",
                "p21维度2",
                "p21维度3",
                "p21维度4",
                "p21维度5",
                "p21维度6"
            ],
            qMeasures: ["=sum(p21指标1)"]
        },
        visitWarningKPI: {
            qDimensions: [],
            qMeasures: [
                "=sum(p30指标1)",
                "=sum(p30指标2)",
                "=if(sum(p30指标3)-sum(p30指标4)<=0,sum(p30指标3)&'/'&sum(p30指标4),sum(p30指标3)&'/'&sum(p30指标3))",
                "=if(sum(p30指标3)-sum(p30指标4)<=0,sum(p30指标3)&'/'&sum(p30指标4),sum(p30指标3)&'/'&sum(p30指标3))",
                "=if(sum(p30指标3)-sum(p30指标4)<=0,sum(p30指标3)&'/'&sum(p30指标4),sum(p30指标3)&'/'&sum(p30指标3))",
                "=if(sum(p30指标3)-sum(p30指标4)<=0,sum(p30指标3)&'/'&sum(p30指标4),sum(p30指标3)&'/'&sum(p30指标3))",
                "=sum(p30指标3)&'/'&sum(p30指标4)",
                "=sum(p30指标3)&'/'&sum(p30指标4)",
                "=sum(p30指标3)&'/'&sum(p30指标4)",
                "=sum(p30指标3)&'/'&sum(p30指标4)"
            ]
        },
        visitWarningCollapseA1: {
            qDimensions: [
                "p31维度1",
                "p31维度2",
                "p31维度3"
            ],
            qMeasures: ["=sum(p31指标1)", "=sum(p31指标2)"]
        },
        visitWarningCollapseA2: {
            qDimensions: [
                "p32维度1",
                "p32维度2",
                "p32维度3"
            ],
            qMeasures: ["=sum(p32指标1)"]
        },
        visitWarningCollapseB1: {
            qDimensions: [
                "p31维度1",
                "p31维度2",
                "p31维度3"
            ],
            qMeasures: ["=sum(p31指标1)", "=sum(p31指标2)"]
        },
        visitWarningCollapseB2: {
            qDimensions: [
                "p32维度1",
                "p32维度2",
                "p32维度3"
            ],
            qMeasures: ["=sum(1)"]
        },
        visitCustomerA: {
            qDimensions: ["p40维度1"],
            qMeasures: [
                "=sum(p40指标1)",
                "=sum(p40指标2)"
            ]
        },
        visitCustomerB: {
            qDimensions: ["p40维度1"],
            qMeasures: [
                "=sum(p40指标1)",
                "=sum(p40指标2)"
            ]
        },
        customerDistribution: {
            qDimensions: ["p50维度1"],
            qMeasures: [
                "=sum(p50指标1)",
                "=sum(p50指标2)"
            ]
        },
    }

    return formula[name];

}