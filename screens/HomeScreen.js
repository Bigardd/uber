import React from "react";
import { View, SafeAreaView, Image, StyleSheet } from "react-native";
import tw from "tailwind-react-native-classnames";
import NavOptions from "../components/NavOptions";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_MAPS_APIKEY } from "@env";
import { useDispatch } from "react-redux";
import { setDestination, setOrigin } from "../slices/NavSlice";
import NavFavourites from "../components/NavFavourites";

const HomeScreen = () => {
  const dispatch = useDispatch();
  
  return (
    <SafeAreaView styles={tw`bg-white h-full`}>
      <View style={tw`p-5`}>
        <Image
          style={{
            width: 100,
            height: 100,
            resizeMode: "contain",
          }}
          source={{
            url: "https://links.papareact.com/gzs",
          }}
        />

        <GooglePlacesAutocomplete
          placeholder="where from?"
          listViewDisplayed={true}
          listEmptyComponent={<div>Empty</div>}
          styles={{
            container: {
              flex: 0,
              minHeight: 44,
              zIndex:1
            },
            textInput: {
              fontSize: 18,
            },
            listView: { color: "black", zIndex: 100000, minHeight: 400, position:"absolute", top:44},
          }}
          onPress={(data, details = null) => {
            dispatch(
              setOrigin({
                location: details.geometry.location,
                description: data.description,
              })
            );
            dispatch(setDestination(null));
          }}
          fetchDetails={true}
          returnKeyType={"search"}
          enablePoweredByContainer={false}
          minLength={2}
          query={{ key: GOOGLE_MAPS_APIKEY, language: "en" }}
          nearbyPlacesAPI="GooglePlacesSearch"
          debounce={400}
          requestUrl={{
            useOnPlatform: "web",
            url: `https://cors-proxy.teamcode1011101.repl.co/?url=https://maps.googleapis.com/maps/api`,
          }}
        />

        <NavOptions />
        <NavFavourites />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  text: {
    color: "blue",
  },
});
