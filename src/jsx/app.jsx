import React from 'react';
import ReactDOM from 'react-dom';

class Hello extends React.Component {
	render() {
		return (
			<div className = "container" >
				<img className = "react__img" src = {this.props.imageUrl} />
				<h1>Hello {this.props.name}</h1>
				<p>{this.props.content}</p>
			</div>
		);
	}
};

ReactDOM.render (
	<Hello name = "World!!"
	       imageUrl = "assets/images/mine.jpg"
	       content = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa debitis delectus deleniti
			 dolor enim ex libero quos rerum soluta tempore?" />,
	document.querySelector('.root')
);
