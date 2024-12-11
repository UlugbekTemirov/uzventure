import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import AppIntroSlider from 'react-native-app-intro-slider';

export default function WelcomeScreen({onDone}: any) {
    const slides = [
        {
          key: 1,
          title: 'Welcome to\nUzVenture',
          text: 'Your ultimate travel companion. Explore the best destinations, attractions, and activities around the world, all in one place.',
          image: require('@/assets/images/welcome_illustration.png'),
        },
        {
          key: 2,
          title: 'Discover New\nDestinations',
          text: 'Find the perfect place to visit! From hidden gems to popular hotspots, we’ve got every destination covered. Let your adventure begin!',
          image: require('@/assets/images/historical_place.webp'),
        },
        {
          key: 3,
          title: 'Connect with\nLocal Guides',
          text: 'Easily find expert local guides who can show you the hidden gems of your destination. Get personalized tours and experiences tailored just for you!',
          image: require('@/assets/images/travel_guide.png'),
          height: 260
        }
      ];
    
    const renderItem = ({item}: any): any => {
        return <View style={{...styles.slide}}>
        <Text style={styles.title}>{item.title}</Text>
        <Image style={{...styles.image, height: item?.height ? item.height : 200}} source={item.image} />
        <Text style={styles.text}>{item.text}</Text>
      </View>
    }

    const renderNextButton = () => {
        return (
          <View style={styles.buttonCircle}>
            <Ionicons
              name="arrow-forward"
              color="rgba(255, 255, 255, .9)"
              size={24}
            />
          </View>
        );
      };
      const renderDoneButton = () => {
        return (
          <View style={styles.buttonCircle}>
            <Ionicons
              name="checkmark"
              color="rgba(255, 255, 255, .9)"
              size={24}
            />
          </View>
        );
      };

    return  <AppIntroSlider renderItem={renderItem} renderDoneButton={renderDoneButton} renderNextButton={renderNextButton} data={slides} onDone={onDone}/>
}


const styles = StyleSheet.create({
    slide: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#fff',
    },
    title: {
      fontSize: 35,
      fontWeight: 'bold',
      textAlign: 'center',
      fontStyle: 'italic',
      maxWidth: '90%',
      marginBottom: 40,
      color: '#555',
    },
    text: {
      fontSize: 18,
      color: '#666',
      textAlign: 'center',
      marginHorizontal: 16,
      marginTop: 40
    },
    image: {
        width: '90%',
        height: 200
    },
    buttonCircle: {
        width: 40,
        height: 40,
        backgroundColor: Colors.light.tint,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
      },

})