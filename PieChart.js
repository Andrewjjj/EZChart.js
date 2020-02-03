class PieChart extends GraphChart{
    
    initPieChart(dataset, contentIdName, header){
        this.singleHeader = header;
        this.init(dataset, header, null);
        this.createHistogram(header);
        this.createChart(contentIdName, 4);
        this.fetchPieChartData();
    }

    //TODO: Fix Color Function
    fetchPieChartData(){
        this.borderColors = ["#D98880", "#F1948A", "#C39BD3", "#BB8FCE", "#7FB3D5", "#85C1E9","#76D7C4", "#73C6B6", "#7DCEA0", "#82E0AA", "#F7DC6F", "#F8C471", "#F0B27A", "#E59866", "#BFC9CA", "#85929E"];
        var borderColorArr=[];
        var bgColorArr=[];
        for (var i in this.histogramArray){
            var colorRatio=0;
            if(this.borderColors.length >= this.xHeader.length){
                colorRatio = this.borderColors.length/this.xHeader.length;
            }
            else{
                colorRatio = 1;
            }
            borderColorArr.push(this.borderColors[Math.floor(i*(colorRatio))%this.borderColors.length]);
            bgColorArr.push(this.borderColors[Math.floor(i*(colorRatio))%this.borderColors.length]);
        }
        this.chart.data.datasets.push({
            label: this.xHeader,
            data: this.histogramArray,
            borderColor: borderColorArr,
            backgroundColor: bgColorArr,
        })
        this.chart.data.labels = this.histogramHeaders;
        this.chart.update();
    }

    extractChartAsJson(){
        return {
            chartType: 'PieChart',
            chartData: {
                header: this.singleHeader,
            }
        }
    }
}