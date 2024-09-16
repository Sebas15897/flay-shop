/*
- Retrieve categories of products by store ID
*/

export interface IProduct {
  id: string;
  referenceId: string;
  name: string;
  enabled: boolean;
  withVariant: boolean;
  sku: string;
  discount: number;
  description: string;
  stock: number;
  price: number;
  numberEmergency: number;
  variants: IVarinats;
  unit: IUnit;
  state: IState;
  category: ICategory;
  file: IFile[];
  categoryId: number;
}

export interface ICategory {
  id: number;
  name: string;
  type: string;
  parent: IParent;
  children: string[];
  product: IProduct[];
}

export interface IParent {
  id: number;
  name: string;
}

export interface IFile {
  id: number;
  uri: string;
}

export interface IState {
  id: number;
  name: string;
  color: string;
  types: string[];
}

export interface IUnit {
  id: number;
  name: string;
}

export interface IVarinats {
  variantEmergency: any[];
  variantNotSold: any[];
  variantActive: VariantActive[];
}

export interface VariantActive {
  id: string;
  stock: number;
  price: number;
  variation: Variation[];
  sku: string;
  discount: null;
}

export interface Variation {
  id: number;
  name: string;
  variant: Variant;
}

export interface Variant {
  id: number;
  name: string;
}

export interface IProductByIdPayload {
  productId: string;
  tenantId: string;
}

export interface IProduct {
  id: string;
  name: string;
  categoryId: number;
  enabled: boolean;
  withVariant: boolean;
  sku: string;
  discount: number;
  unitId: number;
  description: string;
  stock: number;
  price: number;
  numberEmergency: number;
  storeId: string;
  variants: IVarinats;
  files: any[];
  unit: IUnit;
}

export interface IPayloadAddProduct {
  amount: number;
}

export interface IAddProductCarShop {
  id: string;
  name: string;
  categoryId: number;
  enabled: boolean;
  withVariant: boolean;
  sku: string;
  discount: number;
  unitId: number;
  description: string;
  stock: number;
  price: number;
  numberEmergency: number;
  storeId: string;
  variants: IVarinats;
  files: any[];
  quantity: number;
  total: number;
  unit: IUnit;
  isOpen?: boolean;
}

export interface IUnit {
  id: number;
  name: string;
}
