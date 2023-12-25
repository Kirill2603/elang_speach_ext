import reloadOnUpdate from "virtual:reload-on-update-in-background-script";
import "webextension-polyfill";
import translate from "google-translate-api-x";
import axios from "axios";
reloadOnUpdate("pages/background");

/**
 * Extension reloading is necessary because the browser automatically caches the css.
 * If you do not use the css of the content script, please delete it.
 */
reloadOnUpdate("pages/content/style.scss");

console.log("background loaded");

// url: isProdEnv() ? 'https://easy4learn.com' : 'https://dev.elang.app',
// translatedKey: 'b343f4eb2e1cf0d3f0f14ce30649db2fb1e0db28',
// website: isProdEnv() ? 'https://elang.app' : 'https://elang-app-dev-zehqx.ondigitalocean.app',
// cryptedIvkey: 'nuilaRSl6ZvkBAKG',
// cryptedKey: 'Rfp07QXaQPVo5W66Cyccu8Otd3SSZnIA'
export const dataFromGoogleApiFromPopup = async (
  word: string,
  from: string,
  to: string
) => {
  const url =
    "https://easy4learn.com/api/vocabulary-translate/translate-phases";
  const options = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
    },
    body: JSON.stringify({
      from: from,
      to: to,
      text: word,
    }),
  };

  const translate = fetch(url, options)
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((e) => console.log(e));

  return translate;
};

export const getTranslate = async (request, sender, sendResponse) => {
  const data = await dataFromGoogleApiFromPopup(request.text, "en", "ru");
  sendResponse(data);
};

chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    if (request.type === "translate") {
      getTranslate(request, sender, sendResponse)
    
    }
    return true;
  }
);
