import { Vue } from 'vue/types/vue'

export type TValidity = {
  status:string, help:string
}

export type TFormItemNode = Vue & {
  label?:string
  extra?:string
  state?:{
    value?:any
  }
  validity?:TValidity
}
/** Returns the parent or child value */
export function parentOrChildVal(parentVal:string | boolean, childValFN:Function):string {
  if (typeof parentVal === 'string') return parentVal
  if (parentVal === true) {
    const descendantVal = childValFN()
    if (descendantVal) return descendantVal
  }
  return ''
}

export function groupValidity(childFormItems:TFormItemNode[]):TValidity {
  const errors = [] as string[]
  const warnings = [] as string[]
  Object.values(childFormItems).forEach((v) => {
    if (v.validity) {
      const { status, help } = v.validity
      if (status === 'error') errors.push(help)
      if (status === 'warning') warnings.push(help)
    }
  })
  return errors.length === 0
    ? { status: '', help: '' }
    : {
      status: 'error',
      help: errors.join(';'),
    }
}

