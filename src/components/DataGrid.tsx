import { useState } from 'react';
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
  SortingState,
  ColumnDef,
} from '@tanstack/react-table';
import { Plus } from 'lucide-react';
import { EmptyState } from '@/components/ui/empty-state';

export interface DataGridProps<TData> {
  // Core data and configuration
  data: TData[];
  columns: ColumnDef<TData, any>[];
  
  // Empty state configuration
  emptyStateIcon?: React.ReactNode;
  emptyStateTitle?: string;
  emptyStateDescription?: string;
  
  // Add item configuration
  addItemLabel?: string;
  onAddItem?: () => void;
  showAddItemRow?: boolean;
  
  // Pagination configuration
  pageSize?: number;
  showPagination?: boolean;
  
  // Table configuration
  tableHeight?: string;
  enableSorting?: boolean;
  
  // Custom styling
  containerProps?: any;
  tableProps?: any;
}

export function DataGrid<TData extends Record<string, any>>({
  data,
  columns,
  emptyStateIcon,
  emptyStateTitle = "No items found",
  emptyStateDescription = "You don't have any items yet.",
  addItemLabel = "New item",
  onAddItem,
  showAddItemRow = true,
  pageSize = 10,
  showPagination = true,
  tableHeight,
  enableSorting = true,
  containerProps,
  tableProps,
}: DataGridProps<TData>) {
  const [sorting, setSorting] = useState<SortingState>([]);

  // Create table instance
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    state: {
      sorting,
    },
    initialState: {
      pagination: { pageSize }
    },
    enableSorting,
  });

  // If no data, show empty state
  if (data.length === 0) {
    return (
      <Flex flex="1" direction="column" align="center" justify="center" p="8">
        <EmptyState 
          icon={emptyStateIcon} 
          title={emptyStateTitle} 
          description={emptyStateDescription} 
        />
      </Flex>
    );
  }

  return (
    <Box flex="1" overflow="auto" {...containerProps}>
      {/* Table Container */}
      <Box
        overflow="hidden"
        height={tableHeight}
        {...tableProps}
      >
        <Box overflowX="auto">
          <Table.Root>
            <Table.Header>
              {table.getHeaderGroups().map(headerGroup => (
                <Table.Row key={headerGroup.id} bg="transparent">
                  {headerGroup.headers.map(header => (
                    <Table.ColumnHeader 
                      key={header.id}
                      cursor={enableSorting && header.column.getCanSort() ? 'pointer' : 'default'}
                      onClick={enableSorting ? header.column.getToggleSortingHandler() : undefined}
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
                        {enableSorting && header.column.getCanSort() && (
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

        {/* Add Item Row */}
        {showAddItemRow && onAddItem && (
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
                onClick={onAddItem}
              >
                <Icon>
                  <Plus size="16" strokeWidth={1.5} absoluteStrokeWidth />
                </Icon>
                {addItemLabel}
              </Button>
            </Flex>
          </Box>
        )}

        {/* Pagination */}
        {showPagination && table.getPageCount() > 1 && (
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
              )} of {table.getFilteredRowModel().rows.length} items
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
  );
}
