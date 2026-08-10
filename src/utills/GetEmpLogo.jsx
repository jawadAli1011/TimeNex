const getEmpLogo = (name) =>
  ((name || "").match(/\b[A-Za-z]/g) || []).slice(0, 2).join("").toUpperCase();

export default getEmpLogo;
