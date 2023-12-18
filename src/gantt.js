let drawFunc;

export function setRowData(rowData) {
    // Gracefully finish if rowData is null
    if (rowData === null) {
        console.log("No data provided.");
        return;
    }

    console.log(rowData)
    if (drawFunc) {
        drawFunc(rowData);
    } else {
        google.charts.load('current', {'packages':['gantt']});
        google.charts.setOnLoadCallback(() => {
            drawFunc = createDrawFunc();
            drawFunc(rowData);
        });
    }
}

function createDrawFunc() {
    return function innerDrawChart(rowData) {
        // Clear existing data and create a new DataTable instance
        const data = new google.visualization.DataTable();

        // define the props for each row
        data.addColumn('string', 'Task ID');
        data.addColumn('string', 'Task Name');
        data.addColumn('string', 'Resource');
        data.addColumn('date', 'Start Date');
        data.addColumn('date', 'End Date');
        data.addColumn('number', 'Duration'); // in milliseconds
        data.addColumn('number', 'Percent Complete');
        data.addColumn('string', 'Dependencies');

        // Add new rows
        data.addRows(rowData);

        // Chart options
        const options = {
            height: 800,
            gantt: {
                trackHeight: 16,
                barHeight: 12,
                percentEnabled: false,
                sortTasks: true
            }
        };

        // Draw the chart
        const chart = new google.visualization.Gantt(document.getElementById('chart_div'));
        chart.draw(data, options);

        // Adjust chart width and height
        const firstChildDiv = document.querySelector("#chart_div > div:first-child");
        if (firstChildDiv) {
            firstChildDiv.style.width = '100%';
            firstChildDiv.style.height = '100%';
        }
    };
}
