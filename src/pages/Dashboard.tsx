import { Box, Heading, Text } from '@chakra-ui/react';

export default function Dashboard() {
  return (
    <Box p="8">
      <Heading size="xl" mb="4">
        Dashboard
      </Heading>
      <Text color="fg.muted">
        Welcome to your dashboard. Here you can see an overview of your projects and activities.
      </Text>
    </Box>
  );
}
