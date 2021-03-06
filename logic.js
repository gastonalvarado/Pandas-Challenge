Plotly.d3.csv('https://github.com/YKhmelnitskiy/Project-2/blob/master/Datasets/vgsales-1970_2019.csv', function (err, data) {
  // Create a lookup table to sort and regroup the columns of data,
  // first by year, then by ESRB_Rating:
  var lookup = {};
  function getData(Year, ESRB_Rating) {
    var byYear, trace;
    if (!(byYear = lookup[Year])) {;
      byYear = lookup[Year] = {};
    }
	 // If a container for this year + ESRB_Rating doesn't exist yet,
	 // then create one:
    if (!(trace = byYear[ESRB_Rating])) {
      trace = byYear[ESRB_Rating] = {
        x: [],
        y: [],
        id: [],
        text: [],
        marker: {size: []}
      };
    }
    return trace;
  }

  // Go through each row, get the right trace, and append the data:
  for (var i = 0; i < data.length; i++) {
    var datum = data[i];
    var trace = getData(datum.Year, datum.ESRB_Rating);
    trace.text.push(datum.Genre);
    trace.id.push(datum.Genre);
    trace.x.push(datum.Genre);
    trace.y.push(datum.ESRB_Rating);
    trace.marker.size.push(datum.NA_Sales);
  }

  // Get the group names:
  var years = Object.keys(lookup);
  // In this case, every year includes every ESRB_Rating, so we
  // can just infer the ESRB_Rating from the *first* year:
  var firstYear = lookup[years[0]];
  var firstESRBtag = Object.keys(firstYear);

  // Create the main traces, one for each continent:
  var traces = [];
  for (i = 0; i < ESRB_Rating.length; i++) {
    var data = firstYear[firstESRBtag[i]];
	 // One small note. We're creating a single trace here, to which
	 // the frames will pass data for the different years. It's
	 // subtle, but to avoid data reference problems, we'll slice
	 // the arrays to ensure we never write any new data into our
	 // lookup table:
    traces.push({
      name: ESRB_Rating[i],
      x: data.x.slice(),
      y: data.y.slice(),
      id: data.id.slice(),
      text: data.text.slice(),
      mode: 'markers',
      marker: {
        size: data.marker.size.slice(),
        sizemode: 'area',
        sizeref: 200000
      }
    });
  }

  // Create a frame for each year. Frames are effectively just
  // traces, except they don't need to contain the *full* trace
  // definition (for example, appearance). The frames just need
  // the parts the traces that change (here, the data).
  var frames = [];
  for (i = 0; i < years.length; i++) {
    frames.push({
      name: years[i],
      data: firstESRBtag.map(function (ESRB_Rating) {
        return getData(years[i], ESRB_Rating);
      })
    })
  }

  // Now create slider steps, one for each frame. The slider
  // executes a plotly.js API command (here, Plotly.animate).
  // In this example, we'll animate to one of the named frames
  // created in the above loop.
  var sliderSteps = [];
  for (i = 0; i < years.length; i++) {
    sliderSteps.push({
      method: 'animate',
      label: years[i],
      args: [[years[i]], {
        mode: 'immediate',
        transition: {duration: 300},
        frame: {duration: 300, redraw: false},
      }]
    });
  }

  var layout = {
    xaxis: {
      title: 'Year',
      range: [1993, 2020]
    },
    yaxis: {
      title: 'ESRB_Rating',
      type: 'log'
    },
    hovermode: 'closest',
	 // We'll use updatemenus (whose functionality includes menus as
	 // well as buttons) to create a play button and a pause button.
	 // The play button works by passing `null`, which indicates that
	 // Plotly should animate all frames. The pause button works by
	 // passing `[null]`, which indicates we'd like to interrupt any
	 // currently running animations with a new list of frames. Here
	 // The new list of frames is empty, so it halts the animation.
    updatemenus: [{
      x: 0,
      y: 0,
      yanchor: 'top',
      xanchor: 'left',
      showactive: false,
      direction: 'left',
      type: 'buttons',
      pad: {t: 87, r: 10},
      buttons: [{
        method: 'animate',
        args: [null, {
          mode: 'immediate',
          fromcurrent: true,
          transition: {duration: 300},
          frame: {duration: 500, redraw: false}
        }],
        label: 'Play'
      }, {
        method: 'animate',
        args: [[null], {
          mode: 'immediate',
          transition: {duration: 0},
          frame: {duration: 0, redraw: false}
        }],
        label: 'Pause'
      }]
    }],
	 // Finally, add the slider and use `pad` to position it
	 // nicely next to the buttons.
    sliders: [{
      pad: {l: 130, t: 55},
      currentvalue: {
        visible: true,
        prefix: 'Year:',
        xanchor: 'right',
        font: {size: 20, color: '#666'}
      },
      steps: sliderSteps
    }]
  };

  // Create the plot:
  Plotly.plot('myDiv', {
    data: traces,
    layout: layout,
    frames: frames,
  });
});