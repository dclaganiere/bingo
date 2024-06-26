import {localize, waitForLoad} from "./helpers/localization.js";
import {fromHtml} from "./helpers/fromHtml.js";

const legacyBingoUrlRegex = /^\/bingo\/(?<version>(beta|v)(\d\.?)+(-j))?\/bingo\.html$/;

const attemptRedirect = () => {

  const version = legacyBingoUrlRegex.exec(window.location.pathname).groups.version;

  if (version) {

    const originalQuery = window.location.search;
    const query = (originalQuery && originalQuery.startsWith("?")) ? originalQuery : "?";

    window.location.href = `/bingo/bingo.html${query}&version=${version}`;
  }
};

const renderError = () => {
  const template = () => `
  <div id="wrap">
    <main class="error-404-container">
      <p>${localize("The page you are looking for does not exist")}</p>
      <p><a href="index.html">${localize("Show All Versions")}</a></p>
    </main>
  </div>
  `;

  waitForLoad().then(() => document.body.append(fromHtml(template())));
};

try {
  attemptRedirect();
} catch (e) {
  renderError();
}
