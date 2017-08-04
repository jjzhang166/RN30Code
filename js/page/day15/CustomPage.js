'use strict';

import React, {Component} from 'react';
import {
    Text, View, StyleSheet
} from 'react-native';
import theme from '../../config/theme';
import px2dp from '../../utils/px2dp';

import Button from './Button'
import RadioGroup from './RadioGroup'

export default class CustomPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            result:''
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <RadioGroup btnlist={['选项一', '选项二','选项三', '选项四']}
                            singleSelect={false}
                            horizontal={true}
                            defaultPick={2}
                            ref={(view) => this.radioGroup = view}/>
                <View style={{marginTop:px2dp(45),alignItems:'center',justifyContent:'center'}}>
                    <Button style={{padding:px2dp(20),borderRadius:px2dp(5),borderWidth:px2dp(1),borderColor:'#000'}} onPress={this._submit.bind(this)}>
                        <Text>提交</Text>
                    </Button>
                </View>
                <Text style={{marginTop:px2dp(30)}}>{this.state.result}</Text>
            </View>
        );
    }

    _submit(){
        let result=this.radioGroup.getResult()
        let message='您选择了:'
        for(let x in result){
            message+=result[x]+' '
        }
        this.setState({
            result:message
        })
    }
}


const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: "#fff",
        padding: px2dp(20)
    }
});