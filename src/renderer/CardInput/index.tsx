/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/require-default-props */
import { Box } from '@chakra-ui/react';
import React, { ReactNode } from 'react';

type Props = {
  children?: ReactNode | undefined;
  selected?: boolean | undefined;
  onClick?: (value: any) => void;
  value?: any;
};

export default function CardInput({
  selected,
  onClick,
  children,
  value,
}: Props) {
  const selectedProps = React.useMemo(
    () =>
      selected
        ? {
            bg: 'blue.500',
            color: 'white',
            borderColor: 'blue.500',
            fontWeight: 'bold',
          }
        : {},
    [selected]
  );

  const clickBoxHandler = () => onClick?.(value);

  return (
    <Box
      onClick={clickBoxHandler}
      cursor="pointer"
      borderWidth="1px"
      borderRadius="md"
      boxShadow="md"
      bg="whiteAlpha.600"
      minW="65px"
      textAlign="center"
      px={5}
      py={3}
      {...selectedProps}
    >
      {children}
    </Box>
  );
}
