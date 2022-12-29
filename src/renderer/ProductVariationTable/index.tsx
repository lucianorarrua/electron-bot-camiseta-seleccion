import React from 'react';
import {
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Td,
  Tbody,
  Tfoot,
  Text,
  TableCaption,
} from '@chakra-ui/react';

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
  return (
    <TableContainer>
      <Table variant="simple">
        {dateReport && (
          <TableCaption>
            <Text>Fecha de los datos: {dateReport?.toLocaleString()} </Text>
            <Text
              as="a"
              color="blue.500"
              target="_blank"
              href="https://www.adidas.com.ar/camiseta-titular-argentina-3-estrellas-2022/IB3593.html"
            >
              🔗 Click para ir a comprar
            </Text>
          </TableCaption>
        )}
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
