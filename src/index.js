import { setRowData } from "./gantt";

const hoursWorked = (data) => {
    try {
        const formattedData = [];
        // Extracting relevant data from the response object
        const records = data;
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

const hoursScheduled = (data) => {
    try {
        const formattedData = [];
        // Extracting relevant data from the response object
        const records = data;
        for (const record of records) {
            console.log(record);
            const fieldData = record.fieldData;
            
            const id_employee = fieldData.empID;
            const nameDisplay_a = fieldData['global__EMPLOYEE_SCHEDULE|id__Emply::nameDisplay_a'];
            const department = fieldData['global__EMPLOYEE_SCHEDULE|id__Emply::department'];


            const timestampIN = new Date();
            let [hoursStart, minutesStart] = fieldData.startTime.split(':').map(Number);
            
            // Check for AM or PM and adjust hours accordingly
            const isPM = fieldData.startTime.includes('PM');
            if (isPM && hoursStart < 12) {
                hoursStart += 12;
            } else if (!isPM && hoursStart === 12) {
                hoursStart = 0;
            }
            
            timestampIN.setHours(hoursStart, minutesStart, 0, 0); // Reset seconds and milliseconds to 0
            
            // Parsing lengthOfShift and adding it to timestampIN to get timestampOUT
            const lengthOfShiftParts = fieldData.lengthOfShift.split(':').map(Number);
            const shiftDuration = new Date(timestampIN);
            shiftDuration.setHours(timestampIN.getHours() + lengthOfShiftParts[0]);
            shiftDuration.setMinutes(timestampIN.getMinutes() + lengthOfShiftParts[1]);
            shiftDuration.setSeconds(timestampIN.getSeconds() + lengthOfShiftParts[2]);
            
            const timestampOUT = shiftDuration;
            
            // Now, add these to your formattedData object
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

window.setGantt = function(responseObject) {
    // Initial empty array to hold the transformed data
    const json = JSON.parse(responseObject)
    console.log("Gantt input", json)
    const layout = json.response.dataInfo.layout
    console.log("layout: ", layout);
    if(layout == "dapiEmployeeSchedule") {
        hoursScheduled(json.response.data)
    } else {
        hoursWorked(json.response.data)
    }
}

