Plotly.d3.csv("grouped_years.csv", function(err, rows) {

    function unpack(rows, key) {
        return rows.map(function(row) { return row[key]; });
    }

    //d3.json("/na_sales", function(err, rows) {

    // JSON.parse(rows)



    var trace1 = {
        x: unpack(rows, 'Year'),
        y: unpack(rows, 'NA_Sales'),
        fill: 'tonexty',
        type: 'scatter'

    };

    var data = [trace1];

    var layout = {
        xaxis: {
            title: 'Year',
        },
        yaxis: {
            title: 'Sales in North America (M)'
        },
        title: '1993-2018 Total VG Sales in North America'

    };

    Plotly.newPlot('myDiv', data, layout, { responsive: true, editable: true });

    //Plotly.newPlot('myDiv', data, layout);

})