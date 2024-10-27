import React, { useState, useEffect } from 'react';
import QuillModal from './QuillModal.js';
import { collection, addDoc, getDocs, doc, getDoc, query, orderBy }  from 'firebase/firestore';
import {auth,signOut,signInWithPopup, db } from '../firebaseConfig.js'; 
import './Forum.css';
import DOMPurify from 'dompurify';
import parse from 'html-react-parser';
//input handling not done yet 
function Forum() {
  const [content, setContent] = useState('');
  const [user, setUser] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState({ title: '', description: '', tags: '' });
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [newAnswer, setNewAnswer] = useState('');
  const [newComment, setNewComment] = useState('');
  const [questionComments, setQuestionComments] = useState([]);
  const [answerComments, setAnswerComments] = useState({});
  const [showQuestionComments, setShowQuestionComments] = useState(false);
  const [showAnswerComments, setShowAnswerComments] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const [savedContent, setSavedContent] = useState('');

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    fetchQuestions();
  }, []);
  const fetchQuestions = async () => {
    const q = query(collection(db, 'questions')); // Order by timestamp
    const querySnapshot = await getDocs(q);
    setQuestions(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  };
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
//setting this
  const handleSave = (content) => {
   setSavedContent(content);
     // Ensure state updates before proceeding
     // Call submitAnswer after saving content
  };
  const handleInputChange = (e) => {
    setNewQuestion({ ...newQuestion, [e.target.name]: e.target.value });
  };
  const handleEditorChange = (value) => {
    setContent(value); // Update the state with editor content
  };


  const SafeHtmlParserComponent = (rawHtml) => {
    // Sanitize the raw HTML to prevent XSS attacks
    const sanitizedHtml = DOMPurify.sanitize(rawHtml);

    // Parse the sanitized HTML into JSX elements
    const parsedHtml = parse(sanitizedHtml);
    return <div>{parsedHtml}</div>;
  };
  const filteredQuestions = questions.filter(question =>
    question.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    question.tags.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const toggleQuestionComments = () => {
    setShowQuestionComments(prevState => !prevState);
  };

  const toggleAnswerComments = (answerId) => {
    setShowAnswerComments(prevState => ({
      ...prevState,
      [answerId]: !prevState[answerId]
    }));
  };

  const submitQuestion = async (e) => {
    e.preventDefault();
    if (user) {

      await addDoc(collection(db, 'questions'), {
        ...newQuestion,
        // timestamp: db.Timestamp.now(),
        authorId: user.uid,
        authorName: user.displayName,
        votes: 0,
      });

      setNewQuestion({ title: '', description: '', tags: '' });
    fetchQuestions();
   
}

  };

  const viewQuestionDetails = async (id) => {
    const questionRef = doc(db, 'questions', id);
    const questionDoc = await getDoc(questionRef);

    if (questionDoc.exists()) {
      const questionData = questionDoc.data();

      const answersCollection = await getDocs(query(collection(db, `questions/${id}/answers`)));
      const answers = answersCollection.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      const commentsCollection = await getDocs(query(collection(db, `questions/${id}/comments`)));
      const comments = commentsCollection.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      const answerCommentsData = {};
      for (const answer of answers) {
        const answerCommentsCollection = await getDocs(query(collection(db, `questions/${id}/answers/${answer.id}/comments`)));
        answerCommentsData[answer.id] = answerCommentsCollection.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      }

      setSelectedQuestion({ ...questionData, id, answers });
      setQuestionComments(comments);
      setAnswerComments(answerCommentsData);
    }
  };


  const submitAnswer = async (e) => {
    e.preventDefault();
    if (savedContent===''){alert('No content to submit')}
    else if (selectedQuestion && user) {
      try {
        console.log(savedContent)
        // Add answer to Firestore collection
        await addDoc(collection(db, `questions/${selectedQuestion.id}/answers`), {
          answerText: savedContent,
          authorId: user.uid,
          authorName: user.displayName,
          votes: 0,
        });
  
        // Clear inputs and refresh view
        setSavedContent('');
        viewQuestionDetails(selectedQuestion.id); // Refresh the question details
        console.log('Answer submitted successfully!');
      } catch (error) {
        console.error('Error submitting answer:', error);
      }
    } else {
      console.log('Missing user or selected question');
    }
  };

  const submitCommentOnQuestion = async (e) => {
    e.preventDefault();
    
    if (savedContent===''){alert('No content to submit')}
    else if (selectedQuestion && user) {
      await addDoc(collection(db, `questions/${selectedQuestion.id}/comments`), {
        commentText: savedContent,//newComment and setNewComment
        authorId: user.uid,
        authorName: user.displayName,
      });
      setContent('');
      setSavedContent('');
      viewQuestionDetails(selectedQuestion.id);  // Refresh question details
    }
  };

  const submitCommentOnAnswer = async (answerId) => {
    
    if (savedContent===''){alert('No content to submit')}
    else if (selectedQuestion && user) {
      await addDoc(collection(db, `questions/${selectedQuestion.id}/answers/${answerId}/comments`), {
        commentText: savedContent,//newComment and setNewComment
        authorId: user.uid,
        authorName: user.displayName,
      });
      setContent('');
      setSavedContent('');  
      viewQuestionDetails(selectedQuestion.id);  // Refresh question details
    }
  };

  const formatTimestamp = (timestamp) => {
    if (timestamp?.seconds) {
      const date = new Date(timestamp.seconds * 1000);
      return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
    }
    return 'N/A';
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <header className='header1'>
        <h1>Discussion Forum</h1>
        
      </header>

      {user ? (
        <>
          {/* Post a New Question */}
          <form onSubmit={submitQuestion}>
            <h2>Post a New Question</h2>
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={newQuestion.title}
              onChange={handleInputChange}
              required
            />
            <textarea
              name="description"
              placeholder="Description"
              value={newQuestion.description}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="tags"
              placeholder="Tags (comma separated)"
              value={newQuestion.tags}
              onChange={handleInputChange}
            />
            <button type="submit">Post Question</button>
          </form>

          <hr />

          {/* List of Questions */}
          <h2>All Questions</h2>
          
          <ul>
            {filteredQuestions.map(question => (
              <li key={question.id} style={{ cursor: 'pointer' }} onClick={() => viewQuestionDetails(question.id)}>
                {question.title} - Tags: {question.tags} 
                
              </li>
            ))}
          </ul>

          <hr />

          {/* Question Details & Answers */}
          {selectedQuestion && (
            <>
              <div className="question-details">
              <div className="question-header">
                <div className="question-title">{selectedQuestion.title}</div>
                <div className="author-name">{selectedQuestion.authorName}</div>
              </div>

              <div className="question-content">
                <p>{selectedQuestion.description}</p>
                <button onClick={toggleQuestionComments}>
                {showQuestionComments ? 'Hide Comments' : 'Show Comments'}
              </button>
              
              {showQuestionComments && (
                <div className='comments'>
                  
              <h4>Comments</h4>
                  <div className='comment'>
                    {questionComments.map(comment => (
                      <div key={comment.id}>
                        {SafeHtmlParserComponent(comment.commentText)} by {comment.authorName}
                        <hr></hr>
                      </div>
                    ))}
                  </div>
                  <button onClick={openModal}>Open Editor</button>
                    
                    <button onClick={submitCommentOnQuestion}>Add Comment</button>
                </div>
              )}
              </div>

              <div className="tags-and-votes">
              <div className="tags">
                {selectedQuestion.tags.split(',').map((tag, index) => (
                  <div key={index} className="tag">{tag.trim()}</div>  // trim removes extra spaces
                ))}
              </div>
                <div className="votes">
                  <span>Votes</span>
                  <button className="vote-btn">👍</button>
                </div>
              </div>

              <div className="answers-section">
                <div className="answer-header">
                <h3>Answers</h3></div>
              <div className='answers'>
                {selectedQuestion.answers.map(answer => (
                  <div className='answer' key={answer.id}>
                    {SafeHtmlParserComponent(answer.answerText)} by {answer.authorName}

                    {/* Toggle comments on each answer */}
                    <button onClick={() => toggleAnswerComments(answer.id)}>
                      {showAnswerComments[answer.id] ? 'Hide Comments' : 'Show Comments'}
                    </button>
                    <hr></hr>
                    {showAnswerComments[answer.id] && (
                      <>
                        <h4>Comments on this Answer</h4>
                        <div className='answercomments'>
                          {(answerComments[answer.id] || []).map(comment => (
                            <div className='answercomment' key={comment.id}>
                              {SafeHtmlParserComponent(comment.commentText)} by {comment.authorName}
                               
                              <div className="answer-votes">
                                <span>Votes</span>
                                <button className="vote-btn">👍</button>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div>
                <button onClick={openModal}>Open Editor</button>
                <button onClick={() => submitCommentOnAnswer(answer.id)}>Add Comment</button>
              </div>
                        
                        
                      <hr></hr>
                      </>
                    )}
                     
                  </div>
                ))}<div>
                  
                <button onClick={openModal}>Open Editor</button>
                <button onClick={submitAnswer}>Post an answer</button>
          
                <QuillModal isOpen={isModalOpen} onClose={closeModal} onSave={handleSave} />
              </div>
              </div>
                </div>
                </div>
              <div className='leftside'>
            <input
              type="text"
              placeholder="Search by title or tags"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)} // Update search query on input change
            />
            
          </div> 

            </>
          )}
        </>
      ) : (
        <p>Please sign in to participate in the forum.</p>
      )}
    </div>
  );
}

export default Forum;