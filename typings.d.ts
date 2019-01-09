declare interface Window {
    // This takes and returns a GenericStoreEnhancer, but importing the type
    // from redux breaks the entire file
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: (enhancer: any) => any;
}
