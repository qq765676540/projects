define([
  "./conf00",
  "./conf01",
  "./conf02",
  "./conf03",
  "./conf04"
], function (conf00, conf01, conf02, conf03, conf04) {
  return {
    type: "items",
    component: "accordion",
    items: {
      conf00: conf00,
      conf01: conf01,
      conf02: conf02,
      conf03: conf03,
      conf04: conf04
    }
  };
});
