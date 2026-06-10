/**
 * Shared icon map for catalog categories.
 * Single source of truth — used by both index.astro and [id].astro.
 */
import GlasswareIcon from '../components/icons/GlasswareIcon.astro';
import PorcelainwareIcon from '../components/icons/PorcelainwareIcon.astro';
import SilicawareIcon from '../components/icons/SilicawareIcon.astro';
import PlasticwareIcon from '../components/icons/PlasticwareIcon.astro';
import SundriesIcon from '../components/icons/SundriesIcon.astro';
import SafetyIcon from '../components/icons/SafetyIcon.astro';
import PaperIcon from '../components/icons/PaperIcon.astro';
import LiquidIcon from '../components/icons/LiquidIcon.astro';
import EquipmentIcon from '../components/icons/EquipmentIcon.astro';

export const iconMap = {
  glassware: GlasswareIcon,
  porcelainware: PorcelainwareIcon,
  silicaware: SilicawareIcon,
  plasticware: PlasticwareIcon,
  sundries: SundriesIcon,
  safety: SafetyIcon,
  paper: PaperIcon,
  liquid: LiquidIcon,
  equipment: EquipmentIcon,
} as const;

export type CategoryIconKey = keyof typeof iconMap;
