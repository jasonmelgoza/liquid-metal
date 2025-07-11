import { Box, Heading, Text } from '@chakra-ui/react';

export default function Calendar() {
  return (
    <Box p="8">
      <Heading size="xl" mb="4">
        Calendar
      </Heading>
      <Text color="fg.muted">
        Manage your schedule and upcoming events. Your calendar is currently empty.
      </Text>
    </Box>
  );
}
