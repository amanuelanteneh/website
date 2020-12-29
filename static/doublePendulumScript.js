
const CHART_WIDTH = 600;
const CHART_HEIGHT = 400;

const chartContainer = d3.select('svg')
                        .attr('width',CHART_WIDTH)
                        .attr('height', CHART_HEIGHT);
  
chart = chartContainer.append('g');

