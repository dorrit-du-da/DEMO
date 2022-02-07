export const empty = { textMap: {} };

export const fmt = (x : number | string) => {
  return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, "'");
}
