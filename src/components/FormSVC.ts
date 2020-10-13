import { Vue } from 'vue/types/vue'

export type TValidity = {
  status: string, help:string
}


export type TFormItemNode = Vue & {
  label?:string
  extra?:string
  state?: {
    value?:any
  }
  validity?:TValidity
}
