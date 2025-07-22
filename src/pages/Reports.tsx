import { Flex } from '@chakra-ui/react';
import { EmptyState } from '@/components/ui/empty-state';
import { Icon } from '@chakra-ui/react';
import { FileSpreadsheet } from 'lucide-react';

export default function Reports() {
  return (
    <Flex flex="1" direction="column" align="center" justify="center" p="8">
      <EmptyState icon={<Icon as={FileSpreadsheet} />} title="No reports found" description="You don't have any reports yet." />
    </Flex>
  );
}
