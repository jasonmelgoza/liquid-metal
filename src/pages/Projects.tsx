import { useState, useMemo } from 'react';
import { 
  Flex, 
  Box, 
  Text, 
  Button, 
  Icon, 
  Table,
} from '@chakra-ui/react';
import { 
  useReactTable, 
  getCoreRowModel, 
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
  createColumnHelper,
  SortingState,
} from '@tanstack/react-table';
import { 
  Filter, 
  Table as TableIcon, 
  Plus,
} from 'lucide-react';
import { EmptyState } from '@/components/ui/empty-state';
import { Folders } from 'lucide-react';

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
  const [sorting, setSorting] = useState<SortingState>([]);

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

  // Filter data based on global search
  const filteredData = useMemo(() => {
    return projectsData;
  }, []);

  // Create table instance
  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    state: {
      sorting,
    },
    initialState: {
      pagination: { pageSize: 10 }
    },
  });

  // If no projects, show empty state
  if (projectsData.length === 0) {
    return (
      <Flex flex="1" direction="column" align="center" justify="center" p="8">
        <EmptyState 
          icon={<Icon as={Folders} />} 
          title="No projects found" 
          description="You don't have any projects yet." 
        />
      </Flex>
    );
  }

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

        {/* Projects Table */}
        <Box
          overflow="hidden"
        >
          <Box overflowX="auto">
            <Table.Root>
              <Table.Header>
                {table.getHeaderGroups().map(headerGroup => (
                  <Table.Row key={headerGroup.id} bg="transparent">
                    {headerGroup.headers.map(header => (
                      <Table.ColumnHeader 
                        key={header.id}
                        cursor={header.column.getCanSort() ? 'pointer' : 'default'}
                        onClick={header.column.getToggleSortingHandler()}
                        py="3"
                        px="5"
                        fontSize="xs"
                        fontWeight="semibold"
                        color="fg"
                        borderBottom="1px solid"
                        borderColor="border"
                        w={header.getSize()}
                        bg="transparent"
                        _hover={{ bg: 'bg.muted' }}
                        transition="background-color 0.2s"
                        userSelect="none"
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
                  <Table.Row 
                    key={row.id} 
                    bg="transparent"
                    _hover={{ bg: 'bg.muted' }}
                    transition="background-color 0.2s"
                  >
                    {row.getVisibleCells().map(cell => (
                      <Table.Cell 
                        key={cell.id}
                        py="3"
                        px="5"
                        borderBottom="1px solid"
                        borderColor="border"
                        w={cell.column.getSize()}
                      >
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

          {/* Add Project Row */}
          <Box>
            <Flex
              align="center"
              py="3"
              px="2"
              gap="2"
            >
              <Button
                variant="ghost"
                size="xs"
                color="fg.muted"
              >
                <Icon>
                  <Plus size="16" strokeWidth={1.5} absoluteStrokeWidth />
                </Icon>
                New project
              </Button>
            </Flex>
          </Box>

          {/* Pagination */}
          {table.getPageCount() > 1 && (
            <Flex 
              justify="space-between" 
              align="center" 
              px="6" 
              py="4" 
              borderTop="1px solid" 
              borderColor="border"
            >
              <Text fontSize="sm" color="gray.600">
                Showing {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1}-{Math.min(
                  (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
                  table.getFilteredRowModel().rows.length
                )} of {table.getFilteredRowModel().rows.length} projects
              </Text>
              
              <Flex gap={2}>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                >
                  Previous
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                >
                  Next
                </Button>
              </Flex>
            </Flex>
          )}
        </Box>
      </Box>
    </Box>
  );
}
