import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack
      initialRouteName="home"  // set the initial route to your home screen
      screenOptions={{
        headerShown: false,
      }}
    />
  );
}
