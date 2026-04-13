import React from "react"
import { View, Text, ScrollView, Linking, StyleSheet } from "react-native"

export default function PrivacyPolicyScreen(){

const openPolicy = () => {
Linking.openURL("https://www.thetrendsetteragency.com/apps/health-logic/")
}

return(

<ScrollView style={styles.container}>

<Text style={styles.title}>
HealthLogic Privacy Policy
</Text>

<Text style={styles.text}>
HealthLogic analyzes product ingredients to provide health insights.
</Text>

<Text style={styles.text}>
All ingredient analysis occurs locally on your device whenever possible.
</Text>

<Text style={styles.text}>
HealthLogic does not store personal health data remotely.
</Text>

<Text style={styles.link} onPress={openPolicy}>
View Full Privacy Policy
</Text>

</ScrollView>

)

}

const styles = StyleSheet.create({

container:{
flex:1,
padding:20,
backgroundColor:"#fff"
},

title:{
fontSize:22,
fontWeight:"bold",
marginBottom:20
},

text:{
fontSize:16,
marginBottom:12
},

link:{
fontSize:16,
color:"#007AFF",
marginTop:20
}

})
