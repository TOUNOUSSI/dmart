
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
    name: 'Disabled',
    url: '/dashboard',
    icon: 'icon-ban',
    attributes: { disabled: true },
  },
  {
    name: 'Download CoreUI',
    url: 'http://coreui.io/angular/',
    icon: 'icon-cloud-download',
    class: 'mt-auto',
    variant: 'success',
    attributes: { target: '_blank', rel: 'noopener' }
  },
  {
    name: 'Try CoreUI PRO',
    url: 'http://coreui.io/pro/angular/',
    icon: 'icon-layers',
    variant: 'danger',
    attributes: { target: '_blank', rel: 'noopener' }
  }
];


import {QueryParamsHandling} from '@angular/router';

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
}
