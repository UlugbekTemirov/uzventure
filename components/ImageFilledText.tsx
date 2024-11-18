import React from 'react';
import { View } from 'react-native';
import { Svg, Text as SvgText, ClipPath, Image as SvgImage, Defs } from 'react-native-svg';

export default function ImageFilledText() {
  return (
   
        <Svg height="220" width="500">
      <Defs>
        <ClipPath id="clip">
          <SvgText x="0" y="65" fontSize="50" fontWeight="bold" fontStyle='italic'>
            Uzbekistan
          </SvgText>
        </ClipPath>
      </Defs>
      <SvgImage
        x="0"
        y="-100"
        width="100%"
        height="100%"
        href={{ uri: 'https://pediatriya.uz/wp-content/uploads/2015/05/flag.jpg' }}
        clipPath="url(#clip)"
      />
    </Svg>
  );
}
