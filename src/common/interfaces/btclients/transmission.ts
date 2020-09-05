import {
    AddTorrentOptions,
    Torrent,
    TorrentClientConfig,
    TorrentFilterRules
} from "./AbstractClient";

export const defaultTransmissionConfig: TransmissionTorrentClientConfig = {
    type: 'transmission',
    name: 'transmission',
    uuid: '69e8ecd2-9a96-436c-ac6f-c199c1abb846',
    address: 'http://localhost:9091/transmission/rpc',
    username: '',
    password: '',
    timeout: 3 * 60 * 1e3
};

export interface TransmissionBaseResponse {
    arguments: any;
    result: 'success' | string;
    tag?: number
}

export interface TransmissionTorrentGetResponse extends TransmissionBaseResponse {
    arguments: {
        torrents: RawTorrent[]
    }
}

export interface AddTorrentResponse extends TransmissionBaseResponse {
    arguments: {
        'torrent-added': {
            id: number;
            hashString: string;
            name: string;
        };
    };
}

export type TransmissionTorrentIds = number | Array<number | string> | 'recently-active'

export type TransmissionRequestMethod =
    'session-get' | 'session-stats' |
    'torrent-get' | 'torrent-add' | 'torrent-start' | 'torrent-stop' | 'torrent-remove'

export interface TransmissionAddTorrentOptions extends AddTorrentOptions {
    "download-dir": string,
    filename: string,
    metainfo: string,
    paused: boolean,

}

export interface TransmissionTorrent extends Torrent {
    id: number | string;
}

export interface TransmissionTorrentFilterRules extends TorrentFilterRules {
    ids?: TransmissionTorrentIds;
}

// @ts-ignore
export interface TransmissionArguments {

}

export interface TransmissionTorrentBaseArguments extends TransmissionArguments {
    ids?: TransmissionTorrentIds
}

export interface TransmissionTorrentGetArguments extends TransmissionTorrentBaseArguments {
    fields: TransmissionTorrentsField[]
}

export interface TransmissionTorrentRemoveArguments extends TransmissionTorrentBaseArguments {
    'delete-local-data'?: boolean
}

// @ts-ignore
export interface TransmissionTorrentClientConfig extends TorrentClientConfig {

}

// 这里只写出了部分我们需要的
export interface RawTorrent {
    addedDate: number,
    id: number,
    hashString: string,
    isFinished: boolean,
    name: string,
    percentDone: number,
    uploadRatio: number,
    downloadDir: string,
    status: number,
    totalSize: number,
    leftUntilDone: number,
    labels: string[]
}

export type TransmissionTorrentsField =
    'activityDate'
    | 'addedDate'
    | 'bandwidthPriority'
    | 'comment'
    | 'corruptEver'
    | 'creator'
    | 'dateCreated'
    | 'desiredAvailable'
    | 'doneDate'
    | 'downloadDir'
    | 'downloadedEver'
    | 'downloadLimit'
    | 'downloadLimited'
    | 'editDate'
    | 'error'
    | 'errorString'
    | 'eta'
    | 'etaIdle'
    | 'files'
    | 'fileStats'
    | 'hashString'
    | 'haveUnchecked'
    | 'haveValid'
    | 'honorsSessionLimits'
    | 'id'
    | 'isFinished'
    | 'isPrivate'
    | 'isStalled'
    | 'labels'
    | 'leftUntilDone'
    | 'magnetLink'
    | 'manualAnnounceTime'
    | 'maxConnectedPeers'
    | 'metadataPercentComplete'
    | 'name'
    | 'peer-limit'
    | 'peers'
    | 'peersConnected'
    | 'peersFrom'
    | 'peersGettingFromUs'
    | 'peersSendingToUs'
    | 'percentDone'
    | 'pieces'
    | 'pieceCount'
    | 'pieceSize'
    | 'priorities'
    | 'queuePosition'
    | 'rateDownload (B/s)'
    | 'rateUpload (B/s)'
    | 'recheckProgress'
    | 'secondsDownloading'
    | 'secondsSeeding'
    | 'seedIdleLimit'
    | 'seedIdleMode'
    | 'seedRatioLimit'
    | 'seedRatioMode'
    | 'sizeWhenDone'
    | 'startDate'
    | 'status'
    | 'trackers'
    | 'trackerStats'
    | 'totalSize'
    | 'torrentFile'
    | 'uploadedEver'
    | 'uploadLimit'
    | 'uploadLimited'
    | 'uploadRatio'
    | 'wanted'
    | 'webseeds'
    | 'webseedsSendingToUs'