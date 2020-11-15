
export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    icon: 'icon-speedometer',
    badge: {
      variant: 'info',
      text: 'NEW'
    }
  },
  {
    name: 'Data source',
    url: '/datasource',
    icon: ' fa fa-database',
    badge: {
      variant: 'success',
      text: 'NEW'
    },
   
    
    children: [
      {
        name: 'Configuration',
        url: '/datasource',
        icon: 'icon-puzzle',
        event:{
          name :'click',
          body :'dataSourceDialog'
        }
      },
      {
        name: 'explore',
        url: '/datasource/explore',
        icon: 'icon-puzzle',
      },
    ]
  },
  {
    name: 'Base',
    url: '/base',
    icon: 'icon-puzzle',
    children: [
      {
        name: 'Cards',
        url: '/base/cards',
        icon: 'icon-puzzle'
      },
      {
        name: 'Carousels',
        url: '/base/carousels',
        icon: 'icon-puzzle'
      },
      {
        name: 'Collapses',
        url: '/base/collapses',
        icon: 'icon-puzzle'
      },
      {
        name: 'Forms',
        url: '/base/forms',
        icon: 'icon-puzzle'
      },
      {
        name: 'Pagination',
        url: '/base/paginations',
        icon: 'icon-puzzle'
      },
      {
        name: 'Popovers',
        url: '/base/popovers',
        icon: 'icon-puzzle'
      },
      {
        name: 'Progress',
        url: '/base/progress',
        icon: 'icon-puzzle'
      },
      {
        name: 'Switches',
        url: '/base/switches',
        icon: 'icon-puzzle'
      },
      {
        name: 'Tables',
        url: '/base/tables',
        icon: 'icon-puzzle'
      },
      {
        name: 'Tabs',
        url: '/base/tabs',
        icon: 'icon-puzzle'
      },
      {
        name: 'Tooltips',
        url: '/base/tooltips',
        icon: 'icon-puzzle'
      }
    ]
  },
  {
    name: 'Download DMART',
    url: 'http://dmart.com',
    icon: 'icon-cloud-download',
    class: 'mt-auto',
    variant: 'success',
    attributes: { target: '_blank', rel: 'noopener' }
  },
  {
    name: 'Try DMART PRO',
    url: 'http://dmart.com',
    icon: 'icon-layers',
    variant: 'danger',
    attributes: { target: '_blank', rel: 'noopener' }
  }
];


import {QueryParamsHandling} from '@angular/router';
import { Optional, HostListener } from '@angular/core';

export interface INavAttributes {
  [propName: string]: any;
}

export interface INavWrapper {
  attributes: INavAttributes;
  element: string;
}

export interface INavBadge {
  text: string;
  variant: string;
  class?: string;
}

export interface INavLabel {
  class?: string;
  variant: string;
}

export interface INavLinkProps {
  queryParams?: {[k: string]: any};
  fragment?: string;
  queryParamsHandling?: QueryParamsHandling;
  preserveFragment?: boolean;
  skipLocationChange?: boolean;
  replaceUrl?: boolean;
  state?: {[k: string]: any};
  routerLinkActiveOptions?: {exact: boolean};
  routerLinkActive?: string | string[];
}

export interface INavData {
  name?: string;
  url?: string | any[];
  href?: string;
  icon?: string;
  badge?: INavBadge;
  title?: boolean;
  children?: INavData[];
  variant?: string;
  attributes?: INavAttributes;
  divider?: boolean;
  class?: string;
  label?: INavLabel;
  wrapper?: INavWrapper;
  linkProps?: INavLinkProps;
  event? : any;

}
