import { Box, Heading, Text } from '@chakra-ui/react';

export default function Inbox() {
  return (
    <Box p="8">
      <Heading size="xl" mb="4">
        Inbox
      </Heading>
      <Text color="fg.muted">
        Your inbox is empty. New notifications and messages will appear here.
      </Text>
    </Box>
  );
}
