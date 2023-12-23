import { useRef, useState, useCallback, useEffect } from "react";

export const getWordAt = (str: string, pos: number) => {
  str = String(str);
  pos = Number(pos) >>> 0;
  const left = str.slice(0, pos + 1).search(/\S+$/),
    right = str.slice(pos).search(/\s/);
  if (right < 0) {
    return str.slice(left);
  }
  return str.slice(left, right + pos);
};

export const App = () => {
  const documentRef = useRef(document);
  const [hoveredElement, setHoveredElement] = useState<HTMLElement | null>(
    null
  );
  const [oldElementText, setOldElementText] = useState<string>();
  const [elementSizes, setElementSizes] = useState<DOMRect | null>(null);
  const [isPlay, setIsPlay] = useState<boolean>(false);
  const [pause, setPause] = useState<boolean>(false);

  const utterance = new SpeechSynthesisUtterance();
  const synth = window.speechSynthesis;

  const speech = (textToSpeach: string) => {
    utterance.text = textToSpeach;
    utterance.lang = "en-UK";
    utterance.rate = 1;
    synth.speak(utterance);
  };

  const onClickElement = useCallback((event: any) => {
    const element = event.target as HTMLElement;
    // console.log(element.innerHTML.split(" "));

    //  element.innerHTML = element.innerHTML
    //    .replace(/<[^>]*>?/gm, "")
    //    .split(" ")
    //    .map(
    //      (
    //        text,
    //      ) => `<mark style="background-color: #ffffff00; " onMouseOver="this.style.color='#4F6EFD4C'"
    // onMouseOut="this.style.color='#000'">${text}</mark>`,
    //    )
    //    .join(" ");

    if (
      element.tagName !== ("BODY" || "A") &&
      element.innerText !== hoveredElement?.innerText
    ) {
      setHoveredElement(element);
      setElementSizes(element.getBoundingClientRect());
      setOldElementText(element.innerHTML);
    }
  }, []);

  const onPressSpeech = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setPause(false);
    setIsPlay(true);
    speech(hoveredElement.innerText);
    const copyText = hoveredElement.innerHTML;

    utterance.onboundary = function (event) {
      const currentWord = getWordAt(hoveredElement.innerText, event.charIndex);
      hoveredElement.innerHTML = copyText
        .replace(/<[^>]*>?/gm, "")
        .replace(
          currentWord,
          '<mark style="background-color: rgba(79,110,253,0.3); border-radius: 5px;">' +
            currentWord +
            "</mark>"
        );
    };
    utterance.onend = () => {
      hoveredElement.innerHTML = copyText;
      setIsPlay(false);
    };
  };

  const onClickSave = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    console.log("save");
  };

  const onClickTranslate = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    console.log("translate");
  };

  const onClickPause = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    !pause ? synth.pause() : synth.resume();
    setPause(!pause);
  };

  const onClickClose = () => {
    setHoveredElement(null);
  };

  useEffect(() => {
    synth.cancel();

    documentRef.current.addEventListener("click", onClickElement);

    return () => {
      if (hoveredElement) {
        hoveredElement.innerHTML = oldElementText;
      }
      setIsPlay(false);
      documentRef.current.removeEventListener("click", () => {}, false);
    };
  }, [hoveredElement]);

  return (
    // <div className='App'>

    //   <span className='Span'>asdasdasd</span>

    // </div>
    <>
      {hoveredElement && (
        <div
          style={{
            position: "absolute",
            width: elementSizes.width + 10,
            height: elementSizes.height + 10,
            top: elementSizes.top - 5 + window.scrollY,
            left: elementSizes.left - 5,
            pointerEvents: "none",
            zIndex: -1,
          }}
        >

          <div className="SelectedContainer">

          </div>

        </div>
      )}
    </>
  );
};
