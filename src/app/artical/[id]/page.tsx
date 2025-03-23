"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { ArrowLeft, Calendar, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"

// Mock data for articles
const ALL_ARTICLES = [
  {
    id: 1,
    title: "Introduction to Artificial Intelligence",
    description: "Learn the basics of AI and how it's transforming industries worldwide.",
    content: `
      <p>Artificial Intelligence (AI) is a field of computer science that focuses on creating machines capable of intelligent behavior. AI systems can perform tasks that typically require human intelligence, such as visual perception, speech recognition, decision-making, and language translation.</p>
      
      <h2>Key Concepts in AI</h2>
      
      <p>AI encompasses several subfields, including:</p>
      
      <ul>
        <li><strong>Machine Learning:</strong> Systems that can learn from data without being explicitly programmed.</li>
        <li><strong>Natural Language Processing:</strong> Enabling computers to understand and process human language.</li>
        <li><strong>Computer Vision:</strong> Allowing machines to interpret and understand visual information from the world.</li>
        <li><strong>Robotics:</strong> Creating machines that can interact with the physical world.</li>
      </ul>
      
      <h2>Applications of AI</h2>
      
      <p>AI is transforming numerous industries:</p>
      
      <ul>
        <li><strong>Healthcare:</strong> Improving diagnosis, drug discovery, and personalized treatment plans.</li>
        <li><strong>Finance:</strong> Detecting fraud, automating trading, and providing personalized financial advice.</li>
        <li><strong>Transportation:</strong> Enabling autonomous vehicles and optimizing traffic flow.</li>
        <li><strong>Retail:</strong> Personalizing shopping experiences and optimizing supply chains.</li>
      </ul>
      
      <h2>The Future of AI</h2>
      
      <p>As AI continues to advance, we can expect more sophisticated systems that can handle increasingly complex tasks. However, this progress also raises important ethical considerations regarding privacy, bias, job displacement, and the role of AI in society.</p>
      
      <p>Understanding the fundamentals of AI is becoming essential for professionals across all industries as these technologies continue to reshape our world.</p>
    `,
    author: "Dr. Alan Turing",
    category: "AI Basics",
    date: "2023-05-15",
    relatedArticles: [2, 3, 5],
  },
  {
    id: 2,
    title: "Machine Learning Fundamentals",
    description: "Understand the core concepts behind machine learning algorithms.",
    content: `
      <p>Machine Learning (ML) is a subset of artificial intelligence that focuses on developing algorithms that can learn from and make predictions or decisions based on data. Instead of following explicitly programmed instructions, these algorithms build a model based on sample data, known as training data, to make predictions or decisions without being explicitly programmed to do so.</p>
      
      <h2>Types of Machine Learning</h2>
      
      <p>There are three main types of machine learning:</p>
      
      <ul>
        <li><strong>Supervised Learning:</strong> The algorithm learns from labeled training data, helping it to predict outcomes for unforeseen data.</li>
        <li><strong>Unsupervised Learning:</strong> The algorithm learns patterns from unlabeled data.</li>
        <li><strong>Reinforcement Learning:</strong> The algorithm learns by interacting with its environment and receiving rewards or penalties.</li>
      </ul>
      
      <h2>Common Machine Learning Algorithms</h2>
      
      <p>Some widely used machine learning algorithms include:</p>
      
      <ul>
        <li><strong>Linear Regression:</strong> Used for predicting a continuous value.</li>
        <li><strong>Logistic Regression:</strong> Used for binary classification problems.</li>
        <li><strong>Decision Trees:</strong> Used for both classification and regression tasks.</li>
        <li><strong>Support Vector Machines:</strong> Effective for classification in high-dimensional spaces.</li>
        <li><strong>Neural Networks:</strong> Inspired by the human brain, used for complex pattern recognition tasks.</li>
      </ul>
      
      <h2>The Machine Learning Process</h2>
      
      <p>The typical machine learning process involves:</p>
      
      <ol>
        <li><strong>Data Collection:</strong> Gathering relevant data for the problem at hand.</li>
        <li><strong>Data Preprocessing:</strong> Cleaning and preparing the data for analysis.</li>
        <li><strong>Feature Selection/Engineering:</strong> Identifying the most relevant features for the model.</li>
        <li><strong>Model Selection:</strong> Choosing the appropriate algorithm for the task.</li>
        <li><strong>Training:</strong> Using the training data to teach the model.</li>
        <li><strong>Evaluation:</strong> Testing the model's performance on unseen data.</li>
        <li><strong>Deployment:</strong> Implementing the model in a real-world environment.</li>
      </ol>
      
      <p>Machine learning continues to evolve rapidly, with new techniques and applications emerging regularly. Understanding these fundamentals provides a solid foundation for exploring more advanced concepts in the field.</p>
    `,
    author: "Dr. Grace Hopper",
    category: "Machine Learning",
    date: "2023-06-02",
    relatedArticles: [1, 3, 7],
  },
  {
    id: 3,
    title: "Natural Language Processing",
    description: "Explore how computers understand and process human language.",
    content: `
      <p>Natural Language Processing (NLP) is a field of artificial intelligence that focuses on the interaction between computers and human language. It enables computers to understand, interpret, and generate human language in a valuable way.</p>
      
      <h2>Core Components of NLP</h2>
      
      <p>NLP encompasses several key components:</p>
      
      <ul>
        <li><strong>Syntax:</strong> The arrangement of words to create well-formed sentences.</li>
        <li><strong>Semantics:</strong> The meaning conveyed by the text.</li>
        <li><strong>Pragmatics:</strong> How context contributes to meaning.</li>
        <li><strong>Discourse:</strong> How sentences connect to form coherent text.</li>
      </ul>
      
      <h2>Common NLP Tasks</h2>
      
      <p>NLP is used for various tasks, including:</p>
      
      <ul>
        <li><strong>Text Classification:</strong> Categorizing text into predefined groups.</li>
        <li><strong>Sentiment Analysis:</strong> Determining the emotional tone behind text.</li>
        <li><strong>Named Entity Recognition:</strong> Identifying entities such as people, organizations, and locations in text.</li>
        <li><strong>Machine Translation:</strong> Automatically translating text from one language to another.</li>
        <li><strong>Question Answering:</strong> Generating answers to questions posed in natural language.</li>
        <li><strong>Text Summarization:</strong> Creating concise summaries of longer texts.</li>
      </ul>
      
      <h2>NLP Techniques and Models</h2>
      
      <p>Modern NLP relies on various techniques and models:</p>
      
      <ul>
        <li><strong>Tokenization:</strong> Breaking text into words, phrases, or other meaningful elements.</li>
        <li><strong>Word Embeddings:</strong> Representing words as vectors in a continuous space.</li>
        <li><strong>Recurrent Neural Networks (RNNs):</strong> Processing sequences of text.</li>
        <li><strong>Transformer Models:</strong> State-of-the-art architectures like BERT, GPT, and T5 that have revolutionized NLP.</li>
      </ul>
      
      <h2>Applications of NLP</h2>
      
      <p>NLP has numerous real-world applications:</p>
      
      <ul>
        <li><strong>Virtual Assistants:</strong> Siri, Alexa, and Google Assistant use NLP to understand and respond to user queries.</li>
        <li><strong>Customer Service:</strong> Chatbots and automated support systems.</li>
        <li><strong>Healthcare:</strong> Analyzing medical records and assisting in diagnosis.</li>
        <li><strong>Content Analysis:</strong> Monitoring social media and news for trends and sentiment.</li>
      </ul>
      
      <p>As NLP continues to advance, we can expect even more sophisticated language understanding and generation capabilities from AI systems.</p>
    `,
    author: "Dr. Jane Smith",
    category: "NLP",
    date: "2023-06-18",
    relatedArticles: [1, 2, 9],
  },
  {
    id: 4,
    title: "Computer Vision Applications",
    description: "Discover how AI is revolutionizing image and video analysis.",
    content: `
      <p>Computer Vision is a field of artificial intelligence that enables computers to derive meaningful information from digital images, videos, and other visual inputs. It seeks to automate tasks that the human visual system can do, allowing machines to "see" and interpret the visual world.</p>
      
      <h2>Core Techniques in Computer Vision</h2>
      
      <p>Computer Vision relies on several fundamental techniques:</p>
      
      <ul>
        <li><strong>Image Classification:</strong> Categorizing images into predefined classes.</li>
        <li><strong>Object Detection:</strong> Identifying and locating objects within images.</li>
        <li><strong>Image Segmentation:</strong> Dividing images into segments to simplify analysis.</li>
        <li><strong>Feature Extraction:</strong> Identifying key features in images for further processing.</li>
        <li><strong>Facial Recognition:</strong> Identifying or verifying individuals based on facial features.</li>
      </ul>
      
      <h2>Applications of Computer Vision</h2>
      
      <p>Computer Vision has transformed numerous industries:</p>
      
      <ul>
        <li><strong>Healthcare:</strong> Medical image analysis, disease detection, and surgical assistance.</li>
        <li><strong>Automotive:</strong> Enabling self-driving cars to perceive their environment.</li>
        <li><strong>Retail:</strong> Cashierless stores, inventory management, and customer behavior analysis.</li>
        <li><strong>Security:</strong> Surveillance systems, access control, and threat detection.</li>
        <li><strong>Agriculture:</strong> Crop monitoring, yield prediction, and automated harvesting.</li>
        <li><strong>Manufacturing:</strong> Quality control, defect detection, and process optimization.</li>
      </ul>
      
      <h2>Recent Advances in Computer Vision</h2>
      
      <p>The field has seen remarkable progress in recent years:</p>
      
      <ul>
        <li><strong>Convolutional Neural Networks (CNNs):</strong> Deep learning architectures specifically designed for image processing.</li>
        <li><strong>Generative Adversarial Networks (GANs):</strong> Creating realistic synthetic images.</li>
        <li><strong>3D Computer Vision:</strong> Understanding the three-dimensional structure of scenes.</li>
        <li><strong>Video Understanding:</strong> Analyzing actions and events in video sequences.</li>
      </ul>
      
      <h2>Challenges and Future Directions</h2>
      
      <p>Despite significant progress, Computer Vision still faces challenges:</p>
      
      <ul>
        <li><strong>Robustness:</strong> Ensuring systems work reliably in varying conditions.</li>
        <li><strong>Interpretability:</strong> Understanding why models make certain decisions.</li>
        <li><strong>Efficiency:</strong> Developing models that require less computational resources.</li>
        <li><strong>Privacy:</strong> Addressing concerns about surveillance and facial recognition.</li>
      </ul>
      
      <p>As these challenges are addressed, Computer Vision will continue to expand its capabilities and applications, further transforming how machines interact with the visual world.</p>
    `,
    author: "Dr. Fei-Fei Li",
    category: "Computer Vision",
    date: "2023-07-05",
    relatedArticles: [1, 8, 9],
  },
  {
    id: 5,
    title: "Ethical Considerations in AI",
    description: "Explore the ethical challenges and considerations in AI development.",
    content: `
      <p>As artificial intelligence becomes increasingly integrated into our daily lives, it raises important ethical questions that must be addressed. Ethical AI development ensures that these powerful technologies benefit humanity while minimizing potential harms.</p>
      
      <h2>Key Ethical Challenges in AI</h2>
      
      <p>Several critical ethical issues have emerged in AI development:</p>
      
      <ul>
        <li><strong>Bias and Fairness:</strong> AI systems can perpetuate or amplify existing biases in training data, leading to unfair outcomes for certain groups.</li>
        <li><strong>Privacy:</strong> AI often requires vast amounts of data, raising concerns about surveillance and the appropriate use of personal information.</li>
        <li><strong>Transparency and Explainability:</strong> Many advanced AI systems function as "black boxes," making it difficult to understand how they reach decisions.</li>
        <li><strong>Accountability:</strong> Determining responsibility when AI systems cause harm remains challenging.</li>
        <li><strong>Job Displacement:</strong> Automation through AI may significantly transform labor markets and eliminate certain jobs.</li>
        <li><strong>Autonomy and Control:</strong> Questions about how much decision-making authority should be delegated to AI systems.</li>
      </ul>
      
      <h2>Principles for Ethical AI</h2>
      
      <p>Various organizations have proposed principles for ethical AI development:</p>
      
      <ul>
        <li><strong>Beneficence:</strong> AI should benefit individuals and society.</li>
        <li><strong>Non-maleficence:</strong> AI should not cause harm.</li>
        <li><strong>Autonomy:</strong> Humans should maintain control over AI systems.</li>
        <li><strong>Justice:</strong> AI benefits and risks should be distributed fairly.</li>
        <li><strong>Explicability:</strong> AI systems should be transparent and understandable.</li>
      </ul>
      
      <h2>Approaches to Ethical AI</h2>
      
      <p>Several approaches are being developed to address ethical concerns:</p>
      
      <ul>
        <li><strong>Ethical by Design:</strong> Incorporating ethical considerations from the earliest stages of development.</li>
        <li><strong>Algorithmic Impact Assessments:</strong> Evaluating potential effects before deployment.</li>
        <li><strong>Diverse Development Teams:</strong> Including perspectives from various backgrounds to identify potential issues.</li>
        <li><strong>Regulatory Frameworks:</strong> Developing laws and policies to govern AI development and use.</li>
        <li><strong>Ethics Boards:</strong> Establishing oversight committees to review AI projects.</li>
      </ul>
      
      <h2>The Path Forward</h2>
      
      <p>Creating ethical AI requires collaboration among technologists, ethicists, policymakers, and the public. By addressing these challenges proactively, we can harness the tremendous potential of AI while ensuring it aligns with human values and promotes the common good.</p>
      
      <p>As AI continues to evolve, so too must our ethical frameworks and governance structures, adapting to new capabilities and challenges as they emerge.</p>
    `,
    author: "Dr. Timnit Gebru",
    category: "AI Ethics",
    date: "2023-07-22",
    relatedArticles: [1, 10],
  },
  {
    id: 6,
    title: "Deep Learning Architectures",
    description: "An in-depth look at neural network architectures and their applications.",
    content: `
      <p>Deep Learning has revolutionized artificial intelligence through sophisticated neural network architectures that can learn complex patterns from data. These architectures have enabled breakthroughs in various domains, from computer vision to natural language processing.</p>
      
      <h2>Fundamental Neural Network Concepts</h2>
      
      <p>Before exploring specific architectures, it's important to understand the basic building blocks:</p>
      
      <ul>
        <li><strong>Neurons:</strong> The basic computational units that process inputs and produce outputs.</li>
        <li><strong>Layers:</strong> Collections of neurons that transform data at different levels of abstraction.</li>
        <li><strong>Activation Functions:</strong> Non-linear functions that enable networks to learn complex patterns.</li>
        <li><strong>Backpropagation:</strong> The algorithm used to update network weights during training.</li>
      </ul>
      
      <h2>Key Deep Learning Architectures</h2>
      
      <p>Several architectures have proven particularly effective for different tasks:</p>
      
      <h3>Convolutional Neural Networks (CNNs)</h3>
      
      <p>CNNs excel at processing grid-like data such as images:</p>
      
      <ul>
        <li><strong>Convolutional Layers:</strong> Extract features using filters that scan across the input.</li>
        <li><strong>Pooling Layers:</strong> Reduce dimensionality while preserving important information.</li>
        <li><strong>Applications:</strong> Image classification, object detection, facial recognition.</li>
        <li><strong>Notable Architectures:</strong> LeNet, AlexNet, VGG, ResNet, Inception.</li>
      </ul>
      
      <h3>Recurrent Neural Networks (RNNs)</h3>
      
      <p>RNNs are designed for sequential data:</p>
      
      <ul>
        <li><strong>Recurrent Connections:</strong> Allow information to persist across time steps.</li>
        <li><strong>LSTM and GRU:</strong> Special units that address the vanishing gradient problem.</li>
        <li><strong>Applications:</strong> Time series analysis, speech recognition, language modeling.</li>
      </ul>
      
      <h3>Transformer Architectures</h3>
      
      <p>Transformers have largely replaced RNNs for many sequence tasks:</p>
      
      <ul>
        <li><strong>Self-Attention:</strong> Allows the model to weigh the importance of different parts of the input.</li>
        <li><strong>Parallelization:</strong> Enables more efficient training compared to RNNs.</li>
        <li><strong>Applications:</strong> Machine translation, text generation, question answering.</li>
        <li><strong>Notable Models:</strong> BERT, GPT, T5, DALL-E.</li>
      </ul>
      
      <h3>Generative Adversarial Networks (GANs)</h3>
      
      <p>GANs consist of two competing networks:</p>
      
      <ul>
        <li><strong>Generator:</strong> Creates synthetic data samples.</li>
        <li><strong>Discriminator:</strong> Distinguishes between real and synthetic samples.</li>
        <li><strong>Applications:</strong> Image generation, style transfer, data augmentation.</li>
      </ul>
      
      <h2>Recent Trends and Future Directions</h2>
      
      <p>The field continues to evolve rapidly:</p>
      
      <ul>
        <li><strong>Scaling:</strong> Larger models with billions of parameters.</li>
        <li><strong>Multimodal Learning:</strong> Models that can process multiple types of data (text, images, audio).</li>
        <li><strong>Self-Supervised Learning:</strong> Reducing dependence on labeled data.</li>
        <li><strong>Efficient Architectures:</strong> Designs that reduce computational requirements.</li>
      </ul>
      
      <p>Understanding these architectures provides insight into the capabilities and limitations of modern AI systems, as well as potential directions for future research and applications.</p>
    `,
    author: "Dr. Yoshua Bengio",
    category: "Deep Learning",
    date: "2023-08-10",
    relatedArticles: [2, 7, 9],
  },
  {
    id: 7,
    title: "Reinforcement Learning",
    description: "Understanding how AI agents learn through interaction with environments.",
    content: `
      <p>Reinforcement Learning (RL) is a type of machine learning where an agent learns to make decisions by taking actions in an environment to maximize some notion of cumulative reward. Unlike supervised learning, the agent is not told which actions to take but must discover which actions yield the most reward through trial and error.</p>
      
      <h2>Core Components of Reinforcement Learning</h2>
      
      <p>RL systems consist of several key elements:</p>
      
      <ul>
        <li><strong>Agent:</strong> The learner or decision-maker.</li>
        <li><strong>Environment:</strong> The world with which the agent interacts.</li>
        <li><strong>State:</strong> The current situation of the agent within the environment.</li>
        <li><strong>Action:</strong> The possible moves the agent can make.</li>
        <li><strong>Reward:</strong> The feedback from the environment after an action.</li>
        <li><strong>Policy:</strong> The strategy the agent employs to determine actions.</li>
        <li><strong>Value Function:</strong> The expected cumulative reward from a state.</li>
      </ul>
      
      <h2>Key Reinforcement Learning Approaches</h2>
      
      <p>Several approaches have been developed for RL:</p>
      
      <h3>Value-Based Methods</h3>
      
      <ul>
        <li><strong>Q-Learning:</strong> Learns the value of actions in states without requiring a model of the environment.</li>
        <li><strong>Deep Q-Networks (DQN):</strong> Combines Q-learning with deep neural networks to handle high-dimensional state spaces.</li>
      </ul>
      
      <h3>Policy-Based Methods</h3>
      
      <ul>
        <li><strong>Policy Gradients:</strong> Directly optimizes the policy without using a value function.</li>
        <li><strong>Actor-Critic Methods:</strong> Combines value-based and policy-based approaches.</li>
      </ul>
      
      <h3>Model-Based Methods</h3>
      
      <ul>
        <li><strong>Environment Modeling:</strong> Learns a model of the environment to plan future actions.</li>
        <li><strong>Monte Carlo Tree Search:</strong> Simulates possible future scenarios to make decisions.</li>
      </ul>
      
      <h2>Notable Applications of Reinforcement Learning</h2>
      
      <p>RL has achieved remarkable successes in various domains:</p>
      
      <ul>
        <li><strong>Game Playing:</strong> Mastering complex games like Chess, Go (AlphaGo), and video games (Atari, StarCraft).</li>
        <li><strong>Robotics:</strong> Teaching robots to walk, manipulate objects, and navigate environments.</li>
        <li><strong>Resource Management:</strong> Optimizing data center operations, traffic light control, and energy systems.</li>
        <li><strong>Healthcare:</strong> Developing personalized treatment strategies and drug discovery.</li>
        <li><strong>Finance:</strong> Algorithmic trading and portfolio management.</li>
      </ul>
      
      <h2>Challenges in Reinforcement Learning</h2>
      
      <p>Despite its successes, RL faces several challenges:</p>
      
      <ul>
        <li><strong>Sample Efficiency:</strong> RL often requires many interactions with the environment to learn effectively.</li>
        <li><strong>Exploration vs. Exploitation:</strong> Balancing the need to explore new actions versus exploiting known good actions.</li>
        <li><strong>Reward Design:</strong> Creating appropriate reward functions that lead to desired behaviors.</li>
        <li><strong>Generalization:</strong> Transferring knowledge from one environment to another.</li>
        <li><strong>Safety:</strong> Ensuring agents don't take harmful actions during exploration.</li>
      </ul>
      
      <h2>Future Directions</h2>
      
      <p>Research in RL continues to advance in several directions:</p>
      
      <ul>
        <li><strong>Multi-Agent RL:</strong> Systems where multiple agents interact and learn simultaneously.</li>
        <li><strong>Hierarchical RL:</strong> Breaking down complex tasks into simpler subtasks.</li>
        <li><strong>Meta-RL:</strong> Agents that learn how to learn, adapting quickly to new tasks.</li>
        <li><strong>Offline RL:</strong> Learning from pre-collected data without direct environment interaction.</li>
      </ul>
      
      <p>As these challenges are addressed, reinforcement learning will likely play an increasingly important role in developing autonomous systems that can adapt to complex, dynamic environments.</p>
    `,
    author: "Dr. Richard Sutton",
    category: "Machine Learning",
    date: "2023-08-28",
    relatedArticles: [2, 6, 8],
  },
  {
    id: 8,
    title: "AI in Healthcare",
    description: "How artificial intelligence is transforming diagnosis and treatment.",
    content: `
      <p>Artificial Intelligence is revolutionizing healthcare by enhancing diagnostic accuracy, improving treatment planning, accelerating drug discovery, and making healthcare more accessible and personalized. These advances promise to improve patient outcomes while potentially reducing costs.</p>
      
      <h2>Diagnostic Applications</h2>
      
      <p>AI is transforming medical diagnostics in several ways:</p>
      
      <ul>
        <li><strong>Medical Imaging Analysis:</strong> AI systems can detect abnormalities in X-rays, MRIs, CT scans, and other imaging modalities, often with accuracy comparable to or exceeding that of human radiologists.</li>
        <li><strong>Pathology:</strong> Digital pathology combined with AI helps identify cancerous cells and other anomalies in tissue samples.</li>
        <li><strong>Early Disease Detection:</strong> AI models can identify patterns indicative of diseases before they become symptomatic, enabling earlier intervention.</li>
        <li><strong>Diagnostic Decision Support:</strong> AI systems can help clinicians by suggesting possible diagnoses based on patient symptoms, medical history, and test results.</li>
      </ul>
      
      <h2>Treatment and Care</h2>
      
      <p>AI is also enhancing treatment planning and delivery:</p>
      
      <ul>
        <li><strong>Personalized Treatment Plans:</strong> AI can analyze patient data to recommend treatments most likely to be effective for individual patients.</li>
        <li><strong>Surgical Robotics:</strong> AI-enhanced robotic systems assist surgeons in performing precise procedures with minimal invasiveness.</li>
        <li><strong>Monitoring and Management:</strong> AI tools help monitor patient conditions and manage chronic diseases through continuous data analysis.</li>
        <li><strong>Virtual Nursing Assistants:</strong> AI-powered virtual assistants can provide basic patient support, answer questions, and alert healthcare providers when intervention is needed.</li>
      </ul>
      
      <h2>Drug Discovery and Development</h2>
      
      <p>AI is accelerating pharmaceutical research:</p>
      
      <ul>
        <li><strong>Target Identification:</strong> AI algorithms can identify potential drug targets by analyzing biological data and scientific literature.</li>
        <li><strong>Molecule Design:</strong> Generative models can design novel molecules with specific properties for potential therapeutic use.</li>
        <li><strong>Clinical Trial Optimization:</strong> AI helps identify suitable patients for clinical trials and predict potential outcomes.</li>
        <li><strong>Drug Repurposing:</strong> AI can identify existing drugs that may be effective for new indications, saving time and development costs.</li>
      </ul>
      
      <h2>Healthcare Operations</h2>
      
      <p>AI is improving healthcare system efficiency:</p>
      
      <ul>
        <li><strong>Administrative Automation:</strong> AI streamlines administrative tasks like scheduling, billing, and coding.</li>
        <li><strong>Resource Allocation:</strong> Predictive models help hospitals allocate staff and resources more efficiently.</li>
        <li><strong>Fraud Detection:</strong> AI systems can identify potentially fraudulent insurance claims.</li>
        <li><strong>Predictive Analytics:</strong> Forecasting patient admissions and readmissions to optimize hospital operations.</li>
      </ul>
      
      <h2>Challenges and Ethical Considerations</h2>
      
      <p>Despite its promise, AI in healthcare faces several challenges:</p>
      
      <ul>
        <li><strong>Data Privacy and Security:</strong> Ensuring patient data remains protected while being used to train AI systems.</li>
        <li><strong>Bias and Fairness:</strong> Preventing AI systems from perpetuating or amplifying existing healthcare disparities.</li>
        <li><strong>Regulatory Approval:</strong> Navigating complex regulatory frameworks for AI-based medical technologies.</li>
        <li><strong>Integration with Clinical Workflows:</strong> Ensuring AI tools enhance rather than disrupt healthcare delivery.</li>
        <li><strong>Trust and Explainability:</strong> Building systems that clinicians and patients can understand and trust.</li>
      </ul>
      
      <h2>The Future of AI in Healthcare</h2>
      
      <p>Looking ahead, we can expect:</p>
      
      <ul>
        <li><strong>Increased Personalization:</strong> More tailored prevention, diagnosis, and treatment based on individual patient characteristics.</li>
        <li><strong>Democratization of Expertise:</strong> AI bringing specialized medical knowledge to underserved areas.</li>
        <li><strong>Preventive Medicine:</strong> Shifting focus from treatment to prevention through early risk identification.</li>
        <li><strong>Integrated Care:</strong> AI coordinating care across different providers and settings.</li>
      </ul>
      
      <p>As AI continues to evolve, collaboration between technologists, healthcare professionals, patients, and policymakers will be essential to harness its full potential while addressing challenges responsibly.</p>
    `,
    author: "Dr. Eric Topol",
    category: "AI Applications",
    date: "2023-09-15",
    relatedArticles: [1, 4, 10],
  },
  {
    id: 9,
    title: "Generative AI Models",
    description: "Exploring models that can create new content like images and text.",
    content: `
      <p>Generative AI refers to artificial intelligence systems that can create new content, including text, images, music, code, and more. These models have captured public attention through their ability to produce remarkably human-like outputs and are transforming creative processes across industries.</p>
      
      <h2>Types of Generative AI Models</h2>
      
      <p>Several architectures power generative AI:</p>
      
      <h3>Transformer-Based Language Models</h3>
      
      <ul>
        <li><strong>GPT (Generative Pre-trained Transformer):</strong> Models like GPT-4 that generate coherent and contextually relevant text.</li>
        <li><strong>Applications:</strong> Content creation, chatbots, summarization, translation, and code generation.</li>
      </ul>
      
      <h3>Diffusion Models</h3>
      
      <ul>
        <li><strong>Process:</strong> Gradually remove noise from a random starting point to generate high-quality images.</li>
        <li><strong>Examples:</strong> Stable Diffusion, DALL-E, Midjourney.</li>
        <li><strong>Applications:</strong> Image generation, editing, and style transfer.</li>
      </ul>
      
      <h3>Generative Adversarial Networks (GANs)</h3>
      
      <ul>
        <li><strong>Architecture:</strong> Two neural networks (generator and discriminator) competing against each other.</li>
        <li><strong>Applications:</strong> Realistic image generation, data augmentation, and style transfer.</li>
      </ul>
      
      <h3>Variational Autoencoders (VAEs)</h3>
      
      <ul>
        <li><strong>Function:</strong> Encode data into a compressed representation and then decode it to generate new samples.</li>
        <li><strong>Applications:</strong> Image generation, anomaly detection, and data compression.</li>
      </ul>
      
      <h2>Multimodal Generative AI</h2>
      
      <p>Recent advances have enabled models that work across different types of data:</p>
      
      <ul>
        <li><strong>Text-to-Image:</strong> Models like DALL-E and Midjourney that create images from text descriptions.</li>
        <li><strong>Text-to-Video:</strong> Systems that generate video clips based on text prompts.</li>
        <li><strong>Text-to-Audio:</strong> Models that create music or speech from textual descriptions.</li>
        <li><strong>Text-to-3D:</strong> Emerging systems that generate 3D models from text descriptions.</li>
      </ul>
      
      <h2>Applications of Generative AI</h2>
      
      <p>Generative AI is being applied across numerous domains:</p>
      
      <ul>
        <li><strong>Creative Industries:</strong> Assisting in art, design, music composition, and content creation.</li>
        <li><strong>Software Development:</strong> Generating code, debugging, and documentation.</li>
        <li><strong>Healthcare:</strong> Creating synthetic medical data and assisting in drug discovery.</li>
        <li><strong>Education:</strong> Generating personalized learning materials and assessments.</li>
        <li><strong>Marketing:</strong> Creating customized content for different audiences.</li>
        <li><strong>Gaming:</strong> Generating game assets, characters, and even entire game levels.</li>
      </ul>
      
      <h2>Challenges and Limitations</h2>
      
      <p>Despite their capabilities, generative AI models face several challenges:</p>
      
      <ul>
        <li><strong>Hallucinations:</strong> Generating content that appears plausible but is factually incorrect.</li>
        <li><strong>Bias:</strong> Reproducing or amplifying biases present in training data.</li>
        <li><strong>Copyright and Ownership:</strong> Questions about the ownership of AI-generated content and the use of copyrighted material in training.</li>
        <li><strong>Misuse:</strong> Potential for creating deepfakes, misinformation, or harmful content.</li>
        <li><strong>Computational Resources:</strong> Requiring significant computing power for training and sometimes for inference.</li>
      </ul>
      
      <h2>The Future of Generative AI</h2>
      
      <p>Looking ahead, we can anticipate:</p>
      
      <ul>
        <li><strong>Increased Capabilities:</strong> More sophisticated models that can generate even more complex and diverse content.</li>
        <li><strong>Better Control:</strong> More precise ways to guide the generation process.</li>
        <li><strong>Efficiency Improvements:</strong> Models that require less computational resources and energy.</li>
        <li><strong>Ethical Frameworks:</strong> Development of guidelines and tools to address ethical concerns.</li>
        <li><strong>Human-AI Collaboration:</strong> Tools that enhance human creativity rather than replace it.</li>
      </ul>
      
      <p>Generative AI represents a significant shift in how we create and interact with content, offering both exciting opportunities and important challenges that society must navigate thoughtfully.</p>
    `,
    author: "Dr. Ian Goodfellow",
    category: "Generative AI",
    date: "2023-10-02",
    relatedArticles: [3, 4, 6],
  },
  {
    id: 10,
    title: "AI and Data Privacy",
    description: "Navigating the complex relationship between AI systems and user privacy.",
    content: `
      <p>The relationship between artificial intelligence and data privacy presents one of the most significant challenges in modern technology. AI systems require vast amounts of data to function effectively, yet this data often contains sensitive personal information that must be protected. Balancing the benefits of AI with privacy concerns requires careful consideration of technical, legal, and ethical factors.</p>
      
      <h2>Privacy Challenges in AI</h2>
      
      <p>Several key privacy challenges arise in AI development and deployment:</p>
      
      <ul>
        <li><strong>Data Collection:</strong> AI systems often require extensive data collection, which may occur without full user awareness or consent.</li>
        <li><strong>Data Retention:</strong> Questions about how long data should be stored and when it should be deleted.</li>
        <li><strong>Data Repurposing:</strong> Data collected for one purpose may later be used for unrelated applications.</li>
        <li><strong>Inference Attacks:</strong> AI can sometimes infer sensitive information not explicitly included in the data.</li>
        <li><strong>Model Memorization:</strong> AI models may inadvertently memorize and potentially reveal training data.</li>
        <li><strong>Surveillance Concerns:</strong> AI-powered surveillance technologies raise questions about privacy in public spaces.</li>
      </ul>
      
      <h2>Privacy-Enhancing Technologies</h2>
      
      <p>Several technologies aim to address these challenges:</p>
      
      <h3>Federated Learning</h3>
      
      <ul>
        <li><strong>Approach:</strong> Training AI models across multiple devices while keeping data local.</li>
        <li><strong>Benefits:</strong> Reduces the need to centralize sensitive data while still enabling model improvement.</li>
      </ul>
      
      <h3>Differential Privacy</h3>
      
      <ul>
        <li><strong>Approach:</strong> Adding carefully calibrated noise to data or model outputs to protect individual privacy.</li>
        <li><strong>Benefits:</strong> Provides mathematical guarantees about privacy protection while preserving overall data utility.</li>
      </ul>
      
      <h3>Homomorphic Encryption</h3>
      
      <ul>
        <li><strong>Approach:</strong> Performing computations on encrypted data without decrypting it.</li>
        <li><strong>Benefits:</strong> Allows AI processing while keeping the underlying data private.</li>
      </ul>
      
      <h3>Synthetic Data</h3>
      
      <ul>
        <li><strong>Approach:</strong> Creating artificial data that mimics the statistical properties of real data without containing actual personal information.</li>
        <li><strong>Benefits:</strong> Provides realistic data for training while reducing privacy risks.</li>
      </ul>
      
      <h2>Regulatory Approaches</h2>
      
      <p>Privacy regulations increasingly address AI-specific concerns:</p>
      
      <ul>
        <li><strong>GDPR (General Data Protection Regulation):</strong> Includes provisions on automated decision-making and profiling.</li>
        <li><strong>CCPA/CPRA (California Consumer Privacy Act/California Privacy Rights Act):</strong> Provides rights regarding automated decision-making.</li>
        <li><strong>AI-Specific Regulations:</strong> Emerging frameworks like the EU AI Act that classify AI systems based on risk levels.</li>
        <li><strong>Sectoral Regulations:</strong> Domain-specific rules for healthcare, finance, and other sensitive areas.</li>
      </ul>
      
      <h2>Ethical Frameworks</h2>
      
      <p>Beyond legal requirements, ethical frameworks guide responsible AI development:</p>
      
      <ul>
        <li><strong>Privacy by Design:</strong> Incorporating privacy protections from the earliest stages of development.</li>
        <li><strong>Data Minimization:</strong> Collecting only the data necessary for the intended purpose.</li>
        <li><strong>Transparency:</strong> Clearly communicating how data is used and what privacy protections are in place.</li>
        <li><strong>User Control:</strong> Providing meaningful options for users to control their data.</li>
      </ul>
      
      <h2>Balancing Innovation and Privacy</h2>
      
      <p>Finding the right balance requires consideration of several factors:</p>
      
      <ul>
        <li><strong>Risk Assessment:</strong> Evaluating potential privacy impacts before deploying AI systems.</li>
        <li><strong>Contextual Factors:</strong> Considering the sensitivity of data and the potential consequences of privacy breaches.</li>
        <li><strong>Stakeholder Involvement:</strong> Including diverse perspectives in privacy-related decisions.</li>
        <li><strong>Ongoing Monitoring:</strong> Continuously assessing privacy impacts as systems evolve and new risks emerge.</li>
      </ul>
      
      <p>As AI continues to advance, the conversation around privacy must evolve as well. By developing robust technical safeguards, appropriate regulatory frameworks, and ethical guidelines, we can work toward AI systems that deliver benefits while respecting fundamental privacy rights.</p>
    `,
    author: "Dr. Helen Nissenbaum",
    category: "AI Ethics",
    date: "2023-10-20",
    relatedArticles: [5, 8],
  },
]

