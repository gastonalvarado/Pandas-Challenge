Plotly.d3.csv("grouped_genre.csv", function(err, rows) {

    function unpack(rows, key) {
        return rows.map(function(row) { return row[key]; });
    }

    var trace1 = {
        x: unpack(rows, 'Genre'),
        y: unpack(rows, 'NA_Sales'),
        marker: {
            color: 'rgba(204,204,204,1)'
        },
        name: 'Genre',
        type: 'bar',
        transforms: [{
            type: 'sort',
            target: 'y',
            order: 'descending'
        }]
    };

    var data = [trace1];

    var layout = {
        xaxis: {
            type: 'category',
            title: 'Genre',
        },
        yaxis: {
            title: 'Total Sales in North America'
        },
        title: 'Total Sales in NA 1993-2018 by Genre'

    };

    Plotly.newPlot('myDiv', data, layout, { responsive: true, editable: true });


})