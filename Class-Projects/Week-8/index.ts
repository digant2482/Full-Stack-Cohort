interface Todo {
  title : string,
  description : string,
  done : boolean,
  id : number
}
function swap<T, U>(a:T, b:U): [U, T]{
  return [b, a];
}

let a = swap(1,"two");
console.log(a);