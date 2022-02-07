import React from 'react'
import { makeStyles, createStyles } from '@material-ui/core/styles'

import List from '@material-ui/core/List'


import IconAccountBalanceWallet from '@material-ui/icons/AccountBalanceWallet';
import IconPeople from '@material-ui/icons/People'
import IconBarChart from '@material-ui/icons/BarChart'
import IconLibraryBooks from '@material-ui/icons/LibraryBooks'
import { Service as InternalMerchantService} from "@daml.js/da-marketplace/lib/SmartCash/InternalMerchant/Service";
import AppMenuItem from './AppMenuItem'
import { useStreamQueries } from "@daml/react";
import IconStorefront from '@material-ui/icons/Storefront'
import IconAddBox from '@material-ui/icons/AddBox'
import IconPublic from '@material-ui/icons/Public'
import IconBubbleChart from '@material-ui/icons/BubbleChart'
import IconAccountCircle from '@material-ui/icons/AccountCircle'
import IconShoppingCart from '@material-ui/icons/ShoppingCart'
import IconReceipt from '@material-ui/icons/Receipt'

const appMenuItems = [
  {
    name: '',
    Icon: IconAccountBalanceWallet,
  },
  {
    name: 'Wallet',
    link: '/wallet',
    Icon: IconAccountBalanceWallet,
  },
  {
    name: 'Onboarding',
    Icon: IconStorefront,
    items: [
      {
        name: 'Merchant List',
        link: '/onboarding',
        Icon: IconPeople,
      },
      {
        name: 'New Request',
        link: '/newonboarding',
        Icon: IconAddBox,
      },
  
    ],
  },
   {
    name: 'Rule Mangement',
    link: '/rules',
    Icon: IconAccountBalanceWallet,
  },
  {
    name: 'Internal Merchant',
    link: '/internal',
    Icon: IconBubbleChart,
  },
  {
    name: 'External Partner',
    link: '/external',
    Icon: IconShoppingCart,
  },
  {
    name: 'Membership / Points',
    link: '/membership',
    Icon: IconAccountCircle,
    
  },
  {
    name: 'Receipt / Book',
    link: '/receipt',
    Icon: IconReceipt,
  },
  // {
  //   name: 'Merchant',
  //   Icon: IconLibraryBooks,
  //   items: [
  //     {
  //       name: 'Internal Merchant',
  //       items: [
  //         {
  //           name: 'Level 3',
  //         },
  //         {
  //           name: 'Level 3',
  //         },
  //       ],
  //     },
  //     {
  //       name: 'Level 2',
  //       items: [
  //         {
  //           name: 'Level 3',
  //         },
  //         {
  //           name: 'Level 3',
  //         },
  //       ],
  //     },
  //   ],
  // },
]


export const AppMenu = () => {
  const classes = useStyles()


  return (
    <>
    <List component="nav" className={classes.appMenu} disablePadding>

      {appMenuItems.map((item, index) => (
        <AppMenuItem {...item} key={index} />
      ))}
    </List>
    </>
  )
}

const drawerWidth = 240

const useStyles = makeStyles(theme =>
  createStyles({
    appMenu: {
      width: '100%',
    },
    navList: {
      width: drawerWidth,
    },
    menuItem: {
      width: drawerWidth,
    },
    menuItemIcon: {
      color: '#97c05c',
    },
  }),
)

export default AppMenu
