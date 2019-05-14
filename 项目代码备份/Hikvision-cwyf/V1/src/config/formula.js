/* eslint-disable */
export default 
function getFormula(name, params) {// eslint-disable-next-line
    var formula = {
        measure_1: {
            qMeasures: [
                [`=Sum([Actual Amount])`, '度量1'],
                [`=Sum([Actual Amount])`, '度量2'],
                [`=Sum([Actual Amount])`, '度量3'],
            ]
        },
        measure_2: {
            qDimensions: ['City'],
            qMeasures: [
                `=Sum([Actual Amount])`
            ]
        },
        measure_3: {
            qDimensions: [params[0]],
            qMeasures: [
                `=Sum([Actual Amount])`
            ]
        },
        measure_4: {
            qDimensions: [params[0]],
            qMeasures: [
                `=Sum([Actual Amount])`
            ]
        }
    }
    return formula[name];
}
