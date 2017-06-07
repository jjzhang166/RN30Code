/**
 * Created by Rabbit on 2017/4/19.
 */
import React, { Component } from 'react';
import { AppRegistry} from 'react-native';

import App from './APP';

//发布阶段去掉日志
if (!__DEV__) {
    global.console = {
        info: () => {
        },
        log: () => {
        },
        warn: () => {
        },
        error: () => {
        },
    };
}




AppRegistry.registerComponent('RN30Code', () => App);