import React from 'react';
import { Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ProjectProvider } from './src/context/ProjectContext';
import { Colors } from './src/theme/Theme';

import RecordingScreen from './src/screens/RecordingScreen';
import TracksScreen from './src/screens/TracksScreen';
import InstrumentsScreen from './src/screens/InstrumentsScreen';
import MixerScreen from './src/screens/MixerScreen';
import AIScreen from './src/screens/AIScreen';

/**
 * APP.JS - Mlango wa Kuingia wa Ratqa Studio
 * --------------------------------------------
 * Muundo: ProjectProvider inafunika NAVIGATION NZIMA - hivyo
 * screen ZOTE tano zinapata state MOJA kutoka ProjectContext.
 * Hakuna screen inayounda AudioEngine au Mixer yake yenyewe -
 * zote zinashiriki injini MOJA (tazama src/context/ProjectContext.js).
 */

const Tab = createBottomTabNavigator();

const TAB_ICONS = {
  Rekodi: '●',
  Tracks: '🎚',
  Vyombo: '🎹',
  Mixer: '🎛',
  AI: '🤖',
};

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ProjectProvider>
        <StatusBar style="light" />
        <NavigationContainer
          theme={{
            dark: true,
            colors: {
              primary: Colors.accentPrimary,
              background: Colors.background,
              card: Colors.surface,
              text: Colors.textPrimary,
              border: Colors.border,
              notification: Colors.accentDanger,
            },
          }}
        >
          <Tab.Navigator
            screenOptions={({ route }) => ({
              headerShown: false,
              tabBarActiveTintColor: Colors.accentPrimary,
              tabBarInactiveTintColor: Colors.textMuted,
              tabBarStyle: {
                backgroundColor: Colors.surface,
                borderTopColor: Colors.border,
              },
              tabBarIcon: () => (
                <Text style={{ fontSize: 18 }}>
                  {TAB_ICONS[route.name] || '•'}
                </Text>
              ),
            })}
          >
            <Tab.Screen name="Rekodi" component={RecordingScreen} />
            <Tab.Screen name="Tracks" component={TracksScreen} />
            <Tab.Screen name="Vyombo" component={InstrumentsScreen} />
            <Tab.Screen name="Mixer" component={MixerScreen} />
            <Tab.Screen name="AI" component={AIScreen} />
          </Tab.Navigator>
        </NavigationContainer>
      </ProjectProvider>
    </GestureHandlerRootView>
  );
}
