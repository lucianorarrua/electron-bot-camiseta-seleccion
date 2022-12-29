/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { Progress, ProgressProps } from '@chakra-ui/react';

type Props = { tickTime: number; onTick: () => void } & ProgressProps;

export default function TimerProgress({
  tickTime,
  onTick,
  ...progressProps
}: Props) {
  const [loaderProgessValue, setLoaderProgessValue] =
    useState<number>(tickTime);

  React.useEffect(() => {
    setLoaderProgessValue(100);
    const intervalId = setInterval(() => {
      setLoaderProgessValue((lpv) => {
        const newValue = lpv - 500;
        return newValue > 0 ? newValue : 0;
      });
    }, 500);

    return () => {
      clearInterval(intervalId);
    };
  }, [tickTime]);

  React.useEffect(() => {
    if (loaderProgessValue <= 0) {
      onTick?.();
      setLoaderProgessValue(tickTime);
    }
  }, [loaderProgessValue, onTick, setLoaderProgessValue, tickTime]);

  const value = React.useMemo(
    () => (loaderProgessValue / tickTime) * 100,
    [tickTime, loaderProgessValue]
  );

  return (
    <Progress hasStripe colorScheme="yellow" {...progressProps} value={value} />
  );
}
