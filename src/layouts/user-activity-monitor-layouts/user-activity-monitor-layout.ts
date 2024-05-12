export const userActivityMonitorLayout = `
<div class="demo-user-activity-monitor" id="demo-user-activity-monitor-id">
    <div class="demo-user-activity-monitor__content pancake-stack" id="demo-user-activity-monitor-main-content-id">
    <header class="header header__shadow padding-y-2">
        <nav class="navigation">
            <ul class="margin-y-0 padding-0">
                <li class="margin-y-0 demo-user-activity-monitor__tab" id="counter">
                    <a>Counter</a>
                </li>
                <li class="margin-y-0 demo-user-activity-monitor__tab" id="filter">
                    <a>Filter</a>
                </li>
            </ul>
            <button
                id="close"
                class="button-default"
            >
                Salir
            </button>
        </nav>
    </header>

    <main>
        <div class="section">
            <div class="container">
                <div class="article">
                    <div class="content" id="page-content"></div>
                </div>
            </div>
        </div>
    </main>

    <div class="relative">
        <button class="button-secondary monitor" id="monitor-id">
            <img
                src="/src/assets/icons/monitor.svg"
                alt="monitor"
            />
        </button>
    </div>

    <footer class="container footer">
        <small class="footer__text"
        >&copy; 2024 EEG Codeable - Todos los derechos
        reservados</small
        >
    </footer>
    </div>
</div>
`;
