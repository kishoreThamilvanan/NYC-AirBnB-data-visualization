// // this creates the plane/SVG where the bar chart can exist.
//     var svg = d3.select("svg"),
//         margin = 150,
//         width = svg.attr("width") - margin,
//         height = svg.attr("height") - margin;
//
// // This creates the name of the bar chart on top of it.
//     svg.append("text")
//        .attr("transform", "translate(400,0)")
//        .attr("x", 50)
//        .attr("y", 50)
//        .attr("font-size", "26px")
//        // .attr("font-family", 'Delicious');
//        .text("AirBnB_Data_Visualizer bar chart");
//
// // This takes care of the padding in between the bars and their heights.
//     var x = d3.scaleBand().range([0, width]).padding(0.5);
//     var y = d3.scaleLinear().range([height, 0]);
//
//
//     var g = svg.append("g")
//           .attr("transform", "translate(" + 100 + "," + 100 + ")");
//
//
//     d3.csv("data/AirBnb data cleaned.csv", function(error, data) {
//         if (error) {
//             throw error;
//         }
//
//         let brooklyn = [];
//         let manhattan = [];
//         let queens = [];
//         let statenIsland = [];
//         let bronx = [];
//
//         // setting up the ranges on each axes
//         x.domain(data.map(function(d) { return d.neighbourhood_group; }));
//         y.domain([0, d3.max(data, function(d) { return d.price; })]);
//
//
//         g.append("g")
//          .attr("transform", "translate(0," + height + ")")
//          .call(d3.axisBottom(x))
//          .append("text")
//          .attr("y", height - 250)
//          .attr("x", width - 100)
//          .attr("text-anchor", "end")
//          .attr("stroke", "black")
//          .text("neighbourhood_group");
//
//         g.append("g")
//          .call(d3.axisLeft(y).tickFormat(function(d){
//              return  d;
//          }).ticks(10))
//
//          .append("text")
//          .attr("transform", "rotate(-90)")
//          .attr("y", 6)
//          .attr("dy", "-5.1em")
//          .attr("text-anchor", "end")
//          .attr("stroke", "black")
//          .text("Price");
//
//         g.selectAll(".bar")
//          .data(data)
//          .enter().append("rect")
//          .attr("class", "bar")
//          .on("mouseover", onMouseOver) //On selection of bar elements, two new event handlers added, viz. mouseover and mouseout and we are calling the respective functions to handle mouse events
//          .on("mouseout", onMouseOut)   //done to apply animation when mouse hovers over a particular bar and goes out
//          .attr("x", function(d) { return x(d.neighbourhood_group); })
//          .attr("y", function(d) { return y(d.price); })
//          .attr("width", x.bandwidth())
//          // .transition()
//          // .ease(d3.easeLinear)
//          // .duration(5000)
//          // .delay(function (d, i) {
//              // return i * 50;
//          // })
//          .attr("height", function(d) { return height - y(d.price); });
//     });
//
//     //mouseover event handler function
//     function onMouseOver(d, i) {
//         d3.select(this).attr('class', 'highlight');  //selected bar (given by the 'this' object)
//         d3.select(this)
//           .transition()     // adds animation
//           .duration(400)
//           .attr('width', x.bandwidth() + 5)
//           .attr("y", function(d) { return y(d.price) - 10; })
//           .attr("height", function(d) { return height - y(d.price) + 10; });
//
//         g.append("text")
//          .attr('class', 'val')
//          .attr('x', function() {
//              return x(d.neighbourhood_group);
//          })
//          .attr('y', function() {
//              return y(d.neighbourhood_group) - 15;
//          });
//     }
//
//     //mouseout event handler function
//     function onMouseOut(d, i) {
//         // use the text label class to remove label on mouseout
//         d3.select(this).attr('class', 'bar');
//         d3.select(this)
//           .transition()     // adds animation
//           .duration(400)
//           .attr('width', x.bandwidth())
//           .attr("y", function(d) { return y(d.price); }) // What if we don't again fix this Value ?
//           .attr("height", function(d) { return height - y(d.price); }); // Play with changing the Value
//
//         d3.selectAll('.val')
//           .remove()
//     }
