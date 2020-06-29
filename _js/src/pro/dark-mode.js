// Copyright (c) 2019 Florian Klampfer <https://qwtel.com/>

import { importTemplate, webComponentsReady } from "../common";

const SEL_NAVBAR_BTN_BAR = "#_navbar > .content > .nav-btn-bar";

webComponentsReady.then(() => {
  const darkMode = importTemplate("_dark-mode-template");
  if (darkMode) {
    const navbarEl = document.querySelector(SEL_NAVBAR_BTN_BAR);
    navbarEl.appendChild(darkMode);

    document.body.classList.remove("no-color-transition");

    document.getElementById("_dark-mode").addEventListener("click", e => {
      e.preventDefault();
      const list = document.body.classList;
      if (
        list.contains("dark-mode") ||
        ("_sunset" in window &&
          !list.contains("light-mode") &&
          matchMedia("(prefers-color-scheme: dark)").matches)
      ) {
        list.remove("dark-mode");
        list.add("light-mode");
      } else {
        list.remove("light-mode");
        list.add("dark-mode");
      }
    });
  }
});
