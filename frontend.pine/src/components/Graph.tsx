import React, { useState, useEffect } from 'react';
import Tree from 'react-d3-tree';
import clone from 'clone';

const constructInitialData = (data: any) => {
  console.log("Data", data);
  const name = data.data.data.title.length > 10 ? `${data.data.data.title.substring(0, 10)}...` : data.data.data.title;
  return {
    uuid: data.data.data.id,
    name: name,
    title: data.data.data.title,
    authors: data.data.data.authors,
    abstract: data.data.data.abstract,
    uri: data.data.data.uri,
    children: [] // Ensure children is set to null initially
  }
}

// Function to fetch children for a node
const fetchChildren = async (nodeId: any) => {
  console.log(nodeId);
  try {
    const response = await fetch(`YOUR_BACKEND_ENDPOINT/${nodeId}`);
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

export default function Graph( data: any, onNodeHover: any) {
  const [treeData, setTreeData] = useState(constructInitialData({data}));

  const handleNodeClick = async (nodeDatum: any, event: any) => {
    console.log("Node", nodeDatum);
    // Check if the node has no children and is not already fetching
    if (!nodeDatum.children && !nodeDatum._children) {
      // Fetch children data
      const childrenData = [{
        "name": "bitches",
        "children": []
      }];
      // Use clone to avoid directly mutating the state
      const clonedTreeData = clone(treeData);
      // Find the node in your treeData and add the children
      const findAndAddChildren = (node: any) => {
        console.log("NodeDatum", nodeDatum);
        console.log("Node", node);
        console.log("Is Equal", node.uuid === nodeDatum.uuid);
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


// import React, { useState } from 'react';
// import Tree from 'react-d3-tree';
// import clone from 'clone';

// const constructInitialData = (data: any) => {
//     console.log("Data", data);
//     const name = data.data.title.length > 10 ? `${data.data.title.substring(0, 10)}...` : data.data.title;
//     return {
//       uuid: data.data.id,
//       name: name,
//       title: data.data.title,
//       authors: data.data.authors,
//       abstract: data.data.abstract,
//       uri: data.data.uri,
//       connection: null,
//       children: [], // Ensure the root node can have children
//     };
//   };


// export default function Graph( data: any, onNodeHover: any ) {
//   // State to track the tree data and injected nodes count
//   const [treeData, setTreeData] = useState(constructInitialData({ data }));
//   const [injectedNodesCount, setInjectedNodesCount] = useState(0);

//   const addChildNode = () => {
//     const nextData = clone(treeData);
//     // Assuming you want to add a child to the root node for simplicity
//     if (!nextData.children) {
//       nextData.children = [];
//     }
//     const newCount = injectedNodesCount + 1;
//     nextData.children.push({
//       name: `Inserted Node ${newCount}`,
//       id: `inserted-node-${newCount}`,
//     });
//     setTreeData(nextData);
//     setInjectedNodesCount(newCount);
//   };

//   const handleNodeClick = (nodeDatum: any, event: any) => {
//     console.log("Node", nodeDatum);
//     window.open(nodeDatum.data.uri);
//   };

//   const handleNodeMouseOver = (nodeDatum, event) => {
//     onNodeHover(nodeDatum);
//   };

//   return (
//     <div id="graph-wrapper" style={{ width: '75vw', height: '100vh', borderColor: 'black', borderStyle: 'solid' }}>
//       <button onClick={addChildNode}>Add Child Node</button> {/* Button to add a child node */}
//       <Tree
//         data={treeData}
//         collapsible={false}
//         onNodeClick={handleNodeClick}
//         onNodeMouseOver={handleNodeMouseOver}
//       />
//     </div>
//   );
// }