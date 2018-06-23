import React, { Component, Fragment } from "react";
import styled from "styled-components";
import * as titles from "react-titles";

const ControlPanel = styled.div`
    position: absolute;
    display: flex;
    justify-content: space-around;
    align-items: center;
    background-color: #000;
    width: 830px;
    height: 60px;
    bottom: 100px;
    left: 50%;
    transform: translateX(-50%);
    opacity: 0.8;
`;

const Label = styled.label`
  color: #fff;
  margin: 0 10px;
  color: #989898;
`;

const Input = styled.input`
    width: 50px;
    border: none;
    padding: 5px;
    background-color: #171717;
    color: #989898;
    text-transform: uppercase;
`;

const TitleInput = Input.extend`
  width: 100px;
`;

const Submit = styled.input`
  background-color: #171717;
  border: none;
  color: #fff;
  padding: 5px;
  margin-left: 20px;
  color: #989898;
  width: 80px;
  cursor: pointer;
`;

const Select = styled.select`
    padding: 5px;
    border: none;
    background-color: #171717;
    color: #989898;
`;

const Button = Submit.withComponent("button");

const Open = Button.extend`
  margin-left: 0;
  margin-right: 2px;
`;

const Close = Button.extend`
  margin-left: 0;
`;

const LittleBar = styled.div`
    width: 2px;
    background-color: #c1c1c121;
    height: 70%;
`;

class Title extends Component {
  state = {
    component: "Title1",
    selected: "Title1",
    title: "REACT",
    subTitle: "SVG",
    isOpen: true
  };

  handleSubmit = (e) => {
    e.preventDefault();

    this.setState((state) => ({
      title: this.title.value.toUpperCase(),
      subTitle: this.subTitle ? this.subTitle.value.toUpperCase() : state.subTitle
    }))
  }

  handleOpen = () => {
    this.setState({ isOpen: true });
  }

  handleClose = () => {
    this.setState({ isOpen: false });
  }

  handleTitleChange = (e) => {
    this.setState({ selected: e.target.value, isOpen: false });
  }

  handleComplete = (status) => {
    const {selected, component} = this.state;

    if (!status && selected !== component) {
      this.setState({ component: selected, isOpen: true });
    }
  }

  render() {
    const { component, selected, title, subTitle, isOpen } = this.state;
    const Title = titles[component];
    const acceptsOneTxt = /Title(?:1|7)$/.test(component);

    return (
      <div className="react-titles">
        <Title
          size="400"
          text={acceptsOneTxt && title}
          text1={!acceptsOneTxt && title}
          text2={!acceptsOneTxt && subTitle}
          open={isOpen}
          style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
          onComplete={this.handleComplete}
        />
        <ControlPanel>
          <form onSubmit={this.handleSubmit}>
            <Label htmlFor="type">Component</Label>
            <Select id="type" value={selected} onChange={this.handleTitleChange}>
              {Object.keys(titles).map((name, id) => (
                <option key={id} value={name}>{name}</option>
              ))}
            </Select>

            <Label htmlFor="title">Title</Label>
            <TitleInput id="title" defaultValue={title} innerRef={(el) => this.title = el} />

            { !acceptsOneTxt &&
              <Fragment>
                <Label htmlFor="subTitle">SubTitle</Label>
                <TitleInput
                  id="subTitle"
                  defaultValue={subTitle}
                  innerRef={(el) => this.subTitle = el}
                />
              </Fragment>
            }

            <Submit type="submit" defaultValue="CHANGE" />
          </form>
          <LittleBar />
          <div>
            <Open onClick={this.handleOpen}>OPEN</Open>
            <Close onClick={this.handleClose}>CLOSE</Close>
          </div>
        </ControlPanel>
      </div>
    );
  }
}

export default Title;