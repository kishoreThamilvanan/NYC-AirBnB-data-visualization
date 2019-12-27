const svg = d3.select('svg');

const width = +svg.attr('width');
const height = +svg.attr('height');

d3.csv('data/HW2_cleaned_dat.csv', function(error, data){

    if (error) {
        throw error;
    }

    data.forEach( function(d){
        d.id = +d.id;
        d.host_id = +d.host_id;
        d.latitude = +d.latitude;
        d.longitude = +d.longitude;
        d.price = +d.price;
        d.minimum_nights = +d.minimum_nights;
        d.Average_review = +d.Average_review;
        d.number_of_reviews = +d.number_of_reviews;
        d.reviews_per_month = +d.reviews_per_month;
        d.calculated_host_listings_count = +d.calculated_host_listings_count;
        d.availability_365 = +d.availability_365;
    });

    const title = 'AirBnb Prices Vs Reviews Per month';

    const xValue = d => d.price;
    const xAxisLabel = 'Prices';

    const yValue = d => d.reviews_per_month;
    const circleRadius = 4;
    const yAxisLabel = 'Reviews Per Month';

    const margin = { top: 60, right: 40, bottom: 88, left: 150 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const xScale = d3.scaleLinear()
        .domain(d3.extent(data, xValue))
        .range([0, innerWidth])
        .nice();

    const yScale = d3.scaleLinear()
        .domain(d3.extent(data, yValue))
        .range([innerHeight, 0])
        .nice();

    const g = svg.append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

    const xAxis = d3.axisBottom(xScale)
        .tickSize(-innerHeight)
        .tickPadding(15);

    const yAxis = d3.axisLeft(yScale)
        .tickSize(-innerWidth)
        .tickPadding(10);

    const yAxisG = g.append('g').call(yAxis);
    yAxisG.selectAll('.domain').remove();

    yAxisG.append('text')
        .attr('class', 'axis-label')
        .attr('y', -93)
        .attr('x', -innerHeight / 2)
        .attr('fill', 'black')
        .attr('transform', `rotate(-90)`)
        .attr('text-anchor', 'middle')
        .text(yAxisLabel);

    const xAxisG = g.append('g').call(xAxis)
        .attr('transform', `translate(0,${innerHeight})`);

    xAxisG.select('.domain').remove();

    xAxisG.append('text')
        .attr('class', 'axis-label')
        .attr('y', 75)
        .attr('x', innerWidth / 2)
        .attr('fill', 'black')
        .text(xAxisLabel);

    g.selectAll('circle').data(data)
        .enter().append('circle')
        .attr('cy', d => yScale(yValue(d)))
        .attr('cx', d => xScale(xValue(d)))
        .attr('r', circleRadius)
        .attr("opacity", "0.5");

    g.append('text')
        .attr('class', 'title')
        .attr('y', -36)
        .text(title);

});
