define([
  "./../config",
  "./../extends/extIDa",
  "./../extends/extIDb",
  "./../extends/extIDc",
  "./../extends/extIDd",
  "./../extends/extIDe"
], function(config, extIDa, extIDb, extIDc, extIDd, extIDe) {
  return {
    uses: "settings",
    items: {
      general: {
        type: "items",
        label: "General",
        items: {}
      },
      extIDa: extIDa,
      extIDb: extIDb,
      extIDc: extIDc,
      extIDd: extIDd,
      extIDe: extIDe
    }
  };
});
