/** 
 * 向qliksense的APP请求数据时所用的维度指标表达式
 **/ 
export default
    function getFormula(opt) {
    let time = opt.time;
    let org = opt.org;
    let orgManager = opt.orgManager;
    let dataScope = opt.dataScope=='T'?"[group]=":"[group]={'"+opt.dataScope+"'}";
    let name = opt.name;
    let orgStr = "";
    let orgMatch = "";
    // if (org.length > 0) {
    //     orgStr = "[OADAccount]={";
    //     orgMatch = "match([OADAccount],";
    //     $.each(org, (i, v) => {
    //         if (i === org.length - 1) {
    //             orgStr = orgStr + "'" + v + "'}"
    //             orgMatch = orgMatch + "'" + v + "')>0"
    //         } else {
    //             orgStr = orgStr + "'" + v + "',"
    //             orgMatch = orgMatch + "'" + v + "',"
    //         }
    //     });
    // }
    // else {
    //     orgStr = "[OADAccount]=";
    //     orgMatch = "[OADAccount]=[OADAccount]";
    // }
    let formula = {
        'level': {
            qDimensions: [
                `p0n1user`,
                `p0n1level`,
                `p0n1hwflag`
            ],
            qMeasures: [
                `=sum(1)`
            ]
        },
        'org': {
            qDimensions: [
                `p0n2user`,
                `p0n2level`,
                `p0n2org`
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
                `=sum({<${dataScope}>}p1n1_mea1)`,
                `=sum({<${dataScope}>}p1n1_mea2)`,
                `=num(sum({<${dataScope}>}p1n1_mea3)/100,'0%')`,
                `=sum({<${dataScope}>}p1n1_mea4)`,
                `=sum({<${dataScope}>}p1n1_mea5)`,
                `=sum({<${dataScope}>}p1n1_mea6)`,
                `=sum({<${dataScope}>}p1n1_mea7)`,
                `=sum({<${dataScope}>}p1n1_mea8)`,
                `=sum({<${dataScope}>}p1n1_mea9)`,
                `=sum({<${dataScope}>}p1n1_mea10)`,
                `=sum({<${dataScope}>}p1n1_mea11)`,
                `=sum({<${dataScope}>}p1n1_mea12)`,
                `=sum({<${dataScope}>}p1n1_mea13)`,
                `=sum({<${dataScope}>}p1n1_mea14)`,
                `=sum({<${dataScope}>}p1n1_mea15)`,
                `=sum({<${dataScope}>}p1n1_mea16)`,
                `=sum({<${dataScope}>}p1n1_mea17)`,
                `=sum({<${dataScope}>}p1n1_mea18)`,
                `=sum({<${dataScope}>}p1n1_mea19)`,
                `=sum({<${dataScope}>}p1n1_mea20)`,
                `=sum({<${dataScope}>}p1n1_mea21)`,
                `=sum({<${dataScope}>}p1n1_mea22)`,
                `=sum({<${dataScope}>}p1n1_mea23)`,
                `=sum({<${dataScope}>}p1n1_mea24)`,
                `=sum({<${dataScope}>}p1n1_mea25)`,
                `=sum({<${dataScope}>}p1n1_mea26)`,
                `=sum({<${dataScope}>}p1n1_mea27)`,
                `=sum({<${dataScope}>}p1n1_mea28)`,
                `=sum({<${dataScope}>}p1n1_mea29)`,
                `=sum({<${dataScope}>}p1n1_mea30)`,
                `=sum({<${dataScope}>}p1n1_mea31)`,
                `=sum({<${dataScope}>}p1n1_mea32)`,
                `=sum({<${dataScope}>}p1n1_mea33)`
            ]
        },
        
    }
    return formula[name];
}

