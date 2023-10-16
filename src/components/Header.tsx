import useSWR from 'swr';
import { useState } from 'react';
import {
  ChevronDown,
  Settings,
  LogOut,
  Network,
  Sun,
  MoonStar,
  Monitor,
} from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar } from '@/components/Avatar';

import { signOut } from '@/api/auth';
import { getMyUsernameAndAvatar } from '@/api/users';

import { useCombain } from '@/hooks/useCombain';

import { PAGES } from '@/lib/constants';

const menuIconConfig = 'mr-2 h-4 w-4';

const ThemeMenu = [
  {
    text: 'Light',
    icon: <Sun className={menuIconConfig} />,
  },
  {
    text: 'Dark',
    icon: <MoonStar className={menuIconConfig} />,
  },
  {
    text: 'System',
    icon: <Monitor className={menuIconConfig} />,
  },
] as const;

const Header = () => {
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState<(typeof ThemeMenu)[number]>(ThemeMenu[0]);

  const { router, toast } = useCombain();

  const { data, error } = useSWR<{
    username: string;
    avatar?: string;
  }>('/users/me/username-avatar', getMyUsernameAndAvatar);

  const onClickSignOut = () => {
    signOut();

    toast({
      description: 'You have successfully signed out.',
    });

    router.push(PAGES.SIGN_IN);
  };

  return (
    <header className='sticky top-0 z-50 w-full border-b bg-white flex justify-center items-center'>
      <div className='w-full max-w-[1150px] h-14 flex items-center px-10'>
        <ul className='w-full h-full flex items-center justify-between'>
          <li>
            <div
              onClick={() => router.push(PAGES.NEWS)}
              className='cursor-pointer flex items-center gap-3'
            >
              <Network />
              <span className='font-bold text-2xl'>Network</span>
            </div>
          </li>
          <li className='h-full'>
            <DropdownMenu open={open} defaultOpen={open} onOpenChange={setOpen}>
              <DropdownMenuTrigger asChild>
                <div
                  onClick={() => setOpen(true)}
                  className='cursor-pointer hover:bg-gray-50 h-full w-[100px] flex gap-2 items-center justify-center'
                >
                  <Avatar
                    username={data?.username || '?'}
                    avatar={data?.avatar}
                  />
                  <ChevronDown size={16} />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className='w-56'>
                <DropdownMenuLabel>
                  <div className='flex gap-2'>
                    <span>Profile: </span>
                    <span
                      onClick={() => {
                        router.push(PAGES.PROFILE);

                        setOpen(false);
                      }}
                      className='hover:underline cursor-pointer'
                    >
                      {data?.username}
                    </span>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Settings className={menuIconConfig} />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                  {theme.icon}
                  <div className='flex-1 flex justify-between'>
                    <span>Theme:</span>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <div className='flex items-center mr-2'>
                          <span>{theme.text}</span>
                        </div>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align='end'>
                        {ThemeMenu.map((item) => (
                          <DropdownMenuItem
                            key={item.text}
                            onClick={() => setTheme({ ...item })}
                          >
                            {item.icon}
                            <span>{item.text}</span>
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={onClickSignOut}>
                  <LogOut className={menuIconConfig} />
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </li>
        </ul>
      </div>
    </header>
  );
};

export { Header };
