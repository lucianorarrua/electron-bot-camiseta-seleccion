import {
  Popover,
  PopoverTrigger,
  Text,
  PopoverContent,
  PopoverBody,
} from '@chakra-ui/react';

export default function InfoPopover() {
  return (
    <Popover trigger="hover">
      <PopoverTrigger>
        <Text fontSize="xs" color="black" as="kbd" cursor="help">
          ¿Que hace el bot?
        </Text>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverBody>
          <Text as="p">
            Cada cierto tiempo consulta la web de adidas para ver si hay
            disponibilidad de la camiseta.
          </Text>
          <Text as="p">
            El tiempo de consulta se selecciona deslizando la barra
            &ldquo;Tiempo de actualización&ldquo;.
          </Text>
          <Text as="p">Si no hay disponibilidad, no muestra nada.</Text>
          <Text as="p">
            Si hay disponibilidad, comenzará a emitir un sonido y mostrará en
            pantalla los detalles para cada variante disponible.
          </Text>
          <Text as="p">
            Es posible marcar los talles de interés presionando en los cuadros
            de cada talle. El bot sólo avisará en caso que haya disponibilidad
            de alguno de los talles que estén marcados en azul.
          </Text>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}
