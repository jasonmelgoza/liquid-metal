import { Box, Flex } from '@chakra-ui/react';
import TitleBar from '@/components/TitleBar';
import DashboardStatCard from '@/components/DashboardStatCard';
import { FileText, BookOpen, FileCheck } from 'lucide-react';

export default function Dashboard() {
  return (
    <Box>
      <TitleBar firstName="Jason" tasksDue={4} tasksOverdue={2} upcomingDeadlines={8} />
      <Flex px={4} gap={4} mt={2}>
        <DashboardStatCard label="Total Tasks" value={23} helpText="+15 vs last month" icon={FileText} />
        <DashboardStatCard label="In Review" value={5} helpText="+2 vs last month" icon={BookOpen} />
        <DashboardStatCard label="Completed Tasks" value={52} helpText="+10 vs last month" icon={FileCheck} />
      </Flex>
      {/* Dashboard content goes here */}
    </Box>
  );
}
