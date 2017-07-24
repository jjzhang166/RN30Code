
import React, { Component } from 'react';

import {
    StyleSheet,
    Text,
    View,
} from 'react-native';

import * as Progress from 'react-native-progress';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingVertical: 20,
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    circles: {
        marginTop:100,
        flexDirection: 'row',
        alignItems: 'center',
    },
    progress: {
        margin: 10,
    },
});

export default class Day7 extends Component {
    constructor(props) {
        super(props);

        this.state = {
            progress: 0,
            indeterminate: true,
        };
    }

    componentDidMount() {
        this.animate();
    }

    animate() {
        let progress = 0;
        this.setState({ progress });
        setTimeout(() => {
            this.setState({ indeterminate: false });
            this.timer=setInterval(() => {
                progress += Math.random() / 5;
                if (progress > 1) {
                    progress = 1;
                }
                this.setState({ progress });
            }, 500);
        }, 1500);
    }
    componentWillUnmount() {
        this.timer && clearInterval(this.timer);
    }
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>进度条Demo</Text>
                <Progress.Bar

                    style={styles.progress}
                    progress={this.state.progress}
                    indeterminate={this.state.indeterminate}
                />
                <View style={styles.circles}>
                    <Progress.Circle
                        size={80}
                        showsText={true}
                        style={styles.progress}
                        progress={this.state.progress}
                        indeterminate={this.state.indeterminate}
                    />
                    <Progress.Pie
                        size={80}
                        style={styles.progress}
                        progress={this.state.progress}
                        indeterminate={this.state.indeterminate}
                    />
                    <Progress.Circle
                        size={80}
                        style={styles.progress}
                        progress={this.state.progress}
                        indeterminate={this.state.indeterminate}
                        direction="counter-clockwise"
                    />
                </View>
                <View style={styles.circles}>
                    <Progress.CircleSnail
                        size={80}
                        style={styles.progress}
                    />
                    <Progress.CircleSnail
                        size={80}
                        style={styles.progress}
                        color={[
                            '#F44336',
                            '#2196F3',
                            '#009688',
                        ]}
                    />
                </View>
            </View>
        );
    }
}