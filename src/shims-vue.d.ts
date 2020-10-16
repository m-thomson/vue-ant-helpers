declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}

/**
 * Extend definition of a Vue instance
 * https://vuejs.org/v2/guide/typescript.html#Augmenting-Types-for-Use-with-Plugins
 */
declare module 'vue/types/vue' {
  interface Vue {
    // $children:Vue[]
  }
}
