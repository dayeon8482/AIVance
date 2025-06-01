import "../src/js/bindings.js";
import "../src/js/dynamic.js";
import "../src/js/normalScrollElements.js";
import "../src/js/resize.js";
import "../src/js/anchors/index.js";
import "../src/js/beyondFullpage/index.js";
import "../src/js/common/scrollTo.js";
import "../src/js/keyboard/index.js";
import "../src/js/menu/index.js";
import "../src/js/nav/index.js";
import "../src/js/scroll/index.js";
import "../src/js/slides/index.js";
import "../src/js/mixed/waterMark.js";
import "../src/js/mixed/index.min.js";
import "../src/js/scroll/skipIntermediateItems.js";

import * as utils from "../src/js/common/utils.js";
import { setOptions, setOption, getOptions } from "../src/js/common/options.js";
import { setContainer, getContainer } from "../src/js/common/options.js";
import { init } from "../src/js/instance.js";
import { FP, win } from "../src/js/common/constants.js";
import { $html, setCache } from "../src/js/common/cache.js";
import { displayWarnings } from "../src/js/console.js";
import { ENABLED } from "../src/js/common/selectors.js";
import { EventEmitter } from "../src/js/common/eventEmitter.js";
import { events } from "../src/js/common/events.js";
import { setState } from "../src/js/common/state.js";

export default function fullpage(containerSelector, options) {
  setCache();

  //only once my friend!
  if (utils.hasClass($html, ENABLED)) {
    displayWarnings();
    return;
  }

  setOption(
    "touchWrapper",
    typeof containerSelector === "string"
      ? utils.$(containerSelector)[0]
      : containerSelector
  );

  // Creating some defaults, extending them with any options that were provided
  setOptions(options);

  setContainer(
    typeof containerSelector === "string"
      ? utils.$(containerSelector)[0]
      : containerSelector
  );

  EventEmitter.emit(events.onInitialise);

  displayWarnings();

  setAPI();

  if (getContainer()) {
    EventEmitter.emit(events.beforeInit);
    init();
    EventEmitter.emit(events.bindEvents);
  }

  setState({ isFullpageInitDone: true });

  // @ts-ignore
  return win.fullpage_api;
}

function setAPI() {
  FP.getFullpageData = function () {
    return {
      options: getOptions(),
    };
  };

  //public functions
  FP.version = "4.0.35";

  FP.test = Object.assign(FP.test, {
    top: "0px",
    translate3d: "translate3d(0px, 0px, 0px)",
    translate3dH: (function () {
      var a = [];
      for (
        var i = 0;
        i < utils.$(getOptions().sectionSelector, getContainer()).length;
        i++
      ) {
        a.push("translate3d(0px, 0px, 0px)");
      }
      return a;
    })(),
    left: (function () {
      var a = [];
      for (
        var i = 0;
        i < utils.$(getOptions().sectionSelector, getContainer()).length;
        i++
      ) {
        a.push(0);
      }
      return a;
    })(),
    options: getOptions(),
    setAutoScrolling: null,
  });

  //functions we want to share across files but which are not
  //mean to be used on their own by developers
  FP.shared = Object.assign(FP.shared, {
    afterRenderActions: null,
    isNormalScrollElement: false,
  });

  // @ts-ignore
  win.fullpage_api = FP;
}
