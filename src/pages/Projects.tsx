import { Flex } from '@chakra-ui/react';
import { EmptyState } from '@/components/ui/empty-state';
import { Icon } from '@chakra-ui/react';
import { Folders } from 'lucide-react';

export default function Projects() {
  return (
    <Flex flex="1" direction="column" align="center" justify="center" p="8">
      <EmptyState icon={<Icon as={Folders} />} title="No projects found" description="You don't have any projects yet." />
    </Flex>
  );
}
