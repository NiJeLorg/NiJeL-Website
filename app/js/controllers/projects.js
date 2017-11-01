import * as d3 from 'd3';


/*
 * Creates tooltip with provided id that
 * floats on top of visualization.
 * Most styling is expected to come from CSS
 * so check out bubble_chart.css for more details.
 */
function floatingTooltip(tooltipId, width) {
    // Local variable to hold tooltip div for
    // manipulation in other functions.
    var tt = d3.select('body')
        .append('div')
        .attr('class', 'tooltip')
        .attr('id', tooltipId)
        .style('pointer-events', 'none');

    // Set a width if it is provided.
    if (width) {
        tt.style('width', width);
    }

    // Initially it is hidden.
    hideTooltip();

    /*
     * Display tooltip with provided content.
     *
     * content is expected to be HTML string.
     *
     * event is d3.event for positioning.
     */
    function showTooltip(content, event) {
        tt.style('opacity', 1.0)
            .html(content);

        updatePosition(event);
    }

    /*
     * Hide the tooltip div.
     */
    function hideTooltip() {
        tt.style('opacity', 0.0);
    }

    /*
     * Figure out where to place the tooltip
     * based on d3 mouse event.
     */
    function updatePosition(event) {
        var xOffset = 20;
        var yOffset = 10;

        var ttw = tt.style('width');
        var tth = tt.style('height');

        var wscrY = window.scrollY;
        var wscrX = window.scrollX;

        var curX = (document.all) ? event.clientX + wscrX : event.pageX;
        var curY = (document.all) ? event.clientY + wscrY : event.pageY;
        var ttleft = ((curX - wscrX + xOffset * 2 + ttw) > window.innerWidth) ?
            curX - ttw - xOffset * 2 : curX + xOffset;

        if (ttleft < wscrX + xOffset) {
            ttleft = wscrX + xOffset;
        }

        var tttop = ((curY - wscrY + yOffset * 2 + tth) > window.innerHeight) ?
            curY - tth - yOffset * 2 : curY + yOffset;

        if (tttop < wscrY + yOffset) {
            tttop = curY + yOffset;
        }

        tt
            .style('top', tttop + 'px')
            .style('left', ttleft + 'px');
    }

    return {
        showTooltip: showTooltip,
        hideTooltip: hideTooltip,
        updatePosition: updatePosition
    };
}



