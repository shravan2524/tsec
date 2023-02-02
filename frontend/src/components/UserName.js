import React from 'react'
import { useNavigate } from "react-router-dom";

export default function UserName({ username }) {
    const navigate = useNavigate();
    return (
        <div>
            <a href={username} onClick={() => navigate(`/profile/${username}`,  { props: username })}>
                {username}
            </a>
        </div>
    )
}
