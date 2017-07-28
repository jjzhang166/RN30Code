import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    FlatList
} from 'react-native';

import px2dp from '../../utils/px2dp';
import theme from '../../config/theme';
import ImagePicker from 'react-native-image-crop-picker';
import ActionSheet from 'react-native-actionsheet';

const widthPic = (theme.screenWidth - px2dp(50)) / 4;

export default class Day6 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listdata: [{path: require('./image/attachment.png'), checked: false}],
            chooseState: false,
            picked:0
        }
        this.handlePress = this.handlePress.bind(this);
    }

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    style={{flex: 1}}
                    data={this.state.listdata}
                    renderItem={this._renderItemComponent}
                    keyExtractor={(item, index) => index}
                    numColumns={4}
                    getItemLayout={(data, index) => (
                        {length: widthPic, offset: widthPic * index, index}
                    )}/>
                {this.state.chooseState ?
                    <TouchableOpacity style={{
                        height: px2dp(80),
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderTopColor: '#cccccc',
                        borderTopWidth: px2dp(1)
                    }} onPress={this._deleteItem.bind(this)} disabled={this.state.picked===0}>
                        <Text style={{color:this.state.picked===0?'grey':'red'}}>{'删除选中条目('+this.state.picked+')'}</Text>
                    </TouchableOpacity>
                    : null}
                <ActionSheet
                    ref={o => this.ActionSheet = o}
                    options={['取消', '拍摄并剪切一张照片', '从相册选取并剪切一张照片', '从相册选取多张照片']}
                    cancelButtonIndex={0}
                    onPress={this.handlePress}
                />
            </View>
        );
    }

    _renderItemComponent = ({item, index}) => {
        {
            return (
                this.state.listdata.length - 1 !== index ?
                    <TouchableOpacity style={{
                        width: widthPic,
                        height: widthPic,
                        marginLeft: index % 4 === 0 ? 0 : px2dp(10),
                        marginBottom: px2dp(10)
                    }} onPress={this._picPress.bind(this, index)}>
                        <Image style={{width: widthPic, height: widthPic}} source={item.path}/>
                        {this.state.chooseState && item.checked ? <Image style={{
                            position: 'absolute',
                            left: widthPic - px2dp(32),
                            top: widthPic - px2dp(32),
                            width: px2dp(30),
                            height: px2dp(30)
                        }} source={require('./image/check.png')}/> : null}
                    </TouchableOpacity>
                    :
                    this.state.chooseState ?
                        null :
                        <TouchableOpacity style={{
                            width: widthPic,
                            height: widthPic,
                            marginLeft: index % 4 === 0 ? 0 : px2dp(10),
                            marginBottom: px2dp(10)
                        }} onPress={this._addPress.bind(this)}>
                            <Image style={{width: widthPic, height: widthPic}} source={item.path}/>
                        </TouchableOpacity>
            )
        }
    }

    //设置header
    static navigationOptions = ({navigation}) => {
        const {params = {}} = navigation.state;
        return {
            headerRight: <TouchableOpacity style={{padding: px2dp(12)}} onPress={() => params.handleSave()}>
                <Text style={{color: '#367af6', fontSize: px2dp(30)}}>{params.chooseState ? '完成' : '选择'}</Text>
            </TouchableOpacity>
        };
    };

    //header里按钮的点击事件
    _saveDetails() {
        let currentState = !this.state.chooseState;
        if (currentState) {
            let currentList = this.state.listdata;
            for (let i = 0; i < currentList.length; i++) {
                currentList[i].checked = false;
            }
            this.setState({
                listdata: currentList,
                picked:0
            })
        }
        this.props.navigation.setParams({chooseState: currentState});
        this.setState({
            chooseState: currentState
        })
    }

    componentWillMount() {
        this.props.navigation.setParams({handleSave: this._saveDetails.bind(this), chooseState: false});
    }

    //ActionSheet点击事件
    handlePress(index) {
        switch (index) {
            case 0:  //取消
                break;
            case 1:
                this._addCamera();
                break;
            case 2:
                this._addOnePress();
                break;
            case 3:
                this._addMultiPress();
                break;
        }
    }

    //在编辑状态下每张图片的点击事件
    _picPress(index) {
        if (this.state.chooseState) {
            let currentList = this.state.listdata;
            let pickNum=this.state.picked;
            currentList[index].checked = !currentList[index].checked;
            if(currentList[index].checked){
                pickNum++;
            }else{
                pickNum--;
            }
            this.setState({
                listdata: currentList,
                picked:pickNum
            })
        }
    }

    //添加图片按钮的点击事件-弹出ActionSheet
    _addPress(){
        this.ActionSheet.show()
    }

    //从相机添加并裁剪一张图片，大小为400/400
    _addCamera(){
        let currentList = this.state.listdata;
        ImagePicker.openCamera({
            width: 400,
            height: 400,
            cropping: true
        }).then(image => {
            console.log(image);
            let item = {path: {uri: ''}, checked: false};
            item.path.uri = image.path;
            currentList.splice(currentList.length - 1, 0, item)
            this.setState({
                listdata: currentList
            })
        });
    }

    //从相册添加并裁剪一张图片，大小为400/400
    _addOnePress(){
        let currentList = this.state.listdata;
        ImagePicker.openPicker({
            width: 400,
            height: 400,
            cropping: true
        }).then(image => {
            console.log(image);
            let item = {path: {uri: ''}, checked: false};
            item.path.uri = image.path;
            currentList.splice(currentList.length - 1, 0, item)
            this.setState({
                listdata: currentList
            })
        });
    }

    //从相册一次添加多张图片
    _addMultiPress() {
        let currentList = this.state.listdata;
        ImagePicker.openPicker({
            multiple: true
        }).then(images => {
            console.log(images);
            for (let i = 0; i < images.length; i++) {
                let item = {path: {uri: ''}, checked: false};
                item.path.uri = images[i].path;
                currentList.splice(currentList.length - 1, 0, item)
            }
            this.setState({
                listdata: currentList
            })
        });
    }

    //删除选中条目的点击事件
    _deleteItem(){
        let currentList=this.state.listdata;
        for(let i=0;i<currentList.length;i++){
            if(currentList[i].checked){
                currentList.splice(i,1)
                i--;
            }
        }
        this.setState({
            listdata:currentList
        })
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: px2dp(9)
    },
});