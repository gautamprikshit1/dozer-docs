import React from 'react';
import { useThemeConfig, ErrorCauseBoundary } from '@docusaurus/theme-common';
import {
  splitNavbarItems,
  useNavbarMobileSidebar,
} from '@docusaurus/theme-common/internal';
import NavbarItem from '@theme/NavbarItem';
import NavbarColorModeToggle from '@theme/Navbar/ColorModeToggle';
import SearchBar from '@theme/SearchBar';
import NavbarMobileSidebarToggle from '@theme/Navbar/MobileSidebar/Toggle';
import NavbarLogo from '@theme/Navbar/Logo';
import NavbarSearch from '@theme/Navbar/Search';
import styles from './styles.module.css';
import clsx from 'clsx';
function useNavbarItems() {
  // TODO temporary casting until ThemeConfig type is improved
  return useThemeConfig().navbar.items;
}
function NavbarItems({ items }) {
  return (
    <div className='flex align-center gap-8'>
      {items.map((item, i) => (
        <ErrorCauseBoundary
          key={i}
          onError={(error) =>
            new Error(
              `A theme navbar item failed to render.
Please double-check the following navbar item (themeConfig.navbar.items) of your Docusaurus config:
${JSON.stringify(item, null, 2)}`,
              { cause: error },
            )
          }>
          <NavbarItem {...item} />
        </ErrorCauseBoundary>
      ))}
    </div>
  );
}
function NavbarContentLayout({ left, right }) {
  return (
    <div className="navbar__inner">
      <div className="navbar__items">{left}</div>
      <div className="navbar__items navbar__items--right">{right}</div>
    </div>
  );
}
export default function NavbarContent() {
  const mobileSidebar = useNavbarMobileSidebar();
  const items = useNavbarItems();
  const [leftItems, rightItems] = splitNavbarItems(items);
  const searchBarItem = items.find((item) => item.type === 'search');
  return (
    <NavbarContentLayout
      left={
        // TODO stop hardcoding items? 
        <>
          {!mobileSidebar.disabled && <NavbarMobileSidebarToggle />}
          {mobileSidebar.shouldRender && <NavbarLogo />}

          <NavbarItems items={leftItems} />
          {/* {!searchBarItem && (
            <NavbarSearch className="hidden lg:block">
              <SearchBar />
            </NavbarSearch>
          )} */}
        </>
      }
      right={
        // TODO stop hardcoding items?
        // Ask the user to add the respective navbar items => more flexible
        <div className='flex items-center gap-5'>
          <NavbarItems items={rightItems} />
          <div className="hidden lg:block lg:h-5 lg:w-px lg:bg-zinc-900/10 lg:dark:bg-white/15"></div>
          <NavbarColorModeToggle className={styles.colorModeToggle} />
          {/* {!searchBarItem && (
            <NavbarSearch className={clsx('lg:hidden', styles.navbarSearch)}>
              <SearchBar />
            </NavbarSearch>
          )} */}
        </div>
      }
    />
  );
}
