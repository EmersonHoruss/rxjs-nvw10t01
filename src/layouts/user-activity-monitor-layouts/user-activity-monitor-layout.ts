export const userActivityMonitorLayout = `
<div class="demo-user-activity-monitor" id="user-activity-monitor-id">
    <div class="demo-user-activity-monitor__content pancake-stack">
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

    <footer class="container footer">
        <small class="footer__text"
        >&copy; 2024 EEG Codeable - Todos los derechos
        reservados</small
        >
    </footer>
    </div>
</div>
`;
