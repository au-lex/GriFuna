import React from 'react';
import { Tabs } from 'expo-router';
import { View } from 'react-native';


import OrganizerEventsSvg from '../../assets/svg/EventD.svg';
import CreateEventSvg from '../../assets/svg/AddSquareD.svg';
import TalentD from "../../assets/svg/People-BoldD.svg";
import ProfileSvg from '../../assets/svg/ProfileD.svg';
import MsgD from "../../assets/svg/MessageNotifD.svg";

import OrganizerEventsSvgA from '../../assets/svg/EventA.svg';
import CreateEventSvgA from '../../assets/svg/AddSquareA.svg';
import TalentA from "../../assets/svg/People-BoldA.svg";
import ProfileSvgA from '../../assets/svg/ProfileA.svg';
import MsgA from "../../assets/svg/MessageNotifA.svg";

export default function OrganizerTabLayout() {  
  const getTabIcon = (route, focused, color) => {
    let ActiveSvgComponent;
    let InactiveSvgComponent;

    switch (route.name) {

      case 'orgEvent':
        ActiveSvgComponent = OrganizerEventsSvgA;
        InactiveSvgComponent = OrganizerEventsSvg;
        break;

      case 'dashboard':
        ActiveSvgComponent = MsgA;
        InactiveSvgComponent = MsgD;
        break;

      case 'addEvent':
        ActiveSvgComponent = CreateEventSvgA;
        InactiveSvgComponent = CreateEventSvg;
        break;

      case 'findTalent':
        ActiveSvgComponent = TalentA;
        InactiveSvgComponent = TalentD;
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
            opacity: focused ? 1 : 0.9,
          }}
        />
      </View>
    );
  };

  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#FF8A65',
        tabBarInactiveTintColor: '#8E8E93',
        tabBarActiveBackgroundColor: '#0a0a0a',
        tabBarInactiveBackgroundColor: '#0a0a0a',
        tabBarStyle: {
          backgroundColor: '#0a0a0a',
          borderTopWidth: 0.2,
          elevation: 0,
        },
        tabBarLabelStyle: {
          fontFamily: 'rm',
          fontSize: 11,
        },
        tabBarIcon: ({ focused, color, size }) => getTabIcon(route, focused, color),
      })}
    >

<Tabs.Screen
        name="orgEvent"
        options={{
          title: 'My Events',
        }}
      />

      <Tabs.Screen
        name="dashboard"
        options={{
          title: 'Messages',
        }}
      />

      <Tabs.Screen
        name="addEvent"
        options={{
          title: 'Create Event',
        }}
      />
      <Tabs.Screen
        name="findTalent"
        options={{
          title: 'Hire Talent',
        }}
      />
      <Tabs.Screen
        name="profileOrg"
        options={{
          title: 'Profile',
        }}
      />
    </Tabs>
  );
}