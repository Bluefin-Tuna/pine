from octoai.client import Client

client = Client(token="eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjNkMjMzOTQ5In0.eyJzdWIiOiI5MDdiYWZlNy0xNDkxLTRkODgtOTczZS0zZDQ5MjgyZDk0NGUiLCJ0eXBlIjoidXNlckFjY2Vzc1Rva2VuIiwidGVuYW50SWQiOiI3YjJkYmNkOC02ZDRlLTQxNzAtYTUyOC00ODkyN2JiNjQyZWQiLCJ1c2VySWQiOiI1MTFkY2VkMC04MTgwLTQ1N2YtYTUyZC00YzI0NTA1YThiMWUiLCJyb2xlcyI6WyJGRVRDSC1ST0xFUy1CWS1BUEkiXSwicGVybWlzc2lvbnMiOlsiRkVUQ0gtUEVSTUlTU0lPTlMtQlktQVBJIl0sImF1ZCI6IjNkMjMzOTQ5LWEyZmItNGFiMC1iN2VjLTQ2ZjYyNTVjNTEwZSIsImlzcyI6Imh0dHBzOi8vaWRlbnRpdHkub2N0b21sLmFpIiwiaWF0IjoxNzA3NTkxNjg4fQ.PdRBN1PzrFyPMrtQUwT47zIOwn9so-hXOOPSJFJ3hTWQ1DzwBeqB18RnhtFafcXkmOEN2Sgz5DRLIKgoKuQT5yD8jHShnLSFRMRHmcBd7_xJO803YTWteLM1RJRs3rXJUrsYgpsu5c1OOQakzpO4Ox9uXekMmi0TOELZo7Zjl1uP52wzlS0TsN6jL-3SeXnrbfMkuSUQSQRdglcdcBNQq8zTD7GjyAOV5V-zNsGiwD9HrEV-o39scGLIeOlOBp4wcfDsKA65lcKz-HOv4-gefmEXfXGk58VXw9S47bnNDQ2Nh0Jpf0pn560Qh6FiYyPCKBkRP9ofz-NkAFNQ9i0zVw")

abstract1 = """In this paper, we present a novel paradigm to enhance
the ability of object detector, e.g., expanding categories
or improving detection performance, by training on synthetic dataset generated from diffusion models. Specifically,
we integrate an instance-level grounding head into a pretrained, generative diffusion model, to augment it with the
ability of localising arbitrary instances in the generated images. The grounding head is trained to align the text embedding of category names with the regional visual feature of
the diffusion model, using supervision from an off-the-shelf
object detector, and a novel self-training scheme on (novel)
categories not covered by the detector. We conduct thorough
experiments to show that, this enhanced version of diffusion
model, termed as InstaGen, can serve as a data synthesizer, to enhance object detectors by training on its generated samples, demonstrating superior performance over
existing state-of-the-art methods in open-vocabulary (+4.5
AP) and data-sparse (+1.2 ∼ 5.2 AP) scenarios."""

abstract2 = """While the Transformer architecture has become the de-facto standard for natural language processing tasks, its applications to computer vision remain limited. In vision, attention is either applied in conjunction with convolutional networks, or used to replace certain components of convolutional networks while keeping their overall structure in place. We show that this reliance on CNNs is not necessary and a pure transformer applied directly to sequences of image patches can perform very well on image classification tasks. When pre-trained on large amounts of data and transferred to multiple mid-sized or small image recognition benchmarks (ImageNet, CIFAR-100, VTAB, etc.), Vision Transformer (ViT) attains excellent results compared to state-of-the-art convolutional networks while requiring substantially fewer computational resources to train."""

completion = client.chat.completions.create(
    messages=[
        {
            "role": "system",
            "content": "Just read paper 1. Based on abstract 1, give 10 word description on how it relates (varying perspective, smilar topic, etc) to abstract2. EXAMPLE: Expands on x topic. EXAMPLE: Disputes x claim. EXAMPLE: Dives deeper into x topic."
        },
        {
            "role": "user",
            "content": "abstract1: " + abstract1 + ", abstract2: " + abstract2
        }
    ],
    model="llama-2-70b-chat-fp16",
    max_tokens=100,
    presence_penalty=0,
    temperature=0.1,
    top_p=0.9,
)

content = completion.dict()['choices'][0]['message']['content'].strip()