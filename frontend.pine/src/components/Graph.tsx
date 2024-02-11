import React, { useState, useEffect } from 'react';
import Tree from 'react-d3-tree';
import clone from 'clone';
import './Graph.css';

const cleanData = (data: any) => {
  console.log(data);
  const name = data.data.title.length > 15 ? `${data.data.title.substring(0, 15)}...` : data.data.title;
  return {
    uuid: data.data._id,
    name: name,
    title: data.data.title,
    authors: data.data.authors,
    abstract: data.data.abstract,
    uri: data.data.uri,
    children: [],
    connection: data.data.connection
  };
};

const fetchChildren = async (nodeId: any) => {
  try {
    const response = await fetch(`http://127.0.0.1:5000/add-children/${nodeId}`, { mode: "no-cors" });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const childrenData = await response.json();
    return childrenData; // Ensure this data is in the format expected by react-d3-tree
  } catch (error) {
    console.error("Failed to fetch children data:", error);
    return [];
  }
};

export default function Graph({ data, onNodeHover }: { data: any, onNodeHover: (nodeData: any) => void }) {
  const [treeData, setTreeData] = useState(cleanData({data}));
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const [isLoading, setIsLoading] = useState(false); // Loading state

  useEffect(() => {
    const container = document.getElementById('graph-wrapper');
    if (container) {
      const dimensions = container.getBoundingClientRect();
      setTranslate({
        x: dimensions.width / 2.25,
        y: dimensions.height / 2,
      });
    }
  }, []);

  const handleNodeClick = async (nodeDatum: any, event: any) => {
    setIsLoading(true); // Start loading
    if (nodeDatum.data.uri) {
      window.open(nodeDatum.data.uri);
    }
    if (!nodeDatum.children && !nodeDatum._children) {
      const childrenData = await fetchChildren(nodeDatum.data.uuid);
      const cleanedChildrenData = childrenData.map(child => cleanData({data: child}));
      const clonedTreeData = clone(treeData);
      const findAndAddChildren = (node: any) => {
        if (node.uuid === nodeDatum.data.uuid) {
          node.children = cleanedChildrenData;
        }
        if (node.children) {
          return node.children.some(findAndAddChildren);
        }
      };
      findAndAddChildren(clonedTreeData);
      setTreeData(clonedTreeData);
    }
    setIsLoading(false); // Stop loading
  };

  const handleNodeMouseOver = (nodeDatum: any, event: any) => {
    onNodeHover(nodeDatum);
  };

  return (
    <div id="graph-wrapper" style={{ width: '75vw', height: '100vh', border: 'solid black' }}>
      {isLoading && (
        <div className="loading-wrapper">
          <div className="spinner"></div>
          <div className="loading-text">Generating recommended papers...</div>
        </div>
      )}
      <Tree
        data={treeData}
        translate={translate}
        collapsible={false}
        onNodeClick={handleNodeClick}
        onNodeMouseOver={handleNodeMouseOver}
        separation={{
          siblings: 2, // increase space between siblings
          nonSiblings: 3 // increase space between non-siblings
        }}
        
      />
    </div>
  );
}
