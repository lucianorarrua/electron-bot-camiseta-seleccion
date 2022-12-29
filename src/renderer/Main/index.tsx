import { Container } from '@chakra-ui/layout';
import React, { useState } from 'react';
import {
  VStack,
  Slider,
  SliderTrack,
  Box,
  SliderFilledTrack,
  SliderThumb,
  StackDivider,
  SliderMark,
  HStack,
  Text,
  useToast,
} from '@chakra-ui/react';
import './index.css';
import CardInput from 'renderer/CardInput';
import TimerProgress from 'renderer/TimerProgress';
import ProductVariationTable from 'renderer/ProductVariationTable';

const getShirtAvailability =
  window?.electron?.ipcRenderer?.getShirtAvailability;

const focusWindow = window?.electron?.ipcRenderer?.focus;

const MIN_TIME = 3;
const MAX_TIME = 300;
const DEFAULT_CHECK_INTERVAL = 60;
const DEFAULT_WATCH_VARIANTS: VariantSize[] = [
  'XS',
  'S',
  'M',
  'L',
  'XL',
  '2XL',
  '3XL',
];
const STATUS = {
  NOT_AVAILABLE: 'NOT_AVAILABLE',
  IN_STOCK: 'IN_STOCK',
};

export default function Main() {
  const toast = useToast();
  const [checkInterval, setCheckInterval] = useState(DEFAULT_CHECK_INTERVAL);
  const [lastCheckDate, setlastCheckDate] = useState<Date | undefined>();
  const [lastResponse, setLastResponse] = useState<
    ProductAvailability | undefined
  >();
  const [watchedVariantSizes, setWatchedVariantSizes] = useState<VariantSize[]>(
    DEFAULT_WATCH_VARIANTS
  );

  function matchVariants(
    variationList: ProductVariation[] = [],
    watchVariants: string[] = watchedVariantSizes
  ) {
    return variationList?.reduce(
      (pv, cv) => pv || !!watchVariants.find((v) => v === cv?.size),
      false
    );
  }

  async function checkAvailability() {
    console.log('check');

    try {
      const axiosResponse = await getShirtAvailability();
      const responseData = axiosResponse.data;
      setlastCheckDate(new Date());
      setLastResponse(responseData);
    } catch (error) {
      toast({
        title: 'Error.',
        description:
          'Ocurrió un error al comprobar disponibilidad de camisetas.',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
      console.error('❌❌❌');
      console.error(error);
    }
  }

  function alertVariationAvailability(
    productVariations: ProductVariation[],
    alertDate?: Date
  ) {
    toast.closeAll();
    toast({
      title: (
        <Text mb="8px" as="b" fontSize="large">
          Hay stock de los siguientes talles
        </Text>
      ),
      description: (
        <ProductVariationTable
          productVariations={productVariations}
          dateReport={alertDate}
          watchedVariantSizes={watchedVariantSizes}
        />
      ),
      status: 'success',
      duration: null,
      isClosable: true,
    });
    focusWindow();
  }

  function isWatchedVariant(
    variantSize: VariantSize,
    variantSizeList: string[] = watchedVariantSizes
  ) {
    return !!variantSizeList.find((v) => v === variantSize);
  }

  const clickVariantHandler = (variantSizeValue: VariantSize) =>
    setWatchedVariantSizes((wv: VariantSize[]) => {
      const cwv = [...wv];
      const index = cwv.findIndex((v) => v === variantSizeValue);
      if (index === -1) {
        return [...wv, variantSizeValue];
      }
      cwv?.splice(index, 1);
      return cwv;
    });

  const tickTimerProgressHandler = () => {
    checkAvailability();
  };

  React.useEffect(() => {
    checkAvailability();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    if (lastResponse) {
      const variationsAvailable = lastResponse?.variation_list?.filter(
        (variation) => variation?.availability > 0
      );
      if (
        lastResponse?.availability_status !== STATUS?.NOT_AVAILABLE &&
        matchVariants(variationsAvailable, watchedVariantSizes)
      ) {
        const filteredVariationList = lastResponse?.variation_list?.filter(
          (vl) => vl.availability > 0
        );
        alertVariationAvailability(filteredVariationList, lastCheckDate);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastResponse]);

  return (
    <Container
      className="main-container"
      padding={5}
      maxW="container.lg"
      color="#262626"
    >
      <VStack
        divider={<StackDivider borderColor="gray.200" />}
        spacing={4}
        justifyContent="end"
      >
        <Box w="100%" paddingX={8} paddingY={4} bg="whiteAlpha.700">
          <Text mb="8px" as="b" color="blue.500">
            Tiempo de actualización
          </Text>
          <Slider
            value={checkInterval}
            onChange={setCheckInterval}
            min={MIN_TIME}
            max={MAX_TIME}
            step={5}
            color="blue.500"
            mt={8}
            mb={2}
          >
            <SliderMark value={MIN_TIME}>{MIN_TIME}</SliderMark>
            <SliderMark value={(MAX_TIME - MIN_TIME) / 2}>
              {(MAX_TIME - MIN_TIME) / 2}
            </SliderMark>
            <SliderMark value={MAX_TIME}>{MAX_TIME}</SliderMark>
            <SliderMark
              value={checkInterval}
              textAlign="center"
              color="blue.500"
              mt="-10"
              ml="-10"
              fontWeight="bold"
              w="20"
            >
              {checkInterval} seg
            </SliderMark>
            <SliderTrack bg="white">
              <Box position="relative" right={10} />
              <SliderFilledTrack bg="blue.300" />
            </SliderTrack>
            <SliderThumb boxSize={6} />
          </Slider>
        </Box>
        <Box w="100%" paddingX={8} paddingY={4} bg="whiteAlpha.700">
          <Text mb="8px" as="b" color="blue.500">
            Talle de interés
          </Text>
          <HStack wrap="wrap" spacing={2} justify="center">
            {DEFAULT_WATCH_VARIANTS?.map((dv) => (
              <CardInput
                key={dv}
                selected={isWatchedVariant(dv)}
                value={dv}
                onClick={clickVariantHandler}
              >
                {dv}
              </CardInput>
            ))}
          </HStack>
        </Box>
        <Box w="100%" paddingX={8} paddingY={4} bg="whiteAlpha.700">
          {/* <Progress value={loaderProgessValue} hasStripe colorScheme="yellow" /> */}
          <Text mb="8px" as="b" color="blue.500">
            Próxima actualización
          </Text>
          <TimerProgress
            onTick={tickTimerProgressHandler}
            tickTime={checkInterval * 1000}
          />
        </Box>
        <HStack justify="end" w="100%">
          {lastCheckDate && (
            <Text
              bg="whiteAlpha.500"
              fontSize="sm"
              color="black"
              as="b"
              textAlign="end"
            >
              Última comprobación: {lastCheckDate?.toLocaleString()}
            </Text>
          )}
        </HStack>
      </VStack>
    </Container>
  );
}
