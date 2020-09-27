import { useEffect } from "react";
import { DataDeletedEventDetails, DataUpdatedEventDetails } from "clowdr-db-schema/src/classes/DataLayer/Cache/Cache";
import { ISimpleEvent } from "strongly-typed-events";
import { makeCancelable } from "clowdr-db-schema/src/classes/Util";
import { CachedSchemaKeys } from "clowdr-db-schema/src/classes/DataLayer/WholeSchema";
import * as Data from "clowdr-db-schema/src/classes/DataLayer";

export default function useDataSubscription<
    K extends CachedSchemaKeys
>(
    tableName: K,
    onDataUpdated: (ev: DataUpdatedEventDetails<K>) => void,
    onDataDeleted: (ev: DataDeletedEventDetails<K>) => void,
    loading: boolean,
    _conference: Data.Conference | null
) {
    useEffect(() => {
        if (!loading && _conference) {
            const conference = _conference;

            let cancel: () => void = () => { };
            let unsubscribe: () => void = () => { };
            async function subscribeToUpdates() {
                try {
                    let promises: [
                        Promise<ISimpleEvent<DataUpdatedEventDetails<K>>>,
                        Promise<ISimpleEvent<DataDeletedEventDetails<K>>>
                    ];
                    switch (tableName) {
                        case "AttachmentType":
                            promises = [
                                Data.AttachmentType.onDataUpdated(conference.id) as any,
                                Data.AttachmentType.onDataDeleted(conference.id) as any,
                            ];
                            break;
                        case "Conference":
                            promises = [
                                Data.Conference.onDataUpdated(conference.id) as any,
                                Data.Conference.onDataDeleted(conference.id) as any,
                            ];
                            break;
                        case "Flair":
                            promises = [
                                Data.Flair.onDataUpdated(conference.id) as any,
                                Data.Flair.onDataDeleted(conference.id) as any,
                            ];
                            break;
                        case "PrivilegedConferenceDetails":
                            promises = [
                                Data.PrivilegedConferenceDetails.onDataUpdated(conference.id) as any,
                                Data.PrivilegedConferenceDetails.onDataDeleted(conference.id) as any,
                            ];
                            break;
                        case "ProgramItem":
                            promises = [
                                Data.ProgramItem.onDataUpdated(conference.id) as any,
                                Data.ProgramItem.onDataDeleted(conference.id) as any,
                            ];
                            break;
                        case "ProgramItemAttachment":
                            promises = [
                                Data.ProgramItemAttachment.onDataUpdated(conference.id) as any,
                                Data.ProgramItemAttachment.onDataDeleted(conference.id) as any,
                            ];
                            break;
                        case "ProgramPerson":
                            promises = [
                                Data.ProgramPerson.onDataUpdated(conference.id) as any,
                                Data.ProgramPerson.onDataDeleted(conference.id) as any,
                            ];
                            break;
                        case "ProgramRoom":
                            promises = [
                                Data.ProgramRoom.onDataUpdated(conference.id) as any,
                                Data.ProgramRoom.onDataDeleted(conference.id) as any,
                            ];
                            break;
                        case "ProgramSession":
                            promises = [
                                Data.ProgramSession.onDataUpdated(conference.id) as any,
                                Data.ProgramSession.onDataDeleted(conference.id) as any,
                            ];
                            break;
                        case "ProgramSessionEvent":
                            promises = [
                                Data.ProgramSessionEvent.onDataUpdated(conference.id) as any,
                                Data.ProgramSessionEvent.onDataDeleted(conference.id) as any,
                            ];
                            break;
                        case "ProgramTrack":
                            promises = [
                                Data.ProgramTrack.onDataUpdated(conference.id) as any,
                                Data.ProgramTrack.onDataDeleted(conference.id) as any,
                            ];
                            break;
                        case "TextChat":
                            promises = [
                                Data.TextChat.onDataUpdated(conference.id) as any,
                                Data.TextChat.onDataDeleted(conference.id) as any,
                            ];
                            break;
                        case "TextChatMessage":
                            promises = [
                                Data.TextChatMessage.onDataUpdated(conference.id) as any,
                                Data.TextChatMessage.onDataDeleted(conference.id) as any,
                            ];
                            break;
                        case "UserProfile":
                            promises = [
                                Data.UserProfile.onDataUpdated(conference.id) as any,
                                Data.UserProfile.onDataDeleted(conference.id) as any,
                            ];
                            break;
                        case "VideoRoom":
                            promises = [
                                Data.VideoRoom.onDataUpdated(conference.id) as any,
                                Data.VideoRoom.onDataDeleted(conference.id) as any,
                            ];
                            break;
                        default:
                            throw new Error(`Unrecognised cache table name ${tableName}`);
                    }
                    const promise = makeCancelable(Promise.all(promises));
                    cancel = promise.cancel;
                    const evs = await promise.promise;
                    const unsubscribes: Array<() => void> = [];
                    unsubscribes.push(evs[0].subscribe(onDataUpdated));
                    unsubscribes.push(evs[1].subscribe(onDataDeleted));
                    unsubscribe = () => {
                        for (const _unsubscribe of unsubscribes) {
                            _unsubscribe();
                        }
                    };
                }
                catch (e) {
                    if (!e.isCanceled) {
                        throw e;
                    }
                }
                finally {
                    cancel = () => { };
                }
            }

            subscribeToUpdates();

            return () => {
                unsubscribe();
                cancel();
            };
        }
        return () => { };
    }, [_conference, loading, onDataDeleted, onDataUpdated, tableName]);
}
