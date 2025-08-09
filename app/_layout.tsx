// app/_layout.tsx
import { Stack } from 'expo-router';
import React, { useEffect } from 'react';

export default function RootLayout() {

  return (
  
    <Stack
      initialRouteName="bug/index"
      screenOptions={{
        headerShown: false,
      }}
    />
  );
}
