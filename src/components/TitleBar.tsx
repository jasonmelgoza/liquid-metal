import { Flex, Box, Text, Button, Icon } from '@chakra-ui/react';
import { Download, Plus } from 'lucide-react';

interface TitleBarProps {
  firstName?: string;
  tasksDue?: number;
  tasksOverdue?: number;
  upcomingDeadlines?: number;
}

export function TitleBar({
  firstName = 'Jason',
  tasksDue = 4,
  tasksOverdue = 2,
  upcomingDeadlines = 8,
}: TitleBarProps) {
  return (
    <Flex align="center" justify="space-between" px={5} py={4} w="full">
      <Box>
        <Flex align="center" gap={1.5} fontWeight="semibold" fontSize="20px">
          <Text as="span">Welcome back,</Text>
          <Text as="span">{firstName}</Text>
          <Text as="span" fontSize="20px">👋</Text>
        </Flex>
        <Flex align="center" gap={1} mt={1} fontSize="14px">
          <Text as="span" fontWeight="semibold">{tasksDue}</Text>
          <Text as="span" color="fg.muted">Tasks Due Today,</Text>
          <Text as="span" fontWeight="semibold">{tasksOverdue}</Text>
          <Text as="span" color="fg.muted">Overdue Tasks,</Text>
          <Text as="span" fontWeight="semibold">{upcomingDeadlines}</Text>
          <Text as="span" color="fg.muted">Upcoming Deadlines (This Week)</Text>
        </Flex>
      </Box>
      <Flex gap={3}>
        <Button variant="surface" size="sm">
          <Icon as={Download} boxSize={4} mr={2} />
          Export
        </Button>
        <Button colorPalette="teal" variant="solid" size="sm">
          <Icon as={Plus} boxSize={4} mr={2} />
          Create
        </Button>
      </Flex>
    </Flex>
  );
}

export default TitleBar; 