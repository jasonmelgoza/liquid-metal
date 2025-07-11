import { Box, Heading, Text } from '@chakra-ui/react';

export default function HelpCenter() {
  return (
    <Box p="8">
      <Heading size="xl" mb="4">
        Help Center
      </Heading>
      <Text color="fg.muted">
        Find answers to common questions, tutorials, and support documentation.
      </Text>
    </Box>
  );
}
