// Copyright (c) 2016-present Mattermost, Inc. All Rights Reserved.
// See License.txt for license information.

import React, {PropTypes, PureComponent} from 'react';

import {ActivityIndicator, StyleSheet, View} from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    loading: {
        marginLeft: 3
    }
});

export default class Loading extends PureComponent {
    static propTypes = {
        size: PropTypes.string,
        color: PropTypes.string,
        style: View.propTypes.style
    };

    static defaultProps = {
        size: 'large',
        color: 'grey',
        style: {}
    };

    render() {
        return (
            <View style={styles.container}>
                <ActivityIndicator
                    style={[styles.loading, this.props.style]}
                    animating={true}
                    size={this.props.size}
                    color={this.props.color}
                />
            </View>
        );
    }
}
