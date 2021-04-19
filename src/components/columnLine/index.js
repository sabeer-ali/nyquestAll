import React from 'react'
import { View, Text } from 'react-native'

export default function ColumnLine(props) {
    return (
        <View style={[
            { flexDirection: 'column', },
            props.center && { justifyContent: 'center' },
            props.bg && { backgroundColor: props.bg },
            props.pv2 && { paddingVertical: 20 }
        ]}>
            {props.children}
        </View>
    )
}
