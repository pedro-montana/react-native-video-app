import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LandingScreen from './components/Landing';
import VideosScreen from './components/Videos';
import SingleVideo from './components/Video';
import { useEffect } from 'react';

const Stack = createStackNavigator();

export default function App() {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        if (!loaded) {
            setTimeout(() => {
                setLoaded(true);
            }, 500);
        }
    }, []);

    if (!loaded) {
        return (
            <View style={styles.loadingContainer}>
                <Text style={styles.loadingText}>...Loading...</Text>
            </View>
        );
    }
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Videos">
                <Stack.Screen
                    name="Landing"
                    component={LandingScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Videos"
                    component={VideosScreen}
                    options={{ title: 'Videos', headerStyle: { backgroundColor: 'rgb(128, 179, 255)' } }}
                />
                <Stack.Screen
                    name="Video"
                    component={SingleVideo}
                    options={{ headerShown: false }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        fontSize: 20,
    },
});
