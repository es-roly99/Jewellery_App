import { colors, sizes } from "../Constants";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
    area: {
        marginBottom: 10,
        marginRight: 15,
        marginLeft: 13,
        marginTop: 20
    },
    textColorWhite: {
        color: colors.white,
    },
    dropDownMenu: {
        backgroundColor: colors.gray,
        borderBottomLeftRadius: sizes.radius,
        borderBottomRightRadius: sizes.radius,
        height: 360,
    },
    dropDownMenu2: {
        backgroundColor: colors.gray,
        borderBottomLeftRadius: sizes.radius,
        borderBottomRightRadius: sizes.radius
    },
    dropDownMenuButton: {
        width: 180,
        height: 50,
        backgroundColor: colors.gray,
        borderRadius: sizes.radius,
    },
    dropDownMenuButtonText: {
        fontSize: sizes.h1,
        textAlign: "left"
    },
    dropDownMenuRow: {
        backgroundColor: colors.gray,
        height: 60,
    },
    dropDownMenuRowText: {
        fontSize: sizes.h1,
        textAlign: "left",
        marginLeft: 15
    },
    shadow: {
        shadowColor: '#171717',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    minShadow: {
        shadowColor: '#171717',
        shadowOffset: { width: -1, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3
    },
    h1: {
        fontWeight: 'bold',
        fontSize: sizes.h1,
        paddingTop: 30,
        padding: 20,
    },
    search: {
        color: colors.black,
        backgroundColor: colors.gray,
        width: 80,
        fontSize: sizes.header,
        padding: 5,
        paddingLeft: 10,
        marginRight: 10,
        borderRadius: sizes.radius,
        height: 50
    },
    buttonAddJewell: {
        padding: 5,
        borderRadius: 5,
        height: 50,
        width: 50,
        backgroundColor: colors.add,
    },
    buttonJewel: {
        borderWidth: .5,
        borderColor: colors.darkGray,
        backgroundColor: colors.gray,
        borderRadius: sizes.radius,
        marginHorizontal: 20
    },
    viewJewel: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginVertical: 15,
    },
    text: {
        fontSize: 18,
        padding: 5,
        marginVertical: 20,
        marginHorizontal: 5
    },
    flexLeft: {
        display: 'flex',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        alignItems: 'center',
    },
    flexRight: {
        display: 'flex',
        justifyContent: 'flex-end',
        flexDirection: 'row',
        alignItems: 'center',
    },
    flexBetween: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
    },
    flexCenter: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
    },
    flexAround: {
        display: 'flex',
        justifyContent: 'space-around',
        flexDirection: 'row',
        alignItems: 'center',
    },
    flexEvenly: {
        display: 'flex',
        justifyContent: 'space-evenly',
        flexDirection: 'row',
        alignItems: 'center',
    },
    navbar: {
        marginTop: 30,
    },
    navbarMenu: {
        margin: 13,
        paddingTop: 15,
    },
    navbarText: {
        color: colors.black,
        fontSize: sizes.h1,
        marginHorizontal: 20,
        fontWeight: "bold",
    },
    loadingScreen: {
        width: '100%',
        height: 500,
    }
    

});