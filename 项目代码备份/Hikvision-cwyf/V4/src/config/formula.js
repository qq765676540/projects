/** 
 * 向qliksense的APP请求数据时所用的维度指标表达式
 **/
export default
    function getFormula(opt) {
    let time = opt.time;
    let org = opt.org;
    let orgManager = opt.orgManager;
    let dataScope = opt.dataScope == 'T' ? "[group]=" : "[group]={'" + (opt.dataScope == 'I' ? '国内' : '海外') + "'}";
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
                `=sum({<${dataScope}>}p1n1_r_kpi_1_1)`,
                `=sum({<${dataScope}>}p1n1_r_kpi_1_2)`,
                `=sum({<${dataScope}>}p1n1_r_kpi_1_3)`,
                `=sum({<${dataScope}>}p1n1_r_kpi_2_1)`,
                `=sum({<${dataScope}>}p1n1_r_kpi_2_2)`,
                `=sum({<${dataScope}>}p1n1_r_kpi_2_3)`,
                `=sum({<${dataScope}>}p1n1_r_kpi_3_1)`,
                `=sum({<${dataScope}>}p1n1_r_kpi_3_2)`,
                `=sum({<${dataScope}>}p1n1_r_kpi_3_3)`,
                `=sum({<${dataScope}>}p1n1_r_kpi_4_1)`,
                `=sum({<${dataScope}>}p1n1_r_kpi_4_2)`,
                `=sum({<${dataScope}>}p1n1_r_kpi_4_3)`,
                `=sum({<${dataScope}>}p1n1_r_kpi_5_1)`,
                `=sum({<${dataScope}>}p1n1_r_kpi_5_2)`,
                `=sum({<${dataScope}>}p1n1_r_kpi_5_3)`,
                `=sum({<${dataScope}>}p1n1_r_kpi_6_1)`,
                `=sum({<${dataScope}>}p1n1_r_kpi_6_2)`,
                `=sum({<${dataScope}>}p1n1_r_kpi_6_3)`,
                `=sum({<${dataScope}>}p1n1_r_kpi_7_1)`,
                `=sum({<${dataScope}>}p1n1_r_kpi_7_2)`,
                `=sum({<${dataScope}>}p1n1_r_kpi_7_3)`,
                `=sum({<${dataScope}>}p1n1_r_kpi_8_1)`,
                `=sum({<${dataScope}>}p1n1_r_kpi_8_2)`,
                `=sum({<${dataScope}>}p1n1_r_kpi_8_3)`,
                `=sum({<${dataScope}>}p1n1_u_kpi_1_1)`,
                `=sum({<${dataScope}>}p1n1_u_kpi_1_2)`,
                `=sum({<${dataScope}>}p1n1_u_kpi_1_3)`,
                `=sum({<${dataScope}>}p1n1_u_kpi_2_1)`,
                `=sum({<${dataScope}>}p1n1_u_kpi_2_2)`,
                `=sum({<${dataScope}>}p1n1_u_kpi_2_3)`,
                `=sum({<${dataScope}>}p1n1_u_kpi_3_1)`,
                `=sum({<${dataScope}>}p1n1_u_kpi_3_2)`,
                `=sum({<${dataScope}>}p1n1_u_kpi_3_3)`,
                `=sum({<${dataScope}>}p1n1_u_kpi_4_1)`,
                `=sum({<${dataScope}>}p1n1_u_kpi_4_2)`,
                `=sum({<${dataScope}>}p1n1_u_kpi_4_3)`,
                `=sum({<${dataScope}>}p1n1_u_kpi_5_1)`,
                `=sum({<${dataScope}>}p1n1_u_kpi_5_2)`,
                `=sum({<${dataScope}>}p1n1_u_kpi_5_3)`,
                `=sum({<${dataScope}>}p1n1_u_kpi_6_1)`,
                `=sum({<${dataScope}>}p1n1_u_kpi_6_2)`,
                `=sum({<${dataScope}>}p1n1_u_kpi_6_3)`,
                `=sum({<${dataScope}>}p1n1_u_kpi_7_1)`,
                `=sum({<${dataScope}>}p1n1_u_kpi_7_2)`,
                `=sum({<${dataScope}>}p1n1_u_kpi_7_3)`,
                `=sum({<${dataScope}>}p1n1_u_kpi_8_1)`,
                `=sum({<${dataScope}>}p1n1_u_kpi_8_2)`,
                `=sum({<${dataScope}>}p1n1_u_kpi_8_3)`
            ]
        },
        'income-bp': {
            qDimensions: [
                `p2n1dim1`,
                `p2n1dim2`
            ],
            qMeasures: [
                `=sum(p2n1mea1)`,
                `=sum(p2n1mea2)`,
                `=sum(p2n1mea3)`,
                `=sum(p2n1mea4)`,
                `=sum(p2n1mea5)`,
                `=sum(p2n1mea6)`,
                `=sum(total <p2n1dim1> p2n1mea1)`,
                `=sum(total <p2n1dim1> p2n1mea2)`,
                `=sum(total <p2n1dim1> p2n1mea3)`,
                `=sum(total <p2n1dim1> p2n1mea4)`,
                `=sum(total <p2n1dim1> p2n1mea5)`,
                `=sum(total <p2n1dim1> p2n1mea6)`
            ]
        },
        'income-structure-bar': {
            qDimensions: [
                `p2n2dim1`,
                `p2n2dim2`
            ],
            qMeasures: [
                `=sum(p2n2mea1)`,
                `=sum(p2n2mea2)`,
                `=sum(p2n2mea3)`,
                `=sum(p2n2mea4)`,
                `=sum(total <p2n2dim1> p2n2mea1)`,
                `=sum(total <p2n2dim1> p2n2mea2)`,
                `=sum(total <p2n2dim1> p2n2mea3)`,
                `=sum(total <p2n2dim1> p2n2mea4)`,
                `=sum(p2n2mea5)`,
                `=sum(p2n2mea6)`,
                `=sum(total <p2n2dim1> p2n2mea5)`,
                `=sum(total <p2n2dim1> p2n2mea6)`
            ]
        },
        'income-branch': {
            qDimensions: [
                `p2n3dim1`
            ],
            qMeasures: [
                `=sum(p2n3mea1)`,
                `=sum(p2n3mea2)`,
                `=sum(p2n3mea3)`,
                `=sum(p2n3mea4)`,
                `=sum(p2n3mea5)`,
                `=sum(p2n3mea6)`
            ]
        },
        'income-trend': {
            qDimensions: [
                `p2n4dim1`,
                `p2n4dim2`
            ],
            qMeasures: [
                `=sum(p2n4mea1)`,
                `=sum(p2n4mea2)`,
                `=sum(p2n4mea3)`
            ]
        },
        'gross-bp': {
            qDimensions: [
                `p3n1dim1`
            ],
            qMeasures: [
                `=sum(p3n1mea1)`,
                `=sum(p3n1mea2)`,
                `=sum(p3n1mea3)`,
                `=sum(p3n1mea4)`,
                `=sum(p3n1mea5)`,
                `=sum(p3n1mea6)`
            ]
        },
        'gross-deduction': {
            qDimensions: [
                `p3n2dim1`
            ],
            qMeasures: [
                `=sum(p3n2mea1)`,
                `=sum(p3n2mea2)`,
                `=sum(p3n2mea3)`,
                `=sum(p3n2mea4)`,
                `=sum(p3n2mea5)`,
                `=sum(p3n2mea6)`
            ]
        },
        'cost-rate': {
            qDimensions: [
                `p4n1dim1`,
                `p4n1dim2`
            ],
            qMeasures: [
                `=sum(p4n1mea1)`,
                `=sum(p4n1mea2)`,
                `=sum(p4n1mea3)`,
                `=sum(p4n1mea4)`
            ]
        },
        'cost-rateTotal': {
            qDimensions: [
                `='费用合计'`,
                `p4n1dim2`
            ],
            qMeasures: [
                `=sum(p4n1mea1)`,
                `=sum(p4n1mea2)`,
                `=sum(p4n1mea3)`,
                `=sum(p4n1mea4)`
            ]
        },
    }
    return formula[name];
}

