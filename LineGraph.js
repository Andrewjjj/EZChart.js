class LineGraph extends GraphChart {

    initLineGraph(dataset, contenetIdName, xHeader, yHeaders, sorted){
        this.init(dataset, xHeader, yHeaders, sorted);
        this.createChart(contenetIdName, 1);
        this.fetchLineGraphData();
        this.chart.options.elements.point.pointStyle = "line"
        this.chart.update();
    }

    initLineGraphAll(dataset, contentIdName, xHeader){
        this.initWithAllData(dataset, xHeader);
        this.createChart(contentIdName, 1);
        this.chart.options.elements.point.pointStyle = "line"
        this.chart.options.elements.line.tension = 1;
        this.fetchLineGraphData();
    }

    //TODO: Fix Color Function
    fetchLineGraphData(){
        this.borderColors = ["#D98880", "#F1948A", "#C39BD3", "#BB8FCE", "#7FB3D5", "#85C1E9","#76D7C4", "#73C6B6", "#7DCEA0", "#82E0AA", "#F7DC6F", "#F8C471", "#F0B27A", "#E59866", "#BFC9CA", "#85929E"];
        this.chart.data.labels = this.xArr;
        this.yHeaders.forEach(function (data, i) {
            var colorRatio=0;
            if(this.borderColors.length >= this.yHeaders.length){
                colorRatio = this.borderColors.length/this.yHeaders.length;
            }
            else{
                colorRatio = 1;
            }
            this.chart.data.datasets.push({
                label: data,
                data: this.yArr[i],
                fill: false,
                borderColor: this.borderColors[Math.floor(i*colorRatio)%this.borderColors.length],
                backgroundColor: this.borderColors[Math.floor(i*colorRatio)%this.borderColors.length],
            })
            
        }, this)
        
        this.chart.update();
    }

    extractChartAsJson(){
        return {
            chartType: 'LineGraph',
            chartData: {
                xLabel: this.xHeader,
                yArray: this.yHeaders,
                sorted: this.sorted,
            }
        }
    }
    
    addInfoOnTooptips(itemName){
        var memos = this.jsonObj.map(function (d) {return d[itemName]});
        this.chart.options.tooltips.callbacks.afterLabel = function (tooltipItem, data){
                       return memos[tooltipItem.index];
                    }
                
        this.chart.update();
    }
    // tooltips: {
    //     // mode: 'index'
    //     callbacks: {
    //         afterLabel: function (tooltipItem, data){
    //            return memos[tooltipItem.index]
    //         }

    //     }
    // },
}