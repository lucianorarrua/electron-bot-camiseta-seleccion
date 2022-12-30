import {
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Td,
  Tbody,
  Text,
  TableCaption,
} from '@chakra-ui/react';

const playAlertSound = window?.electron?.ipcRenderer?.playAlertSound;

type Props = {
  productVariations: ProductVariation[];
  watchedVariantSizes: VariantSize[];
  dateReport: Date | undefined;
};

export default function ProductVariationTable({
  productVariations,
  watchedVariantSizes,
  dateReport,
}: Props) {
  const clickLinkHandler = () => playAlertSound('que_mira_bobo.mp3');
  return (
    <TableContainer>
      <Table variant="simple">
        <TableCaption>
          {dateReport && (
            <Text>Fecha de los datos: {dateReport?.toLocaleString()} </Text>
          )}
          <Text
            as="a"
            target="_blank"
            href="https://www.adidas.com.ar/camiseta-titular-argentina-3-estrellas-2022/IB3593.html"
            onClick={clickLinkHandler}
          >
            🔗
            <Text as="u" color="white" fontSize="large">
              Click acá para ir a comprar ⭐⭐⭐
            </Text>
          </Text>
        </TableCaption>

        <Thead>
          <Tr>
            <Th>Talle</Th>
            <Th isNumeric>Cantidad</Th>
          </Tr>
        </Thead>
        <Tbody>
          {productVariations?.map((pv) => {
            const isWatchedVariant = watchedVariantSizes?.find(
              (wvs) => wvs === pv?.size
            );
            return (
              <Tr bg={isWatchedVariant ? 'green.800' : undefined}>
                <Td>
                  <Text as={isWatchedVariant ? 'b' : undefined}>
                    {pv?.size}
                  </Text>
                </Td>
                <Td isNumeric>
                  <Text as={isWatchedVariant ? 'b' : undefined}>
                    {pv?.availability}
                  </Text>
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
