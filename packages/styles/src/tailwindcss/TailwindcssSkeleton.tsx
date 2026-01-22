export const TailwindcssSkeleton = () => {
  return (
    <>
      <div className="flex flex-wrap justify-center items-start gap-fluid-md p-fluid-md bg-canvas-light text-primary-light">
        <h3 className="prose-heading-md text-center w-full m-0">Skeleton Light</h3>
        <div className="pds-skeleton h-[200px] w-[500px]" />
      </div>
      <div className="flex flex-wrap justify-center items-start gap-fluid-md p-fluid-md bg-canvas-light text-primary-light">
        <div className="text-sm" />
        <div className="pds-skeleton text-md w-[100px] h-(--leading-normal)" />
        <div className="pds-skeleton text-lg w-[100px] h-(--leading-normal)" />
      </div>
      <div className="dark flex flex-wrap justify-center items-start gap-fluid-md p-fluid-md bg-canvas-dark text-primary-dark">
        <h3 className="prose-heading-md text-center w-full m-0">Skeleton Dark</h3>
        <div className="pds-skeleton-dark h-[200px] w-[500px]" />
      </div>
      <div className="flex flex-wrap justify-center items-start gap-fluid-md p-fluid-md bg-canvas-dark text-primary-dark">
        <div className="pds-skeleton-dark text-sm w-[100px] h-(--leading-normal)" />
        <div className="pds-skeleton-dark text-md w-[100px] h-(--leading-normal)" />
        <div className="pds-skeleton-dark text-lg w-[100px] h-(--leading-normal)" />
      </div>
    </>
  );
};
