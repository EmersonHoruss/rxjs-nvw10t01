import { userActivityMonitorLayout } from "../../layouts/user-activity-monitor-layouts/user-activity-monitor-layout";
import { counterLayout } from "../../layouts/user-activity-monitor-layouts/counter-layout";
import { filterLayout } from "../../layouts/user-activity-monitor-layouts/filter-layout";
import { counter } from "./counter";
import { filter } from "./filter";
import { monitor } from "./monitor";

const buttonStart = document.getElementById("start") as HTMLElement;
const bodyElement = document.querySelector("body") as HTMLElement;
buttonStart.addEventListener("click", () => {
  main();
});

const main = () => {
  createLayout();
  addListeners();
  monitor();
};

const createLayout = () => {
  const layout = document.createElement("div") as HTMLElement;
  layout.innerHTML = userActivityMonitorLayout;
  bodyElement.appendChild(layout);

  // setting defaults values
  const buttonCounter = document.getElementById("counter") as HTMLElement;
  buttonCounter.classList.add("active");
  const pageContent = document.getElementById("page-content") as HTMLElement;
  pageContent.innerHTML = counterLayout;
  counter();
};

const addListeners = () => {
  const buttonClose = document.getElementById("close") as HTMLElement;
  buttonClose.addEventListener("click", () => {
    destroyLayout();
  });

  const buttonCounter = document.getElementById("counter") as HTMLElement;
  const buttonFilter = document.getElementById("filter") as HTMLElement;

  buttonCounter.addEventListener("click", () => {
    if (buttonFilter.classList.contains("active")) {
      buttonFilter.classList.remove("active");
    }
    if (!buttonCounter.classList.contains("active")) {
      buttonCounter.classList.add("active");
    }
    const pageContent = document.getElementById("page-content") as HTMLElement;
    pageContent.innerHTML = counterLayout;
    counter();
  });

  buttonFilter.addEventListener("click", () => {
    if (!buttonFilter.classList.contains("active")) {
      buttonFilter.classList.add("active");
    }
    if (buttonCounter.classList.contains("active")) {
      buttonCounter.classList.remove("active");
    }
    const pageContent = document.getElementById("page-content") as HTMLElement;
    pageContent.innerHTML = filterLayout;
    filter();
  });
};

const destroyLayout = () => {
  const demo = document.getElementById("demo-user-activity-monitor-id") as HTMLElement;
  if (demo.parentNode) {
    bodyElement.removeChild(demo.parentNode);
  }
};
