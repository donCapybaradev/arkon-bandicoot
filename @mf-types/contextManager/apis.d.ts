
    export type RemoteKeys = 'contextManager/Button' | 'contextManager/App';
    type PackageType<T> = T extends 'contextManager/App' ? typeof import('contextManager/App') :T extends 'contextManager/Button' ? typeof import('contextManager/Button') :any;