import { uniqueId } from "lodash";

interface MenuitemsType {
  [x: string]: any;
  id?: string;
  navlabel?: boolean;
  subheader?: string;
  title?: string;
  icon?: any;
  href?: string;
  children?: MenuitemsType[];
  chip?: string;
  chipColor?: string;
  variant?: string;
  external?: boolean;
}
import {
  IconAward,
  IconBoxMultiple,
  IconPoint,
  IconAlertCircle,
  IconNotes,
  IconCalendar,
  IconMail,
  IconTicket,
  IconEdit,
  IconGitMerge,
  IconCurrencyDollar,
  IconApps,
  IconFileDescription,
  IconFileDots,
  IconFiles,
  IconBan,
  IconStar,
  IconMoodSmile,
  IconBorderAll,
  IconBorderHorizontal,
  IconBorderInner,
  IconBorderVertical,
  IconBorderTop,
  IconUserCircle,
  IconPackage,
  IconMessage2,
  IconBasket,
  IconChartLine,
  IconChartArcs,
  IconChartCandle,
  IconChartArea,
  IconChartDots,
  IconChartDonut3,
  IconChartRadar,
  IconLogin,
  IconUserPlus,
  IconRotate,
  IconBox,
  IconShoppingCart,
  IconAperture,
  IconLayout,
  IconSettings,
  IconHelp,
  IconZoomCode,
  IconBoxAlignBottom,
  IconBoxAlignLeft,
  IconBorderStyle2,
  IconLockAccess,
  IconAppWindow,
  IconNotebook,
  IconFileCheck,
} from "@tabler/icons-react";

const Menuitems: MenuitemsType[] = [
  {
    navlabel: true,
    subheader: "Home",
  },

  {
    id: uniqueId(),
    title: "Dashboard",
    icon: IconAppWindow,
    href: "/dashboard",
    chipColor: "secondary",
  },
  {
    navlabel: true,
    subheader: "Apps",
  },
    {
    id: uniqueId(),
    title: "Banner",
    icon: IconNotes,
    href: "/apps/banner",
  },
  {
    id: uniqueId(),
    title: "services",
    icon: IconPackage,
    chipColor: "secondary",
    href: "/apps/services",
  },
  {
    id: uniqueId(),
    title: "We Bring",
    icon: IconMoodSmile,
    href: "",
    variant: "outlined",
    chipColor: "primary",
  },   
  {
    id: uniqueId(),
    title: "About",
    icon: IconMoodSmile,
    href: "",
    variant: "outlined",
    chipColor: "primary",
  },
    {
    id: uniqueId(),
    title: "Faq",
    icon: IconMoodSmile,
    href: "",
    variant: "outlined",
    chipColor: "primary",
  },
    {
    id: uniqueId(),
    title: "Footer",
    icon: IconMoodSmile,
    href: "",
    variant: "outlined",
    chipColor: "primary",
  },
  {
    id: uniqueId(),
    title: "User",
    external: true,
    icon: IconUserCircle,
    href: "https://google.com",
  },
];

export default Menuitems;
