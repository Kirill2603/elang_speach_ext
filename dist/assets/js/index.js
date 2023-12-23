import { r as reactExports, j as jsxRuntimeExports, a as addHmrIntoView, c as createRoot } from "./_virtual_reload-on-update-in-view.js";
const App = () => {
  const documentRef = reactExports.useRef(document);
  const [hoveredElement, setHoveredElement] = reactExports.useState(
    null
  );
  const [oldElementText, setOldElementText] = reactExports.useState();
  const [elementSizes, setElementSizes] = reactExports.useState(null);
  const [isPlay, setIsPlay] = reactExports.useState(false);
  reactExports.useState(false);
  new SpeechSynthesisUtterance();
  const synth = window.speechSynthesis;
  const onClickElement = reactExports.useCallback((event) => {
    const element = event.target;
    if (element.tagName !== "BODY" && element.innerText !== (hoveredElement == null ? void 0 : hoveredElement.innerText)) {
      setHoveredElement(element);
      setElementSizes(element.getBoundingClientRect());
      setOldElementText(element.innerHTML);
    }
  }, []);
  reactExports.useEffect(() => {
    synth.cancel();
    documentRef.current.addEventListener("click", onClickElement);
    return () => {
      if (hoveredElement) {
        hoveredElement.innerHTML = oldElementText;
      }
      setIsPlay(false);
      documentRef.current.removeEventListener("click", () => {
      }, false);
    };
  }, [hoveredElement]);
  return (
    // <div className='App'>
    //   <span className='Span'>asdasdasd</span>
    // </div>
    /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: hoveredElement && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        style: {
          position: "absolute",
          width: elementSizes.width + 10,
          height: elementSizes.height + 10,
          top: elementSizes.top - 5 + window.scrollY,
          left: elementSizes.left - 5,
          pointerEvents: "none",
          zIndex: -1
        },
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "SelectedContainer" })
      }
    ) })
  );
};
const injectedStyle = ".SelectedContainer {\n  background-color: rgba(79, 110, 253, 0.3);\n  width: 100%;\n  height: 100%;\n  border-radius: 10px;\n  box-shadow: -1px 5px 10px 3px rgba(79, 110, 253, 0.2);\n}";
addHmrIntoView("pages/content");
const root = document.createElement("div");
root.id = "elang_speach_extension";
document.body.insertBefore(root, document.body.childNodes[0]);
const rootIntoShadow = document.createElement("div");
rootIntoShadow.id = "shadow-root";
const shadowRoot = root.attachShadow({ mode: "open" });
shadowRoot.appendChild(rootIntoShadow);
const styleElement = document.createElement("style");
styleElement.innerHTML = injectedStyle;
shadowRoot.appendChild(styleElement);
createRoot(rootIntoShadow).render(/* @__PURE__ */ jsxRuntimeExports.jsx(App, {}));
