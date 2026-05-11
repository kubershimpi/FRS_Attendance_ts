import { registerRootComponent } from "expo";
import "react-native-gesture-handler";
import App from "./App";

/**
 * Bootstrap: Entry Point
 * Encapsulation: Ensures native modules are initialized before the UI
 */
registerRootComponent(App);
