import React from 'react';
import { Tabs } from 'expo-router';
import { Platform, View } from 'react-native';

// Import your SVG files directly as React components
// Active (filled) icons
import HomeSvg from '../../assets/svg/HomeD.svg';
import ExploreSvg from '../../assets/svg/EventD.svg';
import AddSvg from '../../assets/svg/SaveD.svg';
import MessageSvg from '../../assets/svg/MessagesD.svg';
import ProfileSvg from '../../assets/svg/ProfileD.svg';

import HomeSvgA from '../../assets/svg/HomeA.svg';
import ExploreSvgA from '../../assets/svg/EventA.svg';
import AddSvgA from '../../assets/svg/SaveA.svg';
import MessageSvgA from '../../assets/svg/MessagesA.svg';
import ProfileSvgA from '../../assets/svg/ProfileA.svg';




export default function TabLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#FF8A65',
        tabBarInactiveTintColor: '#8E8E93',
  tabBarActiveBackgroundColor: '#0a0a0a',
        tabBarInactiveBackgroundColor:  '#0a0a0a',
  
        tabBarStyle: {
          backgroundColor: '#0a0a0a',
          borderTopWidth: 0.2, // <<<< This fixes the white border
          elevation: 0, // Optional: removes Android shadow
        },
      
        tabBarLabelStyle: {
          fontFamily: 'rm',
          fontSize: 11,
        },
      
        tabBarIcon: ({ focused, color, size }) => {
          let ActiveSvgComponent;
          let InactiveSvgComponent;
                   
          switch (route.name) {
            case 'index':
              ActiveSvgComponent = HomeSvgA;
              InactiveSvgComponent = HomeSvg;
              break;
            case 'explore':
              ActiveSvgComponent = ExploreSvgA;
              InactiveSvgComponent = ExploreSvg;
              break;
            case 'favourite':
              ActiveSvgComponent = AddSvgA;
              InactiveSvgComponent = AddSvg;
              break;
            case 'message':
              ActiveSvgComponent = MessageSvgA;
              InactiveSvgComponent = MessageSvg;
              break;
            case 'profile':
              ActiveSvgComponent = ProfileSvgA;
              InactiveSvgComponent = ProfileSvg;
              break;
            default:
              ActiveSvgComponent = ProfileSvgA;
              InactiveSvgComponent = ProfileSvg;
          }

          const SvgComponent = focused ? ActiveSvgComponent : InactiveSvgComponent;
                   
          return (
            <View style={{
              position: 'relative',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
             
              
              <SvgComponent
                width={23}
                height={23}
                fill={color}
                color={color}

                style={{ 
                  tintColor: color,
                  opacity: focused ? 1 : 1
                }}
              />
            </View>
          );
        },
      })}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'My Events',
        }}
      />
  
      <Tabs.Screen
        name="message"
        options={{
          title: 'Tickets',
        }}
      />

<Tabs.Screen
        name="favourite"
        options={{
          title: 'Bookmarks',
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
        }}
      />
    </Tabs>
  );
}