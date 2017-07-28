import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    TouchableOpacity,
    Modal,
    FlatList
} from 'react-native';

var ScrollableTabView = require('react-native-scrollable-tab-view');

import CustomTabbar from './CustomTabbar';
import px2dp from "../../utils/px2dp";
import theme from '../../config/theme';

export default class TodayHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: ['推荐', '热点', '娱乐',
                '体育', '图片', '旅游'],
            sourcelist: ['视频', '社会', '问答', '科技', '汽车', '段子', '趣图', '美女', '时尚', '搞笑', '历史', '教育', '故事', '电影'],
            input: '',
            modalVisible: false
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <View
                    style={{height: px2dp(80), backgroundColor: '#d34440', alignItems: 'center', flexDirection: 'row'}}>
                    <TouchableOpacity style={{width: px2dp(120), alignItems: 'center', justifyContent: 'center'}}>
                        <Image style={{height: px2dp(55), width: px2dp(55)}} source={require('./image/person.png')}/>
                    </TouchableOpacity>
                    <View style={{
                        height: px2dp(55),
                        backgroundColor: '#fff',
                        flex: 1,
                        borderRadius: 5,
                        marginRight: px2dp(20)
                    }}>
                        {this.state.input === '' ?
                            <Image style={{position: 'absolute', left: px2dp(16), top: px2dp(16)}}
                                   source={require('./image/searchg.png')}/> : null}
                        <TextInput style={{
                            height: px2dp(55),
                            flex: 1,
                            color: 'grey',
                            fontSize: px2dp(24),
                            paddingRight: px2dp(12),
                            paddingLeft: px2dp(50)
                        }}
                                   placeholder="搜索"
                                   placeholderTextColor="grey"
                                   multiline={false}
                                   returnKeyType="search"
                                   underlineColorAndroid={'transparent'}
                                   clearButtonMode="always"
                                   onChangeText={(input) => this.setState({input})}
                        />
                    </View>
                </View>
                <ScrollableTabView
                    renderTabBar={() => <CustomTabbar addIconPressed={this._addTabPress.bind(this)}/>}
                >
                    {this.state.list.map((label) => {
                        return (
                            <Text tabLabel={label} key={label}>{label}</Text>
                        )
                    })}
                </ScrollableTabView>
                <Modal
                    animationType={"slide"}
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        console.log("Modal has been closed.")
                    }}
                >
                    <View style={{marginTop: px2dp(40), flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)'}}>
                        <View style={{
                            marginTop: px2dp(2),
                            backgroundColor: '#fff',
                            borderTopLeftRadius: px2dp(20),
                            borderTopRightRadius: px2dp(10),
                            paddingTop: px2dp(30),
                            flex: 1
                        }}>
                            <TouchableOpacity onPress={() => {
                                this.setModalVisible(!this.state.modalVisible)
                            }} style={{paddingLeft:px2dp(30)}}>
                                <Image source={require('./image/close.png')}/>
                            </TouchableOpacity>
                            <Text style={{marginTop: px2dp(30), fontSize: px2dp(36),paddingLeft:px2dp(30)}}>我的频道</Text>
                            <FlatList
                                style={{paddingLeft:px2dp(30)}}
                                data={this.state.list}
                                renderItem={this._renderItemComponent}
                                numColumns={4}
                                bounces={false}
                                keyExtractor={(item, index) => index}
                                getItemLayout={(data, index) => (
                                    {length: px2dp(80), offset: px2dp(80) * index, index}
                                )}/>
                            <Text style={{marginTop: px2dp(30), fontSize: px2dp(36),paddingLeft:px2dp(30)}}>频道推荐</Text>
                            <FlatList
                                style={{paddingLeft:px2dp(30)}}
                                data={this.state.sourcelist}
                                renderItem={this._renderSourceComponent}
                                numColumns={4}
                                bounces={false}
                                keyExtractor={(item, index) => index}
                                getItemLayout={(data, index) => (
                                    {length: px2dp(80), offset: px2dp(80) * index, index}
                                )}/>
                        </View>
                    </View>
                </Modal>
            </View>
        );
    }

    _renderItemComponent = ({item, index}) => {
        return (
            <TouchableOpacity style={[styles.item_container, {
                backgroundColor: '#e5e5e5',
                marginLeft: index % 4 === 0 ? 0 : px2dp(20)
            }]} onPress={this._delete.bind(this,item,index)}>
                <Text style={{fontSize: px2dp(30), color: '#444444'}}>{item}</Text>
            </TouchableOpacity>
        );
    }

    _renderSourceComponent = ({item, index}) => {
        return (
            <TouchableOpacity style={[styles.item_container, {
                backgroundColor: '#fff', marginLeft: index % 4 === 0 ? 0 : px2dp(20), elevation: 4,
                shadowOffset: {width: 0, height: 0},
                shadowColor: 'black',
                shadowOpacity: 1,
                shadowRadius: 2
            }]} onPress={this._addTag.bind(this,item,index)}>
                <Text style={{fontSize: px2dp(30), color: '#444444'}}>{item}</Text>
            </TouchableOpacity>
        );
    }

    _addTabPress() {
        this.setModalVisible(true)
    }

    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }

    _delete(item,index){
        let selected=this.state.list;
        selected.splice(index,1);
        let unselected=this.state.sourcelist;
        unselected.push(item);
        this.setState({
            list:selected,
            sourcelist:unselected
        })
    }

    _addTag(item,index){
        let unselected=this.state.sourcelist;
        unselected.splice(index,1);
        let selected=this.state.list;
        selected.push(item);
        this.setState({
            list:selected,
            sourcelist:unselected
        })
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    item_container: {
        width: px2dp(155),
        height: px2dp(80),
        borderRadius: px2dp(5),
        marginTop: px2dp(20),
        alignItems: 'center',
        justifyContent: 'center'
    }
});