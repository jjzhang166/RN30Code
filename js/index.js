
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



// import Day2 from './page/day2/Day2';
AppRegistry.registerComponent('RN30Code', () => App);