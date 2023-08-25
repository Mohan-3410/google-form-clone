import React, { useEffect, useState } from "react";
import CropOriginalIcon from "@material-ui/icons/CropOriginal";
import Select from "@material-ui/core/Select";
import Switch from "@material-ui/core/Switch";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import ShortTextIcon from "@material-ui/icons/ShortText";
import SubjectIcon from "@material-ui/icons/Subject";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { BsTrash } from "react-icons/bs";
import { IconButton } from "@material-ui/core";
import FilterNoneIcon from "@material-ui/icons/FilterNone";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import OndemandVideoIcon from "@material-ui/icons/OndemandVideo";
import TextFieldsIcon from "@material-ui/icons/TextFields";
import { BsFileText } from "react-icons/bs";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Button from "@material-ui/core/Button";
import { FcRightUp } from "react-icons/fc";
import CloseIcon from "@material-ui/icons/Close";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { Typography } from "@material-ui/core";
import { MenuItem } from "@material-ui/core";
import DragIndicatorIcon from "@material-ui/icons/DragIndicator";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "./QuestionForm.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useStateValue } from "../../store/StateProvider";
import { actionTypes } from "../../store/reducer";
const QuestionForm = () => {
  const { id } = useParams();
  const [{},dispatch] = useStateValue();
  const [questions, setQuestions] = useState([
    {
      questionText: "Which is the capital city of karnataka ? ",
      questionType: "radio",
      options: [
        { optionText: "Bengaluru" },
        { optionText: "Belgavi" },
        { optionText: "Hubli" },
        { optionText: "Mandya" },
      ],
      answer: false,
      answerKey: "",
      points: 0,
      open: true,
      required: false,
    },
  ]);

  const [documentName, setDocName] = useState("Untitled Document");
  const [documentDescription, setDocDesc] = useState("Add Description");

  useEffect(() => {
    async function data_adding() {
      
      var request = await axios.get(`https://form-clone-e5252-default-rtdb.firebaseio.com/add_question/${id}.json`);
      var question_data = request.data.questions;

      console.log(question_data);
      var doc_name = request.data.document_name;
      var doc_descip = request.data.doc_desc;
      console.log(doc_name + " " + doc_descip);
      setDocName(doc_name);
      setDocDesc(doc_descip);
      setQuestions(question_data);
      dispatch({
        type: actionTypes.SET_DOC_NAME,
        doc_name: doc_name,
      });
      dispatch({
        type: actionTypes.SET_DOC_DESC,
        doc_desc: doc_descip,
      });
      dispatch({
        type: actionTypes.SET_QUESTIONS,
        questions: question_data,
      });
    }
    data_adding();
  }, []);

  function changeQuestion(text, i) {
    var newQuestion = [...questions];
    newQuestion[i].questionText = text;
    setQuestions(newQuestion);
    console.log(newQuestion);
  }

  function addQuestionType(i, type) {
    let qs = [...questions];
    console.log(type);
    qs[i].questionType = type;
    setQuestions(qs);
  }

  function changeOptionValue(text, i, j) {
    var optionsQuestion = [...questions];
    optionsQuestion[i].options[j].optionText = text;
    setQuestions(optionsQuestion);
    console.log(optionsQuestion);
  }

  function removeOption(i, j) {
    var removeOptionQuestion = [...questions];
    if (removeOptionQuestion[i].options.length > 1) {
      removeOptionQuestion[i].options.splice(j, 1);
      setQuestions(removeOptionQuestion);
      console.log(i + " " + j);
    }
  }

  function addOption(i) {
    var optionsOfQuestion = [...questions];
    if (optionsOfQuestion[i].options.length < 5) {
      optionsOfQuestion[i].options.push({
        optionText: "Option " + (optionsOfQuestion[i].options.length + 1),
      });
    } else {
      console.log("Max 5 options");
    }
    setQuestions(optionsOfQuestion);
  }

  function copyQuestion(i) {
    expandCloseAll();
    let qs = [...questions];
    var newQuestion = { ...qs[i] };
    setQuestions([...questions, newQuestion]);
  }
  function deleteQuestion(i) {
    let qs = [...questions];
    if (questions.length > 1) {
      qs.splice(i, 1);
    }
    setQuestions(qs);
  }

  function requiredQuestion(i) {
    var reqQuestion = [...questions];
    reqQuestion[i].required = !reqQuestion[i].required;
    console.log(reqQuestion[i].required + " " + i);
    setQuestions(reqQuestion);
  }

  function addMoreQuestionField() {
    expandCloseAll();
    setQuestions([
      ...questions,
      {
        questionText: "Question",
        questionType: "radio",
        options: [{ optionText: "Option 1" }],
        open: true,
        required: false,
      },
    ]);
  }

  function onDragEnd(result) {
    if (!result.destination) {
      return;
    }
    var itemgg = [...questions];
    const itemF = reorder(
      itemgg,
      result.source.index,
      result.destination.index
    );
    setQuestions(itemF);
  }
  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);

    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  function expandCloseAll() {
    let qs = [...questions];
    for (let j = 0; j < qs.length; j++) {
      qs[j].open = false;
      setQuestions(qs);
    }
  }
  function handleExpand(i) {
    let qs = [...questions];
    for (let j = 0; j < qs.length; j++) {
      if (i === j) {
        qs[i].open = true;
      } else {
        qs[j].open = false;
      }
    }
    setQuestions(qs);
  }
  function setOptionAnswer(ans, qno) {
    var Questions = [...questions];
    Questions[qno].answerKey = ans;
    setQuestions(Questions);
    console.log(qno + "" + ans);
  }
  function setOptionPoints(points, qno) {
    var Questions = [...questions];
    Questions[qno].points = points;
    setQuestions(Questions);
    console.log(qno + "" + points);
  }
  function doneAnswer(i) {
    var answerOfQuestion = [...questions];
    answerOfQuestion[i].answer = !answerOfQuestion[i].answer;
    setQuestions(answerOfQuestion);
  }
  function addAnswer(i) {
    var answerOfQuestion = [...questions];
    answerOfQuestion[i].answer = !answerOfQuestion[i].answer;
    setQuestions(answerOfQuestion);
  }
  

  function commitToDB() {
    // axios.post(`http://localhost:9000/add_question/${id}`, 
    axios.patch(`https://form-clone-e5252-default-rtdb.firebaseio.com/add_question/${id}.json`,
    {
      document_name: documentName,
      doc_desc: documentDescription,
      questions: questions,
    });
  }

  function questionsUI() {
    return questions.map((ques, i) => (
      <Draggable key={i} draggableId={i + "id"} index={i}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <div>
              <div style={{ marginBottom: "0px" }}>
                <div style={{ width: "100%", marginBottom: "0px" }}>
                  <DragIndicatorIcon
                    style={{
                      transform: "rotate(-90deg)",
                      color: "#DAE0E2",
                      position: "relative",
                      left: "300px",
                    }}
                    fontSize="small"
                  />
                </div>
                <div>
                  <Accordion
                    expanded={!questions.open}
                    onChange={() => {
                      handleExpand(i);
                    }}
                    className={questions[i].open ? "add_border" : ""}
                  >
                    <AccordionSummary
                      aria-controls="panelia-content"
                      id="panelia-header"
                      elevation={1}
                      style={{ width: "100%" }}
                    >
                      {!questions[i].open ? (
                        <div className="saved_questions">
                          <Typography
                            style={{
                              fontSize: "15px",
                              fontweight: "400",
                              letterSpacing: ".1px",
                              lineHeight: "24px",
                              paddingBottom: "8px",
                            }}
                          >
                            {i + 1}. {questions[i].questionText}
                          </Typography>
                          {ques.options.map((op, j) => (
                            <div key={j}>
                              <div style={{ display: "flex" }}>
                                <FormControlLabel
                                  style={{
                                    marginLeft: "5px",
                                    marginBottom: "5px",
                                  }}
                                  disabled
                                  control={
                                    <input
                                      type={ques.questionType}
                                      color="primary"
                                      style={{ marginRight: "3px" }}
                                      required={ques.type}
                                    />
                                  }
                                  label={
                                    <Typography
                                      style={{
                                        fontFamily: "Roboto, Arial, sans-serif",
                                        fontSize: "13px",
                                        fontWeight: "400",
                                        letterSpacing: ".2px",
                                        lineHeight: "20px",
                                        color: "#202124",
                                      }}
                                    >
                                      {ques.options[j].optionText}
                                    </Typography>
                                  }
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        ""
                      )}
                    </AccordionSummary>
                    {questions[i].open ? (
                      <div className="question_boxes">
                        {!questions[i].answer ? (
                          <AccordionDetails className="add_question">
                            <div className="add_question_top">
                              <input
                                type="text"
                                className="question"
                                placeholder="Question"
                                value={ques.questionText}
                                onChange={(e) => {
                                  changeQuestion(e.target.value, i);
                                }}
                              ></input>
                              <CropOriginalIcon style={{ color: "#5f6368" }} />
                              <Select
                                className="select"
                                style={{ color: "#5f6368", fontSize: "13px" }}
                              >
                                <MenuItem
                                  id="text"
                                  value="Text"
                                  onClick={() => {
                                    addQuestionType(i, "text");
                                  }}
                                >
                                  {" "}
                                  <SubjectIcon
                                    style={{ marginRight: "10px" }}
                                  />{" "}
                                  Paragraph
                                </MenuItem>
                                <MenuItem
                                  id="checkbox"
                                  value="Checkbox"
                                  onClick={() => {
                                    addQuestionType(i, "checkbox");
                                  }}
                                >
                                  <CheckBoxIcon
                                    style={{
                                      marginRight: "10px",
                                      color: "#70757a",
                                    }}
                                    checked
                                  />{" "}
                                  Checkboxes{" "}
                                </MenuItem>
                                <MenuItem
                                  id="radio"
                                  value="Radio"
                                  onClick={() => {
                                    addQuestionType(i, "radio");
                                  }}
                                >
                                  {" "}
                                  <Radio
                                    style={{
                                      marginRight: "10px",
                                      color: "#70757a",
                                    }}
                                    checked
                                  />{" "}
                                  Multiple Choice
                                </MenuItem>
                              </Select>
                            </div>
                            {ques.options.map((op, j) => (
                              <div className="add_question_body" key={j}>
                                {ques.questionType !== "text" ? (
                                  <input
                                    type={ques.questionType}
                                    style={{ marginRight: "10px" }}
                                  />
                                ) : (
                                  <ShortTextIcon
                                    style={{ marginRight: "10px" }}
                                  />
                                )}
                                <div>
                                  <input
                                    type="text"
                                    className="text_input"
                                    placeholder="option"
                                    value={ques.options[j].optionText}
                                    onChange={(e) => {
                                      changeOptionValue(e.target.value, i, j);
                                    }}
                                  ></input>
                                </div>
                                <CropOriginalIcon
                                  style={{ color: "#5f6368" }}
                                />
                                <IconButton aria-label="delete">
                                  <CloseIcon
                                    onClick={() => {
                                      removeOption(i, j);
                                    }}
                                  />
                                </IconButton>
                              </div>
                            ))}

                            {ques.options.length < 5 ? (
                              <div className="add_question_body">
                                <FormControlLabel
                                  disabled
                                  control={
                                    ques.questionType !== "text" ? (
                                      <input
                                        type={ques.questionType}
                                        color="primary"
                                        inputProps={{
                                          "aria-label": "secondary checkbox",
                                        }}
                                        style={{
                                          marginLeft: "10px",
                                          marginRight: "10px",
                                        }}
                                        disabled
                                      />
                                    ) : (
                                      <ShortTextIcon
                                        style={{ marginRight: "10px" }}
                                      />
                                    )
                                  }
                                  label={
                                    <div>
                                      <input
                                        type="text"
                                        className="text_input"
                                        style={{
                                          fontSize: "13px",
                                          width: "60px",
                                        }}
                                        placeholder="Add other"
                                      ></input>
                                      <Button
                                        size="small"
                                        style={{
                                          textTransform: "none",
                                          color: "#4285f4",
                                          fontSize: "13px",
                                          fontweight: "600",
                                        }}
                                        onClick={() => {
                                          addOption(i);
                                        }}
                                      >
                                        Add Option
                                      </Button>
                                    </div>
                                  }
                                />
                              </div>
                            ) : (
                              ""
                            )}

                            <div className="add_footer">
                              <div className="add_question_bottom_left">
                                <Button
                                  size="small"
                                  style={{
                                    textTransform: "none",
                                    color: "#4285f4",
                                    fontsize: "13px",
                                    fontweight: "600",
                                  }}
                                  onClick={() => {
                                    addAnswer(i);
                                  }}
                                >
                                  <FcRightUp
                                    style={{
                                      border: "2px solid #4285f4",
                                      padding: "2px",
                                      marginRight: "8px",
                                    }}
                                  />{" "}
                                  Answer key
                                </Button>
                              </div>
                              <div className="add_question_bottom">
                                <IconButton
                                  aria-label="Copy"
                                  onClick={() => {
                                    copyQuestion(i);
                                  }}
                                >
                                  <FilterNoneIcon />
                                </IconButton>
                                <IconButton
                                  aria-label="delete"
                                  onClick={() => {
                                    deleteQuestion(i);
                                  }}
                                >
                                  <BsTrash />
                                </IconButton>
                                <span
                                  style={{ color: "#5f6368", fontSize: "13px" }}
                                >
                                  Required{" "}
                                </span>{" "}
                                <Switch
                                  name="checked"
                                  color="primary"
                                  onClick={() => {
                                    requiredQuestion(i);
                                  }}
                                  checked={ques.required}
                                />
                                <IconButton>
                                  <MoreVertIcon />
                                </IconButton>
                              </div>
                            </div>
                          </AccordionDetails>
                        ) : (
                          <AccordionDetails className="add_question">
                            <div className="top_header">
                              Choose Correct Answer
                            </div>
                            <div>
                              <div className="add_question_top">
                                <input
                                  type="text"
                                  className="question"
                                  placeholder="Question"
                                  value={ques.questionText}
                                  disabled
                                />
                                <input
                                  type="number"
                                  className="points"
                                  min="0"
                                  step="1"
                                  placeholder="0"
                                  onchange={(e) => {
                                    setOptionPoints(e.target.value, i);
                                  }}
                                />
                              </div>
                              {ques.options.map((op, j) => (
                                <div
                                  className="add_question_body"
                                  key={j}
                                  style={{
                                    marginLeft: "8px",
                                    marginBottom: "10px",
                                    marginTop: "5px",
                                  }}
                                >
                                  <div key={j}>
                                    <div
                                      style={{ display: "flex" }}
                                      className=""
                                    >
                                      <div className="form-check">
                                        <label
                                          style={{ fontSize: "13px" }}
                                          onclick={() => {
                                            setOptionAnswer(
                                              ques.options[j].optionText,
                                              i
                                            );
                                          }}
                                        >
                                          {ques.questionType !== "text" ? (
                                            <input
                                              type={ques.questionType}
                                              name={ques.questionText}
                                              value="option3"
                                              className="form-check-input"
                                              required={ques.required}
                                              style={{
                                                marginRight: "10px",
                                                marginBottom: "10px",
                                                marginTop: "5px",
                                              }}
                                            />
                                          ) : (
                                            <ShortTextIcon
                                              style={{ marginRight: "10px" }}
                                            />
                                          )}
                                          {ques.options[j].optionText}
                                        </label>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ))}
                              <div className="add_question_body">
                                <Button
                                  size="small"
                                  style={{
                                    textTransform: "none",
                                    color: "#4285f4",
                                    fontSize: "13px",
                                    fontWeight: "600",
                                  }}
                                >
                                  <BsFileText
                                    style={{
                                      fontSize: "20px",
                                      marginRight: "8px",
                                    }}
                                  />{" "}
                                  Add Answer Feedback{" "}
                                </Button>
                              </div>
                              <div className="add_question_bottom">
                                <Button
                                  variant="outlined"
                                  color="primary"
                                  style={{
                                    textTransform: "none",
                                    color: "#4285f4",
                                    fontSize: "12px",
                                    marginTop: "12px",
                                    fontWeight: "600",
                                  }}
                                  onClick={() => {
                                    doneAnswer(i);
                                  }}
                                >
                                  Done
                                </Button>
                              </div>
                            </div>
                          </AccordionDetails>
                        )}
                        {!ques.answer ? (
                          <div className="question_edit">
                            <AddCircleOutlineIcon
                              className="edit"
                              onClick={addMoreQuestionField}
                            />
                            <OndemandVideoIcon className="edit" />
                            <CropOriginalIcon className="edit" />
                            <TextFieldsIcon className="edit" />
                          </div>
                        ) : (
                          " "
                        )}
                      </div>
                    ) : (
                      ""
                    )}
                  </Accordion>
                </div>
              </div>
            </div>
          </div>
        )}
      </Draggable>
    ));
  }

  return (
    <div>
      <div className="question_form">
        <br></br>
        <div className="section">
          <div className="question_title_section">
            <div className="question_form_top">
              <input
                type="text"
                className="question_form_top_name"
                style={{ color: "black" }}
                placeholder="Untitled document"
                onChange={(e) => {
                  setDocName(e.target.value);
                }}
              ></input>
              <input
                type="text"
                className="question_form_top_desc"
                placeholder="Form Description"
                onChange={(e) => {
                  setDocDesc(e.target.value);
                }}
              ></input>
            </div>
          </div>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable">
              {(provided, snapshot) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {questionsUI()}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
          <div className="save_form">
            <Button
              variant="contained"
              color="primary"
              onClick={commitToDB}
              style={{ fontSize: "14px" }}
            >
              Save
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionForm;
