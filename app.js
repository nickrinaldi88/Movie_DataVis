// Convert Movie Sheet to CSV


d3.csv("out.csv").then(function (data){


    // establish height and width
    
    let width = 1200
    let height = 500
    let labelPadding = 6


    // create series variable

    // console.log(data.columns.slice(9, 20))

    // console.log(typeof(data.columns.slice(9, 20)))

    // slices data columns
    // look up slice function, 
    // data.colums.slice is an array 
    // map creates a new array populae with results of calling provided funciton 


    series = data.columns.slice(9, 20).map(key => data.map(({[key]: value, Date, Movie, Pickedby}) => ({key, Date, value, Movie, Pickedby})));
    // series.forEach(d => {
    //   d.value = +d.value;
      
    // });



    // series[0][0].value = parseFloat('0')

    // console.log(typeof(series[0][0].value))
    // console.log(series[0][0].value)

    let new_series = {};

   
    for (let j = 0; j < series.length; j++) {

      new_series[j] = []
        for (let i = 0; i < series[j].length; i++){

        if (!Number.isNaN(series[j][i].value)){

          series[j][i].Date = new Date(series[j][i].Date)

          series[j][i].value = parseFloat(series[j][i].value)

          if (!Number.isNaN(series[j][i].value)){

          
            new_series[j][i] = {}
            new_series[j][i] = series[j][i]
            // let new_series = series.remove(series[i][j])

          }
          
        
        
        
        }


    }

    console.log(new_series);

    

    var svg = d3
    .select("#main-div")
    .classed("svg-container", true)
    .append("svg")
    // .attr("preserveAspectRatio", "xMinYMin meet")
    // .attr("width", width + margin.left + margin.right)
    // .attr("height", height + margin.top + margin.bottom)
    .attr("viewBox", "0 0 1400 500")
    .append("g")
    .attr("transform", "translate(80, 20)");

    var focus = svg
    .append('g')
    .append('circle')
      .style("fill", "none")
      .attr("stroke", "black")
      .attr('r', 8.5)
      .style("opacity", 0)

    //  //   console.log(csv);
    var current_data = {};

    let bros = ['Derek',
                'Daniel',
                'DP',
                'Nick',
                'Austin',
                'Connor',
                'Basil',
                'Mike V',
                'Gil',
                'Will',
                'Guest']

    // Generate mapping object of [picked by] to movie: viewer, viewer rating
    // attached mapping values to select statements
    // implement line logic to depend on values selected 

    for (let j = 0; j < bros.length; j++) {


    for (let i = 0; i < data.length; i++) {
        // line of data
        let item = data[i];

        let film = item['Movie']
        var picked = item['Picked by:']
        let bro = bros[j]
        let bro_rating = item[bros[j]]
        let date = item['Date']

      if (!current_data[bro]){
        current_data[bro] = [];
    };

      if (bro_rating !== 'x' || 'fp'){}
          current_data[bro].push({
          picked_by: picked,
          movie: film,
          // viewer: bro,
          viewer_rating: bro_rating,
          date: date
        });

      
      };
  
    };

    console.log()

    ratings = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    
    // console.log(current_data.Derek)

    margin = ({top: 30, right: 50, bottom: 30, left: 30})

    first_select = d3.select("#select1")
      .selectAll("option")
      .data(Object.keys(current_data))
      .enter()
      .append("option")
      .text(function (d){
        return d});


    second_select = d3.select("#select2")
      .selectAll("option")
      .data(Object.keys(current_data))
      .enter()
      .append("option")
      .text(function (d){
        return d
      });

    z = d3.scaleOrdinal(data.columns.slice(9, 20), d3.schemeCategory10)

    x = d3.scaleUtc()
        .domain([data.Date, new_series[0][new_series[0].length - 1].Date])
        .range([margin.left, width - margin.right])
        
    y = d3.scaleLinear()
        .domain([0, d3.max(new_series, s => d3.max(s, d => d.value))])
        .range([height - margin.bottom, margin.top])

    xAxis = g => g
        .attr("transform", `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(x).ticks(width/80).tickSizeOuter(0))

    svg.append("g")
        .call(xAxis)


    svg.append("path")
        .datum(new_series)
        .join("g")
        .attr("fill", "none")
        .attr("stroke", "black")
        .attr("stroke-width", 5.5)
        .attr("d", d3.line()
            .x(function(d) {return x(d.Date)})
            .y(function(d) {return y(d.value)}))



    // serie.append("g")
    //   .attr("font-family", "sans-serif")
    //   .attr("font-size", 10)
    //   .attr("stroke-linecap", "round")
    //   .attr("stroke-linejoin", "round")
    //   .attr("text-anchor", "middle")
    // .selectAll("text")
    // .data(d => d)
    // .join("text")
    //   .text(d => d.viewer_rating)
    //   .attr("dy", "0.35em")
    //   .attr("x", d=> x(d.date))
    //   .attr("y", d=> y(d.viewer_rating))
    //   .call(text => text.filter((d, i, data) => i === data.length -1))
    //   .append("tspan")
    //     .attr("font-weight", "bold")
    //     .text(d =>`${d.key}`)
    // .clone(true).lower()
    //   .attr("fill", "none")
    //   .attr("stroke", "white")
    //   .attr("stroke-width", labelPadding)
    
  
  }});
    

  
// Implement inline labels
// https://observablehq.com/@d3/inline-labels