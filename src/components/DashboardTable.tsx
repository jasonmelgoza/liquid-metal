import { Card, Badge, Text, Flex, Box, Button, Icon, Heading, Tabs, Table, Avatar } from '@chakra-ui/react';
import { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight, Hourglass, Bell, SquareCheck } from 'lucide-react';
import { 
  useReactTable, 
  getCoreRowModel, 
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
  createColumnHelper,
  SortingState
} from '@tanstack/react-table';

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
  { id: '1', name: 'Design System Updates', priority: 'High', progress: 25, dueDate: 'Dec 20, 2024', assignee: 'Cody Rhodes' },
  { id: '2', name: 'Mobile App Testing', priority: 'Medium', progress: 0, dueDate: 'Dec 25, 2024', assignee: 'Roman Reigns' },
  { id: '3', name: 'Content Review', priority: 'Low', progress: 10, dueDate: 'Dec 30, 2024', assignee: 'Seth Rollins' },
  { id: '4', name: 'API Integration', priority: 'High', progress: 45, dueDate: 'Jan 5, 2025', assignee: 'Becky Lynch' },
];

const overdueTasks: Task[] = [
  { id: '5', name: 'Bug Fixes', priority: 'High', progress: 80, dueDate: 'Dec 10, 2024', assignee: 'Rhea Ripley' },
  { id: '6', name: 'Documentation', priority: 'Medium', progress: 60, dueDate: 'Dec 12, 2024', assignee: 'Gunther' },
];

const completedTasks: Task[] = [
  { id: '7', name: 'Website Launch', priority: 'High', progress: 100, dueDate: 'Dec 1, 2024', assignee: 'LA Knight' },
  { id: '8', name: 'Security Audit', priority: 'High', progress: 100, dueDate: 'Nov 28, 2024', assignee: 'Iyo Sky' },
  { id: '9', name: 'Performance Optimization', priority: 'Medium', progress: 100, dueDate: 'Nov 25, 2024', assignee: 'Jey Uso' },
];

const ITEMS_PER_PAGE = 4;

// Helper function for color randomization
const colorPalette = ["red", "blue", "green", "yellow", "purple", "orange"];
const pickPalette = (name: string) => {
  const index = name.charCodeAt(0) % colorPalette.length;
  return colorPalette[index];
};

export default function DashboardTable() {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'overdue' | 'completed'>('upcoming');
  const [sorting, setSorting] = useState<SortingState>([]);

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

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'red';
      case 'Medium': return 'yellow';
      case 'Low': return 'green';
      default: return 'gray';
    }
  };

  // Create column helper
  const columnHelper = createColumnHelper<Task>();

  // Define columns
  const columns = useMemo(() => [
    columnHelper.accessor('name', {
      header: 'Task Name',
      cell: info => (
        <Text fontWeight="medium">{info.getValue()}</Text>
      ),
    }),
    columnHelper.accessor('priority', {
      header: 'Priority',
      cell: info => (
        <Badge colorPalette={getPriorityColor(info.getValue())} variant="subtle">
          {info.getValue()}
        </Badge>
      ),
    }),
    columnHelper.accessor('progress', {
      header: 'Progress',
      cell: info => (
        <Flex align="center" gap={2}>
          <Box w="100px" h="8px" bg="gray.200" borderRadius="full" overflow="hidden">
            <Box 
              h="full" 
              bg="blue.500" 
              w={`${info.getValue()}%`}
              transition="width 0.3s ease"
            />
          </Box>
          <Text fontSize="sm" color="gray.600">{info.getValue()}%</Text>
        </Flex>
      ),
    }),
    columnHelper.accessor('dueDate', {
      header: 'Due Date',
      cell: info => (
        <Text fontSize="sm">{info.getValue()}</Text>
      ),
    }),
    columnHelper.accessor('assignee', {
      header: 'Assignee',
      cell: info => (
        <Flex align="center" gap={2}>
          <Avatar.Root colorPalette={pickPalette(info.getValue())} size="xs">
            <Avatar.Fallback name={info.getValue()} />
          </Avatar.Root>
          <Text fontSize="sm">{info.getValue()}</Text>
        </Flex>
      ),
    }),
  ], []);

  // Create table instance
  const table = useReactTable({
    data: currentData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    state: {
      sorting,
    },
    initialState: {
      pagination: { pageSize: ITEMS_PER_PAGE }
    },
  });

  const handleTabChange = (tab: 'upcoming' | 'overdue' | 'completed') => {
    setActiveTab(tab);
    // Reset to first page when switching tabs
    table.setPageIndex(0);
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
              <Icon>
                <Hourglass size={16} strokeWidth={1.5} absoluteStrokeWidth />
              </Icon>
              Upcoming ({upcomingTasks.length})
            </Tabs.Trigger>
            <Tabs.Trigger value="overdue" px={4} py={2} fontSize="sm" fontWeight="medium">
              <Icon>
                <Bell size={16} strokeWidth={1.5} absoluteStrokeWidth />
              </Icon>
              Overdue ({overdueTasks.length})
            </Tabs.Trigger>
            <Tabs.Trigger value="completed" px={4} py={2} fontSize="sm" fontWeight="medium">
              <Icon>
                <SquareCheck size={16} strokeWidth={1.5} absoluteStrokeWidth />
              </Icon>
              Completed ({completedTasks.length})
            </Tabs.Trigger>
          </Tabs.List>
          
          <Tabs.Content value={activeTab}>
            {/* Table */}
            <Box overflowX="auto">
              <Table.Root>
                <Table.Header>
                  {table.getHeaderGroups().map(headerGroup => (
                    <Table.Row key={headerGroup.id} bgColor={{ base: "white", _dark: "bg.subtle" }}>
                      {headerGroup.headers.map(header => (
                        <Table.ColumnHeader 
                          key={header.id}
                          cursor={header.column.getCanSort() ? 'pointer' : 'default'}
                          onClick={header.column.getToggleSortingHandler()}
                        >
                          <Flex align="center" gap={1}>
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                            {header.column.getCanSort() && (
                              <Box>
                                {header.column.getIsSorted() === 'asc' && '↑'}
                                {header.column.getIsSorted() === 'desc' && '↓'}
                              </Box>
                            )}
                          </Flex>
                        </Table.ColumnHeader>
                      ))}
                    </Table.Row>
                  ))}
                </Table.Header>
                <Table.Body>
                  {table.getRowModel().rows.map(row => (
                    <Table.Row key={row.id} bgColor={{ base: "white", _dark: "bg.subtle" }}>
                      {row.getVisibleCells().map(cell => (
                        <Table.Cell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </Table.Cell>
                      ))}
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table.Root>
            </Box>
            
            {/* Pagination */}
            {table.getPageCount() > 1 && (
              <Flex justify="space-between" align="center" px={6} py={4} borderTop="1px solid" borderColor="gray.200">
                <Text fontSize="sm" color="gray.600">
                  Showing {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1}-{Math.min(
                    (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
                    table.getFilteredRowModel().rows.length
                  )} of {table.getFilteredRowModel().rows.length} tasks
                </Text>
                <Flex gap={2}>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                  >
                    <Icon>
                      <ChevronLeft size={16} strokeWidth={1.5} absoluteStrokeWidth />
                    </Icon>
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
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