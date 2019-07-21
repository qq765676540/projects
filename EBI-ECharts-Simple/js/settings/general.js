define([
  "./../config",
  "./../extends/extIDa",
  "./../extends/extIDb",
  "./../extends/extIDc",
  "./../extends/extIDd"
], function(config, extIDa, extIDb, extIDc, extIDd) {
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
      extIDd: extIDd
    }
  };
});
