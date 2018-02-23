function loadLineGraph() {
  // set the dimensions and margins of the graph
  //
  console.log('in line graph');
  const margin = {
    top: 50, right: 20, bottom: 60, left: 150,
  };
  const width = 960 - margin.left - margin.right;
  const height = 500 - margin.top - margin.bottom;

  // set the ranges
  const x = d3.scaleTime().range([0, width]);
  const y = d3.scaleLinear().range([height, 0]);


  // define the line
  const valueline = d3.line()
    .x(d => x(d.region))
    .y(d => y(d.fat));
    // define the line
  const valueline2 = d3.line()
    .x(d => x(d.region))
    .y(d => y(d.carbo));

    // define the line
  const valueline3 = d3.line()
    .x(d => x(d.region))
    .y(d => y(d.protein));

    // append the svg obgect to the body of the page
    // appends a 'group' element to 'svg'
    // moves the 'group' element to the top left margin
  const svg = d3.select('body').append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr(
      'transform',
      `translate(${margin.left},${margin.top})`,
    );


  const regArr = ['northEurope', 'southEurope', 'centralEurope'];
  let a = 100;

  // Get the data
  d3.json('linegraph.json', (error, data) => {
    if (error) throw error;

    // trigger render
    // draw(data);
    data.forEach((d) => {
      if (regArr.indexOf(d.region) >= 0) {
        d.region = a;
        console.log(d.region);
        a += 100;
      }
      d.fat = d.fat;
      d.carbo = d.carbo;
      d.protein = d.protein;
    });


    x.domain(d3.extent(data, d => d.region));
    y.domain([0, d3.max(data, d => Math.max(d.fat, d.carbo, d.protein))]);


    // Add the valueline path.
    svg.append('path')
      .data([data])
      .attr('class', 'line1')
      .attr('stroke', 'green')
      .text('line1')
      .attr('d', valueline);
    // Add the valueline path.
    svg.append('path')
      .data([data])
      .attr('class', 'line2')
      .text('line2')
      .attr('d', valueline2);

    svg.append('path')
      .data([data])
      .attr('class', 'line3')
      .attr('d', valueline3);


    // Add the X Axis
    svg.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x));

    svg.append('text')
      .attr(
        'transform',
        `translate(${width / 2} ,${
          height + margin.top + 35})`,
      )
      .style('text-anchor', 'middle')
      .text('region');

    // Add the Y Axis
    svg.append('g')
      .call(d3.axisLeft(y));


    // adding values to y axis
    svg.append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', 0 - margin.left)
      .attr('x', 0 - (height / 2))
      .attr('dy', '5em')
      .attr('dx', '.2em')
      .style('text-anchor', 'middle')
      .text('values');

    // adding text to lines
    svg.append('text')
      .attr('transform', `translate(${width + 3},${y(data[0].fat)})`)
      .attr('dy', '-13em')
      .attr('text-anchor', 'middle')
      .style('fill', 'steelblue')
      .text('fat');

    svg.append('text')
      .attr('transform', `translate(${width + 3},${y(data[0].fat)})`)
      .attr('dy', '-23em')
      .attr('text-anchor', 'middle')
      .style('fill', 'green')
      .text('carbo');

    svg.append('text')
      .attr('transform', `translate(${width + 4},${y(data[0].fat)})`)
      .attr('dy', '-8em')
      .attr('dx', '-2em')
      .attr('text-anchor', 'middle')
      .style('fill', 'red')
      .text('protein');

    svg.append('text')
      .attr('transform', `translate(${width + 4},${y(data[0].fat)})`)
      .attr('dy', '3em')
      .attr('dx', '-50em')
      .attr('text-anchor', 'middle')
      .style('fill', 'black')
      .text('North Europe');

    svg.append('text')
      .attr('transform', `translate(${width + 4},${y(data[0].fat)})`)
      .attr('dy', '3em')
      .attr('dx', '-25em')
      .attr('text-anchor', 'middle')
      .style('fill', 'black')
      .text('South Europe');

    svg.append('text')
      .attr('transform', `translate(${width + 4},${y(data[0].fat)})`)
      .attr('dy', '3em')
      .attr('dx', '-2em')
      .attr('text-anchor', 'middle')
      .style('fill', 'black')
      .text('Central Europe');
  });
}


