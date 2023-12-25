import reloadOnUpdate from "virtual:reload-on-update-in-background-script";
import "webextension-polyfill";
import { getTranslateFromAPI } from "./utils/getTranslateFromAPI";
reloadOnUpdate("pages/background");

/**
 * Extension reloading is necessary because the browser automatically caches the css.
 * If you do not use the css of the content script, please delete it.
 */
reloadOnUpdate("pages/content/style.scss");

// console.log("background loaded");

export const getTranslate = async (request, sender, sendResponse) => {
  const data = await getTranslateFromAPI(request.text, "en", "ru");
  sendResponse(data);
};

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.type === "translate") {
    getTranslate(request, sender, sendResponse);
  }
  return true;
});
