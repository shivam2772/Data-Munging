function loadBarGraph() {
  console.log('in bar graph');
  const margin = {
      top: 20, right: 20, bottom: 100, left: 120,
    },
    width = 1000 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;


    // set the ranges
  const x = d3.scaleBand().range([0, width]).padding(0.1);

  const y = d3.scaleLinear().range([height, 0]);

  // define the axis
  //  var xAxis = d3.svg.axis()
  //      .scale(x)
  //      .orient("bottom")


  // var yAxis = d3.svg.axis()
  //      .scale(y)
  //      .orient("left")
  //      .ticks(10);


  // add the SVG element
  const svg = d3.select('body').append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr(
      'transform',
      `translate(${margin.left},${margin.top})`,
    );


    // load the data
  d3.json('bargraph.json', (error, data) => {
    data.forEach((d) => {
      d.countries = d.country;
      d.salt_sug = +(d.salt + d.sugar);
    });

    // scale the range of the data
    x.domain(data.map(d => d.countries));
    y.domain([0, d3.max(data, d => d.salt_sug)]);

    // add axis
    svg.append('g')
      .attr('class', 'x axis')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x))
      .selectAll('text')
      .style('text-anchor', 'end')
      .attr('dx', '-.8em')
      .attr('dy', '-.55em')
      .attr('transform', 'rotate(-90)');

    svg.append('g')
      .attr('class', 'y axis')
      .call(d3.axisLeft(y))
      .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', 5)
      .attr('dy', '.71em')
      .style('text-anchor', 'end');


    // Add bar chart
    svg.selectAll('.bar')
      .data(data)
      .enter().append('rect')
      .attr('class', 'bar')
      .attr('x', d => x(d.countries))
      .attr('width', x.bandwidth())
      .attr('y', d => y(d.salt_sug))
      .attr('height', d => height - y(d.salt_sug));
  });
}
