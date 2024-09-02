/*
- Retrieve categories of products by store ID
*/

export interface IProductCategory {
  id: number;
  name: string;
  type: string;
  parent: string;
  children: string[];
}
