export const getPaginationOptions = (page?: number, size?: number) => {
  const defaultPage = 1;
  const defaultSize = 10;
  const maxPageSize = 100;

  const normalizedPage = Math.max(defaultPage, Number(page) || defaultPage);

  const limit = Math.min(maxPageSize, Math.max(1, Number(size) || defaultSize));

  const skip = (normalizedPage - 1) * limit;

  return { page: normalizedPage, limit, skip };
};
