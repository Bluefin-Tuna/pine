import React from 'react';
import './Metadata.css';

export default function Metadata({ data }: { data: any }) {
    console.log(data)
    if (!data) return <div className="sidebar-wrapper">Hover over a node to see details here.</div>;
    return (
        <div className="sidebar-wrapper">
            <h1>{data.data.title}</h1>
            <h2>{data.data.authors.join(', ')}</h2>
            {data.data.connection && <h3>{data.data.connection}</h3>}
            <p>{data.data.abstract}</p>
        </div>
    );
}
