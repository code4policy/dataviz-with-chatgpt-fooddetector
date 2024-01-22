// Load data from CSV and create bar chart
d3.csv("boston_311_2023_by_reason.csv")
  .then(function(data) {
    // Assuming CSV columns are "reason" and "Count"
    
    // Sort data by Count in descending order
    data.sort((a, b) => d3.descending(+a.Count, +b.Count));

    // Set up the chart dimensions
    const margin = { top: 100, right: 100, bottom: 100, left: 100 };
    const width = 800 - margin.left - margin.right;
    const height = 500 - margin.top - margin.bottom;

    // Create SVG container
    const svg = d3.select("#chart-container")
  .append("svg")
  .attr("width", 5000 + margin.left + margin.right)  // Replace newWidth with your desired width
  .attr("height", 1000 + margin.top + margin.bottom) // Replace newHeight with your desired height
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Create X and Y scales
    const xScale = d3.scaleBand().range([0, width]).padding(0.1);
    const yScale = d3.scaleLinear().range([height, 0]);

    // Set domain of X and Y scales
    xScale.domain(data.map(d => d.reason));
    yScale.domain([0, d3.max(data, d => +d.Count)]);

    // Create bars
    svg.selectAll(".bar")
      .data(data)
      .enter().append("rect")
      .attr("class", "bar")
      .attr("x", d => xScale(d.reason))
      .attr("width", xScale.bandwidth())
      .attr("y", d => yScale(+d.Count))
      .attr("height", d => height - yScale(+d.Count));

    // Add X axis
    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(xScale))
      .selectAll("text")
      .style("text-anchor", "end")
      .attr("transform", "rotate(-45)");

    // Add Y axis
    svg.append("g")
      .call(d3.axisLeft(yScale));

    // Add chart title
    svg.append("text")
      .attr("x", width / 2)
      .attr("y", 0 - margin.top / 2)
      .attr("text-anchor", "middle")
      .style("font-size", "16px")
      .style("text-decoration", "underline")
      .text("Enforcement and abandoned vehicles is the most common reason for 311 calls");
  })
  .catch(function(error) {
    console.error("Error loading the CSV file:", error);
  });

