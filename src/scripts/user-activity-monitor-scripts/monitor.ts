import { fromEvent } from "rxjs";
import { throttleTime, map } from "rxjs/operators";
import { monitorDashboardLayout } from "../../layouts/user-activity-monitor-layouts/monitor-dashboard-layout";

export const MOUSEMOVE_TIME_DEFAULT = 1000;
export const CLICK_TIME_DEFAULT = 1000;
export interface MonitorData {
  type: string;
  clientX: number;
  clientY: number;
  nodeName: string;
  outerHTML: string;
  outerText: string;
  time: number;
}
export type MonitorServiceUnsubscribe = () => void;
export type MonitorService = (
  mousemoveTime?: number,
  clickTime?: number
) => MonitorServiceUnsubscribe;
export const MONITOR_KEY_LOCAL_STORAGE = "monitor";

const monitorService: MonitorService = (
  mousemoveTime: number = MOUSEMOVE_TIME_DEFAULT,
  clickTime: number = CLICK_TIME_DEFAULT
) => {
  const demo = document.getElementById(
    "demo-user-activity-monitor-main-content-id"
  ) as HTMLElement;

  const mouseoverSubscription = fromEvent<MouseEvent>(demo, "mousemove")
    .pipe(
      throttleTime(mousemoveTime),
      map(
        (mouseEvent: MouseEvent): MonitorData => ({
          type: mouseEvent.type,
          clientX: mouseEvent.clientX,
          clientY: mouseEvent.clientY,
          nodeName:
            mouseEvent.srcElement instanceof HTMLElement
              ? mouseEvent.srcElement.nodeName
              : "",
          outerHTML:
            mouseEvent.srcElement instanceof HTMLElement
              ? mouseEvent.srcElement.innerHTML
              : "",
          outerText:
            mouseEvent.srcElement instanceof HTMLElement
              ? mouseEvent.srcElement.outerText
              : "",
          time: mousemoveTime,
        })
      )
    )
    .subscribe((monitor: MonitorData) =>
      localStorage.setItem(MONITOR_KEY_LOCAL_STORAGE, JSON.stringify(monitor))
    );

  const mouseclickSubscription = fromEvent<MouseEvent>(demo, "click")
    .pipe(
      throttleTime(clickTime),
      map(
        (mouseEvent: MouseEvent): MonitorData => ({
          type: mouseEvent.type,
          clientX: mouseEvent.clientX,
          clientY: mouseEvent.clientY,
          nodeName:
            mouseEvent.srcElement instanceof HTMLElement
              ? mouseEvent.srcElement.nodeName
              : "",
          outerHTML:
            mouseEvent.srcElement instanceof HTMLElement
              ? mouseEvent.srcElement.innerHTML
              : "",
          outerText:
            mouseEvent.srcElement instanceof HTMLElement
              ? mouseEvent.srcElement.outerText
              : "",
          time: clickTime,
        })
      )
    )
    .subscribe((monitor: MonitorData) =>
      localStorage.setItem(MONITOR_KEY_LOCAL_STORAGE, JSON.stringify(monitor))
    );

  const unsuscribe = () => {
    mouseoverSubscription.unsubscribe();
    mouseclickSubscription.unsubscribe();
  };
  return unsuscribe;
};

export const monitor = () => {
  let mouseMoveTime = MOUSEMOVE_TIME_DEFAULT;
  let clickTime = CLICK_TIME_DEFAULT;
  let dashboardIsOpened = false;

  const buttonMonitor = document.getElementById("monitor-id") as HTMLElement;
  buttonMonitor.addEventListener("click", () => {
    if (dashboardIsOpened) {
      dashboardIsOpened = false;
      const buttonParent = buttonMonitor.parentNode as HTMLElement;
      const dashboard = document.getElementById("dashboard-id");
      const dashboardParent = dashboard?.parentNode as HTMLElement;
      buttonParent.removeChild(dashboardParent);
    } else {
      dashboardIsOpened = true;
      const buttonParent = buttonMonitor.parentNode as HTMLElement;
      const layout = document.createElement("div") as HTMLElement;
      layout.innerHTML = monitorDashboardLayout;
      buttonParent.appendChild(layout);
    }
  });

  const destroy = () => {
    localStorage.removeItem(MONITOR_KEY_LOCAL_STORAGE);
  };
  return destroy;
};
