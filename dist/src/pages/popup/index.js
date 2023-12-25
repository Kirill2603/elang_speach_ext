import { j as jsxRuntimeExports, r as reactExports, a as addHmrIntoView, c as createRoot } from "../../../assets/js/_virtual_reload-on-update-in-view.js";
import { u as useStorage, e as extensionStorage } from "../../../assets/js/extensionStorage.js";
import { w as withErrorBoundary, a as withSuspense } from "../../../assets/js/withErrorBoundary.js";
const extIcon = "/assets/png/ext_icon.chunk.png";
const Switch = ({ isChecked, toggleSwitch }) => {
  const onClickSwitch = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleSwitch();
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", id: "switch", checked: isChecked }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("label", { onClick: (e) => onClickSwitch(e), htmlFor: "switch" })
  ] });
};
const Popup = () => {
  const { extensionEnabled } = useStorage(extensionStorage);
  const [isExtensionON, toggleExtension] = reactExports.useState(extensionEnabled);
  const onToggleExtension = () => {
    toggleExtension(!isExtensionON);
    extensionStorage.toggleExtension(!isExtensionON);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "App", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "App-header", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "LogoContainer", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: extIcon, className: "App-logo", alt: "logo" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "LogoTitle", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "Title", children: "eLang" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "Subtitle", children: " Text to Speach" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Switch, { isChecked: isExtensionON, toggleSwitch: onToggleExtension })
  ] }) });
};
const Popup$1 = withErrorBoundary(
  withSuspense(Popup, /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: " Loading ... " })),
  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: " Error Occur " })
);
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
