import React, { Component, useState } from 'react';
import Tree from 'react-d3-tree';
import clone from 'clone';


const constructInitialData = (data: any) => {
    console.log("Data", data);
    const name = data.data.title.length > 10 ? `${data.data.title.substring(0, 10)}...` : data.data.title;
    return {
        uuid: data.data.id,
        name: name,
        title: data.data.title,
        authors: data.data.authors,
        abstract: data.data.abstract,
        uri: data.data.uri,
        connection: null,
        children: []
    }
}

const handleNodeClick = (nodeDatum: any, event: any) => {
    console.log("Node", nodeDatum)
    window.open(nodeDatum.data.uri);
}

// Function to fetch children for a node
const fetchChildren = async (nodeId: any) => {
  console.log(nodeId);
  try {
    const response = await fetch(`http://127.0.0.1:5000/add-children/${nodeId}`, { mode: "no-cors" });
    console.log(response);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const childrenData = await response.json();
    console.log(childrenData);
    return childrenData; // Ensure this data is in the format expected by react-d3-tree
  } catch (error) {
    console.error("Failed to fetch children data:", error);
    return [];
  }
}

export default function Graph({ data, onNodeHover }: { data: any, onNodeHover: (nodeData: any) => void }) {
  console.log(onNodeHover);
  const [treeData, setTreeData] = useState(constructInitialData({data}));

  const handleNodeClick = async (nodeDatum: any, event: any) => {
    // console.log("Node", nodeDatum);
    // Check if the node has no children and is not already fetching
    if (!nodeDatum.children && !nodeDatum._children) {
      // Fetch children data
      const childrenData = await fetchChildren(nodeDatum.data.uuid);
      console.log(childrenData);
      // Use clone to avoid directly mutating the state
      const clonedTreeData = clone(treeData);
      // Find the node in your treeData and add the children
      const findAndAddChildren = (node: any) => {
        if (node.uuid === nodeDatum.data.uuid) {
          node.children = childrenData; // Assuming childrenData is an array of children
          console.log(node);
          return true;
        }
        if (node.children) {
          return node.children.some(findAndAddChildren);
        }
        return false;
      };
      findAndAddChildren(clonedTreeData);
      setTreeData(clonedTreeData);
    }
    if (nodeDatum.uri) {
      window.open(nodeDatum.uri);
    }
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