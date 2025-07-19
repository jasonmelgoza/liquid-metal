import { Box, Flex } from '@chakra-ui/react';
import TitleBar from '@/components/TitleBar';
import DashboardStatCard from '@/components/DashboardStatCard';
import DashboardTable from '@/components/DashboardTable';
import { Files, BookOpen, FolderOpen, FileCheck2 } from 'lucide-react';

export default function Dashboard() {
  return (
    <Box px={4}>
      <TitleBar firstName="Jason" tasksDue={4} tasksOverdue={2} upcomingDeadlines={8} />
      <Flex gap={4} mt={8}>
        <DashboardStatCard label="Total Projects" value={15} delta="+5" icon={FolderOpen} />
        <DashboardStatCard label="Total Tasks" value={23} delta="+15" icon={Files} />
        <DashboardStatCard label="In Review" value={5} delta="+2" icon={BookOpen} />
        <DashboardStatCard label="Completed Tasks" value={52} delta="+10" icon={FileCheck2} />
      </Flex>
      <DashboardTable />
    </Box>
  );
}
