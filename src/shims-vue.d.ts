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
    $componentDefs:any       // Component registry
    $log(...msg:any[]):void  // Log a message using component name as namespace
    $message:Message         // Antd message
    $form:Form               // Antd form
    $store:Store<any>        // For IDE to recognize
    $route:Route             // Vue route
    $children:Vue[]
  }
}
