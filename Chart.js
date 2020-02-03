// import { NONAME } from "dns";

//Basic setups
class GraphChart {

    constructor(){
        this.chart;
        this.jsonObj;
        this.dataObj;

        this.dataArray;

        this.xHeader;
        this.yHeaders;

        this.xArr;
        this.yArr=new Array();

        this.xTitle;
        this.yTitle;

        this.histogramHeaders;
        this.histogramArray;
        this.singleHeader;

        this.sortedScatterPlotArr;
    }
    
    /*GraphType:
    1 - line
    2 - bar
    3 - radar
    4 - doughnut and pie
    5 - polar area
    6 - bubble
    7 - scatter
    */

   init(dataset, xHeader, yHeaders, sorted=false){
    
    this.xHeader = xHeader;
    this.yHeaders = yHeaders;
    this.sorted = sorted;
    this.loadJson(dataset);
    if(sorted){
        this.sortJsonById(xHeader);
    }
    this.extractXYArray(this.xHeader, this.yHeaders);
    
}
    initWithAllData(dataset, xHeader){
        
        this.xHeader = xHeader;
        this.loadData(dataset);
        this.yHeaders = this.getHeaderNamesFromObj(this.jsonObj);
        
        this.extractXYArray(this.xHeader, this.yHeaders);
    }

    showVerticalLine(){
        Chart.plugins.register({
            afterDatasetsDraw: function(chart) {
               if (chart.tooltip._active && chart.tooltip._active.length) {
                  var activePoint = chart.tooltip._active[0],
                      ctx = chart.ctx,
                      y_axis = chart.scales['y-axis-0'],
                      x = activePoint.tooltipPosition().x,
                      topY = y_axis.top,
                      bottomY = y_axis.bottom;
                  // draw line
                  ctx.save();
                  ctx.beginPath();
                  ctx.moveTo(x, topY);
                  ctx.lineTo(x, bottomY);
                  ctx.lineWidth = 1;
                  ctx.strokeStyle = '#B7B7B7';
                 
                  ctx.stroke();
                  ctx.restore();
               }
            }
         });
    }

    
    extractChartAsJson(){
        console.log("Only a function signature. Implementation in child class not found.")
    }

    getHeaderNamesFromObj(jsonObj){
        console.log("GetHeaderNames Called");
        return Object.keys(jsonObj[0]);
    }

    setHistogramHeader(header){
        this.histogramHeaders = header;
    }

    loadData(data){
        console.log("loadData Called");
        this.dataObj = data;
        this.jsonObj = JSON.parse(this.dataObj);
    }

    loadJson(json){
        console.log("LoadJson Called");
        this.jsonObj = json;
    }

    sortJsonById(idToBeSorted){
        this.jsonObj.sort(function(a,b) {
            return (parseFloat(a[idToBeSorted]) - parseFloat(b[idToBeSorted]));
        })
    }

    destroyChart(){
        this.chart.destroy();
    }

    getArrayFromDataWithHeader(labelName){
        return this.jsonObj.map(function (d) {return d[labelName]});
    }

    getIntArrayFromDataWithHeader(labelName){
        return this.jsonObj.map(function (d) { return parseInt(d[labelName]) });
    }

    getFloatArrayFromDataWithHeader(labelName){
        return this.jsonObj.map(function (d) { return parseFloat(d[labelName]) });
    }


    /**********************
    *  Takes xHeader and yHeaders[] for arguments.
    *  This splits and sets the graph's x and y[] attributes.
    *  TODO: Later this should be fixed so that this method is returning
    *         the arrays instead of actually storing them.
    **********************/
    extractXYArray(xArrHeader, yArrHeaders=null){
        this.xArr = this.jsonObj.map(function (d) {
            // const labelVar = d[xArrHeaders];
            return d[xArrHeader];
        });
        if(yArrHeaders != null){
            yArrHeaders.forEach(function (headers) {
                this.yArr.push(
                    this.jsonObj.map(function (d) { return d[headers];} )
                );
            }, this)
        }    
    }

