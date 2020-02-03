class BarGraph extends GraphChart {
    initBarGraph(datasetName, contentIdName, xHeader, yHeaders, sorted){
        this.init(datasetName, xHeader, yHeaders, sorted)
        this.createChart(contentIdName, 2);
        this.fetchBarGraphData();
    }

    //TODO: Fix Color Function
    fetchBarGraphData(){
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
            chartType: 'BarGraph',
            chartData: {
                xLabel: this.xHeader,
                yArray: this.yHeaders,
                sorted: this.sorted,
            }
        }
    }
}