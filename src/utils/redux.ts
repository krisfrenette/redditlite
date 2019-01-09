import {IRootState, RootAction} from 'store/types';
import {ThunkAction} from 'redux-thunk';

// Convenience type for redux thunks
export type Thunk<R = void, S = IRootState> = ThunkAction<
    R,
    S,
    void,
    RootAction
>;
