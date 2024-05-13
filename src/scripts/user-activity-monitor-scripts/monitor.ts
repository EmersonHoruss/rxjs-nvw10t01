import { fromEvent, Subject } from "rxjs";
import { throttleTime, map, filter } from "rxjs/operators";
import { monitorDashboardLayout } from "../../layouts/user-activity-monitor-layouts/monitor-dashboard-layout";

interface MonitorItem {
  type: string;
  clientX: number;
  clientY: number;
  nodeName: string;
  outerHTML: string;
  outerText: string;
  time: number;
  hour: string;
}
type MonitorServiceUnsubscribe = () => void;
type MonitorService = () => MonitorServiceUnsubscribe;
enum Tab {
  REPORTS = "reports",
  SETTINGS = "settings",
}
interface GlobalState {
  mouseMoveTime: number;
  clickTime: number;
  monitorData: MonitorItem[];
  tab: Tab;
}

const MOUSEMOVE_TIME_DEFAULT = 1000;
const CLICK_TIME_DEFAULT = 1000;

const globalState: GlobalState = {
  mouseMoveTime: MOUSEMOVE_TIME_DEFAULT,
  clickTime: CLICK_TIME_DEFAULT,
  monitorData: [],
  tab: Tab.REPORTS,
};
const globalStateSubject = new Subject<GlobalState>();

export const monitor = () => {
  let dashboardIsOpened = false;
  const _monitorService = monitorService();
  const subscription = globalStateSubject.subscribe(() => fillTable());

  const buttonMonitor = document.getElementById("monitor-id") as HTMLElement;

  buttonMonitor.addEventListener("click", () => {
    if (dashboardIsOpened) {
      dashboardIsOpened = false;
      closeDashboard();
    } else {
      dashboardIsOpened = true;
      openDashboard();
    }
  });
  const destroy = () => {
    subscription.unsubscribe();
    _monitorService();
  };
  return destroy;
};

const monitorService: MonitorService = () => {
  const demo = document.getElementById(
    "demo-user-activity-monitor-main-content-id"
  ) as HTMLElement;

  const mouseoverSubscription = fromEvent<MouseEvent>(demo, "mousemove")
    .pipe(
      throttleTime(globalState.mouseMoveTime),
      filter((event: MouseEvent) => {
        const dashboard = document.getElementById("dashboard-id");
        return !dashboard || !dashboard.contains(event.target as Node);
      }),
      map(
        (mouseEvent: MouseEvent): MonitorItem => ({
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
          time: globalState.mouseMoveTime,
          hour: `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,
        })
      )
    )
    .subscribe((monitor: MonitorItem) => {
      globalState.monitorData.push(monitor);
      globalStateSubject.next({ ...globalState });
    });

  const mouseclickSubscription = fromEvent<MouseEvent>(demo, "click")
    .pipe(
      throttleTime(globalState.clickTime),
      filter((event: MouseEvent) => {
        const dashboard = document.getElementById("dashboard-id");
        return !dashboard || !dashboard.contains(event.target as Node);
      }),
      map(
        (mouseEvent: MouseEvent): MonitorItem => ({
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
          time: globalState.clickTime,
          hour: `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,
        })
      )
    )
    .subscribe((monitor: MonitorItem) => {
      globalState.monitorData.push(monitor);
      globalStateSubject.next({ ...globalState });
    });
  const unsuscribe = () => {
    mouseoverSubscription.unsubscribe();
    mouseclickSubscription.unsubscribe();
  };
  return unsuscribe;
};

const closeDashboard = () => {
  const buttonMonitor = document.getElementById("monitor-id") as HTMLElement;

  const buttonParent = buttonMonitor.parentNode as HTMLElement;
  const dashboard = document.getElementById("dashboard-id");
  const dashboardParent = dashboard?.parentNode as HTMLElement;
  buttonParent.removeChild(dashboardParent);
};

