import * as React from "react";
import { Dimensions, Image, Text, View } from "react-native";
import { configureReanimatedLogger, ReanimatedLogLevel } from "react-native-reanimated";
import Carousel from "react-native-reanimated-carousel";

function Index({ images = ['1', "2"] }) {
    console.log(images)
  const width = Dimensions.get("window").width;
  configureReanimatedLogger({
    level: ReanimatedLogLevel.warn,
    strict: false,
  });

  return (
    <View style={{ flex: 1, height: "100%" }}>
      <Carousel
        loop
        width={width}
        height={302}
        autoPlay={true}
        data={images}
        scrollAnimationDuration={1000}
        // onSnapToItem={(index) => console.log("current index:", index)}
        renderItem={({ item: image, index }) => (
          <View
            key={index}
            style={{
              flex: 1,
              borderWidth: 1,
              justifyContent: "center",
              height: "100%",
              backgroundColor: "black",
            }}
          >
            <Image style={{
                width: "100%",
                height: "100%"
            }} source={{
                uri: image
            }} />
          </View>
        )}
      />
    </View>
  );
}

export default Index;
