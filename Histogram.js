class Histogram extends GraphChart{

    initHistogram(dataset, contentIdName, header){ 
        this.singleHeader = header;
        try{
        this.init(dataset, header, null, false);
        this.createHistogram(header);
        this.createChart(contentIdName, 2);
        this.fetchHistogramData();
        }catch(err){console.log("histogramError: " + err)}
    }

    //TODO: Fix Color Function
    fetchHistogramData(){
        this.borderColors = ["#D98880", "#F1948A", "#C39BD3", "#BB8FCE", "#7FB3D5", "#85C1E9","#76D7C4", "#73C6B6", "#7DCEA0", "#82E0AA", "#F7DC6F", "#F8C471", "#F0B27A", "#E59866", "#BFC9CA", "#85929E"];
        var borderColorArr=[];
        var bgColorArr=[];
        for (var i in this.histogramArray){
            var colorRatio=0;
            if(this.borderColors.length >= this.xHeader.length){
                colorRatio = 1;
            }
            else{
                colorRatio = this.xHeader.length/this.borderColors.length;
            }
            borderColorArr.push(this.borderColors[Math.floor(i*(colorRatio))%this.borderColors.length]);
            bgColorArr.push(this.borderColors[Math.floor(i*(colorRatio))%this.borderColors.length]);
        }
        var randomIndex = Math.floor(Math.random() * 15);
        this.chart.data.datasets.push({
            label: this.xHeader,
            data: this.histogramArray,
            borderColor: this.borderColors[randomIndex],
            backgroundColor: this.borderColors[randomIndex],
        })
        this.chart.data.labels = this.histogramHeaders;
        
        this.chart.update();
    }

    extractChartAsJson(){
        return {
            chartType: 'Histogram',
            chartData: {
                header: this.singleHeader,
            }
        }
    }
}