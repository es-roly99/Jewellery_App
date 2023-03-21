import { colors, sizes } from "../Constants";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
scrollViewJewelDetails:{
    paddingTop: 15,
    paddingHorizontal: 5
},
viewJewelDetail:{
    paddingHorizontal: 20,
    paddingVertical: 5
},
viewJewelDetailLast:{
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 20
},
textInputDetails: {
    borderRadius: sizes.radius,
    backgroundColor: colors.gray,
    height: 50,
    paddingHorizontal: 10
},
buttonCancel: {
    height: 50,
    width: '40%',
    backgroundColor: colors.sell,
    borderRadius: sizes.radius,

},
buttonSave: {
    height: 50,
    width: '40%',
    backgroundColor: colors.edit,
    borderRadius: sizes.radius,
},
dropDownMenu: {
    backgroundColor: colors.gray,
    borderBottomLeftRadius: sizes.radius,
    borderBottomRightRadius: sizes.radius,
},
dropDownMenuButton: {
    width: '100%',
    height: 50,
    backgroundColor: colors.gray,
    borderRadius: sizes.radius,
},
dropDownMenuButtonText:{
    fontSize: sizes.h2,
    textAlign: "left"
},
dropDownMenuRow: {
    backgroundColor: colors.gray,
    height: 60,
},
dropDownMenuRowText: {
    fontSize: sizes.h2,
    textAlign: "left",
    marginLeft: 15
},

})