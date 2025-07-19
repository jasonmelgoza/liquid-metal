import { Card, Badge, Text, Flex, Box, Button, Icon, Heading, Tabs, Table } from '@chakra-ui/react';
import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Task {
  id: string;
  name: string;
  priority: 'High' | 'Medium' | 'Low';
  progress: number;
  dueDate: string;
  assignee: string;
}

// Separate data for each tab to avoid complex filtering
const upcomingTasks: Task[] = [
  { id: '1', name: 'Design System Updates', priority: 'High', progress: 25, dueDate: 'Dec 20, 2024', assignee: 'Alice' },
  { id: '2', name: 'Mobile App Testing', priority: 'Medium', progress: 0, dueDate: 'Dec 25, 2024', assignee: 'Bob' },
  { id: '3', name: 'Content Review', priority: 'Low', progress: 10, dueDate: 'Dec 30, 2024', assignee: 'Charlie' },
  { id: '4', name: 'API Integration', priority: 'High', progress: 45, dueDate: 'Jan 5, 2025', assignee: 'David' },
];

const overdueTasks: Task[] = [
  { id: '5', name: 'Bug Fixes', priority: 'High', progress: 80, dueDate: 'Dec 10, 2024', assignee: 'Frank' },
  { id: '6', name: 'Documentation', priority: 'Medium', progress: 60, dueDate: 'Dec 12, 2024', assignee: 'Grace' },
];

const completedTasks: Task[] = [
  { id: '7', name: 'Website Launch', priority: 'High', progress: 100, dueDate: 'Dec 1, 2024', assignee: 'Henry' },
  { id: '8', name: 'Security Audit', priority: 'High', progress: 100, dueDate: 'Nov 28, 2024', assignee: 'Ivy' },
  { id: '9', name: 'Performance Optimization', priority: 'Medium', progress: 100, dueDate: 'Nov 25, 2024', assignee: 'Jack' },
];

const ITEMS_PER_PAGE = 4;

export default function DashboardTable() {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'overdue' | 'completed'>('upcoming');
  const [currentPage, setCurrentPage] = useState(1);

  // Get data based on active tab
  const getCurrentData = () => {
    switch (activeTab) {
      case 'upcoming': return upcomingTasks;
      case 'overdue': return overdueTasks;
      case 'completed': return completedTasks;
      default: return upcomingTasks;
    }
  };

  const currentData = getCurrentData();
  const totalPages = Math.ceil(currentData.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const pageData = currentData.slice(startIndex, endIndex);

  const handleTabChange = (tab: 'upcoming' | 'overdue' | 'completed') => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'red';
      case 'Medium': return 'yellow';
      case 'Low': return 'green';
      default: return 'gray';
    }
  };

  return (
    <Card.Root variant="outline" mt={6}>
      <Card.Header>
        <Heading size="md" fontWeight="semibold">
          My Tasks
        </Heading>
      </Card.Header>
      <Card.Body>
        <Tabs.Root value={activeTab} onValueChange={(details) => {
          handleTabChange(details.value as 'upcoming' | 'overdue' | 'completed');
        }}>
          <Tabs.List>
            <Tabs.Trigger value="upcoming" px={4} py={2} fontSize="sm" fontWeight="medium">
              Upcoming ({upcomingTasks.length})
            </Tabs.Trigger>
            <Tabs.Trigger value="overdue" px={4} py={2} fontSize="sm" fontWeight="medium">
              Overdue ({overdueTasks.length})
            </Tabs.Trigger>
            <Tabs.Trigger value="completed" px={4} py={2} fontSize="sm" fontWeight="medium">
              Completed ({completedTasks.length})
            </Tabs.Trigger>
          </Tabs.List>
          
          <Tabs.Content value={activeTab}>
            {/* Table */}
            <Box overflowX="auto">
              <Table.Root>
                <Table.Header>
                  <Table.Row>
                    <Table.ColumnHeader>
                      Task Name
                    </Table.ColumnHeader>
                    <Table.ColumnHeader>
                      Priority
                    </Table.ColumnHeader>
                    <Table.ColumnHeader>
                      Progress
                    </Table.ColumnHeader>
                    <Table.ColumnHeader>
                      Due Date
                    </Table.ColumnHeader>
                    <Table.ColumnHeader>
                      Assignee
                    </Table.ColumnHeader>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {pageData.map((task) => (
                    <Table.Row key={task.id}>
                      <Table.Cell px={4} py={3}>
                        <Text fontWeight="medium">{task.name}</Text>
                      </Table.Cell>
                      <Table.Cell px={4} py={3}>
                        <Badge colorScheme={getPriorityColor(task.priority)} variant="subtle">
                          {task.priority}
                        </Badge>
                      </Table.Cell>
                      <Table.Cell px={4} py={3}>
                        <Flex align="center" gap={2}>
                          <Box w="100px" h="8px" bg="gray.200" borderRadius="full" overflow="hidden">
                            <Box 
                              h="full" 
                              bg="blue.500" 
                              w={`${task.progress}%`}
                              transition="width 0.3s ease"
                            />
                          </Box>
                          <Text fontSize="sm" color="gray.600">{task.progress}%</Text>
                        </Flex>
                      </Table.Cell>
                      <Table.Cell px={4} py={3}>
                        <Text fontSize="sm">{task.dueDate}</Text>
                      </Table.Cell>
                      <Table.Cell px={4} py={3}>
                        <Flex align="center" gap={2}>
                          <Box
                            w="6"
                            h="6"
                            bg="blue.500"
                            color="white"
                            borderRadius="full"
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            fontSize="xs"
                            fontWeight="medium"
                          >
                            {task.assignee.charAt(0)}
                          </Box>
                          <Text fontSize="sm">{task.assignee}</Text>
                        </Flex>
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table.Root>
            </Box>
            
            {/* Pagination */}
            {totalPages > 1 && (
              <Flex justify="space-between" align="center" px={6} py={4} borderTop="1px solid" borderColor="gray.200">
                <Text fontSize="sm" color="gray.600">
                  Showing {startIndex + 1}-{Math.min(endIndex, currentData.length)} of {currentData.length} tasks
                </Text>
                <Flex gap={2}>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                  >
                    <Icon>
                      <ChevronLeft size={16} strokeWidth={1.5} absoluteStrokeWidth />
                    </Icon>
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                  >
                    <Icon>
                      <ChevronRight size={16} strokeWidth={1.5} absoluteStrokeWidth />
                    </Icon>
                  </Button>
                </Flex>
              </Flex>
            )}
          </Tabs.Content>
        </Tabs.Root>
      </Card.Body>
    </Card.Root>
  );
} 