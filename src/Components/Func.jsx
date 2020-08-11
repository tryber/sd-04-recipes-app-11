 const Func = (a, b, c) => {
    if (!b) return c([a]);
  
    if (b.includes(a)) {
      return c((prev) => [
        ...prev.slice(0, prev.indexOf(a)),
        ...prev.slice(prev.indexOf(a) + 1),
      ]);
    }
    return c((prevDones) => [...prevDones, a]);
  };
  export default Func;