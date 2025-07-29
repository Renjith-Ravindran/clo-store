export const updateURLParams = (params: Record<string, string>) => {
  const searchParams = new URLSearchParams(window.location.search);

  Object.keys(params).forEach((key) => {
    const value = params[key];

    const isDefault =
      (key === "sort" && value === "NAME") ||
      (key === "min" && value === "0") ||
      (key === "max" && value === "999") ||
      value === "";

    if (isDefault) {
      searchParams.delete(key);
    } else {
      searchParams.set(key, value);
    }
  });

  const queryString = searchParams.toString();
  window.history.replaceState(
    {},
    "",
    queryString ? `?${queryString}` : window.location.pathname
  );
};

export const getURLParams = () => new URLSearchParams(window.location.search);
