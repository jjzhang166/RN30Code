/**
 * Created by mu on 2017/7/17.
 */
'use strict';

import React, {Component} from 'react';
import {
    Text,
    View,
    TextInput,
    StyleSheet,
    FlatList,
    TouchableOpacity
} from 'react-native';
import px2dp from '../../utils/px2dp';
import theme from '../../config/theme';
import RCTDeviceEventEmitter from 'RCTDeviceEventEmitter';

let originalName='';

export default class DetailPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name:'',
            id:-1
        }
    }

    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state;
        return {
            headerRight: <TouchableOpacity style={{padding:px2dp(12)}} onPress={() => params.handleSave()} disabled={params.disabled}>
                <Text style={{color:params.disabled?'grey':'#367af6',fontSize:px2dp(30)}}>保存</Text>
            </TouchableOpacity>
        };
    };

    _saveDetails() {
        RCTDeviceEventEmitter.emit('nameAdd', this.state.name, this.state.id);
        this.props.navigation.goBack();
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{flexDirection:'row',padding:px2dp(30),backgroundColor:'#fff',alignItems:'center'}}>
                    <Text>联系人姓名</Text>
                    <TextInput style={{ flex: 1, fontSize:px2dp(26), marginLeft: px2dp(40) ,textAlign:'right'}}
                               multiline={false}
                               placeholder='请输入联系人姓名'
                               value={this.state.name}
                               underlineColorAndroid={'transparent'}
                               onChangeText={(name) => {
                                   this.setState({ name })
                                   if(name!==originalName){
                                       this.props.navigation.setParams({ disabled: false});
                                   }else{
                                       this.props.navigation.setParams({ disabled: true});
                                   }
                               }} />
                </View>
            </View>
        );
    }

    componentWillMount() {
        //获取传递数据
        const {params} = this.props.navigation.state;
        if(params) {
            let item=params.item;
            originalName=item.name;
            this.setState({
                name: item.name,
                id:item.id
            })
        }
        this.props.navigation.setParams({ handleSave: this._saveDetails.bind(this) ,disabled: true});
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.pageBackgroundColor,
    }
});