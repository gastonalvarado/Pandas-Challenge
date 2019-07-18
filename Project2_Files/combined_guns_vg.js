Plotly.d3.csv("combined_guns_vg.csv", function(err, rows) {

    function unpack(rows, key) {
        return rows.map(function(row) { return row[key]; });
    }


    var trace1 = {
        type: "scatter",
        mode: "lines",
        name: 'Sales In North America',
        x: unpack(rows, 'Year'),
        y: unpack(rows, 'NA_Sales'),
    }

    var trace2 = {
        type: "scatter",
        mode: "lines",
        name: 'Violent Incidents',
        x: unpack(rows, 'Year'),
        y: unpack(rows, 'violent_incidents'),
        line: { color: '#7F7F7F' }
    }

    var data = [trace1, trace2];

    var layout = {
        title: 'Total VG Sales vs Total Violent Incidents',
    };

    Plotly.newPlot('myDiv', data, layout, { responsive: true });
})