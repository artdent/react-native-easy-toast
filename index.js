/**
 * react-native-easy-toast
 * https://github.com/crazycodeboy/react-native-easy-toast
 * Email:crazycodeboy@gmail.com
 * Blog:http://jiapenghui.com
 * @flow
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Animated,
    Dimensions,
    Text,
} from 'react-native'
export const DURATION = { LENGTH_LONG: 2000, LENGTH_SHORT: 1000 };
const {height, width} = Dimensions.get('window');
const OPACITY = 0.6;

export default class Toast extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isShow: false,
            text: '',
            opacityValue: new Animated.Value(OPACITY),
        }
    }
    show(text, duration) {
        this.duration = duration || DURATION.LENGTH_SHORT;
        this.setState({
            isShow: true,
            text: text,
        });
        this.isShow = true;
        this.state.opacityValue.setValue(OPACITY)
        this.close();
    }

    close(instant) {
        var animationDuration = 500, closeDuration = this.duration;
        if (instant == true) {
            animationDuration = 0;
            closeDuration = 0;
        }

        if (!this.isShow) return;
        this.timer && clearTimeout(this.timer);
        this.timer = setTimeout(() => {
            Animated.timing(
                this.state.opacityValue,
                {
                    toValue: 0.0,
                    duration: animationDuration,
                }
            ).start(() => {
                this.setState({
                    isShow: false,
                });
                this.isShow = false;
            });
        }, closeDuration);
    }

    componentWillUnmount() {
        this.timer && clearTimeout(this.timer);
    }

    render() {
        let top;
        switch (this.props.position) {
            case 'top':
                top = 120;
                break;
            case 'center':
                top = height / 2;
                break;
            case 'bottom':
                top = height - 160;
                break;
        }
        let view = this.state.isShow ?
            <View
                style={[styles.container, { top: top }]}
                pointerEvents="none"
                >
                <Animated.View
                    style={[styles.content, { opacity: this.state.opacityValue }, this.props.style]}
                    >
                    <Text style={this.props.textStyle}>{this.state.text}</Text>
                </Animated.View>
            </View> : null;
        return view;
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        left: 0,
        right: 0,
        alignItems: 'center',
    },
    content: {
        backgroundColor: 'black',
        opacity: OPACITY,
        borderRadius: 5,
        padding: 10,
    },
    text: {
        color: 'white'
    }
});

Toast.propTypes = {
    style: View.propTypes.style,
    position: React.PropTypes.oneOf([
        'top',
        'center',
        'bottom',
    ]),
    textStyle: Text.propTypes.style
}

Toast.defaultProps = {
    position: 'bottom',
    textStyle: styles.text
}
