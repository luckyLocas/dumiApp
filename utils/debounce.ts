const debounce = (callback: () => void, wait: number): (() => void) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let timer: any;
  console.log('110');
  return () => {
    console.log('cc');
    clearTimeout(timer);
    timer = setTimeout(() => {
      callback();
    }, wait);
  };
};
export default debounce;
