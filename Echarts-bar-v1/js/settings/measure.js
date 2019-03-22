define(["./../config"],
    function (config) {
        return {
            meaSettingsDef_1: {
                type: 'string',
                component: 'expression',
                label: '设置柱形颜色',
                ref: config.refDefs.measureJs[0]
            }
        };
    });