const ProjectsCtrl = ($scope, $http, $state, ClientDataService) => {

    let promise = ClientDataService.fetchProjects();

    promise.then((res) => {
        let projects = res.data.projects;
        $scope.earlyProjects = [],
            $scope.midProjects = [],
            $scope.lateProjects = [];

        projects.map((project) => {
            if (project.year >= 2008 && project.year <= 2010) {
                $scope.earlyProjects.push(project);
            } else if (project.year > 2010 && project.year <= 2014) {
                $scope.midProjects.push(project)
            } else {
                $scope.lateProjects.push(project);
            }
        });



        let sdgColorScale = {
            1: '#E5233D',
            2: '#DDA73A',
            3: '#4CA146',
            4: '#C7212F',
            5: '#EE402D',
            6: '#28BFE6',
            7: '#FBC412',
            8: '#A31D44',
            9: '#F26A2E',
            10: '#DE1768',
            11: '#F89D2A',
            12: '#BF8D2C',
            13: '#407F46',
            14: '#1F97D4',
            15: '#59BA47',
            16: '#136A9F',
            17: '#14496B',
            Other: '#AC8EB2'
        };

        const bubbleChart = () => {
            // constants for sizing
            let width = 1100,
                height = 800;

            let tooltip = floatingTooltip('gates_tooltip', 240);

            // Locations to move bubbles towards, depending
            // on which view mode is selected.
            const center = {
                x: width / 2,
                y: height / 2
            };

            let yearCenters = {
                2008: {
                    x: width / 3,
                    y: height / 2
                },
                2011: {
                    x: width / 2,
                    y: height / 2
                },
                2015: {
                    x: 2 * width / 3,
                    y: height / 2
                }
            };

            // X locations of the year titles.
            let yearsTitleX = {
                2008: 160,
                2011: width / 2,
                2014: width - 160
            };


            // @v4 strength to apply to the position forces
            var forceStrength = 0.03;

            // These will be set in create_nodes and create_vis
            var svg = null;
            var bubbles = null;
            var nodes = [];

            const charge = (d) => {
                return -Math.pow(d.radius, 2.0) * forceStrength;
            };

            var simulation = d3.forceSimulation()
                .velocityDecay(0.2)
                .force('x', d3.forceX().strength(forceStrength).x(center.x))
                .force('y', d3.forceY().strength(forceStrength).y(center.y))
                .force('charge', d3.forceManyBody().strength(charge))
                .on('tick', ticked);

            simulation.stop();

            function createNodes() {
                // Use the max total_amount in the data as the max in the scale's domain
                // note we have to ensure the total_amount is a number.
                var maxAmount = d3.max(projects, function (d) {
                    return +d.client.length;
                });

                // Sizes bubbles based on area.
                // @v4: new flattened scale names.
                var radiusScale = d3.scalePow()
                    .exponent(0.5)
                    .range([2, 85])
                    .domain([0, maxAmount]);

                // Use map() to convert raw data into node data.
                // Checkout http://learnjsdata.com/ for more on
                // working with data.
                var myNodes = projects.map(function (d) {
                    return {
                        radius: radiusScale(+d.name.length),
                        value: +d.name.length,
                        projectId: d._id,
                        clientName: d.client,
                        projectName: d.name,
                        coverPhoto: d.coverPhoto,
                        linkToLiveSite: d.linkToLiveSite,
                        sdgNumber: d.relevantSDG,
                        year: d.year,
                        x: Math.random() * 900,
                        y: Math.random() * 800
                    };
                });

                // sort them to prevent occlusion of smaller nodes.
                myNodes.sort(function (a, b) {
                    return b.value - a.value;
                });

                return myNodes;

            }

            var chart = function chart() {
                // convert raw data into nodes data
                nodes = createNodes(projects);

                // Create a SVG element inside the provided selector
                // with desired size.
                svg = d3.select('.projects-holder')
                    .append('svg')
                    .attr('width', width)
                    .attr('height', height);

                // Bind nodes data to what will become DOM elements to represent them.
                bubbles = svg.selectAll('.bubble')
                    .data(nodes, function (d) {
                        return d.id;
                    });

                let defs = svg.append('defs');

                defs.append('pattern')
                    .attr('id', 'jon-snow')
                    .attr('height', '100%')
                    .attr('width', '100%')
                    .attr('patternContentUnits', 'objectBoundingBox')
                    .append('image')
                    .attr('height', 1)
                    .attr('width', 1)
                    .attr('preserveAspectRatio', 'none')
                    .attr('xmlns:xlink', 'http://www.w3.org/1999/xlink')
                    .attr('xlink:href', 'assets/man_ex.png');



                defs.selectAll('.coverphoto-pattern')
                    .data(nodes)
                    .enter().append('pattern')
                    .attr('class', 'coverphoto-pattern')
                    .attr('id', (d) => {
                        return d.projectId;
                    })
                    .attr('height', '100%')
                    .attr('width', '100%')
                    .attr('patternContentUnits', 'objectBoundingBox')
                    .append('image')
                    .attr('height', 1)
                    .attr('width', 1)
                    .attr('preserveAspectRatio', 'none')
                    .attr('xmlns:xlink', 'http://www.w3.org/1999/xlink')
                    .attr('xlink:href', (d) => {
                        return d.coverPhoto;
                    });


                // Create new circle elements each with class `bubble`.
                // There will be one circle.bubble for each object in the nodes array.
                // Initially, their radius (r attribute) will be 0.
                // @v4 Selections are immutable, so lets capture the
                //  enter selection to apply our transtition to below.
                var bubblesE = bubbles.enter().append('circle')
                    .classed('bubble', true)
                    .attr('r', 0)
                    .attr('fill', (d) => {
                        if (d.coverPhoto) {
                            return 'url(#' + d.projectId + ')';
                        } else {
                            return '#fff';
                        }
                    })
                    .attr('stroke', (d) => {
                        return d3.rgb(sdgColorScale[d.sdgNumber]);
                    })
                    .attr('stroke-width', 3)
                    .on('mouseover', showDetail)
                    .on('mouseout', hideDetail)
                    .on('click', (d) => {
                        $state.go('project', {
                            id: d.projectId,
                            projectInfo: d
                        });
                        document.querySelector('.tooltip').remove();
                    });




                // @v4 Merge the original empty selection and the enter selection
                bubbles = bubbles.merge(bubblesE);

                // Fancy transition to make bubbles appear, ending with the
                // correct radius
                bubbles.transition()
                    .duration(2000)
                    .attr('r', function (d) {
                        return d.radius;
                    });

                // Set the simulation's nodes to our newly created nodes array.
                // @v4 Once we set the nodes, the simulation will start running automatically!
                simulation.nodes(nodes);

                // Set initial layout to single group.
                groupBubbles();
            };

            function ticked() {
                bubbles
                    .attr('cx', function (d) {
                        return d.x;
                    })
                    .attr('cy', function (d) {
                        return d.y;
                    });
            }

            function nodeYearPos(d) {
                if (d.year > 2007 && d.year <= 2010) {
                    return yearCenters[2008].x;
                } else if (d.year >= 2011 && d.year <= 2014) {
                    return yearCenters[2011].x;
                } else {
                    return yearCenters[2015].x;
                }
            }


            function groupBubbles() {

                hideYearTitles();

                // @v4 Reset the 'x' force to draw the bubbles to the center.
                simulation.force('x', d3.forceX().strength(forceStrength).x(center.x));

                // @v4 We can reset the alpha value and restart the simulation
                simulation.alpha(1).restart();
            }

            function splitBubbles() {
                showYearTitles();

                // @v4 Reset the 'x' force to draw the bubbles to their year centers
                simulation.force('x', d3.forceX().strength(forceStrength).x(nodeYearPos));

                // @v4 We can reset the alpha value and restart the simulation
                simulation.alpha(1).restart();
            }

            function hideYearTitles() {
                svg.selectAll('.year').remove();
            }

            function showYearTitles() {
                // Another way to do this would be to create
                // the year texts once and then just hide them.
                var yearsData = d3.keys(yearsTitleX);
                var years = svg.selectAll('.year')
                    .data(yearsData);

                years.enter().append('text')
                    .attr('class', 'year')
                    .attr('x', function (d) {
                        return yearsTitleX[d];
                    })
                    .attr('y', 40)
                    .attr('text-anchor', 'middle')
                    .text(function (d) {
                        if (d == 2008) {
                            return '2008 - 2010';
                        } else if (d == 2011) {
                            return '2011 - 2014';
                        } else {
                            return '2015 - 2017';
                        }
                        return d;
                    });
            }

            function showDetail(d) {
                // change outline to indicate hover state.
                d3.select(this).attr('stroke', 'black');

                var content = '<span class="name">Client: </span><span class="value">' +
                    d.clientName +
                    '</span><br/>' +
                    '<span class="name">Project Name: </span><span class="value">' +
                    d.projectName +
                    '</span><br/>' +
                    '<span class="name">Project Year: </span><span class="value">' +
                    d.year +
                    '</span>';

                tooltip.showTooltip(content, d3.event);
            }

            function hideDetail(d) {
                // reset outline
                d3.select(this)
                    .attr('stroke', d3.rgb(sdgColorScale[d.sdgNumber]).darker());

                tooltip.hideTooltip();
            }


            function setupButtons() {
                d3.select('#toolbar')
                    .selectAll('.button')
                    .on('click', function () {
                        // Remove active class from all buttons
                        d3.selectAll('.button').classed('active', false);
                        // Find the button just clicked
                        var button = d3.select(this);

                        // Set it as the active button
                        button.classed('active', true);

                        // Get the id of the button
                        var buttonId = button.attr('id');

                        // Toggle the bubble chart based on
                        // the currently clicked button.
                        bubbleChart.toggleDisplay(buttonId);
                    });
            }

            // setup the buttons.
            setupButtons();

            bubbleChart.toggleDisplay = function (displayName) {
                if (displayName === 'year') {
                    splitBubbles();
                } else {
                    groupBubbles();
                }
            };

            chart();

        };

        bubbleChart();

    }, (err) => {
        console.log(err);
    });



};

export default ProjectsCtrl;
