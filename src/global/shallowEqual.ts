const shallowEqual = <T>(objA: T, objB: T): boolean => {
  if (objA === objB) return true;

  if (
    typeof objA !== "object" ||
    typeof objB !== "object" ||
    objA === null ||
    objB === null
  )
    return false;

  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) return false;

  return keysA.every(
    (key) =>
      Object.prototype.hasOwnProperty.call(objB, key) &&
      objA[key as keyof T] === objB[key as keyof T]
  );
};

export default shallowEqual;
