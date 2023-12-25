import { useRef, useState, useCallback, useEffect } from "react";
import { CloseSVG } from "@root/src/assets/svg/CloseSVG";
import { PauseSVG } from "@root/src/assets/svg/PauseSVG";
import { PlaySVG } from "@root/src/assets/svg/PlaySVG";
import { SaveSVG } from "@root/src/assets/svg/SaveSVG";
import { TranslateSVG } from "@root/src/assets/svg/TranslateSVG";

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
  const [translated, setTranslated] = useState<{
    text: string;
    translation: string;
  }>(null);
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
      element.tagName === ("P" || "SPAN" || "") &&
      element.innerText !== hoveredElement?.innerText
    ) {
      setHoveredElement(element);
      setElementSizes(element.getBoundingClientRect());
      setOldElementText(element.innerHTML);
    }
  }, []);

  const onClickSpeech = (event: React.MouseEvent<HTMLElement>) => {
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
    chrome.runtime.sendMessage(
      { type: "translate", text: hoveredElement.innerText },
      (res) => {
        if (res) {
          setTranslated(res);
         
        }
      }
    );
  };

  const onClickPlayPause = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    !pause ? synth.pause() : synth.resume();
    setPause(!pause);
  };

  const onClickClose = () => {
    setHoveredElement(null);
  };

  useEffect(() => {
    if(translated) {
      hoveredElement.innerText = translated.translation
      setElementSizes(hoveredElement.getBoundingClientRect())
    }
  }, [translated])  

  useEffect(() => {
    synth.cancel();

    documentRef.current.addEventListener("click", onClickElement);

    return () => {
      if (hoveredElement) {
        hoveredElement.innerHTML = oldElementText;
        setTranslated(null)
      }
      setIsPlay(false);
      documentRef.current.removeEventListener("click", () => {}, false);
    };
  }, [hoveredElement]);

  return (
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
            zIndex: 999,
          }}
        >
          <div className="SelectedContainer">
            <CloseButton onClickClose={onClickClose} />
          </div>
          <div className="ButtonsContainer">
            <div className="ButtonsBloc">
              <PlayPauseButton
                isPlay={isPlay}
                pause={pause}
                onClickPlayPause={onClickPlayPause}
              />
              <SpeachButton onClickSpeach={onClickSpeech} />
              <TranslateButton onClickTranslate={onClickTranslate} />
              <SaveButton onClickSave={onClickSave} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const SaveButton = ({ onClickSave }) => {
  return (
    <button onClick={(event) => onClickSave(event)} className="SaveButton">
      <SaveSVG />
    </button>
  );
};

const TranslateButton = ({ onClickTranslate }) => {
  return (
    <button
      onClick={(event) => onClickTranslate(event)}
      className="TranslateButton"
    >
      <TranslateSVG />
    </button>
  );
};

const CloseButton = ({ onClickClose }) => {
  return (
    <button onClick={(event) => onClickClose(event)} className="CloseButton">
      <CloseSVG />
    </button>
  );
};

const SpeachButton = ({ onClickSpeach }) => {
  return (
    <button onClick={(event) => onClickSpeach(event)} className="SpeachButton">
      Speach
    </button>
  );
};

const PlayPauseButton = ({ isPlay, pause, onClickPlayPause }) => {
  return (
    <>
      {isPlay && (
        <button
          onClick={(event) => onClickPlayPause(event)}
          className="PlayPauseButton"
        >
          {pause ? <PlaySVG color="#fff" /> : <PauseSVG color="#fff" />}
        </button>
      )}
    </>
  );
};
