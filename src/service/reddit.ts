import * as URI from 'urijs';
import * as _ from 'lodash';
import {PagingDirection} from 'store/types';

type NewPostsResponse = {
    before: string;
    after: string;
    children: [];
};

const BASE_URL = 'https://www.reddit.com';

enum Uri {
    NewPosts = '/r/${subreddit}/new.json'
}

type NewPostsArgs = {
    subreddit: string;
    direction?: PagingDirection;
    limit: number;
    count: number;
};

type PathArgs = {uri: typeof Uri.NewPosts; subreddit: string};

export async function newPosts({
    subreddit,
    direction,
    limit,
    count
}: NewPostsArgs): Promise<NewPostsResponse> {
    const url = new URI(BASE_URL)
        .segment(getPath({uri: Uri.NewPosts, subreddit}))
        .addQuery({limit})
        .addQuery({count});

    if (direction && direction.direction) {
        url.addQuery(direction.direction, direction.value);
    }

    try {
        const response = await fetch(url.toString());
        if (response.status !== 200) {
            return null;
        }
        const {
            data: {children, before, after}
        } = await response.json();

        return {children, before, after};
    } catch (e) {
        return null;
    }
}

const getPath = ({uri, ...args}: PathArgs): string => {
    if (args) {
        const compiled = _.template(uri);
        return compiled(args);
    } else {
        return uri;
    }
};
