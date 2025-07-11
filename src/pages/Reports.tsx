import { Box, Heading, Text } from '@chakra-ui/react';

export default function Reports() {
  return (
    <Box p="8">
      <Heading size="xl" mb="4">
        Reports
      </Heading>
      <Text color="fg.muted">
        View analytics and reports for your projects. Generate custom reports here.
      </Text>
    </Box>
  );
}
