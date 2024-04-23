import { StatusBar } from 'expo-status-bar';
import { useEffect, useRef, useState } from 'react';
import { Button, StyleSheet, Text, View,Pressable} from 'react-native';
import { useVoiceRecognition } from './hooks/useVoiceRecognition';
import micIcon from './assets/micIcon.png'
import { Image } from 'expo-image';
import LottieView from 'lottie-react-native';


export default function App() {

const [borderColor,setBorderColor] = useState<"lightgray" | "lightgreen">("lightgray");


const {state,startRecognizing,stopRecognizing,destroyRecognizer} = useVoiceRecognition();

const loadRef = useRef();

useEffect(()=>{
},[]);

const stratLoading = () =>{
  loadRef?.current?.play();
}

return (
  <View style={styles.container}>

<Text style={{ fontSize: 30, fontWeight: "bold", marginBottom: 5,alignSelf:'center' }}>
    Emote Robot 
    </Text>
    <View style={styles.robotAnim}>
    <LottieView style={{flex:1}} source={require('./assets/welcome.json')} autoPlay loop />
    </View>

    <Text style={styles.instructions}>
      Press and hold this button to record your voice. Release the button to
      send the recording, and you'll hear a response
    </Text>
    <Text style={styles.welcome}>Your message: "{state.results[0]}"</Text>
    <Pressable
      onPressIn={() => {
        setBorderColor("lightgreen");
        startRecognizing();
        stratLoading();
      }}
      onPressOut={() => {
        setBorderColor("lightgray");
        stopRecognizing();
        // handleSubmit();
      }}
      style={{
        width: "90%",
        padding: 30,
        gap: 10,
        borderWidth: 3,
        alignItems: "center",
        borderRadius: 10,
        borderColor: borderColor,
      }}
    >
      <Text style={styles.welcome}>
        {state.isRecording ? "Release to Send" : "Hold to Speak"}
      </Text>

      {/* <Image source={micIcon} style={{height:100,width:100}} /> */}
      
      <View style={styles.loaderAnime}>
      <LottieView ref={loadRef}  style={{flex:1}} loop={borderColor === 'lightgreen'} source={require('./assets/micanimation.json')}/>
      </View>

      {/* <Image source="https://androidexample365.com/content/images/2019/12/CirclesLoadingViewc.gif" style={styles.iconStyle}/> */}
    
    </Pressable>
    {/* <Button
      title="Replay last message"
    /> */}
  </View>
);
}

const styles = StyleSheet.create({
button: {
  width: 50,
  height: 50,
},
container: {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#F5FCFF",
  padding: 20,
},
welcome: {
  fontSize: 20,
  textAlign: "center",
  margin: 10,
},
action: {
  textAlign: "center",
  color: "#0000FF",
  marginVertical: 5,
  fontWeight: "bold",
},
instructions: {
  textAlign: "center",
  color: "#333333",
  marginBottom: 5,
  fontSize: 12,
},
stat: {
  textAlign: "center",
  color: "#B0171F",
  marginBottom: 1,
},
iconStyle:{
  width: 100,
  height:100
},
robotAnim:{
  height:300,
  aspectRatio:1
},
loaderAnime:{
  height:200,
  aspectRatio:1
}
});
