import React from 'react';
import Tree from 'react-d3-tree';

const orgChart = {
  name: 'CEO',
  children: [
    {
      name: 'Manager',
      attributes: {
        department: 'Production',
      },
      children: [
        {
          name: 'Foreman',
          attributes: {
            department: 'Fabrication',
          },
          children: [
            {
              name: 'Worker',
            },
          ],
        },
        {
          name: 'Foreman',
          attributes: {
            department: 'Assembly',
          },
          children: [
            {
              name: 'Worker',
            },
          ],
        },
      ],
    },
  ],
};

export default function OrgChartTree() {
  return (
    <div id="tree-wrapper" style={{ width: '100vw', height: '100vh' }}>
      <Tree
        data={orgChart}
        onNodeClick={() => window.open("https://arxiv.org/abs/2203.16464")}
        onNodeMouseOver={() => window.open("https://arxiv.org/abs/2203.16464")}
      />
    </div>
  );
}