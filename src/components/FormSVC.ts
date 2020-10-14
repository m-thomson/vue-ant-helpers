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

/** Collates child nodes validity fields.*/
export function groupValidity(vm:Vue, defaultHelp = ''):TValidity {
  const errors = [] as string[]
  const warnings = [] as string[]
  Object.values(vm.$children).forEach((v:TFormItemNode) => {
    if (v.validity) {
      const { status, help } = v.validity
      if (status === 'error') errors.push(help)
      if (status === 'warning') warnings.push(help)
    }
  })
  if (errors.length) {
    return {
      status: 'error',
      help: errors.join(';'),
    }
  }
  if (warnings.length) {
    return {
      status: 'warning',
      help: warnings.join(';'),
    }
  }
  return  { status: '', help: defaultHelp }
}

