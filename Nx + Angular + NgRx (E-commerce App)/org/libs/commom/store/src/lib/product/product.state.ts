import { createFeature, createReducer, createSelector, on } from "@ngrx/store";
import { productActions } from "./product.action";
import { Product } from "./product";

export interface ProductState {
  products: Product[];
  productCount: number;
  error: string;
}

const initialState: ProductState = {
  products: [],
  productCount: 0,
  error: ''
}

export const productReducer = createReducer(
  initialState,
  on(productActions.productSuccess, (state, action) => ({
    ...state,
    products: action.products,
    productCount: action.products.length,
    error: ''
  })),
  on(productActions.productFailure, (state, action) => ({
    ...state,
    products: [],
    productCount: 0,
    error: action.error
  }))
)

const productFeatureKey = 'product';

export const productFeature = createFeature({
  name: productFeatureKey,
  reducer: productReducer,
  extraSelectors: ({ selectProducts, selectProductCount, selectError }) => ({
    selectProducts,
    selectProductCount,
    selectError,
    filterProductByCategory: (category: string) => createSelector(selectProducts, (products) => products.filter(product => product.category === category)),
  })
})
