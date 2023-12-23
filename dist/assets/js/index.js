import { j as jsxRuntimeExports, r as reactExports, a as addHmrIntoView, c as createRoot } from "./_virtual_reload-on-update-in-view.js";
const PauseSVG = ({ color }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "path",
      {
        opacity: "0.5",
        d: "M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z",
        fill: color
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "path",
      {
        d: "M8.07612 8.61732C8 8.80109 8 9.03406 8 9.5V14.5C8 14.9659 8 15.1989 8.07612 15.3827C8.17761 15.6277 8.37229 15.8224 8.61732 15.9239C8.80109 16 9.03406 16 9.5 16C9.96594 16 10.1989 16 10.3827 15.9239C10.6277 15.8224 10.8224 15.6277 10.9239 15.3827C11 15.1989 11 14.9659 11 14.5V9.5C11 9.03406 11 8.80109 10.9239 8.61732C10.8224 8.37229 10.6277 8.17761 10.3827 8.07612C10.1989 8 9.96594 8 9.5 8C9.03406 8 8.80109 8 8.61732 8.07612C8.37229 8.17761 8.17761 8.37229 8.07612 8.61732Z",
        fill: "white"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "path",
      {
        d: "M13.0761 8.61732C13 8.80109 13 9.03406 13 9.5V14.5C13 14.9659 13 15.1989 13.0761 15.3827C13.1776 15.6277 13.3723 15.8224 13.6173 15.9239C13.8011 16 14.0341 16 14.5 16C14.9659 16 15.1989 16 15.3827 15.9239C15.6277 15.8224 15.8224 15.6277 15.9239 15.3827C16 15.1989 16 14.9659 16 14.5V9.5C16 9.03406 16 8.80109 15.9239 8.61732C15.8224 8.37229 15.6277 8.17761 15.3827 8.07612C15.1989 8 14.9659 8 14.5 8C14.0341 8 13.8011 8 13.6173 8.07612C13.3723 8.17761 13.1776 8.37229 13.0761 8.61732Z",
        fill: "white"
      }
    )
  ] });
};
const PlaySVG = ({ color }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "path",
      {
        opacity: "0.5",
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z",
        fill: color
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "path",
      {
        d: "M15.4137 13.059L10.6935 15.8458C9.93371 16.2944 9 15.7105 9 14.7868V9.21316C9 8.28947 9.93371 7.70561 10.6935 8.15419L15.4137 10.941C16.1954 11.4026 16.1954 12.5974 15.4137 13.059Z",
        fill: "white"
      }
    )
  ] });
};
const getWordAt = (str, pos) => {
  str = String(str);
  pos = Number(pos) >>> 0;
  const left = str.slice(0, pos + 1).search(/\S+$/), right = str.slice(pos).search(/\s/);
  if (right < 0) {
    return str.slice(left);
  }
  return str.slice(left, right + pos);
};
const App = () => {
  const documentRef = reactExports.useRef(document);
  const [hoveredElement, setHoveredElement] = reactExports.useState(
    null
  );
  const [oldElementText, setOldElementText] = reactExports.useState();
  const [elementSizes, setElementSizes] = reactExports.useState(null);
  const [isPlay, setIsPlay] = reactExports.useState(false);
  const [pause, setPause] = reactExports.useState(false);
  const utterance = new SpeechSynthesisUtterance();
  const synth = window.speechSynthesis;
  const speech = (textToSpeach) => {
    utterance.text = textToSpeach;
    utterance.lang = "en-UK";
    utterance.rate = 1;
    synth.speak(utterance);
  };
  const onClickElement = reactExports.useCallback((event) => {
    const element = event.target;
    if (element.tagName !== "BODY" && element.innerText !== (hoveredElement == null ? void 0 : hoveredElement.innerText)) {
      setHoveredElement(element);
      setElementSizes(element.getBoundingClientRect());
      setOldElementText(element.innerHTML);
    }
  }, []);
  const onClickSpeech = (event) => {
    event.stopPropagation();
    setPause(false);
    setIsPlay(true);
    speech(hoveredElement.innerText);
    const copyText = hoveredElement.innerHTML;
    utterance.onboundary = function(event2) {
      const currentWord = getWordAt(hoveredElement.innerText, event2.charIndex);
      hoveredElement.innerHTML = copyText.replace(/<[^>]*>?/gm, "").replace(
        currentWord,
        '<mark style="background-color: rgba(79,110,253,0.3); border-radius: 5px;">' + currentWord + "</mark>"
      );
    };
    utterance.onend = () => {
      hoveredElement.innerHTML = copyText;
      setIsPlay(false);
    };
  };
  const onClickPlayPause = (event) => {
    event.stopPropagation();
    !pause ? synth.pause() : synth.resume();
    setPause(!pause);
  };
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
    /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: hoveredElement && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        style: {
          position: "absolute",
          width: elementSizes.width + 10,
          height: elementSizes.height + 10,
          top: elementSizes.top - 5 + window.scrollY,
          left: elementSizes.left - 5,
          pointerEvents: "none",
          zIndex: 999
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "SelectedContainer" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "ButtonsContainer", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ButtonsBloc", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              PlayPauseButton,
              {
                isPlay,
                pause,
                onClickPlayPause
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SpeachButton, { onClickSpeach: onClickSpeech })
          ] }) })
        ]
      }
    ) })
  );
};
const SpeachButton = ({ onClickSpeach }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: (event) => onClickSpeach(event), className: "SpeachButton", children: "Speach" });
};
const PlayPauseButton = ({ isPlay, pause, onClickPlayPause }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: isPlay && /* @__PURE__ */ jsxRuntimeExports.jsx(
    "button",
    {
      onClick: (event) => onClickPlayPause(event),
      className: "PlayPauseButton",
      children: pause ? /* @__PURE__ */ jsxRuntimeExports.jsx(PlaySVG, { color: "#fff" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(PauseSVG, { color: "#fff" })
    }
  ) });
};
const injectedStyle = ".SelectedContainer {\n  background-color: rgba(79, 110, 253, 0.2);\n  width: 100%;\n  height: 100%;\n  border-radius: 7px;\n  box-shadow: -1px 5px 10px 3px rgba(79, 110, 253, 0.2);\n  border: 1px solid rgba(79, 110, 253, 0.3);\n}\n\n.ButtonsContainer {\n  margin-top: 5px;\n  width: 100%;\n  display: flex;\n  justify-content: flex-end;\n  align-items: center;\n}\n.ButtonsContainer .ButtonsBloc {\n  width: auto;\n  box-shadow: -1px 5px 10px 3px rgba(79, 110, 253, 0.3);\n  background-color: rgb(124, 148, 255);\n  border-radius: 7px;\n  border: 1px solid rgba(79, 110, 253, 0.3);\n  pointer-events: all;\n  padding: 3px;\n  display: flex;\n  justify-content: flex-end;\n  align-items: stretch;\n  gap: 5px;\n}\n\n.SpeachButton {\n  cursor: pointer;\n  background: none;\n  border: none;\n  border-radius: 7px;\n  background-color: rgb(79, 110, 253);\n  color: #fff;\n  font-size: 18px;\n  font-weight: 500;\n  padding: 5px 10px;\n}\n\n.PlayPauseButton {\n  cursor: pointer;\n  background: none;\n  border: none;\n  padding: 0;\n  height: auto;\n  width: 30px;\n}\n.PlayPauseButton svg {\n  height: 100%;\n  width: auto;\n}";
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
