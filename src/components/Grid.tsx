import React from 'react'
import { Dimensions, FlatList, PixelRatio, StyleSheet } from 'react-native'

interface GridProps {
  renderItem: (item: any) => {};
  numColumns?: number;
  itemMargin?: number;
}

export const Grid = ({
  renderItem,
  numColumns = 4,
  itemMargin = StyleSheet.hairlineWidth,
}: GridProps) => {

  const renderGridItem = (info: any) => {
    const {index} = info;

    const {width} = Dimensions.get('window');

    const size = PixelRatio.roundToNearestPixel(
      (width - itemMargin * (numColumns - 1)) / numColumns,
    );

    // We don't want to include a `marginLeft` on the first item of a
    // row
    const marginLeft = index % numColumns === 0 ? 0 : itemMargin;

    // We don't want to include a `marginTop` on the first row of the
    // grid
    const marginTop = index < numColumns ? 0 : itemMargin;

    return renderItem({ ...info, size, marginLeft, marginTop });
  }

  return (
    <FlatList
      renderItem={renderGridItem}
      numColumns={numColumns}
      itemMargin={itemMargin}
    />
  )
}

const styles = StyleSheet.create({

})