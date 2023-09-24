
let drawFunc;

export function setRowData(rowData) {
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
        const data = new google.visualization.DataTable();

        // define the props for each row. do not adjust without consulting documentaiton @ 
        // https://developers.google.com/chart/interactive/docs/gallery/ganttchart
        data.addColumn('string', 'Task ID');
        data.addColumn('string', 'Task Name');
        data.addColumn('string', 'Resource');
        data.addColumn('date', 'Start Date');
        data.addColumn('date', 'End Date');
        data.addColumn('number', 'Duration'); // in milliseconds
        data.addColumn('number', 'Percent Complete');
        data.addColumn('string', 'Dependencies');

        data.addRows(rowData);

            const options = {
                height: 800,
                gantt: {
                trackHeight: 16,
                barHeight: 12,
                percentEnabled: false,
                sortTasks: true
                }
            };

            const chart = new google.visualization.Gantt(document.getElementById('chart_div'));

            chart.draw(data, options);

            const firstChildDiv = document.querySelector("#chart_div > div:first-child");
            if (firstChildDiv) {
                firstChildDiv.style.width = '100%';
                firstChildDiv.style.height = '100%';
            }

        };
    }