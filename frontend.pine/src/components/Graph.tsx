import React, { Component, useState } from 'react';
import Tree from 'react-d3-tree';
import clone from 'clone';


const cleanData = (data: any) => {
    const name = data.data.title.length > 10 ? `${data.data.title.substring(0, 10)}...` : data.data.title;
    return {
        uuid: data.data._id,
        name: name,
        title: data.data.title,
        authors: data.data.authors,
        abstract: data.data.abstract,
        uri: data.data.uri,
        children: []
    }
}


const handleNodeClick = (nodeDatum: any, event: any) => {
    window.open(nodeDatum.data.uri);
}

// Function to fetch children for a node
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
}

export default function Graph({ data, onNodeHover }: { data: any, onNodeHover: (nodeData: any) => void }) {
  const [treeData, setTreeData] = useState(cleanData({data}));
  const handleNodeClick = async (nodeDatum: any, event: any) => {
    // Check if the node has no children and is not already fetching
    if (!nodeDatum.children && !nodeDatum._children) {
      // Fetch children data
      const childrenData = await fetchChildren(nodeDatum.data.uuid);
      const cleanedChildrenData = childrenData.map(child => cleanData({data: child}));
      console.log(cleanedChildrenData);
      // Use clone to avoid directly mutating the state
      const clonedTreeData = clone(treeData);
      // Find the node in your treeData and add the children
      const findAndAddChildren = (node: any) => {
        if (node.uuid === nodeDatum.data.uuid) {
          node.children = cleanedChildrenData; // Assuming childrenData is an array of children
        }
        if (node.children) {
          return node.children.some(findAndAddChildren);
        }
      };
      console.log("Getting here")
      findAndAddChildren(clonedTreeData);
      setTreeData(clonedTreeData);
    }
    if (nodeDatum.uri) {
      window.open(nodeDatum.uri);
    }
    // return true;
  };

  const handleNodeMouseOver = (nodeDatum: any, event: any) => {
    onNodeHover(nodeDatum);
  };

  return (
    <div id="graph-wrapper" style={{ width: '75vw', height: '100vh', borderColor: 'black', borderStyle: 'solid' }}>
      <Tree
        data={treeData}
        collapsible={false}
        onNodeClick={handleNodeClick}
        onNodeMouseOver={handleNodeMouseOver}
      />
    </div>
  );
}