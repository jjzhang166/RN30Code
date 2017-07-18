'use strict';

import React, {Component} from 'react';
import {
    Image,
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

let pinyin = require('js-pinyin');

let navigation;
let contacts=[];

let contactList=[
    {id:1,name:'伊利丹'},{id:2,name:'泰兰德'},{id:3,name:'瓦里安'},{id:4,name:'瓦莉拉'},{id:5,name:'吉安娜'},{id:6,name:'萨尔'}
    ,{id:7,name:'乌瑟尔'},{id:8,name:'玛法里奥'},{id:9,name:'伊瑟拉'},{id:10,name:'阿尔塞斯'},{id:11,name:'WOW'},{id:12,name:'123'}]

let letter = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z','#'];

export default class ContactPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            input: '',
            recentlist: [],
            namelist: [],
            sourcedata: []
        }
        navigation=this.props.navigation;
        pinyin.setOptions({checkPolyphone: false, charCase: 1});  //checkPolyphone：是否检查多音字，charCase：输出拼音的大小写模式，0-首字母大写；1-全小写；2-全大写
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{flexDirection: 'row', alignItems: 'center', padding: px2dp(20)}}>
                    <View style={styles.search_input}>
                        {this.state.input === '' ?
                            <Image style={{position: 'absolute', left: theme.screenWidth * 0.4, top: px2dp(24)}}
                                   source={require('../../image/Day12/searchg.png')}/> : null}
                        <TextInput style={{height: px2dp(70), flex: 1, color: 'grey', fontSize: px2dp(24)}}
                                   placeholder="搜索"
                                   placeholderTextColor="grey"
                                   multiline={false}
                                   returnKeyType="search"
                                   underlineColorAndroid={'transparent'}
                                   textAlign="center"
                                   clearButtonMode="always"
                                   onChangeText={this._textChanged}
                        />
                    </View>
                </View>
                <FlatList
                    ListHeaderComponent={() => {
                        if (this.state.recentlist.length !== 0) {
                            return (
                                <View style={{backgroundColor: '#fff', padding: px2dp(10)}}>
                                    <FlatList
                                        data={this.state.recentlist}
                                        renderItem={this._renderItemComponent}
                                        numColumns={3}
                                        keyExtractor={(item, index) => index}
                                        getItemLayout={(data, index) => (
                                            {length: px2dp(64), offset: px2dp(64) * index, index}
                                        )}/>
                                </View>
                            )
                        } else {
                            return (
                                <View style={{height: 0}}/>
                            )
                        }
                    }}
                    data={this.state.namelist}
                    renderItem={this._renderNameComponent}
                    keyExtractor={(item, index) => index}/>
            </View>
        );
    }

    componentWillMount() {
        //获取本地存储信息
        storage.load({
            key: 'contact'
        }).then(ret => {
            contacts=ret.contacts;
            this._generateList(contacts);
            //获取最近点击的项目
            storage.load({
                key: 'recent'
            }).then(ret => {
                this.setState({
                    recentlist: ret.recentlist
                })
            }).catch(err1 => {
                console.log(err1)
            })
        }).catch(err => {
            //如果本地没有存储，载入默认列表
            contacts=contactList;
            this._generateList(contactList);
            storage.load({
                key: 'recent'
            }).then(ret => {
                this.setState({
                    recentlist: ret.recentlist
                })
            }).catch(err1 => {
                console.log(err1)
            })
        })
    }

    componentDidMount() {
        RCTDeviceEventEmitter.addListener('nameAdd', this._addName.bind(this));
    }

    componentWillUnmount() {
        RCTDeviceEventEmitter.removeListener('nameAdd', this._addName.bind(this));
    }

    //search搜索改变列表
    _textChanged = (input) => {
        this.setState({input});
        let currentList = this.state.sourcedata;
        let resultList = [{letter: '搜索结果', data: []}];
        if (input !== '') {
            let inputString = input.toLowerCase();
            for (let i = 0; i < currentList.length; i++) {
                for (let j = 0; j < currentList[i].data.length; j++) {
                    let currentname = currentList[i].data[j].name;
                    let nameString = pinyin.getFullChars(currentname).toLowerCase();
                    if (nameString.indexOf(inputString) !== -1 || currentname.indexOf(inputString) !== -1) {
                        console.log(currentname)
                        resultList[0].data.push(currentList[i].data[j])
                    }
                }
            }
            this.setState({
                namelist: resultList
            })
        } else {
            this.setState({
                namelist: currentList
            })
        }
    }

    //常用列表item
    _renderItemComponent = ({item}) => {
        return (
            <TouchableOpacity style={styles.item_container} onPress={this._quickItemPressed.bind(this, item)}>
                <Text style={{fontSize: px2dp(30), color: '#444444'}}>{item.name}</Text>
            </TouchableOpacity>
        );
    }

    //联系人列表item
    _renderNameComponent = ({item}) => {
        return (
            <View>
                <View style={{height: px2dp(50), paddingLeft: px2dp(30), justifyContent: 'center'}}>
                    <Text style={{fontSize: px2dp(24), color: 'grey'}}>{item.letter}</Text>
                </View>
                <View style={{backgroundColor: '#fff'}}>
                    {
                        item.data.map((item, i) => {
                            return (
                                <TouchableOpacity style={{
                                    height: px2dp(80),
                                    paddingLeft: px2dp(30),
                                    justifyContent: 'center',
                                    borderBottomWidth: px2dp(1),
                                    borderBottomColor: '#f5f5f5'
                                }} key={i} onPress={this._itemPressed.bind(this, item)}>
                                    <Text style={{fontSize: px2dp(32), color: '#444444'}}>{item.name}</Text>
                                </TouchableOpacity>
                            )
                        })
                    }
                </View>
            </View>
        );
    }

    //将数据列表按字母排序
    _generateList(nameArray) {
        let list = [];
        let current;
        let reg= /^[A-Za-z]+$/;
        for (let i = 0; i < letter.length; i++) {
            let currentLetter = letter[i];
            current = {letter: currentLetter, data: []};
            for (let j = 0; j < nameArray.length; j++) {
                let currentName = nameArray[j].name;
                let first = pinyin.getFullChars(currentName).charAt(0).toUpperCase();
                if (first === currentLetter||(currentLetter==='#'&&!reg.test(first))) {
                    current.data.push(nameArray[j])
                }
            }
            if (current.data.length !== 0) {
                list.push(current);
                current.data.sort((a, b) => {
                    return a.name.localeCompare(b.name);
                })
            }
        }
        this.setState({
            namelist: list,
            sourcedata: list
        })
    }

    //常用点击
    _quickItemPressed(item) {
        this.props.navigation.navigate('DetailPage',{item:item});
    }

    //联系人点击
    _itemPressed(item) {
        //获取当前常用列表，如果不存在就添加，超过6个删除末尾
        let namelist = this.state.recentlist;
        if (!this._contains(namelist, item)) {
            namelist.unshift(item); //从列表首插入
            if (namelist.length > 6) namelist.pop(); //弹出最后一项
            storage.save({
                key: 'recent',
                data: {
                    recentlist: namelist
                }
            })
            this.setState({
                recentlist:namelist
            })
        }
        this.props.navigation.navigate('DetailPage',{item:item});
    }

    _contains(arr, obj) {
        let i = arr.length;
        while (i--) {
            if (arr[i].id === obj.id) {
                return true;
            }
        }
        return false;
    }

    _addName(name,id){
        if(id===-1){
            contacts.push({id:contacts.length+1,name:name})
        }else {
            for (let i = 0; i < contacts.length; i++) {
                if(id===contacts[i].id){
                    contacts[i].name=name
                }
            }
            let recentlist=this.state.recentlist;
            for(let i=0;i<recentlist.length;i++){
                if(id===recentlist[i].id){
                    recentlist[i].name=name
                }
            }
            storage.save({
                key: 'recent',
                data: {
                    recentlist: recentlist
                }
            })
            this.setState({
                recentlist:recentlist
            })
        }
        storage.save({
            key: 'contact',
            data: {
                contacts: contacts
            }
        })
        this._generateList(contacts);
    }
}

export function getNavigation() {
    return navigation;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.pageBackgroundColor
    },
    search_input: {
        flex: 1,
        height: px2dp(70),
        backgroundColor: '#fff',
        borderRadius: px2dp(10)
    },
    item_container: {
        width: px2dp(220),
        height: px2dp(64),
        borderRadius: px2dp(5),
        borderWidth: px2dp(1),
        borderColor: '#999999',
        marginLeft: px2dp(10),
        marginRight: px2dp(10),
        marginTop: px2dp(5),
        marginBottom: px2dp(5),
        alignItems: 'center',
        justifyContent: 'center'
    }
});