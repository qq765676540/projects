define(["./../config"],
    function (config) {
        return {
            meaSettingsDef_1: {
                type: 'string',
                component: 'expression',
                label: '设置柱形颜色',
                ref: config.refDefs.measureJs[0]
            },
            meaSettingsDef_2: {
                type: 'string',
                label: '设置柱形透明度',
                ref: config.refDefs.measureJs[1],
                defaultValue: "1"
            }
        };
    });