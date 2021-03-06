// Copyright (c) 2017-present Mattermost, Inc. All Rights Reserved.
// See License.txt for license information.

import {bindActionCreators} from 'redux';

import {handleCommentDraftChanged} from 'app/actions/views/thread';
import {selectPost} from 'mattermost-redux/actions/posts';

import {makeGetPostsForThread} from 'mattermost-redux/selectors/entities/posts';
import {getTheme} from 'app/selectors/preferences';
import {getCurrentChannelMembership} from 'mattermost-redux/selectors/entities/channels';
import {getCurrentTeamId} from 'mattermost-redux/selectors/entities/teams';

import navigationSceneConnect from '../navigationSceneConnect';
import Thread from './thread';

function makeMapStateToProps() {
    // Create a getPostsForThread selector for each instance of Thread so that each Thread
    // is memoized correctly based on its own props
    const getPostsForThread = makeGetPostsForThread();

    return function mapStateToProps(state, ownProps) {
        const posts = getPostsForThread(state, ownProps);

        let teamId = state.entities.channels.channels[ownProps.channelId].team_id;
        if (!teamId) {
            // We can't make a post without a team id, so get it from the current team
            teamId = getCurrentTeamId(state);
        }

        const threadDraft = state.views.thread.drafts[ownProps.rootId];

        return {
            ...ownProps,
            teamId,
            channelId: ownProps.channelId,
            myMember: getCurrentChannelMembership(state),
            rootId: ownProps.rootId,
            draft: threadDraft.draft,
            files: threadDraft.files,
            posts,
            theme: getTheme(state)
        };
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            handleCommentDraftChanged,
            selectPost
        }, dispatch)
    };
}

export default navigationSceneConnect(makeMapStateToProps, mapDispatchToProps)(Thread);
