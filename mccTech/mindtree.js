const test = (a, b) => {
  let c = a + "," + b;
  let array = [10, 20, 30, 40, 50];
  let d = void 0,
    e = void 0,
    rest = void 0;
  // Getting first and second item in array and assign to d and e.
  d = array[0];
  e = array[1];
  // getting reset other data and assignt to rest variable
  rest = array.slice(2); // function to multiply and return the value
  const x = (_x, y) => {
    return _x * y;
  };
  console.log(a);
  console.log(b);
  console.log(d);
  console.log(e);
  console.log(rest);
  console.log(x(5, 5));
};

module.exports = {
  test,
};
