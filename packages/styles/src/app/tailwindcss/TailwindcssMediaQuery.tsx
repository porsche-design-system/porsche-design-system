export const TailwindcssMediaQuery = () => {
  return (
    <div className="grid prose-text-sm p-static-md">
      <p className="m-0 after:content-['base'] xs:after:content-['xs'] sm:after:content-['sm'] md:after:content-['md'] lg:after:content-['lg'] xl:after:content-['xl'] 2xl:after:content-['2xl']">
        Media Query Min:{' '}
      </p>
      <p className="m-0 max-xs:after:content-['xs'] max-sm:after:content-['sm'] max-md:after:content-['md'] max-lg:after:content-['lg'] max-xl:after:content-['xl'] max–2xl:after:content-['2xl']">
        Media Query Max:{' '}
      </p>
      <p className="m-0 after:content-['base_-_xs'] xs:max-sm:after:content-['xs_-_sm'] sm:max-md:after:content-['sm_-_md'] md:max-lg:after:content-['md_-_lg'] lg:max-xl:after:content-['lg_-_xl'] xl:max-2xl:after:content-['xl_-_2xl']">
        Media Query Min Max:{' '}
      </p>
    </div>
  );
};
