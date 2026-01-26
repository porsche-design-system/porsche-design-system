export const TailwindcssMediaQuery = () => {
  return (
    <div className="grid prose-text-sm p-static-md">
      <p className="m-0 after:content-['_base'] xs:after:content-['_xs'] sm:after:content-['_sm'] md:after:content-['_md'] lg:after:content-['_lg'] xl:after:content-['_xl'] 2xl:after:content-['_2xl']">
        Media Query Min:
      </p>
      <p className="m-0 max-xs:after:content-['_xs'] max-sm:after:content-['_sm'] max-md:after:content-['_md'] max-lg:after:content-['_lg'] max-xl:after:content-['_xl'] max-2xl:after:content-['_2xl']">
        Media Query Max:
      </p>
      <p className="m-0 max-xs:after:content-['_base_-_xs'] xs:max-sm:after:content-['_xs_-_sm'] sm:max-md:after:content-['_sm_-_md'] md:max-lg:after:content-['_md_-_lg'] lg:max-xl:after:content-['_lg_-_xl'] xl:max-2xl:after:content-['_xl_-_2xl']">
        Media Query Min Max:
      </p>
    </div>
  );
};
