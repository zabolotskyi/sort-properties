import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Select from 'react-select';

import {
  addNewProperty,
  addVisibleProperty,
  changeVisibleProperty,
  deleteProperty,
  IProperty,
  selectProperties,
  selectSortedProperties,
  selectVisibleProperties,
  selectVisiblePropertiesNames,
  sortProperties,
  toggleOrderType
} from './propertiesSlice';

import styles from './PropertiesSort.module.css';

export function PropertiesSort() {
  const properties = useSelector(selectProperties);
  const visibleProperties = useSelector(selectVisibleProperties);
  const visiblePropertiesNames = useSelector(selectVisiblePropertiesNames);
  const sortedProperties = useSelector(selectSortedProperties);
  const dispatch = useDispatch();

  const onAddNewProperty = () => {
    dispatch(addNewProperty());
  };

  const onSelectProperty = (optionValue: string) => (value: IProperty) => {
    if (optionValue === '') {
      dispatch(addVisibleProperty(value));
    } else {
      dispatch(changeVisibleProperty({ optionValue, value }));
    }
  };

  const onToggleOrderType = (option: IProperty) => () => {
    dispatch(toggleOrderType(option));
  };

  const onDeleteProperty = (value: string) => () => {
    dispatch(deleteProperty(value));
  };

  const onSortProperties = () => {
    dispatch(sortProperties());
  };

  return (
    <div>
      <div>
        <h1 className={styles.heading}>Properties</h1>
        <div>
          {(visibleProperties.map((option: IProperty, id: number) => (
            <div key={id} className={styles.option}>
              <div>{id + 1}</div>
              <Select
                className={styles.select}
                value={visibleProperties[id]}
                onChange={onSelectProperty(option.value) as any}
                options={properties.filter((el: IProperty) => !visiblePropertiesNames.includes(el.value))}
                hideSelectedOptions={true}
              />
              <div className={styles.order}>
                {option.orderType}
              </div>
              <div>
                <button
                  onClick={onToggleOrderType(option)}
                  disabled={!Boolean(option.value)}
                >
                  Toggle order
                </button>
              </div>
              <div className={styles.delete}>
                <button
                  onClick={onDeleteProperty(option.value)}
                >
                  Delete
                </button>
              </div>
            </div>
          )))}
        </div>
        <div className={styles.buttons}>
          <button
            className={styles.button}
            onClick={onAddNewProperty}
            disabled={
              visibleProperties.length === properties.length ||
              visibleProperties.some(el => el.value === '')
            }
          >
            Add property
          </button>
          <button
            className={styles.button}
            onClick={onSortProperties}
            disabled={
              visibleProperties.length === 0 ||
              visibleProperties.some(el => el.value === '')
            }
          >
            Sort
          </button>
        </div>
      </div>
      {Boolean(sortedProperties.length) && (
        <div className={styles.table}>
          <h2 className={styles.heading}>Sorted properties</h2>
          <div className={styles.table_header}>
            <div className={styles.table_property}>
              <div>#</div>
              <div>Property</div>
            </div>
            <div>Order</div>
          </div>
          {sortedProperties.map(el => (
            <div className={styles.table_item}>
              <div>{el.priority} {el.property}</div>
              <div>{el.order}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
