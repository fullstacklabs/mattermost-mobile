// Copyright (c) 2017-present Mattermost, Inc. All Rights Reserved.
// See License.txt for license information.

import {bindActionCreators} from 'redux';

import navigationSceneConnect from '../navigationSceneConnect';

import {goBack} from 'app/actions/navigation';
import {handleRemoveChannelMembers} from 'app/actions/views/channel_members';
import {getTheme} from 'app/selectors/preferences';
import {getCurrentChannel, getCurrentChannelStats, canManageChannelMembers} from 'mattermost-redux/selectors/entities/channels';
import {getMyPreferences} from 'mattermost-redux/selectors/entities/preferences';
import {getCurrentTeam} from 'mattermost-redux/selectors/entities/teams';
import {getProfilesInCurrentChannel} from 'mattermost-redux/selectors/entities/users';
import {getProfilesInChannel, searchProfiles} from 'mattermost-redux/actions/users';

import ChannelMembers from './channel_members';

function mapStateToProps(state) {
    const currentChannelMemberCount = getCurrentChannelStats(state) && getCurrentChannelStats(state).member_count;

    return {
        theme: getTheme(state),
        currentChannel: getCurrentChannel(state),
        currentChannelMembers: getProfilesInCurrentChannel(state),
        currentChannelMemberCount,
        currentUserId: state.entities.users.currentUserId,
        currentTeam: getCurrentTeam(state),
        preferences: getMyPreferences(state),
        requestStatus: state.requests.users.getProfilesInChannel.status,
        searchRequestStatus: state.requests.users.searchProfiles.status,
        removeMembersStatus: state.requests.channels.removeChannelMember.status,
        canManageUsers: canManageChannelMembers(state)
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            getProfilesInChannel,
            goBack,
            handleRemoveChannelMembers,
            searchProfiles
        }, dispatch)
    };
}

export default navigationSceneConnect(mapStateToProps, mapDispatchToProps)(ChannelMembers);
