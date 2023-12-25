import { j as jsxRuntimeExports, a as addHmrIntoView, c as createRoot } from "../../../assets/js/_virtual_reload-on-update-in-view.js";
import { l as logo } from "../../../assets/js/logo.js";
import { w as withErrorBoundary, a as withSuspense } from "../../../assets/js/withErrorBoundary.js";
const SidePanel = () => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "App",
      style: {
        // backgroundColor: theme === 'light' ? '#fff' : '#000',
      },
      children: /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "App-header", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: logo, className: "App-logo", alt: "logo" }) })
    }
  );
};
const SidePanel$1 = withErrorBoundary(withSuspense(SidePanel, /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: " Loading ... " })), /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: " Error Occur " }));
addHmrIntoView("pages/sidepanel");
function init() {
  const appContainer = document.querySelector("#app-container");
  if (!appContainer) {
    throw new Error("Can not find #app-container");
  }
  const root = createRoot(appContainer);
  root.render(/* @__PURE__ */ jsxRuntimeExports.jsx(SidePanel$1, {}));
}
init();
