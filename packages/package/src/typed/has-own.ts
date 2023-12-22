/* eslint-disable ts/no-unsafe-call */
/* eslint-disable ts/no-unsafe-return */
export const hasOwn = <ObjectType extends Record<PropertyKey, any>, Key extends PropertyKey>(
  obj: ObjectType,
  key: Key
): key is Key => obj.hasOwn(obj, key)
