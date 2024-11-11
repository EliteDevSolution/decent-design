import React, { useState } from 'react'

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
} from '@nextui-org/react'
import { AcmeLogo } from '../Logo'
import withAuthServerSide from '@/hof/withAuthServerSide'
import { useAuth } from '@/hooks/useAuth'

export function Layout() {
  const { user, signOut } = useAuth()
  const [isLinkActives, setLinkActive] = useState<boolean[]>([true, true, true])

  return (
    <Navbar className="bg-[#343A40] text-white px-[60px]">
      <NavbarBrand>
        <AcmeLogo />
        <p className="font-bold text-inherit">DECEBT DESIGN</p>
      </NavbarBrand>

      <NavbarContent className="hidden sm:flex gap-[40px]" justify="center">
        <NavbarItem isActive={isLinkActives[0]}>
          <Link className="text-white" href="/">
            Dashboard
          </Link>
        </NavbarItem>
        <NavbarItem isActive={isLinkActives[1]}>
          <Link aria-current="page" className="text-white" href="/design_edit">
            Design Edit
          </Link>
        </NavbarItem>
        <NavbarItem isActive={isLinkActives[2]}>
          <Link className="text-white" href="#">
            Integrations
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent as="div" justify="end">
        <Dropdown placement="bottom-end" className="bg-transparent">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="secondary"
              name="Jason Hughes"
              size="sm"
              src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              Welcome, {user?.firstName}! 🎉
            </DropdownItem>
            <DropdownItem key="logout" onClick={signOut}>
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </Navbar>
  )
}

export const getServerSideProps = withAuthServerSide(async () => {
  return {
    props: {},
  }
})
