import { r as reactExports, j as jsxRuntimeExports, a as addHmrIntoView, c as createRoot } from "../../../assets/js/_virtual_reload-on-update-in-view.js";
import { w as withErrorBoundary, a as withSuspense, u as useStorage } from "../../../assets/js/withErrorBoundary.js";
import { e as exampleThemeStorage } from "../../../assets/js/exampleThemeStorage.js";
const extIcon = "/assets/png/ext_icon.chunk.png";
const Switch = ({}) => {
  const [isChecked, setIsChecked] = reactExports.useState(true);
  const onClickSwitch = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsChecked(!isChecked);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", id: "switch", checked: isChecked }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("label", { onClick: (e) => onClickSwitch(e), htmlFor: "switch" })
  ] });
};
const Popup = () => {
  useStorage(exampleThemeStorage);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "App",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "App-header", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: extIcon, className: "App-logo", alt: "logo" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Switch, {})
      ] })
    }
  );
};
const Popup$1 = withErrorBoundary(withSuspense(Popup, /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: " Loading ... " })), /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: " Error Occur " }));
addHmrIntoView("pages/popup");
function init() {
  const appContainer = document.querySelector("#app-container");
  if (!appContainer) {
    throw new Error("Can not find #app-container");
  }
  const root = createRoot(appContainer);
  root.render(/* @__PURE__ */ jsxRuntimeExports.jsx(Popup$1, {}));
}
init();
