import { useMemo } from 'react';
import { 
  Flex, 
  Box, 
  Button, 
  Icon, 
  Text,
  Input,
  Field,
  Portal,
  useDisclosure,
  Dialog,
} from '@chakra-ui/react';
import { 
  createColumnHelper,
} from '@tanstack/react-table';
import { 
  Filter, 
  Table as TableIcon, 
} from 'lucide-react';
import { Folders } from 'lucide-react';
import { DataGrid } from '@/components/DataGrid';

interface Project {
  id: string;
  name: string;
  status: 'To Do' | 'In Progress' | 'In Review' | 'Completed';
  team: string;
  dueDate: string;
}

// Sample data based on the Figma design
const projectsData: Project[] = [
  { id: '1', name: 'Stellar Sphere', status: 'In Progress', team: 'Design Systems', dueDate: 'Aug 30, 2025' },
  { id: '2', name: 'Mark Omega', status: 'In Progress', team: 'Platform', dueDate: 'Sep 14, 2025' },
  { id: '3', name: 'Pax Aurora', status: 'In Progress', team: 'Design System', dueDate: 'Sep 30, 2025' },
  { id: '4', name: 'Cluster Prism', status: 'To Do', team: 'Platform', dueDate: 'Nov 21, 2025' },
  { id: '5', name: 'War Mantle', status: 'To Do', team: 'Product', dueDate: '' },
  { id: '6', name: 'Dark Saber', status: 'To Do', team: 'Product', dueDate: '' },
  { id: '7', name: 'Stardust', status: 'To Do', team: 'Info Sec', dueDate: '' },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'To Do': return 'orange';
    case 'In Progress': return 'green';
    case 'In Review': return 'blue';
    case 'Completed': return 'green';
    default: return 'gray';
  }
};

export default function Projects() {
  const { open, onOpen, onClose } = useDisclosure();
  
  // Create column helper
  const columnHelper = createColumnHelper<Project>();

  // Define columns
  const columns = useMemo(() => [
    columnHelper.accessor('name', {
      header: 'Projects',
      cell: info => (
        <Text fontWeight="semibold" fontSize="sm">
          {info.getValue()}
        </Text>
      ),
      size: 200,
    }),
    columnHelper.accessor('status', {
      header: 'Status',
      cell: info => (
        <Flex align="center" gap={2}>
          <Box 
            w="2.5" 
            h="2.5" 
            borderRadius="full" 
            bg={`${getStatusColor(info.getValue())}.500`}
          />
          <Text fontSize="sm">{info.getValue()}</Text>
        </Flex>
      ),
      size: 150,
    }),
    columnHelper.accessor('team', {
      header: 'Teams',
      cell: info => (
        <Text fontSize="sm">{info.getValue()}</Text>
      ),
      size: 150,
    }),
    columnHelper.accessor('dueDate', {
      header: 'Due Date',
      cell: info => (
        <Text fontSize="sm">{info.getValue() || '-'}</Text>
      ),
      size: 150,
    }),
  ], [columnHelper]);

  const handleCreateProject = () => {
    // TODO: Implement create project functionality
    console.log('Create project clicked');
    onClose();
  };

  return (
    <Box flex="1" overflow="auto">
      {/* Main Content */}
      <Box py="4" px="0">
        {/* Search and Actions Bar */}
        <Flex 
          direction={{ base: 'column', md: 'row' }}
          px={2}
          gap={2} 
          mb={1}
          align={{ base: 'stretch', md: 'center' }}
          justify="space-between"
        >
          <Flex gap="2" align="center">
            <Button
              variant="ghost"
              size="sm"
            >
              <Icon mr="1" size="sm">
                <Filter size="14" strokeWidth={1.5} absoluteStrokeWidth />
              </Icon>
              Filter
            </Button>
          </Flex>

          <Flex gap="2">
            <Button
              variant="ghost"
              size="sm"
            >
              <Icon mr="1" size="sm">
                <TableIcon size="14" strokeWidth={1.5} absoluteStrokeWidth />
              </Icon>
              Spreadsheet
            </Button>
          </Flex>
        </Flex>

        {/* Projects DataGrid */}
        <DataGrid
          data={projectsData}
          columns={columns}
          emptyStateIcon={<Icon as={Folders} />}
          emptyStateTitle="No projects found"
          emptyStateDescription="You don't have any projects yet."
          addItemLabel="New project"
          onAddItem={onOpen}
          showAddItemRow={true}
          pageSize={10}
          showPagination={true}
          enableSorting={true}
        />
      </Box>

      {/* New Project Dialog */}
      <Dialog.Root open={open} onOpenChange={({ open }) => open ? onOpen() : onClose()}>
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content>
              <Dialog.Header>
                <Dialog.Title>Create New Project</Dialog.Title>
              </Dialog.Header>
              
              <Dialog.Body>
                <Field.Root>
                  <Field.Label>Project Name</Field.Label>
                  <Input placeholder="Enter project name..." />
                </Field.Root>
              </Dialog.Body>
              
              <Dialog.Footer>
                <Button variant="ghost" onClick={onClose}>
                  Cancel
                </Button>
                <Button colorScheme="blue" onClick={handleCreateProject}>
                  Create
                </Button>
              </Dialog.Footer>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </Box>
  );
}
