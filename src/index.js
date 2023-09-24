import { setRowData } from "./gantt";
/*
const exampleRowData = [
    ['Employee1', 'Josh', 'molding',
    new Date(2023, 9, 24, 9, 0, 0), new Date(2023, 9, 24, 12, 0, 0), null, 100, null],
    ['Employee2', 'Anthony', 'design',
    new Date(2023, 9, 24, 13, 0, 0), new Date(2023, 9, 24, 16, 0, 0), null, 100, null]
];

setRowData(exampleRowData);
*/

window.setGantt = function(responseObject) {
    // Initial empty array to hold the transformed data
    const formattedData = [];
    const json = JSON.parse(responseObject)
    console.log("Gantt input", json)
    console.log("json.response: ", json.data.response);

    try {
        // Extracting relevant data from the response object
        const records = json.data.response.data;
        console.log("records: ", json.data.response.data);
        
        for (const record of records) {
            console.log(record);
            const fieldData = record.fieldData;
            const portalData = record.portalData;
            
            const id_employee = fieldData.id_employee;
            const nameDisplay_a = portalData.employeeHours_EMPLOYEE[0]['employeeHours_EMPLOYEE::nameDisplay_a'];
            const department = portalData.employeeHours_EMPLOYEE[0]['employeeHours_EMPLOYEE::department'];
            const timestampIN = new Date(fieldData.timestampIN);
            const timestampOUT = new Date(fieldData.timestampOUT);

            // Pushing a new row to the formattedData array
            formattedData.push([id_employee, nameDisplay_a, department, timestampIN, timestampOUT, null, 100, null]);
        }
        
        // Now you can pass formattedData to setRowData
        console.log("processedData", formattedData);

        if (typeof setRowData === 'function') {
            setRowData(formattedData);
        }
    } catch (error) {
        console.error("Error in data transformation:", error);
    }
}

