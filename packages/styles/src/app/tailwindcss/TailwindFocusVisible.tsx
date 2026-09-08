export const TailwindFocusVisible = () => {
  return (
    <div className="tw:p-static-md">
      <button
        type="button"
        className="tw:focus-visible:outline tw:outline-focus tw:outline-offset-2 tw:rounded-md tw:p-static-sm"
      >
        Focus Visible
      </button>
    </div>
  );
};
