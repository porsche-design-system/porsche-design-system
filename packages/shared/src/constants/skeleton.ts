/* To remove skeleton property classes in the generated wrappers
 * not patch stencil with slots
 * and not generate skeleton styles in the initialStylesPartial
 * set this to false
 */
export const SKELETONS_ACTIVE = false;
export const PDS_SKELETON_CLASS_PREFIX = 'pds-skeleton--';
export const describeif = SKELETONS_ACTIVE ? describe : xdescribe;
export const itif = SKELETONS_ACTIVE ? it : xit;
