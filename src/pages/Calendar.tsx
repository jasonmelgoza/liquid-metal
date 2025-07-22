import { Flex } from '@chakra-ui/react';
import { EmptyState } from '@/components/ui/empty-state';
import { Icon } from '@chakra-ui/react';
import { Calendar as CalendarIcon } from 'lucide-react';

export default function Calendar() {
  return (
    <Flex flex="1" direction="column" align="center" justify="center" p="8">
      <EmptyState icon={<Icon as={CalendarIcon} />} title="No inbox found" description="You don't have any inbox yet." />
    </Flex>
  );
}
