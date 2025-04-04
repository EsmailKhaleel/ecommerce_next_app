import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import type { Product } from '@/types/product'
import { api } from '@/apiClient/apiClient'

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    return await api.get<Product[]>('/products');
  }
)

export interface PriceRange {
  min: number;
  max: number;
}
interface ProductsState {
  items: Product[];
  filteredItems: Product[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  selectedPriceRange: PriceRange | null;
}

const initialState: ProductsState = {
  items: [],
  filteredItems: [],
  status: 'idle',
  error: null,
  selectedPriceRange: null,
}

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setPriceRange: (state, action: PayloadAction<PriceRange | null>) => {
      state.selectedPriceRange = action.payload;
      if (action.payload) {
        const { min, max } = action.payload;
        state.filteredItems = state.items.filter( product => 
            product.price >= min && product.price <= max
        );
      } else {
        state.filteredItems = state.items;
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
        state.filteredItems = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Failed to fetch products';
      })
  },
})
export const { setPriceRange } = productsSlice.actions;
export default productsSlice.reducer