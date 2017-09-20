'use strict';

import React, { Component } from 'react';
import {
    Text, View, StyleSheet, processColor
} from 'react-native';
import theme from '../../config/theme';
import px2dp from '../../utils/px2dp';


import {HorizontalBarChart} from 'react-native-charts-wrapper';

export default class ChartPage extends Component {

    constructor() {
        super();

        this.state = {
            legend: {
                enabled: true,
                textSize: 14,
                form: 'SQUARE',
                formSize: 14,
                xEntrySpace: 10,
                yEntrySpace: 5,
                formToTextSpace: 5,
                wordWrapEnabled: true,
                maxSizePercent: 0.5
            },
            data: {
                dataSets: [{
                    values: [{y: 100}, {y: 105}, {y: 102}, {y: 110}, {y: 114}, {y: 109}, {y: 105}, {y: 99}, {y: 95}],
                    label: '数据',
                    config: {
                        color: processColor('teal'),
                        barSpacePercent: 20,
                        barShadowColor: processColor('lightgrey'),
                        highlightAlpha: 90,
                        highlightColor: processColor('red'),
                    }
                }],
            },
            xAxis: {
                valueFormatter: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
                position: 'BOTTOM',
                granularityEnabled: true,
                granularity: 1,
                labelCount: 10,
            },
            selectedEntry:[]
        };
    }

    handleSelect(event) {
        let entry = event.nativeEvent
        console.log(entry)
        if (entry == null) {
            this.setState({...this.state, selectedEntry: null})
        } else {
            this.setState({...this.state, selectedEntry: entry})
        }
    }


    render() {
        return (
            <View style={{flex: 1}}>

                <View style={{height:80,justifyContent:'center',padding:20}}>
                    <Text> 选择的条目为:</Text>
                    <Text> {this.state.selectedEntry.y?(this.state.selectedEntry.x+1)+'月 —— '+this.state.selectedEntry.y:''}</Text>
                </View>


                <View style={styles.container}>
                    <HorizontalBarChart
                        style={styles.chart}
                        data={this.state.data}
                        xAxis={this.state.xAxis}
                        animation={{durationX: 2000}}
                        legend={this.state.legend}
                        gridBackgroundColor={processColor('#ffffff')}
                        drawBarShadow={false}
                        drawValueAboveBar={true}
                        drawHighlightArrow={true}
                        onSelect={this.handleSelect.bind(this)}
                        chartDescription={{ text: '' }}
                    />
                </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF'
    },
    chart: {
        flex: 1
    }
});