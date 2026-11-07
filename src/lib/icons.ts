import {
  Award,
  BadgeCheck,
  Handshake,
  HeartHandshake,
  Leaf,
  MapPin,
  Phone,
  ShieldCheck,
  Sprout,
  Truck,
  Users,
  Wheat,
  type LucideIcon,
} from "lucide-react";

/** Whitelist of icons that admins may pick (design.md §6.6). */
export const ICONS = {
  ShieldCheck,
  Truck,
  Sprout,
  Handshake,
  HeartHandshake,
  Leaf,
  Users,
  Award,
  BadgeCheck,
  Wheat,
  Phone,
  MapPin,
} satisfies Record<string, LucideIcon>;

export type IconName = keyof typeof ICONS;
export const ICON_NAMES = Object.keys(ICONS) as IconName[];

export function getIcon(name: string): LucideIcon {
  return (ICONS as Record<string, LucideIcon>)[name] ?? Leaf;
}
