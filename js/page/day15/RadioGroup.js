import React, {Component, PropTypes} from 'react'
import {
    Text, View, StyleSheet, Image,
    TouchableOpacity
} from 'react-native';
import px2dp from "../../utils/px2dp";

class RadioGroup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listdata: []
        };
    }

    componentWillMount() {
        this._generateList(this.props.btnlist);
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{flexDirection: this.props.horizontal ? 'row' : 'column'}}>
                    {this.state.listdata.map((item, index) => {
                        return (
                            <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center',padding:px2dp(8)}} key={index}
                                              onPress={this._btnClick.bind(this, index)}>
                                <Image
                                    source={item.select ? require('./image/radio_s.png') : require('./image/radio.png')}/>
                                <Text style={{marginLeft:px2dp(8)}}>{item.title}</Text>
                            </TouchableOpacity>
                        )
                    })}
                </View>
            </View>
        );
    }

    getResult(){
        let list=this.state.listdata;
        let result=[];
        for(let i=0;i<list.length;i++){
            if(list[i].select){
                result.push(list[i].title)
            }
        }

        return result;
    }

    _generateList(array) {
        if(array) {
            let list = [];
            for (let i = 0; i < array.length; i++) {
                if(i===this.props.defaultPick){
                    list.push({title: array[i], select: true})
                }else {
                    list.push({title: array[i], select: false})
                }
            }
            this.setState({
                listdata: list
            })
        }
    }

    _btnClick(index) {
        let list = this.state.listdata;
        if (this.props.singleSelect) {
            for (let i = 0; i < list.length; i++) {
                list[i].select = i === index;
            }
        }
        else {
            list[index].select = !list[index].select;
        }
        this.setState({
            listdata: list
        })
    }
}

RadioGroup.defaultProps = {
    horizontal: false,
    singleSelect: true,
    defaultPick: 0
}

RadioGroup.propTypes={
    btnlist:PropTypes.array.isRequired,
    horizontal:PropTypes.bool,
    singleSelect:PropTypes.bool,
    defaultPick:PropTypes.number
}

const styles = StyleSheet.create({
    container: {
    }
});

module.exports = RadioGroup;