export default function ArticlePage() {
  const params = useParams()
  const [article, setArticle] = useState<(typeof ALL_ARTICLES)[0] | null>(null)
  const [relatedArticles, setRelatedArticles] = useState<typeof ALL_ARTICLES>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchArticle = async () => {
      setIsLoading(true)

      // In a real app, you would fetch from an actual API
      // const response = await fetch(`/api/articles/${params.id}`);
      // const data = await response.json();

      // Simulate API delay
      setTimeout(() => {
        const foundArticle = ALL_ARTICLES.find((a) => a.id.toString() === params.id)

        if (foundArticle) {
          setArticle(foundArticle)

          // Get related articles
          if (foundArticle.relatedArticles) {
            const related = ALL_ARTICLES.filter(
              (a) => foundArticle.relatedArticles?.includes(a.id) && a.id !== foundArticle.id,
            )
            setRelatedArticles(related)
          }
        }

        setIsLoading(false)
      }, 500)
    }

    if (params.id) {
      fetchArticle()
    }
  }, [params.id])

  if (isLoading) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="flex flex-col md:flex-row gap-8">
          <main className="flex-1 animate-pulse">
            <div className="h-10 bg-muted rounded w-3/4 mb-4"></div>
            <div className="flex gap-4 mb-6">
              <div className="h-5 bg-muted rounded w-32"></div>
              <div className="h-5 bg-muted rounded w-32"></div>
            </div>
            <div className="space-y-4">
              <div className="h-4 bg-muted rounded"></div>
              <div className="h-4 bg-muted rounded"></div>
              <div className="h-4 bg-muted rounded w-5/6"></div>
              <div className="h-4 bg-muted rounded w-4/6"></div>
            </div>
          </main>
          <aside className="md:w-64 flex-shrink-0 animate-pulse">
            <div className="h-7 bg-muted rounded w-3/4 mb-4"></div>
            <div className="space-y-4">
              <div className="h-24 bg-muted rounded"></div>
              <div className="h-24 bg-muted rounded"></div>
              <div className="h-24 bg-muted rounded"></div>
            </div>
          </aside>
        </div>
      </div>
    )
  }

  if (!article) {
    return (
      <div className="container mx-auto py-16 px-4 text-center">
        <h1 className="text-3xl font-bold mb-4">Article Not Found</h1>
        <p className="text-muted-foreground mb-8">The article you're looking for doesn't exist or has been removed.</p>
        <Button asChild>
          <Link href="/knowledge">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Knowledge Base
          </Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row gap-8">
        <main className="flex-1">
          <Button variant="ghost" size="sm" className="mb-4" asChild>
            <Link href="/knowledge">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Knowledge Base
            </Link>
          </Button>

          <h1 className="text-3xl md:text-4xl font-bold mb-4">{article.title}</h1>

          <div className="flex flex-wrap gap-4 mb-6 text-sm text-muted-foreground">
            <div className="flex items-center">
              <User className="mr-2 h-4 w-4" />
              {article.author}
            </div>
            <div className="flex items-center">
              <Calendar className="mr-2 h-4 w-4" />
              {article.date}
            </div>
            <Badge variant="outline">{article.category}</Badge>
          </div>

          <div className="prose dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: article.content }} />
        </main>

        <aside className="md:w-64 flex-shrink-0">
          <div className="sticky top-24 space-y-6">
            <div>
              <h2 className="text-lg font-semibold mb-4">Related Articles</h2>
              {relatedArticles.length > 0 ? (
                <div className="space-y-4">
                  {relatedArticles.map((relatedArticle) => (
                    <Card key={relatedArticle.id} className="hover:shadow-md transition-shadow">
                      <CardHeader className="p-4">
                        <CardTitle className="text-base">{relatedArticle.title}</CardTitle>
                      </CardHeader>
                      <CardFooter className="p-4 pt-0 flex justify-between">
                        <Button variant="ghost" size="sm" className="w-full" asChild>
                          <Link href={`/article/${relatedArticle.id}`}>Read Article</Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">No related articles found.</p>
              )}
            </div>

            <Separator />

            <div>
              <h2 className="text-lg font-semibold mb-4">Categories</h2>
              <div className="flex flex-wrap gap-2">
                {[...new Set(ALL_ARTICLES.map((a) => a.category))].map((category) => (
                  <Link href={`/knowledge?category=${category}`} key={category}>
                    <Badge variant="secondary" className="cursor-pointer">
                      {category}
                    </Badge>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}

