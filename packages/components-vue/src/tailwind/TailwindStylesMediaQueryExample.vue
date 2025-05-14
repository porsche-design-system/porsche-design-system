<template>
  <div class="flex flex-col gap-fluid-md p-fluid-md">
    <h3 class="prose-heading-md text-primary-light m-0">Media Query (change viewport to see effect)</h3>
    <p class="text-sm text-primary m-0 relative after:content-['Base'] xs:after:content-['XS'] sm:after:content-['S'] md:after:content-['M'] lg:after:content-['L'] xl:after:content-['XL'] 2xl:after:content-['XXL']">
    Media Query Min:
    </p>
    <p class="text-sm text-primary m-0 relative max-xs:after:content-['XS'] max-sm:after:content-['S'] max-md:after:content-['M'] max-lg:after:content-['L'] max-xl:after:content-['XL'] max–2xl:after:content-['XXL']">
    Media Query Max:
    </p>
    <p class="text-sm text-primary m-0 relative max-xs:after:content-['Base_-_XS'] xs:max-sm:after:content-['XS_-_S'] sm:max-md:after:content-['S_-_M'] md:max-lg:after:content-['M_-_L'] lg:max-xl:after:content-['L_-_XL'] xl:max-2xl:after:content-['XL_-_XXL']">
    Media Query Min Max:
    </p>
  </div>
  <div class="flex flex-col gap-fluid-md p-fluid-md">
    <h3 class="prose-heading-md text-primary-light m-0">Breakpoint</h3>
    <p class="after:content-['_0px']">Breakpoint Base:</p>
    <p class="after:content-['_480px']">Breakpoint XS:</p>
    <p class="after:content-['_760px']">Breakpoint S:</p>
    <p class="after:content-['_1000px']">Breakpoint M:</p>
    <p class="after:content-['_1300px']">Breakpoint L:</p>
    <p class="after:content-['_1760px']">Breakpoint XL:</p>
    <p class="after:content-['_1920px']">Breakpoint XXL:</p>
  </div>
</template>


