import activeBookmarkIcon from '../../../images/icons/bookmark_active.svg';
import inactiveBookmarkIcon from '../../../images/icons/bookmark_inactive.svg';
import activeSettingsIcon from '../../../images/icons/settings_active.svg';
import inactiveSettingsIcon from '../../../images/icons/settings_inactive.svg';
import inactiveLogoutIcon from '../../../images/icons/logout_inactive.svg';
import activeAccommodationIcon from '../../../images/icons/accommodation-blue.svg';
import inactiveAccommodationIcon from '../../../images/icons/accomodation-grey.svg';

const NavItemsMetadata = [
  // Requests
  {
    text: 'Requests',
    link_to: '/requests',
    activateOnLogin: true,
    isDropdown: true,
    dropdownItems: [
      {
        link_to: '/requests',
        text: 'My Requests',
        exact: true
      },
      {
        link_to: '/requests/my-approvals',
        text: 'My Approvals'
      }
    ],
    icons: {
      active: activeBookmarkIcon,
      inactive: inactiveBookmarkIcon
    }
  },
  // Accommodation
  {
    text: 'Residence',
    link_to: '/residence',
    activateOnLogin: false,
    isDropdown: true,
    dropdownItems: [
      {
        link_to: '/residence/manage',
        text: 'Manage',
        onlyVisibleTo: ['Travel Administrator', 'Super Administrator'],
        exact: false
      },
      {
        link_to: '/residence/checkin',
        text: 'Check-in',
        exact: false
      }
    ],
    icons: {
      active: activeAccommodationIcon,
      inactive: inactiveAccommodationIcon
    }
  },
  // Trip planner
  {
    text: 'Trip Planner',
    link_to: '/checklist',
    activateOnLogin: false,
    isDropdown: false,
    icons: {
      active: activeAccommodationIcon,
      inactive: inactiveAccommodationIcon
    }
  },
  // Settings
  {
    text: 'Settings',
    link_to: '/settings',
    activateOnLogin: false,
    isDropdown: true,
    dropdownItems: [
      {
        link_to: '/settings/roles',
        text: 'User Roles',
        onlyVisibleTo: ['Super Administrator', ]
      },
      {
        link_to: '/settings/profile',
        text: 'User Profile',
      }

    ],
    icons: {
      active: activeSettingsIcon,
      inactive: inactiveSettingsIcon
    }
  },
  // Logout
  {
    text: 'Logout',
    link_to: '/logout',
    activateOnLogin: false,
    isDropdown: false,
    onClick: 'signout', // define a handler with this name in 'LeftSideNavItems'
    variantClassName: 'logout-button', // variant styling class
    icons: {
      inactive: inactiveLogoutIcon
    }
  },
];

export default NavItemsMetadata;
