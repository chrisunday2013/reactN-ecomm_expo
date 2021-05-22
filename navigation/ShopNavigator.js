import React from "react";
import {createAppContainer, createSwitchNavigator} from "react-navigation";
import {createDrawerNavigator, DrawerNavigatorItems } from "react-navigation-drawer";
import {createStackNavigator } from "react-navigation-stack";
import {Platform, SafeAreaView, Button, View} from "react-native";
import ProductOverviewScreen from "../screens/shop/ProductOverviewScreen";
import Colors from "../constants/colors";
import ProductDetailScreen from "../screens/shop/ProductDetailScreen";
import CartScreen from "../screens/shop/CartScreen";
import OrdersScreen from "../screens/shop/OrderScreen";
import {Ionicons} from "@expo/vector-icons";
import EditProductScreen from "../screens/user/EditProductScreen"
import UserProductsScreen from "../screens/user/UserProductScreen";
import AuthScreen from "../screens/user/AuthScreen"
import StartupScreen from "../screens/StartupScreen"
import {useDispatch} from "react-redux";
import * as authActions from "../store/actions/auth"

const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? Colors.primary : ''
  },
  headerTintColor: Platform.OS === "android" ? "white" : Colors.primary
}

const ProductsNavigator = createStackNavigator({
  ProductsOverview: ProductOverviewScreen,
  ProductDetail: ProductDetailScreen,
  Cart: CartScreen
}, 
{
  navigationOptions: {
    drawerIcon: drawerConfig => 
    <Ionicons 
      name={Platform.OS === "android" ? "md-cart" : "ios-cart"}
      size={25}
      color ={drawerConfig.tintColor}
    />
  },
    defaultNavigationOptions: defaultNavOptions
 }

);

const OrdersNavigator = createStackNavigator(
  {
  Orders: OrdersScreen
}, 
{
  navigationOptions: {
    drawerIcon: drawerConfig => <Ionicons 
    name={Platform.OS === "android" ? "md-list" : "ios-list"}
    size={25}
    color ={drawerConfig.tintColor}
    />
  },
  defaultNavigationOptions : defaultNavOptions
 }

); 


const AdminNavigator = createStackNavigator(
  {
  userProducts: UserProductsScreen,
  EditProduct: EditProductScreen
}, 
{
  navigationOptions: {
    drawerIcon: drawerConfig => <Ionicons 
    name={Platform.OS === "android" ? "md-create" : "ios-create"}
    size={25}
    color ={drawerConfig.tintColor}
    />
  },
  defaultNavigationOptions : defaultNavOptions
 }

); 

const ShopNavigator = createDrawerNavigator({
  Products: ProductsNavigator,
  Orders: OrdersNavigator,
  Admin: AdminNavigator
},
 {
  contentOptions: {
          activeTintColor: Colors.primary
  },
  contentComponent: props => {
    const dispatch = useDispatch();

    return (
      <View style={{flex: 1, paddingTop: 20 }}>
          <SafeAreaView>
            <DrawerNavigatorItems {...props} />
            <Button title="Logout" color={Colors.primary} 
            onPress={() => {
              dispatch(authActions.logout());
              // props.navigation.navigate("Auth");
            }}/>
          </SafeAreaView>
      </View>
    )
    ;
  }
})

const AuthNavigator = createStackNavigator({
  Auth: AuthScreen
}, 
{
   defaultNavigationOptions: defaultNavOptions
}
);

const MainNavigator = createSwitchNavigator({
Auth: AuthNavigator,
shop: ShopNavigator,
Startup: StartupScreen
})

export default createAppContainer(MainNavigator)