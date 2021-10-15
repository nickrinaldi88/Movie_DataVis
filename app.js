// Convert Movie Sheet to CSV


d3.csv("out.csv").then(function (data){


    // establish height and width
    
    let width = 1200
    let height = 500
    let labelPadding = 6

    // console.log(data)

    // create series variable

    // console.log(data.columns.slice(9, 20))

    // console.log(typeof(data.columns.slice(9, 20)))

    // slices data columns
    // look up slice function, 
    // data.colums.slice is an array 
    // map creates a new array populae with results of calling provided funciton 

    //  //   console.log(csv);
    var current_data = {};
    let parse = d3.timeParse("%Y-%m-%d");

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


          current_data[bro].push({
          picked_by: picked,
          movie: film,
          // viewer: bro,
          viewer_rating: bro_rating,
          date: date
        });

      
      };
  
    };

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

    ratings = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    
    console.log(current_data.Derek)

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
        .domain([data[0].date, data[data.length - 1].date])
        .range([margin.left, width - margin.right])
        

    y = d3.scaleLinear()
        .domain([0, 10])
        .range([height - margin.bottom, margin.top])

    xAxis = g => g
        .attr("transform", `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(x).ticks(width/80).tickSizeOuter(0))

    svg.append("g")
        .call(xAxis)

    const serie = svg.append("g")
          .selectAll("g")
          .data(current_data)
          .join("g")

    serie.append("path")
      .merge(serie)
      .attr("fill", "none")
      .attr("stroke", "black")
      .attr("stroke-width", 1.5)
      .attr("d", d3.line()
          .x(d=> x(d.date))
          .y(d=> y(d.viewer_rating)));


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

    // return svg.node();

  }
  );
    


// Implement inline labels
// https://observablehq.com/@d3/inline-labels