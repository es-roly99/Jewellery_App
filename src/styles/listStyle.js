import { colors, sizes } from "../Constants";
import { StyleSheet } from "react-native";

export default StyleSheet.create({

    viewList: {
        padding: 10,
        marginRight: 10,
    },
    listItem: {
        marginBottom: 20,
    },
    textListItemId: {
        fontSize: sizes.body,
        width: 65, 
        paddingRight: 20,
        textAlign: "right",
        fontWeight: 'bold',
    },
    textListItemDescription: {
        width: 210,
        fontSize: sizes.body,
        overflow: "hidden",
    },
    buttonEdit: {
        padding: 5,
        borderRadius: 5,
        color: colors.edit
    },
    buttonSell: {
        padding: 5,
        marginLeft: 20,
        borderRadius: 5,
        color: colors.sell, 
    }



})