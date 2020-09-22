import React from "react";
import "./ProfileView.scss";
import { UserProfile } from "clowdr-db-schema/src/classes/DataLayer";

// @ts-ignore
import defaultProfilePic from "../../../assets/default-profile-pic.png";

interface Props {
    profile: UserProfile;
}

export default function ProfileView(props: Props) {
    const p = props.profile;

    return <div className="profile-view">
        <div className="content">
            <div className="photo">
                {p.profilePhoto
                    ? <img src={p.profilePhoto.url()} alt={p.displayName + "'s avatar"} />
                    : <img src={defaultProfilePic} alt="default avatar" />
                }
            </div>
            <div className="main-info">
                <div className="name">
                    <span className="display-name">{p.displayName}</span>
                    <span className="pronouns">({p.pronouns.reduce((x, y) => `${x}/${y}`)})</span>
                    {p.realName !== p.displayName
                        ? <div className="real-name">{p.realName}</div>
                        : <></>}
                </div>
                <div className="affiliation">
                    {p.position} <span>at</span> {p.affiliation}
                </div>
                <p className="bio">
                    {p.bio}
                </p>
                <a className="webpage" href={p.webpage}>{p.webpage}</a>
            </div>
        </div>
    </div>;
}
