# Pineroot: Explore Research Efficently

## Problem:
As student researchers, we often have to independently learn advanced topics at a rapid pace, 
with little assistance or guidance. But with dozens of citations per paper and topics that we are vaguely familiar with, we are often confused on what reference we should look to next to best improve our understanding of the topic. We might pick a paper based on a friend’s interest, or maybe pick a reference solely based on its author or title. Existing LLM-based methods have the potential to hallucinate false information and nonexistent papers. We hope to save valuable time and provide more relevant results by pointing researchers to research papers that are most critical to further their understanding on the topic they are exploring. Instead of having to blindly guess what reference they should look at next, our application uses RAG to analyze all relevant citations of the current paper and succinctly explains to the user which papers are the most relevant to their interests in an intuitive interface.

## Soultion
- A graph based solution that allows auto reccomends you papers and helps you understand the relationship between papers.
- We generate these paper recommendations based on a RAG-based system that utilizes the sources of the current paper combined with the Semantic Scholar API. 
- In addition, we can explain how one paper relates to the next by putting the paper abstracts of the parent and child nodes through a llama2 model. This allows users to navigate through numerous research papers while quickly understanding the connection between them.

## Tech Stack
- Backend - Python Flask
- DB - MongoDB Atlas
- Frontend - React
- LLM API - OctoAI
- LLM - Llama 2