// function draw(data) {
//   // var data = data[country];

//   // format the data
//   data.forEach((d) => {
//     if (regArr.indexOf(d.region) >= 0) {
//       d.region = a;
//       console.log(d.region);
//       a += 100;
//     }
//     d.fat = d.fat;
//     d.carbo = d.carbo;
//     d.protein = d.protein;
//   });


//   x.domain(d3.extent(data, d => d.region));
//   y.domain([0, d3.max(data, d => Math.max(d.fat, d.carbo, d.protein))]);


//   // Add the valueline path.
//   svg.append('path')
//     .data([data])
//     .attr('class', 'line1')
//     .attr('stroke', 'green')
//     .text('line1')
//     .attr('d', valueline);
//   // Add the valueline path.
//   svg.append('path')
//     .data([data])
//     .attr('class', 'line2')
//     .text('line2')
//     .attr('d', valueline2);

//   svg.append('path')
//     .data([data])
//     .attr('class', 'line3')
//     .attr('d', valueline3);


//   // Add the X Axis
//   svg.append('g')
//     .attr('transform', `translate(0,${height})`)
//     .call(d3.axisBottom(x));

//   svg.append('text')
//     .attr(
//       'transform',
//       `translate(${width / 2} ,${
//         height + margin.top + 35})`,
//     )
//     .style('text-anchor', 'middle')
//     .text('region');

//   // Add the Y Axis
//   svg.append('g')
//     .call(d3.axisLeft(y));


//   // adding values to y axis
//   svg.append('text')
//     .attr('transform', 'rotate(-90)')
//     .attr('y', 0 - margin.left)
//     .attr('x', 0 - (height / 2))
//     .attr('dy', '5em')
//     .attr('dx', '.2em')
//     .style('text-anchor', 'middle')
//     .text('values');

//   // adding text to lines
//   svg.append('text')
//     .attr('transform', `translate(${width + 3},${y(data[0].fat)})`)
//     .attr('dy', '-13em')
//     .attr('text-anchor', 'middle')
//     .style('fill', 'steelblue')
//     .text('fat');

//   svg.append('text')
//     .attr('transform', `translate(${width + 3},${y(data[0].fat)})`)
//     .attr('dy', '-23em')
//     .attr('text-anchor', 'middle')
//     .style('fill', 'green')
//     .text('carbo');

//   svg.append('text')
//     .attr('transform', `translate(${width + 4},${y(data[0].fat)})`)
//     .attr('dy', '-8em')
//     .attr('dx', '-2em')
//     .attr('text-anchor', 'middle')
//     .style('fill', 'red')
//     .text('protein');

//   svg.append('text')
//     .attr('transform', `translate(${width + 4},${y(data[0].fat)})`)
//     .attr('dy', '3em')
//     .attr('dx', '-50em')
//     .attr('text-anchor', 'middle')
//     .style('fill', 'black')
//     .text('North Europe');

//   svg.append('text')
//     .attr('transform', `translate(${width + 4},${y(data[0].fat)})`)
//     .attr('dy', '3em')
//     .attr('dx', '-25em')
//     .attr('text-anchor', 'middle')
//     .style('fill', 'black')
//     .text('South Europe');

//   svg.append('text')
//     .attr('transform', `translate(${width + 4},${y(data[0].fat)})`)
//     .attr('dy', '3em')
//     .attr('dx', '-2em')
//     .attr('text-anchor', 'middle')
//     .style('fill', 'black')
//     .text('Central Europe');
// }
