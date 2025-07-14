import { Flex, Icon, Text } from '@chakra-ui/react';
import { Card } from '@chakra-ui/react';
import { Stat } from '@chakra-ui/react';
import { FolderKanban } from 'lucide-react';

interface DashboardStatCardProps {
  label: string;
  value: number | string;
  helpText?: string;
  icon?: React.ElementType;
}

export default function DashboardStatCard({ label, value, helpText, icon }: DashboardStatCardProps) {
  const IconComponent = icon || FolderKanban;
  return (
    <Card.Root variant="outline" borderColor="gray.200" borderRadius="md" bg="white">
      <Card.Body p={4}>
        <Flex align="center" justify="space-between">
          <Stat.Root>
            <Stat.Label color="gray.600" fontSize="14px">{label}</Stat.Label>
            <Stat.ValueText fontSize="20px" fontWeight="semibold">{value}</Stat.ValueText>
            <Flex align="center" gap={1} mt={1}>
              {helpText && (
                <Stat.HelpText color="gray.600" fontSize="12px">{helpText}</Stat.HelpText>
              )}
              <Text color="gray.400" fontSize="12px" ml={helpText ? 1 : 0}>vs last month</Text>
            </Flex>
          </Stat.Root>
          <Icon as={IconComponent} boxSize={6} color="cyan.700" opacity={0.75} />
        </Flex>
      </Card.Body>
    </Card.Root>
  );
}