import * as _ from 'lodash';
import {Thunk} from './redux';
import {IRootState} from 'store/types';

export const mockDispatch = (getState): jest.Mock => {
    const dispatch = jest.fn(async (action: Thunk) => {
        if (_.isFunction(action)) {
            return await action(dispatch, getState, undefined);
        }
    });

    return dispatch;
};

export const mockGetState = (
    state: Partial<IRootState> = {}
) => (): IRootState => state as any;
