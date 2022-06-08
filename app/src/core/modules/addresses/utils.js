const addressNotation = (address) => {
  return (
    <>
      {address.street} {address.number}
      {address.box ? ` box:${address.box}` : ""}
    </>
  );
};

const cityNotation = (city) => {
  return (
    <>
      {city.zip} {city.name}
    </>
  );
};

export { addressNotation, cityNotation };
