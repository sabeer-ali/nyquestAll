import React from 'react'
import { View, Text } from 'react-native'

export default function RowLine(props) {
    return (
        <View style={[
            { flexDirection: 'row', alignItems: 'center' },
            props.spaceBetween && { justifyContent: 'space-between' },
            props.mv2 && { marginVertical: 20 },
            props.pv2 && { paddingVertical: 20 },
            props.ph2 && { paddingHorizontal: 20 },
            props.mv3 && { marginVertical: 30 },
            props.center && { justifyContent: 'center' },
            props.spaceBetween && { justifyContent: 'space-between' },
            props.width && { width: props.width, },

        ]}>
            {props.children}
        </View>
    )
}
