import { size, isUndefined, find } from 'lodash'

/**
 * A general purpose helper library for working with ant-design-vue.
 */

/** _Data format required by Ant for defining a table column._ */
export type TAntColumn = {
  key:string
  title:string
  dataIndex?:string
}

/**
 * _Data format required by Ant for each option in a "select" form item_
 */
export type TAntSelectChoice = {
  key:string | number
  label:string
  icon?:string
}

/**
 * # Ant Design helper methods.
 */
export const _ant = {
  /**
   * Helper to define an Ant table column.
   * @param label - The column name to display
   * @param field - The name of the property in our table data for this column.
   * @param options - Other Ant table options.
   */
  defineColumn(label:string, field:string | undefined, options:object = {}):TAntColumn {
    field = field === undefined ? label : field
    return { ...{ key: field, title: label, dataIndex: field }, ...options }
  },

  /**
   * Helper to define an Ant table column which is sortable.
   * @see _ant.defineColumn
   */
  defineColumnSortable(label:string, field:string | undefined, sorterFn:Function | true = true, options:object = {}):TAntColumn {
    return this.defineColumn(label, field, { ...options, ...{ sorter: sorterFn } })
  },

  /**
   * Helper to define a "slot-able" Ant table column.
   * @see _ant.defineColumn
   */
  defineColumnSlotted(label:string, field:string | undefined, slotName:string | undefined = undefined, options:object = {}):TAntColumn {
    if (slotName === undefined) slotName = field
    return this.defineColumn(label, field, { ...{ scopedSlots: { customRender: slotName } }, ...options })
  },

  /**
   * Helper to define an array of choices for use with a Ant select component.
   * @param options - Can be an array of strings or [{key:string, label:string}, ...] or [{key:label}, ...]
   * @param allowNone - If true, automatically adds the option {key:"none",label:"(None)"}
   * @param selected - The key of the currently selected item. Only used for validation.
   */
  defineChoices(options:Object[]/*|Object*/, allowNone:boolean, selected?:string | number):TAntSelectChoice[] {
    let choices:TAntSelectChoice[] = []
    options.forEach((item:any) => {
      if (typeof item === 'string') choices.push({ key: item, label: item })
      else if (typeof item === 'object') {
        if (typeof item.key === 'string' || typeof item.key === 'number')
          choices.push({ key: item.key, label: item.label || item.key })
        else if (size(item) === 1 && typeof item[Object.keys(item)[0]] === 'string')
          choices.push({ key: Object.keys(item)[0], label: item[Object.keys(item)[0]] })
      } else console.error(`Invalid ant select item`, item)
    })
    if (allowNone) choices.unshift({ key: 'none', label: '(None)' })
    if (isUndefined(selected) && find(choices, { key: selected }))
      console.error(`Selected value "${selected}" is not a valid option`)
    return choices
  },
}
