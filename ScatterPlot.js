class ScatterPlot extends GraphChart{
    
    initScatterPlot(dataset, contentIdName, xHeader, yHeaders){
        try{
        this.xHeader=xHeader;
        this.yHeaders=yHeaders;
        this.init(dataset, xHeader, yHeaders, true);
        this.createChart(contentIdName, 7);
        this.dateVar = this.extractArray("Date")
        this.timeVar = this.extractArray("Time")
        this.xArr = [];
        for(var i=0; i<this.dateVar.length; i++){
            this.xArr.push(this.dateVar[i] + " " + this.timeVar[i]);
        }
        this.fetchScatterPlotData();
        }catch(err){
            console.log(err);
        }
    }

    // Deprecated
    initScatterPlotOld(datasetName, contentIdName, xTitle, yTitle){
        this.xTitle=xTitle;
        this.yTitle=yTitle;
        this.loadData(datasetName);
        var xArr = this.getFloatArrayFromDataWithHeader(xTitle);
        var yArr = this.getFloatArrayFromDataWithHeader(yTitle);
        this.sortTwoArray(xArr, yArr);
        this.createChart(contentIdName, 7);
        
        this.fetchScatterPlotData();
        this.checkXAxisTime();
    }

    parseToScatterFormat(xArr, yArr){
        var newArr=[];
        console.log("parseToScatterFormat")
        for (var i in xArr){
            newArr.push({
                x: new moment(xArr[i], "DD/MM/YYYY HH:mm:ss"),
                y: yArr[i]
            })
        }
        return newArr;
    }


    // Deprecated
    sortTwoArray(arr1, arr2){
        this.newArr=[];
        for (var i in arr1){
            this.newArr.push({
                'xAxis': arr1[i],
                'yAxis': arr2[i]
            })
        }

        this.newArr.sort(function(a,b) {
            return (parseInt(a.xAxis) - parseInt(b.xAxis));
        })
        this.sortedScatterPlotArr=[];
        for (var i in this.newArr){
            this.sortedScatterPlotArr.push({x: this.newArr[i].xAxis, y: this.newArr[i].yAxis})  
        }
    }
    
    // Deprecated
    checkXAxisTime(){
        try{
            this.chart.options.scales.xAxes[0].type = 'time';
            this.chart.update();
            this.chart.options.scales.xAxes[0].time.displayFormats.push({
                quarter:moment().format("HH:mm:ss")
            })
        }catch(err) {
            console.log("Error12: " + err)
        }
        this.chart.update();
    }

    // Used for internal testing.
    chartXToTimeFormat(){
        try{
            this.chart.update();
            this.chart.options.scales.xAxes[0].type = 'time';
            this.chart.options.scales.xAxes[0].push({
                time: {
                    displayFormats: {
                        quarter: 'YYYY-MM-DD HH:mm:ss'
                    }
                }
            })
            this.chart.update();
        }catch(err) {
            console.log("Error12: " + err)
        }
    }

    //TODO: Fix Color Function
    fetchScatterPlotData(){
        this.borderColors = ["#D98880", "#F1948A", "#C39BD3", "#BB8FCE", "#7FB3D5", "#85C1E9","#76D7C4", "#73C6B6", "#7DCEA0", "#82E0AA", "#F7DC6F", "#F8C471", "#F0B27A", "#E59866", "#BFC9CA", "#85929E"];
        var borderColorArr=[];
        var bgColorArr=[];

        // this.w=this.parseToScatterFormat(this.xArr, this.yArr[0]);
        var color = this.borderColors[Math.floor([Math.random()*this.borderColors.length-4])];
        this.yHeaders.forEach(function(data, i) {
            this.chart.data.datasets.push({
                label: this.yHeaders[i] + " vs " + this.xHeader,
                data: this.parseToScatterFormat(this.xArr, this.yArr[i]),
                fill: true,
                
                borderColor: this.borderColors[i*5%this.borderColors.length],
                // borderColor: (0,0,0),
                backgroundColor: this.borderColors[i*5%this.borderColors.length],
                // borderColor: color,
                // backgroundColor: color,
            })
        }, this)
        
        this.setXLabel(this.xHeader);
        this.chart.update();
    }

    extractChartAsJson(){
        try{
        return {
            chartType: 'ScatterPlot',
            chartData: {
                xArr: this.xHeader,
                yArr: this.yHeaders,
            }
        }}catch(err){console.log(err)}
    }
}