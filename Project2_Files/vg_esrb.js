Plotly.d3.csv("grouped_esrb.csv", function(err, rows) {

    function unpack(rows, key) {
        return rows.map(function(row) { return row[key]; });
    }

    var xValue = unpack(rows, 'ESRB_Rating')
    var yValue = unpack(rows, 'NA_Sales')

    var trace1 = {
        x: xValue,
        y: yValue,
        marker: {
            color: ['rgba(204,204,204,1)', 'rgba(204,204,204,1)', 'rgba(204,204,204,1)', 'rgba(222,45,38,0.8)', 'rgba(204,204,204,1)', 'rgba(204,204,204,1)']
        },
        name: 'Total Sales',
        type: 'bar',
        transforms: [{
            type: 'sort',
            target: 'y',
            order: 'descending'
        }]
    };

    // var trace2 = {
    //     x: unpack(rows, 'ESRB_Rating'),
    //     y: unpack(rows, 'sales_pct'),
    //     name: 'Sales Percentage',
    //     type: 'bar'
    // };


    var data = [trace1];

    var layout = {
        xaxis: {
            type: 'category',
            title: 'ESRB Ratings',
        },
        yaxis: {
            title: 'Total Sales in North America (M)'
        },
        title: 'Total Sales in NA 1993-2018 by ESRB Rating'
    };

    Plotly.newPlot('myDiv', data, layout, { responsive: true, editable: true });

})