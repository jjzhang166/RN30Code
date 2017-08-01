'use strict';

import React, {Component} from 'react';
import {
    Text, View, StyleSheet, TouchableWithoutFeedback,
    TouchableOpacity, Slider, Image
} from 'react-native';
import theme from '../../config/theme';
import px2dp from '../../utils/px2dp';

import Video from 'react-native-video';


export default class VideoPlayer extends Component {
    constructor(props) {
        super(props);
        this.onLoad = this.onLoad.bind(this);
        this.onProgress = this.onProgress.bind(this);
        this.onBuffer = this.onBuffer.bind(this);
    }

    state = {
        rate: 1,
        volume: 1,
        muted: false,
        duration: 0.0,
        currentTime: 0.0,
        paused: true,
        isBuffering: false,
        value: 0,
        showControls: true
    };

    onLoad(data) {
        this.setState({duration: data.duration});
    }

    onProgress(data) {
        this.setState({currentTime: data.currentTime});
    }

    onBuffer({isBuffering}: { isBuffering: boolean }) {
        this.setState({isBuffering});
    }

    getCurrentTimePercentage() {
        if (this.state.currentTime > 0) {
            return parseFloat(this.state.currentTime) / parseFloat(this.state.duration);
        } else {
            return 0;
        }
    }

    renderRateControl(rate) {
        const isSelected = (this.state.rate == rate);

        return (
            <TouchableOpacity onPress={() => {
                this.setState({rate: rate})
                this.resetTimer();
            }}>
                <Text style={[styles.controlOption, {fontWeight: isSelected ? "bold" : "normal"}]}>
                    {rate}x
                </Text>
            </TouchableOpacity>
        )
    }

    increaseVolume(increase) {
        this.resetTimer();
        let volume = this.state.volume;
        if (increase) {
            volume += 0.1;
        } else {
            volume -= 0.1;
        }
        this.setState({
            volume: volume
        })
    }

    renderCustomSkin() {
        const flexCompleted = this.getCurrentTimePercentage();

        return (
            <View style={styles.container}>
                <TouchableWithoutFeedback style={styles.fullScreen} onPress={() => {
                    if(!this.state.showControls) {
                        this.setState({showControls: true})
                        this.closeControls();
                    }
                }}>
                    <Video
                        source={require('./video/cat.mp4')}
                        ref={(ref) => {
                            this.player = ref
                        }}
                        style={styles.fullScreen}
                        rate={this.state.rate}
                        paused={this.state.paused}
                        volume={this.state.volume}
                        muted={this.state.muted}
                        ignoreSilentSwitch='ignore'
                        resizeMode='cover'
                        onLoad={this.onLoad}
                        onBuffer={this.onBuffer}
                        onProgress={this.onProgress}
                        onEnd={() => {
                            this.setState({
                                paused: true,
                                showControls:true
                            })
                            this.player.seek(0.0);
                        }}
                        repeat={false}
                    />
                </TouchableWithoutFeedback>

                {this.state.showControls ?
                    <View style={styles.controls}>
                        <View style={styles.generalControls}>
                            <View style={styles.rateControl}>
                                <Text style={{color: '#fff', fontSize: px2dp(22), lineHeight: 12}}>播放速度 </Text>
                                {this.renderRateControl(0.5)}
                                {this.renderRateControl(1.0)}
                                {this.renderRateControl(2.0)}
                            </View>
                            <TouchableOpacity onPress={() => {
                                if(this.state.paused) {
                                    this.timer = setTimeout(
                                        () => {
                                            this.setState({
                                                showControls: false
                                            })
                                        },
                                        3000
                                    );
                                }else{
                                    this.timer && clearTimeout(this.timer);
                                }
                                this.setState({paused: !this.state.paused})
                            }}>
                                <Image
                                    source={this.state.paused ? require('./image/pauseIcon.png') : require('./image/playIcon.png')}
                                    style={{width: px2dp(50), height: px2dp(50)}}/>
                            </TouchableOpacity>
                            <View style={styles.volumeControl}>
                                <TouchableOpacity style={{padding: px2dp(10)}}
                                                  onPress={this.increaseVolume.bind(this, true)}>
                                    <Text style={{color: '#fff', fontSize: px2dp(22), lineHeight: 12}}>＋</Text>
                                </TouchableOpacity>
                                <Text style={{color: '#fff', fontSize: px2dp(22), lineHeight: 12}}> 音量大小 </Text>
                                <TouchableOpacity style={{padding: px2dp(10)}}
                                                  onPress={this.increaseVolume.bind(this, false)}>
                                    <Text style={{color: '#fff', fontSize: px2dp(22), lineHeight: 12}}>－</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <Slider style={styles.slider}
                                value={flexCompleted}
                                onValueChange={(value) => {
                                    this.setState({value: value});
                                    this.player.seek(value * this.state.duration);
                                    this.resetTimer();
                                }}/>
                    </View>
                    :
                    null
                }
            </View>
        );
    }

    closeControls(){
        console.log(this.state.paused);
        if(!this.state.paused) {
            this.timer = setTimeout(
                () => {
                    this.setState({
                        showControls: false
                    })
                },
                3000
            );
        }else{
            this.timer && clearTimeout(this.timer);
        }
    }

    resetTimer(){
        if(!this.state.paused) {
            this.timer && clearTimeout(this.timer);
            this.timer = setTimeout(
                () => {
                    this.setState({
                        showControls: false
                    })
                },
                3000
            );
        }
    }

    render() {
        return this.renderCustomSkin();
    }

    componentWillUnmount(){
        this.timer && clearTimeout(this.timer);
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
    },
    fullScreen: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
    slider: {
        height: px2dp(60)
    },
    controls: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        height: px2dp(180),
        position: 'absolute',
        left: 0,
        bottom: 0,
        right: 0,
        padding: px2dp(20)
    },
    generalControls: {
        flex: 1,
        flexDirection: 'row',
        overflow: 'hidden',
        paddingBottom: 10,
        alignItems: 'center'
    },
    rateControl: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    volumeControl: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    controlOption: {
        alignSelf: 'center',
        fontSize: 11,
        color: "white",
        paddingLeft: 2,
        paddingRight: 2,
        lineHeight: 12,
    },
});