import React, { Component } from 'react';
import * as d3 from "d3";

class MapChart extends Component {
    componentDidMount() {
        this.drawChart();
    }
    drawChart() {
         // http://blog.giscafer.com/mapshaper-plus/   处理数据
        const width = 1000;
        const height = 1000;
        var svg = d3.select("#map").append("svg")
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("transform", "translate(0,0)");

        const projection = d3.geoMercator()
            .center([107, 31])
            .scale(850)
            .translate([width / 2, height / 2]);

        var path = d3.geoPath()
            .projection(projection);

        d3.json("./api/china.json").then(function (root) { //json使用服务器资源
            svg.selectAll("path")
                .data(root.features)
                .enter()
                .append("path")
                .attr("stroke", "rgba(255,255,255,.5)")
                .attr("stroke-width", 2.2)
                .attr("fill", function (d, i) {
                    const { properties: { name } } = d;
                    if (name === '江苏') {
                        return 'red'
                    } else {
                        return '#333';
                    }
                })
                // .attr('fillStyle','liner')
                // .attr('fillRect','(0,0,300,300)')
                .attr("d", path)   //使用地理路径生成器
            // .on("mouseover", function (d, i) {
            //     d3.select(this)
            //         .attr("fill", "yellow");
            // })
            // .on("mouseout", function (d, i) {
            //     d3.select(this)
            //         .attr("fill", '#333');
            // });
             //在地图上显示各个身份的名称  
        svg.selectAll("text")
        .data(root.features)
        .enter()
        .append("text")
        //设置各个文本（省份名称）显示的文字  
        .attr("transform", function (d, i) {
            if (d.properties.id === "20"){
                return "translate(" + (path.centroid(d)[0] - 20) + "," + (path.centroid(d)[1] + 20) + ")";
            }
            return "translate(" + (path.centroid(d)[0] - 10) + "," + path.centroid(d)[1] + ")";
        })
        //显示省名  
        .text(function (d) {
            return d.properties.name;
        })
        .attr('fill','#fff')
        .attr("font-size", 12)
        });

        console.log('执行完毕！')
    }
    render() {
        return (
            <div style={{background:'#999'}} id='map'></div>
        )
    }
}

export default MapChart;
