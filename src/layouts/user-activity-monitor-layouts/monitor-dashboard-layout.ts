export const monitorDashboardLayout = `
<div class="monitor__dashboard card" id="dashboard-id">
    <div class="monitor__dashboard-header">
        <nav class="navigation">
            <ul class="margin-y-0 padding-0">
                <li class="margin-y-0 padding-left-0 cursor-pointer" id="reports-id">
                    <a>Reports</a>
                </li>
                <li class="margin-y-0 padding-left-0 cursor-pointer" id="settings-id">
                    <a>Settings</a>
                </li>
            </ul>
        </nav>
    </div>
    <div class="monitor__dashboard-content">
        <div class="table__container scroll" id="monitor__dashboard-table">
            <table class="table monitor__dashboard-table">
                <thead>
                    <tr>
                        <th>Order</th>
                        <th>Type</th>
                        <th>Coordinate X</th>
                        <th>Coordinate Y</th>
                        <th>Node Name</th>
                        <th>Outer HTML</th>
                        <th>Outer Text</th>
                        <th>Frecuency</th>
                        <th>Time</th>
                    </tr>
                </thead>
                <tbody id="monitor__dashboard-table-body-id"></tbody>
            </table>
        </div>
        <div class="monitor__dashboard-settings" id="monitor__dashboard-settings">
            <div class="form-field">
                <label class="form-field__label">Click time interval (ms)</label>
                <input class="form-field__main-content" id="monitor__dashboard-click-time-interval-id" type="number"/>
            </div>
            <div class="form-field">
                <label class="form-field__label">Mouse over interval (ms)</label>
                <input class="form-field__main-content" id="monitor__dashboard-mouseover-time-interval-id" type="number"/>
            </div>
        </div>
    </div>
</div>
`;
