// ─────────────────────────────────────────────────────────────────────────────
// navigation/AppNavigator.tsx
//
// Navigation tree:
//   Stack (RootStack)
//   └── Tabs (BottomTabs)
//       ├── JobFinder   → JobFinderScreen
//       └── SavedJobs   → SavedJobsScreen
//   └── ApplicationForm → ApplicationFormScreen  (modal-style slide-from-bottom)
// ─────────────────────────────────────────────────────────────────────────────

import React from 'react';
import { Text } from 'react-native';
import { NavigationContainer }         from '@react-navigation/native';
import { createNativeStackNavigator }  from '@react-navigation/native-stack';
import { createBottomTabNavigator }    from '@react-navigation/bottom-tabs';

import { RootStackParamList, RootTabParamList } from '../types';
import { useTheme } from '../context/ThemeContext';
import { useJobs }  from '../context/JobsContext';

import JobFinderScreen        from '../screens/JobFinderScreen';
import SavedJobsScreen        from '../screens/SavedJobsScreen';
import ApplicationFormScreen  from '../screens/ApplicationFormScreen';

// ─── Navigator instances ──────────────────────────────────────────────────────

const Tab   = createBottomTabNavigator<RootTabParamList>();
const Stack = createNativeStackNavigator<RootStackParamList>();

// ─── Bottom tab navigator ─────────────────────────────────────────────────────

const TabNavigator = () => {
  const { colors } = useTheme();
  const { savedJobs } = useJobs();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.tabBar,
          borderTopColor:  colors.tabBarBorder,
          borderTopWidth:  1,
          paddingBottom:   4,
          paddingTop:      4,
          height:          58,
        },
        tabBarActiveTintColor:   colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarLabelStyle: {
          fontSize:   11,
          fontWeight: '600',
          marginTop:  -2,
        },
      }}
    >
      <Tab.Screen
        name="JobFinder"
        component={JobFinderScreen}
        options={{
          tabBarLabel: 'Find Jobs',
          tabBarIcon: ({ color }) => (
            <Text style={{ fontSize: 22, color }}>🔍</Text>
          ),
        }}
      />
      <Tab.Screen
        name="SavedJobs"
        component={SavedJobsScreen}
        options={{
          tabBarLabel: 'Saved',
          tabBarIcon: ({ color }) => (
            <Text style={{ fontSize: 22, color }}>🔖</Text>
          ),
          tabBarBadge:      savedJobs.length > 0 ? savedJobs.length : undefined,
          tabBarBadgeStyle: { backgroundColor: colors.primary, color: '#FFF', fontSize: 10 },
        }}
      />
    </Tab.Navigator>
  );
};

// ─── Root stack navigator ─────────────────────────────────────────────────────

const AppNavigator = () => {
  const { colors } = useTheme();

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown:  false,
          contentStyle: { backgroundColor: colors.background },
        }}
      >
        <Stack.Screen
          name="Tabs"
          component={TabNavigator}
          options={{ animation: 'none' }}
        />
        <Stack.Screen
          name="ApplicationForm"
          component={ApplicationFormScreen}
          options={{ animation: 'slide_from_bottom' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;