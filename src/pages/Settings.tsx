import { Box, Heading, Text } from '@chakra-ui/react';

export default function Settings() {
  return (
    <Box p="8">
      <Heading size="xl" mb="4">
        Settings
      </Heading>
      <Text color="fg.muted">
        Manage your account preferences, notifications, and application settings.
      </Text>
    </Box>
  );
}
