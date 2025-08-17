import { Box, Flex, Text, IconButton, Icon } from '@chakra-ui/react';
import { Tooltip } from '@/components/ui/tooltip';
import Sidebar from '@/components/Sidebar';
import { Outlet, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { PanelLeftOpen, Share, MoreHorizontal } from 'lucide-react';



export default function Layout() {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(() => {
    const stored = localStorage.getItem('sidebar-collapsed');
    return stored ? JSON.parse(stored) : false;
  });
  
  useEffect(() => {
    localStorage.setItem('sidebar-collapsed', JSON.stringify(isCollapsed));
  }, [isCollapsed]);

  const getPageTitle = () => {
    switch (location.pathname) {
      case '/':
        return 'Dashboard';
      case '/projects':
        return 'Projects';
      case '/inbox':
        return 'Inbox';
      case '/calendar':
        return 'Calendar';
      case '/reports':
        return 'Reports';
      case '/help':
        return 'Help Center';
      case '/settings':
        return 'Settings';
      case '/teams':
        return 'Teams';
      default:
        return 'Dashboard';
    }
  };
  
  return (
    <Flex minH="100vh" bg="bg">
      {/* Sidebar */}
      <Sidebar 
        isCollapsed={isCollapsed}
        onToggleCollapse={() => setIsCollapsed(!isCollapsed)}
      />
      <Flex direction="column" flex="1" bg="bg.subtle" h="100vh" minH="100vh">
        {/* Top Bar */}
        <Box borderBottomWidth="1px" borderColor="border" h="20">
          <Flex align="center" justify="space-between" px="4.5" py="6" w="full">
            <Flex align="center" gap="4">
              {isCollapsed && (
                <Tooltip content="Open sidebar">
                  <IconButton
                    variant="ghost"
                    size="sm"
                    aria-label="Open sidebar"
                    onClick={() => setIsCollapsed(false)}
                  >
                    <Icon>
                      <PanelLeftOpen size={16} strokeWidth={1.5} absoluteStrokeWidth />
                    </Icon>
                  </IconButton>
                </Tooltip>
              )}
              <Text fontSize="14px" fontWeight="normal" color="fg">
                {getPageTitle()}
              </Text>
            </Flex>
            
            {/* Action Buttons */}
            <Flex gap="1">
              <Tooltip content="Share">
                <IconButton
                  variant="ghost"
                  size="sm"
                  aria-label="Share"
                >
                  <Icon>
                    <Share size={16} strokeWidth={1.5} absoluteStrokeWidth />
                  </Icon>
                </IconButton>
              </Tooltip>
              
              <Tooltip content="More options">
                <IconButton
                  variant="ghost"
                  size="sm"
                  aria-label="More options"
                >
                  <Icon>
                    <MoreHorizontal size={16} strokeWidth={1.5} absoluteStrokeWidth />
                  </Icon>
                </IconButton>
              </Tooltip>
            </Flex>
          </Flex>
        </Box>
        {/* Main Content */}
        <Box flex="1" overflow="auto">
          <Outlet />
        </Box>
      </Flex>
    </Flex>
  );
}