const openDashboard = () => {
  const buttonMonitor = document.getElementById("monitor-id") as HTMLElement;

  const buttonParent = buttonMonitor.parentNode as HTMLElement;
  const layout = document.createElement("div") as HTMLElement;
  layout.innerHTML = monitorDashboardLayout;
  buttonParent.appendChild(layout);

  const buttonReports = document.getElementById("reports-id") as HTMLElement;
  const buttonSettings = document.getElementById("settings-id") as HTMLElement;
  const table = document.getElementById(
    "monitor__dashboard-table"
  ) as HTMLElement;
  const settings = document.getElementById(
    "monitor__dashboard-settings"
  ) as HTMLElement;

  if (globalState.tab === Tab.REPORTS) {
    buttonReports.classList.add("active");
    table.classList.contains("hidden") && table.classList.remove("hidden");
    !settings.classList.contains("hidden") && settings.classList.add("hidden");
  }
  if (globalState.tab === Tab.SETTINGS) {
    buttonSettings.classList.add("active");
    !table.classList.contains("hidden") && table.classList.add("hidden");
    settings.classList.contains("hidden") &&
      settings.classList.remove("hidden");
  }
  fillTable();
  setSettings();

  buttonReports.addEventListener("click", () => {
    if (!buttonReports.classList.contains("active")) {
      buttonReports.classList.add("active");
    }
    if (buttonSettings.classList.contains("active")) {
      buttonSettings.classList.remove("active");
    }
    table.classList.contains("hidden") && table.classList.remove("hidden");
    !settings.classList.contains("hidden") && settings.classList.add("hidden");
    globalState.tab = Tab.REPORTS;
  });

  buttonSettings.addEventListener("click", () => {
    if (buttonReports.classList.contains("active")) {
      buttonReports.classList.remove("active");
    }
    if (!buttonSettings.classList.contains("active")) {
      buttonSettings.classList.add("active");
    }
    !table.classList.contains("hidden") && table.classList.add("hidden");
    settings.classList.contains("hidden") &&
      settings.classList.remove("hidden");
    globalState.tab = Tab.SETTINGS;
  });
};

const fillTable = () => {
  const dashboard = document.getElementById("dashboard-id");
  if (dashboard && globalState.tab === Tab.REPORTS) {
    let tableBodyHtml = "";
    for (const [index, monitorItem] of globalState.monitorData.entries()) {
      const trHtml = `<tr>
          <td class="scroll"><span>${index + 1}</span></td>
          <td class="scroll"><span>${monitorItem.type}</span></td>
          <td class="scroll"><span>${monitorItem.clientX}</span></td>
          <td class="scroll"><span>${monitorItem.clientY}</span></td>
          <td class="scroll"><span>${monitorItem.nodeName}</span></td>
          <td class="scroll"><span>${monitorItem.outerHTML}</span></td>
          <td class="scroll"><span>${monitorItem.outerText}</span></td>
          <td class="scroll"><span>${monitorItem.time}</span></td>
          <td class="scroll"><span>${monitorItem.hour}</span></td>
        </tr>
      <tr>`;
      tableBodyHtml += trHtml;
    }
    const tableBody = document.getElementById(
      "monitor__dashboard-table-body-id"
    ) as HTMLElement;
    if (tableBody) {
      tableBody.innerHTML = tableBodyHtml;
    }
  }
};

const setSettings = () => {
  const dashboard = document.getElementById("dashboard-id");
  if (dashboard) {
    const clickTimeInput = document.getElementById(
      "monitor__dashboard-click-time-interval-id"
    ) as HTMLInputElement;
    clickTimeInput.value = globalState.clickTime + "";

    const mouseMoveTimeInput = document.getElementById(
      "monitor__dashboard-mouseover-time-interval-id"
    ) as HTMLInputElement;
    mouseMoveTimeInput.value = globalState.mouseMoveTime + "";
  }
};
