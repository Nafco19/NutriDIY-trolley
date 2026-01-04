import React, { useState } from "react";
import { StatusBar } from "react-native";

// Navigation
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";

// Colors
import Colors from "./assets/css/colors";

// Screens
import HomeScreen from "./containers/HomeScreen";
import CameraScreen from "./containers/CameraScreen";
import ProductScreen from "./containers/ProductScreen";
import FavoritesScreen from "./containers/FavoritesScreen";
import HistoryScreen from "./containers/HistoryScreen";

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

export default function App() {
  const [scannedProducts, setScannedProducts] = useState([]);
  const [favorites, setFavorites] = useState([]);

  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" backgroundColor={Colors.nutriGreen} />
      <Stack.Navigator>
        {/* Main Tab Navigator */}
        <Stack.Screen options={{ header: () => null }} name="tabs">
          {() => (
            <Tab.Navigator
              tabBarOptions={{
                showIcon: true,
                showLabel: false,
                indicatorStyle: { backgroundColor: "white" },
                tabStyle: { width: 150 },
                style: {
                  backgroundColor: Colors.nutriGreen,
                  height: 60,
                  elevation: 4,
                  justifyContent: "flex-end",
                },
              }}
            >
              {/* Home Tab */}
              <Tab.Screen
                name="home"
                options={{
                  tabBarIcon: () => (
                    <MaterialCommunityIcons
                      name="home"
                      size={26}
                      color="white"
                    />
                  ),
                }}
              >
                {() => (
                  <Stack.Navigator headerMode="none">
                    <Stack.Screen name="homescreen">
                      {() => <HomeScreen />}
                    </Stack.Screen>
                  </Stack.Navigator>
                )}
              </Tab.Screen>

              {/* History Tab */}
              <Tab.Screen
                name="history"
                options={{
                  tabBarIcon: () => (
                    <MaterialCommunityIcons
                      name="history"
                      size={26}
                      color="white"
                    />
                  ),
                }}
              >
                {() => (
                  <Stack.Navigator headerMode="none">
                    <Stack.Screen name="historyscreen">
                      {() => (
                        <HistoryScreen scannedProducts={scannedProducts} />
                      )}
                    </Stack.Screen>
                  </Stack.Navigator>
                )}
              </Tab.Screen>

              {/* Favorites Tab */}
              <Tab.Screen
                name="favorites"
                options={{
                  tabBarIcon: () => (
                    <MaterialCommunityIcons
                      name="star"
                      size={26}
                      color="white"
                    />
                  ),
                }}
              >
                {() => (
                  <Stack.Navigator headerMode="none">
                    <Stack.Screen name="favoritesscreen">
                      {() => <FavoritesScreen favorites={favorites} />}
                    </Stack.Screen>
                  </Stack.Navigator>
                )}
              </Tab.Screen>
            </Tab.Navigator>
          )}
        </Stack.Screen>

        {/* Camera Screen (Full Screen) */}
        <Stack.Screen name="camera" options={{ header: () => null }}>
          {() => (
            <CameraScreen
              scannedProducts={scannedProducts}
              setScannedProducts={setScannedProducts}
            />
          )}
        </Stack.Screen>

        {/* Product Detail Screen */}
        <Stack.Screen
          name="product"
          options={{
            headerStyle: { backgroundColor: Colors.nutriGreen },
            headerTintColor: "#fff",
            title: "Product Details",
          }}
        >
          {() => (
            <ProductScreen
              favorites={favorites}
              setFavorites={setFavorites}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
