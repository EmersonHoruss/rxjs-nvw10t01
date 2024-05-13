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
        <div id="monitor__dashboard-settings">settings</div>
    </div>
</div>
`;
