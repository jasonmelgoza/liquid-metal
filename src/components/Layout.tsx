import { Box, Flex, VStack, Button, Input, InputGroup, Text, IconButton, Icon, Bleed } from '@chakra-ui/react';
import { Tooltip } from '@/components/ui/tooltip';
import { Logo } from '@/components/logo';
import { ColorModeButton } from '@/components/ui/color-mode';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Folders, 
  Inbox, 
  Calendar, 
  FileSpreadsheet, 
  HelpCircle, 
  Settings, 
  Library, 
  Code, 
  Palette, 
  Search, 
  Plus, 
  MoreVertical, 
  PanelLeftClose,
  Menu
} from 'lucide-react';

interface NavItemProps {
  icon: React.ComponentType<any>;
  label: string;
  to?: string;
  isActive?: boolean;
}

function NavItem({ icon: IconComponent, label, to, isActive }: NavItemProps) {
  const content = (
    <Bleed inline="6" paddingX={3}>
      <Button
        variant="ghost"
        justifyContent="flex-start"
        h="9"
        w="full"
        px="3.5"
        py="0.5"
        gap="2"
        fontWeight="semibold"
        fontSize="14px"
        color="fg"
        bg={isActive ? "bg.muted" : "transparent"}
        _hover={{ bg: "bg.muted" }}
        borderRadius="md"
      >
        <Icon>
          <IconComponent size={16} strokeWidth={1.5} absoluteStrokeWidth />
        </Icon>
        <Text flex="1" textAlign="left">{label}</Text>
      </Button>
    </Bleed>
  );

  if (to) {
    return (
      <Link to={to} style={{ width: '100%' }}>
        {content}
      </Link>
    );
  }

  return content;
}

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
      <Box 
        w={isCollapsed ? "0" : "80"}
        bg="bg" 
        borderRightWidth="1px" 
        borderColor="border"
        h="100vh"
        position="sticky"
        top="0"
        overflow="hidden"
        transition="width 0.2s ease"
      >
        <Flex 
          direction="column" 
          h="full" 
          justify="space-between" 
          p="6"
          opacity={isCollapsed ? 0 : 1}
          transition="opacity 0.2s ease"
        >
          {/* Top Section */}
          <VStack gap="6" align="stretch">
            {/* Logo and Controls */}
            <Flex justify="space-between" align="center">
              <Logo height="28px" />
              <Flex gap="1">
                <ColorModeButton size="sm" />
                <Tooltip content="Collapse sidebar">
                  <IconButton
                    variant="ghost"
                    size="sm"
                    aria-label="Collapse sidebar"
                    onClick={() => setIsCollapsed(!isCollapsed)}
                  >
                    <Icon>
                      <PanelLeftClose size={16} strokeWidth={1.5} absoluteStrokeWidth />
                    </Icon>
                  </IconButton>
                </Tooltip>
              </Flex>
            </Flex>

            {/* Search */}
            <InputGroup startElement={
              <Icon>
                <Search size={16} strokeWidth={1.5} absoluteStrokeWidth />
              </Icon>
            }>
              <Input 
                placeholder="Search..."
                h="9"
                fontSize="14px"
                bg="bg"
                border="1px solid"
                borderColor="border"
                _placeholder={{ color: "fg.muted" }}
              />
            </InputGroup>

            {/* Navigation */}
            <VStack gap="1" align="stretch">
              <NavItem 
                icon={LayoutDashboard} 
                label="Dashboard" 
                to="/"
                isActive={location.pathname === '/'}
              />
              <NavItem 
                icon={Folders} 
                label="Projects" 
                to="/projects"
                isActive={location.pathname === '/projects'}
              />
              <NavItem 
                icon={Inbox} 
                label="Inbox" 
                to="/inbox"
                isActive={location.pathname === '/inbox'}
              />
              <NavItem 
                icon={Calendar} 
                label="Calendar" 
                to="/calendar"
                isActive={location.pathname === '/calendar'}
              />
              <NavItem 
                icon={FileSpreadsheet} 
                label="Reports" 
                to="/reports"
                isActive={location.pathname === '/reports'}
              />
              <NavItem 
                icon={HelpCircle} 
                label="Help Center" 
                to="/help"
                isActive={location.pathname === '/help'}
              />
              <NavItem 
                icon={Settings} 
                label="Settings" 
                to="/settings"
                isActive={location.pathname === '/settings'}
              />

              {/* Teams Section */}
              <Box pt="3">
                <Text 
                  fontSize="12px" 
                  fontWeight="semibold" 
                  color="fg.muted" 
                  mb="1"
                  px="0"
                >
                  Teams
                </Text>
                <NavItem 
                  icon={Library} 
                  label="Design Systems" 
                  to="/teams"
                  isActive={location.pathname === '/teams'}
                />
              </Box>

              {/* Favorites Section */}
              <Box pt="3">
                <Text 
                  fontSize="12px" 
                  fontWeight="semibold" 
                  color="fg.muted" 
                  mb="1"
                  px="0"
                >
                  Favorites
                </Text>
                <NavItem 
                  icon={Code} 
                  label="Code Connect" 
                />
                <NavItem 
                  icon={Palette} 
                  label="New Color Tokens" 
                />
              </Box>
            </VStack>
          </VStack>

          {/* Bottom Section */}
          <VStack gap="2" align="stretch">
            {/* New Button */}
            <Button
              bg="bg.muted"
              border="1px solid"
              borderColor="border"
              h="9"
              justifyContent="center"
              px="3.5"
              py="0.5"
              gap="2"
              fontWeight="semibold"
              fontSize="14px"
              color="fg"
              _hover={{ bg: "bg.subtle" }}
            >
              <Icon>
                <Plus size={16} strokeWidth={1.5} absoluteStrokeWidth />
              </Icon>
              <Text>New</Text>
            </Button>

            {/* User Profile */}
            <Flex align="center" gap="2" w="full" h="16">
              <Box
                w="9"
                h="9"
                bg="cyan.200"
                color="cyan.800"
                borderRadius="full"
                display="flex"
                alignItems="center"
                justifyContent="center"
                fontSize="14px"
                fontWeight="normal"
                flexShrink={0}
              >
                JR
              </Box>
              <Box flex="1" overflow="hidden">
                <Text 
                  fontSize="16px" 
                  fontWeight="medium" 
                  color="fg"
                  overflow="hidden"
                  textOverflow="ellipsis"
                  whiteSpace="nowrap"
                >
                  Jamal Rivers
                </Text>
                <Text 
                  fontSize="14px" 
                  color="fg.muted"
                  overflow="hidden"
                  textOverflow="ellipsis"
                  whiteSpace="nowrap"
                >
                  jamal.rivers@metalstudios.com
                </Text>
              </Box>
              <Tooltip content="User menu">
                <IconButton
                  variant="ghost"
                  size="sm"
                  w="8"
                  h="8"
                  minW="8"
                  aria-label="User menu"
                >
                  <Icon>
                    <MoreVertical size={16} strokeWidth={1.5} absoluteStrokeWidth />
                  </Icon>
                </IconButton>
              </Tooltip>
            </Flex>
          </VStack>
        </Flex>
      </Box>

      {/* Main Content */}
      <Box flex="1" bg="bg.subtle" overflow="auto">
        <Box display="flex" bg="bg" borderBottomWidth="1px" borderColor="border" h="20">
          <Flex align="center" gap="4" px="4.5" py="6">
            {isCollapsed && (
              <Tooltip content="Open sidebar">
                <IconButton
                  variant="ghost"
                  size="sm"
                  aria-label="Open sidebar"
                  onClick={() => setIsCollapsed(false)}
                >
                  <Icon>
                    <Menu size={16} strokeWidth={1.5} absoluteStrokeWidth />
                  </Icon>
                </IconButton>
              </Tooltip>
            )}
            <Text fontSize="14px" fontWeight="normal" color="fg">
              {getPageTitle()}
            </Text>
          </Flex>
        </Box>
        <Outlet />
      </Box>
    </Flex>
  );
}