    extractArray(varName){
        return this.jsonObj.map(function (d) {
            // const labelVar = d[xArrHeaders];
            return d[varName];
        });  
    }

    //==========================

    createHistogram(header){
        this.histogramHeaders=[];
        this.histogramArray=[];
        let tempArray = this.getFloatArrayFromDataWithHeader(header).sort((a,b) => a-b);
        let prev;

        for (var i in tempArray){
            if (tempArray[i] !== prev){
                this.histogramHeaders.push(tempArray[i]);
                this.histogramArray.push(1);
            }
            else{
                this.histogramArray[this.histogramArray.length-1]++;
            }
            prev=tempArray[i];
        }

    }

    setHitRadius(radius){
        this.chart.options.elements.point.hitRadius = radius;
    }
    setXLabel(label){
        this.chart.options.scales.xAxes[0].scaleLabel.display = true;
        this.chart.options.scales.xAxes[0].scaleLabel.labelString = this.xTitle;
    }
    setYLabel(label){
        this.chart.options.scales.yAxes[0].scaleLabel.display = true;
        this.chart.options.scales.yAxes[0].scaleLabel.labelString = this.yTitle;
    }

    showAllData(){
        this.chart.data.datasets.forEach(function(e, i) {
            var meta = this.chart.getDatasetMeta(i);
            meta.hidden = null;
        }, this);
        this.chart.update();
    }

    hideAllData(){
        this.chart.data.datasets.forEach(function(e, i) {
            var meta = this.chart.getDatasetMeta(i);
            meta.hidden = true;
        }, this);
        this.chart.update();
    }

    showOne(dataName){
        this.hideAllData();
        for (var i in this.chart.data.datasets){
            if(this.chart.data.datasets[i].label == dataName){
                var meta = this.chart.getDatasetMeta(i);
                meta.hidden = null;
                break;
            }
        }
        this.chart.update();
    }

    createChart(contentIdName, graphType){
        try{
        var ctx = document.getElementById(contentIdName).getContext('2d');
        this.graphTypes = ['line', 'bar', 'radar', 'pie', 'polarArea', 'bubble', 'scatter']
        this.chart = new Chart(ctx, {
            type: this.graphTypes[graphType-1],
            // data: {
            //     labels: [this.xHeader],
            //     // labels: this.xArr,
            // },
            options: {
                tooltips: {
                    mode: 'index',
                    intersect: false
                    // axis: 'x'
                },
                // legend: {
                //     labels: {
                //         fontColor: 'white',
                //     }
                // },
                responsive: true,
                // maintainAspectRatio: false, Note: This has been causing a lot of errors.
                plugins: {
                    zoom: {
                        pan: {
                            enabled: false,
                            mode: 'x',
                            speed: 1000,
                            threshold: 10,
    
                        },
                        zoom: {
                            enabled: false,
                            mode: 'x',
                            sensitivity: 0.1,
                            drag: false,
                        }      
                    },
                },
            }
        })
        try{

            this.setOverallColor("black");
        } catch(err) {console.log(err)}
    } catch(err){console.log("err: " + err)}
        this.chart.update();
    }

    setOverallColor(color){
        this.setFontColor(color);
        this.setGridLineColor("rgb(0,0,0,0.1)");
        this.setAxisLabelColor(color);
        this.chart.update();
    }

    // Dont think its working. Gotta test it later.
    setFontColor(color){
        this.chart.options.legend.labels.fontColor = color;
    }

    setGridLineColor(color){
        try{
        this.chart.options.scales.xAxes[0].gridLines.color = color;
        this.chart.options.scales.yAxes[0].gridLines.color = color;
        } catch(err) {console.log(err)}
    }

    setAxisLabelColor(color){
        this.chart.options.scales.xAxes[0].ticks.fontColor = color;
        this.chart.options.scales.yAxes[0].ticks.fontColor = color;
    }
}