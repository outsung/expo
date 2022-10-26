import './environment/validate.fx';
// load remote logging for compatibility with custom development clients
import './environment/logging.fx';
// load expo-asset immediately to set a custom `source` transformer in React Native
import 'expo-asset';
import Constants, { ExecutionEnvironment } from 'expo-constants';
import * as Font from 'expo-font';
import { NativeModulesProxy, Platform } from 'expo-modules-core';
import ReactNative, { StyleSheet } from 'react-native';
import { createErrorHandler } from './errors/ExpoErrorManager';
import { createProxyForNativeModules } from './proxies/NativeModules';
// If expo-font is installed and the style preprocessor is available, use it to parse fonts.
if (StyleSheet.setStyleAttributePreprocessor) {
    StyleSheet.setStyleAttributePreprocessor('fontFamily', Font.processFontFamily);
}
// Asserts if bare workflow isn't setup correctly.
if (NativeModulesProxy.ExpoUpdates?.isMissingRuntimeVersion) {
    const message = 'expo-updates is installed but there is no runtime or SDK version configured. ' +
        "You'll need to configure one of these two properties in " +
        Platform.select({ ios: 'Expo.plist', android: 'AndroidManifest.xml' }) +
        ' before OTA updates will work properly.';
    if (__DEV__) {
        console.warn(message);
    }
    else {
        throw new Error(message);
    }
}
if (Constants.executionEnvironment === ExecutionEnvironment.StoreClient) {
    // set up some improvements to commonly logged error messages stemming from react-native
    const globalHandler = ErrorUtils.getGlobalHandler();
    ErrorUtils.setGlobalHandler(createErrorHandler(globalHandler));
}
// Having two if statements will enable terser to remove the entire block.
if (__DEV__) {
    const proxiedNativeModules = createProxyForNativeModules(ReactNative.NativeModules);
    Object.defineProperty(ReactNative, 'NativeModules', {
        get() {
            return proxiedNativeModules;
        },
        configurable: true,
        enumerable: true,
    });
}
//# sourceMappingURL=Expo.fx.js.map