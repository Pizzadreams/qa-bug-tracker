// app/_layout.tsx
import { Stack } from 'expo-router';
import React from 'react';

export default function RootLayout() {
  return (
    <Stack
      initialRouteName="bug/index"
      screenOptions={{
        headerShown: true,
      }}
    />
  );
}
