const capitalize = (string) => (
  string.charAt(0).toUpperCase() + string.slice(1)
);

const camelize = (string) => (
  string.replace(/(\_\w)/g, (matches) => (
    matches[1].toUpperCase()
  ))
);

export { capitalize, camelize };
