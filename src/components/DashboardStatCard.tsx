import { Flex, Icon, Text } from '@chakra-ui/react';
import { Card } from '@chakra-ui/react';
import { Stat } from '@chakra-ui/react';
import { FolderKanban } from 'lucide-react';

interface DashboardStatCardProps {
  label: string;
  value: number | string;
  delta?: string;
  icon?: React.ElementType;
}

export default function DashboardStatCard({ label, value, delta, icon }: DashboardStatCardProps) {
  const IconComponent = icon || FolderKanban;
  return (
    <Card.Root
      variant="outline"
      w="100%"
      maxW="250px"
    >
      <Card.Body p={4}>
        <Flex align="center" justify="space-between" gap={2}>
          <Stat.Root>
            <Stat.Label color="fg.muted" fontSize="sm">{label}</Stat.Label>
            <Stat.ValueText fontSize="md" fontWeight="semibold">{value}</Stat.ValueText>
            <Flex align="center" mt={1}>
              {delta && (
                <Stat.HelpText color="fg.muted" fontSize="xs">{delta}</Stat.HelpText>
              )}
              <Text color="fg.subtle" fontSize="xs" ml={delta ? 1 : 0}>vs last month</Text>
            </Flex>
          </Stat.Root>
          <Icon as={IconComponent} boxSize={6} color="brand.500" />
        </Flex>
      </Card.Body>
    </Card.Root>
  );
}