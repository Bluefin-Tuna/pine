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
        connection: null
    }
}

const handleNodeClick = (nodeDatum: any, event: any) => {
    console.log("Node", nodeDatum)
    window.open(nodeDatum.data.uri);

}

export default function Graph({ data, onNodeHover }: { data: any, onNodeHover: (nodeData: any) => void }) {
    const initialNodeData = constructInitialData({data});
    const handleNodeMouseOver = (nodeDatum: any, event: any) => { onNodeHover(nodeDatum); };
  
    return (
      <div id="graph-wrapper" style={{ width: '75vw', height: '100vh', borderColor: 'black', borderStyle: 'solid' }}>
        <Tree
          data={initialNodeData}
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