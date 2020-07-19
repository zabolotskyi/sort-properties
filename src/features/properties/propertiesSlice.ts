import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../../app/store';

export interface IProperty {
  value: string;
  label: string;
  orderType: string;
  priority?: number;
}

interface ISortedProperty {
  property: string;
  order: string;
  priority: number;
}

interface PropertiesState {
  value: number;
  properties: IProperty[];
  visibleProperties: IProperty[];
  visiblePropertiesNames: string[];
  sortedProperties: ISortedProperty[];
}

const initialState: PropertiesState = {
  value: 0,
  properties: [{
    value: 'affiliate',
    label: 'Affiliate',
    orderType: 'ASC'
  }, {
    value: 'balance',
    label: 'Balance',
    orderType: 'DESC'
  }, {
    value: 'bonus_balance',
    label: 'Bonus balance',
    orderType: 'DESC'
  }, {
    value: 'campaign',
    label: 'Campaign',
    orderType: 'ASC'
  }, {
    value: 'cash_balance',
    label: 'Cash balance',
    orderType: 'DESC'
  }, {
    value: 'country',
    label: 'Country',
    orderType: 'ASC'
  }, {
    value: 'trader_points',
    label: 'Trader points',
    orderType: 'DESC'
  }],
  visibleProperties: [],
  visiblePropertiesNames: [],
  sortedProperties: []
};

export const propertiesSlice = createSlice({
  name: 'propertiesSort',
  initialState,
  reducers: {
    addNewProperty: state => {
      const visibleProperties = [...state.visibleProperties, {
        value: '',
        label: '',
        orderType: ''
      }];

      state.visibleProperties = visibleProperties;
    },
    addVisibleProperty: (state, action: PayloadAction<IProperty>) => {
      const visibleProperties = state.visibleProperties.map(el => el.value ? el : action.payload);
      const visiblePropertiesNames = [...state.visiblePropertiesNames, action.payload.value];

      state.visibleProperties = visibleProperties;
      state.visiblePropertiesNames = visiblePropertiesNames;
    },
    changeVisibleProperty: (state, action: PayloadAction<{optionValue: string; value: IProperty}>) => {
      const { optionValue, value: { value, label, orderType } }= action.payload;

      const visibleProperties = state.visibleProperties.map(el => {
        return el.value !== optionValue ? el : { value, label, orderType }
      });

      const visiblePropertiesNames = [...state.visiblePropertiesNames.filter(el => el !== optionValue), value];

      state.visibleProperties = visibleProperties;
      state.visiblePropertiesNames = visiblePropertiesNames;
    },
    toggleOrderType: (state, action: PayloadAction<IProperty>) => {
      const visibleProperties = state.visibleProperties.map(el => {
        if (el.value === action.payload.value) {
          el.orderType = el.orderType === 'ASC' ? 'DESC' : 'ASC';
        }
        return el;
      });

      state.visibleProperties = visibleProperties;
    },
    deleteProperty: (state, action: PayloadAction<string>) => {
      const visibleProperties =state.visibleProperties.filter(el => el.value !== action.payload);
      const visiblePropertiesNames = [...state.visiblePropertiesNames.filter(el => el !== action.payload)];

      state.visibleProperties = visibleProperties;
      state.visiblePropertiesNames = visiblePropertiesNames;
    },
    sortProperties: state => {
      const sortedProperties = state.visibleProperties.map((el, id) => ({
        property: el.label,
        order: el.orderType,
        priority: id + 1
      }));

      state.sortedProperties = sortedProperties;
    }
  }
});

export const {
  addNewProperty,
  addVisibleProperty, 
  changeVisibleProperty,
  deleteProperty,
  sortProperties,
  toggleOrderType
} = propertiesSlice.actions;

export const selectProperties = (state: RootState) => state.propertiesSort.properties;
export const selectVisibleProperties = (state: RootState) => state.propertiesSort.visibleProperties;
export const selectVisiblePropertiesNames = (state: RootState) => state.propertiesSort.visiblePropertiesNames;
export const selectSortedProperties = (state: RootState) => state.propertiesSort.sortedProperties

export default propertiesSlice.reducer;
