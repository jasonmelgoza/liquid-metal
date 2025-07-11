import {
  Button,
  Card,
  Container,
  Flex,
  Heading,
  Text,
  VStack,
} from '@chakra-ui/react';
import { LuPlus } from 'react-icons/lu';

const teams = [
  {
    id: 1,
    title: 'Title',
    description: 'Lorem ipsum dolor sit amet consectetur. Aliquam cursus risus augue quis est.',
  },
  {
    id: 2,
    title: 'Title',
    description: 'Lorem ipsum dolor sit amet consectetur. Aliquam cursus risus augue quis est.',
  },
  {
    id: 3,
    title: 'Title',
    description: 'Lorem ipsum dolor sit amet consectetur. Aliquam cursus risus augue quis est.',
  },
];

export default function Teams() {
  return (
    <Container maxW="3xl" py="6">
      <Flex justify="space-between" align="center" mb="6">
        <Heading size="2xl" fontWeight="semibold">
          Teams
        </Heading>
        <Button 
          size="sm" 
          bg="teal.50" 
          color="teal.700" 
          borderColor="teal.200"
          border="1px"
          _hover={{ bg: 'teal.100' }}
        >
          <LuPlus />
          Create
        </Button>
      </Flex>

      <VStack gap="4" align="stretch">
        {teams.map((team) => (
          <Card.Root key={team.id} variant="outline">
            <Card.Body p="6">
              <VStack align="start" gap="2.5">
                <Heading size="lg" fontWeight="semibold">
                  {team.title}
                </Heading>
                <Text color="gray.600" fontSize="sm" lineHeight="1.4">
                  {team.description}
                </Text>
              </VStack>
            </Card.Body>
          </Card.Root>
        ))}
      </VStack>
    </Container>
  );
}
