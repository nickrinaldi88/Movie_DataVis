// Convert Movie Sheet to CSV


d3.csv("out.csv").then(function (data){


    // establish height and width
    
    let width = 1200
    let height = 500
    let labelPadding = 6

    console.log(data)

    // create series variable.

    // console.log(data.columns.slice(9, 20))

    // console.log(typeof(data.columns.slice(9, 20)))

    // slices data columns
    // look up slice function, 
    // data.colums.slice is an array 
    // map creates a new array populae with results of calling provided funciton 

    //  //   console.log(csv);
    let current_data = {};
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

        let movie = item['Movie']
        let picked = item['Picked by:']
        let viewer = bros[j]
        let viewer_rating = item[bros[j]]
        console.log("row " + String(i));
        console.log("Movie: " + String(item['Movie']));
        console.log("Picked By: " + String(item['Picked by:']));
        console.log("Viewer: " + String(bros[j]));
        console.log("Viewer Rating: "  + String(item[bros[j]]));        // console.log(typeof(item))
        // console.log(item.Derek);
        // console.log(bros[j]);
        // console.log(item.bros[j]);
    }
  
    
    }

    // for (let i = 0; i < data.length; i++) {
    //   let item = data[i];
      // if (!current_data[item.]) current_data[item.Word] = [];

    // current_data[bros[j]].push({
    //   date: parse(item.Date),
    //   rating: item.value,
    //   pickedBy: item.  

  
  
  
  
  
  
  //   }

  // for (let i = 0; i < data.length; i++) {
  //     let item = data[i];
  //     if (!current_data[item.]) current_data[item.Word] = [];

  //   current_data[item.Word].push({
  //     date: parse(item.Date),
  //     count: item.Count,
  //   });
  // }









    // let rangeOfbros = [9, 20]
    // let bros =  {rating:,
    //              movie_name: data['Movie'],
    //              Picked_by: data['Picked by:'],
                //  date: data['Date']}

    console.log(data.columns('Picked by:'))
    let series = data.columns.slice(9, 20).map(key => data.map(({[key]: value,  date}) => ({key, date, value})))




    const svg = d3.create("svg")
            .attr("viewBox", [0, 0, width, height]);

    const serie = svg.append("g")
    .selectAll("g")
    .data(series)
    .join("g");

    margin = ({top: 30, right: 50, bottom: 30, left: 30})

    xAxis = g => g
        .attr("transform", `translate(0,${height - margin.bottom})`)

    x = d3.scaleUtc()
        .domain([data[0].date, data[data.length - 1].date])
        .range([margin.left, width - margin.right])

    y = d3.scaleLinear()
        .domain([0, d3.max(series, s => d3.max(s, d => d.value))])
        .range([height - margin.bottom, margin.top])

    z = d3.scaleOrdinal(data.columns.slice(1), d3.schemeCategory10)

    svg.append("g")
        .call(xAxis) // call x axis
    
    serie.append("path")
          .attr("fill", "none")
          .attr("stroke", d => z(d[0].key))
          .attr("stroke-width", 1.5)
          .attr("d", d3.line()
              .x(d => x(d.date))
              .y(d => y(d.value)));
    
    serie.append("g")
          .attr("font-family", "sans-serif")
          .attr("font-size", 10)
          .attr("stroke-linecap", "round")
          .attr("stroke-linejoin", "round")
          .attr("text-anchor", "middle")
        .selectAll("text")
        .data(d => d)
        .join("text")
          .text(d => d.value)
          .attr("dy", "0.35em")
          .attr("x", d => x(d.date))
          .attr("y", d => y(d.value))
          .call(text => text.filter((d, i, data) => i === data.length - 1)
            .append("tspan")
              .attr("font-weight", "bold")
              .text(d => ` ${d.key}`))
        .clone(true).lower()
          .attr("fill", "none")
          .attr("stroke", "white")
          .attr("stroke-width", labelPadding);
    
      return svg.node();



  });
    


// Implement inline labels
// https://observablehq.com/@d3/inline-labels