export const TailwindcssMediaQuery = () => {
  return (
    <>
      <div className="flex flex-col gap-fluid-md p-fluid-md">
        <h3 className="prose-heading-md text-primary-light m-0">Media Query (change viewport to see effect)</h3>
        <p className="text-sm text-primary m-0 relative after:content-['Base'] xs:after:content-['XS'] sm:after:content-['S'] md:after:content-['M'] lg:after:content-['L'] xl:after:content-['XL'] 2xl:after:content-['XXL']">
          Media Query Min:
        </p>
        <p className="text-sm text-primary m-0 relative max-xs:after:content-['XS'] max-sm:after:content-['S'] max-md:after:content-['M'] max-lg:after:content-['L'] max-xl:after:content-['XL'] max-2xl:after:content-['XXL']">
          Media Query Max:
        </p>
        <p className="text-sm text-primary m-0 relative max-xs:after:content-['Base_-_XS'] xs:max-sm:after:content-['XS_-_S'] sm:max-md:after:content-['S_-_M'] md:max-lg:after:content-['M_-_L'] lg:max-xl:after:content-['L_-_XL'] xl:max-2xl:after:content-['XL_-_XXL']">
          Media Query Min Max:
        </p>
      </div>
      <div className="flex flex-col gap-fluid-md p-fluid-md">
        <h3 className="prose-heading-md text-primary-light m-0">Breakpoint</h3>
        <p className="after:content-['_0px']  m-0">Breakpoint Base:</p>
        <p className="after:content-['_480px']  m-0">Breakpoint XS:</p>
        <p className="after:content-['_760px']  m-0">Breakpoint S:</p>
        <p className="after:content-['_1000px']  m-0">Breakpoint M:</p>
        <p className="after:content-['_1300px']  m-0">Breakpoint L:</p>
        <p className="after:content-['_1760px']  m-0">Breakpoint XL:</p>
        <p className="after:content-['_1920px']  m-0">Breakpoint XXL:</p>
      </div>
    </>
  );
};
