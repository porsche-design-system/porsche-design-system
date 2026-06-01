export const TailwindcssMediaQuery = () => {
  return (
    <div className="tw:grid tw:prose-text-sm tw:p-static-md">
      <p className="tw:m-0 tw:xs:after:content-['_xs'] tw:sm:after:content-['_sm'] tw:md:after:content-['_md'] tw:lg:after:content-['_lg'] tw:xl:after:content-['_xl'] tw:2xl:after:content-['_2xl']">
        Media Query Min:
      </p>
      <p className="tw:m-0 tw:max-xs:after:content-['_xs'] tw:max-sm:after:content-['_sm'] tw:max-md:after:content-['_md'] tw:max-lg:after:content-['_lg'] tw:max-xl:after:content-['_xl'] tw:max-2xl:after:content-['_2xl']">
        Media Query Max:
      </p>
      <p className="tw:m-0 tw:xs:max-sm:after:content-['_xs_-_sm'] tw:sm:max-md:after:content-['_sm_-_md'] tw:md:max-lg:after:content-['_md_-_lg'] tw:lg:max-xl:after:content-['_lg_-_xl'] tw:xl:max-2xl:after:content-['_xl_-_2xl']">
        Media Query Min Max:
      </p>
    </div>
  );
};
