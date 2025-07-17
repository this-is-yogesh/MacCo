const count = (() => {
  let value = 0;
  let d = () => {
    value++;
    console.log(value);
  };

  d.reset = function () {
    value = 0;
  };
  return d;
})();

count();
count();
count();
count();
count.reset()
count();
count();
count();
count();
