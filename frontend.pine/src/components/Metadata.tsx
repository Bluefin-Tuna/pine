import React from 'react';
import './Metadata.css';

export default function Metadata({ data }: { data: any }) {
    console.log(data)
    if (!data) return <div className="sidebar-wrapper">Hover over a node to see details here.</div>;
    return (
        <div className="sidebar-wrapper">
            <h2>{data.data.title}</h2>
            <p>{data.data.authors.join(', ')}</p>
            <p>{data.data.abstract}</p>
        </div>
    );
}
